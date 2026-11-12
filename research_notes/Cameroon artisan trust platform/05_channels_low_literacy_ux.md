# Access Channels and Low-Literacy UX for a Cameroon Artisan Trust and Service-Matching Platform

Research date: 12 November 2026. Prices carry the date of the source. Currency: XAF (FCFA). XAF is pegged to the euro; USD conversions below use roughly 560-600 XAF/USD. That rate is an assumption, not a sourced figure.

Method note: the shared web-search budget for this research run ran out partway through this task. The later findings come from fetching primary pages directly (AWS, Meta, Google, the ART/Orange interconnection catalogue, MTN Cameroon, Microsoft Research, and others). A few things could not be checked, either because sites returned errors or because no search was left. Each is listed under Gaps.

---

## 1. USSD in Cameroon: availability, cost, aggregators, session limits, examples

### Takeaway
USSD is technically available on all Cameroonian networks, but the business has to sign with each operator or go through a licensed local value-added-service (VAS) aggregator, or use the state's #237# national switch. Africa's Talking does not cover Cameroon. Published costs: Orange's 2020 catalogue gives a 500,000 XAF connection fee, 10 XAF (excl. VAT) per session and a 120-second maximum session. A 2026 commercial quote gives about 250,000 XAF per month per operator plus 15 XAF per session. USSD is the best zero-data channel for artisans on basic phones, but fixed costs are significant and access has been politically contested.

