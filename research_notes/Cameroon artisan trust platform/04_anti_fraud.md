# Anti-fraud playbook for an artisan reputation/matching platform in Cameroon: fake reviews, score gaming, identity fraud, and the Cameroonian fraud landscape

Research notes current to 12 November 2026. Scope: how to keep a reputation from being faked, bought or inflated on a platform that matches customers with artisans (plumbers, electricians, tailors, mechanics and similar) in Cameroon, built on AWS with Python.

Method note: about 50 web searches and about 15 page fetches. The shared web-search budget for this research run ran out before searches on rating discrimination (for example Uber), industry fraud reports (Sift, Sardine, Feedzai), device-fingerprinting vendors, and Jiji-specific scams. Those topics are listed under Gaps. Where a figure comes only from a company's own report or from secondary press, these notes say so.

---

## 1. Fake review economics, regulation, and how the big platforms detect fakes

### Takeaway
Fake reviews raise sales in a measurable way, so people will pay for them. The businesses that buy them are mostly weak or new ones with few reviews, and they buy them most when competition is intense. Platforms that report figures remove 4–13% of submitted reviews. Regulators in the US (FTC rule, October 2024), the UK (DMCC Act, April 2025) and the EU (Omnibus Directive, 2022) now ban buying or selling fakes. The UK and EU also require platforms to take "reasonable and proportionate" steps to prevent fakes and to say how they verify reviews. Cameroon has no equivalent law that I could find, but these rules are the de facto best-practice baseline.

