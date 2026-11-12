# Handoff: Cameroon artisan trust platform research

Last updated: 2026-11-12 (checkpoint 1: research launched)

## Goal
Run extensive research (500+ sources in total) for a trust and service-matching platform for informal artisans in Cameroon. Backend: AWS + Python. Cover: the problem and its context, comparable platforms, skill verification and reputation, anti-fraud, low-literacy channels, system design, security and law, business model and monetization, launch model. Final deliverable: a PDF report.

## Folder layout (working dir: C:\Users\Bryan\OneDrive\Documents\WORK\SMCON)
- `research_notes/Cameroon artisan trust platform/`: one notes file per research stream
- `reports/`: final report (`Cameroon artisan trust platform.md`, then `.pdf`)

## Research streams (each targets 60+ sources)
| # | Notes file | Topic | Status |
|---|---|---|---|
| 01 | 01_cameroon_problem_context.md | Cameroon informal sector, pain points, connectivity, languages, pilot trade/town pick | DONE (88 sources). Pilot pick: domestic electricians in north Douala (Bonamoussadi/Makepe/Kotto); runner-up tailors in Molyko, Buea. New competitor: QwickServices (Douala, Apr 2026) |
| 02 | 02_comparable_platforms.md | Comparable platforms worldwide and in Africa, failures, lessons | DONE (100 sources). Key cases: Lynk failure, Kandua success, OZOservir Gabon. Note: shared web-search cap (~200) was hit mid-run, so later streams may rely on WebFetch |
| 03 | 03_skill_verification_reputation.md | Skill proof without certificates, peer vouching, reputation scoring | DONE (138 sources). Proposes a 5-tier badge ladder and thumbs-up/down Bayesian score. Gaps: Kiva underwriting, Afrobarometer trust data, Cameroon guild customs |
| 04 | 04_anti_fraud.md | Fake reviews, Sybil/collusion, KYC, Cameroon scams | DONE (119 sources). Gaps: rating discrimination, Jiji scams, Prembly/Dojah coverage, BEAC escrow licensing |
| 05 | 05_channels_low_literacy_ux.md | USSD/SMS/WhatsApp/IVR/QR, low-literacy UX, costs | DONE (73 sources). Africa's Talking not in Cameroon; USSD via operators/LMT/Nexah/#237# (Orange 2020: 500k XAF setup, 10 XAF/session); WhatsApp per-message since Jul 2025; no Pidgin ASR anywhere. Recommended mix: artisans USSD+voice+agents, customers WhatsApp+QR web profile |
| 06 | 06_system_design_aws_python.md | AWS + Python reference architecture, matching, scaling, cost | DONE (112 sources). FastAPI on Lambda (Web Adapter) + Aurora PG/PostGIS/H3 + DynamoDB + EventBridge/SQS/Step Functions; eu-west-3 primary; Pinpoint EOS 30 Oct 2026 -> End User Messaging; no AWS USSD, so local aggregator needed. Gaps: Paris/Cape Town pricing, Cameroon SMS/WhatsApp unit costs, 2Africa landing |
| 07 | 07_security_legal_compliance.md | Law 2024/017, cybercrime, CEMAC payments, AWS security | DONE (68 sources). Law 2024/017 in force 23 Jun 2026 but DPA not yet constituted; AWS hosting = cross-border transfer needing prior authorisation; Art. 65 criminalises profiling (legal opinion needed on scoring); platform must not hold funds (CEMAC 04/18) so escrow goes via licensed PSP. Gaps: labour, tax, company registration, insurance |

**Checkpoint 4 (COMPLETE): report (801 sources) and 64-page PDF in reports/. PDF built by converting markdown to HTML (uv run --with markdown) and printing with headless Chrome.**

**Checkpoint 2 (all research done):** ~843 citations across 9 files (some overlap). Web-search cap exhausted, so no extra research round; gaps are listed as open questions in the report. NEXT: report writer -> reports/Cameroon artisan trust platform.md, then PDF.
| 08 | 08_business_model_monetization.md | Revenue model (no upfront artisan fee), MoMo/OM rails, unit economics, funding | DONE (87 sources). "Protection first": customer fee 8-10%, artisan commission 0% then 5-8% from escrow payouts; B2B and diaspora milestone escrow as main profit. Gaps: XAF job prices, FB ad CPM, willingness to pay, SMIG confirmation |
| 09 | 09_launch_go_to_market.md | Cold start, local trust partners, pilot KPIs, expansion | DONE (58 sources; search cap hit). Supply-first atomic network of 25-40 artisans, 12-week WhatsApp concierge pilot in Douala (Bonamoussadi/Kotto), 5 expansion rings, 8-step demo script. Gaps: Gozem/Yango Cameroon history, GSMA/CGAP agent reports, chiefs/njangi academic work, diaspora figures |

