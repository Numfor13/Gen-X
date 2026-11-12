"""Business operations shared by the HTTP API and the USSD menu."""
import re
import secrets
import time
import uuid
from collections import Counter

from botocore.exceptions import ClientError

from . import db, domain
from .ref import ARTISAN_TAGS, CIRCLES, CUSTOMER_TAGS, QUARTERS, RELATIONS, TRADES, URGENCIES

VOUCH_BUDGET = 5
MAX_CODE_ATTEMPTS = 5
PHONE_RE = re.compile(r"^\+\d{9,15}$")


class Fail(Exception):
    def __init__(self, status: int, msg: str):
        self.status, self.msg = status, msg


def now() -> int:
    return int(time.time())


def new_id() -> str:
    return uuid.uuid4().hex[:10]


def check(cond, msg: str, status: int = 400):
    if not cond:
        raise Fail(status, msg)


def clean_phone(phone: str) -> str:
    phone = re.sub(r"[\s-]", "", phone or "")
    check(PHONE_RE.match(phone), "Phone must look like +237670000000")
    return phone


# ---- side channels -------------------------------------------------------

def sms(phone: str, text: str):
    """Simulated SMS: lands in the inbox shown on the /sim screen."""
    db.put({"PK": f"INBOX#{phone}", "SK": f"{time.time_ns()}#{new_id()}", "text": text,
            "ts": now(), "ttl": now() + 7 * 86400})


def inbox(phone: str) -> list[dict]:
    return [{"text": m["text"], "ts": m["ts"]} for m in db.query(f"INBOX#{phone}", newest_first=True)[:20]]


def fraud(rule: str, severity: str, subject: str, details: str, ts: int | None = None):
    ts = ts or now()
    db.put({"PK": "FRAUD", "SK": f"{ts}#{new_id()}", "rule": rule, "severity": severity,
            "subject": subject, "details": details, "ts": ts})


def fraud_events() -> list[dict]:
    keep = ("rule", "severity", "subject", "details", "ts")
    return [{k: e[k] for k in keep} for e in db.query("FRAUD", newest_first=True)[:100]]


# ---- users ---------------------------------------------------------------

def user_by_phone(phone: str) -> dict | None:
    found = db.query(f"PHONE#{phone}", index="GSI1")
    return found[0] if found else None


def get_user(uid: str) -> dict | None:
    return db.get(f"USER#{uid}", "PROFILE")


def create_user(name: str, phone: str, role: str, quarter: str, artisan_id: str | None = None) -> dict:
    user = {"PK": f"USER#{(uid := new_id())}", "SK": "PROFILE", "GSI1PK": f"PHONE#{phone}", "GSI1SK": "USER",
            "id": uid, "name": name, "phone": phone, "role": role, "quarter": quarter}
    if artisan_id:
        user["artisan_id"] = artisan_id
    db.put(user)
    return user


def public_user(u: dict) -> dict:
    return {k: u.get(k) for k in ("id", "name", "phone", "role", "quarter", "artisan_id")}


# ---- artisans ------------------------------------------------------------

def get_artisan(aid: str) -> dict:
    art = db.get(f"ART#{aid}", "PROFILE")
    check(art, "No artisan with that ID", 404)
    return art


def create_artisan(name: str, phone: str, trade: str, quarter: str, aid: str | None = None,
                   since: int | None = None) -> dict:
    name, phone = name.strip(), clean_phone(phone)
    check(name, "Name is required")
    check(trade in TRADES, "Unknown trade")
    check(quarter in QUARTERS, "Unknown quarter")
    check(not user_by_phone(phone), "That phone number is already registered", 409)
    while not aid or db.get(f"ART#{aid}", "PROFILE"):
        aid = str(100000 + secrets.randbelow(900000))  # 6 digits: works on QR, USSD and by voice
    art = {"PK": f"ART#{aid}", "SK": "PROFILE", "GSI1PK": f"TRADE#{trade}", "GSI1SK": f"Q#{quarter}#ART#{aid}",
           "id": aid, "name": name, "phone": phone, "trade": trade, "quarter": quarter,
           "available": True, "since": since or now()}
    db.put(art)
    create_user(name, phone, "artisan", quarter, aid)
    return art


def all_artisans() -> list[dict]:
    return [a for t in TRADES for a in db.query(f"TRADE#{t}", index="GSI1")]


def set_available(aid: str, available: bool) -> dict:
    return db.update(f"ART#{aid}", "PROFILE", "SET available = :a", {":a": available})


