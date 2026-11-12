"""Full journey and fraud rules through the HTTP API, on the seeded in-memory table."""
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.seed import PERSONAS

api = TestClient(app)
PERSONA_ARTISAN = "100100"  # Ngwa Emmanuel, tailor, Molyko


def login(role, passcode=""):
    r = api.post("/api/auth/persona", json={"role": role, "passcode": passcode})
    assert r.status_code == 200, r.text
    return {"X-Session-Token": r.json()["token"]}


@pytest.fixture(scope="module")
def customer():
    return login("customer")


@pytest.fixture(scope="module")
def artisan():
    return login("artisan")


@pytest.fixture(scope="module")
def agent():
    return login("agent")


def book(customer, artisan_id=PERSONA_ARTISAN):
    rid = api.post("/api/requests", headers=customer, json={
        "trade": "tailor", "problem": "alter", "quarter": "Molyko", "urgency": "today"}).json()["id"]
    r = api.post("/api/jobs", headers=customer, json={"request_id": rid, "artisan_id": artisan_id})
    assert r.status_code == 200, r.text
    return r.json()


def test_shortlist_is_vouched_available_and_keeps_a_newcomer_slot(customer):
    rid = api.post("/api/requests", headers=customer, json={
        "trade": "tailor", "problem": "sew", "quarter": "Molyko", "urgency": "week"}).json()["id"]
    data = api.get(f"/api/requests/{rid}/matches", headers=customer).json()
    found = data["matches"]
    assert len(found) == 3 and data["band"] == [3000, 15000]
    assert all(m["tier"] >= 1 for m in found)
    assert "Tabi Roland" not in [m["name"] for m in found]  # only one vouch
    assert sum(m["newcomer"] for m in found) == 1


def test_full_journey_updates_reputation(customer, artisan):
    before = api.get(f"/api/artisans/{PERSONA_ARTISAN}").json()
    job = book(customer)
    jid, code = job["id"], job["code"]
    assert len(code) == 4

    # the artisan never sees the code, and cannot rate before the job is confirmed
    assert "code" not in api.get(f"/api/jobs/{jid}", headers=artisan).json()
    assert api.post(f"/api/jobs/{jid}/review", headers=artisan, json={"thumb": "up"}).status_code == 409
    assert api.post(f"/api/jobs/{jid}/complete", headers=customer).status_code == 409

    wrong = "0000" if code != "0000" else "1111"
    assert api.post(f"/api/jobs/{jid}/start", headers=artisan, json={"code": wrong}).status_code == 400
    assert api.post(f"/api/jobs/{jid}/start", headers=artisan, json={"code": code}).json()["status"] == "in_progress"
    assert api.post(f"/api/jobs/{jid}/complete", headers=customer).json()["status"] == "completed"

    # double-blind: the artisan cannot see the customer's rating until they rate too
    r = api.post(f"/api/jobs/{jid}/review", headers=customer, json={"thumb": "up", "tags": ["on_time", "clean"]})
    assert r.status_code == 200, r.text
    seen = api.get(f"/api/jobs/{jid}", headers=artisan).json()
    assert seen["revealed"] is False and "customer" not in seen["reviews"]
    assert api.get(f"/api/artisans/{PERSONA_ARTISAN}").json()["up"] == before["up"]

    assert api.post(f"/api/jobs/{jid}/review", headers=customer, json={"thumb": "down"}).status_code == 409
    assert api.post(f"/api/jobs/{jid}/review", headers=artisan,
                    json={"thumb": "up", "tags": ["paid_as_agreed"]}).json()["revealed"] is True

    after = api.get(f"/api/artisans/{PERSONA_ARTISAN}").json()
    assert after["verified_jobs"] == before["verified_jobs"] + 1
    assert after["up"] == before["up"] + 1


def test_wrong_codes_lock_the_job_and_raise_fraud(customer, artisan):
    job = book(customer)
    wrong = "0000" if job["code"] != "0000" else "1111"
    codes = [api.post(f"/api/jobs/{job['id']}/start", headers=artisan, json={"code": wrong}).status_code
             for _ in range(5)]
    assert codes == [400, 400, 400, 400, 423]
    assert api.post(f"/api/jobs/{job['id']}/start", headers=artisan,
                    json={"code": job["code"]}).status_code == 423
    events = api.get("/api/admin/fraud", headers=login("admin", "buea-demo")).json()
    assert events[0]["rule"] == "code_bruteforce"


def test_cannot_book_yourself(artisan):
    rid = api.post("/api/requests", headers=artisan, json={
        "trade": "tailor", "problem": "sew", "quarter": "Molyko", "urgency": "now"}).json()["id"]
    r = api.post("/api/jobs", headers=artisan, json={"request_id": rid, "artisan_id": PERSONA_ARTISAN})
    assert r.status_code == 400


