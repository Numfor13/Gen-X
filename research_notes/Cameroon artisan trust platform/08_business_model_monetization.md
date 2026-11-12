# Business Model and Monetization: Artisan Trust and Service-Matching Platform, Cameroon (no up-front artisan charges)

Research notes compiled 12 November 2026. Currency XAF (Central African CFA franc), pegged at EUR 1 = XAF 655.957 ([Wikipedia: Central African CFA franc](https://en.wikipedia.org/wiki/Central_African_CFA_franc)). Each figure is labelled with its year where the source gives one.

**Method note for the report writer:** Partway through this run, the shared web-search budget for all agents ran out (limit: 200 searches). After that I gathered evidence by fetching primary pages directly. Several targets returned 403, 404, 502 or DNS errors: GSMA SOTIR, PwC's old URLs, the Checkatrade blog, the Bark help centre, Catalyst Fund, the Urban Company NSE letter, World Bank API endpoints and Cameroon Tribune. Where that happened I fell back on search-result snippets and flagged the lower confidence. **I found no reliable XAF price lists for artisan jobs or Facebook CPMs for Cameroon.** Those numbers appear as explicit assumptions in Inferences and need field validation.

---

## 1. Revenue model options and evidence from comparables

### Takeaway
Global comparables use four main mechanisms:
- **Lead fees:** Thumbtack, Bark and MyBuilder.
- **Artisan subscriptions:** Checkatrade.
- **Customer-side service and trust fees:** TaskRabbit.
- **Managed-marketplace commissions plus product sales:** Urban Company, which reaches a take rate of roughly 30–35% of transaction value.

Lead fees and pre-paid subscriptions both charge the tradesperson before they earn, so the hard constraint rules them out. The models that fit are customer-paid fees, success-based commissions deducted only from completed and paid jobs, B2B contracts and ancillary revenue (products, finance, sponsors).

### Cited Findings
**Lead-fee marketplaces (ruled out by the constraint)**
- **Thumbtack's model:** Thumbtack charges pros for leads whether or not the lead converts. Joining is free and there is no subscription, and unconverted leads are not refunded. Pros report paying about $10 to over $100 per lead. — [Housecall Pro](https://www.housecallpro.com/resources/what-is-thumbtack-how-it-works/)
- **Thumbtack's fee history:** Thumbtack first tried commissions, which did not work because it did not control the transaction. It then tried a provider subscription (about 10,000 providers signed up), which did not scale with provider revenue. It moved to per-lead fees. — [Sharetribe Academy](https://www.sharetribe.com/academy/why-thumbtack-succeeded/); [Kreezalid](https://www.kreezalid.com/blog/78499-thumbtack-business-model)
- **Thumbtack's size:** A 2020 secondary source estimated revenue at $150–200m, about $1bn of annual transaction volume, and a $1.7bn valuation (2019). — [Kreezalid](https://www.kreezalid.com/blog/78499-thumbtack-business-model)
- **Thumbtack ARR (unconfirmed):** A secondary source puts Thumbtack's ARR at about $400m in 2024, up from about $300m. This is not confirmed by filings. — [Think Insights](https://thinkinsights.net/digital-transformation/thumbtacks-two-sided-marketplace)
- **Bark's pricing:** Bark sells credits to professionals. Its help centre listed about $2.35 per credit, varying by country. Leads cost roughly 4–30 credits (UK estimate). Credits bought from 1 November 2025 expire after 3 months and are non-refundable. Leads are shared with up to about five pros. — [Bark Help](https://help.bark.com/hc/en-gb/articles/13346288068892-What-is-a-credit-and-how-much-does-it-cost) (search snippet; the page returned 403 when fetched); [Whito: Bark cost UK](https://whito.co.uk/trades/tools/bark-cost-uk/)
- **MyBuilder's pricing:** MyBuilder has no membership fee. Tradespeople pay a shortlist fee, roughly £2.50–£37.50 in a 2021 FAQ snapshot, charged whether or not they win the job. Refunds are rare. — [MyBuilder FAQ (Wayback 2023)](https://webcf.waybackmachine.org/web/20230921192556/https://www.mybuilder.com/help/faq-finding-work); [Trade2Base](https://www.trade2base.com/blog/checkatrade-vs-mybuilder-uk)
- **MyBuilder trade complaints:** In 2026, Trustpilot reviewers complained about paying shortlist fees for fake or dead leads. — [Trustpilot MyBuilder reviews](https://www.trustpilot.com/review/www.mybuilder.com?page=8)

**Artisan subscriptions (Checkatrade)**
- **Entry price:** Checkatrade's basic plan starts at £30 + VAT a month with no joining fee. Basic members are not shown in search results. — [Checkatrade blog](https://www.checkatrade.com/blog/trade/start-business/does-checkatrade-cost-money/) (search snippet)
- **Typical spend:** Other sources put Checkatrade at "from £59/month", with typical all-in spend of £100–300 a month and 12-month minimum terms. — [Whito](https://whito.co.uk/tools/checkatrade-cost-uk/)
- **Annual cost:** Trade2Base cites roughly £800–1,200 a year for a sole trader. — [Trade2Base](https://www.trade2base.com/blog/checkatrade-vs-mybuilder-uk)

**Customer-side service and trust fees (TaskRabbit)**
- **Who pays:** Clients pay a percentage-based service fee on top of the Tasker's rate. Taskers keep 100% of reimbursements. — [TaskRabbit Support](https://support.taskrabbit.com/hc/en-us/articles/204411610-What-s-the-Taskrabbit-Service-Fee)
- **Trust & Support fee:** A separate Trust & Support fee funds the Happiness Pledge, safety measures and support, and does not reduce Tasker pay. — [TaskRabbit Trust & Support fee](https://support.taskrabbit.com/hc/articles/204940570)
- **Fee levels:** A secondary source says the service fee is 15% (cut from 30% in 2018) and the trust fee about 7.5%. It says Taskers pay a one-time $25 registration fee and no commission. TaskRabbit's official pages give no percentages, and fees reportedly vary by metro and category. — [Productmint](https://productmint.com/taskrabbit-business-model-how-does-taskrabbit-make-money/)

**Managed marketplace (Urban Company)**
- **FY25 results:** Urban Company reported FY25 revenue of ₹1,144 crore on a Net Transaction Value (NTV) of ₹3,271 crore. Revenue split:
  - platform services: ₹742 crore
  - consumer memberships: ₹98 crore
  - its own water-purifier products: ₹116 crore
  - product sales to service professionals: ₹188 crore

  Advertising was ₹207 crore and profit before tax ₹28.5 crore. — [Entrackr](https://entrackr.com/fintrackr/urban-company-posts-rs-1144-cr-revenue-and-rs-285-cr-pbt-in-fy25-9373371); [Free Press Journal](https://www.freepressjournal.in/business/urban-company-turns-profitable-ahead-of-ipo-with-240-crore-net-profit-in-fy25)
- **Implied take rate:** Revenue/NTV implies about 35% for FY25 (India about 33%). — derived from the [Urban Company shareholder letter table (NSE)](https://nsearchives.nseindia.com/corporate/URBANCO_23012026153501_UC_Shareholders_Letter_23012026.pdf) (search snippet)
- **Commission share:** Commissions and fees were 28.3% of service professionals' average gross earnings in 9M FY26. Consumers also pay convenience fees and memberships. — [Inc42](https://inc42.com/features/inside-urban-companys-marketplace-model-what-it-keeps-from-every-booking/)
- **InstaHelp:** S&P Global expects take rates for the newer InstaHelp line to stay at 22–23%. — [S&P Global Market Intelligence](https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/04/urban-company-revenue-to-triple-by-2030-as-take-rates-and-platform-monetization-rise) (search snippet)

**Angi (lead/network model under pressure)**
- **Revenue decline:** FY2025 revenue was about $1.03bn (−13%). — [iTiger summary](https://www.itiger.com/hans/news/2613297362)
- **Q4 2025 requests:** Proprietary service requests rose 15%. Network requests fell 69% after the "homeowner choice" change in January 2025. — [Angi IR](https://ir.angi.com/static-files/a90e25f5-b2c4-480a-aaea-86f20a928ca6); [Barchart](https://www.barchart.com/story/news/164455/angi-q4-deep-dive-traffic-headwinds-cost-cuts-and-ai-product-expansion)

**Take-rate benchmarks**
- **Definition and framing:** a16z defines take rate as the share of GMV the marketplace captures. Managed marketplaces can justify higher take rates. Some marketplaces start at zero and add a take rate later. — [a16z: 13 metrics](https://a16z.com/13-metrics-for-marketplace-companies/); [a16z Field Notes (Deb Liu)](https://a16z.com/podcast/field-notes-breakout-strategies-with-deb-liu-part-2/)
- **Ranges:** Tidemark, cited by an aggregator, puts take rates at about 2–3% for lead generation and 25–30% for managed services. This is a weak secondary source. — [knowledgelib (citing Tidemark)](https://knowledgelib.io/business/industry-benchmarks/marketplace-industry-benchmarks-2026/2026.md)
- **William Blair study:** The study of 300+ marketplaces found the highest take rates in education, beauty/wellness and apparel. — [William Blair](https://williamblair.com/Insights/Proprietary-Study-of-300-Plus-Private-and-Public-Company-Take-Rates) (search snippet; the page returned 404 on fetch)

**African comparable**
- **SweepSouth (South Africa):** SweepSouth matches households with vetted domestic workers. It offers on-demand bookings and permanent placements, and promotes background checks, ratings and an insurance policy. — [SweepSouth](https://sweepsouth.com/)

### Inferences
- **The comparables split cleanly into permitted and ruled out.**
  - **Ruled out:** Lead fees (Thumbtack, Bark, MyBuilder) and up-front subscriptions (Checkatrade) charge the artisan before income. They breach the hard requirement.
  - **Permitted:** customer-side service/trust fees (TaskRabbit), success commissions deducted from payouts (Urban Company-style), product/tool sales to artisans (Urban Company's ₹188 crore line), consumer memberships, and B2B/sponsor revenue.
- **Total take rates (customer fee plus artisan commission) of about 12–20% of labour value look plausible for Cameroon.** Urban Company's 30–35% reflects a heavily managed, standardised service (training, products, pricing control). That is not realistic at launch in Douala.
- **The Angi and Thumbtack histories suggest two lessons:**
  1. Owning the transaction (proprietary bookings, payments) beats reselling leads.
  2. Commission models fail when the platform does not control payment, so escrow/payment capture is a prerequisite for any commission model.

### Gaps
- I could not access Thumbtack or TaskRabbit audited financials or the current official fee percentages.
- I found no published unit economics for an African artisan marketplace (for example Lynk in Kenya; its site timed out).

---

## 2. Disintermediation: keeping transactions on-platform without charging artisans up front

### Takeaway
Platforms that do not own payment and protection lose transactions off-platform (Thumbtack's early commission failure). The levers with evidence are:
- payment protection and guarantees funded by a customer fee (TaskRabbit);
- integrated payment, invoicing and scheduling tools (Thumbtack's later strategy);
- tool and material supply to workers (Urban Company);
- consumer memberships (Urban Company, Thumbtack Plus).

In Cameroon, low trust in online transactions makes escrow and guarantees the core value proposition rather than an add-on.

### Cited Findings
- **Why Thumbtack's commission model failed:** Customers could contact providers directly. Thumbtack's response was to add payments, scheduling, invoicing and business-management tools so that recurring invoicing flows through the platform. — [Sharetribe Academy](https://www.sharetribe.com/academy/why-thumbtack-succeeded/)
- **Customer-funded protection:** TaskRabbit's Trust & Support fee, paid by clients, funds the Happiness Pledge, safety and support. This is a precedent for customers paying explicitly for protection. — [TaskRabbit Trust & Support fee](https://support.taskrabbit.com/hc/articles/204940570)
- **Retention through supplies and memberships:** Urban Company sells tools and consumables to its professionals (₹188 crore of FY25 revenue) and sells consumer memberships (₹98 crore). — [Entrackr](https://entrackr.com/fintrackr/urban-company-posts-rs-1144-cr-revenue-and-rs-285-cr-pbt-in-fy25-9373371)
- **Repeat purchasing through the platform:** About 75% of Urban Company's early water-purifier customers renewed filters through the platform. — [Inc42](https://inc42.com/features/inside-urban-companys-marketplace-model-what-it-keeps-from-every-booking/)
- **Trust is a known barrier in Cameroon:** The US International Trade Administration names "low trust in online transactions", limited digital payment infrastructure and cybersecurity risks as e-commerce challenges in Cameroon. It also notes that Facebook and Instagram strongly influence purchase decisions. — [ITA Cameroon eCommerce guide](https://www.trade.gov/country-commercial-guides/cameroon-ecommerce)
- **Fraud is a top concern:** Mobile money agents outside Yaoundé cited fraud and scams as their main concern (survey of 807 agents, 2024). — [ICTD](https://www.ictd.ac/blog/cameroon-mobile-money-agents-struggling-to-increase-revenue/)
- **Cross-network friction:** MoMo–Orange Money interoperability is "improved but imperfect", with cross-network transfers costing about 2% and taking longer. — [Kolonell (2026)](https://kolonell.com/en/blog/cameroon-mobile-payment-landscape-mtn-orange-2026)

### Inferences
- **Recommended anti-leakage stack, at zero up-front cost to artisans:**
  - **(a) Escrow-backed "Garantie" for customers:** funds held until the customer confirms completion, with free rework or a partial refund if a dispute is upheld. It is valid only when paid in-app.
  - **(b) Instant payout to the artisan's MoMo/OM wallet on release.** The platform absorbs cross-network fees as a perk, given the roughly 2% cross-network friction.
  - **(c) Reputation that only accrues for on-platform jobs:** verified-job count, ratings and a "Certifié" badge. This becomes portable credit data for MFI loans.
  - **(d) Artisan tools:** free quotes and invoices on WhatsApp, a job calendar and a deposit request for materials.
  - **(e) Benefits unlocked by on-platform volume:** tool/material discounts, micro-insurance and loan eligibility.
  - **(f) Customer loyalty:** a small credit on the next booking, and a household membership for repeat users.
- **Accept some leakage on repeat local jobs.** Use a low commission on repeat clients (the "relationship rate" idea in a16z's framing) rather than punitive enforcement.

### Gaps
- I found no Cameroon-specific data on disintermediation rates or on consumers' stated willingness to pay for guarantees. A field survey is needed.

---

## 3. Cameroon payment rails: fees, APIs, aggregators, taxes, escrow feasibility

### Takeaway
Two operators dominate mobile money: MTN MoMo at about 52% and Orange Money at about 40% (2026 estimate). Fees have fallen sharply:
- **P2P transfers:** zero operator fee in-app since late 2025 / early 2026.
- **In-app withdrawals:** 1% from XAF 5,000 since July 2025.
- **Merchant collections:** about 1–1.75% (pawaPay 1.75% all-in; MTN's API "between 1%").

State levies are a 0.2% tax on transfers and withdrawals (since 2022) plus XAF 4 per transaction (since January 2025). Escrow is feasible in practice by collecting into a merchant or aggregator collections account and disbursing on completion. However, no operator documents a native split or escrow product, and the regulatory status of holding customer funds needs legal review.

### Cited Findings
**Market structure and volumes**
- **Market shares (estimated 2026):** MTN MoMo about 52%, Orange Money about 40%, Express Union and others about 8%. — [Kolonell (2026)](https://kolonell.com/en/blog/cameroon-mobile-payment-landscape-mtn-orange-2026)
- **Volumes (COBAC data):** Mobile money transactions reached 2.72bn in 2025, up from 2.39bn in 2024 (+13.8%). Value was XAF 32,667bn in 2025 (+13.7%). — [EcoMatin (2026)](https://ecomatin.net/cameroun-letat-a-preleve-43-milliards-fcfa-sur-les-transferts-dargent-en-2025-en-hausse-de-35)
- **Accounts and GDP share:** Nearly 25m registered accounts (about 62% of CEMAC active accounts). Mobile money is about 5% of GDP (GSMA 2025). The account usage rate fell to 51.3% in 2023 from 64% in 2022. — [Financial Afrik (2025)](https://www.financialafrik.com/2025/04/14/cameroun-le-mobile-money-contribue-a-5-du-pib/)

**Consumer fees**
- **MTN (March 2026):** zero-fee MoMo transfers (excluding taxes) and withdrawals cut by 25% to 1%, with a transfer ceiling of XAF 1,000,000. — [AllAfrica/Camer.be (2026)](https://fr.allafrica.com/stories/202603060718.html); [Camer.be](https://www.camer.be/92577/11:1/zero-frais-paye-ou-la-revolution-concurrentielle-du-mobile-money-de-mtn-cameroun-cameroon.html)
- **Orange (September 2025):** zero fees on all transfers via the Max It digital platform. Customers pay only the 0.2% tax and XAF 4. Orange withdrawals were cut to 1% in July 2025. — [EcoMatin (2025)](https://ecomatin.net/cameroun-orange-money-accelere-la-guerre-des-tarifs-avec-le-zero-frais-sur-les-transferts-dargent)
- **Withdrawal fees by channel (2025):**
  - **Apps** (Max It since 2 July 2025, MoMo App since 10 July 2025): 1% from XAF 5,000; 1.5% below that.
  - **USSD and agents:** 1.5%, for example XAF 1,504 on XAF 100,000 and XAF 4,004 on XAF 500,000.
  - **Deposits:** free.

  — [Digital Business Africa (Nov 2025)](https://www.digitalbusiness.africa/paiement-mobile-au-cameroun-max-it-orange-et-momo-app-mtn-generalisent-les-retraits-a-1-des-5-000-f-cfa/); [Digital Business Africa: Orange 2025 grid](https://www.digitalbusiness.africa/cameroun-voici-les-nouveaux-tarifs-2025-dorange-money/); [Digital Business Africa: MoMo 2025](https://www.digitalbusiness.africa/cameroun-les-tarifs-de-retrait-de-mtn-mobile-money-momo-en-2025/)
- **Earlier MTN cut (October 2024):** withdrawals reduced 25%, for example XAF 100,000 cost XAF 1,500 instead of 2,000. MTN cited 12m subscribers. — [EcoMatin (Oct 2024)](https://ecomatin.net/transactions-electroniques-au-cameroun-mtn-reduit-de-25-le-cout-des-retraits-dargent-sur-son-reseau)
- **Small cash-outs remain costly:** about 3.5% under XAF 10,000 (MTN) and about 4.0% under XAF 5,000 (Orange). These are 2026 estimates from a single vendor blog. — [Kolonell](https://kolonell.com/en/blog/mobile-money-cash-out-fees-central-africa-comparison-2026)
- **Older grids:** Kamerpower grids are labelled "2025" but appear outdated or inconsistent with the cuts above. Do not use them. — [Kamerpower](https://kamerpower.com/fr/grille-tarifaire-orange-money-cameroun-2021-2022-frais-orange-money/)

**New competitor**
- **Wave:** COBAC authorised Wave's entry via Commercial Bank Cameroon in June 2025. Wave reportedly holds about 70% of merchant payments in Côte d'Ivoire. — [EcoMatin (2025)](https://ecomatin.net/cameroun-orange-money-accelere-la-guerre-des-tarifs-avec-le-zero-frais-sur-les-transferts-dargent)

**Merchant collections and APIs**
- **MTN MoMo Collections API (Cameroon):**
  - Customers can pay by USSD, app or web, or approve a merchant debit request.
  - The fee is "between 1%", set by business type and average ticket, and is negotiable. There is no per-API-call cost.
  - Funds land in a partner collections account and can be liquidated to a bank or paid onward as B2B/B2C disbursements.
  - BEAC transaction limits apply.

  — [MTN MoMo API: Cameroon Collections](https://momoapi.mtn.com/Cameroon_Collection_productDetails)
- **No documented split-payment answer:** A developer building a Cameroon property marketplace asked MTN (May 2026) about automatic 90/10 split payments, KYC, fees and failed-split handling. The community manager did not answer and pointed to the GoLive/solution-review process. — [MTN MoMo Developer Community](https://momodevelopercommunity.mtn.com/momo-south-africa-developers-58/inquiry-about-marketplace-split-payment-integration-with-mtn-mobile-money-483)
- **Operator merchant fees, limits and settlement (2026 estimate):**
  - Collection fees: MTN 1.0–1.5%, Orange 1.0–1.7%.
  - Daily limits: XAF 2,000,000 for verified merchant accounts, XAF 500,000 for personal accounts.
  - Settlement: T+1 for MoMo, T+1 to T+2 for Orange.
  - APIs: MoMo API and Orange Money Web Payment, with merchant QR codes and webhooks.

  — [Kolonell](https://kolonell.com/en/blog/cameroon-mobile-payment-landscape-mtn-orange-2026)

**Aggregators**
- **pawaPay (published):**
  - Collections: MTN 1.75% (0.75% operator + 1% pawaPay); Orange 1.77% (0.77% + 1%).
  - Disbursements: MTN 1.3% (0.3% + 1%); Orange 1%.
  - Fees exclude taxes; Enterprise tier, contact sales.

  — [pawaPay fees](https://pawapay.io/fees)
- **Collection-fee estimates (2026, one vendor blog):** NotchPay 1.5–2.5% (T+1 to T+3), Fapshi 1.7–3% (T+1 to T+2), MeSomb 1.5–2% (T+2), Flutterwave 2–3.5% (T+2 to T+5). — [Kolonell comparison](https://kolonell.com/fr/blog/comparatif-agregateurs-paiement-cameroun-2026)
- **Lower estimates from the same blog:** Another article gives aggregator commissions of 0.5–1% on top of about 1.5% operator fees (PayDunya about 2.5% total; NotchPay and Fapshi about 2–2.5%). It notes payouts can add 0.5–1%. The two Kolonell articles conflict. — [Kolonell price grid](https://kolonell.com/fr/blog/grille-tarifaire-agregateur-paiement-cameroun-2026)
- **CinetPay:** listed at 3.5% plus mobile-money integration fees. Kora is listed at 0.5–2.5%. — [PaymentProviders.io](https://paymentproviders.io/country/cm)
- **Other estimates:** A Côte d'Ivoire guide quotes CinetPay at about 3% + XAF 50 for mobile money. Local aggregators generally run about 2.5–3.5% with 24–72h settlement. Opening a merchant account needs an RCCM number and a tax ID and takes 1–2 weeks. — [Kolonell: CinetPay CI](https://kolonell.com/en/blog/cinetpay-integration-fees-ivory-coast-2026); [Kolonell: choosing a gateway](https://kolonell.com/en/blog/choosing-online-payment-gateway-central-africa-business-london-2026)
- **NotchPay:** Its docs say it charges "a small fee per transaction" with no setup or monthly fees. It was founded in 2019 by Franklin Kamga and B. Zile Tankeu. — [NotchPay developer docs](https://developer.notchpay.co/faq.md); [WeAreTech Africa](https://www.wearetech.africa/en/fils-uk/tech-stars/cameroon-s-franklin-kamga-eases-online-payments-for-businesses)
- **Campay:** offers direct MoMo/Orange APIs and is described as requiring more custom logic. No public fee schedule was found. — [DusuPay overview](https://www.dusupay.com/post/top-payment-gateways-in-cameroon); [Campay WordPress plugin](https://yor.wordpress.org/plugins/campay-api/)
- **Others:** Fapshi and Monetbil publish no fee schedules in the sources consulted. — [TechChantier on Fapshi](https://techchantier.com/blog/simplifying-payments-in-cameroon-fapshis-seamless-solution); [Monetbil plugin](https://fair.pm/packages/plugins/monetbil-woocommerce-gateway/)

**Taxes on mobile money**
- **0.2% TTA:** In force since 1 January 2022 on mobile money and other traceable transfers and withdrawals. Bank transfers and tax payments are excluded. Operators collect it and remit by the 15th of the following month. — [Journal du Cameroun (2022)](https://fr.journalducameroun.com/cameroun-hausse-effective-du-cout-des-transactions-du-mobile-money-cameroun/); [EcoMatin (2021)](https://ecomatin.net/loi-de-finances-une-taxe-de-02-sur-les-transferts-dargent-via-mobile-money-en-vigueur-des-2022)
- **XAF 4 levy and revenue:** A flat XAF 4 per domestic transfer was added in January 2025 (2025 Finance Law). Transfer-tax revenue was XAF 42.7bn in 2025, against XAF 31.6bn in 2024 (+35.1%) and a target of XAF 38bn. — [EcoMatin (2026)](https://ecomatin.net/cameroun-letat-a-preleve-43-milliards-fcfa-sur-les-transferts-dargent-en-2025-en-hausse-de-35); [EcoMatin on the XAF 4 debate](https://ecomatin.net/virements-retraits-paiements-par-carte-transferts-de-titresau-cameroun-le-prelevement-de-4-fcfa-suscite-debat)
- **IMF caution:** IMF economists warned the tax could be inequitable and hinder already-low financial inclusion. — [ITWeb (2022)](https://itweb.africa/content/xA9POvNZBPPvo4J8)
- **#EndMobileMoneyTax:** Rebecca Enonchong led the campaign, arguing the tax is "paid twice". — [ITWeb (2022)](https://itweb.africa/content/G98YdMLY18zqX2PD)
- **Effect on agents:** Agent revenues declined after the tax, especially in Yaoundé. Agents keep 40–45% of commissions. — [ICTD (2024)](https://www.ictd.ac/blog/cameroon-mobile-money-agents-struggling-to-increase-revenue/)
- **2026 Finance Law:** Coverage of Law No. 2025/012 does not mention any change to the 0.2% tax or the XAF 4 levy. — [EcoMatin (2026)](https://ecomatin.net/cameroun-letat-a-preleve-43-milliards-fcfa-sur-les-transferts-dargent-en-2025-en-hausse-de-35); [Deloitte (2026 LF)](https://blog.avocats.deloitte.fr/cameroun-les-principales-innovations-de-la-loi-de-finances-pour-2026/)

### Inferences
- **Payment-cost assumption for modelling:** about 1.75% on collection plus about 1–1.3% on payout, plus the 0.2% tax and XAF 4 where they apply. That is roughly 3–3.5% of GMV all-in, falling to about 2.5% with negotiated direct MTN/Orange contracts at volume. Price the customer fee to cover this.
- **Practical escrow design:**
  1. The customer pays into the platform's collections account (via pawaPay/NotchPay or direct MoMo/OM APIs).
  2. Funds are held until the customer confirms or a 48–72h auto-release timer expires.
  3. The platform disburses to the artisan wallet minus any success commission.
- **Holding third-party funds may require partnering with a licensed payment-service provider or bank.** In CEMAC this falls under COBAC/BEAC payment-services rules; I did not verify the specific regulation. Wave's CBC partnership shows the bank-partner route is used.
- **Fee deflation (zero-fee P2P, 1% withdrawals, Wave's entry) lowers platform payment costs.** It also lowers the "convenience" bar: customers can already pay artisans cheaply, so the platform must sell protection, not convenience.

### Gaps
- No official Orange Money Web Payment merchant fee schedule, Smobilpay/Maviance pricing or Flutterwave Cameroon pricing was retrievable.
- Whether the 0.2% tax applies to merchant collections and disbursements, as opposed to P2P, is not confirmed.
- BEAC/COBAC rules on escrow and safeguarding for marketplaces were not verified.
- The GSMA State of the Industry 2025 report returned 403.

---

## 4. Pricing benchmarks in XAF, artisan incomes and the minimum wage

### Takeaway
Reliable published price lists for artisan jobs in Douala and Yaoundé were not found in this run. Usable income anchors:
- **Numbeo average net salary (November 2026):** about XAF 131,700/month in Douala and about XAF 79,500 in Yaoundé. These are crowd-sourced and probably skewed to formal-sector respondents.
- **SMIG:** revised in 2023 (private sector) and 2024 (public sector). The commonly reported value is XAF 41,875/month, but the amount could not be confirmed here.

Job-price figures below are hypotheses for field validation.

### Cited Findings
- **Douala (Numbeo, updated 6 November 2026):** average monthly net salary XAF 131,718; inexpensive meal XAF 2,500; one-way transport ticket XAF 375; taxi start XAF 350; 1-bedroom rent outside centre XAF 186,667; litre of petrol XAF 840. — [Numbeo Douala](https://www.numbeo.com/cost-of-living/in/Douala)
- **Yaoundé (Numbeo, updated 2 October 2026):** average net salary XAF 79,487; inexpensive meal XAF 2,000. Numbeo flags these as low-contributor estimates. — [Numbeo Yaoundé](https://www.numbeo.com/cost-of-living/in/Yaounde-Cameroon)
- **Minimum wage effective dates:** WageIndicator lists 21 March 2023 for the private sector and 23 February 2024 for state employees. The amounts are behind registration. — [WageIndicator Cameroon](https://wageindicator.org/salary/minimum-wage/cameroon)
- **Outdated minimum wage:** Wikipedia still lists XAF 36,270/month (2014), which is outdated. — [Wikipedia: minimum wages by country](https://en.wikipedia.org/wiki/List_of_minimum_wages_by_country)
- **Macro context:** GDP per capita about $2,027 nominal (2025, IMF) and inflation 3.4% (2025 estimate). — [Wikipedia: Economy of Cameroon](https://en.wikipedia.org/wiki/Economy_of_Cameroon)
- **Poverty:** About 4 in 10 Cameroonians live below the national poverty line. — [World Bank Cameroon overview](https://www.worldbank.org/en/country/cameroon/overview)

### Inferences
**Working price hypotheses (labour only, Douala, 2026, unverified; validate in 30–50 artisan and customer interviews)**

| Job | Hypothesised labour price |
|---|---|
| Electrician call-out and small repair | XAF 5,000–15,000 |
| Plumbing leak repair | XAF 5,000–20,000 |
| Full apartment rewiring or plumbing | XAF 100,000–500,000+ |
| Tailoring a made-to-measure garment | XAF 5,000–25,000 |
| Light mechanic service (labour) | XAF 10,000–30,000 |

- **Basis for the hypotheses:** a meal at XAF 2,500 and a taxi start at XAF 350 suggest that a labour hour in the low thousands of XAF and short jobs under XAF 20,000 are plausible.
- **Platform fees in absolute terms:** At a XAF 10,000–15,000 average ticket, a 10% customer fee is only XAF 1,000–1,500 per job. Monetisation from small household jobs alone is thin.
- **Artisan income range:** Artisan monthly income plausibly sits between the SMIG (about XAF 42k if 41,875 is confirmed) and the Douala Numbeo average (about XAF 132k). Even a 5% commission deducted at payout should be framed as "you pay only when you have been paid".

### Gaps
- No INS (EESI) informal-sector income data was retrievable; the INS site showed only placeholders.
- There are no verified XAF price lists for electricians, plumbers, tailors or mechanics.
- The SMIG amount is unconfirmed (41,875 is widely reported but not verified here).

---

## 5. Consumer willingness to pay for trust, and the diaspora opportunity

### Takeaway
Direct Cameroonian evidence on willingness to pay for guarantees was not found. Indirect signals are positive:
- trust is the named e-commerce barrier;
- consumers already absorb mobile money fees and a 0.2% tax;
- TaskRabbit shows customers globally accept explicit trust fees.

Remittances (about $787m, 1.6% of GDP, 2023/24) are the strongest case for a higher-ticket "pay from abroad, verified local artisan" product.

### Cited Findings
- **Remittances:** Cameroon received about $787m, equal to 1.6% of GDP, per World Bank data for 2023/2024. — [Wikipedia: remittances received (World Bank data)](https://en.wikipedia.org/wiki/List_of_countries_by_remittances_received)
- **Global context:** Global remittances were about $656bn in 2023. — [World Bank / KNOMAD brief](https://www.worldbank.org/en/topic/migration/brief/remittances-knomad)
- **Diaspora size (dated and fragmented):** France about 58,800 (OECD 2012); Canada about 55,095; US about 25,100 (OECD 2012); Germany about 25,000 (2016 GIZ study); Italy about 15,013. — [Wikipedia: Cameroonian diaspora](https://en.wikipedia.org/wiki/Cameroonian_diaspora)
- **Delivery channel:** Remittance firms deliver to MTN MoMo and Orange Money wallets. WorldRemit ran zero-fee mobile-money promotions from the UK and Canada to Cameroon (2021). — [WorldRemit](https://www.worldremit.com/en/blog/product/our-new-and-improved-prices-for-sending-money-to-cameroon)
- **Trust barrier:** Low trust in online transactions is a named barrier in Cameroon. — [ITA](https://www.trade.gov/country-commercial-guides/cameroon-ecommerce)
- **Customer trust fees (precedent):** TaskRabbit charges clients a separate Trust & Support fee. — [TaskRabbit](https://support.taskrabbit.com/hc/articles/204940570)
- **Financial access:** Global Findex 2025 reports 79% global account ownership. Its regional and Cameroon figures were not visible on the landing page. — [World Bank Global Findex](https://www.worldbank.org/en/publication/globalfindex)

### Inferences
- **Diaspora product:** milestone escrow for renovation and construction. The diaspora client funds each milestone, a verifier photographs and inspects, then funds are released.
- **Pricing and economics:** A 5–10% project-management fee on tickets of XAF 500,000–5,000,000 yields XAF 25,000–500,000 per project. That is one to two orders of magnitude more per transaction than household repairs. Payment could be by card or remittance-to-wallet.
- **Sizing (assumptions):** If 5–10% of the roughly $787m remittance flow funds building and repair work, the flow is about $40–80m a year. That is roughly XAF 23–46bn at an assumed XAF 575/USD (assumed FX, not sourced). Capturing 0.5–1% gives XAF 115–460m GMV a year.

### Gaps
- No KNOMAD 2025 country figure or Cameroon-specific data on diaspora spending on construction was retrievable; the World Bank API returned 502.
- I found no survey of Cameroonian consumers' willingness to pay for guarantees.

---

## 6. Unit economics benchmarks and CAC (digital vs agents)

### Takeaway
Global managed-services marketplaces reach take rates of 20–35% with heavy marketing; Urban Company spent ₹207 crore on advertising against ₹3,271 crore NTV in FY25, about 6.3%. In Cameroon, small tickets cap contribution per job at roughly XAF 500–1,000. CAC must therefore be very low, through artisan-led referral, WhatsApp and field agents. Facebook reaches about 5.9m people (19.6% of the population, late 2025).

### Cited Findings
- **Urban Company FY25:** NTV ₹3,271 crore; advertising ₹207 crore (flat year on year); first profitable year (PBT ₹28.5 crore). — [Entrackr](https://entrackr.com/fintrackr/urban-company-posts-rs-1144-cr-revenue-and-rs-285-cr-pbt-in-fy25-9373371)
- **InstaHelp per-order economics (Q1 FY27):** average order value ₹138 and adjusted loss of ₹346 per order. Management estimates break-even at about ₹300 per order. This shows that low-ticket on-demand services lose money without scale and price discipline. — [Inc42](https://inc42.com/features/inside-urban-companys-marketplace-model-what-it-keeps-from-every-booking/)
- **Metrics frameworks:** a16z recommends tracking CAC falling by local market as network effects grow, cohort retention (newer cohorts should retain better), match rate and "zeros", and GMV concentration. — [a16z](https://a16z.com/13-metrics-for-marketplace-companies/)
- **Cameroon digital reach (DataReportal Digital 2026, data October 2025):**
  - 12.6m internet users (41.9%)
  - 5.90m social media user identities (19.6%)
  - Facebook ad reach of 5.90m
  - 29.0m cellular connections (96.4%)

  — [DataReportal: Digital 2026 Cameroon](https://datareportal.com/reports/digital-2026-cameroon)
- **Social commerce:** Facebook and Instagram strongly influence purchase decisions in Cameroon. — [ITA](https://www.trade.gov/country-commercial-guides/cameroon-ecommerce)
- **Field-agent economics:** Mobile money agents (a field-agent analogue) keep 40–45% of commissions. In a 2024 survey of former agents, 21.95% cited high operating expenses as a reason for quitting. — [ICTD](https://www.ictd.ac/blog/cameroon-mobile-money-agents-struggling-to-increase-revenue/)

### Inferences
**Illustrative unit economics per household job (assumptions only)**
- **Revenue:**
  - Labour ticket XAF 15,000.
  - Customer protection fee 10% = XAF 1,500.
  - Artisan success commission 5% deducted at payout = XAF 750.
  - Gross take is XAF 2,250 (15%). Net of 19.25% VAT if fees are VAT-inclusive: about XAF 1,890.
- **Variable costs:**
  - Payments about 3% of XAF 16,500 collected (about XAF 500), plus payout about 1% (about XAF 140), plus levies.
  - Guarantee reserve about 2% of GMV (XAF 300).
  - Support and verification about XAF 300.
- **Contribution:** about **XAF 650 per job (about €1)**.

**Lifetime value and allowable CAC (assumptions)**
- A customer doing 3 jobs a year retained 2 years is worth about XAF 3,900 in contribution.
- Allowable blended CAC is about XAF 1,300–2,000 (€2–3).
- This implies most demand must come from:
  - artisans onboarding their existing clients, because escrow and reputation benefit them;
  - WhatsApp referral credits;
  - neighbourhood field agents paid per verified first booking (for example XAF 500–1,000 — an assumption);
  - only targeted Facebook ads.

**Where the larger per-transaction economics sit**
- **B2B SLA contracts (assumption):** retainers of XAF 50,000–250,000/month plus per-job margin.
- **Diaspora projects:** XAF 25,000–500,000 fee per project.
- **Materials affiliate margin:** 2–5% of materials value (assumption).

**Retention targets to model**
- 30–40% of customers rebooking within 6 months.
- At least 60% monthly active artisans among those verified.

### Gaps
- No Facebook/Meta CPM or CPC data for Cameroon was found. Treat any CPM figure as a test-budget assumption, for example by running a XAF 100,000 pilot campaign.
- No African home-services marketplace has published CAC or retention figures that I could find.

---

## 7. Market sizing: TAM/SAM/SOM for launch (Douala, home repair trades) and expansion

### Takeaway
On transparent assumptions, Douala household electrical and plumbing labour spend is on the order of XAF 25–30bn a year. The digitally reachable SAM is about XAF 9bn. A 3-year SOM of 3–5% of SAM gives about XAF 270–450m GMV. Revenue at a 15% take is about XAF 40–70m (€60–105k) from household jobs alone. Therefore B2B, diaspora and ancillary revenue must carry the business.

### Cited Findings
- **Douala:** population 3,816,500 (city, 2025 estimate) and 4,346,000 (metro). It is Cameroon's economic capital and the CEMAC commercial hub. — [Wikipedia: Douala](https://en.wikipedia.org/wiki/Douala)
- **Cameroon:** population over 28.37m (2023); GDP growth estimated at 3.4% (2025), with an average of 3.7% projected for 2026–28. — [World Bank](https://www.worldbank.org/en/country/cameroon/overview)
- **GDP:** $60.58bn nominal (2025, IMF); services 50.6% of GDP (2024 estimate). — [Wikipedia: Economy of Cameroon](https://en.wikipedia.org/wiki/Economy_of_Cameroon)
- **Internet penetration:** 41.9% nationally (late 2025). — [DataReportal](https://datareportal.com/reports/digital-2026-cameroon)
- **E-commerce market:** projected at $505.8m by 2025, with a 14.2% CAGR to 2029. — [ITA](https://www.trade.gov/country-commercial-guides/cameroon-ecommerce)
- **Remittances:** $787m (2023/24). — [Wikipedia (World Bank data)](https://en.wikipedia.org/wiki/List_of_countries_by_remittances_received)

### Inferences
All inputs below except the population figure are assumptions to validate.

- **TAM, Douala home-repair labour:** 4.35m people ÷ 5 per household = about 870k households, × XAF 30,000 a year on electrical, plumbing and appliance repair labour = **about XAF 26bn (about €40m)**.
- **TAM, Douala all artisan trades:** adding tailoring, auto mechanics, masonry, carpentry and painting plausibly multiplies the total by 3–5x.
- **SAM:** about 35% of Douala households are smartphone and mobile-money capable and open to booking digitally. The national internet penetration is 41.9%; Douala is likely higher, but booking intent is lower. This gives about 300k households and **about XAF 9bn**.
- **SOM, year 3:** 3–5% of SAM = **XAF 270–450m GMV** in household jobs.
- **Additional year-3 SOM:**
  - **B2B:** 20–40 accounts × XAF 1.5–3m a year in jobs = XAF 30–120m GMV.
  - **Diaspora projects:** 50–150 projects × XAF 1.5m average = XAF 75–225m GMV.
- **Expansion:** Yaoundé next (similar scale; its population was not retrieved here), then Buea/Limbe and Bafoussam. CEMAC uses the same currency (XAF), and Cameroon accounts for a large share of regional mobile money activity (71% of operations in 2022). — [Financial Afrik](https://www.financialafrik.com/2025/04/14/cameroun-le-mobile-money-contribue-a-5-du-pib/)

### Gaps
- There are no household-count, household-repair-spend or Yaoundé population figures from INS in this run.
- The sizing rests on assumptions that must be validated with a household survey.

---

## 8. Funding landscape

### Takeaway
African startup funding was about $3.8bn in 2025 (Briter) and $2.2bn for January–September 2026 (Africa: The Big Deal, −4% year on year). It is concentrated in South Africa, Kenya, Egypt and Nigeria, and Cameroon is barely visible in headline data. A Cameroonian pre-seed artisan platform should plan on non-dilutive and catalytic capital first:
- grants and seed prizes such as TEF's $5,000;
- cloud credits (AWS Activate up to $5k self-funded or $200k via a provider);
- accelerators;
- donor or government youth-employment and TVET contracts.

Angel or seed equity should come only once traction is shown.

### Cited Findings
- **Briter, 2025:** African companies disclosed $3.8bn in funding, with volume up 32% and deals up 8%. Shares: South Africa 32%, Kenya 29%, Egypt 15%, Nigeria 8%. Fintech was the most funded sector. Cameroon and Central Africa are not mentioned. — [Briter Africa Investment Report 2025](https://www.briter.co/insights/reports/africa-investment-report-2025); [Briter](https://www.briter.co/)
- **Africa: The Big Deal, 2026:** $2.2bn raised January–September 2026 (−4% YoY; equity +23%, debt −33%). Monthly totals: July 2026 $102m (44 startups), October 2026 $183m (34 startups). 311 startups raised $100k+ deals in 2026 to Q3. Fintech was 41% of H1 2026 funding. No Cameroon mention. — [Africa: The Big Deal archive](https://thebigdeal.substack.com/archive)
- **TEF Entrepreneurship Programme:** $5,000 non-refundable seed capital for Africans 18+ with an idea or a business under 5 years old. Applications run 1 January–1 March. TEF reports over $100m disbursed to over 24,000 entrepreneurs since 2015. — [Tony Elumelu Foundation](https://www.tonyelumelufoundation.org/tef-entrepreneurship-programme)
- **AWS Activate:** Founders tier up to $5,000 in credits (starting at $1,000); Portfolio tier up to $200,000 via an Activate Provider such as an accelerator or VC. Pre-Series B, founded within 10 years. — [AWS Activate](https://aws.amazon.com/startups/credits)
- **Google for Startups Accelerator: Africa:** equity-free, 3 months hybrid (April–June 2026 cohort), aimed at growth-stage revenue-generating startups with an ML/AI preference. Cloud credits are available subject to approval. — [Google for Startups](https://startup.google.com/programs/accelerator/africa/)
- **Silicon Mountain (Buea):** The term was coined by Rebecca Enonchong at BarCamp Cameroon in 2013. The annual SMCON conference (since 2015) draws over 500 attendees. The 2017 internet shutdowns in the anglophone regions hurt the ecosystem. — [Wikipedia: Silicon Mountain](https://en.wikipedia.org/wiki/Silicon_Mountain)
- **ActivSpaces:** describes itself as Cameroon's first innovation hub; its site was being redeveloped and was offline in November 2026. — [ActivSpaces](https://activspaces.com/)
- **Orange Digital Centers:** a 17-country network offering training, certification, entrepreneurship support and funding. Its Cameroon page was a "coming soon" placeholder. — [Orange Digital Centers](https://www.orangedigitalcenters.com/country/cm/home)
- **Other Cameroonian fintechs:** OnDjoss, a payments startup, was reported planning expansion in January 2024. — [Disrupt Africa (archive)](https://old.disruptafrica.com/)
- **Startup tax incentive:** The 2026 Finance Law exempts customs duties and taxes on imported equipment for startup development. — [Deloitte](https://blog.avocats.deloitte.fr/cameroun-les-principales-innovations-de-la-loi-de-finances-pour-2026/)

### Inferences
- **Realistic first-24-month capital stack:**
  - founder and angel money (XAF 10–30m);
  - TEF $5k-type grants and pitch prizes;
  - AWS and Google credits;
  - one sponsor-funded verification and training contract with a donor, MFI or corporate (for example a materials brand or an insurer);
  - then a $150–500k pre-seed from Francophone-Africa-focused angels or funds once there is GMV traction.
- **Why donors fit:** The platform's youth-employment and skills-certification angle fits donor and TVET budgets (World Bank, AfDB, GIZ, EU). This is a legitimate revenue line, as "certification and verification as a service", not just grants.

### Gaps
- The Partech 2025 report page returned 404, so no Partech figures.
- The Catalyst Fund site was unreachable.
- I could not retrieve data on GIZ Make-IT, Seedstars, Founder Institute, MTN incubator or Orange Fab Cameroon programmes, World Bank or AfDB Cameroon youth-employment project IDs (the World Bank project API returned none), or Cameroon-specific VC totals.

---

## 9. Taxes affecting the model

### Takeaway
Fees are subject to 19.25% VAT; VAT invoicing applies above XAF 50m turnover under the actual-earnings regime. Corporate tax is 33% (27.5% reduced for turnover below XAF 3bn, subject to criteria), with a 2.2% or 5.5% minimum tax on turnover. The model should therefore be structured as an agent/commission marketplace, so that recognised turnover is the platform's fees rather than total job GMV. Mobile money levies (0.2% plus XAF 4) add friction. The 2026 Finance Law signals growing taxation of platform-linked gig workers.

### Cited Findings
- **VAT:** 19.25% standard; 10% reduced rate on certain social-housing transactions (2026 Finance Law); exports zero-rated. VAT invoicing applies to persons with turnover of XAF 50m or more under the actual-earnings regime. — [PwC Tax Summaries: Cameroon other taxes](https://taxsummaries.pwc.com/republic-of-cameroon/corporate/other-taxes)
- **Other business taxes:**
  - Business licence tax: 0.159–0.494% of prior-year turnover, with new enterprises exempt in year one.
  - Employer payroll tax: 2.5% (Housing Loan and Employment Fund).
  - Social security: employer 11.2% and employee 4.2%, capped at XAF 750,000/month.

  — [PwC](https://taxsummaries.pwc.com/republic-of-cameroon/corporate/other-taxes)
- **Corporate income tax:** 33% including the 10% council surtax for turnover above XAF 3bn; 27.5% reduced rate below XAF 3bn subject to criteria. Minimum tax is 2.2% or 5.5% of turnover depending on regime and is payable if it exceeds CIT. — [PwC: corporate income](https://taxsummaries.pwc.com/republic-of-cameroon/corporate/taxes-on-corporate-income)
- **2026 Finance Law (Law No. 2025/012):**
  - Non-resident digital service providers face a significant-economic-presence regime (registration and monthly e-filing).
  - VTC drivers on transport platforms pay a 5% liberatory tax on 20% of the gross fare.
  - VAT is now due on deposits and advances for goods.
  - Real-time taxation of certain transactions is planned.
  - Startup equipment imports are exempt from customs duties.

  — [Deloitte](https://blog.avocats.deloitte.fr/cameroun-les-principales-innovations-de-la-loi-de-finances-pour-2026/)
- **Mobile money levies:** 0.2% TTA (since 2022) plus XAF 4 per transfer (since 2025). — [EcoMatin](https://ecomatin.net/cameroun-letat-a-preleve-43-milliards-fcfa-sur-les-transferts-dargent-en-2025-en-hausse-de-35)

### Inferences
- **The minimum tax on turnover (2.2–5.5%) is the critical design issue.** If the platform books gross job value as revenue (a principal or "managed" model), the minimum tax could exceed its entire margin on small jobs. Contracts and invoicing should therefore make the platform an intermediary that collects on the artisan's behalf, with platform revenue being only the customer fee and the success commission. Tax counsel should confirm this.
- **The VTC precedent suggests platforms may later be required to withhold presumptive tax for artisans.** The platform could position this as a formalisation service: tax receipts, an income history and eligibility for CNPS social security. That would also be a donor-attractive feature.

### Gaps
- I did not verify a Cameroon-specific "digital services tax" for resident platforms, the startup-law incentives (if any) beyond customs, or the exact VAT treatment of escrowed funds versus fees.

---

## 10. Financial projection assumptions (for the report writer's model)

### Takeaway
A credible 3-year Douala-first plan starts with one or two trades (electrical plus plumbing), free to artisans. Revenue comes from customer protection fees, a success commission deducted at payout (introduced after an artisan's first earnings), B2B contracts and diaspora milestone projects. Base-case year-3 revenue is roughly XAF 100–250m (about €150–380k). Break-even depends on B2B and diaspora mix and a lean team, not on household volume alone.

### Cited Findings
- **Payment costs:** about 1.75% collection and 1–1.3% disbursement via an aggregator. — [pawaPay](https://pawapay.io/fees)
- **Consumer withdrawal fee:** 1% in-app. — [Digital Business Africa](https://www.digitalbusiness.africa/paiement-mobile-au-cameroun-max-it-orange-et-momo-app-mtn-generalisent-les-retraits-a-1-des-5-000-f-cfa/)
- **VAT on fees:** 19.25%. — [PwC](https://taxsummaries.pwc.com/republic-of-cameroon/corporate/other-taxes)
- **Employer costs:** social security 11.2% plus payroll tax 2.5%. — [PwC](https://taxsummaries.pwc.com/republic-of-cameroon/corporate/other-taxes)
- **Wage anchors:** average Douala net salary XAF 131,718/month (Numbeo, November 2026), useful for staff and agent cost assumptions. — [Numbeo](https://www.numbeo.com/cost-of-living/in/Douala)
- **Comparable marketing intensity:** Urban Company advertising was about 6.3% of NTV in FY25. — [Entrackr](https://entrackr.com/fintrackr/urban-company-posts-rs-1144-cr-revenue-and-rs-285-cr-pbt-in-fy25-9373371)
- **Low-ticket break-even risk:** Urban Company InstaHelp was loss-making at a ₹138 average order value, with break-even estimated at about ₹300. — [Inc42](https://inc42.com/features/inside-urban-companys-marketplace-model-what-it-keeps-from-every-booking/)

### Inferences
These are assumptions, not sourced facts.

| Driver | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| Verified active artisans (end of year) | 250 | 900 | 2,000 |
| Household jobs per month (end of year) | 600 | 2,500 | 6,000 |
| Average household labour ticket (XAF) | 15,000 | 16,000 | 17,000 |
| Customer protection fee | 8–10% (min XAF 500) | 10% | 10% |
| Artisan success commission (deducted at payout) | 0% (free launch) | 5% after 3rd paid job | 5–8% |
| Annual household GMV (XAF) | ~60m | ~300m | ~900m |
| B2B accounts (property managers, hotels, banks, NGOs) | 3 | 12 | 30 |
| B2B GMV (XAF), 10–15% margin plus retainers | 10m | 60m | 150m |
| Diaspora milestone projects | 10 | 50 | 120 |
| Diaspora GMV (XAF), 7% fee | 15m | 75m | 180m |
| Ancillary revenue (materials affiliate 2–5%, MFI referral fees, sponsor-funded certification) | XAF 5m | XAF 25m | XAF 60m |
| Blended net revenue (XAF) | ~15m | ~70m | ~200m |
| Team (FTE) | 5 | 10 | 16 |

- **Other assumptions:**
  - Guarantee reserve 2% of protected GMV.
  - Payment cost 3% of collected value.
  - Blended CAC of at most XAF 2,000 per new customer.
  - 6-month customer rebooking rate of 35%.
  - Artisan monthly activity of 60%.
- **Sensitivities to model:**
  - Take rate between 10% and 18%.
  - Share of payments made through escrow (leakage).
  - Diaspora project volume.
  - B2B retainer adoption.
  - Payment-cost compression from Wave's entry.

### Gaps
- None of these drivers are validated with Cameroonian pilot data. A 90-day Douala pilot should measure ticket size, escrow uptake, willingness to pay the protection fee, leakage and CAC by channel.

---

## 11. Recommendation: the most believable model for Cameroon

### Takeaway
**Recommended: a "Garantie-first" hybrid with three parts.**
1. **Customer-paid protection or booking fee:** about 8–10% of labour, minimum XAF 500, covering escrow, verified artisans and rework or refund.
2. **Success commission deducted only from released escrow payouts:** 0% at launch, then 5–8% after an artisan's third paid job, so artisans never pay before earning.
3. **Higher-margin B2B and diaspora streams:** B2B repair-network contracts and diaspora milestone-escrow projects.

These are layered on sponsor-funded verification and certification and, later, embedded finance referrals (tool/material loans and micro-insurance via MFIs and insurers) and materials affiliate commissions. Avoid lead fees and up-front subscriptions entirely. Optional "Pro" visibility can be paid only from an artisan's platform earnings wallet.

### Cited Findings
- **Charge-before-earning models have documented drawbacks:**
  - Lead fees charge pros regardless of outcome and generate complaints about paying for dead leads (Thumbtack, MyBuilder, Bark). — [Housecall Pro](https://www.housecallpro.com/resources/what-is-thumbtack-how-it-works/); [Trustpilot](https://www.trustpilot.com/review/www.mybuilder.com?page=8); [Bark](https://help.bark.com/hc/en-gb/articles/13346288068892-What-is-a-credit-and-how-much-does-it-cost)
  - Subscriptions such as Checkatrade's (£30–59+/month with a 12-month term) charge before income. — [Whito](https://whito.co.uk/tools/checkatrade-cost-uk/)
- **Commission models need payment control:** Thumbtack's early commission model failed for lack of control over the transaction. — [Sharetribe](https://www.sharetribe.com/academy/why-thumbtack-succeeded/)
- **Customers can be asked to pay for protection:** TaskRabbit's customer-paid service and Trust & Support fees show this works. — [TaskRabbit](https://support.taskrabbit.com/hc/en-us/articles/204411610-What-s-the-Taskrabbit-Service-Fee)
- **Products, memberships and commissions together can reach profitability:** Urban Company's mix of commissions, consumer fees, memberships and product sales to professionals reached profitability in FY25. — [Entrackr](https://entrackr.com/fintrackr/urban-company-posts-rs-1144-cr-revenue-and-rs-285-cr-pbt-in-fy25-9373371)
- **Cameroon's rails can support escrow-style collection and onward payout at about 1–1.75% collection cost:**
  - MTN collections account with B2B/B2C onward payments. — [MTN MoMo API](https://momoapi.mtn.com/Cameroon_Collection_productDetails)
  - Aggregator disbursements. — [pawaPay](https://pawapay.io/fees)
- **Trust deficit is the central problem:** "Low trust in online transactions" is named as a barrier. — [ITA](https://www.trade.gov/country-commercial-guides/cameroon-ecommerce)
- **The diaspora flow is substantial:** about $787m (2023/24). — [Wikipedia (World Bank data)](https://en.wikipedia.org/wiki/List_of_countries_by_remittances_received)

### Inferences
- **Why this model is the most believable for Cameroon:**
  1. **It meets the hard constraint literally.** The artisan's first franc of cost comes out of money already earned and released through escrow.
  2. **It monetises the scarce asset, trust,** on the side that feels the risk (customers, landlords, the diaspora), using a fee pattern TaskRabbit has validated.
  3. **Escrow is what makes commission collectable,** solving Thumbtack's original problem.
  4. **Household jobs alone are too small** (about XAF 650 contribution per job). B2B contracts and diaspora projects give the per-transaction economics needed to cover a lean team.
  5. **It builds an on-platform reputation and income ledger.** That record is the asset for MFI credit-data partnerships, micro-insurance and donor-funded certification, which are revenue lines that do not tax artisans.
- **Sequencing:**
  - **Months 0–6:** free for artisans; customer fee only; verify artisans with partner trade associations; sign 2–3 B2B pilots.
  - **Months 6–12:** introduce the success commission after the 3rd paid job; launch the diaspora milestone-escrow product.
  - **Year 2:** materials affiliate deals (cement, electrical and hardware suppliers); MFI loan-referral and data partnership; a sponsor-funded certification cohort.
  - **Year 3:** expand to Yaoundé, then Buea/Limbe.
- **Key risks:**
  - customers bypass escrow for small repeat jobs;
  - regulatory status of holding funds (partner with a licensed PSP or bank);
  - minimum tax on turnover if revenue is mis-structured;
  - thin household margins;
  - an anglophone-region security and connectivity risk for Buea expansion (2017 shutdown precedent). — [Wikipedia: Silicon Mountain](https://en.wikipedia.org/wiki/Silicon_Mountain)

### Gaps
- There is no in-market evidence yet of Cameroonian customers' acceptance of a 10% protection fee, or of escrow uptake. This is the single most important pilot metric.

---

## Sources (numbered)

1. Wikipedia, Central African CFA franc: https://en.wikipedia.org/wiki/Central_African_CFA_franc
2. Housecall Pro, What is Thumbtack and how it works: https://www.housecallpro.com/resources/what-is-thumbtack-how-it-works/
3. Sharetribe Academy, Why Thumbtack succeeded: https://www.sharetribe.com/academy/why-thumbtack-succeeded/
4. Kreezalid, Thumbtack business model: https://www.kreezalid.com/blog/78499-thumbtack-business-model
5. Think Insights, Thumbtack's two-sided marketplace: https://thinkinsights.net/digital-transformation/thumbtacks-two-sided-marketplace
6. Bark Help Centre, What is a credit: https://help.bark.com/hc/en-gb/articles/13346288068892-What-is-a-credit-and-how-much-does-it-cost
7. Whito, Bark cost UK: https://whito.co.uk/trades/tools/bark-cost-uk/
8. MyBuilder FAQ (Wayback, 2023): https://webcf.waybackmachine.org/web/20230921192556/https://www.mybuilder.com/help/faq-finding-work
9. Trade2Base, Checkatrade vs MyBuilder: https://www.trade2base.com/blog/checkatrade-vs-mybuilder-uk
10. Trustpilot, MyBuilder reviews: https://www.trustpilot.com/review/www.mybuilder.com?page=8
11. Checkatrade blog, Does Checkatrade cost money: https://www.checkatrade.com/blog/trade/start-business/does-checkatrade-cost-money/
12. Whito, Checkatrade cost UK: https://whito.co.uk/tools/checkatrade-cost-uk/
13. TaskRabbit Support, Service Fee: https://support.taskrabbit.com/hc/en-us/articles/204411610-What-s-the-Taskrabbit-Service-Fee
14. TaskRabbit Support, Trust & Support Fee: https://support.taskrabbit.com/hc/articles/204940570
15. Productmint, TaskRabbit business model: https://productmint.com/taskrabbit-business-model-how-does-taskrabbit-make-money/
16. Entrackr, Urban Company FY25 results: https://entrackr.com/fintrackr/urban-company-posts-rs-1144-cr-revenue-and-rs-285-cr-pbt-in-fy25-9373371
17. Free Press Journal, Urban Company turns profitable FY25: https://www.freepressjournal.in/business/urban-company-turns-profitable-ahead-of-ipo-with-240-crore-net-profit-in-fy25
18. Urban Company shareholder letter (NSE, Jan 2026): https://nsearchives.nseindia.com/corporate/URBANCO_23012026153501_UC_Shareholders_Letter_23012026.pdf
19. Inc42, Inside Urban Company's marketplace model: https://inc42.com/features/inside-urban-companys-marketplace-model-what-it-keeps-from-every-booking/
20. S&P Global Market Intelligence, Urban Company take rates (2026): https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/04/urban-company-revenue-to-triple-by-2030-as-take-rates-and-platform-monetization-rise
21. iTiger, Angi FY2025 summary: https://www.itiger.com/hans/news/2613297362
22. Angi Investor Relations, Q4 2025 materials: https://ir.angi.com/static-files/a90e25f5-b2c4-480a-aaea-86f20a928ca6
23. Barchart, Angi Q4 deep dive: https://www.barchart.com/story/news/164455/angi-q4-deep-dive-traffic-headwinds-cost-cuts-and-ai-product-expansion
24. a16z, 13 metrics for marketplace companies: https://a16z.com/13-metrics-for-marketplace-companies/
25. a16z, Field Notes with Deb Liu (take rates): https://a16z.com/podcast/field-notes-breakout-strategies-with-deb-liu-part-2/
26. knowledgelib, Marketplace industry benchmarks 2026 (citing Tidemark): https://knowledgelib.io/business/industry-benchmarks/marketplace-industry-benchmarks-2026/2026.md
27. William Blair, Study of 300+ company take rates: https://williamblair.com/Insights/Proprietary-Study-of-300-Plus-Private-and-Public-Company-Take-Rates
28. SweepSouth: https://sweepsouth.com/
29. US ITA, Cameroon eCommerce country commercial guide: https://www.trade.gov/country-commercial-guides/cameroon-ecommerce
30. ICTD, Cameroon mobile money agents (2024): https://www.ictd.ac/blog/cameroon-mobile-money-agents-struggling-to-increase-revenue/
31. Kolonell, Cameroon mobile payment landscape MTN/Orange 2026: https://kolonell.com/en/blog/cameroon-mobile-payment-landscape-mtn-orange-2026
32. EcoMatin, State levied XAF 43bn on transfers in 2025: https://ecomatin.net/cameroun-letat-a-preleve-43-milliards-fcfa-sur-les-transferts-dargent-en-2025-en-hausse-de-35
33. Financial Afrik, Mobile money 5% of GDP (2025): https://www.financialafrik.com/2025/04/14/cameroun-le-mobile-money-contribue-a-5-du-pib/
34. AllAfrica / Camer.be, MTN "zéro frais" (March 2026): https://fr.allafrica.com/stories/202603060718.html
35. Camer.be, MTN zero-fee revolution: https://www.camer.be/92577/11:1/zero-frais-paye-ou-la-revolution-concurrentielle-du-mobile-money-de-mtn-cameroun-cameroon.html
36. EcoMatin, Orange Money zero-fee transfers (Sept 2025): https://ecomatin.net/cameroun-orange-money-accelere-la-guerre-des-tarifs-avec-le-zero-frais-sur-les-transferts-dargent
37. Digital Business Africa, Max It & MoMo App 1% withdrawals (Nov 2025): https://www.digitalbusiness.africa/paiement-mobile-au-cameroun-max-it-orange-et-momo-app-mtn-generalisent-les-retraits-a-1-des-5-000-f-cfa/
38. Digital Business Africa, Orange Money 2025 tariffs: https://www.digitalbusiness.africa/cameroun-voici-les-nouveaux-tarifs-2025-dorange-money/
39. Digital Business Africa, MTN MoMo withdrawal tariffs 2025: https://www.digitalbusiness.africa/cameroun-les-tarifs-de-retrait-de-mtn-mobile-money-momo-en-2025/
40. EcoMatin, MTN cuts withdrawal costs 25% (Oct 2024): https://ecomatin.net/transactions-electroniques-au-cameroun-mtn-reduit-de-25-le-cout-des-retraits-dargent-sur-son-reseau
41. Kolonell, Mobile money cash-out fees Central Africa 2026: https://kolonell.com/en/blog/mobile-money-cash-out-fees-central-africa-comparison-2026
42. Kamerpower, Orange Money tariff grid (flagged outdated): https://kamerpower.com/fr/grille-tarifaire-orange-money-cameroun-2021-2022-frais-orange-money/
43. MTN MoMo API, Cameroon Collections product details: https://momoapi.mtn.com/Cameroon_Collection_productDetails
44. MTN MoMo Developer Community, marketplace split payment inquiry (2026): https://momodevelopercommunity.mtn.com/momo-south-africa-developers-58/inquiry-about-marketplace-split-payment-integration-with-mtn-mobile-money-483
45. pawaPay, Fees: https://pawapay.io/fees
46. Kolonell, Comparatif agrégateurs paiement Cameroun 2026: https://kolonell.com/fr/blog/comparatif-agregateurs-paiement-cameroun-2026
47. Kolonell, Grille tarifaire agrégateur paiement Cameroun 2026: https://kolonell.com/fr/blog/grille-tarifaire-agregateur-paiement-cameroun-2026
48. PaymentProviders.io, Cameroon: https://paymentproviders.io/country/cm
49. Kolonell, CinetPay integration fees Côte d'Ivoire 2026: https://kolonell.com/en/blog/cinetpay-integration-fees-ivory-coast-2026
50. Kolonell, Choosing an online payment gateway for Central Africa 2026: https://kolonell.com/en/blog/choosing-online-payment-gateway-central-africa-business-london-2026
51. NotchPay developer FAQ: https://developer.notchpay.co/faq.md
52. WeAreTech Africa, Franklin Kamga / Notch Pay: https://www.wearetech.africa/en/fils-uk/tech-stars/cameroon-s-franklin-kamga-eases-online-payments-for-businesses
53. DusuPay, Top payment gateways in Cameroon: https://www.dusupay.com/post/top-payment-gateways-in-cameroon
54. Campay API WordPress plugin: https://yor.wordpress.org/plugins/campay-api/
55. TechChantier, Fapshi: https://techchantier.com/blog/simplifying-payments-in-cameroon-fapshis-seamless-solution
56. Monetbil WooCommerce gateway: https://fair.pm/packages/plugins/monetbil-woocommerce-gateway/
57. Journal du Cameroun, Hausse effective du coût des transactions mobile money (2022): https://fr.journalducameroun.com/cameroun-hausse-effective-du-cout-des-transactions-du-mobile-money-cameroun/
58. EcoMatin, 0.2% tax on mobile money transfers from 2022: https://ecomatin.net/loi-de-finances-une-taxe-de-02-sur-les-transferts-dargent-via-mobile-money-en-vigueur-des-2022
59. EcoMatin, XAF 4 levy debate: https://ecomatin.net/virements-retraits-paiements-par-carte-transferts-de-titresau-cameroun-le-prelevement-de-4-fcfa-suscite-debat
60. ITWeb, IMF cautions on Cameroon mobile money tax (2022): https://itweb.africa/content/xA9POvNZBPPvo4J8
61. ITWeb, Users mobilise against mobile money tax (2022): https://itweb.africa/content/G98YdMLY18zqX2PD
62. Deloitte Avocats, Cameroon 2026 Finance Law innovations: https://blog.avocats.deloitte.fr/cameroun-les-principales-innovations-de-la-loi-de-finances-pour-2026/
63. Numbeo, Cost of living Douala (Nov 2026): https://www.numbeo.com/cost-of-living/in/Douala
64. Numbeo, Cost of living Yaoundé (Oct 2026): https://www.numbeo.com/cost-of-living/in/Yaounde-Cameroon
65. WageIndicator, Minimum wage Cameroon: https://wageindicator.org/salary/minimum-wage/cameroon
66. Wikipedia, List of minimum wages by country: https://en.wikipedia.org/wiki/List_of_minimum_wages_by_country
67. Wikipedia, Economy of Cameroon: https://en.wikipedia.org/wiki/Economy_of_Cameroon
68. World Bank, Cameroon overview: https://www.worldbank.org/en/country/cameroon/overview
69. Wikipedia, List of countries by remittances received (World Bank data): https://en.wikipedia.org/wiki/List_of_countries_by_remittances_received
70. World Bank, Remittances / KNOMAD brief: https://www.worldbank.org/en/topic/migration/brief/remittances-knomad
71. Wikipedia, Cameroonian diaspora: https://en.wikipedia.org/wiki/Cameroonian_diaspora
72. WorldRemit, Prices for sending money to Cameroon: https://www.worldremit.com/en/blog/product/our-new-and-improved-prices-for-sending-money-to-cameroon
73. World Bank, Global Findex 2025: https://www.worldbank.org/en/publication/globalfindex
74. DataReportal, Digital 2026: Cameroon: https://datareportal.com/reports/digital-2026-cameroon
75. Wikipedia, Douala: https://en.wikipedia.org/wiki/Douala
76. Briter, Africa Investment Report 2025: https://www.briter.co/insights/reports/africa-investment-report-2025
77. Briter (homepage, reports index): https://www.briter.co/
78. Africa: The Big Deal, archive (2026 posts): https://thebigdeal.substack.com/archive
79. Tony Elumelu Foundation, Entrepreneurship Programme: https://www.tonyelumelufoundation.org/tef-entrepreneurship-programme
80. AWS Activate credits: https://aws.amazon.com/startups/credits
81. Google for Startups Accelerator: Africa: https://startup.google.com/programs/accelerator/africa/
82. Wikipedia, Silicon Mountain: https://en.wikipedia.org/wiki/Silicon_Mountain
83. ActivSpaces: https://activspaces.com/
84. Orange Digital Centers (Cameroon page): https://www.orangedigitalcenters.com/country/cm/home
85. Disrupt Africa (archive), OnDjoss headline: https://old.disruptafrica.com/
86. PwC Tax Summaries, Cameroon other taxes: https://taxsummaries.pwc.com/republic-of-cameroon/corporate/other-taxes
87. PwC Tax Summaries, Cameroon taxes on corporate income: https://taxsummaries.pwc.com/republic-of-cameroon/corporate/taxes-on-corporate-income
