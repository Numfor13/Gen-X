"""HTTP API. Thin: validation and auth here, rules in service.py."""
import os
import secrets

import jwt
from fastapi import APIRouter, Depends, Header
from pydantic import BaseModel

from . import db, seed, service
from .ref import QUARTERS, TRADES
from .service import Fail, check

router = APIRouter(prefix="/api")

if db.LOCAL:
    JWT_SECRET = os.environ.get("JWT_SECRET") or secrets.token_hex(32)
    ADMIN_PASSCODE = os.environ.get("ADMIN_PASSCODE", "buea-demo")  # documented in .env.example
else:  # never fall back to a default outside local
    JWT_SECRET, ADMIN_PASSCODE = os.environ["JWT_SECRET"], os.environ["ADMIN_PASSCODE"]

MAX_OTP_ATTEMPTS = 5


# ---- auth ----------------------------------------------------------------

def session(user: dict) -> dict:
    token = jwt.encode({"sub": user["id"], "exp": service.now() + 12 * 3600}, JWT_SECRET, "HS256")
    return {"token": token, "user": service.public_user(user)}


def current_user(x_session_token: str | None = Header(None)) -> dict:
    try:
        uid = jwt.decode(x_session_token or "", JWT_SECRET, algorithms=["HS256"])["sub"]
    except jwt.PyJWTError:
        raise Fail(401, "Please log in")
    user = service.get_user(uid)
    check(user, "Please log in", 401)
    return user


def role(*roles: str):
    def dep(user: dict = Depends(current_user)) -> dict:
        check(user["role"] in roles, "Not allowed for your role", 403)
        return user
    return dep


class OtpStart(BaseModel):
    phone: str


class OtpVerify(BaseModel):
    phone: str
    code: str
    name: str = ""
    quarter: str = "Molyko"


class Persona(BaseModel):
    role: str
    passcode: str = ""


@router.post("/auth/otp/start")
def otp_start(body: OtpStart):
    phone = service.clean_phone(body.phone)
    code = f"{secrets.randbelow(10**6):06d}"
    db.put({"PK": f"OTP#{phone}", "SK": "STATE", "code": code, "attempts": 0,
            "exp": service.now() + 300, "ttl": service.now() + 300})
    service.sms(phone, f"MySureGuy: your login code is {code}. It expires in 5 minutes.")
    return {"sent": True, "known": bool(service.user_by_phone(phone))}


@router.post("/auth/otp/verify")
def otp_verify(body: OtpVerify):
    phone = service.clean_phone(body.phone)
    otp = db.get(f"OTP#{phone}", "STATE")
    check(otp and otp["exp"] > service.now(), "Code expired. Ask for a new one.")
    check(otp["attempts"] < MAX_OTP_ATTEMPTS, "Too many wrong codes. Ask for a new one.", 429)
    if not secrets.compare_digest(body.code.strip().encode(), otp["code"].encode()):
        otp = db.update(otp["PK"], "STATE", "ADD attempts :one", {":one": 1})
        if otp["attempts"] >= MAX_OTP_ATTEMPTS:
            service.fraud("otp_bruteforce", "medium", phone, f"{MAX_OTP_ATTEMPTS} wrong login codes")
        raise Fail(400, "Wrong code")
    db.table.delete_item(Key={"PK": otp["PK"], "SK": "STATE"})
    user = service.user_by_phone(phone)
    if not user:
        check(body.quarter in QUARTERS, "Unknown quarter")
        user = service.create_user(body.name.strip() or "Customer", phone, "customer", body.quarter)
    return session(user)


@router.post("/auth/persona")
def persona(body: Persona):
    """One-click demo logins for the seeded personas."""
    check(body.role in seed.PERSONAS, "Unknown persona")
    if body.role == "admin":
        check(secrets.compare_digest(body.passcode.encode(), ADMIN_PASSCODE.encode()), "Wrong admin passcode", 403)
    return session(service.user_by_phone(seed.PERSONAS[body.role]))


# ---- public --------------------------------------------------------------

@router.get("/health")
def health():
    return {"ok": True}