def test_vouch_rules(agent):
    new = api.post("/api/agent/artisans", headers=agent, json={
        "name": "Test Tailor", "phone": "+237699000001", "trade": "tailor", "quarter": "Muea"}).json()
    assert new["tier"] == 0 and new["next"] == {"kind": "vouches", "n": 2}

    def vouch(artisan_id, phone, circle="trade"):
        return api.post("/api/agent/vouches", headers=agent, json={
            "artisan_id": artisan_id, "voucher_name": "Pa Test", "voucher_phone": phone,
            "circle": circle, "relation": "trained", "reason": "Trained them"})

    assert vouch(new["id"], "+237699000001").status_code == 400  # self
    assert vouch(new["id"], "+237699000010").json()["tier"] == 0
    assert vouch(new["id"], "+237699000011").json()["tier"] == 0  # same circle twice
    assert vouch(new["id"], "+237699000012", "community").json()["tier"] == 1
    assert vouch(new["id"], "+237699000010").status_code == 409  # duplicate

    # reciprocal: the new tailor vouched for the persona artisan, who now tries to vouch back
    assert vouch(PERSONA_ARTISAN, "+237699000001").status_code == 200
    assert vouch(new["id"], PERSONAS["artisan"]).status_code == 400

    # budget: the tailors' association master already holds 5 vouches from the seed
    assert vouch(new["id"], "+237670003000").status_code == 400


def test_roles_and_otp_login():
    assert api.get("/api/jobs").status_code == 401
    assert api.get("/api/admin/fraud", headers=login("customer")).status_code == 403
    assert api.post("/api/auth/persona", json={"role": "admin", "passcode": "nope"}).status_code == 403

    phone = "+237699000099"
    assert api.post("/api/auth/otp/start", json={"phone": phone}).json()["known"] is False
    assert api.post("/api/auth/otp/verify", json={"phone": phone, "code": "000000x"}).status_code == 400
    code = api.get("/api/sim/inbox", params={"phone": phone}).json()[0]["text"].split(" is ")[1][:6]
    r = api.post("/api/auth/otp/verify", json={"phone": phone, "code": code, "name": "Newcomer"})
    assert r.json()["user"]["role"] == "customer"


def otp_login(phone, name="Self Joiner"):
    api.post("/api/auth/otp/start", json={"phone": phone})
    code = api.get("/api/sim/inbox", params={"phone": phone}).json()[0]["text"].split(" is ")[1][:6]
    r = api.post("/api/auth/otp/verify", json={"phone": phone, "code": code, "name": name, "quarter": "Muea"})
    return {"X-Session-Token": r.json()["token"]}


def test_self_registration(customer, agent):
    me = otp_login("+237699000200")
    r = api.post("/api/artisans/join", headers=me, json={"trade": "mechanic", "quarter": "Muea"})
    assert r.status_code == 200, r.text
    user = r.json()["user"]
    assert user["role"] == "artisan" and user["name"] == "Self Joiner"
    me = {"X-Session-Token": r.json()["token"]}

    profile = api.get("/api/me", headers=me).json()["artisan"]
    assert profile["tier"] == 0 and profile["trade"] == "mechanic"
    assert api.post("/api/artisans/join", headers=me, json={"trade": "tailor", "quarter": "Muea"}).status_code == 409

    # not bookable until vouched
    rid = api.post("/api/requests", headers=customer, json={
        "trade": "mechanic", "problem": "service", "quarter": "Muea", "urgency": "week"}).json()["id"]
    found = api.get(f"/api/requests/{rid}/matches", headers=customer).json()["matches"]
    assert user["artisan_id"] not in [m["id"] for m in found]
    assert api.post("/api/jobs", headers=customer, json={"request_id": rid, "artisan_id": user["artisan_id"]}).status_code == 400

    # the agent sees the new artisan and can vouch for them
    assert user["artisan_id"] in [a["id"] for a in api.get("/api/agent/artisans", headers=agent).json()]

    assert api.post("/api/artisans/join", headers=agent, json={"trade": "mason", "quarter": "Muea"}).status_code == 403
    assert api.post("/api/artisans/join", json={"trade": "mason", "quarter": "Muea"}).status_code == 401
    bad = otp_login("+237699000201")
    assert api.post("/api/artisans/join", headers=bad, json={"trade": "pilot", "quarter": "Muea"}).status_code == 400


def test_ussd_menu():
    def dial(text, phone="+237670000001"):
        return api.post("/api/ussd", data={"sessionId": "s1", "phoneNumber": phone, "text": text}).text

    assert dial("").startswith("CON MySureGuy")
    assert "Tailor" in dial("1")
    assert "Molyko" in dial("1*1")
    assert "jobs checked" in dial("1*1*1")
    assert "not rated yet" in dial("2*100211")  # vouched newcomer with no ratings
    assert "Ngwa Emmanuel" in dial("2*100100")
    assert dial("2*999").startswith("END No artisan")
    assert dial("4", PERSONAS["artisan"]) == "END You are now BUSY"
    assert dial("4", PERSONAS["artisan"]) == "END You are now AVAILABLE"
    assert dial("9") == "END Invalid choice"
