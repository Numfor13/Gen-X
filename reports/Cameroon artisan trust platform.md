# Turning Neighbourhood Word-of-Mouth into Portable Reputation

*Research report on designing, building, securing, monetising and launching a locally trusted reputation and service-matching platform for informal artisans in Cameroon. Synthesised from nine research notes current to 12 November 2026. Not legal advice: items flagged "lawyer" need Cameroonian counsel.*

## Executive summary

Launch with **domestic electricians in Douala's northern residential belt (Bonamoussadi, Makepe, Kotto)**. Run it as a **WhatsApp-, USSD- and agent-first trust layer** on a **Python/FastAPI serverless stack on AWS**. Verification should be community-anchored: two vouches from different social circles plus a practical test judged by peer masters. Reputation should be computed **only from jobs the platform can prove happened**: an OTP or QR handshake at the job, a mobile-money payment reference, and in-app before/after photos. Customers should see conservative "verified jobs + % satisfied" figures rather than inflated star averages. Cameroon does not lack artisans. It lacks a trusted system: **86.6% of jobs are informal**, only **2.1% of informal workers have written contracts**, and customers find tradespeople through neighbours, phone numbers painted on poles, and luck ([INS EESI3](https://ins-cameroun.cm/en/statistique/eesi3-phase-1-employment-survey-main-report/); [Ecofin](http://www.ecofinagency.com/public-management/0611-45017-cameroons-informal-workers-earn-an-average-of-cfa83-409-per-month-ins); [MIT Solve: Maibeta](https://solve.mit.edu/solutions/3333)).

At least seven Cameroonian startups have tried to digitise artisan hiring, and none has visibly reached scale. That points to liquidity and depth of verification as the bottleneck, not access to an app. Three legal constraints shape the build:

- **The platform must not hold customer funds.** Regulation 04/18/CEMAC/UMAC/COBAC reserves fund-holding to licensed institutions, so "escrow" has to sit in a licensed PSP's or aggregator's ring-fenced account, with the platform sending only release instructions.
- **Trust scores are a criminal-law risk until a lawyer clears them.** Data Protection Law 2024/017 criminalises "profiling" (Art. 65: 3–10 years). Scores must be consented to, based on service quality, explainable and open to human contest, and need a written legal opinion before automated scoring goes live.
- **Hosting is a cross-border transfer.** Cameroon has no AWS Region, so every transfer abroad legally needs prior authorisation from a data authority that, as of November 2026, has not been confirmed as operational.

The monetisation model that meets the "no upfront charge to artisans" rule has four parts:

- **A customer-paid protection fee** of about 8–10%.
- **A success commission** deducted only from payouts the artisan has already earned: 0% at launch, then 5–8% after the third paid job.
- **Higher-margin B2B contracts and diaspora milestone projects.** Household jobs contribute only about **XAF 650 (about €1) per job** at steady state, so these streams have to carry the business.
- **Ancillary revenue** from materials, credit and insurance referrals.

The report closes with a 12-week concierge pilot, expansion gates, a four-minute end-to-end demo, a register of open questions, and an 801-entry de-duplicated bibliography.

### Key decisions at a glance

| Decision | Recommendation | Main reason |
|---|---|---|
| Trade at launch | Domestic electricians (repairs, surge damage, solar/inverter wiring as add-on); plumbing in phase 2 | Highest safety cost of a bad hire, frequent and urgent demand, quality the customer cannot judge |
| Place at launch | Bonamoussadi + Makepe + Kotto (Douala V) | Dense middle-class landlords and households, high artisan supply, no anglophone-region shutdown risk |
| Channels | Field agents + WhatsApp + USSD + SMS + printed QR/numeric badge first; IVR voice second; PWA third | 53.7% of Cameroonians are offline; text menus fail first-time low-literacy users |
| Proof of skill | 5-tier ladder: registered → known locally (2-circle vouches) → work shown (OTP-confirmed jobs) → skill tested (2 masters) → trusted pro; CQP/VAE as parallel badge | Copies the RPL pattern used across Africa at low cost |
| Rating | Binary thumbs + tags, Beta posterior with 12-month decay, conservative lower bound displayed | Resists inflation; removed a racial earnings gap in a 2025 *Nature* study |
| Payments | Licensed PSP/aggregator collections + payouts; PSP-held hold-and-release; cash still allowed but weighted lower | CEMAC 04/18 licensing |
| Backend | FastAPI on Lambda (Web Adapter) + Aurora PostgreSQL/PostGIS + H3 + DynamoDB + EventBridge/SQS/Step Functions | Near-zero idle cost; same container moves to Fargate at scale |
| Region | eu-west-3 (Paris) primary, eu-west-1 DR, cell-ready for af-south-1; decided by an RTT test plus legal opinion | Cable topology favours Europe; both options are legal transfers needing authorisation |
| Revenue | Customer fee + post-earning commission + B2B + diaspora + ancillary | Fits the constraint; household margins are thin |

## 1. Cameroon's problem is a trust vacuum, not a skills shortage

### A huge, atomised and invisible workforce