@router.get("/ref")
def ref():
    return {"trades": [{"id": k, **v} for k, v in TRADES.items()], "quarters": list(QUARTERS)}


@router.get("/artisans/{aid}")
def artisan(aid: str, quarter: str | None = None):
    return service.artisan_view(service.get_artisan(aid), quarter if quarter in QUARTERS else None, full=True)


# ---- me ------------------------------------------------------------------

class Available(BaseModel):
    available: bool


@router.get("/me")
def me(user: dict = Depends(current_user)):
    aid = user.get("artisan_id")
    return {"user": service.public_user(user),
            "artisan": service.artisan_view(service.get_artisan(aid), full=True) if aid else None}


@router.post("/me/available")
def available(body: Available, user: dict = Depends(role("artisan"))):
    service.set_available(user["artisan_id"], body.available)
    return {"available": body.available}


# ---- customer journey ----------------------------------------------------

class NewRequest(BaseModel):
    trade: str
    problem: str
    quarter: str
    urgency: str


class NewJob(BaseModel):
    request_id: str
    artisan_id: str


class Code(BaseModel):
    code: str


class Review(BaseModel):
    thumb: str
    tags: list[str] = []


@router.post("/requests")
def new_request(body: NewRequest, user: dict = Depends(current_user)):
    return {"id": service.create_request(user, **body.model_dump())["id"]}


@router.get("/requests/{rid}/matches")
def request_matches(rid: str, user: dict = Depends(current_user)):
    return service.matches(user, rid)


@router.post("/jobs")
def new_job(body: NewJob, user: dict = Depends(current_user)):
    return service.job_view(user, service.book(user, body.request_id, body.artisan_id))


@router.get("/jobs")
def jobs(user: dict = Depends(current_user)):
    return service.my_jobs(user)


@router.get("/jobs/{jid}")
def job(jid: str, user: dict = Depends(current_user)):
    return service.get_job(user, jid)


@router.post("/jobs/{jid}/start")
def job_start(jid: str, body: Code, user: dict = Depends(role("artisan"))):
    return service.job_view(user, service.start_job(user["artisan_id"], jid, body.code))


@router.post("/jobs/{jid}/complete")
def job_complete(jid: str, user: dict = Depends(current_user)):
    return service.job_view(user, service.complete_job(user, jid))


@router.post("/jobs/{jid}/review")
def job_review(jid: str, body: Review, user: dict = Depends(current_user)):
    return service.job_view(user, service.review(user, jid, body.thumb, body.tags))


# ---- agent ---------------------------------------------------------------

class NewArtisan(BaseModel):
    name: str
    phone: str
    trade: str
    quarter: str


class NewVouch(BaseModel):
    artisan_id: str
    voucher_name: str
    voucher_phone: str
    circle: str
    relation: str
    reason: str


@router.get("/agent/artisans")
def agent_artisans(_: dict = Depends(role("agent", "admin"))):
    return sorted((service.artisan_view(a) for a in service.all_artisans()), key=lambda v: (v["tier"], v["name"]))


@router.post("/agent/artisans")
def agent_register(body: NewArtisan, _: dict = Depends(role("agent"))):
    return service.artisan_view(service.create_artisan(**body.model_dump()))


@router.post("/agent/vouches")
def agent_vouch(body: NewVouch, _: dict = Depends(role("agent"))):
    data = body.model_dump()
    return service.add_vouch(data.pop("artisan_id"), **data)


# ---- admin ---------------------------------------------------------------

@router.get("/admin/fraud")
def admin_fraud(_: dict = Depends(role("admin"))):
    return service.fraud_events()


@router.post("/admin/reset")
def admin_reset(_: dict = Depends(role("admin"))):
    check(db.LOCAL, "Reset is only available on the local demo", 403)
    db.reset_local()
    seed.run()
    return {"reset": True}


# ---- simulator -----------------------------------------------------------

if db.LOCAL:
    # Demo only: anyone can read any simulated inbox, including login codes. Never mounted in prod.
    @router.get("/sim/inbox")
    def sim_inbox(phone: str):
        return service.inbox(service.clean_phone(phone))