### Cited Findings
- **Africa's Talking does not cover Cameroon.** Its official coverage table lists USSD only in Kenya, Uganda, Tanzania, Rwanda, Malawi, Zambia, Nigeria, Ghana and South Africa. Cameroon is not listed for any AT product (SMS, USSD, voice, airtime, payments) — [Africa's Talking Help Center](https://help.africastalking.com/en/articles/2727792-which-countries-are-africa-s-talking-products-in). Third-party lists of AT USSD coverage also omit Cameroon — [HelloDuty blog](https://helloduty.com/blogs/countries-supported-by-africas-talking-ussd-api); [StarHash docs](https://docs.page/nexlabstudio/starhash-docs/providers/africas-talking).
- **AT voice is only in Kenya, Uganda and Nigeria**, so it is not an option for Cameroon either — [Africa's Talking Help Center](https://help.africastalking.com/en/articles/2727792-which-countries-are-africa-s-talking-products-in).
- Ushahidi's USSD integration with AT uses a sandbox service code plus a callback URL per service code. This is the standard AT pattern, but again it is not usable in Cameroon — [Ushahidi docs](https://docs.ushahidi.com/platform-api-ussd-service/supported-ussd-providers/africas-talking-ussd).
- **Orange Cameroun's official 2020 interconnection catalogue for VAS providers** (filed with the regulator ART):
  - Connection fee to the Orange SMS VAS platform: 500,000 XAF excl. VAT. Connection to the Orange USSD platform: 500,000 XAF excl. VAT. Voice interconnection to the Orange platform: 10,000,000 XAF.
  - "La session USSD est facturée à 10 HT FCFA / transaction". Maximum USSD session length is 120 seconds.
  - A cost-based interconnection component of 4 XAF excl. VAT per SMS or USSD request, and 12 XAF per call minute.
  - Revenue shares on premium content: the partner receives 36.5-52% depending on who hosts and promotes the service.
  - SMS toll-free ("numéro vert SMS") is re-billed to the provider at 25 XAF excl. VAT per SMS.
  - The catalogue references ART decision n°173/ART/DG/DLCI/SDIICE/SIAR, which capped USSD-code access offers for CAMTEL, MTN Cameroon, Orange Cameroun and VIETTEL (Nexttel).
  - Source: [ART – Orange Cameroun interconnection catalogue 2020 (fournisseurs SVA)](https://www.art.cm/sites/default/files/documents/catalogue%20da%20interconnexion%202020%20-%20fournisseurs%20sva-converted-compressed.pdf)
- **2026 commercial quote (HelloDuty page, updated 15 June 2026):** dedicated USSD code at XAF 250,000 per month "charged per Telco", and XAF 15 per session (dial), billed to the business. Lists MTN, Orange and Camtel (Blue) as the networks — [HelloDuty Cameroon](https://helloduty.com/country/cameroon). This is a vendor's own price and needs confirming.
- **USSD access is politically contested.** In July 2017 the telecom minister instructed ART to make MTN and Orange put USSD access in their interconnection catalogues, calling USSD "une infrastructure essentielle". This followed MTN suspending Express Union's *050# code (obtained in 2014 through VAS provider LMT) and attempting to raise its access fee to 220 XAF — [Camer.be, 22 July 2017](https://www.camer.be/actualites/societe/cameroon-cameroun-conditions-dacces-aux-codes-ussd-letat-siffle-la-fin-de-la-recreation-dans-le-secteur-des-telecommunications.html). A related report says Orange raised the *050# access cost from 20 to 153 XAF in 2017, which led to a complaint to ART — [Camer.be (Express Union vs MTN/Orange)](https://www.camer.be/actualites/societe/cameroun-affaire-express-union-mtn-et-orange-defient-letat-et-ses-institutions-depuis-trois-ans-cameroon.html).
- **National USSD code #237#:**
  - The government launched a cross-operator code for mobile money and online payments, live from 31 March 2020. CAMPOST manages it. It is intended to let fintechs reach all networks "without signing separate contracts with each operator". MTN said #237# is not run by its services — [ITWeb Africa, 8 April 2020](https://itweb.africa/article/cameroon-looks-to-level-financial-services-playing-field/KWEBb7yZBGEMmRjO).
  - The NPSI switch was inaugurated on 5 July 2022 and implemented by Nigeria's eTRANZACT. All telecom operators and about 40 companies were connected, per CAMPOST's director. Afriland First Bank uses #237*001# — [Osiris.sn](https://www.osiris.sn/le-cameroun-premier-africain-a-mettre-sur-pied-un-code-ussd-national-a-travers.html).
  - The government later urged start-ups and payment providers to sign with the national switch — [ITWeb Africa](https://itweb.africa/article/cameroons-start-ups-urged-to-leverage-national-payment-gateway/GxwQD71ZgA2MlPVo).
- **Local aggregators:**
  - **LMT Group** (offices in Yaoundé and Douala; claims more than 18 years and over 500 client organisations) offers bulk SMS (over 20M SMS/month, 150+ SMS/sec; SMPP/HTTPS/API), USSD codes, short codes (e.g. 8080-style), WhatsApp Business, a 300+ seat contact centre with 400+ multilingual agents, and multi-operator merchant payment terminals (Orange Money, MoMo, EU Mobile Money, YUP) — [LMT Group](https://www.lmtgroup.com/).
  - **Nexah** is a Cameroon-based VAS firm founded in 2015 offering bulk SMS, USSD applications, short codes and mobile-payment integration — [Mobile Ecosystem Forum member profile](https://mobileecosystemforum.com/members/nexah/).
  - **LAfricaMobile** offers unified REST APIs for SMS, USSD and other channels across Africa — [LAfricaMobile](https://lafricamobile.com/en/).
  - **Orange's developer portal** documents SMS/USSD APIs for francophone Africa — [Orange Developer SMS guide (PDF)](https://developer.orange.com/wp-content/uploads/Orange-Developer-Le-SMS-nouveau-commercial.pdf); [Orange APIs for MEA](https://developer.orange.com/resources/orange-apis-for-the-middle-east-africa/).
- **Twilio** does not support Cameroonian domestic short codes or long codes, and has no USSD product — [Twilio Cameroon SMS guidelines](https://www.twilio.com/en-us/guidelines/cm/sms).
- **USSD codes Cameroonians already use (MTN):** data bundles via *157# or *123*3*2#, WhatsApp bundles *701#, TikTok/YaMo *220#, voice offer *222*0#, balance *123*99# — [MTN Cameroon data bundles](https://mtn.cm/offers/welcome-to-the-mtn-internet-space/); [MTN WhatsApp/TikTok bundles](https://mtn.cm/offers/whatsapp-tiktok-bundles/); [MTN Cameroon home](https://mtn.cm/).

### Inferences
- **Indicative cost model** (an inference from the 2026 HelloDuty quote):
  - Fixed cost: dedicated codes on MTN and Orange would be about 500,000 XAF/month (about $850-900) before any traffic. Adding Camtel brings it to about 750,000 XAF.
  - Variable cost: 10,000 sessions/month at 15 XAF adds about 150,000 XAF.
  - A shared code or sub-code from an aggregator (LMT, Nexah) or through #237# is likely much cheaper to start with, but terms are unpublished.
- **Session length:** 120 seconds (Orange) is enough for short flows: "rate artisan #1234 out of 5", "find a plumber in Bonamoussadi", "verify badge code". It is not enough for free-text reviews. Long input should go to SMS, voice or WhatsApp.
- **Political risk:** USSD access has been fought over (the *050# dispute). The project should get written commitments from operators or the aggregator, and treat #237# as a fallback or regulatory lever.
- **Best role for USSD:**
  - Artisans: registration, availability toggle, viewing job leads, confirming completed jobs.
  - Customers: verifying an artisan's ID or badge number, and quick 1-5 ratings.

### Gaps
- Current (2025-2026) official USSD tariffs for MTN, Camtel and Nexttel could not be retrieved. The Camtel 2024 catalogue PDF returned 404.
- Nexah, Mtarget and "Kiss" pricing pages were not retrieved. No search budget was left to look up Mtarget's or Kiss's Cameroon presence.
- Session timeout for MTN is unverified. Only Orange's 120 seconds is documented.
- Whether #237# accepts non-financial (marketplace/reputation) services, and at what price, is unknown.

---

## 2. SMS costs and sender ID rules in Cameroon (A2P, AWS End User Messaging)

### Takeaway
A2P SMS to Cameroon works through AWS End User Messaging, Twilio and many aggregators. Alphanumeric sender IDs must be pre-registered, especially for MTN, and registration takes about 3 weeks. Wholesale cost straight from Orange is 3.5-8 XAF per SMS. International aggregator retail runs about $0.035 per SMS (D7, 2026). AWS lists Cameroon as supporting short codes and two-way SMS. Twilio says two-way is not supported. Orange's self-serve Cameroon SMS API is being discontinued on 1 December 2026.

### Cited Findings
- **AWS End User Messaging SMS, Cameroon (CM, +237):** short codes Yes, long codes No, sender IDs Yes, two-way SMS Yes, international sending Yes. Phone numbers in each country come through a single carrier partner, so AWS recommends redundant channels such as WhatsApp — [AWS supported countries](https://docs.aws.amazon.com/sms-voice/latest/userguide/phone-numbers-sms-by-country.html).
- AWS's Cameroon registration page lists the number type as sender ID with registration required. Cameroon sender ID registration must be completed before sending — [AWS Cameroon registration page](https://docs.aws.amazon.com/end-user-messaging/latest/userguide/nx-country-reg-cm.md).
- **AWS sender ID rules:** up to 11 characters, letters, numbers and dashes. If the sender ID is unregistered, AWS tries "NOTICE", which carriers may block. Registration is per AWS Region. Many countries take 2-4 weeks — [AWS sender IDs](https://docs.aws.amazon.com/sms-voice/latest/userguide/sender-id.html).
- AWS expanded self-service sender ID registration to 19 more countries in January 2025 — [AWS What's New, Jan 2025](https://aws.amazon.com/about-aws/whats-new/2025/01/aws-end-user-messaging-self-service-id-registration).
- **Twilio Cameroon guidelines:**
  - Two-way SMS not supported. No domestic long or short codes. Concatenation supported (varies).
  - Pre-registered alphanumeric sender IDs recommended, with about 3 weeks provisioning.
  - Numeric international sender IDs fail on MTN.
  - Generic sender IDs may be blocked. Promotional content is not allowed for registration.
  - HELP/STOP in the local language and daytime-only sending recommended.
  - Source: [Twilio Cameroon SMS guidelines](https://www.twilio.com/en-us/guidelines/cm/sms); [Twilio Cameroon SMS pricing](https://www.twilio.com/en-us/sms/pricing/cm)
- **Orange wholesale bulk/MT SMS tariff (2020 catalogue, XAF excl. VAT per SMS, 12-month validity):** 8.0 for 1-5K; 7.5 for 5-10K; 7 for 10-50K; 6 for 50K-1M; 5.5 for 1-6M; 5 for 6-7.5M; 4.5 for 7.5-10M; 3.5 above 10M — [ART – Orange interconnection catalogue 2020](https://www.art.cm/sites/default/files/documents/catalogue%20da%20interconnexion%202020%20-%20fournisseurs%20sva-converted-compressed.pdf).
- **D7 Networks (2026 page):** $0.035 per local SMS. Covers Orange, MTN and Nexttel. Sender ID registration and content approval go through the operators — [D7 Networks Cameroon](https://d7networks.com/sms/cameroon/).
- **Sent.dm comparison table (undated):** Telnyx $0.004, Plivo $0.0055, Twilio $0.0075, MessageBird $0.0252, BulkSMS $0.033, Decision Telecom $0.0747, Sinch $0.133, Infobip $0.167 per SMS. Local operator retail 50-150 XAF. It also says compliance can add 10-15% — [Sent.dm Cameroon SMS pricing](https://sent.dm/resources/cameroon-sms-pricing). **Caution:** the $0.004-0.0075 figures for Twilio, Plivo and Telnyx look implausibly low next to Orange's own wholesale price (3.5-8 XAF, about $0.006-0.014) and D7's $0.035. Treat as unreliable and confirm in each provider's console.
- About 3 weeks for international alphanumeric pre-registration is also reported by [Sent.dm Cameroon SMS guide](https://sent.dm/en/resources/sms-compliance/cameroon-sms-guide).
- **Orange Developer "SMS Cameroon" API is deprecated** and "will be discontinued effective December 1st, 2026". Orange points users to its B2B "Business Messaging Ngage" offer — [Orange Developer SMS CM](https://developer.orange.com/apis/sms-cm). A GitHub sample shows the old bearer-token flow — [GitHub gist](https://gist.github.com/SalathielGenese/c13df9f7c1d4b4f3d6ffc644f7950ac5).

### Inferences
- **Volume and launch strategy:** for high volume (OTP, job alerts, review-request nudges), a local aggregator (LMT, Nexah) on Orange/MTN wholesale rates is likely 3-5x cheaper per SMS than international CPaaS. AWS End User Messaging is a reasonable fallback, and is convenient if the stack is on AWS. Register the sender ID (for example "ARTISANCM", 11 characters max) at least 3-4 weeks before launch.
- **Two-way SMS is uncertain.** AWS says yes via short code; Twilio says no. Inbound SMS replies such as "reply 1-5 to rate" should go over a local short code from an aggregator, not international CPaaS.

### Gaps
- AWS's per-message price for Cameroon was not retrieved. It is published as a downloadable price list.
- Infobip's live Cameroon price was not verified directly; the only figure is Sent.dm's $0.167.
- Current MTN wholesale SMS tariffs were not found.

---

## 3. WhatsApp Business Platform: pricing for Cameroon, reach, Flows, voice notes, examples

### Takeaway
WhatsApp charges per message (since 1 July 2025). Cameroon is billed in Meta's "Rest of Africa" group: marketing $0.0225, utility $0.004, authentication $0.004 per delivered template (effective 1 October 2026). Messages users send to the business are free. Since 1 October 2026 there are two changes. Service (free-form) replies are charged beyond 1,000 free per month per number. Utility templates sent inside the 24-hour window are also charged. WhatsApp cuts costs for engaged, smartphone-owning customers and urban artisans, but it misses the 58% of Cameroonians who are offline.

### Cited Findings
- **Meta pricing model:**
  - Charged per delivered business-to-user message by category (marketing, utility, authentication, service, Meta Business Agent) and recipient country code. User-to-business messages are free.
  - Service messages were free from 1 November 2024. From 1 October 2026 each business phone number gets 1,000 free service messages per month, then they are charged.
  - Utility messages in the customer-service window were free from 1 July 2025 and charged at published rates from 1 October 2026.
  - Click-to-WhatsApp-ad entry points open a free 7-day window.
  - Eligible government and non-profit organisations keep free service messages beyond the free tier until 31 December 2027.
  - Cameroon (+237) falls under "Rest of Africa", not a standalone market.
  - Source: [Meta WhatsApp pricing docs](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing)
  - Meta's legacy pricing page was also seen — [Meta pricing (legacy URL)](https://developers.facebook.com/docs/whatsapp/pricing). A search snippet of that page listed Cameroon among markets with "rate card updates effective January 1, 2026", which conflicts with the "Rest of Africa" grouping. Unresolved.
- **Cameroon per-message rates (USD, effective 1 October 2026):** marketing $0.0225, utility $0.0040, authentication $0.0040 — [Whautomate pricing guide](https://whautomate.com/whatsapp-business-api-pricing). The same figures appear in an earlier 2026 guide (via search) — [Sent.dm WhatsApp pricing guide](https://docs.sent.dm/docs/guides/whatsapp-pricing).
- **BSP markups:** Whautomate says common BSP markups run about 10-30%, with platform fees from about $29 to $500+ per month — [Whautomate](https://whautomate.com/whatsapp-business-api-pricing).
  - BSP edna lists much higher per-message prices for "Rest of Africa": marketing $0.04 (MM API) or $0.05 (Cloud API); utility, authentication and service $0.02 each, with service charged from 1 October 2026 — [edna](https://edna.io/?p=16752). These prices include edna's own margin.
- **Salesforce rate card effective 1 November 2026** lists Cameroon at 27.78 / 4.94 / 4.94 / 4.94 credits (marketing / utility / authentication / service). These are identical to Kenya and Chad, consistent with a shared regional rate — [Salesforce Message Credits WhatsApp rate card, Nov 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/Salesforce-Message-Credits-WhatsApp-Rate-Card-per-message-Nov-2026.pdf). An earlier [Salesforce July 2025 rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/WhatsApp_Business-Messaging-WhatsApp-Rate_Card_Jul_1_2025-to-Jul-31-2025.pdf) showed 27.78 / 4.94 / 17.78 / 0.
- **WhatsApp Flows** are structured in-chat forms for lead generation, quotes, loans, purchase intent and personalised offers, with a Flow JSON spec and a playground — [Meta WhatsApp Flows docs](https://developers.facebook.com/docs/whatsapp/flows).
- **Voice notes as input:** the Cloud API accepts AAC, AMR, MP3, M4A and OGG/Opus (mono) audio up to 16 MB. Incoming media arrives as a media ID (valid 7 days). Download URLs expire after 5 minutes and need a bearer token — [Meta Cloud API media reference](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media).
- **AWS integration:** Amazon Connect supports WhatsApp Business Messaging and SMS in Africa (Cape Town) and other Regions — [Amazon Connect Regions](https://docs.aws.amazon.com/connect/latest/adminguide/regions.html). AWS End User Messaging also offers WhatsApp — [AWS supported countries page](https://docs.aws.amazon.com/sms-voice/latest/userguide/phone-numbers-sms-by-country.html).
- **WhatsApp in Cameroon — reach and use:**
  - No reliable WhatsApp user count for Cameroon was found. DataReportal's Cameroon reports do not give a WhatsApp figure — [DataReportal Digital 2026 Cameroon](https://datareportal.com/reports/digital-2026-cameroon); [DataReportal Digital 2025 Cameroon](https://datareportal.com/reports/digital-2025-cameroon).
  - A Cameroonian outlet cites GSMA/ANTIC: up to 88% of connected consumers buy goods through WhatsApp, and 68% use Facebook Marketplace or informal pages to transact. The original study and date were not given — [Hilltop Voices, July 2026](https://www.hilltopvoices.com/2026/07/cameroons-social-media-boom-reshapes.html).
  - Statista hosts a DataReportal chart of WhatsApp use by country, but the Cameroon value was not retrievable — [Statista](https://www.statista.com/statistics/291540/mobile-internet-user-whatsapp/).
- **Local WhatsApp bot example:** MTN Cameroon runs "ZIGI", a 24/7 WhatsApp assistant — [MTN Cameroon](https://mtn.cm/).
- **WhatsApp-only data bundles** cost from 25 XAF for 25 MB, 200 XAF for 50 MB (day), and 1,500 XAF for 300 MB (month), via *701# — [MTN WhatsApp bundles](https://mtn.cm/offers/whatsapp-tiktok-bundles/).
- **Local providers:** LMT Group (Cameroon) offers WhatsApp Business for self-service, payments, micro-insurance and invoices — [LMT Group](https://www.lmtgroup.com/).

### Inferences
- **Cost per job:** a cycle of "job request → match → confirmation → review request" could be mostly user-initiated plus 2-3 utility templates (about $0.004 each). That is roughly $0.01-0.015 per job, about 6-9 XAF, comparable to a single bulk SMS. Above 1,000 service replies per number per month, service replies now add cost.
- **Pass-through pricing:** use a BSP that passes Meta rates through. edna-style $0.02 utility pricing would be 5x Meta's base rate.
- **Non-profit status:** if the platform is run by an NGO or public entity, it may qualify for free service messages until December 2027. Check Meta's eligibility criteria.
- **Voice notes plus WhatsApp-only bundles** make WhatsApp workable for semi-literate artisans who own a smartphone. They can send a voice note describing work done, and photos of work, without needing a general data plan.
- **WhatsApp bots for informal workers in Africa:** no well-documented examples were found in this run (see Gaps). MTN's ZIGI shows that Cameroonian users already deal with WhatsApp bots.

### Gaps
- Meta's own rate table for "Rest of Africa" could not be read directly; the figures come from third-party reproductions.
- A WhatsApp penetration statistic for Cameroon (share of internet users using WhatsApp monthly) was not found.
- Documented WhatsApp bots for artisans or informal workers in Africa (e.g. Lynk Kenya, SweepSouth) could not be verified: fetches failed and no search was left.
- A list of Meta-certified BSPs with Cameroon operations was not compiled.

---

## 4. IVR / voice, and speech recognition for French, English, Pidgin and local languages

### Takeaway
Voice is the most inclusive channel for low-literacy users, but the big cloud stacks cover Cameroon poorly:
- **Amazon Connect:** no evidence of Cameroonian phone numbers, and outbound campaigns cannot dial +237.
- **AWS speech services:** Transcribe, Polly and Lex support French and English (not Cameroonian accents specifically). None supports Cameroonian Pidgin or any Cameroonian language.
- **Google, Whisper, Meta MMS:** Google Chirp, Whisper and Meta MMS widen African language coverage. Google's chirp_2 includes Fulah (Senegal locale) and Lingala. No Cameroonian Pidgin ASR model or dataset was found.

A practical design is a local IVR or "missed-call / call-back" number through a Cameroonian contact-centre or VAS provider (e.g. LMT). Use recorded prompts in French, English, Pidgin and major local languages, keypad input (DTMF), and voice-note recording that humans moderate. Do not rely on automatic speech recognition in Pidgin or local languages.

### Cited Findings
- **Amazon Connect:**
  - Regions include Africa (Cape Town).
  - Outbound campaigns from Cape Town can call only South African numbers. "No other combinations are supported" — so +237 is not reachable through campaigns.
  - Source: [Amazon Connect Regions](https://docs.aws.amazon.com/connect/latest/adminguide/regions.html)
  - The pricing page lists no Cameroon inbound DID, toll-free or outbound rate. The general voice rate is $0.038 per minute plus telephony — [Amazon Connect pricing](https://aws.amazon.com/connect/pricing/).
- **Amazon Transcribe:**
  - French (fr-FR, fr-CA) batch and streaming, including Call Analytics.
  - English: en-GB, en-US, en-ZA, en-IN, etc.
  - African languages: Afrikaans, Amharic, Somali, Swahili variants and Zulu (batch and streaming), plus Hausa (ha-NG), Kinyarwanda and Wolof (batch only).
  - No Cameroonian Pidgin, Nigerian Pidgin or Cameroonian languages.
  - Source: [Amazon Transcribe supported languages](https://docs.aws.amazon.com/transcribe/latest/dg/supported-languages.html)
- **Amazon Polly (text-to-speech):** French (fr-FR, fr-BE, fr-CA) and English including en-ZA. No sub-Saharan African languages — [Amazon Polly languages](https://docs.aws.amazon.com/polly/latest/dg/supported-languages.html).
- **Amazon Lex V2:** fr_FR, fr_CA, fr_BE, en_ZA, af_ZA, zu_ZA and so_SO. No Cameroonian languages — [Amazon Lex V2 languages](https://docs.aws.amazon.com/lexv2/latest/dg/how-languages.html).
- **Google Cloud Speech-to-Text:**
  - chirp_3: Afrikaans, Amharic, Hausa, Swahili, Wolof, Xhosa, Yoruba, Zulu, Sepedi.
  - chirp_2: adds Fulah (ff-SN), Igbo, Lingala (ln-CD), Shona, Somali, Luo, Oromo and others.
  - No African language has a "telephony" model.
  - fr-CM, en-CM and Pidgin locales are not listed.
  - Source: [Google Cloud STT supported languages](https://docs.cloud.google.com/speech-to-text/docs/speech-to-text-supported-languages)
- **OpenAI Whisper:**
  - Supports French and English, and among African languages Swahili, Yoruba, Hausa, Lingala, Shona, Somali, Afrikaans, Amharic and Malagasy.
  - No Pidgin and no Cameroonian languages.
  - Source: [Whisper tokenizer.py](https://raw.githubusercontent.com/openai/whisper/main/whisper/tokenizer.py)
  - Its README notes "Whisper's performance varies widely depending on the language". Model sizes run from tiny (39M parameters, about 1 GB VRAM) to large (1.55B, about 10 GB) — [OpenAI Whisper GitHub](https://github.com/openai/whisper).
- **Meta MMS (May 2023):**
  - Speech-to-text in 1,107 languages, text-to-speech in over 1,100, language identification in over 4,000.
  - Trained mostly on New Testament readings (about 32 hours per language).
  - Roughly halved Whisper's word error rate on 54 FLEURS languages.
  - Caveats: religious-domain data, often single speakers, dialects remain hard.
  - The blog does not name Cameroonian languages.
  - Source: [Meta AI – MMS](https://ai.meta.com/blog/multilingual-model-speech-recognition/)
- **Datasets:**
  - Lacuna Fund's catalogue has speech datasets for Senegalese languages (KALLAAMA), Nigerian Igbo, Hausa and Yoruba (NaijaVoices), and Ghanaian financial-inclusion speech. None are Cameroonian — [Lacuna Fund datasets](https://lacunafund.org/datasets/).
  - Masakhane (1,000+ participants from 30 African countries) lists MT, NER and East-African speech projects, with no Cameroonian language project — [Masakhane](https://www.masakhane.io/).
- **Cameroonian Pidgin English:** about 12 million speakers (Ethnologue 2017). About 5% are native speakers and about 50% of Cameroonians speak it in some form. It is centred on the Northwest, Southwest and Littoral regions and increasingly used in spoken media. Official languages are French and English — [Wikipedia – Cameroonian Pidgin English](https://en.wikipedia.org/wiki/Cameroonian_Pidgin_English).
- **Voice-first precedents (India):**
  - **CGNet Swara (2010):** people call in by IVR to record reports in Gondi, journalists moderate them, and others listen back by phone, often triggered by a missed call. Launched with Microsoft Research India support. Its website has since lapsed — [Wikipedia – CGNet Swara](https://en.wikipedia.org/wiki/CGNet_Swara).
  - **Gram Vaani** (participatory voice media) reports reaching 5M+ people in 110+ districts and 5 countries, with 100K+ monthly unique users. It runs a workforce and labour-rights programme for low-income workers — [Gram Vaani](https://gramvaani.org/).
- **Speech vs touch-tone (Pakistan):** Sherwani et al. studied this for low-literate users ("Speech vs. Touch-tone", ICTD 2009; "HealthLine", ICTD 2007; "Orality-Grounded HCID", ITID 2009) — [Jahanzeb Sherwani publication list](https://www.cs.cmu.edu/~jsherwan/). Detailed results were not retrieved.
- **Local contact-centre capacity:** LMT Group runs a 300+ seat omnichannel contact centre with 400+ multilingual agents, a cloud call centre, and short codes such as 8080 — [LMT Group](https://www.lmtgroup.com/).
- **Orange interconnection catalogue:** voice interconnection to the Orange VAS platform costs 10,000,000 XAF. The cost-based component is 12 XAF per minute — [ART – Orange catalogue 2020](https://www.art.cm/sites/default/files/documents/catalogue%20da%20interconnexion%202020%20-%20fournisseurs%20sva-converted-compressed.pdf).

### Inferences
- **IVR architecture:** host the IVR with a local provider holding Cameroonian numbers or short codes (LMT, Nexah or an operator VAS). Amazon Connect could still provide routing and agent desktops if calls arrive over SIP from the local provider. That interconnect was not verified.
- **Speech recognition:**
  - French and English ASR (Transcribe or Google) can transcribe customer voice reviews and requests from urban francophone and anglophone users. Accuracy on Cameroonian accents is untested and should be piloted.
  - For Pidgin and local languages, store voice notes as audio. Have humans (or community moderators, the CGNet Swara model) tag and summarise them. Prompts should be professionally recorded audio, not text-to-speech.
- **Starting language set:** French, English, Cameroonian Pidgin, plus Fulfulde for the northern regions. Add Ewondo/Beti and Duala/Basaa for Centre and Littoral based on pilot demand. This is an inference; usage data by language was not sourced.
- **Missed-call call-back:** a "missed call → call-back" pattern (used by CGNet Swara) shifts call cost from low-income artisans to the platform.

### Gaps
- Viamo's 3-2-1 service could not be confirmed in Cameroon (viamo.io returned certificate errors). Awaaz.De/Avaaj Otalo and IBM Spoken Web details were not retrieved.
- No Cameroonian Pidgin speech corpus or ASR benchmark was found. Whether Meta MMS covers specific Cameroonian languages (e.g. Ewondo, Duala, Fulfulde variants) was not verified.
- Twilio voice termination rates to Cameroon and local IVR per-minute prices were not retrieved.

---

## 5. Devices: feature phones, KaiOS, Android Go, low-end smartphones, PWA vs native app

### Takeaway
Cameroon's connected population is mostly on Android smartphones (Android about 83% of mobile web traffic, iOS about 17%, KaiOS about 0% on StatCounter). But only about 42% of people use the internet, and 87.5% of connections are 3G or better. A large basic-phone and offline population remains, mostly rural and older users and many artisans. So the right split is a data-light PWA or Android-Go-class app for smartphone users, with USSD, SMS and voice for everyone else.

### Cited Findings
- **Cameroon, late 2025:**
  - Population 30.1M, 60.6% urban, median age 18.
  - 12.6M internet users (41.9%); 17.5M (58.1%) offline.
  - 29.0M cellular connections (96.4% of population), 87.5% of them 3G/4G/5G, which "is not a measure of mobile internet use".
  - 5.90M social media user identities; Facebook ad reach 5.90M.
  - Source: [DataReportal Digital 2026 Cameroon](https://datareportal.com/reports/digital-2026-cameroon)
  - January 2025: 12.4M internet users, 25.5M connections, 83.6% broadband — [DataReportal Digital 2025 Cameroon](https://datareportal.com/reports/digital-2025-cameroon).
- **Mobile OS share by web traffic (October 2026):** Android 82.79%, iOS 17.19%, KaiOS 0% — [StatCounter Cameroon mobile OS](https://gs.statcounter.com/os-market-share/mobile/cameroon). Web-traffic measures leave out basic phones that never browse.
- **Smartphone count:** GSMA data reported in Cameroonian press puts smartphones in use at 15.18 million in 2022 — [Camer.be on GSMA CEMAC data](https://www.camer.be/62222/12:1/cameroon-connectivite-mobile-le-gabon-devance-le-cameroun-en-zone-cemac.html).
- **Messenger reach — two sources conflict sharply:**
  - NapoleonCat: about 7.16M Messenger users in October 2026 (22.9% of population), 59% male, largest group 25-34 — [NapoleonCat](https://napoleoncat.com/stats/messenger-users-in-cameroon/2025/03).
  - DataReportal: Messenger ad reach of only 631K in late 2025 — [DataReportal 2026](https://datareportal.com/reports/digital-2026-cameroon).
- **Android Go:** minimum RAM is 512 MB (Android 8.1-10), 1 GB (11-12) and 2 GB (Android 13). Features such as picture-in-picture and draw-over-apps are disabled by default. Apps should respect tight memory, storage and data limits — [Android Developers – Android (Go edition)](https://developer.android.com/guide/topics/androidgo).
- **PWAs** are installable, work offline or on flaky networks, and can be dramatically smaller than native apps. Twitter cut app size "by over 97%" with its PWA and saw 65% more pages per session — [web.dev – What are PWAs](https://web.dev/articles/what-are-pwas).
- **KaiOS** describes itself as a lightweight platform for "the next billion users", with an app store and merchant tools. Its homepage gives no Cameroon data — [KaiOS](https://www.kaiostech.com/).
- **Global usage gap:** GSMA's State of Mobile Internet Connectivity 2025 covers it; the PDF was too large to retrieve — [GSMA SOMIC 2025](https://www.gsma.com/somic/wp-content/uploads/2025/09/The-State-of-Mobile-Internet-Connectivity-2025-Trends-in-Mobile-Internet-Connectivity.pdf).

### Inferences
- **Artisan app:** build a PWA first, ideally under about 1 MB on first load, offline-capable, with a service-worker queue for reviews and photos, installable from a link sent by SMS or WhatsApp. A native Android app could follow if camera, QR scanning or offline maps need it. Keep any native APK small, aiming for Android Go devices with 1-2 GB RAM.
- **Skip KaiOS-specific builds:** KaiOS web share is about 0% in Cameroon. Feature-phone users should be served through USSD, SMS and IVR instead.

### Gaps
- No direct data on the feature-phone vs smartphone split among Cameroonian subscribers, or among artisans, for 2025-2026. GSMA Intelligence country data was not accessible.
- Median mobile download speed for Cameroon was not retrieved (Ookla page not fetchable).

---

## 6. Low-literacy design research (HCI4D/ICTD)

### Takeaway
The evidence consistently finds:
- Text menus (including SMS and USSD) are very hard for first-time low-literacy users.
- Graphical or multimedia and spoken interfaces work better.
- A live human operator gives the highest accuracy.

Voice forums with human moderation (CGNet Swara, Gram Vaani) show voice-first participation scaling in low-literacy settings. The platform should therefore combine icons and photos, recorded audio prompts, numeric codes, and trusted human intermediaries ("assisted digital") for artisans with low literacy.

### Cited Findings
- **Medhi Thies et al., ACM TOCHI 2011:**
  - Ethnography with 90 low-literacy participants in India, Kenya, the Philippines and South Africa, then quantitative studies with 70+ participants in India.
  - Compared text-based interfaces (forms, SMS, USSD) with text-free ones (spoken dialog, graphical, live operator).
  - "Textual interfaces are unusable by first-time low-literacy users", and error-prone even for literate novices.
  - A live operator was up to about 10x more accurate than text interfaces for health data, and could be cost-effective in India.
  - A graphical UI had the highest task completion in mobile banking.
  - Source: [Microsoft Research – Designing Mobile Interfaces for Novice and Low-Literacy Users](https://www.microsoft.com/en-us/research/publication/designing-mobile-interfaces-for-novice-and-low-literacy-users/)
- **Medhi Thies, Gautama & Toyama, CHI 2009 (Best of CHI honourable mention):** 58 non-literate and semi-literate users compared text, spoken-dialog and rich multimedia money-transfer interfaces. "Non-text designs are strongly preferred over text-based designs". Rich multimedia had the highest task completion. Spoken dialog was faster and needed less help — [Microsoft Research – Comparison of mobile money-transfer UIs](https://www.microsoft.com/en-us/research/publication/a-comparison-of-mobile-money-transfer-uis-for-non-literate-and-semi-literate-users/).
- **Voice forums:**
  - CGNet Swara combined IVR recording, journalist moderation, missed-call playback, and later an Android app with photo upload (2014) — [Wikipedia – CGNet Swara](https://en.wikipedia.org/wiki/CGNet_Swara).
  - Gram Vaani designs platforms "customized for users' digital literacy, internet access and affordability", working through community volunteers and partners — [Gram Vaani](https://gramvaani.org/).
- **Speech interfaces for low-literate users in Pakistan** (HealthLine; speech vs touch-tone; "Orality-Grounded HCID") — [Sherwani publications](https://www.cs.cmu.edu/~jsherwan/).
- **Cameroon context:** offline share is 58.1% — [DataReportal 2026](https://datareportal.com/reports/digital-2026-cameroon). About 50% of Cameroonians speak Pidgin in some form — [Wikipedia – Cameroonian Pidgin English](https://en.wikipedia.org/wiki/Cameroonian_Pidgin_English).

### Inferences
Design rules for the platform, drawn from the evidence above:
1. **Trade icons and photos.** Each artisan trade (mason, welder, tailor, mechanic, electrician, plumber, hairdresser, carpenter) gets a photo-based icon. Audio labels play on tap.
2. **Ratings as faces or colours plus numbers.** Use a 3- to 5-point scale with smiley/colour faces (red/amber/green) and the digit. This maps directly to USSD and IVR keypad input (press 1-5).
3. **Numeric identities.** Each artisan gets a short numeric ID (e.g. 6 digits) usable across QR, USSD ("dial *XXX*ID#"), SMS and IVR. Numbers carry better than text for semi-literate users. Avoid typed names.
4. **Audio everywhere.** Recorded voice prompts in French, English and Pidgin. Voice-note reviews, moderated by people.
5. **Assisted digital.** Field agents or "ambassadors" (trade association leaders, mobile money agents) onboard and verify artisans in person. This is where the live operator's accuracy advantage counts most.
6. **Shallow menus.** USSD and IVR menus no more than 2-3 levels deep with at most about 5 options. This fits the 120-second USSD session limit and reduces navigation errors.

### Gaps
- Original papers by Medhi, Sagar & Toyama (2006/2007 text-free UIs), Patel et al. (Avaaj Otalo, CHI 2010), Raza et al. (Polly, CHI 2013) and Sherwani 2009 results could not be retrieved: ACM DL returned 403 and the Microsoft pages returned 404.
- No Cameroon-specific low-literacy HCI study was found.
- Cameroon adult literacy rate: the World Bank and UNESCO UIS pages returned no data on fetch.

---

## 7. QR codes for verification, and USSD-code alternatives

### Takeaway
Printed QR badges (on workshop signs, vests and ID cards) linking to a live, verifiable artisan profile are cheap and easy to scan with Android camera phones. Many customers and artisans lack camera smartphones or data, so every QR badge also needs a printed short numeric ID. That ID can be checked by USSD, SMS or a voice call. Mobile money merchant infrastructure already uses printed codes and multi-operator terminals in Cameroon.

### Cited Findings
- **Payment infrastructure:**
  - MTN Cameroon promotes "MoMo Pay" merchant payments and the MoMo app — [MTN Cameroon](https://mtn.cm/).
  - LMT Group supplies multi-operator merchant payment terminals accepting Orange Money, MTN MoMo, EU Mobile Money and YUP — [LMT Group](https://www.lmtgroup.com/).
  - Orange Money launched in Cameroon in 2011, uses a USSD menu, and accepts cash at Orange Money points of sale — [Wikipedia – Orange Money](https://en.wikipedia.org/wiki/Orange_Money).
- **Device reach for scanning:**
  - Smartphone share among web users is high (Android 82.79%, iOS 17.19%) — [StatCounter](https://gs.statcounter.com/os-market-share/mobile/cameroon).
  - But 58.1% of the population is offline — [DataReportal 2026](https://datareportal.com/reports/digital-2026-cameroon).
- **USSD sub-codes:** the #237# national switch supports per-institution sub-codes (e.g. Afriland's #237*001#), working without internet — [Osiris.sn](https://www.osiris.sn/le-cameroun-premier-africain-a-mettre-sur-pied-un-code-ussd-national-a-travers.html).

### Inferences
- **Badge design:** the QR code points to a short URL showing:
  - photo, trades and verification level;
  - review count and score, with dated verified-job reviews;
  - a "report problem" button.
- **Badge text** next to the QR: "Vérifier / Check: dial *XXX*123456# or SMS 123456 to 8XXX or call 8XXX". This ties in with USSD, SMS and IVR.
- **Anti-forgery:** a QR alone can be copied. The verification page should show a live photo and a "last verified" date, and possibly a rotating code that agents check. Linking to the platform's own domain helps customers spot fakes.
- **Badge cost:** vests and printed badges are a one-off of a few hundred to a few thousand XAF per artisan. This is an inference; no supplier prices were sourced.

### Gaps
- No data was found on QR-payment adoption in Cameroon (MoMo/Orange Money QR volumes), or on QR use by informal artisans.
- No evaluated examples of QR artisan badges in Africa were retrieved.

---

## 8. Data costs, zero-rating and data-light design

### Takeaway
Mobile data in Cameroon is mid-priced for Africa: on average $1.63/GB in 2023, rank 140 of 237, versus about $0.40 in Nigeria and Ghana. Daily bundles are cheaper per GB (MTN: 1,000 XAF for 2 GB/24h). Monthly bundles are much costlier per GB for small users (2,000 XAF for 1.2 GB). WhatsApp-only bundles start at 25 XAF. Free Basics was never documented in Cameroon. The design has to be data-light, and zero-rating would need an operator deal.

### Cited Findings
- **Average 1 GB price (2023 dataset):** Cameroon $1.63 (rank 140/237); Côte d'Ivoire $1.18; Nigeria $0.39; Ghana $0.40; Gabon $4.09 — [Cable.co.uk / bestbroadbanddeals worldwide data pricing](https://bestbroadbanddeals.co.uk/mobiles/worldwide-data-pricing/).
- **MTN Cameroon bundles (2026 page):**
  - Daily: 100 XAF/100 MB; 250 XAF/250 MB; 500 XAF/600 MB; 1,000 XAF/2 GB.
  - Night (00-06h): 200 XAF/2 GB.
  - Weekly: 700 XAF/200 MB; 1,000 XAF/750 MB; 3,000 XAF/3 GB.
  - Monthly: 850 XAF/250 MB; 2,000 XAF/1.2 GB; 4,000 XAF/3 GB; 8,000 XAF/9.2 GB; 10,000 XAF/30 GB (1 GB/day).
  - Codes *157# or *123*3*2#.
  - Source: [MTN Cameroon data bundles](https://mtn.cm/offers/welcome-to-the-mtn-internet-space/)
- **MTN WhatsApp bundles:** 25 XAF/25 MB; 200 XAF/50 MB; 500 XAF/100 MB; 1,500 XAF/300 MB. TikTok bundles 100 XAF/200 MB (24h) — [MTN WhatsApp/TikTok bundles](https://mtn.cm/offers/whatsapp-tiktok-bundles/).
- **Orange Cameroun** offers classic (24h/3-day/monthly), custom and "Giga" bundles. Prices were not shown on the fetched index pages — [Orange Cameroun internet](https://www.orange.cm/fr/internet.html); [Orange Cameroun home](https://www.orange.cm/fr/).
- **Free Basics** launched in many African countries (Zambia, Tanzania, Kenya, Ghana, Malawi, Senegal, Angola, South Africa, Nigeria, Madagascar…). Cameroon is not listed. It faces net-neutrality criticism and bans (India, Egypt) — [Wikipedia – Free Basics](https://en.wikipedia.org/wiki/Free_Basics).

### Inferences
- **Price per GB (computed from MTN's list):** about 500 XAF on the 24-hour 2 GB bundle; about 1,667 XAF on the monthly 1.2 GB bundle. Small users effectively pay $1.5-3/GB. A 2 MB app page costs about 1-3 XAF, while a 30 MB native app download costs 15-50 XAF.
- **Data budget:** keep first load under 500 KB to 1 MB, compress images (WebP, thumbnails under 30 KB), avoid video on profile pages, cache aggressively, and give a text-only "lite" mode.
- **Zero-rating:** reverse-billing the platform's domain (sponsored data) through MTN or Orange would remove the data barrier for artisans. It needs a commercial agreement and net-neutrality review. A cheaper fallback is to push users to WhatsApp, whose bundles are cheap.

### Gaps
- No A4AI or ITU 2024-2025 affordability figures for Cameroon (1 GB as % of GNI per capita) were retrieved.
- Orange Cameroun's per-bundle prices were not retrieved. Zero-rating or sponsored-data offers by MTN or Orange Cameroon were not documented.

---

## 9. Human agents: agent networks, field ambassadors, call centres and wages

### Takeaway
Human intermediaries are the most reliable "channel" for onboarding and verifying low-literacy artisans; the HCI evidence shows live operators are up to about 10x more accurate than text interfaces. Cameroon already has dense mobile money agent networks (Orange Money since 2011, MTN MoMo) and outsourced multilingual contact centres (LMT: 400+ agents). Labour is cheap: the legal minimum wage was 36,270 XAF/month as of 2014 and may have been raised since. A hybrid of field ambassadors plus a small call centre is affordable.

### Cited Findings
- A live operator was up to about 10x more accurate than text interfaces for low-literacy users, and potentially cost-effective — [Microsoft Research – Medhi Thies et al. 2011](https://www.microsoft.com/en-us/research/publication/designing-mobile-interfaces-for-novice-and-low-literacy-users/).
- **LMT Group:** 300+ seat omnichannel contact centre, 400+ multilingual agents, over 220 simultaneous inbound calls, cloud call centre, telemarketing, offices in Yaoundé and Douala — [LMT Group](https://www.lmtgroup.com/).
- **Orange Money in Cameroon** since 2011, with cash-in at Orange Money points of sale. Africa-wide, 20M customers in Africa and Middle East by September 2016 — [Wikipedia – Orange Money](https://en.wikipedia.org/wiki/Orange_Money).
- **Minimum wage:** CFA 36,270 (about US$62) per month, effective 30 July 2014. The page is flagged as possibly outdated — [Wikipedia – List of countries by minimum wage](https://en.wikipedia.org/wiki/List_of_countries_by_minimum_wage).
- **Community intermediaries:** Gram Vaani works through community volunteers and 250+ partners — [Gram Vaani](https://gramvaani.org/). CGNet Swara trained local residents as reporters and used professional moderators — [Wikipedia – CGNet Swara](https://en.wikipedia.org/wiki/CGNet_Swara).

### Inferences
- **Field ambassadors**, recruited from artisan associations, quarter chiefs and mobile money agents, do in-person onboarding:
  - photo and ID capture;
  - trade-skill attestation by peers;
  - badge issuance.
  - They are paid per verified artisan plus a stipend. Mobile money agents are a natural partner because they already handle KYC-style tasks and are trusted locally.
- **Call centre:** a small outsourced team (e.g. LMT) can handle:
  - IVR overflow;
  - dispute calls;
  - "assisted review" calls (calling customers after a job to collect a rating by voice, the most inclusive way to gather reputation data).
- **Wages:** given the 2014 minimum wage of about 36,000 XAF/month, agent costs are low in USD terms. Actual call-centre wages are unknown (see Gaps).

### Gaps
- Number of mobile money agents in Cameroon (BEAC/GSMA figures) not retrieved: the GSMA SOTIR page returned 403.
- Typical Cameroonian call-centre agent salaries not found.
- The current SMIG may have been revised after 2014 (reports of a 2023 increase were not verified).

---

## 10. Synthesis: recommended channel mix for artisans vs customers

### Takeaway
Use an omnichannel design built on one numeric artisan ID:
- **Artisans:** USSD plus IVR/voice plus field agents as the base, with WhatsApp and a lightweight PWA for smartphone owners.
- **Customers:** WhatsApp and a PWA/web profile (reached via QR badge) as the main channels, with USSD/SMS verification and a call-back voice line for basic-phone and low-literacy customers.

### Cited Findings
Key figures behind the matrix, all sourced above:
- **USSD:** about 10-15 XAF per session, 120-second sessions, 250,000 XAF/month per operator for a dedicated code — [ART/Orange 2020 catalogue](https://www.art.cm/sites/default/files/documents/catalogue%20da%20interconnexion%202020%20-%20fournisseurs%20sva-converted-compressed.pdf); [HelloDuty](https://helloduty.com/country/cameroon).
- **SMS:** 3.5-8 XAF wholesale (Orange), about $0.035 retail aggregator — [ART/Orange catalogue](https://www.art.cm/sites/default/files/documents/catalogue%20da%20interconnexion%202020%20-%20fournisseurs%20sva-converted-compressed.pdf); [D7](https://d7networks.com/sms/cameroon/).
- **WhatsApp:** utility $0.004, marketing $0.0225, user-initiated free, 1,000 free service messages per month from October 2026 — [Meta](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing); [Whautomate](https://whautomate.com/whatsapp-business-api-pricing).
- **Reach:** 41.9% internet users, 58.1% offline, 96.4% mobile connections per capita — [DataReportal 2026](https://datareportal.com/reports/digital-2026-cameroon).
- **Speech coverage:** cloud ASR covers French and English only among Cameroon's main languages — [AWS Transcribe](https://docs.aws.amazon.com/transcribe/latest/dg/supported-languages.html); [Google STT](https://docs.cloud.google.com/speech-to-text/docs/speech-to-text-supported-languages).

### Inferences

| Channel | Artisans | Customers | Key provider options (Cameroon) | Indicative cost (dated) |
|---|---|---|---|---|
| **USSD** (shared code or sub-code) | Core: register, toggle availability, accept leads, confirm job done, check own rating | Verify artisan by ID, give a 1-5 rating | LMT, Nexah, operator VAS, #237# NPSI (not Africa's Talking, not Twilio) | 10 XAF/session (Orange 2020); 15 XAF/session + 250k XAF/month per operator (HelloDuty, June 2026) |
| **SMS** | Job alerts, OTP, payment and rating notifications | Job confirmation, review request with reply code | LMT/Nexah (local, cheapest), AWS End User Messaging (sender ID registration needed), D7, Twilio (one-way) | 3.5-8 XAF wholesale (Orange 2020); about $0.035 (D7, 2026) |
| **WhatsApp bot** (+ Flows, voice notes) | Optional for smartphone artisans: photo portfolio, voice-note job reports | Core: search/request artisan, receive matches, rate with voice note | Meta Cloud API via pass-through BSP; LMT; AWS End User Messaging / Amazon Connect WhatsApp | Utility $0.004, marketing $0.0225 (Meta, from 1 Oct 2026) |
| **IVR / voice** (missed-call call-back) | Core for low literacy: audio menus in French/English/Pidgin/local languages, DTMF, recorded voice profile | Inclusive line for basic-phone customers, voice reviews | Local contact centre/VAS (LMT 400+ agents); not Amazon Connect numbers (no +237 support found) | Per-minute rates not retrieved (12 XAF/min interconnection component, Orange 2020) |
| **PWA (data-light)** | Profile management for smartphone artisans | Public artisan profile behind QR, search | Self-hosted; Android Go-class optimisation | Data cost about 1-3 XAF per 2 MB page at MTN prices (2026) |
| **QR badge + printed numeric ID** | Proof of verification on vest, workshop sign or ID card | Scan to verify, or dial/SMS the numeric ID | Local printing | One-off badge cost (not sourced) |
| **Human agents / call centre** | Core onboarding and verification; trade-association and mobile money agent ambassadors | Dispute resolution, assisted ratings by phone | Outsourced (LMT), field ambassadors | Minimum wage 36,270 XAF/month (2014, likely outdated) |

- **Sequencing:**
  - Phase 1: field agents + USSD + SMS + WhatsApp + QR/numeric badge.
  - Phase 2: IVR with recorded prompts in French, English and Pidgin, voice-note reviews moderated by people.
  - Phase 3: PWA with offline support, and French/English ASR to auto-tag voice reviews.
- **Trust:** ratings should come from verified job confirmations, whichever channel each side uses — for example the customer confirms by USSD and the artisan by WhatsApp. One shared numeric job ID makes cross-channel confirmation possible and makes fake reviews harder.

### Gaps
- No Cameroon-specific usability data compares these channels for artisans, so pilot A/B testing is needed.
- Costs for IVR minutes, local short codes and Camtel/Nexttel USSD are still unverified.

---

## Sources

1. Africa's Talking Help Center – Which countries are AT products in — https://help.africastalking.com/en/articles/2727792-which-countries-are-africa-s-talking-products-in
2. HelloDuty – Countries supported by Africa's Talking USSD API — https://helloduty.com/blogs/countries-supported-by-africas-talking-ussd-api
3. StarHash docs – Africa's Talking provider — https://docs.page/nexlabstudio/starhash-docs/providers/africas-talking
4. Ushahidi docs – Africa's Talking USSD — https://docs.ushahidi.com/platform-api-ussd-service/supported-ussd-providers/africas-talking-ussd
5. ART Cameroon – Orange Cameroun interconnection catalogue 2020 (fournisseurs SVA) — https://www.art.cm/sites/default/files/documents/catalogue%20da%20interconnexion%202020%20-%20fournisseurs%20sva-converted-compressed.pdf
6. HelloDuty – Cameroon country page (updated 15 June 2026) — https://helloduty.com/country/cameroon
7. Camer.be – Conditions d'accès aux codes USSD (22 July 2017) — https://www.camer.be/actualites/societe/cameroon-cameroun-conditions-dacces-aux-codes-ussd-letat-siffle-la-fin-de-la-recreation-dans-le-secteur-des-telecommunications.html
8. Camer.be – Affaire Express Union: MTN et Orange défient l'État — https://www.camer.be/actualites/societe/cameroun-affaire-express-union-mtn-et-orange-defient-letat-et-ses-institutions-depuis-trois-ans-cameroon.html
9. ITWeb Africa – Cameroon looks to level financial services playing field (Apr 2020) — https://itweb.africa/article/cameroon-looks-to-level-financial-services-playing-field/KWEBb7yZBGEMmRjO
10. ITWeb Africa – Cameroon's start-ups urged to leverage national payment gateway — https://itweb.africa/article/cameroons-start-ups-urged-to-leverage-national-payment-gateway/GxwQD71ZgA2MlPVo
11. Osiris.sn – Le Cameroun premier africain à mettre sur pied un code USSD national — https://www.osiris.sn/le-cameroun-premier-africain-a-mettre-sur-pied-un-code-ussd-national-a-travers.html
12. LMT Group — https://www.lmtgroup.com/
13. Mobile Ecosystem Forum – Nexah member profile — https://mobileecosystemforum.com/members/nexah/
14. LAfricaMobile — https://lafricamobile.com/en/
15. Orange Developer – Le SMS (PDF guide) — https://developer.orange.com/wp-content/uploads/Orange-Developer-Le-SMS-nouveau-commercial.pdf
16. Orange Developer – Orange APIs for Middle East & Africa — https://developer.orange.com/resources/orange-apis-for-the-middle-east-africa/
17. Orange Developer – SMS Cameroon API (deprecation notice) — https://developer.orange.com/apis/sms-cm
18. GitHub gist – Orange SMS API Cameroon sample — https://gist.github.com/SalathielGenese/c13df9f7c1d4b4f3d6ffc644f7950ac5
19. Twilio – Cameroon SMS guidelines — https://www.twilio.com/en-us/guidelines/cm/sms
20. Twilio – Cameroon SMS pricing — https://www.twilio.com/en-us/sms/pricing/cm
21. AWS End User Messaging – Supported countries and regions for SMS — https://docs.aws.amazon.com/sms-voice/latest/userguide/phone-numbers-sms-by-country.html
22. AWS End User Messaging – Cameroon registration page — https://docs.aws.amazon.com/end-user-messaging/latest/userguide/nx-country-reg-cm.md
23. AWS End User Messaging – Sender IDs — https://docs.aws.amazon.com/sms-voice/latest/userguide/sender-id.html
24. AWS What's New – Self-service sender ID registration in 19 new countries (Jan 2025) — https://aws.amazon.com/about-aws/whats-new/2025/01/aws-end-user-messaging-self-service-id-registration
25. D7 Networks – Cameroon SMS — https://d7networks.com/sms/cameroon/
26. Sent.dm – Cameroon SMS pricing — https://sent.dm/resources/cameroon-sms-pricing
27. Sent.dm – Cameroon SMS compliance guide — https://sent.dm/en/resources/sms-compliance/cameroon-sms-guide
28. Meta – Pricing on the WhatsApp Business Platform (current docs) — https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing
29. Meta – WhatsApp pricing (legacy URL) — https://developers.facebook.com/docs/whatsapp/pricing
30. Whautomate – WhatsApp Business API pricing — https://whautomate.com/whatsapp-business-api-pricing
31. Sent.dm – WhatsApp Business Platform pricing guide — https://docs.sent.dm/docs/guides/whatsapp-pricing
32. edna – WhatsApp Business API pricing — https://edna.io/?p=16752
33. Salesforce – Message Credits WhatsApp Rate Card, Nov 2026 — https://www.salesforce.com/en-us/wp-content/uploads/sites/4/Salesforce-Message-Credits-WhatsApp-Rate-Card-per-message-Nov-2026.pdf
34. Salesforce – WhatsApp rate card Jul 2025 — https://www.salesforce.com/en-us/wp-content/uploads/sites/4/WhatsApp_Business-Messaging-WhatsApp-Rate_Card_Jul_1_2025-to-Jul-31-2025.pdf
35. Meta – WhatsApp Flows docs — https://developers.facebook.com/docs/whatsapp/flows
36. Meta – WhatsApp Cloud API media reference — https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media
37. Statista – WhatsApp usage by country (DataReportal chart) — https://www.statista.com/statistics/291540/mobile-internet-user-whatsapp/
38. Hilltop Voices – Cameroon's social media boom (July 2026) — https://www.hilltopvoices.com/2026/07/cameroons-social-media-boom-reshapes.html
39. DataReportal – Digital 2026: Cameroon — https://datareportal.com/reports/digital-2026-cameroon
40. DataReportal – Digital 2025: Cameroon — https://datareportal.com/reports/digital-2025-cameroon
41. NapoleonCat – Messenger users in Cameroon — https://napoleoncat.com/stats/messenger-users-in-cameroon/2025/03
42. StatCounter – Mobile OS market share Cameroon — https://gs.statcounter.com/os-market-share/mobile/cameroon
43. Camer.be – Connectivité mobile: le Gabon devance le Cameroun (GSMA data) — https://www.camer.be/62222/12:1/cameroon-connectivite-mobile-le-gabon-devance-le-cameroun-en-zone-cemac.html
44. GSMA – State of Mobile Internet Connectivity 2025 (PDF) — https://www.gsma.com/somic/wp-content/uploads/2025/09/The-State-of-Mobile-Internet-Connectivity-2025-Trends-in-Mobile-Internet-Connectivity.pdf
45. Amazon Connect – Availability by Region — https://docs.aws.amazon.com/connect/latest/adminguide/regions.html
46. Amazon Connect – Pricing — https://aws.amazon.com/connect/pricing/
47. Amazon Transcribe – Supported languages — https://docs.aws.amazon.com/transcribe/latest/dg/supported-languages.html
48. Amazon Polly – Supported languages — https://docs.aws.amazon.com/polly/latest/dg/supported-languages.html
49. Amazon Lex V2 – Supported languages — https://docs.aws.amazon.com/lexv2/latest/dg/how-languages.html
50. Google Cloud Speech-to-Text – Supported languages — https://docs.cloud.google.com/speech-to-text/docs/speech-to-text-supported-languages
51. OpenAI Whisper – GitHub README — https://github.com/openai/whisper
52. OpenAI Whisper – tokenizer.py language list — https://raw.githubusercontent.com/openai/whisper/main/whisper/tokenizer.py
53. Meta AI – Massively Multilingual Speech (MMS) — https://ai.meta.com/blog/multilingual-model-speech-recognition/
54. Lacuna Fund – Datasets — https://lacunafund.org/datasets/
55. Masakhane — https://www.masakhane.io/
56. Wikipedia – Cameroonian Pidgin English — https://en.wikipedia.org/wiki/Cameroonian_Pidgin_English
57. Wikipedia – CGNet Swara — https://en.wikipedia.org/wiki/CGNet_Swara
58. Gram Vaani — https://gramvaani.org/
59. Jahanzeb Sherwani – publications (CMU) — https://www.cs.cmu.edu/~jsherwan/
60. Microsoft Research – Designing Mobile Interfaces for Novice and Low-Literacy Users (TOCHI 2011) — https://www.microsoft.com/en-us/research/publication/designing-mobile-interfaces-for-novice-and-low-literacy-users/
61. Microsoft Research – A Comparison of Mobile Money-Transfer UIs for Non-Literate and Semi-Literate Users (CHI 2009) — https://www.microsoft.com/en-us/research/publication/a-comparison-of-mobile-money-transfer-uis-for-non-literate-and-semi-literate-users/
62. Android Developers – Android (Go edition) — https://developer.android.com/guide/topics/androidgo
63. web.dev – What are Progressive Web Apps — https://web.dev/articles/what-are-pwas
64. KaiOS Technologies — https://www.kaiostech.com/
65. Cable.co.uk / bestbroadbanddeals – Worldwide mobile data pricing (2023) — https://bestbroadbanddeals.co.uk/mobiles/worldwide-data-pricing/
66. MTN Cameroon – Home (ZIGI WhatsApp assistant, MoMo Pay) — https://mtn.cm/
67. MTN Cameroon – Data bundles — https://mtn.cm/offers/welcome-to-the-mtn-internet-space/
68. MTN Cameroon – WhatsApp/TikTok bundles — https://mtn.cm/offers/whatsapp-tiktok-bundles/
69. Orange Cameroun – Home — https://www.orange.cm/fr/
70. Orange Cameroun – Internet bundles — https://www.orange.cm/fr/internet.html
71. Wikipedia – Free Basics — https://en.wikipedia.org/wiki/Free_Basics
72. Wikipedia – Orange Money — https://en.wikipedia.org/wiki/Orange_Money
73. Wikipedia – List of countries by minimum wage — https://en.wikipedia.org/wiki/List_of_countries_by_minimum_wage
