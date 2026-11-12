# System Design and Engineering: AWS + Python Reference Architecture for a Cameroon-First Artisan Trust and Service-Matching Platform

Research notes, researcher 06. Current as of 12 November 2026.

Method note: about 30 web searches and about 35 page fetches. The shared web-search budget for the run ran out partway through. Later verification therefore used direct fetches of primary AWS, GitHub and paper pages. Some topics below are thinner than planned for that reason, and those are flagged under Gaps. Numbered citations [n] refer to the source list at the end. Inline links are given for every cited claim.

**One-paragraph opinionated summary (for the report writer).** Build a **serverless-first modular monolith** in Python:
- **API:** FastAPI on AWS Lambda behind API Gateway, through the Lambda Web Adapter.
- **System of record:** Aurora PostgreSQL Serverless v2 with PostGIS, plus H3 cell columns.
- **Ephemeral state:** DynamoDB for channel and session state, idempotency records and rate limits.
- **Async backbone:** EventBridge, SQS and Step Functions.
- **Media and messaging:** S3, CloudFront and Rekognition for media. AWS End User Messaging (SMS/Voice/Social for WhatsApp) for messaging.
- **Third parties where AWS has gaps:** USSD aggregation and Cameroonian voice numbers.

Default primary region: **eu-west-3 (Paris)**, with eu-west-1 as the DR and backup region. Keep **af-south-1 (Cape Town) + Lagos Local Zone** as the planned home for later pan-African cells. Validate the choice with a one-week RTT test from MTN/Orange/Camtel networks before committing. Move hot, steady APIs to ECS Fargate once sustained traffic makes Lambda the more expensive option, roughly the 1M-MAU stage. Reputation runs as an event-sourced pipeline: a transactional outbox feeds incremental Lambda updates, plus a nightly batch graph recompute in Python (NetworkX/Polars on Fargate). Neptune Analytics is used only if the graph outgrows single-node memory. Do **not** use Amazon Pinpoint (end of support 30 Oct 2026), Amazon Fraud Detector (closed to new customers 7 Nov 2025) or Cloud9 (closed to new customers July 2024). CodeCommit is GA again, but GitHub + Actions with OIDC is still the recommendation.

---

## 1. AWS region choice, network path from Douala/Yaoundé, submarine cables, CloudFront edges and Local Zones

### Takeaway
No public measurement from Cameroon to the candidate regions turned up. Cameroon's international capacity rides mainly on WACS, SAT-3, NCSCS (to Lagos) and SAIL (to Brazil), and the main routes terminate in Europe/Portugal/Nigeria. A European region (Paris or Ireland) is therefore the likely latency winner and the pragmatic MVP choice. Cape Town (af-south-1) and its Lagos Local Zone are the strategic anchor for later pan-African cells. Decide with your own RTT probes, not assumptions.