### Cited Findings
**Economics of fake reviews (academic)**
- Luca & Zervas (Management Science, 2016) used Yelp's filter as a proxy and found about 16% of Boston restaurant reviews were suspicious (316,415 reviews, 3,625 restaurants, 2004–2012). Restaurants with weak reputations or few reviews were more likely to post fake positives. Chains were less likely to commit fraud. Restaurants facing more competition received more fake negative reviews. — [Luca & Zervas, HBS working paper 14-006](https://econpapers.repec.org/RePEc:hbs:wpaper:14-006); [Harvard DASH](https://dash.harvard.edu/handle/1/22836596); [BU Bostonia summary](https://bu.edu/bostonia/2013/yelp-reviews-can-you-trust-them)
- Caveat: Luca & Zervas measured *suspected* fraud through Yelp's private filter. They could not observe ground truth. — [BU Bostonia](https://bu.edu/bostonia/2013/yelp-reviews-can-you-trust-them)
- Mayzlin, Dover & Chevalier (American Economic Review, 2014) found that independent hotels, and hotels with small management companies, have more to gain from manipulation and post more of it. Their evidence is a higher share of 5-star reviews on TripAdvisor (anyone can post) than on Expedia (only verified buyers can post). Their model treats reputational risk as the cost of manipulation, and that cost sets how much manipulation happens in equilibrium. — [NBER w18340](https://nber.org/papers/w18340); [Yale Insights](https://insights.som.yale.edu/insights/can-online-reviews-be-trusted)
- He, Hollenbeck & Proserpio, "The Market for Fake Reviews" (Marketing Science, 2022): research assistants joined private Facebook groups where Amazon sellers recruit reviewers. The reviewer buys the product, posts a positive review, and is compensated. About 1,500 products were tracked over nine months. Once recruiting began, average ratings rose about 5% (from 4.3 to 4.5 stars at peak), weekly review counts nearly doubled, and keyword search position improved sharply. — [SIGecom Exchanges summary (He et al. 2021)](https://www.sigecom.org/exchanges/volume_19/2/HE.pdf); [SSRN](https://papers.ssrn.com/abstract=3664992)
- Using a temporary Amazon review purge in March 2020 as a natural experiment, they estimate fake reviews improve sales rank by about 16%. After sellers stopped buying, ratings fell from 4.4 to 4.1 stars within eight weeks and the share of 1-star reviews rose. Manipulation is therefore used mostly by low-quality products and harms consumers. It is not a harmless way to solve the cold-start problem. — [SIGecom Exchanges](https://www.sigecom.org/exchanges/volume_19/2/HE.pdf)
- Amazon eventually deleted about half of these fake reviews, but with an average lag of more than 100 days. Almost none of the buyers were well-known brands. — [INFORMS press release](https://www.informs.org/News-Room/INFORMS-Releases/News-Releases/Study-Examines-the-Impact-of-Fake-Online-Reviews-on-Sales2); [SSRN](https://papers.ssrn.com/abstract=3664992)

**Regulation**
- FTC final rule (announced 14 August 2024, effective 21 October 2024). It bans buying or selling fake reviews and testimonials, including AI-generated ones. It also bans buying positive or negative reviews, insider reviews that do not disclose the connection, review suppression through groundless legal threats or intimidation, and selling fake social-influence indicators. — [FTC press release](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials)
- Civil penalties apply to knowing violations, up to $51,744 per violation (the 2024 inflation-adjusted figure). Before the rule, the FTC generally could not get penalties for a first-time Section 5 violation. — [Hogan Lovells](https://www.hoganlovells.com/en/publications/ftc-publishes-final-rule-banning-fake-consumer-reviews-and-testimonials); [Davis Wright Tremaine](https://dwt.com/insights/2024/08/ftc-finalizes-rule-banning-fake-consumer-reviews)
- UK DMCC Act. The fake-review ban took effect on 6 April 2025, and CMA guidance CMA208 was dated 4 April 2025. The ban covers positive and negative fakes and concealed incentivised reviews. Platforms that publish reviews must take "reasonable and proportionate steps" to prevent, detect and remove fakes, and must have a clear policy against them. — [CMA208 guidance](https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf); [Travers Smith](https://www.traverssmith.com/knowledge/knowledge-container/preventing-fake-reviews-what-are-reasonable-and-proportionate-steps/); [Which?](https://www.which.co.uk/news/article/fake-reviews-and-sneaky-fees-banned-under-new-law-campaigned-for-by-which-aLzVp4g0S76D)
- The CMA published further principles for social media platforms on reviews and endorsements in November 2025. — [RPC](https://www.rpclegal.com/snapshots/advertising-and-marketing/autumn-2025/cma-publishes-updated-principles-for-social-media-platforms-on-reviews-and-endorsements/)
- EU Omnibus Directive (2019/2161, applicable from 28 May 2022). It bans fake reviews and endorsements. Traders may not claim reviews come from real buyers unless they have taken "reasonable and proportionate" verification steps, such as limiting reviews to verified purchasers. They must also disclose whether and how they check that reviews are genuine. Commentators disagree on whether the binding duty is to verify or only to disclose. — [Mondaq](https://www.mondaq.com/dodd-frank-consumer-protection-act/1189542/the-omnibus-directive-consumer-reviews); [Herbert Smith Freehills](https://www.hsfkramer.com/en_US/notes/tmt/2020-06/the-omnibus-directive-a-new-deal-for-eu-consumers-part-2-the-objectives-and-provisions-of-the-omnibus-directive-in-focus); [Make Influence](https://www.makeinfluence.com/en/academy/fake-and-manipulated-reviews-what-the-eu-omnibus-directive-bans)

**Platform transparency figures (all self-reported)**
- **Google Maps, 2025:** more than 292 million policy-violating reviews blocked or removed (up 21% on 2024), more than 13 million fake Business Profiles removed, 79 million unverified edits blocked, and posting restrictions placed on more than 783,000 accounts. When fake reviews spike, Google removes them, pauses new reviews on the profile, alerts the owner, and shows a banner explaining the pause. Gemini is used to screen suggested edits. — [Search Engine Roundtable (2025 report)](https://www.seroundtable.com/google-maps-spam-fighting-2025-41176.html)
- Google Maps 2024: more than 240 million reviews removed, 40% more than 2023. — [Search Engine Roundtable (2024)](https://www.seroundtable.com/google-maps-spam-fighting-2024-39186.html); [Google blog](https://blog.google/products-and-platforms/products/maps/how-google-maps-protects-against-fake-content/)
- Caveat: one compliance analysis argues that saying "Gemini removed 292M reviews" overstates Gemini's role. Google ties Gemini specifically to catching fake edits, and describes review enforcement as AI systems plus human analysts. — [Adapt Digital Solutions](https://adaptdigitalsolutions.com/articles/google-review-policy-2026-compliance-guide/)
- In April 2026 Google added a rule against merchants setting staff quotas for soliciting reviews, under "rating manipulation". — [PPC Land](https://ppc.land/google-tightens-maps-review-policy-staff-names-and-quotas-now-banned/)
- **Amazon:** more than 275 million suspected fake reviews blocked in 2024, up from 250 million in 2023. ML models screen reviews before publication. Amazon has sued 115 fake-review brokers over two years, and says more than 40 brokers shut down after its 2024 legal actions. It filed joint suits with the Better Business Bureau (BBB) in July 2024 and October 2025. — [About Amazon (Oct 2025)](https://www.aboutamazon.com/news/policy-news-views/amazons-latest-actions-against-fake-review-brokers-2024); [About Amazon (2023 actions)](https://aboutamazon.com/news/policy-news-views/amazons-latest-actions-against-fake-review-brokers-2023)
- Amazon, Tripadvisor and other platforms formed the Coalition for Trusted Reviews to share intelligence on fake-review brokers across platforms. — [Amazon Trustworthy Shopping](https://trustworthyshopping.aboutamazon.com/global-action-against-fake-reviews); [Tripadvisor 2025 Transparency Report release](https://tripadvisor.mediaroom.com/2025-03-18-Tripadvisors-2025-Transparency-Report-reveals-strong-review-submissions-and-improved-fraud-detection)
- **Trustpilot 2024:** 4.5 million fake reviews removed, 7.4% of submissions (up from 6.1% in 2023). About 90% were caught automatically by ML, neural-network and graph-based models, plus generative AI from 2024. Of the fakes, 3.4 million were 5-star and 627,000 were 1-star. Enforcement: 19,000 warnings, 5,000 cease-and-desist letters, 9,000 "consumer warnings" (which hide the TrustScore and close the profile to new reviews), and legal action against 11 businesses since 2022. In November 2024 it won a UK High Court case against review sellers. — [Trustpilot Trust Report 2025](https://corporate.trustpilot.com/trust/trust-report-2025)
- Trustpilot's corporate trust page reports 7.8 million fake reviews detected and removed in 2025. — [Trustpilot Trust page](https://corporate.trustpilot.com/trust)
- **Tripadvisor 2024:** 2.7 million fraudulent reviews blocked. "Review boosting" (owners, staff or anyone affiliated with the business posting positives) made up 54% of fraud. About 9,000 businesses were warned for incentivised reviews. 87.8% of reviews passed automated checks, 7.3% were rejected by automated analysis, and 4.9% went to moderators. — [Tripadvisor 2025 Transparency Report release](https://tripadvisor.mediaroom.com/2025-03-18-Tripadvisors-2025-Transparency-Report-reveals-strong-review-submissions-and-improved-fraud-detection)
- **Yelp 2025:** about 22 million reviews. 70% were recommended by automated software, 17% not recommended, 11% removed by user operations, and 2% removed by the reviewers themselves. Nearly 500,000 suspected AI-generated reviews were filtered. More than 1.3 million accounts were closed (up 138%, mostly fake airline-support-phone accounts). Nearly 2,000 accounts were closed for review-exchange rings, up 49%. More than 1,100 groups or individuals trading reviews were identified, and Yelp made more than 1,020 reports to other platforms (60% led to action). Yelp also issued 363 Suspicious Review Activity Alerts and 128 Compensated Activity Alerts. — [Stock Titan / Yelp release](https://www.stocktitan.net/news/YELP/yelp-releases-2025-trust-safety-w5g77awiel7e.html); [Business Wire](https://www.businesswire.com/news/home/20260225039344/en/Yelp-Releases-2025-Trust-Safety-Report/)
- Yelp says its recommendation software uses "hundreds of signals" and that no employee or business can override it for an individual business. — [Business Wire](https://www.businesswire.com/news/home/20260225039344/en/Yelp-Releases-2025-Trust-Safety-Report/)

### Inferences
- A Cameroonian artisan platform faces the same conditions as the Luca & Zervas and Mayzlin findings: almost all artisans are independent sole traders, new to the platform, with few reviews, competing in dense local markets. That is the highest-risk profile for both self-boosting and fake attacks on competitors. Expect positive self-promotion to be the dominant attack, as with Tripadvisor's 54% "review boosting" and Trustpilot's 3.4 million fake 5-star reviews versus 627,000 fake 1-star.
- The Amazon/Facebook model (refund the purchase plus a commission to "real" buyers) carries over directly. An artisan can pay friends to book a job through the platform, refund them by mobile money off-platform, and collect a "verified" 5-star review. Purchase verification alone does not stop this. Graph, payment-flow and behavioural detection are still needed (Section 2).
- Platforms with "verified purchase only" reviews (Expedia, Booking.com) show less manipulation than open platforms (TripAdvisor). This is the strongest empirical argument for transaction-anchored reviews (Section 4).
- Consider aligning with the CMA and EU standards voluntarily: a published fake-review policy, disclosure of how reviews are verified, and visible sanctions. That makes later partnerships (diaspora payments, NGOs, donors) easier.
- Trustpilot's "consumer warning" (hide the score and freeze new reviews) and Google's spike-pause are cheap, high-impact sanctions a startup can copy from day one.

### Gaps
- No academic study of fake reviews in Africa or in francophone or informal-sector markets was found.
- Amazon's 2025 block count was not found.
- Google's own 2025 Maps report was seen only through Search Engine Roundtable.
- The UK DMCC penalty level (up to 10% of global turnover) was not verified in this session.

---

## 2. Sybil attacks, collusion rings, and graph-based detection

### Takeaway
Graph methods are the standard defence against coordinated fakes. Trust propagation from verified seed accounts (SybilRank) works because fake accounts have few links to real users. Dense-subgraph detection that resists camouflage (FRAUDAR) catches lockstep groups. Group-level spam detection (GSRank) finds reviewer cartels. Graph neural networks (CARE-GNN, Alibaba/Ant's GEM) work at scale. A startup can do most of this with NetworkX plus simple dense-subgraph heuristics, and move to GNNs (PyG/DGL or Neptune ML) only once it has labelled fraud.

### Cited Findings
- **SybilRank** (Cao et al., NSDI 2012) ranks accounts by the landing probability of early-terminated random walks started from trusted seed accounts, computed by power iteration on MapReduce. It relies on fake accounts having few "attack edges" to real users. Deployed at Tuenti (11 million users), almost 100% of the 50,000 and 90% of the 200,000 lowest-ranked accounts were fake. Only about 5% of accounts reached through user reports were fake. — [USENIX NSDI'12](https://www.usenix.org/conference/nsdi12/technical-sessions/presentation/cao); [MIT reading copy](https://css.csail.mit.edu/6.566/2018/readings/sybilrank.pdf)
- **FRAUDAR** (Hooi et al., KDD 2016) finds dense bipartite subgraphs, for example a group of reviewers × a group of products. It resists "camouflage", where fraudsters add edges to honest targets or use hijacked real accounts. It gives provable bounds on how much fraud can evade it and runs in near-linear time. On a Twitter graph with 1.47 billion edges it found a block of more than 4,000 accounts, most linked to follower-buying services. — [FRAUDAR paper](https://bhooi.github.io/papers/fraudar_kdd16.pdf); [project page](https://bhooi.github.io/projects/fraudar/index.html); [VideoLectures](https://videolectures.net/kdd2016_hooi_bounding_graph); [TKDD extension](https://alexbeutel.com/papers/tkdd_fraud_detection_with_camo.pdf)
- **Fake reviewer groups** (Mukherjee, Liu & Glance, WWW 2012). Frequent itemset mining finds candidate groups (reviewers who repeatedly review the same products together). Behavioural collusion indicators and relational models (GSRank) then rank them. Labelling whole groups turned out to be much easier than labelling individual reviews. — [WWW 2012 paper](https://www2.cs.uh.edu/%7Earjun/papers/WWW-2012-group-spam-camera-final.pdf); [Bing Liu's opinion spam page](https://www.cs.uic.edu/~liub/FBS/fake-reviews.html); [Google Research listing](https://research.google/pubs/spotting-fake-reviewer-groups-in-consumer-reviews/)
- **CARE-GNN** (Dou et al., CIKM 2020) is a GNN that resists two kinds of camouflage: fraudsters' features that look normal, and fraudsters linking to benign nodes. It uses label-aware neighbour selection, reinforcement learning to choose how many neighbours to keep, and aggregation across relations. Benchmarks are the YelpChi and Amazon review graphs. The open PyTorch code has an erratum for some results, and reported AUCs vary across sources (Yelp about 76–79, Amazon about 90–96). — [CARE-GNN GitHub](https://github.com/YingtongDou/CARE-GNN)
- **GEM** (Ant Financial / Alibaba, CIKM 2018) is a heterogeneous GNN over account–device graphs. It exploits "device aggregation" (many accounts on few devices) and "activity aggregation" (bursts in time). It beat GBDT, node2vec and GCN baselines on Alipay data and reportedly detects tens of thousands of malicious accounts per day. — [GEM, arXiv 2002.12307](https://arxiv.org/pdf/2002.12307)
- Yelp reports nearly 2,000 accounts closed for review-exchange rings in 2025, and more than 1,100 external groups trading reviews. Trustpilot cites graph-based models as part of its stack. Reciprocal review trading is an active industrial problem, not a theoretical one. — [Stock Titan / Yelp](https://www.stocktitan.net/news/YELP/yelp-releases-2025-trust-safety-w5g77awiel7e.html); [Trustpilot Trust Report 2025](https://corporate.trustpilot.com/trust/trust-report-2025)
- AWS Neptune ML trains GNNs (R-GCN through the Deep Graph Library on SageMaker) for node classification, edge classification and link prediction. AWS names fraud detection as a use case, and it supports custom models. — [Neptune ML docs](https://docs.aws.amazon.com/neptune/latest/userguide/machine-learning.html)

### Inferences
**Collusion patterns specific to an artisan platform and the graph signal for each:**
- **Artisan creates fake customer accounts (sockpuppets).** Shared device ID, shared install, or shared IP/cell-tower pattern between artisan and reviewers. Reviewer accounts whose only completed jobs are with that artisan. Reviewer phone numbers registered to the same national ID (CNI) as the artisan. Use GEM-style account–device bipartite graphs and connected components.
- **Friends and family reviews.** Reviewer is in the artisan's phone contacts if the user consents to contact upload (otherwise this cannot be measured). Same surname or locality. Mobile money transfers from artisan to reviewer before or after the job. A small, closed reviewer set with low "diversity of reviewers". This is hard to separate from genuine loyal neighbourhood customers, so down-weight rather than delete.
- **Reciprocity rings (artisan A reviews B, B reviews A, where artisans also hire each other).** Detect 2-cycles and short cycles in the artisan↔artisan review graph. Cap the weight of reviews between artisans in related trades.
- **Vouching or endorsement cartels**, if the platform uses vouching or "references". Dense bipartite blocks (FRAUDAR) of vouchers × vouchees. Lockstep timing.
- **Competitor sabotage.** Bursts of 1-star reviews on one artisan from new accounts sharing devices, or from accounts that recently reviewed a competitor positively. Mirrors Luca & Zervas's competition finding.
- **Paid-review brokers in WhatsApp or Facebook groups.** This is the Cameroonian analogue of the Facebook-group market in He et al. Reviewers who touch many unrelated artisans in short windows, a "professional reviewer" profile.
- **Practical staging:** (1) rules and velocity checks. (2) A nightly NetworkX job: connected components on shared-identifier graphs, cycle detection, Jaccard overlap of reviewer sets between artisans, and a SybilRank-style trust propagation seeded from ID-verified, transaction-verified accounts. (3) FRAUDAR-style dense-block search. Open-source Python implementations exist, but none was verified in this session. (4) GNNs (CARE-GNN or PyG) once there are hundreds of labelled fraud cases.
- SybilRank's assumption (few attack edges) weakens when fakes are friends and family, who have *real* social ties to the artisan. That makes transaction anchoring and payment-flow analysis relatively more important in Cameroon's close-knit neighbourhood economies.

### Gaps
- I did not verify maintained Python packages for FRAUDAR or SybilRank, or PyG fraud examples.
- No published graph-fraud case studies from African platforms were found.

---

## 3. Device, SIM and identity signals, and KYC with the Cameroonian ID card (CNI)

### Takeaway
Cameroon legally requires SIM registration against a national ID, capped at three SIMs per person per operator. Enforcement has historically been weak: one CNI was found linked to up to 200 SIMs, and insiders have sold fraudulent registrations. So a phone number is a useful but not reliable proxy for identity. The new biometric CNI (Augentic, launched February 2025) and commercial document-plus-selfie KYC (Smile ID supports Cameroonian documents) make strong one-person-one-account checks feasible. No verified government ID database lookup API for third parties was found, so verification is document-based. AWS Rekognition Face Liveness ($0.015 per check) and face matching enable in-house checks for duplicate faces and liveness.

### Cited Findings
**SIM registration and enforcement**
- A 2015 Prime Ministerial decree (3 September 2015) makes SIM registration mandatory with a national ID card. It caps SIMs at three per person per network and bans street sales of SIMs. — [Biometric Update (2024)](https://www.biometricupdate.com/202404/cameroon-telcos-get-ultimatum-to-id-all-sim-holders-in-regions-plagued-by-security-crisis); [Ecofin](https://ecofinagency.com/law/0110-32376-cameroon-a-decree-to-limit-numbers-of-sim-per-subscriber-and-prohibit-sale-of-sim-cards-on-streets); [Digital Business Africa](https://www.digitalbusiness.africa/identification-des-abonnes-au-cameroun-les-risques-que-comporte-le-decret-du-premier-ministre/)
- The telecoms regulator ART specifies that the unique identifier is the 17-digit number on the back of the CNI, not the 9-digit serial number. — [Osiris (ART statement)](https://osiris.sn/Cameroun-le-regulateur-telecoms.html)
- In 2019 regulators fined MTN, Orange and Nexttel after finding up to 200 SIM cards registered to a single CNI. — [Africanews](https://www.africanews.com/2019/07/06/cameroon-fines-main-local-telecom-companies); [ITWeb](https://itweb.africa/article/cameroonian-telcos-in-hot-water-over-sim-card-registration/rxP3jqBmrBPMA2ye)
- In 2022 operators deactivated 891,082 non-compliant SIMs. Another 94,882 stayed active on condition that the holders proved their identity. — [ITWeb](https://itweb.africa/article/cameroon-sim-card-shutdown-piles-on-pressure-for-telcos/lLn14Mmj9RKqJ6Aa)
- In April 2024 the government gave MTN and Orange 60 days to reinforce SIM identification, after kidnappers in crisis regions collected ransoms through mobile money on unregistered SIMs. — [Biometric Update](https://www.biometricupdate.com/202404/cameroon-telcos-get-ultimatum-to-id-all-sim-holders-in-regions-plagued-by-security-crisis); [Ecofin](https://ecofinagency.com/telecom/1204-45389-cameroon-cracks-down-on-unregistered-sim-cards-as-terrorists-net-524-100-in-ransoms-via-mobile-money)
- CNI issuance backlogs blocked SIM registration for many users. Orange Cameroun proposed accepting alternative primary ID documents. Many people held an expired *récépissé* (temporary receipt) and no card. — [ITWeb](https://itweb.africa/article/cameroon-telcos-push-for-relaxation-of-subscriber-id-rules/lwrKxv3KWaWvmg1o); [ITWeb](https://itweb.africa/article/cameroon-sim-card-shutdown-piles-on-pressure-for-telcos/lLn14Mmj9RKqJ6Aa)
- Press reports describe criminals obtaining SIMs in victims' names with the complicity of MTN and Orange agents, including a gang run from Kondengui central prison that involved two operator identification agents. Prisons (Kondengui, New Bell) are described as major cybercrime hubs. — [Digital Business Africa (prisons as cybercrime hubs)](https://www.digitalbusiness.africa/les-principaux-foyers-de-cybercriminels-avec-en-tete-les-prisons-de-kondengui-et-de-new-bell-font-perdre-122-milliards-de-f-cfa-a-leconomie-camerounaise-en-2021/); [Osiris](https://osiris.sn/Cybercriminalite-Sommation-pour.html). Caveat: the insider-agent detail came from search snippets; I did not open the full article.
- A law-firm overview lists social engineering, SIM swaps, phishing and SMiShing, agent-driven fraud, and PIN-sharing as common mobile money fraud types in Cameroon. — [Global Law Experts](https://globallawexperts.com/cameroon-fintech-platforms-navigating-mobile-money-fraud-or-unauthorized-transactions/)

**Holding multiple SIMs**
- GSMA counts "connections" (SIMs) separately from "unique subscribers" because many Africans hold several SIMs. In 2017 Sub-Saharan Africa had about 444 million unique subscribers against about 747 million connections. Multi-SIM ownership fell as registration rules tightened. — [GSMA Intelligence](https://www.gsmaintelligence.com/research/two-thirds-of-africans-yet-to-join-the-mobile-revolution-african-mobile-penetration-set-at-33-multiple-sims-driving-growth); [GSMA press release](https://www.gsma.com/newsroom/press-release/more-than-half-of-sub-saharan-africa-to-be-connected-to-mobile-by-2025-finds-new-gsma-study); [Ecofin](https://www.ecofinagency.com/telecom/1603-45280-ssas-mobile-subscriptions-projected-to-hit-1-1bn-by-2028-driving-financial-inclusion-report)

**New biometric CNI (2025)**
- The national police (DGSN) signed a 15-year contract with Augentic in May 2024. Online pre-enrolment opened 17 February 2025 and biometric capture began 24 February 2025, with a promise of delivery within 48 hours. The contract includes production centres in Yaoundé, Douala and Garoua. — [Biometric Update](https://www.biometricupdate.com/202502/cameroons-new-generation-biometric-id-card-system-goes-live-feb-17); [ID Tech Wire](https://idtechwire.com/cameroon-launches-advanced-biometric-national-id-system-with-48-hour-issuance-promise/)
- Reported features: electronic chip, machine-readable zone (MRZ), QR code, ten fingerprints. The card doubles as voter ID and residence permit. The fee is 10,000 FCFA. Its design is described as supporting a future digital identity. — [WeAreTech](https://wearetech.africa/en/fils-uk/news/tech/cameroon-new-national-id-paves-way-for-digital-identity-system); [IT Edge News](https://www.itedgenews.africa/cameroon-rolls-out-biometric-national-id-cards-in-landmark-reform-ahead-of-2025-elections/). Caveat: the Biometric Update launch article did not itself mention a chip or QR code.
- In June 2025 lawmakers criticised the cost and complexity, and long waits for biometric appointments were reported. A northern production centre opened in Garoua in 2025, and a rapid-enrolment campaign ran in the Far North. — [Biometric Update (June 2025)](https://www.biometricupdate.com/202506/cameroon-lawmakers-criticize-cost-complications-in-new-national-id-system); [Biometric Update (Aug 2025)](https://www.biometricupdate.com/202508/new-biometric-id-card-center-opens-for-citizens-in-northern-cameroon)

**KYC vendors**
- Smile ID's Cameroon page lists document verification for up to six Cameroonian ID types (national ID, driver's licence, passport, resident ID, travel documents, voter ID). It also offers SmartSelfie liveness matched to the document photo, AML screening, and "Smile Secure" duplicate-face detection at onboarding. It does **not** say it can query a Cameroonian government database. — [Smile ID Cameroon](https://smile.id/countries/cameroon)
- Smile ID's CEO noted that the Cameroonian card's green-on-green number makes image capture quality critical. Bridgecard used Smile ID document verification to enter Cameroon because ID databases were inadequate or missing. Both sources are promotional. — [TechCabal](https://techcabal.com/2023/02/23/mark-straub-smile-identity-ceo-interview/); [Smile ID Bridgecard case study](https://usesmileid.com/case-studies/bridge-card-success-story)
- Youverify's coverage page does not list Cameroon. It names the UK, US, Canada, Nigeria, South Africa and Kenya as key markets. — [Youverify country coverage](https://youverify.co/product/kyc/country-coverage)
- Dojah claims connections to government databases in 54 African countries. This is self-reported, and Cameroon was not confirmed. — [Dojah blog](https://dojah.io/blog/best-identity-verification-api-africa-2026)
- Cameroon remains on the FATF "grey list" as of the 30 October 2026 plenary. All action-plan deadlines had expired by February 2026. This matters for any payments or escrow partner's KYC posture. — [FATF, October 2026](https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/increased-monitoring-october-2026.html); [FATF, February 2026](https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/increased-monitoring-february-2026.html)

**Liveness and device signals (AWS and Android)**
- Amazon Rekognition Face Liveness detects presentation attacks (printed or digital photos, videos, 3D masks) and injection attacks (pre-recorded or deepfake video fed directly into the capture pipeline). It returns a confidence score, and the developer sets the threshold, which trades off true-accept and true-reject rates. Performance depends on screen brightness and camera quality. — [AWS Face Liveness](https://aws.amazon.com/rekognition/face-liveness); [AWS AI Service Card](https://docs.aws.amazon.com/ai/responsible-ai/rekognition-face-liveness/overview.html)
- Pricing in US East: about $0.015 per liveness check for the first 500,000 per month, with lower tiers above that. CompareFaces costs about $0.001 per image, with 1,000 free images per month in the 12-month free tier. — [Rekognition pricing](https://aws.amazon.com/rekognition/pricing/)
- The Android Play Integrity API returns device verdicts: MEETS_DEVICE_INTEGRITY, plus optional BASIC and STRONG labels, and an empty verdict for rooted, hooked or emulated devices. It also offers "recent device activity" levels (token requests per device per hour, an indicator of device farms), "device recall" (a few bits of per-device data that survive reinstalls, useful for flagging repeat abusers), app access risk (screen capture or control apps running), and a Play Protect verdict. — [Play Integrity verdicts](https://developer.android.com/google/play/integrity/verdicts)
- AWS WAF Fraud Control's account-creation module (ACFP, rule group AWSManagedRulesACFPRuleSet) flags sign-up requests that reuse the same phone number or address, signs of stolen credentials, and anomalous sign-ups. It needs the WAF JavaScript SDK for full signal, adds per-request charges, is not available for Cognito user pools, and is rule-based rather than ML. — [AWS WAF ACFP docs](https://docs.aws.amazon.com/waf/latest/developerguide/waf-acfp.html); [AWS Security Blog](https://aws.amazon.com/blogs/security/prevent-account-creation-fraud-with-aws-waf-fraud-control-account-creation-fraud-prevention); [AWS best-practices guide](https://aws.github.io/aws-security-services-best-practices/guides/waf/fraud-prevention/docs/); [Fraud Detector notice (WAF is rules, not ML)](https://docs.aws.amazon.com/frauddetector/latest/ug/frauddetector-availability-change.html)
- **Operator network APIs:** Orange's GSMA Open Gateway (CAMARA) SIM Swap and KYC Match APIs are documented for France and Spain only. I found no evidence they are offered in Cameroon. — [Orange Developer SIM Swap France](https://developer.orange.com/apis/camara-sim-swap-france); [Orange CAMARA](https://payservices.orange.com/en/digital-identity/api-camara-en)
- **Data protection:** Law No. 2024/017 of 23 December 2024 is Cameroon's first standalone data protection law. It creates a data protection authority and reportedly relies heavily on consent. One analysis says there is no legitimate-interest basis, and certain processing needs prior authorisation. The 18-month transition ended on 23 June 2026. Reports say the authority and the implementing decree were not yet operational in mid-2026. — [Lex Africa](https://lexafrica.com/2025/10/cameroon-data-protection-law-compliance/); [DLA Piper](https://www.dlapiperdataprotection.com/index.html?c=CM&t=law); [CIO Mag](https://cio-mag.com/protection-des-donnees-au-cameroun-la-course-contre-la-montre-avant-juin-2026/); [Droit Medias Finance](https://droitmediasfinance.com/index.php/actualites/droit-tech-fintech/1297-cameroun-la-loi-sur-la-protection-des-donnees-a-caractere-personnel-entre-en-vigueur-ce-23-juin-2026)

### Inferences
- **Tiered identity for artisans (the side whose reputation is being protected):** Tier 0 = phone number plus OTP. Tier 1 = CNI or récépissé photo, selfie liveness, face match, and a duplicate-face search (Rekognition face collection or Smile Secure) so one person cannot run several artisan profiles. Tier 2 = in-person verification by a field agent or partner (trade association, chamber of trades, commune). Only Tier 1 and above should be able to accumulate visible reputation. Keep the 17-digit CNI unique ID as a uniqueness key, hashed, because SIMs are not unique per person.
- **Customers (reviewers)** get lighter friction: phone OTP plus a device-integrity check, and at least one completed, verified transaction before they can post a review. Ask for selfie or CNI only when risk signals fire. Asking every customer for an ID would cut participation.
- **Accept récépissés and old-format cards.** The rollout is uneven, and requiring the new biometric CNI would exclude many legitimate artisans, especially outside regional capitals and in the Anglophone and Far North crisis areas.
- **Treat the phone number as a weak identifier:** three-SIM caps per operator, multiple operators (MTN, Orange, Camtel, Nexttel), insider-registered SIMs, and SIM recycling all break it. Track number age on the platform and number changes. Re-verify with selfie when a number changes, which also mitigates SIM-swap takeover.
- **Device signals carry the most weight against sockpuppets** because cheap Android phones dominate: Play Integrity verdicts (block emulators and rooted devices from reviewing), device-recall bits to flag banned devices, and recent-device-activity levels to spot device farms. Collect these only with clear consent notices under Law 2024/017.
- Register with or consult the new data protection authority before processing biometric data. Store face templates in a region and under terms that satisfy the law. The AWS region choice (no Central African AWS region was verified here; Cape Town af-south-1 is the nearest known) should be checked against any localisation rules.

### Gaps
- I found no source confirming a DGSN or ANTIC API for third parties to verify CNI data against the national register, so database-backed KYC in Cameroon is unconfirmed.
- I could not confirm Prembly's or Dojah's Cameroon coverage. Contact the vendors.
- I found no current dual-SIM or multi-SIM prevalence figure specific to Cameroon.
- I found no Cameroon SIM-swap fraud statistics.
- I could not confirm whether Law 2024/017 classifies biometric data as sensitive.
- Phone-number reputation services (for example Twilio Lookup, Telesign) for Cameroonian numbers were not researched because the search budget ran out.

---

## 4. Transaction-anchored reviews: rate only after a verified job

### Takeaway
The single most effective design control is to allow a review only for a job the platform can verify happened. Evidence: Mayzlin et al.'s Expedia versus TripAdvisor comparison, Booking.com's stays-only model, and EU and UK disclosure rules. In Cameroon a job can be anchored by platform-initiated mobile money payment (MTN MoMo and Orange Money APIs), a QR or OTP handshake at job completion, and GPS co-presence. Anchoring alone does not stop friends-and-family or refunded fake jobs, so it must be combined with the detection in Section 2.

### Cited Findings
- Hotels with high incentive to manipulate have relatively more 5-star reviews on TripAdvisor (anyone can review) than on Expedia (only verified buyers can review). Requiring a verified transaction raises the cost of faking. — [NBER w18340](https://nber.org/papers/w18340); [Yale Insights](https://insights.som.yale.edu/insights/can-online-reviews-be-trusted)
- Booking.com: you can only leave a review after making a booking. Reviews are accepted within three months of check-out, and Booking.com may stop showing them after 36 months or after a change of ownership. — [Booking.com reviews page](https://www.booking.com/reviews.html?aid=313263); [Booking Holdings guest review standards](https://h.priceline.com/content-moderation-policy/guest-reviews-standards.en-us.html)
- The EU Omnibus Directive names limiting reviews to verified purchasers as an example of a "reasonable and proportionate" step, and requires disclosing how reviews are verified. — [Mondaq](https://www.mondaq.com/dodd-frank-consumer-protection-act/1189542/the-omnibus-directive-consumer-reviews)
- The He et al. Facebook-group scheme had reviewers actually *buy* the product and get refunded with a commission. Verified-purchase reviews on Amazon were still gamed. — [SIGecom Exchanges](https://www.sigecom.org/exchanges/volume_19/2/HE.pdf)
- MTN's MoMo developer portal offers "Get Paid" APIs (request payment, refund, notify, payment status, balance) and "Pay" APIs (transfer, status). These are the building blocks for platform-initiated payment and escrow-like hold-and-release flows. No KYC or account-holder-name endpoint is listed on the landing page. — [MTN MoMo Developer](https://momodeveloper.mtn.com/)
- Mobile money is the dominant digital payment rail in Cameroon: 24,331 billion FCFA in transactions in 2023 (CNEF) and 11.4 million active subscriptions in 2024 (ART). — [EcoMatin](https://ecomatin.net/mobile-money-le-cameroun-depasse-la-barre-des-24-000-milliards-fcfa-de-transactions-en-un-an-un-record); [WeAreTech](https://www.wearetech.africa/fr/fils/actualites/finance/paiements-numeriques-le-cameroun-face-au-defi-de-la-securisation-des-plateformes)
- Airbnb's simultaneous-reveal ("double-blind") reviews, tested on about one-third of hosts from May 2014, increased review rates (+9.7% host reviews, +1.8% guest reviews) and made reviews slightly more negative, that is, more honest. This suggests strategic reciprocity distorts content only modestly. Airbnb then rolled it out to everyone. — [Fradkin, Grewal & Holtz, Marketing Science 2021 (SSRN)](https://papers.ssrn.com/abstract=2939064); [EconPapers](https://econpapers.repec.org/RePEc:inm:ormksc:v:40:y:2021:i:6:p:1013-1029)

### Inferences
**Recommended job-verification ladder (strongest first):**
1. **Platform-routed payment.** The customer pays through MoMo or Orange Money collection initiated by the platform. Funds can be held until the customer confirms completion (escrow-like), then disbursed. This creates a payment record linking a real wallet to the job. A legal check is needed on whether holding funds requires a payment-institution licence under BEAC/COBAC rules (not researched here).
2. **Completion handshake.** The artisan's app shows a one-time QR code or 6-digit code. The customer scans or enters it on site. Both devices log GPS and time. Require co-location within a radius and a minimum time on site for the job category.
3. **Customer-initiated booking plus artisan acceptance** before the job. Reviews from jobs created and closed within minutes, or created by the artisan on the customer's behalf, get low weight.
4. **Cash jobs** can still be reviewed if the handshake succeeds, but receive less weight than paid-through-platform jobs.

**Further design controls:**
- Add photo evidence of finished work (before and after), with EXIF and timestamp checks and perceptual-hash de-duplication to catch reused photos.
- Use a review window (for example 14–30 days after completion) and Airbnb-style simultaneous reveal in both directions (artisan rates customer, customer rates artisan). This reduces retaliation and fear of it.
- One review per verified job. Repeat jobs between the same pair count with diminishing weight, which blunts friends-and-family loops.
- Watch money flows for refunded fakes: transfers from the artisan's wallet to the reviewer around the job, or a payment followed immediately by an equal reverse transfer. This needs the artisan's payout wallet to be linked. Off-platform transfers are invisible, which is a known residual risk.
- Disclose publicly "how we verify reviews". This is good practice in UK and EU terms and builds user trust.

### Gaps
- I did not verify Orange Money Cameroon merchant API details, escrow licensing under BEAC/COBAC, or payment aggregators (for example CinetPay, Campay, Notch Pay) operating in Cameroon.
- I did not research artisan or home-services platforms that use QR/OTP job completion (for example TaskRabbit, Thumbtack, Urban Company, or African equivalents) because the search budget ran out.
- No research was found on GPS co-presence spoofing rates on low-end Android devices.

---

## 5. Mobile money and scam fraud in Cameroon and Central Africa

### Takeaway
Cameroon has a mature, partly professionalised scam economy: "scamming", broutage-style romance and advance-fee fraud, fake online shops including pet scams supported by local web developers, fake job and migration offers, and mobile money social engineering. Some of it runs from prisons and some involves telecom insiders. Reported losses run to billions of FCFA per year, but only about 6% of victims file complaints, so official figures heavily undercount. An artisan platform will face imported scam playbooks: fake artisans taking deposits, fake "erroneous transfer" refunds, fake payment SMS, and account takeover.

### Cited Findings
- **ANTIC (national cybersecurity agency) loss estimates:** about 6 billion FCFA lost to banking fraud in 2019, with more than 2,000 complaints since 2018 and fake transfer orders (FOVI) the leading technique. In 2021, 12.2 billion FCFA was lost: 6 billion to scamming and phishing, 2.5 billion to intrusions into government systems, and 3.7 billion to ATM skimming. — [Meilleurtaux (2019)](https://banque.meilleurtaux.com/ouvrir-un-compte-bancaire/actualites/2020-octobre/fraudes-bancaires-origine-perte-6-milliards-fcfa-cameroun.html); [CIO Mag (2021)](https://cio-mag.com/?p=45351); [Digital Business Africa (about 7 billion, Sept 2021)](https://www.digitalbusiness.africa/cameroun-pres-de-07-milliards-de-fcfa-perdus-du-fait-de-la-cybercriminalite-antic/); [EcoMatin (12.2 billion, 2021)](https://ecomatin.net/la-cybercriminalite-fait-perdre-122-milliards-s-au-cameroun-en-2021)
- ITWeb put Cameroon's 2019 cybercrime losses at about XAF 6 billion (about US$10.8 million). — [ITWeb](https://itweb.africa/article/cameroon-loses-us108-m-to-cybercrime-in-2019/mQwkoM6Pkmjv3r9A)
- The 2021 reporting names Kondengui (Yaoundé) and New Bell (Douala) prisons as leading hubs of cybercriminal activity. — [Digital Business Africa](https://www.digitalbusiness.africa/les-principaux-foyers-de-cybercriminels-avec-en-tete-les-prisons-de-kondengui-et-de-new-bell-font-perdre-122-milliards-de-f-cfa-a-leconomie-camerounaise-en-2021/)
- **Under-reporting:** only 6 in 100 cybercrime victims file a complaint. In a 2017 survey, 3.8% of people aged 15+ had been victims. Of those, 55.8% were hit by phone or SMS scams, 21.1% by email hacking and 19.5% by internet scams. (EcoMatin, 2018, citing the national telecom/ICT statistical yearbook and ANTIC.) — [EcoMatin](https://ecomatin.net/seulement-6-victimes-de-la-cybercriminalite-sur-100-portent-plainte)
- **MoMo fraud patterns (September 2025):** fraudsters start withdrawal requests from their own phones against many numbers. A user who enters their PIN without reading approves a withdrawal they did not start. Fraud actors are found among MoMo clients, in prisons, and among MoMo staff. MTN's countermeasures include *126*15# to block unsolicited withdrawals, fraud.mtn.cm for reporting, automated detection, biometric security in the MoMo app, and protection against fraudulent PIN resets. — [Camer.be](https://www.camer.be/90795/11:1/cameroun-la-lutte-contre-la-fraude-comme-gage-de-securite-des-transactions-mobile-momo-cameroon.html)
- In 2021 Orange Cameroun added facial recognition to its app to secure transfers and withdrawals after a rise in scam complaints. — [Osiris](https://www.osiris.sn/suite-aux-plaintes-d-arnaques-l-operateur-orange-cameroun-renforce-la-securite.html)
- Beninese *brouteurs* (online scammers) selling "magic wallets" have operated in Cameroon. In one case a victim paid 100,000 FCFA by mobile money and the seller then became unreachable. — [Digital Business Africa](https://www.digitalbusiness.africa/arnaque-2-0-des-brouteurs-beninois-vendeurs-de-porte-monnaie-magiques-tissent-leur-nid-avec-succes-au-cameroun/)
- A 2025 Yaoundé case: a captor used mobile money to extort funds during a kidnapping. Mobile money is also used for violent extortion. — [Camer.be](https://www.camer.be/92950/11:1/mobile-money-au-cameroun-quand-le-paiement-digital-devient-une-arme-de-sequestration-cameroon.html)
- **Fake online shops:** an LSE study interviewed 14 Cameroonian web developers who build websites for non-delivery fraud, including pet scams. Their motives include the Anglophone crisis, unreliable infrastructure, and the "Big Boy" culture that glamorises fraud. — [LSE Research Online](https://researchonline.lse.ac.uk/id/eprint/127176)
- **Fake job and migration offers (ISS, August 2026):** fraudulent offers on WhatsApp and Facebook target young job seekers in Cameroon and Chad. Victims paid advance fees averaging about 550,000 FCFA in one case. A gendarmerie investigation launched 16 May 2026 led to 13 arrests and identified about 6,000 victims of fraud and trafficking nationwide. ISS recommends formal takedown protocols between Facebook/WhatsApp and the gendarmerie. — [ISS report](https://issafrica.org/research/books-and-other-publications/digital-deception-online-job-scams-amid-cybercrime-vulnerability-in-cameroon-and-chad); [ISS Today](https://issafrica.org/iss-today/online-fraud-is-becoming-a-gateway-to-human-trafficking-in-cameroon)
- Fake Facebook accounts impersonating public figures are used to defraud Cameroonians. — [Camer.be](https://www.camer.be/amp/56602/24:21/cameroun-cybercriminalite-sur-facebook-voici-les-faux-comptes-de-personnalites-qui-servent-a-arnaquer-cameroon.html)
- Online commerce is growing in Cameroon and scams accompany it. — [Le360 Afrique](https://afrique.le360.ma/economie/cameroun-commerce-en-ligne-et-arnaque-font-bon-menage_LAVEL6WQJ5HFBI2EGGPMUMAB3A/)
- **Industry context (GSMA):** GSMA's mobile money reports cover 2024 (2025 edition) and 2025 (2026 edition). A secondary report says identity fraud affected 90% of mobile money providers and social engineering 88% (not verified against GSMA itself). Most providers detect fraud mainly through customer complaints. The 2026 edition cites fraud risk as a reason some users go back to cash, and reports $2 trillion in transactions and 2.3 billion registered accounts in 2025. — [GSMA SOTIR 2025 PDF](https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2025/04/The-State-of-the-Industry-Report-on-Mobile-Money-2025.pdf); [Commsrisk](https://commsrisk.com/mobile-money-providers-have-low-opinion-of-effectiveness-of-law-enforcement/); [TechMoran](https://techmoran.com/2026/03/26/mobile-money-transactions-hit-2-trillion-in-2025-as-usage-surges-gsma-report/)
- A non-GSMA source describes typical mobile money scams: fake "mistaken transfer, please refund" requests and USSD-based fraud. — [Thales](https://www.thalesgroup.com/en/news-centre/insights/enterprise/access-engagement-where-next-mobile-money)

### Inferences
**Threat actors relevant to an artisan platform:**
1. **Fake artisans.** Scammers posing as tradespeople who take a deposit (*avance*) for materials by MoMo and vanish. This is the "magic wallet" and non-delivery-shop pattern applied to services. Defences: ID plus liveness for artisans, deposits only through platform escrow, never off-platform, and pinned in-app warnings ("never pay a deposit outside the app").
2. **Genuine artisans gaming reputation.** Self-boosting, friends and family, and refunded fakes (Sections 1–2).
3. **Customers defrauding artisans.** Fake payment SMS ("you have received 50,000 FCFA"), "erroneous transfer, please refund" scams, refusing to pay, and using threats of bad reviews to extort discounts (Section 6). Defence: payment status shown only from platform-confirmed API callbacks, and in-app education that SMS screenshots are not proof of payment.
4. **Account takeover.** SIM swap or insider-registered SIM leading to OTP capture, then hijacking a high-reputation artisan profile to scam customers. Defences: selfie re-verification on number or device change, payout-wallet change lock with a cooling-off period, and alerts to the old number.
5. **Organised scam groups**, including prison-based ones and the developer ecosystems around Buea and other towns. They may build fake artisan profiles at scale. Defences: duplicate-face search, device farm detection, document-forgery checks.
6. **Brokers selling reviews or accounts** on WhatsApp or Facebook. Defences: monitor groups, test-buy, report to Meta, which mirrors Yelp's 1,020 cross-platform reports.

**Other inferences:**
- Because victims rarely report to police (about 6%) and providers learn about fraud mainly from complaints, the platform's in-app reporting and fast refunds will be its main sensor. Make reporting one tap and in French, English and Pidgin.

### Gaps
- No Jiji-specific or Facebook Marketplace-specific Cameroon scam statistics were found, and no reporting on fake artisans in particular.
- A 2025 ANTIC figure (about 17,500 complaints and 5.8 billion FCFA) and a 2023 figure (scamming about 52% of cases, about 1.1 billion FCFA) appeared in search summaries, but I could not tie them to a specific article I verified, so they are excluded as unverified.
- No MTN or Orange Cameroon fraud-loss statistics were found.
- The term "feymania" (Cameroonian confidence-trickster culture) was not sourced in this session.
- GSMA's own fraud figures were not verified.

---

## 6. Rating manipulation by extortion, retaliatory reviews, rating inflation, and discrimination

### Takeaway
Reviews can be used as weapons. Customers threaten bad reviews to extort discounts, and parties retaliate after a negative review. Average ratings also drift upward until 5 stars carries no information ("reputation inflation"). The industry answers are simultaneous-reveal reviews, dedicated extortion reporting, temporary review freezes on spikes, and scoring that does not rely on a raw star average. Bias in customer ratings is a documented risk in gig platforms, but this session could not source it, so it remains a gap.

### Cited Findings
- **Extortion:** Google launched a dedicated form in October/November 2025 for businesses to report negative-review extortion. The typical pattern is scammers contacting businesses by email or WhatsApp, posting or threatening 1-star reviews, and demanding payment to remove them. — [The Hacker News](https://thehackernews.com/2025/11/google-launches-new-maps-feature-to.html); [Search Engine Roundtable](https://www.seroundtable.com/google-business-profile-report-negative-review-extortion-scams-40250.html)
- The FTC rule bans review suppression through groundless legal threats, intimidation or false accusations. It also bans buying negative reviews of competitors. — [FTC press release](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials)
- Yelp issued 6 "Questionable Legal Threat" alerts and 266 "Public Attention" alerts in 2025. Public Attention alerts are used when news events trigger review-bombing. Unusual Activity and Public Attention events led to more than 80,000 reviews being removed. — [Stock Titan / Yelp](https://www.stocktitan.net/news/YELP/yelp-releases-2025-trust-safety-w5g77awiel7e.html)
- Google pauses new reviews and shows a banner when fake reviews spike. — [Search Engine Roundtable](https://www.seroundtable.com/google-maps-spam-fighting-2025-41176.html)
- **Retaliation and reciprocity:** Airbnb's simultaneous reveal (neither side sees the other's review until both submit or the window closes) produced slightly more negative, more accurate reviews and more reviews overall. Strategic reciprocity exists but its effect is modest. — [Fradkin, Grewal & Holtz (SSRN)](https://papers.ssrn.com/abstract=2939064); [INFORMS press](https://www.informs.org/News-Room/INFORMS-Releases/News-Releases/New-Research-Highlights-Motivations-of-Reviewers)
- **Reputation inflation:** Filippas, Horton & Golden (Marketing Science, 2022) show average ratings rose sharply over time on five marketplaces, including a large online labour market where the share of perfect ratings jumped. They attribute this largely to inflation, not better quality, because giving bad feedback is costly to the rater. Written feedback is less prone to inflation. — [NBER w25857](https://www.nber.org/papers/w25857.pdf); [INFORMS press](https://www.informs.org/News-Room/INFORMS-Releases/News-Releases/Five-Star-Rating-New-Research-Finds-It-May-Not-Reflect-What-Consumers-Receive); [Horton's paper page](https://john-joseph-horton.com/papers/reputation-inflation/)

### Inferences
- **Extortion in the artisan context:** a customer says "give me a discount or I give you 1 star", or refuses to pay and pre-empts with a bad review. Countermeasures:
  - Artisans can flag a review as "extortion attempt" with in-app chat evidence. In-app chat is preferred so evidence exists.
  - The review is held for human review if the flag is raised during the job window.
  - Ratings are tied to the job's payment status: a customer who has not paid cannot review, and disputes go to mediation instead.
  - Repeated low-rating customers get a "rater reliability" weight (Bayesian rater-bias correction).
- **Retaliation by artisans against customers** (if customers are rated too): use simultaneous reveal, and do not show customer ratings to artisans in ways that allow targeted refusal.
- **Inflation:** avoid a raw 5-star mean as the headline. Better options are:
  - Show the distribution and recency, and use a Bayesian-shrunk score with a prior so a new artisan with three 5-star reviews does not beat a veteran with 200 reviews at 4.8.
  - Add structured, harder-to-inflate signals: "would hire again" yes/no, on-time and on-budget flags, repeat-customer rate, and dispute rate.
  - Lean on text, which Filippas et al. find less inflated.
- **Review bombing tied to ethnic, linguistic (Anglophone/Francophone) or political tension** is a plausible risk in Cameroon given the Anglophone crisis noted in the LSE study context. A Yelp-style "Public Attention" freeze and spike detection should be built in.

### Gaps
- No study of rating bias or discrimination (by gender, ethnicity, language) on gig platforms was retrieved (for example Rosenblat et al. on Uber) because the search budget ran out.
- No Cameroon-specific evidence on review extortion was found.

---

## 7. ML and anomaly detection feasible for a startup on AWS with Python (service status as of November 2026)

### Takeaway
**Amazon Fraud Detector closed to new customers on 7 November 2025.** Existing customers continue, but a new platform cannot adopt it. AWS's recommended substitutes are AutoGluon (open-source AutoML) on SageMaker, AWS WAF Fraud Control (rule-based) for fake account creation, and Neptune ML for graph ML. A startup should begin with a rules and velocity engine plus unsupervised anomaly detection (scikit-learn Isolation Forest, PyOD) and NetworkX graph jobs. It should move to supervised and GNN models only once labelled fraud accumulates.

### Cited Findings
- Amazon Fraud Detector stopped accepting new customers on 7 November 2025. AWS recommends AutoGluon (with a SageMaker AI deployment path and a Kaggle fraud notebook), AWS WAF Fraud Control for account-creation fraud, and points to a data-migration guide. AWS states that WAF's fraud capability "is based on managed rules and not machine learning models". — [AWS Fraud Detector availability change](https://docs.aws.amazon.com/frauddetector/latest/ug/frauddetector-availability-change.html); [Classmethod (AutoGluon on SageMaker test, Japanese)](https://dev.classmethod.jp/articles/amazon-fraud-detector-autogluon-sagemaker-ai-notebooks/)
- AWS WAF ACFP detects bulk account creation that reuses phone numbers or addresses, at extra per-request cost. It is not available for Cognito user pools, and needs the JavaScript SDK for full detection. — [AWS WAF ACFP docs](https://docs.aws.amazon.com/waf/latest/developerguide/waf-acfp.html); [AWS best-practices guide](https://aws.github.io/aws-security-services-best-practices/guides/waf/fraud-prevention/docs/)
- Neptune ML provides GNN training (DGL/R-GCN on SageMaker) for node and edge classification and link prediction, with custom-model support. Fraud is a named use case. — [Neptune ML docs](https://docs.aws.amazon.com/neptune/latest/userguide/machine-learning.html)
- Rekognition Face Liveness costs about $0.015 per check and CompareFaces about $0.001 per image. New accounts from 15 July 2025 may get up to $200 in free-tier credits. — [Rekognition pricing](https://aws.amazon.com/rekognition/pricing/)
- PyOD is a Python library with about 45 outlier-detection methods. Its maintainers recommend ECOD or Isolation Forest as defaults when unsure. They benchmark through ADBench (30 algorithms on 57 datasets). — [PyOD on PyPI](https://pypi.python.org/pypi/pyod)
- The CARE-GNN PyTorch code, with YelpChi and Amazon fraud graph datasets, is open-source and bundled in the DGFraud toolbox. It is suitable for prototyping once labels exist. — [CARE-GNN GitHub](https://github.com/YingtongDou/CARE-GNN)
- The Play Integrity API supplies server-verifiable device and app integrity signals at no extra AWS cost. — [Play Integrity verdicts](https://developer.android.com/google/play/integrity/verdicts)
- Industrial platforms combine automation and humans: about 90% of Trustpilot removals are automated, with specialist teams for escalations and appeals. Tripadvisor sends 4.9% of reviews to moderators. — [Trustpilot Trust Report 2025](https://corporate.trustpilot.com/trust/trust-report-2025); [Tripadvisor release](https://tripadvisor.mediaroom.com/2025-03-18-Tripadvisors-2025-Transparency-Report-reveals-strong-review-submissions-and-improved-fraud-detection)

### Inferences
**Reference architecture (Python on AWS, startup-scale). Stage 1 (launch, no labels):**
- **Ingest.** API Gateway or ALB, behind AWS WAF with Bot Control and ACFP on sign-up if the budget allows. Events (sign-ups, bookings, payments, handshakes, reviews, device verdicts) go to Kinesis or SQS, then to an S3 data lake plus PostgreSQL (RDS/Aurora) for state.
- **Real-time rules engine** as a Python Lambda or FastAPI service, with rules held in a versioned table. Example rules:
  - more than N accounts per device or per hashed CNI;
  - review posted less than X minutes after job close;
  - more than K reviews from the same IP or cell area in 24 hours;
  - reviewer account younger than D days with no prior jobs;
  - job closed without the QR/OTP handshake;
  - GPS co-presence failed;
  - Play Integrity verdict empty or device activity at LEVEL_4;
  - payment followed by a reverse transfer.
  Outputs: allow, hold for review, down-weight, or block.
- **Velocity counters** in Redis (ElastiCache) or DynamoDB with TTL.
- **Nightly batch** (Glue, EventBridge-scheduled Lambda or Fargate):
  - NetworkX graph analytics: connected components on shared device, wallet or CNI; reciprocity cycles; Jaccard overlap of reviewer sets; SybilRank-style trust propagation from ID-verified customers who used platform-routed payment.
  - Dense-subgraph scoring.
  - PyOD/IsolationForest anomaly scores per artisan, on features such as review velocity, rating variance, share of reviews from new accounts, reviewer diversity, and payment-to-review ratio.

**Stage 2 (hundreds of labelled cases):**
- Supervised gradient boosting through AutoGluon on SageMaker, which is AWS's own recommended Fraud Detector replacement.
- Move graph features to Neptune and Neptune ML, or PyG on SageMaker, for GNN classifiers.

**Stage 3:**
- Real-time graph features and model serving through SageMaker endpoints or serverless inference.
- Human-review console with active learning.

**Other notes:**
- **Cost:** Stage 1 runs on Lambda, RDS and S3 for low hundreds of USD per month (an estimate, not sourced). Liveness at $0.015 per artisan onboarding is negligible. Neptune and SageMaker endpoints are the expensive steps, so defer them.
- Avoid building on Fraud Detector, even through old tutorials. Many pre-2025 AWS blog posts still feature it.

### Gaps
- I did not verify current AWS region availability for Rekognition Face Liveness, Neptune ML or WAF Fraud Control in af-south-1 (Cape Town).
- I did not verify that the Neptune Analytics or serverless options support Neptune ML.
- Sift, Sardine, Feedzai and Fingerprint (device fingerprinting) were not researched because the search budget ran out.
- No benchmark of anomaly detectors specifically on review fraud was retrieved.

---

## 8. Governance: appeals, human review, transparency, penalties, and score decay

### Takeaway
Credible anti-fraud needs due process, because false positives destroy artisans' livelihoods. The big platforms combine automated filtering with human escalation and appeals, graduated sanctions (education, warning, public alert, profile freeze, removal, legal action), public transparency reports, and age limits on reviews. UK and EU law now expects a published policy and disclosure of verification methods.

### Cited Findings
- **Graduated sanctions at Trustpilot (2024):** 17,000 educational notifications, 19,000 warnings, 5,000 cease-and-desist letters, 9,000 consumer warnings (score hidden, reviews closed), 11,000 consumer alerts, 4,000 bad-fit businesses removed, and legal action against 11 businesses since 2022. Specialists handle escalations, appeals and quality assurance. — [Trustpilot Trust Report 2025](https://corporate.trustpilot.com/trust/trust-report-2025)
- **Public alerts at Yelp:** Compensated Activity (128), Suspicious Review Activity (363), Unusual Activity (more than 1,190) and Questionable Legal Threat (6) alerts. Yelp says no employee or business owner can override the recommendation software for an individual business. "Not recommended" reviews stay visible separately rather than being deleted. — [Stock Titan / Yelp](https://www.stocktitan.net/news/YELP/yelp-releases-2025-trust-safety-w5g77awiel7e.html); [Business Wire](https://www.businesswire.com/news/home/20260225039344/en/Yelp-Releases-2025-Trust-Safety-Report/)
- Tripadvisor warned about 9,000 businesses for incentivised reviews, and publishes a transparency report every two years. — [Tripadvisor release](https://tripadvisor.mediaroom.com/2025-03-18-Tripadvisors-2025-Transparency-Report-reveals-strong-review-submissions-and-improved-fraud-detection)
- Google restricts posting for violating accounts (more than 783,000 in 2025) and alerts owners during review spikes. — [Search Engine Roundtable](https://www.seroundtable.com/google-maps-spam-fighting-2025-41176.html)
- **Decay:** Booking.com accepts reviews only within three months of check-out, and may stop showing reviews older than 36 months or after a change of ownership. — [Booking Holdings guest review standards](https://h.priceline.com/content-moderation-policy/guest-reviews-standards.en-us.html)
- The UK CMA expects review hosts to have a clear policy prohibiting fake reviews, and "reasonable and proportionate" prevention, detection and removal. The EU requires disclosure of how reviews are verified. — [CMA208](https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf); [Mondaq (Omnibus)](https://www.mondaq.com/dodd-frank-consumer-protection-act/1189542/the-omnibus-directive-consumer-reviews)
- Cross-platform cooperation: the Coalition for Trusted Reviews, Yelp's 1,020 reports to other platforms, and ISS's recommendation that Meta and the Cameroonian gendarmerie set up takedown protocols. — [Amazon Trustworthy Shopping](https://trustworthyshopping.aboutamazon.com/global-action-against-fake-reviews); [Stock Titan / Yelp](https://www.stocktitan.net/news/YELP/yelp-releases-2025-trust-safety-w5g77awiel7e.html); [ISS Today](https://issafrica.org/iss-today/online-fraud-is-becoming-a-gateway-to-human-trafficking-in-cameroon)
- When accounts are closed for deceptive behaviour, Yelp also removes their reviews, which propagates the sanction to the reviews. — [Business Wire](https://www.businesswire.com/news/home/20260225039344/en/Yelp-Releases-2025-Trust-Safety-Report/)

### Inferences
**Penalty ladder for artisans:**
1. Silent down-weighting of suspect reviews.
2. Education message.
3. Formal warning.
4. Public badge such as "Unusual review activity detected", Yelp-style.
5. Score frozen or hidden, Trustpilot-style.
6. Suspension.
7. Ban, with duplicate-face and device blocklisting to stop re-registration.

The default action should be to down-weight, not delete, because friends-and-family signals are ambiguous in close-knit communities.

**Appeals:**
- In-app appeal within 14 days, reviewed by a human who did not make the original decision.
- Artisan sees the category of the violation but not detection specifics, which prevents adversarial learning.
- Target turnaround of 72 hours, because income is at stake.
- Consider a community panel with trade associations for disputed cases.

**Transparency and score design:**
- Publish a "How reviews work and are verified" page in French and English.
- Publish an annual or semiannual trust report: reviews submitted, % verified by payment, % removed, accounts banned, appeals upheld.
- **Score decay:** weight recent jobs more, for example with an exponential half-life of 12–18 months. Show "N jobs in the last 12 months". Old fraud flags should decay too, but bans for identity fraud should not.
- **Data protection fit:** automated decisions affecting livelihoods plus biometric processing under Law 2024/017 point toward human-in-the-loop review for any suspension. Document the lawful basis (consent) for fraud processing.

### Gaps
- No Cameroonian consumer-protection or e-commerce rules on online reviews were found. Law No. 2010/021 on e-commerce and 2011 consumer law were not checked.
- No published research on optimal score-decay parameters was found.

---

## 9. Synthesis: threat model and prevention-by-design summary for a Cameroon artisan platform

### Takeaway
The main threat is an independent artisan boosting their own reputation, through friends and family, refunded fake jobs, or sockpuppet customer accounts. Next come competitor sabotage, customer extortion, fake-artisan deposit scams, and account takeover through SIM swap. The core design rule is that reputation should be earned only through verified, paid, co-located jobs by unique people, scored in a way that is hard to inflate, and continuously audited by graph analytics. Detection alone, or KYC alone, is not enough.

### Cited Findings
- Weak-reputation, independent, competition-exposed businesses manipulate most. — [Luca & Zervas](https://econpapers.repec.org/RePEc:hbs:wpaper:14-006); [Mayzlin et al.](https://nber.org/papers/w18340)
- Fake reviews raise sales about 16% (sales-rank effect), but buyers are mostly low-quality, and ratings fall after buying stops. — [He et al. (SIGecom)](https://www.sigecom.org/exchanges/volume_19/2/HE.pdf)
- Self-boosting is the majority of fraud at Tripadvisor (54%). Most fakes at Trustpilot are 5-star. — [Tripadvisor](https://tripadvisor.mediaroom.com/2025-03-18-Tripadvisors-2025-Transparency-Report-reveals-strong-review-submissions-and-improved-fraud-detection); [Trustpilot](https://corporate.trustpilot.com/trust/trust-report-2025)
- In Cameroon, SIM-based identity is weak: up to 200 SIMs on one CNI were found in 2019, insider-registered SIMs exist, and 891,082 SIMs were deactivated in 2022. Biometric CNI and document KYC are now available. — [Africanews](https://www.africanews.com/2019/07/06/cameroon-fines-main-local-telecom-companies); [ITWeb](https://itweb.africa/article/cameroon-sim-card-shutdown-piles-on-pressure-for-telcos/lLn14Mmj9RKqJ6Aa); [Smile ID](https://smile.id/countries/cameroon)
- Amazon Fraud Detector is closed to new customers. Use AutoGluon/SageMaker, WAF Fraud Control and Neptune ML. — [AWS](https://docs.aws.amazon.com/frauddetector/latest/ug/frauddetector-availability-change.html)

### Inferences
**Threat model (attacker → method → primary control):**

| Attacker | Method | Primary controls |
|---|---|---|
| Artisan (self-boost) | Sockpuppet customer accounts | Device graph and Play Integrity; one review per verified job; duplicate-face check on artisans; device-recall blocklist |
| Artisan (self-boost) | Friends and family reviews | Payment-routed jobs; reviewer-diversity metric; repeat-pair diminishing weight; down-weight rather than delete |
| Artisan (self-boost) | Refunded fake jobs (the He et al. pattern) | Wallet-flow analysis (artisan→reviewer transfers); GPS co-presence plus minimum time on site; photo evidence |
| Artisan rings | Reciprocal reviews or vouching cartels | Cycle detection; dense-subgraph (FRAUDAR-style) scoring; cap reviews between artisans |
| Competitor | 1-star bombing | Spike detection plus review freeze; transaction anchoring (no job, no review) |
| Customer | Extortion ("discount or 1 star"); non-payment | Simultaneous reveal; extortion flag with chat evidence; no review without payment; rater-reliability weighting |
| Scammer | Fake artisan profiles taking deposits | Tier-1 KYC (CNI/récépissé plus liveness plus face dedupe); escrow-only deposits; in-app warnings |
| Scammer | Account takeover through SIM swap or insider SIM | Re-verify with selfie on number or device change; payout-wallet change cool-off; alerts |
| Broker | Selling reviews or aged accounts on WhatsApp or Facebook | Monitor groups; account-age and behaviour features; report to Meta; public "compensated activity" badges |
| Customer and artisan collusion | Fake "verified" jobs paid and refunded | Graph plus payment anomaly models; random audits and call-backs by field agents |

**Prevention by design (ranked by impact per unit of effort):**
1. No review without a platform-verified job (handshake plus payment or GPS).
2. One person, one artisan account (CNI plus liveness plus duplicate-face).
3. Inflation-resistant scoring: Bayesian shrinkage, recency weighting, distribution display, binary "would hire again", repeat-customer rate.
4. Simultaneous reveal and an extortion flag.
5. Escrowed deposits only.
6. A rules engine from day one.
7. Nightly graph audits.
8. Published policy, transparency report, and appeals.

### Gaps
- No examples were found of African artisan or home-services marketplaces publishing anti-fraud practices, so local benchmarks are absent.
- No user research was found on Cameroonian willingness to complete selfie or ID verification, or on onboarding drop-off rates.

---

## Sources

1. https://docs.aws.amazon.com/frauddetector/latest/ug/frauddetector-availability-change.html
2. https://dev.classmethod.jp/articles/amazon-fraud-detector-autogluon-sagemaker-ai-notebooks/
3. https://papers.ssrn.com/abstract=3664992
4. https://www.informs.org/News-Room/INFORMS-Releases/News-Releases/Study-Examines-the-Impact-of-Fake-Online-Reviews-on-Sales2
5. https://www.sigecom.org/exchanges/volume_19/2/HE.pdf
6. https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials
7. https://www.hoganlovells.com/en/publications/ftc-publishes-final-rule-banning-fake-consumer-reviews-and-testimonials
8. https://dwt.com/insights/2024/08/ftc-finalizes-rule-banning-fake-consumer-reviews
9. https://econpapers.repec.org/RePEc:hbs:wpaper:14-006
10. https://dash.harvard.edu/handle/1/22836596
11. https://bu.edu/bostonia/2013/yelp-reviews-can-you-trust-them
12. https://nber.org/papers/w18340
13. https://insights.som.yale.edu/insights/can-online-reviews-be-trusted
14. https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf
15. https://www.traverssmith.com/knowledge/knowledge-container/preventing-fake-reviews-what-are-reasonable-and-proportionate-steps/
16. https://www.which.co.uk/news/article/fake-reviews-and-sneaky-fees-banned-under-new-law-campaigned-for-by-which-aLzVp4g0S76D
17. https://www.rpclegal.com/snapshots/advertising-and-marketing/autumn-2025/cma-publishes-updated-principles-for-social-media-platforms-on-reviews-and-endorsements/
18. https://www.mondaq.com/dodd-frank-consumer-protection-act/1189542/the-omnibus-directive-consumer-reviews
19. https://www.hsfkramer.com/en_US/notes/tmt/2020-06/the-omnibus-directive-a-new-deal-for-eu-consumers-part-2-the-objectives-and-provisions-of-the-omnibus-directive-in-focus
20. https://www.makeinfluence.com/en/academy/fake-and-manipulated-reviews-what-the-eu-omnibus-directive-bans
21. https://www.seroundtable.com/google-maps-spam-fighting-2025-41176.html
22. https://www.seroundtable.com/google-maps-spam-fighting-2024-39186.html
23. https://blog.google/products-and-platforms/products/maps/how-google-maps-protects-against-fake-content/
24. https://adaptdigitalsolutions.com/articles/google-review-policy-2026-compliance-guide/
25. https://ppc.land/google-tightens-maps-review-policy-staff-names-and-quotas-now-banned/
26. https://www.aboutamazon.com/news/policy-news-views/amazons-latest-actions-against-fake-review-brokers-2024
27. https://aboutamazon.com/news/policy-news-views/amazons-latest-actions-against-fake-review-brokers-2023
28. https://trustworthyshopping.aboutamazon.com/global-action-against-fake-reviews
29. https://corporate.trustpilot.com/trust/trust-report-2025
30. https://corporate.trustpilot.com/trust
31. https://tripadvisor.mediaroom.com/2025-03-18-Tripadvisors-2025-Transparency-Report-reveals-strong-review-submissions-and-improved-fraud-detection
32. https://www.stocktitan.net/news/YELP/yelp-releases-2025-trust-safety-w5g77awiel7e.html
33. https://www.businesswire.com/news/home/20260225039344/en/Yelp-Releases-2025-Trust-Safety-Report/
34. https://www.usenix.org/conference/nsdi12/technical-sessions/presentation/cao
35. https://css.csail.mit.edu/6.566/2018/readings/sybilrank.pdf
36. https://bhooi.github.io/papers/fraudar_kdd16.pdf
37. https://bhooi.github.io/projects/fraudar/index.html
38. https://videolectures.net/kdd2016_hooi_bounding_graph
39. https://alexbeutel.com/papers/tkdd_fraud_detection_with_camo.pdf
40. https://www2.cs.uh.edu/%7Earjun/papers/WWW-2012-group-spam-camera-final.pdf
41. https://www.cs.uic.edu/~liub/FBS/fake-reviews.html
42. https://research.google/pubs/spotting-fake-reviewer-groups-in-consumer-reviews/
43. https://github.com/YingtongDou/CARE-GNN
44. https://arxiv.org/pdf/2002.12307
45. https://docs.aws.amazon.com/neptune/latest/userguide/machine-learning.html
46. https://www.biometricupdate.com/202404/cameroon-telcos-get-ultimatum-to-id-all-sim-holders-in-regions-plagued-by-security-crisis
47. https://ecofinagency.com/law/0110-32376-cameroon-a-decree-to-limit-numbers-of-sim-per-subscriber-and-prohibit-sale-of-sim-cards-on-streets
48. https://www.digitalbusiness.africa/identification-des-abonnes-au-cameroun-les-risques-que-comporte-le-decret-du-premier-ministre/
49. https://osiris.sn/Cameroun-le-regulateur-telecoms.html
50. https://www.africanews.com/2019/07/06/cameroon-fines-main-local-telecom-companies
51. https://itweb.africa/article/cameroonian-telcos-in-hot-water-over-sim-card-registration/rxP3jqBmrBPMA2ye
52. https://itweb.africa/article/cameroon-sim-card-shutdown-piles-on-pressure-for-telcos/lLn14Mmj9RKqJ6Aa
53. https://ecofinagency.com/telecom/1204-45389-cameroon-cracks-down-on-unregistered-sim-cards-as-terrorists-net-524-100-in-ransoms-via-mobile-money
54. https://itweb.africa/article/cameroon-telcos-push-for-relaxation-of-subscriber-id-rules/lwrKxv3KWaWvmg1o
55. https://www.digitalbusiness.africa/les-principaux-foyers-de-cybercriminels-avec-en-tete-les-prisons-de-kondengui-et-de-new-bell-font-perdre-122-milliards-de-f-cfa-a-leconomie-camerounaise-en-2021/
56. https://osiris.sn/Cybercriminalite-Sommation-pour.html
57. https://globallawexperts.com/cameroon-fintech-platforms-navigating-mobile-money-fraud-or-unauthorized-transactions/
58. https://www.gsmaintelligence.com/research/two-thirds-of-africans-yet-to-join-the-mobile-revolution-african-mobile-penetration-set-at-33-multiple-sims-driving-growth
59. https://www.gsma.com/newsroom/press-release/more-than-half-of-sub-saharan-africa-to-be-connected-to-mobile-by-2025-finds-new-gsma-study
60. https://www.ecofinagency.com/telecom/1603-45280-ssas-mobile-subscriptions-projected-to-hit-1-1bn-by-2028-driving-financial-inclusion-report
61. https://www.biometricupdate.com/202502/cameroons-new-generation-biometric-id-card-system-goes-live-feb-17
62. https://idtechwire.com/cameroon-launches-advanced-biometric-national-id-system-with-48-hour-issuance-promise/
63. https://wearetech.africa/en/fils-uk/news/tech/cameroon-new-national-id-paves-way-for-digital-identity-system
64. https://www.itedgenews.africa/cameroon-rolls-out-biometric-national-id-cards-in-landmark-reform-ahead-of-2025-elections/
65. https://www.biometricupdate.com/202506/cameroon-lawmakers-criticize-cost-complications-in-new-national-id-system
66. https://www.biometricupdate.com/202508/new-biometric-id-card-center-opens-for-citizens-in-northern-cameroon
67. https://smile.id/countries/cameroon
68. https://techcabal.com/2023/02/23/mark-straub-smile-identity-ceo-interview/
69. https://usesmileid.com/case-studies/bridge-card-success-story
70. https://youverify.co/product/kyc/country-coverage
71. https://dojah.io/blog/best-identity-verification-api-africa-2026
72. https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/increased-monitoring-october-2026.html
73. https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/increased-monitoring-february-2026.html
74. https://aws.amazon.com/rekognition/face-liveness
75. https://docs.aws.amazon.com/ai/responsible-ai/rekognition-face-liveness/overview.html
76. https://aws.amazon.com/rekognition/pricing/
77. https://developer.android.com/google/play/integrity/verdicts
78. https://docs.aws.amazon.com/waf/latest/developerguide/waf-acfp.html
79. https://aws.amazon.com/blogs/security/prevent-account-creation-fraud-with-aws-waf-fraud-control-account-creation-fraud-prevention
80. https://aws.github.io/aws-security-services-best-practices/guides/waf/fraud-prevention/docs/
81. https://developer.orange.com/apis/camara-sim-swap-france
82. https://payservices.orange.com/en/digital-identity/api-camara-en
83. https://lexafrica.com/2025/10/cameroon-data-protection-law-compliance/
84. https://www.dlapiperdataprotection.com/index.html?c=CM&t=law
85. https://cio-mag.com/protection-des-donnees-au-cameroun-la-course-contre-la-montre-avant-juin-2026/
86. https://droitmediasfinance.com/index.php/actualites/droit-tech-fintech/1297-cameroun-la-loi-sur-la-protection-des-donnees-a-caractere-personnel-entre-en-vigueur-ce-23-juin-2026
87. https://www.booking.com/reviews.html?aid=313263
88. https://h.priceline.com/content-moderation-policy/guest-reviews-standards.en-us.html
89. https://momodeveloper.mtn.com/
90. https://ecomatin.net/mobile-money-le-cameroun-depasse-la-barre-des-24-000-milliards-fcfa-de-transactions-en-un-an-un-record
91. https://www.wearetech.africa/fr/fils/actualites/finance/paiements-numeriques-le-cameroun-face-au-defi-de-la-securisation-des-plateformes
92. https://papers.ssrn.com/abstract=2939064
93. https://econpapers.repec.org/RePEc:inm:ormksc:v:40:y:2021:i:6:p:1013-1029
94. https://www.informs.org/News-Room/INFORMS-Releases/News-Releases/New-Research-Highlights-Motivations-of-Reviewers
95. https://banque.meilleurtaux.com/ouvrir-un-compte-bancaire/actualites/2020-octobre/fraudes-bancaires-origine-perte-6-milliards-fcfa-cameroun.html
96. https://cio-mag.com/?p=45351
97. https://www.digitalbusiness.africa/cameroun-pres-de-07-milliards-de-fcfa-perdus-du-fait-de-la-cybercriminalite-antic/
98. https://ecomatin.net/la-cybercriminalite-fait-perdre-122-milliards-s-au-cameroun-en-2021
99. https://itweb.africa/article/cameroon-loses-us108-m-to-cybercrime-in-2019/mQwkoM6Pkmjv3r9A
100. https://ecomatin.net/seulement-6-victimes-de-la-cybercriminalite-sur-100-portent-plainte
101. https://www.camer.be/90795/11:1/cameroun-la-lutte-contre-la-fraude-comme-gage-de-securite-des-transactions-mobile-momo-cameroon.html
102. https://www.osiris.sn/suite-aux-plaintes-d-arnaques-l-operateur-orange-cameroun-renforce-la-securite.html
103. https://www.digitalbusiness.africa/arnaque-2-0-des-brouteurs-beninois-vendeurs-de-porte-monnaie-magiques-tissent-leur-nid-avec-succes-au-cameroun/
104. https://www.camer.be/92950/11:1/mobile-money-au-cameroun-quand-le-paiement-digital-devient-une-arme-de-sequestration-cameroon.html
105. https://researchonline.lse.ac.uk/id/eprint/127176
106. https://issafrica.org/research/books-and-other-publications/digital-deception-online-job-scams-amid-cybercrime-vulnerability-in-cameroon-and-chad
107. https://issafrica.org/iss-today/online-fraud-is-becoming-a-gateway-to-human-trafficking-in-cameroon
108. https://www.camer.be/amp/56602/24:21/cameroun-cybercriminalite-sur-facebook-voici-les-faux-comptes-de-personnalites-qui-servent-a-arnaquer-cameroon.html
109. https://afrique.le360.ma/economie/cameroun-commerce-en-ligne-et-arnaque-font-bon-menage_LAVEL6WQJ5HFBI2EGGPMUMAB3A/
110. https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2025/04/The-State-of-the-Industry-Report-on-Mobile-Money-2025.pdf
111. https://commsrisk.com/mobile-money-providers-have-low-opinion-of-effectiveness-of-law-enforcement/
112. https://techmoran.com/2026/03/26/mobile-money-transactions-hit-2-trillion-in-2025-as-usage-surges-gsma-report/
113. https://www.thalesgroup.com/en/news-centre/insights/enterprise/access-engagement-where-next-mobile-money
114. https://thehackernews.com/2025/11/google-launches-new-maps-feature-to.html
115. https://www.seroundtable.com/google-business-profile-report-negative-review-extortion-scams-40250.html
116. https://www.nber.org/papers/w25857.pdf
117. https://www.informs.org/News-Room/INFORMS-Releases/News-Releases/Five-Star-Rating-New-Research-Finds-It-May-Not-Reflect-What-Consumers-Receive
118. https://john-joseph-horton.com/papers/reputation-inflation/
119. https://pypi.python.org/pypi/pyod
