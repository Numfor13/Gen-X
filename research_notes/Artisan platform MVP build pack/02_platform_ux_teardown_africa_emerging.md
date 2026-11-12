# UX and Product Teardown: 50 Artisan, Home-Services, Gig, Classifieds, Mobility and Mobile-Money Platforms (Africa and Emerging Markets)

Research date: 12 November 2026. Scope: UX and trust flows (not funding). Written for the team building the Douala MVP demo journey: artisan registered and verified (peer vouching + proof of work) → customer requests → system matches → job ends with rating/proof recorded.

Method and caveats:
- Sources are app-store listings, company help centres and FAQ pages, product blogs, press, UX case studies, and the earlier notes `02_comparable_platforms.md` and `05_channels_low_literacy_ux.md` (facts reused from them are cited to their original URLs, not repeated in depth).
- Many help centres (SweepSouth, Jiji, Glovo, Urban Company engineering blog, Devpost) returned HTTP 403/502 to direct fetch. Where that happened, facts come from the search engine's extract of that exact page; the page URL is still cited. Treat these as slightly lower confidence than a full read.
- Mobbin, PageFlows and ScreensDesign are login-walled and could not be used. No screenshots were inspected directly; flow descriptions come from text sources.
- "Not found" means I searched and found no reliable source, not that the feature doesn't exist.
- Numbers in square brackets refer to the numbered source list at the end.

