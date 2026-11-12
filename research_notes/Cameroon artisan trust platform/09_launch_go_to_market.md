# Launch Model and Go-to-Market Strategy: Hyperlocal Artisan Trust and Service-Matching Marketplace (one trade, one neighbourhood, Cameroon)

> Researcher note on method and limits (read first). This file was compiled on 12 Nov 2026. Part-way through, the shared web-search budget for the whole research run (200 searches across all agents) ran out. After that I could only fetch URLs I already knew or had found, mostly primary marketplace-theory sources and Wikipedia or company pages. As a result, the **global cold-start theory and case-study evidence is strong**. The **Cameroon-specific evidence is thinner**: Gozem, Yango, Jumia, Douala demographics, languages, religion, chefferies, media, CEMAC and DataReportal are sourced, but I could not retrieve TechCabal, Business in Cameroon, Investir au Cameroun, GSMA or CGAP agent-network reports, or academic njangi/chefferie sociology. These are logged under each section's Gaps. Every claim in "Cited Findings" has an inline source. Anything that is my own reasoning sits under "Inferences". 58 distinct sources are cited inline (list at the end), two short of the 60-source target, because the search budget ran out. Several come only from search-result summaries rather than full-text fetches, and are marked "(search summary)".

---

## 1. Marketplace cold-start theory and global case studies (Chen, NFX, a16z, Lenny, Graham, Gurley, two-sided-market economics)

### Takeaway
The evidence converges on one approach: **win the hard side first (almost always supply), inside a deliberately tiny "atomic network" (one category × one geography), with founders doing unscalable manual matching, while giving supply single-player value ("come for the tool") before demand exists.** For a trust and matching engine for informal artisans, the hard side is *reliable, verified artisans who keep answering requests*. The scarcest asset, though, is **customer trust**, so demand-side trust devices (guarantees, verified reviews, proof of work) must be designed in from day one.

