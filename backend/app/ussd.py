"""USSD menu using the aggregator callback contract (form post with sessionId, phoneNumber, text;
reply starts with CON to continue or END to finish). Stateless: the whole path is in `text`."""
from urllib.parse import parse_qs

from fastapi import APIRouter, Request
from fastapi.responses import PlainTextResponse

from . import service
from .ref import QUARTERS, TRADES

router = APIRouter(prefix="/api")
TIERS = ("New", "Vouched", "Verified", "Trusted Pro")


def _menu(title: str, options) -> str:
    return "CON " + title + "\n" + "\n".join(f"{i}. {o}" for i, o in enumerate(options, 1))


def _pick(options: list, choice: str):
    return options[int(choice) - 1] if choice.isdigit() and 1 <= int(choice) <= len(options) else None


def _line(v: dict) -> str:
    score = f"{v['pct']}% satisfied" if v["pct"] is not None else "not rated yet"
    return f"{v['name']} ID {v['id']}: {TIERS[v['tier']]}, {v['verified_jobs']} jobs checked, {score}"


def reply(phone: str, parts: list[str]) -> str:
    trades, quarters = list(TRADES), list(QUARTERS)
    match parts:
        case []:
            return _menu("MySureGuy", ["Find artisan", "Check artisan ID", "Enter customer code",
                                       "Available on/off"])
        case ["1"]:
            return _menu("Which trade?", [TRADES[t]["en"] for t in trades])
        case ["1", t] if _pick(trades, t):
            return _menu("Your quarter?", quarters)
        case ["1", t, q] if _pick(trades, t) and _pick(quarters, q):
            found = service.shortlist(_pick(trades, t), _pick(quarters, q), exclude_phone=phone)
            return "END " + ("\n".join(_line(v) for v in found) or "Nobody free right now. Try a nearby quarter.")
        case ["2"]:
            return "CON Enter the 6-digit artisan ID"
        case ["2", aid]:
            return "END " + _line(service.artisan_view(service.get_artisan(aid)))
        case ["3"]:
            return "CON Enter the 4-digit code from your customer"
        case ["3", code]:
            job = service.start_by_phone(phone, code)
            return f"END Code OK. Job for {job['customer_name']} has started."
        case ["4"]:
            user = service.user_by_phone(phone)
            service.check(user and user.get("artisan_id"), "This phone is not a registered artisan")
            art = service.get_artisan(user["artisan_id"])
            service.set_available(art["id"], not art["available"])
            return "END You are now " + ("BUSY" if art["available"] else "AVAILABLE")
    return "END Invalid choice"


@router.post("/ussd", response_class=PlainTextResponse)
async def ussd(request: Request):
    form = parse_qs((await request.body()).decode(), keep_blank_values=True)
    phone, text = form.get("phoneNumber", [""])[0], form.get("text", [""])[0]
    try:
        return reply(phone, [p for p in text.split("*") if p])
    except service.Fail as e:
        return "END " + e.msg