def artisan_view(art: dict, quarter: str | None = None, full: bool = False) -> dict:
    """Everything shown about an artisan is computed here, from code-confirmed jobs and vouches only."""
    t = now()
    done = [j for j in db.query(f"ART#{art['id']}", "JOB#", index="GSI1") if j["status"] == "completed"]
    shown = [j for j in done if "customer" in j["reviews"] and domain.revealed(j, t)]
    up = sum(j["reviews"]["customer"]["thumb"] == "up" for j in shown)
    down = len(shown) - up
    pct = domain.wilson_lb(up, down)
    per_customer = Counter(j["customer_id"] for j in done)
    vouches = db.query(art["PK"], "VOUCH#")
    counts = (len(vouches), len({v["circle"] for v in vouches}), len(done), pct)
    view = {
        "id": art["id"], "name": art["name"], "trade": art["trade"], "quarter": art["quarter"],
        "available": art["available"], "since": art["since"],
        "tier": domain.tier(*counts), "next": domain.next_step(*counts),
        "verified_jobs": len(done), "up": up, "down": down,
        "pct": None if pct is None else round(pct * 100),
        "customers": len(per_customer), "repeat": sum(n > 1 for n in per_customer.values()),
        "vouch_count": len(vouches),
    }
    if quarter:
        view["neighbours"] = len({j["customer_id"] for j in done if j["quarter"] == quarter})
    if full:
        view["vouches"] = [{k: v[k] for k in ("voucher_name", "circle", "relation", "reason", "ts")}
                           for v in vouches]
        view["tags"] = Counter(tag for j in shown for tag in j["reviews"]["customer"]["tags"]).most_common(3)
        view["reviews"] = [{"thumb": j["reviews"]["customer"]["thumb"], "tags": j["reviews"]["customer"]["tags"],
                            "ts": j["completed_at"], "quarter": j["quarter"], "problem": j["problem"]}
                           for j in sorted(shown, key=lambda j: -j["completed_at"])[:5]]
    return view


# ---- vouching ------------------------------------------------------------

def add_vouch(aid: str, voucher_name: str, voucher_phone: str, circle: str, relation: str, reason: str,
              ts: int | None = None) -> dict:
    art = get_artisan(aid)
    voucher_phone, voucher_name, reason = clean_phone(voucher_phone), voucher_name.strip(), reason.strip()
    check(voucher_name and reason, "Voucher name and a one-line reason are required")
    check(circle in CIRCLES and relation in RELATIONS, "Unknown circle or relationship")
    if voucher_phone == art["phone"]:
        fraud("self_vouch", "high", aid, f"{art['name']} tried to vouch for themselves")
        raise Fail(400, "An artisan cannot vouch for themselves")
    check(not db.get(art["PK"], f"VOUCH#{voucher_phone}"), "This person already vouched for this artisan", 409)
    if len(db.query(f"VOUCHER#{voucher_phone}", index="GSI2")) >= VOUCH_BUDGET:
        fraud("vouch_budget", "medium", voucher_phone, f"{voucher_name} is over the limit of {VOUCH_BUDGET} vouches")
        raise Fail(400, f"{voucher_name} has used all {VOUCH_BUDGET} vouches")
    voucher_user = user_by_phone(voucher_phone)
    if voucher_user and voucher_user.get("artisan_id") and \
            db.get(f"ART#{voucher_user['artisan_id']}", f"VOUCH#{art['phone']}"):
        fraud("reciprocal_vouch", "high", aid, f"{voucher_name} and {art['name']} vouch for each other")
        raise Fail(400, "Two artisans cannot vouch for each other")
    db.put({"PK": art["PK"], "SK": f"VOUCH#{voucher_phone}", "GSI2PK": f"VOUCHER#{voucher_phone}",
            "GSI2SK": art["PK"], "voucher_name": voucher_name, "circle": circle, "relation": relation,
            "reason": reason, "ts": ts or now()})
    return artisan_view(art)


# ---- requests and matching -----------------------------------------------

def shortlist(trade: str, quarter: str, exclude_phone: str | None = None, blocked=()) -> list[dict]:
    """Top 3 available, vouched artisans. One slot is kept for a vouched newcomer with no jobs yet,
    so new people can earn a record."""
    cands = []
    for art in db.query(f"TRADE#{trade}", index="GSI1"):
        if not art["available"] or art["phone"] == exclude_phone or art["id"] in blocked:
            continue
        v = artisan_view(art, quarter=quarter)
        if v["tier"] < 1:  # not bookable until vouched
            continue
        dist = domain.km(QUARTERS[art["quarter"]], QUARTERS[quarter])
        v["km"] = round(dist, 1)
        v["score"] = domain.match_score(dist, None if v["pct"] is None else v["pct"] / 100, v["tier"])
        v["newcomer"] = v["verified_jobs"] == 0
        cands.append(v)
    cands.sort(key=lambda v: -v["score"])
    top = cands[:3]
    newcomers = [v for v in cands if v["newcomer"]]
    if len(cands) > 3 and newcomers and not any(v["newcomer"] for v in top):
        top = cands[:2] + newcomers[:1]
    return top


