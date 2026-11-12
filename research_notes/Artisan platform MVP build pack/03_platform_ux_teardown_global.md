# Global UX and product teardown: 50 trust, reputation, verification and service-matching platforms (input to the Douala artisan MVP)

Scope note: research current to 12 November 2026. This file covers what each platform's *product* does at each step of our demo journey (verify artisan → request → match → booking with job code → completion proof → two-sided rating → dispute). It does not repeat the theory, scoring maths, Cameroon fraud landscape or KYC vendor material already in `Cameroon artisan trust platform/03_skill_verification_reputation.md` and `04_anti_fraud.md`. Those files are referenced as "[prior notes 03]" and "[prior notes 04]".

Method and evidence quality: about 60 web searches and fetches, mostly against help centres, trust pages, transparency reports and company press releases. Most platform claims are **self-reported by the platform**. Where only a third-party guide, review site or archived page was found, the entry says so. Mobbin and PageFlows sit behind logins and were not accessible. No Nielsen Norman Group article on reviews was retrieved (see Gaps). Status tags: **[ACTIVE]**, **[CHANGED]** (material change, dated), **[ARCHIVED/MERGED]**.

Substitutions (keeping the list at exactly 50):
- **TrustATrader → Urban Company (India).** No primary or reliable secondary source on TrustATrader's vetting or reviews could be retrieved; the only hit was an unreliable auto-generated page. Urban Company is a closer analogue for Douala anyway (OTP, arrival selfie, trained partners).
- **"Mister Auto/Fixter" → Fixter only.** Mister Auto is a parts retailer with no provider-matching flow relevant here.
- **Uber/Lyft, Doctolib/Zocdoc and BrightID/Gitcoin Passport are each counted as two platforms** to reach 50.

Field legend used in every entry: **Onboard** = provider onboarding/verification; **Trust UI** = how trust is displayed; **Match** = request/search/match; **Price** = quote and price transparency; **Book** = booking confirmation; **Proof** = job completion proof; **Reviews** = review UI and anti-fake measures; **Disputes** = disputes and guarantees; **Standout** = notable micro-interaction or pattern. "Not verified" means no source was found in this run.

---

## A. Home-services platforms (25 entries)

### Takeaway
Home-services marketplaces split into two models. **Lead-gen directories** (Bark, Rated People, MyBuilder, StarOfService, Angi leads, HomeAdvisor) sell customer contacts to pros, and their trust layer is mostly a badge plus reviews. **Managed or booked marketplaces** (TaskRabbit, Thumbtack, Airtasker, Urban Company, Helpling, Angi pre-priced) control the booking and payment, so they can tie reviews to real jobs, hold funds, and back a guarantee. The second model matches our "a reputation that can be faked doesn't count" rule. Badges almost everywhere verify **the account owner, once, at sign-up**, not the person who shows up. Guarantees have narrowed and been rewritten since 2020 (Thumbtack, Google, Checkatrade).

### Cited Findings