Informal work is the norm in Cameroon. The INS EESI3 survey (2021 fieldwork) puts **86.6% of all jobs in the informal sector**. Informal non-agricultural work is **67.5% of urban employment** ([INS EESI3 page](https://ins-cameroun.cm/en/statistique/eesi3-phase-1-employment-survey-main-report/)). There are more than **3.4 million informal production units**, 63.7% of them urban and 56.1% headed by women ([Cameroon Tribune citing INS](https://www.cameroon-tribune.cm/article.html/61372/fr.html/details_2)). The units are tiny: 78.3% are one-person operations. Average informal income is **XAF 83,409 a month**. Only 2.1% of workers have a written contract, and 50.2% rely on verbal ones ([Ecofin](http://www.ecofinagency.com/public-management/0611-45017-cameroons-informal-workers-earn-an-average-of-cfa83-409-per-month-ins)).

Nobody knows how many artisans there are, and the official figures conflict:

- The crafts minister claims crafts are "more than 50%" of workers, with registered artisan production units rising from 11,814 (2019) to 72,508 (2025) ([EcoMatin](https://ecomatin.net/artisanat-le-cameroun-veut-sinspirer-du-modele-ivoirien-pour-booster-sa-contribution-au-pib)).
- The 2022 ministry yearbook counted only **5,912 registrations** that year ([Journal du Cameroun](https://fr.journalducameroun.com/entrepreneuriat-pres-de-350-000-pme-estimees-au-cameroun-en-2022/)).

These are probably different measures: annual flow versus cumulative stock. Neither comes close to the real population. That gap is the opening: no state register can tell a customer who is competent.

Supply is plentiful and under-used. Douala has the country's **highest unemployment (15.4%)**, national underemployment is **61.4%**, and only 1.1% of jobseekers use employment agencies ([INS EESI3 full report](https://ins-cameroun.cm/wp-content/uploads/2025/07/EESI3_Rapport-principal_Emploi_VF.pdf)). The binding constraint is matching and trust, not the number of workers.

### How hiring works today, and how it fails

Customers find artisans through personal networks, the trainer (*patron*) an artisan learned under, numbers painted on poles, and walk-up workshops. Maibeta's founders summed up the market: households face "inconsistent pricing, limited accountability, and uncertainty about work quality". The core problem is "a lack of a trusted system", not a lack of skilled workers ([TEF: Maibeta](https://www.tonyelumelufoundation.org/?p=29130)).

The local trust signals already exist offline. Buea apprentices say "when people know your trainer, they become confident in you… that's why you will always see certificates and pictures in most shops" ([Frontiers in Education 2022](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2022.1027632/pdf)). Classifieds such as CoinAfrique offer no verification beyond warnings not to send money before checking ([CoinAfrique](https://cm.coinafrique.com/)). That warning implies advance-payment fraud is common.

The documented failures fall into three groups. **Safety failures** are the most serious:

- Fires blamed on chaotic wiring, low-end equipment and power-cut surges are recurring in Yaoundé, Douala and Bafoussam, and Douala's Mboppi market burned at least three times in 2025 ([Le360](https://afrique.le360.ma/societe/cameroun-linquietante-recrudescence-des-incendies-dans-les-grandes-villes-du-pays_X66WKF3BDVCNJA47I47GXLIN5U/)).
- In February 2026 a mother and five children died in a Yaoundé house fire, with a short circuit among the hypotheses ([AllAfrica](https://fr.allafrica.com/stories/202602200594.html)).
- No national register of domestic electrocutions exists, and experts urge people to hire "a certified electrician" that customers have no way to identify ([Camer.be 2026](https://www.camer.be/amp/93595/11:1/cameroun-rallonge-defectueuse-le-danger-silencieux-qui-tue-dans-nos-maisons-cameroon.html)).
- Building collapses killed 33 people in 2023 and 6 in **Bonamoussadi in July 2026**, the proposed pilot area ([Journal du Cameroun](https://fr.journalducameroun.com/cameroun-douala-de-16-a-33-morts-le-bilan-salourdit-apres-effondrement-dun-immeuble/); [Camer.be](https://www.camer.be/amp/93934/11:1/cameroun-douala-6-morts-dans-leffondrement-dun-immeuble-a-bonamoussadi-cameroon.html)).

**Reliability failures** include missed deadlines (Buea tailors admit they "do not meet deadlines") and abandoned sites. **Price failures** take the form of opaque, inconsistent quotes. One widely repeated claim, that "85% of fires are electrical", **could not be verified** on the source page and should not be used.

### The state framework is shallow

Law No. 2007/004 governs crafts. Artisans register free at Communal Crafts Offices (BCA) for a card that requires an ID, a workshop plan and photos. The card verifies identity and location, not competence, and mainly unlocks fairs and training ([Cameroon Desks](https://www.cameroondesks.com/2025/04/liste-des-metiers-de-l-artisanat-cameroun-sty.html)). A dedicated Chamber of Trades has been planned without success. A 2026 op-ed argues registration is burdensome "without any immediate perceived benefit" ([Camer.be op-ed](https://www.camer.be/93491/30:27/cameroun-creer-une-chambre-de-metiers-comme-levier-de-transition-vers-une-economie-formelle-cameroon.html)).

Cameroonian competitors confirm demand but not traction:

- **QwickServices** launched in Douala in April 2026 with 2,000+ categories, escrow-style payment and the Fon of Mankon on its board ([Cameroon Tribune](https://www.cameroon-tribune.cm/article.html/76197/en.html/details_2)).
- **Quicky** in Yaoundé reported about 500 downloads ([WeAreTech](https://www.wearetech.africa/en/fils-uk/news/cameroons-quicky-services-bridges-clients-and-providers-via-mobile-app)).
- **OmniJobber** (2018) recruited providers door to door and charged 8–20% commission ([MIT Solve](https://solve.mit.edu/solutions/2777)).

**Implication:** compete on depth of verification and local vouching in one trade and one area, not on breadth of categories.

### Why electricians in Douala-North

The trade choice is well supported by the evidence. Electrical work maximises the gap between how valuable a good reputation is and how hard quality is to observe:

- Wiring is hidden in walls, which makes it a classic "credence good".
- Failures can be fatal.
- Outages and surges make demand frequent and urgent.
- Urban electricity access is 87.6% ([INS ECAM5](https://ins-cameroun.cm/wp-content/uploads/2025/07/Page-ODD-ECAM5-En.pdf)).

The neighbourhood choice is a reasoned judgement, at moderate confidence, that a short field scan should validate. Bonamoussadi is Douala's main northern housing area and Kotto its middle-class hub ([Wikipedia: Douala](https://en.wikipedia.org/wiki/Douala)). Buea and Bamenda are ruled out for a first pilot by the anglophone conflict and the 2017 shutdowns: **93–94 days** offline, followed by about four more months of social-media restriction ([Access Now](https://www.accessnow.org/wp-content/uploads/2017/10/Cameroon_RE-Internet-Connectivity.pdf)).

**Conflict resolved.** The launch notes (09) use plumbing as their worked example, while the context note (01) and business note (08) favour electrical work. This report picks **electricians first and plumbing as the first adjacent trade**, because many Douala artisans advertise as "électricien-plombier" anyway, and electrical work offers both the stronger safety story and an emerging certification route.

## 2. Artisans prove skill through vouches, verified jobs and peer-judged tests

### Copy the African RPL pattern, cheaply

Across Kenya, Ghana, Nigeria, South Africa and Benin, recognition of prior learning (RPL) follows the same structure: **practical demonstration, portfolio, screening interview, and an optional knowledge check**, with **trade associations as mobilisers and master artisans as assessors**. Three examples:

- Kenya's NITA runs awareness → screening → portfolio assessment → practical assessment → certification ([NITA](https://www.nita.go.ke/news/NITA/355-implementation-of-recognition-of-prior-learning-rpl.html)). Its jua kali federation identified the candidates ([NITA, 8 counties](https://nita.go.ke/news/NITA/354-rpl-extended-pilot-roll-out-nita-undertakes-screening-of-rpl-candidates-in-8-counties.html)).
- Benin's CQM **replaced the "diplôme de libération" previously issued by master artisans** ([Gouv.bj](https://www.gouv.bj/article/2425/lancement-examen-renove-session-octobre-2023-nouvelle-ere/)). This shows that master-signed graduation already carries social legitimacy in francophone Africa.
- The ILO concludes that "bottom-up skills assessments are feasible and yield multiple benefits" if well managed ([ILO 2015](https://www.ilo.org/publications/assessing-skills-informal-economy-resource-guide-small-industry-and)).

Cameroon has the legal basis but not yet the scale:

- A 2019 law added VAE (validation of prior learning) ([La Base Lextenso](https://www.labase-lextenso.fr/l-essentiel-droits-africains-des-affaires/2019-n4/cameroun-une-loi-pour-promouvoir-l-apprentissage-DAA112b8)), and Decree 2020/2592 tasks training establishments with promoting it ([Décret 2020/2592](https://www.spm.gov.cm/site/sites/default/files/decret_ndeg_2020_2592.pdf)).
- In July 2026 the ministries validated occupational standards and **candidate portfolios** for a construction-sector RPL framework. It is **not yet operational** ([ILO, Aug 2026](https://www.ilo.org/resource/news/cameroon-lays-foundation-recognizing-skills-gained-through-labour-based)).
- The only active household-adjacent VAE route found is for mechanics, through CRAMA–MINEFOP ([fundsforNGOs](https://news.fundsforngos.org/2026/10/07/cameroon-minefop-crama-renew-automotive-training-certification-2026/)).

State certification can therefore only be a top badge held by a minority. It cannot be a gate to joining.

### Staked, diverse, expiring vouches

Microfinance research shows social ties can substitute for collateral. Network connections work as collateral, and strong ties improve job recommendations ([Karlan et al., QJE 2009](https://econpapers.repec.org/RePEc:oup:qjecon:v:124:y:2009:i:3:p:1307-1361.)). Giné and Karlan found, however, that repayment held up when joint liability was dropped, as long as public meetings continued ([Giné & Karlan](https://ideas.repec.org/p/cgd/wpaper/111.html)). Visible, repeated accountability does the work; financial co-liability is not needed.

Web3 identity systems add three engineering rules:

- vouches must come from diverse clusters (BrightID);
- credentials carry weights and expire (Human Passport stamps expire after 90 days) ([Human Passport](https://support.passport.human.tech/stamps/stamp-weights));
- transitive trust should be seeded from pre-trusted local anchors (EigenTrust) ([EigenTrust](https://www.csd.uwo.ca/~hlutfiyy/610/papers/eigentrust.pdf)).

In Cameroon, njangi groups already enforce trust through social exclusion ([Fair Observer](https://fairobserver.com/?p=34530)). Vigilance committees are a warning, though. Douala's post-2017 self-defence committees abused residents and had to be purged ([Camer.be](https://www.camer.be/amp/63232/11:1/cameroun-lutte-contre-le-terrorisme-douala-sous-haute-surveillance-cameroon.html)). Chiefs and committees should therefore count as **one signal, never a gate**, and every decision should be open to appeal.

### Recommended verification ladder

| Tier | Badge | Requirement | Signals |
|---|---|---|---|
| 0 Registered | grey circle | Phone OTP; name matches mobile-money account; live selfie; trade and quarter declared | Real, reachable person |
| 1 Known locally | green house | ≥2 vouches from *different* circles: trade (master, association head) **and** residence/faith (chef de quartier, pastor/imam, women's-group leader); workshop checked once by agent | "People here know him/her" |
| 2 Work shown | camera | ≥5 in-app, server-timestamped, hash-unique job photos **and** ≥3 OTP-confirmed jobs from distinct customer numbers | Has recently done this work |
| 3 Skill tested | hammer + tick | Recorded 30–90-minute standard task scored by **two** association masters on a 10–15-item checklist aligned to MINEFOP standards, **or** a verified CAP/CQP/DQP/VAE certificate | Peer-judged competence |
| 4 Trusted pro | gold star | ≥20 verified jobs over ≥6 months; conservative satisfaction above the local threshold; no unresolved disputes | Sustained reliability |
| Parallel | flag | Official MINEFOP qualification verified | Formal recognition and bridge to VAE |

The ladder runs under four rules:

- **Vouch budget.** Each voucher holds at most five active vouches. An upheld fraud, abuse or no-show-with-deposit complaint within 12 months costs the voucher reputation. Two such events cost vouching rights. Vouches expire after 12 months.
- **No single gatekeeper.** Associations nominate assessors and earn a fee per test, but cannot grant Tier 1 or Tier 3 alone (the two-circle and two-master rules).
- **Decay.** Badges lapse without activity: Tier 2 needs at least one verified job per 90 days.
- **Inclusion.** Women and displaced anglophone artisans, who lost their home networks, can use a women's-group or faith leader as their residence-circle voucher and can ask for a female assessor.

The pilot should measure inter-rater agreement between the two masters (target kappa ≥0.6, an assumption) and whether the Tier 3 score predicts later complaints. Every numeric parameter here is a design starting point, not a value calibrated for Cameroon.

## 3. Customers trust what the platform can prove, shown simply

### Only verified jobs count

Raw star averages fail everywhere:

- The median eBay seller shows **100% positive**, but "effective percent positive" averages only 64%, because unhappy buyers leave silently ([Nosko & Tadelis, NBER](https://www.nber.org/papers/w20830)).
- Airbnb ratings average about 4.7 ([Zervas et al.](https://people.bu.edu/zg/publications/airbnbreviews.pdf)).
- Ratings inflate over time as raters lower their standards ([Filippas, Horton & Golden](https://john-joseph-horton.com/papers/reputation-inflation/)).

Booking-gated platforms show less manipulation than open ones ([Mayzlin et al., NBER](https://nber.org/papers/w18340)). The founding rule is therefore **no review without a verified job**.

Photo metadata is not proof on its own. EXIF timestamps can be edited and mock-location apps are legal ([TrueScreen](https://truescreen.io/articles/certified-geolocation-court-admissible-photo-evidence/)). Hardware-signed C2PA provenance exists on premium phones like the Pixel 10 but will not reach low-end Android soon ([Google Security Blog](https://security.googleblog.com/2025/09/pixel-android-trusted-images-c2pa-content-credentials.html)). Proof must rest on **customer-side confirmation plus server-side checks**:

1. A customer-initiated booking.
2. A one-time code from the customer's phone (SMS, USSD or app), entered by the artisan.
3. Live-camera before/after photos only, hashed and server-timestamped with coarse location.
4. Where possible, a mobile-money reference tied to the job.

Urban Company adds an arrival selfie checked against the professional's identity, so that "jobs are not passed onto someone else" ([Urban Company](https://www.urbancompany.com/blog/urban-company-strengthens-safety-protocol-using-microsoft-azure-cognitive-services)).

### Binary ratings, a conservative score and simultaneous reveal

A 2025 *Nature* field study of 100,759 home-services jobs is decisive here. Under five-star ratings, non-white workers earned about 91 cents per dollar earned by white workers. **Switching to thumbs up/down eliminated the gap** ([Rice University](https://news.rice.edu/news/2025/racial-earning-gap-gig-work-eliminated-through-new-rating-system)). Airbnb's simultaneous-reveal experiment raised review rates and produced more candid reviews ([Fradkin et al.](https://papers.ssrn.com/abstract=2939064)). Uber sets minimum ratings **per city** because rating cultures differ ([Uber](https://www.uber.com/za/en/blog/driver-deactivation-policy/)). And hiring newcomers produces information that benefits everyone, so the platform should subsidise first jobs ([Pallais, NBER](https://www.nber.org/papers/w18917)).

The recommended score works as follows:

- **Eligible feedback.** Only feedback from OTP- or payment-confirmed jobs counts, with at most one counted rating per customer phone per artisan per 30 days.
- **Format.** Thumbs up or down plus tap tags: on time, price kept, clean, respectful, would hire again.
- **Decay.** Each job carries a weight of exp(−ln2·age/365), a **12-month half-life**.
- **Silence counts.** Confirmed jobs with no feedback add λ≈0.25 to the negative count, as in the eBay "effective percent positive" logic.
- **Prior.** Beta(α₀=4, β₀=1).
- **Display.** The 10th percentile of Beta(α₀+R, β₀+S), shown as "% satisfied" beside the **count of verified jobs**. Jøsang's Beta reputation system and the Wilson lower bound both keep thin records from looking stronger than they are ([Jøsang & Ismail](https://mn.uio.no/ifi/english/people/aca/josang/publications/ji2002-bled.pdf); [Evan Miller](https://evanmiller.org/how-not-to-sort-by-average-rating.html)).
- **Reveal.** Both sides' ratings are revealed together after both submit or after 7 days.

**Conflicts resolved.** The notes disagree on three parameters:

- *Rating scale.* The channels note (05) proposes 1–5 smiley faces mapped to keypad digits, and the demo script (09) shows stars. The reputation note (03) argues for binary. This report keeps a **binary scored signal**, collected on USSD and IVR as "1 = 👍, 2 = 👎". Smiley faces stay as a visual aid only.
- *Review window.* The anti-fraud note (04) suggests 14–30 days; note 03 suggests 7. Use a **7-day reveal window** for ratings, since jobs are short, and a separate **30-day workmanship-guarantee window** for complaints.
- *Half-life.* Note 04's 12–18 months versus note 03's 12. Start at 12 and tune.

### What the customer sees

For low-literacy users, text-free interfaces with graphics and voice are strongly preferred ([Medhi et al.](https://courses.cs.washington.edu/courses/cse490d/09au/papers/Text-FreeUI.pdf)). Trust also transfers from known, linked parties ([Stewart 2003](https://ideas.repec.org/a/inm/ororsc/v14y2003i1p5-17.html)).

The artisan card should show:

- a large face photo and a trade pictogram;
- 3–6 recent in-app job photos;
- "**34 jobs checked ✔**" and "**92% 👍**" (conservative);
- the top two tags as icons and the tier badge as a coloured shape;
- a moderated 15–30-second voice testimonial;
- a neighbour line ("**5 people from your quarter hired him**"), computed from verified jobs;
- a "Garantie" shield on first jobs.

Two warnings apply. First, never tie the verification badge to paid promotion. Jiji shows "Verified" only to sellers who buy boost packages, which empties the badge of meaning ([Jiji FAQ](https://jiji.ng/faq/125)). Second, voice testimonials need moderation and a no-reply option, because women on voice forums face harassment ([Vashistha et al.](https://ictd.cs.washington.edu/docs/papers/2019/vashistha_chi2019_threat.pdf)).

In Cameroon specifically, a PLS-SEM survey of 273 households found that **trust built from repeated good experiences and operators visibly monitoring risk** drove continued mobile-money use more than institutional assurances did ([Abertay University](https://rke.abertay.ac.uk/en/publications/the-role-of-cybersecurity-and-trust-on-customers-continuous-usage/)). The platform should therefore *show* that it is watching: a one-tap report button, fraud warnings, and visible action on reports.

### Trust runs both ways

Fairwork audits in Kenya and Nigeria repeatedly found ratings "often biased towards customers" and deactivations without due process ([Fairwork Kenya 2023](https://fair.work/wp-content/uploads/sites/17/2023/12/Fairwork_kenya_Report_2023.pdf); [Fairwork Nigeria 2023](https://fair.work/wp-content/uploads/sites/17/2023/07/Fairwork-Nigeria-Ratings-2023-report-red-1.pdf)). The platform should commit to five protections from day one:

- Artisans rate customers ("paid as agreed", "respectful", "safe site").
- Repeat non-payers must pay a deposit before booking.
- No automatic deactivation from ratings alone.
- Every decision comes with written reasons, a 14-day appeal and human review.
- A monthly bias audit (see section 10 for the data-protection limits on how it is done).

## 4. Fast, fair matching comes from a small ranked shortlist and published price bands

### Retrieve, rank, explore, dispatch

The matching engine should be a transparent two-stage pipeline:

- **Retrieval.** A SQL query of under 50 ms pulls artisans with the right skill inside H3 resolution-8 rings k≤2–3 around the request (each cell is about 0.74 km² ([H3 table](https://h3geo.org/docs/core-library/restable/))). Candidates must be active, verified to the tier the job category requires, not overloaded, and available.
- **Scoring.** score = w1·trust_lcb + w2·f(distance) + w3·responsiveness + w4·price_fit + w5·availability − w6·load + exploration_bonus. The weights live in config so ops can tune them per city.
- **Logging.** Every impression, contact, quote, hire and outcome is logged so the platform can move to learning-to-rank once it has thousands of outcomes.

Thumbtack moved from heuristics to ML and measured position bias using randomised allocation ([Thumbtack, arXiv](https://arxiv.org/pdf/2206.11720v1)). Airbnb lifted new-listing bookings **14%** by replacing a default value for new listings with a learned estimate ([Airbnb, arXiv](https://arxiv.org/pdf/2002.05515.pdf)). Fairness of exposure treats ranking as an obligation to the people being ranked ([Singh & Joachims](https://arxiv.org/abs/1802.07281)). Hence **one in five slots goes to an exploration pool**: new artisans who are verified and vouched but have no reviews, chosen by Thompson sampling. Cumulative exposure per artisan is capped so a few stars do not capture all demand.

Dispatch depends on urgency:

- **Scheduled jobs:** a shortlist of 3–5 the customer chooses from.
- **Urgent jobs** (sparking socket, total outage): offers go to the top 3 with a 2–5 minute acceptance window, then cascade to the next 3. Lynk gave pros 15 minutes to reply Yes/No by SMS and matched in 2–6 hours ([GSMA: Lynk](https://www.gsma.com/mobilefordevelopment/wp-content/uploads/2019/05/Lynk-Connecting-informal-workers-to-job-opportunities-in-Kenya.pdf)).
- **High concurrency:** above about 20 urgent requests per minute in a zone, switch to batched Hungarian assignment (SciPy `linear_sum_assignment`), the DoorDash "predictions plus optimisation" pattern ([DoorDash](https://careers.doordash.com/?p=5342)).

Stable-matching algorithms are unnecessary. Neither side holds full preference lists.

### Fair price without surge

Price opacity is a named pain point. Lynk found open quoting produced slow, inconsistent quotes, while standardised fixed-price packages gave customers a pro within two hours ([The Flip: Lynk](https://theflip.africa/newsletter/lynk-lessons-learned-the-hard-way/)).

The pricing approach has three parts:

- **Price observations.** Record quoted and final prices per job category and H3 resolution-7 zone.
- **Published bands.** Show P25–P75 of final prices over 90 days, with a minimum of 20 jobs and fallback to city level ("typical: 8,000–15,000 FCFA"). Nudge quotes above P90 rather than blocking them.
- **Standard packages.** Publish fixed price ranges in French and Pidgin for the ten most common jobs: install socket, replace breaker, earth a circuit, and so on.

The working price hypotheses (unverified, to validate in 30–50 interviews) are XAF 5,000–15,000 for an electrician call-out and small repair, and XAF 100,000–500,000+ for a full rewiring. **No dynamic surge at MVP.** Surge would damage trust in an informal market. Supply and demand per hexagon should drive *incentives* (extra exposure for artisans in under-supplied cells) instead ([Uber H3](https://www.uber.com/en/blog/h3/)).

Two service-level targets anchor the "fast" promise: median time-to-match **≤2 hours for urgent jobs** and median arrival **≤4 hours**.

## 5. Low literacy, low data and local languages require WhatsApp, USSD, voice and people

### The reach constraints

Mobile phones reach nearly everyone, but the internet does not:

- **32.1 million cellular connections (104% of population) but only 14.3 million internet users (46.3%)**, with 16.6 million people offline, as of October 2026 ([DataReportal 2027](https://datareportal.com/reports/digital-2027-cameroon)).
- Personal phone ownership is **59.4% of adults** (urban 70%, rural 45%) ([INS ECAM5](https://ins-cameroun.cm/wp-content/uploads/2025/07/Page-ODD-ECAM5-En.pdf)).
- Data costs **$1.63/GB** ([Les Afriques](https://lesafriques.com/en/2026/10/the-real-price-of-data-in-africa-ranking-of-53-countries-0-38-to-43-75-per-gb/)).
- Adult literacy is about 78%, with rural and female deficits.

**Conflict resolved.** DataReportal's late-2025 edition gave 12.6 million users (41.9%) ([DataReportal 2026](https://datareportal.com/reports/digital-2026-cameroon)). The series is revised between editions, so treat the levels as approximate: **roughly 42–46% online**.

Language follows geography. Douala is French-dominant, with Duala as its lingua franca and Camfranglais among youth. About half of Cameroonians speak Pidgin in some form ([Wikipedia: Cameroonian Pidgin](https://en.wikipedia.org/wiki/Cameroonian_Pidgin_English)).

The HCI evidence is blunt. "Textual interfaces are unusable by first-time low-literacy users". That includes SMS and USSD menus. A **live operator was up to about 10x more accurate** than text interfaces ([Microsoft Research, Medhi Thies et al.](https://www.microsoft.com/en-us/research/publication/designing-mobile-interfaces-for-novice-and-low-literacy-users/)).

### Recommended channel mix

| Channel | Artisans | Customers | Cameroon provider route | Indicative cost |
|---|---|---|---|---|
| Field agents ("ambassadeurs de quartier") | Core onboarding, verification, photo/ID capture | Assisted booking, dispute calls | Recruited from associations, churches, mobile-money kiosks | Stipend + per-activation bonus (not sourced) |
| WhatsApp bot (Flows, voice notes) | Portfolio photos, voice job reports (smartphone owners) | **Core**: request, receive shortlist, rate by voice note | Meta Cloud API via pass-through BSP or AWS End User Messaging Social | Utility $0.004, marketing $0.0225 per template; user-initiated free ([Meta](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing); [Whautomate](https://whautomate.com/whatsapp-business-api-pricing)) |
| USSD | **Core**: register, availability toggle, accept leads, confirm job, check own score | Verify artisan by numeric ID, quick rating | Local VAS aggregator (LMT, Nexah) or #237# switch — **not Africa's Talking** (no Cameroon coverage) ([AT](https://help.africastalking.com/en/articles/2727792-which-countries-are-africa-s-talking-products-in)) | 10 XAF/session, 120 s max (Orange 2020) ([ART catalogue](https://www.art.cm/sites/default/files/documents/catalogue%20da%20interconnexion%202020%20-%20fournisseurs%20sva-converted-compressed.pdf)); vendor quote 250k XAF/month/operator + 15 XAF/session ([HelloDuty](https://helloduty.com/country/cameroon)) |
| SMS | OTP, job alerts, completion codes | Job confirmation code, review request | Local aggregator (cheapest) plus AWS End User Messaging as second path | 3.5–8 XAF wholesale (Orange 2020); about $0.035 retail ([D7](https://d7networks.com/sms/cameroon/)) |
| IVR / missed-call call-back | Audio menus in French/English/Pidgin, recorded voice profile | Inclusive line for basic phones | Local contact centre (LMT: 400+ multilingual agents) ([LMT](https://www.lmtgroup.com/)) | Per-minute rates not retrieved |
| QR + printed 6-digit ID | On vest, badge, workshop sign, sticker on installed fixture | Scan, or dial/SMS the ID | Local printing | One-off, not sourced |
| PWA (<1 MB first load) | Profile management | Public profile behind QR | Self-hosted | About 1–3 XAF per 2 MB page at MTN prices ([MTN bundles](https://mtn.cm/offers/welcome-to-the-mtn-internet-space/)) |

The design rules that follow from the evidence:

- **One numeric artisan ID** works across QR, USSD, SMS and IVR.
- **Shallow menus:** two to three levels and about five options, to fit the 120-second USSD session.
- **Ratings by keypad.**
- **Recorded audio prompts, not text-to-speech.** AWS Transcribe, Polly and Lex, Google Chirp and Whisper cover French and English but **no Cameroonian Pidgin or local language** ([AWS Transcribe](https://docs.aws.amazon.com/transcribe/latest/dg/supported-languages.html); [Google STT](https://docs.cloud.google.com/speech-to-text/docs/speech-to-text-supported-languages)). Pidgin and local-language voice notes are stored as audio and tagged by human moderators, the CGNet Swara model ([CGNet Swara](https://en.wikipedia.org/wiki/CGNet_Swara)).
- **Skip KaiOS.** Its web share in Cameroon is 0%, against 82.8% for Android ([StatCounter](https://gs.statcounter.com/os-market-share/mobile/cameroon)).
- **Lean on cheap WhatsApp bundles.** MTN sells WhatsApp-only data from **25 XAF for 25 MB**, which makes voice-note and photo workflows affordable for artisans who own a smartphone ([MTN](https://mtn.cm/offers/whatsapp-tiktok-bundles/)).

Six channel facts need resolving:

- **Two-way SMS.** AWS says Cameroon supports short codes and two-way SMS. Twilio says two-way is not supported ([AWS](https://docs.aws.amazon.com/sms-voice/latest/userguide/phone-numbers-sms-by-country.html); [Twilio](https://www.twilio.com/en-us/guidelines/cm/sms)). **Route inbound "reply 1/2" ratings through a local aggregator's short code.**
- **Sender ID.** Register it about 3–4 weeks before launch.
- **Orange's self-serve SMS API** is discontinued from 1 December 2026 ([Orange Developer](https://developer.orange.com/apis/sms-cm)).
- **USSD access has been politically contested.** MTN suspended Express Union's code in 2017 and the minister intervened ([Camer.be](https://www.camer.be/actualites/societe/cameroon-cameroun-conditions-dacces-aux-codes-ussd-letat-siffle-la-fin-de-la-recreation-dans-le-secteur-des-telecommunications.html)). Get written commitments and keep the #237# national switch as a fallback ([ITWeb](https://itweb.africa/article/cameroon-looks-to-level-financial-services-playing-field/KWEBb7yZBGEMmRjO)).
- **WhatsApp pricing changed on 1 October 2026.** Service replies above 1,000 a month per number are now charged, which favours user-initiated conversations.
- **No reliable WhatsApp penetration figure** for Cameroon was found.

## 6. One end-to-end demo journey, from verification to recorded reputation

The demo should show **one real journey with evidence**, framed inside the "one trade, one quarter" story. Judges and partners reward a complete loop over breadth ([Paul Graham](https://paulgraham.com/ds.html); [a16z glossary](https://a16z.com/the-marketplace-glossary/)). Below, each step names the channel, the system action and the domain event the backend records.

| Step | What happens (persona: Jean-Paul, electrician; Madame Ngo, Bonamoussadi) | Channel | Backend action and event |
|---|---|---|---|
| 1. Register | Agent onboards Jean-Paul at a "Journée de vérification" at the association hall; phone OTP; mobile-money name match; live selfie with liveness; CNI or récépissé photo; trade and quarter | Agent PWA + SMS OTP | Cognito OTP; Rekognition liveness + face dedupe; ID image deleted after check; `ArtisanRegistered`, `IdentityVerified(level=0→1)` |
| 2. Vouch | Association head and chef de quartier vouch (two circles) in person; workshop geotagged by agent | Agent PWA / USSD for vouchers | `VouchGiven(voucher, vouchee, circle, stake)`; vouch budget decremented |
| 3. Skill test | 45-minute standard task (wire and earth a circuit with breaker), scored by two masters on a checklist; video stored privately | Agent PWA | `SkillCertified(tier=3, assessors, scores)`; inter-rater check |
| 4. Badge | Vest, laminated badge with QR + 6-digit ID printed on site | Print | Public profile URL; numeric ID live on USSD/SMS |
| 5. Request | Madame Ngo sends a French voice note on WhatsApp: "Ma prise fait des étincelles" ("my socket is sparking"); shares location pin; agent-operator or rules classify "urgent electrical" and show price band | WhatsApp | `JobRequested(category, h3_r8, urgency)`; price band lookup |
| 6. Match | Top 3 verified electricians within ring k≤2 get a 3-minute offer by WhatsApp/SMS; Jean-Paul accepts on USSD ("1 = accept"); customer sees his card ("34 jobs checked ✔, 92% 👍, 5 people from your quarter hired him") | WhatsApp, USSD, SMS | Step Functions job workflow; `JobAccepted`; exact address revealed only now; numbers masked |
| 7. Pay into protection | Customer pays labour + 10% protection fee via MoMo/Orange Money collection request through a licensed aggregator; funds held in **PSP's** ring-fenced account | MoMo/OM prompt | `PaymentConfirmed(psp_ref)` only after server-to-server status check |
| 8. Do the job | Arrival selfie; live-camera "before" photo; repair; "after" photo; QR sticker placed on the breaker panel | WhatsApp/PWA camera | Photos hashed (perceptual hash), server-timestamped, coarse H3 r9; `JobStarted(geo, photo)` |
| 9. Complete | Customer reads 6-digit completion code (sent by SMS at job start) to Jean-Paul, who enters it via USSD | SMS + USSD | `JobCompleted(completion_code_verified=true)`; release instruction sent to PSP; payout to Jean-Paul's wallet |
| 10. Rate and record | Both sides rate within 7 days (customer: 👍 + "on time", "clean"; artisan: "paid as agreed"); simultaneous reveal; Jean-Paul's verified-jobs count and conservative score update; job appears on public profile as a "verified job" | WhatsApp / USSD keypad | `ReviewSubmitted`; incremental reputation update; nightly graph audit |
| 11. Dispute path (one slide) | If the socket fails within 30 days: free return; else platform pays another artisan up to the guarantee cap; escalation platform → association → chief (if both agree) | Any | `DisputeOpened/Resolved`; voucher stake affected only if upheld |

```
 Madame Ngo                 Platform core (AWS)                 Jean-Paul           Licensed PSP
     |  WhatsApp voice note       |                                  |                    |
     |--------------------------->| JobRequested -> retrieve/rank    |                    |
     |                            |-- offer (WhatsApp/SMS, 3 min) -->|                    |
     |                            |<------- USSD "1" accept ---------|                    |
     |<-- artisan card + price ---| JobAccepted (address revealed)   |                    |
     |-- approve MoMo prompt ---------------------------------------------------------->  |
     |                            |<-------- webhook + status query ------------------------|
     |                            | PaymentConfirmed (PSP holds funds)                     |
     |<-- SMS completion code ----|                                  |-- photos (live) -->|
     |-- reads code to artisan ---------------------------------->   |                    |
     |                            |<--- USSD enters code ------------|                    |
     |                            | JobCompleted -> release instr. ------------------------>|
     |                            |                                  |<--- payout --------|
     |-- 👍 + tags (7-day blind) ->| ReviewSubmitted -> score update  |-- rates customer ->|
```

A few rules keep the demo honest. Use seeded but clearly labelled data, and disclose any Wizard-of-Oz operator. Faking activity carries "serious reputational risk" ([NFX](https://www.nfx.com/post/19-marketplace-tactics-for-overcoming-the-chicken-or-egg-problem)). Bring physical artefacts (vest, badge, sticker), show the SMS/USSD fallback, and keep a pre-recorded video in case of network failure.

## 7. Build it as a serverless Python modular monolith on AWS, cell-ready from day one

### Architecture

```
                         +-----------------------------------------------+
  USSD aggregator ------>| API Gateway /ussd -> UssdAdapter λ (SnapStart)|--+
  (LMT/Nexah/#237#)      +-----------------------------------------------+  |
  WhatsApp (EUM Social)--> SNS -> WhatsAppAdapter λ ------------------------+
  SMS two-way (EUM + local aggregator) -> SNS/HTTPS -> SmsAdapter λ --------+--> Conversation Core
  Voice/IVR (local SIP/contact centre) --> webhook -> VoiceAdapter λ -------+    (intents, slots,
  PWA / agent app --> CloudFront + WAF -> API Gateway -> FastAPI (LWA) λ ---+     state machine)
                                                                               |
        +----------------------------------------------------------------------+
        v
  Domain services (FastAPI modules: identity, artisans, vouching, jobs, matching,
  payments-integration, reviews/reputation, disputes, moderation)
        |                 |                         |                       |
  Aurora PostgreSQL   DynamoDB (TTL)            S3 + CloudFront          Outbox table
  + PostGIS + H3      sessions, idempotency,    media (presigned PUT,    -> relay λ
  (system of record)  rate limits, OTP counters  Rekognition moderation,  -> EventBridge bus
        |                                         perceptual hash)          |
        |            +--------------------+-----------------+--------------+----------+
        |            v                    v                 v                         v
        |   reputation-incremental  notifications      fraud-signals          analytics firehose
        |   (SQS->λ, Wilson/Beta)   (SQS->channel      (rules engine,         -> S3 Parquet/Athena
        |                            ladder: push->WA   velocity in DDB)
        |                            ->SMS->voice)
        |   Step Functions: per-job workflow (offer window, reminders, completion, review prompt,
        |                   PSP release instruction, dispute window)
        +-- Nightly Fargate batch: NetworkX/igraph trust propagation (EigenTrust seeded by local
            anchors), collusion detection, PyOD anomalies -> reputation_snapshots (Postgres + S3)
  External: licensed PSP/aggregator (collections, hold, payouts) via signed webhooks + status queries
```

The stack choices, with the evidence behind them:

- **API layer.** FastAPI, Pydantic v2, SQLAlchemy 2.x with GeoAlchemy2, and Alembic, deployed with the **AWS Lambda Web Adapter** so that "the same image runs on EC2, Fargate and locally" ([AWS LWA](https://github.com/awslabs/aws-lambda-web-adapter)).
- **Cold starts.** Lambda SnapStart for Python 3.12+ cuts init latency to as low as sub-second. Connections opened during init must be re-established after restore ([Lambda SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html)).
- **Database.** Aurora Serverless v2 can scale to zero in dev ([Aurora auto-pause](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html)). Keep a minimum of 0.5–1 ACU in production to avoid the roughly 15-second resume.
- **Workers.** SQS-triggered Lambda workers with Powertools (idempotency, batch processing, structured logging) replace Celery ([Powertools idempotency](https://docs.powertools.aws.dev/lambda/python/stage/utilities/idempotency/)).
- **Build and deploy.** Package with uv lockfiles, define infrastructure in AWS CDK (Python), and deploy through GitHub Actions with OIDC rather than static keys ([GitHub OIDC](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws)).

Several AWS services are closed, retired or missing in Cameroon:

- **Amazon Fraud Detector** closed to new customers on 7 November 2025 ([AWS](https://docs.aws.amazon.com/frauddetector/latest/ug/frauddetector-availability-change.html)).
- **Amazon Pinpoint** reached end of support on 30 October 2026. Its messaging APIs continue as End User Messaging ([AWS Pinpoint](https://aws.amazon.com/pinpoint/)).
- **QLDB** was reported end-of-life (unverified). Do not build a "trust ledger" on it; use an append-only, hash-chained Postgres event table plus S3 Object Lock exports.
- **USSD** has no AWS service, so the aggregator is the one unavoidable non-AWS dependency.
- **Amazon Connect** is not offered in Paris or Ireland, and its outbound campaigns from Cape Town reach only South African numbers ([Amazon Connect regions](https://docs.aws.amazon.com/connect/latest/adminguide/regions.html)). Voice therefore goes through a local SIP or contact-centre provider.

### Data and geography

| Data | Store |
|---|---|
| Users, artisans, skills taxonomy, jobs, quotes, reviews, vouches, disputes, payment references, landmarks, price observations, consent receipts, outbox | Aurora PostgreSQL + PostGIS (`geography(Point)` + GiST; H3 `bigint` columns, B-tree) ([Aurora PostGIS](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Appendix.PostgreSQL.CommonDBATasks.PostGIS.html)) |
| USSD sessions, WhatsApp cursors, OTP counters, idempotency keys, rate limits | DynamoDB on-demand with TTL |
| Proof media, portfolio | S3 (private, signed CloudFront URLs for proof; public cache for portfolio) |
| Events, analytics | S3 Parquet + Athena via outbox → EventBridge → Firehose |
| Graph analytics | NetworkX/igraph on Fargate nightly; Postgres recursive CTEs (2–3 hops) online; Neptune Analytics only if the graph outgrows memory |

Cameroon has no street addresses, so addresses are modelled as **landmark + free-text directions + GPS point + accuracy**:

- USSD users pick city → quartier → landmark.
- WhatsApp users share a location pin.
- Landmarks are seeded from OpenStreetMap points of interest, and users can add local aliases.

Commercial maps are weak here. Amazon Location's Open Data provider cannot geocode or route, and GrabMaps covers only Southeast Asia ([Amazon Location providers](https://docs.aws.amazon.com/location/previous/developerguide/what-is-data-provider.md)). OSM mapping of Douala's outskirts is incomplete: a 2026 UN Maps mapping pilot covered Yaoundé, and Douala is still only planned ([UN Maps](https://maps.un.org/news/citymapper-externship-un-maps-community-ambassador-and-chapter-initiative-cameroon)). Self-host OSRM or Valhalla if travel times are needed.

### Reliability, offline tolerance and channel engineering

**USSD** is synchronous and needs replies within about 1–2 seconds:

- Keep that Lambda warm and free of database joins.
- Store session state in DynamoDB.
- Commit side effects asynchronously and confirm them by SMS.
- Persist drafts for 24 hours, because phones die during power cuts.

**Webhooks** will be retried: Meta retries for 36 hours ([Meta Webhooks](https://developers.facebook.com/docs/graph-api/webhooks/getting-started)). Make them idempotent, keyed on channel + provider message ID, and use SQS FIFO grouped by MSISDN to keep each user's messages in order.

**Fallback.** AWS warns that SMS in each country runs through a single carrier partner ([AWS SMS](https://docs.aws.amazon.com/sms-voice/latest/userguide/phone-numbers-sms-by-country.html)). Run two SMS paths and a fallback ladder: push → WhatsApp template → SMS → voice call.

**Shutdowns.** Make every critical step completable over SMS or USSD, so that a regional WhatsApp block does not break the trust loop.

### Region choice

**Conflict resolved.** The system-design note (06) recommends eu-west-3 (Paris) on latency grounds. Cameroon's main international cables (SAT-3, WACS) land in Europe, and Camtel's Lagos link is reported at 92% utilisation ([Telecom Review Africa](https://mail.telecomreviewafrica.com/articles/telecom-operators/2407-mtn-globalconnect-and-camtel-accelerate-cameroon-s-fibre-network-and-digital-journey)). The security note (07) suggests af-south-1 (Cape Town), which keeps data on the continent under South Africa's POPIA and an operational regulator.

The legal analysis cuts both ways. **Both are cross-border transfers** requiring prior authorisation under Law 2024/017 Art. 32. The draft decree's adequacy test (a specific data-protection law plus an operational authority) is met by France and South Africa alike ([MINPOSTEL draft decree](https://www.minpostel.gov.cm/images/Documentation/patnuc/textes_preparation_pour_consultation_publique/protection_data/230518%20Decret_APD%20FIN%20_CLEAN.pdf)).

**Recommendation:** run a one-week RTT probe from MTN, Orange and Camtel SIMs in Douala to both regions. Default to **Paris primary, Ireland for DR**, unless counsel advises that the APDP is likely to favour African hosting. Build cell-awareness into IDs, events and IaC from the start, so that moving or adding an af-south-1 cell is an infrastructure change rather than a rewrite. Region latency matters less than it seems, because most interactions are USSD, SMS or WhatsApp, whose latency is dominated by the network operators and Meta.

### Scaling path and cost

| Stage | Users | Shape | Infra cost (rough, excl. messaging) |
|---|---|---|---|
| MVP | ≤10k | One cell (prod-cm) in eu-west-3; Lambda + Aurora Serverless v2 Multi-AZ + DynamoDB + EventBridge/SQS/Step Functions + S3/CloudFront | ~$100–250/month at 1k MAU |
| Growth | 10k–300k | RDS Proxy, read replicas, ElastiCache, data lake, nightly Fargate batch, learning-to-rank; new cities = new `market` rows | ~$1.5k–3k/month at 100k MAU |
| Scale | 300k–1M+ | Main API to ECS Fargate/Graviton (same image); partition large tables | ~$10k–22k/month at 1M MAU |
| Multi-country | 1M+ | Cell per country/regulatory bloc; thin global control plane; route by E.164 prefix (+237, +241, +242…) | Per cell |

These cost figures are order-of-magnitude estimates from note 06, built on us-east-1 list prices. **Messaging, not infrastructure, will dominate**: per-user SMS, WhatsApp template and USSD fees can run around 10 times the per-user infrastructure cost. New AWS accounts get up to $200 in credits, and Activate Portfolio offers up to $100k–200k through an accelerator ([AWS free plan](https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan); [AWS Activate](https://aws.amazon.com/startups/credits)). The cell-based design follows AWS's own guidance: no shared databases across cells, deployed in waves ([AWS cell-based architecture](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/reducing-scope-of-impact-with-cell-based-architecture.html)).

## 8. Local trust is borrowed from associations, chiefs, churches, njangis and hardware stores

The launch evidence converges on one rule: **win the hard side first inside a tiny atomic network**. In Lenny Rachitsky's study, 14 of 17 marketplaces concentrated early effort on supply ([Lenny's Newsletter](https://www.lennysnewsletter.com/i/159750/step-decide-which-side-of-the-marketplace-to-concentrate-on)). Thumbtack's founder says over 90% of local-services GMV still moves by word of mouth ([NFX: Thumbtack](https://nfx.com/post/billion-dollar-marketplace-thumbtack)). Here the hard side is not artisans in general, who are plentiful, but **good, responsive, honest** artisans who accept verification and keep jobs on-platform.

Trust in Cameroonian neighbourhoods already runs through institutions:

- **Chiefs** are legally "auxiliaires de l'administration" with a tradition of mediation ([Wikipedia FR: Chefferie](https://fr.wikipedia.org/wiki/Chefferie_traditionnelle_au_Cameroun)).
- **Churches** reach about two-thirds of the population ([Wikipedia: Religion in Cameroon](https://en.wikipedia.org/wiki/Religion_in_Cameroon)).
- **Njangi groups** rest on members choosing each other on trust ([Wikipedia: ROSCA](https://en.wikipedia.org/wiki/Rotating_savings_and_credit_association)).
- **Radio** is a mass channel, with many private stations in Douala ([Wikipedia: Media of Cameroon](https://en.wikipedia.org/wiki/Media_of_Cameroon)).

M-Pesa's lesson is to recruit existing trusted retail nodes as agents, and that agents' trust in the system comes before customers' trust ([Wikipedia: M-Pesa](https://en.wikipedia.org/wiki/M-Pesa)).

| Partner | Role | Offer in return |
|---|---|---|
| Electricians' association / trade group | Supply gatekeeper, co-verifier, assessors, co-branded badge | Data, visibility, per-test fee |
| Chef de quartier | Endorse at quarter meeting; first-instance mediator; residence attestation | Recognition; free priority service for community buildings |
| Parishes / assemblies | Demand trust: announcements, fellowship referral codes | Group referral rewards |
| Njangi and women's groups | Referral; "njangi-backed" vouch | Reward paid into the njangi pot |
| Quincailleries (hardware stores) | Daily artisan footfall; onboarding desk; "buy the part, get a verified installer" | Referral fee, footfall |
| Mobile-money kiosks | Payment explanations, onboarding points | Per-activated-user fee |
| Landlords, estate agents, property managers | First recurring B2B demand | Priority dispatch, monthly invoicing, photo proof |
| Douala FM / church radio | "Ask the electrician" call-ins in French/Pidgin | Content |

Physical trust artefacts make the platform visible: branded vests, a laminated badge with photo, QR and numeric ID, and **QR stickers on installed fixtures** ("installed by X, verified by [platform], scan to rate or rebook"). The sticker doubles as an anti-leakage and rebooking device. Publish electrical-safety outcomes, such as earthing and breakers installed, as a public-good metric. The July 2026 Bonamoussadi collapse makes workmanship a live local concern.

The Douala-first sequence matches Yango, which started in Douala before Yaoundé ([Wikipedia: Yango](https://en.wikipedia.org/wiki/Yango_(company))), and Gozem, whose Cameroon office is in Douala ([Gozem](https://www.gozem.co/)). Gozem's zero-deposit vehicle financing, repaid from earnings, is the most transferable Cameroon-tested idea. The artisan version is **tool or kit credit repaid as a small deduction from on-platform payouts**, which also discourages leakage.

## 9. Anti-fraud means anchoring reputation to proven, paid, co-located jobs by unique people

### The threat is mostly self-boosting

Fake reviews pay, which is why people buy them:

- Facebook-group review schemes on Amazon raised ratings about 5% and doubled review counts. After sellers stopped buying, ratings fell from 4.4 to 4.1. Manipulation is used mainly by low-quality products ([He, Hollenbeck & Proserpio](https://www.sigecom.org/exchanges/volume_19/2/HE.pdf)).
- Weak-reputation independents with few reviews in competitive markets manipulate most ([Luca & Zervas](https://dash.harvard.edu/handle/1/22836596)). That describes almost every Cameroonian artisan.
- At Tripadvisor, "review boosting" by owners or staff was **54% of fraud** ([Tripadvisor](https://tripadvisor.mediaroom.com/2025-03-18-Tripadvisors-2025-Transparency-Report-reveals-strong-review-submissions-and-improved-fraud-detection)).
- Trustpilot removed 4.5 million fakes (7.4% of submissions), most of them 5-star ([Trustpilot](https://corporate.trustpilot.com/trust/trust-report-2025)).

Verified purchase alone is not enough. Amazon reviewers bought the product and were refunded off-platform. An artisan can do the same: pay friends to book through the platform, refund them by MoMo, and collect "verified" reviews.

Cameroon adds weak phone identity and a professionalised scam economy:

- One national ID card was found linked to **up to 200 SIM cards** in 2019 ([Africanews](https://www.africanews.com/2019/07/06/cameroon-fines-main-local-telecom-companies)), and 891,082 non-compliant SIMs were cut in 2022 ([ITWeb](https://itweb.africa/article/cameroon-sim-card-shutdown-piles-on-pressure-for-telcos/lLn14Mmj9RKqJ6Aa)).
- Prisons are named as cybercrime hubs ([Digital Business Africa](https://www.digitalbusiness.africa/les-principaux-foyers-de-cybercriminels-avec-en-tete-les-prisons-de-kondengui-et-de-new-bell-font-perdre-122-milliards-de-f-cfa-a-leconomie-camerounaise-en-2021/)).
- Cybercrime cost XAF 12.2 billion in 2021 ([EcoMatin](https://ecomatin.net/la-cybercriminalite-fait-perdre-122-milliards-s-au-cameroun-en-2021)), and only **6 in 100 victims file a complaint** ([EcoMatin](https://ecomatin.net/seulement-6-victimes-de-la-cybercriminalite-sur-100-portent-plainte)).
- MoMo fraudsters trigger withdrawal requests that careless users approve with their PIN ([Camer.be](https://www.camer.be/90795/11:1/cameroun-la-lutte-contre-la-fraude-comme-gage-de-securite-des-transactions-mobile-momo-cameroon.html)).

With so few complaints filed, **the platform's own one-tap reporting is its main fraud sensor**.

### Threat model and controls

| Attacker | Method | Primary controls |
|---|---|---|
| Artisan | Sockpuppet customer accounts | Device graph + Play Integrity verdicts; one review per verified job; duplicate-face check on artisans; device-recall blocklist ([Play Integrity](https://developer.android.com/google/play/integrity/verdicts)) |
| Artisan | Friends-and-family reviews | Platform-routed payment weighted higher; reviewer-diversity metric; diminishing weight for repeat pairs; **down-weight, don't delete** |
| Artisan | Refunded fake jobs | Wallet-flow checks (artisan→reviewer transfers); GPS co-presence + minimum time on site; live photos |
| Artisan rings | Reciprocal reviews, vouching cartels | Cycle detection; dense-subgraph (FRAUDAR-style) scoring ([FRAUDAR](https://bhooi.github.io/papers/fraudar_kdd16.pdf)); vouch-budget limits |
| Competitor | 1-star bombing | No job, no review; spike detection + review freeze with banner (Google pattern) ([Search Engine Roundtable](https://www.seroundtable.com/google-maps-spam-fighting-2025-41176.html)) |
| Customer | "Discount or 1 star" extortion; non-payment | Simultaneous reveal; extortion flag with in-app chat evidence; no review without payment status; rater-reliability weighting |
| Scammer | Fake artisan taking deposits | Tier-1 KYC (CNI/récépissé + liveness + face dedupe); deposits only via PSP hold; pinned "never pay a deposit outside the app" warning |
| Scammer | Account takeover via SIM swap / insider SIM | Selfie re-verification on number/device change; payout-wallet change cool-off and step-up; alerts to old number |
| Broker | Selling reviews or aged accounts on WhatsApp/Facebook | Monitor groups, test-buy, report to Meta; account-age features |
| Collusion | Customer + artisan fake "verified" jobs | Graph + payment anomaly models; random field-agent call-backs |

### Staged detection on AWS and Python

Detection should grow with the data:

- **Stage 1 (launch, no labels).** A versioned rules and velocity engine in Python. Counters live in DynamoDB or Redis. Example rules: more than N accounts per device or per hashed CNI; review posted within minutes of job close; no handshake; empty Play Integrity verdict; payment followed by a reverse transfer. A nightly NetworkX job adds connected components on shared identifiers, reciprocity cycles, reviewer-set overlap, SybilRank-style propagation from ID- and payment-verified accounts ([SybilRank](https://www.usenix.org/conference/nsdi12/technical-sessions/presentation/cao)), and PyOD/IsolationForest anomaly scores ([PyOD](https://pypi.python.org/pypi/pyod)).
- **Stage 2 (hundreds of labelled cases).** AutoGluon or LightGBM on SageMaker, which AWS names as Fraud Detector's replacement. Graph neural networks (Neptune ML, PyG) come only then ([Neptune ML](https://docs.aws.amazon.com/neptune/latest/userguide/machine-learning.html)).

Identity checks use Rekognition Face Liveness at about **$0.015 per check** ([Rekognition pricing](https://aws.amazon.com/rekognition/pricing/)), or Smile ID, which supports six Cameroonian document types and duplicate-face detection but not government database lookup ([Smile ID](https://smile.id/countries/cameroon)). Accept récépissés and old-format cards: the biometric CNI launched only in February 2025 and had backlogs ([Biometric Update](https://www.biometricupdate.com/202502/cameroons-new-generation-biometric-id-card-system-goes-live-feb-17)). Use the hashed 17-digit CNI unique identifier as a uniqueness key ([Osiris/ART](https://osiris.sn/Cameroun-le-regulateur-telecoms.html)). Keep customer friction low: phone OTP plus a device check, with ID requested only when risk signals fire.

Governance follows a graduated penalty ladder:

1. Silent down-weighting.
2. Education.
3. Warning.
4. Public "unusual activity" badge (Yelp-style).
5. Score frozen (Trustpilot-style).
6. Suspension.
7. Ban, with face and device blocklisting.

Appeals go to a different human within 14 days, with a target of 72 hours. Publish a "how reviews are verified" page and a periodic trust report, following the UK CMA's "reasonable and proportionate steps" standard ([CMA208](https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf)) and the EU's disclosure rule ([Mondaq](https://www.mondaq.com/dodd-frank-consumer-protection-act/1189542/the-omnibus-directive-consumer-reviews)).

**Conflict resolved.** The anti-fraud note (04) proposes features such as "same surname or locality" and contact-list uploads to detect friends-and-family collusion. Surnames and origins can act as proxies for ethnic or regional origin, which Law 2024/017 Art. 48 prohibits processing. **Drop surname-based features and contact uploads.** Rely on device, payment-flow, timing and graph-structure signals instead.

## 10. Security, data protection and legal compliance set hard design limits

### Law 2024/017 is strict and its regulator is missing

Cameroon's data-protection law took effect on 23 December 2024, and its **18-month grace period ended on 23 June 2026** ([Law 2024/017 official text](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf); [Blacktree](https://blacktree.nl/2026/06/23/cameroon-data-protection-law-grace-period-ended/)). Its main obligations:

- **Consent is the default legal basis** (Art. 9). There is no contract or legitimate-interest ground.
- **Processing needs prior authorisation** (Art. 49).
- **Every transfer abroad needs prior APDP authorisation** (Art. 32). Fines are 10–50M FCFA (Art. 60), and criminal exposure is 3–10 years (Art. 69).
- **Breaches must be notified "sans délai"** (Art. 22).
- **Data subjects have a right to human intervention** in automated decisions (Art. 44).
- **Legal persons face criminal fines of up to XAF 1 billion** (Art. 71).

But the presidential decree creating the authority (APDP) had not been confirmed as adopted as of October/November 2026 ([DLA Piper](https://www.dlapiperdataprotection.com/index.html?c=CM&t=law); [Kukie.io](https://kukie.io/blog/cookie-consent-cameroon-data-protection)). The authorisations are legally required but practically impossible to obtain.

**Recommendation:** keep a dated compliance file covering the processing register, DPIA, transfer impact assessment, consent receipts and a letter documenting good-faith filing attempts. Submit filings the day the APDP opens. Ask counsel about interim routes via MINPOSTEL (lawyer).

### The profiling problem: Art. 65 versus reputation scoring

**This is the report's most important legal conflict.** Notes 03 and 06 design automated trust scores, ranking and fraud models. Art. 65 punishes "processing personal data for profiling purposes" with **3–10 years and XAF 1–20 million**, and the text has no explicit consent carve-out. One commentator wrongly claims the law does not address automated decisions; Art. 44 shows it does.

The design response has six parts:

- **Score service events, not people.** Use verified jobs, completion, disputes and vouches. Never use demographics or inferred traits.
- **Consent separately.** Collect a distinct, recorded consent for "publication of my job record and trust badge".
- **Explain the score.** Store component scores so any channel can say *why*: "12 verified jobs, 3 vouches, 0 disputes".
- **Keep humans in the loop.** No automated suspension. Human review and contestation under Art. 44.
- **Keep the badge simple.** Prefer simple, auditable rules for badge tiers over opaque ML in the public score.
- **Get a written legal opinion first.** Launch automated scoring only after counsel has signed off (lawyer). Until then, the concierge pilot can show verified-job counts and human-assigned tiers, which are much harder to characterise as "profiling".

Art. 48 adds a second limit. It prohibits processing data on **"linguistic or regional origin"** and ethnicity. The reputation note's monthly bias audit "by gender, age, region and language group" cannot be run on profile attributes. Preferred language must stay a UI setting, never a matching or ranking feature. Any fairness audit should use separately consented, aggregated survey data designed with counsel.

Biometrics are a third. The law's text targets "biometrics in health matters", but commentators treat biometrics broadly, and Art. 66 criminalises storing sensitive data without express consent. So: separate explicit consent, a licensed KYC vendor or Rekognition, storage of templates (face vectors) rather than images, and deletion of ID and selfie images after verification.

### Payments: the escrow conflict

**This is the second key conflict.** The business-model note (08) proposes that the customer pays "into the platform's collections account", with funds held until confirmation or a 48–72-hour auto-release. Regulation 04/18/CEMAC/UMAC/COBAC rules this out:

- Payment services, including money remittance, executing transfers and issuing e-money, are reserved to licensed credit, microfinance and payment institutions (Arts. 3 and 5).
- Client funds must be ring-fenced at a CEMAC bank by the next day (Arts. 52–54) ([Regulation 04/18](https://www.beac.int/wp-content/uploads/2019/07/REGLEMENT-N-04-18-CEMAC-UMAC-COBAC-du-21-d%C3%A9cembre-2018.pdf)).
- The BEAC's own 2024 report describes fintechs as "generally technical or commercial partners of licensed establishments, acting as payment aggregators" ([BEAC 2024 report](https://www.beac.int/wp-content/uploads/2026/04/RAPPORT-SUR-LES-SERVICES-DE-PAIEMENT-DANS-LA-CEMAC-2024-.pdf)).

**Resolution:** the platform never holds customer money. A licensed PSP or aggregator (for example pawaPay, an MNO merchant collections account, or a bank-backed aggregator) collects from the customer into **its** ring-fenced account. It holds the funds per the platform's job state and disburses to the artisan when it receives a signed release instruction. The platform's fee is either deducted by the PSP or invoiced separately. The platform acts as a merchant or "partenaire technique", not a payment provider.

Three cautions apply. MTN has not publicly documented a native marketplace split-payment product. A developer's May 2026 question about 90/10 splits went unanswered ([MTN MoMo community](https://momodevelopercommunity.mtn.com/momo-south-africa-developers-58/inquiry-about-marketplace-split-payment-integration-with-mtn-mobile-money-483)). So **confirm hold-and-release capability in the PSP contract** (lawyer: whether any platform-held balance or wallet triggers licensing or distributor status). Cameroon remains on the **FATF grey list** as of October 2026, which shapes partners' KYC posture ([FATF](https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/increased-monitoring-october-2026.html)). And never trust a payment callback without a server-to-server status query.

### Other law that applies

| Area | Rule | Design response |
|---|---|---|
| E-commerce law 2010/021 | Transaction-data retention (Art. 32); opt-in for automated direct marketing (Art. 7) | Separate transaction records from profile data; marketing opt-in only (also WhatsApp policy) |
| Cybersecurity law 2010/012; ANTIC | National ICT security; applicability of audits to private marketplaces unverified | Lawyer: ANTIC obligations, incident reporting |
| Consumer law 2011/012 | Information duties, unfair terms (texts not retrieved) | Terms state the platform is an intermediary; artisan warranties; no total liability exclusion |
| Labour Code (Law 92/007) | Misclassification risk if platform controls workers | No mandatory schedules, exclusivity or uniforms as conditions; ratings framed as marketplace integrity; lawyer |
| Tax | VAT 19.25%; CIT 33% (27.5% reduced); **minimum tax 2.2–5.5% of turnover** ([PwC](https://taxsummaries.pwc.com/republic-of-cameroon/corporate/other-taxes); [PwC CIT](https://taxsummaries.pwc.com/republic-of-cameroon/corporate/taxes-on-corporate-income)) | Agency/commission structure so turnover = platform fees, not GMV; accountant |
| WhatsApp policy | Opt-in; no collection of ID numbers or bank numbers in chat; human escalation ([WhatsApp policy](https://whatsappbusiness.com/fr/policy/)) | KYC uploads via secure link or Flow, never chat text |
| Insurance | CIMA-licensed insurers for liability and personal-accident cover | Price a guarantee reserve and embedded accident cover with a broker |

### Security blueprint

The account and identity structure:

- **Landing zone.** Control Tower with a management account (billing only), Security Tooling (delegated admin for GuardDuty, Security Hub, Inspector and Macie), Log Archive (organisation CloudTrail with S3 Object Lock), and prod, staging and dev accounts ([AWS SRA](https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/architecture.html)).
- **Guardrails.** SCPs deny regions outside primary and DR, which also produces evidence for the transfer file, and deny disabling logging.
- **Staff access.** IAM Identity Center with passkeys.

Authentication rests on Cognito passwordless SMS OTP ([Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow-methods.html)). NIST classes SMS OTP as **"restricted"** and vulnerable to SIM swap ([NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html)), so harden it:

- 10-minute expiry and at most 5 tries per code;
- WAF rate limits per IP and per phone number, because Cognito threat protection "doesn't apply rate limits" ([Cognito threat protection](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-settings-threat-protection.html));
- SMS country allow-listing to +237 to block SMS-pumping fraud;
- step-up (passkey, or OTP plus PIN) for payout-wallet changes, the main SIM-swap target.

Application security follows **OWASP API1 (Broken Object Level Authorization)**, the dominant marketplace risk ([OWASP API Top 10](https://api-security.owasp.org/editions/2023/en/0x11-t10)):

- one policy layer for object checks, with UUIDv7 identifiers;
- artisans never see a customer's full phone number or address before acceptance;
- pip-audit and Bandit with hard fails in CI ([pip-audit](https://pypi.org/project/pip-audit/));
- verification of Meta's X-Hub-Signature-256 and PSP signatures over the raw request body;
- no personal data and no payout changes over USSD.

Privacy by design for low-literacy users means:

- **Voice consent.** Layered 30–60-second audio consent in French, English and Pidgin, with recorded keypress receipts.
- **Minors.** Parental consent for under-18 apprentices, or exclude them.
- **Location.** Grid-snapped artisan locations, with the customer's exact address revealed only after acceptance and expired after completion.
- **Contact.** Masked numbers.
- **Safety.** SOS and "share visit" features. Technology-facilitated violence affects an estimated 28% of women in five Sub-Saharan countries ([UN Women](https://www.unwomen.org/en/what-we-do/ending-violence-against-women/faqs/tech-facilitated-gender-based-violence)).

Incident response follows NIST SP 800-61r3 and is wired to Art. 22. Target notification within 72 hours as a defensible practice, with pre-drafted French and English notices plus SMS and voice versions ([NIST SP 800-61r3](https://csrc.nist.gov/pubs/sp/800/61/r3/final)). Start with a security.txt disclosure policy ([RFC 9116](https://www.rfc-editor.org/rfc/rfc9116)). Move to a bug bounty only once triage is mature, and to SOC 2 or ISO 27001 when PSP or enterprise partners require it.

## 11. A Garantie-first model monetises customer risk, not artisan income

### Why lead fees and subscriptions are out

Lead fees (Thumbtack, Bark, MyBuilder) and subscriptions (Checkatrade, from £30 a month on 12-month terms) charge tradespeople before they earn, which breaks the requirement ([Housecall Pro](https://www.housecallpro.com/resources/what-is-thumbtack-how-it-works/); [Whito](https://whito.co.uk/tools/checkatrade-cost-uk/)). Commission models fail when the platform does not control payment. Thumbtack's first commission model died because customers contacted providers directly ([Sharetribe](https://www.sharetribe.com/academy/why-thumbtack-succeeded/)). Customers *will* pay explicitly for protection, as TaskRabbit's Trust & Support fee shows ([TaskRabbit](https://support.taskrabbit.com/hc/articles/204940570)).

Cheap peer-to-peer mobile money changes what customers will pay for. Both operators now offer zero-fee transfers plus taxes, and withdrawals are 1% in-app ([EcoMatin](https://ecomatin.net/cameroun-orange-money-accelere-la-guerre-des-tarifs-avec-le-zero-frais-sur-les-transferts-dargent); [Digital Business Africa](https://www.digitalbusiness.africa/paiement-mobile-au-cameroun-max-it-orange-et-momo-app-mtn-generalisent-les-retraits-a-1-des-5-000-f-cfa/)). Customers can already pay artisans cheaply, so **the platform must sell protection, not convenience**.

The African record points the same way:

- Lynk's full-stack model, with in-person vetting, an academy and a 10% fee, wound down and was sold to Eden Life in 2022 ([TechCabal](https://techcabal.com/2022/05/19/what-does-eden-lifes-expansion-to-kenya-mean-for-africas-gig-economy/)). Eden paused its consumer business in February 2026 ([TechCabal](https://techcabal.com/2026/02/14/eden-life-pauses-consumer-business-to-refocus-on-corporate-clients/)).
- Asset-light Kandua, with free tools for pros and B2B channels, reached **40,000+ vetted firms** and was bought by insurer Santam ([Santam](https://www.santam.co.za/about-us/media-centre/corporate-news/santam-acquires-kandua-leading-tech-startup)).

### Recommended revenue stack

| Stream | Mechanism | Timing |
|---|---|---|
| Customer protection fee | 8–10% of labour, min XAF 500; funds PSP-held hold-and-release, rework/refund guarantee (cap e.g. XAF 50,000 in pilot) | Month 0 |
| Success commission | 0% at launch; 5–8% deducted **only from released payouts** after the artisan's 3rd paid job; lower on repeat clients | Month 6+ |
| B2B contracts | Landlords, property managers, SMEs, hotels: retainers + per-job margin, monthly invoicing, photo proof | Month 0 pilots |
| Diaspora milestone projects | 5–10% fee on XAF 0.5–5M renovation/build tickets; inspector photos per milestone | Month 6+ |
| Ancillary | Materials affiliate (2–5%), MFI loan and micro-insurance referrals, sponsor-funded certification cohorts, optional "Pro" visibility paid only from the earnings wallet | Year 2 |

### Unit economics

Note 08's illustrative model for a household job is below. All inputs are assumptions except the payment and tax rates. Note the added column for **year 1**, when the success commission is 0%.

| Line (per job, XAF) | Steady state | Year-1 launch (0% commission) |
|---|---|---|
| Labour ticket | 15,000 | 15,000 |
| Customer protection fee (10%) | 1,500 | 1,500 |
| Artisan success commission (5%) | 750 | 0 |
| Gross take | 2,250 | 1,500 |
| Net of 19.25% VAT (if fees VAT-inclusive) | ~1,887 | ~1,258 |
| Collection cost (~3% of 16,500) | −495 | −495 |
| Payout cost (~1%) | −142 | −150 |
| Guarantee reserve (2% of GMV) | −300 | −300 |
| Support and verification | −300 | −300 |
| **Contribution** | **~650 (≈€1)** | **~13 (break-even)** |

Payment costs come from pawaPay's published rates: collections 1.75% (MTN) and disbursements 1.3% (MTN) ([pawaPay](https://pawapay.io/fees)). On top come the 0.2% transfer tax and XAF 4 levy, which raised XAF 42.7 billion in 2025 ([EcoMatin](https://ecomatin.net/cameroun-letat-a-preleve-43-milliards-fcfa-sur-les-transferts-dargent-en-2025-en-hausse-de-35)). Messaging adds an estimated XAF 20–60 per job: two or three WhatsApp utility templates at about $0.004, one or two SMS codes, and a few USSD sessions at 10–15 XAF. Model this explicitly.

The year-1 column shows **household jobs alone are break-even at best during the free-to-artisan launch**. B2B and diaspora streams must carry fixed costs from the start, and the commission switch-on in month 6 is what makes household volume contribute.

Lifetime value is low. A customer doing three jobs a year for two years is worth about XAF 3,900 in contribution, which caps blended acquisition cost at about **XAF 1,300–2,000 (€2–3)**. Demand must therefore come from artisans bringing their existing clients (escrow and reputation benefit them), WhatsApp referral credits, partner channels and field agents paid per verified first booking. Only targeted Facebook ads fit the budget.

Urban Company shows the ceiling and the trap. A heavily managed, standardised model reaches a 28–35% take, but its low-ticket InstaHelp line lost ₹346 per order ([Inc42](https://inc42.com/features/inside-urban-companys-marketplace-model-what-it-keeps-from-every-booking/)).

### Market size and projection (assumption-based)

Douala's metro population is about 4.35 million ([Wikipedia: Douala](https://en.wikipedia.org/wiki/Douala)). Assuming about 870k households spend XAF 30,000 a year on electrical, plumbing and appliance-repair labour gives a **TAM of about XAF 26 billion**. A digitally reachable share of about 35% gives a **SAM of about XAF 9 billion**. A three-year **SOM of 3–5%** gives **XAF 270–450 million GMV** from household jobs. At a 15% take, that is only about XAF 40–70 million in revenue, so B2B and diaspora carry the plan.

Remittances anchor the diaspora case. **Conflict resolved:** note 08 cites $787 million at 1.6% of GDP. Note 01 shows that was the 2023 figure, and 2024 fell to about **$690 million (1.3% of GDP)** ([Statistics of the World](https://statisticsoftheworld.com/country/cameroon/remittances-received)). The diaspora sizing should use about $690 million.

| Driver (assumptions) | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| Verified active artisans | 250 | 900 | 2,000 |
| Household jobs/month (end of year) | 600 | 2,500 | 6,000 |
| Household GMV (XAF) | ~60m | ~300m | ~900m |
| B2B accounts / GMV | 3 / 10m | 12 / 60m | 30 / 150m |
| Diaspora projects / GMV | 10 / 15m | 50 / 75m | 120 / 180m |
| Blended net revenue (XAF) | ~15m | ~70m | ~200m |
| Team (FTE) | 5 | 10 | 16 |

The first-24-month funding stack should be non-dilutive and catalytic: founder and angel money, TEF's $5,000 grants ([TEF](https://www.tonyelumelufoundation.org/tef-entrepreneurship-programme)), AWS and Google credits, and a sponsor-funded certification contract with a donor or insurer. A $150–500k pre-seed follows once there is GMV traction. Cameroon is barely visible in African VC data: $3.8 billion was raised across Africa in 2025, concentrated in South Africa, Kenya, Egypt and Nigeria ([Briter](https://www.briter.co/insights/reports/africa-investment-report-2025)).

## 12. Launch as a 12-week concierge pilot, then expand ring by ring behind hard gates

### The pilot

Run a **concierge MVP over WhatsApp**:

- **Scope.** One trade (electricians), one quarter cluster (Bonamoussadi/Makepe/Kotto), 12 weeks plus 2 weeks of setup.
- **Supply.** 25–40 artisans verified at one or two "Journées de vérification".
- **Demand.** A target of 150–300 job requests from 100–200 customers, including 3–5 landlord or agency accounts. Enough to estimate fill and repeat rates within about ±7–10 points.
- **Tooling.** A WhatsApp Business number, a sheet or Airtable as the matching engine, a web profile per artisan behind the QR, PSP-collected payments, and ratings by voice note or poll.
- **Automation.** Automate only after about 100 manual matches show which steps repeat. Thumbtack regretted automating late ([NFX: Thumbtack](https://nfx.com/post/billion-dollar-marketplace-thumbtack)).
- **Activation.** Founders route each artisan's first two or three jobs within 30 days. Activation to first job is the key supply milestone ([Andrew Chen](https://andrewchen.com/grow-marketplace-supply/amp)).
- **Budget.** The researcher's unsourced estimate is **XAF 3–8 million** for 2–3 field ambassadors, badges, vests, stickers, a verification day, a demo day, radio spots, the guarantee reserve and data. Treat it as an estimate.

Each verification day runs six stations:

1. ID and mobile-money name match.
2. Residence attestation from the chief or landlord.
3. Two references, from past customers or the artisan's patron.
4. Practical test.
5. Photo and profile.
6. Code-of-conduct signature: transparent pricing, guarantee rules, dispute process.

| Metric | Go threshold (proposed, unsourced) |
|---|---|
| Fill rate | ≥80% |
| Median time to match | ≤2 h urgent, ≤24 h planned |
| Job completion (matched → completed and paid) | ≥85% |
| Dispute rate | ≤5%, resolved within 7 days |
| 90-day customer repeat | ≥25% |
| Artisan 60-day retention | ≥70% |
| Proof-of-work coverage (photos + rating) | ≥90% |
| Referral/partner share of new customers | ≥40% |
| Contribution per job after guarantee | ≥0 |
| Escrow uptake and protection-fee acceptance | Measure; the single most important unknown |

### Expansion rings

Local network effects reward density before breadth ([NFX expansion framework](https://nfx.com/post/marketplace-expansion-framework)). Move to the next ring only after **eight consecutive weeks** at the go thresholds:

1. **Ring 0 (months 0–3):** electricians in the pilot cluster.
2. **Ring 1 (months 3–9):** add plumbing, then painting and tiling, in the same quarters; then adjacent quarters such as Logpom.
3. **Ring 2 (months 9–18):** Douala-wide in three to five trades, codified in a "Quarter Launch Kit" (partner templates, verification-day script, ambassador pay, radio scripts, KPI dashboard).
4. **Ring 3 (18–30 months):** Yaoundé, a strong customer base with a 64.6% salaried share and an existing competitor presence, then Bafoussam and Kribi. Buea/Limbe only if lockdown risk is acceptable. Run each new city through a city-launcher with equity or revenue share.
5. **Ring 4 (30+ months):** CEMAC markets (Libreville, Brazzaville/Pointe-Noire), which share the CFA franc, French, and BEAC/COBAC rules ([Wikipedia: CEMAC](https://en.wikipedia.org/wiki/Economic_and_Monetary_Community_of_Central_Africa)). Then WAEMU francophone markets, where the currency and rules differ. Each new country gets its own AWS cell.

The cautionary cases point the same way. Homejoy's 31-city sprawl and $19 discount cleanings kept only 25% of customers after month one ([Harvard D3](https://d3.harvard.edu/platform-digit/submission/homejoy-a-silicon-valley-darlings-path-to-the-grave/)). Jumia suspended Cameroon e-commerce in 2019 ([Wikipedia: Jumia](https://en.wikipedia.org/wiki/Jumia)).

Leakage risk is real but smaller for one-off urgent repairs than for recurring cleaning. The best direct measurement found disintermediation in no more than 1 in 83 relationships ([Astashkina et al.](https://www.kellogg.northwestern.edu/faculty/bray/doc/disintermediation/disintermediation.pdf)). But stronger trust signals *can* raise leakage ([Gu & Zhu](https://pubsonline.informs.org/doi/fpi/10.1287/mnsc.2020.3583)). The platform must therefore keep adding value after the match: guarantee, payment protection, a reputation record that grows only from on-platform jobs, tool credit and insurance.

## 13. Risks, open questions and field-validation gaps

| # | Risk or open question | Why it matters | How to resolve |
|---|---|---|---|
| 1 | Does Art. 65 (profiling) apply to consented, service-quality trust scores? | 3–10-year criminal exposure for core product | **Written legal opinion before automated scoring**; human-assigned tiers in pilot (lawyer) |
| 2 | APDP not operational; transfer (Art. 32) and processing (Art. 49) authorisations unobtainable | Hosting abroad is technically unauthorised | Compliance file, good-faith letter, interim route via MINPOSTEL (lawyer) |
| 3 | Does PSP-held hold-and-release, or any platform balance, trigger payment-institution or distributor status under 04/18? | Licensing exposure | COBAC/BEAC counsel; PSP contract (lawyer) |
| 4 | PSP capability for marketplace hold/split in Cameroon undocumented | Core Garantie mechanism | Vendor due diligence (pawaPay, MNO merchant, bank aggregator) |
| 5 | Customer willingness to pay a ~10% protection fee; escrow uptake | Entire revenue model | Pilot A/B on fee level (8% vs 10%) |
| 6 | Leakage on repeat local jobs | Erodes commission | Track leakage proxy; lower repeat-client rate; sticker rebooking |
| 7 | Will associations, chiefs and churches act as vouchers/assessors, and on what terms (fees, liability)? | Tier 1 and Tier 3 depend on them | Field interviews; MoUs before pilot |
| 8 | Elite capture or partisanship of vouchers | Excludes outsiders, displaced anglophones | Two-circle rule, appeals, alternative voucher circles |
| 9 | Platform liability when a verified electrician causes a fire | Reputational and legal | ToS intermediary role, artisan warranties, CIMA-insured guarantee (lawyer/broker) |
| 10 | Labour misclassification from quality controls | Labour Code / CNPS exposure | Contract design (lawyer) |
| 11 | Minimum tax on turnover if revenue booked as GMV | Could exceed margin | Agency structure (accountant) |
| 12 | Voice consent validity as "univoque" evidence | Consent is the only legal basis | Lawyer; layered audio + keypress receipts |
| 13 | Electrician supply count and density in Douala V; neighbourhood demand, incomes, repair spend | Pilot sizing | Field scan; compare against Yaoundé (Biyem-Assi, Bastos) |
| 14 | Real XAF price lists per job; SMIG amount (36,270 in 2014 vs ~41,875 reported) | Price bands, unit economics | 30–50 interviews; WageIndicator/official text |
| 15 | USSD and IVR tariffs on MTN, Camtel, Nexttel; #237# for non-financial services | Channel costs | Aggregator quotes |
| 16 | WhatsApp penetration; smartphone vs feature-phone split among artisans | Channel mix | Pilot intake survey |
| 17 | RTT from Cameroonian networks to Paris vs Cape Town | Region choice | One-week probe |
| 18 | Accuracy of French/English ASR on Cameroonian accents; no Pidgin ASR | Voice reviews | Pilot test; human moderation |
| 19 | Generalising the *Nature* binary-rating fairness result to Cameroon | Rating design | A/B binary vs 5-point in pilot |
| 20 | Anglophone crisis, shutdowns, election-period throttling | Expansion, availability | SMS/USSD completeness; region SLOs |
| 21 | Competition from QwickServices and others | Differentiation | Depth in one trade and one area |
| 22 | Whether MINEFOP would accept platform portfolios as VAE evidence | Long-term moat | Early data-format dialogue with MINEFOP |

Several **numbers in the notes were explicitly unverified and are excluded** from this report's claims:

- the "85% electrical fires" figure;
- Kolonell's vendor claims about Dakar (20% commission, 35% WhatsApp leakage, escrow cutting disputes 45%);
- Sent.dm's implausibly low SMS prices;
- 2025 ANTIC complaint counts that could not be tied to an article.

Several numbers **conflict between sources**, and this report treats them as follows:

- **Internet users:** approximate ranges, since DataReportal revises its series between editions.
- **Mobile-money market shares:** "roughly even". ART counted Orange at 50.08% of mobile subscribers in 2024 ([EcoMatin/ART](https://ecomatin.net/cameroun-orange-capte-50-du-marche-mobile-et-creuse-lecart-avec-mtn-selon-lart)), Orange held 52.6% of mobile-money value in 2025 ([Financial Afrik](https://www.financialafrik.com/2026/10/08/cameroun-en-2025-mtn-mobile-money-reduit-son-retard-sur-le-leader-orange-money/)), and a vendor estimate gives MTN 52%. **Support both wallets from day one.**
- **NCSCS cable landing point:** Kribi versus Limbe, unresolved.
- **AWS Activate Portfolio credits:** $100k versus $200k depending on the page; verify when applying.

## Conclusion

The research changes what "building the platform" means. The software is the easy part: a FastAPI-on-Lambda modular monolith with PostGIS, H3 and an event outbox can be built and run for a few hundred dollars a month. The defensible asset is a **verified job ledger**. Every entry is a job proven by a customer's code, a PSP payment reference and live photos, and is vouched for by people whose own standing is at stake. That ledger serves customers' trust and also anchors credit, insurance, VAE certification and B2B contracts, the revenue lines that do not tax artisans.

The binding constraints are legal and social, not technical. The platform must route money through a licensed PSP rather than hold it. It must keep reputation scoring narrow, consented, explainable and contestable until a lawyer clears Art. 65. And it must borrow trust from associations, chiefs, churches and njangis without letting any of them become a gatekeeper.

The most consequential unknown is whether Douala customers will pay roughly 10% for a guarantee when peer-to-peer mobile money is now nearly free. That single pilot metric decides whether this is a business or a public good. The electrician-safety framing and the diaspora and B2B channels are the strongest hedges if it turns out to be the latter.


## 14. Consolidated bibliography (801 distinct sources)

This list merges every source cited across the nine research notes (01 problem context, 02 comparable platforms, 03 skill verification and reputation, 04 anti-fraud, 05 channels and low-literacy UX, 06 system design on AWS/Python, 07 security and legal, 08 business model, 09 launch and go-to-market). It was de-duplicated by URL: protocol, "www." and trailing slashes were ignored when matching. Where the same document appears on two different hosts (for example a Fairwork report on fair.work and on fairwork.oii.ox.ac.uk), both URLs are kept. The tag after each entry shows which notes cite it. Inclusion here does not mean the source is reliable. Vendor blogs, search-result summaries and other low-confidence sources are flagged in the body of this report where they are used, and the notes flag them too.

1. INS — EESI3 Phase 1 Employment Survey main report (page). <https://ins-cameroun.cm/en/statistique/eesi3-phase-1-employment-survey-main-report/> (notes 01, 03)
2. INS — EESI3 Phase 1 full report PDF (FR). <https://ins-cameroun.cm/wp-content/uploads/2025/07/EESI3_Rapport-principal_Emploi_VF.pdf> (notes 01)
3. Nkafu Policy Institute — Beyond the trade deficit and the jobs crisis. <https://nkafu.org/beyond-the-trade-deficit-and-the-jobs-crisis-breaking-the-vicious-circle-of-precariousness-through-industrialization/> (notes 01)
4. CEPI — State of Entrepreneurship in Cameroon 2024/2025. <https://camepi.org/report-state-of-entrepreneurship-in-cameroon-2024-2025/> (notes 01)
5. Cameroon Tribune — "Secteur informel : en faits et chiffres" (Nov 2023). <https://www.cameroon-tribune.cm/article.html/61372/fr.html/details_2> (notes 01)
6. Camer.be — L. M. Kakdeu, Créer une Chambre de Métiers (May 2026). <https://www.camer.be/93491/30:27/cameroun-creer-une-chambre-de-metiers-comme-levier-de-transition-vers-une-economie-formelle-cameroon.html> (notes 01)
7. Ecofin Agency — Cameroon's informal workers earn CFA 83,409/month (INS). <http://www.ecofinagency.com/public-management/0611-45017-cameroons-informal-workers-earn-an-average-of-cfa83-409-per-month-ins> (notes 01, 03)
8. INS — EESI3 Phase 2 Informal Sector leaflet PDF (FR). <https://ins-cameroun.cm/wp-content/uploads/2025/07/EESI3_Depliant_Secteur-informel_FR_28_09_2023-2.pdf> (notes 01)
9. INS — EESI3 Phase 2 Informal Sector leaflet page. <https://ins-cameroun.cm/en/statistique/eesi3-phase-2-informal-sector-survey-main-indicators-leaflet/> (notes 01)
10. IMF — Cameroon Country Report 2024 (selected issues). <https://www.imf.org/-/media/files/publications/cr/2024/english/1cmrea2024002.pdf.md> (notes 01)
11. EcoMatin — Artisanat : le Cameroun veut s'inspirer du modèle ivoirien (Aug 2026). <https://ecomatin.net/artisanat-le-cameroun-veut-sinspirer-du-modele-ivoirien-pour-booster-sa-contribution-au-pib> (notes 01)
12. Journal du Cameroun — Près de 350 000 PME estimées en 2022. <https://fr.journalducameroun.com/entrepreneuriat-pres-de-350-000-pme-estimees-au-cameroun-en-2022/> (notes 01)
13. Wikipedia — Douala. <https://en.wikipedia.org/wiki/Douala> (notes 01, 08, 09)
14. DataReportal — Digital 2027: Cameroon. <https://datareportal.com/reports/digital-2027-cameroon> (notes 01)
15. DataReportal — Digital 2026: Cameroon. <https://datareportal.com/reports/digital-2026-cameroon> (notes 01, 05, 08)
16. Worldometer (UN WUP 2025) — Largest cities in Cameroon. <https://www.worldometers.info/population/largest-cities-in-cameroon/> (notes 01)
17. citypopulation.de — Cameroon cities. <https://citypopulation.de/en/cameroon/cities/?admid=6817> (notes 01)
18. World Bank — Cameroon overview. <https://www.worldbank.org/en/country/cameroon/overview> (notes 01, 08)
19. INS — ECAM5 SDG indicators sheet (2022). <https://ins-cameroun.cm/wp-content/uploads/2025/07/Page-ODD-ECAM5-En.pdf> (notes 01)
20. Tony Elumelu Foundation — Bamai Namata / Maibeta. <https://www.tonyelumelufoundation.org/?p=29130> (notes 01, 02)
21. MIT Solve — Maibeta Inc. (2018). <https://solve.mit.edu/solutions/3333> (notes 01)
22. MIT Solve — OmniJobber (2018). <https://solve.mit.edu/solutions/2777> (notes 01)
23. Ngyah-Etchutambe et al., Frontiers in Education (2022) — tailoring apprenticeship in Buea. <https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2022.1027632/pdf> (notes 01)
24. Cameroon Tribune — QwickServices platform goes operational (Apr 2026). <https://www.cameroon-tribune.cm/article.html/76197/en.html/details_2> (notes 01)
25. WeAreTech Africa — Quicky Services (Sep 2025). <https://www.wearetech.africa/en/fils-uk/news/cameroons-quicky-services-bridges-clients-and-providers-via-mobile-app> (notes 01)
26. WeAreTech Africa — Nofey / Audrey Ludivine Baha (Feb 2026). <https://www.wearetech.africa/en/fils-uk/tech-stars/audrey-ludivine-baha-launches-nofey-to-digitize-access-to-local-artisans-in-africa> (notes 01)
27. TotalEnergies Startupper — FixIt project (2024). <https://startupper.totalenergies.com/en/juries/86Y55jNNiLsd7YcnUUiwwQ/participations/9485/vote> (notes 01)
28. Apple App Store — TrustWork — trustwork. <https://apps.apple.com/ca/app/trustwork/id6745813388> (notes 01)
29. CoinAfrique Cameroun — classifieds homepage. <https://cm.coinafrique.com/> (notes 01, 02)
30. ProGigFinder — Plumbing services in Douala (low-reliability price indication). <https://www.progigfinder.com/services/plumbing/douala> (notes 01)
31. ProGigFinder — Electrical services in Douala. <https://www.progigfinder.com/services/electrical/douala> (notes 01)
32. Camer.be — Lorsque les biens d'un mbenguiste sèment la zizanie (Jun 2017). <https://www.camer.be/61065/15:1/cameroon-cameroun-lorsque-les-biens-dun-mbenguiste-sement-la-zizanie-dans-la-famille.html> (notes 01)
33. Camer.be — Rallonge défectueuse : le danger silencieux (Jun 2026). <https://www.camer.be/amp/93595/11:1/cameroun-rallonge-defectueuse-le-danger-silencieux-qui-tue-dans-nos-maisons-cameroon.html> (notes 01)
34. Le360 Afrique — Recrudescence des incendies dans les grandes villes (Aug 2025). <https://afrique.le360.ma/societe/cameroun-linquietante-recrudescence-des-incendies-dans-les-grandes-villes-du-pays_X66WKF3BDVCNJA47I47GXLIN5U/> (notes 01)
35. Camer.be / Mutations — Incendies à Yaoundé : branchements électriques à problème (2015). <https://www.camer.be/42064/11:1/cameroun-incendies-a-yaounde-branchements-electriques-a-probleme-cameroon.html> (notes 01)
36. Camer.be — Pourquoi y a-t-il autant d'incendies au Cameroun ? (Dec 2019). <https://www.camer.be/78065/32:29/cameroon-pourquoi-y-a-t-il-autant-dincendies-au-cameroun.html> (notes 01)
37. AllAfrica — Incendie meurtrier à Etoa Meki, Yaoundé (Feb 2026). <https://fr.allafrica.com/stories/202602200594.html> (notes 01)
38. AllAfrica — Garoua : incendie électrique détruit 16 batteries (Jun 2026). <https://fr.allafrica.com/stories/202606290396.html> (notes 01)
39. Journal du Cameroun — Effondrement d'un immeuble, 33 morts (Jul 2023). <https://fr.journalducameroun.com/cameroun-douala-de-16-a-33-morts-le-bilan-salourdit-apres-effondrement-dun-immeuble/> (notes 01)
40. Camer.be — Douala : 6 morts dans l'effondrement d'un immeuble à Bonamoussadi (Jul 2026). <https://www.camer.be/amp/93934/11:1/cameroun-douala-6-morts-dans-leffondrement-dun-immeuble-a-bonamoussadi-cameroon.html> (notes 01)
41. Camer.be — Effondrement des immeubles, un phénomène récurrent (Jun 2020). <https://www.camer.be/80681/11:1/cameroun-effondrement-des-immeubles-un-phenomene-recurrent-cameroon.html> (notes 01)
42. Camer.be — Logements sociaux : 535 chantiers abandonnés à Douala. <https://www.camer.be/78721/11:1/cameroun-logements-sociaux-535-chantiers-abandonnes-a-douala-cameroon.html> (notes 01)
43. Africa-laws.org — Loi n° 2007/004 du 13 juillet 2007 régissant l'artisanat. <https://www.africa-laws.org/Cameroon\Comercial%20law\Loi%20N%C2%B0%202007004%20DU%2013%20JUILLET%202007%20REGISSANT%20L%E2%80%99ARTISANAT%20AU%20CAMEROUN.pdf> (notes 01)
44. Cameroon Desks — Liste des métiers de l'artisanat / BCA registration (Apr 2025). <https://www.cameroondesks.com/2025/04/liste-des-metiers-de-l-artisanat-cameroun-sty.html> (notes 01)
45. Osidimbea — MINPMEESA institutional page. <https://www.osidimbea.cm/institutions/gouvernement/pme-et-artisanat> (notes 01)
46. Journal du Cameroun — Christophe Eken renewed as CCIMA president. <https://fr.journalducameroun.com/cameroun-christophe-eken-rempile-a-la-tete-de-la-chambre-de-commerce/> (notes 01)
47. CCIMA — CCIMA News May–June 2026. <https://ccima.cm/wp-content/uploads/2026/07/CCIMA-NEWS-MAI-JUIN-2026.pdf> (notes 01)
48. AllAfrica — same op-ed (syndicated). <https://fr.allafrica.com/stories/202605300165.html> (notes 01)
49. OHADA — OHADA & MINPMEESA on the statut de l'entreprenant. <https://www.ohada.com/actualite/8465/lohada-et-le-minpmeesa-sengagent-en-faveur-de-loperationnalisation-du-statut-de-lentreprenant.html> (notes 01)
50. fundsforNGOs News — MINEFOP & CRAMA renew automotive training/certification (Oct 2026). <https://news.fundsforngos.org/2026/10/07/cameroon-minefop-crama-renew-automotive-training-certification-2026/> (notes 01, 03)
51. ILO Research Repository — Demol & Nihan (1982), The modern informal sector in Yaoundé. <https://researchrepository.ilo.org/esploro/outputs/journalArticle/The-modern-informal-sector-in-Yaoundé/995274755802676> (notes 01)
52. Camer.be — MINEFOP Ndé CQP/DQP defences (2026). <https://www.camer.be/94509/11:1/cameroun-minefop-dans-le-nde-les-jeunes-apprenants-demontrent-leur-savoir-faire-et-leur-creativite.html> (notes 01)
53. Infospratiques.cm — PADESCE/MINEFOP work-study CQP call (646 places). <https://infospratiques.cm/?p=705> (notes 01, 03)
54. PADESCE — Cadre national de certification et de qualification document. <https://padesce.cm/wp-content/uploads/2025/04/DOCUMENT-CNCQ-BON-1.pdf> (notes 01, 03)
55. AUF — FormPro 237 steering committee press release (Jan 2026). <https://www.auf.org/wp-content/uploads/2026/01/Communique-de-presse-COPIL-FP237-VF.pdf> (notes 01, 03)
56. JEME (Jeune, Métier, Emploi) portal. <https://www.emploijeune.cm/en> (notes 01)
57. DataReportal — Digital 2025: Cameroon. <https://datareportal.com/reports/digital-2025-cameroon> (notes 01, 05, 06, 09)
58. DataReportal — Digital 2024: Cameroon. <https://datareportal.com/reports/digital-2024-cameroon> (notes 01)
59. Business in Cameroon — Rising smartphone adoption (ART, 2021). <https://www.businessincameroon.com/economy/0907-11756-cameroon-rising-smartphone-adoption-calls-for-actions-to-meet-users-quality-telecom-service-expectations-minpostel-says> (notes 01)
60. SAMENA Council — GSMA smartphone figures for Cameroon (2022). <https://samenacouncil.org/samena_daily_news?news=106164> (notes 01)
61. GSMA — State of Mobile Internet Connectivity 2024 key findings. <https://gsma.com/r/wp-content/uploads/2024/10/The-State-of-Mobile-Internet-Connectivity-Report-Key-Findings-2024.pdf> (notes 01)
62. EcoMatin — Orange capte 50% du marché mobile (ART 2024). <https://ecomatin.net/cameroun-orange-capte-50-du-marche-mobile-et-creuse-lecart-avec-mtn-selon-lart> (notes 01)
63. Cameroon Tribune — Communications électroniques : plus de 1000 milliards en 2024. <https://cameroon-tribune.cm/article.html/74465/fr.html/communications-electroniques-plus-de-1000-milliards-de-f-generes-en-2024> (notes 01)
64. EcoMatin — MTN consolide son leadership (MTN 2025 share claim). <https://ecomatin.net/services-mobiles-mobile-money-parc-dabonnes-mtn-consolide-son-leadership-sur-le-marche-camerounais> (notes 01)
65. Digital Business Africa — Camtel 67,507 fixed subscribers (2024). <https://www.digitalbusiness.africa/cameroun-avec-seulement-67-507-abonnes-fixes-camtel-voit-son-parc-chuter-de-12-tandis-que-le-trafic-international-bondit-de-36-547-en-2024/> (notes 01)
66. Les Afriques — Real price of data in Africa, 53 countries (Oct 2026). <https://lesafriques.com/en/2026/10/the-real-price-of-data-in-africa-ranking-of-53-countries-0-38-to-43-75-per-gb/> (notes 01)
67. Research ICT Africa — RAMP index insights Q2 2025. <https://researchictafrica.net/2025/07/24/ramp-index-insights-quarter-2-2025/> (notes 01)
68. Access Now — Letter re: Internet connectivity in Cameroon (Oct 2017). <https://www.accessnow.org/wp-content/uploads/2017/10/Cameroon_RE-Internet-Connectivity.pdf> (notes 01)
69. Al Jazeera — Cameroon internet shutdowns cost Anglophones millions (Jan 2018). <https://www.aljazeera.com/amp/news/2018/1/26/cameroon-internet-shutdowns-cost-anglophones-millions> (notes 01)
70. Quartz — Cameroon restricted internet >150 days in 2017. <https://qz.com/1138529/cameroons-anglophone-ambazonia-region-has-had-internet-restriction-for-150-days-in-2017> (notes 01)
71. Global Voices — Social media and civic engagement before 2025 election. <https://globalvoices.org/2025/07/25/social-media-ignites-widespread-civic-engagement-on-the-eve-of-cameroons-presidential-election/> (notes 01)
72. World Bank Gender Data Portal — Cameroon profile. <https://genderdata.worldbank.org/data/download/pdfs/countries/cameroon.pdf> (notes 01)
73. Macrotrends — Cameroon literacy rate. <https://macrotrends.net/global-metrics/countries/CMR/cameroon/literacy-rate> (notes 01)
74. Wikipedia — Languages of Cameroon. <https://en.wikipedia.org/wiki/Languages_of_Cameroon> (notes 01)
75. APICS — Survey 18: Cameroon Pidgin English. <https://apics-online.info/surveys/18> (notes 01)
76. APICS — Contribution 18 (Cameroon Pidgin English). <https://apics-online.info/contributions/18> (notes 01)
77. Wikipedia — Anglophone Crisis. <https://en.wikipedia.org/wiki/Anglophone_Crisis> (notes 01, 09)
78. Wikipedia — Buea. <https://en.wikipedia.org/wiki/Buea> (notes 01)
79. EcoMatin — Mobile money >24,000 milliards FCFA (CNEF 2023). <https://ecomatin.net/mobile-money-le-cameroun-depasse-la-barre-des-24-000-milliards-fcfa-de-transactions-en-un-an-un-record> (notes 01, 04)
80. Financial Afrik — En 2025, MTN MoMo réduit son retard sur Orange Money (Oct 2026). <https://www.financialafrik.com/2026/10/08/cameroun-en-2025-mtn-mobile-money-reduit-son-retard-sur-le-leader-orange-money/> (notes 01)
81. EcoMatin — Orange conserve la tête du mobile money. <https://ecomatin.net/cameroun-orange-conserve-la-tete-du-mobile-money-malgre-lacceleration-de-mtn> (notes 01)
82. Osiris — Wave débarque au Cameroun (Jun 2025). <https://www.osiris.sn/wave-debarque-au-cameroun-orange-money-et-mtn-momo-deja-sous-pression-le.html> (notes 01)
83. LaunchBase Africa — Mobile money taxes in Cameroon (Jan 2025). <https://launchbaseafrica.com/2025/01/08/one-year-another-tax-mobile-money-users-in-cameroon-cry-foul-yet-again> (notes 01)
84. LaunchBase Africa — Camtel mobile money entry (Oct 2025). <https://launchbaseafrica.com/2025/10/06/a-state-backed-telco-wants-to-dethrone-mtn-and-orange-cameroon-in-mobile-money-showdown/> (notes 01)
85. AllAfrica — MoMo virtual card (Feb 2026). <https://fr.allafrica.com/stories/202602040622.html> (notes 01)
86. Business in Cameroon — Orange 4.5M vs MTN >5M MoMo users (2019). <https://www.businessincameroon.com/telecom/1504-9046-orange-cameroon-claims-4-5-million-momo-users-against-over-5-million-for-mtn> (notes 01)
87. Statistics of the World (World Bank WDI) — Cameroon remittances received. <https://statisticsoftheworld.com/country/cameroon/remittances-received> (notes 01)
88. EcoMatin — 16,845 new SMEs in 2025. <https://ecomatin.net/le-tissu-des-pme-camerounaises-sest-etoffe-de-16-845-nouvelles-entreprises-en-2025> (notes 01)
89. We Are Tech Africa — Audrey Ludivine Baha / Nofey (Feb 2026). <https://www.wearetech.africa/fr/fils/tech-stars/la-camerounaise-audrey-ludivine-baha-facilite-la-recherche-d-artisans-locaux-fiables> (notes 02)
90. Kamerpower — Sites d'annonces gratuites au Cameroun. <https://kamerpower.com/fr/sites-annonces-gratuites-au-cameroun-annonces-cameroun/> (notes 02)
91. Maligah — Kerawa company profile. <https://maligah.com/entreprises/details/Kerawa?id=34423> (notes 02)
92. CB Insights Kerawa — kerawacom. <https://www.cbinsights.com/company/kerawacom> (notes 02)
93. Wikipedia — Jumia. <https://en.wikipedia.org/wiki/Jumia> (notes 02, 09)
94. TechCabal (FR) — Jiji.ng reference. <https://techcabal.com/fr/?p=30432> (notes 02)
95. We Are Tech Africa — Klandoo (Cameroon). <https://www.wearetech.africa/fr/fils/solutions/cameroun-avec-son-application-mobile-klandoo-permet-de-reserver-des-taxis-en-quelques-clics> (notes 02)
96. Jangolo — cameroun jangolo rapproche consommateurs et producteurs agricoles via ses plateformes numeriques. <https://www.wearetech.africa/fr/fils/solutions/cameroun-jangolo-rapproche-consommateurs-et-producteurs-agricoles-via-ses-plateformes-numeriques> (notes 02)
97. We Are Tech Africa — Gombo (Côte d'Ivoire). <https://www.wearetech.africa/fr/fils/solutions/cote-d-ivoire-gombo-met-en-relation-les-artisans-et-les-clients-grace-a-ses-plateformes-web-et-mobile> (notes 02)
98. Digital Mag CI — Gombo — gombo la plateforme qui facilite la recherche dartisans qualifies en cote divoire. <https://digitalmag.ci/gombo-la-plateforme-qui-facilite-la-recherche-dartisans-qualifies-en-cote-divoire/> (notes 02)
99. We Are Tech Africa — Djooman. <https://www.wearetech.africa/fr/fils/solutions/cote-d-ivoire-djooman-aide-pour-les-travaux-de-construction-et-de-renovation> (notes 02)
100. Digital Mag CI — Djooman.ci — cote divoire djooman ci une application dediee aux travaux de construction et de renovation. <https://digitalmag.ci/cote-divoire-djooman-ci-une-application-dediee-aux-travaux-de-construction-et-de-renovation/> (notes 02)
101. Apple App Store — Artisan CI. <https://apps.apple.com/bf/app/artisan-ci/id6476205850> (notes 02)
102. Annuaire CI — Ayieko Côte d'Ivoire. <https://annuaireci.com/entreprises/ayieko-cote-divoire/> (notes 02)
103. Afrique IT News — Whooti (Senegal, Oct 2026). <https://afriqueitnews.com/editorial/whooti-ou-le-pari-de-faire-entrer-lemploi-domestique-senegalais-dans-lere-de-la-confiance/> (notes 02)
104. VC4A — Niafey — ventures. <https://vc4a.com/ventures/niafey/?lang=en> (notes 02)
105. MWM — Khidme app listing. <https://mwm.ai/fr/apps/khidme/6769898583> (notes 02)
106. Apple App Store — Bridger Pro. <https://apps.apple.com/lb/app/bridger-pro/id6747755928> (notes 02)
107. Allo Jade — allo jade. <https://apps.apple.com/ee/app/allo-jade/id6749331291> (notes 02)
108. Kolonell (vendor blog; unverified) — Marketplace artisans Dakar 2026. <https://kolonell.com/fr/blog/marketplace-artisans-services-domicile-dakar-2026> (notes 02)
109. Gabonreview — OZOservir — economie numerique ozoservir la nouvelle marketplace des services au gabon. <https://www.gabonreview.com/economie-numerique-ozoservir-la-nouvelle-marketplace-des-services-au-gabon/> (notes 02)
110. Gabon Media Time — ConsoHub — consohub lapplication 100 gabonaise qui connecte commercants artisans et consommateurs. <https://gabonmediatime.com/consohub-lapplication-100-gabonaise-qui-connecte-commercants-artisans-et-consommateurs/> (notes 02)
111. We Are Tech Africa — Trankyl (Togo). <https://www.wearetech.africa/fr/fils/solutions/togo-trankyl-connecte-les-fournisseurs-de-services-aux-clients-via-ses-plateformes-web-et-mobile> (notes 02)
112. GSMA Ecosystem Accelerator — Lynk case study (2019). <https://www.gsma.com/mobilefordevelopment/wp-content/uploads/2019/05/Lynk-Connecting-informal-workers-to-job-opportunities-in-Kenya.pdf> (notes 02, 03)
113. TechMoran — Lateral Capital leads Lynk Series A (2019). <https://techmoran.com/2019/07/13/lateral-capital-leads-series-a-round-into-safaricom-backed-blue-collar-jobs-marketplace-lynk/> (notes 02)
114. Disrupt Africa — Kenya's Lynk aiming to fix informal economies (2016). <https://old.disruptafrica.com/2016/05/16/kenyas-lynk-aiming-to-fix-informal-economies/> (notes 02)
115. The Flip — Lynk: Lessons Learned the Hard Way. <https://theflip.africa/newsletter/lynk-lessons-learned-the-hard-way/> (notes 02, 03)
116. TechCabal — What does Eden Life's expansion to Kenya mean (May 2022). <https://techcabal.com/2022/05/19/what-does-eden-lifes-expansion-to-kenya-mean-for-africas-gig-economy/> (notes 02)
117. PitchBook — Lynk profile — company. <https://pitchbook.com/profiles/company/170706-25> (notes 02)
118. WeeTracker — Eden Life acquires Lynk. <https://weetracker.com/2022/04/28/nigerias-eden-life-acquires-kenyan-startup-lynk-to-expand-service-offerings/> (notes 02)
119. TechCabal — Eden Life pauses consumer business (Feb 2026). <https://techcabal.com/2026/02/14/eden-life-pauses-consumer-business-to-refocus-on-corporate-clients/> (notes 02)
120. BFA Global / Catalyst Fund — Kandua two-pager (2021). <https://bfaglobal.com/wp-content/uploads/2021/02/Kandua-two-pager.pdf> (notes 02)
121. Notion (unofficial) — Kandua standard priced services. <https://invented-krypton-0ea.notion.site/Kandua-Standard-priced-services-2f4be3d019f94276afed595678ac25dd> (notes 02)
122. Ventureburn — Kandua closes funding round (2021). <https://ventureburn.com/2021/07/sa-home-services-portal-kandua-closes-significant-funding-round/> (notes 02)
123. Santam — Santam acquires Kandua (27 May 2024). <https://www.santam.co.za/about-us/media-centre/corporate-news/santam-acquires-kandua-leading-tech-startup> (notes 02)
124. Hypertext (htxt) — Kandua acquired by Santam. <https://htxt.co.za/2024/05/odd-job-marketplace-kandua-acquired-by-santam> (notes 02)
125. Fairwork — SweepSouth South Africa ratings. <https://fair.work/en/ratings/platforms/south-africa-sweepsouth> (notes 02)
126. Nairametrics — SweepSouth $11M (2022). <https://nairametrics.com/2022/09/28/deal-sweepsouth-online-home-services-platform-secures-11-million-investment> (notes 02)
127. SweepSouth Help Centre — How much SweepStars are paid. <https://help.sweepsouth.com/hc/en-us/articles/14601036428306-How-much-SweepStars-are-paid> (notes 02)
128. Fairwork Kenya Ratings 2022 (PDF). <https://fairwork.oii.ox.ac.uk/wp-content/uploads/sites/17/2023/02/230202_fairwork_kenya-report-2022_RZ_small.pdf> (notes 02)
129. Built In Africa — Fundis LLC Kenya. <https://www.builtinafrica.io/videos/fundis-llc-kenya> (notes 02)
130. People Daily — Digitising Kenya's informal workforce. <https://peopledaily.digital/insights/digitising-kenyas-informal-workforce> (notes 02)
131. TechTrends Kenya — Fixo e-hailing platform for fundis (Apr 2025). <https://techtrendske.co.ke/2025/04/10/fixo-solutions-unveils-e-hailing-platform-for-fundis-in-kenya/> (notes 02)
132. Citizen Digital — Balozy — balozy online service marketplace connecting service providers with clients n348433. <https://citizen.digital/article/balozy-online-service-marketplace-connecting-service-providers-with-clients-n348433> (notes 02)
133. TotalEnergies Startupper — Ajira Yangu. <https://startupper.totalenergies.com/en/juries/5JxiJ509GibcqGyVo4CzuQ/participations/11735/vote> (notes 02)
134. Kenya News Agency — Bingwa app. <https://www.kenyanews.go.ke/?p=74630> (notes 02)
135. Disrupt Africa — Workspap (2019). <https://disrupt-africa.com/2019/05/kenyas-workspap-launches-to-connect-customers-with-service-providers/> (notes 02)
136. TechTrends — SafiSafi (2016). <https://techtrendske.co.ke/2016/08/17/safisafi-starts-its-operations-in-nairobi-to-bring-on-demand-domestic-services-to-customers-door-step/> (notes 02)
137. Nairametrics — Workclick app launched in Lagos (2018). <https://nairametrics.com/2018/01/30/app-connects-artisans-customers-launched-lagos/> (notes 02)
138. Techpoint Africa — Fast Forward backs Clickafix. <https://techpoint.africa/insight/fast-forward-backs-clickafix/> (notes 02)
139. BusinessDay — Clickafix debuts. <https://businessday.ng/brands-advertising/article/clickafix-app-for-artisans-home-service-debuts/> (notes 02)
140. Tribune — FixAll Africa — when celebrities others graced unveiling of fixall africa. <https://tribuneonlineng.com/when-celebrities-others-graced-unveiling-of-fixall-africa> (notes 02)
141. AllAfrica — stories. <https://allafrica.com/stories/202403270365.html> (notes 02)
142. TechEconomy — Wrkman moves to reset trust (Jul 2026). <https://techeconomy.ng/wrkman-moves-to-reset-trust-in-nigerias-home-service-economy/> (notes 02)
143. BusinessDay — Viable247 targets informal service sector. <https://businessday.ng/news/article/viable247-targets-informal-service-sector-with-new-marketplace/> (notes 02)
144. TechMoran — Gigmile / Yango Ventures (Dec 2025). <https://techmoran.com/2025/12/12/nigerias-gigmile-gets-yango-ventures-backing-for-taxi-financing/> (notes 02)
145. Launch Base Africa — IFC eyes $4M in Gigmile (Sep 2026). <https://launchbaseafrica.com/2026/09/01/ifc-eyes-4m-check-in-west-africas-gigmile-as-asset-financing-fintech-scales/> (notes 02)
146. Nsaboa — How it works — how it works. <https://nsaboa.vercel.app/how-it-works> (notes 02)
147. Graphic Online — GIZ partners launch ProfArts. <https://graphiconline.com/business/business-news/german-development-cooperation-partners-launch-profarts.html> (notes 02)
148. GHartisans (YEA Ghana). <https://ghartisans.yea.gov.gh> (notes 02)
149. MyJoyOnline — Ayuda app launched. <https://www.myjoyonline.com/ayuda-app-launched-to-tackle-unemployment-in-ghana/> (notes 02)
150. CB Insights — Accra Handyman. <https://www.cbinsights.com/company/accra-handyman/financials> (notes 02)
151. Wikipedia — Urban Company — Urban Company. <https://en.wikipedia.org/wiki/Urban_Company> (notes 02, 09)
152. YourStory — Urban Company first full-year profit (Jun 2025). <https://yourstory.com/2025/06/urban-company-first-full-year-profit-revenue-jumps-38-ipo> (notes 02)
153. Entrackr — Urban Company FY25. <https://entrackr.com/fintrackr/urban-company-posts-rs-1144-cr-revenue-and-rs-285-cr-pbt-in-fy25-9373371> (notes 02, 08)
154. Finology — Urban Company fundamental analysis. <https://recipe.finology.in/discover/premium-stock-research/urban-company-fundamental-analysis> (notes 02)
155. Inc42 — Inside Urban Company's marketplace model. <https://inc42.com/features/inside-urban-companys-marketplace-model-what-it-keeps-from-every-booking/> (notes 02, 08)
156. Wikipedia — Thumbtack (company). <https://en.wikipedia.org/wiki/Thumbtack_(company)> (notes 02)
157. Harvard D3 — Meet Thumbtack — meet thumbtack your local handyperson reimagined. <https://d3.harvard.edu/platform-digit/submission/meet-thumbtack-your-local-handyperson-reimagined/index.html> (notes 02)
158. MarketBeat — Angi Q3 2026 earnings call highlights (Nov 2026). <https://www.marketbeat.com/instant-alerts/transcript-angi-q3-earnings-call-highlights-2026-11-04/> (notes 02)
159. Investing.com — ANGI Q1 2025 slides. <https://ng.investing.com/news/company-news/angi-homeservices-q1-2025-slides-metric-changes-signal-strategic-shift-amid-spinoff-93CH-1904777> (notes 02)
160. Wikipedia — Handy (company) — Handy (company). <https://en.wikipedia.org/wiki/Handy_(company)> (notes 02)
161. Fora.ie — Handy acquired — handy sale oisin hanrahan 4282227 Oct2018. <https://fora.ie/handy-sale-oisin-hanrahan-4282227-Oct2018/> (notes 02)
162. SEC — ANGI Homeservices 8-K exhibit (Q3 2018). <https://www.sec.gov/Archives/edgar/data/0001705110/000110465918066667/a18-39702_2ex99d1.htm> (notes 02)
163. Wikipedia — TaskRabbit. <https://en.wikipedia.org/wiki/TaskRabbit> (notes 02, 09)
164. Checkatrade — Trust / vetting. <https://www.checkatrade.com/blog/trust/> (notes 02)
165. Rogue trades blocked — rogue trades blocked. <https://www.checkatrade.com/blog/news/rogue-trades-blocked/> (notes 02)
166. Wikipedia — Bark.com — Bark.com. <https://en.wikipedia.org/wiki/Bark.com> (notes 02)
167. Monitor Mercantil — GetNinjas business model. <https://monitormercantil.com.br/getninjas-ninj3-modelo-de-negocio-operacao-e-perspectivas/> (notes 02)
168. StockAnalysis — GetNinjas revenue. <https://stockanalysis.com/quote/bvmf/NINJ3/revenue> (notes 02)
169. Investidor10 — GetNinjas 1Q25 filing. <https://investidor10.com.br/acoes/link_comunicado/REAG3/31757> (notes 02)
170. e27 — Kaodim shutters (Jun 2022). <https://e27.co/east-ventures-backed-local-services-marketplace-kaodim-shutters-20220603/> (notes 02)
171. Lowyat — Kaodim to cease operations. <https://www.lowyat.net/2022/275227/online-home-services-marketplace-kaodim-to-cease-all-operations-in-july/> (notes 02)
172. The Star — malaysian startup kaodim to shut down on july 1 cites rising costs among challenges. <https://thestar.com.my/tech/tech-news/2022/06/02/malaysian-startup-kaodim-to-shut-down-on-july-1-cites-rising-costs-among-challenges> (notes 02)
173. The News Minute — Housejoy lays off 40. <https://www.thenewsminute.com/atom/housejoy-lays-40-employees-cut-costs-plans-shut-down-low-margin-categories-80490> (notes 02)
174. The News Minute — How Housejoy went to construction. <https://www.thenewsminute.com/atom/how-housejoy-went-home-repair-services-home-construction-and-renovation-120592> (notes 02)
175. YourStory — Quikr acquires Babajob (Jun 2017). <https://yourstory.com/2017/06/quikr-acquires-babajob/> (notes 02)
176. The Ken — Babajob — blue collar job market babajob. <https://the-ken.com/blue-collar-job-market-babajob/> (notes 02)
177. Sean Blagsvedt letter — my letter babajob acquired by quikr 11e5d442d155. <https://medium.com/@seanb/my-letter-babajob-acquired-by-quikr-11e5d442d155> (notes 02)
178. Wikipedia — Homejoy — Homejoy. <https://en.wikipedia.org/wiki/Homejoy> (notes 02, 09)
179. Harvard D3 — Homejoy: a Silicon Valley darling's path to the grave. <https://d3.harvard.edu/platform-digit/submission/homejoy-a-silicon-valley-darlings-path-to-the-grave/> (notes 02)
180. Scaled and Failed #24 — Airtasker and Homejoy. <https://scaledandfailed.substack.com/p/issue-24-home-services> (notes 02)
181. Digital Trends — Amazon Home Services expands. <https://uat4.www.digitaltrends.com/home/amazon-home-services-expands> (notes 02)
182. Astashkina, Bray, Momot, Salikhov — A Disquieting Lack of Evidence for Disintermediation in a Home-Cleaning Platform (2023). <https://www.kellogg.northwestern.edu/faculty/bray/doc/disintermediation/disintermediation.pdf> (notes 02)
183. SSRN — abstract=4244111. <https://papers.ssrn.com/abstract=4244111> (notes 02)
184. Gu & Zhu — Trust and Disintermediation (Management Science 2021). <https://pubsonline.informs.org/doi/fpi/10.1287/mnsc.2020.3583> (notes 02)
185. Hagiu & Wright — Marketplace Leakage (Management Science 2024). <https://ideas.repec.org/a/inm/ormnsc/v70y2024i3p1529-1553.html> (notes 02)
186. Harvard D3 — TaskRabbit weak network effects. <https://d3.harvard.edu/platform-digit/?p=11436> (notes 02)
187. Sacra — Disintermediation risk in service marketplaces. <https://sacra.com/chat/h/829c3e65-8244-4aa1-8334-44c2d0ca8c63/> (notes 02)
188. Bill Gurley — All Markets Are Not Created Equal (2012). <https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/> (notes 02, 09)
189. Caribou Digital — Platform Livelihoods Project. <https://caribou.global/projects/platform-livelihoods-project/> (notes 02, 03)
190. Women in the platform economy. <https://caribou.global/publications/women-in-the-platform-economy/> (notes 02)
191. Mastercard Foundation — Caribou Digital launches Platform Livelihoods book. <https://mastercardfdn.org/en/news/caribou-digital-launches-new-book-the-platform-livelihoods-project-research-exploring-the-workplaces-of-the-digital-age-in-africa-and-indonesia/> (notes 02)
192. Smart Company — Homejoy comes clean on why it failed. <https://www.smartcompany.com.au/startupsmart/homejoy-comes-clean-on-why-it-failed-or-perhaps-not/> (notes 02)
193. RinggitPlus — Kaodim announces closure. <https://ringgitplus.com/en/blog/personal-finance-news/kaodim-announces-closure-all-operations-to-cease-on-1-july.html> (notes 02)
194. Africa Private Equity News — Knife Capital backs Kandua. <https://www.africaprivateequitynews.com/p/knife-capital-backs-online-home-services-marketplace> (notes 02)
195. Engineering News — Santam acquires Kandua. <https://www.engineeringnews.co.za/article/santam-acquires-home-services-marketplace-kandua-2024-05-30> (notes 02)
196. Kellogg — research brief on disintermediation. <https://www.kellogg.northwestern.edu/academics-research/research/detail/2023/a-disquieting-lack-of-evidence-for-disintermediation-in-a/> (notes 02)
197. Choose Africa / AFD — Lynk informal sector feature. <https://choose-africa.com/en/featured-stories/lynk-start-up-secteur-informel-kenya> (notes 02)
198. Harvard D3 — SweepSouth: the Uber for domestic cleaning. <https://d3.harvard.edu/platform-digit/category/uncategorized/disintermediation> (notes 02)
199. ILO – Skills for transitions to formality. <https://www.ilo.org/skills-transition-formality> (notes 03)
200. ILO – RPL Learning Package (2018). <https://www.ilo.org/publications/recognition-prior-learning-rpl-learning-package> (notes 03)
201. ILO – Assessing skills in the informal economy (2015). <https://www.ilo.org/publications/assessing-skills-informal-economy-resource-guide-small-industry-and> (notes 03)
202. ILO – Guidelines on costing and financing RPL. <https://www.ilo.org/resource/report/guidelines-costing-and-financing-recognition-prior-learning> (notes 03)
203. ILO – RPL workshop report 2026. <https://www.ilo.org/sites/default/files/2026-06/RPL%20workshop%20report%20layout.pdf> (notes 03)
204. ILO – RPL in Ethiopia — recognition prior learning ethiopia. <https://www.ilo.org/resource/article/recognition-prior-learning-ethiopia> (notes 03)
205. ILO – Upgrading informal apprenticeship: resource guide for Africa (2012). <https://researchrepository.ilo.org/esploro/outputs/encyclopediaEntry/Upgrading-informal-apprenticeship/995341493102676> (notes 03)
206. ILO – Designing apprenticeships (2026). <https://www.ilo.org/sites/default/files/2026-05/Designing-apprenticeships-EN_Web.pdf> (notes 03)
207. NITA – Kenya to implement RPL. <https://nita.go.ke/news/NITA/346-kenya-to-implement-recognition-of-prior-learning.html> (notes 03)
208. ILO PROSPECTS – Kenya's inclusive national RPL framework. <https://prospectslearnings.ilo.org/node/184> (notes 03)
209. NITA – Implementation of RPL. <https://www.nita.go.ke/news/NITA/355-implementation-of-recognition-of-prior-learning-rpl.html> (notes 03)
210. NITA – RPL extended pilot, 8 counties. <https://nita.go.ke/news/NITA/354-rpl-extended-pilot-roll-out-nita-undertakes-screening-of-rpl-candidates-in-8-counties.html> (notes 03)
211. The Standard – Kenya RPL for 40,000 youth. <https://www.standardmedia.co.ke/business/amp/education/article/2001529885/kenya-rolls-out-rpl-certification-for-40000-youth-to-boost-employability> (notes 03)
212. KNQA – National Standards — National Standards 1. <https://knqa.go.ke/wp-content/uploads/2024/07/National-Standards-1.pdf> (notes 03)
213. Kenya News Agency – RPL a blessing to jua kali artisans. <https://www.kenyanews.go.ke/recognition-of-prior-learning-a-blessing-to-jua-kali-artisans/> (notes 03)
214. Graphic – COTVET to retrain TVET skills holders. <https://www.graphic.com.gh/news/general-news/cotvet-to-retrain-technical-vocational-skills-holders-for-job-market.html> (notes 03)
215. Graphic – TVET alternative learning assessment. <https://www.graphic.com.gh/news/education/tvet-discusses-implementation-of-alternative-learning-assessment.html> (notes 03)
216. GTEC – GhNQF news. <https://gtec.edu.gh/news/24650CD-C825-44> (notes 03)
217. Modern Ghana – GTVP uplifts traditional apprenticeship. <https://www.modernghana.com/news/1406954/gtvp-uplifts-traditional-apprenticeship-in-ghana.html> (notes 03)
218. MyBrytFM – CTVET certification of masters. <https://mybrytfmonline.com/?p=102022> (notes 03)
219. NBTE – NSQF. <https://web.nbte.gov.ng/nsqf> (notes 03)
220. Federal Polytechnic Nekede – SDC directorate (NSQ/PLE test). <https://fpno.edu.ng/sdc-directorate> (notes 03)
221. NAN News – NBTE/NAPTIN assessor e-learning. <https://nannews.ng/nbte-naptin-unveil-e-learning-platform-to-grow-quality-assurance-assessors/> (notes 03)
222. The Point – NBTE RPL training. <https://thepoint.gm/africa/gambia/headlines/sasasnet-nbte-train-stakeholders-on-rpl-in-nigeria> (notes 03)
223. PMG – Draft Artisan RPL policy (SA, 2015). <https://pmg.org.za/files/151023artisanrecognition-priorlearning-draft.pdf> (notes 03)
224. Acts Online – Skills Development Act s26D trade tests. <https://www.acts.co.za/skills-development-act-1998/26d__trade_tests> (notes 03)
225. Acts Online – Trade test transitional arrangements. <https://www.acts.co.za/skills/r376_11__transitional_arrangem> (notes 03)
226. merSETA – ARPL trade test application form. <https://www.merseta.org.za/wp-content/uploads/2024/04/merSETA_Artisan-Recognition-of-Prior-Learning-ARPL_Trade-Test-Application-Form_Rev19.pdf> (notes 03)
227. QCTO – Certification infographic. <https://www.qcto.org.za/assets/certification-infographic-final-2021-approved.pdf> (notes 03)
228. Gouv.bj – CQM rénové launch — lancement examen renove session octobre 2023 nouvelle ere. <https://www.gouv.bj/article/2425/lancement-examen-renove-session-octobre-2023-nouvelle-ere/> (notes 03)
229. MESTFP Benin – CQM April 2025 session. <https://www.enseignementsecondaire.gouv.bj/actualite/nouvelles/662/examen-du-cqm-session-davril-2025-35496-candidats-a-lassaut-du-precieux-sesame> (notes 03)
230. JER – Professional associations in Benin dual apprenticeship. <https://jer.kusoed.edu.np/download/role-of-professional-associations-in-benin-dual-apprenticeship-15374.pdf> (notes 03)
231. Swisscontact – Brochure FP Bénin. <https://cdn-release.swisscontact.org/_Resources/Persistent/b/3/8/a/b38a49ed220400222386dd342c4110197704404c/Brochure_FP_Benin.pdf> (notes 03)
232. La Base Lextenso – Cameroun : une loi pour promouvoir l'apprentissage (2019). <https://www.labase-lextenso.fr/l-essentiel-droits-africains-des-affaires/2019-n4/cameroun-une-loi-pour-promouvoir-l-apprentissage-DAA112b8> (notes 03)
233. SPM Cameroon – Décret 2020/2592. <https://www.spm.gov.cm/site/sites/default/files/decret_ndeg_2020_2592.pdf> (notes 03)
234. NEPAD – Cameroon CNCQ document. <https://nepad.org/file-download/download/public/128050> (notes 03)
235. ILO – Cameroon lays foundation for recognising skills from labour-based works (Aug 2026). <https://www.ilo.org/resource/news/cameroon-lays-foundation-recognizing-skills-gained-through-labour-based> (notes 03)
236. Investir au Cameroun – AfDB-backed programme. <https://m.investiraucameroun.com/news/i/16278/afdb-backed-programme-launches-train-workers-cameroons-industrial-sectors> (notes 03)
237. ADEA – Digital credentials for skills recognition. <https://adeanet.org/en/blogs/digital-credentials-new-solution-skills-recognition> (notes 03)
238. The Citizen (Tanzania) – Micro-credentials. <https://thecitizen.co.tz/tanzania/magazines/success/micro-credentials-tanzania-s-answer-to-the-skills-recognition-gap-5569530> (notes 03)
239. TrueScreen – Certified geolocation / photo evidence. <https://truescreen.io/articles/certified-geolocation-court-admissible-photo-evidence/> (notes 03)
240. Timemark – Photo verification. <https://www.timemark.com/features/photo-verification> (notes 03)
241. Google Security Blog – Pixel C2PA Content Credentials. <https://security.googleblog.com/2025/09/pixel-android-trusted-images-c2pa-content-credentials.html> (notes 03)
242. Content Authenticity Initiative – Click camera app. <https://contentauthenticity.org/blog/community-story-click> (notes 03)
243. Urban Company – Azure selfie verification. <https://www.urbancompany.com/blog/urban-company-strengthens-safety-protocol-using-microsoft-azure-cognitive-services> (notes 03)
244. AuthBridge – Urban Company safety and upskilling. <https://authbridge.com/?p=2119> (notes 03)
245. Urban Company – Upskilling service partners. <https://www.urbancompany.com/blog/setting-up-service-partners-for-success-upskilling-at-urban-company> (notes 03)
246. Urban Company – Refrigerator repair page (30-day guarantee). <https://urbancompany.com/delhi-ncr-refrigerator-repair-kalkaji-new-delhi> (notes 03)
247. Mercy Corps / Prosper – Youth Impact Labs partner case studies (Lynk). <https://www.mercycorps.org/sites/default/files/2020-12/Youth-Impact-Labs-Partner-Case-studies.pdf> (notes 03)
248. Dhami et al. – CESifo WP 7773 (joint liability/social collateral). <https://www.cesifo.org/DocDL/cesifo1_wp7773_0.pdf> (notes 03)
249. Ghatak & Guinnane – Economics of lending with joint liability. <https://ideas.repec.org/p/fth/yalegr/791.html> (notes 03)
250. Ghatak – Screening by the company you keep (EJ 2000). <https://personal.lse.ac.uk/ghatak/ej.pdf> (notes 03)
251. Karlan – Group banking (J-PAL). <https://www.povertyactionlab.org/sites/default/files/publications/95_Karlan_Group_Banking.pdf> (notes 03)
252. Karlan, Mobius, Rosenblat & Szeidl – Trust and Social Collateral (QJE 2009). <https://econpapers.repec.org/RePEc:oup:qjecon:v:124:y:2009:i:3:p:1307-1361.> (notes 03)
253. Giné & Karlan – Group vs individual liability (CGD WP 111). <https://ideas.repec.org/p/cgd/wpaper/111.html> (notes 03)
254. World Bank – Grameen I/II joint vs individual liability paper. <https://openknowledge.worldbank.org/bitstreams/4e072c29-575d-5250-a89a-5fe88127dac4/download> (notes 03)
255. Proof of Humanity – design document. <https://docs.google.com/document/d/1z01MS0-h75ESVmWymU2Gv3Z43p35oZAFtQLStOeu7Ek/export?format=pdf> (notes 03)
256. BlockEden – Proof of personhood (BrightID) course. <https://blockeden.xyz/course/defi/11.4/> (notes 03)
257. Chainscore – PoH vs BrightID comparison. <https://www.chainscorelabs.com/comparisons/identity-soulbound-vs-verifiable-credentials/proof-of-personhood-systems/proof-of-humanity-vs-brightid-social-verification-implementations> (notes 03)
258. Human Passport – Stamp weights. <https://support.passport.human.tech/stamps/stamp-weights> (notes 03)
259. Gitcoin – How Passport score is calculated. <https://support.gitcoin.co/gitcoin-knowledge-base/gitcoin-passport/common-questions/how-is-gitcoin-passports-score-calculated> (notes 03)
260. Human Passport – Key terms — key terms. <https://docs.passport.human.tech/overview/key-terms> (notes 03)
261. Kamvar, Schlosser & Garcia-Molina – EigenTrust (WWW 2003). <https://www.csd.uwo.ca/~hlutfiyy/610/papers/eigentrust.pdf> (notes 03)
262. Wikipedia – EigenTrust. <https://en.wikipedia.org/wiki/EigenTrust> (notes 03)
263. Fair Observer – Tontines in Cameroon. <https://fairobserver.com/?p=34530> (notes 03)
264. Foretia Foundation – Community savings circles for youth startups. <https://www.foretiafoundation.org/alternative-financing-models-community-savings-circles-and-rotating-funds-for-youth-startups-in-cameroon/> (notes 03)
265. JSSJ – Security production in two Yaoundé neighbourhoods. <https://www.jssj.org:443/wp-content/uploads/2012/10/JSSJ4-9-en.pdf> (notes 03)
266. Camer.be – Douala under high surveillance (self-defence committees). <https://www.camer.be/amp/63232/11:1/cameroun-lutte-contre-le-terrorisme-douala-sous-haute-surveillance-cameroon.html> (notes 03)
267. Kiva – How Kiva works. <https://www.kiva.org/about/how> (notes 03)
268. Resnick & Zeckhauser – Trust among strangers (eBay). <https://presnick.people.si.umich.edu/papers/ebayNBER/index.html> (notes 03)
269. Resnick & Zeckhauser – PDF (Harvard). <https://scholar.harvard.edu/sites/scholar.harvard.edu/files/rzeckhauser/files/trust_among_strangers.pdf> (notes 03)
270. Harvard Magazine – Integrity has its price (eBay field experiment). <https://www.harvardmagazine.com/print/1624?page=all> (notes 03)
271. Tadelis – Reputation and feedback systems (Annual Review 2016). <https://ideas.repec.org/a/anr/reveco/v8y2016p321-340.html> (notes 03)
272. Horton – Reputation Inflation page. <https://john-joseph-horton.com/papers/reputation-inflation/> (notes 03, 04)
273. Filippas, Horton & Golden – CESifo WP 6750. <https://cesifo.org/DocDL/cesifo1_wp6750.pdf> (notes 03)
274. INFORMS – Five-star ratings press release. <https://www.informs.org/News-Room/INFORMS-Releases/News-Releases/Five-Star-Rating-New-Research-Finds-It-May-Not-Reflect-What-Consumers-Receive> (notes 03, 04)
275. Zervas, Proserpio & Byers – Airbnb reputation paper. <https://people.bu.edu/zg/publications/airbnbreviews.pdf> (notes 03)
276. BU – At Airbnb, where every stay is above average. <https://www.bu.edu/articles/2015/at-airbnb-where-every-stay-is-above-average> (notes 03)
277. Nosko & Tadelis – Limits of reputation (NBER w20830). <https://www.nber.org/papers/w20830> (notes 03)
278. Chicago Booth Review – More accurate eBay seller profiles. <https://www.chicagobooth.edu/review/making-bid-for-more-accurate-ebay-seller-profiles> (notes 03)
279. Fradkin, Grewal & Holtz – Reciprocity and unveiling (SSRN). <https://papers.ssrn.com/abstract=2939064> (notes 03, 04)
280. Fradkin et al. – NBER conference draft. <https://conference.nber.org/conf_papers/f81348/f81348.pdf> (notes 03)
281. Luca & Zervas – Fake it till you make it (Harvard DASH). <https://dash.harvard.edu/handle/1/22836596> (notes 03, 04)
282. One Mile at a Time – Spotting fake TripAdvisor reviews. <https://onemileatatime.com/insights/fake-tripadvisor-review/> (notes 03)
283. Evan Miller – How not to sort by average rating. <https://evanmiller.org/how-not-to-sort-by-average-rating.html> (notes 03, 06)
284. Jøsang & Ismail – Beta Reputation System (2002). <https://mn.uio.no/ifi/english/people/aca/josang/publications/ji2002-bled.pdf> (notes 03)
285. Jøsang & Haller – Dirichlet reputation systems (2007). <https://mn.uio.no/ifi/english/people/aca/josang/publications/jh2007-ares.pdf> (notes 03)
286. Jøsang, Ismail & Boyd – Survey of trust and reputation systems. <https://idtrust.xml.org/resource/a-survey-of-trust-and-reputation-systems-for-online-service-provision> (notes 03)
287. Uber – Driver deactivation policy. <https://www.uber.com/za/en/blog/driver-deactivation-policy/> (notes 03)
288. Minnesota DLI – Uber driver access to platform. <https://dli.mn.gov/sites/default/files/pdf/tnc_uber_driver_access_to_platform_092623.pdf> (notes 03)
289. Pallais – Inefficient hiring in entry-level labor markets (NBER w18917). <https://www.nber.org/papers/w18917> (notes 03)
290. Hannák et al. – Bias in online freelance marketplaces (CSCW 2017). <https://khoury.northeastern.edu/home/ancsaaa/files/CSCW17.pdf> (notes 03)
291. Rice University – Scale dichotomization study (Nature 2025). <https://news.rice.edu/news/2025/racial-earning-gap-gig-work-eliminated-through-new-rating-system> (notes 03)
292. Yale Insights – Ratings systems amplify racial bias. <https://insights.som.yale.edu/insights/ratings-systems-amplify-racial-bias-on-gig-economy-platforms> (notes 03)
293. GroupLens – Simulation experiments on ratings bias. <https://grouplens.org/blog/simulation-experiments-on-the-absence-of-ratings-bias-in-reputation-systems/> (notes 03)
294. Fairwork – Kenya 2023 report. <https://fair.work/wp-content/uploads/sites/17/2023/12/Fairwork_kenya_Report_2023.pdf> (notes 03)
295. Medhi, Sagar & Toyama – Text-free UIs (ITID 2007). <https://courses.cs.washington.edu/courses/cse490d/09au/papers/Text-FreeUI.pdf> (notes 03)
296. Medhi Thies – 2015 survey — medhi thies 2015. <https://courses.cs.washington.edu/courses/cse490c/18au/readings/medhi-thies-2015.pdf> (notes 03)
297. Vashistha et al. – Sangeet Swara (CHI 2015). <https://billthies.net/assets/pdf/chi15-sangeet-swara.pdf> (notes 03)
298. Raza et al. – The Internet of the Orals (CACM 2019). <https://aghaaliraza.com/publications/2019--CACM--The_Internet_of_the_Orals.pdf> (notes 03)
299. Vashistha et al. – Threats to women on voice forums (CHI 2019). <https://ictd.cs.washington.edu/docs/papers/2019/vashistha_chi2019_threat.pdf> (notes 03)
300. Mudliar, Donner & Thies – CGNet Swara (ITID 2013). <https://www.billthies.net/assets/pdf/mudliar13itid.pdf> (notes 03)
301. Stewart – Trust transfer on the WWW (Org. Science 2003). <https://ideas.repec.org/a/inm/ororsc/v14y2003i1p5-17.html> (notes 03)
302. Stewart & Malaga – Web-based groupings and trust transfer (ICIS 2003). <https://aisel.aisnet.org/icis2003/90> (notes 03)
303. Jiji – Verified badge FAQ. <https://jiji.ng/faq/125> (notes 03)
304. Marketplace.ng – How to verify online sellers in Nigeria. <https://www.marketplace.ng/blog/how-to-verify-online-sellers-in-nigeria> (notes 03)
305. Stanford eCorner – Marketplaces operate on trust (Jumia). <https://stvp.stanford.edu/wp-content/uploads/sites/3/2024/09/marketplaces-operate-on-trust-transcript.pdf> (notes 03)
306. Quartz – Nigerian e-commerce rethinking pay-on-delivery. <https://qz.com/africa/951834/jumia-murder-nigerian-e-commerce-businesses-rethinking-payment-on-delivery-for-customers> (notes 03)
307. IDEAS/RePEc – Jumia customer trust study. <https://ideas.repec.org/a/bco/mbraaa/v8y2021p65-75.html> (notes 03)
308. DICAMES – Yaoundé I thesis on online shopping confidence. <https://dicames.online/jspui/handle/20.500.12177/7353> (notes 03)
309. EconPapers – Cybercrime and e-commerce trust in Cameroon (2025). <https://econpapers.repec.org/RePEc:bjf:journl:v:10:y:2025:i:5:p:537-549> (notes 03)
310. IJEMR – Consumer behaviour and e-commerce in Cameroon. <https://ijemr.vandanapublications.com/index.php/ijemr/article/view/410> (notes 03)
311. Mykolas Romeris University – Digital content start-ups in Cameroon. <https://cris.mruni.eu/cris/handle/007/45572> (notes 03)
312. Abertay University – Cybersecurity and trust in mobile money (Cameroon). <https://rke.abertay.ac.uk/en/publications/the-role-of-cybersecurity-and-trust-on-customers-continuous-usage/> (notes 03)
313. Njoya et al. – Mobile money phishing in Cameroon (EUDL). <https://eudl.eu/doi/10.1007/978-3-031-34896-9_26> (notes 03)
314. The Voice – Mobile money scams. <https://www.thevoicenews.net/?p=3849> (notes 03)
315. ICTD – Cameroon mobile money agents. <https://www.ictd.ac/blog/cameroon-mobile-money-agents-struggling-to-increase-revenue/> (notes 03, 08)
316. O'Reilly/ISTE – Cell phones and scamming risks in Cameroon. <https://www.oreilly.com/library/view/perceptions-and-analysis/9781786307446/c05.xhtml> (notes 03)
317. Camer.be – Mobile money as coercion tool. <https://www.camer.be/92950/11:1/mobile-money-au-cameroun-quand-le-paiement-digital-devient-une-arme-de-sequestration-cameroon.html> (notes 03, 04)
318. Caribou Digital – "The hustle is real". <https://medium.com/caribou-digital/platform-livelihoods-of-young-people-in-africa-the-hustle-is-real-c566b3b3a7f9> (notes 03)
319. CGAP – Financial services for platform workers. <https://cgap.org/node/5951> (notes 03)
320. IFC – Lynk case — 202008 d2e lynk. <https://www.ifc.org/content/dam/ifc/doc/mgrt-pub/202008-d2e-lynk.pdf> (notes 03)
321. Jiji – Safety tips — safety tips. <https://jiji.ng/safety-tips.html> (notes 03)
322. Jiji – Account security FAQ — account security. <https://jiji.ng/faq/account-security> (notes 03)
323. Fairwork – Kenya 2021 report. <https://www.bmz-digital.global/wp-content/uploads/2022/06/Fairwork-Kenya-2021-Report.pdf> (notes 03)
324. Fairwork – Kenya 2022 report. <https://fair.work/wp-content/uploads/sites/17/2023/02/230202_fairwork_kenya-report-2022_RZ_small.pdf> (notes 03)
325. Fairwork – Nigeria 2022 ratings. <https://www.bmz-digital.global/wp-content/uploads/2023/02/Nigeria-Rating-2022.pdf> (notes 03)
326. Fairwork – Nigeria 2023 ratings. <https://fair.work/wp-content/uploads/sites/17/2023/07/Fairwork-Nigeria-Ratings-2023-report-red-1.pdf> (notes 03)
327. WEF – Uber will start deactivating riders with low ratings. <https://weforum.org/stories/2019/05/uber-will-start-deactivating-riders-with-low-ratings> (notes 03)
328. Luca & Zervas, HBS working paper 14-006. <https://econpapers.repec.org/RePEc:hbs:wpaper:14-006> (notes 04)
329. BU Bostonia summary — yelp reviews can you trust them. <https://bu.edu/bostonia/2013/yelp-reviews-can-you-trust-them> (notes 04)
330. NBER w18340. <https://nber.org/papers/w18340> (notes 04)
331. Yale Insights — can online reviews be trusted. <https://insights.som.yale.edu/insights/can-online-reviews-be-trusted> (notes 04)
332. SIGecom Exchanges summary (He et al. 2021). <https://www.sigecom.org/exchanges/volume_19/2/HE.pdf> (notes 04)
333. SSRN — abstract=3664992. <https://papers.ssrn.com/abstract=3664992> (notes 04)
334. INFORMS press release — Study Examines the Impact of Fake Online Reviews on Sales2. <https://www.informs.org/News-Room/INFORMS-Releases/News-Releases/Study-Examines-the-Impact-of-Fake-Online-Reviews-on-Sales2> (notes 04)
335. FTC press release — federal trade commission announces final rule banning fake reviews testimonials. <https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials> (notes 04)
336. Hogan Lovells — ftc publishes final rule banning fake consumer reviews and testimonials. <https://www.hoganlovells.com/en/publications/ftc-publishes-final-rule-banning-fake-consumer-reviews-and-testimonials> (notes 04)
337. Davis Wright Tremaine — ftc finalizes rule banning fake consumer reviews. <https://dwt.com/insights/2024/08/ftc-finalizes-rule-banning-fake-consumer-reviews> (notes 04)
338. CMA208 guidance — CMA208 Fake reviews guidance. <https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf> (notes 04)
339. Travers Smith — preventing fake reviews what are reasonable and proportionate steps. <https://www.traverssmith.com/knowledge/knowledge-container/preventing-fake-reviews-what-are-reasonable-and-proportionate-steps/> (notes 04)
340. Which? — fake reviews and sneaky fees banned under new law campaigned for by which aLzVp4g0S76D. <https://www.which.co.uk/news/article/fake-reviews-and-sneaky-fees-banned-under-new-law-campaigned-for-by-which-aLzVp4g0S76D> (notes 04)
341. RPC — cma publishes updated principles for social media platforms on reviews and endorsements. <https://www.rpclegal.com/snapshots/advertising-and-marketing/autumn-2025/cma-publishes-updated-principles-for-social-media-platforms-on-reviews-and-endorsements/> (notes 04)
342. Mondaq — the omnibus directive consumer reviews. <https://www.mondaq.com/dodd-frank-consumer-protection-act/1189542/the-omnibus-directive-consumer-reviews> (notes 04)
343. Herbert Smith Freehills — the omnibus directive a new deal for eu consumers part 2 the objectives and provisions of the omnibus directiv. <https://www.hsfkramer.com/en_US/notes/tmt/2020-06/the-omnibus-directive-a-new-deal-for-eu-consumers-part-2-the-objectives-and-provisions-of-the-omnibus-directive-in-focus> (notes 04)
344. Make Influence — fake and manipulated reviews what the eu omnibus directive bans. <https://www.makeinfluence.com/en/academy/fake-and-manipulated-reviews-what-the-eu-omnibus-directive-bans> (notes 04)
345. Search Engine Roundtable (2025 report). <https://www.seroundtable.com/google-maps-spam-fighting-2025-41176.html> (notes 04)
346. Search Engine Roundtable (2024). <https://www.seroundtable.com/google-maps-spam-fighting-2024-39186.html> (notes 04)
347. Google blog — how google maps protects against fake content. <https://blog.google/products-and-platforms/products/maps/how-google-maps-protects-against-fake-content/> (notes 04)
348. Adapt Digital Solutions — google review policy 2026 compliance guide. <https://adaptdigitalsolutions.com/articles/google-review-policy-2026-compliance-guide/> (notes 04)
349. PPC Land — google tightens maps review policy staff names and quotas now banned. <https://ppc.land/google-tightens-maps-review-policy-staff-names-and-quotas-now-banned/> (notes 04)
350. About Amazon (Oct 2025) — amazons latest actions against fake review brokers 2024. <https://www.aboutamazon.com/news/policy-news-views/amazons-latest-actions-against-fake-review-brokers-2024> (notes 04)
351. About Amazon (2023 actions) — amazons latest actions against fake review brokers 2023. <https://aboutamazon.com/news/policy-news-views/amazons-latest-actions-against-fake-review-brokers-2023> (notes 04)
352. Amazon Trustworthy Shopping — global action against fake reviews. <https://trustworthyshopping.aboutamazon.com/global-action-against-fake-reviews> (notes 04)
353. Tripadvisor 2025 Transparency Report release. <https://tripadvisor.mediaroom.com/2025-03-18-Tripadvisors-2025-Transparency-Report-reveals-strong-review-submissions-and-improved-fraud-detection> (notes 04)
354. Trustpilot Trust Report 2025. <https://corporate.trustpilot.com/trust/trust-report-2025> (notes 04)
355. Trustpilot Trust page. <https://corporate.trustpilot.com/trust> (notes 04)
356. Stock Titan / Yelp release — yelp releases 2025 trust safety w5g77awiel7e. <https://www.stocktitan.net/news/YELP/yelp-releases-2025-trust-safety-w5g77awiel7e.html> (notes 04)
357. Business Wire — Yelp Releases 2025 Trust Safety Report. <https://www.businesswire.com/news/home/20260225039344/en/Yelp-Releases-2025-Trust-Safety-Report/> (notes 04)
358. USENIX NSDI'12 — technical sessions. <https://www.usenix.org/conference/nsdi12/technical-sessions/presentation/cao> (notes 04)
359. MIT reading copy — sybilrank. <https://css.csail.mit.edu/6.566/2018/readings/sybilrank.pdf> (notes 04)
360. FRAUDAR paper — fraudar kdd16. <https://bhooi.github.io/papers/fraudar_kdd16.pdf> (notes 04)
361. project page — fraudar. <https://bhooi.github.io/projects/fraudar/index.html> (notes 04)
362. VideoLectures — kdd2016 hooi bounding graph. <https://videolectures.net/kdd2016_hooi_bounding_graph> (notes 04)
363. TKDD extension — tkdd fraud detection with camo. <https://alexbeutel.com/papers/tkdd_fraud_detection_with_camo.pdf> (notes 04)
364. WWW 2012 paper — WWW 2012 group spam camera final. <https://www2.cs.uh.edu/%7Earjun/papers/WWW-2012-group-spam-camera-final.pdf> (notes 04)
365. Bing Liu's opinion spam page. <https://www.cs.uic.edu/~liub/FBS/fake-reviews.html> (notes 04)
366. Google Research listing — spotting fake reviewer groups in consumer reviews. <https://research.google/pubs/spotting-fake-reviewer-groups-in-consumer-reviews/> (notes 04)
367. CARE-GNN GitHub — CARE GNN. <https://github.com/YingtongDou/CARE-GNN> (notes 04)
368. GEM, arXiv 2002.12307. <https://arxiv.org/pdf/2002.12307> (notes 04)
369. Neptune ML docs — machine learning. <https://docs.aws.amazon.com/neptune/latest/userguide/machine-learning.html> (notes 04)
370. Biometric Update (2024) — cameroon telcos get ultimatum to id all sim holders in regions plagued by security crisis. <https://www.biometricupdate.com/202404/cameroon-telcos-get-ultimatum-to-id-all-sim-holders-in-regions-plagued-by-security-crisis> (notes 04)
371. Ecofin — 0110 32376 cameroon a decree to limit numbers of sim per subscriber and prohibit sale of sim cards on streets. <https://ecofinagency.com/law/0110-32376-cameroon-a-decree-to-limit-numbers-of-sim-per-subscriber-and-prohibit-sale-of-sim-cards-on-streets> (notes 04)
372. Digital Business Africa — identification des abonnes au cameroun les risques que comporte le decret du premier ministre. <https://www.digitalbusiness.africa/identification-des-abonnes-au-cameroun-les-risques-que-comporte-le-decret-du-premier-ministre/> (notes 04)
373. Osiris (ART statement) — Cameroun le regulateur telecoms. <https://osiris.sn/Cameroun-le-regulateur-telecoms.html> (notes 04)
374. Africanews — cameroon fines main local telecom companies. <https://www.africanews.com/2019/07/06/cameroon-fines-main-local-telecom-companies> (notes 04)
375. ITWeb — cameroonian telcos in hot water over sim card registration. <https://itweb.africa/article/cameroonian-telcos-in-hot-water-over-sim-card-registration/rxP3jqBmrBPMA2ye> (notes 04)
376. ITWeb — cameroon sim card shutdown piles on pressure for telcos. <https://itweb.africa/article/cameroon-sim-card-shutdown-piles-on-pressure-for-telcos/lLn14Mmj9RKqJ6Aa> (notes 04)
377. Ecofin — 1204 45389 cameroon cracks down on unregistered sim cards as terrorists net 524 100 in ransoms via mobile mone. <https://ecofinagency.com/telecom/1204-45389-cameroon-cracks-down-on-unregistered-sim-cards-as-terrorists-net-524-100-in-ransoms-via-mobile-money> (notes 04)
378. ITWeb — cameroon telcos push for relaxation of subscriber id rules. <https://itweb.africa/article/cameroon-telcos-push-for-relaxation-of-subscriber-id-rules/lwrKxv3KWaWvmg1o> (notes 04)
379. Digital Business Africa (prisons as cybercrime hubs). <https://www.digitalbusiness.africa/les-principaux-foyers-de-cybercriminels-avec-en-tete-les-prisons-de-kondengui-et-de-new-bell-font-perdre-122-milliards-de-f-cfa-a-leconomie-camerounaise-en-2021/> (notes 04)
380. Osiris — Cybercriminalite Sommation pour. <https://osiris.sn/Cybercriminalite-Sommation-pour.html> (notes 04)
381. Global Law Experts — cameroon fintech platforms navigating mobile money fraud or unauthorized transactions. <https://globallawexperts.com/cameroon-fintech-platforms-navigating-mobile-money-fraud-or-unauthorized-transactions/> (notes 04)
382. GSMA Intelligence — two thirds of africans yet to join the mobile revolution african mobile penetration set at 33 multiple sims dr. <https://www.gsmaintelligence.com/research/two-thirds-of-africans-yet-to-join-the-mobile-revolution-african-mobile-penetration-set-at-33-multiple-sims-driving-growth> (notes 04)
383. GSMA press release — more than half of sub saharan africa to be connected to mobile by 2025 finds new gsma study. <https://www.gsma.com/newsroom/press-release/more-than-half-of-sub-saharan-africa-to-be-connected-to-mobile-by-2025-finds-new-gsma-study> (notes 04)
384. Ecofin — 1603 45280 ssas mobile subscriptions projected to hit 1 1bn by 2028 driving financial inclusion report. <https://www.ecofinagency.com/telecom/1603-45280-ssas-mobile-subscriptions-projected-to-hit-1-1bn-by-2028-driving-financial-inclusion-report> (notes 04)
385. Biometric Update — cameroons new generation biometric id card system goes live feb 17. <https://www.biometricupdate.com/202502/cameroons-new-generation-biometric-id-card-system-goes-live-feb-17> (notes 04)
386. ID Tech Wire — cameroon launches advanced biometric national id system with 48 hour issuance promise. <https://idtechwire.com/cameroon-launches-advanced-biometric-national-id-system-with-48-hour-issuance-promise/> (notes 04)
387. WeAreTech — cameroon new national id paves way for digital identity system. <https://wearetech.africa/en/fils-uk/news/tech/cameroon-new-national-id-paves-way-for-digital-identity-system> (notes 04)
388. IT Edge News — cameroon rolls out biometric national id cards in landmark reform ahead of 2025 elections. <https://www.itedgenews.africa/cameroon-rolls-out-biometric-national-id-cards-in-landmark-reform-ahead-of-2025-elections/> (notes 04)
389. Biometric Update (June 2025). <https://www.biometricupdate.com/202506/cameroon-lawmakers-criticize-cost-complications-in-new-national-id-system> (notes 04)
390. Biometric Update (Aug 2025) — new biometric id card center opens for citizens in northern cameroon. <https://www.biometricupdate.com/202508/new-biometric-id-card-center-opens-for-citizens-in-northern-cameroon> (notes 04)
391. Smile ID Cameroon — cameroon. <https://smile.id/countries/cameroon> (notes 04)
392. TechCabal — mark straub smile identity ceo interview. <https://techcabal.com/2023/02/23/mark-straub-smile-identity-ceo-interview/> (notes 04)
393. Smile ID Bridgecard case study. <https://usesmileid.com/case-studies/bridge-card-success-story> (notes 04)
394. Youverify country coverage — country coverage. <https://youverify.co/product/kyc/country-coverage> (notes 04)
395. Dojah blog — best identity verification api africa 2026. <https://dojah.io/blog/best-identity-verification-api-africa-2026> (notes 04)
396. FATF, October 2026 — increased monitoring october 2026. <https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/increased-monitoring-october-2026.html> (notes 04)
397. FATF, February 2026 — increased monitoring february 2026. <https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/increased-monitoring-february-2026.html> (notes 04)
398. AWS Face Liveness — face liveness. <https://aws.amazon.com/rekognition/face-liveness> (notes 04)
399. AWS AI Service Card — overview. <https://docs.aws.amazon.com/ai/responsible-ai/rekognition-face-liveness/overview.html> (notes 04)
400. AWS – Amazon Rekognition pricing. <https://aws.amazon.com/rekognition/pricing/> (notes 04, 06)
401. Play Integrity verdicts — verdicts. <https://developer.android.com/google/play/integrity/verdicts> (notes 04)
402. AWS WAF ACFP docs — waf acfp. <https://docs.aws.amazon.com/waf/latest/developerguide/waf-acfp.html> (notes 04)
403. AWS Security Blog — prevent account creation fraud with aws waf fraud control account creation fraud prevention. <https://aws.amazon.com/blogs/security/prevent-account-creation-fraud-with-aws-waf-fraud-control-account-creation-fraud-prevention> (notes 04)
404. AWS best-practices guide — fraud prevention. <https://aws.github.io/aws-security-services-best-practices/guides/waf/fraud-prevention/docs/> (notes 04)
405. AWS Docs – Amazon Fraud Detector availability change. <https://docs.aws.amazon.com/frauddetector/latest/ug/frauddetector-availability-change.html> (notes 04, 06)
406. Orange Developer SIM Swap France. <https://developer.orange.com/apis/camara-sim-swap-france> (notes 04)
407. Orange CAMARA — api camara en. <https://payservices.orange.com/en/digital-identity/api-camara-en> (notes 04)
408. LEX Africa, Cameroon data protection law compliance (Oct 2025). <https://lexafrica.com/2025/10/cameroon-data-protection-law-compliance/> (notes 04, 07)
409. DLA Piper, Data Protection Laws of the World: Cameroon. <https://www.dlapiperdataprotection.com/index.html?c=CM&t=law> (notes 04, 07)
410. CIO Mag, Protection des données au Cameroun: la course contre la montre avant juin 2026. <https://cio-mag.com/protection-des-donnees-au-cameroun-la-course-contre-la-montre-avant-juin-2026/> (notes 04, 07)
411. Droit Médias Finance, La loi ... entre en vigueur ce 23 juin 2026. <https://droitmediasfinance.com/index.php/actualites/droit-tech-fintech/1297-cameroun-la-loi-sur-la-protection-des-donnees-a-caractere-personnel-entre-en-vigueur-ce-23-juin-2026> (notes 04, 07)
412. Booking.com reviews page — reviews. <https://www.booking.com/reviews.html?aid=313263> (notes 04)
413. Booking Holdings guest review standards. <https://h.priceline.com/content-moderation-policy/guest-reviews-standards.en-us.html> (notes 04)
414. MTN MoMo Developer. <https://momodeveloper.mtn.com/> (notes 04)
415. WeAreTech — paiements numeriques le cameroun face au defi de la securisation des plateformes. <https://www.wearetech.africa/fr/fils/actualites/finance/paiements-numeriques-le-cameroun-face-au-defi-de-la-securisation-des-plateformes> (notes 04)
416. EconPapers — RePEc:inm:ormksc:v:40:y:2021:i:6:p:1013 1029. <https://econpapers.repec.org/RePEc:inm:ormksc:v:40:y:2021:i:6:p:1013-1029> (notes 04)
417. Meilleurtaux (2019) — fraudes bancaires origine perte 6 milliards fcfa cameroun. <https://banque.meilleurtaux.com/ouvrir-un-compte-bancaire/actualites/2020-octobre/fraudes-bancaires-origine-perte-6-milliards-fcfa-cameroun.html> (notes 04)
418. CIO Mag (2021). <https://cio-mag.com/?p=45351> (notes 04)
419. Digital Business Africa (about 7 billion, Sept 2021). <https://www.digitalbusiness.africa/cameroun-pres-de-07-milliards-de-fcfa-perdus-du-fait-de-la-cybercriminalite-antic/> (notes 04)
420. EcoMatin (12.2 billion, 2021). <https://ecomatin.net/la-cybercriminalite-fait-perdre-122-milliards-s-au-cameroun-en-2021> (notes 04)
421. ITWeb — cameroon loses us108 m to cybercrime in 2019. <https://itweb.africa/article/cameroon-loses-us108-m-to-cybercrime-in-2019/mQwkoM6Pkmjv3r9A> (notes 04)
422. EcoMatin — seulement 6 victimes de la cybercriminalite sur 100 portent plainte. <https://ecomatin.net/seulement-6-victimes-de-la-cybercriminalite-sur-100-portent-plainte> (notes 04)
423. Camer.be — cameroun la lutte contre la fraude comme gage de securite des transactions mobile momo cameroon. <https://www.camer.be/90795/11:1/cameroun-la-lutte-contre-la-fraude-comme-gage-de-securite-des-transactions-mobile-momo-cameroon.html> (notes 04)
424. Osiris — suite aux plaintes d arnaques l operateur orange cameroun renforce la securite. <https://www.osiris.sn/suite-aux-plaintes-d-arnaques-l-operateur-orange-cameroun-renforce-la-securite.html> (notes 04)
425. Digital Business Africa — arnaque 2 0 des brouteurs beninois vendeurs de porte monnaie magiques tissent leur nid avec succes au cameroun. <https://www.digitalbusiness.africa/arnaque-2-0-des-brouteurs-beninois-vendeurs-de-porte-monnaie-magiques-tissent-leur-nid-avec-succes-au-cameroun/> (notes 04)
426. LSE Research Online. <https://researchonline.lse.ac.uk/id/eprint/127176> (notes 04)
427. ISS report — digital deception online job scams amid cybercrime vulnerability in cameroon and chad. <https://issafrica.org/research/books-and-other-publications/digital-deception-online-job-scams-amid-cybercrime-vulnerability-in-cameroon-and-chad> (notes 04)
428. ISS Today — online fraud is becoming a gateway to human trafficking in cameroon. <https://issafrica.org/iss-today/online-fraud-is-becoming-a-gateway-to-human-trafficking-in-cameroon> (notes 04)
429. Camer.be — cameroun cybercriminalite sur facebook voici les faux comptes de personnalites qui servent a arnaquer cameroon. <https://www.camer.be/amp/56602/24:21/cameroun-cybercriminalite-sur-facebook-voici-les-faux-comptes-de-personnalites-qui-servent-a-arnaquer-cameroon.html> (notes 04)
430. Le360 Afrique — cameroun commerce en ligne et arnaque font bon menage LAVEL6WQJ5HFBI2EGGPMUMAB3A. <https://afrique.le360.ma/economie/cameroun-commerce-en-ligne-et-arnaque-font-bon-menage_LAVEL6WQJ5HFBI2EGGPMUMAB3A/> (notes 04)
431. GSMA SOTIR 2025 PDF — The State of the Industry Report on Mobile Money 2025. <https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2025/04/The-State-of-the-Industry-Report-on-Mobile-Money-2025.pdf> (notes 04)
432. Commsrisk — mobile money providers have low opinion of effectiveness of law enforcement. <https://commsrisk.com/mobile-money-providers-have-low-opinion-of-effectiveness-of-law-enforcement/> (notes 04)
433. TechMoran — mobile money transactions hit 2 trillion in 2025 as usage surges gsma report. <https://techmoran.com/2026/03/26/mobile-money-transactions-hit-2-trillion-in-2025-as-usage-surges-gsma-report/> (notes 04)
434. Thales — access engagement where next mobile money. <https://www.thalesgroup.com/en/news-centre/insights/enterprise/access-engagement-where-next-mobile-money> (notes 04)
435. The Hacker News — google launches new maps feature to. <https://thehackernews.com/2025/11/google-launches-new-maps-feature-to.html> (notes 04)
436. Search Engine Roundtable — google business profile report negative review extortion scams 40250. <https://www.seroundtable.com/google-business-profile-report-negative-review-extortion-scams-40250.html> (notes 04)
437. INFORMS press — New Research Highlights Motivations of Reviewers. <https://www.informs.org/News-Room/INFORMS-Releases/News-Releases/New-Research-Highlights-Motivations-of-Reviewers> (notes 04)
438. NBER w25857. <https://www.nber.org/papers/w25857.pdf> (notes 04)
439. Classmethod (AutoGluon on SageMaker test, Japanese). <https://dev.classmethod.jp/articles/amazon-fraud-detector-autogluon-sagemaker-ai-notebooks/> (notes 04)
440. PyOD on PyPI. <https://pypi.python.org/pypi/pyod> (notes 04)
441. Africa's Talking Help Center – Which countries are AT products in. <https://help.africastalking.com/en/articles/2727792-which-countries-are-africa-s-talking-products-in> (notes 05)
442. HelloDuty – Countries supported by Africa's Talking USSD API. <https://helloduty.com/blogs/countries-supported-by-africas-talking-ussd-api> (notes 05, 06)
443. StarHash docs – Africa's Talking provider. <https://docs.page/nexlabstudio/starhash-docs/providers/africas-talking> (notes 05)
444. Ushahidi docs – Africa's Talking USSD. <https://docs.ushahidi.com/platform-api-ussd-service/supported-ussd-providers/africas-talking-ussd> (notes 05)
445. ART Cameroon – Orange Cameroun interconnection catalogue 2020 (fournisseurs SVA). <https://www.art.cm/sites/default/files/documents/catalogue%20da%20interconnexion%202020%20-%20fournisseurs%20sva-converted-compressed.pdf> (notes 05)
446. HelloDuty – Cameroon country page (updated 15 June 2026). <https://helloduty.com/country/cameroon> (notes 05)
447. Camer.be – Conditions d'accès aux codes USSD (22 July 2017). <https://www.camer.be/actualites/societe/cameroon-cameroun-conditions-dacces-aux-codes-ussd-letat-siffle-la-fin-de-la-recreation-dans-le-secteur-des-telecommunications.html> (notes 05)
448. Camer.be – Affaire Express Union: MTN et Orange défient l'État. <https://www.camer.be/actualites/societe/cameroun-affaire-express-union-mtn-et-orange-defient-letat-et-ses-institutions-depuis-trois-ans-cameroon.html> (notes 05)
449. ITWeb Africa – Cameroon looks to level financial services playing field (Apr 2020). <https://itweb.africa/article/cameroon-looks-to-level-financial-services-playing-field/KWEBb7yZBGEMmRjO> (notes 05)
450. Osiris.sn – Le Cameroun premier africain à mettre sur pied un code USSD national. <https://www.osiris.sn/le-cameroun-premier-africain-a-mettre-sur-pied-un-code-ussd-national-a-travers.html> (notes 05, 06)
451. ITWeb Africa – Cameroon's start-ups urged to leverage national payment gateway. <https://itweb.africa/article/cameroons-start-ups-urged-to-leverage-national-payment-gateway/GxwQD71ZgA2MlPVo> (notes 05)
452. LMT Group. <https://www.lmtgroup.com/> (notes 05)
453. Mobile Ecosystem Forum – Nexah member profile. <https://mobileecosystemforum.com/members/nexah/> (notes 05)
454. LAfricaMobile. <https://lafricamobile.com/en/> (notes 05)
455. Orange Developer – Le SMS (PDF guide). <https://developer.orange.com/wp-content/uploads/Orange-Developer-Le-SMS-nouveau-commercial.pdf> (notes 05)
456. Orange Developer – Orange APIs for Middle East & Africa. <https://developer.orange.com/resources/orange-apis-for-the-middle-east-africa/> (notes 05)
457. Twilio – Cameroon SMS guidelines. <https://www.twilio.com/en-us/guidelines/cm/sms> (notes 05)
458. MTN Cameroon – Data bundles — welcome to the mtn internet space. <https://mtn.cm/offers/welcome-to-the-mtn-internet-space/> (notes 05)
459. MTN Cameroon – WhatsApp/TikTok bundles. <https://mtn.cm/offers/whatsapp-tiktok-bundles/> (notes 05)
460. MTN Cameroon – Home (ZIGI WhatsApp assistant, MoMo Pay). <https://mtn.cm/> (notes 05)
461. AWS End User Messaging – Supported countries and regions for SMS. <https://docs.aws.amazon.com/sms-voice/latest/userguide/phone-numbers-sms-by-country.html> (notes 05, 06)
462. AWS End User Messaging – Cameroon registration page. <https://docs.aws.amazon.com/end-user-messaging/latest/userguide/nx-country-reg-cm.md> (notes 05, 06)
463. AWS End User Messaging – Sender IDs. <https://docs.aws.amazon.com/sms-voice/latest/userguide/sender-id.html> (notes 05, 06)
464. AWS What's New – Self-service sender ID registration in 19 new countries (Jan 2025). <https://aws.amazon.com/about-aws/whats-new/2025/01/aws-end-user-messaging-self-service-id-registration> (notes 05, 06)
465. Twilio – Cameroon SMS pricing. <https://www.twilio.com/en-us/sms/pricing/cm> (notes 05)
466. D7 Networks – Cameroon SMS — cameroon. <https://d7networks.com/sms/cameroon/> (notes 05)
467. Sent.dm – Cameroon SMS pricing. <https://sent.dm/resources/cameroon-sms-pricing> (notes 05)
468. Sent.dm – Cameroon SMS compliance guide. <https://sent.dm/en/resources/sms-compliance/cameroon-sms-guide> (notes 05)
469. Orange Developer – SMS Cameroon API (deprecation notice). <https://developer.orange.com/apis/sms-cm> (notes 05)
470. GitHub gist – Orange SMS API Cameroon sample. <https://gist.github.com/SalathielGenese/c13df9f7c1d4b4f3d6ffc644f7950ac5> (notes 05)
471. Meta – Pricing on the WhatsApp Business Platform (current docs). <https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing> (notes 05)
472. Meta – WhatsApp pricing (legacy URL). <https://developers.facebook.com/docs/whatsapp/pricing> (notes 05)
473. Whautomate – WhatsApp Business API pricing. <https://whautomate.com/whatsapp-business-api-pricing> (notes 05)
474. Sent.dm – WhatsApp Business Platform pricing guide. <https://docs.sent.dm/docs/guides/whatsapp-pricing> (notes 05)
475. edna – WhatsApp Business API pricing. <https://edna.io/?p=16752> (notes 05)
476. Salesforce – Message Credits WhatsApp Rate Card, Nov 2026. <https://www.salesforce.com/en-us/wp-content/uploads/sites/4/Salesforce-Message-Credits-WhatsApp-Rate-Card-per-message-Nov-2026.pdf> (notes 05)
477. Salesforce – WhatsApp rate card Jul 2025. <https://www.salesforce.com/en-us/wp-content/uploads/sites/4/WhatsApp_Business-Messaging-WhatsApp-Rate_Card_Jul_1_2025-to-Jul-31-2025.pdf> (notes 05)
478. Meta – WhatsApp Flows docs — whatsapp. <https://developers.facebook.com/docs/whatsapp/flows> (notes 05)
479. Meta – WhatsApp Cloud API media reference. <https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media> (notes 05)
480. Amazon Connect – Availability by Region. <https://docs.aws.amazon.com/connect/latest/adminguide/regions.html> (notes 05, 06)
481. Hilltop Voices – Cameroon's social media boom (July 2026). <https://www.hilltopvoices.com/2026/07/cameroons-social-media-boom-reshapes.html> (notes 05)
482. Statista – WhatsApp usage by country (DataReportal chart). <https://www.statista.com/statistics/291540/mobile-internet-user-whatsapp/> (notes 05)
483. Amazon Connect – Pricing — pricing. <https://aws.amazon.com/connect/pricing/> (notes 05)
484. Amazon Transcribe – Supported languages. <https://docs.aws.amazon.com/transcribe/latest/dg/supported-languages.html> (notes 05)
485. Amazon Polly – Supported languages. <https://docs.aws.amazon.com/polly/latest/dg/supported-languages.html> (notes 05)
486. Amazon Lex V2 – Supported languages. <https://docs.aws.amazon.com/lexv2/latest/dg/how-languages.html> (notes 05, 06)
487. Google Cloud Speech-to-Text – Supported languages. <https://docs.cloud.google.com/speech-to-text/docs/speech-to-text-supported-languages> (notes 05)
488. OpenAI Whisper – tokenizer.py language list. <https://raw.githubusercontent.com/openai/whisper/main/whisper/tokenizer.py> (notes 05)
489. OpenAI Whisper – GitHub README. <https://github.com/openai/whisper> (notes 05)
490. Meta AI – Massively Multilingual Speech (MMS). <https://ai.meta.com/blog/multilingual-model-speech-recognition/> (notes 05)
491. Lacuna Fund – Datasets — datasets. <https://lacunafund.org/datasets/> (notes 05)
492. Masakhane. <https://www.masakhane.io/> (notes 05)
493. Wikipedia – Cameroonian Pidgin English. <https://en.wikipedia.org/wiki/Cameroonian_Pidgin_English> (notes 05, 09)
494. Wikipedia – CGNet Swara — CGNet Swara. <https://en.wikipedia.org/wiki/CGNet_Swara> (notes 05)
495. Gram Vaani. <https://gramvaani.org/> (notes 05)
496. Jahanzeb Sherwani – publications (CMU). <https://www.cs.cmu.edu/~jsherwan/> (notes 05)
497. StatCounter – Mobile OS market share Cameroon. <https://gs.statcounter.com/os-market-share/mobile/cameroon> (notes 05)
498. Camer.be – Connectivité mobile: le Gabon devance le Cameroun (GSMA data). <https://www.camer.be/62222/12:1/cameroon-connectivite-mobile-le-gabon-devance-le-cameroun-en-zone-cemac.html> (notes 05)
499. NapoleonCat – Messenger users in Cameroon. <https://napoleoncat.com/stats/messenger-users-in-cameroon/2025/03> (notes 05)
500. Android Developers – Android (Go edition). <https://developer.android.com/guide/topics/androidgo> (notes 05)
501. web.dev – What are Progressive Web Apps. <https://web.dev/articles/what-are-pwas> (notes 05)
502. KaiOS Technologies. <https://www.kaiostech.com/> (notes 05)
503. GSMA – State of Mobile Internet Connectivity 2025 (PDF). <https://www.gsma.com/somic/wp-content/uploads/2025/09/The-State-of-Mobile-Internet-Connectivity-2025-Trends-in-Mobile-Internet-Connectivity.pdf> (notes 05)
504. Microsoft Research – Designing Mobile Interfaces for Novice and Low-Literacy Users (TOCHI 2011). <https://www.microsoft.com/en-us/research/publication/designing-mobile-interfaces-for-novice-and-low-literacy-users/> (notes 05)
505. Microsoft Research – A Comparison of Mobile Money-Transfer UIs for Non-Literate and Semi-Literate Users (CHI 2009). <https://www.microsoft.com/en-us/research/publication/a-comparison-of-mobile-money-transfer-uis-for-non-literate-and-semi-literate-users/> (notes 05)
506. Wikipedia – Orange Money — Orange Money. <https://en.wikipedia.org/wiki/Orange_Money> (notes 05)
507. Cable.co.uk / bestbroadbanddeals – Worldwide mobile data pricing (2023). <https://bestbroadbanddeals.co.uk/mobiles/worldwide-data-pricing/> (notes 05)
508. Orange Cameroun – Internet bundles. <https://www.orange.cm/fr/internet.html> (notes 05)
509. Orange Cameroun – Home. <https://www.orange.cm/fr/> (notes 05)
510. Wikipedia – Free Basics — Free Basics. <https://en.wikipedia.org/wiki/Free_Basics> (notes 05)
511. Wikipedia – List of countries by minimum wage. <https://en.wikipedia.org/wiki/List_of_countries_by_minimum_wage> (notes 05)
512. Telecom Review Africa – MTN GlobalConnect and Camtel accelerate Cameroon's fibre network. <https://mail.telecomreviewafrica.com/articles/telecom-operators/2407-mtn-globalconnect-and-camtel-accelerate-cameroon-s-fibre-network-and-digital-journey> (notes 06)
513. Camtel Carrier – IPLC connectivity (cable landing points). <https://carrier.camtel.cm/services/connectivity/iplc> (notes 06)
514. ITWeb Africa – Camtel contracts MTN GlobalConnect to commercialise wholesale internet. <https://itweb.africa/article/camtel-contracts-mtn-globalconnect-to-commercialise-wholesale-internet-abroad/KA3Ww7dDAdA7rydZ> (notes 06)
515. Communications Africa – Cameroon signs MoU for Medusa Africa cable. <https://communicationsafrica.com/internet/cameroon-signs-mou-for-medusa-africa-cable> (notes 06)
516. Osiris – Le Cameroun envisage une connexion au câble Medusa. <https://osiris.sn/le-cameroun-envisage-une-connexion-au-cable-medusa-africa.html> (notes 06)
517. ITWeb Africa – WE-Africa-NA promises stronger links. <https://itweb.africa/article/we-africa-na-promises-stronger-links-between-africa-europe-and-the-us/RgeVDvPY63Q7KJN3> (notes 06)
518. Connecting Africa – Angola Cables, Camtel partner. <https://connectingafrica.com/connectivity/angola-cables-camtel-partner-for-cross-border-connectivity> (notes 06)
519. Economize – AWS latency eu-west-3 vs af-south-1. <https://www.economize.cloud/resources/aws/latency/eu-west-3-vs-af-south-1/> (notes 06)
520. Economize – AWS latency eu-south-2 vs af-south-1. <https://www.economize.cloud/resources/aws/latency/eu-south-2-vs-af-south-1/> (notes 06)
521. Kentik – Digging into cloud latency. <https://kentik.com/blog/clm-chowder-digging-into-cloud-latency-azure-google-cloud-oci> (notes 06)
522. Babasanmi & Chavula – Measuring Cloud Latency in Africa (IEEE CloudNet 2022). <https://pubs.cs.uct.ac.za/1704/1/Measuring_Cloud_Latency_in_Africa.pdf> (notes 06)
523. AWS – Local Zones locations — locations. <https://aws.amazon.com/about-aws/global-infrastructure/localzones/locations/> (notes 06)
524. TechNext – AWS launches Local Zone in Lagos (Jan 2023). <https://technext.ng/2023/01/27/aws-launch-local-zones-location-lagos/> (notes 06)
525. Connecting Africa – Lagos launches first AWS Local Zone in Africa. <https://connectingafrica.com/cloud-networking/lagos-launches-first-aws-local-zone-in-africa> (notes 06)
526. DatacenterDynamics – AWS Local Zone edge locations in Lagos, Lima, Querétaro. <https://datacenterdynamics.com/en/news/aws-launches-local-zone-edge-locations-in-lagos-lima-and-quer%C3%A9taro> (notes 06)
527. AWS – CloudFront key features (edge locations list). <https://aws.amazon.com/cloudfront/features/?m=1> (notes 06)
528. AWS – CloudFront details — details. <https://aws.amazon.com/cloudfront/details> (notes 06)
529. Nairametrics – AWS launches first CloudFront edge location in Nigeria (2023). <https://nairametrics.com/2023/06/16/aws-launches-first-cloudfront-edge-location-in-nigeria> (notes 06)
530. BusinessTech – CloudFront edge locations coming to Joburg and Cape Town. <https://businesstech.co.za/news/?p=251801> (notes 06)
531. AWS General Reference – AWS End User Messaging endpoints and quotas. <https://docs.aws.amazon.com/general/latest/gr/end-user-messaging.html> (notes 06)
532. AWS Docs – Improving startup performance with Lambda SnapStart. <https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html> (notes 06)
533. AWS What's New – Lambda SnapStart for Python and .NET (Nov 2024). <https://aws.amazon.com/about-aws/whats-new/2024/11/aws-lambda-snapstart-python-net-functions> (notes 06)
534. AWS What's New – SnapStart Python/.NET in 23 additional regions (Jun 2025). <https://aws.amazon.com/about-aws/whats-new/2025/06/aws-lambda-snapstart-python-net-functions-23-regions> (notes 06)
535. AWS Docs – Lambda SnapStart runtime hooks for Python. <https://docs.aws.amazon.com/lambda/latest/dg/snapstart-runtime-hooks-python.html> (notes 06)
536. AWS – Lambda pricing — pricing. <https://aws.amazon.com/lambda/pricing/> (notes 06)
537. AWS What's New – Aurora Serverless v2 supports scaling to zero (Nov 2024). <https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-aurora-serverless-v2-scaling-zero-capacity> (notes 06)
538. AWS Docs – Aurora Serverless v2 scaling to zero / auto-pause. <https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html> (notes 06)
539. AWS Database Blog – Introducing scaling to 0 capacity with Aurora Serverless v2. <https://aws.amazon.com/blogs/database/introducing-scaling-to-0-capacity-with-amazon-aurora-serverless-v2> (notes 06)
540. DEV Community – Scaling to zero with Aurora Serverless v2. <https://dev.to/sudo_anuj/scaling-to-zero-with-amazon-aurora-serverless-v2-553n> (notes 06)
541. AWS Database Blog – DynamoDB lowers pricing for on-demand throughput and global tables. <https://aws.amazon.com/blogs/database/new-amazon-dynamodb-lowers-pricing-for-on-demand-throughput-and-global-tables/> (notes 06)
542. Powertools for AWS Lambda (Python) – Idempotency. <https://docs.powertools.aws.dev/lambda/python/stage/utilities/idempotency/> (notes 06)
543. AWS Compute Blog – Handling Lambda idempotency with Powertools. <https://aws.amazon.com/blogs/compute/handling-lambda-functions-idempotency-with-aws-lambda-powertools> (notes 06)
544. Michael Walmsley – Powertools idempotency deeper dive. <https://walmsles.medium.com/aws-lambda-powertools-idempotency-a-deeper-dive-40de7efe15b0> (notes 06)
545. AWS Docs – Amazon EventBridge Pipes. <https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html> (notes 06)
546. GitHub – awslabs/aws-lambda-web-adapter. <https://github.com/awslabs/aws-lambda-web-adapter> (notes 06)
547. AWS Builder Center – Deploy FastAPI to AWS in 60 seconds. <https://builder.aws.com/content/3Ee4zoARhywavup2worwNXvD5rK/deploy-fastapi-to-aws-in-60-seconds> (notes 06)
548. DEV Community (AWS) – Deploy FastAPI to AWS in 60 seconds. <https://dev.to/aws/deploy-fastapi-to-aws-in-60-seconds-519o> (notes 06)
549. PyPI – Mangum — project. <https://pypi.org/project/mangum/0.12.1> (notes 06)
550. AWS Builder Center – Deploy FastAPI to Lambda in minutes. <https://builder.aws.com/content/3KHzA4aOtupX6ZZg04EwGFUpRX4/deploy-fast-api-to-aws-lambda-in-minutes> (notes 06)
551. AWS Docs – Managing spatial data with PostGIS (Aurora PostgreSQL). <https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Appendix.PostgreSQL.CommonDBATasks.PostGIS.html> (notes 06)
552. Uber Engineering – H3: Uber's Hexagonal Hierarchical Spatial Index. <https://www.uber.com/en/blog/h3/> (notes 06)
553. H3 docs – Tables of cell statistics across resolutions. <https://h3geo.org/docs/core-library/restable/> (notes 06)
554. AWS Docs – Amazon Location data providers. <https://docs.aws.amazon.com/location/previous/developerguide/what-is-data-provider.md> (notes 06)
555. AWS Docs – GrabMaps in Amazon Location. <https://docs.aws.amazon.com/location/previous/developerguide/grab.html> (notes 06)
556. AWS What's New – Amazon Location adds GrabMaps in Southeast Asia. <https://aws.amazon.com/about-aws/whats-new/2023/01/amazon-location-service-grabmaps-southeast-asia> (notes 06)
557. AWS What's New – Open Data Maps for Amazon Location. <https://aws.amazon.com/about-aws/whats-new/2023/03/amazon-location-service-open-data-maps> (notes 06)
558. AWS Docs – HERE in Amazon Location. <https://docs.aws.amazon.com/location/previous/developerguide/HERE.md> (notes 06)
559. UN Maps – CityMapper Externship, Cameroon. <https://maps.un.org/news/citymapper-externship-un-maps-community-ambassador-and-chapter-initiative-cameroon> (notes 06)
560. OSM diary – CityMapper Externship 2026 UN Mappers in Cameroon. <https://api.openstreetmap.org/user/ENGELBERT%20MODO/diary/408919> (notes 06)
561. OSM Wiki – WikiProject Cameroon. <https://wiki.openstreetmap.org/wiki/Cameroon> (notes 06)
562. OSM diary – The State of OpenStreetMap in Africa 2023. <https://www.openstreetmap.org/user/Kateregga1/diary/403280> (notes 06)
563. Thumbtack Engineering – Our transition to ML in search ranking. <https://medium.com/thumbtack-engineering/our-transition-to-machine-learning-in-search-ranking-to-match-customers-and-professionals-68fb29e39899> (notes 06)
564. Thumbtack Engineering – Evolution of search ranking at Thumbtack. <https://medium.com/thumbtack-engineering/evolution-of-search-ranking-at-thumbtack-f7a69fd0da13> (notes 06)
565. Thumbtack Engineering – Qualitative evaluation of search ranking algorithms. <https://medium.com/thumbtack-engineering/qualitative-evaluation-of-search-ranking-algorithms-1f492b8418c4> (notes 06)
566. Demsyn-Jones (Thumbtack) – Position bias paper, arXiv 2206.11720. <https://arxiv.org/pdf/2206.11720v1> (notes 06)
567. Thumbtack Engineering – Improving efficiency of Thumbtack's online marketplace. <https://medium.com/thumbtack-engineering/improving-efficiency-of-thumbtacks-online-marketplace-35094d08d4cf> (notes 06)
568. Software Engineering Daily – Marketplace Matching with Xing Chen. <https://softwareengineeringdaily.com/2017/11/27/marketplace-matching-with-xing-chen/> (notes 06)
569. Thumbtack careers – Applied Scientist, Search & Matching. <https://careers.thumbtack.com/jobs/7169477> (notes 06)
570. DoorDash Engineering – Next-generation dispatch optimization (Holly Jin). <https://careers.doordash.com/?p=1350> (notes 06)
571. DoorDash Engineering – ML and optimization for dispatch (DeepRed). <https://careers.doordash.com/?p=5342> (notes 06)
572. DoorDash Engineering – Experimentation on real-time assignment. <https://careersatdoordash.com/?p=3183> (notes 06)
573. DoorDash Engineering – Causal ML and joint optimization (May 2026). <https://careersatdoordash.com/?p=16159> (notes 06)
574. Haldar et al. (Airbnb) – Improving Deep Learning for Airbnb Search, arXiv 2002.05515. <https://arxiv.org/pdf/2002.05515.pdf> (notes 06)
575. Airbnb Engineering – Learning To Rank Diversely. <https://medium.com/airbnb-engineering/learning-to-rank-diversely-add6b1929621> (notes 06)
576. AirDNA – Airbnb new listing boost. <https://www.airdna.co/blog/airbnb-new-listing-boost> (notes 06)
577. PriceLabs – Airbnb launch / new listing boost. <https://hello.pricelabs.co/blog/airbnb-launch/> (notes 06)
578. Singh & Joachims – Fairness of Exposure in Rankings, arXiv 1802.07281. <https://arxiv.org/abs/1802.07281> (notes 06)
579. AWS Prescriptive Guidance – Neptune Analytics cost optimization pillar. <https://docs.aws.amazon.com/prescriptive-guidance/latest/neptune-analytics-well-architected-framework/cost-optimization-pillar.html> (notes 06)
580. AWS – Amazon Neptune features. <https://aws.amazon.com/neptune/features/> (notes 06)
581. AWS – Amazon Neptune pricing. <https://aws.amazon.com/neptune//pricing> (notes 06)
582. AWS News Blog – Introducing Amazon Neptune Serverless. <https://aws.amazon.com/blogs/aws/introducing-amazon-neptune-serverless-a-fully-managed-graph-database-that-adjusts-capacity-for-your-workloads> (notes 06)
583. AWS Messaging Blog – Send WhatsApp Business messages with AWS End User Messaging Social. <https://aws.amazon.com/blogs/messaging-and-targeting/send-whatsapp-business-messages-with-aws-end-user-messaging-social/> (notes 06)
584. AWS What's New – Bring your conversations to WhatsApp with EUM Social (Oct 2024). <https://aws.amazon.com/about-aws/whats-new/2024/10/conversations-whatsapp-aws-end-user-messaging-social> (notes 06)
585. AWS Docs – Sending messages through WhatsApp with EUM Social. <https://docs.aws.amazon.com/social-messaging/latest/userguide/send-message.html> (notes 06)
586. AWS Docs – Amazon Connect WhatsApp integration. <https://docs.aws.amazon.com/connect/latest/adminguide/whatsapp-integration.html> (notes 06)
587. Osiris – Avec Campost le Cameroun lance (USSD codes). <https://www.osiris.sn/Avec-Campost-le-Cameroun-lance.html> (notes 06)
588. TechAfrica News – Cameroon regulator, MTN, Orange on network quality (Sept 2026). <https://techafricanews.com/2026/09/15/cameroon-regulator-mtn-orange-network-quality-coverage/> (notes 06)
589. AWS – Amazon Pinpoint (end of support notice). <https://aws.amazon.com/pinpoint/> (notes 06)
590. AWS Docs – Pinpoint: Use the EUM SMS and Voice API v2. <https://docs.aws.amazon.com/pinpoint/latest/developerguide/sms-voice-v2.html> (notes 06)
591. AWS Well-Architected – Reducing the Scope of Impact with Cell-Based Architecture. <https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/reducing-scope-of-impact-with-cell-based-architecture.html> (notes 06)
592. Hidekazu Konishi – Cell-based architecture and shuffle sharding on AWS. <https://hidekazu-konishi.com/entry/cell_based_architecture_and_shuffle_sharding_on_aws.html> (notes 06)
593. AWS Docs – DetectModerationLabels API. <https://docs.aws.amazon.com/rekognition/latest/APIReference/API_DetectModerationLabels.html> (notes 06)
594. AWS What's New – Rekognition reduces Image API pricing by up to 38% (2021). <https://aws.amazon.com/about-aws/whats-new/2021/11/amazon-rekognition-pricing-apis> (notes 06)
595. AWS ML Blog – Rekognition image vs video API for video moderation. <https://aws.amazon.com/blogs/machine-learning/how-to-decide-between-amazon-rekognition-image-and-video-api-for-video-moderation> (notes 06)
596. AWS Well-Architected – Cell design. <https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/cell-design.html> (notes 06)
597. AWS Well-Architected – REL10-BP03 Use bulkhead architectures. <https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_fault_isolation_use_bulkhead.md> (notes 06)
598. AWS Well-Architected – SaaS Lens. <https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/saas-lens.html> (notes 06)
599. AWS What's New – Free Tier $200 credits and 6-month free plan (Jul 2025). <https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan> (notes 06)
600. AWS News Blog – Free Tier update, up to $200 in credits. <https://aws.amazon.com/blogs/aws/aws-free-tier-update-new-customers-can-get-started-and-explore-aws-with-up-to-200-in-credits> (notes 06)
601. AWS Builder Center – AWS Free Tier 2025: what's free and for how long. <https://builder.aws.com/content/30mPEVUw3fzFwtEzPurrkoRXAIO/aws-free-tier-2025-whats-free-and-for-how-long> (notes 06)
602. Neowin – AWS Free Tier overhauled. <https://www.neowin.net/news/aws-free-tier-overhauled-new-users-get-200-in-credits-but-theres-a-catch/> (notes 06)
603. AWS – Activate Founders — founders. <https://aws.amazon.com/de/activate/founders/> (notes 06)
604. AWS – Activate credits — credits. <https://aws.amazon.com/startups/credits> (notes 06, 08)
605. AWS Startups – Everything you need to know about AWS Activate credits. <https://aws.amazon.com/aws-startups/learn/everything-you-need-to-know-about-aws-activate-credits/> (notes 06)
606. GitHub Docs – Configuring OpenID Connect in AWS. <https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws> (notes 06)
607. AWS DevOps Blog – AWS CodeCommit returns to general availability. <https://aws.amazon.com/ko/blogs/devops/aws-codecommit-returns-to-general-availability/> (notes 06)
608. InfoQ – AWS CodeCommit GA (Dec 2025). <https://infoq.com/news/2025/12/aws-codecommit-ga> (notes 06)
609. The Register – Praise Amazon for reviving CodeCommit (Nov 2025). <https://www.theregister.com/2025/11/24/praise_amazon_for_reviving_codecommit_corey_quinn/> (notes 06)
610. AWS DevOps Blog – Migrate from Cloud9 to IDE Toolkits or CloudShell. <https://aws.amazon.com/blogs/devops/how-to-migrate-from-aws-cloud9-to-aws-ide-toolkits-or-aws-cloudshell/> (notes 06)
611. AWS Distro for OpenTelemetry – Lambda Python (deprecated page). <https://aws-otel.github.io/docs/getting-started/lambda/lambda-python> (notes 06)
612. Law No. 2024/017 of 23 Dec 2024 (certified true copy, Presidency of the Republic), hosted PDF. <https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf> (notes 07)
613. Presidency of the Republic (prc.cm), Law No. 2024/017 listing. <https://prc.cm/en/multimedia/documents/10271-law-n-2024-017-of-23-12-2024-web> (notes 07)
614. Africa Data Protection, Cameroon country page. <https://www.africadataprotection.org/en/pays/cameroun.html> (notes 07)
615. PACMap, Law No. 2024/017 — cm personal data protection 2024. <https://pacmap.dev/regulation/cm-personal-data-protection-2024> (notes 07)
616. Afriwise / NFM Avocats, Cameroon's evolving data privacy landscape. <https://www.afriwise.com/resources/cameroons-evolving-data-privacy-landscape> (notes 07)
617. Kukie.io, Cameroon Law 2024/017 cookie consent (updated 26 Oct 2026). <https://kukie.io/blog/cookie-consent-cameroon-data-protection> (notes 07)
618. Blacktree, Cameroon's new privacy law is past its grace period (23 Jun 2026). <https://blacktree.nl/2026/06/23/cameroon-data-protection-law-grace-period-ended/> (notes 07)
619. MINPOSTEL, Draft decree on the Data Protection Authority (2023 consultation). <https://www.minpostel.gov.cm/images/Documentation/patnuc/textes_preparation_pour_consultation_publique/protection_data/230518%20Decret_APD%20FIN%20_CLEAN.pdf> (notes 07)
620. Moukouri Law, Projets de loi et décret relatifs à la protection des données. <https://moukourilaw.com/projets-de-loi-et-decret-relatifs-a-la-protection-des-donnees-a-caractere-personnel-au-cameroun/> (notes 07)
621. Digital Business Africa, L'Autorité de protection des données ... créée (24 Dec 2024). <https://www.digitalbusiness.africa/cameroun-lautorite-de-protection-des-donnees-a-caractere-personnel-creee/> (notes 07)
622. Techhive Advisory, Operationalising Cameroon's data protection law. <https://techhiveadvisory.africa/insights/operationalising-cameroons-data-protection-law-a-review-of-key-provisions-and-impacts> (notes 07)
623. Securys, Next stop: Cameroon. <https://www.securys.co.uk/blog/next-stop-cameroon> (notes 07)
624. Global Center on AI Governance, Data privacy and responsible AI adoption in Cameroon. <https://www.globalcenter.ai/research/data-privacy-and-responsible-ai-adoption-in-cameroon> (notes 07)
625. Anove, Law 2024/017 summary — cameroon law 2024 017. <https://www.anove.ai/en/regulations/cameroon-law-2024-017> (notes 07)
626. Kinsmen Advocates, Data protection in Cameroon 2025. <https://kinsmenadvocates.com/cybersecurity/data-protection-in-cameroon-2025> (notes 07)
627. Chambers, Doing Business In 2026: Cameroon. <https://gpg-pdf.chambers.com/Doing-Business-In-2026/151/> (notes 07)
628. ART (Agence de Régulation des Télécommunications) website. <https://www.art.cm/> (notes 07)
629. US International Trade Administration, Cameroon eCommerce. <https://www.trade.gov/country-commercial-guides/cameroon-ecommerce> (notes 07, 08)
630. Regulation No. 04/18/CEMAC/UMAC/COBAC of 21 Dec 2018 on payment services (BEAC PDF). <https://www.beac.int/wp-content/uploads/2019/07/REGLEMENT-N-04-18-CEMAC-UMAC-COBAC-du-21-d%C3%A9cembre-2018.pdf> (notes 07)
631. BEAC, Payment systems instructions, circulars and regulations. <https://www.beac.int/systemes-paiement/instructions-circulaires-reglements/> (notes 07)
632. BEAC, Rapport sur les services de paiement dans la CEMAC 2024 (Apr 2026). <https://www.beac.int/wp-content/uploads/2026/04/RAPPORT-SUR-LES-SERVICES-DE-PAIEMENT-DANS-LA-CEMAC-2024-.pdf> (notes 07)
633. BEAC, Règlements de la COBAC. <https://www.beac.int/supervision-bancaire/reglements-de-cobac/> (notes 07)
634. BEAC homepage (news: COBAC consultations, PAPSS, SYSTAC 2). <https://www.beac.int/> (notes 07)
635. Wikipedia, OHADA. <https://en.wikipedia.org/wiki/OHADA> (notes 07)
636. AWS Global Infrastructure (Regions and AZs). <https://aws.amazon.com/about-aws/global-infrastructure/regions_az/> (notes 07)
637. AWS Data Privacy FAQ — data privacy faq. <https://aws.amazon.com/compliance/data-privacy-faq/> (notes 07)
638. AWS Compliance Programs — programs. <https://aws.amazon.com/compliance/programs/> (notes 07)
639. AWS Shared Responsibility Model. <https://aws.amazon.com/compliance/shared-responsibility-model/> (notes 07)
640. AWS Control Tower, What is Control Tower. <https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html> (notes 07)
641. AWS Organizations, Service control policies. <https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html> (notes 07)
642. AWS Security Reference Architecture. <https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/architecture.html> (notes 07)
643. Amazon GuardDuty, What is GuardDuty. <https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html> (notes 07)
644. AWS Security Hub CSPM, Introduction. <https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html> (notes 07)
645. Amazon Macie, What is Macie — what is macie. <https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html> (notes 07)
646. Amazon Inspector, What is Inspector. <https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html> (notes 07)
647. AWS KMS, Overview — overview. <https://docs.aws.amazon.com/kms/latest/developerguide/overview.html> (notes 07)
648. AWS WAF, Rate-based rule statements. <https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based.html> (notes 07)
649. Amazon Cognito, Authentication flows (passwordless, passkeys). <https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow-methods.html> (notes 07)
650. Amazon Cognito, Threat protection. <https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-settings-threat-protection.html> (notes 07)
651. AWS End User Messaging pricing. <https://aws.amazon.com/end-user-messaging/pricing/> (notes 07)
652. AWS Penetration Testing policy. <https://aws.amazon.com/security/penetration-testing/> (notes 07)
653. OWASP Top 10:2025. <https://top10.owasp.org/2025> (notes 07)
654. OWASP API Security Top 10 2023. <https://api-security.owasp.org/editions/2023/en/0x11-t10> (notes 07)
655. OWASP Mobile Top 10 2024 — 2023 risks. <https://owasp.github.io/www-project-mobile-top-10/2023-risks> (notes 07)
656. NIST SP 800-63B-4 Digital Identity Guidelines: Authentication. <https://pages.nist.gov/800-63-4/sp800-63b.html> (notes 07)
657. OWASP Multifactor Authentication Cheat Sheet. <https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html> (notes 07)
658. Meta for Developers, Webhooks: Getting Started (signature validation, mTLS). <https://developers.facebook.com/docs/graph-api/webhooks/getting-started> (notes 07)
659. WhatsApp Business Messaging Policy. <https://whatsappbusiness.com/fr/policy/> (notes 07)
660. pip-audit (PyPI) — pip audit. <https://pypi.org/project/pip-audit/> (notes 07)
661. Bandit documentation (PyCQA). <https://bandit.readthedocs.io/en/latest/> (notes 07)
662. Django deployment checklist — checklist. <https://docs.djangoproject.com/en/stable/howto/deployment/checklist/> (notes 07)
663. FastAPI, Security intro — security. <https://fastapi.tiangolo.com/tutorial/security/> (notes 07)
664. UN Women, Technology-facilitated gender-based violence FAQ. <https://www.unwomen.org/en/what-we-do/ending-violence-against-women/faqs/tech-facilitated-gender-based-violence> (notes 07)
665. Android Developers, Location permissions. <https://developer.android.com/develop/sensors-and-location/location/permissions> (notes 07)
666. NIST SP 800-61 Rev. 3, Incident Response Recommendations (Apr 2025). <https://csrc.nist.gov/pubs/sp/800/61/r3/final> (notes 07)
667. NIST Cybersecurity Framework (CSF 2.0). <https://www.nist.gov/cyberframework> (notes 07)
668. IETF RFC 9116, security.txt — rfc9116. <https://www.rfc-editor.org/rfc/rfc9116> (notes 07)
669. OWASP Vulnerability Disclosure Cheat Sheet. <https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html> (notes 07)
670. AICPA-CIMA, SOC 2 — audit and assurance greater than soc 2. <https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2> (notes 07)
671. DLA Piper, Cameroon guide PDF. <https://www.dlapiperdataprotection.com/guide.pdf?c=CM> (notes 07)
672. CIO Mag, La protection des données ... à la lecture de la loi du 23 décembre 2024. <https://cio-mag.com/?p=59861> (notes 07)
673. Morrison Foerster Privacy Library, Cameroon. <https://www.mofo.com/privacy-library/cameroon> (notes 07)
674. OWASP Mobile Top 10 project repository. <https://github.com/OWASP/www-project-mobile-top-10> (notes 07)
675. Data Protection Africa, Cameroon profile (outdated, pre-2024; noted for contrast only). <https://dataprotection.africa/cameroon/> (notes 07)
676. Wikipedia, Central African CFA franc. <https://en.wikipedia.org/wiki/Central_African_CFA_franc> (notes 08)
677. Housecall Pro, What is Thumbtack and how it works. <https://www.housecallpro.com/resources/what-is-thumbtack-how-it-works/> (notes 08)
678. Sharetribe Academy, Why Thumbtack succeeded. <https://www.sharetribe.com/academy/why-thumbtack-succeeded/> (notes 08)
679. Kreezalid, Thumbtack business model. <https://www.kreezalid.com/blog/78499-thumbtack-business-model> (notes 08)
680. Think Insights, Thumbtack's two-sided marketplace. <https://thinkinsights.net/digital-transformation/thumbtacks-two-sided-marketplace> (notes 08)
681. Bark Help Centre, What is a credit. <https://help.bark.com/hc/en-gb/articles/13346288068892-What-is-a-credit-and-how-much-does-it-cost> (notes 08)
682. Whito, Bark cost UK — bark cost uk. <https://whito.co.uk/trades/tools/bark-cost-uk/> (notes 08)
683. MyBuilder FAQ (Wayback, 2023). <https://webcf.waybackmachine.org/web/20230921192556/https://www.mybuilder.com/help/faq-finding-work> (notes 08)
684. Trade2Base, Checkatrade vs MyBuilder. <https://www.trade2base.com/blog/checkatrade-vs-mybuilder-uk> (notes 08)
685. Trustpilot, MyBuilder reviews. <https://www.trustpilot.com/review/www.mybuilder.com?page=8> (notes 08)
686. Checkatrade blog, Does Checkatrade cost money. <https://www.checkatrade.com/blog/trade/start-business/does-checkatrade-cost-money/> (notes 08)
687. Whito, Checkatrade cost UK — checkatrade cost uk. <https://whito.co.uk/tools/checkatrade-cost-uk/> (notes 08)
688. TaskRabbit Support, Service Fee. <https://support.taskrabbit.com/hc/en-us/articles/204411610-What-s-the-Taskrabbit-Service-Fee> (notes 08)
689. TaskRabbit Support, Trust & Support Fee. <https://support.taskrabbit.com/hc/articles/204940570> (notes 08)
690. Productmint, TaskRabbit business model. <https://productmint.com/taskrabbit-business-model-how-does-taskrabbit-make-money/> (notes 08)
691. Free Press Journal, Urban Company turns profitable FY25. <https://www.freepressjournal.in/business/urban-company-turns-profitable-ahead-of-ipo-with-240-crore-net-profit-in-fy25> (notes 08)
692. Urban Company shareholder letter (NSE, Jan 2026). <https://nsearchives.nseindia.com/corporate/URBANCO_23012026153501_UC_Shareholders_Letter_23012026.pdf> (notes 08)
693. S&P Global Market Intelligence, Urban Company take rates (2026). <https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/04/urban-company-revenue-to-triple-by-2030-as-take-rates-and-platform-monetization-rise> (notes 08)
694. iTiger, Angi FY2025 summary. <https://www.itiger.com/hans/news/2613297362> (notes 08)
695. Angi Investor Relations, Q4 2025 materials. <https://ir.angi.com/static-files/a90e25f5-b2c4-480a-aaea-86f20a928ca6> (notes 08)
696. Barchart, Angi Q4 deep dive — angi q4 deep dive traffic headwinds cost cuts and ai product expansion. <https://www.barchart.com/story/news/164455/angi-q4-deep-dive-traffic-headwinds-cost-cuts-and-ai-product-expansion> (notes 08)
697. a16z, 13 metrics for marketplace companies. <https://a16z.com/13-metrics-for-marketplace-companies/> (notes 08, 09)
698. a16z, Field Notes with Deb Liu (take rates). <https://a16z.com/podcast/field-notes-breakout-strategies-with-deb-liu-part-2/> (notes 08)
699. knowledgelib, Marketplace industry benchmarks 2026 (citing Tidemark). <https://knowledgelib.io/business/industry-benchmarks/marketplace-industry-benchmarks-2026/2026.md> (notes 08)
700. William Blair, Study of 300+ company take rates. <https://williamblair.com/Insights/Proprietary-Study-of-300-Plus-Private-and-Public-Company-Take-Rates> (notes 08)
701. SweepSouth. <https://sweepsouth.com/> (notes 08)
702. Kolonell, Cameroon mobile payment landscape MTN/Orange 2026. <https://kolonell.com/en/blog/cameroon-mobile-payment-landscape-mtn-orange-2026> (notes 08)
703. EcoMatin, State levied XAF 43bn on transfers in 2025. <https://ecomatin.net/cameroun-letat-a-preleve-43-milliards-fcfa-sur-les-transferts-dargent-en-2025-en-hausse-de-35> (notes 08)
704. Financial Afrik, Mobile money 5% of GDP (2025). <https://www.financialafrik.com/2025/04/14/cameroun-le-mobile-money-contribue-a-5-du-pib/> (notes 08)
705. AllAfrica / Camer.be, MTN "zéro frais" (March 2026). <https://fr.allafrica.com/stories/202603060718.html> (notes 08)
706. Camer.be, MTN zero-fee revolution. <https://www.camer.be/92577/11:1/zero-frais-paye-ou-la-revolution-concurrentielle-du-mobile-money-de-mtn-cameroun-cameroon.html> (notes 08)
707. EcoMatin, Orange Money zero-fee transfers (Sept 2025). <https://ecomatin.net/cameroun-orange-money-accelere-la-guerre-des-tarifs-avec-le-zero-frais-sur-les-transferts-dargent> (notes 08)
708. Digital Business Africa, Max It & MoMo App 1% withdrawals (Nov 2025). <https://www.digitalbusiness.africa/paiement-mobile-au-cameroun-max-it-orange-et-momo-app-mtn-generalisent-les-retraits-a-1-des-5-000-f-cfa/> (notes 08)
709. Digital Business Africa, Orange Money 2025 tariffs. <https://www.digitalbusiness.africa/cameroun-voici-les-nouveaux-tarifs-2025-dorange-money/> (notes 08)
710. Digital Business Africa, MTN MoMo withdrawal tariffs 2025. <https://www.digitalbusiness.africa/cameroun-les-tarifs-de-retrait-de-mtn-mobile-money-momo-en-2025/> (notes 08)
711. EcoMatin, MTN cuts withdrawal costs 25% (Oct 2024). <https://ecomatin.net/transactions-electroniques-au-cameroun-mtn-reduit-de-25-le-cout-des-retraits-dargent-sur-son-reseau> (notes 08)
712. Kolonell, Mobile money cash-out fees Central Africa 2026. <https://kolonell.com/en/blog/mobile-money-cash-out-fees-central-africa-comparison-2026> (notes 08)
713. Kamerpower, Orange Money tariff grid (flagged outdated). <https://kamerpower.com/fr/grille-tarifaire-orange-money-cameroun-2021-2022-frais-orange-money/> (notes 08)
714. MTN MoMo API, Cameroon Collections product details. <https://momoapi.mtn.com/Cameroon_Collection_productDetails> (notes 08)
715. MTN MoMo Developer Community, marketplace split payment inquiry (2026). <https://momodevelopercommunity.mtn.com/momo-south-africa-developers-58/inquiry-about-marketplace-split-payment-integration-with-mtn-mobile-money-483> (notes 08)
716. pawaPay, Fees. <https://pawapay.io/fees> (notes 08)
717. Kolonell, Comparatif agrégateurs paiement Cameroun 2026. <https://kolonell.com/fr/blog/comparatif-agregateurs-paiement-cameroun-2026> (notes 08)
718. Kolonell, Grille tarifaire agrégateur paiement Cameroun 2026. <https://kolonell.com/fr/blog/grille-tarifaire-agregateur-paiement-cameroun-2026> (notes 08)
719. PaymentProviders.io, Cameroon. <https://paymentproviders.io/country/cm> (notes 08)
720. Kolonell, CinetPay integration fees Côte d'Ivoire 2026. <https://kolonell.com/en/blog/cinetpay-integration-fees-ivory-coast-2026> (notes 08)
721. Kolonell, Choosing an online payment gateway for Central Africa 2026. <https://kolonell.com/en/blog/choosing-online-payment-gateway-central-africa-business-london-2026> (notes 08)
722. NotchPay developer FAQ. <https://developer.notchpay.co/faq.md> (notes 08)
723. WeAreTech Africa, Franklin Kamga / Notch Pay. <https://www.wearetech.africa/en/fils-uk/tech-stars/cameroon-s-franklin-kamga-eases-online-payments-for-businesses> (notes 08)
724. DusuPay, Top payment gateways in Cameroon. <https://www.dusupay.com/post/top-payment-gateways-in-cameroon> (notes 08)
725. Campay API WordPress plugin — campay api. <https://yor.wordpress.org/plugins/campay-api/> (notes 08)
726. TechChantier, Fapshi — simplifying payments in cameroon fapshis seamless solution. <https://techchantier.com/blog/simplifying-payments-in-cameroon-fapshis-seamless-solution> (notes 08)
727. Monetbil WooCommerce gateway. <https://fair.pm/packages/plugins/monetbil-woocommerce-gateway/> (notes 08)
728. Journal du Cameroun, Hausse effective du coût des transactions mobile money (2022). <https://fr.journalducameroun.com/cameroun-hausse-effective-du-cout-des-transactions-du-mobile-money-cameroun/> (notes 08)
729. EcoMatin, 0.2% tax on mobile money transfers from 2022. <https://ecomatin.net/loi-de-finances-une-taxe-de-02-sur-les-transferts-dargent-via-mobile-money-en-vigueur-des-2022> (notes 08)
730. EcoMatin, XAF 4 levy debate — virements retraits paiements par carte transferts de titresau cameroun le prelevement de 4 fcfa suscite debat. <https://ecomatin.net/virements-retraits-paiements-par-carte-transferts-de-titresau-cameroun-le-prelevement-de-4-fcfa-suscite-debat> (notes 08)
731. ITWeb, IMF cautions on Cameroon mobile money tax (2022). <https://itweb.africa/content/xA9POvNZBPPvo4J8> (notes 08)
732. ITWeb, Users mobilise against mobile money tax (2022). <https://itweb.africa/content/G98YdMLY18zqX2PD> (notes 08)
733. Deloitte Avocats, Cameroon 2026 Finance Law innovations. <https://blog.avocats.deloitte.fr/cameroun-les-principales-innovations-de-la-loi-de-finances-pour-2026/> (notes 08)
734. Numbeo, Cost of living Douala (Nov 2026). <https://www.numbeo.com/cost-of-living/in/Douala> (notes 08)
735. Numbeo, Cost of living Yaoundé (Oct 2026). <https://www.numbeo.com/cost-of-living/in/Yaounde-Cameroon> (notes 08)
736. WageIndicator, Minimum wage Cameroon. <https://wageindicator.org/salary/minimum-wage/cameroon> (notes 08)
737. Wikipedia, List of minimum wages by country. <https://en.wikipedia.org/wiki/List_of_minimum_wages_by_country> (notes 08)
738. Wikipedia, Economy of Cameroon. <https://en.wikipedia.org/wiki/Economy_of_Cameroon> (notes 08, 09)
739. Wikipedia, List of countries by remittances received (World Bank data). <https://en.wikipedia.org/wiki/List_of_countries_by_remittances_received> (notes 08)
740. World Bank, Remittances / KNOMAD brief. <https://www.worldbank.org/en/topic/migration/brief/remittances-knomad> (notes 08)
741. Wikipedia, Cameroonian diaspora. <https://en.wikipedia.org/wiki/Cameroonian_diaspora> (notes 08)
742. WorldRemit, Prices for sending money to Cameroon. <https://www.worldremit.com/en/blog/product/our-new-and-improved-prices-for-sending-money-to-cameroon> (notes 08)
743. World Bank, Global Findex 2025. <https://www.worldbank.org/en/publication/globalfindex> (notes 08)
744. Briter, Africa Investment Report 2025. <https://www.briter.co/insights/reports/africa-investment-report-2025> (notes 08)
745. Briter (homepage, reports index). <https://www.briter.co/> (notes 08)
746. Africa: The Big Deal, archive (2026 posts). <https://thebigdeal.substack.com/archive> (notes 08)
747. Tony Elumelu Foundation, Entrepreneurship Programme. <https://www.tonyelumelufoundation.org/tef-entrepreneurship-programme> (notes 08)
748. Google for Startups Accelerator: Africa. <https://startup.google.com/programs/accelerator/africa/> (notes 08)
749. Wikipedia, Silicon Mountain — Silicon Mountain. <https://en.wikipedia.org/wiki/Silicon_Mountain> (notes 08)
750. ActivSpaces. <https://activspaces.com/> (notes 08)
751. Orange Digital Centers (Cameroon page). <https://www.orangedigitalcenters.com/country/cm/home> (notes 08)
752. Disrupt Africa (archive), OnDjoss headline. <https://old.disruptafrica.com/> (notes 08)
753. PwC Tax Summaries, Cameroon other taxes. <https://taxsummaries.pwc.com/republic-of-cameroon/corporate/other-taxes> (notes 08)
754. PwC Tax Summaries, Cameroon taxes on corporate income. <https://taxsummaries.pwc.com/republic-of-cameroon/corporate/taxes-on-corporate-income> (notes 08)
755. Sachin Rekhi, "A Primer on Network Effects from Andrew Chen's The Cold Start Problem". <https://www.sachinrekhi.com/andrew-chen-the-cold-start-problem> (notes 09)
756. Andrew Chen, "Solve a Hard Problem (Tinder)", ch. 8 of *The Cold Start Problem*. <https://andrewchen.com/?p=4785> (notes 09)
757. TwosApp (Medium), "The Cold Start Problem" summary. <https://medium.com/twosapp/the-cold-start-problem-how-to-start-and-scale-network-effects-by-andrew-chen-813f0668c70f> (notes 09)
758. Frog Capital, review of The Cold Start Problem. <https://frogcapital.com/think-frog/the-cold-start-problem-by-andrew-chen/> (notes 09)
759. Product Andrew, Cold Start Problem summary. <https://productandrew.substack.com/p/product-31> (notes 09)
760. Deepak Gupta, The Cold Start Problem book notes. <https://guptadeepak.com/books/the-cold-start-problem/> (notes 09)
761. Lenny Rachitsky, "How to Kickstart and Scale a Marketplace, Part 2: Supply vs Demand". <https://www.lennysnewsletter.com/i/159750/step-decide-which-side-of-the-marketplace-to-concentrate-on> (notes 09)
762. echai.ventures, supply vs demand / empty-restaurant problem. <https://echai.ventures/startingup/first-customers/i-run-a-two-sided-marketplace-do-i-get-my-first-customers-by-starting-with-supply-or-demand-and-how-do-i-avoid-the-empty-restaurant-problem> (notes 09)
763. Lenny's Newsletter, marketplaces archive. <https://www.lennysnewsletter.com/t/marketplaces> (notes 09)
764. Rework, "Supply-First vs Demand-First Marketplace Launch". <https://resources.rework.com/libraries/marketplace-growth/supply-first-vs-demand-first> (notes 09)
765. Lenny Rachitsky, "How the biggest consumer apps got their first 1,000 users". <https://www.lennysnewsletter.com/p/how-the-biggest-consumer-apps-got> (notes 09)
766. NFX (James Currier), "19 Tactics to Solve the Chicken-or-Egg Problem". <https://www.nfx.com/post/19-marketplace-tactics-for-overcoming-the-chicken-or-egg-problem> (notes 09)
767. Sharetribe, James Currier at the Marketplace Conference. <https://www.sharetribe.com/academy/marketplace-conference-4-2/> (notes 09)
768. Founders Network, "Chicken Before Egg". <https://foundersnetwork.com/chicken-before-egg-getting-your-marketplace-startup-off-the-ground/> (notes 09)
769. Chris Dixon, "Come for the tool, stay for the network" (2015). <https://cdixon.org/2015/01/31/come-for-the-tool-stay-for-the-network> (notes 09)
770. Point Nine, "Come for the Network, Stay for the Tool". <https://writing.pointnine.com/p/come-for-the-network-stay-for-the> (notes 09)
771. TechCrunch, critique of "come for the tool". <https://techcrunch.com/?p=1420204> (notes 09)
772. a16z, Chris Dixon on AI, crypto and networks (2025). <https://a16z.com/ai-crypto-internet-chris-dixon/> (notes 09)
773. NFX, "The Billion Dollar Marketplace: Thumbtack". <https://nfx.com/post/billion-dollar-marketplace-thumbtack> (notes 09)
774. Andrew Chen, tactics for growing marketplace supply. <https://andrewchen.com/grow-marketplace-supply/amp> (notes 09)
775. Paul Graham, "Do Things That Don't Scale". <https://paulgraham.com/ds.html> (notes 09)
776. Wikipedia, Airbnb. <https://en.wikipedia.org/wiki/Airbnb> (notes 09)
777. a16z, The Marketplace Glossary. <https://a16z.com/the-marketplace-glossary/> (notes 09)
778. a16z, Four Paths to Marketplace Success. <https://a16z.com/four-paths-to-marketplace-success/> (notes 09)
779. Wikipedia, Two-sided market (Rochet & Tirole; Parker & Van Alstyne). <https://en.wikipedia.org/wiki/Two-sided_market> (notes 09)
780. HBR, Eisenmann, Parker & Van Alstyne, "Strategies for Two-Sided Markets" (2006). <https://hbr.org/2006/10/strategies-for-two-sided-markets> (notes 09)
781. Wikipedia, DoorDash — DoorDash. <https://en.wikipedia.org/wiki/DoorDash> (notes 09)
782. UX Planet, lessons from Etsy's marketplace. <https://uxplanet.org/lessons-on-kickstarting-and-growing-a-marketplace-from-etsys-14b-handmade-empire-c060078bb669> (notes 09)
783. Gozem, Cameroon website. <https://www.gozem.co/> (notes 09)
784. Wikipedia, Yango (company) — Yango (company). <https://en.wikipedia.org/wiki/Yango_(company)> (notes 09)
785. Wikipedia, Glovo. <https://en.wikipedia.org/wiki/Glovo> (notes 09)
786. Wikipedia, Kiro'o Games — Kiro o Games. <https://en.wikipedia.org/wiki/Kiro%27o_Games> (notes 09)
787. Wikipedia, M-Pesa. <https://en.wikipedia.org/wiki/M-Pesa> (notes 09)
788. Wikipedia, Moniepoint. <https://en.wikipedia.org/wiki/Moniepoint> (notes 09)
789. Wikipedia, SweepSouth. <https://en.wikipedia.org/wiki/SweepSouth> (notes 09)
790. Kandua, homepage. <https://kandua.com/> (notes 09)
791. Wikipédia (FR), Chefferie traditionnelle au Cameroun. <https://fr.wikipedia.org/wiki/Chefferie_traditionnelle_au_Cameroun> (notes 09)
792. Wikipedia, Religion in Cameroon. <https://en.wikipedia.org/wiki/Religion_in_Cameroon> (notes 09)
793. Wikipedia, Rotating savings and credit association. <https://en.wikipedia.org/wiki/Rotating_savings_and_credit_association> (notes 09)
794. Wikipédia (FR), Tontine — Tontine. <https://fr.wikipedia.org/wiki/Tontine> (notes 09)
795. Wikipedia, Camfranglais. <https://en.wikipedia.org/wiki/Camfranglais> (notes 09)
796. Wikipedia, Media of Cameroon. <https://en.wikipedia.org/wiki/Media_of_Cameroon> (notes 09)
797. Wikipedia, Minimum viable product. <https://en.wikipedia.org/wiki/Minimum_viable_product> (notes 09)
798. Causo, Marketplace liquidity seed benchmarks. <https://hub.causo.ai/guides/marketplace-liquidity-seed> (notes 09)
799. a16z, Marketplace Glossary (2020 version). <https://a16z.com/marketplace-glossary/> (notes 09)
800. NFX, Marketplace Expansion Framework. <https://nfx.com/post/marketplace-expansion-framework> (notes 09)
801. Wikipedia, Economic and Monetary Community of Central Africa (CEMAC). <https://en.wikipedia.org/wiki/Economic_and_Monetary_Community_of_Central_Africa> (notes 09)