### Cited Findings
**Atomic network and hard side (Andrew Chen, *The Cold Start Problem*, 2021)**
- Chen's cold-start theory has five stages: Cold Start Problem (anti-network effects: new users leave because too few others are there), Tipping Point, Escape Velocity, Hitting the Ceiling, and The Moat — [Sachin Rekhi primer](https://www.sachinrekhi.com/andrew-chen-the-cold-start-problem)
- An **atomic network** is "a single stable, engaged network that can sustain itself". Once it works, you build an adjacent one and repeat. Examples: Zoom = 2 people, Slack ≈ 3 users, Airbnb = hundreds of active listings in a given market — [Sachin Rekhi primer](https://www.sachinrekhi.com/andrew-chen-the-cold-start-problem)
- The **hard side** is "a minority of users that will create disproportionate value". They are harder to acquire and retain: sellers or providers on marketplaces. At Uber, "Power Drivers" are about 20% of supply but create about 60% of trips — [Andrew Chen, "Solve a Hard Problem" (Tinder chapter)](https://andrewchen.com/?p=4785)
- Products launch successfully by solving a real problem *for the hard side*, and the other side tends to follow. Tinder designed for women users (mutual friends, easy unmatching, less harassment) — [Andrew Chen](https://andrewchen.com/?p=4785)
- The hard side is the side that is less incentivised to participate or has more options. The hard side "rate-limits everything" — [Medium summary (TwosApp)](https://medium.com/twosapp/the-cold-start-problem-how-to-start-and-scale-network-effects-by-andrew-chen-813f0668c70f); [Frog Capital review](https://frogcapital.com/think-frog/the-cold-start-problem-by-andrew-chen/) (search summary)
- Chen suggests looking at hobbies and side hustles to find people who can be engaged on the hard side. Uber's early focus on black-car/limo services (licensed, uncontroversial) is a hard-side example — [Product Andrew summary](https://productandrew.substack.com/p/product-31); [Gupta summary](https://guptadeepak.com/books/the-cold-start-problem/) (search summary)
- Invite-only growth works because invitees arrive already connected to their inviter. LinkedIn started with its founder's network to create density in Silicon Valley — [Sachin Rekhi primer](https://www.sachinrekhi.com/andrew-chen-the-cold-start-problem)

**Supply-first vs demand-first (Lenny Rachitsky)**
- In Rachitsky's study of 17 marketplaces, **14 of 17 (about 80%) concentrated early resources on supply**. Supply either drove its own demand or word of mouth covered demand. Only 3 (Rover, TaskRabbit, Zillow) found demand was the constraint — [Lenny's Newsletter, Part 2](https://www.lennysnewsletter.com/i/159750/step-decide-which-side-of-the-marketplace-to-concentrate-on)
- DoorDash's playbook: restaurants first, then delivery people, then customers ("restaurants bring the demand"). Lyft: "supply growth was the unlock for demand growth" — [Lenny's Newsletter, Part 2](https://www.lennysnewsletter.com/i/159750/step-decide-which-side-of-the-marketplace-to-concentrate-on)
- TaskRabbit had a provider waitlist and later charged new providers an application fee to manage volume and quality — [Lenny's Newsletter, Part 2](https://www.lennysnewsletter.com/i/159750/step-decide-which-side-of-the-marketplace-to-concentrate-on)
- Rachitsky found 12 supply-growth levers, but for each marketplace most of the benefit came from just 2–3 — [echai.ventures summary](https://echai.ventures/startingup/first-customers/i-run-a-two-sided-marketplace-do-i-get-my-first-customers-by-starting-with-supply-or-demand-and-how-do-i-avoid-the-empty-restaurant-problem); [Lenny's marketplace series index](https://www.lennysnewsletter.com/t/marketplaces) (search summary)
- Decision heuristics: put effort on the scarcer side. Perishable supply (an unfilled hour) needs buyers to arrive fast or a tightly scoped market. "If the answers point in different directions, shrink the market first." Narrow to one neighbourhood or category so modest buyer volume keeps modest supply busy. Chen's sequence is "supply, demand, supply, supply, supply". Direct sales was a lever for about 60% of companies interviewed. The 17-company sample is survivorship-biased — [Rework, Supply-first vs demand-first](https://resources.rework.com/libraries/marketplace-growth/supply-first-vs-demand-first)
- Lyft guaranteed drivers an hourly income floor to bridge the gap before demand arrived — [Rework](https://resources.rework.com/libraries/marketplace-growth/supply-first-vs-demand-first)

**First users (Lenny: how today's B2C companies found their first 1,000 users)**
- Seven strategies explain early growth. Most companies used only one, and none succeeded with more than three. The most popular involve reaching users directly: offline, online, or through friends — [Lenny's Newsletter](https://www.lennysnewsletter.com/p/how-the-biggest-consumer-apps-got)
- Offline examples: Uber street teams handing out referral codes at Caltrain and Twitter HQ, DoorDash flyers around Stanford, Tinder pitching on campus — [Lenny's Newsletter](https://www.lennysnewsletter.com/p/how-the-biggest-consumer-apps-got)

**NFX: 19 chicken-or-egg tactics (James Currier)**
- The tactics most relevant here: (1) start with the harder side; (2) target a niche, then expand; (3) subsidise the most valuable side; (6) host meetups (Poshmark "Posh Parties", Yelp parties); (7) build SaaS for one side (OpenTable, StyleSeat for hairdressers, Honeybook); (13) connect the two sides by hand (Zappos, Zenefits); (16) geographic constraint (Lyft, Yelp, Craigslist); (18) demand constraint (narrow to one clear value proposition). Tactic 4A, faking activity (Reddit personas, PayPal bots), carries "serious reputational risk" — [NFX, 19 Tactics](https://www.nfx.com/post/19-marketplace-tactics-for-overcoming-the-chicken-or-egg-problem); [Sharetribe write-up of Currier talk](https://www.sharetribe.com/academy/marketplace-conference-4-2/)
- Start with a handful of supply-side partners willing to go above and beyond to serve early demand — [Founders Network](https://foundersnetwork.com/chicken-before-egg-getting-your-marketplace-startup-off-the-ground/) (search summary)

**"Come for the tool, stay for the network"**
- Chris Dixon (2015): a single-player tool attracts initial users and builds critical mass, then the network becomes the long-term source of value and defensibility. Tools are "kindling". Examples: Delicious, Instagram filters. Not every network starts this way (Facebook, Twitter) — [cdixon.org](https://cdixon.org/2015/01/31/come-for-the-tool-stay-for-the-network)
- Counterpoint: building a genuinely useful SaaS tool needs deep customer knowledge and money, so the approach is getting harder. The alternative is "come for the network, stay for the tool": add tools such as invoicing, scheduling and benchmarking after the marketplace runs (Docplanner, Xeneta). Tools built on marketplace data are harder to copy — [Point Nine](https://writing.pointnine.com/p/come-for-the-network-stay-for-the)
- A TechCrunch piece argues the framing is wrong, because Instagram's social features mattered from the start — [TechCrunch](https://techcrunch.com/?p=1420204) (search summary)
- Dixon revisited network-building in a 2025 a16z podcast — [a16z](https://a16z.com/ai-crypto-internet-chris-dixon/) (search summary)

**Thumbtack (local services, the closest analogue)**
- Thumbtack first asked how to create "network-independent value" for pros. Its answer was a free profile tool that republished to Craigslist in one click, where pros already hunted for customers. Pros found it "instantly valuable", and profile content fed SEO. Demand followed supply — [NFX, Thumbtack interview](https://nfx.com/post/billion-dollar-marketplace-thumbtack)
- **"Over 90% of GMV is still transacted through word of mouth"**, which the founder calls Thumbtack's biggest competitor. His regrets: investing in PR late, and moving to automated matchmaking late ("could have saved a year or two"). Pricing moved from pay-per-quote to pay-per-customer-contact — [NFX, Thumbtack](https://nfx.com/post/billion-dollar-marketplace-thumbtack)

**Andrew Chen / Lenny: supply-growth levers**
- 22 supply tactics. The highest-yield ones for a local launch: direct sales (Airbnb manually activated 100 listings in one market), piggybacking on existing networks (Etsy craft forums), meetups, referral programs (Airbnb's most efficient supply lever), optimising activation to a first booking or job within a month, and re-engagement calls — [andrewchen.com](https://andrewchen.com/grow-marketplace-supply/amp)
- Strategies include "bootstrap trust": Airbnb had employees stay free to review new hosts, plus free photography and a host guarantee. "Critical mass": Airbnb estimated about 300 listings, with 100 reviewed, per market — [andrewchen.com](https://andrewchen.com/grow-marketplace-supply/amp)

**Do things that don't scale (Paul Graham)**
- "You can't wait for users to come to you." Airbnb founders went "door to door in New York" recruiting hosts and improving listings. "It's not the product that should be insanely great, but the experience of being your user." Facebook's Harvard start is like "keeping a fire contained at first to get it really hot" — [Paul Graham](https://paulgraham.com/ds.html)
- Airbnb's YC money paid for flights to New York to meet users. By March 2009: 10,000 users, 2,500 listings — [Wikipedia: Airbnb](https://en.wikipedia.org/wiki/Airbnb)

**Liquidity and marketplace economics (a16z, Gurley)**
- Liquidity is "the most critical aspect of a marketplace". Measures: fill rate (match/utilisation rate), market depth, time to match. Take rates range from low single digits to the mid-30s %. **Disintermediation (leakage)** is driven by price sensitivity, convenience and necessity, and "stymies growth and suppresses monetization" — [a16z Marketplace Glossary](https://a16z.com/the-marketplace-glossary/)
- Gurley: fragmented supply is an advantage. Signing up suppliers is easier, and "aggregating demand is much harder and more critical". Low-frequency verticals are a risk (one good match ends the search). Being in the payment flow helps fee capture, while billing afterwards makes fees feel like a tax. "Great marketplaces do not simply aggregate a market; they enhance it." — [Bill Gurley, Above the Crowd](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)
- a16z "Four paths": one-off repairs are "Fits and Starts" (infrequent, low ticket), and renovations are "Occasional Splurges", which invite off-platform completion unless the platform adds value beyond matching. It warns that relying on "a human dispatcher rather than an algorithm" hurts margins in frequent, low-ticket segments — [a16z, Four Paths](https://a16z.com/four-paths-to-marketplace-success/)

**Two-sided market economics (Rochet & Tirole; Parker & Van Alstyne; Eisenmann et al.)**
- Rochet–Tirole and Parker–Van Alstyne developed the two-sided market concept. Pricing rule: **subsidise the more price-sensitive side, and charge the side whose demand grows more with the other side's growth** (Adobe free Reader → paid writer). Two-sided theory explains chicken-and-egg standards battles — [Wikipedia: Two-sided market](https://en.wikipedia.org/wiki/Two-sided_market)
- Two-sided platforms "often enjoy significantly greater returns at scale than traditional value chains" — [HBR, Eisenmann, Parker & Van Alstyne, "Strategies for Two-Sided Markets" (2006)](https://hbr.org/2006/10/strategies-for-two-sided-markets)

**Cautionary case: Homejoy (home cleaning, US)**
- Homejoy offered a "$19 deal" first cleaning, expanded to more than 31 cities plus costly international expansion, and couldn't hold customers. It lost "its best workers to direct employment arrangements with its own (now former) clients" (leakage), and faced worker-classification lawsuits. It shut down in 2015 — [Wikipedia: Homejoy](https://en.wikipedia.org/wiki/Homejoy)

**Other global analogues**
- TaskRabbit started in Boston in 2008 (as RunMyErrand) with about 1,500 active taskers by July 2011. Taskers undergo criminal background checks. Its 2014 switch from bidding to first-responder matching caused strong tasker backlash — [Wikipedia: TaskRabbit](https://en.wikipedia.org/wiki/TaskRabbit)
- Urban Company (UrbanClap, India) launched in 2014 starting with one category (beauty at home), then added handyman and appliance repair via acquisitions. It later moved to UAE, Singapore, Australia (2020), US (2023) and Saudi JV (2024). Reported issues include beauticians paying for training, and rating-based ID blocking — [Wikipedia: Urban Company](https://en.wikipedia.org/wiki/Urban_Company)
- DoorDash began as PaloAltoDelivery.com (Jan 2013) in a single town — [Wikipedia: DoorDash](https://en.wikipedia.org/wiki/DoorDash)
- Etsy reached sellers via craft forums, and sellers were also buyers — [UX Planet on Etsy](https://uxplanet.org/lessons-on-kickstarting-and-growing-a-marketplace-from-etsys-14b-handmade-empire-c060078bb669) (search summary); [andrewchen.com](https://andrewchen.com/grow-marketplace-supply/amp)

### Inferences
- **The hard side for this product.** Artisans are plentiful (Douala's informal trade economy is large, see section 3), so raw supply is easy. The hard side is *good, responsive, honest* artisans who will (a) accept verification, (b) respond within hours, and (c) keep the job on-platform. So the launch is "supply-first on quality": recruit roughly 25–40 hand-vetted artisans in one trade, not hundreds.
- **Pick the trade by Gurley's frequency test and trust pain.** Plumbing or electrical repair (frequent, urgent, high trust-anxiety, visible proof of work) fits better than masonry or full construction (infrequent, high-ticket, high leakage). An electrician pilot also lets you lean on safety as a reason to verify.
- **Single-player value for artisans.** A free verified digital profile and QR badge, a WhatsApp-shareable portfolio of photographed jobs, and a simple quote/receipt generator. This is Thumbtack's "network-independent value", delivered where artisans already find work (WhatsApp, word of mouth).
- **Leakage is the existential risk** (Homejoy; Thumbtack's 90% word-of-mouth). In one neighbourhood, a customer who finds a good plumber once will call him directly next time. Design so the platform keeps value *after* the first match: the reputation record accrues only to on-platform jobs, plus a guarantee/escrow, a dispute mediator, repeat-booking convenience, and artisan benefits (insurance, tool credit) tied to on-platform job volume. Accept some leakage early as the cost of building reputation data.
- **Avoid faked activity** (NFX 4A). In a trust product, any fake review discovered locally would be fatal.

### Gaps
- I could not open Lenny's Parts 1, 3 and 4 directly (Part 1 covers geographic constraint, Parts 3 and 4 list levers with frequencies). Only Part 2 and summaries were read.
- No primary Reforge, First Round Review or Sequoia marketplace article was retrieved (search budget exhausted).
- The full text of the Eisenmann HBR article was paywalled. Only the summary was read.

---

## 2. African and Cameroon hyperlocal launch case studies

### Takeaway
African platforms that survived scaled through **asset-light local partnerships, driver/agent financing and services bundled around earnings** (Gozem, Yango), or through **existing retail networks as trust and cash points** (M-Pesa). Pan-African e-commerce and delivery players over-extended and pulled out of smaller markets, Cameroon included (Jumia suspended Cameroon e-commerce in Nov 2019). The lesson for a Cameroon artisan platform: depth in one market before breadth, and an "agent" layer built on people who already hold local trust.

### Cited Findings
**Cameroon-active platforms**
- **Gozem** ("super-app" for Francophone Africa) runs a Cameroon site with a Douala III address. Services: "Zem" moto rides, taxis, food/grocery/parcel delivery, ticketing, airtime. Other markets: Togo, Benin, Gabon, Congo-Brazzaville. For drivers it offers **vehicle financing with no initial deposit, repaid by automatic deductions from earnings**, smartphone financing, maintenance/insurance subscriptions, cash advances, a personal "coach", and a "Champion Gold" career path to vehicle ownership — [Gozem Cameroon website](https://www.gozem.co/)
- **Yango** launched in Cameroon in 2021 (same year as Senegal), after Abidjan in 2018 and Ghana in 2019. A cited headline indicates it started in Douala, then expanded to Yaoundé. It works with local taxi companies and tech partners rather than owning vehicles or employing drivers. In Côte d'Ivoire, street-taxi drivers protested and legislation later created a VTC licence. Benin suspended Yango Ride in Dec 2024 for operating without authorisation — [Wikipedia: Yango](https://en.wikipedia.org/wiki/Yango_(company))
- **Jumia** opened in Cameroon in 2014 and **suspended Cameroon e-commerce in November 2019** (with Tanzania), keeping only classifieds. A later sequence of retrenchments followed: logistics scaled back in 2022, food delivery ended in 7 markets in 2023, South Africa and Tunisia exits in 2024, Algeria in Feb 2026 — [Wikipedia: Jumia](https://en.wikipedia.org/wiki/Jumia)
- **Glovo**: the Wikipedia article has no information on its African/Cameroon presence or exits (negative finding) — [Wikipedia: Glovo](https://en.wikipedia.org/wiki/Glovo)
- **Kiro'o Games** (Yaoundé, founded 2012 by Olivier Madiba) funded itself through community/crowd capital: a €49,000 Kickstarter (2013), $305,000 crowdfunded in 2013–2018, and 1 billion FCFA in equity crowdfunding by 2022 via its own Rebuntu platform. Early development was hampered by frequent power cuts — [Wikipedia: Kiro'o Games](https://en.wikipedia.org/wiki/Kiro%27o_Games)

**Agent-network precedents**
- **M-Pesa**: pilot in 2005, commercial launch March 2007, built on **Safaricom's existing airtime resellers** as cash-in/cash-out agents. The main early obstacle was "gaining the agent's trust and encouraging them to process cash withdrawals". Volume rose once airtime purchase was added, with a 5% airtime discount as incentive. It underperformed where conditions differed: South Africa reached 100k customers vs a 10M target (high bank penetration, regulation, low awareness), and it closed in India (2019), Romania (2017) and Albania (2017) — [Wikipedia: M-Pesa](https://en.wikipedia.org/wiki/M-Pesa)
- **Moniepoint** (Nigeria) became a unicorn in Oct 2024 ($110M Series C, extended by $90M in 2025) and runs POS terminals. The Wikipedia page lacks agent-network details — [Wikipedia: Moniepoint](https://en.wikipedia.org/wiki/Moniepoint)

**African home-services marketplaces**
- **SweepSouth** (South Africa, 2014) was the first end-to-end home-cleaning booking platform in Southern Africa. "SweepStars" undergo background checks. It claims 6,500 professionals and 250,000 clients (May 2025, self-reported). Investors include Naspers Foundry — [Wikipedia: SweepSouth](https://en.wikipedia.org/wiki/SweepSouth)
- **Kandua** (South Africa home services) says "Every Pro is background-checked, and their qualifications are verified". It claims a 4.6 average rating, 85,000+ reviews, matching to 4.5★+ pros, 100,000+ jobs created, and a homeowner-facing "WIN back up to R10,000" promotion — [Kandua](https://kandua.com/)

### Inferences
- **Gozem's driver-financing model is the most transferable Cameroon-tested idea.** It finances productive assets with automatic repayment from platform earnings. An artisan analogue is a **tool-credit or kit-financing scheme repaid as a small deduction from on-platform job payments**. This also cuts leakage, because only on-platform jobs repay credit and build credit history.
- **Yango's Douala-first sequence** (Douala → Yaoundé) and Gozem's Douala HQ suggest Douala is the conventional first Cameroon city for urban service platforms. It is the economic capital with about 3.8M people (section 3).
- **M-Pesa's lesson is to recruit existing trusted retail nodes as agents** rather than building a new salaried field force. Candidate nodes: mobile-money kiosks, hardware stores (quincailleries), and the trade association's office. M-Pesa also shows that **agent trust in the system** (being paid reliably) comes before customer trust.
- **Jumia's exit** shows the cost of horizontal breadth in Cameroon without unit economics. It argues for a single-trade, single-neighbourhood start and a lean, mostly variable cost base.
- Kandua and SweepSouth confirm that **"vetted/background-checked" plus visible ratings and a money-back promise** is the standard trust proposition for African home-services marketplaces.

### Gaps
- **Not retrieved because the search budget ran out**: dated launch and history of Gozem in Cameroon; Glovo's Cameroon/Africa footprint; Bolt/Yango driver onboarding practices in Douala; Njorku (Cameroonian job search engine) history; "Wouri apps"; Twiga, Wasoko, Lynk (Kenya artisan marketplace) histories (Twiga/Wasoko Wikipedia URLs returned 404); GSMA State of the Industry agent counts; CGAP agent-network research; Moniepoint/OPay agent recruitment methods; TechCabal, Rest of World, Business in Cameroon or Investir au Cameroun coverage. The report writer should not state specifics on these without another source.
- Unverified prior knowledge, *not* to be stated as fact without a source: Lynk (Nairobi) was an artisan marketplace that pivoted or wound down. Glovo operated in some Francophone African markets. Bolt was not widely operating in Cameroon. All unconfirmed here.

---

## 3. Trust building with local communities in Cameroon (chiefs, churches, njangi, radio, language, markets)

### Takeaway
Trust in Cameroonian neighbourhoods runs through **existing social institutions**: chefferies (whose chiefs are legally "auxiliaries of the administration" and traditional mediators), churches (about 66% of the population is Christian, and the South/West Francophone regions are largely Catholic/Evangelical), njangi/tontine groups (members choose each other on trust and social capital), and radio. Launch communication must work in **French, English, Pidgin (about 50% speak some form) and, with youth, Camfranglais**. Mobile reach is high (86% mobile connections), but internet use (42%) and social media (18.5%) are much lower, so **offline and WhatsApp/voice-first channels are essential**.

### Cited Findings
**Context: Douala and the digital landscape**
- Douala: about 3.82M (city, 2025 est.), metro about 4.35M. It is the economic capital of Cameroon and of CEMAC, with seven districts (Akwa, Bassa, Bonabéri, Bonapriso, Bonanjo, Deïdo, New Bell) and **more than 120 neighbourhoods**. Bonapriso is among the wealthiest areas, Bonamoussadi is the main northern housing area, Kotto is a middle- and upper-class residential area, and Bépanda is very dense. Duala is the indigenous lingua franca. About 76% of residents over 15 speak French. The economy relies on informal commerce and informal trade apprenticeship (construction, car repair etc.). About 30% live in poverty — [Wikipedia: Douala](https://en.wikipedia.org/wiki/Douala)
- Cameroon, Jan 2025: population 29.5M (60.2% urban), **internet users 12.4M (41.9%)**, **mobile connections 25.5M (86.3%)**, social media identities 5.45M (18.5%), Facebook ad reach 5.45M. The page has no WhatsApp/TikTok figures — [DataReportal Digital 2025: Cameroon](https://datareportal.com/reports/digital-2025-cameroon)
- Cameroon nominal GDP is $60.6B (2025), per-capita about $2,027. Services/commerce are about 50.6% — [Wikipedia: Economy of Cameroon](https://en.wikipedia.org/wiki/Economy_of_Cameroon)

**Chefferies (traditional chiefs)**
- Chefferies are organised in three degrees by Decree No. 77/245 of 15 July 1977. Chiefs have the status of **"auxiliaires de l'administration"**, the interface between administration and population. They historically held arbitration and mediation roles (family, succession, civil, land), within state law. Urban dynamics can reduce chiefs' influence — [Wikipedia FR: Chefferie traditionnelle au Cameroun](https://fr.wikipedia.org/wiki/Chefferie_traditionnelle_au_Cameroun)

**Churches and religion**
- Christians are 66.3% (CIA 2022; Pew 2010 estimated 80%): Catholic 33.1%, Protestant 27.1%. Muslims are 30.6%. Anglophone regions are largely Protestant, Francophone south/west largely Catholic and Evangelical, and the north largely Muslim — [Wikipedia: Religion in Cameroon](https://en.wikipedia.org/wiki/Religion_in_Cameroon)

**Njangi / tontines**
- Njangi ("djanggi") is the Cameroonian name for ROSCAs. Members choose each other, so participation rests on **trust and social capital**. Transactions are visible to all members, and default is an inherent risk with weak legal remedy — [Wikipedia: ROSCA](https://en.wikipedia.org/wiki/Rotating_savings_and_credit_association)
- In Cameroon, rotating and accumulating tontines often run together. The accumulating fund ("caisse d'aide") can be lent to members to help them meet rotating contributions (citing Semin, *Civilisations*, 2007) — [Wikipedia FR: Tontine](https://fr.wikipedia.org/wiki/Tontine)

**Language**
- Cameroonian Pidgin (Kamtok): about 12M speakers (2017). About 50% of Cameroonians speak it in some form. It is a vehicular language for over 200 years, used in markets, political campaigns and increasingly spoken media. It is primarily NW/SW, with a Francophone variety used in Douala — [Wikipedia: Cameroonian Pidgin English](https://en.wikipedia.org/wiki/Cameroonian_Pidgin_English)
- Camfranglais mixes French, English, Pidgin and local languages. It is most popular among ages 12–26 in "high-density urban centres where anglophones and francophones meet", and popularised by music — [Wikipedia: Camfranglais](https://en.wikipedia.org/wiki/Camfranglais)

**Radio and media**
- CRTV (state broadcaster) covers about 60% of the country with 64 transmitters. Liberalisation in 2000 enabled private stations. Douala private stations include Radio Equinoxe, Sweet FM, FM Suellaba, Radio Nostalgie, RTM, Radio Veritas, Radio Casmando and Hit Radio. Community radios exist (e.g. Chamba, Ndu, Kumbo, Santa), as do church-run "Radio Evangelium" stations — [Wikipedia: Media of Cameroon](https://en.wikipedia.org/wiki/Media_of_Cameroon)

**Security context for site selection**
- The Anglophone crisis (from Sept 2017) is listed as ongoing in the NW/SW regions, with spillover to Littoral and West. It has caused about 700k IDPs (Mar 2021) and repeated multi-day separatist lockdowns closing businesses — [Wikipedia: Anglophone Crisis](https://en.wikipedia.org/wiki/Anglophone_Crisis)

**Global evidence on community and offline trust tactics**
- Meetups/events build community and show activity (Poshmark Posh Parties, Yelp parties) — [NFX](https://www.nfx.com/post/19-marketplace-tactics-for-overcoming-the-chicken-or-egg-problem). Airbnb ran city-launch meetups but "could not measure their impact" — [andrewchen.com](https://andrewchen.com/grow-marketplace-supply/amp)
- Piggyback on networks where supply already gathers (Etsy craft forums, Airbnb on Craigslist) — [andrewchen.com](https://andrewchen.com/grow-marketplace-supply/amp)

### Inferences
**Partner map (who to recruit, in what order, for what)**. This is my synthesis from the institutions above. Specific organisation names in Douala were not verified.
1. **Trade association / union for the chosen trade** (e.g. local plumbers' or electricians' group): the supply gatekeeper and co-verifier. Co-brand the "verified" badge and hold onboarding days at their meeting place. They vouch for members, and the platform gives the association data and visibility.
2. **Quarter chief (chef de quartier/bloc)**: the legitimacy and mediation partner. Chiefs are legally administrative auxiliaries with a mediation tradition, so ask the chief to (a) endorse the pilot at a quarter meeting, (b) act as first-instance mediator for disputes, and (c) co-sign residence attestations for artisans. Offer free priority service for the chefferie building or community facilities, and recognition.
3. **Churches (parish/assembly)**: the demand-trust partner. Announcements after Sunday service, a stand at parish events, and parish "men's/women's fellowship" referral codes. Churches reach about two-thirds of the population in the south/littoral.
4. **Njangi groups and women's associations**: the referral and guarantee partners. Present at meetings and offer a group referral reward paid into the njangi pot. Explore a "njangi-backed guarantee" (an artisan's njangi vouches for him) as a culturally native trust signal.
5. **Hardware stores (quincailleries)**: the supply-and-demand hub. Artisans buy materials there daily, so it suits QR posters, onboarding desks and "verified artisan" referrals. Customers buying parts often need an installer.
6. **Mobile money agents (MTN MoMo / Orange Money kiosks)**: payment and onboarding points, modelled on M-Pesa's use of existing retailers. They can register artisans, collect deposits and explain escrow, paid per activated user.
7. **Real-estate agents, landlords and property managers (agents immobiliers, gestionnaires)**: the first recurring B2B demand (tenant move-ins, repairs). See section 5.
8. **Market leaders (presidents of market associations)**: amplification and demo-day venues.
9. **Community/private radio (Douala FM stations; church radio)**: call-in shows ("ask the plumber") in French/Pidgin, with artisans as guests.

**Language and creative**: all customer material in French plus Pidgin, with English for Anglophone residents and diaspora. Camfranglais for youth and social video. Voice notes on WhatsApp beat text for artisans with low literacy.

**Neighbourhood choice for the pilot**: a middle-class residential quarter in Douala such as **Bonamoussadi, Kotto or Makepe** (dense, homeowners/landlords, diaspora-built houses), rather than Akwa (commercial) or very low-income areas (low willingness to pay for verification). Avoid NW/SW Anglophone cities for the first pilot because of lockdown risk. *This is an inference; validate with local field interviews.*

**Physical trust artefacts**: branded vests, laminated ID badges with photo and QR linking to a live profile (verification status, completed jobs, ratings, photos of work), and QR stickers left on installed fixtures ("installed by X, verified by [platform], scan to rate or rebook"). The sticker is also an anti-leakage and rebooking device.

### Gaps
- No academic Cameroonian sociology on urban quarter chiefs (chefs de quartier/bloc) in Douala, chiefs' current influence, or their remuneration was retrieved. The French Wikipedia article doesn't cover urban chiefs. The decree on chiefs' allowances (believed to be 2013) was not confirmed.
- No quantitative data on njangi participation rates in Douala was found.
- No radio audience data by station was found, and no count of community radios.
- Specific Douala trade associations (plumbers/electricians unions, artisans' chambers) and the legal artisan registration regime (believed to be a 2007 law on artisanat and the CCIMA chamber) were not verified.
- No WhatsApp penetration figure for Cameroon was found (DataReportal page omitted it).

---

## 4. Supply onboarding (artisan incentives, onboarding days, verification events)

### Takeaway
Supply-side precedents point to **free entry, immediate single-player value, hand-holding to the first job, and benefits that grow with on-platform volume**. Verification should be visible, co-owned with trusted local bodies, and done in batches at onboarding events. Charging artisans early (as UrbanClap did with training fees) creates resentment unless demand is proven.

### Cited Findings
- Lower costs and raise benefits for supply: Airbnb gave a host guarantee and free professional photography, and Uber offered car leasing and flexible hours — [andrewchen.com](https://andrewchen.com/grow-marketplace-supply/amp)
- **Activation to first transaction** is the key early supply milestone: Airbnb's first booking within a month, Uber's first completed ride. Use re-engagement calls for stalled sign-ups — [andrewchen.com](https://andrewchen.com/grow-marketplace-supply/amp)
- Thumbtack's free profile tool that republished where pros already sought work was "instantly valuable" — [NFX, Thumbtack](https://nfx.com/post/billion-dollar-marketplace-thumbtack)
- Subsidise the most valuable side (Uber paid drivers, ClassPass paid gyms) — [NFX](https://www.nfx.com/post/19-marketplace-tactics-for-overcoming-the-chicken-or-egg-problem). Lyft's hourly income floor — [Rework](https://resources.rework.com/libraries/marketplace-growth/supply-first-vs-demand-first)
- Gozem's supply package: zero-deposit vehicle financing repaid from earnings, phone financing, insurance/maintenance subscription, cash advances, a coach, and a tiered status ladder — [Gozem](https://www.gozem.co/)
- Reported concern: UrbanClap beauticians had to pay for training before working (2023 report). Rating-based ID blocking was also reported — [Wikipedia: Urban Company](https://en.wikipedia.org/wiki/Urban_Company)
- TaskRabbit's matching change (bidding → first responder) caused strong tasker backlash. Its later fee increases (30% service fee) also hit supply — [Wikipedia: TaskRabbit](https://en.wikipedia.org/wiki/TaskRabbit)
- African home-services peers use background checks and qualification verification as a headline promise (Kandua, SweepSouth) — [Kandua](https://kandua.com/); [Wikipedia: SweepSouth](https://en.wikipedia.org/wiki/SweepSouth)
- Rochet–Tirole/Parker–Van Alstyne pricing: subsidise the price-sensitive side. Informal artisans with irregular income are highly price-sensitive to upfront fees — [Wikipedia: Two-sided market](https://en.wikipedia.org/wiki/Two-sided_market)

### Inferences
**Artisan value proposition (launch offer)**
- **No upfront fee for the pilot** (subsidised side). Monetise later through a small commission on guaranteed jobs or a premium tier, once artisans see leads.
- **Free:** verified ID badge and vest, QR profile, a professional photo of the artisan and his best work (an analogue of Airbnb's free photography), WhatsApp-shareable portfolio, quote and receipt generator.
- **Guaranteed early leads:** the founders route the first 2–3 jobs to each artisan within 30 days (the activation milestone).
- **Earned benefits tied to on-platform jobs:** after N verified jobs, access to tool credit (Gozem-style repayment from job earnings), group accident/health micro-insurance, bulk material discounts negotiated with partner hardware stores, and training certificates (safety, customer service) co-issued with the trade association.
- **Status ladder:** Bronze, Silver, Gold "Artisan de confiance" based on jobs, ratings and zero disputes, printed on the badge.

**Verification event design ("Journée de vérification")**: held at the trade association hall or partner hardware store, with the quarter chief present. Stations:
1. ID check (CNI) and phone/mobile-money number match.
2. Residence attestation (chief or landlord).
3. Two references: past customers, or the master who trained him (patron, for apprenticeship-trained artisans).
4. Skills check: a short practical task judged by a senior association member.
5. Photo and profile creation.
6. Code-of-conduct signature: pricing transparency, guarantee rules, dispute process.

Output: a badge printed on site. Batch about 15–25 artisans per event.

**Supply target for the atomic network**: about 20–40 verified artisans in one trade for one quarter of 20–50k residents. That gives several options per request at most hours, without starving artisans of work. Track jobs per artisan per week as the "starvation" metric.

### Gaps
- No Cameroon-specific data on artisan income, phone/smartphone ownership among artisans, or willingness to pay for verification was found.
- No specific micro-insurance product for Cameroonian artisans was verified.
- No evidence was found on how many artisans a trade association in Douala typically has.

---

## 5. Demand activation (segments, referral, guarantees, real-estate and hardware partnerships)

### Takeaway
Demand is harder to aggregate than supply (Gurley), and word of mouth is the incumbent (Thumbtack: over 90% of GMV). The winning hook is **trust insurance**: a guarantee that makes trying a stranger artisan less risky than asking a cousin. The best early demand comes from **concentrated, repeat buyers** (landlords, property managers, estate agents, SMEs) and from **diaspora homeowners** who can't supervise work in person.

### Cited Findings
- "Aggregating demand is much harder and more critical" than signing up suppliers — [Bill Gurley](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)
- Over 90% of local-services GMV still moves through word of mouth — [NFX, Thumbtack](https://nfx.com/post/billion-dollar-marketplace-thumbtack)
- Find one giant user who brings the other side (Candex/Siemens). Change only one side's behaviour (Square) — [NFX](https://www.nfx.com/post/19-marketplace-tactics-for-overcoming-the-chicken-or-egg-problem)
- Guarantees as trust bootstraps: Airbnb's host guarantee — [andrewchen.com](https://andrewchen.com/grow-marketplace-supply/amp). Kandua's "WIN back up to R10,000" homeowner promise — [Kandua](https://kandua.com/)
- Uber's street teams handed out referral codes — [Lenny's Newsletter](https://www.lennysnewsletter.com/p/how-the-biggest-consumer-apps-got). Airbnb's referral program was its most efficient consumer supply lever — [andrewchen.com](https://andrewchen.com/grow-marketplace-supply/amp)
- Occasional high-value projects invite off-platform completion, so platforms need value beyond matching — [a16z, Four Paths](https://a16z.com/four-paths-to-marketplace-success/)
- Being in the payment flow eases fee capture — [Bill Gurley](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)
- Douala neighbourhoods with middle- and upper-class housing: Bonapriso, Bonamoussadi, Kotto — [Wikipedia: Douala](https://en.wikipedia.org/wiki/Douala)
- Kiro'o Games shows Cameroonian ventures can mobilise community and crowd capital (1bn FCFA equity crowdfunding by 2022) — [Wikipedia: Kiro'o Games](https://en.wikipedia.org/wiki/Kiro%27o_Games)

### Inferences
**Priority demand segments (pilot)**
1. **Landlords and property managers / estate agents**: recurring repair volume between tenants, a single decision-maker, and pain from unreliable artisans. NFX "giant user": sign 3–5 agencies or landlords managing 20+ units each in the pilot quarter. Offer priority dispatch, monthly invoicing and photo proof of work.
2. **Diaspora homeowners** (building or maintaining houses remotely): the highest trust pain and willingness to pay. Offer photo/video proof at each step, a milestone escrow via mobile money, and English/French reporting. Reach them through hometown associations and diaspora Facebook/WhatsApp groups. (The volume of Cameroon diaspora remittances was **not** retrieved; see Gaps.)
3. **New middle-class households** in the chosen quarter: church and njangi referral and radio.
4. **SMEs** (bars, shops, pharmacies, schools) needing urgent electrical or plumbing repairs, with service-level response promises.

**Hooks**
- **"Garantie [Platform]"**: if the job fails within 30 days, the artisan returns free; if not, the platform pays another artisan up to a cap (e.g. 50,000 FCFA in the pilot). Finance it from a small fee and a guarantee reserve. This makes on-platform booking more valuable than a direct call (anti-leakage).
- **Transparent price ranges** for the 10 most common jobs (e.g. replace tap, fix leak, install socket), published in French and Pidgin.
- **Referral**: each satisfied customer gets a code. Both sides get a discount on the next job. Group (njangi or church fellowship) referral bonuses paid to the group.
- **Hardware store bundle**: "Buy the part here, get a verified installer today", with a counter QR. The store earns a referral fee or footfall.

### Gaps
- No data was retrieved on Cameroonian diaspora size or remittance flows (World Bank/KNOMAD), Douala rental market structure, the number of real-estate agencies, or household spending on repairs.
- No Cameroon-specific evidence was found on guarantee schemes or escrow via MoMo/Orange Money for services.

---

## 6. Pilot design and success metrics (concierge/Wizard-of-Oz MVP, KPIs, sample size, duration, budget)

### Takeaway
Run the first 8–12 weeks as a **concierge MVP over WhatsApp**: founders take requests, hand-match to verified artisans, follow up and collect rating and photo proof. Code only what repeated manual steps prove necessary. Judge the pilot on **liquidity (fill rate, time to match), quality (dispute rate, rating, NPS) and retention/repeat**, measured within the single atomic network.

### Cited Findings
- Connect the two sides by hand at first (Zappos, Zenefits) — [NFX](https://www.nfx.com/post/19-marketplace-tactics-for-overcoming-the-chicken-or-egg-problem). "Consulting is the canonical example of work that doesn't scale." Delight early users. Direct feedback from the earliest users "will be the best you ever get" — [Paul Graham](https://paulgraham.com/ds.html)
- Ries's MVP definition: the version that collects "the maximum amount of validated learning about customers with the least effort", in iterative build-measure-learn cycles until product–market fit or non-viability — [Wikipedia: MVP](https://en.wikipedia.org/wiki/Minimum_viable_product)
- Liquidity metrics: fill rate (match rate), market depth, time to match — [a16z Glossary](https://a16z.com/the-marketplace-glossary/)
- a16z's 13 marketplace metrics: match rate ("zeros" = unfilled demand), market depth, time to match, concentration, take rate, unit economics per market, multi-tenanting, switching costs, user-retention cohorts, **core-action retention cohorts**, dollar retention, **retention by geography** (oldest local markets should retain best), and power-user curves (L30/L7). No numeric benchmarks are given — [a16z, 13 Metrics](https://a16z.com/13-metrics-for-marketplace-companies/)
- Third-party benchmark claims (treat cautiously): search-to-fill rate, time-to-first-booking, supplier repeat rate (relist within 30–60 days), buyer repeat (60–90 days), category density. Attributed to a16z 2024: best-in-class supply-side GMV retention ≥100% at month 12, with an average month-12 plateau of 45–50% — [Causo guide](https://hub.causo.ai/guides/marketplace-liquidity-seed) (not verified on a16z)
- Marketplaces fail mainly because they never reach or keep liquidity — [a16z glossary, search summary](https://a16z.com/marketplace-glossary/)
- Track one metric for supply churn or buyer bounce weekly. Budget founder time for the first ten sellers — [Rework](https://resources.rework.com/libraries/marketplace-growth/supply-first-vs-demand-first)
- Airbnb's critical-mass heuristic: about 300 listings, 100 reviewed, per market — [andrewchen.com](https://andrewchen.com/grow-marketplace-supply/amp)
- Thumbtack moved from manual RFQ responses to near-instant automated matching in 2017 while keeping quality, and regrets not doing so sooner — [NFX, Thumbtack](https://nfx.com/post/billion-dollar-marketplace-thumbtack)

### Inferences
**Pilot design (recommended, illustrative; all numbers are my estimates, not sourced benchmarks)**
- **Scope:** 1 trade (plumbing or electrical) × 1 Douala quarter (e.g. Bonamoussadi or Kotto) × 12 weeks, plus 2 weeks of setup.
- **Supply:** 25–40 verified artisans from 1–2 verification days.
- **Demand target:** 150–300 job requests over 12 weeks (about 15–25 a week by the end), from 100–200 unique customers, including 3–5 landlord/agency accounts. This is enough to estimate fill rate and repeat rate with roughly ±7–10 percentage-point precision at 95% confidence (n≈100–200 binomial). It is still a learning pilot, not a statistically powered trial.
- **Stack (Wizard-of-Oz):** a WhatsApp Business number with templated flows; a shared Google Sheet/Airtable as the "matching engine"; a simple web profile page per artisan, reached through the badge QR; mobile-money payment via a merchant number; follow-up rating by voice note or WhatsApp poll; before/after photos. Automate after about 100 manual matches show the repeated steps.
- **Phases:** Week 0–2 partner MoUs (association, chief, 2 churches, 2 hardware stores, 3 agencies) and verification day. Weeks 3–6 soft launch with partner demand only. Weeks 7–12 open launch in the quarter (radio spot, church announcements, demo day at the market).

**KPI dashboard and pilot "go" thresholds (my proposals)**
| Metric | Definition | Go threshold (proposed) |
|---|---|---|
| Fill rate | % requests matched to an artisan who accepts | ≥80% |
| Time to match | request → artisan confirmed | median ≤2 h (urgent), ≤24 h (planned) |
| Time to arrival | confirmed → on site | median ≤4 h urgent |
| Job completion rate | matched → completed and paid | ≥85% |
| Customer rating / NPS | 1–5 stars; NPS survey | ≥4.5 avg; NPS ≥40 |
| Dispute rate | % jobs with a formal complaint | ≤5%, all resolved within 7 days |
| Customer repeat rate | % customers booking again within 90 days | ≥25% |
| Artisan utilisation | on-platform jobs / artisan / week | ≥2 for active artisans |
| Artisan 60-day retention | % verified artisans with ≥1 job in last 30 days | ≥70% |
| Leakage proxy | % repeat jobs that rebooked via platform vs. reported direct contact (survey) | track; target rising |
| Proof-of-work coverage | % jobs with before/after photo and rating | ≥90% |
| Referral share | % new customers from referral/partners | ≥40% |
| CAC (blended) | marketing+field cost / new paying customer | track vs. take per job |

**Budget (rough order of magnitude, assumption):** a 12-week pilot could run with 2 founders, 2–3 part-time field ambassadors and a guarantee reserve. Major lines are ambassador stipends, badges/vests/stickers for 40 artisans, one verification day and one demo day, radio spots, the guarantee reserve, and a data/WhatsApp budget. I found **no sourced Cameroon cost benchmarks**, so the writer should present any figure as an estimate. The researcher's rough guess is in the low millions of FCFA (roughly 3–8M FCFA). *Unsourced.*

**Ambassador / agent model:** recruit 2–3 "ambassadeurs de quartier": young, locally known, ideally from a partner church or the association's apprentices. Pay a small base plus a per-activated-artisan and per-completed-job bonus (M-Pesa-style variable pay through existing networks). They run QR sign-ups at hardware stores, follow up jobs, take photo proof and collect ratings. Later, extend to mobile-money agents and hardware-store clerks as "points de confiance".

### Gaps
- No Cameroon or Africa-specific benchmark for home-services fill rate, time to match or repeat rate was found.
- No sourced Cameroon budget or salary benchmarks for field agents were retrieved.

---

## 7. Phased expansion (neighbourhood → city → other cities → CEMAC/Francophone Africa → beyond)

### Takeaway
Local network effects reward **density before breadth**. Expand only once the core atomic network meets liquidity and retention thresholds, then replicate a codified "city-launch playbook". Add **adjacent trades in the same quarter** first (shared customers and trust), then adjacent quarters, then Yaoundé, then CEMAC/Francophone markets that share currency, language and institutions.

### Cited Findings
- For **local network effects, don't expand too early**: new markets are expensive and can hurt core liquidity. Aim for #1 or #2 on the constrained side in one market, then replicate quickly (Uber city-by-city). DoorDash started in less competitive suburbs and used that cash for urban expansion. Diagnose the binding constraint per market. If supply-constrained, deepen supplier relationships. If demand-constrained, sell the same supply in new geographies, then adjacent categories — [NFX, Marketplace Expansion Framework](https://nfx.com/post/marketplace-expansion-framework)
- Once an atomic network works, build an adjacent one and repeat — [Sachin Rekhi primer](https://www.sachinrekhi.com/andrew-chen-the-cold-start-problem)
- Retention by geography: the oldest local markets should retain best. Per-market unit economics should improve (falling CAC, rising organic share) as a sign of network effects — [a16z, 13 Metrics](https://a16z.com/13-metrics-for-marketplace-companies/)
- Segment supply as you grow (Uber black cars → others, Airbnb luxury and business) — [andrewchen.com](https://andrewchen.com/grow-marketplace-supply/amp)
- Homejoy's 31+ cities and international expansion preceded its collapse — [Wikipedia: Homejoy](https://en.wikipedia.org/wiki/Homejoy). Jumia's repeated market exits, Cameroon included — [Wikipedia: Jumia](https://en.wikipedia.org/wiki/Jumia)
- Urban Company sequence: one category → more categories via acquisition → Gulf/Asia-Pacific → US — [Wikipedia: Urban Company](https://en.wikipedia.org/wiki/Urban_Company)
- Yango Africa sequence: Abidjan 2018 → Ghana 2019 → Senegal and Cameroon 2021 → Angola, DRC, Mozambique, Zambia 2022 → Namibia, Ethiopia, Morocco 2023. It faced regulatory pushback (Côte d'Ivoire VTC protests, Benin suspension 2024) — [Wikipedia: Yango](https://en.wikipedia.org/wiki/Yango_(company))
- Gozem operates across Togo, Benin, Cameroon, Gabon and Congo-Brazzaville — [Gozem](https://www.gozem.co/)
- CEMAC (Cameroon, CAR, Chad, Equatorial Guinea, Gabon, Republic of Congo) shares the Central African CFA franc, BEAC central bank (Yaoundé), COBAC banking commission, a common external tariff and free capital movement. Cameroon has the largest financial system in CEMAC — [Wikipedia: CEMAC](https://en.wikipedia.org/wiki/Economic_and_Monetary_Community_of_Central_Africa); [Wikipedia: Economy of Cameroon](https://en.wikipedia.org/wiki/Economy_of_Cameroon)
- M-Pesa's failures outside Kenya show that a model proven in one market can fail where bank penetration, regulation or awareness differ — [Wikipedia: M-Pesa](https://en.wikipedia.org/wiki/M-Pesa)

### Inferences
**Expansion gates (proposed): move to the next ring only when the current one holds these for 8 consecutive weeks**
- Fill rate ≥80%, median urgent time-to-match ≤2 h, 90-day customer repeat ≥25%, dispute rate ≤5%, artisan 60-day retention ≥70%, ≥40% of new demand organic or referral, and contribution margin per job ≥0 after guarantee costs.

**Sequence**
1. **Ring 0 (months 0–3):** 1 trade × 1 quarter (e.g. plumbing, Bonamoussadi).
2. **Ring 1 (months 3–9):** add 1–2 adjacent trades in the same quarter (electrician, then painter/tiler), reusing customers and partners. Then 2–3 adjacent quarters (Makepe, Kotto, Logpom) with the same trades.
3. **Ring 2 (months 9–18):** Douala-wide in 3–5 trades. Codify a **"Quarter Launch Kit"**: partner list template, verification-day script, ambassador hiring and pay, radio scripts in French/Pidgin, and KPI dashboard.
4. **Ring 3 (18–30 months):** Yaoundé (administrative capital, civil-servant middle class), then secondary cities chosen by density of middle-class housing and security (e.g. Bafoussam, Kribi with its port-driven construction growth, Limbe/Buea only if lockdown risk is acceptable). Use a **city-launcher model**: a local general manager with equity or a revenue share, or a franchise-like partner (e.g. an existing trade association or hardware chain), running the Kit.
5. **Ring 4 (30+ months):** CEMAC: Libreville (Gabon) and Brazzaville/Pointe-Noire (Congo) share the CFA franc, French and BEAC rules, and Gozem already operates there. Then WAEMU Francophone markets (Abidjan, Lomé, Cotonou, Dakar). Then Anglophone markets (Nigeria, Ghana), where competitors and agent infrastructure are denser.
6. **Choosing next trades:** prioritise frequency × trust pain × proof-of-work visibility × share of existing customers needing it. Choosing next cities: middle-class housing density, diaspora homebuilding, mobile-money penetration, security and regulatory clarity, and availability of a trusted local partner.

### Gaps
- No sourced density thresholds specific to home-services marketplaces were found (NFX gives no numeric density metric).
- No Cameroon secondary-city market data (Yaoundé middle-class size, Kribi construction boom) was retrieved.
- The regulatory regime for service platforms and data protection in other CEMAC states was not researched (likely covered by other researchers).

---

## 8. Hackathon / competition demo: showing one complete journey convincingly

### Takeaway
Judges reward a **single, real, end-to-end journey with evidence**, not breadth. Show one verified artisan (real or realistic), one customer request, the match, job completion with photo proof, payment and rating, and the reputation updating live. Frame it inside the atomic-network story (one trade, one quarter) with early pilot numbers if any exist.

### Cited Findings
- "It's not the product that should be insanely great, but the experience of being your user." The initial user "serves as the form for your mold" — [Paul Graham](https://paulgraham.com/ds.html)
- Atomic network framing: one stable, self-sustaining network, then replicate — [Sachin Rekhi primer](https://www.sachinrekhi.com/andrew-chen-the-cold-start-problem)
- Trust devices that worked elsewhere: background checks and verified qualifications, ratings ≥4.5★ shown at match time, and a money-back promise — [Kandua](https://kandua.com/). Free professional photos and host guarantee — [andrewchen.com](https://andrewchen.com/grow-marketplace-supply/amp)
- Faking activity carries "serious reputational risk" — [NFX](https://www.nfx.com/post/19-marketplace-tactics-for-overcoming-the-chicken-or-egg-problem)
- Liquidity metrics judges understand: fill rate, time to match — [a16z Glossary](https://a16z.com/the-marketplace-glossary/)

### Inferences
**Demo script (about 4 minutes, one persona pair)**
1. **Problem (20 s):** "Madame Ngo in Bonamoussadi has a burst pipe. She calls a cousin's 'plumber'; he doesn't come, or overcharges." State one pain statistic only if sourced elsewhere in the report.
2. **Verified artisan (40 s):** show Jean-Paul's profile, created at a verification day: ID verified ✓, residence attested by the quarter chief ✓, association member ✓, skills check ✓, photo portfolio. Show the physical badge and QR on stage, and scan it live.
3. **Request (30 s):** the customer sends a WhatsApp voice note in French/Pidgin, or uses the web form. The system (or Wizard-of-Oz operator, disclosed honestly) categorises it and shows the price range.
4. **Match (30 s):** 3 nearby verified plumbers ranked by distance, rating and response time. Jean-Paul accepts. Show the timestamp ("matched in 11 min").
5. **Job and proof (40 s):** before/after photos geotagged and timestamped, the QR sticker placed on the repaired pipe, a mobile-money payment into escrow, released on customer confirmation.
6. **Rating and reputation (30 s):** the customer rates (stars plus voice note). Jean-Paul's verified-jobs count and score update live, and the job appears on his public profile as a "verified job" (not a self-declared review).
7. **Dispute path (20 s):** one slide on the guarantee and the mediation escalation (platform → association → chief).
8. **Traction and plan (30 s):** pilot KPIs (fill rate, time to match, repeat, disputes), named partners (association, chief, church, hardware store), and the expansion rings.

**Demo hygiene**: use seeded but realistic data, clearly labelled. Have a pre-recorded fallback video for network failure (Douala connectivity and power cuts are real constraints, cf. Kiro'o's power-shortage experience — [Wikipedia: Kiro'o Games](https://en.wikipedia.org/wiki/Kiro%27o_Games)). Bring physical artefacts (vest, badge, sticker). Show an offline/SMS/WhatsApp fallback, since only 41.9% use the internet but 86.3% have mobile connections — [DataReportal](https://datareportal.com/reports/digital-2025-cameroon).

### Gaps
- No sourced evidence on what African startup competition judges (e.g. specific Cameroonian hackathons) weight most was retrieved.

---

## Numbered source list

1. Andrew Chen, "Solve a Hard Problem (Tinder)", ch. 8 of *The Cold Start Problem* — https://andrewchen.com/?p=4785
2. Sachin Rekhi, "A Primer on Network Effects from Andrew Chen's The Cold Start Problem" — https://www.sachinrekhi.com/andrew-chen-the-cold-start-problem
3. TwosApp (Medium), "The Cold Start Problem" summary — https://medium.com/twosapp/the-cold-start-problem-how-to-start-and-scale-network-effects-by-andrew-chen-813f0668c70f
4. Product Andrew, Cold Start Problem summary — https://productandrew.substack.com/p/product-31
5. Frog Capital, review of The Cold Start Problem — https://frogcapital.com/think-frog/the-cold-start-problem-by-andrew-chen/
6. Deepak Gupta, The Cold Start Problem book notes — https://guptadeepak.com/books/the-cold-start-problem/
7. Andrew Chen, tactics for growing marketplace supply — https://andrewchen.com/grow-marketplace-supply/amp
8. NFX (James Currier), "19 Tactics to Solve the Chicken-or-Egg Problem" — https://www.nfx.com/post/19-marketplace-tactics-for-overcoming-the-chicken-or-egg-problem
9. Sharetribe, James Currier at the Marketplace Conference — https://www.sharetribe.com/academy/marketplace-conference-4-2/
10. NFX, "The Billion Dollar Marketplace: Thumbtack" — https://nfx.com/post/billion-dollar-marketplace-thumbtack
11. NFX, Marketplace Expansion Framework — https://nfx.com/post/marketplace-expansion-framework
12. Lenny Rachitsky, "How to Kickstart and Scale a Marketplace, Part 2: Supply vs Demand" — https://www.lennysnewsletter.com/i/159750/step-decide-which-side-of-the-marketplace-to-concentrate-on
13. Lenny Rachitsky, "How the biggest consumer apps got their first 1,000 users" — https://www.lennysnewsletter.com/p/how-the-biggest-consumer-apps-got
14. Lenny's Newsletter, marketplaces archive — https://www.lennysnewsletter.com/t/marketplaces
15. echai.ventures, supply vs demand / empty-restaurant problem — https://echai.ventures/startingup/first-customers/i-run-a-two-sided-marketplace-do-i-get-my-first-customers-by-starting-with-supply-or-demand-and-how-do-i-avoid-the-empty-restaurant-problem
16. Rework, "Supply-First vs Demand-First Marketplace Launch" — https://resources.rework.com/libraries/marketplace-growth/supply-first-vs-demand-first
17. a16z, The Marketplace Glossary — https://a16z.com/the-marketplace-glossary/
18. a16z, Marketplace Glossary (2020 version) — https://a16z.com/marketplace-glossary/
19. a16z, 13 Metrics for Marketplace Companies — https://a16z.com/13-metrics-for-marketplace-companies/
20. a16z, Four Paths to Marketplace Success — https://a16z.com/four-paths-to-marketplace-success/
21. Causo, Marketplace liquidity seed benchmarks — https://hub.causo.ai/guides/marketplace-liquidity-seed
22. Chris Dixon, "Come for the tool, stay for the network" (2015) — https://cdixon.org/2015/01/31/come-for-the-tool-stay-for-the-network
23. Point Nine, "Come for the Network, Stay for the Tool" — https://writing.pointnine.com/p/come-for-the-network-stay-for-the
24. TechCrunch, critique of "come for the tool" — https://techcrunch.com/?p=1420204
25. a16z, Chris Dixon on AI, crypto and networks (2025) — https://a16z.com/ai-crypto-internet-chris-dixon/
26. Paul Graham, "Do Things That Don't Scale" — https://paulgraham.com/ds.html
27. Bill Gurley, "All Markets Are Not Created Equal: 10 Factors" — https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/
28. Wikipedia, Two-sided market (Rochet & Tirole; Parker & Van Alstyne) — https://en.wikipedia.org/wiki/Two-sided_market
29. HBR, Eisenmann, Parker & Van Alstyne, "Strategies for Two-Sided Markets" (2006) — https://hbr.org/2006/10/strategies-for-two-sided-markets
30. Founders Network, "Chicken Before Egg" — https://foundersnetwork.com/chicken-before-egg-getting-your-marketplace-startup-off-the-ground/
31. UX Planet, lessons from Etsy's marketplace — https://uxplanet.org/lessons-on-kickstarting-and-growing-a-marketplace-from-etsys-14b-handmade-empire-c060078bb669
32. Wikipedia, Homejoy — https://en.wikipedia.org/wiki/Homejoy
33. Wikipedia, TaskRabbit — https://en.wikipedia.org/wiki/TaskRabbit
34. Wikipedia, Urban Company — https://en.wikipedia.org/wiki/Urban_Company
35. Wikipedia, DoorDash — https://en.wikipedia.org/wiki/DoorDash
36. Wikipedia, Airbnb — https://en.wikipedia.org/wiki/Airbnb
37. Wikipedia, M-Pesa — https://en.wikipedia.org/wiki/M-Pesa
38. Wikipedia, Jumia — https://en.wikipedia.org/wiki/Jumia
39. Wikipedia, Glovo — https://en.wikipedia.org/wiki/Glovo
40. Wikipedia, Yango (company) — https://en.wikipedia.org/wiki/Yango_(company)
41. Gozem, Cameroon website — https://www.gozem.co/
42. Wikipedia, SweepSouth — https://en.wikipedia.org/wiki/SweepSouth
43. Kandua, homepage — https://kandua.com/
44. Wikipedia, Moniepoint — https://en.wikipedia.org/wiki/Moniepoint
45. Wikipedia, Kiro'o Games — https://en.wikipedia.org/wiki/Kiro%27o_Games
46. Wikipedia, Rotating savings and credit association — https://en.wikipedia.org/wiki/Rotating_savings_and_credit_association
47. Wikipédia (FR), Tontine — https://fr.wikipedia.org/wiki/Tontine
48. Wikipedia, Cameroonian Pidgin English — https://en.wikipedia.org/wiki/Cameroonian_Pidgin_English
49. Wikipedia, Camfranglais — https://en.wikipedia.org/wiki/Camfranglais
50. Wikipédia (FR), Chefferie traditionnelle au Cameroun — https://fr.wikipedia.org/wiki/Chefferie_traditionnelle_au_Cameroun
51. Wikipedia, Religion in Cameroon — https://en.wikipedia.org/wiki/Religion_in_Cameroon
52. Wikipedia, Media of Cameroon — https://en.wikipedia.org/wiki/Media_of_Cameroon
53. Wikipedia, Economy of Cameroon — https://en.wikipedia.org/wiki/Economy_of_Cameroon
54. Wikipedia, Douala — https://en.wikipedia.org/wiki/Douala
55. DataReportal, Digital 2025: Cameroon — https://datareportal.com/reports/digital-2025-cameroon
56. Wikipedia, Anglophone Crisis — https://en.wikipedia.org/wiki/Anglophone_Crisis
57. Wikipedia, Economic and Monetary Community of Central Africa (CEMAC) — https://en.wikipedia.org/wiki/Economic_and_Monetary_Community_of_Central_Africa
58. Wikipedia, Minimum viable product — https://en.wikipedia.org/wiki/Minimum_viable_product