## How to resume if interrupted
1. Look in `research_notes/Cameroon artisan trust platform/` and see which of the 9 files exist and look complete (each should end with a numbered source list).
2. Re-run research only for missing or truncated streams. The topic briefs are in the table above.
3. Synthesize all the notes into `reports/Cameroon artisan trust platform.md`, covering the problem, the solution design that answers the 3 core questions, the demo journey, the system design, trust and anti-fraud, security and law, the business plan, the launch plan, and a combined bibliography.
4. Convert the report to PDF in `reports/` (pandoc or Python, e.g. markdown + weasyprint/reportlab).

---

# Phase 2: MVP build pack (started 2026-11-12)

**Goal:** prepare all research, specs and resources so a separate model (Fable) can build a full-day MVP that is live on AWS.
**Region (user decision): us-east-1 for all AWS resources.**
**Stack (mandated):** Python backend on AWS (core); React + Next.js frontend; Material 3 Expressive as the design engine. Multi-trade, not just electricians (electricians in north Douala lead the pilot). Minimise cost.

**AWS account facts (read-only audit, 12 Nov 2026):**
- Account 340752829171, IAM user Salle_Bryan with AdministratorAccess. Default region is us-east-1.
- CDK 2.1140 is installed and bootstrapped in us-east-1 only (eu-west-3 is not bootstrapped). af-south-1 is not opted in. The SAM CLI is broken on this machine, so use CDK (Python).
- About $114 of credits remain. Budgets already exist.
- SMS (End User Messaging) and SES are both in sandbox in eu-west-3.
- Many unrelated stacks exist in us-east-1 (atria-*, Obsidian*, RedRising*, rest-weather-api). DO NOT TOUCH them; use a distinct stack prefix.

**Local tooling:** Node 24, pnpm 10.20, uv. An `mvp/` scaffold exists (pyproject with fastapi/uvicorn/qrcode/mangum, plus uv venv). Restructure it freely.

**Research notes:** `research_notes/Artisan platform MVP build pack/`

| # | File | Topic | Status |
|---|---|---|---|
| 01 | 01_material3_expressive.md | M3 Expressive foundations, components, Next.js implementation path | DONE (~90 sources; exact tokens from androidx Compose sources. No official web Expressive lib: build thin layer with Next 16 + Tailwind v4 + material-color-utilities (pass spec 2025) + React Aria + Motion + shape-morph + Material Symbols subset) |
| 02 | 02_platform_ux_teardown_africa_emerging.md | 50 African/emerging platforms UX teardown | DONE (50 platforms, ~155 sources; none uses peer vouching; Douala rivals do not explain verification) |
| 03 | 03_platform_ux_teardown_global.md | 50 global trust/marketplace platforms UX teardown | DONE (50 platforms, 138 sources; top 30 patterns + 10 anti-patterns mapped to screens) |
| 04 | 04_design_inspiration_moodboard.md | Dribbble/Pinterest/Behance moodboard by screen | DONE (~145 refs, 152 URLs; Dribbble blocked shot pages, so notes are mostly title-based. Direction: ochre #B5562B primary, forest #1F6B4A secondary, indigo #2E4A9E for verified; shape-changing tier badges; flip QR card. Pinterest/Mobbin not covered) |
| 05 | 05_aws_low_cost_mvp_architecture.md | Lowest-cost live AWS blueprint (CDK Python) | DONE (70+ sources). us-east-1, stack ArtisanMvp-prod: Next static export S3+CloudFront, /api/* -> Lambda Function URL (FastAPI+Mangum, py3.13 arm64, uv cross-platform bundling), DynamoDB single table, demo JWT auth; SMS/WhatsApp/USSD simulated. ~$0.45/mo demo. ACTION: Lambda concurrency quota is 10, request increase to 1000. SMS sandbox $1 cap |
| 06 | 06_domain_localisation_seed_data.md | Trade taxonomy, quarters, EN/FR/Pidgin copy, seed JSON | running |

**Next after research:** write the build pack into `build-pack/` (PRD, architecture, data model, API contract, design system, screens, build plan with acceptance criteria, CLAUDE.md for the repo, seed JSON) so it can be handed to Fable.