def create_request(user: dict, trade: str, problem: str, quarter: str, urgency: str) -> dict:
    check(trade in TRADES, "Unknown trade")
    check(any(p["id"] == problem for p in TRADES[trade]["problems"]), "Unknown problem")
    check(quarter in QUARTERS, "Unknown quarter")
    check(urgency in URGENCIES, "Unknown urgency")
    ts = now()
    req = {"PK": f"REQ#{(rid := new_id())}", "SK": "META", "GSI1PK": f"CUST#{user['id']}", "GSI1SK": f"REQ#{ts}",
           "id": rid, "customer_id": user["id"], "trade": trade, "problem": problem, "quarter": quarter,
           "urgency": urgency, "created": ts}
    db.put(req)
    return req


def _own_request(user: dict, rid: str) -> dict:
    req = db.get(f"REQ#{rid}", "META")
    check(req, "Request not found", 404)
    check(req["customer_id"] == user["id"], "Not your request", 403)
    return req


def _customer_jobs(uid: str) -> list[dict]:
    return db.query(f"CUST#{uid}", "JOB#", index="GSI2", newest_first=True)


def matches(user: dict, rid: str) -> dict:
    req = _own_request(user, rid)
    # never re-show an artisan this customer rated thumbs-down
    blocked = {j["artisan_id"] for j in _customer_jobs(user["id"])
               if j["reviews"].get("customer", {}).get("thumb") == "down"}
    keep = ("id", "trade", "problem", "quarter", "urgency", "job_id")
    return {"request": {k: req.get(k) for k in keep}, "band": TRADES[req["trade"]]["band"],
            "matches": shortlist(req["trade"], req["quarter"], user["phone"], blocked)}


# ---- jobs ----------------------------------------------------------------

def book(user: dict, rid: str, aid: str) -> dict:
    req = _own_request(user, rid)
    check(not req.get("job_id"), "This request is already booked", 409)
    art = get_artisan(aid)
    if art["phone"] == user["phone"]:
        fraud("self_dealing", "high", aid, f"{art['name']} tried to book their own service")
        raise Fail(400, "You cannot book yourself")
    check(art["trade"] == req["trade"], "This artisan does not do that trade")
    check(art["available"], "This artisan is busy right now", 409)
    check(artisan_view(art)["tier"] >= 1, "This artisan is not vouched yet")
    ts, jid = now(), new_id()
    # shortcut: the 4-digit code is stored in clear so the customer can see it again;
    # hashing 10,000 possibilities adds nothing, the attempt limit is the real control.
    job = {"PK": f"JOB#{jid}", "SK": "META", "GSI1PK": art["PK"], "GSI1SK": f"JOB#{ts}#{jid}",
           "GSI2PK": f"CUST#{user['id']}", "GSI2SK": f"JOB#{ts}#{jid}",
           "id": jid, "status": "booked", "code": f"{secrets.randbelow(10000):04d}", "code_attempts": 0,
           "customer_id": user["id"], "customer_name": user["name"], "customer_phone": user["phone"],
           "artisan_id": aid, "artisan_name": art["name"], "artisan_phone": art["phone"],
           "trade": req["trade"], "problem": req["problem"], "quarter": req["quarter"],
           "urgency": req["urgency"], "created": ts, "reviews": {}}
    db.put(job)
    db.update(req["PK"], "META", "SET job_id = :j", {":j": jid})
    sms(user["phone"], f"MySureGuy: your job code is {job['code']}. Give it to {art['name']} only when "
                       f"they are at your door. We will never ask you for it.")
    sms(art["phone"], f"MySureGuy: new job from {user['name']} in {req['quarter']}. "
                      f"Ask the customer for the 4-digit code when you arrive.")
    return job


def _job(jid: str) -> dict:
    job = db.get(f"JOB#{jid}", "META")
    check(job, "Job not found", 404)
    return job


def _side(user: dict, job: dict) -> str:
    if user["id"] == job["customer_id"]:
        return "customer"
    check(user.get("artisan_id") == job["artisan_id"], "Not your job", 403)
    return "artisan"


