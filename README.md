# MySureGuy

Trust and matching for informal artisans in Buea, Cameroon. Local demo MVP.
Reputation here comes only from jobs the platform can prove happened: the artisan enters the customer's 4-digit code at the door.

All people, phone numbers, jobs and ratings are invented demo data.

## Run it

Two terminals. Needs Node 24 and [uv](https://docs.astral.sh/uv/).

```bash
cd backend && uv run uvicorn app.main:app --port 8000
```

```bash
cd frontend && npm install && npm run dev
```

Open http://localhost:3000. The backend keeps its data in memory and re-seeds on every start.

## Try the journey

1. **Customer** (demo login) → pick a trade → problem → quarter → urgency → **Book** an artisan. You get a 4-digit code.
2. In a second browser tab, **Artisan** (demo login) → open the booked job → enter the code. Five wrong codes lock the job and raise a fraud event.
3. Customer taps **The work is done**. Both sides rate with a thumb and tags. Ratings stay hidden until both have rated, or 72 hours pass.
4. The artisan's public profile (`/p/?a=100100`) now shows one more checked job.

Other screens: **Field agent** registers artisans and records vouches, **Admin** sees fraud events (passcode in `backend/.env.example`), and **Simulator** shows the SMS inbox and a USSD handset.

Booking always goes to whoever you pick. To play both sides with the built-in logins, request a **tailor in Molyko** and book **Ngwa Emmanuel**, who is the Artisan demo login.

## How trust works

| Level | Shape | Needs |
|---|---|---|
| New | outline circle | Phone registered. Cannot be booked. |
| Vouched | green circle | 2 vouches from 2 different circles (trade and community). |
| Verified | indigo 6-point cookie | Vouched, plus 3 code-confirmed jobs. |
| Trusted Pro | ochre 8-point burst | Verified, plus 10 confirmed jobs and at least 80% satisfied. |

- "% satisfied" is the lower bound of a Wilson interval, so a thin record cannot look perfect.
- Matching scores distance, satisfaction and level, and keeps one of three slots for a vouched newcomer.
- Fraud rules: self-vouch, vouch rings, a budget of 5 vouches per person, self-booking, and code guessing.

The rules live in `backend/app/domain.py` and `backend/app/service.py`.

## Layout

- `backend/` FastAPI. One DynamoDB table (`PK`/`SK`, `GSI1`, `GSI2`), run locally on moto's in-memory emulator so the same code can deploy to AWS later.
- `frontend/` Next.js 16 static export, Tailwind v4, Material 3 Expressive tokens generated from three seed colours (`npm run tokens`).
- `reports/`, `research_notes/` the research this is built from.

## Checks

```bash
cd backend && uv run pytest
```

```bash
cd frontend && npx tsc --noEmit && npx eslint . && npm run build
```

## Not built yet

AWS deploy (CDK), photo uploads, WhatsApp, payments and escrow, disputes, Pidgin copy, a skill-test level, dark theme.
SMS and USSD text is English only. The USSD menu has no rating option.
