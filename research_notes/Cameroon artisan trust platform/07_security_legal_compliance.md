# Security, Privacy and Legal/Regulatory Compliance Blueprint: Artisan Trust and Service-Matching Platform in Cameroon (AWS, Python backend)

Research notes, current to 12 November 2026. This is not legal advice. Items marked "LAWYER" need confirmation by Cameroonian counsel (ideally one with OHADA corporate, CEMAC/COBAC payments, labour and data-protection experience).

Method note: the official text of Law No. 2024/017 (the Presidency's certified copy, a scanned PDF) was read directly, as were the scanned BEAC/COBAC Regulation 04/18 and the BEAC 2024 payment-services report. Article numbers and fine amounts below come from those primary texts unless stated otherwise. Partway through the research, the shared web-search budget for the whole research run ran out. After that, only direct fetches of known URLs were possible, which is why labour, tax, company-registration and insurance coverage is thinner (see each Gaps section).

---

## 1. Cameroon Law No. 2024/017 of 23 December 2024 on personal data protection: obligations, authority, consent, sensitive data, transfers, breaches, penalties, timing and decree status

### Takeaway
Law 2024/017 is in force. Its 18-month grace period (Art. 73) ended on 23 June 2026, so the platform must comply now. The law is unusually strict: consent is the default legal basis (no contract or legitimate-interest ground), processing needs prior authorisation, every transfer abroad needs prior authorisation, profiling is criminalised, and breach notification is "without delay." However, the presidential decree that would create and staff the Personal Data Protection Authority (APDP) had not been confirmed as adopted as of October/November 2026. That leaves authorisation-based duties (processing authorisations, transfer authorisations, standard contractual clauses) legally binding but practically impossible to obtain. This is the single biggest legal uncertainty for an AWS-hosted platform.

### Cited Findings

**Status, timing and implementing texts**
- The law was promulgated by President Paul Biya on 23 December 2024 (signature page of the certified copy). Art. 73 gives controllers and processors 18 months from promulgation to comply. Art. 74 says specific texts will set out application details. Art. 75 repeals contrary provisions. — [Law 2024/017 official certified text](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf); [Presidency (prc.cm) listing](https://prc.cm/en/multimedia/documents/10271-law-n-2024-017-of-23-12-2024-web)
- Commentators state the compliance deadline was 23 June 2026 and that non-compliant processing "will be sanctioned after June 23, 2026." — [LEX Africa, Oct 2025](https://lexafrica.com/2025/10/cameroon-data-protection-law-compliance/); [Droit Médias Finance](https://droitmediasfinance.com/index.php/actualites/droit-tech-fintech/1297-cameroun-la-loi-sur-la-protection-des-donnees-a-caractere-personnel-entre-en-vigueur-ce-23-juin-2026); [CIO Mag, "course contre la montre"](https://cio-mag.com/protection-des-donnees-au-cameroun-la-course-contre-la-montre-avant-juin-2026/)
- Art. 53(2) leaves the creation, organisation and functioning of the APDP to a decree of the President of the Republic. — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)
- DLA Piper says the implementing decree is still a draft and that enforcement decisions and ministerial orders are pending. — [DLA Piper Data Protection Laws of the World: Cameroon](https://www.dlapiperdataprotection.com/index.html?c=CM&t=law)
- Africa Data Protection's country tracker says no supervisory authority has been publicly identified. — [africadataprotection.org: Cameroon](https://www.africadataprotection.org/en/pays/cameroun.html)
- Other trackers describe the regulator as "not yet fully operationalized" or "not yet operational." — [PACMap](https://pacmap.dev/regulation/cm-personal-data-protection-2024); [Afriwise / NFM Avocats](https://www.afriwise.com/resources/cameroons-evolving-data-privacy-landscape)
- A source updated 26 October 2026 says it could not confirm whether the APDP is operational or whether the decree has been adopted, and that the law's obligations apply either way. — [Kukie.io](https://kukie.io/blog/cookie-consent-cameroon-data-protection)
- A post-deadline commentary (23 June 2026) says the "secondary rules or institutional buildout" have not yet produced a clear regime. — [Blacktree](https://blacktree.nl/2026/06/23/cameroon-data-protection-law-grace-period-ended/)
- MINPOSTEL published a draft authority decree for consultation (Word file dated 22 May 2023). It provides for:
  - 10 members, renewed by half every 2.5 years; the President is appointed by presidential decree from among the members.
  - A "formation restreinte" (President plus 3 members) that imposes sanctions.
  - Authority response deadlines of 30 working days for declarations and authorisations, and 2 months for opinions.
  - Within 7 days, a declaration can be reclassified as needing authorisation when it involves sensitive data, minors' data, or manifest risks.
  - An adequacy list limited to states with a data-protection law and an operational DPA.
  - Six months after constitution to list priority decisions to adopt within 12 months.
  
  Caution: this draft cross-references article numbers of the 2023 draft bill, not the enacted law. — [MINPOSTEL draft decree (PDF)](https://www.minpostel.gov.cm/images/Documentation/patnuc/textes_preparation_pour_consultation_publique/protection_data/230518%20Decret_APD%20FIN%20_CLEAN.pdf)
- The 2023 draft bill would have required a DPO for public bodies and for large-scale monitoring or sensitive-data processing, with a 10-month transition. — [Moukouri Law](https://moukourilaw.com/projets-de-loi-et-decret-relatifs-a-la-protection-des-donnees-a-caractere-personnel-au-cameroun/)
- DLA Piper notes that the enacted law dropped the DPO requirement and the draft's 72-hour breach deadline. — [DLA Piper](https://www.dlapiperdataprotection.com/index.html?c=CM&t=law)
- Media coverage says news reports that the "authority was created" (24 Dec 2024) refer only to its creation in principle by Art. 53 of the law. They give no information on members, installation or caseload. — [Digital Business Africa, 24 Dec 2024](https://www.digitalbusiness.africa/cameroun-lautorite-de-protection-des-donnees-a-caractere-personnel-creee/)

**Scope**
- Art. 2 covers:
  - processing by the State, local authorities, or any natural or legal person;
  - processing of personal data of any person established, resident or in transit in Cameroon;
  - processing by a controller or processor established in Cameroon;
  - processing on territory where Cameroonian law applies by international law.
  
  Art. 3 excludes purely personal or household processing, temporary technical copies made in transmission, and some journalistic, artistic and research processing. — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)
- Conflict: one analysis says the law "does not apply extraterritorially to foreign controllers or processors" ([Techhive Advisory](https://techhiveadvisory.africa/insights/operationalising-cameroons-data-protection-law-a-review-of-key-provisions-and-impacts)). The primary text of Art. 2 attaches scope to data subjects located in Cameroon, so a foreign entity processing Cameroonians' data appears to be covered.

**Legal bases and consent**
- Art. 9(1): processing requires the data subject's prior, free, informed, specific and unambiguous consent.
- Art. 9(2): derogations exist only where processing is necessary for a legal obligation, a public-interest mission or the exercise of the Authority's functions, or protecting the health of the data subject or another person.
- Art. 9(3): consent of a minor under 18 is valid only with that of the parents or legal representative.
- Art. 50 separately prohibits processing without the data subject's prior consent. — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)
- Analysts highlight the absence of a contract or legitimate-interest basis as a departure from GDPR. — [Securys](https://www.securys.co.uk/blog/next-stop-cameroon); [Techhive Advisory](https://techhiveadvisory.africa/insights/operationalising-cameroons-data-protection-law-a-review-of-key-provisions-and-impacts)
- Principles (Arts. 6–13): respect for private life, confidentiality across networks, lawful and fair processing, purpose limitation, accuracy. Retention may not exceed what processing needs, and the retention period is fixed in the processing authorisation (Art. 13(2)). — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)
- Under Art. 49, processing is prohibited without prior authorisation of the competent administrations and structures. DLA Piper reports that the draft decree foresees three filing regimes: prior notice, prior declaration and prior authorisation. — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf); [DLA Piper](https://www.dlapiperdataprotection.com/index.html?c=CM&t=law)

**Sensitive data, including biometrics**
- Art. 48(1) prohibits processing data on:
  - religious, philosophical, political or trade-union opinions and activities;
  - racial or ethnic, linguistic or regional origin;
  - sex life;
  - genetics;
  - "biometrics in health matters" (biométrie en matière de santé).
- Art. 48(2) prohibits processing personal data in banking transactions without prior authorisation of competent administrations. — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)
- DLA Piper's definitions list biometrics, health, banking transactions and legal proceedings as sensitive data. — [DLA Piper](https://www.dlapiperdataprotection.com/index.html?c=CM&t=law)
- Art. 66 criminalises storing sensitive data without the data subject's express consent: 6 months to 2 years and/or 500,000 to 5,000,000 FCFA. — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)

**Rights and accountability**
- Rights include:
  - cessation of dissemination and erasure (Arts. 37–38);
  - erasure and the "droit à l'oubli numérique" (Art. 23);
  - automated decision-making: a right to human intervention, to express one's view and to contest (Art. 44(3));
  - restriction (Art. 46);
  - rules on deceased persons' data (Art. 45).
  
  Response deadlines are left to regulation (Art. 47). — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)
- Conflict: one report says the law does not address automated decision-making ([Global Center on AI Governance](https://www.globalcenter.ai/research/data-privacy-and-responsible-ai-adoption-in-cameroon)). This is contradicted by Art. 44 of the official text.
- Accountability duties:
  - confidentiality and acting on instructions (Art. 24(1)–(2));
  - technical and organisational measures per the Authority's "référentiel" at design time and during processing, i.e. privacy by design (Art. 24(3));
  - risk assessment (Art. 25);
  - processor contracts specifying data types, categories of persons and rights/obligations (Art. 30);
  - joint controllers jointly liable under a public arrangement (Art. 31);
  - a DPIA for processing likely to create high risk (Art. 33);
  - a certification mechanism (Art. 34);
  - file interconnection lawful only when necessary for a legal obligation (Art. 36). — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)
- Anove reports a register of processing (Art. 29) and an annual security report (Art. 27). These were not verified on the scanned pages read. — [Anove](https://www.anove.ai/en/regulations/cameroon-law-2024-017)

**Breach notification**
- Art. 22(1): once aware of any personal data breach, the controller or processor must inform the APDP and the data subject "sans délai" (without delay). No risk threshold or hour count is set.
- Art. 22(2): encryption and restrictive access authorisations are cited as expected protective measures. — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)
- The processor's direct duty and the absence of a risk threshold are flagged as sources of uncertainty. — [Techhive Advisory](https://techhiveadvisory.africa/insights/operationalising-cameroons-data-protection-law-a-review-of-key-provisions-and-impacts)
- The definition of "violation de données" covers accidental or unlawful destruction, loss, alteration, unauthorised disclosure or access (Art. 5). — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)

**Penalties (primary text, Arts. 54–71)**

Administrative (Art. 54):
- A formal notice requires compliance within 10 days.
- An injunction can then follow with a daily penalty (astreinte) of up to 100,000 FCFA per day of delay.
- Further sanctions: suspension of the authorised activity, withdrawal of authorisation, or a ban on all processing.

Administrative fines:

| Article | Breach | Fine (FCFA) |
|---|---|---|
| Art. 55 | Processing without prior authorisation | 5M–50M |
| Art. 56 | Refusing a data subject their information | 1M–10M |
| Art. 57 | Not respecting the référentiel | 5M–20M |
| Art. 58 | Interconnection breaches | 1M–5M |
| Art. 59 | Operating without the required certification | 5M–15M |
| Art. 60 | Transfer to a third country without APDP prior authorisation | 10M–50M |
| Art. 61 | Breaching the cahier des charges | 10M–100M |

Civil (Art. 62): urgent court orders, with penalties, and damages.

Criminal:

| Article | Offence | Prison | Fine (FCFA) |
|---|---|---|---|
| Art. 63 | Fraudulent, unfair or illicit collection or access (doubled if combined with locking or encryption, i.e. ransomware-type attacks) | 2–5 years | 200k–5M |
| Art. 64 | Processing despite objection, including direct marketing; ignoring rectification or erasure demands | 1–3 years | 50k–1M |
| **Art. 65** | **Processing personal data for profiling purposes** | **3–10 years** | **1M–20M** |
| Art. 66 | Sensitive data without express consent | 6 months–2 years | 500k–5M |
| Art. 67 | Diverting purpose or incompatible further processing | 6 months–2 years | 500k–5M |
| Art. 68 | Disclosure harming dignity or privacy to an unauthorised third party (prosecution only on complaint) | 6 months–2 years | 200k–5M |
| Art. 69 | Transfer to a foreign state or international organisation in breach of the law | 3–10 years | 2M–20M |
| Art. 70 | Obstructing the APDP (doubled if documents are hidden or falsified) | 6 months–3 years | 100k–500k |
| Art. 71 | Legal persons, in addition to directors' personal criminal liability | — | 50M–1 billion |

Sources: [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf); consistent with [Anove](https://www.anove.ai/en/regulations/cameroon-law-2024-017) and [PACMap](https://pacmap.dev/regulation/cm-personal-data-protection-2024).

- Conflicts in secondary sources:
  - Kukie claims "administrative fines of up to XAF 1 billion" for processing without consent ([Kukie.io](https://kukie.io/blog/cookie-consent-cameroon-data-protection)). The 1 billion figure is actually the criminal fine ceiling for legal persons (Art. 71).
  - Techhive cites a 100M FCFA ceiling ([Techhive](https://techhiveadvisory.africa/insights/operationalising-cameroons-data-protection-law-a-review-of-key-provisions-and-impacts)). That is the Art. 61 administrative ceiling.
  - A news piece speaks of fines as a "percentage of turnover" ([Droit Médias Finance](https://droitmediasfinance.com/index.php/actualites/droit-tech-fintech/1297-cameroun-la-loi-sur-la-protection-des-donnees-a-caractere-personnel-entre-en-vigueur-ce-23-juin-2026)). No turnover-based fine appears in the text.
  - Kinsmen Advocates states that ANTIC handles notifications and authorisations ([Kinsmen Advocates](https://kinsmenadvocates.com/cybersecurity/data-protection-in-cameroon-2025)). That conflicts with the law, which vests these powers in the APDP. Treat it as unreliable.
- Sector carve-out: Art. 72 says processing relating to security, defence, health, justice and civil status is governed by specific texts as needed. — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)
- Chambers' 2026 Cameroon chapter describes the law as "modelled on the European GDPR", with an 18-month transition and a regulator "expected to be created by decree." — [Chambers Doing Business In 2026: Cameroon](https://gpg-pdf.chambers.com/Doing-Business-In-2026/151/)

### Inferences
- **Profiling (Art. 65) is the top product risk.** Trust scores, artisan ranking, fraud scoring and recommendation engines are all arguably "profiling." The text as written penalises processing "à des fins de profilage" without an explicit consent or authorisation carve-out. Until a lawyer or the APDP clarifies, design scoring to be:
  - transparent;
  - explicitly consented to;
  - based on service-quality data (job completion, verified reviews) rather than personal characteristics;
  - subject to human review and contestation (Art. 44).
  
  Seek a written legal opinion before launching automated trust scores. LAWYER.
- **"Linguistic or regional origin" is listed as prohibited sensitive data (Art. 48(1)).** Do not collect or infer ethnicity, region of origin or tribe. Treat "preferred language" for voice/IVR as a UI setting, not a profile attribute. Never use it in matching or ranking without legal advice. LAWYER.
- **Biometrics:** the prohibition's wording targets "biometrics in health matters." Face or selfie liveness for artisan ID verification is still captured by the general sensitive-data category in commentators' reading and by Art. 66's express-consent rule. Safest approach:
  - use explicit, separately recorded consent;
  - prefer a licensed KYC vendor;
  - store templates, not raw images, or delete images after verification.
- **Contract is not a legal basis.** Bundle consent into onboarding with granular, separately revocable toggles: core service, location sharing, marketing, reviews/profile publication, and scoring. Keep immutable consent receipts. Revoking consent for core data will mean closing the account.
- **Breach "sans délai" with no threshold:** pre-draft notices in French and English, with simple local-language voice/SMS versions for data subjects. Target notification to the APDP within 72 hours (the dropped draft benchmark) as a defensible practice. Keep evidence of the attempt even if no APDP contact channel exists.
- **No operational APDP:** keep a "compliance file" covering the processing register, DPIA, transfer impact assessment and consent records. File the authorisation and transfer applications as soon as the APDP opens. Prepare a dated letter to MINPOSTEL documenting good-faith attempts. LAWYER: confirm whether any interim filing route exists, for example via MINPOSTEL or ANTIC.

### Gaps
- No confirmation, as of November 2026, that the Art. 53 presidential decree has been signed, that APDP members are appointed, or that any "référentiel", standard contractual clauses or adequacy list has been published. Official Gazette and Presidency communiqués could not be searched after the search budget ran out.
- Pages of the law covering Arts. 14–21 and 26–29 (information duties, register, security report) were not read directly. Those details rely on secondary sources.
- Whether Art. 65 (profiling) is intended to apply only to unauthorised or unconsented profiling is unclear from the text. No commentary was found.
- Data-subject request deadlines (Art. 47) and DPIA modalities (Art. 33(2)) await regulations.

---

## 2. Law 2010/012 (cybersecurity and cybercrime), Law 2010/021 (e-commerce), Law 2010/013 (electronic communications), ANTIC and ART roles, consumer framework law 2011/012

### Takeaway
The 2010 trilogy (cybersecurity, e-communications, e-commerce) still applies alongside Law 2024/017. The e-commerce law adds transaction-data retention and opt-in for automated direct marketing. The cybersecurity law gives ANTIC the national ICT-security role. ART regulates telecom operators and handles consumer complaints about electronic communications. Primary texts of these laws and the 2011 consumer law could not be retrieved in this run (the hosting site blocked fetches and search ran out). Their detailed obligations need a local lawyer's checklist.

### Cited Findings
- DLA Piper lists the 2010 electronic communications, cybersecurity and e-commerce laws and the 2016 Criminal Code as related texts to Law 2024/017. — [DLA Piper](https://www.dlapiperdataprotection.com/index.html?c=CM&t=law)
- Under Law 2010/021 on electronic commerce:
  - service providers must store data on electronic commercial transactions (Art. 32);
  - direct marketing by automated calling, fax or email is prohibited without the recipient's prior consent (Art. 7(1)).
  
  DLA Piper notes there are no specific cookie or location-data rules. These may come via the APDP référentiel. — [DLA Piper](https://www.dlapiperdataprotection.com/index.html?c=CM&t=law)
- Kinsmen Advocates says Law 2010/012 (21 December 2010) on cybersecurity and cybercrime contains personal-data and communications-privacy provisions, and that Decree No. 2013/0399/PM of 27 February 2013 sets implementing measures. Its cybercrime offences cover system intrusion, data theft or manipulation, identity theft and digital fraud, and critical-infrastructure operators face enhanced requirements. Low-reliability source (see Section 1 conflict). — [Kinsmen Advocates](https://kinsmenadvocates.com/cybersecurity/data-protection-in-cameroon-2025)
- Draft laws on commercial communications, cybersecurity and cybercrime have reportedly been under consideration since 2023 under the World Bank-funded PATNuC programme run by MINPOSTEL. They are not yet in force. — [Global Center on AI Governance](https://www.globalcenter.ai/research/data-privacy-and-responsible-ai-adoption-in-cameroon)
- ART (Agence de Régulation des Télécommunications) publishes a compilation of electronic-communications texts, operators' USSD code tables and an operator list. It runs a consumer-complaints function, references a CEMAC directive on user-rights protection, and issues quality-of-service formal notices to operators. — [ART website](https://www.art.cm/)
- No e-commerce-specific consumer privacy act exists, and general laws apply. MTN Mobile Money and Orange Money are the dominant consumer payment methods, and phones are the main purchase device. — [US ITA Country Commercial Guide: Cameroon eCommerce](https://www.trade.gov/country-commercial-guides/cameroon-ecommerce)
- Enforcement and implementation capacity is described as very limited, with low public awareness of privacy rights. — [Global Center on AI Governance](https://www.globalcenter.ai/research/data-privacy-and-responsible-ai-adoption-in-cameroon)

### Inferences
- **Retention conflict:** e-commerce transaction-data retention (Law 2010/021 Art. 32) must be reconciled with Law 2024/017's minimisation and retention-in-authorisation rule (Art. 13). Keep transaction records (job, price, parties, timestamps) separately from profile data under a documented retention schedule. LAWYER: confirm the retention period.
- **Marketing opt-in:** marketing via SMS, WhatsApp or automated calls needs prior opt-in under both Law 2010/021 Art. 7 and Law 2024/017 Art. 64 (objection to direct marketing is criminally sanctioned). It also needs opt-in under WhatsApp policy (Section 7).
- **ANTIC certification:** whether ANTIC security audits or certification apply to a private marketplace has not been established. Typically they target operators of critical information infrastructure, network operators, and certification/PKI providers. LAWYER.
- **ART:** if the platform uses USSD short codes or SMS sender IDs, it will contract with MNOs or aggregators who hold ART authorisations. Check whether a value-added-service declaration is required. LAWYER.
- **Consumer law 2011/012:** expect information duties (price, identity of provider), unfair-terms limits and a right to redress. Platform terms should clearly state the platform's role as intermediary versus service provider. LAWYER.

### Gaps
- The full texts of Laws 2010/012, 2010/013, 2010/021 and 2011/012 were not retrieved (403 errors on the hosting site; search budget exhausted). ANTIC's audit and certification obligations, data-retention periods for providers, intermediary-liability (hosting) rules and consumer-law specifics remain unverified.
- ANTIC's website returned no substantive content on missions or incident reporting.
- SIM-registration and identification rules (relevant to SIM-swap risk) were not verified.

---

## 3. CEMAC/BEAC payment regulation, e-money, aggregators, licensing vs partnering with a PSP, and KYC/AML

### Takeaway
Under Regulation No. 04/18/CEMAC/UMAC/COBAC of 21 December 2018, only licensed credit institutions, microfinance institutions and licensed payment institutions may provide payment services. These include money remittance, executing transfers and issuing e-money. A marketplace that collects customer money and pays it out to artisans would be providing a payment service unless it sits inside a licensed provider's flows. The practical route used across CEMAC is for fintechs to act as aggregators that are "technical or commercial partners" of licensed institutions. Client funds must be ring-fenced in a dedicated bank account. The BEAC also regulates technical standards for authenticating electronic payments, and COBAC adopted an IT-risk regulation in December 2024.

### Cited Findings
- Art. 3 of Regulation 04/18 lists the payment services:
  - cash deposit and withdrawal;
  - execution of debits, card payments and transfers on a bank or payment account or on credit;
  - provision of payment instruments or acquiring of payment orders;
  - money remittance without accounts;
  - issuance and management of e-money. — [Regulation 04/18/CEMAC/UMAC/COBAC (BEAC PDF)](https://www.beac.int/wp-content/uploads/2019/07/REGLEMENT-N-04-18-CEMAC-UMAC-COBAC-du-21-d%C3%A9cembre-2018.pdf)
- Art. 5: only credit institutions, microfinance institutions and payment institutions "agréés ou habilités" may act as payment service providers.
- Art. 6: payment institutions provide exclusively payment and related services, and financial-establishment rules apply to them mutatis mutandis.
- Art. 8: payment institutions do not take deposits, and client funds are not deposits.
- Art. 9: PSPs may not grant credit from e-money or pay interest on e-money.
- Art. 10: limited deferred-debit and purchase credit is allowed (max 100,000 FCFA, 3 months). — [Regulation 04/18](https://www.beac.int/wp-content/uploads/2019/07/REGLEMENT-N-04-18-CEMAC-UMAC-COBAC-du-21-d%C3%A9cembre-2018.pdf)
- Art. 2 definitions:
  - "Distributeur et sous-distributeur": any person offering payment services to customers in the name and on behalf of one or more licensed PSPs (Art. 2(9)).
  - "Partenaire technique": a legal person providing a PSP with the technical services and hardware/software for processing payment operations (Art. 2(14)).
  - "Prestataire de service de paiement": a licensed establishment providing payment services as a regular profession (Art. 2(16)). — [Regulation 04/18](https://www.beac.int/wp-content/uploads/2019/07/REGLEMENT-N-04-18-CEMAC-UMAC-COBAC-du-21-d%C3%A9cembre-2018.pdf)
- Safeguarding rules:
  - Funds received from clients remain the clients' property. They cannot fund operations or credit, are protected from the payment institution's creditors including in insolvency (Art. 52), and must be lodged by the next day in a ring-fenced account at a CEMAC bank (Art. 53).
  - COBAC may also require insurance or a first-demand guarantee (Art. 53).
  - The ring-fenced account agreement must contain minimum clauses (Art. 54).
  - Clients can demand refunds at face value at any time. A distributor's refunds remain the PSP's responsibility (Art. 75). — [Regulation 04/18](https://www.beac.int/wp-content/uploads/2019/07/REGLEMENT-N-04-18-CEMAC-UMAC-COBAC-du-21-d%C3%A9cembre-2018.pdf)
- Revocation of a prior authorisation or non-objection notice ends the right to provide the payment service. It is published in the Official Journal and the press (Arts. 72–73). — [Regulation 04/18](https://www.beac.int/wp-content/uploads/2019/07/REGLEMENT-N-04-18-CEMAC-UMAC-COBAC-du-21-d%C3%A9cembre-2018.pdf)
- BEAC's payment-system texts page lists Regulation 04/18 and Regulation 03/16/CEMAC/UMAC/CM (21 Dec 2016, payment systems, instruments and incidents) as the core regulations. It shows no amendment to 04/18. Later instruments include:
  - Instruction 001/GR/2018 on interoperability;
  - Instruction 001/GR/2021 on the payment-incident register;
  - Decision 013/GR/2022 authorising CAMPOST's national payment-aggregation platform (NPSI);
  - Circular 004/DGE/DSMP/2023 on recovering erroneous transfers;
  - Instruction 001/GR/2025 adopting ISO 20022. — [BEAC payment instructions, circulars and regulations](https://www.beac.int/systemes-paiement/instructions-circulaires-reglements/)
- BEAC's 2024 payment-services report (published April 2026):
  - At end-2024 the CEMAC had 502 payment service providers and more than 56.47 million accounts.
  - Mobile money was 94.34% of transaction volume (3.74 billion transactions).
  - Cameroon accounted for 65.10% of CEMAC transaction volume and 56.95% of value.
  - Fintechs are "generally technical or commercial partners of licensed establishments, acting as payment aggregators."
  - Growth slowed due to new taxes on electronic payments in several CEMAC countries.
  - The BEAC issued 9 prior authorisations and 2 prior information notices for new PSP offers in 2024. — [BEAC, Rapport sur les services de paiement dans la CEMAC 2024](https://www.beac.int/wp-content/uploads/2026/04/RAPPORT-SUR-LES-SERVICES-DE-PAIEMENT-DANS-LA-CEMAC-2024-.pdf)
- The same report notes:
  - BEAC Instruction No. 001/GR/2024 of 22 January 2024 on technical standards for electronic payment instruments, which defines transaction authentication, complaint handling and notifications.
  - COBAC Regulation R-2024/01 (adopted 13 December 2024) on IT risk management in COBAC-supervised institutions, which also covers risks of platforms used to provide payment services.
  - Regulation 04/18 Art. 18 empowers the BEAC to set technical and functional standards and limits on payment accounts and transactions. Arts. 19–20 empower it to oversee the security and availability of technical solutions. — [BEAC 2024 report](https://www.beac.int/wp-content/uploads/2026/04/RAPPORT-SUR-LES-SERVICES-DE-PAIEMENT-DANS-LA-CEMAC-2024-.pdf)
- One phone number can now open payment accounts at several institutions, and account growth (51.3M mobile-money accounts in 2024) overstates unique users. The mobile-money activity rate fell to 35.29%. — [BEAC 2024 report](https://www.beac.int/wp-content/uploads/2026/04/RAPPORT-SUR-LES-SERVICES-DE-PAIEMENT-DANS-LA-CEMAC-2024-.pdf)
- COBAC's regulations page lists, for AML/CFT:
  - Regulation 01/03-CEMAC-UMAC (4 April 2003);
  - COBAC R-2005/01 on AML/CFT due diligence;
  - R-2008/01 on business continuity;
  - R-2016/04 on internal control.
  
  BEAC also reports a 2026 consultation on draft COBAC regulations and a COBAC project to revise its organic texts. — [BEAC COBAC regulations](https://www.beac.int/supervision-bancaire/reglements-de-cobac/); [BEAC homepage](https://www.beac.int/)
- Law 2024/017 Art. 48(2) separately requires prior authorisation for processing personal data in banking transactions. — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)

### Inferences
- **Recommended model: do not hold customer funds.** Integrate a licensed PSP or aggregator, such as an MNO e-money issuer (MTN MoMo / Orange Money) or a bank-backed aggregator, using split or marketplace payouts where the PSP collects from the customer and disburses to the artisan. The platform invoices its commission separately, or the PSP deducts it. The platform then acts as a merchant or "partenaire technique," not a PSP.
- **Escrow carries licensing risk.** Holding funds until job completion ("escrow") is exactly the money-remittance and fund-holding activity Regulation 04/18 reserves for licensed entities. Only offer it if the PSP holds the funds in its ring-fenced account and the platform just sends release instructions. LAWYER: confirm with COBAC/BEAC counsel whether any platform-held balance or wallet triggers a payment-institution licence or distributor status.
- **KYC/AML division of labour:** the PSP performs regulated customer due diligence on payers and payees. The platform should still verify artisans for trust reasons, and should contractually share minimal data with the PSP. A data-sharing agreement plus Art. 48(2) authorisation may be needed.
- **Security expectations:** BEAC Instruction 001/GR/2024 and COBAC R-2024/01 bind the PSP partner. Expect contractual flow-down of authentication, incident and IT-risk requirements to the platform's integration (webhook security, credential storage, logging).

### Gaps
- The CEMAC AML/CFT Regulation No. 01/CEMAC/UMAC/CM of 11 April 2016 named in the brief could not be verified. BEAC's COBAC page lists only the 2003 regulation, and GABAC's site was unreachable. Its threshold amounts, beneficial-ownership rules and whether marketplaces are "reporting entities" are unverified.
- Cameroon's FATF grey-list status as of 2026 could not be checked (FATF site blocked).
- Minimum capital and licensing procedure for a payment institution under Regulation 04/18 (later articles not read) are unverified.
- BEAC Instruction 001/GR/2024 itself was not read, so specific authentication requirements (e.g. strong customer authentication thresholds) are unknown.
- Names and terms of specific licensed aggregators operating in Cameroon were not researched in this scope.

---

## 4. Business registration, start-up law, taxes (digital services, VAT on commissions, withholding), worker classification and labour code

### Takeaway
Company formation follows OHADA company law. Cameroon is one of OHADA's 17 member states, and SARL/SAS forms are available, with registration through the one-stop CFCE. The research could not verify a Cameroon "start-up law," current VAT and withholding rates, or labour-code tests for independent contractors in this run. These must go to a local accountant and lawyer. The one verified tax signal is that several CEMAC states introduced taxes on electronic and mobile payments, which slowed payment growth.

### Cited Findings
- Cameroon is one of the 17 OHADA member states, and OHADA's validated Uniform Acts include one on commercial companies and economic interest groups. — [Wikipedia: OHADA](https://en.wikipedia.org/wiki/OHADA)
- Several CEMAC countries introduced taxes on payments in scriptural money (including mobile money), which slowed growth. The BEAC held consultations with states on taxing mobile financial services. — [BEAC 2024 payment-services report](https://www.beac.int/wp-content/uploads/2026/04/RAPPORT-SUR-LES-SERVICES-DE-PAIEMENT-DANS-LA-CEMAC-2024-.pdf)
- Chambers' 2026 Cameroon guide excerpt covered data protection and land law (including the 2026 Finance Law on land forfeiture) but contained no company, tax or employment details in the retrievable excerpt. — [Chambers Doing Business In 2026: Cameroon](https://gpg-pdf.chambers.com/Doing-Business-In-2026/151/)
- Securys notes that consent-only data processing creates "consent fatigue" in employment relationships. Employers may need PDPA guidance on whether employment contracts can stand in for consent. This affects staff and possibly onboarded artisans. — [Securys](https://www.securys.co.uk/blog/next-stop-cameroon)

### Inferences
- **Entity choice:** a SAS (flexible share classes for investor rounds) or SARL registered at CFCE is the norm. Foreign-investor holdcos often sit offshore with a Cameroonian operating subsidiary that is the data controller and contracts with the PSP. LAWYER/ACCOUNTANT.
- **Artisans as independent contractors:** to preserve independent status, terms should avoid the hallmarks of subordination:
  - no mandatory schedules, exclusivity or uniforms;
  - artisans set prices or accept and decline freely;
  - no disciplinary sanctions beyond trust/safety delisting;
  - commissions are platform fees, not wages.
  
  Platform "quality controls" (ratings, suspensions) can be cited as control in misclassification disputes, so document them as safety and marketplace-integrity rules. LAWYER: Labour Code (Law 92/007 of 14 August 1992) definition of "travailleur" and CNPS social-security implications.
- **VAT and withholding:** the platform's commission is a taxable service. If the platform invoices the customer for the full job, it may be liable for VAT on the whole amount, so a pure agency (commission-only) model is preferable. Withholding duties may apply to payments to unregistered informal artisans. ACCOUNTANT.

### Gaps
- No verified source on: a Cameroonian start-up law or start-up label (2024–2026); CFCE online procedures, costs and timelines (cfce.cm unreachable); current VAT rate including the communal surcharge; corporate income tax and minimum tax; withholding rates; any digital-services tax or VAT on non-resident digital services (PwC tax-summary URLs returned 404); the Labour Code's worker definition (ILO NATLEX and droit-afrique blocked).
- The ILO platform-economy standard-setting outcome (2025–2026 International Labour Conference) could not be retrieved (connection reset).

---

## 5. Informal-worker safety: insurance, liability when a matched artisan causes damage or injury, and terms of service

### Takeaway
No Cameroon-specific sources on marketplace liability or micro-insurance were retrievable in this run. The legal levers that are verifiable are:
- **Consumer and civil liability:** Law 2024/017 adds civil claims and joint controller/processor liability for publishing data without consent (Art. 23(3)).
- **Payment-safeguarding rules:** these let a PSP partner hold disputed funds.

Product design and contracts must carry most of the risk allocation.

### Cited Findings
- Under Art. 62 of Law 2024/017, data subjects can seek urgent court orders (with penalties) and damages for serious infringements. Under Art. 23(3), controller and processor are jointly liable for any publication of personal data without consent. — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)
- Under Regulation 04/18, PSP-held client funds remain client property and are refundable at face value. COBAC can require insurance or a bank guarantee covering client funds (Arts. 52–53, 75). — [Regulation 04/18](https://www.beac.int/wp-content/uploads/2019/07/REGLEMENT-N-04-18-CEMAC-UMAC-COBAC-du-21-d%C3%A9cembre-2018.pdf)

### Inferences
- **Terms of service:**
  - State clearly that the platform is an intermediary and that the artisan contracts directly with the customer.
  - Include artisan warranties (competence, licences where trades require them, compliance with safety norms) and an indemnity from artisans.
  - Limit platform liability to the extent Cameroonian consumer law allows. Total exclusions are likely unenforceable against consumers.
  - Provide a dispute-resolution process with evidence (photos, chat logs) and a payment hold via the PSP.
- **Insurance options to price with CIMA-licensed insurers (LAWYER/broker):**
  - platform professional and general liability;
  - group personal-accident cover for artisans, optionally embedded per job;
  - a "job guarantee" fund funded by a small fee.
- **Verification as risk control:** ID check, references, and trade certification where available. Record a verification level badge rather than a binary "verified."

### Gaps
- Not verified: Cameroonian/OHADA civil-liability rules for intermediaries, consumer-law liability for platforms (Law 2011/012), CIMA insurance-code rules on embedded or micro-insurance, and existing micro-insurance products for informal workers in Cameroon.

---

## 6. AWS security architecture: Organizations/Control Tower, IAM, Cognito phone OTP and SMS costs, KMS, Secrets Manager, WAF, Shield, GuardDuty, Security Hub, Macie, CloudTrail, Config, VPC, Inspector, shared responsibility, compliance programs, data residency

### Takeaway
There is no AWS Region in Cameroon (the only African Region is in South Africa). Any AWS hosting is therefore a cross-border transfer requiring APDP prior authorisation under Art. 32. Unauthorised transfers carry administrative fines of 10–50M FCFA (Art. 60) and criminal exposure of 3–10 years (Art. 69). Technically, a small multi-account landing zone (Control Tower) with centralised logging and the native detective stack is achievable for a startup. Cognito supports phone-number passwordless SMS OTP, but SMS OTP is a "restricted" authenticator per NIST and is vulnerable to SIM swap and SS7 attacks. It is also exposed to SMS-pumping cost abuse, which requires WAF rate limits.

### Cited Findings

**Data residency and transfers**
- The AWS Cloud spans 124 Availability Zones in 39 Regions, with an African Region in South Africa. The regions page lists no announced Region elsewhere in Africa. — [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/)
- Customers choose the Region(s) where content is stored, and AWS does not move content outside those Regions without agreement (except as needed to provide services the customer starts, or for legal compliance). Content is encrypted in transit and at rest, customers can manage keys in KMS, and AWS redirects or challenges government requests and publishes a transparency report. — [AWS Data Privacy FAQ](https://aws.amazon.com/compliance/data-privacy-faq/)
- Art. 32 of Law 2024/017 makes transfer to a foreign state subject to APDP prior authorisation. Before granting it, the APDP must check four things:
  - an adequate level of protection in the destination country;
  - a legal instrument with that country;
  - binding security rules on the importer;
  - standard contractual clauses published by the APDP. — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)
- The draft decree's adequacy criteria require at minimum a specific data-protection law and an operational DPA. — [MINPOSTEL draft decree](https://www.minpostel.gov.cm/images/Documentation/patnuc/textes_preparation_pour_consultation_publique/protection_data/230518%20Decret_APD%20FIN%20_CLEAN.pdf)
- Cloud hosting, overseas support, backups and remote administration all move data abroad, so a transfer inventory must cover all of them. — [Blacktree](https://blacktree.nl/2026/06/23/cameroon-data-protection-law-grace-period-ended/)
- AWS compliance programs include ISO 27001, 27017, 27018 and 27701, SOC 1/2/3, PCI DSS, CSA STAR, and a "South Africa Data Privacy" program. — [AWS Compliance Programs](https://aws.amazon.com/compliance/programs/)

**Shared responsibility**
- AWS secures the cloud: hardware, software, networking and facilities. The customer secures what runs in the cloud:
  - for EC2: guest OS, applications and security groups;
  - for managed services such as S3 or DynamoDB: data, encryption and IAM permissions.
  
  Patch and configuration management and training are shared controls. — [AWS Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/)

**Multi-account governance**
- AWS Control Tower orchestrates Organizations, Service Catalog and IAM Identity Center to build a landing zone in under an hour. It offers preventive, detective and proactive controls (guardrails), Account Factory and drift detection. — [AWS Control Tower](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html)
- Service control policies set maximum permissions and grant none. They apply to member accounts (including root users) but not to the management account or service-linked roles. AWS advises testing them in a separate OU before attaching at the root. — [AWS Organizations SCPs](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)
- The AWS Security Reference Architecture uses these accounts: Org Management; a Security OU containing Security Tooling and Log Archive accounts; an Infrastructure OU containing Network and Shared Services accounts; and a Workloads OU containing Application accounts. AWS notes not every workload needs every service, and choices should be risk-based. — [AWS Security Reference Architecture](https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/architecture.html)

**Detection and posture**
- GuardDuty:
  - analyses CloudTrail management events, VPC flow logs and DNS logs by default;
  - Extended Threat Detection (multi-stage attack sequences) is included at no extra cost;
  - optional protection plans cover S3, EKS, Runtime Monitoring, Malware Protection (EC2, S3, AWS Backup), RDS login activity, Lambda and AI workloads;
  - multi-account management works via Organizations;
  - there is a 30-day free trial. — [Amazon GuardDuty](https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html)
- Security Hub CSPM checks accounts against AWS Foundational Security Best Practices, CIS, PCI DSS and NIST. It aggregates GuardDuty, Inspector and Macie findings, and needs AWS Config recording for most controls. Full CIS compliance requires enabling it in all Regions. There is a 30-day trial. — [AWS Security Hub CSPM](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html)
- Macie discovers sensitive data in S3 using managed and custom (regex) data identifiers. It flags public or shared buckets and publishes to EventBridge and Security Hub. — [Amazon Macie](https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html)
- Inspector continuously scans EC2, ECR container images and Lambda for CVEs and network exposure, with an environment-adjusted risk score. It supports delegated administration across an organisation. — [Amazon Inspector](https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html)

**Encryption**
- KMS keys are protected by FIPS 140-3 Security Level 3 validated HSMs and never leave KMS unencrypted. Key policies control access. — [AWS KMS](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html)

**Edge protection**
- AWS WAF rate-based rules count requests per aggregation key over an evaluation window and rate-limit them. Custom aggregation keys and scope-down statements (e.g. a specific login or OTP path) are supported. Bot Control's targeted level is a paid alternative. — [AWS WAF rate-based rules](https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based.html)

**Authentication (Cognito, phone OTP)**
- Cognito user pools support passwordless sign-in with SMS or email one-time passwords through the choice-based USER_AUTH flow. Entering the code also marks the phone number verified.
- OTP first-factor flows are incompatible with required MFA.
- Passkeys (WebAuthn) are also supported and can satisfy MFA when FactorConfiguration is MULTI_FACTOR_WITH_USER_VERIFICATION. — [Amazon Cognito authentication flows](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow-methods.html)
- Cognito threat protection (Plus feature plan):
  - compromised-credential detection, which does not apply to passwordless flows;
  - adaptive authentication risk scoring with MFA, block or notify actions;
  - IP allow and block lists and log export;
  - AWS recommends running two weeks in audit mode first;
  - it "doesn't apply rate limits", so AWS WAF web ACLs should be attached to the user pool for volumetric attacks. — [Cognito threat protection](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-settings-threat-protection.html)
- AWS End User Messaging SMS pricing is pay-as-you-go by destination country, published in a per-country CSV. SMS Protect costs $0.01 per message in monitor or filter mode, and sending numbers carry their own fees. A Cameroon SMS rate is not shown on the page; the Cameroon figures there ($0.300/min outbound, $0.974/min mobile) are voice rates. — [AWS End User Messaging pricing](https://aws.amazon.com/end-user-messaging/pricing/)

**Testing**
- Customers may pen-test their own resources on many services without approval, including EC2, RDS, Aurora, CloudFront, API Gateway, Lambda, ECS/Fargate and ELB. DoS/DDoS, request flooding (including login and API floods), DNS zone walking and subdomain takeover are prohibited. Red-team and phishing simulations need the Simulated Events form at least 2 weeks ahead, and AWS-tool vulnerabilities must be reported within 24 hours. — [AWS Penetration Testing policy](https://aws.amazon.com/security/penetration-testing/)

### Inferences

**Blueprint for a seed-stage team**

1. **Accounts.** Control Tower landing zone with: management (billing only); Security Tooling (delegated admin for GuardDuty, Security Hub CSPM, Inspector, Macie, IAM Access Analyzer); Log Archive (organisation CloudTrail with S3 Object Lock, and Config aggregator); and prod / staging / dev workload accounts. Use IAM Identity Center with phishing-resistant MFA (passkeys or security keys) for staff. Do not use IAM users.
2. **SCPs:**
   - deny Regions outside the chosen hosting Region and a DR Region. This also produces an auditable record of where data goes, which helps the Art. 32 transfer authorisation file;
   - deny disabling CloudTrail, Config or GuardDuty;
   - deny leaving the organisation;
   - deny creating access keys for root.
3. **Region choice.** af-south-1 (Cape Town) keeps data on the continent and gives lower latency than the EU. South Africa has POPIA and an operational regulator, which suits the draft decree's adequacy criteria. EU Regions offer GDPR adequacy logic and more services. Either way, document a transfer impact assessment. LAWYER: whether South Africa or EU destinations will appear on the APDP adequacy list.
4. **Data-tiering mitigation.** Keep the most sensitive artifacts (ID document images, selfies or biometric templates, exact home GPS) minimised: tokenised, encrypted with dedicated customer-managed KMS keys per data class, auto-deleted after verification. Evaluate a Cameroon-hosted store for these items if the APDP later insists on localisation. Not verified that any AWS edge or Local Zone exists in Cameroon.
5. **Network.** VPC with private subnets for app and database, no public database, VPC endpoints for S3, KMS and Secrets Manager, and egress via NAT with firewall logging. Put ALB or API Gateway behind CloudFront with AWS WAF (managed rule groups plus rate-based rules on /auth, /otp, /search, /booking) and Shield Standard. Shield Advanced is optional later.
6. **Secrets.** Use Secrets Manager with rotation for database and PSP API keys. Never put secrets in Lambda environment variables unencrypted.
7. **Logging and retention.** Keep CloudTrail, VPC Flow Logs, WAF logs and Cognito threat-protection logs in Log Archive. Set retention per the Law 2010/021 transaction-retention rule and the minimisation policy.
8. **Cognito OTP hardening:**
   - enable country allow-listing so SMS goes only to +237 and other launch markets;
   - add WAF rate limits per IP and per phone number (via custom keys);
   - enforce application-level resend cooldowns;
   - turn on SMS Protect;
   - set CloudWatch and Budgets alarms on SMS spend;
   - offer passkeys as an upgrade for smartphone users.

### Gaps
- Exact SMS price per message to Cameroon on AWS was not obtained (requires the AWS CSV download).
- Cognito feature-plan pricing (Essentials vs Plus) and whether passwordless requires Essentials were not verified.
- No verification of AWS Local Zones, Outposts availability or local cloud alternatives in Cameroon.
- The AWS Data Processing Addendum / GDPR DPA was not fetched.

---

## 7. Application security: OWASP Top 10 (2025), OWASP API Top 10 (2023), OWASP Mobile Top 10, Python tooling, FastAPI/Django, rate limiting, USSD/SMS risks (SIM swap, OTP interception, SS7), WhatsApp API security, webhook signatures

### Takeaway
Map the build against three OWASP lists:
- **OWASP Top 10:2025:** broken access control remains #1; software supply-chain failures and mishandling of exceptional conditions are new.
- **OWASP API Security Top 10 (2023):** BOLA, i.e. artisans or customers accessing others' bookings, is the dominant marketplace risk.
- **OWASP Mobile Top 10 (2024).**

In Python, run pip-audit and Bandit in CI, harden Django or FastAPI configs, and verify every inbound webhook: the PSP's, and Meta's via the X-Hub-Signature-256 header (plus optional mTLS). Treat SMS OTP as weak (NIST "restricted"): add SIM-swap signals, 10-minute expiry, attempt limits, and step-up for payouts.

### Cited Findings
- **OWASP Top 10:2025:**
  - A01 Broken Access Control
  - A02 Security Misconfiguration
  - A03 Software Supply Chain Failures
  - A04 Cryptographic Failures
  - A05 Injection
  - A06 Insecure Design
  - A07 Authentication Failures
  - A08 Software or Data Integrity Failures
  - A09 Security Logging and Alerting Failures
  - A10 Mishandling of Exceptional Conditions
  
  Source: [OWASP Top 10:2025](https://top10.owasp.org/2025)
- **OWASP API Security Top 10 2023:**
  - API1 Broken Object Level Authorization
  - API2 Broken Authentication
  - API3 Broken Object Property Level Authorization
  - API4 Unrestricted Resource Consumption (including paid per-request services such as SMS)
  - API5 Broken Function Level Authorization
  - API6 Unrestricted Access to Sensitive Business Flows
  - API7 SSRF
  - API8 Security Misconfiguration
  - API9 Improper Inventory Management
  - API10 Unsafe Consumption of APIs
  
  Source: [OWASP API Security Top 10 2023](https://api-security.owasp.org/editions/2023/en/0x11-t10)
- **OWASP Mobile Top 10 2024 (final):**
  - M1 Improper Credential Usage
  - M2 Inadequate Supply Chain Security
  - M3 Insecure Authentication/Authorization
  - M4 Insufficient Input/Output Validation
  - M5 Insecure Communication
  - M6 Inadequate Privacy Controls
  - M7 Insufficient Binary Protections
  - M8 Security Misconfiguration
  - M9 Insecure Data Storage
  - M10 Insufficient Cryptography
  
  Source: [OWASP Mobile Top 10 2024](https://owasp.github.io/www-project-mobile-top-10/2023-risks)
- **NIST SP 800-63B-4 on phone-based authentication:**
  - PSTN (SMS or voice) out-of-band authentication is "restricted." Changing a registered phone number counts as binding a new authenticator, and verifiers must offer alternatives.
  - Verifiers should consider "device swap, SIM change, number porting" risk indicators.
  - Out-of-band codes expire after 10 minutes, are single use, and require rate limiting.
  - Consecutive failures are capped at 100, and generating a new secret does not reset the count.
  - Manually entered OTPs are not phishing-resistant, and AAL2 verifiers must offer a phishing-resistant option. — [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html)
- **OWASP MFA Cheat Sheet:**
  - SMS and voice OTP face SS7 interception, SIM-swap and number-porting attacks.
  - Do not use SMS for applications handling PII or financial risk. If it is the only factor, document risk acceptance, enforce per-account rate limits, monitor SIM-swap signals and plan migration.
  - Watch for cost abuse via mass OTP triggering.
  - Prefer TOTP or passkeys, and use number matching for push. — [OWASP MFA Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html)
- **Meta (WhatsApp) webhooks:**
  - Setup uses a GET handshake with hub.verify_token and hub.challenge.
  - Each POST carries X-Hub-Signature-256 ("sha256=...") computed over the payload with the App Secret. Meta says "You don't have to validate the payload, but you should."
  - Deliveries are retried for 36 hours, so handlers must be idempotent.
  - mTLS is available for WhatsApp Business Account subscriptions using Meta's outbound CA (meta-outbound-api-ca-2025-12.pem; the old DigiCert cert expired 15 April 2026). Verify CN client.webhooks.fbclientcerts.com, including via an ALB trust store. — [Meta Webhooks: Getting Started](https://developers.facebook.com/docs/graph-api/webhooks/getting-started)
- **WhatsApp Business Messaging Policy:**
  - opt-in is required, and block or stop requests must be honoured;
  - only approved templates may be sent outside the 24-hour window;
  - businesses must not request or share full payment card numbers, bank account numbers or national ID numbers;
  - data obtained from WhatsApp may only be used as needed to message that person;
  - a prompt human escalation path is required alongside automation;
  - Meta may restrict or ban accounts. — [WhatsApp Business Messaging Policy](https://whatsappbusiness.com/fr/policy/)
- **pip-audit:** a PyPA project, partly maintained by Trail of Bits with Google support. Latest version 2.10.1 (10 June 2026). It uses the PyPI advisory DB (OSV optional), supports `-r requirements.txt`, `--locked` for pyproject/pylock files and `--require-hashes`, and has an official GitHub Action and pre-commit hook. Exit code 1 means vulnerabilities were found. — [pip-audit on PyPI](https://pypi.org/project/pip-audit/)
- **Bandit:** finds common security issues in Python by building an AST and running plugins on it. It is hosted under PyCQA and licensed Apache 2.0. — [Bandit docs](https://bandit.readthedocs.io/en/latest/)
- **Django 6.1 deployment checklist:**
  - run `manage.py check --deploy`;
  - never use runserver or DEBUG in production;
  - keep SECRET_KEY in env or a file and rotate it via SECRET_KEY_FALLBACKS;
  - set ALLOWED_HOSTS and reject unknown hosts at nginx;
  - enforce HTTPS and set CSRF_COOKIE_SECURE and SESSION_COOKIE_SECURE;
  - restrict database and cache access to app servers;
  - treat uploads as untrusted and never executable. — [Django deployment checklist](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/)
- **FastAPI:** supports OAuth2, OpenID Connect, apiKey and HTTP schemes via `fastapi.security` and dependencies. OAuth2 does not define encryption, so serve over HTTPS. — [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)

### Inferences

**Python application-security checklist**

1. **Authorisation (A01 / API1 / API3 / API5)**
   - Enforce object-level checks in a single policy layer: booking.customer_id or artisan_id must equal the caller.
   - Use non-sequential IDs (UUIDv7 or ULID).
   - Serialise only role-appropriate fields: artisans never see a customer's full phone or address before acceptance.
   - Write tests for horizontal and vertical privilege escalation.
2. **Supply chain (A03 / M2)**
   - Pin and hash dependencies (uv lockfile).
   - Run pip-audit and Bandit in CI with a hard fail.
   - Add Dependabot or Renovate, generate an SBOM, and scan container images with ECR/Inspector.
   - Use a minimal base image and sign artifacts.
3. **Authentication (A07 / API2)**
   - Cognito SMS OTP: 6-digit code, 10-minute expiry, single use, at most 5 tries per code, and per-number and per-IP throttles.
   - Re-verify identity on phone-number change.
   - Use SIM-swap or number-change signals from the MNO or aggregator API where available (not verified for Cameroonian MNOs).
   - Require step-up (passkey, or OTP plus PIN) for payout-destination changes. This is the main SIM-swap fraud target.
4. **Resource consumption and business flows (API4 / API6)**
   - WAF rate-based rules plus application-level limits (e.g. a Redis token bucket) on OTP send, search, contact reveal and booking creation.
   - Cap contact reveals per day to stop scraping of artisan phone numbers.
5. **Webhooks (A08 / API10)**
   - Verify HMAC signatures (Meta X-Hub-Signature-256; PSP equivalents) with constant-time comparison over the raw body.
   - Reject stale timestamps and enforce idempotency keys.
   - Allow-list source IPs or use mTLS where offered.
   - Never trust callback payment status without a server-to-server status query to the PSP.
6. **Configuration (A02 / API8 / M8)**
   - Run Django `check --deploy`; disable FastAPI `/docs` in production or put it behind auth.
   - Set strict CORS, security headers (HSTS, CSP) and secrets from Secrets Manager.
7. **Errors and logging (A09 / A10)**
   - Fail closed on exceptions in auth and payment paths.
   - Use structured logs without PII or OTPs.
   - Send alerts to on-call (GuardDuty and Security Hub findings via EventBridge to Slack or SMS).
8. **USSD/SMS channel**
   - USSD sessions are unencrypted at the application layer and tied to the MSISDN.
   - Never show full personal data or allow payout changes over USSD.
   - Use a PIN for sensitive USSD actions.
   - Treat the MSISDN from the aggregator as identity only if the aggregator connection is mutually authenticated.
9. **WhatsApp bot**
   - Never request ID numbers, card or bank numbers in chat (policy).
   - Use a WhatsApp Flow or secure web link for KYC uploads.
   - Provide human escalation.
   - Store chat content only as needed. Meta's policy and Law 2024/017 purpose limitation align here.
10. **Mobile (M6 / M9)**
    - Keep tokens in Keystore or Keychain, not plaintext storage.
    - Request approximate location by default (see Section 8).
    - Use certificate pinning cautiously.
    - Add obfuscation and root detection for the payout flows.

### Gaps
- No Cameroon-specific data was found on SIM-swap fraud prevalence, MNO SIM-swap check APIs (e.g. GSMA Open Gateway / CAMARA availability on MTN or Orange Cameroon), or SS7 exposure of Cameroonian networks. The ENISA signalling-security report fetch failed (HTTP 429).
- Snyk and Safety were not researched (only pip-audit and Bandit were verified).

---

## 8. Privacy by design for low-literacy users: voice consent, data minimisation, location privacy, protecting women users and artisans from harassment

### Takeaway
Law 2024/017's consent standard (prior, free, informed, specific, unambiguous; parental consent under 18) and Art. 24(3) privacy-by-design duty require consent that low-literacy users actually understand. That means voice and local-language explanations with recorded, granular acceptance. Location is the most dangerous data element: artisans often work from home, and customers expose their homes. Default to approximate location, reveal exact addresses only after a confirmed booking, and use number masking. This design directly reduces technology-facilitated gender-based violence (stalking, doxxing). Profiling and sensitive-data rules (Arts. 48, 65, 66) also push toward minimal, transparent scoring.

### Cited Findings
- Consent must be "préalable, libre, éclairé, spécifique et univoque" (Art. 9(1)). Minors under 18 need parental or legal-representative consent (Art. 9(3)).
- Controllers must implement measures from the APDP référentiel "at the time of determining the means of processing and at the time of processing itself" (Art. 24(3)).
- Disclosing personal data in a way that harms dignity or privacy to an unauthorised third party is a crime (Art. 68). — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)
- Consent mechanisms should be clear, accessible, informed, specific and voluntary, with consent records and simple withdrawal. — [Techhive Advisory](https://techhiveadvisory.africa/insights/operationalising-cameroons-data-protection-law-a-review-of-key-provisions-and-impacts)
- Pre-ticked boxes and implied consent through continued browsing are not valid. Non-essential cookies need prior consent. — [Kukie.io](https://kukie.io/blog/cookie-consent-cameroon-data-protection)
- Pre-ticked boxes and unreadable terms are disallowed, and consent must be revocable at any time. — [Droit Médias Finance](https://droitmediasfinance.com/index.php/actualites/droit-tech-fintech/1297-cameroun-la-loi-sur-la-protection-des-donnees-a-caractere-personnel-entre-en-vigueur-ce-23-juin-2026)
- **Technology-facilitated GBV (UN Women):**
  - Forms include doxxing, stalking and location tracking via GPS and location-based apps, image-based abuse, deepfakes and impersonation.
  - Prevalence estimates run from 16–58% of women, including 28% in five Sub-Saharan African countries.
  - Tech companies are urged to adopt "safety by design," transparency and accountability, and to involve women in design. — [UN Women: Technology-facilitated GBV FAQ](https://www.unwomen.org/en/what-we-do/ending-violence-against-women/faqs/tech-facilitated-gender-based-violence)
- Deepfakes are being used in Cameroon to damage reputations, and covert recording is common. — [Global Center on AI Governance](https://www.globalcenter.ai/research/data-privacy-and-responsible-ai-adoption-in-cameroon)
- **Android location accuracy:**
  - Approximate location is accurate to about 3 km²; precise location is usually within about 50 m.
  - Apps should work with approximate only and request a precise upgrade just for features that need it.
  - Background location requires ACCESS_BACKGROUND_LOCATION and is restricted by Google Play policy.
  - Session-based features targeting Android 17+ must use the location button. — [Android Developers: location permissions](https://developer.android.com/develop/sensors-and-location/location/permissions)
- **OWASP Mobile M6** (Inadequate Privacy Controls) is a top-10 mobile risk. — [OWASP Mobile Top 10 2024](https://owasp.github.io/www-project-mobile-top-10/2023-risks)

### Inferences

**Privacy-by-design patterns**

1. **Voice and layered consent**
   - Offer a 30–60 second audio or IVR explanation in French, English, Cameroonian Pidgin and major local languages, with icon-based screens.
   - Record each consent separately (service, location, profile publication, ratings/scoring, marketing) with timestamp, channel, language, the audio-script version hash and the user's keypress or tap.
   - Re-prompt when purposes change.
   - Use agent-assisted onboarding for artisans, with the agent ID logged.
   - For under-18 apprentices, require parental consent or exclude them.
2. **Minimisation**
   - Collect name, phone, trade, service area (district or quarter), and ID verification status rather than retaining the ID image.
   - Do not collect ethnicity, region of origin, religion or language as profile attributes (Art. 48).
   - Set short retention for chats and call recordings.
3. **Location privacy**
   - Show artisans on the map at grid-snapped or "neighbourhood" granularity, never their home pin.
   - Reveal the customer's exact address only after the artisan accepts, and expire it after job completion.
   - Avoid continuous background tracking. If live "on my way" tracking is offered, make it time-boxed, foreground-only and opt-in.
   - Strip EXIF GPS from uploaded photos of work.
4. **Anti-harassment controls (women users and artisans)**
   - Use masked phone numbers or in-app calling so personal numbers are never exposed.
   - Offer an optional "same-gender artisan preference" filter. LAWYER: check against anti-discrimination rules.
   - Provide a panic or SOS button and "share trip" with a trusted contact.
   - Allow blocking and reporting, with fast suspension on credible harassment reports and two-way ratings.
   - Run ID verification for artisans and phone verification for customers.
   - Train content moderators and keep an incident log.
   - Restrict profile photos to the user's own choice. Detect and remove image-based abuse quickly.
5. **Transparency of scoring**
   - Explain in plain voice and text what affects a trust badge.
   - Allow contestation with a human review (Art. 44).

### Gaps
- No Cameroon-specific study was found on low-literacy digital-consent comprehension, voice-consent legal validity (whether an audio record counts as "univoque" consent evidence), or gender-based harassment on local gig or marketplace apps. Privacy International and CIPESA materials could not be searched.
- Whether a gender-preference filter is lawful under Cameroonian anti-discrimination rules has not been verified.

---

## 9. Incident response, penetration testing, bug bounty for startups, and later-stage certifications (ISO 27001, SOC 2)

### Takeaway
Base the incident-response plan on NIST SP 800-61 Rev. 3 (April 2025, a CSF 2.0 Community Profile). Wire it to Law 2024/017 Art. 22's "without delay" notification to the APDP and data subjects, and to PSP partner notification clauses. Start with a vulnerability disclosure policy (security.txt per RFC 9116, safe harbour). Move to a paid bug bounty only once triage is mature. Pen-test within AWS policy limits. For scale, AWS's own ISO 27001/27017/27018/27701 and SOC 2 attestations can be inherited for physical controls. The startup would pursue SOC 2 (CPA-issued) or ISO 27001 when enterprise or PSP partners demand it.

### Cited Findings
- NIST SP 800-61 Rev. 3 (final 3 April 2025) supersedes Rev. 2 (2012). It is framed as a CSF 2.0 Community Profile to help organisations prepare for incidents, reduce their number and impact, and improve detection, response and recovery. — [NIST SP 800-61r3](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- The NIST CSF 2.0 resource centre notes "two years of CSF 2.0" (February 2026), which implies a February 2024 release, and links Quick Start Guides. — [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- RFC 9116 (April 2022) specifies `/.well-known/security.txt` with mandatory Contact and Expires fields (Expires recommended under a year ahead), optional Policy, Encryption and Acknowledgments fields, and OpenPGP signing. — [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116)
- **OWASP Vulnerability Disclosure Cheat Sheet:**
  - A VDP needs a clear reporting channel, response timelines, no legal threats against good-faith researchers, safe-harbour terms (see disclose.io, with legal advice) and advisories.
  - Bug bounties are costly and "should only be used by organizations that already have a mature vulnerability disclosure process."
  - Platforms include Bugcrowd, HackerOne, huntr, Open Bug Bounty and Standoff. Managed triage is available for a fee. — [OWASP Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
- **AWS pen-testing policy:** permitted services, prohibited DoS and request floods, and the Simulated Events form (2 weeks' notice). — [AWS Penetration Testing](https://aws.amazon.com/security/penetration-testing/)
- **SOC 2:** CPAs provide SOC engagements under AICPA standards. The trust services categories are security, availability, processing integrity, confidentiality and privacy. — [AICPA-CIMA SOC 2](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2)
- **AWS certifications:** AWS holds ISO 27001, 27017, 27018 and 27701 and SOC 1/2/3, and SOC 2 Type II reports are downloadable via AWS Artifact. — [AWS Compliance Programs](https://aws.amazon.com/compliance/programs/); [AWS Data Privacy FAQ](https://aws.amazon.com/compliance/data-privacy-faq/)
- **Law 2024/017 certification:** the law foresees an APDP certification mechanism (Art. 34). Operating "without certification provided by this law" is fined 5–15M FCFA (Art. 59). — [Law 2024/017](https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf)

### Inferences

**Incident response runbook**

1. **Severity matrix.** Any personal-data breach triggers the Art. 22 track.
2. **Roles.** Incident commander, technical lead, legal/DPO (even though not mandatory, appoint a privacy lead), and communications.
3. **Detection sources.** GuardDuty, Security Hub, WAF, Cognito risk events, PSP alerts, user reports and the VDP.
4. **Containment playbooks:**
   - leaked keys: rotate via Secrets Manager;
   - account takeover or SIM swap: freeze payouts and force re-verification;
   - S3 exposure: Macie finding, then Block Public Access;
   - ransomware: note that Art. 63 doubles penalties for attackers, and file a police complaint.
5. **Notification:**
   - the APDP, once it exists, otherwise document the attempt and notify MINPOSTEL;
   - data subjects via SMS or voice in their language;
   - the PSP within contractual SLAs;
   - consider ANTIC/CIRT reporting. LAWYER: confirm any mandatory ANTIC incident reporting under Law 2010/012.
6. **Post-incident.** Run a review and keep an evidence log for APDP inspections. The draft decree foresees on-site and online controls, with the prosecutor notified 24 hours in advance.

**Maturity roadmap**
- **Months 0–6:** VDP with security.txt, CIS/FSBP baselines in Security Hub, and an annual external pen test of the API and mobile apps.
- **Months 6–18:** private bug bounty with managed triage, tabletop exercises, and ISO 27001-aligned ISMS documentation.
- **18 months onward:** SOC 2 Type II or ISO 27001 certification when bank, PSP or enterprise partners require it.
- **Track the APDP certification mechanism (Art. 34/59).** It may become a local requirement.

### Gaps
- ISO's ISO/IEC 27001 page was blocked (403), so the 2022 edition details, Annex A control count and transition deadline were not verified from ISO.
- No Cameroonian national CIRT reporting obligation or contact (ANTIC CIRT) was verified.
- No data was found on bug bounty platform availability or payouts for Cameroonian researchers, or on local pen-testing firms.

---

## Numbered source list

1. Law No. 2024/017 of 23 Dec 2024 (certified true copy, Presidency of the Republic), hosted PDF — https://blog.africadataprotection.org/wp-content/uploads/2025/07/Loi_Cameroun_024-017.pdf
2. Presidency of the Republic (prc.cm), Law No. 2024/017 listing — https://prc.cm/en/multimedia/documents/10271-law-n-2024-017-of-23-12-2024-web
3. DLA Piper, Data Protection Laws of the World: Cameroon — https://www.dlapiperdataprotection.com/index.html?c=CM&t=law
4. DLA Piper, Cameroon guide PDF — https://www.dlapiperdataprotection.com/guide.pdf?c=CM
5. LEX Africa, Cameroon data protection law compliance (Oct 2025) — https://lexafrica.com/2025/10/cameroon-data-protection-law-compliance/
6. Techhive Advisory, Operationalising Cameroon's data protection law — https://techhiveadvisory.africa/insights/operationalising-cameroons-data-protection-law-a-review-of-key-provisions-and-impacts
7. Blacktree, Cameroon's new privacy law is past its grace period (23 Jun 2026) — https://blacktree.nl/2026/06/23/cameroon-data-protection-law-grace-period-ended/
8. Droit Médias Finance, La loi ... entre en vigueur ce 23 juin 2026 — https://droitmediasfinance.com/index.php/actualites/droit-tech-fintech/1297-cameroun-la-loi-sur-la-protection-des-donnees-a-caractere-personnel-entre-en-vigueur-ce-23-juin-2026
9. CIO Mag, La protection des données ... à la lecture de la loi du 23 décembre 2024 — https://cio-mag.com/?p=59861
10. CIO Mag, Protection des données au Cameroun: la course contre la montre avant juin 2026 — https://cio-mag.com/protection-des-donnees-au-cameroun-la-course-contre-la-montre-avant-juin-2026/
11. Digital Business Africa, L'Autorité de protection des données ... créée (24 Dec 2024) — https://www.digitalbusiness.africa/cameroun-lautorite-de-protection-des-donnees-a-caractere-personnel-creee/
12. Africa Data Protection, Cameroon country page — https://www.africadataprotection.org/en/pays/cameroun.html
13. PACMap, Law No. 2024/017 — https://pacmap.dev/regulation/cm-personal-data-protection-2024
14. Kinsmen Advocates, Data protection in Cameroon 2025 — https://kinsmenadvocates.com/cybersecurity/data-protection-in-cameroon-2025
15. MINPOSTEL, Draft decree on the Data Protection Authority (2023 consultation) — https://www.minpostel.gov.cm/images/Documentation/patnuc/textes_preparation_pour_consultation_publique/protection_data/230518%20Decret_APD%20FIN%20_CLEAN.pdf
16. Moukouri Law, Projets de loi et décret relatifs à la protection des données — https://moukourilaw.com/projets-de-loi-et-decret-relatifs-a-la-protection-des-donnees-a-caractere-personnel-au-cameroun/
17. Afriwise / NFM Avocats, Cameroon's evolving data privacy landscape — https://www.afriwise.com/resources/cameroons-evolving-data-privacy-landscape
18. Morrison Foerster Privacy Library, Cameroon — https://www.mofo.com/privacy-library/cameroon
19. Securys, Next stop: Cameroon — https://www.securys.co.uk/blog/next-stop-cameroon
20. Kukie.io, Cameroon Law 2024/017 cookie consent (updated 26 Oct 2026) — https://kukie.io/blog/cookie-consent-cameroon-data-protection
21. Anove, Law 2024/017 summary — https://www.anove.ai/en/regulations/cameroon-law-2024-017
22. Global Center on AI Governance, Data privacy and responsible AI adoption in Cameroon — https://www.globalcenter.ai/research/data-privacy-and-responsible-ai-adoption-in-cameroon
23. Chambers, Doing Business In 2026: Cameroon — https://gpg-pdf.chambers.com/Doing-Business-In-2026/151/
24. US International Trade Administration, Cameroon eCommerce — https://www.trade.gov/country-commercial-guides/cameroon-ecommerce
25. ART (Agence de Régulation des Télécommunications) website — https://www.art.cm/
26. BEAC, Payment systems instructions, circulars and regulations — https://www.beac.int/systemes-paiement/instructions-circulaires-reglements/
27. Regulation No. 04/18/CEMAC/UMAC/COBAC of 21 Dec 2018 on payment services (BEAC PDF) — https://www.beac.int/wp-content/uploads/2019/07/REGLEMENT-N-04-18-CEMAC-UMAC-COBAC-du-21-d%C3%A9cembre-2018.pdf
28. BEAC, Rapport sur les services de paiement dans la CEMAC 2024 (Apr 2026) — https://www.beac.int/wp-content/uploads/2026/04/RAPPORT-SUR-LES-SERVICES-DE-PAIEMENT-DANS-LA-CEMAC-2024-.pdf
29. BEAC, Règlements de la COBAC — https://www.beac.int/supervision-bancaire/reglements-de-cobac/
30. BEAC homepage (news: COBAC consultations, PAPSS, SYSTAC 2) — https://www.beac.int/
31. Wikipedia, OHADA — https://en.wikipedia.org/wiki/OHADA
32. AWS Shared Responsibility Model — https://aws.amazon.com/compliance/shared-responsibility-model/
33. Amazon Cognito, Authentication flows (passwordless, passkeys) — https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow-methods.html
34. Amazon Cognito, Threat protection — https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-settings-threat-protection.html
35. AWS End User Messaging pricing — https://aws.amazon.com/end-user-messaging/pricing/
36. AWS Security Reference Architecture — https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/architecture.html
37. AWS Control Tower, What is Control Tower — https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html
38. AWS Organizations, Service control policies — https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
39. AWS Data Privacy FAQ — https://aws.amazon.com/compliance/data-privacy-faq/
40. AWS Global Infrastructure (Regions and AZs) — https://aws.amazon.com/about-aws/global-infrastructure/regions_az/
41. AWS Compliance Programs — https://aws.amazon.com/compliance/programs/
42. AWS Penetration Testing policy — https://aws.amazon.com/security/penetration-testing/
43. AWS WAF, Rate-based rule statements — https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based.html
44. Amazon GuardDuty, What is GuardDuty — https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html
45. Amazon Macie, What is Macie — https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html
46. AWS Security Hub CSPM, Introduction — https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html
47. Amazon Inspector, What is Inspector — https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html
48. AWS KMS, Overview — https://docs.aws.amazon.com/kms/latest/developerguide/overview.html
49. OWASP Top 10:2025 — https://top10.owasp.org/2025
50. OWASP API Security Top 10 2023 — https://api-security.owasp.org/editions/2023/en/0x11-t10
51. OWASP Mobile Top 10 2024 — https://owasp.github.io/www-project-mobile-top-10/2023-risks
52. OWASP Mobile Top 10 project repository — https://github.com/OWASP/www-project-mobile-top-10
53. OWASP Multifactor Authentication Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html
54. OWASP Vulnerability Disclosure Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html
55. NIST SP 800-63B-4 Digital Identity Guidelines: Authentication — https://pages.nist.gov/800-63-4/sp800-63b.html
56. NIST Cybersecurity Framework (CSF 2.0) — https://www.nist.gov/cyberframework
57. NIST SP 800-61 Rev. 3, Incident Response Recommendations (Apr 2025) — https://csrc.nist.gov/pubs/sp/800/61/r3/final
58. IETF RFC 9116, security.txt — https://www.rfc-editor.org/rfc/rfc9116
59. Meta for Developers, Webhooks: Getting Started (signature validation, mTLS) — https://developers.facebook.com/docs/graph-api/webhooks/getting-started
60. WhatsApp Business Messaging Policy — https://whatsappbusiness.com/fr/policy/
61. pip-audit (PyPI) — https://pypi.org/project/pip-audit/
62. Bandit documentation (PyCQA) — https://bandit.readthedocs.io/en/latest/
63. Django deployment checklist — https://docs.djangoproject.com/en/stable/howto/deployment/checklist/
64. FastAPI, Security intro — https://fastapi.tiangolo.com/tutorial/security/
65. AICPA-CIMA, SOC 2 — https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2
66. UN Women, Technology-facilitated gender-based violence FAQ — https://www.unwomen.org/en/what-we-do/ending-violence-against-women/faqs/tech-facilitated-gender-based-violence
67. Android Developers, Location permissions — https://developer.android.com/develop/sensors-and-location/location/permissions
68. Data Protection Africa, Cameroon profile (outdated, pre-2024; noted for contrast only) — https://dataprotection.africa/cameroon/
