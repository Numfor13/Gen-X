"""Demo data for Buea. Every person, phone number, job and rating here is invented."""
import random

from . import db, service
from .ref import ARTISAN_TAGS, CUSTOMER_TAGS, QUARTERS, TRADES

DAY = 86400
PERSONAS = {"customer": "+237670000001", "artisan": "+237670000002",
            "agent": "+237670000003", "admin": "+237670000004"}

# (name, trade, quarter, vouches, jobs, share thumbs-up)
ARTISANS = [
    ("Ngwa Emmanuel", "tailor", "Molyko", 2, 14, 0.95),  # the artisan persona
    ("Enow Patience", "tailor", "Molyko", 2, 26, 0.97),
    ("Mbah Collins", "tailor", "Bonduma", 2, 6, 0.85),
    ("Limunga Grace", "tailor", "Great Soppo", 2, 0, 1.0),  # vouched newcomer
    ("Tabi Roland", "tailor", "Mile 17", 1, 0, 1.0),  # one vouch short: not bookable yet
    ("Fon Derick", "electrician", "Molyko", 2, 19, 0.93),
    ("Ayuk Samuel", "electrician", "Buea Town", 2, 8, 0.80),
    ("Nkeng Brenda", "electrician", "Sandpit", 2, 3, 1.0),
    ("Epie Martin", "electrician", "Muea", 2, 0, 1.0),
    ("Tanyi Joseph", "plumber", "Great Soppo", 2, 12, 0.90),
    ("Mokake Peter", "plumber", "Bokwango", 2, 4, 0.75),
    ("Ndive Hans", "plumber", "Mile 16", 2, 0, 1.0),
    ("Achu Divine", "mechanic", "Mile 17", 2, 22, 0.94),
    ("Ebong Felix", "mechanic", "Molyko", 2, 5, 0.80),
    ("Njie Kingsley", "mechanic", "Muea", 0, 0, 1.0),  # registered only
    ("Sama Victor", "mason", "Bonduma", 2, 11, 0.91),
    ("Ekema Paul", "mason", "Buea Town", 2, 2, 1.0),
    ("Tambe Julius", "mason", "Clerks' Quarters", 2, 0, 1.0),
    ("Orock Bertrand", "carpenter", "Sandpit", 2, 16, 0.94),
    ("Ngole Cyril", "carpenter", "Great Soppo", 2, 7, 0.86),
    ("Elad Thomas", "carpenter", "Bokwango", 1, 0, 1.0),
    ("Mbua Clarisse", "hairdresser", "Molyko", 2, 28, 0.96),
    ("Nalova Edith", "hairdresser", "Clerks' Quarters", 2, 9, 0.89),
    ("Ewune Sandra", "hairdresser", "Mile 16", 2, 1, 1.0),
]

CUSTOMERS = ["Enanga Mbua", "Besong Carine", "Tiku Lawrence", "Eyong Marie", "Ndoh Clement", "Arrey Judith",
             "Forbin Eric", "Ngeh Vivian", "Lyonga Albert", "Ashu Rose", "Molua George", "Nfor Blessing"]


def run():
    rnd = random.Random(237)
    now = service.now()
    quarters = list(QUARTERS)

    customers = [service.create_user(name, f"+2376700010{i:02d}" if i else PERSONAS["customer"],
                                     "customer", quarters[i % len(quarters)])
                 for i, name in enumerate(CUSTOMERS)]
    service.create_user("Agent Ebai", PERSONAS["agent"], "agent", "Molyko")
    service.create_user("Admin", PERSONAS["admin"], "admin", "Molyko")

    for i, (name, trade, quarter, vouches, jobs, good) in enumerate(ARTISANS):
        phone = PERSONAS["artisan"] if i == 0 else f"+2376700020{i:02d}"
        art = service.create_artisan(name, phone, trade, quarter, aid=str(100100 + i * 37),
                                     since=now - rnd.randint(200, 700) * DAY)
        # One trade master per trade and one community leader per quarter keeps every voucher within budget.
        t, q = list(TRADES).index(trade), quarters.index(quarter)
        circle_vouches = [
            (f"Head of the Buea {TRADES[trade]['en'].lower()}s' association", f"+2376700030{t:02d}", "trade", "trained",
             f"Trained {name.split()[0]} in my workshop and still checks their work."),
            (f"Quarter head, {quarter}", f"+2376700040{q:02d}", "community", "quarter",
             f"Lives and works in {quarter}. People here know them."),
        ]
        for v in circle_vouches[:vouches]:
            service.add_vouch(art["id"], *v, ts=now - rnd.randint(60, 190) * DAY)

        problems = [p["id"] for p in TRADES[trade]["problems"]]
        for n in range(jobs):
            # a few loyal customers come back, the rest are spread out
            cust = customers[rnd.randrange(3)] if rnd.random() < 0.3 else rnd.choice(customers)
            done = now - rnd.randint(4, 300) * DAY - rnd.randint(0, DAY)
            thumb = "up" if rnd.random() < good else "down"
            reviews = {"artisan": {"thumb": "up", "tags": [ARTISAN_TAGS[0]], "ts": done + 3600}}
            if rnd.random() < 0.9:  # some customers never rate
                tags = rnd.sample(CUSTOMER_TAGS, rnd.randint(1, 3)) if thumb == "up" else []
                reviews["customer"] = {"thumb": thumb, "tags": sorted(tags), "ts": done + 7200}
            jid = f"seed{i:02d}{n:02d}"
            db.put({"PK": f"JOB#{jid}", "SK": "META", "GSI1PK": art["PK"], "GSI1SK": f"JOB#{done}#{jid}",
                    "GSI2PK": f"CUST#{cust['id']}", "GSI2SK": f"JOB#{done}#{jid}",
                    "id": jid, "status": "completed", "code": "0000", "code_attempts": 0,
                    "customer_id": cust["id"], "customer_name": cust["name"], "customer_phone": cust["phone"],
                    "artisan_id": art["id"], "artisan_name": name, "artisan_phone": phone,
                    "trade": trade, "problem": rnd.choice(problems), "quarter": cust["quarter"],
                    "urgency": "today", "created": done - 7200, "started_at": done - 3600,
                    "completed_at": done, "reviews": reviews})

    service.fraud("reciprocal_vouch", "high", "100174", "Demo example: two tailors tried to vouch for each other",
                  ts=now - 9 * DAY)
    service.fraud("code_bruteforce", "high", "100322", "Demo example: 5 wrong job codes entered on one job",
                  ts=now - 3 * DAY)