**Substitutions (to keep 50 relevant platforms):**
- *Jumia Services* is Jumia's logistics arm (formerly AIG X), not a home-services product [118]. Kept as a short entry but **replaced in the count** by **Wrkman** (Nigeria).
- *Servicemann* could not be found under that name. Replaced by **ServiceDey** (Nigeria).
- *Prowork* appears only as a 2012 Apps4Africa winner, with no current product found. Replaced by **Gotwork** (Nigeria, NIN-verified).
- *Zolve* is a credit product for migrants, not a trust tool for informal workers. Replaced by **inDrive** (customer-proposed price, very relevant to informal price negotiation).
- *Fixam* exists only as a hackathon project page (Devpost). Kept and labelled as a project.
- *Kazi Mtaani* is a government public-works programme, not a marketplace. Kept because its registration and verification flow is directly relevant to vouching.
- Three platforms were added so the count reaches 50 (the brief listed 47): **Gombo** (Côte d'Ivoire), **LabourHunt** (Ghana) and **Ayuda** (Ghana).

---

## Q1. Cameroon and Francophone Africa: artisan, domestic-work and classifieds platforms

### Takeaway
Cameroon's direct competitors (QwickServices, Maibeta, Nofey) all say they offer "verified providers + Mobile Money + ratings", but none publicly explains *how* verification works. QwickServices is the most complete: two apps, job bidding, a wallet with funds released on customer confirmation, and four cities since April 2026. Senegal's Whooti is the best Francophone reference for a **document-check + SMS-OTP + in-app contract** flow, and Jiji has the clearest model for **separate badge types** (ID-verified vs. agent-visited). In this group, nobody uses peer vouching, voice, or Pidgin.

### Cited Findings

**QwickServices (Douala; Cameroon/CEMAC). Status: live since 20 Apr 2026**
- Channel: two native apps, customer and provider, on iOS. No Android listing or independent reviews were found [1][2][3].
- Scope: launched in Douala 20 Apr 2026, now in Douala, Yaoundé, Buea and Bamenda (parts of Limbe). It claims ~1,000 "verified providers" and over 2,000 service categories, from plumbers to legal consultants [1].
- Worker onboarding and verification: the provider app lets workers accept requests "based on your availability" [3]. The launch article does not describe any verification step [1].
- Request model: discover, book, pay and track in real time. "Job bidding" is listed as a feature but not described [1].
- Payment and completion: digital wallets; "funds are held securely and only released to the provider" after the customer confirms completion [1].
- Rating: user evaluation plus a performance-tracking system. The project pitches "digital work records and verified reviews" for informal-sector youth [1].
- Localisation: not stated. The customer App Store listing promotes end-to-end encryption of customer data [2].
- Copy: escrow-on-confirmation, digital work record framing. Avoid: 2,000+ categories at launch (too wide for trust density), and unexplained "verified" claims.

**Maibeta (Cameroon). Status: early stage, TEF-funded (Sep 2026)**
- Pitched as an on-demand marketplace for "verified technicians" (electrical, plumbing, carpentry, construction, facility management), with automated job matching, a structured provider workflow and digital payments [4].
- It names the Cameroonian pain points: inconsistent pricing, limited accountability, uncertain quality, reliance on personal recommendations [4].
- No screens, verification method or channel details are public. Gap.

**Nofey (Cameroon). Status: early stage (Feb 2026)**
- Channel: mobile app [5].
- Worker onboarding: providers create a professional profile to "showcase their skills" [5].
- Verification: none described. Trust comes from reviews, ratings and profile information [5].
- Request model: search for a service and a nearby provider, then book in-app. Providers receive and manage requests in the app [5].
- Messaging and payment: in-app chat before booking; the client pays by Mobile Money, and providers are "paid quickly through the platform" [5].
- Categories: plumbing, electrical, hairdressing, mechanics, carpentry, painting, air-conditioning, locksmithing, gardening, masonry (close to our trade list) [5].
- Copy: chat-before-booking. Avoid: reviews as the only trust signal (the cold-start problem for new artisans).

**OZOservir (Libreville, Gabon). Status: launch planned for end of Q1 2026; live status unconfirmed**
- Acquisition: field-only. An 8-person team recruited ~500 early adopters in neighbourhoods, markets and junctions using demos and **QR codes** [6].
- Trust: KYC profile verification planned; "avis vérifiés" (verified reviews); geolocated provider search; internal chat before any transaction [6].
- Low-data: built to work on limited connections [6].
- Pricing tiers: free at first, then 1,900–5,000 FCFA/month. The **verified badge sits inside the paid Pro tier**, alongside stats and a storefront. Estimated 3–4% commission on integrated mobile payments [6].
- Copy: QR-led field onboarding, low-bandwidth build. Avoid: selling the "verified" badge as a subscription perk (see anti-patterns).

**Whooti (Senegal; domestic workers). Status: operating (Oct 2026)**
- Channel: mobile-only app, with SMS for OTP [7].
- Worker onboarding: free registration. 2,000 FCFA is deducted from the first salary, with no ongoing commission. The sign-up form was **simplified after user feedback** [7].
- Verification: Whooti staff check documents and validate each file before the profile appears. Every phone number is verified [7].
- Profile/trust card: experience, **references**, availability [7].
- Customer flow: (1) create account, confirm phone with SMS code → (2) search by need (nanny, housekeeper, driver) and compare verified profiles → (3) chat in-app (kept as a record) → (4) interview → (5) **sign the contract in-app** → (6) follow up on the work and payments in-app [7].
- Pricing: flat 10,000 FCFA per contract for the employer. Orange Money integration in progress [7].
- Ratings: not mentioned [7].
- Copy: staff-validated file before listing, references on the profile, in-app agreement as the "job record", flat fee instead of a commission. Gap: no rating/dispute information.

**CoinAfrique (Francophone classifieds, incl. Cameroon; acquired by Autochek)**
- Channel: app and web. At launch it was 100% geolocated, free, usable across the CFA zone, and supported posting an ad or a *call for tenders* (appel d'offres) [9]. A "lite" mode was added for low bandwidth [10]. Autochek acquired the company [11].
- Services vertical: Cameroon's site has "Travaux, bricolage et jardinage", "Ménage & Cuisine" and "Babysitting et nounou" categories [8].
- Trust: safety tips ("don't pay before checking", meet in public) and a "Top annonces" placement badge. No seller verification, ratings or buyer protection were found [8].
- Messaging: live chat between buyers and sellers [9].
- Copy: lite mode, reverse "call for tenders" posting (a customer posts a need and sellers respond). Avoid: paid prominence ("Top annonces") that looks like a trust badge.

**Jiji (Nigeria, Kenya, Ghana etc.; presence in Cameroon unconfirmed)**
- Verified ID badge:
  - Shown on the seller profile and on their ads.
  - Verification authenticates an ID document and matches it with a selfie, via SmileID.
  - Requested from profile settings, and only offered once the user has at least one ad.
  - **Requires an active paid Boost package**: if the package lapses the badge disappears, although the passed verification is kept [12][13].
- Separate "Verified" store badge:
  - Awarded after an **offline agent visits the store**.
  - Editing key details (all photos, or the address) can remove it [16].
- Feedback:
  - Any user can leave feedback after **interacting** with a seller, whether or not a deal happened [14].
  - All feedback is moderated for relevance before publication [15].
  - Feedback calling a seller a scammer is **converted into a complaint and triggers a security check** [15].
- Copy:
  - Two visually distinct badges for two different checks (identity vs. physical place).
  - A badge that can be lost when the underlying facts change.
  - Moderated feedback, with fraud accusations routed to a complaint flow.
- Avoid: tying the identity badge to a paid boost.

**Gombo (Abidjan, Côte d'Ivoire). Substitute (added). Status: operating since 2021**
- Channel: iOS/Android app and web connecting clients with artisans and other providers (electricians, sports coaches) [17][18].
- Clients are expected to leave a review after each job [17].
- No verification method was found. Gap.

**Jumia Services (not a home-services product: logistics). Not counted; replaced by Wrkman**
- Jumia's logistics arm AIG X was renamed Jumia Services, handling last-mile delivery through in-house and partner couriers [118].
- Jumia suspended e-commerce in Cameroon in Nov 2019 [119].

### Inferences
- In Douala the bar is low: competitors claim verification but don't show it. A trust card that **explains each check in plain words and icons** ("Pièce d'identité vérifiée", "Travail vu par un agent", "3 voisins garantissent") would stand out immediately.
- Whooti's flow (SMS OTP → staff-validated file → references → in-app agreement) is the closest Francophone template for the artisan side. Jiji's two-badge system is the closest template for showing different strengths of proof.

### Gaps
- No screenshots of QwickServices, Maibeta or Nofey were accessible. Languages offered (FR/EN/Pidgin) are unknown for all Cameroonian players.
- Whether Jiji operates in Cameroon is unconfirmed (jiji.cm did not resolve in the earlier research).

---

## Q2. Anglophone African home-services and artisan platforms

### Takeaway
The best-documented trust flows in Africa are:
- **Nsaboa** (Ghana): Ghana Card + hands-on skills test + portfolio, then MoMo escrow, confirm-to-release, and mediated disputes.
- **Kandua** (South Africa): WhatsApp job alerts, first-to-accept assignment, quote approve/reject, a fixed price list for "Elite" insurer jobs.
- **SweepSouth** (South Africa): 1–5 stars with tags, tip offered only after a good rating, two-way rating, a "Trust Score".
- **Lynk** (Kenya, defunct): SMS job offers with a 15-minute reply window, standardized fixed-price "SKUs".

Kenya's **Fixo** uses a WhatsApp line as the entire customer front-end. **Fundis** gates access to *jobs*, not to *listing*, behind an in-person "skills day". **Kazi Mtaani** shows how chiefs and village elders can do the verification, and why the ID must match the mobile-money name.

### Cited Findings

**Kandua (South Africa; Santam-owned since 2024)**
- Channel: web and app, plus **WhatsApp**: pro job alerts arrive by WhatsApp and the app. Support is reachable by email or WhatsApp [26][27].
- Pro onboarding and verification: Kandua markets "background checked, qualified pros" and says it verifies electricians' credentials [29]. A separate "Elite Pro" application exists for top-vetted pros who receive partner jobs (e.g. Santam claims) [28].
- Request model:
  - The customer describes the job and "up to 5 interested pros" quote [30].
  - Customer pages advertise "3 free quotes" and a four-step flow: describe → nearby pros contact you → compare quotes → choose [29].
- Dispatch:
  - "The first Pro to accept a job in the app receives it."
  - Pros "no longer need to purchase credits" to accept jobs (a change from the earlier credit model) [26].
  - After acceptance, the customer's details appear on the job card [26].
- Pricing:
  - The customer waits for a quote before committing. Scope changes should be raised *before* approving the quote so they are included [27].
  - Elite jobs must be quoted and invoiced from **the Kandua price list**, with Kandua taking a small commission [28].
- Problem flows: if a pro can't complete or must cancel, they tell the customer and notify Support, which helps the customer find another pro [26]. To rebook a specific pro, the customer contacts Support [27].
- Copy: WhatsApp job alerts, first-to-accept, approve/reject quote, a re-match handled by support when a pro cancels, a price list for standard jobs. Avoid: needing support to rebook a favourite pro (too much friction).

**SweepSouth (South Africa; left Kenya end-2022)**
- Rating:
  - After completion, an email prompts the customer to rate on web or app, 1–5 stars, plus feedback **tags** such as "Time Management" and "Attitude" [31][32].
  - Rating 3, 4 or 5 stars unlocks a tip option [32].
- Two-way rating: SweepStars rate clients too [34].
- Averages: the help articles conflict. One says the average covers the last 70 services, another the last 35 ratings. One says ratings are not actively monitored by SweepSouth [31].
- A "Sweepstar Trust Score" exists [33]. Its inputs could not be read (403). Gap.
- Onboarding economics: new workers earn 65% for the first 2–3 months to cover paid background and reference checks [35].
- Fairwork Kenya 2022 scored SweepSouth 2/10 [36].
- Copy: stars + tap tags, tip only after a positive rating, two-way rating, a composite trust score. Avoid: inconsistent public rules on how averages are calculated.

**Lynk (Kenya). ARCHIVED: wound down, sold to Eden Life, Apr 2022 [40]**
- Channel: customer web/app. Pros used an Android Pro App, and **SMS job offers with a Yes/No reply within 15 minutes**. Matching took 2–6 hours [37].
- Requests were forwarded to available pros by SMS, and pros "bid" by replying. Matching filtered on sub-skills, location, price, language and experience [39].
- Trust:
  - In-person interviews by a Pro Relations team; later its own academy [37][38].
  - Profiles were "living pages with job history and ratings", and the customer was prompted for a rating after paying [39].
- Pricing evolution: open quoting (v1) gave slow, inconsistent quotes and favoured pros who already had many ratings. **Standardized fixed-price packages** (v2) allowed a pro to be dispatched within ~2 hours. Customers came to trust the *brand* more than the individual pro [38].
- Payment: M-PESA/card upfront, pro paid within 24 h, 10% fee [37].
- Copy: SMS Yes/No dispatch with a timer, fixed-price SKUs for common jobs, a job-history profile. Avoid: too many categories and a heavy vetting cost for everyone (cost wall).

**Fixo (Nairobi). Pilot from Apr 2025**
- Channel: **booking via a WhatsApp line** (0790 222 777). Real-time matching on need and location [41].
- Vetting: pre-screening plus **security clearance** before onboarding. Categories: electricians, plumbers, painters, carpenters, appliance repair. 24/7 support [41].
- Pricing, tracking and ratings: not disclosed [41].
- Copy: a WhatsApp number as the whole customer front-end (zero install).

**Nsaboa (Greater Accra, Ghana). Launch phase, free for both sides**
- Artisan verification (free, under a week): (1) Ghana Card ID check, (2) hands-on skills assessment, (3) portfolio review. Only verified artisans appear [42].
- Customer flow [42]:
  - (1) Choose a trade (Plumbing / Electrical / Painting), describe the issue, **add photos**, set a preferred time.
  - (2) AI matches nearby verified artisans.
  - (3) Compare ratings, reviews and portfolios.
  - (4) Confirm and pay by MoMo, held in escrow.
  - (5) Confirm completion, which releases payment.
  - (6) Review.
  - (7) If unhappy, raise a dispute, which the team reviews and mediates.
- Artisan flow: verify → get notified of nearby requests → review job details before accepting → **update job status as work progresses** → payment released to MoMo on customer confirmation → build reviews [42].
- Copy: this is almost exactly our demo journey. It lacks peer vouching, offline channels and a start code.

**Fundis (Nairobi; ~2,000 artisans)**
- Web and mobile. Any artisan can register, but **"to get jobs, you have to attend our skills days and demonstrate what you can do"** [43].
- Artisans get "Fundi Mjanja" insurance and telemedicine [43][44].
- Copy: free listing, with work access gated by a practical demonstration; benefits as a retention hook.

**Gigmile (Nigeria/Ghana; vehicle lease-to-own for gig workers)**
- Onboarding officers check that **guarantors submitted by prospects meet company standards**, and onboard "captains" onto partner platforms [45].
- Daily repayments are capped at about one-third of the worker's expected earnings [46]. Car financing for Yango drivers in Ghana [47].
- Copy for vouching: a guarantor is a formal onboarding object, checked by staff, with consequences.

**Fixam (Abuja/Lagos). PROJECT page (Devpost), live status unknown**
- The page describes [48]:
  - 29 trades and in-app booking.
  - **Plain-language request intake** that identifies the trade and urgency and routes to nearby artisans.
  - Payment held, artisan paid after customer confirmation, 10% fee.
  - Verification by **in-person visits to markets and workshops**.
  - Human-handled disputes.
- Treat as a concept reference only.

**ServiceDey (Nigeria). Substitute for "Servicemann"**
- App Store listing [49]:
  - Search filters for location, rating, price and availability; a redesigned booking flow.
  - Pay for completed services in-app (card, bank transfer, mobile money).
  - Detailed reviews and stars; a notification centre for booking and message updates.
  - 24/7 live chat and "a dedicated dispute resolution team".
- No artisan verification is described [49].

**Gotwork (Nigeria). Substitute for "Prowork"**
- Claims to be "Nigeria's first **NIN-verified**" artisan marketplace. Each pro's identity is checked against their National Identification Number, and the **address is verified** [50].
- Sign-up: phone and email verification, OTP, 2FA. Pros toggle **Available / Busy** [50].
- Booking:
  - The customer browses nearby verified pros by distance and reviews.
  - The customer pays a **small booking fee** to connect, chat and schedule.
  - Time-slot locking prevents double-booking, with auto-reminders for pending bookings [50].
- Payments: Paystack checkout, "transparent quoting", wallet, receipts. Money is said to be "protected", but the mechanism isn't explained [50].
- Disputes: in-app Booking Support tickets and chat moderation [50].
- Copy: Available/Busy toggle, slot locking, auto-reminders. Avoid: a vague "protected" claim with no rules.

**LabourHunt (Ghana). Added**
- iOS app with a map of nearby artisans. "Every artisan is vetted with their **Ghana Card**." Contact by **WhatsApp or phone call**. "Negotiate prices directly with the pro." English only [51].
- Copy: one-tap WhatsApp/call handoff. Avoid: no job record, which means no proof for ratings.

**Wrkman (Nigeria). Substitute for Jumia Services**
- Relaunched in July 2026 with a "trust-led" reset after complaints of delays, providers going silent after payment, and no follow-up [53].
- Earlier positioning: an all-in-one app to "find, hire and pay trusted artisans" [54].
- Copy: the complaint list doubles as a checklist of what our completion and dispute screens must prevent.

**Ayuda (Ghana). Added**
- Two modes: **"premium"** (assessment plus invoice) and **"flex"** (the customer proposes the price) [52].
- Copy: a two-lane pricing model (platform-assessed vs. customer-proposed).

**Kazi Mtaani (Kenya; government youth public-works programme). Not a marketplace**
- Registration and verification (2025 revival):
  - 10-day online registration, then **manual recruitment presided over by chiefs and assistant chiefs** [55].
  - Requirements: valid national ID and an M-Pesa-enabled line [55].
  - "Verification is done jointly by NGAOs, chiefs, and village elders", with workers deployed in their home villages [58].
- Pay failures:
  - Payment goes straight to M-Pesa, but **names must match exactly**: "If they do not match with the M-Pesa registered line, then it becomes difficult for payments to be done" [56].
  - 531 people missed pay over ID/line mismatches and 34 had unregistered lines [57].
  - Some recruits used relatives' IDs [56].
- Copy for vouching: local-authority co-signature, plus an **ID ↔ mobile-money name match check at onboarding** (not at first payout).

**Lami (Kenya; embedded insurance API)**
- B2B API that lets partners (e.g. the logistics firm Sendy, banks) sell digital insurance [59][60].
- Its Bluewave acquisition gave it micro-insurance sold through **USSD, SMS, WhatsApp chatbots and web** [60].
- Copy: a job-level guarantee or insurance can be embedded through a partner, and sold or claimed over USSD/WhatsApp.

### Inferences
- Nsaboa + Kandua + Lynk together cover our whole journey. The missing pieces are **peer vouching**, **offline/WhatsApp-first ordering for both sides**, and a **start-of-job code**.
- Gating *jobs* (not *listing*) behind a practical proof (Fundis) gives artisans a quick start without lowering the bar for paid work.
- The Kazi Mtaani lesson is concrete: check that the CNI name matches the MoMo/Orange Money registered name during onboarding, or payouts will fail later.

### Gaps
- Kandua's quote screen and dispute flow ("Disputes & Complaints" article) and SweepSouth's Trust Score inputs could not be read (403/404).
- No low-literacy features (audio, icons, local languages) are documented for any platform in this group.

---

## Q3. Mobility and delivery platforms in Africa

### Takeaway
Ride-hailing has solved the "is this the right person?" problem with cheap, copyable patterns:
- **Driver name + plate + photo** on the booking card.
- A **PIN or pick-up code** the rider gives the driver before the trip can start (Uber, Bolt).
- **Selfie re-verification** (Bolt riders, Grab and Urban Company workers).
- **Trusted contacts and trip sharing**.
- **Graduated warnings** driven by repeated customer reports (Yango Cameroon).

The main African failure is **offline cash renegotiation**. Bolt's response was to let riders cancel when a driver demands more than the app price, and to suspend drivers who push cash trips.

### Cited Findings

**Gozem (HQ Douala; Cameroon, Togo, Benin, Gabon, Congo)**
- Channel: separate client, driver ("Champions") and merchant apps. Site in **French and English** [19].
- Services: Zem (moto-taxi), taxi, delivery, ticketing, airtime, gas delivery [19].
- Driver side:
  - Client matching, earnings and activity tracking, personal coaching, a path to vehicle ownership and "Champion Gold" status [19].
  - Vehicle financing repaid by **automatic deductions from earnings**; cash advances for breakdowns and accidents [19].
- Safety: vehicle tracking against theft, fast accident assistance [19]. Car pages say drivers are "verified and trained" and every trip is tracked in real time [20].
- Payment: Moov Money wallet top-up in Benin (2020) [22]. Gozem Money announced [21][22].
- Copy: worker status tiers (Champion → Gold) tied to benefits, earnings-deducted financing, bilingual FR/EN. Gap: Gozem's in-app pricing display and rating flow were not found.

**Yango (Cameroon since Nov 2021; Côte d'Ivoire)**
- Safety tab: share route with trusted contacts, report a lost item, contact support if a driver breaks traffic rules, and **see the driver's name and licence plate on every booking** [23].
- Driver-behaviour monitoring (Douala, Yaoundé): real-time rider feedback on a graduated scale. When several riders report dangerous driving, the driver gets an **in-app warning**; after repeated warnings, access is restricted [23].
- Driver safety training sessions run with the cities of Douala and Yaoundé [24].
- Users in Côte d'Ivoire complain that Yango "inflates prices" during holidays [25].
- Copy: multi-report threshold → warning → restriction (a fair, explainable sanction ladder).

**Bolt (Nigeria, South Africa, Kenya etc.)**
- Offline-trip problem:
  - Drivers steer riders to cash "offline trips" to avoid the 20–25% commission, leaving the rider with no record, no emergency button and no recourse [127].
  - Bolt lets riders **cancel trips where the driver insists on charging more than the app rate** [125].
  - Drivers caught steering riders to cash face suspension. Bolt reports offline trips fell ~42% in Nigeria [124].
- Pricing: an analysis argues the displayed fare is "increasingly becoming a suggestion" [128]. An upfront fare-negotiation pilot ran Nov 2024–Feb 2025 [124].
- Identity and safety:
  - Riders can be asked to take a **selfie, checked against ID**, before ordering [126].
  - **Trusted Contacts** [129].
  - A **Pick-Up Code**: the trip starts only when the rider confirms the code with the driver (South African coverage) [130].
- Copy: the price is locked in-app and the customer can cancel (without penalty) if the provider renegotiates; a start code. Avoid: a "price" that is really an opening bid.

**Uber (Kenya, Nigeria, Ghana, South Africa)**
- **Verify your Ride / PIN**: an opt-in unique PIN; the driver can only start the trip after entering the correct PIN. It can be set to always on or night-only (9pm–6am) [131].
- Nigeria features: real-time ID check, Share My Trip, Verify My Trip, Check Your Ride, 24/7 incident support [133].
- A 2022 "Safety Check-Up" nudges riders to turn on Trusted Contacts, PIN verification and RideCheck [134].
- Copy: optional PIN with a "night only" setting; a check-up screen that nudges users toward safety features.

**Glovo (Ghana, Nigeria, Kenya, Morocco etc.)**
- Live courier tracking from pickup to drop-off [137].
- Ghana help path for bad behaviour: Profile → Contact Support → Accidents and Offences → **Report Bad Behavior** [135].
- Nigeria was the first African market with fully localized customer support [136].
- Complaints include couriers marking orders delivered when they weren't [138].
- Copy: report-a-person as a named path inside support. Avoid: "delivered" status set by the worker alone, with no customer confirmation.

**Sendy (Kenya). DEFUNCT: ceased operations Aug 2023 [139]**
- Coordinated contract drivers who own their vehicles, confirmed deliveries, built performance metrics and managed payments [140].
- Its online boda-boda hailing service was terminated after two months [141].
- Lesson: unit economics, not UX. No trust-flow detail survives.

### Inferences
- A **job start code** (customer reads a 4-digit code to the artisan, who types it in, or vice versa) is the strongest low-cost proof that a job actually happened on-platform. It also gives ratings a real job to attach to.
- Yango's report → warning → restriction ladder is a good model for quality sanctions that artisans can understand and appeal.

### Gaps
- Gozem's rating screen, cash flow and help centre could not be retrieved. Bolt's pick-up code rollout outside South Africa is unconfirmed.

---

## Q4. Mobile money, fintech and agent networks

### Takeaway
Mobile money apps provide the **confirmation and recovery** patterns we need:
- **Show the registered name before money moves** (M-Pesa Hakikisha, which cannot be turned off).
- **Reversal and complaint flows that start from a transaction ID + screenshot** (OPay).
- **QR cards scanned by an agent**, so low-literacy users never type (Wave).
- **USSD as a universal fallback** (#150# Orange Money, *126# MoMo).

Agent networks (Moniepoint, OPay, Wave) show that **trusted local people plus continuous field support** win trust.

### Cited Findings

**M-Pesa (Safaricom, Kenya)**
- **Hakikisha** confirms the recipient's name and/or number before a transaction completes. It covers Send Money, agent deposits and withdrawals, Paybill and Lipa na M-PESA [61][62].
- Timing: a 2015 description gave a ~15-second window after the PIN [63]. Safaricom says the feature **cannot be turned off**, because opting out would stop others confirming your name [64].
- Reversals have formal terms and conditions [62].
- Copy: before any payment or booking, show "You are paying: JEAN-PAUL NGANDO, Électricien #482193" with photo and a big Confirm button.

**MTN MoMo (Cameroon)**
- Channels: USSD (*126#), the MoMo app and the web space mobilemoney.mtn.cm [67].
- Merchant payment (MoMoPay): dial a USSD string with the merchant's **6-digit code** and the amount, then confirm with PIN. Merchants manage their account via *106# [67].
- Fees: a zero-fee merchant-payment campaign to fight cash [68].
- Online: a virtual MoMo Mastercard card (Feb 2026) [65][66].
- Copy: **short numeric IDs** (6 digits) that work in USSD. Our artisan ID should follow the same format.

**Orange Money / Max it (Cameroon)**
- Max it is Orange's super-app (launched Nov 2023 from Douala). It covers line management and top-ups, Orange Money payments, transfers, bill payment, a virtual card, TV/video and a marketplace. It is free and open to all operators [69][70].
- USSD **#150#** works on any phone. Withdrawal: dial #150#, choose withdrawal, enter PIN, then give the agent your number. Guides warn that **agents must never ask for your PIN** [71].
- The fee is shown before confirmation. The app is reportedly cheaper than USSD (~1% vs ~1.5%), but sources conflict [72].
- Copy: "fee shown before confirm"; an explicit "we will never ask your PIN/code" warning. Avoid: super-app clutter. A job app should do one thing per screen.

**Wave (Senegal, Côte d'Ivoire, Uganda etc.)**
- Built its own stack (app, agent portal, **QR cards**) instead of telco rails [73].
- Free QR cards store the account. At the agent, the card is scanned and the **agent enters the transaction**, while the phone number is still used for authentication and confirmation [73].
- **USSD fallback** for basic phones [73].
- Pricing: 1% transfer fee, free bill payment [74]; free agent deposits and withdrawals per its Gambia listing [75].
- Copy: QR card or sticker for artisans who don't own smartphones, with the agent or customer scanning it, and confirmation by phone.

**Chipper Cash (pan-African P2P)**
- Send to another user by Transfer → **Chipper Tag** → search by @tag or contact name [76].
- A warning that a wrong tag "cannot be reversed" [77].
- Avoid: an irreversible action with no name or photo confirmation step.

**Moniepoint (Nigeria; agent banking)**
- Recruited people "centrally positioned within the community" and gave them responsibility for onboarding merchants, "since the merchants were very well known to these people" [142].
- Hybrid onboarding: online sign-up, then an in-person meeting with field staff to receive the POS device [142].
- Field managers give continuous hands-on support after onboarding: problem resolution, product coaching, fraud training [143].
- An agent cited **daily commission settlement** and live earnings dashboards as reasons for choosing it [144].
- A user-persona document records frequent POS downtime complaints [145].
- Copy for the agent console: community-anchored agents, daily payouts, an earnings dashboard, and support that continues after onboarding.

**OPay (Nigeria)**
- Consumer app (wallet, P2P, bills, airtime) and USSD; agent network through a mobile money operator licence [146][148].
- Agents keep a ₦20,000 caution fee in their wallet for a POS terminal [148].
- Disputes: report failed POS credits in the app's **Support tab with the transaction number and a screenshot of the receipt** [148].
- Complaint investigations and fraud scares have hurt trust [149][150].
- Copy: a dispute form pre-filled with the job/transaction ID, with photo evidence attached. Avoid: support that is only reachable by chat, with long waits.

**Paystack Storefront (Nigeria, Ghana, South Africa)**
- A no-code shop page with multiple products, photos, brand colour and a custom URL [151][152].
- A **shareable link "via any medium, like WhatsApp or Instagram"**, including links with a discount code pre-applied [153].
- "Pay for Me" lets a shopper send a payment link to someone else [154].
- Copy: every artisan gets a **shareable profile link** (and QR) they can post in WhatsApp groups and status. A "someone else pays" link suits jobs paid by a landlord or diaspora relative.

**Twiga Foods (Kenya; B2B fresh produce to kiosks)**
- Vendors order through **USSD, a call centre ("Soko Call") or the Soko Yetu app**. Next-day delivery; mobile money payment; **SMS receipt** [155][156][157].
- In ~2018, vendors re-ordered every two days on average [155].
- Copy: a phone call-in ordering lane run by agents for non-smartphone users; an SMS receipt as the low-data proof of transaction.

### Inferences
- The **numeric ID + name-confirm + PIN/code** triad that Cameroonians use daily with MoMo and Orange Money is the most familiar trust grammar for low-literacy users. Our booking-code and payment screens should copy it exactly.
- Agent networks win on daily settlement and visible human support, not on technology. The agent console must show agents their earnings and pending tasks first.

### Gaps
- Official Orange/MTN Cameroon menu trees could not be verified. Third-party guides conflict on sub-menu numbers and fees.
- OPay's official help centre was not retrievable.

---

## Q5. B2B commerce and logistics

### Takeaway
B2B informal-retail platforms show two things. **Field agents and SMS ordering** carry users who will not adopt apps. And **proof of delivery** (signed waybill photo → automatic invoice) is a cheap, auditable completion artefact.

### Cited Findings

**Wasoko (Kenya, Tanzania, Rwanda, Uganda, Côte d'Ivoire, Senegal)**
- Retailers order by **SMS or app**, delivered by its own logistics [158].
- Shop owners can also order via phone or field agents. A separate Wasoko Agent app exists [159][160].
- Copy: an agent-assisted order lane.

**Kobo360 (Nigeria; truck logistics)**
- Separate customer, partner and driver apps (2019) [162].
- On delivery, **the driver scans and uploads the signed waybill in the app and an invoice is automatically sent to the client** [161].
- 15% commission per trip [163].
- Copy: completion = photo of proof + automatic record.

### Inferences
- For artisans, the equivalent of the waybill is a **completion photo plus a customer confirmation code**, which together create the reputation record.

### Gaps
- Current Wasoko and Kobo360 app flows (post-2023 restructurings) are undocumented.

---

## Q6. Emerging Asia and Latin America

### Takeaway
- **Urban Company** is the reference for a managed flow: pick a service and slot, the platform **auto-assigns** a professional, a **selfie at the door** confirms identity, a **start OTP** opens the job, and a 30-day guarantee and up to ₹10,000 damage protection come with it. Its weaknesses are fragile OTPs and opaque ID blocking.
- **GetNinjas** and **Habitissimo** are the lead-gen references: up to 4 pros per request, coin/subscription access for pros. Both have documented trust weaknesses: coins not refunded when the customer never hires; reviewer identity not verified.
- **inDrive** is the reference for **customer-proposed price + counteroffer + price lock**.
- **Gojek GoLife** and **Kaodim** are archived warnings.

### Cited Findings

**Urban Company (India, UAE, Singapore, KSA). Listed Sep 2025**
- Request: customers pick a service type and time slot, and **the platform assigns the best-available professional**. There is no professional browsing [167].
- A commissioned checkout redesign **merged the professional and time-slot screens** to shorten the path and increase transparency [166][167].
- Identity: the professional **takes a selfie on arriving at the customer's house before starting**, matched against the assigned pro (Microsoft Azure face API) [165].
- Start OTP:
  - The customer gives the professional an OTP to start the job.
  - Complaints describe a pro never entering the OTP, leaving the service "never started" and silently rescheduled [168].
  - A support playbook falls back to an arrival OTP or the last four digits of the customer's number [169].
- Guarantees: a "30 day service guarantee" [170] and up to ₹10,000 damage protection. A paid extended warranty is void if a third party repairs the equipment [164].
- Worker governance: temporary or permanent **ID blocks** for cancellations, leave and rating drops. One worker could not receive bookings for five days after a single 1-star rating [171].
- Copy: auto-assign for standard jobs, selfie-at-door, start code, a scoped guarantee. Avoid: one-rating sanctions, and an OTP with no offline fallback.

**Housejoy (India)**
- App and web booking with **time-slot selection**; prices shown from ₹500 to ₹5,299 by job [172].
- The site claims "verified & qualified professionals" (company claim) [172].
- Moved from on-demand services to construction and renovation after retreating from 7 cities [174]. 1M customers in 1.5 years by 2016 [173].
- Copy: price shown up front per service. Avoid: a "verified" claim with no explanation.

**Apna (India; blue-collar jobs)**
- App in **10 languages besides English** [175].
- A company study says 57% of users prefer a vernacular language for job search [175].
- Candidates sit a basic screening test before verified employers can hire them [176].
- Community groups for interview tips and leads [177].
- A multilingual **AI calling agent** runs voice interviews in Hindi, English and regional languages as soon as a job is posted [178].
- Copy: vernacular UI from day one, voice as an input channel, community groups as a retention layer.

**Kaodim (Malaysia, Singapore, Philippines, Indonesia). ARCHIVED: shut down 1 Jul 2022**
- Instantly paired customers with a highly rated provider at a **fixed bundled price**. Shut down citing COVID, labour shortages and cost inflation [179][180].
- Copy: instant fixed-price match for standard jobs. Lesson: margins.

**GetNinjas (Brazil). Listed (B3), revenue declining**
- Request:
  - A customer posts a request and receives **up to four quotes**.
  - The customer sees reviews and contacts pros, then **negotiates directly**. GetNinjas is not involved in the negotiation [181].
- Pros:
  - Buy **coin packs** to unlock customer contacts. Prices vary dynamically by location, type and supply [182].
  - **Coins are not refunded if the customer never hires** [182].
- Rating: 1–5 stars from clients; higher scores rank higher in search [183].
- A DIEESE study frames the model as a reverse auction where the cheapest quote tends to win [184].
- Avoid: charging artisans for leads that never convert.

**Habitissimo (Spain, Mexico, LatAm)**
- Request: fill in a project form, and up to 4 professionals contact you with estimates or to arrange a visit [185].
- Trust: claims 25,000+ verified pros. A trust **seal appears on the profile only after documents are validated** [185].
- Reviews: Habitissimo states it does **not verify the identity of 100% of reviewers**. A quality team reviews them, but some fakes may slip through. It warns users to distrust reviews where "everything is perfect" [186].
- Safety advice: compare quotes, check VAT, pay in stages, don't pay everything upfront [187].
- Pros pay a subscription, choose zones and job types, and receive leads automatically [188].
- Copy: document-validated seal, staged-payment advice. Avoid: reviews not tied to a verified job.

**Gojek / GoLife (Indonesia). GoLife ARCHIVED**
- GoLife (GoClean, GoMassage, GoFix, GoGlam etc.) was cut back in Dec 2019. GoClean and GoMassage (90% of GoLife orders) were kept, then closed on 27 Jul 2020 [189][190].
- Design: Gojek redesigned its driver–customer chat using **pre-set quick messages based on the most-typed messages per booking status** [191].
- Its driver app had feature-discoverability problems; a revamp increased visits to a key benefits menu by 50% [192].
- Copy: status-specific quick replies ("J'arrive dans 10 min", "Je suis devant le portail") so artisans don't have to type. Lesson: home services inside a super-app failed on frequency.

**Grab (Southeast Asia)**
- Drivers must take **random selfies during the day**, in addition to pre-trip selfie checks, to confirm the registered driver is operating (Philippines, Sep 2024) [193].
- Safety Centre: Emergency SOS, "Report an Issue", Share Your Ride, opt-in Audio Protect, trip monitoring for unexpected stops [193][194].
- Copy: periodic re-verification selfie for artisans (prevents account lending).

**Rappi (Latin America)**
- Support is inside the app [196].
- A Chilean consumer-group report found **a tip charged by default** to the shopper [196]. Colombian users report a suggested tip percentage alongside delivery and service fees [197].
- Complaints allege orders delayed or cancelled when no tip is added [198].
- Restaurant-side help topics include "delayed courier" and "order without courier" [199].
- Avoid: default or coercive tipping.

**inDrive (substitute for Zolve; Africa, LatAm, Asia)**
- Flow:
  - The passenger enters a route, taps **"Offer your fare"**, enters an amount (the app suggests a starting price) and taps **"Find a driver"** [200].
  - Drivers accept, **counteroffer** or decline, with no penalty for declining or countering [201].
  - The passenger compares offers by price, rating, ETA and vehicle [201].
- **Once agreed, the fare is locked**: drivers can't ask for more in the app or in person [200].
- Cash or bank transfer directly to the driver in Nigeria [202]. Marketed in South Africa as a "bidding process" [203].
- Copy: for non-standard artisan jobs, the customer proposes, the artisan counters, and the price is locked. This matches informal haggling norms in Douala while keeping a record.


### Inferences
- Urban Company's auto-assign works because it **standardizes the service and trains the pros**. For Douala, use auto-assign only for a few fixed-price SKUs, and let customers see and pick from 3 vouched artisans for everything else.
- The OTP failures documented at Urban Company argue for a **two-way code with an offline fallback** (SMS or USSD entry, or the agent confirms by phone).

### Gaps
- Urban Company's rebooking ("favourite pro") design article [167b] was not readable (403).
- GetNinjas' and Habitissimo's current app screens were not inspected.

---

## Q7. Cross-platform synthesis: top 30 patterns to adopt and 10 anti-patterns to avoid, mapped to our screens

### Takeaway
The proven building blocks for our demo journey are:
- **Numeric ID + name/photo confirmation** (M-Pesa, MoMo).
- **Staff/agent-validated onboarding with references** (Whooti, Jiji agents, Moniepoint).
- **Practical proof before paid work** (Fundis, Nsaboa).
- **WhatsApp entry and alerts** (Fixo, Kandua).
- **Shortlist of 3–5** (Kandua, GetNinjas, Habitissimo).
- **Start code + selfie at the door** (Uber/Bolt, Urban Company).
- **Escrow released on confirmation** (Nsaboa, QwickServices).
- **Photo proof of completion** (Kobo360).
- **Stars + tags + two-way rating** (SweepSouth).
- **Moderated, interaction-gated reviews** (Jiji).
- **Mediated disputes keyed to a job ID** (Nsaboa, OPay).
- **Graduated, explainable sanctions** (Yango).

**Structured peer vouching is not used as a primary trust signal by any of the 50 platforms.** The closest analogues are Gigmile guarantors, Kazi Mtaani chief and elder verification, Whooti references, and Moniepoint's community-insider recruitment. This is our differentiator, and there is no proven UI to copy, so it needs user testing.

### Cited Findings: the 50 platforms at a glance

| # | Platform | Country | Type | Status (Nov 2026) | Key trust/UX pattern | Src |
|---|---|---|---|---|---|---|
| 1 | QwickServices | CM | Artisan/services | Live (Apr 2026) | Escrow released on confirm; bidding | [1][2][3] |
| 2 | Maibeta | CM | Artisan | Early | "Verified" techs (unexplained) | [4] |
| 3 | Nofey | CM | Artisan | Early | Chat + MoMo, reviews only | [5] |
| 4 | OZOservir | GA | Services | Launch planned | QR field onboarding; paid badge | [6] |
| 5 | Whooti | SN | Domestic work | Live | Staff file check, references, in-app contract | [7] |
| 6 | CoinAfrique | CM/Francophone | Classifieds | Live | Lite mode; call-for-tenders; safety tips | [8][9][10] |
| 7 | Jiji | NG/KE/GH | Classifieds | Live | Verified ID vs. agent-visited store badge; moderated feedback | [12]–[16] |
| 8 | Gombo | CI | Artisan | Live | Review after every job | [17][18] |
| 9 | Wrkman (sub. Jumia Services) | NG | Artisan | Relaunched Jul 2026 | Trust reset after silent-provider complaints | [53][54] |
| 10 | Kandua | ZA | Home services | Live (Santam) | WhatsApp alerts; first-to-accept; price list | [26]–[30] |
| 11 | SweepSouth | ZA | Cleaning | Live (left KE) | Stars + tags; tip after good rating; two-way | [31]–[35] |
| 12 | Lynk | KE | Artisan | **Archived 2022** | SMS Yes/No dispatch; fixed SKUs | [37]–[40] |
| 13 | Fixo | KE | Artisan | Pilot | WhatsApp line booking; security clearance | [41] |
| 14 | Nsaboa | GH | Artisan | Launch | ID + skills test + portfolio; MoMo escrow; mediation | [42] |
| 15 | Fundis | KE | Artisan | Live | Skills day gates jobs; insurance | [43][44] |
| 16 | Gigmile | NG/GH | Gig asset finance | Live | Guarantor check at onboarding | [45]–[47] |
| 17 | Fixam | NG | Artisan | **Project page** | Plain-language intake; in-person vetting | [48] |
| 18 | ServiceDey (sub. Servicemann) | NG | Artisan | Live | Filters; dispute team | [49] |
| 19 | Gotwork (sub. Prowork) | NG | Artisan | Live | NIN + address check; Available/Busy | [50] |
| 20 | LabourHunt | GH | Artisan | Live | Ghana Card; WhatsApp/call handoff | [51] |
| 21 | Ayuda | GH | Gig | Live (2025) | Premium vs. flex (customer price) | [52] |
| 22 | Kazi Mtaani | KE | Public works | Revived 2025 | Chiefs/elders verify; ID–M-Pesa name match | [55]–[58] |
| 23 | Lami | KE | Embedded insurance | Live | Micro-insurance via USSD/WhatsApp | [59][60] |
| 24 | Gozem | CM+ | Mobility super-app | Live | FR/EN; worker tiers; earnings-deducted finance | [19]–[22] |
| 25 | Yango | CM/CI | Mobility | Live | Name+plate; report → warning → restriction | [23]–[25] |
| 26 | Bolt | NG/ZA/KE | Mobility | Live | Cancel if overcharged; pick-up code; selfie | [124]–[130] |
| 27 | Uber | KE/NG/GH | Mobility | Live | Verify-your-ride PIN; safety check-up | [131]–[134] |
| 28 | Glovo | GH/NG/KE | Delivery | Live | Live tracking; report bad behaviour path | [135]–[138] |
| 29 | Sendy | KE | Logistics | **Defunct 2023** | Delivery confirmation, perf. metrics | [139]–[141] |
| 30 | M-Pesa | KE | Mobile money | Live | Hakikisha name confirm (always on) | [61]–[64] |
| 31 | MTN MoMo | CM | Mobile money | Live | 6-digit merchant code via USSD | [65]–[68] |
| 32 | Orange Money / Max it | CM | Mobile money/super-app | Live | #150#; fee shown before confirm; never-share-PIN | [69]–[72] |
| 33 | Wave | SN/CI/UG | Mobile money | Live | Agent-scanned QR card; USSD fallback | [73]–[75] |
| 34 | Chipper Cash | Pan-Africa | P2P | Live | @tag send; irreversible warning | [76][77] |
| 35 | Moniepoint | NG | Agent banking | Live | Community-insider agents; daily settlement | [142]–[145] |
| 36 | OPay | NG | Wallet/agents | Live | Dispute = txn ID + screenshot | [146]–[150] |
| 37 | Paystack Storefront | NG/GH/ZA | Commerce | Live | Shareable link for WhatsApp; Pay for Me | [151]–[154] |
| 38 | Twiga | KE | B2B produce | Live (restructured) | USSD/call-centre/app ordering; SMS receipt | [155]–[157] |
| 39 | Wasoko | East/West Africa | B2B retail | Live | SMS/app/agent ordering | [158]–[160] |
| 40 | Kobo360 | NG | Logistics | Live (status unclear) | Waybill photo → auto invoice | [161]–[163] |
| 41 | Urban Company | IN+ | Home services | Listed | Auto-assign; selfie at door; start OTP; guarantee | [164]–[171] |
| 42 | Housejoy | IN | Home services | Pivoted | Slot booking, upfront prices | [172]–[174] |
| 43 | Apna | IN | Blue-collar jobs | Live | 10 languages; voice AI interviews; groups | [175]–[178] |
| 44 | Kaodim | MY/SG/PH/ID | Home services | **Archived 2022** | Instant fixed-price match | [179][180] |
| 45 | GetNinjas | BR | Lead-gen | Listed, declining | Up to 4 quotes; coins to unlock | [181]–[184] |
| 46 | Habitissimo | ES/LatAm | Lead-gen | Live | Seal after document validation | [185]–[188] |
| 47 | Gojek / GoLife | ID | Super-app services | **GoLife archived 2020** | Status-based quick replies | [189]–[192] |
| 48 | Grab | SEA | Mobility | Live | Random re-verification selfies | [193][194] |
| 49 | Rappi | LatAm | Delivery | Live | In-app support; default tip (avoid) | [196]–[199] |
| 50 | inDrive (sub. Zolve) | Global/Africa | Mobility | Live | Offer your fare → counter → lock | [200]–[203] |

### Top 30 patterns to adopt (mapped to screens)

**A. Artisan onboarding**
1. **Phone-first sign-up with SMS OTP and a deliberately short form.** Whooti simplified its form after feedback [7]; Gotwork uses OTP [50]. *Screen:* phone number → OTP → trade icon picker → photo. Max 4 steps before "profile created".
2. **Agent-assisted onboarding by trusted locals.** Moniepoint recruits community-central people to onboard merchants [142]; OZOservir used field demos and QR codes [6]; Fixam visits markets and workshops [48]. *Screen:* an "Inscrit par l'agent [name]" path where the agent fills in the form on their phone with the artisan.
3. **ID ↔ mobile-money name match check at onboarding.** Kazi Mtaani payouts failed when ID and M-Pesa names didn't match [56][57]. *Screen:* after the CNI photo, show the MoMo/OM registered name and flag a mismatch before the profile goes live.
4. **Free listing, but paid work gated by practical proof.** Fundis skills days [43]; Nsaboa skills test + portfolio [42]. *Screen:* status chip "Profil créé → Preuve de travail en attente → Prêt pour les missions".
5. **Proof of work as geotagged photos of real past jobs, reviewed by staff.** Nsaboa portfolio review [42]; Whooti staff file validation [7]. *Screen:* "Ajoutez 3 photos de vos travaux", with camera-only capture (no gallery) to discourage stolen images.
6. **Available / Busy toggle.** Gotwork [50]; QwickServices accepts requests "based on your availability" [3]. *Screen:* one large toggle on the artisan home screen, also settable by USSD/SMS.

**B. Vouching**
7. **Vouchers as formal, checked objects with accountability.** Gigmile staff check guarantor quality [45]; Kazi Mtaani uses chiefs and elders for verification [58]; Whooti shows references on profiles [7]. *Screen:* "Qui vous recommande?" Add 2–3 vouchers by phone number. Each voucher gets an SMS/WhatsApp/USSD prompt: "Confirmez-vous que X est maçon et que vous avez vu son travail? 1=Oui 2=Non".
8. **Local-authority or association co-sign as a separate, stronger voucher type.** Kazi Mtaani (chiefs, assistant chiefs, village elders) [55][58]. *Screen:* voucher types with distinct icons: client, fellow artisan, quarter chief / trade association.

**C. Profile / trust card**
9. **One badge per check, each explained, and removable when facts change.** Jiji separates Verified ID (document + selfie) from Verified store (agent visit), and the store badge is lost on key edits [12][16]; Habitissimo shows its seal only after documents are validated [185]. *Screen:* trust card rows with icon + plain label + date: "✓ CNI vérifiée (mars 2026)", "✓ Travail vu par agent", "✓ 3 garants", "✓ 12 missions confirmées".
10. **Identity block like ride-hailing.** Yango shows driver name + plate on every booking [23]. *Screen:* big photo, first name, trade icon, **6-digit artisan ID** (MoMo merchant-code style [67]), quartier.
11. **Job history and counts, not just stars.** Lynk's "living profile with job history" [39]; GetNinjas ranks by accumulated score [183]. *Screen:* "47 missions • 4.6★ • membre depuis 2026", with the last 3 dated reviews.
12. **Shareable profile link and QR for WhatsApp.** Paystack Storefront links shared "via WhatsApp or Instagram" [153]; OZOservir QR codes [6]. *Screen:* a "Partager mon profil" button that creates a WhatsApp message with a short link, plus a printable QR card.

**D. Request flow**
13. **Trade icon → describe → photos → time.** Nsaboa's exact four inputs [42]. *Screen:* icon grid (no text needed), a voice-note button as an alternative to typing, a camera button, "Maintenant / Aujourd'hui / Choisir".
14. **WhatsApp as a first-class request channel.** Fixo books over a WhatsApp line [41]; Kandua sends job alerts by WhatsApp [26]. *Screen:* a WhatsApp Flow or bot with the same 4 steps; the web/PWA is optional.
15. **Plain-language or voice intake mapped to trade and urgency.** Fixam [48]; Apna's multilingual voice agent [178]. *Screen:* "Décrivez votre problème" (voice or text), then the system proposes a trade icon for the customer to confirm.
16. **Two price lanes: fixed-price standard jobs vs. quote/offer jobs.** Lynk v2 SKUs [38]; Kaodim fixed bundles [179]; Kandua price list [28]; Ayuda premium/flex [52]. *Screen:* "Prix fixe" cards for ~10 common jobs (e.g. replace socket, unblock sink); everything else goes to quote.
17. **Customer proposes a price, artisan counters, price locks.** inDrive [200][201]. *Screen:* "Votre budget: ___ FCFA" with a suggested range, artisan counteroffers shown side by side, and a "Prix verrouillé" banner after acceptance.

**E. Match results**
18. **Shortlist capped at 3–5 artisans.** Kandua up to 5 [30]; GetNinjas up to 4 [181]; Habitissimo up to 4 [185]. *Screen:* max 3 cards in the demo.
19. **Comparison card: trust rows + distance/ETA + price.** inDrive compares price, rating, ETA and vehicle [201]; Nsaboa compares ratings, reviews and portfolio [42]. *Screen:* card = photo, ID, voucher count, missions, stars, distance, price or quote status, plus one "Choisir" button.
20. **For urgent jobs: first-to-accept dispatch with a short reply window, over SMS/WhatsApp.** Kandua first-to-accept [26]; Lynk 15-minute SMS Yes/No [37]. *Screen (artisan):* "Nouvelle mission: Plombier, Bonamoussadi, 5 000–8 000 FCFA. 1=Accepter 2=Refuser", with a countdown.

**F. Booking and job code**
21. **Name/photo confirmation before commit (Hakikisha-style).** [61][64]. *Screen:* "Vous réservez: [photo] PAUL M., Électricien #482193" → Confirmer.
22. **Start-of-job code.** Uber PIN: the trip only starts after the PIN is entered [131]; Bolt pick-up code [130]; Urban Company start OTP [168]. *Screen:* the customer sees a 4-digit "Code de démarrage" and reads it to the artisan, who enters it in the app, SMS or USSD. This creates the verified job record.
23. **Selfie at the door / periodic re-verification.** Urban Company selfie before the job [165]; Grab random selfies [193]. *Screen (artisan):* selfie prompt at start code entry, compared with the onboarding photo (stops account lending).
24. **Safety share and visible support.** Yango/Uber/Bolt trusted contacts and trip sharing [23][129][133]. *Screen (customer):* "Partager avec un proche" sends the artisan's name, ID and arrival time by SMS/WhatsApp.

**G. Completion**
25. **Payment held and released on customer confirmation, with a completion code.** Nsaboa MoMo escrow [42]; QwickServices [1]; Fixam [48]. *Screen:* "Travail terminé? Oui → libérer le paiement / Problème → signaler", with an auto-release after a stated time.
26. **Photo proof plus automatic receipt.** Kobo360 signed waybill → auto invoice [161]; Twiga SMS receipt [155]. *Screen (artisan):* "Photo du travail fini" (required); SMS receipt to both parties with the job ID.

**H. Rating**
27. **1–5 faces/stars + tap tags, two-way, with tips only after a good rating.** SweepSouth [31][32][34]. *Screen:* 5 large faces (also "press 1–5" on USSD/IVR), tags as icons (Ponctuel, Propre, Prix respecté, Poli), the artisan rates the customer too.
28. **Reviews only from confirmed jobs; moderated; fraud accusations become complaints.** Jiji gates feedback on interaction and converts "scammer" feedback into a security check [14][15]; Habitissimo shows the risk of unverified reviewers [186]. *Screen:* the review is attached to the job code, labelled "Avis vérifié – mission #A7F2".

**I. Dispute**
29. **Dispute opened from the job, pre-filled with the job ID, evidence attached, mediated, and graduated sanctions.** Nsaboa mediation [42]; OPay txn ID + screenshot [148]; ServiceDey dispute team [49]; Yango report → warning → restriction ladder [23]. *Screen:* "Signaler un problème" → reason icons (Pas venu, Travail mal fait, Prix changé, Comportement) → photo/voice note → reference number + expected response time. The artisan sees warnings before any suspension.

**J. Agent console**
30. **Agent home = tasks + earnings + daily settlement; agents can act on behalf of non-smartphone users.** Moniepoint field managers, daily commission settlement, dashboards [143][144]; Wave agents scan QR cards and enter the transaction [73]; Twiga Soko Call and Wasoko agents take orders by phone [155][159]. *Screen:* queues for "À vérifier (photos, CNI)", "Garants à appeler", "Litiges"; "Créer une demande pour un client" (phone-in); today's earnings; a scan-QR-to-open-artisan-profile action.

### 10 anti-patterns to avoid (mapped to screens)

1. **Verification badge sold as a subscription perk** (profile/trust card). Jiji's Verified ID needs an active Boost package [12][13]; OZOservir puts its verified badge in the paid Pro tier [6]. Customers can't tell "paid" from "checked". *Rule:* badges reflect checks only; paid visibility, if any, is labelled "Sponsorisé".
2. **Charging artisans for leads that never convert** (match results). GetNinjas coins are not refunded if the client never hires [182], producing a reverse auction [184]; Kandua dropped credits for accepting jobs [26]. *Rule:* no pay-to-unlock in the MVP.
3. **Reviews not tied to a real job** (rating). Habitissimo admits it can't verify all reviewers [186]; LabourHunt's WhatsApp/call handoff leaves no job record [51]. *Rule:* only job-code-confirmed reviews count toward the score.
4. **Opaque, single-event deactivation** (dispute / agent console). Urban Company ID blocks after cancellations or one 1-star rating triggered protests [171]. *Rule:* use thresholds over several jobs, warnings first (Yango ladder [23]), and an appeal button.
5. **Displayed price that is really an opening bid; off-platform cash renegotiation** (booking). Bolt offline trips [124][127][128]. *Rule:* lock the agreed price, show it on both phones, and give a one-tap "L'artisan demande plus" report that cancels without penalty (Bolt [125]).
6. **Default or coercive tipping** (rating/completion). Rappi charges a default tip and faces complaints of tip pressure [196][198]. *Rule:* no default tip; offer it only after a good rating (SweepSouth [32]).
7. **Irreversible action without name/photo confirmation** (booking/payment). Chipper warns a wrong tag "cannot be reversed" [77], while M-Pesa makes name confirmation mandatory [64]. *Rule:* always show photo + name + ID before confirming.
8. **Unexplained "verified" claims** (profile/trust card). QwickServices, Maibeta, Housejoy and Gotwork ("protected" money) all claim without explaining [1][4][172][50]. *Rule:* every trust claim must be tappable to a one-line explanation, with an audio version.
9. **Worker-only completion status** (completion). Glovo complaints about couriers marking orders delivered when they weren't [138]; Urban Company OTPs not entered, leaving the service "never started" [168]. *Rule:* completion needs a customer action (code or confirm), with auto-release only after a stated timeout and an SMS/USSD fallback.
10. **Launching too many categories / full-stack managed services before density** (request flow). QwickServices 2,000+ categories [1]; Lynk across many categories [38]; GoLife closed [189][190]; Kaodim shut down [179]; Sendy defunct [139]. *Rule:* demo with 6–10 trades shown as icons, in a few Douala quartiers.

### Inferences
- **The demo journey, screen by screen** (from patterns above):
  1. Agent registers artisan (2, 3) → artisan adds 3 work photos (5) → 2 vouchers confirm by SMS/USSD (7, 8) → trust card goes live (9–11).
  2. Customer picks trade icon + voice note + photo (13–15) → fixed price or budget (16, 17) → sees 3 matches (18, 19) → confirms name/photo (21).
  3. Artisan arrives, selfie + start code (22, 23) → finishes, photo proof (26) → customer confirms and pays from MoMo hold (25) → both rate with faces/tags (27, 28) → SMS receipt with job ID (26).
  4. If there is a problem: dispute from the job (29). The agent console handles verification queues (30).
- **Low-literacy coverage is the biggest gap across all 50 platforms.** Only Apna (10 languages, voice interviews) [175][178], Gojek (quick replies) [191], Wave (QR card + USSD) [73], CoinAfrique (lite mode) [10] and OZOservir (low-bandwidth) [6] document such features. Prior HCI evidence (graphical/voice interfaces beat text for low-literacy users; live operators were up to ~10x more accurate) [204] supports icons, faces, voice notes and agent assistance on every screen.
- **Language:** no platform found offers Cameroonian Pidgin. Gozem's FR/EN is the local baseline [19].

### Gaps
- Vouching UI has no precedent among the 50 platforms, so its wording, voucher limits and weighting need field testing.
- No screenshots or flow libraries (Mobbin, PageFlows, ScreensDesign) were accessible, so visual details (layout, icon sets) are not documented here.
- Several help-centre pages (SweepSouth Trust Score, Kandua disputes, Urban Company rebooking, Gozem help) could not be read in full.

---

## Source list

1. Cameroon Tribune — Digital Businesses: QwickServices Platform Goes Operational (Apr 2026): https://www.cameroon-tribune.cm/article.html/76197/en.html/details_2
2. Apple App Store — QwickServices (customer): https://apps.apple.com/app/id6747707913
3. Apple App Store — QwickServices Provider: https://apps.apple.com/app/id6747710647
4. Tony Elumelu Foundation — Bamai Namata / Maibeta (Sep 2026): https://www.tonyelumelufoundation.org/?p=29130
5. We Are Tech Africa — Audrey Ludivine Baha / Nofey (Feb 2026): https://www.wearetech.africa/fr/fils/tech-stars/la-camerounaise-audrey-ludivine-baha-facilite-la-recherche-d-artisans-locaux-fiables
6. Gabonreview — OZOservir, la nouvelle marketplace des services au Gabon: https://www.gabonreview.com/economie-numerique-ozoservir-la-nouvelle-marketplace-des-services-au-gabon/
7. Afrique IT News — Whooti (Oct 2026): https://afriqueitnews.com/editorial/whooti-ou-le-pari-de-faire-entrer-lemploi-domestique-senegalais-dans-lere-de-la-confiance/
8. CoinAfrique Cameroun homepage: https://cm.coinafrique.com/
9. Afrik.com — Lancement de CoinAfrique: https://www.afrik.com/lancement-de-coinafrique-la-premiere-application-mobile-africaine-de-petites-annonces
10. Afrik.com — CoinAfrique devient l'application la plus téléchargée: https://www.afrik.com/coinafrique-devient-l-application-la-plus-telechargee-en-afrique-francophone-subsaharienne
11. TechCabal (FR) — Autochek acquiert CoinAfrique: https://techcabal.com/fr/?p=95792
12. Jiji Kenya FAQ — Verified ID: https://jiji.co.ke/faq/153
13. Jiji Nigeria FAQ — Verified ID: https://jiji.ng/faq/125
14. Jiji Nigeria FAQ — How to leave feedback: https://jiji.ng/faq/how-to-leave-feedback
15. Jiji Nigeria FAQ — Feedback moderation: https://jiji.ng/faq/feedback-moderation
16. Jiji Nigeria FAQ — Offline store verification: https://jiji.ng/faq/offline-store-verification
17. We Are Tech Africa — Gombo (Côte d'Ivoire): https://www.wearetech.africa/fr/fils/solutions/cote-d-ivoire-gombo-met-en-relation-les-artisans-et-les-clients-grace-a-ses-plateformes-web-et-mobile
18. Digital Mag CI — Gombo: https://digitalmag.ci/gombo-la-plateforme-qui-facilite-la-recherche-dartisans-qualifies-en-cote-divoire/
19. Gozem — Cameroon homepage: https://gozem.co
20. Gozem — Car service page: https://website.gozem.co/corporate-tg/en/car/
21. TechCabal — Gozem launches in Cameroon: https://techcabal.com/?p=89001
22. TechCabal — Gozem partners Etisalat/Moov Money (May 2020): https://techcabal.com/2020/05/09/in-benin-ride-hailing-startup-gozem-partners-etisalat-to-give-its-users-moov-money/
23. Digital Business Africa — Yango contribue à la sécurité routière au Cameroun: https://www.digitalbusiness.africa/yango-contribue-a-la-securite-routiere-au-cameroun-lancement-dune-nouvelle-technologie/
24. Journal du Cameroun — Yango Cameroun formation des chauffeurs: https://fr.journalducameroun.com/yango-cameroun-poursuit-son-partenariat-securite-avec-douala-et-yaounde-confirme-une-nouvelle-session-de-formation-des-chauffeurs-en-septembre/
25. Digital Mag CI — Comparatif des applications de VTC: https://digitalmag.ci/comparatifs-des-applications-de-vtc-en-cote-divoire-prix-disponibilite-confort-et-securite/
26. Kandua Pro Help Centre — About jobs at Kandua: https://intercom.help/pro-support-help-centre/en/articles/15363401-about-jobs-at-kandua
27. Kandua Homeowner Help Centre — Working with pros: https://intercom.help/home-owner-help-centre/en/articles/15367623-working-with-pros
28. Kandua — Elite Pro application: https://kandua.com/-/elite-pro-application
29. Kandua — Contractor pros near me: https://kandua.com/contractor/near-me
30. BFA Global / Catalyst Fund — Kandua two-pager (2021): https://bfaglobal.com/wp-content/uploads/2021/02/Kandua-two-pager.pdf
31. SweepSouth Help — How ratings work: https://help.sweepsouth.com/hc/en-us/articles/14894614085778-How-ratings-work-on-SweepSouth
32. SweepSouth Help — How to rate my SweepStar after the first booking: https://help.sweepsouth.com/hc/en-us/articles/14609978688530-How-to-rate-my-SweepStar-after-the-first-booking
33. SweepSouth Help — What is my Sweepstar Trust Score?: https://help.sweepsouth.com/hc/en-us/articles/33648912550418-What-is-my-Sweepstar-Trust-Score
34. SweepSouth Help — How to rate your Client: https://help.sweepsouth.com/hc/en-us/articles/14898463279762-How-to-rate-your-Client
35. SweepSouth Help — How much SweepStars are paid: https://help.sweepsouth.com/hc/en-us/articles/14601036428306-How-much-SweepStars-are-paid
36. Fairwork Kenya Ratings 2022 (PDF): https://fairwork.oii.ox.ac.uk/wp-content/uploads/sites/17/2023/02/230202_fairwork_kenya-report-2022_RZ_small.pdf
37. GSMA — Lynk case study (2019): https://www.gsma.com/mobilefordevelopment/wp-content/uploads/2019/05/Lynk-Connecting-informal-workers-to-job-opportunities-in-Kenya.pdf
38. The Flip — Lynk: Lessons Learned the Hard Way: https://theflip.africa/newsletter/lynk-lessons-learned-the-hard-way/
39. S4YE — Lynk profile (PDF): https://www.s4ye.org/sites/default/files/2019-09/Lynk_0823.pdf
40. WeeTracker — Eden Life acquires Lynk (Apr 2022): https://weetracker.com/2022/04/28/nigerias-eden-life-acquires-kenyan-startup-lynk-to-expand-service-offerings/
41. TechTrends Kenya — Fixo e-hailing platform for fundis (Apr 2025): https://techtrendske.co.ke/2025/04/10/fixo-solutions-unveils-e-hailing-platform-for-fundis-in-kenya/
42. Nsaboa — How it works: https://nsaboa.vercel.app/how-it-works
43. We Are Tech Africa — Fundis connects artisans with clients: https://wearetech.africa/en/fils-uk/solutions/fundis-connects-artisans-with-clients-through-its-web-and-mobile-platforms
44. People Daily — Digitising Kenya's informal workforce: https://peopledaily.digital/insights/digitising-kenyas-informal-workforce
45. JobNow — Platform Onboarding Officer at Gigmile: https://jobnow.ng/jobs/platform-onboarding-officer-at-gigmile
46. Startup Researcher — Gigmile secures seed funding: https://www.startupresearcher.com/news/gigmile-secures-seed-funding-to-scale-mobility-financing-in-africa
47. Launch Base Africa — Gigmile partners with Yango in Ghana (Jul 2024): https://launchbaseafrica.com/2024/07/01/gigmile-partners-with-yango-taxi-to-offer-car-loans-in-ghana/
48. Devpost — Fixam: https://devpost.com/software/fixam
49. Apple App Store — ServiceDey: https://apps.apple.com/us/app/servicedey/id6744445490
50. Apple App Store — Gotwork: https://apps.apple.com/app/gotwork/id6759814330
51. Apple App Store — LabourHunt: https://apps.apple.com/us/app/id6760726715
52. MyJoyOnline — Ayuda app launched: https://www.myjoyonline.com/ayuda-app-launched-to-tackle-unemployment-in-ghana/
53. TechEconomy — Wrkman moves to reset trust (Jul 2026): https://techeconomy.ng/wrkman-moves-to-reset-trust-in-nigerias-home-service-economy/
54. Nairametrics — Wrkman improving the gaps for home services (Dec 2022): https://nairametrics.com/2022/12/23/wrkman-improving-the-gaps-for-home-services-sector-in-nigeria
55. Citizen Digital — Gov't revives Kazi Mtaani: https://citizen.digital/article/govt-revives-kazi-mtaani-programme-seeks-113k-youth-for-manual-jobs-in-46-counties-n364091
56. The Star — How fake IDs, M-Pesa lock youths out of Kazi Mtaani payments: https://www.the-star.co.ke/news/2020-08-12-how-fake-ids-m-pesa-lock-youths-out-of-kazi-mtaani-payments
57. Kenyans.co.ke — PS Hinga explains why 2,000 Kazi Mtaani youth missed out: https://www.kenyans.co.ke/node/56593
58. The Kenya Times — Recruitment process of Kazi Mtaani under CRSP: https://thekenyatimes.com/featured/recruitment-process-of-kazi-mtaani-under-crsp-program/
59. TechCrunch — Lami raises $1.8M (May 2021): https://techcrunch.com/2021/05/04/kenyas-lami-raises-1-8m-to-scale-api-insurance-platform-across-africa/
60. TechCrunch — Lami raises $3.7M seed extension (Aug 2022): https://techcrunch.com/2022/08/02/kenyan-insurtech-lami-raises-3-7m-seed-extension-led-by-harlem-capital
61. Safaricom — Safaricom introduces Hakikisha feature to M-PESA: https://safaricom.co.ke/media-center-landing/press-releases/safaricom-introduces-hakikisha-feature-to-m-pesa
62. Safaricom — M-PESA Reversal terms and conditions: https://safaricom.co.ke/media-center-landing/terms-and-conditions/m-pesa-reversal
63. CGAP — Safaricom launches feature to stop erroneous transfers: https://cgap.org/node/2675
64. The Kenya Times — Why Hakikisha cannot be turned off (2026): https://thekenyatimes.com/business/safaricom-explains-why-its-hakikisha-extra-verification-feature-cannot-be-turned-off/
65. Camer.be — La carte virtuelle MoMo: https://www.camer.be/92248/11:1/cameroun-la-carte-virtuelle-momo-vient-ouvrir-les-utilisateurs-aux-paiements-en-ligne-a-linternationale-cameroon.html
66. Ecomatin — MTN MoMo lance une carte Mastercard: https://ecomatin.net/cameroun-mtn-momo-lance-une-carte-mastercard-pour-democratiser-les-paiements-en-ligne
67. Lefisk — MTN Mobile Money Cameroun guide: https://lefisk.cm/blog/mtn-mobile-money-cameroun-creer-consulter-debloquer-compte-momo-guide
68. Camer.be — MTN Cameroon MoMo zéro frais: https://www.camer.be/amp/85666/11:1/cameroun-lutte-contre-le-foirage-mtn-cameroon-connecte-ses-abonnes-a-momo-zero-frais.html
69. Apple App Store — Orange Max it Cameroon: https://apps.apple.com/us/app/-/id1116920093
70. Osiris — Orange lance Max it: https://osiris.sn/orange-lance-max-it-sa-super-application-d-offres-et-services-dans-cinq-marches.html
71. Lefisk — Orange Money Cameroun fonctionnement: https://lefisk.cm/blog/orange-money-cameroun-fonctionnement-comptes-frais-taxe-guide
72. iambeezy — Frais Orange Money Cameroun 2026: https://blog.iambeezy.app/fr/frais-orange-money-cameroun-2026-tarifs/
73. Quartz — How Wave rose to become Francophone Africa's first unicorn: https://qz.com/africa/2189528/how-wave-rose-to-become-francophone-africas-first-unicorn
74. African Business — Wave West Africa director interview (Apr 2023): https://african.business/2023/04/technology-information/senegal-is-experiencing-mobile-money-revolution-says-waves-west-africa-director
75. Apple App Store — Wave Mobile Money (Gambia): https://apps.apple.com/gm/app/id1523884528?l=en-gb
76. Chipper Cash Support — How do I send money to other Chipper users: https://support.chippercash.com/en/articles/3383789-how-do-i-send-money-to-other-chipper-cash-users
77. Chipper Cash Support — How to send USD to another Chipper user: https://support.chippercash.com/en/articles/8679664-how-to-send-usd-to-another-chipper-user

(Numbers 78–117, 120–123 and 195 were not assigned; numbering kept stable for cross-reference.)

118. TechCabal (FR) — Jumia Services (logistics): https://techcabal.com/fr/?p=61687
119. Wikipedia — Jumia: https://en.wikipedia.org/wiki/Jumia
124. AllAfrica — Bolt cuts offline trips by 42% in Nigeria (Jul 2025): https://allafrica.com/stories/202507140721.html
125. TechEconomy — Bolt now allows riders to cancel offline trips (Jan 2024): https://techeconomy.ng/bolt-now-allows-riders-to-cancel-offline-trips-for-enhanced-safety/
126. Techpoint Africa — New Bolt riders to take selfies before a ride request (Dec 2023): https://techpoint.africa/2023/12/11/bolt-riders-selfies-before-request/
127. WeeTracker — Nigeria's e-hailing drivers taking offline trips (May 2026): https://weetracker.com/2026/05/14/e-hailing-offline-trips-lagos-nigeria-cash-rides/
128. Techsoma — Bolt's pricing problem: https://techsoma.africa/bolts-pricing-problem-why-riders-are-paying-more-than-the-app-shows/
129. ITWeb — Bolt adds trusted contacts to in-app safety toolkit: https://itweb.co.za/article/bolt-adds-trusted-contacts-to-in-app-safety-toolkit/PmxVE7KEJGGqQY85
130. ITWeb — Bolt tightens rider verification as SA safety tools remain underused: https://www.itweb.co.za/article/bolt-tightens-rider-verification-as-sa-safety-tools-remain-underused/lwrKxq3Y2OE7mg1o
131. Techarena — Uber safety PIN feature in Kenya (Feb 2020): https://techarena.co.ke/2020/02/26/uber-safety-pin-feature-in-kenya
132. Uber Kenya Newsroom — New Safety Toolkit arrives in Kenya: https://www.uber.com/en-KE/newsroom/new-safety-toolkit-arrives-kenya/
133. Nairametrics — Uber launches new safety product to verify cash riders (Nov 2021): https://nairametrics.com/2021/11/29/uber-launches-new-safety-product-to-verify-cash-riders/
134. Khusoko — Uber announces Safety Check-Up feature (Sep 2022): https://khusoko.com/2022/09/06/uber-announces-new-safety-check-up-feature-for-riders/
135. Glovo Ghana — Issues with orders (help): https://delivery.glovoapp.com/gh/faq/hc_problems/issues-with-orders/
136. TechCabal — Redefining customer support for quick commerce (Glovo Nigeria): https://techcabal.com/?p=171323
137. TechCabal — Glovo is officially in Nigeria (Sep 2021): https://techcabal.com/2021/09/16/glovo-is-officially-in-nigeria-redefining-tech-driven-on-demand-delivery/
138. Trustpilot — Glovo reviews: https://ca.trustpilot.com/review/glovoapp.com
139. Techpoint Africa — Sendy ceasing operations (Aug 2023): https://techpoint.africa/2023/08/09/sendy-ceasing-operations-selling-assets/
140. TechCabal — Little Logistics serving Sendy's ex-clients: https://techcabal.com/?p=121706
141. Business Daily Africa — Sendy terminates online boda boda hailing: https://www.businessdailyafrica.com/bd/corporate/companies/sendy-terminates-online-boda-boda-hailing-service-after-two-months-2131934
142. BusinessDay — Inside Moniepoint's multimillion-dollar offline strategy: https://businessday.ng/technology/article/inside-moniepoints-multimillion-dollar-offline-strategy/
143. Legit.ng — Inside Moniepoint's playbook: https://www.legit.ng/business-economy/industry/1706596-inside-moniepoints-playbook-how-trust-tech-human-support-transform-agency-banking/
144. TechCabal — Moniepoint agents (daily settlement): https://techcabal.com/?p=86885
145. TeamApt Confluence — End user who relies on agent (persona): https://teamapt.atlassian.net/wiki/spaces/DT/pages/1636892920/End+user+who+relies+on+agent
146. Apple App Store — OPay: https://apps.apple.com/app/id1463776084
147. Apple App Store — OPay Business: https://apps.apple.com/us/app/id6467380679
148. Brands.ng — OPay review 2026: https://brands.ng/opay-review-in-nigeria-2026-is-it-safe-legit-and-worth-using/
149. Brands.ng — OPay customer complaints investigation: https://brands.ng/opay-customer-complaints-investigation/
150. Nairametrics — OPay customers panic over alleged fraudulent withdrawals (Oct 2023): https://nairametrics.com/2023/10/02/opay-customers-panic-over-alleged-fraudulent-withdrawals-company-reacts
151. Paystack — Storefront product page: https://paystack.com/storefront
152. Paystack Blog — Introducing Paystack Storefront: https://paystack.com/blog/product-engineering/storefront
153. Paystack Support — How do I set up a Storefront: https://support.paystack.com/hc/en-us/articles/360017856000-How-do-I-set-up-a-Storefront
154. Paystack Blog — Announcing Pay for Me: https://paystack.com/blog/product/pay-for-me
155. GSMA Ecosystem Accelerator — Twiga Foods case study (2018): https://www.gsma.com/mobilefordevelopment/wp-content/uploads/2018/05/Twiga-Foods-Improved-market-access-for-farmers-and-a-reliable-supply-for-vendors.pdf
156. eTrade for all — Making B2B e-commerce work in Africa: Twiga: https://etradeforall.org/node/9377
157. How We Made It In Africa — How Twiga Foods reduces the price of food: https://www.howwemadeitinafrica.com/how-twiga-foods-reduces-the-price-of-food-in-nairobi-using-technology/68379
158. AgFunder News — Wasoko closes $125M Series B: https://agfundernews.com/wasoko-closes-125m-series-b-for-its-pan-african-b2b-retail-platform
159. Catalyst Fund — Wasoko portfolio: https://www.thecatalystfund.com/portfolios/wasoko
160. PYMNTS — Wasoko takes on supply chain inefficiencies (2022): https://www.pymnts.com/supply-chain/2022/african-b2b-marketplace-wasoko-takes-on-supply-chain-inefficiencies/
161. Compass List — Kobo360 profile: https://compasslist.com/insights/kobo360-nigerias-uber-style-logistics-startup-turns-pan-african-dream-into-reality
162. TechAwk — Kobo360 unveils app (Apr 2019): https://techawkng.com/2019/04/01/logistics-kobo360-unveils-app
163. Engineering News — IFC-backed Uber of trucks reshapes Nigeria's haulage market (Sep 2019): https://www.engineeringnews.co.za/article/ifc-backed-uber-of-trucks-reshapes-nigerias-haulage-market-2019-09-02
164. Urban Company — Extended warranty terms: https://www.urbancompany.com/extended-warranty/tnc
165. Urban Company Blog — Safety protocol using Microsoft Azure Cognitive Services: https://www.urbancompany.com/blog/urban-company-strengthens-safety-protocol-using-microsoft-azure-cognitive-services
166. UXM Community (Medium) — Fixing the Heat: Urban Company AC booking UX: https://medium.com/uxm-community/fixing-the-heat-a-ux-journey-through-urban-companys-ac-service-booking-experience-to-impact-137e4bd7e7ef
167. Sharetribe — How to build a website like Urban Company (auto-assign model): https://www.sharetribe.com/create/how-to-build-website-like-urbancompany/ (167b: UC Engineering — Enabling platform stickiness through rebooking: https://medium.com/uc-engineering/enabling-platform-stickiness-through-rebooking-ebafecb82cb4 — title only, not read)
168. Consumer Complaints India — Urban Company service not given (OTP not entered): https://www.consumercomplaints.in/urban-company-service-not-given-properly-and-denial-of-service-given-at-all-when-amount-paid-c3516387
169. Helpsite support playbook — Unable to start the job (OTP fallback; not confirmed as official UC policy): https://cleaningsubscription.helpsite.com/articles/125792-unable-to-start-the-job
170. Urban Company — Electricians in Bangalore (30-day service guarantee): https://urbancompany.com/bangalore-electricians-banashankari-3rd-stage-hosakerehalli
171. Wikipedia — Urban Company: https://en.wikipedia.org/wiki/Urban_Company
172. NoBroker Blog — Best home cleaning apps (Housejoy): https://www.nobroker.in/blog/best-home-cleaning-app/
173. YourStory — Housejoy growth story (Sep 2016): https://yourstory.com/2016/09/housejoy-growth-story/
174. The News Minute — How Housejoy went to home construction: https://www.thenewsminute.com/atom/how-housejoy-went-home-repair-services-home-construction-and-renovation-120592
175. Business Standard — 57% Indians prefer regional languages for job search (Apna study): https://business-standard.com/article/companies/57-indians-prefer-using-regional-languages-for-job-search-apna-com-study-121120101216_1.html
176. Apna Career Central — How freshers can get a job on Apna: https://apna.co/career-central/how-freshers-can-get-job-apna-app/
177. YourStory — Apna product roadmap (Apr 2022): https://yourstory.com/2022/04/product-roadmap-with-user-feedback-loop-and-data-insights-apna-20-million-job-interviews-per-month-startup-unicorn/amp
178. Entrackr — Apna launches AI calling agent: https://entrackr.com/news/apna-launches-ai-calling-agent-to-cut-hiring-time-by-half-9687691
179. e27 — Kaodim shutters (Jun 2022): https://e27.co/east-ventures-backed-local-services-marketplace-kaodim-shutters-20220603/
180. The Star (Malaysia) — Kaodim to shut down on July 1: https://thestar.com.my/tech/tech-news/2022/06/02/malaysian-startup-kaodim-to-shut-down-on-july-1-cites-rising-costs-among-challenges
181. Tecnoblog — Como funciona o GetNinjas: https://tecnoblog.net/responde/como-funciona-o-getninjas/
182. GetNinjas — Termos de uso: https://www.getninjas.com.br/termos-de-uso
183. TecMundo — Como o GetNinjas funciona: https://www.tecmundo.com.br/software/215217-getninjas-funciona-contratacao-servicos-plataforma.htm
184. DIEESE — Revista Ciências do Trabalho (GetNinjas analysis, PDF): https://rct.dieese.org.br/index.php/rct/article/download/314/pdf/937
185. Habitissimo — ¿Qué es habitissimo?: https://habitissimo.es/acercade
186. Habitissimo — Seguridad: https://www.habitissimo.es/seguridad
187. Habitissimo — Consejos para evitar timos o estafas: https://habitissimo.es/evitar-timos-estafas
188. Habitissimo — Premium (professionals): https://www.habitissimo.es/premium
189. The Jakarta Post — Gojek to shut down several GoLife services (Dec 2019): https://www.thejakartapost.com/news/2019/12/17/gojek-to-shut-down-several-golife-services.html
190. TheSmartLocal — GoClean & GoMassage close down (2020): https://thesmartlocal.com/indonesia/golife-services-close-down/
191. Gojek Tech Blog — Gojek Chat: the gateway to successful order completion: https://blog.gojek.io/gojek-chat-the-gateway-to-successful-order-completion
192. CaseStudies.com — Gojek boosts driver feature adoption with Looppanel: https://www.casestudies.com/company/looppanel/case-study/gojek-customer-case-study
193. Top Gear Philippines — Grab Audio Protect and driver selfie (Sep 2024): https://www.topgear.com.ph/news/motoring-news/grab-audio-protect-driver-selfie-safety-a2619-20240917
194. Grab Philippines — Safety: https://www.grab.com/ph/safety/
196. ODECU — Informe Rappi (Chile, 2020, PDF): https://www.odecu.cl/wp-content/uploads/2020/02/Informe-Rappi.pdf
197. Portafolio — Usuarios de Rappi aumentan sus quejas: https://www.portafolio.co/negocios/empresas/rappi-usuarios-aumentan-sus-quejas-por-alzas-en-los-domicilios-577293
198. Reclamos.cl — Rappi: chantaje con propina (Feb 2026): https://www.reclamos.cl/rappi/reclamo/2026/feb/rappi-chantaje-con-propina
199. Rappi Colombia — Canales de soporte aliados (PDF): https://images.rappi.com/web/Aliados/soporte/CO_CanalesSoporte_Onepage_Rest.pdf
200. inDrive Help — How fares are calculated: https://indrive.com/help/passengers/how-fares-are-calculated
201. Top Gear Philippines — inDrive explainer (Dec 2023): https://www.topgear.com.ph/features/feature-articles/indrive-philippines-explainer-a4682-20231214-lfrm
202. Techpoint Africa — inDrive in Nigeria: https://techpoint.africa/?p=180208
203. BusinessTech — inDrive's bidding process redefines ride-hailing in South Africa: https://businesstech.co.za/news/industry-news/858376/indrives-bidding-process-redefines-ride-hailing-in-south-africa/
204. Microsoft Research — Designing Mobile Interfaces for Novice and Low-Literacy Users (Medhi Thies et al., 2011): https://www.microsoft.com/en-us/research/publication/designing-mobile-interfaces-for-novice-and-low-literacy-users/