def start_job(aid: str, jid: str, code: str) -> dict:
    """The artisan proves they are at the customer's door by entering the customer's code."""
    job = _job(jid)
    check(job["artisan_id"] == aid, "Not your job", 403)
    check(job["status"] != "locked", "Job locked after too many wrong codes. Call your agent.", 423)
    check(job["status"] == "booked", "This job has already started", 409)
    if not secrets.compare_digest(code.strip().encode(), job["code"].encode()):
        job = db.update(job["PK"], "META", "ADD code_attempts :one", {":one": 1})
        left = MAX_CODE_ATTEMPTS - job["code_attempts"]
        if left <= 0:
            db.update(job["PK"], "META", "SET #s = :s", {":s": "locked"}, {"#s": "status"})
            fraud("code_bruteforce", "high", aid,
                  f"{job['artisan_name']} entered {MAX_CODE_ATTEMPTS} wrong codes on job {jid}")
            raise Fail(423, "Job locked after too many wrong codes. Call your agent.")
        raise Fail(400, f"Wrong code. {left} tries left.")
    return db.update(job["PK"], "META", "SET #s = :s, started_at = :t",
                     {":s": "in_progress", ":t": now()}, {"#s": "status"})


def start_by_phone(phone: str, code: str) -> dict:
    """USSD path: the artisan has no job ID, so pick the booked job the code fits."""
    user = user_by_phone(phone)
    check(user and user.get("artisan_id"), "This phone is not a registered artisan", 403)
    aid = user["artisan_id"]
    booked = [j for j in db.query(f"ART#{aid}", "JOB#", index="GSI1") if j["status"] == "booked"]
    check(booked, "You have no job waiting for a code", 404)
    job = next((j for j in booked if j["code"] == code.strip()), booked[0])
    return start_job(aid, job["id"], code)


def complete_job(user: dict, jid: str) -> dict:
    job = _job(jid)
    check(job["customer_id"] == user["id"], "Only the customer can confirm the work is done", 403)
    check(job["status"] == "in_progress", "The artisan has not entered your code yet", 409)
    job = db.update(job["PK"], "META", "SET #s = :s, completed_at = :t",
                    {":s": "completed", ":t": now()}, {"#s": "status"})
    for phone in (job["customer_phone"], job["artisan_phone"]):
        sms(phone, "MySureGuy: job done. Please rate it now. Ratings stay hidden until you have both rated.")
    return job


def review(user: dict, jid: str, thumb: str, tags: list[str]) -> dict:
    job = _job(jid)
    side = _side(user, job)
    check(job["status"] == "completed", "You can only rate a completed, code-confirmed job", 409)
    check(thumb in ("up", "down"), "Thumb must be up or down")
    allowed = CUSTOMER_TAGS if side == "customer" else ARTISAN_TAGS
    check(all(t in allowed for t in tags), "Unknown tag")
    try:
        return db.update(job["PK"], "META", "SET reviews.#side = :r",
                         {":r": {"thumb": thumb, "tags": sorted(set(tags)), "ts": now()}},
                         {"#side": side}, condition="attribute_not_exists(reviews.#side)")
    except ClientError as e:
        if e.response["Error"]["Code"] != "ConditionalCheckFailedException":
            raise
        raise Fail(409, "You already rated this job")


def job_view(user: dict, job: dict) -> dict:
    side = _side(user, job)
    shown = domain.revealed(job, now())
    keep = ("id", "status", "customer_name", "artisan_id", "artisan_name", "trade", "problem", "quarter",
            "urgency", "created", "started_at", "completed_at")
    view = {k: job.get(k) for k in keep}
    view |= {"side": side, "revealed": shown, "band": TRADES[job["trade"]]["band"],
             "attempts_left": MAX_CODE_ATTEMPTS - job["code_attempts"],
             # double-blind: your own rating always, the other side's only once revealed
             "reviews": {s: r for s, r in job["reviews"].items() if s == side or shown}}
    if side == "customer" and job["status"] == "booked":
        view["code"] = job["code"]
    return view


def get_job(user: dict, jid: str) -> dict:
    return job_view(user, _job(jid))


def my_jobs(user: dict) -> list[dict]:
    jobs = _customer_jobs(user["id"])
    if user.get("artisan_id"):
        jobs += db.query(f"ART#{user['artisan_id']}", "JOB#", index="GSI1", newest_first=True)
    return [job_view(user, j) for j in sorted(jobs, key=lambda j: -j["created"])[:30]]