**1. TaskRabbit (US/UK/EU) [ACTIVE]**
- Onboard: US Taskers must pass an identity check and a criminal background check covering national, local and sex-offender databases. Canada uses a CPIC adult-convictions check, the UK a basic DBS/Disclosure Scotland certificate — [TaskRabbit Trust & Safety](https://support.taskrabbit.com/hc/en-us/articles/207813543-Overview-of-Trust-and-Safety). ID checks use third-party providers including Persona and Checkr — [TaskRabbit identity verification](https://support.taskrabbit.com/hc/articles/115005156463).
- Trust UI / Match: the customer picks from a list of Taskers. TaskRabbit tells customers to compare Elite status, star rating, **number of tasks done in the selected category**, and photos of past tasks. Filters are date, time and price range — [TaskRabbit: which Tasker is best](https://support.taskrabbit.com/hc/articles/360050012971).
- Price / Book: each Tasker sets an **hourly rate per category, shown upfront** before booking; the customer taps "Select & Continue", then picks date and time — [TaskRabbit: how do I hire](https://support.taskrabbit.com/hc/en-us/articles/210861763).
- Disputes: the Happiness Pledge is secondary to the customer's own insurance and claims must be reported within 30 days — [Happiness Pledge](https://support.taskrabbit.com/hc/articles/360035570011). UK cap: up to £10,000 per task — [TaskRabbit UK blog](https://www.taskrabbit.co.uk/blog/?p=14299).
- Caveat: the Terms say "background checked" or "vetted" labels only mean a registration step was completed, and checks run at registration, not continuously (third-party reading of the ToS) — [TaskRabbit Trust & Safety](https://support.taskrabbit.com/hc/en-us/articles/207813543-Overview-of-Trust-and-Safety).
- Standout: **per-category task counts and per-category reviews.** A Tasker's reputation for furniture assembly does not leak into plumbing.

**2. Thumbtack (US) [ACTIVE; guarantee CHANGED 2020]**
- Onboard: every account owner must pass a criminal background check. The badge confirms the account holder passed, but **not that the specific worker sent by a multi-person business was checked**. A separate licence badge means Thumbtack checked the provided licence number against a public database — [Thumbtack Smart Hiring/Safety](https://www.thumbtack.com/safety).
- Trust UI: Top Pro is an orange ribbon on quotes and profiles. Criteria (secondary sources): 10+ hires and 4.8+ rating and 5+ verified reviews in 12 months, plus a response-time rule reported as "within 4 business hours 75% of the time" — [Jobber guide](https://getjobber.com/academy/thumbtack-for-contractors/). Sources disagree on the response window (4 h vs 24 h); treat as unconfirmed.
- Disputes: Property Damage Guarantee up to $100,000 when a pro's negligence damages property; must be reported within 14 days (45 days for the Money-Back Guarantee); excludes faulty installation and incomplete work; only the registered customer who hired through Thumbtack can claim — [Thumbtack Guarantee](https://thumbtack.com/guarantee). In 2016 the headline was a $1,000,000 guarantee, cut in 2020 — [GlobeNewswire 2016](https://www.globenewswire.com/news-release/2016/08/09/1102035/0/en/Thumbtack-Announces-1-Million-Guarantee.html).
- Standout: badge copy that is **explicit about what was checked and whom** (owner vs worker).

**3. Angi (formerly Angie's List, US) [ACTIVE]**
- Onboard: background checks are run only on the owner or principal, not every employee — [Angi how it works](https://www.angi.com/how-it-works.htm); pro eligibility rules — [Angi pro eligibility](https://intercom.help/angi/en/articles/9269408-pro-eligibility-requirements). A local TV investigation reported Angi Certified requires a licence, a 3-star minimum rating and a 7-year felony lookback, and recalled a California settlement over background-check claims — [WTHR 13 Investigates](https://www.wthr.com/article/news/investigations/13-investigates/what-to-know-online-services-refer-home-contractors-angi-homeadvisor-background-check-felon-certified/531-4beab2c1-4fcd-4161-868d-7a2a65cc8e5e). Bob Vila reports a 2-year check window (conflict) — [Bob Vila review](https://www.bobvila.com/articles/angi-review).
- Match / Price / Book: the customer answers project questions; a request goes to up to five pros. **Instant booking with upfront pricing** exists for pre-priced services; other work goes to quotes. Auto-matching of leads has reportedly mostly stopped — [Block Renovation: Angi vs Thumbtack](https://www.blockrenovation.com/guides/angi-vs-thumbtack).
- Disputes: Happiness Guarantee applies when booked and paid through Angi — [Angi how it works](https://www.angi.com/how-it-works.htm).
- Standout: **two lanes in one app**: fixed-price instant book for simple jobs, quote request for complex ones.

**4. HomeAdvisor (US) [ACTIVE, Angi-owned; FTC order 2023]**
- Onboard: marketed pros as "screened and approved". The FTC's 2023 final order (about $7.2 million) concerned deceptive marketing of *leads* sold to pros, not consumer vetting — [FTC HomeAdvisor matter](https://search.ftc.gov/legal-library/browse/cases-proceedings/1923106-homeadvisor-matter); [Search Engine Journal](https://www.searchenginejournal.com/homeadvisor-penalized-by-ftc-for-alleged-false-claims-about-leads/486906/).
- Disputes: shared Angi/HomeAdvisor/Handy terms capped Happiness Guarantee liability at $2,500 per Book Now booking (2021 version) — [archived terms](https://webcf.waybackmachine.org/web/20230219124058/https://homeadvisor.pactsafe.io/versions/62865215d0ae5213a88a7a71.pdf).
- Lesson: when the provider pays per lead, the platform's incentive is volume of leads, not quality of match. Regulators acted on lead-quality claims.

**5. Checkatrade (UK) [ACTIVE; guarantee terms CHANGED Jan 2025 and Jan 2026]**
- Onboard: "up to 12 checks" before joining, including ID, company history, county court judgments and adverse media, and checks continue during membership — [Checkatrade trust page](https://www.checkatrade.com/blog/trust/). A Guardian-reported case found "human error" had skipped two of the 12 checks on a rogue trader — [inkl/Guardian](https://inkl.com/news/how-do-rogue-traders-get-past-checkatrade-s-checks).
- Reviews: verified via "a mixture of SMS, account and platform actions"; Checkatrade claims 90% of reviews are verified — [Checkatrade: reviews you can trust](https://www.checkatrade.com/blog/expert-advice/reviews-you-can-trust).
- Disputes: discretionary Guarantee up to £1,000 per approved claim for work after 29 January 2026, if the job was arranged through Checkatrade or paid with Checkatrade Pay and reported within 6 months. Checkatrade first notifies the trade and tries mediation, then may commission an **independent third-party workmanship assessment** — [Checkatrade Guarantee terms](https://www.checkatrade.com/guarantee-terms).
- Standout: **a numbered vetting checklist** ("12 checks") as marketing, plus **escalation to an independent assessor** in disputes.

**6. MyBuilder (UK) [ACTIVE]**
- Reviews: feedback is tied to a job posted on MyBuilder and cannot be anonymous. The feedback button only appears once work is agreed after a MyBuilder connection. Feedback is removed if there was no agreement, the trade was found outside MyBuilder, or **the parties knew each other before connecting** — [archived MyBuilder FAQ 2022](https://webcf.waybackmachine.org/web/20220817033755/https://www.mybuilder.com/help/faq-finding-builders). Current terms also allow feedback "from previous customers as permitted by MyBuilder", a second route not in the FAQ — [MyBuilder T&Cs Feb 2024](https://www.mybuilder.com/assets/en_GB/MB-Terms-and-Conditions-Feb-26-2024.pdf).
- Standout: **a "do you know each other?" exclusion rule**, the clearest written ban on friends-and-family reviews found in this run.

**7. Rated People (UK) [ACTIVE]**
- Onboard: company says trades undergo vetting including identity and qualifications (company blog) — [Rated People blog](https://www.ratedpeople.com/blog/?p=48629).
- Reviews: only homeowners who found their trade through the site may review; the trade pays per quote submitted (per third-party analysis) — [Rated People on Trustpilot](https://uk.trustpilot.com/review/ratedpeople.com). User complaints cite lead fees and weak vetting (same source).
- Lesson: pay-per-quote models create pressure to quote on everything.

**8. Urban Company (India; substitute for TrustATrader) [ACTIVE]**
- Onboard: background verification plus **3–45 days of training depending on skill level**, with technical and soft-skills tests before approval — [Urban Company upskilling](https://www.urbancompany.com/blog/setting-up-service-partners-for-success-upskilling-at-urban-company).
- Book / Proof: the professional takes a **selfie on arrival**, matched to their identity with face verification, "so jobs are not passed onto someone else"; part of a 10-point safety system including OTP — [Urban Company safety blog](https://www.urbancompany.com/blog/urban-company-strengthens-safety-protocol-using-microsoft-azure-cognitive-services).
- Standout: **arrival selfie bound to the booking**, the strongest answer to "is the verified person the one at my door?".

**9. Bark (UK/global) [ACTIVE]**
- Match: the customer answers category questions; Bark instantly matches and **pros decide whether to pay credits to contact the customer**; customers typically get up to 5 quotes; requests are free for customers — [How Bark works](https://help.bark.com/hc/en-us/articles/13201889420060-How-Bark-Works).
- Trust UI: "Bark Verified" is a trust badge described as showing the pro was "thoroughly checked and vetted", but help pages describe it as a **paid add-on** (monthly fee, included for Elite Pro) — [What is Bark Verified](https://help.bark.com/hc/en-us/articles/13344504555676-What-is-Bark-Verified).
- Disputes: "Get Hired Guarantee" returns credits to pros who win no customers; many reviewers say claims were refused — [Bark on G2](https://g2.com/products/bark-com/reviews?page=5).
- Lesson: a verification badge the provider buys is an anti-pattern (same finding as Jiji in [prior notes 03]).

**10. Houzz / Houzz Pro (US/global) [ACTIVE]**
- Trust UI: annual "Best of Houzz" badges. Service awards are based on client reviews received by 31 December; pros may not enter reviews; family and employees are excluded; winners get an automatic profile badge. "Innovator" tier requires Houzz Pro certification and **use of paid Houzz Pro software** — [Best of Houzz guidebook](https://pro.houzz.com/pro-learn/blog/best-of-houzz---a-guidebook).
- Caveat: a 2018 forum thread describes a Best of Houzz pro whose licence number belonged to someone else — [Houzz forum](https://www.houzz.com/discussions/5136508/best-of-houzz-2018). No source explains how Houzz's "Verified License" badge is checked.
- Lesson: award badges partly tied to buying the platform's software mix reputation and revenue.

**11. Porch (US) [ACTIVE; guarantee era 2015–c.2018]**
- Onboard / Disputes: the 2015 Porch Guarantee covered pros who were pre-screened, licensed where required, had a strong BBB rating, passed a background check and signed the "Porch Pledge"; eligible pros got a badge; launched in 28 markets — [Porch press release 2015](https://www.globenewswire.com/news-release/2015/09/22/770042/0/en/Porch-com-Unveils-the-Porch-Guarantee-as-Demand-for-Home-Services-Surges.html). The CEO would not say how many of 100,000 listed pros were verified — [TechCrunch 2015](https://techcrunch.com/2015/09/22/porch-now-guarantees-work-done-by-home-professionals/). No current official vetting page found.
- Standout: a **signed provider pledge** as a lightweight code of conduct.

**12. Handy (US) [ACTIVE as an Angi brand since 2018]**
- Acquired by ANGI Homeservices in October 2018 — [Axios](https://www.axios.com/2018/10/11/angies-list-parent-company-acquires-handy). Shares Angi's Happiness Guarantee terms (2021 cap $2,500 per Book Now booking) — [archived terms](https://webcf.waybackmachine.org/web/20230219124058/https://homeadvisor.pactsafe.io/versions/62865215d0ae5213a88a7a71.pdf). Handy's own background-check process: not verified.
- Pattern: fixed-price, platform-assigned cleaner/handyman, where the customer trusts the platform brand more than the individual.

**13. Frizbiz → Ring Twice (France/Belgium) [ARCHIVED/MERGED]**
- Since 28 August 2024 "Frizbiz est désormais devenu Ring Twice" — [App Store listing](https://apps.apple.com/fr/app/frizbiz/id1071087083). Trustpilot says reviews can no longer be left because the Frizbiz site has closed; older reviews describe no-shows and refused refunds — [Frizbiz on Trustpilot](https://www.trustpilot.com/review/www.frizbiz.com). Ring Twice verification process: not verified.
- Lesson: no-show with prepaid funds and slow refunds was the recurring complaint, so the escrow release rule and refund SLA must be explicit.

**14. StarOfService (global) [ACTIVE]**
- Match: StarOfService "reviews every client request to ensure it's legitimate", then emails/texts it to all relevant pros; "typically 1–2 other professionals will also reply"; pros send a message plus a price estimate they can revise; pros pay a subscription — [StarOfService: how it works](https://www.starofservice.co.uk/pro/how-it-works).
- Onboard: optional trust adds (licence, background check, website/social links); no formal verification described (same source). Claims pros with 1 review get hired 66% more than pros with none (self-reported, same source). Public reviews are tagged "verified" — [StarOfService reviews](https://starofservice.co.uk/reviews).
- Standout: **request vetting before broadcast** (protects providers from junk leads) and **capping competition at a few replies**.

**15. Yoojo (ex-Youpijob, France) [ACTIVE]**
- Onboard: identity, address and bank-account checks on providers — [Yoojo on Trustpilot](https://ca.trustpilot.com/review/yoojo.fr). Insurance via AXA; some users report claims excluded or slow — [Gowork reviews](https://gowork.fr/yoojo-ex-youpijob-paris/5).
- Lesson: verifying the **payout bank account** is a cheap anti-impersonation check (for us: the MoMo wallet name must match the ID).

**16. Helpling (DE/NL/IE/SG…) [ACTIVE]**
- Onboard: Singapore describes a 5-step vetting with ID, background screening and a **face-to-face meeting with every candidate** — [Helpling SG](https://www.helpling.com.sg/?p=5141). Ireland uses Onfido for ID — [Helpling IE support](https://ie.support.helpling.com/en/support/solutions/articles/15000029654-who-are-the-service-providers-and-how-can-i-find-one-that-suits-my-needs-).
- Disputes: Germany: liability cover up to €5 million per booking; damage over €500 goes to the partner insurer, smaller damage is settled with the cleaner; key loss not covered — [Helpling DE FAQ](https://www.helpling.de/?p=15452).
- Standout: **tiered damage handling** (small claims settled peer-to-peer, large ones by insurer).

**17. Hassle.com (UK) [ARCHIVED/MERGED into Helpling]**
- Matched customers with "pre-vetted, experienced cleaners"; merged with Helpling in July 2015 — [TechCrunch](https://techcrunch.com/2015/07/02/hassle-helpling-merger/); renamed Helpling in 2017 — [Fora.ie](https://fora.ie/hassle-rebrand-name-change-3420282-Jun2017/). Helpling migrated globally onto Hassle's technology (same TechCrunch/Wikipedia lineage).
- Lesson: cleaning marketplaces consolidated; price-per-hour plus "pre-vetted" was not enough on its own as a moat.

**18. ServiceMagic (US) [ARCHIVED: relaunched as HomeAdvisor, 1 Nov 2012]**
- IAC relaunched ServiceMagic as HomeAdvisor — [IAC press release](https://iac.com/press-releases/iac-relaunches-servicemagic-as-homeadvisor-the-next-generation-of-online-solutions-for-home-improvement-and-repair-projects). The archived page promised the "pre-screened" network would stay the same — [archived HomeAdvisor/ServiceMagic page](https://webcf.waybackmachine.org/web/20150823134810/http://www.homeadvisor.com/servicemagic).
- Lesson: "pre-screened" as a vague, unauditable label carried over a rebrand and later drew legal scrutiny (see HomeAdvisor).

**19. Nextdoor recommendations / Faves (US/UK/EU) [CHANGED Sept 2026]**
- Trust UI: a "Fave" is a neighbour's vote that they vouch for a business. Local Faves is a discovery hub "built entirely around recommendations from real, verified neighbors" — [Nextdoor Local Faves](https://blog.nextdoor.com/small-business-improvements); [Introducing Faves](https://blog.nextdoor.com/introducing-faves-harnessing-the-collective-wisdom-of-your-neighborhood). Annual Neighborhood Faves are decided by volume of Faves and recommendations over a year — [Nextdoor Business 2024](https://business.nextdoor.com/en-us/blog/2024-nextdoor-neighborhood-faves-are-here).
- Standout: **trust scoped to "people near you"**, the online version of asking your quarter.
- Caveat: verified neighbour status does not make a recommendation objective (third-party write-up via same results).

**20. Google Local Services Ads (US/UK/…) [CHANGED 20 Oct 2025]**
- Onboard: all owners pass identity and criminal-history checks, and field workers who serve customers are included; checks vary by vertical (business, owner, service-professional checks); no credit pull; free to the business — [Google LSA screening requirements](https://support.google.com/localservices/answer/12174778); [Google background checks](https://support.google.com/localservices/answer/6226575).
- Trust UI: Google Guaranteed, Google Screened, License Verified by Google and the Money Back Guarantee were **replaced by a single "Google Verified" badge** from October 2025 — [Google Ads blog, Aug 2025](https://blog.google/products/ads-commerce/google-verified-august-2025/); [Search Engine Roundtable](https://www.seroundtable.com/google-verified-local-service-ads-badge-39975.html). Secondary sources report no financial guarantee attaches to the new badge.
- Standout: **one badge instead of four.** Google judged that multiple overlapping badges confused users.

**21. Yelp (US/global) [ACTIVE]**
- Match: "Message a business" became "Request a Quote" for eligible categories, with **response rate and response time shown publicly** — [BuzzFeed News](https://www.buzzfeednews.com/article/carolineodonovan/now-you-can-get-price-quotes-for-home-services-inside-yelp). April 2025: AI-scored "response quality" badges for service pros — [Business Wire, Yelp AI features](https://www.businesswire.com/news/home/20250429842302/en/yelp-introduces-new-ai-powered-features-to-streamline-hiring-service-pros-and-enhance-the-dining-experience).
- Reviews: 2025: about 22 million reviews; 70% recommended, 17% not recommended, 11% removed; nearly 2,000 accounts closed for review-exchange rings; 363 Suspicious Review Activity Alerts and 128 Compensated Activity Alerts placed — [Yelp 2025 Trust & Safety Report](https://www.businesswire.com/news/home/20260225039344/en/Yelp-Releases-2025-Trust-Safety-Report/). A **Consumer Alerts History** section lists past alerts on the business page — [Yelp 2024 Trust & Safety Report](https://www.businesswire.com/news/home/20250205544346/en).
- Standout: **public warning banners on profiles caught manipulating**, and a visible history of them.

**22. Airtasker (AU/UK/US) [ACTIVE; ID CHANGED Oct 2024]**
- Onboard: ID Verified badge via a third-party provider using government photo ID and, since October 2024, a live facial scan; Taskers can make offers without it but **must verify before payment is released**; three failed attempts flags the account — [Airtasker: why verify ID](https://support.airtasker.com/hc/en-us/articles/51706619657241-Why-do-I-need-to-verify-my-ID). Badges overview — [Airtasker badges](https://www.airtasker.com/blog/airtasker-badges/amp/).
- Book / Proof: once a Tasker is assigned the payment is **held in Airtasker Pay**; the customer releases it when satisfied — [Airtasker help](https://support.airtasker.com/hc/en-gb/articles/115012247667).
- Standout: **reverse auction** (customer posts task and budget, Taskers make offers) plus **customer-released escrow** as the completion signal.

**23. hipages (AU) [ACTIVE]**
- Onboard: hipages says it checks licences at sign-up and when tradies add licensed categories; customers can see licence numbers on profiles — [hipages reply on Trustpilot](https://ca.trustpilot.com/review/hipages.com.au).
- Reviews: consumer group Choice reported **only positive reviews are published** on hipages profiles — [Choice](https://www.choice.com.au/home-improvement/building-and-renovating/design-and-trades/articles/find-a-tradie-websites); repeated allegations on ProductReview — [ProductReview.com.au](https://www.productreview.com.au/listings/home-improvement-pages).
- Lesson: positive-only review display destroys credibility (Baymard: users seek negatives, see Section C).

**24. Oneflare (AU, Airtasker group) [ACTIVE]**
- Reviews: customers can review a business **hired outside Oneflare**, but for negative reviews Oneflare asks for the business's invoice as proof of hire; reviewers verify by email — [Oneflare: review outside Oneflare](https://help.oneflare.com.au/hc/en-au/articles/12709432917401-Can-I-leave-review-for-a-business-I-hired-outside-Oneflare). Reviews are vetted and usually posted within 24–48 h — [Oneflare: when will I see my review](https://help.oneflare.com.au/hc/en-au/articles/44612755427225-When-Will-I-See-the-Review-I-Left-for-a-Business).
- Onboard: blue-tick business verification against the Australian Business Register — [Oneflare business verification](https://help.oneflare.com.au/hc/en-au/articles/47180283194009-Why-Is-Business-Verification-Encouraged-on-Oneflare).
- Lesson: **asymmetric proof** (proof demanded only for negatives) tilts the record positive. Avoid.

**25. Fixter (UK car servicing) [ACTIVE]**
- Match / Price: collection and delivery of the car to a partner garage; extra-work quotes checked against "real time market data"; 12-month warranty (company claims, via review listings) — [Fixter on Trustpilot](https://ca.trustpilot.com/review/fixter.co.uk). In 2021 Fixter launched a free 20-minute **video consultation with an in-house mechanic** before booking — [Motor Equipment News via PressReader](https://www.pressreader.com/new-zealand/motor-equipment-news/20210901/281668258087278). Listed with The Motor Ombudsman (independent dispute body) — [Motor Ombudsman listing](https://businesses.themotorombudsman.org/view-garage/fixter-ltd).
- Lesson: complaints include price jumps after booking (one reviewer: about 85% higher), so **re-quote approval must be explicit** (same Trustpilot source).

### Inferences
- The platforms that can say "reviews only from real jobs" are the ones that hold the booking (TaskRabbit, Thumbtack, Airtasker, Urban Company, MyBuilder after agreement). Our MVP must own the job record from request to code entry, or reviews will be open to anyone.
- Every badge should say **what was checked, of whom, and when** (Thumbtack's owner-vs-worker caveat; Care.com's dated badge in Section B). Generic "vetted" or "screened" labels (HomeAdvisor, ServiceMagic, TaskRabbit ToS) are legally and reputationally risky.
- The best identity-at-the-door pattern found is Urban Company's arrival selfie. Combine it with a customer-held job code (Uber PIN, Section C).
- Guarantees everywhere are capped, time-boxed (14 days to 6 months) and need on-platform booking/payment. A Douala guarantee should be small and clear (e.g., a capped refund or a free redo by another verified artisan), not an open promise.

### Gaps
- TrustATrader: no verifiable source found (substituted).
- Ring Twice's current verification and payment-hold rules, Handy's background checks, Houzz's "Verified License" method and Porch's current vetting were not found.
- hipages's response to the Choice finding was not found.

---

## B. Gig, freelance and care platforms (8 entries)

### Takeaway
Shift and care platforms have the most mature **behavioural reliability scores**: rolling windows, explicit point penalties for no-shows and late cancels, monthly resets, and published thresholds. Freelance platforms (Upwork, Fiverr) show the risk of **opaque composite scores that use private feedback the worker cannot see or dispute**. Care platforms (Care.com, Rover) show **dated badges, annual re-checks and live job reports** (GPS walk maps, photo updates) as completion proof.

### Cited Findings

**26. Upwork [ACTIVE]**
- Trust UI: Top Rated requires a Job Success Score of at least 90%, consistent work with multiple clients and an identity-verified badge; eligibility updates every two weeks; Top Rated is the top 10% and Top Rated Plus the top 3% — [Upwork Top Rated and Rising Talent](https://support.upwork.com/hc/en-us/articles/211063568-Top-Rated-and-Rising-Talent). Identity verification may include digital or visual confirmation of a government ID, after which a blue badge appears — [How Upwork screens talent](https://www.upwork.com/resources/how-upwork-screens-talent).
- Reviews: freelancers and community guides say JSS draws on **private client feedback** that freelancers cannot see or dispute; not confirmed on Upwork's own pages — [Upwork community thread](https://community.upwork.com/t5/Freelancers/When-do-I-qualify-for-JSS-and-a-badge/m-p/902589/highlight/true).
- Lesson: private feedback reduces inflation (raters are franker) but feels arbitrary to workers. Fairwork's due-process principle ([prior notes 03] §7) argues for showing at least the reasons.

**27. Fiverr [ACTIVE; levels CHANGED c.2023–2025]**
- Trust UI: levels with published thresholds. One Fiverr page lists Level 1 = 5 orders, 3 unique clients, $400 earned, success score 5+, 80% response rate, 4.4 rating; Level 2 = 20 orders, 10 clients, $2,000, score 7+, 90% response, 4.6; Top Rated = 40 orders, 20 clients, $10,000, score 9+, 90% response, 4.7, **plus manual evaluation** — [Fiverr levels page](https://www.fiverr.com/cp/freelancers-levels-ratings); [Fiverr Achieving levels](https://help.fiverr.com/hc/en-us/articles/360010560118-Achieving-levels). A second Fiverr page gives different Level 1 numbers (conflict noted in sources).
- Standout: **"unique clients" as a threshold**, not just order count. This directly blunts repeat-buyer reputation farming.

**28. Care.com [ACTIVE]**
- Onboard: every individual caregiver must pass the Care.com Background Check (vendor Sterling/First Advantage) before interacting with families; annual criminal re-checks while active; families see a badge but not the report; families can buy an Enhanced check (caregiver must opt in); free continuous monitoring option — [Care.com Background Check](https://www.care.com/about/safety/background-checks/care-com-background-check).
- Standout: **the badge shows the date the check was run.**

**29. Rover [ACTIVE; check CHANGED Jan 2022]**
- Onboard: every new sitter and walker gets a third-party *enhanced* criminal background check; pre-2022 sitters may show an older standard check; profiles show "Verified Enhanced Background Check" — [Rover background checks](https://www.rover.com/background-checks/).
- Proof: photo and video updates during stays; **Rover Cards with GPS walk maps** and photo updates for walks, drop-ins and day care — [Rover safety](https://www.rover.com/safety/).
- Trust UI: listing cards show Star Sitter label, rating, review count and **repeat-client count** (listing pages via same results). Rover Guarantee reimburses eligible vet care up to $25,000 (same source).
- Standout: **repeat clients shown as a number**, a hard-to-fake loyalty signal.

**30. Wag! [ACTIVE]**
- Onboard: background check (Social Security trace, criminal, sex offender, global watch list per Wag); one-time, not continuous (secondary). In 2017 Wag's reported acceptance rate was 5% vs Rover's 15% — [Marketplace 2017](https://marketplace.org/2017/10/13/why-its-so-hard-qualify-dog-walker).
- Proof: GPS tracking and a **report card on every walk** (distance, time, photo, pee/poo, summary); owners then rate the walker 1–5 based on the report card — [Wag! about](https://wagwalking.com/about).
- Standout: **structured completion report the provider fills, which the rating is anchored to.**

**31. Instawork [ACTIVE]**
- Trust UI: reliability over a **rolling three months**; no-show = high impact (can suspend), late cancel under 24 h = medium, early cancel = low — [Instawork performance score](https://help.instawork.com/en/articles/6449818-understand-your-performance-score). Top Pro tiers bronze → silver → gold → platinum **reset monthly**; Gold/Platinum = 5+ shifts last month, 4+ quality rating, cancel/no-show under 1% — [Instawork: booking Top Pros](https://help.instawork.com/en/articles/5631566-how-can-i-book-instawork-top-pros). Vetting overview — [How are Instawork Pros vetted](https://help.instawork.com/en/articles/2062195-how-are-instawork-pros-vetted).
- Standout: businesses can offer a **"Top Pro booster" pay premium** only to Gold/Platinum, so reputation earns money directly.

**32. Shiftsmart [ACTIVE]**
- Trust UI: reliability is computed over the **last 50 shifts**; higher scores get first access to shifts; support cannot adjust scores manually; check in within 10 minutes of start for the on-time score — [Shiftsmart reliability and on-time scores](https://help.shiftsmart.com/hc/en-us/articles/28880908176788-Reliability-and-on-time-scores). Visibility also depends on background-check status, onboarding completion and store-specific bans — [Shiftsmart: why don't I see shifts](https://help.shiftsmart.com/hc/en-us/articles/29224379050516-Why-don-t-I-see-shifts).
- Standout: **reputation controls access order** (priority dispatch), not just display.

**33. Wonolo [ACTIVE]**
- Trust UI: "breaches": 1 point for withdrawing within 12 h of start, 1 for asking the requester to cancel, 3 for a no-show; 1st breach = 3-day notification block, 2nd = 7 days, 3rd = permanent; 1–2 points **reset after 30 days** — [Wonolo: breaches and badges](https://www.wonolo.com/blog/breaches-badges-and-what-they-mean-to-wonoloers). Workers press "Start" on site and "Complete" when done (same source).
- Standout: **a published, simple strike ladder with forgiveness.**

### Inferences
- For artisans, a **reliability strip** (on-time arrival %, no-show count, recent jobs) is as important as quality ratings, and much harder to fake because it comes from system events (code entered, check-in time), not opinions.
- Use Wonolo/Instawork-style **published penalty ladders with resets**, which match the due-process charter in [prior notes 03] §7.
- Fiverr's **unique-clients threshold** should gate every artisan tier.
- Wag/Rover show that a **provider-filled structured report** at completion (photos, what was done, materials) gives the customer something concrete to rate, which improves rating quality.

### Gaps
- Upwork's and Fiverr's own documentation on private feedback was not retrieved; claims rest on community sources.
- Rover's Star Sitter criteria were not found.
- Wonolo's geofenced clock-in rules were not found.

---

## C. Trust exemplars (17 entries)

### Takeaway
The exemplars supply the strongest individual mechanisms: **double-blind reviews with a fixed window** (Airbnb), **customer-held PIN to start a job** (Uber), **random selfie re-verification** (Uber), **no-rematch after a low rating** (Lyft), **one-way negative feedback to stop retaliation** (eBay), **"verified purchase" vs labelled incentivised reviews** (Amazon), **public penalty badges** (Tripadvisor, Yelp), **regulator-backed licence verification** (Doctolib), **friends-lend-first social underwriting** (Kiva), and **graded connection strength with penalties for lying** (BrightID). Vouching on Couchsurfing and endorsements on LinkedIn show how **cheap, unstaked vouches inflate and lose meaning**.

### Cited Findings

**34. Airbnb [ACTIVE]**
- Onboard: identity verification required for primary hosts, new co-hosts and booking guests; the badge "only means that they have provided information which has been validated" and is "not a guarantee"; changing name or removing ID can remove the badge — [Airbnb help: identity verification](https://www.airbnb.com/help/article/451). Unverified guests cannot book (2023) — [Airbnb newsroom](https://news.airbnb.com/an-update-on-identity-verification-on-airbnb/).
- Reviews: **14 days after checkout** for both parties; reviews publish when both have submitted or the window closes; edits allowed only until the other party submits; Airbnb does not pre-moderate — [Airbnb: how do reviews work](https://www.airbnb.com/help/article/13). The simultaneous-reveal experiment raised review rates and made reviews more candid — [Fradkin, Grewal & Holtz (SSRN)](https://papers.ssrn.com/abstract=2939064).
- Trust UI: Superhost is evaluated **quarterly** on the previous 365 days; thresholds per third-party guides are 4.8 rating, 90% response rate, under 1% cancellation and 10 stays (or 3 stays totalling 100 nights); co-host listings don't count — [Airbnb: how to become a Superhost](https://www.airbnb.com/help/article/829).
- Standout: **badge awarded only on fixed review dates**, which prevents gaming right before evaluation and gives predictable progress tracking on a dashboard.

**35. Uber [ACTIVE]**
- Book: optional **4-digit PIN** shown in the rider app while the driver is en route; the driver must enter it to start the trip; 5 attempts; riders can use it always or only at night — [Uber PIN verification](https://www.uber.com/us/en/blog/pin-verification-drivers).
- Onboard (ongoing): **Real-Time ID Check** randomly asks drivers for a selfie before going online, compared to the profile photo; mismatch triggers a temporary block while Uber investigates; drivers are asked to pull over if moving; in the UK drivers can choose human review and biometrics are deleted within 24 h — [Uber Real-Time ID Check](https://www.uber.com/us/en/blog/real-time-id-check/).
- Reviews: per-city minimum rating; average of last 500 rated trips — [Uber deactivation policy](https://www.uber.com/za/en/blog/driver-deactivation-policy/). Riders with low ratings can be deactivated since 2019 — [WEF](https://weforum.org/stories/2019/05/uber-will-start-deactivating-riders-with-low-ratings).
- Standout: **the customer holds the start code** — the cleanest "job code" pattern for our booking screen.

**36. Lyft [ACTIVE]**
- Reviews: if either party rates the other **3 stars or fewer, they won't be matched again**; consistently low ratings risk deactivation; low ratings for things outside the driver's control don't count — [Lyft ratings and cancellations](https://www.lyft.com/hub/posts/ratings-and-cancellations).
- Standout: **a low rating has an immediate, personal consequence (no rematch)** without needing to escalate, which reduces the urge to inflate or retaliate.

**37. BlaBlaCar [ACTIVE]**
- Trust UI: members can verify ID, phone and email; profiles show experience, and experienced members ("Ambassadors") attract more bookings (Wikipedia mirror; official tier names not confirmed) — [BlaBlaCar "Entering the trust age"](https://blog.blablacar.com/trust); [BlaBlaCar "In trust we trust"](https://newsroom.blablacar.com/inside-story/in-trust-we-trust). In India (2016) BlaBlaCar began verifying government IDs and said verified profiles get more requests — [Business Insider India](https://www.businessinsider.in/blablacar-india-government-verification/articleshow/53094130.cms).
- Standout: **experience level shown as part of the profile**, so a member's history on the platform is visible at a glance, alongside verified ID/phone/email. (BlaBlaCar's published trust framework is linked above but was not opened in this run; its exact wording is listed under Gaps.)

**38. Couchsurfing [ACTIVE; vouching DISCONTINUED c. Nov 2014]**
- History: a member needed **three vouches before they could vouch** for anyone else (2008 description) — [RISMedia 2008](https://www.rismedia.com/2008/10/02/getaways-have-couch-will-travel/). A study of the network found 6.8% of users had been vouched and 1.8% could vouch, and questioned whether vouches were given "too freely" without knowing someone in person — [Teng et al., USENIX WOSN 2010](https://static.usenix.org/events/wosn10/tech/full_papers/Teng.pdf). A Wikipedia mirror dates discontinuation to November 2014 (secondary). Couchsurfing's own article "Why Did Verification Change" exists but returned HTTP 403 — [Couchsurfing support](https://support.couchsurfing.org/hc/en-us/articles/50048546692507-Why-Did-Verification-Change).
- References are published only after both parties write them — [Couchers.org critique](https://couchers.org/issues/reviews). Critics (a competing nonprofit) argue the for-profit shift turned verification into a paid feature rather than a trust method (advocacy source, same site).
- Why vouching failed (inference from the above): vouches were free, permanent, unweighted and unaccountable; there was no penalty when a vouchee misbehaved; and density stayed tiny (under 7%), so it could not anchor most profiles.

**39. Vinted [ACTIVE]**
- Book / Proof: payment is held by the payment provider until the buyer receives the item and **taps "Mark as received"**; if the buyer doesn't, earnings release automatically after 2 days — [Vinted help centre](https://www.vinted.co.uk/help/1147).
- Reviews: **automatic positive feedback** for the seller if the buyer leaves none within four days (unless a complaint is open); **automatic negative feedback** for sellers whose orders auto-cancel for late shipping; buyer protection only for purchases through Vinted checkout — [Vinted help centre](https://www.vinted.co.uk/help/730).
- Lesson: auto-positive counts silence as success, the opposite of eBay's "effective percent positive" finding ([prior notes 03] §4). Auto-negative for platform-detected failure is a good pattern.

**40. Etsy [ACTIVE]**
- Trust UI: Star Seller requires 95%+ replies to first messages within 24 h, 4.8+ average review rating over 3 months, and on-time shipping with tracking; messages metric is skipped if no messages arrive; eligibility reviewed on the 1st of each month — [Etsy Seller Handbook: Star Seller](https://www.etsy.com/seller-handbook/article/1020956976086); [Etsy: track your progress](https://help.etsy.com/hc/articles/29665255990039).
- Standout: **progress meters per criterion** in the seller dashboard, so sellers can see which bar they miss.

**41. eBay [ACTIVE; feedback CHANGED May 2008]**
- Reviews: since May 2008 sellers can leave **only positive feedback for buyers**, to stop retaliation; Detailed Seller Ratings (2007) are anonymous 12-month averages; after the change negative feedback fell about 50% and low DSRs fell 19% — [Klein, Lambertz & Stahl, CEPR DP9501](https://repec.cepr.org/repec/cpr/ceprdp/DP9501.pdf); [Toolhaus FAQ](https://toolhaus.org/negs-faq.html). Median seller shows 100% positive while "effective percent positive" is about 67% — [Nosko & Tadelis, NBER](https://www.nber.org/papers/w20830).
- Lesson: removing the retaliation channel works, but then the score inflates; count silence.

**42. Amazon [ACTIVE]**
- Reviews: Verified Purchase only when Amazon confirms the reviewer bought on Amazon at a price available to most shoppers; unverified reviews still appear but carry less weight; incentivised reviews banned except through **Vine**, an invite-only programme whose reviews carry a separate Vine label; sellers may not contact Vine reviewers — [Amazon: trusted review experience](https://trustworthyshopping.aboutamazon.com/how-amazon-maintains-a-trusted-review-experience). Amazon blocked over 275 million suspected fake reviews in 2024 and sued brokers — [About Amazon](https://www.aboutamazon.com/news/policy-news-views/amazons-latest-actions-against-fake-review-brokers-2024).
- Standout: **label every review with its provenance** (verified / incentivised / unverified) and weight accordingly.

**43. Trustpilot [ACTIVE]**
- Reviews: "Verified" label when Trustpilot can confirm a business interaction; it does not verify the claims; invitations can be wired into order or CRM systems; invited reviews get the same fraud checks; negative reviews cannot be hidden; cherry-picking invitations is banned; "Transparent Inviting" shows the split of invited vs organic reviews — [How Trustpilot works](https://au.corporate.trustpilot.com/trust/how-trustpilot-works). 2024: 4.5 million fake reviews removed (7.4% of submissions); "consumer warnings" hide the TrustScore and close the profile to new reviews — [Trustpilot Trust Report 2025](https://corporate.trustpilot.com/trust/trust-report-2025).
- Standout: **showing the invited/organic split** on the profile.

**44. Tripadvisor [ACTIVE]**
- Reviews: three layers: auto-detection, human review, community reports; in 2024 about 7% of submissions were auto-rejected and 5% flagged for human review; 244,000 member disputes, of which 72% stayed up; 2.7 million fraudulent reviews blocked; about 9,000 businesses warned for incentivised reviews — [Tripadvisor 2025 Transparency Report](https://tripadvisor.mediaroom.com/2025-03-18-Tripadvisors-2025-Transparency-Report-reveals-strong-review-submissions-and-improved-fraud-detection).
- Disputes / penalties: escalation ladder: content removal → ranking penalty → **red penalty badge** on the listing for persistent fraud (341 red badges vs 33,000+ ranking penalties in 2022, per secondary summary); one owner said no warning was received — [PhocusWire](https://www.phocuswire.com/TripAdvisor-slaps-Red-Badge-on-hotel-for-writing-own-reviews).
- Standout: **graduated, public sanctions** and a published annual transparency report.

**45. LinkedIn [ACTIVE; Skill Assessments DISCONTINUED 2024]**
- Skill endorsements: 1st-degree connections can endorse listed skills with one tap; members can hide endorsements or turn them off — [LinkedIn: skill endorsements](https://www.linkedin.com/help/linkedin/answer/31888).
- Skill Assessments (quiz badges) were discontinued and badges removed in 2024; LinkedIn said hirers find examples of how a candidate applied skills more valuable — [LinkedIn: Skill Assessments no longer available](https://www.linkedin.com/help/learning/answer/a1690529).
- Lesson: **one-tap, reciprocal, costless endorsements inflate** (not quantified in a source found here), and even LinkedIn moved from tests to **evidence of applied work**. Our equivalent is job-anchored proof, not peer "+1"s.

**46. Doctolib (France/Germany/Italy) [ACTIVE; verification CHANGED Aug 2022]**
- Onboard: after the 2022 fake-practitioner scandal, Doctolib said **no booking can happen before the practitioner's right to practise is verified**, checked against RPPS/ADELI numbers with regional health agencies (ARS) and professional orders — [Doctolib press release, Aug 2022](https://media.doctolib.com/image/upload/mkg/file/220825_CP_-_Doctolib_renforce_ses_proc%C3%A9dures_de_v%C3%A9rification_des_professionnels_r%C3%A9f%C3%A9renc%C3%A9s_sur_son_site.pdf). About 5,700 wellness practitioners without RPPS/ADELI were removed — [Le Quotidien du Médecin](https://www.lequotidiendumedecin.fr/actus-medicales/esante/naturopathes-hypnotherapeutes-sophrologues-doctolib-fait-le-menage-et-exclut-les-5-700-praticiens).
- Reviews: no public star ratings; the co-founder said there were no plans to add reviews of practitioners (press statement, not a formal ban; same results).
- Standout: **"not bookable until verified"** — verification gates the booking button, not just a badge.

**47. Zocdoc (US) [ACTIVE]**
- Reviews: "Verified patient" reviews come only from patients who booked through Zocdoc, submitted while logged in or via an emailed link; Zocdoc says it only posts reviews from patients who attended; partner-sourced reviews are labelled "Source: Partner"; provider-submitted supplemental reviews carry neither label; critical reviews are not removed for being negative — [Zocdoc reviews FAQ](https://www.zocdoc.com/patient-help/en/articles/8797278-reviews-faqs); [Zocdoc verified reviews](https://zocdoc.com/about/verifiedreviews/).
- Standout: **three explicit provenance labels** on reviews.

**48. Kiva (social underwriting) [ACTIVE]**
- Vouching: **Trustees** (organisations or individuals) write short endorsements explaining why they back a borrower; now optional in the US — [Kiva: what is social underwriting](https://www-1.kiva.org/blog/what-is-social-underwriting). **Private Fundraising Period**: from January 2013, US borrowers had to recruit friends and family as lenders before the loan went public; the required number ranges 0–40 depending on loan size, social impact and **whether a Trustee endorsed** — [Kiva direct loans due diligence](https://kiva.org/about/due-diligence/direct-loans); [Kiva US FAQ](https://kiva.org/lp/faq-kiva-us-crowdfunding-faqs).
- Standout: **vouchers put something at stake (their own money or name) before the public sees the profile**, and a trusted endorsement reduces the number of peer vouches needed.

**49. BrightID (incl. Aura) [ACTIVE, small]**
- Vouching UI: when connecting, users choose **"already known", "just met" or "suspicious"**; many verification algorithms weight "already known" much more; choosing "already known" for strangers "might compromise your verification" — [BrightID connection levels](https://brightid.gitbook.io/brightid/connection-levels). Forum proposals penalise people who pick "already known" when the other side picks "just met" — [BrightID forum](https://forum.brightid.org/t/prevent-reduce-detect-fake-already-know-connections/29). Aura verification requires a positive honesty rating from Aura players who already know the user, and asks for no government ID — [Aura](https://aura.brightid.org/).
- Standout: **graded relationship strength chosen at vouch time, with cross-checking between the two sides.**

**50. Gitcoin Passport / Human Passport [ACTIVE, renamed]**
- Vouching UI: "Stamps" (verifiable credentials) each carry a fixed weight; the score is the sum; stamps expire after 90 days; recommended "unique human" threshold 20 — [Human Passport stamp weights](https://support.passport.human.tech/stamps/stamp-weights); [Gitcoin: how the score is calculated](https://support.gitcoin.co/gitcoin-knowledge-base/gitcoin-passport/common-questions/how-is-gitcoin-passports-score-calculated).
- Standout: **a visible stamp wallet with weights and expiry**, so users see exactly which proofs add how much and when they lapse.

**Cross-platform UX research used in synthesis**
- 53% of users in Baymard testing actively sought out negative reviews; negative reviews increase trust in the overall rating — [Baymard: respond to negative reviews](https://baymard.com/blog/respond-to-negative-user-reviews).
- Users rely on the ratings distribution summary more than on individual reviews, and 90% of those seeking specific ratings tried to click the distribution to filter — [Baymard: rating distribution summary](https://baymard.com/blog/user-ratings-distribution-summary).
- Users prefer products with many ratings over perfect ratings from a few — [Baymard: user perception of ratings](https://baymard.com/blog/user-perception-of-product-ratings).
- Switching a home-services platform from 5 stars to thumbs up/down eliminated a racial earnings gap — [Rice University / Nature 2025](https://news.rice.edu/news/2025/racial-earning-gap-gig-work-eliminated-through-new-rating-system).
- Google pauses new reviews on a profile during a fake-review spike and shows a banner explaining the pause — [Google Maps blog](https://blog.google/products-and-platforms/products/maps/how-google-maps-protects-against-fake-content/).
- Lynk (Kenya) found platform-level guarantees and upfront pricing helped new Pros more than public ratings did — [The Flip: Lynk lessons](https://theflip.africa/newsletter/lynk-lessons-learned-the-hard-way/).

### Inferences
- Couchsurfing and LinkedIn show what happens to **unstaked** vouching. Kiva and BrightID show the fixes: **limited, weighted, accountable vouches that are cross-checked**. Human Passport adds **expiry**. Our vouching screen should combine all four.
- The Uber PIN + Urban Company arrival selfie + Airtasker/Vinted customer-release escrow together form a strong "job code" chain that a low-end Android phone and a feature-phone SMS can both support.
- Airbnb (double-blind 14 days), eBay (no seller-side negatives) and Lyft (no rematch) are three distinct anti-retaliation tools. For two-sided artisan/customer rating, double-blind plus no-rematch is the best fit. eBay's one-way rule would leave artisans unprotected from abusive customers ([prior notes 03] §7).

### Gaps
- Couchsurfing's official reason for removing vouching (support article blocked, HTTP 403).
- BlaBlaCar's current experience-level names and badge wording, and the content of its "trust age" framework page (not opened).
- Current Tripadvisor red-badge duration and visibility rules.
- No Nielsen Norman Group article was retrieved; no Mobbin/PageFlows screens were accessible.

---

## D. Synthesis: top 30 patterns to adopt, mapped to our 10 screens (researcher's synthesis)

### Takeaway
Build every trust signal from **system-observed events on a verified job** (code entered, arrival selfie, photos captured in-app, escrow released) rather than from opinions alone. Then show it in a few honest, dated, provenance-labelled numbers. Screens below use: S1 artisan onboarding, S2 vouching, S3 trust profile card, S4 request flow, S5 match results, S6 booking with job code, S7 completion proof, S8 two-sided rating, S9 dispute, S10 admin/fraud console.

### Cited Findings
Each pattern names its source platforms (findings in Sections A–C).

**S1 Artisan onboarding**
1. **Step checklist with a progress meter and a numbered public list of checks** ("5 checks: phone, ID + selfie, payout wallet name match, 2 vouches, 1 proof job"). From Checkatrade's "12 checks" ([Checkatrade](https://www.checkatrade.com/blog/trust/)) and Etsy's per-criterion progress ([Etsy](https://help.etsy.com/hc/articles/29665255990039)).
2. **Not bookable until verified**: the profile can be drafted, but the "Book" button stays hidden until ID + vouch + proof are done. From Doctolib ([Doctolib 2022](https://media.doctolib.com/image/upload/mkg/file/220825_CP_-_Doctolib_renforce_ses_proc%C3%A9dures_de_v%C3%A9rification_des_professionnels_r%C3%A9f%C3%A9renc%C3%A9s_sur_son_site.pdf)).
3. **Payout identity must match ID** (MoMo account name = CNI name) and is required before the first payout. From Airtasker's "verify before payment release" ([Airtasker](https://support.airtasker.com/hc/en-us/articles/51706619657241-Why-do-I-need-to-verify-my-ID)) and Yoojo's bank-account check ([Yoojo](https://ca.trustpilot.com/review/yoojo.fr)).
4. **Practical skill check by a trade master, in person or recorded**, before the "Skill checked" badge. From Helpling's face-to-face meeting ([Helpling SG](https://www.helpling.com.sg/?p=5141)) and Urban Company's skills tests ([Urban Company](https://www.urbancompany.com/blog/setting-up-service-partners-for-success-upskilling-at-urban-company)).
5. **Signed code-of-conduct pledge** (price as agreed, no off-app deposits, respect). From Porch Pledge ([Porch](https://www.globenewswire.com/news-release/2015/09/22/770042/0/en/Porch-com-Unveils-the-Porch-Guarantee-as-Demand-for-Home-Services-Surges.html)).

**S2 Vouching**
6. **Graded vouch type at the moment of vouching**: "I trained/worked with them", "I hired them", "I know them from my quarter", "Just met". Weight differs by type. From BrightID ([BrightID](https://brightid.gitbook.io/brightid/connection-levels)).
7. **Vouchers must themselves be verified and have a limited vouch budget**; new members cannot vouch until established. From Couchsurfing's 3-vouch rule ([RISMedia](https://www.rismedia.com/2008/10/02/getaways-have-couch-will-travel/)) and Kiva Trustees ([Kiva](https://www-1.kiva.org/blog/what-is-social-underwriting)).
8. **Accountable vouch with a written one-line reason** shown on the profile ("Master tailor Ngo, Akwa: trained him 2019–2022"). From Kiva endorsements ([Kiva](https://www-1.kiva.org/blog/what-is-social-underwriting)).
9. **A trusted anchor reduces how many peer vouches are needed** (association head vouch = 1 needed; otherwise 3 peers). From Kiva's PFP size depending on Trustee endorsement ([Kiva due diligence](https://kiva.org/about/due-diligence/direct-loans)).
10. **Stamp wallet with weights and expiry** (vouches expire after 12 months unless renewed; the artisan sees which proofs add how much). From Human Passport ([stamp weights](https://support.passport.human.tech/stamps/stamp-weights)).

**S3 Trust profile card**
11. **Badges that state what, who and when** ("ID checked: owner, 03/2026"). From Care.com's dated badge ([Care.com](https://www.care.com/about/safety/background-checks/care-com-background-check)) and Thumbtack's owner-only caveat ([Thumbtack](https://www.thumbtack.com/safety)).
12. **One consolidated "Verified" mark with a tap-to-expand breakdown**, not four overlapping badges. From Google Verified ([Google](https://blog.google/products/ads-commerce/google-verified-august-2025/)).
13. **Per-trade counts and reviews** ("38 verified plumbing jobs"). From TaskRabbit ([TaskRabbit](https://support.taskrabbit.com/hc/articles/360050012971)).
14. **Repeat-customer count and unique-customer count** next to job count. From Rover repeat clients ([Rover](https://www.rover.com/safety/)) and Fiverr unique clients ([Fiverr](https://www.fiverr.com/cp/freelancers-levels-ratings)).
15. **Reliability strip**: on-time %, no-shows in last 90 days, response time. From Instawork, Shiftsmart, Yelp response time ([Instawork](https://help.instawork.com/en/articles/6449818-understand-your-performance-score); [Shiftsmart](https://help.shiftsmart.com/hc/en-us/articles/28880908176788-Reliability-and-on-time-scores); [BuzzFeed/Yelp](https://www.buzzfeednews.com/article/carolineodonovan/now-you-can-get-price-quotes-for-home-services-inside-yelp)).
16. **Rating distribution summary including negatives, tappable to filter**. From Baymard ([Baymard](https://baymard.com/blog/user-ratings-distribution-summary)).
17. **Neighbour line** ("4 people in Bonamoussadi hired him"). From Nextdoor Faves ([Nextdoor](https://blog.nextdoor.com/small-business-improvements)).
18. **Tier badges evaluated on fixed dates with a published threshold**, reset or re-earned periodically. From Airbnb quarterly Superhost ([Airbnb](https://www.airbnb.com/help/article/829)), Etsy monthly ([Etsy](https://www.etsy.com/seller-handbook/article/1020956976086)), Instawork monthly reset ([Instawork](https://help.instawork.com/en/articles/5631566-how-can-i-book-instawork-top-pros)).

**S4 Request flow**
19. **Short guided questions per trade, then a choice of two lanes**: fixed-price "book now" for standard jobs, "get up to 3 quotes" for others. From Angi ([Block Renovation](https://www.blockrenovation.com/guides/angi-vs-thumbtack)) and Bark ([Bark](https://help.bark.com/hc/en-us/articles/13201889420060-How-Bark-Works)).
20. **Request check before broadcast and a cap on responders** (max 3), so artisans aren't flooded and customers aren't spammed. From StarOfService ([StarOfService](https://www.starofservice.co.uk/pro/how-it-works)).
21. **Optional short video/voice call with the artisan before booking** for diagnosis. From Fixter video consult ([Fixter](https://www.pressreader.com/new-zealand/motor-equipment-news/20210901/281668258087278)).

**S5 Match results**
22. **Rank by verified reliability and fit, give fair rotation to new verified artisans, and show price upfront on each card.** From TaskRabbit upfront rates ([TaskRabbit](https://support.taskrabbit.com/hc/en-us/articles/210861763)), Shiftsmart priority access ([Shiftsmart](https://help.shiftsmart.com/hc/en-us/articles/28880908176788-Reliability-and-on-time-scores)), Lynk cold start ([The Flip](https://theflip.africa/newsletter/lynk-lessons-learned-the-hard-way/)).
23. **Never re-show an artisan a customer rated negatively, and vice versa.** From Lyft ([Lyft](https://www.lyft.com/hub/posts/ratings-and-cancellations)).

**S6 Booking with job code**
24. **Customer-held start code (4 digits) that the artisan enters on arrival**, with limited attempts; SMS fallback. From Uber PIN ([Uber](https://www.uber.com/us/en/blog/pin-verification-drivers)).
25. **Arrival selfie by the artisan matched to the verified profile** (catches job handover). From Urban Company ([Urban Company](https://www.urbancompany.com/blog/urban-company-strengthens-safety-protocol-using-microsoft-azure-cognitive-services)) and Uber Real-Time ID Check ([Uber](https://www.uber.com/us/en/blog/real-time-id-check/)).
26. **Deposit held in escrow, released by the customer's "work done" confirmation**, with automatic release after a short window if the customer is silent and no dispute is open. From Airtasker Pay ([Airtasker](https://support.airtasker.com/hc/en-gb/articles/115012247667)) and Vinted ([Vinted](https://www.vinted.co.uk/help/1147)).

**S7 Completion proof**
27. **Structured completion report**: in-app before/after photos, what was done, materials, final price vs quoted price, with any price change requiring customer approval. From Wag report card ([Wag](https://wagwalking.com/about)), Rover Cards ([Rover](https://www.rover.com/safety/)), Fixter price complaints ([Fixter](https://ca.trustpilot.com/review/fixter.co.uk)).

**S8 Two-sided rating**
28. **Double-blind, fixed window (7 days), thumbs + tags, both directions, provenance label on every review** ("Verified job · code entered"). From Airbnb ([Airbnb](https://www.airbnb.com/help/article/13)), Rice/Nature binary ([Rice](https://news.rice.edu/news/2025/racial-earning-gap-gig-work-eliminated-through-new-rating-system)), Zocdoc/Amazon labels ([Zocdoc](https://www.zocdoc.com/patient-help/en/articles/8797278-reviews-faqs); [Amazon](https://trustworthyshopping.aboutamazon.com/how-amazon-maintains-a-trusted-review-experience)).

**S9 Dispute**
29. **Staged dispute: report within a set window → platform mediates → independent assessor (association master) → capped remedy (refund from escrow or free redo).** From Checkatrade ([Checkatrade](https://www.checkatrade.com/guarantee-terms)), Thumbtack time limits ([Thumbtack](https://thumbtack.com/guarantee)), Helpling tiered damage ([Helpling DE](https://www.helpling.de/?p=15452)).

**S10 Admin/fraud console**
30. **Graduated, public sanctions plus a transparency page**: warning → ranking penalty → public alert banner → review freeze → removal, with alert history visible on the profile and a published annual count. From Tripadvisor ([Tripadvisor](https://tripadvisor.mediaroom.com/2025-03-18-Tripadvisors-2025-Transparency-Report-reveals-strong-review-submissions-and-improved-fraud-detection); [PhocusWire](https://www.phocuswire.com/TripAdvisor-slaps-Red-Badge-on-hotel-for-writing-own-reviews)), Yelp alerts ([Yelp](https://www.businesswire.com/news/home/20250205544346/en)), Trustpilot consumer warnings ([Trustpilot](https://corporate.trustpilot.com/trust/trust-report-2025)), Google review pause ([Google](https://blog.google/products-and-platforms/products/maps/how-google-maps-protects-against-fake-content/)), Wonolo strike ladder ([Wonolo](https://www.wonolo.com/blog/breaches-badges-and-what-they-mean-to-wonoloers)).

### Inferences
**Screen-level build notes for the implementing model (synthesis, not tested):**
- **S1 Onboarding** (5 steps, progress ring): phone OTP → CNI/récépissé photo + live selfie → MoMo name match → trade + 3 portfolio photos captured in-app → request vouches. Show "Not yet bookable: 2 of 5 checks left". Field-agent or association visit can complete the skill step.
- **S2 Vouching**: the voucher opens a link/USSD code, confirms their own verified identity, picks a relationship type (pattern 6), writes or records a one-line reason (8), and sees "You have 3 of 5 vouches left; if [name] commits fraud, your vouching rights are paused." Require at least two different relationship types (trade + quarter), per [prior notes 03] §3.
- **S3 Trust card** (top to bottom): photo + trade pictogram; single Verified mark (tap → dated checklist); "38 verified jobs · 21 customers · 9 came back"; thumbs share shown as a conservative lower bound; reliability strip; neighbour line; latest 3 in-app job photos; vouchers with reasons; any alert banner. No paid placement inside the card.
- **S6 Booking**: confirmation screen shows the artisan's face, a large 4-digit code "Give this code only when [name] is at your door", the agreed price and deposit held. Artisan screen shows "Enter customer code" and a selfie button.
- **S7–S8**: completion report → customer "Work done / Problem" → escrow release or dispute → double-blind rating prompt to both sides with tags; reviews reveal together.
- **S10 Console** queues: duplicate faces, same-device clusters, vouch rings, reviewer-set overlap (from [prior notes 04] §2), price-change disputes, no-show strikes, and an "alerts issued" log that feeds the public transparency page.

### Gaps
- None of these patterns has been tested with Douala artisans or customers. Low-literacy versions (icons, voice) are covered in [prior notes 03] §5 but not validated.
- No source confirms how well arrival-selfie or PIN flows work on low-end Android phones or over SMS-only fallback in Cameroon.

---

## E. Ten anti-patterns to avoid, mapped to screens (researcher's synthesis)

### Takeaway
The commonest failures are badges that overstate what was checked, reputation that can be bought or farmed, positive-only or asymmetric review handling, and opaque penalties.

### Cited Findings
1. **Paid verification badge** (S3). Bark Verified is a paid add-on ([Bark](https://help.bark.com/hc/en-us/articles/13344504555676-What-is-Bark-Verified)); Houzz's Innovator tier requires paid software ([Houzz](https://pro.houzz.com/pro-learn/blog/best-of-houzz---a-guidebook)). Never sell trust marks.
2. **Vague "vetted/screened" labels** with no list of checks (S1, S3). HomeAdvisor/ServiceMagic "pre-screened" ([archived page](https://webcf.waybackmachine.org/web/20150823134810/http://www.homeadvisor.com/servicemagic)); TaskRabbit ToS says labels guarantee nothing ([TaskRabbit](https://support.taskrabbit.com/hc/en-us/articles/207813543-Overview-of-Trust-and-Safety)).
3. **Owner-only checks presented as if they cover the worker at the door** (S3, S6). Thumbtack and Angi check only the owner ([Thumbtack](https://www.thumbtack.com/safety); [Angi](https://www.angi.com/how-it-works.htm)).
4. **Positive-only or asymmetric review publishing** (S8). hipages reportedly publishes only positives ([Choice](https://www.choice.com.au/home-improvement/building-and-renovating/design-and-trades/articles/find-a-tradie-websites)); Oneflare demands proof only for negative reviews ([Oneflare](https://help.oneflare.com.au/hc/en-au/articles/12709432917401-Can-I-leave-review-for-a-business-I-hired-outside-Oneflare)).
5. **Reviews for jobs not done through the platform** (S8). Oneflare allows outside-hire reviews ([Oneflare](https://help.oneflare.com.au/hc/en-au/articles/12709432917401-Can-I-leave-review-for-a-business-I-hired-outside-Oneflare)); MyBuilder's terms allow "previous customers" feedback ([MyBuilder T&Cs](https://www.mybuilder.com/assets/en_GB/MB-Terms-and-Conditions-Feb-26-2024.pdf)).
6. **Auto-positive feedback for silence** (S8). Vinted ([Vinted](https://www.vinted.co.uk/help/730)); contradicts eBay EPP evidence ([NBER](https://www.nber.org/papers/w20830)). Show "confirmed jobs, rated jobs" separately instead.
7. **Free, permanent, unaccountable vouches/endorsements** (S2). Couchsurfing vouching ([Teng et al.](https://static.usenix.org/events/wosn10/tech/full_papers/Teng.pdf)); LinkedIn one-tap endorsements ([LinkedIn](https://www.linkedin.com/help/linkedin/answer/31888)).
8. **Pay-per-lead / pay-per-quote economics that reward volume over fit** (S4, S5). HomeAdvisor FTC order on lead claims ([FTC](https://search.ftc.gov/legal-library/browse/cases-proceedings/1923106-homeadvisor-matter)); Rated People and Bark lead-quality complaints ([Rated People](https://uk.trustpilot.com/review/ratedpeople.com); [Bark G2](https://g2.com/products/bark-com/reviews?page=5)).
9. **Opaque scores built on feedback the worker cannot see or contest** (S8, S10). Upwork private feedback (community sources: [Upwork community](https://community.upwork.com/t5/Freelancers/When-do-I-qualify-for-JSS-and-a-badge/m-p/902589/highlight/true)); Shiftsmart support "cannot manually adjust scores" ([Shiftsmart](https://help.shiftsmart.com/hc/en-us/articles/28880908176788-Reliability-and-on-time-scores)). Pair every score with reasons and an appeal.
10. **Guarantees that are hard to claim or quietly shrink** (S9). Thumbtack cut from $1 million to $100,000 with exclusions ([Thumbtack](https://thumbtack.com/guarantee)); Google dropped its money-back guarantee in 2025 ([SER](https://www.seroundtable.com/google-verified-local-service-ads-badge-39975.html)); Frizbiz/Yoojo refund and insurance complaints ([Frizbiz](https://www.trustpilot.com/review/www.frizbiz.com); [Yoojo](https://gowork.fr/yoojo-ex-youpijob-paris/5)). Promise less, pay fast.

### Inferences
- Anti-patterns 1, 4, 5 and 6 each let reputation be bought or inflated, which our brief explicitly rules out. They should be treated as hard design constraints, not preferences.
- Anti-pattern 9 conflicts with a fraud console's need for secrecy. Compromise: keep detection signals private but always tell the artisan *which rule* was triggered and how to appeal.

### Gaps
- No quantitative study found on endorsement inflation on LinkedIn specifically.
- Guarantee claim approval rates are not published by any platform reviewed.

---

## Numbered source list

1. TaskRabbit, Overview of Trust and Safety — https://support.taskrabbit.com/hc/en-us/articles/207813543-Overview-of-Trust-and-Safety
2. TaskRabbit, Identity Verification Process — https://support.taskrabbit.com/hc/articles/115005156463
3. TaskRabbit, Happiness Pledge — https://support.taskrabbit.com/hc/articles/360035570011
4. TaskRabbit UK blog, Happiness Pledge for Taskers — https://www.taskrabbit.co.uk/blog/?p=14299
5. TaskRabbit, How do I know which Tasker is best — https://support.taskrabbit.com/hc/articles/360050012971
6. TaskRabbit, How do I hire a Tasker — https://support.taskrabbit.com/hc/en-us/articles/210861763
7. Thumbtack, Smart Hiring / Safety — https://www.thumbtack.com/safety
8. Thumbtack Guarantee — https://thumbtack.com/guarantee
9. GlobeNewswire, Thumbtack $1 Million Guarantee (2016) — https://www.globenewswire.com/news-release/2016/08/09/1102035/0/en/Thumbtack-Announces-1-Million-Guarantee.html
10. Jobber Academy, Thumbtack for contractors — https://getjobber.com/academy/thumbtack-for-contractors/
11. Angi, How it works — https://www.angi.com/how-it-works.htm
12. Angi, Pro eligibility requirements — https://intercom.help/angi/en/articles/9269408-pro-eligibility-requirements
13. Bob Vila, Angi review — https://www.bobvila.com/articles/angi-review
14. WTHR 13 Investigates, Angi/HomeAdvisor background checks — https://www.wthr.com/article/news/investigations/13-investigates/what-to-know-online-services-refer-home-contractors-angi-homeadvisor-background-check-felon-certified/531-4beab2c1-4fcd-4161-868d-7a2a65cc8e5e
15. Block Renovation, Angi vs Thumbtack — https://www.blockrenovation.com/guides/angi-vs-thumbtack
16. FTC, HomeAdvisor matter — https://search.ftc.gov/legal-library/browse/cases-proceedings/1923106-homeadvisor-matter
17. Search Engine Journal, HomeAdvisor penalized by FTC — https://www.searchenginejournal.com/homeadvisor-penalized-by-ftc-for-alleged-false-claims-about-leads/486906/
18. Archived Angi/HomeAdvisor/Handy terms (2021) — https://webcf.waybackmachine.org/web/20230219124058/https://homeadvisor.pactsafe.io/versions/62865215d0ae5213a88a7a71.pdf
19. Checkatrade, trust page — https://www.checkatrade.com/blog/trust/
20. Checkatrade, Reviews you can trust — https://www.checkatrade.com/blog/expert-advice/reviews-you-can-trust
21. Checkatrade, Guarantee terms — https://www.checkatrade.com/guarantee-terms
22. inkl (Guardian), How do rogue traders get past Checkatrade's checks — https://inkl.com/news/how-do-rogue-traders-get-past-checkatrade-s-checks
23. MyBuilder, archived FAQ finding builders (2022) — https://webcf.waybackmachine.org/web/20220817033755/https://www.mybuilder.com/help/faq-finding-builders
24. MyBuilder, Terms and Conditions Feb 2024 — https://www.mybuilder.com/assets/en_GB/MB-Terms-and-Conditions-Feb-26-2024.pdf
25. Rated People on Trustpilot — https://uk.trustpilot.com/review/ratedpeople.com
26. Rated People blog — https://www.ratedpeople.com/blog/?p=48629
27. Urban Company, safety protocol with Azure — https://www.urbancompany.com/blog/urban-company-strengthens-safety-protocol-using-microsoft-azure-cognitive-services
28. Urban Company, upskilling service partners — https://www.urbancompany.com/blog/setting-up-service-partners-for-success-upskilling-at-urban-company
29. Bark, How Bark works — https://help.bark.com/hc/en-us/articles/13201889420060-How-Bark-Works
30. Bark, What is Bark Verified — https://help.bark.com/hc/en-us/articles/13344504555676-What-is-Bark-Verified
31. G2, Bark.com reviews — https://g2.com/products/bark-com/reviews?page=5
32. Houzz Pro Learn, Best of Houzz guidebook — https://pro.houzz.com/pro-learn/blog/best-of-houzz---a-guidebook
33. Houzz forum, Best of Houzz 2018 — https://www.houzz.com/discussions/5136508/best-of-houzz-2018
34. GlobeNewswire, Porch Guarantee (2015) — https://www.globenewswire.com/news-release/2015/09/22/770042/0/en/Porch-com-Unveils-the-Porch-Guarantee-as-Demand-for-Home-Services-Surges.html
35. TechCrunch, Porch guarantee (2015) — https://techcrunch.com/2015/09/22/porch-now-guarantees-work-done-by-home-professionals/
36. Axios, Angie's List parent acquires Handy — https://www.axios.com/2018/10/11/angies-list-parent-company-acquires-handy
37. App Store, Frizbiz (now Ring Twice) — https://apps.apple.com/fr/app/frizbiz/id1071087083
38. Trustpilot, Frizbiz — https://www.trustpilot.com/review/www.frizbiz.com
39. StarOfService, How it works (pros) — https://www.starofservice.co.uk/pro/how-it-works
40. StarOfService, reviews — https://starofservice.co.uk/reviews
41. Trustpilot, Yoojo — https://ca.trustpilot.com/review/yoojo.fr
42. Gowork, Yoojo reviews — https://gowork.fr/yoojo-ex-youpijob-paris/5
43. Helpling Singapore, our cleaners — https://www.helpling.com.sg/?p=5141
44. Helpling Ireland support, who are the service providers — https://ie.support.helpling.com/en/support/solutions/articles/15000029654-who-are-the-service-providers-and-how-can-i-find-one-that-suits-my-needs-
45. Helpling Germany, customer FAQ — https://www.helpling.de/?p=15452
46. TechCrunch, Hassle merges with Helpling — https://techcrunch.com/2015/07/02/hassle-helpling-merger/
47. Fora.ie, Hassle rebrand — https://fora.ie/hassle-rebrand-name-change-3420282-Jun2017/
48. IAC, ServiceMagic relaunched as HomeAdvisor — https://iac.com/press-releases/iac-relaunches-servicemagic-as-homeadvisor-the-next-generation-of-online-solutions-for-home-improvement-and-repair-projects
49. Archived HomeAdvisor ServiceMagic page — https://webcf.waybackmachine.org/web/20150823134810/http://www.homeadvisor.com/servicemagic
50. Nextdoor blog, Local Faves — https://blog.nextdoor.com/small-business-improvements
51. Nextdoor blog, Introducing Faves — https://blog.nextdoor.com/introducing-faves-harnessing-the-collective-wisdom-of-your-neighborhood
52. Nextdoor Business, 2024 Neighborhood Faves — https://business.nextdoor.com/en-us/blog/2024-nextdoor-neighborhood-faves-are-here
53. Google, LSA business screening and verification requirements — https://support.google.com/localservices/answer/12174778
54. Google, LSA background checks — https://support.google.com/localservices/answer/6226575
55. Google Ads blog, Google Verified (Aug 2025) — https://blog.google/products/ads-commerce/google-verified-august-2025/
56. Search Engine Roundtable, Google Verified LSA badge — https://www.seroundtable.com/google-verified-local-service-ads-badge-39975.html
57. Business Wire, Yelp 2025 Trust & Safety Report — https://www.businesswire.com/news/home/20260225039344/en/Yelp-Releases-2025-Trust-Safety-Report/
58. Business Wire, Yelp 2024 Trust & Safety Report — https://www.businesswire.com/news/home/20250205544346/en
59. BuzzFeed News, Yelp Request a Quote — https://www.buzzfeednews.com/article/carolineodonovan/now-you-can-get-price-quotes-for-home-services-inside-yelp
60. Business Wire, Yelp AI features for service pros (Apr 2025) — https://www.businesswire.com/news/home/20250429842302/en/yelp-introduces-new-ai-powered-features-to-streamline-hiring-service-pros-and-enhance-the-dining-experience
61. Airtasker, Why do I need to verify my ID — https://support.airtasker.com/hc/en-us/articles/51706619657241-Why-do-I-need-to-verify-my-ID
62. Airtasker help, payments (Airtasker Pay) — https://support.airtasker.com/hc/en-gb/articles/115012247667
63. Airtasker blog, badges — https://www.airtasker.com/blog/airtasker-badges/amp/
64. Choice, find-a-tradie websites — https://www.choice.com.au/home-improvement/building-and-renovating/design-and-trades/articles/find-a-tradie-websites
65. Trustpilot, hipages — https://ca.trustpilot.com/review/hipages.com.au
66. ProductReview.com.au, hipages — https://www.productreview.com.au/listings/home-improvement-pages
67. Oneflare, review a business hired outside Oneflare — https://help.oneflare.com.au/hc/en-au/articles/12709432917401-Can-I-leave-review-for-a-business-I-hired-outside-Oneflare
68. Oneflare, when will I see my review — https://help.oneflare.com.au/hc/en-au/articles/44612755427225-When-Will-I-See-the-Review-I-Left-for-a-Business
69. Oneflare, business verification — https://help.oneflare.com.au/hc/en-au/articles/47180283194009-Why-Is-Business-Verification-Encouraged-on-Oneflare
70. Motor Equipment News via PressReader, Fixter video consultation (2021) — https://www.pressreader.com/new-zealand/motor-equipment-news/20210901/281668258087278
71. Trustpilot, Fixter — https://ca.trustpilot.com/review/fixter.co.uk
72. The Motor Ombudsman, Fixter Ltd — https://businesses.themotorombudsman.org/view-garage/fixter-ltd
73. Upwork, Top Rated and Rising Talent — https://support.upwork.com/hc/en-us/articles/211063568-Top-Rated-and-Rising-Talent
74. Upwork, How Upwork screens talent — https://www.upwork.com/resources/how-upwork-screens-talent
75. Upwork community, JSS and badge — https://community.upwork.com/t5/Freelancers/When-do-I-qualify-for-JSS-and-a-badge/m-p/902589/highlight/true
76. Fiverr, levels and ratings — https://www.fiverr.com/cp/freelancers-levels-ratings
77. Fiverr help, Achieving levels — https://help.fiverr.com/hc/en-us/articles/360010560118-Achieving-levels
78. Care.com, Background Check — https://www.care.com/about/safety/background-checks/care-com-background-check
79. Rover, background checks — https://www.rover.com/background-checks/
80. Rover, safety — https://www.rover.com/safety/
81. Wag!, about — https://wagwalking.com/about
82. Marketplace, why it's hard to qualify as a dog walker (2017) — https://marketplace.org/2017/10/13/why-its-so-hard-qualify-dog-walker
83. Instawork, understand your performance score — https://help.instawork.com/en/articles/6449818-understand-your-performance-score
84. Instawork, how can I book Top Pros — https://help.instawork.com/en/articles/5631566-how-can-i-book-instawork-top-pros
85. Instawork, how are Pros vetted — https://help.instawork.com/en/articles/2062195-how-are-instawork-pros-vetted
86. Shiftsmart, reliability and on-time scores — https://help.shiftsmart.com/hc/en-us/articles/28880908176788-Reliability-and-on-time-scores
87. Shiftsmart, why don't I see shifts — https://help.shiftsmart.com/hc/en-us/articles/29224379050516-Why-don-t-I-see-shifts
88. Wonolo, breaches and badges — https://www.wonolo.com/blog/breaches-badges-and-what-they-mean-to-wonoloers
89. Airbnb, identity verification help — https://www.airbnb.com/help/article/451
90. Airbnb newsroom, update on identity verification — https://news.airbnb.com/an-update-on-identity-verification-on-airbnb/
91. Airbnb, how do reviews work — https://www.airbnb.com/help/article/13
92. Airbnb, how to become a Superhost — https://www.airbnb.com/help/article/829
93. Fradkin, Grewal & Holtz, reciprocity in two-sided reputation (SSRN) — https://papers.ssrn.com/abstract=2939064
94. Uber, PIN verification — https://www.uber.com/us/en/blog/pin-verification-drivers
95. Uber, Real-Time ID Check — https://www.uber.com/us/en/blog/real-time-id-check/
96. Uber, driver deactivation policy — https://www.uber.com/za/en/blog/driver-deactivation-policy/
97. World Economic Forum, Uber deactivating riders (2019) — https://weforum.org/stories/2019/05/uber-will-start-deactivating-riders-with-low-ratings
98. Lyft, ratings and cancellations — https://www.lyft.com/hub/posts/ratings-and-cancellations
99. BlaBlaCar, Entering the trust age — https://blog.blablacar.com/trust
100. BlaBlaCar newsroom, In trust we trust — https://newsroom.blablacar.com/inside-story/in-trust-we-trust
101. Business Insider India, BlaBlaCar government ID verification — https://www.businessinsider.in/blablacar-india-government-verification/articleshow/53094130.cms
102. RISMedia, Have couch, will travel (2008) — https://www.rismedia.com/2008/10/02/getaways-have-couch-will-travel/
103. Teng et al., CouchSurfing vouching network (USENIX WOSN 2010) — https://static.usenix.org/events/wosn10/tech/full_papers/Teng.pdf
104. Couchers.org, reviews issue — https://couchers.org/issues/reviews
105. Couchsurfing support, Why did verification change (HTTP 403 at fetch) — https://support.couchsurfing.org/hc/en-us/articles/50048546692507-Why-Did-Verification-Change
106. Vinted help centre (payment hold) — https://www.vinted.co.uk/help/1147
107. Vinted help centre (feedback) — https://www.vinted.co.uk/help/730
108. Etsy Seller Handbook, Star Seller — https://www.etsy.com/seller-handbook/article/1020956976086
109. Etsy help, track progress toward Star Seller — https://help.etsy.com/hc/articles/29665255990039
110. Klein, Lambertz & Stahl, eBay feedback change (CEPR DP9501) — https://repec.cepr.org/repec/cpr/ceprdp/DP9501.pdf
111. Toolhaus, negative feedback FAQ — https://toolhaus.org/negs-faq.html
112. Nosko & Tadelis, The limits of reputation (NBER w20830) — https://www.nber.org/papers/w20830
113. Amazon, how Amazon maintains a trusted review experience — https://trustworthyshopping.aboutamazon.com/how-amazon-maintains-a-trusted-review-experience
114. About Amazon, actions against fake review brokers 2024 — https://www.aboutamazon.com/news/policy-news-views/amazons-latest-actions-against-fake-review-brokers-2024
115. Trustpilot, How Trustpilot works — https://au.corporate.trustpilot.com/trust/how-trustpilot-works
116. Trustpilot, Trust Report 2025 — https://corporate.trustpilot.com/trust/trust-report-2025
117. Tripadvisor, 2025 Transparency Report release — https://tripadvisor.mediaroom.com/2025-03-18-Tripadvisors-2025-Transparency-Report-reveals-strong-review-submissions-and-improved-fraud-detection
118. PhocusWire, TripAdvisor red badge — https://www.phocuswire.com/TripAdvisor-slaps-Red-Badge-on-hotel-for-writing-own-reviews
119. LinkedIn help, skill endorsements — https://www.linkedin.com/help/linkedin/answer/31888
120. LinkedIn help, Skill Assessments no longer available — https://www.linkedin.com/help/learning/answer/a1690529
121. Doctolib press release, verification procedures (Aug 2022) — https://media.doctolib.com/image/upload/mkg/file/220825_CP_-_Doctolib_renforce_ses_proc%C3%A9dures_de_v%C3%A9rification_des_professionnels_r%C3%A9f%C3%A9renc%C3%A9s_sur_son_site.pdf
122. Le Quotidien du Médecin, Doctolib excludes 5,700 practitioners — https://www.lequotidiendumedecin.fr/actus-medicales/esante/naturopathes-hypnotherapeutes-sophrologues-doctolib-fait-le-menage-et-exclut-les-5-700-praticiens
123. Zocdoc, reviews FAQs — https://www.zocdoc.com/patient-help/en/articles/8797278-reviews-faqs
124. Zocdoc, verified reviews — https://zocdoc.com/about/verifiedreviews/
125. Kiva, What is social underwriting — https://www-1.kiva.org/blog/what-is-social-underwriting
126. Kiva, direct loans due diligence — https://kiva.org/about/due-diligence/direct-loans
127. Kiva US crowdfunding FAQ — https://kiva.org/lp/faq-kiva-us-crowdfunding-faqs
128. BrightID, connection levels — https://brightid.gitbook.io/brightid/connection-levels
129. BrightID forum, fake "already known" connections — https://forum.brightid.org/t/prevent-reduce-detect-fake-already-know-connections/29
130. Aura (BrightID) — https://aura.brightid.org/
131. Human Passport, stamp weights — https://support.passport.human.tech/stamps/stamp-weights
132. Gitcoin, how the Passport score is calculated — https://support.gitcoin.co/gitcoin-knowledge-base/gitcoin-passport/common-questions/how-is-gitcoin-passports-score-calculated
133. Baymard, respond to negative user reviews — https://baymard.com/blog/respond-to-negative-user-reviews
134. Baymard, user ratings distribution summary — https://baymard.com/blog/user-ratings-distribution-summary
135. Baymard, user perception of product ratings — https://baymard.com/blog/user-perception-of-product-ratings
136. Rice University, binary ratings eliminate gig earnings gap (Nature 2025) — https://news.rice.edu/news/2025/racial-earning-gap-gig-work-eliminated-through-new-rating-system
137. Google, how Google Maps protects against fake content — https://blog.google/products-and-platforms/products/maps/how-google-maps-protects-against-fake-content/
138. The Flip, Lynk lessons learned the hard way — https://theflip.africa/newsletter/lynk-lessons-learned-the-hard-way/