### Cited Findings
**Submarine cables serving Cameroon**
- **SAIL** runs roughly 6,000 km from Kribi to Fortaleza, Brazil. **NCSCS** links Kribi to Lagos and is owned by Camtel with MainOne, landing at MainOne's Lagos station — [Telecom Review Africa](https://mail.telecomreviewafrica.com/articles/telecom-operators/2407-mtn-globalconnect-and-camtel-accelerate-cameroon-s-fibre-network-and-digital-journey). A Camtel carrier page instead lists the NCSCS Cameroonian landing as Limbe — [Camtel Carrier IPLC](https://carrier.camtel.cm/services/connectivity/iplc). The sources conflict on the landing point.
- **SAT-3** connects Cameroon (Douala) to Sesimbra, Portugal. **WACS** lands at Batoké (Limbe), and Camtel gained WACS capacity from 1 July 2015 — [Telecom Review Africa](https://mail.telecomreviewafrica.com/articles/telecom-operators/2407-mtn-globalconnect-and-camtel-accelerate-cameroon-s-fibre-network-and-digital-journey); [ITWeb Africa](https://itweb.africa/article/camtel-contracts-mtn-globalconnect-to-commercialise-wholesale-internet-abroad/KA3Ww7dDAdA7rydZ).
- **Reported Camtel utilisation:** about 6% of SAIL, 57% of WACS, 29% of SAT-3 and 92% of NCSCS. The near-saturated Lagos link is notable — [Telecom Review Africa](https://mail.telecomreviewafrica.com/articles/telecom-operators/2407-mtn-globalconnect-and-camtel-accelerate-cameroon-s-fibre-network-and-digital-journey).
- **Planned systems:** Cameroon signed an MoU to join the Medusa cable system — [Communications Africa](https://communicationsafrica.com/internet/cameroon-signs-mou-for-medusa-africa-cable); [Osiris](https://osiris.sn/le-cameroun-envisage-une-connexion-au-cable-medusa-africa.html). A planned WE-Africa-NA terrestrial/subsea route would run from Port Sudan across Chad to Kribi — [ITWeb Africa](https://itweb.africa/article/we-africa-na-promises-stronger-links-between-africa-europe-and-the-us/RgeVDvPY63Q7KJN3).
- **Cross-border fibre:** Angola Cables and Camtel partnered on cross-border connectivity — [Connecting Africa](https://connectingafrica.com/connectivity/angola-cables-camtel-partner-for-cross-border-connectivity).
- **2Africa:** No source found confirms a 2Africa landing in Cameroon. One article says only that 2Africa and Equiano activations lowered regional capacity prices — [ITWeb Africa](https://itweb.africa/article/camtel-contracts-mtn-globalconnect-to-commercialise-wholesale-internet-abroad/KA3Ww7dDAdA7rydZ).

**Latency data (inter-region proxies only)**
- AWS inter-region latency eu-west-3 (Paris) ↔ af-south-1 (Cape Town) is about 146 ms — [Economize](https://www.economize.cloud/resources/aws/latency/eu-west-3-vs-af-south-1/).
- Cape Town ↔ eu-south-2 (Spain) is about 133 ms — [Economize](https://www.economize.cloud/resources/aws/latency/eu-south-2-vs-af-south-1/).
- Geographies that depend on long-haul subsea cables, such as South Africa, can see large latency swings when traffic is re-routed — [Kentik](https://kentik.com/blog/clm-chowder-digging-into-cloud-latency-azure-google-cloud-oci).
- An academic study exists, "Measuring Cloud Latency in Africa" (Babasanmi and Chavula, IEEE CloudNet 2022, DOI 10.1109/CloudNet55617.2022.9978896). Its PDF body could not be parsed, so no figures were extracted — [UCT PDF](https://pubs.cs.uct.ac.za/1704/1/Measuring_Cloud_Latency_in_Africa.pdf).

**AWS edge and Local Zone footprint in Africa (verified Nov 2026)**
- **Lagos Local Zone:** `af-south-1-los-1a` is available, with parent region Africa (Cape Town). Local Zones in Johannesburg (`af-south-1-jnb-1a`) and Nairobi (`af-south-1-nbo-1a`) are listed as "announced" only — [AWS Local Zones locations](https://aws.amazon.com/about-aws/global-infrastructure/localzones/locations/).
- Lagos launched in January 2023 as the first African Local Zone — [TechNext](https://technext.ng/2023/01/27/aws-launch-local-zones-location-lagos/); [Connecting Africa](https://connectingafrica.com/cloud-networking/lagos-launches-first-aws-local-zone-in-africa); [DCD](https://datacenterdynamics.com/en/news/aws-launches-local-zone-edge-locations-in-lagos-lima-and-quer%C3%A9taro).
- **CloudFront edge locations** exist in Nairobi, Lagos, Cape Town and Johannesburg, with counts of Nairobi (3) and Lagos (2) — [CloudFront features](https://aws.amazon.com/cloudfront/features/?m=1); [CloudFront details](https://aws.amazon.com/cloudfront/details).
- The first Lagos CloudFront edge launched in June 2023 — [Nairametrics](https://nairametrics.com/2023/06/16/aws-launches-first-cloudfront-edge-location-in-nigeria). Johannesburg was CloudFront's first African point of presence (2018), followed by Cape Town — [BusinessTech](https://businesstech.co.za/news/?p=251801).

**Service availability by candidate region (affects region choice)**
- **WhatsApp (End User Messaging Social)** is available in af-south-1, eu-west-3, eu-south-1 and eu-west-1, among others — [AWS EUM endpoints](https://docs.aws.amazon.com/general/latest/gr/end-user-messaging.html).
- **SMS/Voice V2 API (End User Messaging)** is available in af-south-1, eu-west-3, eu-south-1 and eu-west-1 — [AWS EUM endpoints](https://docs.aws.amazon.com/general/latest/gr/end-user-messaging.html).
- **Amazon Connect is not available in Paris, Ireland or Milan.** It is offered in af-south-1, eu-central-1 and eu-west-2, among others — [Amazon Connect regions](https://docs.aws.amazon.com/connect/latest/adminguide/regions.html).
- **Lambda SnapStart** is available in all commercial regions except Asia Pacific (New Zealand) and Asia Pacific (Taipei) — [Lambda SnapStart docs](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html).

### Inferences
- **Recommended default: eu-west-3 (Paris) primary, eu-west-1 (Ireland) for backups and DR.**
  - Cameroon's dominant international paths (SAT-3, WACS) land in Portugal and Western Europe. Traffic to Cape Town therefore probably either hairpins through Europe or takes WACS southbound. Both are likely slower than going to a Western European region. This is an inference from the cable topology and needs measurement.
  - Paris suits a francophone-majority market. It is a default-enabled region (not opt-in) and has WhatsApp and SMS APIs.
  - Ireland usually has the widest service catalogue.
  - eu-south-1 (Milan) offers no clear advantage for Cameroon.
- **Run a one-week measurement before committing.**
  - Deploy a trivial Lambda function URL in eu-west-3, eu-west-1, eu-south-1 and af-south-1.
  - Probe from SIMs on MTN, Orange, Camtel and Nexttel in Douala and Yaoundé, and log p50/p95 TLS-handshake and RTT.
  - Pick the lowest p95. Treat differences under about 20 ms as a tie and break ties on service catalogue and data-residency rules.
- **The region matters less than it seems for most users.** The majority of interactions will be USSD, SMS or WhatsApp. Those latencies are dominated by the MNO, the aggregator or Meta, not by AWS. Region latency mainly affects the smartphone app and WhatsApp webhook round-trips.
- **Pan-African expansion.** Cells for Nigeria, Kenya and South Africa should go in af-south-1, using the Lagos Local Zone for latency-sensitive Nigerian compute and later the Johannesburg and Nairobi Local Zones once they are live. That yields a two-region estate (EU for Central and West Africa francophone, af-south-1 for Anglophone Africa). The cell-based architecture in section 10 is designed for exactly this.
- **The NCSCS saturation figure (92%) matters.** Routes via Lagos may congest, which is one more reason to measure rather than assume.

### Gaps
- No primary 2025–2026 RTT measurements from Douala or Yaoundé to any AWS region were found, and the CloudPing pages returned no Cameroon data.
- Whether 2Africa has, or will have, a Cameroon landing is unconfirmed. The TeleGeography map page did not render.
- Cameroon data-localisation requirements, such as the 2024 personal data protection law, could override the latency choice. This was not researched here (outside scope) and must be cross-checked with the legal/regulatory researcher.
- af-south-1 price premiums versus EU regions were not verified this session. Opt-in status and higher prices are commonly reported, but no source was fetched.

---

## 2. Compute model: serverless (API Gateway + Lambda + DynamoDB + EventBridge + SQS + Step Functions) vs containers (ECS Fargate/EKS) + Aurora PostgreSQL/PostGIS; Python cold starts, SnapStart, Powertools

### Takeaway
Use a **hybrid**: Lambda for the API and all event consumers at MVP-to-100k scale (near-zero idle cost, no servers), with Aurora PostgreSQL Serverless v2 + PostGIS as the relational core. Plan a clean path to ECS Fargate for the main HTTP API once traffic is steady and high. SnapStart for Python (3.12+) is GA, cuts init latency, and makes FastAPI-on-Lambda viable. It has caveats on uniqueness, DB connections and cost.

### Cited Findings
**SnapStart for Python**
- AWS Lambda added SnapStart for Python and .NET in November 2024 — [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2024/11/aws-lambda-snapstart-python-net-functions). It expanded to 23 more regions in June 2025 — [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2025/06/aws-lambda-snapstart-python-net-functions-23-regions).
- It supports Python 3.12 and later, Java 11+ and .NET 8+, for ZIP and container images. It does **not** support provisioned concurrency, EFS, S3 Files, or ephemeral storage above 512 MB. It works only on published versions and aliases, not `$LATEST` — [Lambda SnapStart docs](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html).
- SnapStart can cut init latency "from several seconds to as low as sub-second". It works best at scale, and infrequently invoked functions may see less benefit. Provisioned concurrency remains the option for strict cold-start requirements — [Lambda SnapStart docs](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html).
- **Compatibility caveats:**
  - Unique IDs, secrets and entropy generated during init may be duplicated across environments.
  - Network connections opened during init are not guaranteed after restore and must be validated and re-established. This matters for Postgres connections.
  - [Lambda SnapStart docs](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html)
- Python runtime hooks (before-snapshot and after-restore decorators) are provided by the Snapshot Restore for Python library — [Lambda SnapStart runtime hooks for Python](https://docs.aws.amazon.com/lambda/latest/dg/snapstart-runtime-hooks-python.html).
- **Pricing for Python:** you pay for snapshot caching (memory-based, minimum 3 hours, for every active published version) and a restore charge per restore. Java has no extra charge — [Lambda SnapStart docs](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html). The pricing page example lists cache at $0.0000015046 per GB-second and restore at $0.0001397998 per GB restored — [Lambda pricing](https://aws.amazon.com/lambda/pricing/).

**Lambda pricing**
- Lambda base pricing in us-east-1 is $0.20 per 1M requests and $0.0000166667 per GB-second (x86). The free tier is 1M requests and 400,000 GB-seconds per month — [Lambda pricing](https://aws.amazon.com/lambda/pricing/).

**Aurora Serverless v2**
- It supports scaling to 0 ACUs with automatic pause (announced 20 Nov 2024). No instance-capacity charges apply while paused — [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-aurora-serverless-v2-scaling-zero-capacity); [Aurora auto-pause docs](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html); [AWS Database Blog](https://aws.amazon.com/blogs/database/introducing-scaling-to-0-capacity-with-amazon-aurora-serverless-v2).
- A third-party write-up reports roughly 15 seconds to resume on the first reconnect — [DEV Community](https://dev.to/sudo_anuj/scaling-to-zero-with-amazon-aurora-serverless-v2-553n).

**DynamoDB**
- On-demand throughput prices were cut 50%, and global-table replicated writes by up to 67%, effective 1 Nov 2024 — [AWS Database Blog](https://aws.amazon.com/blogs/database/new-amazon-dynamodb-lowers-pricing-for-on-demand-throughput-and-global-tables/).

**Powertools for AWS Lambda (Python)**
- Its idempotency utility makes handlers or any function safe to retry.
  - It uses a DynamoDB persistence store and hashes JMESPath-selected request fields into the idempotency key.
  - `register_lambda_context` protects against duplicate execution after timeouts.
  - [Powertools idempotency docs](https://docs.powertools.aws.dev/lambda/python/stage/utilities/idempotency/); [AWS Compute Blog](https://aws.amazon.com/blogs/compute/handling-lambda-functions-idempotency-with-aws-lambda-powertools); [Walmsley deep dive](https://walmsles.medium.com/aws-lambda-powertools-idempotency-a-deeper-dive-40de7efe15b0)

**EventBridge Pipes**
- Pipes are point-to-point integrations: source → optional filter → optional enrichment → target. You are charged only for events that pass the filter. Event buses are recommended instead for many-to-many routing — [EventBridge Pipes docs](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html).

### Inferences
- **Why not pure DynamoDB serverless?** A marketplace with geo search, multi-attribute filtering, ad-hoc ops queries, dispute investigation, price-band analytics and reputation joins is relational and exploratory. PostGIS gives radius and polygon queries natively (section 4).
  - Aurora Serverless v2 at scale-to-zero keeps dev and staging nearly free.
  - In production, set a minimum of 0.5–1 ACU to avoid the roughly 15 s resume penalty.
  - DynamoDB is still the right store for high-churn key-value state: USSD sessions with TTL, idempotency keys, rate limiting, conversation cursors.
- **Why not containers from day one?** ECS Fargate needs at least one always-on task per service per AZ, plus a load balancer. Lambda costs nothing at idle and scales per request. That fits a market launching with hundreds of users and spiky traffic, such as evening WhatsApp bursts.
- **When to move to Fargate.** At around 1M MAU, a steady API doing tens of requests per second around the clock is typically cheaper on Fargate or Graviton than on Lambda's per-GB-second pricing. Long-lived DB connection pools are also easier there. Keeping FastAPI behind the Lambda Web Adapter (section 3) means the *same container image* runs on Lambda or Fargate, so the migration is an infrastructure change, not a rewrite.
- **SnapStart + Postgres pattern.**
  - Create the SQLAlchemy engine lazily, or dispose and recreate it in an after-restore hook.
  - Generate UUIDs and secrets per request.
  - Use RDS Proxy (or the RDS Data API) to avoid connection storms from Lambda fan-out.
  - The RDS Proxy and Data API recommendation is general AWS practice. It was not separately verified this session.
- **Step Functions** should orchestrate long-lived job lifecycles with timers: request → quotes window → acceptance → reminder → completion code → review prompt → payout/escrow release → dispute window. EventBridge carries domain events between bounded contexts. SQS queues buffer each consumer, with DLQs everywhere.
- **EKS: not recommended** for a small team. It is operationally heavy and adds no benefit at this scale.

### Gaps
- No independent 2025–2026 benchmark of Python 3.12/3.13 Lambda cold starts (with versus without SnapStart) for a FastAPI + SQLAlchemy + Pydantic v2 bundle was found. Measure it in a spike.
- Region-specific Lambda, Aurora ACU, Fargate and API Gateway prices for eu-west-3 and af-south-1 were not retrieved (only us-east-1 Lambda figures).

---

## 3. Python framework and libraries: FastAPI vs Django vs Flask; Mangum vs Lambda Web Adapter; Pydantic; SQLAlchemy/GeoAlchemy2; Celery vs SQS workers

### Takeaway
**FastAPI + Pydantic v2 + SQLAlchemy 2.x (+ GeoAlchemy2) + Alembic**, deployed as a container image or ZIP using **AWS Lambda Web Adapter**, so the same app runs unchanged on Fargate later. Use **SQS-triggered Lambda workers (with Powertools)** instead of Celery. Django is a credible alternative if the team values its admin and ORM batteries over async and typed APIs.

### Cited Findings
- **AWS Lambda Web Adapter (LWA)** runs any HTTP 1.x web app on Lambda without code changes. It works on managed runtimes, custom runtimes and container images, and the same image runs on EC2, Fargate and locally.
  - It supports response streaming (`AWS_LWA_INVOKE_MODE=response_stream`) and has official FastAPI examples.
  - It polls a configurable readiness-check path before serving traffic.
  - **Trade-offs:** an extra hop. Compression works only in buffered mode. Under SnapStart the whole restore phase, including the readiness check, must fit in about 10 seconds. The SnapStart hook routes are unauthenticated if the image runs without the adapter.
  - [AWS Lambda Web Adapter GitHub](https://github.com/awslabs/aws-lambda-web-adapter)
- An AWS Builder Center comparison lists "App code changes: None" for LWA versus "Add handler + wrap app" for Mangum — [AWS Builder Center](https://builder.aws.com/content/3Ee4zoARhywavup2worwNXvD5rK/deploy-fastapi-to-aws-in-60-seconds); [DEV Community](https://dev.to/aws/deploy-fastapi-to-aws-in-60-seconds-519o).
- **Mangum** is an adapter that runs ASGI apps (FastAPI, Starlette, Quart, Django) on Lambda via `handler = Mangum(app)` — [Mangum on PyPI](https://pypi.org/project/mangum/0.12.1).
- No head-to-head cold-start benchmark between LWA and Mangum was found. A latency claim in one blog was not backed by data — [AWS Builder Center](https://builder.aws.com/content/3KHzA4aOtupX6ZZg04EwGFUpRX4/deploy-fast-api-to-aws-lambda-in-minutes).

### Inferences
**Recommended stack (opinionated)**

| Concern | Choice | Why |
|---|---|---|
| Web API | **FastAPI** (ASGI) | Typed request/response models (Pydantic v2), automatic OpenAPI for mobile and partner clients, async I/O for fan-out calls to WhatsApp/SMS/Rekognition. |
| Lambda adapter | **Lambda Web Adapter** (Mangum acceptable) | Zero code change, so the same container runs on Fargate later. Supports streaming. |
| Validation and settings | Pydantic v2, pydantic-settings | One schema layer shared by API, events and channel adapters. |
| ORM and migrations | SQLAlchemy 2.x + GeoAlchemy2 + Alembic | Mature, PostGIS types, explicit SQL when needed. |
| Geo | `h3` (h3-py), Shapely, pyproj | Hex indexing and geometry ops (section 4). |
| AWS SDK | boto3 / aioboto3 | Standard. |
| Lambda utilities | **Powertools for AWS Lambda (Python)** | Logger, Tracer, Metrics (EMF), Idempotency, Batch processing for SQS partial failures, Event Handler for non-HTTP routers, Parameters/Secrets. |
| Async workers | **SQS → Lambda** (Powertools BatchProcessor) | No broker to run. Celery would need Redis or RabbitMQ and long-lived workers. Step Functions handles scheduling and timers. |
| Data and ML | Polars or pandas, NetworkX, scikit-learn/LightGBM, SciPy (`linear_sum_assignment`), OR-Tools (later) | Reputation batch, ranking models, assignment optimisation. |
| Testing | pytest, hypothesis, moto, testcontainers (Postgres + PostGIS), schemathesis (OpenAPI fuzz) | Fast local loops without AWS. |
| Packaging | **uv** with a lockfile; container images on ECR | Reproducible builds. Matches the workspace convention of uv for new Python projects. |

- **Django option.** Choose Django + Django REST Framework or Django Ninja plus GeoDjango if back-office tooling (admin for moderators and dispute agents) outweighs async needs. GeoDjango is excellent with PostGIS. Django runs on Lambda via LWA too. The recommendation stays FastAPI for the public API, with a separate small back-office app (Django admin or a low-code tool) pointed at the same DB if needed.
- **Flask: not recommended.** It is synchronous by default and has weaker typing and validation than FastAPI, with no compensating benefit here.

### Gaps
- No 2026 benchmark comparing FastAPI and Django cold starts on Lambda with SnapStart was found.
- Mangum's maintenance status in 2026 was not verified. Search results show forks (Kludex/mangum), so check the repo before adopting.

---

## 4. Data modelling and geospatial search: DynamoDB single-table vs PostgreSQL; PostGIS, OpenSearch, H3, geohash, Amazon Location Service; Cameroon map coverage; landmark-based addressing

### Takeaway
**PostgreSQL (Aurora) + PostGIS is the system of record**, with **H3 cell IDs stored as indexed columns** for fast candidate retrieval, pre-aggregation and supply/demand heatmaps. DynamoDB handles only ephemeral, high-churn state. Amazon Location Service is weak for Cameroon: GrabMaps covers only Southeast Asia, and Open Data maps cannot geocode or route. Model addresses as **landmark + description + GPS point + accuracy** rather than street addresses, and seed landmarks from OpenStreetMap plus your own crowd-sourced data.

### Cited Findings
**PostGIS and H3**
- Aurora PostgreSQL supports the PostGIS extension (postgis, postgis_raster, postgis_topology and related), installed via `CREATE EXTENSION` with `rds_superuser`. Engine upgrades do not auto-upgrade PostGIS — [Aurora PostGIS docs](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Appendix.PostgreSQL.CommonDBATasks.PostGIS.html).
- Uber built **H3** for pricing and dispatch.
  - Hexagons minimise quantisation error as users move.
  - There are 16 resolutions, each finer cell about 1/7 the area of its parent.
  - `kRing` returns cells within grid distance k, so neighbours approximate circles.
  - Surge pricing is computed from supply and demand per hexagon.
  - It is open source in C with many language bindings.
  - [Uber Engineering – H3](https://www.uber.com/en/blog/h3/)
- **H3 resolution sizes:**

  | Resolution | Average edge | Average area |
  |---|---|---|
  | 7 | 1.41 km | 5.16 km² |
  | 8 | 531 m | 0.737 km² |
  | 9 | 201 m | 0.105 km² |
  | 10 | 76 m | 0.015 km² |

  Edge lengths are computed exactly only through resolution 6. Values for resolutions 7–10 are extrapolated — [H3 resolution table](https://h3geo.org/docs/core-library/restable/).

**Amazon Location Service**
- It offers map, place and routing data from Esri, HERE, GrabMaps and Open Data — [Amazon Location data providers](https://docs.aws.amazon.com/location/previous/developerguide/what-is-data-provider.md).
- GrabMaps coverage is limited to Southeast Asian countries — [GrabMaps docs](https://docs.aws.amazon.com/location/previous/developerguide/grab.html); [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2023/01/amazon-location-service-grabmaps-southeast-asia).
- The Open Data provider gives global map rendering but **cannot be used for geocoding, reverse geocoding, search or routing** — [AWS What's New – Open Data Maps](https://aws.amazon.com/about-aws/whats-new/2023/03/amazon-location-service-open-data-maps); [Amazon Location data providers](https://docs.aws.amazon.com/location/previous/developerguide/what-is-data-provider.md).
- HERE provides different data quality in different regions. The AWS docs point to HERE's own coverage pages, which were not retrieved — [HERE in Amazon Location](https://docs.aws.amazon.com/location/previous/developerguide/HERE.md).

**OpenStreetMap coverage of Cameroon**
- A UN Maps / HOT / TomTom "CityMapper Externship" used **Yaoundé** as its pilot (10 April – 10 May 2026). Remote mapping covered buildings and roads across 8 HOT Tasking Manager projects, alongside field work. Expansion to **Douala, Bafoussam and Bamenda** is planned, not done — [UN Maps](https://maps.un.org/news/citymapper-externship-un-maps-community-ambassador-and-chapter-initiative-cameroon); [OSM diary](https://api.openstreetmap.org/user/ENGELBERT%20MODO/diary/408919).
- The OSM WikiProject Cameroon notes missing residential roads on Yaoundé's outskirts and on Douala's eastern and south-eastern outskirts. The page is undated — [OSM Wiki – Cameroon](https://wiki.openstreetmap.org/wiki/Cameroon). A continent-level overview is the "State of OpenStreetMap in Africa 2023" — [OSM diary](https://www.openstreetmap.org/user/Kateregga1/diary/403280).

### Inferences
**Store choice by data type**

| Data | Store | Notes |
|---|---|---|
| Users, artisans, skills taxonomy, jobs, quotes, reviews, vouches, disputes, payments references, landmarks, price observations, outbox | **Aurora PostgreSQL + PostGIS** | ACID, joins, ad-hoc ops queries, `geography(Point)` + GiST index, H3 `bigint` columns with B-tree index. |
| USSD sessions, WhatsApp conversation cursor, OTP/attempt counters, idempotency records, rate limits | **DynamoDB** (on-demand, TTL) | Single-digit-ms key access. TTL auto-expires sessions. |
| Media | S3 (+ CloudFront) | Section 9. |
| Event log / analytics | S3 data lake (Parquet) + Athena | Fed from the outbox → EventBridge → Firehose. |
| Full-text search of artisans/services (later) | Postgres `pg_trgm`/FTS first. OpenSearch only at scale. | Avoid an OpenSearch cluster cost at MVP. |

**Why not DynamoDB single-table for the core?** Single-table design shines when access patterns are known and stable. A trust marketplace in discovery mode will keep adding query patterns: by neighbourhood, by trade, by vouch path, by dispute status, by price band. Postgres keeps that cheap to change. This is a judgement call. Alex DeBrie's single-table guidance could not be fetched this session (connection reset), so his position is not quoted.

**Geo search design**
- On artisan onboarding, store `home_point` plus a service-area polygon or a radius. Precompute the set of **H3 resolution-8 cells** covering the service area (about 0.74 km² each) into an `artisan_service_cells` table.
- On a request at point P, compute `h3(P, 8)` and its `k=1..3` ring, select artisans whose service cells intersect that ring, then refine with PostGIS `ST_DWithin` on `geography` for true distance.
- **Optional:** compute travel time with OSRM or Valhalla on OSM data in a small Fargate service, since Amazon Location routing coverage in Cameroon is unproven.
- Use resolution 7 (about 5 km²) for city-zone supply/demand dashboards and price bands. Use resolution 9 for privacy-preserving "approximate location" display.

**Landmark-based addressing (Cameroon lacks street addresses)**
- Fields: `landmarks(id, name, aliases[], category, geom, h3_r9, source[osm|crowd|ops], verified)` and `addresses(id, user_id, landmark_id, free_text_directions, geom, accuracy_m, h3_r9, captured_via[gps|pin|ussd_menu|agent])`.
- **USSD users** (no GPS) pick city → quartier → landmark from menus. The point is the landmark's location with a coarse accuracy, such as 300–800 m.
- **WhatsApp users** can share a location pin. App users capture GPS.
- Seed landmarks from OSM POIs (churches, markets, schools, carrefours, pharmacies). Let artisans and customers add aliases, since local names differ from OSM names, and moderate them.

### Gaps
- HERE and Esri geocoding coverage for Douala and Yaoundé is unknown. The AWS docs link to vendor coverage pages, which were not retrieved. Test-geocode 100 real Cameroonian addresses and landmarks before relying on Amazon Location.
- No quantified OSM completeness metric was found for Douala or Yaoundé.
- what3words or plus-codes adoption in Cameroon was not researched.

---

## 5. Matching and ranking engine (lessons from Uber, Thumbtack, TaskRabbit, Urban Company, Angi, DoorDash, Airbnb) and fair pricing

### Takeaway
Use a **two-stage retrieve-then-rank** pipeline with explicit **exploration and fairness slots** for new artisans and **uncertainty-aware reputation** scores. Dispatch to a small top-k with an acceptance window, not a single winner. Start with a transparent weighted scoring function, log everything, and graduate to learning-to-rank once there are thousands of labelled outcomes. Stable-matching and global-optimisation formulations are overkill until urgent-job volume is high.

### Cited Findings
**Thumbtack**
- Thumbtack moved its ranking from heuristics to machine learning, A/B-testing new algorithms heavily — [Thumbtack Engineering](https://medium.com/thumbtack-engineering/our-transition-to-machine-learning-in-search-ranking-to-match-customers-and-professionals-68fb29e39899); [Thumbtack Engineering – Evolution of Search Ranking](https://medium.com/thumbtack-engineering/evolution-of-search-ranking-at-thumbtack-f7a69fd0da13).
- It built a simulator that replays historical searches on two algorithms to compare them — [Thumbtack Engineering](https://medium.com/thumbtack-engineering/qualitative-evaluation-of-search-ranking-algorithms-1f492b8418c4).
- A Thumbtack paper measures **position bias** using randomized allocation. It states that the ideal ranking gives the highest likelihood of the best match — [arXiv 2206.11720](https://arxiv.org/pdf/2206.11720v1).
- Thumbtack classifies marketplace health by supply and demand conditions and studies supply-constrained markets — [Thumbtack Engineering](https://medium.com/thumbtack-engineering/improving-efficiency-of-thumbtacks-online-marketplace-35094d08d4cf).
- Thumbtack shifted from asynchronous matching to synchronous "instant match" — [Software Engineering Daily](https://softwareengineeringdaily.com/2017/11/27/marketplace-matching-with-xing-chen/). It now runs "millions of matches per week" — [Thumbtack careers](https://careers.thumbtack.com/jobs/7169477).

**DoorDash**
- DoorDash's dispatch optimisation generates future states for each possible matching, models dasher-to-order assignment with binary variables, and picks the best action — [DoorDash Engineering (Holly Jin)](https://careers.doordash.com/?p=1350).
- Its "DeepRed" system pairs ML predictions with an optimisation layer that makes final offers — [DoorDash Engineering](https://careers.doordash.com/?p=5342).
- Assignment decisions unfold over time, which makes pre/post analysis unreliable and calls for special experimentation — [DoorDash Engineering](https://careersatdoordash.com/?p=3183).
- A May 2026 post covers causal ML for jointly optimising batching against incentive cost — [DoorDash Engineering](https://careersatdoordash.com/?p=16159).

**Uber**
- Uber computes surge from supply and demand in H3 hexagons — [Uber Engineering – H3](https://www.uber.com/en/blog/h3/).

**Airbnb**
- **Cold start:** Airbnb replaced a default engagement value for new listings with a learned estimate. This gave +14% bookings for new listings and +0.4% overall in an A/B test — [arXiv 2002.05515](https://arxiv.org/pdf/2002.05515.pdf).
- **Diversity:** a companion network scores a listing's similarity to listings already placed, to diversify results below the top slot — [Airbnb Engineering – Learning To Rank Diversely](https://medium.com/airbnb-engineering/learning-to-rank-diversely-add6b1929621).
- **New-listing boost:** third parties disagree on whether Airbnb's boost still exists — [AirDNA](https://www.airdna.co/blog/airbnb-new-listing-boost); [PriceLabs](https://hello.pricelabs.co/blog/airbnb-launch/).

**Fairness and rating methods**
- **Fairness of exposure** (Singh & Joachims, KDD 2018): ranking systems owe obligations to the items they rank. Fairness is expressed as constraints on exposure allocation, and the algorithms maximise user utility subject to those constraints — [arXiv 1802.07281](https://arxiv.org/abs/1802.07281).
- **Wilson score lower bound:** rank by the lower bound of the Wilson confidence interval on the positive-rating proportion. Plain average rating ignores sample size, and positive-minus-negative ignores proportion — [Evan Miller](https://www.evanmiller.org/how-not-to-sort-by-average-rating.html).

### Inferences
**Reference matching pipeline**

1. **Intake:** a request has a trade/skill (taxonomy), a location (H3 r8 + point), urgency (now / today / scheduled), a budget hint, and optional photos.
2. **Candidate retrieval** (SQL, under 50 ms):
   - artisans with that skill, in ring k≤2–3 of the request cell
   - status active and verified level ≥ the threshold for the job category
   - not blocked, not overloaded (open jobs < cap), available in the time window
   - limit about 200
3. **Feature assembly:**
   - distance or ETA
   - reputation (Wilson lower bound of positive outcomes, completion rate, dispute rate, vouch-graph trust score)
   - responsiveness (median reply time, acceptance rate)
   - price fit (quote history versus the request's band)
   - recency of activity, specialisation match
   - new-artisan flag and exposure deficit
4. **Scoring at MVP** (transparent, tunable via config):
   `score = w1·trust_lcb + w2·f(distance) + w3·responsiveness + w4·price_fit + w5·availability − w6·load + exploration_bonus`
   Keep weights in AWS AppConfig or a DB table so ops can tune per city. **Log** every impression, position, contact, quote, hire and outcome for later learning-to-rank (LightGBM `lambdarank`) and position-bias correction (Thumbtack's randomisation approach).
5. **Fairness and exploration:**
   - Reserve 1 of every 5 slots, or a share of dispatches, for an **exploration pool**: new artisans with no reviews but with verification and vouches.
   - Choose among them by Thompson sampling over a Beta prior.
   - Track cumulative exposure per artisan per zone. Penalise over-exposed artisans, after the Singh & Joachims exposure-fairness idea, so a few top artisans do not capture all demand.
   - This also solves cold start, mirroring Airbnb's finding that better new-listing handling lifted new-listing bookings materially.
6. **Dispatch mode:**
   - **Scheduled jobs:** show a ranked shortlist of 3–5 (Thumbtack-style) and let the customer choose, or collect quotes within a window.
   - **Urgent jobs** (plumbing leak, lockout): broadcast offers to the top 3 with a 2–5 minute acceptance window, cascading to the next 3. When concurrent urgent requests in a zone exceed about 20 per minute, switch to batched assignment every N seconds with the Hungarian algorithm (SciPy `linear_sum_assignment`) on a cost matrix. That is the DoorDash "ML predictions + optimisation layer" pattern in miniature.
   - Gale-Shapley stable matching is not needed. Both sides do not hold full preference lists in this market.
7. **Evaluation:** offline replay simulator (Thumbtack) plus online A/B tests. For dispatch-policy changes, use switchback tests (time/zone randomisation), since assignment effects spill over (DoorDash).

**Fair pricing engine**
- Collect `price_observations(job_category, h3_r7, city, materials_included, quoted_price, final_price, date)` from completed jobs and quotes.
- Publish **price bands** per category and zone (P25–P75 of final prices over the last 90 days, minimum sample of 20, falling back to city level and then national level). Show them to customers ("typical: 8,000–15,000 FCFA") and artisans ("your quote is above typical").
- Flag outlier quotes (> P90) for gentle nudges, not blocks.
- Unlike Uber, do not do dynamic surge at MVP. Surge in an informal artisan market risks trust damage. Uber-style hex supply/demand data can still drive *incentives* (for example, bonus exposure for artisans in under-supplied hexes).

### Gaps
- No primary engineering posts from **TaskRabbit, Urban Company or Angi** on matching were retrieved this session; the search budget ran out. Rely on other researchers' coverage or a follow-up.
- No published evidence was found on how exposure-fairness constraints affect retention in African informal-labour marketplaces.

---

## 6. Reputation computation pipeline: event sourcing, graph storage (Neptune vs NetworkX vs Postgres recursive), batch vs streaming recompute, feature store

### Takeaway
Treat every trust signal as an **immutable domain event** written transactionally (outbox pattern) next to the state change. Maintain **incremental aggregates** in near-real time (Lambda consumers). Run a **nightly batch graph recompute** (vouch graph trust propagation, collusion/fraud detection) in Python on Fargate, with results snapshotted to Postgres and S3. Neptune Analytics is a later, optional accelerator, not an MVP dependency.

### Cited Findings
- **Neptune Analytics** is billed by memory-optimised Neptune Capacity Units (m-NCU) at a fixed hourly cost per graph — [AWS Prescriptive Guidance – Neptune Analytics cost](https://docs.aws.amazon.com/prescriptive-guidance/latest/neptune-analytics-well-architected-framework/cost-optimization-pillar.html).
- It supports openCypher, built-in graph algorithms, and loading from S3 or a Neptune Database — [Neptune features](https://aws.amazon.com/neptune/features/).
- **Neptune Serverless** applies only to Neptune Database, not Analytics — [Neptune pricing](https://aws.amazon.com/neptune//pricing); [AWS News Blog](https://aws.amazon.com/blogs/aws/introducing-amazon-neptune-serverless-a-fully-managed-graph-database-that-adjusts-capacity-for-your-workloads).
- **EventBridge Pipes** can connect a source (such as SQS, Kinesis or DynamoDB Streams) through filter and enrichment to a target (such as Step Functions), billing only filtered-in events — [EventBridge Pipes docs](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html).
- **Wilson lower bound** is a principled way to rank with sparse ratings — [Evan Miller](https://www.evanmiller.org/how-not-to-sort-by-average-rating.html).
- **Amazon Fraud Detector** is closed to new customers as of 7 Nov 2025. AWS recommends AutoGluon on SageMaker AI, and AWS WAF Fraud Control (rules-based, not ML) for fake-account creation — [Fraud Detector availability change](https://docs.aws.amazon.com/frauddetector/latest/ug/frauddetector-availability-change.html).

### Inferences
**Event catalogue (minimum)**
- `ArtisanRegistered`, `IdentityVerified(level)`, `SkillCertified`
- `VouchGiven(voucher, vouchee, relationship, stake)`, `VouchRevoked`
- `JobRequested`, `QuoteSubmitted`, `JobAccepted`, `JobStarted(geo, photo)`, `JobCompleted(completion_code_verified)`
- `PaymentConfirmed(mobile_money_ref)`, `ReviewSubmitted(stars, tags, text, media)`
- `DisputeOpened`, `DisputeResolved(outcome)`, `NoShowReported`, `ReportFiled`, `ModerationAction`

**Write path**
- The API writes the state change plus an `outbox` row in one Postgres transaction.
- An outbox relay publishes to EventBridge: either a Lambda polling with `SELECT … FOR UPDATE SKIP LOCKED`, or logical replication/CDC later.
- EventBridge rules fan out to SQS queues per consumer: `reputation-incremental`, `notifications`, `analytics-firehose`, `fraud-signals`.

**Incremental layer (seconds)**
- A Lambda consumer updates `artisan_stats`: counts, completion rate, dispute rate, response time, and a Wilson lower bound on "good outcome" = completed AND no dispute AND rating ≥ 4.
- It applies **time decay** (for example, a 12-month half-life) so old behaviour fades.
- Reviews are counted only when tied to a `JobCompleted` with a verified completion code and payment reference. This anti-fake-review rule is the key trust lever.

**Batch layer (nightly, Step Functions → Fargate task)**
- Load vouch, job and review edges from Postgres or S3 Parquet into **NetworkX** (or igraph or rustworkx for speed).
- Compute personalised-PageRank or EigenTrust-style trust propagation, seeded from verified anchors such as ops-verified artisans, trade associations and community leaders.
- Detect collusion with dense-subgraph and reciprocal-review rings, many reviews from new accounts sharing devices or numbers, and rapid vouch bursts.
- Write `reputation_snapshots(artisan_id, as_of, trust_score, components jsonb, model_version)` back to Postgres, and Parquet to S3 for audit and explainability.
- **Scale note:** even 1M artisans × about 20 edges is about 20M edges, which fits on one large Fargate or EC2 task in memory with igraph or rustworkx. Neptune Analytics becomes attractive only if interactive multi-hop queries are needed online, or the graph outgrows single-node memory.

**Online graph queries** (for example, "do I know anyone who vouched for this artisan?") can be served at MVP scale by **Postgres recursive CTEs** limited to 2–3 hops, with indexes on `(voucher_id)` and `(vouchee_id)`.

**Feature store.** Skip SageMaker Feature Store initially. Use Postgres `artisan_features` (online) and S3 Parquet partitions (offline, point-in-time correct by `as_of`). Revisit when there is a dedicated ML team.

**Explainability.** Store component scores so the app, USSD or SMS can say *why* an artisan is trusted: "12 verified jobs, 3 vouches from verified neighbours, 0 disputes". This is essential for a trust product.

**Fraud ML.** Because Fraud Detector is closed, use AutoGluon or LightGBM trained offline (SageMaker AI or plain Fargate), with WAF Bot Control and Fraud Control rules at the edge for sign-up abuse.

### Gaps
- No primary benchmarks of NetworkX, igraph or rustworkx at 10–50M edges were gathered this session.
- Neptune Analytics m-NCU prices for eu-west-3 were not retrieved.
- No published reputation-system designs specific to African informal artisan markets were found here; other researchers may cover them.

---

## 7. Omnichannel ingestion: USSD, SMS, WhatsApp, voice/IVR and app; adapter pattern; session state; idempotency; queues

### Takeaway
Build one **Conversation Core** (channel-agnostic intents, slots and state machine) behind thin **channel adapters**.
- **WhatsApp:** AWS End User Messaging Social, available in Paris, Ireland, Milan and Cape Town.
- **SMS:** AWS End User Messaging SMS. Cameroon supports sender IDs, short codes and two-way SMS.
- **USSD:** has no AWS service. It needs a local aggregator or a direct MNO agreement.
- **Voice:** Amazon Connect is not in Paris or Ireland, and its Cameroon number support is unverified. Plan a third-party SIP/voice provider bridged to Lex or Lambda.

Use DynamoDB TTL for session state, provider message IDs as idempotency keys, and SQS FIFO keyed by phone number for per-user ordering.

### Cited Findings
**WhatsApp**
- AWS End User Messaging Social provides managed WhatsApp Business messaging (since Oct 2024).
  - Inbound messages arrive via an SNS topic, which can trigger Lambda.
  - Messaging is template-first.
  - Billing is unified in AWS, and WhatsApp cost metrics appear in CloudWatch.
  - [AWS Messaging Blog](https://aws.amazon.com/blogs/messaging-and-targeting/send-whatsapp-business-messages-with-aws-end-user-messaging-social/); [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2024/10/conversations-whatsapp-aws-end-user-messaging-social); [EUM Social – sending messages](https://docs.aws.amazon.com/social-messaging/latest/userguide/send-message.html)
- The service is available in af-south-1, eu-west-3, eu-south-1 and eu-west-1, among others, with a default quota of 25 WhatsApp Business Accounts per region — [AWS EUM endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/end-user-messaging.html).
- WhatsApp can disable a business account for policy violations or failed identity verification — [Amazon Connect WhatsApp docs](https://docs.aws.amazon.com/connect/latest/adminguide/whatsapp-integration.html).

**SMS**
- **Cameroon (CM, +237)** on AWS End User Messaging SMS: short codes Yes, long codes No, sender IDs Yes, two-way SMS Yes, international sending Yes — [AWS SMS supported countries](https://docs.aws.amazon.com/sms-voice/latest/userguide/phone-numbers-sms-by-country.html).
- There is a conflict on sender-ID registration. A Cameroon-specific AWS page snippet states that **sender-ID registration is required** for Cameroon — [AWS Cameroon registration page (search snippet)](https://docs.aws.amazon.com/end-user-messaging/latest/userguide/nx-country-reg-cm.md). The main table shows plain "Yes" rather than "Registration required", and the dedicated page returned 404 when fetched. Treat registration as required.
- AWS warns that **SMS in each country is provisioned through a single carrier partner, creating a single point of failure**. It recommends redundant channels (WhatsApp, push, voice, email) and phone pools — [AWS SMS supported countries](https://docs.aws.amazon.com/sms-voice/latest/userguide/phone-numbers-sms-by-country.html).
- **Sender-ID rules:** no numeric-only IDs, at most 11 characters, letters/digits/dashes only, and registration per sending region where required — [AWS Sender IDs](https://docs.aws.amazon.com/sms-voice/latest/userguide/sender-id.html). Self-service sender-ID registration was expanded to 19 more countries in January 2025 — [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2025/01/aws-end-user-messaging-self-service-id-registration).
- **Default SMS quotas:** a spending threshold of USD 1 per account (raise it before launch) and 1 message per second per recipient — [AWS EUM endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/end-user-messaging.html).

**Voice and IVR**
- Amazon Connect is in af-south-1, eu-central-1 and eu-west-2, among others, **not eu-west-3, eu-west-1 or eu-south-1**.
  - From af-south-1, outbound campaigns can call only South African numbers.
  - Cape Town supports SMS and WhatsApp messaging integrations.
  - [Amazon Connect regions](https://docs.aws.amazon.com/connect/latest/adminguide/regions.html)
- Amazon Lex V2 supports fr_FR, fr_CA, fr_BE*, en_GB, en_US and en_ZA, among others, but **no Cameroonian languages or Cameroonian Pidgin English**. French is not among the locales excluded from af-south-1 — [Amazon Lex V2 languages](https://docs.aws.amazon.com/lexv2/latest/dg/how-languages.html).

**USSD**
- No AWS USSD service was found.
- A competitor's blog lists Africa's Talking USSD markets as Kenya, Uganda, Tanzania, Rwanda, Ghana, Nigeria, Malawi, Zambia and South Africa, which **excludes Cameroon**. This is not a primary source — [HelloDuty](https://helloduty.com/blogs/countries-supported-by-africas-talking-ussd-api).
- Cameroon has a national USSD code, #237#. MTN states it does not administer #237# — [Osiris](https://osiris.sn/le-cameroun-premier-africain-a-mettre-sur-pied-un-code-ussd-national-a-travers.html).
- Orange Money uses #150# and MTN money transfer uses *126# — [Osiris](https://www.osiris.sn/Avec-Campost-le-Cameroun-lance.html).
- Cameroon's regulator (ART) met MTN and Orange in September 2026 on network quality and coverage — [TechAfrica News](https://techafricanews.com/2026/09/15/cameroon-regulator-mtn-orange-network-quality-coverage/).

**Pinpoint**
- Amazon Pinpoint reached **end of support on 30 Oct 2026**: the console and its endpoints, segments, campaigns, journeys and analytics are gone. The SMS, voice, push, OTP and phone-validation APIs continue under AWS End User Messaging — [Amazon Pinpoint](https://aws.amazon.com/pinpoint/); [Pinpoint SMS/Voice v2 docs](https://docs.aws.amazon.com/pinpoint/latest/developerguide/sms-voice-v2.html).

### Inferences
**Architecture**
```
[USSD aggregator / MNO] --HTTPS--> API GW /ussd    --> UssdAdapter λ  --\
[EUM Social (WhatsApp)] --SNS-->   WhatsAppAdapter λ                  ---> Conversation Core (FastAPI svc / λ)
[EUM SMS two-way]       --SNS-->   SmsAdapter λ                       ---/   - intent/slot state machine (per channel UX)
[Voice SIP provider]    --webhook-> VoiceAdapter λ (+ Lex fr/en)     --/    - session state: DynamoDB (PK=channel#msisdn, TTL)
[Mobile app / PWA]      --HTTPS--> API GW /v1/*    --> FastAPI         ---> Domain services (Postgres) + EventBridge
Outbound: Notification svc (SQS) -> channel ladder: push -> WhatsApp (template) -> SMS -> voice call
```
- **Canonical message:** `InboundMessage{channel, provider_msg_id, msisdn(E.164), locale, text|selection|location|media_ref, received_at}`. Adapters only translate. All business logic lives in the core.
- **USSD specifics:**
  - USSD is synchronous and session-bound. The aggregator calls the endpoint per keypress, and the reply must arrive in about 1–2 s, so keep this path in-region, warm (SnapStart, or provisioned concurrency for this single function), and free of DB joins.
  - Read menus from a cached config. Store session state in DynamoDB with a TTL of a few minutes.
  - Commit side effects (create the job request) asynchronously via SQS, and confirm by SMS.
- **Idempotency:** key = `channel + provider_msg_id` (WhatsApp message ID, SMS message ID, USSD session ID + step). Use the Powertools idempotency decorator with DynamoDB. Webhooks *will* be retried.
- **Ordering:** SQS FIFO with `MessageGroupId = msisdn` keeps one user's messages in order while scaling across users.
- **Fallback ladder:**
  - Try push for app users, then a WhatsApp template, then SMS, then a voice robocall for critical events such as job acceptance or a disputed payment.
  - Track delivery receipts. This follows AWS's own single-carrier-SPOF warning.
  - Register a sender ID (for example "ARTISAN-CM", within 11 characters) early.
  - Obtain a short code if two-way SMS volume justifies it.
- **USSD and voice vendor strategy:** procure a Cameroon-licensed aggregator with MTN and Orange USSD shortcodes and local DIDs. Africa's Talking appears not to cover Cameroon; confirm this. Integrate via HTTPS webhooks. That is the one place a non-AWS service is unavoidable. Keep the adapter interface vendor-neutral, so a vendor swap only means a new adapter.
- **Language:** support French and English UX copy from day one. Pidgin and local-language voice prompts can be pre-recorded audio rather than TTS/ASR, since Lex has no support.

### Gaps
- Cameroon-specific USSD aggregator options, pricing and MNO shortcode licensing were not found. Africa's Talking's own country list was not retrieved.
- AWS SMS per-message price to Cameroon and sender-ID registration lead time were not retrieved.
- Whether Amazon Connect can claim Cameroonian (+237) DIDs from af-south-1 was not verified (assume not).
- WhatsApp penetration in Cameroon was not found. DataReportal reports only aggregate social-media identities (section 14).

---

## 8. Event-driven design backbone

### Takeaway
Use EventBridge (custom bus per environment) for domain events, SQS for every consumer (DLQ + redrive), Step Functions for long-running job workflows with timers, and EventBridge Pipes for simple point-to-point stream plumbing. Keep events small, versioned and schema-registered.

### Cited Findings
- EventBridge Pipes are meant for point-to-point source → filter → enrich → target integrations. Event buses suit many-to-many routing. You pay only for events that match filters — [EventBridge Pipes docs](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html).
- The Powertools idempotency utility guards retried consumers — [Powertools idempotency docs](https://docs.powertools.aws.dev/lambda/python/stage/utilities/idempotency/).
- The cell-based architecture guidance discourages cross-cell dependencies and shared databases — [AWS cell-based architecture whitepaper](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/reducing-scope-of-impact-with-cell-based-architecture.html); [Third-party summary](https://hidekazu-konishi.com/entry/cell_based_architecture_and_shuffle_sharding_on_aws.html).

### Inferences
- **Event envelope:** `{event_id (UUIDv7), type, version, occurred_at, tenant/country, cell_id, actor, subject_id, payload, trace_id}`. Store schemas in the EventBridge Schema Registry or as Pydantic models in a shared package, with codegen.
- **Job lifecycle as a Step Functions Standard workflow per job**, with wait states for quote windows, reminders, auto-close, and a review prompt 24 h after completion. Express workflows suit short, high-volume orchestrations such as media processing.
- **No Kinesis at MVP.** EventBridge + SQS covers throughput up to the 1M-MAU stage for this domain. Add Kinesis Data Streams or Firehose only for clickstream and analytics firehoses.

### Gaps
- EventBridge regional quotas (PutEvents TPS in eu-west-3) were not retrieved.

---

## 9. Media pipeline: photo and video proof, compression, Rekognition moderation, CloudFront

### Takeaway
Use direct-to-S3 presigned uploads after client-side compression. A Lambda generates derivatives (Pillow) and runs Rekognition **DetectModerationLabels** (JPEG/PNG only). Store private proof media behind CloudFront signed URLs. Moderate video by sampling frames rather than with the full video API.

### Cited Findings
- **DetectModerationLabels** detects unsafe content in JPEG or PNG images, passed as bytes or an S3 reference — [Rekognition API reference](https://docs.aws.amazon.com/rekognition/latest/APIReference/API_DetectModerationLabels.html).
- It is billed per image as a "Group 2" API, with tiered volume pricing. Running multiple APIs on one image counts as multiple images — [Rekognition pricing](https://aws.amazon.com/rekognition/pricing/). Rekognition image API prices were cut by up to 38% in November 2021 — [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2021/11/amazon-rekognition-pricing-apis).
- Some customers sample video frames and send them to DetectModerationLabels instead of using the video moderation API — [AWS ML Blog](https://aws.amazon.com/blogs/machine-learning/how-to-decide-between-amazon-rekognition-image-and-video-api-for-video-moderation).
- CloudFront has edges in Lagos, Nairobi, Johannesburg and Cape Town — [CloudFront features](https://aws.amazon.com/cloudfront/features/?m=1).
- Cameroon's median fixed download speed was 9.48 Mbps (January 2025) — [DataReportal](https://datareportal.com/reports/digital-2025-cameroon).

### Inferences
**Flow**
1. The app requests `POST /media/upload-url` (job ID, kind). The API returns a presigned PUT with a content-length cap (for example, 3 MB images and 20 MB videos).
2. The client compresses before upload: images to about 1280 px long edge at about 70–80% quality, video to 480p H.264 at no more than 30 s.
3. An S3 `ObjectCreated` event goes to SQS, then a Media Lambda. It:
   - validates the MIME type and size
   - converts to JPEG if needed (WebP/HEIC are not accepted by Rekognition)
   - calls DetectModerationLabels
   - computes a perceptual hash (`imagehash`) to detect reused "proof" photos across jobs, a fraud signal
   - strips public EXIF but keeps server-side capture metadata (timestamp, coarse H3 r9 of the device location at capture) as proof
   - writes derivatives (thumbnail and display) and a `media_assets` row
4. Flagged media is quarantined and enters a human moderation queue (back-office app).
5. **Delivery:** CloudFront with Origin Access Control. Portfolio photos are public and cached. Job-proof media uses signed URLs with a short TTL.

**Cost control**
- Lifecycle originals to S3 Intelligent-Tiering or Glacier Instant Retrieval after 90 days.
- Keep only derivatives hot.
- Moderate only user-facing media, not every internal proof image, if cost bites.

### Gaps
- Exact Group 2 per-image price in eu-west-3 was not retrieved. The pricing page example shows Group 1-style rates of $0.0010 per image for the first million, which is not confirmed for Group 2.
- Rekognition model accuracy on African skin tones and contexts for moderation was not researched. Plan a human-review sample.

---

## 10. Scaling patterns, multi-tenancy for new cities/countries, cell-based architecture, Well-Architected (6 pillars), SaaS Lens

### Takeaway
Scale along three axes:
- **Vertical within a region:** serverless autoscale, then Aurora readers, then Fargate.
- **Logical tenancy:** country and city as first-class `tenant` and `market` keys in every table and event.
- **Physical cells:** one cell per country or country group, with a thin global control plane and a cell router.

Start with a single cell ("cell-CM") but build cell-awareness into IDs, events and IaC from day one.

### Cited Findings
- A cell is a complete, independent instance of the workload. The data plane should keep running when the control plane fails.
  - Cross-cell dependencies and shared databases negate the benefits of cells.
  - Separate AWS accounts per cell are encouraged.
  - Deploy in waves, cell by cell.
  - [AWS – Reducing the Scope of Impact with Cell-Based Architecture](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/reducing-scope-of-impact-with-cell-based-architecture.html); [Cell design](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/cell-design.html); [Third-party summary](https://hidekazu-konishi.com/entry/cell_based_architecture_and_shuffle_sharding_on_aws.html)
- Cell-based architecture is codified in the Well-Architected Reliability pillar as **REL10-BP03 "Use bulkhead architectures"** — [AWS Well-Architected REL10-BP03](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_fault_isolation_use_bulkhead.md).
- The Well-Architected Framework has six pillars, covering reliable, secure, efficient, cost-effective and sustainable systems plus operational excellence. The Well-Architected Tool is free — [AWS cell-based whitepaper](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/reducing-scope-of-impact-with-cell-based-architecture.html).
- The **SaaS Lens** (published 4 April 2023) covers multi-tenant SaaS design on AWS and is available in the Well-Architected Tool's lens catalogue — [AWS SaaS Lens](https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/saas-lens.html).

### Inferences
**Scaling path**

| Stage | Users | Shape |
|---|---|---|
| **MVP** | hundreds – 10k | One AWS Organization with accounts `dev`, `staging`, `prod-cm`, `shared-services` (CI, ECR, logging). One cell in eu-west-3. Lambda (FastAPI via LWA) + Aurora Serverless v2 (min 0.5 ACU prod, 0 ACU dev) + DynamoDB + EventBridge/SQS/Step Functions + S3/CloudFront. Single-AZ is acceptable for non-prod only; prod runs Multi-AZ for Aurora (writer + 1 reader). |
| **Growth** | 10k – 300k | Add RDS Proxy, Aurora read replicas for search and analytics, ElastiCache Serverless (Valkey) for hot artisan cards and menu config, a data lake (Firehose → S3 → Glue/Athena), and a nightly reputation batch on Fargate. Introduce learning-to-rank. Second city (Douala → Yaoundé → Bafoussam/Bamenda) is just new `market` rows, no new infrastructure. |
| **Scale** | 300k – 1M+ (Cameroon) | Move the main HTTP API to ECS Fargate on Graviton behind ALB (same image). Keep Lambda for event consumers and channel adapters. Aurora writer scaled up, I/O-Optimized configuration evaluated, partitioning of large tables (jobs, events) by month. OpenSearch only if Postgres FTS/geo latency degrades. |
| **Multi-country** | 1M → many millions | **Cell per country** (or per regulatory bloc, e.g., CEMAC francophone cell in eu-west-3, Nigeria/Kenya/SA cells in af-south-1 + Local Zones). A **global control plane** (small) holds the cell directory (country → cell), global identity/phone-number index for cross-border artisans (hashed MSISDN → home cell), feature flags and the taxonomy. A **cell router**: E.164 country code (+237, +234, +254…) is a natural, stable partition key for USSD/SMS/WhatsApp traffic. App traffic routes by account's home cell. Deploy cell-by-cell in waves. |

**Multi-tenancy model**
- Use a *pooled* model inside a cell: shared tables with `country_code` and `market_id` columns, and Postgres row-level security as defence in depth.
- Use *siloed* cells across countries, for data residency and blast radius.
- This maps to the SaaS Lens's silo/pool vocabulary, from general AWS SaaS guidance. The Lens text body was not quoted here.

**Well-Architected applied (six pillars)**
- **Operational excellence:** IaC for everything, runbooks, game days, Powertools structured logs, deployment waves per cell.
- **Security:**
  - IAM least privilege and GitHub OIDC (no static keys).
  - KMS encryption, Secrets Manager.
  - WAF on API Gateway/CloudFront with rate limits per MSISDN and IP.
  - PII minimisation: hash MSISDN in analytics, encrypt national ID images in a separate bucket with tight access.
  - Audit trail via the event log.
- **Reliability:**
  - Multi-AZ Aurora, DLQs everywhere, idempotent consumers.
  - Channel fallback ladder.
  - Cross-region backups, cells.
- **Performance efficiency:** H3 precomputation, caching, SnapStart, Graviton.
- **Cost optimisation:** scale-to-zero non-prod, on-demand DynamoDB, lifecycle policies, Savings Plans after 6 months of stable usage, and budgets/alerts per account.
- **Sustainability:** Graviton, right-sized media, fewer always-on resources.

### Gaps
- Cell-router implementation patterns specific to USSD and SMS aggregators were not found. Aggregators may support only one webhook per shortcode, which forces a global ingress router. This is a design risk to validate with vendors.

---

## 11. Cost: 2025 free-tier changes, AWS Activate credits, estimated monthly cost at 1k / 100k / 1M users

### Takeaway
New AWS accounts (from 15 July 2025) get a credit-based free plan: $100 of credits, rising to $200 with onboarding tasks, for up to 6 months. AWS Activate adds $1k (Founders) up to $100k–$200k (Portfolio via an accelerator or VC). **Infrastructure cost is modest compared with messaging cost.** In Africa, SMS, WhatsApp template and USSD session fees will probably dominate the bill and must be modelled per interaction.

### Cited Findings
**Free plan**
- New customers can receive up to $200 in AWS credits under a new Free plan, announced 16 July 2025 — [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan); [AWS News Blog](https://aws.amazon.com/blogs/aws/aws-free-tier-update-new-customers-can-get-started-and-explore-aws-with-up-to-200-in-credits).
- The plan starts with $100 in credits plus up to $100 more for onboarding activities. It ends after 6 months or when credits run out. Accounts created before 15 July 2025 stay on the legacy free tier — [Builder Center summary](https://builder.aws.com/content/30mPEVUw3fzFwtEzPurrkoRXAIO/aws-free-tier-2025-whats-free-and-for-how-long); [Neowin](https://www.neowin.net/news/aws-free-tier-overhauled-new-users-get-200-in-credits-but-theres-a-catch/).

**AWS Activate**
- **Founders:** $1,000 in credits for self-funded startups — [AWS Activate Founders](https://aws.amazon.com/de/activate/founders/).
- **Portfolio:** up to $100,000 on older AWS pages, and **up to $200,000** on newer AWS pages, for provider-backed startups — [AWS Activate credits](https://aws.amazon.com/startups/credits); [AWS Startups – everything about Activate credits](https://aws.amazon.com/aws-startups/learn/everything-you-need-to-know-about-aws-activate-credits/). The sources conflict, so verify the figure at application time.
- **Eligibility:** pre-Series B, founded within 10 years, with a company website and a paid-tier account — [AWS Activate credits](https://aws.amazon.com/startups/credits).

**Unit prices used below**
- Lambda $0.20 per 1M requests and $0.0000166667 per GB-s (us-east-1), with a free allowance of 1M requests and 400k GB-s — [Lambda pricing](https://aws.amazon.com/lambda/pricing/).
- DynamoDB on-demand prices were halved in November 2024 — [AWS Database Blog](https://aws.amazon.com/blogs/database/new-amazon-dynamodb-lowers-pricing-for-on-demand-throughput-and-global-tables/).
- Aurora Serverless v2 can pause at 0 ACU — [Aurora auto-pause docs](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html).

### Inferences
**Order-of-magnitude monthly estimates, infrastructure only, excluding messaging fees**

**Assumptions:**
- About 300 API/webhook calls per MAU per month, Lambda at 512 MB × 200 ms average.
- Two media uploads per active user per month, about 300 KB each after compression.
- Aurora prod as Multi-AZ writer + reader.
- Prices are us-east-1-like list prices. EU and af-south-1 are typically somewhat higher, and Aurora ACU-hour and API Gateway prices were **not verified this session**. Treat these as planning ranges and re-run in the AWS Pricing Calculator for eu-west-3.

| Line item | 1k MAU | 100k MAU | 1M MAU |
|---|---|---|---|
| Lambda (API + consumers) | ~$0–5 (inside free allowance) | ~$55 (30M req: $6 + ~3M GB-s: ~$50) | ~$560 on Lambda; consider Fargate API (~$400–900) |
| API Gateway (HTTP API) | <$1 | ~$30 | ~$300 (or ALB ~$50–150 if on Fargate) |
| Aurora PostgreSQL (Serverless v2 / provisioned) | ~$50–100 (0.5 ACU min writer; reader optional at MVP) | ~$500–900 (avg 2–4 ACU writer + reader) | ~$3,000–7,000 (larger writer, 2 readers, I/O) |
| RDS Proxy | – | ~$50–100 | ~$200–400 |
| DynamoDB (sessions, idempotency) | <$5 | ~$30–80 | ~$300–600 |
| S3 + CloudFront (media) | <$5 | ~$50–150 | ~$500–1,500 |
| Rekognition moderation | ~$2 | ~$200 (200k images at ~$0.001) | ~$1,600–2,000 (2M images, tiered) |
| EventBridge/SQS/Step Functions | <$5 | ~$50–150 | ~$500–1,500 |
| CloudWatch/X-Ray/logs | ~$10–30 | ~$150–400 | ~$1,000–2,500 |
| ElastiCache Serverless, OpenSearch, data lake, batch | – | ~$100–300 | ~$1,500–4,000 |
| WAF, KMS, Secrets, Config, GuardDuty, backups | ~$20–40 | ~$100–250 | ~$500–1,000 |
| **Total infra (rough)** | **~$100–250/mo** | **~$1.5k–3k/mo** | **~$10k–22k/mo** |

- **The biggest avoidable MVP cost is the NAT Gateway** (always-on hourly charge per AZ). Keep Lambdas out of the VPC where possible: use the RDS Data API or VPC endpoints. This is general AWS guidance, not verified here.
- **Credits:** $200 (free plan) plus $1k (Founders) covers several months of MVP infrastructure. Portfolio credits ($100–200k) would cover the 100k-MAU stage for years. That is a strong reason to join an Activate-provider accelerator.
- **Messaging will dominate.** Per-MAU messaging (for example, 5 SMS + 10 WhatsApp template messages + 3 USSD sessions per month) could exceed the per-MAU infrastructure cost (~$0.01–0.03) by 10×. Design for **user-initiated WhatsApp conversations**, push notifications and in-app messaging to minimise paid outbound.

### Gaps
- Per-message prices for AWS SMS to Cameroon, WhatsApp conversation/template fees for Cameroon, and USSD aggregator per-session fees were not retrieved. These are the dominant cost drivers.
- Region-specific (eu-west-3, af-south-1) prices for Aurora, API Gateway and Fargate were not verified.

---

## 12. DevOps: IaC (CDK Python vs Terraform vs SAM), GitHub Actions, testing, observability (CloudWatch, X-Ray, OpenTelemetry), disaster recovery

### Takeaway
- **IaC:** AWS CDK in Python (same language as the backend, L2/L3 constructs, cell stamping via loops). SAM is a lighter option for Lambda-only stacks. Terraform is a good choice if the team already knows it.
- **CI/CD:** GitHub Actions with OIDC to AWS (no static keys). CodeCommit is GA again, but GitHub is recommended.
- **Observability:** Powertools Logger/Tracer/Metrics plus CloudWatch Application Signals and X-Ray. The old ADOT Python layer page is deprecated.
- **DR:** pilot-light in a second EU region via cross-region backups.

### Cited Findings
- **GitHub OIDC to AWS:**
  - Add `token.actions.githubusercontent.com` as an IAM OIDC provider with audience `sts.amazonaws.com`.
  - Trust a role through `sts:AssumeRoleWithWebIdentity`, with conditions on the `aud` and `sub` claims to restrict repository, branch or environment.
  - Workflows need `id-token: write` and use `aws-actions/configure-aws-credentials`.
  - Repositories created after 15 July 2026 use a `sub` format with immutable owner and repository IDs.
  - [GitHub Docs – OIDC in AWS](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws)
- **AWS CodeCommit returned to full general availability on 24 Nov 2025**, reversing the 2024 de-emphasis. New accounts can create repositories again. Git LFS was planned for Q1 2026 — [AWS DevOps Blog](https://aws.amazon.com/ko/blogs/devops/aws-codecommit-returns-to-general-availability/); [InfoQ](https://infoq.com/news/2025/12/aws-codecommit-ga); [The Register](https://www.theregister.com/2025/11/24/praise_amazon_for_reviving_codecommit_corey_quinn/).
- **AWS Cloud9** is closed to new customers (25 July 2024). AWS recommends the IDE Toolkits and CloudShell — [AWS DevOps Blog](https://aws.amazon.com/blogs/devops/how-to-migrate-from-aws-cloud9-to-aws-ide-toolkits-or-aws-cloudshell/).
- The legacy **ADOT Python Lambda layer** documentation is deprecated. It points to the current ADOT Lambda layers for **CloudWatch Application Signals** and to upstream OpenTelemetry Lambda — [ADOT Lambda Python](https://aws-otel.github.io/docs/getting-started/lambda/lambda-python).
- Cell-based architecture recommends deploying in waves, cell by cell — [AWS cell-based whitepaper](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/reducing-scope-of-impact-with-cell-based-architecture.html).

### Inferences
**Pipeline (GitHub Actions)**
- **On PR:** ruff, mypy or pyright, pytest (unit), pytest with testcontainers (Postgres + PostGIS, LocalStack or moto for AWS), schemathesis against the OpenAPI spec, `cdk synth` + cdk-nag security checks, and a `uv lock` check.
- **On merge to main:** build the container image and push it to ECR in a shared-services account, then `cdk deploy` to staging via OIDC.
- **Then:** smoke tests, including a synthetic USSD flow against a mock aggregator and a WhatsApp sandbox number.
- **Promote to prod** with Lambda aliases and CodeDeploy canary (10% for 10 min) and automatic rollback on CloudWatch alarms (5xx rate, p95 latency, DLQ depth).
- **Database migrations:** Alembic, expand/contract style, run as a one-off Fargate task before code rollout.

**Observability**
- Powertools Logger (JSON with `correlation_id = trace_id`, `msisdn_hash`, `channel`, `cell_id`), Tracer (X-Ray), and Metrics (EMF: `JobsRequested`, `MatchLatency`, `UssdTimeouts`, `WhatsAppDeliveryFailures`, `SmsDeliveryRate`, by `market`).
- CloudWatch dashboards per cell, and alarms to Slack/PagerDuty via SNS.
- **Business SLOs:**
  - time-to-first-artisan-response p50 under 15 min
  - USSD step latency p95 under 1.5 s
  - SMS delivery rate above 95%
- **Synthetic canaries** (CloudWatch Synthetics) from an EU region, plus a cheap **in-country probe** (an Android device or Raspberry Pi with an MTN/Orange SIM) for USSD and SMS end-to-end checks. Many failures will be in-country carrier problems, not AWS problems.

**DR**

| Store | Protection |
|---|---|
| Aurora | Automated backups, cross-region snapshot copy to eu-west-1 (RPO ≤ 24 h at MVP). Later, Aurora Global Database (RPO in seconds) at scale. |
| DynamoDB | PITR. Session data is disposable. |
| S3 | Versioning plus cross-region replication for media. |
| Infrastructure | IaC lets the stack be redeployed to eu-west-1 in hours (RTO 4–8 h at MVP). |

- Run a game day per quarter.
- The USSD/SMS vendor webhook URL should be a Route 53 name, so failover only needs a DNS change.

### Gaps
- No 2026 comparison of CDK versus Terraform adoption or pain points was gathered. The recommendation rests on language alignment.
- Application Signals support specifics for Python Lambda (cold-start overhead of the ADOT layer) were not retrieved.

---

## 13. Service-availability check: AWS services deprecated, closed or changed (verified Nov 2026)

### Takeaway
Avoid Pinpoint, Fraud Detector and Cloud9 for new builds. CodeCommit is usable again. Amazon Location Service works, but its data providers are weak for Cameroon.

### Cited Findings

| Service | Status (Nov 2026) | Use instead | Source |
|---|---|---|---|
| Amazon Pinpoint | **End of support 30 Oct 2026**. Console, segments, campaigns, journeys and analytics gone. SMS/voice/push/OTP APIs continue as AWS End User Messaging. | End User Messaging SMS/Voice/Push/Social; SES for email; own segmentation in Postgres/Athena | [AWS Pinpoint](https://aws.amazon.com/pinpoint/) |
| Amazon Fraud Detector | Closed to new customers 7 Nov 2025 | AutoGluon/SageMaker AI; AWS WAF Fraud Control | [AWS docs](https://docs.aws.amazon.com/frauddetector/latest/ug/frauddetector-availability-change.html) |
| AWS Cloud9 | Closed to new customers 25 Jul 2024 | IDE Toolkits, CloudShell | [AWS DevOps Blog](https://aws.amazon.com/blogs/devops/how-to-migrate-from-aws-cloud9-to-aws-ide-toolkits-or-aws-cloudshell/) |
| AWS CodeCommit | **Back to GA 24 Nov 2025** | (GitHub still recommended) | [InfoQ](https://infoq.com/news/2025/12/aws-codecommit-ga) |
| Lambda SnapStart (Python) | GA. Python 3.12+. All commercial regions except NZ and Taipei. | – | [AWS docs](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html) |
| Aurora Serverless v2 | Scale-to-zero GA (Nov 2024) | – | [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-aurora-serverless-v2-scaling-zero-capacity) |
| Amazon Location Service | Available. Providers Esri, HERE, Grab (SE Asia only), Open Data (no geocode/route). | OSM-based OSRM/Valhalla/Nominatim self-hosted for Cameroon | [AWS docs](https://docs.aws.amazon.com/location/previous/developerguide/what-is-data-provider.md) |
| ADOT legacy Python layer docs | Deprecated | ADOT layers for Application Signals | [ADOT](https://aws-otel.github.io/docs/getting-started/lambda/lambda-python) |

### Inferences
- **Amazon QLDB** has a reported end of support around July 2025. That is from training knowledge and was not verified this session. Do **not** design the "trust ledger" on QLDB. An append-only Postgres event table with hash chaining, plus S3 Object Lock for audit exports, achieves tamper-evidence.

### Gaps
- The QLDB end-of-support date and the status of other 2024–2025 deprecations (for example, App Runner changes and Timestream variants) were not verified this session.

---

## 14. Offline and unreliable networks, SMS fallbacks, power outages and shutdown risk in Cameroon

### Takeaway
Fewer than half of Cameroonians are online (41.9%), but mobile connections reach 86% of the population. Design **USSD/SMS-first with WhatsApp and app as richer layers**. Make the app offline-first with idempotent sync. Make every critical step completable via SMS. Assume carrier and political disruptions.

### Cited Findings
- **Cameroon, January 2025:**
  - population 29.5M
  - internet users 12.4M (41.9%), with 17.1M offline
  - cellular connections 25.5M (86.3% of population), some of which may be voice/SMS-only
  - social media identities 5.45M (18.5%)
  - median fixed download 9.48 Mbps, down 8.3% year on year
  - [DataReportal – Digital 2025 Cameroon](https://datareportal.com/reports/digital-2025-cameroon)
- AWS's SMS docs warn of single-carrier dependence per country and recommend multi-channel redundancy — [AWS SMS supported countries](https://docs.aws.amazon.com/sms-voice/latest/userguide/phone-numbers-sms-by-country.html).
- Cameroon's regulator held a session with MTN and Orange on network performance, security and coverage in September 2026, which points to ongoing quality concerns — [TechAfrica News](https://techafricanews.com/2026/09/15/cameroon-regulator-mtn-orange-network-quality-coverage/).
- The NCSCS (Kribi–Lagos) cable is reported at 92% utilisation, which points to international-capacity congestion risk — [Telecom Review Africa](https://mail.telecomreviewafrica.com/articles/telecom-operators/2407-mtn-globalconnect-and-camtel-accelerate-cameroon-s-fibre-network-and-digital-journey).

### Inferences
**Offline-first app**
- Local SQLite or Room storage with an outbox queue of commands, each with a client-generated UUIDv7 idempotency key.
- Background sync with exponential backoff, and delta sync endpoints (`/sync?since=cursor`).
- Media uploads are resumable (S3 multipart) and deferred to Wi-Fi or charging when the user opts in.
- A "lite mode" for low-RAM Android devices. A PWA is a secondary channel.

**Payload budget**
- Compact JSON responses (gzip/br) under 20 KB for list screens.
- Images served as WebP thumbnails through CloudFront.
- Avoid chatty APIs. Use BFF endpoints per screen.

**SMS-completable trust loop**
- The customer receives a 6-digit **job completion code** by SMS when the job starts. The artisan enters it (app, USSD or SMS reply) to mark completion.
- This proves co-presence without data connectivity and gates review eligibility (section 6).

**Power outages**
- Artisans' and customers' phones may die mid-flow, so all flows must be resumable.
- USSD session state expires quickly, so persist drafts server-side keyed by MSISDN for about 24 h and offer "continue your request?" on the next dial-in.

**Carrier failover**
- Use two SMS paths (AWS EUM plus a local aggregator) behind a routing table keyed by MNO prefix and delivery-rate health.
- Use USSD on both MTN and Orange.

**Shutdown and throttling risk (Anglophone regions)**
- Treat regional internet or social-media disruption as a design scenario: WhatsApp blocked but SMS and USSD working.
- The channel ladder and USSD/SMS completeness mitigate it.
- Report SLOs per region to detect it.

### Gaps
- Specific dates and durations of Cameroon internet shutdowns (for example, the widely reported 2017 Anglophone-region shutdown) could not be verified this session. The Wikipedia and Access Now pages fetched did not contain the details, and the search budget was exhausted. A follow-up should cite Access Now #KeepItOn data.
- No data was found on grid outage frequency in Douala and Yaoundé (ENEO load-shedding statistics) or on smartphone versus feature-phone share. These matter for channel mix and should come from the market/telecom researcher.

---

## Sources

1. TechNext – AWS launches Local Zone in Lagos (Jan 2023): https://technext.ng/2023/01/27/aws-launch-local-zones-location-lagos/
2. DatacenterDynamics – AWS Local Zone edge locations in Lagos, Lima, Querétaro: https://datacenterdynamics.com/en/news/aws-launches-local-zone-edge-locations-in-lagos-lima-and-quer%C3%A9taro
3. Connecting Africa – Lagos launches first AWS Local Zone in Africa: https://connectingafrica.com/cloud-networking/lagos-launches-first-aws-local-zone-in-africa
4. AWS – Local Zones locations: https://aws.amazon.com/about-aws/global-infrastructure/localzones/locations/
5. AWS – CloudFront key features (edge locations list): https://aws.amazon.com/cloudfront/features/?m=1
6. AWS – CloudFront details: https://aws.amazon.com/cloudfront/details
7. Nairametrics – AWS launches first CloudFront edge location in Nigeria (2023): https://nairametrics.com/2023/06/16/aws-launches-first-cloudfront-edge-location-in-nigeria
8. BusinessTech – CloudFront edge locations coming to Joburg and Cape Town: https://businesstech.co.za/news/?p=251801
9. Babasanmi & Chavula – Measuring Cloud Latency in Africa (IEEE CloudNet 2022): https://pubs.cs.uct.ac.za/1704/1/Measuring_Cloud_Latency_in_Africa.pdf
10. Economize – AWS latency eu-west-3 vs af-south-1: https://www.economize.cloud/resources/aws/latency/eu-west-3-vs-af-south-1/
11. Economize – AWS latency eu-south-2 vs af-south-1: https://www.economize.cloud/resources/aws/latency/eu-south-2-vs-af-south-1/
12. Kentik – Digging into cloud latency: https://kentik.com/blog/clm-chowder-digging-into-cloud-latency-azure-google-cloud-oci
13. Telecom Review Africa – MTN GlobalConnect and Camtel accelerate Cameroon's fibre network: https://mail.telecomreviewafrica.com/articles/telecom-operators/2407-mtn-globalconnect-and-camtel-accelerate-cameroon-s-fibre-network-and-digital-journey
14. ITWeb Africa – Camtel contracts MTN GlobalConnect to commercialise wholesale internet: https://itweb.africa/article/camtel-contracts-mtn-globalconnect-to-commercialise-wholesale-internet-abroad/KA3Ww7dDAdA7rydZ
15. Camtel Carrier – IPLC connectivity (cable landing points): https://carrier.camtel.cm/services/connectivity/iplc
16. ITWeb Africa – WE-Africa-NA promises stronger links: https://itweb.africa/article/we-africa-na-promises-stronger-links-between-africa-europe-and-the-us/RgeVDvPY63Q7KJN3
17. Communications Africa – Cameroon signs MoU for Medusa Africa cable: https://communicationsafrica.com/internet/cameroon-signs-mou-for-medusa-africa-cable
18. Osiris – Le Cameroun envisage une connexion au câble Medusa: https://osiris.sn/le-cameroun-envisage-une-connexion-au-cable-medusa-africa.html
19. Connecting Africa – Angola Cables, Camtel partner: https://connectingafrica.com/connectivity/angola-cables-camtel-partner-for-cross-border-connectivity
20. AWS What's New – Lambda SnapStart for Python and .NET (Nov 2024): https://aws.amazon.com/about-aws/whats-new/2024/11/aws-lambda-snapstart-python-net-functions
21. AWS What's New – SnapStart Python/.NET in 23 additional regions (Jun 2025): https://aws.amazon.com/about-aws/whats-new/2025/06/aws-lambda-snapstart-python-net-functions-23-regions
22. AWS Docs – Improving startup performance with Lambda SnapStart: https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html
23. AWS Docs – Lambda SnapStart runtime hooks for Python: https://docs.aws.amazon.com/lambda/latest/dg/snapstart-runtime-hooks-python.html
24. AWS – Lambda pricing: https://aws.amazon.com/lambda/pricing/
25. AWS Docs – Aurora Serverless v2 scaling to zero / auto-pause: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html
26. AWS What's New – Aurora Serverless v2 supports scaling to zero (Nov 2024): https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-aurora-serverless-v2-scaling-zero-capacity
27. AWS Database Blog – Introducing scaling to 0 capacity with Aurora Serverless v2: https://aws.amazon.com/blogs/database/introducing-scaling-to-0-capacity-with-amazon-aurora-serverless-v2
28. DEV Community – Scaling to zero with Aurora Serverless v2: https://dev.to/sudo_anuj/scaling-to-zero-with-amazon-aurora-serverless-v2-553n
29. AWS Database Blog – DynamoDB lowers pricing for on-demand throughput and global tables: https://aws.amazon.com/blogs/database/new-amazon-dynamodb-lowers-pricing-for-on-demand-throughput-and-global-tables/
30. Powertools for AWS Lambda (Python) – Idempotency: https://docs.powertools.aws.dev/lambda/python/stage/utilities/idempotency/
31. AWS Compute Blog – Handling Lambda idempotency with Powertools: https://aws.amazon.com/blogs/compute/handling-lambda-functions-idempotency-with-aws-lambda-powertools
32. Michael Walmsley – Powertools idempotency deeper dive: https://walmsles.medium.com/aws-lambda-powertools-idempotency-a-deeper-dive-40de7efe15b0
33. AWS Docs – Amazon EventBridge Pipes: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html
34. GitHub – awslabs/aws-lambda-web-adapter: https://github.com/awslabs/aws-lambda-web-adapter
35. AWS Builder Center – Deploy FastAPI to AWS in 60 seconds: https://builder.aws.com/content/3Ee4zoARhywavup2worwNXvD5rK/deploy-fastapi-to-aws-in-60-seconds
36. DEV Community (AWS) – Deploy FastAPI to AWS in 60 seconds: https://dev.to/aws/deploy-fastapi-to-aws-in-60-seconds-519o
37. AWS Builder Center – Deploy FastAPI to Lambda in minutes: https://builder.aws.com/content/3KHzA4aOtupX6ZZg04EwGFUpRX4/deploy-fast-api-to-aws-lambda-in-minutes
38. PyPI – Mangum: https://pypi.org/project/mangum/0.12.1
39. AWS Docs – Managing spatial data with PostGIS (Aurora PostgreSQL): https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Appendix.PostgreSQL.CommonDBATasks.PostGIS.html
40. Uber Engineering – H3: Uber's Hexagonal Hierarchical Spatial Index: https://www.uber.com/en/blog/h3/
41. H3 docs – Tables of cell statistics across resolutions: https://h3geo.org/docs/core-library/restable/
42. AWS Docs – Amazon Location data providers: https://docs.aws.amazon.com/location/previous/developerguide/what-is-data-provider.md
43. AWS Docs – GrabMaps in Amazon Location: https://docs.aws.amazon.com/location/previous/developerguide/grab.html
44. AWS What's New – Amazon Location adds GrabMaps in Southeast Asia: https://aws.amazon.com/about-aws/whats-new/2023/01/amazon-location-service-grabmaps-southeast-asia
45. AWS What's New – Open Data Maps for Amazon Location: https://aws.amazon.com/about-aws/whats-new/2023/03/amazon-location-service-open-data-maps
46. AWS Docs – HERE in Amazon Location: https://docs.aws.amazon.com/location/previous/developerguide/HERE.md
47. UN Maps – CityMapper Externship, Cameroon: https://maps.un.org/news/citymapper-externship-un-maps-community-ambassador-and-chapter-initiative-cameroon
48. OSM diary – CityMapper Externship 2026 UN Mappers in Cameroon: https://api.openstreetmap.org/user/ENGELBERT%20MODO/diary/408919
49. OSM Wiki – WikiProject Cameroon: https://wiki.openstreetmap.org/wiki/Cameroon
50. OSM diary – The State of OpenStreetMap in Africa 2023: https://www.openstreetmap.org/user/Kateregga1/diary/403280
51. Thumbtack Engineering – Our transition to ML in search ranking: https://medium.com/thumbtack-engineering/our-transition-to-machine-learning-in-search-ranking-to-match-customers-and-professionals-68fb29e39899
52. Thumbtack Engineering – Evolution of search ranking at Thumbtack: https://medium.com/thumbtack-engineering/evolution-of-search-ranking-at-thumbtack-f7a69fd0da13
53. Thumbtack Engineering – Qualitative evaluation of search ranking algorithms: https://medium.com/thumbtack-engineering/qualitative-evaluation-of-search-ranking-algorithms-1f492b8418c4
54. Demsyn-Jones (Thumbtack) – Position bias paper, arXiv 2206.11720: https://arxiv.org/pdf/2206.11720v1
55. Thumbtack Engineering – Improving efficiency of Thumbtack's online marketplace: https://medium.com/thumbtack-engineering/improving-efficiency-of-thumbtacks-online-marketplace-35094d08d4cf
56. Software Engineering Daily – Marketplace Matching with Xing Chen: https://softwareengineeringdaily.com/2017/11/27/marketplace-matching-with-xing-chen/
57. Thumbtack careers – Applied Scientist, Search & Matching: https://careers.thumbtack.com/jobs/7169477
58. DoorDash Engineering – Next-generation dispatch optimization (Holly Jin): https://careers.doordash.com/?p=1350
59. DoorDash Engineering – ML and optimization for dispatch (DeepRed): https://careers.doordash.com/?p=5342
60. DoorDash Engineering – Experimentation on real-time assignment: https://careersatdoordash.com/?p=3183
61. DoorDash Engineering – Causal ML and joint optimization (May 2026): https://careersatdoordash.com/?p=16159
62. Haldar et al. (Airbnb) – Improving Deep Learning for Airbnb Search, arXiv 2002.05515: https://arxiv.org/pdf/2002.05515.pdf
63. Airbnb Engineering – Learning To Rank Diversely: https://medium.com/airbnb-engineering/learning-to-rank-diversely-add6b1929621
64. AirDNA – Airbnb new listing boost: https://www.airdna.co/blog/airbnb-new-listing-boost
65. PriceLabs – Airbnb launch / new listing boost: https://hello.pricelabs.co/blog/airbnb-launch/
66. Singh & Joachims – Fairness of Exposure in Rankings, arXiv 1802.07281: https://arxiv.org/abs/1802.07281
67. Evan Miller – How Not To Sort By Average Rating: https://www.evanmiller.org/how-not-to-sort-by-average-rating.html
68. AWS Prescriptive Guidance – Neptune Analytics cost optimization pillar: https://docs.aws.amazon.com/prescriptive-guidance/latest/neptune-analytics-well-architected-framework/cost-optimization-pillar.html
69. AWS – Amazon Neptune features: https://aws.amazon.com/neptune/features/
70. AWS – Amazon Neptune pricing: https://aws.amazon.com/neptune//pricing
71. AWS News Blog – Introducing Amazon Neptune Serverless: https://aws.amazon.com/blogs/aws/introducing-amazon-neptune-serverless-a-fully-managed-graph-database-that-adjusts-capacity-for-your-workloads
72. AWS Docs – Amazon Fraud Detector availability change: https://docs.aws.amazon.com/frauddetector/latest/ug/frauddetector-availability-change.html
73. AWS Messaging Blog – Send WhatsApp Business messages with AWS End User Messaging Social: https://aws.amazon.com/blogs/messaging-and-targeting/send-whatsapp-business-messages-with-aws-end-user-messaging-social/
74. AWS What's New – Bring your conversations to WhatsApp with EUM Social (Oct 2024): https://aws.amazon.com/about-aws/whats-new/2024/10/conversations-whatsapp-aws-end-user-messaging-social
75. AWS Docs – Sending messages through WhatsApp with EUM Social: https://docs.aws.amazon.com/social-messaging/latest/userguide/send-message.html
76. AWS General Reference – AWS End User Messaging endpoints and quotas: https://docs.aws.amazon.com/general/latest/gr/end-user-messaging.html
77. AWS Docs – Amazon Connect WhatsApp integration: https://docs.aws.amazon.com/connect/latest/adminguide/whatsapp-integration.html
78. AWS Docs – Supported countries and regions for SMS (EUM SMS): https://docs.aws.amazon.com/sms-voice/latest/userguide/phone-numbers-sms-by-country.html
79. AWS Docs – Cameroon sender ID registration (search snippet; page returned 404 on fetch): https://docs.aws.amazon.com/end-user-messaging/latest/userguide/nx-country-reg-cm.md
80. AWS Docs – Sender IDs in AWS End User Messaging SMS: https://docs.aws.amazon.com/sms-voice/latest/userguide/sender-id.html
81. AWS What's New – EUM self-service sender ID registration in 19 new countries (Jan 2025): https://aws.amazon.com/about-aws/whats-new/2025/01/aws-end-user-messaging-self-service-id-registration
82. AWS Docs – Amazon Connect availability by Region: https://docs.aws.amazon.com/connect/latest/adminguide/regions.html
83. AWS Docs – Languages and locales supported by Amazon Lex V2: https://docs.aws.amazon.com/lexv2/latest/dg/how-languages.html
84. HelloDuty – Countries supported by Africa's Talking USSD API: https://helloduty.com/blogs/countries-supported-by-africas-talking-ussd-api
85. Osiris – Le Cameroun premier africain à mettre sur pied un code USSD national: https://osiris.sn/le-cameroun-premier-africain-a-mettre-sur-pied-un-code-ussd-national-a-travers.html
86. Osiris – Avec Campost le Cameroun lance (USSD codes): https://www.osiris.sn/Avec-Campost-le-Cameroun-lance.html
87. TechAfrica News – Cameroon regulator, MTN, Orange on network quality (Sept 2026): https://techafricanews.com/2026/09/15/cameroon-regulator-mtn-orange-network-quality-coverage/
88. AWS – Amazon Pinpoint (end of support notice): https://aws.amazon.com/pinpoint/
89. AWS Docs – Pinpoint: Use the EUM SMS and Voice API v2: https://docs.aws.amazon.com/pinpoint/latest/developerguide/sms-voice-v2.html
90. AWS Docs – DetectModerationLabels API: https://docs.aws.amazon.com/rekognition/latest/APIReference/API_DetectModerationLabels.html
91. AWS – Amazon Rekognition pricing: https://aws.amazon.com/rekognition/pricing/
92. AWS What's New – Rekognition reduces Image API pricing by up to 38% (2021): https://aws.amazon.com/about-aws/whats-new/2021/11/amazon-rekognition-pricing-apis
93. AWS ML Blog – Rekognition image vs video API for video moderation: https://aws.amazon.com/blogs/machine-learning/how-to-decide-between-amazon-rekognition-image-and-video-api-for-video-moderation
94. AWS Well-Architected – Reducing the Scope of Impact with Cell-Based Architecture: https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/reducing-scope-of-impact-with-cell-based-architecture.html
95. AWS Well-Architected – Cell design: https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/cell-design.html
96. AWS Well-Architected – REL10-BP03 Use bulkhead architectures: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_fault_isolation_use_bulkhead.md
97. Hidekazu Konishi – Cell-based architecture and shuffle sharding on AWS: https://hidekazu-konishi.com/entry/cell_based_architecture_and_shuffle_sharding_on_aws.html
98. AWS Well-Architected – SaaS Lens: https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/saas-lens.html
99. AWS What's New – Free Tier $200 credits and 6-month free plan (Jul 2025): https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan
100. AWS News Blog – Free Tier update, up to $200 in credits: https://aws.amazon.com/blogs/aws/aws-free-tier-update-new-customers-can-get-started-and-explore-aws-with-up-to-200-in-credits
101. AWS Builder Center – AWS Free Tier 2025: what's free and for how long: https://builder.aws.com/content/30mPEVUw3fzFwtEzPurrkoRXAIO/aws-free-tier-2025-whats-free-and-for-how-long
102. Neowin – AWS Free Tier overhauled: https://www.neowin.net/news/aws-free-tier-overhauled-new-users-get-200-in-credits-but-theres-a-catch/
103. AWS – Activate Founders: https://aws.amazon.com/de/activate/founders/
104. AWS – Activate credits: https://aws.amazon.com/startups/credits
105. AWS Startups – Everything you need to know about AWS Activate credits: https://aws.amazon.com/aws-startups/learn/everything-you-need-to-know-about-aws-activate-credits/
106. GitHub Docs – Configuring OpenID Connect in AWS: https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws
107. AWS DevOps Blog – AWS CodeCommit returns to general availability: https://aws.amazon.com/ko/blogs/devops/aws-codecommit-returns-to-general-availability/
108. InfoQ – AWS CodeCommit GA (Dec 2025): https://infoq.com/news/2025/12/aws-codecommit-ga
109. The Register – Praise Amazon for reviving CodeCommit (Nov 2025): https://www.theregister.com/2025/11/24/praise_amazon_for_reviving_codecommit_corey_quinn/
110. AWS DevOps Blog – Migrate from Cloud9 to IDE Toolkits or CloudShell: https://aws.amazon.com/blogs/devops/how-to-migrate-from-aws-cloud9-to-aws-ide-toolkits-or-aws-cloudshell/
111. AWS Distro for OpenTelemetry – Lambda Python (deprecated page): https://aws-otel.github.io/docs/getting-started/lambda/lambda-python
112. DataReportal – Digital 2025: Cameroon: https://datareportal.com/reports/digital-2025-cameroon
