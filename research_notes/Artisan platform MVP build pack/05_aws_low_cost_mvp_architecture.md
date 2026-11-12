# AWS Low-Cost One-Day MVP Architecture: Python Backend + Next.js Frontend for the Cameroon Artisan Trust Platform

Research notes, researcher 05. Current as of 12 November 2026.

**Scope.** This pack covers the one-day, lowest-cost, live-on-AWS MVP. The long-term reference architecture is in `research_notes/Cameroon artisan trust platform/06_system_design_aws_python.md`. That design used Aurora PostgreSQL + PostGIS, EventBridge/SQS/Step Functions, eu-west-3 and the Lambda Web Adapter. This MVP deliberately simplifies it.

**Region decision (from the coordinator).** The user chose **us-east-1** for everything. It is already CDK-bootstrapped. The region comparison is kept brief, to a latency note and a price delta.

**Method.**
- About 25 web searches and fetches of primary AWS pages.
- The AWS public Price List API files for us-east-1 and eu-west-3 (Lambda, DynamoDB, API Gateway, S3, CloudWatch), downloaded and parsed.
- The official AWS SMS price CSV and the WhatsApp Meta-fee sheet linked from the End User Messaging pricing page.
- Read-only AWS CLI checks against the user's account in us-east-1.

No AWS resources were created, modified or deleted. One caveat: the read-only `aws ce get-cost-and-usage` call is billed by Cost Explorer at about $0.01 per request.

Inline citations link to the source. The numbered source list is at the end.

---

## 0. Read-only account facts discovered (us-east-1, 12 Nov 2026), which change the design

### Takeaway
Two account facts drive the design.
1. **The account's Lambda concurrency quota in us-east-1 is only 10.** Reserved concurrency is therefore impossible, and a demo load spike can return HTTP 429s. Request a quota increase today.
2. **SMS in us-east-1 is in the SANDBOX with a $1/month spend cap.** At $0.288 per SMS to Cameroon, that is about 3 SMS a month. Keep SMS simulated.

### Cited Findings
**Lambda concurrency**
- `aws lambda get-account-settings --region us-east-1` returned `ConcurrentExecutions: 10` and `UnreservedConcurrentExecutions: 10` (read-only CLI, 12 Nov 2026).
- Service Quotas shows quota `L-B99A9384` = 10.0, `Adjustable: true`. There is no pending increase request (read-only CLI).
- Lambda docs: "You can reserve up to the **Unreserved account concurrency** value minus 100." With a limit of 10, **no reserved concurrency can be configured** — [Lambda reserved concurrency](https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html).
- New accounts get reduced concurrency quotas, which AWS raises automatically based on usage. Community reports confirm a 10-unit limit even though the documented default is 1,000 — [re:Post](https://repost.aws/questions/QUto8jBkZtQfSL-Qr3XEHybg/what-can-i-do-about-lambda-concurrency-being-set-to-10-in-new-accounts-even-though-default-is-1000); [Lambda quotas](https://docs.aws.amazon.com/lambda/latest/dg/limits.html).
- AWS Knowledge Center advises requesting increases through Service Quotas, ideally well ahead of need. One user reports approval took two days — [Knowledge Center](https://www.repost.aws/knowledge-center/lambda-concurrency-limit-increase).

**SMS (End User Messaging) in us-east-1**
- `aws pinpoint-sms-voice-v2 describe-account-attributes --region us-east-1` returned `ACCOUNT_TIER = SANDBOX` (read-only CLI).
- `describe-spend-limits` shows `TEXT_MESSAGE_MONTHLY_SPEND_LIMIT` EnforcedLimit 1, MaxLimit 1 (USD) (read-only CLI).
- `describe-verified-destination-numbers` shows 2 numbers with status VERIFIED. The numbers themselves were not printed or recorded (read-only CLI).
- The sandbox rules are a $1.00 monthly SMS spending limit, verified destinations only, and up to 10 verified numbers. Leaving the sandbox takes a support case per Region, with an "initial response within 24 hours" — [EUM SMS sandbox](https://docs.aws.amazon.com/sms-voice/latest/userguide/sandbox.html).
- The SMS price to Cameroon (CM, all networks, all number types) is **$0.28821 per message** — [AWS SMS price CSV](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/business-applications/approved/documents/End-User-Messaging-SMS-Prices.ebc340b4d416d90832dd59629c4792b0deb6f8bc.csv).

**SES**
- `aws sesv2 get-account --region us-east-1` returned `ProductionAccessEnabled: false`, `Max24HourSend: 200`, `MaxSendRate: 1` (read-only CLI). SES is still in the sandbox in us-east-1.

**Existing estate**
- Existing us-east-1 stacks include `rest-weather-api`, `aws-sam-cli-managed-default`, `atria-dev-*` (9 stacks), `ObsidianApiStack(-dev)`, `RedRisingCdkStack(-dev)` and `CDKToolkit` (read-only CLI).
- `aws cloudfront list-distributions` returned no distributions (Quantity null). The account therefore has all 3 CloudFront Free flat-rate plan slots available (read-only CLI; quota from [CloudFront flat-rate docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html)).
- Existing budgets: "Bryan's Monthly Budget" ($100), `ObsidianMonthlyBudget…` ($20), `WeatherBoard-3USD-account-safety` ($3) and `atria-dev-monthly` ($25), all monthly (read-only CLI).
- Cost Explorer reported October 2026 unblended cost of about $0.00 (read-only CLI). This is consistent with credits offsetting usage.

### Inferences
- **Before building, file a Service Quotas increase for Lambda concurrent executions (us-east-1) to 1,000.** It is free and non-destructive. It is a write action, so the builder or user does it, not this researcher.
- Until the increase lands, the whole account shares 10 concurrent executions. That includes the other projects' functions and the CDK `BucketDeployment` helper Lambda.
- At about 100 ms per API call, 10 concurrency still supports roughly 100 requests per second. That is fine for a demo, but a load test would throttle.
- Pick a stack name that cannot collide with the existing stacks: **`ArtisanMvp`** (stack `ArtisanMvp-prod`, all resource names prefixed `artisan-mvp-`).
- With SES in the sandbox (200 a day, verified recipients only), any email-based auth flow, such as Cognito email OTP through SES, would fail for arbitrary demo users. This supports the custom demo-login recommendation in section 6.

### Gaps
- Whether the 2 verified SMS destination numbers are Cameroonian (+237) was not checked. The values were deliberately not read.
- Whether sandbox sends to +237 need a registered sender ID was not verified. AWS lists Cameroon sender IDs as "Yes" and two-way as "Yes" — [AWS SMS countries](https://docs.aws.amazon.com/sms-voice/latest/userguide/phone-numbers-sms-by-country.html). Earlier notes found a conflicting "registration required" snippet.

---

## 1. Overall recommended blueprint (what to build today)

### Takeaway
Deploy **one CDK (Python) stack, `ArtisanMvp-prod`, in us-east-1**:
- **Static frontend:** Next.js static export (`output: 'export'`, `trailingSlash: true`) in a private S3 bucket behind a **CloudFront** distribution, using Origin Access Control and a CloudFront Function for `index.html` rewrites.
- **API on the same domain:** CloudFront routes **`/api/*` to a Lambda Function URL**, so there is no CORS in production and no API Gateway.
- **Backend:** FastAPI + **Mangum** on **Python 3.13 arm64**, zip-packaged with `uv pip install --python-platform aarch64-manylinux2014`. No Docker is needed.
- **Data:** one **DynamoDB on-demand single table**, with matching computed in Python over a small Douala dataset.
- **Media:** an S3 bucket with **presigned POST** uploads (5 MB cap).
- **Auth:** demo JWT auth (persona login plus simulated phone OTP).
- **Messaging and jobs:** all messaging (SMS, WhatsApp, USSD) is simulated, but runs through the real Africa's Talking-style callback contract. No queues, streams or schedulers: everything is computed on read.

Expected cost is under $1 a month at demo scale and about $5–8 a month at 10k MAU, excluding any real SMS.

### Cited Findings
**Static hosting**
- A static export produces an HTML file per route, deployable to any static host. Client Components with SWR or fetch handle client-side data — [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).
- Server Actions, cookies, rewrites, redirects, headers, Proxy (middleware), ISR, default image optimisation and dynamic routes without `generateStaticParams()` are **not supported** — [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).

**API in front of Lambda**
- Function URLs are `https://<url-id>.lambda-url.<region>.on.aws`, with auth type `AWS_IAM` or `NONE` and built-in CORS settings. They are throttled only through reserved concurrency (max RPS = 10 × reserved concurrency) — [Function URL docs](https://docs.aws.amazon.com/lambda/latest/dg/urls-configuration.html).
- API Gateway HTTP API costs $1.00 per million requests in us-east-1. Its free tier is 1M calls a month for 12 months, for **new customers only** — [API Gateway pricing](https://aws.amazon.com/api-gateway/pricing/). The Price List API confirms `USE1-ApiGatewayHttpRequest` at $0.000001 per request for the first 300M — [Price List API](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonApiGateway/current/us-east-1/index.json).

**Free tiers that apply to this account**
- CloudFront pay-as-you-go always-free tier, per month: 1 TB data out, 10,000,000 HTTP/S requests, 2,000,000 CloudFront Function invocations, plus free SSL certificates — [CloudFront pay-as-you-go pricing](https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/).
- Lambda free tier: 1M requests and 400,000 GB-seconds a month — [Lambda pricing](https://aws.amazon.com/lambda/pricing/).
- DynamoDB free tier, per Region per payer account each month: 25 GB storage, 25 WCU/25 RCU *provisioned*, and 2.5M Streams reads — [DynamoDB on-demand pricing](https://aws.amazon.com/dynamodb/pricing/on-demand/).

### Inferences
**Architecture diagram (one stack, us-east-1)**

```
Browser (Douala, 3G/4G)
   │ HTTPS  https://dxxxx.cloudfront.net
   ▼
CloudFront distribution (PriceClass ALL, HTTP/2+3, IPv6)
   ├── default behaviour  →  S3 "artisan-mvp-site-<acct>" (private, OAC)   [Next.js static export]
   │      └─ CloudFront Function (viewer-request): /foo/ → /foo/index.html
   ├── /api/*             →  Lambda Function URL (auth NONE) + secret origin header
   │      cache: CachingDisabled; origin request: AllViewerExceptHostHeader; methods: ALL
   └── /media/*           →  S3 "artisan-mvp-media-<acct>" (private, OAC), cached
                              ▲
Browser ── presigned POST (≤5 MB, image/*) ──┘ (direct to S3 regional endpoint)

Lambda "artisan-mvp-api" (Python 3.13, arm64, 1024 MB, 15 s timeout)
   FastAPI + Mangum; routers: auth, artisans, vouches, requests, match, jobs, reviews,
   fraud, ussd, whatsapp-sim, admin, media
   ├── DynamoDB "artisan-mvp" (on-demand, single table, 2 GSIs, TTL attr "ttl")
   ├── S3 media bucket (generate_presigned_post)
   └── Secrets Manager "artisan-mvp/jwt" (JWT signing key)
CloudWatch Logs /aws/lambda/artisan-mvp-api (7-day retention)
AWS Budgets "artisan-mvp-monthly" (tag-filtered, email alerts)
```

**Decisions at a glance**

| Concern | Decision | Rejected alternatives (why) |
|---|---|---|
| Region | us-east-1 (user decision) | eu-west-3 (needs bootstrap; about 17–19% dearer on DynamoDB, API GW and Logs) |
| Frontend | Next.js static export → S3 + CloudFront | Amplify SSR (official docs cover Next 12–15 only; build minutes and SSR compute); OpenNext (too much moving machinery for one day) |
| API ingress | CloudFront `/api/*` → Function URL (auth NONE + secret header) | API Gateway HTTP API (+$1/M, no free tier for an old account); Function URL + OAC (browsers must send a SHA-256 body hash on every POST) |
| Compute | Lambda Python 3.13 arm64, FastAPI + Mangum, zip | Lambda Web Adapter (extra layer + uvicorn + run.sh); Lambda Web Functions (Node.js only at launch); containers (Docker on Windows) |
| Packaging | `uv pip install --python-platform aarch64-manylinux2014 --target build/api` then `Code.from_asset` | `aws-lambda-python-alpha` (needs Docker) |
| DB | DynamoDB on-demand single table | Aurora SLv2 scale-to-zero (VPC, ~15–30 s resume); RDS (no free tier left, VPC); SQLite on EFS (VPC, locking) |
| Auth | Custom demo JWT (persona + simulated OTP), roles in DynamoDB | Cognito SMS (sandboxed, $0.288/SMS); Cognito email OTP (SES sandbox blocks arbitrary recipients) |
| Messaging | Simulated SMS/WhatsApp/USSD panels using real contracts. Optional 1 real SMS to a verified number | Live WhatsApp (Meta onboarding, templates; not reliable in a day) |
| Background | Compute on read (reveal and reputation) | EventBridge Scheduler or DynamoDB Streams (unnecessary today) |
| IaC | One CDK Python stack, `ArtisanMvp-prod` | SAM (broken locally) |

### Gaps
- No end-to-end measurement of this exact stack's latency from Cameroon exists. See section 2.

---

## 2. Region: us-east-1 (decided). Latency trade-off and price delta versus Paris

### Takeaway
us-east-1 is decided. Its unit prices are the same as or lower than Paris for every service here. The cost is latency: API calls from Douala to Virginia probably take about 180–250 ms RTT, versus about 100–130 ms to Paris. This is an inference; no direct measurement was found. CloudFront edges serve the static frontend from nearby, which hides most of the gap. Mitigate by keeping API calls few and coarse.

### Cited Findings
**Latency**
- A provider's network page lists RTTs to Douala of about 95.5 ms from Lisbon, about 92.3 ms from Johannesburg and about 18.6 ms from Lagos. This is provider marketing data, not an AWS measurement — [Africloud network](https://africloud.com/network).
- AWS inter-region latency from af-south-1 is about 227 ms to us-east-1 and about 146 ms to eu-west-3, which gives a proxy for the Europe-versus-Virginia gap from Africa — [Economize](https://www.economize.cloud/resources/aws/latency/af-south-1-vs-us-east-1/).
- An academic study, "Measuring Cloud Latency in Africa" (UCT), exists, but its figures could not be extracted from the PDF — [UCT PDF](https://pubs.cs.uct.ac.za/1704/1/Measuring_Cloud_Latency_in_Africa.pdf).
- CloudFront has edge locations in Lagos (since June 2023) as well as South Africa and Kenya — [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2023/06/aws-edge-location-nigeria).

**Price delta, from the AWS Price List API (parsed 12 Nov 2026)**

| Unit price | us-east-1 | eu-west-3 | Delta |
|---|---|---|---|
| Lambda arm64 GB-second (first 7.5B) | $0.0000133334 | $0.0000133334 | 0% |
| Lambda requests (per 1M) | $0.20 | $0.20 | 0% |
| API GW HTTP API (per 1M, first 300M) | $1.00 | $1.17 | +17% |
| DynamoDB on-demand write (per 1M WRU) | $0.625 | $0.7423 | +19% |
| DynamoDB on-demand read (per 1M RRU) | $0.125 | $0.1487 | +19% |
| DynamoDB storage (GB-month, above 25 GB) | $0.25 | $0.29715 | +19% |
| CloudWatch Logs ingestion (per GB) | $0.50 | $0.5985 | +20% |
| CloudWatch Logs storage (GB-month) | $0.03 | $0.0315 | +5% |
| S3 Standard storage (first 50 TB, GB-month) | $0.023 (us-east-1 Standard tier per [S3 pricing](https://aws.amazon.com/s3/pricing/)) | $0.024 | +4% |

Sources: Price List API files for [Lambda us-east-1](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AWSLambda/current/us-east-1/index.json), [Lambda eu-west-3](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AWSLambda/current/eu-west-3/index.json), [DynamoDB us-east-1](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonDynamoDB/current/us-east-1/index.json), [DynamoDB eu-west-3](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonDynamoDB/current/eu-west-3/index.json), [API Gateway eu-west-3](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonApiGateway/current/eu-west-3/index.json), [CloudWatch us-east-1](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonCloudWatch/current/us-east-1/index.json), [CloudWatch eu-west-3](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonCloudWatch/current/eu-west-3/index.json) and [S3 eu-west-3](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonS3/current/eu-west-3/index.json).

### Inferences
- **Estimated RTT from Douala to us-east-1: about 180–250 ms.** This adds Douala→Lisbon (about 95 ms) to a transatlantic hop (about 80–100 ms, typical but not sourced here).
- On a TLS-reused HTTP/2 connection through CloudFront, each API call adds roughly one RTT. That is acceptable for the demo.
- Design the UI to make **one aggregate call per screen**. For example, `GET /api/match?request_id=` returns ranked artisans *with* profile summaries and the price band. Avoid waterfalls.
- CloudFront terminates TLS at the Lagos or Johannesburg edges and reuses warm connections to the origin. That shortens the handshake cost compared with hitting the Function URL directly.
- **Scale path:** if Cameroonian latency matters later, redeploy the same CDK app to eu-west-3 after `cdk bootstrap aws://<acct>/eu-west-3`. The design has no region-specific services.

### Gaps
- There are no measured 2025–2026 RTTs from MTN or Orange Cameroon to us-east-1 or eu-west-3. A 10-minute check from a Cameroonian phone against the deployed `/api/health` would settle it.

---

## 3. Backend compute: Lambda + FastAPI (Mangum vs Web Adapter), Function URL vs HTTP API, cold starts, packaging without Docker

### Takeaway
Use **Lambda Python 3.13 on arm64, 1024 MB, with FastAPI wrapped by Mangum** (`handler = Mangum(app, lifespan="off")`). Expose it through a **Function URL with auth type NONE, reachable only via CloudFront**: CloudFront injects a secret `x-origin-verify` header that FastAPI middleware checks.

Build the zip **without Docker** using uv's cross-platform install into `build/api`, then `lambda_.Code.from_asset("build/api")`. Exclude boto3 (it is provided by the runtime). Keep dependencies to fastapi, pydantic, mangum and PyJWT for a package of about 15 MB, which keeps cold starts low (sub-second to about 1.5 s).

### Cited Findings
**Runtimes**
- Python 3.13 and 3.14 are supported managed runtimes on Amazon Linux 2023, with deprecation forecast for 30 June 2029. Python 3.15 is in preview — [Lambda runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html).

**Pricing**
- Lambda arm64 duration is $0.0000133334 per GB-second, versus $0.0000166667 for x86. Requests cost $0.20 per million — [Price List API, Lambda us-east-1](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AWSLambda/current/us-east-1/index.json).
- 512 MB of ephemeral storage is included. Response streaming through a function URL is free for the first 6 MB per request — [Lambda pricing](https://aws.amazon.com/lambda/pricing/).

**Mangum**
- Mangum is an adapter that runs ASGI apps on Lambda for Function URL, API Gateway (HTTP and REST), ALB and Lambda@Edge events, with configurable lifespan support — [Mangum GitHub](https://github.com/Kludex/mangum); [Mangum PyPI](https://pypi.org/project/mangum).
- The repo is not archived and shows 504 commits, 12 open PRs and 29 open issues. No releases are listed on the GitHub page — [Mangum GitHub](https://github.com/Kludex/mangum).

**Lambda Web Adapter (LWA)**
- For zip packages it needs the layer `arn:aws:lambda:${AWS::Region}:753240598075:layer:LambdaAdapterLayerArm64:30`, the environment variable `AWS_LAMBDA_EXEC_WRAPPER=/opt/bootstrap`, and a handler set to a startup script (`run.sh`).
- The default port is 8080 (`AWS_LWA_PORT`/`PORT`). The readiness check path defaults to `/`.
- The README does not quantify cold-start overhead.
- [LWA GitHub](https://github.com/awslabs/aws-lambda-web-adapter); [LWA fastapi-zip example](https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/fastapi-zip)

**Lambda Web Functions (new)**
- Launched **12 Oct 2026**. Existing functions are renamed "Event Functions". Web Functions are multi-concurrent and billed on active CPU.
- **At launch the only runtime is Node.js 24 (arm64)**, in us-east-1, us-east-2, us-west-2, ap-northeast-1 and eu-west-1 — [AWS News Blog](https://aws.amazon.com/blogs/aws/announcing-aws-lambda-web-functions-for-fast-consistent-web-app-performance-anywhere/).
- Pricing examples are $0.30 per million requests, $0.0000276944 per vCPU-second and $0.0000036667 per GB-second — [Lambda pricing](https://aws.amazon.com/lambda/pricing/).
- The Price List shows `Lambda-Web-Request-ARM` at $0.0000003 per request in us-east-1 — [Price List API](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AWSLambda/current/us-east-1/index.json).

**Function URL vs API Gateway**
- Function URLs support CORS (`AllowOrigins`, `AllowMethods`, `AllowHeaders`, `AllowCredentials`, `MaxAge`). If the function also emits CORS headers, non-preflight responses can carry duplicate `Access-Control-Allow-Origin` values, so configure CORS in one place only.
- Throttling is only via reserved concurrency. Setting reserved concurrency to 0 deactivates the URL.
- [Function URL docs](https://docs.aws.amazon.com/lambda/latest/dg/urls-configuration.html)
- CloudFront OAC for Function URL origins requires `AuthType AWS_IAM` and both `lambda:InvokeFunctionUrl` and `lambda:InvokeFunction` permissions for `cloudfront.amazonaws.com`.
  - Crucially: "If you use `PUT` or `POST`… your users must compute the SHA256 of the body and include… the `x-amz-content-sha256` header… Lambda doesn't support unsigned payloads."
  - [CloudFront OAC for Lambda](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-lambda.html)
- API Gateway HTTP API costs $1.00 per million requests, and its free tier applies only to new customers for 12 months — [API Gateway pricing](https://aws.amazon.com/api-gateway/pricing/).

**Cold starts**
- One author reports a minimal Python handler at 512 MB with an x86 cold-total p50 of about 85 ms. The author then cut it further with arm64 and lazy imports — [AWS Builder Center "Lazytown"](https://builder.aws.com/content/3JXXtAOIfjr21lkw5ACBG0u6emV/welcome-to-lazytown-how-being-lazy-made-my-python-lambda-9665percent-faster).
- Cloudflare's comparison loading httpx + fastapi + pydantic measured AWS Lambda (without SnapStart) at about 2.5 s average cold start. The Lambda memory and architecture were not stated, and the source is a competitor — [Cloudflare blog](https://blog.cloudflare.com/python-workers-advancements).

**Packaging without Docker**
- uv's official Lambda guide builds dependencies with `uv export --frozen --no-dev --no-editable -o requirements.txt`, then `uv pip install --no-installer-metadata --no-compile-bytecode --python-platform aarch64-manylinux2014 --python 3.13 --target packages -r requirements.txt` for arm64. Zip the result with the app code — [uv AWS Lambda guide](https://docs.astral.sh/uv/guides/integration/aws-lambda/).
- CDK's `Code.from_asset` accepts `bundling.local` (`ILocalBundling.try_bundle`). Returning true skips Docker — [community gist](https://gist.github.com/CarlosDomingues/09cf89f29c9c4c4f39e8ac2d1764a7ee). `PythonFunction` (the alpha module) bundles in Docker, and a feature request asked for local bundling — [aws-cdk issue #18290](https://github.com/aws/aws-cdk/issues/18290).

### Inferences
**Why Mangum over LWA today**
- It is a plain zip with a normal handler (`app.main.handler`), with no layer ARN, no `run.sh` (which needs LF line endings, a Windows pitfall), and no uvicorn in the bundle.
- Both work. LWA was the long-term recommendation because the same image runs on Fargate, and it stays the fallback if Mangum misbehaves.
- Mangum's release cadence is unclear, so **pin the version in `uv.lock`**.

**Why not Lambda Web Functions**
- They are Node.js only at launch, and the backend must be Python.

**Why a Function URL with auth NONE plus a secret header, not OAC**
- OAC would force the browser to SHA-256 every POST body into `x-amz-content-sha256`. That is doable in JavaScript, but it is a one-day risk.
- With auth NONE, the Function URL is publicly reachable. Mitigate this:
  1. CloudFront adds `x-origin-verify: <random 32 chars>` as an origin custom header.
  2. FastAPI middleware returns 403 when the header is missing or wrong.
  3. Do not advertise the raw URL.
- It is defence-in-depth rather than strong auth, which is acceptable for a demo.

**Why not API Gateway**
- It costs $1/M with no free tier for this pre-July-2025 account. The account's 10-concurrency limit blocks reserved-concurrency throttling, but API Gateway's own throttling would help there. That is the one argument for API Gateway.
- Without it, throttle in-app: per-IP and per-phone counters in DynamoDB with TTL, which double as the "velocity" anti-fraud rule. CloudFront WAF is optional (section 9).

**Lambda configuration**
- `runtime=PYTHON_3_13`, `architecture=ARM_64`, `memory_size=1024`.
  - CPU scales with memory, so 1024 MB shortens Python import time.
  - It stays within the 400k GB-s free tier (1M × 0.15 s × 1 GB = 150k GB-s).
- `timeout=Duration.seconds(15)`. Keep it below CloudFront's origin read timeout (default 30 s).
- No VPC. No SnapStart: Python SnapStart carries cache and restore charges, per the earlier notes, and adds publish/alias complexity.

**Cold-start hygiene**
- Lazy-import heavy modules. Create boto3 clients at module scope; they are reused across warm invocations.
- Read the JWT secret once per container.
- Avoid pandas, numpy and qrcode server-side: do matching in pure Python, which is enough for under 1,000 artisans.
- Optional "keep warm": an EventBridge Scheduler rule that hits `/api/health` every 5 minutes. That is about 8,640 invocations a month, inside the Scheduler 14M free tier and the Lambda free tier. Add it only on demo day.

**Packaging recipe (Windows, no Docker)**
- Pure Python + pydantic-core have manylinux aarch64 wheels, so `--python-platform aarch64-manylinux2014` resolves Linux wheels on Windows.
- Then `Code.from_asset(str(build_dir), exclude=["**/__pycache__"])`. Do not use `bundling=`, so CDK never invokes Docker.
- Keep `boto3`/`botocore` out of `requirements.txt` (`uv export --no-dev` while boto3 is a dev dependency). They come with the runtime, which saves about 80 MB unzipped.

### Gaps
- There is no published FastAPI + Mangum cold-start benchmark on Python 3.13 arm64. Measure the `Init Duration` in the REPORT log lines after the first deploy.
- The latest Mangum version and release date were not confirmed from PyPI.
- Whether CloudFront forwards the `Authorization` header to a Function URL under `AllViewerExceptHostHeader` with `CachingDisabled` was not verified. **Use a custom `X-Session-Token` header for the JWT** to sidestep the question.

---

## 4. Database: DynamoDB on-demand single table (recommended) vs Aurora Serverless v2 scale-to-zero vs RDS vs SQLite on EFS

### Takeaway
**Use DynamoDB on-demand, one table (`artisan-mvp`) with 2 GSIs and TTL.**
- Matching runs in Python over a GSI query that returns all artisans of one trade in Douala, a few hundred items. Distance comes from quarter centroids or artisan lat/lng with haversine.
- The scale path is a geohash-5 (or H3 r7) bucketed GSI key, then migration to Aurora/PostGIS as the long-term notes describe.
- Aurora Serverless v2's scale-to-zero needs a VPC and takes about 15 s to resume, or 30 s+ after 24 h paused. That is unacceptable for a live demo, and its storage still bills.

### Cited Findings
**DynamoDB pricing**
- On-demand in us-east-1 costs $0.625 per million WRU and $0.125 per million RRU. Standard storage is $0.25/GB-month after 25 GB free — [Price List API](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonDynamoDB/current/us-east-1/index.json); [DynamoDB on-demand pricing](https://aws.amazon.com/dynamodb/pricing/on-demand/).
- The free tier gives 25 GB storage per Region per payer account each month. The 25 WCU/RCU free allowance applies to *provisioned* capacity — [DynamoDB on-demand pricing](https://aws.amazon.com/dynamodb/pricing/on-demand/).

**Aurora Serverless v2 auto-pause**
- It requires a minimum of 0 ACU, Aurora PostgreSQL ≥16.3/15.7/14.12/13.15, and an auto-pause interval of 300–86,400 s.
- "the typical time to resume might be approximately 15 seconds". After more than 24 h paused, "the resume time can be 30 seconds or longer".
- An RDS Proxy prevents pausing. Storage is still charged while paused.
- [Aurora auto-pause docs](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html)

**Free tier status of this account**
- The legacy 12-month free tier applies to accounts created before 15 July 2025, counted from the account creation date. Newer accounts choose a Free or Paid plan with credits — [InfoQ](https://www.infoq.com/news/2025/07/aws-risk-free-account-credits); [re:Post free tier](https://www.repost.aws/knowledge-center/aws-free-tier-account-start-expire).

### Inferences
**Why not the alternatives**
- **Aurora:**
  - Lambda would need VPC attachment, or the RDS Data API.
  - The 15–30 s first-request stall after idle would hit exactly when judges first open the app.
  - Storage and I/O bill even while paused.
  - It adds 1–2 hours of VPC, subnet, secret and migration work.
- **RDS free tier:** the user's account is on the PAID plan and older. Any legacy 12-month RDS free tier has very likely expired, and a db.t4g.micro plus storage runs about $12–15/month. This figure comes from prior knowledge, not re-verified this session.
- **SQLite on EFS:** it needs a VPC and mount targets, and writer locking across concurrent Lambdas makes it fragile. Rejected.

**Single-table key design** (table `artisan-mvp`: `PK` and `SK` strings; `GSI1PK`/`GSI1SK`; `GSI2PK`/`GSI2SK`; TTL attribute `ttl`)

| Entity | PK | SK | GSI1PK / GSI1SK | GSI2PK / GSI2SK | Notes |
|---|---|---|---|---|---|
| User (customer/agent/admin) | `USER#<userId>` | `PROFILE` | `PHONE#<e164>` / `USER` | — | Login by phone. Role attribute. |
| Artisan profile | `ART#<artId>` | `PROFILE` | `TRADE#<trade>#CITY#DLA` / `Q#<quarter>#ART#<artId>` | `OWNER#<userId>` / `ART` | Attributes: `tier` (0–3), `lat`, `lng`, `quarter`, `available` (bool + `available_until`), `rep_up`, `rep_down`, `jobs_done`, `vouch_count`, `public_slug`. |
| Artisan trade (multi-trade) | `ART#<artId>` | `TRADE#<trade>` | `TRADE#<trade>#CITY#DLA` / `Q#<quarter>#ART#<artId>` | — | One item per extra trade. The matching query reads GSI1 only. |
| Verification evidence | `ART#<artId>` | `EVID#<ts>#<type>` | — | — | `type` ∈ {peer_vouch, proof_of_work, skill_test}. `s3_key` for photos. |
| Vouch | `ART#<voucheeId>` | `VOUCH#<voucherId>` | — | `VOUCHER#<voucherId>` / `ART#<voucheeId>` | GSI2 finds everything a voucher vouched for. Used by the related-party and ring rules. |
| Service request | `REQ#<reqId>` | `META` | `CUST#<userId>` / `REQ#<ts>` | `OPEN#TRADE#<trade>` / `<ts>` | `quarter`, `lat/lng`, `budget_hint`, `status`. |
| Job (booking) | `JOB#<jobId>` | `META` | `ART#<artId>` / `JOB#<status>#<ts>` | `CUST#<userId>` / `JOB#<ts>` | `otp_hash` (sha256 + salt), `otp_attempts`, `status` ∈ {booked, in_progress, completed, disputed}, `completed_at`, `price_agreed`. |
| Review (double-blind) | `JOB#<jobId>` | `REVIEW#<side>` | `REVTARGET#<userOrArtId>` / `<ts>` | — | `side` ∈ {customer, artisan}, `thumb` ∈ {up, down}, `reveal_at` = completed_at + 72 h. |
| Fraud event | `FRAUD#<yyyy-mm-dd>` | `<ts>#<eventId>` | `SUBJECT#<id>` / `<ts>` | — | `rule`, `severity`, `details`. Feeds the admin dashboard. |
| Velocity / rate-limit counter | `RL#<scope>#<key>` | `W#<window>` | — | — | Atomic `ADD n :1` with `ttl` = window end. Covers OTP attempts, logins per phone, requests per IP. |
| USSD session | `USSD#<sessionId>` | `STATE` | — | — | `ttl` = now + 300 s. |
| Simulated message (SMS/WA inbox) | `INBOX#<e164>` | `<ts>#<msgId>` | — | — | Feeds the simulated WhatsApp and SMS panels. `ttl` 7 days. |
| Reference data | `REF#QUARTERS` / `REF#PRICEBAND#<trade>` | `<quarter>` | — | — | Douala quarter centroids and price bands (P25–P75 FCFA). Seeded. |

**Access patterns, all Query or GetItem with no Scans**
- **Match:** Query `GSI1PK = TRADE#plumber#CITY#DLA` (optionally `begins_with(GSI1SK,"Q#Akwa")`), then compute in Python:

  ```
  score = 0.35·f(distance_km) + 0.30·wilson_lb(rep_up, rep_down) + 0.20·tier/3 + 0.15·available
  ```
  - Add one exploration slot for a verified artisan with zero jobs, mirroring the long-term notes.
  - Return the top 5 plus the price band (`REF#PRICEBAND#plumber`, quarter row or city fallback).
- **Artisan's jobs:** Query `GSI1PK = ART#<id>`. **Customer's jobs:** `GSI2PK = CUST#<id>`.
- **Public QR profile:** GetItem `ART#<id>/PROFILE`, plus a Query of `PK = ART#<id>` with `begins_with(SK,"VOUCH#")`. The reviews query on GSI1 filters out any review whose `reveal_at` is in the future and whose counterpart is missing.
- **Fraud dashboard:** Query `PK = FRAUD#<today>` (and the previous days), newest first.

**Rules implemented synchronously in API handlers** (each writes a `FRAUD#` item when tripped)
- **Self-dealing:** block or flag when `customer.phone == artisan.phone`, or when they share a device id cookie or `localStorage` id.
- **Related-party vouch:** reject when voucher == vouchee owner. Flag when the voucher has already vouched for more than 5 artisans in 24 h (GSI2 count), or when A vouches for B and B vouches for A (reciprocal check via GetItem).
- **OTP brute force:** the job OTP is 4 digits. Allow at most 5 attempts per job (`otp_attempts`, conditional update), then lock the job and raise a fraud event. Rate-limit by artisan too.
- **Velocity:** more than N requests per phone per hour, or more than M reviews per artisan per day, using the `RL#` counters.

**Scale path**
- When a trade partition in one city exceeds about 2,000 items, change GSI1PK to `TRADE#<trade>#GH5#<geohash5>` and query the 9 neighbouring cells. Geohash-5 cells are about 4.9 × 4.9 km.
- Later, move the system of record to Aurora + PostGIS + H3, per the long-term notes, with DynamoDB keeping the session, OTP and rate-limit roles.
- From prior knowledge, not re-verified this session: DynamoDB on-demand tables support a configurable *maximum* read/write throughput, which would be a cheap runaway-cost guard (`TableV2` `Billing.on_demand(max_read_request_units=…, max_write_request_units=…)`). Verify in the CDK API reference before relying on it.

### Gaps
- **Douala quarter centroid coordinates** (Akwa, Bonanjo, Bonapriso, Deido, Bali, Bonamoussadi, Makepe, Kotto, Logbaba, Ndokoti, New Bell, Bépanda, Bonabéri, Yassa, PK8–PK14, …) were not collected here. Source them from OpenStreetMap (Nominatim) at build time and commit them to a seed JSON.
- The geohash-5 cell size (about 4.9 km) comes from general knowledge, not a source fetched this session.

---

## 5. Frontend hosting: static export to S3 + CloudFront vs Amplify Hosting vs OpenNext; the CloudFront flat-rate free plan

### Takeaway
**Build a Next.js (16.x, App Router) static export to S3 behind CloudFront, deployed with CDK `BucketDeployment`.**
- Nothing in this app needs SSR. All data is fetched client-side from `/api/*`.
- Costs nothing at demo and 10k-MAU traffic under the **pay-as-you-go always-free tier** (10M requests, 1 TB a month), which is *larger* than the Free flat-rate plan's 1M requests.
- The CloudFront flat-rate plans (launched Nov 2025) are verified, but they are not needed today: the Free plan has a smaller request allowance, and it requires an AWS WAF web ACL.
- Amplify officially supports Next.js 12–15 SSR and bills build minutes and SSR compute. OpenNext adds machinery that is not worth it in one day.

### Cited Findings
**Static export limits**
- Unsupported in export mode: dynamic routes without `generateStaticParams()`, Route Handlers that read the Request, cookies, rewrites, redirects, headers, Proxy, ISR, default image optimisation, Draft Mode, Server Actions and intercepting routes. `trailingSlash: true` emits `/me/index.html` — [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).

**Flat-rate plans**
- Tiers are **Free $0, Pro $15, Business $200 and Premium $1,000 a month**, with no overages.
- Free includes 1M requests and 100 GB data transfer a month, 5 GB of S3 storage credit, and 5 cache behaviours. Up to 3 Free plans are allowed per account.
- [CloudFront flat-rate docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html); [CloudFront pricing](https://aws.amazon.com/cloudfront/pricing/); [AWS Networking blog](https://aws.amazon.com/blogs/networking-and-content-delivery/introducing-flat-rate-pricing-plans-with-no-overages)
- **Restrictions:** plans need an AWS WAF Web ACL associated with the distribution, and accounts "using AWS Free Tier" are ineligible.
  - Unsupported features include real-time logs, OAI (use OAC), legacy `ForwardedValues`, staging distributions, and WAF rule groups.
  - CloudFront Functions and Web ACLs cannot be shared with other distributions.
  - Lambda@Edge is billed separately.
  - [CloudFront flat-rate docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html); [Pricing Plan Manager](https://docs.aws.amazon.com/PricingPlanManager/latest/UserGuide/plans.html)
- Data transfer from S3, ALB or API Gateway origins to CloudFront is free — [CloudFront flat-rate docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html).

**Pay-as-you-go**
- The always-free tier is 1 TB, 10M requests and 2M CloudFront Function invocations a month. CloudFront Functions cost $0.10 per million after that.
- The first 1,000 invalidation paths a month are free, then $0.005 per path.
- [CloudFront pay-as-you-go](https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/)

**Amplify Hosting**
- Compute manages SSR for **Next.js 12 through 15** — [Amplify Next.js support](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html). Edge API routes are unsupported — [Amplify SSR troubleshooting](https://docs.aws.amazon.com/ko_kr/amplify/latest/userguide/troubleshooting-SSR.html).
- A third-party guide citing AWS pricing gives build minutes at $0.01/min, transfer at $0.15/GB and storage at $0.023/GB-month, with SSR request and compute charges on top — [issoh guide](https://www.issoh.co.jp/md/tech/7252).
- Amplify's `@aws-amplify/adapter-nextjs` v1.7.0 added Next.js 16 support in January 2026 — [Classmethod](https://dev.classmethod.jp/articles/aws-amplify-adapter-nextjs-v1-7-0-next-js-16/).

**OpenNext**
- The Next.js 16.2 Adapter API went stable in March 2026, built with OpenNext, Netlify, Cloudflare, AWS Amplify and Google Cloud — [Next.js blog](https://nextjs.org/blog/nextjs-across-platforms).
- OpenNext's own roadmap targeted a GA AWS adapter for 2026 — [OpenNext news](https://opennext.js.org/news/2026-03-25-3-years-of-opennext).

**CloudFront Functions for index rewrites**
- The official example appends `index.html` to URIs ending in `/` and `/index.html` to extensionless URIs, because CloudFront's default root object applies only to the site root — [CloudFront example](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-index.html); [AWS blog](https://aws.amazon.com/blogs/networking-and-content-delivery/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-cloudfront-functions).

### Inferences
**What the app loses with static export, and why it does not matter**
- **SSR and SEO:** irrelevant for a demo. The public QR profile still renders client-side.
- **Server Actions and route handlers:** replaced by FastAPI.
- **Middleware auth:** replaced by a client-side route guard and API-side JWT checks.
- **Image optimisation:** use plain `<img>` or `unoptimized: true`. Photos are pre-resized client-side before upload.
- **Dynamic routes** (`/artisan/[id]`) are unsupported without build-time ids. **Use query-string routes instead**, for example `/artisan/?id=ART123`, `/p/?a=ART123` (QR target) and `/job/?id=…`.
  - `useSearchParams()` must sit inside a `<Suspense>` boundary in static export. That is a well-known Next.js build error, from prior knowledge.

**`next.config.ts`**

```ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
```

- In code, use `const API = process.env.NEXT_PUBLIC_API_BASE ?? ''`, so production calls the relative `/api/...` on the same origin.
- Locally, set `NEXT_PUBLIC_API_BASE=http://localhost:8000` with FastAPI `CORSMiddleware` enabled **only when `ENV=local`**.

**Why not the Free flat-rate plan today**
- **The pay-as-you-go always-free tier is strictly better for this workload:** 10M requests versus 1M, and 1 TB versus 100 GB.
- The plan subscription is a console or Pricing Plan Manager action outside CDK. It also forces a WAF web ACL to stay attached and forbids sharing the CloudFront Function.
- Revisit it if WAF protection is wanted: WAF is bundled free in the plan, versus about $5 + $1/rule a month pay-as-you-go. That WAF figure is prior knowledge, not re-verified.
- The account is PAID and not "using AWS Free Tier", so it is eligible.

**CloudFront Function (cloudfront-js-2.0), attached to the default behaviour only, not `/api/*`**

```js
function handler(event) {
  var r = event.request, u = r.uri;
  if (u.endsWith('/')) { r.uri = u + 'index.html'; }
  else if (u.indexOf('.') === -1) { r.uri = u + '/index.html'; }
  return r;
}
```

**404 gotcha**
- CloudFront custom error responses apply to the **whole distribution, including `/api/*`**. Mapping 403/404 to `/404.html` would swallow FastAPI's JSON 403/404 bodies.
- Do **not** configure distribution-level error responses. A mistyped static path will show S3's XML AccessDenied, because a private bucket returns 403 for missing keys. That is acceptable for a demo.
- Optionally, have the CloudFront Function rewrite unknown extensionless paths to `/404/index.html`, using a route list emitted at build time.

**Price class**
- Use `PriceClass.PRICE_CLASS_ALL` so African edges (Lagos, Johannesburg) are used. Cost differences only matter beyond the free tier.
- Which price classes include the African edges was not re-verified this session.

### Gaps
- Official AWS confirmation of Next.js 16 SSR support on Amplify Hosting was not found. It does not matter for static export.
- Whether the flat-rate Free plan's 1M requests include requests forwarded to the Lambda origin was not explicitly confirmed. Presumably all viewer requests count.

---

## 6. Auth for the MVP

### Takeaway
**Implement custom demo auth: a phone number plus a simulated 6-digit OTP shown in the in-app "SMS inbox" panel, plus one-click persona logins** (customer, artisan, agent, admin; admin needs a passcode).
- The FastAPI backend issues an **HS256 JWT** (PyJWT, 12 h expiry, claims `sub`, `role`, `phone`). The signing key lives in Secrets Manager.
- The client stores the token in `sessionStorage` and sends it as `X-Session-Token`.
- Cognito is a good scale path: Essentials is free to 10k MAU and includes email OTP. But today SMS OTP is sandboxed at $0.288 per SMS to Cameroon, and email OTP depends on SES, which is in the sandbox.

### Cited Findings
- **Cognito pricing:**
  - Lite: $0.0055/MAU. Essentials: $0.015/MAU. Plus: $0.020/MAU.
  - The first **10,000 MAUs are free on Lite and Essentials** and "does not automatically expire at the end of your 12-month AWS Free Tier term".
  - Email OTP and passwordless are Essentials and Plus features. Email is billed via SES, and SMS separately via SNS.
  - [Cognito pricing](https://aws.amazon.com/cognito/pricing/)
- The SMS sandbox allows only verified numbers with a $1/month cap — [EUM SMS sandbox](https://docs.aws.amazon.com/sms-voice/latest/userguide/sandbox.html). SMS to Cameroon costs $0.28821 per message — [AWS SMS price CSV](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/business-applications/approved/documents/End-User-Messaging-SMS-Prices.ebc340b4d416d90832dd59629c4792b0deb6f8bc.csv).
- SES in us-east-1 is in the sandbox: 200 a day, 1 per second (read-only CLI, this session).

### Inferences
**Why custom demo auth wins today**
- It cannot be blocked by sandboxes and costs nothing.
- It showcases the platform's own anti-fraud mechanics: OTP attempt counters and velocity limits use the same `RL#` counters.
- It takes about 1 hour to build.

**Flow**
1. `POST /api/auth/otp/start {phone}` generates a 6-digit code. It stores `sha256(code+salt)` with a 5-minute TTL under `RL#otp#<phone>` and writes the code into the simulated inbox (`INBOX#<phone>`).
2. If `LIVE_SMS=1` and the phone is in an allowlist (the 2 verified numbers), it *also* sends a real SMS.
3. `POST /api/auth/otp/verify` allows at most 5 attempts, then issues the JWT.

**Endpoint protection**
- Role guard dependency in FastAPI: `require_role("admin")` and so on.
- **Seeded demo personas** are logged in by buttons on the landing page, for judges who don't want to type.

**Cognito migration later**
- Swap the token verifier for Cognito JWKS verification (Essentials, email or passkey). Business logic is unchanged.

**Security notes for the demo**
- No real PII beyond phone numbers.
- Mark data as demo. Add a "reset demo data" admin endpoint that re-seeds.

### Gaps
- Cognito's default (non-SES) email sender daily cap was not verified this session.

---

## 7. Media and QR codes

### Takeaway
- **Uploads:** proof-of-work photos go directly from the browser to a private S3 bucket via `generate_presigned_post`, with conditions `["content-length-range", 1, 5_242_880]` and `["starts-with", "$Content-Type", "image/"]`, a key prefix `uploads/<artId>/`, and a 5-minute expiry. Resize client-side to about 1280 px (canvas) first.
- **Serving:** through CloudFront `/media/*` with OAC.
- **QR codes:** generate client-side (`qrcode` npm, SVG), pointing to `https://<cf-domain>/p/?a=<artId>`. No Python QR dependency is needed.

### Cited Findings
- `generate_presigned_post(Bucket, Key, Fields, Conditions, ExpiresIn)` supports conditions including `content-length-range`, `Content-Type` and `starts-with` on key and fields — [boto3 docs](https://docs.aws.amazon.com/boto3/latest/reference/services/s3/client/generate_presigned_post.html).
- A presigned PUT does not enforce a size window the way a POST policy does — [Builder Center guide](https://builder.aws.com/content/3KQNkyoO1Wk5ewDr0IXo8zaAmkH/direct-file-uploads-to-amazon-s3-a-practical-guide-to-presigned-requests).
- S3 us-east-1 costs $0.005 per 1,000 PUT/POST (Tier 1) and $0.0004 per 1,000 GET (Tier 2) — [Price List API, S3 us-east-1](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonS3/current/us-east-1/index.json).

### Inferences
- **The media bucket needs a CORS rule** allowing `POST` from `https://<distribution-domain>` and `http://localhost:3000`, because the browser posts to the regional S3 endpoint, not through CloudFront.
  - To avoid a CDK circular dependency between the bucket and the distribution, use `allowed_origins=["*"]` for POST only. The presigned policy is the real control.
- Lifecycle rule: expire `uploads/tmp/` after 1 day. Block all public access and enforce SSL.
- `auto_delete_objects=True` plus `RemovalPolicy.DESTROY` allow clean teardown. This creates a small custom-resource Lambda.
- The QR profile page shows tier badges, the verified-job count, thumbs-up %, vouches and "member since". The data comes from the public `GET /api/public/artisans/{id}` endpoint, with no auth and short cache headers.

### Gaps
- The S3 EntityTooLarge behaviour when `content-length-range` is exceeded is described only by third parties. Test it once after deploy.

---

## 8. Real messaging (SMS, WhatsApp) and USSD: what is live vs simulated

### Takeaway
**Simulate everything. Optionally make one live SMS to a pre-verified number as a "wow" moment.**

| Channel | Live today? | Why |
|---|---|---|
| SMS | Optional, 1 message | us-east-1 is in the sandbox with a $1/month cap, so about 3 messages to +237 |
| WhatsApp (EUM Social) | No | Meta embedded signup is console-only, needs Meta Business assets, a number not already on WhatsApp, and approved templates. It is not reliably done in hours |
| USSD | No | No shortcode exists. Implement the **real Africa's Talking callback contract** at `POST /api/ussd` and drive it from an in-app phone simulator |

### Cited Findings
**SMS**
- Cameroon costs $0.28821 per SMS — [AWS SMS price CSV](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/business-applications/approved/documents/End-User-Messaging-SMS-Prices.ebc340b4d416d90832dd59629c4792b0deb6f8bc.csv). The sandbox has a $1/month limit and verified destinations only — [EUM SMS sandbox](https://docs.aws.amazon.com/sms-voice/latest/userguide/sandbox.html).
- Cameroon supports sender IDs, two-way SMS and short codes, but not long codes — [AWS SMS countries](https://docs.aws.amazon.com/sms-voice/latest/userguide/phone-numbers-sms-by-country.html).

**WhatsApp onboarding**
- A WABA can only be linked through the console using Meta embedded signup. There is no CLI or API path — [AWS docs](https://docs.aws.amazon.com/end-user-messaging/latest/userguide/nx-whatsapp-gsu-link-waba.html); [EUM Social getting started](https://docs.aws.amazon.com/social-messaging/latest/userguide/getting-started-whatsapp.html).
- Sending uses `send-whatsapp-message` with a Meta-formatted payload — [AWS docs](https://docs.aws.amazon.com/end-user-messaging/latest/userguide/nx-whatsapp-send-outbound.html).

**WhatsApp pricing**
- AWS charges $0.005 per outbound and $0.001 per inbound message, plus Meta fees — [EUM pricing](https://aws.amazon.com/end-user-messaging/pricing/).
- Meta's fee sheet linked from the AWS page lists **"Rest of Africa": Marketing $0.0170, Utility $0.0030, Authentication $0.0030** per message, with a "Service" column of $0.0030 — [Meta fee sheet via AWS](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/business-applications/approved/documents/2026-10-usd-rates.12c5e2244978e162c3431f0dee6a2c09acfa91b9.csv).

**Meta test numbers**
- Meta's Cloud API test number can message only **up to 5** verified recipient numbers — [WANotifier](https://help.wanotifier.com/en/article/test-phone-number-limitations-kt0ly2/); [Meta business phone numbers](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers.md).
- Unverified businesses are reportedly capped at about 250 unique customers per 24 h. This comes from third-party sources that conflict with each other — [Blueticks](https://blueticks.co/blog/whatsapp-api-without-meta-verification).

**USSD contract (Africa's Talking style)**
- The gateway POSTs form-encoded `sessionId`, `serviceCode`, `phoneNumber` and `text`, with an empty `text` on the first hit. Each later `text` holds the whole input path joined by `*`.
- The reply is plain text prefixed `CON ` (continue) or `END ` (terminate) — [DEV tutorial](https://dev.to/franciskinyuru/ussd-101-with-africastalking-3846); [AT gitbook](https://africastalkingltd.gitbooks.io/mobile-communication-apis/python/programmer_level/ussd.html).
- One 2026 guide cites sessions timing out after about 180 s and callbacks needing a response within about 10 s — [kubaik guide](https://kubaik.github.io/ussd-in-2026-africas-silent-infra-layer/).
- The official Africa's Talking docs returned 403 to the fetcher, so these are secondary sources.

### Inferences
**USSD endpoint**
- `POST /api/ussd`, `Content-Type: application/x-www-form-urlencoded`. Respond with `PlainTextResponse("CON …")`.
- Parse `text.split("*")` statelessly. Use DynamoDB `USSD#<sessionId>` only for draft data.
- Menu: 1 Find artisan (trade → quarter → shortlist), 2 My jobs, 3 Confirm job OTP (artisan), 4 Rate job, 5 Check artisan by code.
- **The UI simulator posts exactly this form** to the same endpoint, so a real aggregator could be pointed at `https://<cf-domain>/api/ussd` later.
- Add an `x-ussd-sim` bypass of the origin-verify middleware? **No.** CloudFront always adds the header, so aggregator traffic via CloudFront works as is.

**Simulated WhatsApp**
- `POST /api/wa/sim/inbound {from, text}` runs the same conversation core as USSD (shared intent handlers). Replies are written to `INBOX#<phone>`. The UI polls `GET /api/wa/sim/inbox`.

**Live SMS button (optional)**
- Admin-only. Calls `pinpoint-sms-voice-v2:SendTextMessage` (boto3 `pinpoint-sms-voice-v2` client) to an allowlisted verified number.
- Grant IAM permission `sms-voice:SendTextMessage` only.
- The hard cap is enforced by AWS's $1 spend limit anyway.

**10k-MAU messaging cost**
- Real SMS would dominate the bill. Example: 3,000 jobs × 2 SMS × $0.288 ≈ **$1,730 a month**.
- The same 6,000 messages as WhatsApp utility templates cost about 6,000 × ($0.005 + $0.003) ≈ **$48 a month**.
- That makes WhatsApp, plus USSD via a local aggregator, the right production channels, as the long-term notes say.

### Gaps
- Meta's country grouping for Cameroon was not verified. It is assumed to be "Rest of Africa", since no separate Cameroon row exists in the sheet.
- How Meta's "Service" conversations interact with the $0.0030 column is unclear.
- It is unknown whether Meta's auto-created test WABA and number can be linked through AWS EUM Social embedded signup.

---

## 9. Background work, cost guardrails, observability

### Takeaway
**No background infrastructure is needed.**
- **Compute double-blind reveal on read:** a review is visible when both sides have reviewed, or when `now ≥ reveal_at`.
- **Update reputation counters synchronously** in the review handler (`UpdateItem ADD rep_up :1`), applied only at reveal time. Alternatively, apply them at write time and *display* them only after reveal.
- **Guardrails:**
  - Tags on everything.
  - A tag-filtered AWS Budget with `IncludeCredit=false`.
  - 7-day log retention.
  - Lambda timeout 15 s.
  - App-level rate limits, because reserved concurrency is impossible on this account.
  - No VPC, NAT, provisioned capacity or provisioned concurrency.

### Cited Findings
- EventBridge Scheduler includes 14M invocations a month free, then $1.00 per million — [EventBridge pricing](https://aws.amazon.com/eventbridge/pricing/).
- AWS Budgets monitoring is free. The first two *action-enabled* budgets are free, then $0.10 per day each — [Budgets pricing](https://aws.amazon.com/aws-cost-management/aws-budgets/pricing/).
- CloudWatch Logs in us-east-1: ingestion $0.50/GB, storage $0.03/GB-month — [Price List API, CloudWatch](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonCloudWatch/current/us-east-1/index.json).
- Reserved concurrency needs 100 unreserved units left over. On this account the limit is 10, so none is configurable — [Lambda reserved concurrency](https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html) and the read-only CLI.
- The flat-rate CloudFront plans bundle WAF (IP rate limiting, geo-blocking) with no overages — [CloudFront flat-rate docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html).

### Inferences
**Reveal rule**
- `visible = both_sides_reviewed or now >= completed_at + 72h`.
- Reviews are accepted only if `job.status == completed` and the OTP was verified (`job.otp_verified_at` is set), and only from the job's own customer or artisan. This is a conditional write: one review per side per job, `attribute_not_exists(PK)`.

**Reputation**
- Store raw `rep_up`/`rep_down` on the artisan. Compute the Wilson lower bound at read time; it is trivial CPU.
- Defer the "counted only after reveal" nuance to read time by summing revealed reviews. At MVP scale, a Query over `REVTARGET#<artId>` is cheap.

**Guardrail checklist (CDK)**
- **Tags:** `Tags.of(app).add("project","artisan-mvp")`, plus `env=prod` and `owner=bryan`. **Activate the cost allocation tag** `project` in Billing; it takes up to about 24 h to appear, from prior knowledge.
- **Budget:** `aws_budgets.CfnBudget`, $10 a month, filter `TagKeyValue = ["user:project$artisan-mvp"]`, `cost_types.include_credit = False`.
  - Without excluding credits, actual cost shows about $0 and alerts never fire. This is prior knowledge about Budgets CostTypes; verify in the console.
  - Email notifications at ACTUAL 50%/80%/100% and FORECASTED 100%.
  - Also keep the existing $100 account budget.
- **Logs:** create `logs.LogGroup(retention=RetentionDays.ONE_WEEK, removal_policy=DESTROY)` and pass `log_group=` to the Function. That avoids the legacy `log_retention` custom resource. Log in JSON at INFO level, and avoid logging bodies or phones in full.
- **Lambda:** timeout 15 s, memory 1024 MB, no provisioned concurrency, no SnapStart.
- **DynamoDB:** on-demand, PITR off (demo), optional max-throughput caps.
- **CloudFront:** cache static assets with `CachingOptimized`. Next's hashed `/_next/static/*` files are immutable. Invalidate `/*` on each deploy (BucketDeployment does it). Invalidations are free up to 1,000 paths a month.
- **Abuse:** app-level per-IP and per-phone rate limits through `RL#` counters. An emergency "kill switch" env var `READ_ONLY=1` makes writes return 503.
  - Setting reserved concurrency to 0 (`aws lambda put-function-concurrency --reserved-concurrent-executions 0`) still works as an emergency stop, since it reserves nothing.
- **No VPC, no NAT gateway, no ALB, no provisioned anything.**

### Gaps
- The CDK `CfnBudget` property for the new Budgets `FilterExpression`, versus the legacy `CostFilters`, was not verified. `CostFilters` with `TagKeyValue` is the long-standing format.

---

## 10. CDK (Python) stack layout and repository structure

### Takeaway
Use one CDK app with one stack, `ArtisanMvp-prod`, in `aws://<acct>/us-east-1`, using the existing `CDKToolkit` bootstrap. Split the code into constructs (`DataConstruct`, `ApiConstruct`, `WebConstruct`, `GuardrailsConstruct`), not separate stacks. That avoids cross-stack export locks and circular references, and allows a single `cdk deploy` and `cdk destroy`.

### Cited Findings
- `Code.from_asset` plus local bundling avoids Docker. `PythonFunction` uses Docker — [gist](https://gist.github.com/CarlosDomingues/09cf89f29c9c4c4f39e8ac2d1764a7ee); [aws-cdk #18290](https://github.com/aws/aws-cdk/issues/18290).
- The uv cross-platform `--target` install recipe — [uv AWS Lambda guide](https://docs.astral.sh/uv/guides/integration/aws-lambda/).
- CloudFront Functions need the `cloudfront-js-2.0` runtime for the rewrite pattern — [oneuptime walkthrough](https://oneuptime.com/blog/post/2026-02-12-cloudfront-functions-url-rewrites/view); [Classmethod CDK article](https://dev.classmethod.jp/articles/adding-index-html-to-request-url-using-cloudfront-functions-in-aws-cdk/).
- Function URL CORS and auth settings — [Function URL docs](https://docs.aws.amazon.com/lambda/latest/dg/urls-configuration.html).

### Inferences
**Repository layout**

Recommendation: put the repo **outside OneDrive** (for example `C:\dev\artisan-mvp`). OneDrive syncing of `node_modules`, `.venv`, `cdk.out` and `build` causes file locks and long-path failures on Windows.

```
artisan-mvp/
├─ backend/                      # uv project (Python 3.13)
│  ├─ pyproject.toml / uv.lock   # deps: fastapi, pydantic, mangum, pyjwt ; dev: boto3, pytest, moto, uvicorn, httpx
│  └─ app/
│     ├─ main.py                 # app = FastAPI(root_path=""); routers under /api; handler = Mangum(app, lifespan="off")
│     ├─ deps.py                 # origin-verify middleware, auth (X-Session-Token), role guards
│     ├─ db.py                   # boto3 Table resource (module scope), key helpers
│     ├─ routers/ auth.py artisans.py vouches.py requests.py match.py jobs.py reviews.py
│     │           fraud.py ussd.py wa_sim.py media.py admin.py public.py health.py
│     └─ domain/ matching.py (haversine, wilson, score) fraud_rules.py otp.py pricing.py conversation.py
├─ frontend/                     # pnpm + Next.js 16 (App Router, static export)
│  ├─ next.config.ts             # output:'export', trailingSlash:true, images.unoptimized
│  └─ app/ (customer|artisan|agent|admin|p|ussd-sim|wa-sim)/page.tsx
├─ infra/                        # uv project: aws-cdk-lib, constructs
│  ├─ app.py  cdk.json           # "app": "uv run python app.py"
│  └─ artisan_mvp/ stack.py data.py api.py web.py guardrails.py
├─ scripts/ build_backend.ps1  seed.py  deploy.ps1
└─ build/ (gitignored) api/      # Lambda asset folder
```

**Key CDK snippets (`aws-cdk-lib` v2, Python)**

```python
# infra/app.py
import aws_cdk as cdk
from artisan_mvp.stack import ArtisanMvpStack
app = cdk.App()
ArtisanMvpStack(app, "ArtisanMvp-prod",
    env=cdk.Environment(account=app.node.try_get_context("account"), region="us-east-1"))
cdk.Tags.of(app).add("project", "artisan-mvp"); cdk.Tags.of(app).add("env", "prod")
app.synth()
```

```python
# data.py
table = dynamodb.TableV2(self, "Table", table_name="artisan-mvp",
    partition_key=dynamodb.Attribute(name="PK", type=dynamodb.AttributeType.STRING),
    sort_key=dynamodb.Attribute(name="SK", type=dynamodb.AttributeType.STRING),
    billing=dynamodb.Billing.on_demand(), time_to_live_attribute="ttl",
    global_secondary_indexes=[
      dynamodb.GlobalSecondaryIndexPropsV2(index_name="GSI1",
        partition_key=dynamodb.Attribute(name="GSI1PK", type=dynamodb.AttributeType.STRING),
        sort_key=dynamodb.Attribute(name="GSI1SK", type=dynamodb.AttributeType.STRING)),
      dynamodb.GlobalSecondaryIndexPropsV2(index_name="GSI2",
        partition_key=dynamodb.Attribute(name="GSI2PK", type=dynamodb.AttributeType.STRING),
        sort_key=dynamodb.Attribute(name="GSI2SK", type=dynamodb.AttributeType.STRING))],
    removal_policy=RemovalPolicy.DESTROY)
media = s3.Bucket(self, "Media", block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
    enforce_ssl=True, auto_delete_objects=True, removal_policy=RemovalPolicy.DESTROY,
    cors=[s3.CorsRule(allowed_methods=[s3.HttpMethods.POST], allowed_origins=["*"], allowed_headers=["*"])],
    lifecycle_rules=[s3.LifecycleRule(prefix="uploads/tmp/", expiration=Duration.days(1))])
```

```python
# api.py
log_group = logs.LogGroup(self, "ApiLogs", log_group_name="/aws/lambda/artisan-mvp-api",
    retention=logs.RetentionDays.ONE_WEEK, removal_policy=RemovalPolicy.DESTROY)
jwt_secret = secretsmanager.Secret(self, "JwtSecret", secret_name="artisan-mvp/jwt",
    generate_secret_string=secretsmanager.SecretStringGenerator(password_length=48, exclude_punctuation=True))
origin_verify = self.node.try_get_context("originVerify")  # random string passed with -c at deploy
fn = lambda_.Function(self, "Api", function_name="artisan-mvp-api",
    runtime=lambda_.Runtime.PYTHON_3_13, architecture=lambda_.Architecture.ARM_64,
    handler="app.main.handler",
    code=lambda_.Code.from_asset(str(BUILD_API_DIR), exclude=["**/__pycache__"]),
    memory_size=1024, timeout=Duration.seconds(15), log_group=log_group,
    environment={"TABLE": table.table_name, "MEDIA_BUCKET": media.bucket_name,
                 "JWT_SECRET_ARN": jwt_secret.secret_arn, "ORIGIN_VERIFY": origin_verify,
                 "ENV": "prod", "LIVE_SMS": "0"})
table.grant_read_write_data(fn); media.grant_put(fn); media.grant_read(fn); jwt_secret.grant_read(fn)
fn_url = fn.add_function_url(auth_type=lambda_.FunctionUrlAuthType.NONE)   # no CORS: same-origin via CloudFront
```

```python
# web.py
site = s3.Bucket(self, "Site", block_public_access=s3.BlockPublicAccess.BLOCK_ALL, enforce_ssl=True,
    auto_delete_objects=True, removal_policy=RemovalPolicy.DESTROY)
rewrite = cloudfront.Function(self, "Rewrite", runtime=cloudfront.FunctionRuntime.JS_2_0,
    code=cloudfront.FunctionCode.from_inline(REWRITE_JS))
api_origin = origins.FunctionUrlOrigin(fn_url, custom_headers={"x-origin-verify": origin_verify},
    read_timeout=Duration.seconds(30))
dist = cloudfront.Distribution(self, "Cdn", comment="artisan-mvp",
    default_root_object="index.html", price_class=cloudfront.PriceClass.PRICE_CLASS_ALL,
    http_version=cloudfront.HttpVersion.HTTP2_AND_3,
    default_behavior=cloudfront.BehaviorOptions(
        origin=origins.S3BucketOrigin.with_origin_access_control(site),
        viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cache_policy=cloudfront.CachePolicy.CACHING_OPTIMIZED,
        function_associations=[cloudfront.FunctionAssociation(function=rewrite,
            event_type=cloudfront.FunctionEventType.VIEWER_REQUEST)]),
    additional_behaviors={
      "/api/*": cloudfront.BehaviorOptions(origin=api_origin,
          viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
          allowed_methods=cloudfront.AllowedMethods.ALLOW_ALL,
          cache_policy=cloudfront.CachePolicy.CACHING_DISABLED,
          origin_request_policy=cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER),
      "/media/*": cloudfront.BehaviorOptions(
          origin=origins.S3BucketOrigin.with_origin_access_control(media),
          viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cache_policy=cloudfront.CachePolicy.CACHING_OPTIMIZED)})
s3deploy.BucketDeployment(self, "DeploySite", sources=[s3deploy.Source.asset(str(FRONTEND_OUT))],
    destination_bucket=site, distribution=dist, distribution_paths=["/*"], memory_limit=512)
CfnOutput(self, "SiteUrl", value=f"https://{dist.distribution_domain_name}")
CfnOutput(self, "TableName", value=table.table_name)
```

**Notes**
- **The `/media/*` behaviour forwards the path as is.** Store objects under the key prefix `media/…`, or add a second CloudFront Function to strip the prefix. The simplest option is to make S3 keys start with `media/uploads/...`.
- **FastAPI routes must include the `/api` prefix.** CloudFront forwards the full path, so use `app.include_router(router, prefix="/api")`.
- **`ALL_VIEWER_EXCEPT_HOST_HEADER` is required.** Forwarding the viewer `Host` to a Function URL breaks routing. This is general CloudFront and Function URL behaviour, not re-verified this session.
- `Secret` costs about $0.40 a month (prior knowledge). A free SSM SecureString parameter is an alternative if every cent matters.

### Gaps
- The exact CDK construct names (`FunctionUrlOrigin`, `S3BucketOrigin.with_origin_access_control`, `TableV2`, the `log_group` prop) should be checked against the installed `aws-cdk-lib` version. They have existed since 2024-era releases, from prior knowledge.

---

## 11. Step-by-step build and deploy commands (Windows 11, PowerShell, Node 24, pnpm 10.20, uv)

### Takeaway
Order of work:
1. File the Lambda quota increase.
2. Scaffold.
3. Build the backend zip folder with uv (arm64 wheels).
4. Build the frontend static export with pnpm.
5. `cdk deploy` with a random origin-verify context value.
6. Seed DynamoDB.
7. Smoke-test.

Redeploys are the same commands.

### Cited Findings
- uv cross-platform install flags — [uv AWS Lambda guide](https://docs.astral.sh/uv/guides/integration/aws-lambda/).
- Static export output is in `out/` — [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).
- The SMS sandbox and production request process — [EUM SMS sandbox](https://docs.aws.amazon.com/sms-voice/latest/userguide/sandbox.html).
- The Lambda quota increase process — [Knowledge Center](https://www.repost.aws/knowledge-center/lambda-concurrency-limit-increase).

### Inferences
```powershell
# 0) One-time account prep (writes; user/builder runs, not this researcher)
aws service-quotas request-service-quota-increase --service-code lambda --quota-code L-B99A9384 --desired-value 1000 --region us-east-1
aws sts get-caller-identity --query Account --output text   # note ACCOUNT id

# 1) Scaffold (outside OneDrive)
mkdir C:\dev\artisan-mvp; cd C:\dev\artisan-mvp
uv init backend --python 3.13 ; cd backend
uv add fastapi pydantic mangum pyjwt
uv add --dev boto3 uvicorn pytest moto httpx ; cd ..
pnpm create next-app@latest frontend --ts --app --eslint --tailwind --use-pnpm --no-src-dir
uv init infra --python 3.13 ; cd infra ; uv add aws-cdk-lib constructs ; cd ..

# 2) Local dev loop
cd backend ; $env:ENV="local"; uv run uvicorn app.main:app --reload --port 8000   # terminal 1
cd frontend ; $env:NEXT_PUBLIC_API_BASE="http://localhost:8000"; pnpm dev        # terminal 2

# 3) Build backend asset (arm64, no Docker)  -- scripts/build_backend.ps1
Remove-Item -Recurse -Force build\api -ErrorAction SilentlyContinue
cd backend
uv export --frozen --no-dev --no-editable --no-hashes -o ..\build\requirements.txt
uv pip install --no-installer-metadata --no-compile-bytecode `
  --python-platform aarch64-manylinux2014 --python 3.13 `
  --target ..\build\api -r ..\build\requirements.txt
Copy-Item -Recurse app ..\build\api\app
cd ..

# 4) Build frontend static export
cd frontend ; Remove-Item Env:NEXT_PUBLIC_API_BASE -ErrorAction SilentlyContinue ; pnpm install --frozen-lockfile ; pnpm build ; cd ..   # -> frontend\out

# 5) Deploy (us-east-1 already bootstrapped; do NOT re-bootstrap)
cd infra
$ov = -join ((48..57)+(97..122) | Get-Random -Count 32 | % {[char]$_})   # keep in a local .env, reuse on redeploys
uv run cdk diff  -c account=<ACCOUNT> -c originVerify=$ov
uv run cdk deploy ArtisanMvp-prod -c account=<ACCOUNT> -c originVerify=$ov --require-approval broadening
cd ..

# 6) Seed (local boto3, uses your admin CLI creds)
cd backend ; uv run python ..\scripts\seed.py --table artisan-mvp --region us-east-1 ; cd ..

# 7) Smoke tests
curl https://<dist>.cloudfront.net/api/health
curl -X POST https://<dist>.cloudfront.net/api/ussd -d "sessionId=s1&serviceCode=*384*1#&phoneNumber=%2B237600000000&text="
# Function URL direct (should be 403 from origin-verify middleware):
curl https://<url-id>.lambda-url.us-east-1.on.aws/api/health

# Teardown after the event
cd infra ; uv run cdk destroy ArtisanMvp-prod -c account=<ACCOUNT> -c originVerify=$ov
```

**Optional CI/CD (not today)**
- Create a GitHub OIDC identity provider and a deploy role scoped to `cdk-hnb659fds-*` roles. Run the same build steps on `ubuntu-latest` with `astral-sh/setup-uv` and `pnpm/action-setup`, then `cdk deploy`.
- This is general practice and was not re-verified this session.

### Gaps
- Whether uv's `--target` install with `--python-platform` works with `--frozen` exports containing hashes was not tested. The `--no-hashes` export above sidesteps it.
- `cdk.json` must use `"app": "uv run python app.py"`. On Windows, check that `uv` is on PATH for the CDK subprocess.

---

## 12. Cost estimate (us-east-1 list prices) and fit within $114 credits

### Takeaway
- **Demo scale** (about 300 API requests a day, about 9k a month): **about $0.45 a month**, almost all of it the Secrets Manager secret. Everything else sits inside free tiers.
- **10k MAU** (assume 1M API requests and 4M CloudFront requests a month): **about $6–8 a month**.
- Both fit easily inside the $114 credit balance, provided real SMS stays off. **Real SMS at 10k MAU would cost about $1,700 a month.**
- The account is a pre-July-2025 PAID account, so 12-month new-customer offers (for example the API Gateway free tier) do not apply. The Lambda, DynamoDB storage, CloudFront, Scheduler and Cognito free allowances are documented as monthly or ongoing.

### Cited Findings
- **Lambda:** arm64 $0.0000133334/GB-s, $0.20/M requests. Free: 1M requests and 400k GB-s a month — [Price List API](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AWSLambda/current/us-east-1/index.json); [Lambda pricing](https://aws.amazon.com/lambda/pricing/).
- **DynamoDB:** $0.625/M WRU, $0.125/M RRU, $0.25/GB after 25 GB free — [Price List API](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonDynamoDB/current/us-east-1/index.json); [DynamoDB pricing](https://aws.amazon.com/dynamodb/pricing/on-demand/).
- **CloudFront:** always free 1 TB, 10M requests and 2M Function invocations a month — [CloudFront pay-as-you-go](https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/).
- **S3:** $0.005 per 1k PUT/POST, $0.0004 per 1k GET — [Price List API, S3](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonS3/current/us-east-1/index.json).
- **CloudWatch Logs:** $0.50/GB ingested, $0.03/GB-month — [Price List API, CloudWatch](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonCloudWatch/current/us-east-1/index.json).
- **API Gateway HTTP API** (not used): $1.00/M — [API Gateway pricing](https://aws.amazon.com/api-gateway/pricing/).
- **Cognito Essentials** (not used): 10k MAU free, then $0.015/MAU — [Cognito pricing](https://aws.amazon.com/cognito/pricing/).
- **Messaging:**
  - SMS to Cameroon: $0.28821 — [SMS CSV](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/business-applications/approved/documents/End-User-Messaging-SMS-Prices.ebc340b4d416d90832dd59629c4792b0deb6f8bc.csv).
  - WhatsApp: AWS $0.005 per outbound message — [EUM pricing](https://aws.amazon.com/end-user-messaging/pricing/).
  - Meta "Rest of Africa" utility fee: $0.0030 — [Meta fee sheet](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/business-applications/approved/documents/2026-10-usd-rates.12c5e2244978e162c3431f0dee6a2c09acfa91b9.csv).
- **Budgets:** monitoring free — [Budgets pricing](https://aws.amazon.com/aws-cost-management/aws-budgets/pricing/).
- **Scheduler:** 14M a month free — [EventBridge pricing](https://aws.amazon.com/eventbridge/pricing/).
- **Free-tier regime:** accounts created before 15 July 2025 stay on the legacy free tier, whose 12-month offers have expired for older accounts — [InfoQ](https://www.infoq.com/news/2025/07/aws-risk-free-account-credits).

### Inferences
**Demo scale** (9k API requests a month, 1024 MB × 150 ms average, about 30k page/asset requests, under 1 GB data)

| Service | Usage | List cost | After free tier |
|---|---|---|---|
| Lambda | 9k req; 9k × 0.15 s × 1 GB = 1,350 GB-s | $0.0018 + $0.018 | **$0.00** |
| DynamoDB on-demand | about 60k RRU, about 15k WRU, under 0.1 GB | $0.0075 + $0.0094 | **about $0.02** |
| CloudFront | about 40k requests, about 1 GB | — | **$0.00** |
| S3 (site + media) | under 0.2 GB, about 1k PUT, about 5k GET | about $0.01 | **about $0.01** |
| CloudWatch Logs | about 20 MB | $0.01 | **about $0.01** |
| Secrets Manager | 1 secret | about $0.40 (prior knowledge) | **about $0.40** |
| Budgets | 1 cost budget | free | **$0.00** |
| SMS (optional) | at most 3 to +237 (capped by the $1 sandbox) | $0.86 | **at most $1.00** |
| **Total** | | | **about $0.45 a month (about $1.45 with live SMS)** |

**10k MAU** (assume 1M API requests a month: about 100 per MAU-month across customers, artisans and agents. Each request averages about 10 RRU and 3 WRU including GSI writes. 4M CloudFront requests, about 60 GB out. 3 GB of photos.)

| Service | Calculation | Cost |
|---|---|---|
| Lambda | 1M req (free) + 150k GB-s (free) | **$0.00** (about $2.20 if no free tier: $0.20 + 150k × $0.0000133334) |
| DynamoDB | 10M RRU × $0.125/M + 3M WRU × $0.625/M; storage about 1 GB (free) | **about $3.13** |
| CloudFront | 4M requests, 60 GB (always-free tier) | **$0.00** |
| S3 | 3 GB × $0.023 + 20k PUT × $0.005/1k + 500k GET × $0.0004/1k (most GETs cached at the edge) | **about $0.37** |
| CloudWatch Logs | 1M × about 1.5 KB = 1.5 GB × $0.50 + storage | **about $0.80** |
| Secrets Manager | 1 secret + about 30k API calls | **about $0.55** |
| *If using API Gateway HTTP API instead* | 1M × $1/M | *(+$1.00)* |
| *If using Cognito Essentials* | 10k MAU within the free tier | *(+$0.00; +$0.015 per MAU above 10k)* |
| *If using the keep-warm Scheduler* | 8.6k invocations | *($0.00)* |
| **Core total** | | **about $4.85 a month; budget $6–8 for headroom** |
| *Messaging if live, 3k jobs × 2 notifications* | SMS 6k × $0.288 = **$1,729**; WhatsApp utility 6k × $0.008 = **$48** | *(dominant cost driver)* |

**Credits**
- $114 covers the demo for years, or the 10k-MAU core stack for more than a year.
- Whether AWS promotional credits apply to End User Messaging SMS or WhatsApp (Meta pass-through) charges was **not verified**. Treat messaging as potentially cash-billed.

### Gaps
- The Lambda free tier's applicability to this specific PAID legacy account was not confirmed on a primary page that states "always free". The Lambda pricing page states it monthly without an expiry note.
- Secrets Manager pricing ($0.40/secret-month, $0.05 per 10k calls) comes from prior knowledge, not fetched this session.
- The per-request DynamoDB RRU/WRU assumptions are modelling assumptions. Validate them with CloudWatch `ConsumedReadCapacityUnits` after a day of use.

---

## 13. Gotchas checklist (Windows, bundling, CORS, Next.js on S3, cache)

### Takeaway
Most one-day failures will come from:
1. Building Lambda wheels for the wrong platform on Windows.
2. Next.js dynamic routes or `useSearchParams` in a static export.
3. CloudFront error responses or `Host` forwarding breaking the API.
4. Duplicate CORS headers.
5. The account's 10-concurrency Lambda cap.
6. OneDrive path locking.

### Cited Findings
- Static export forbids dynamic routes without `generateStaticParams()`, rewrites and headers. `trailingSlash: true` emits folder `index.html` files — [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).
- Duplicate CORS headers arise if both the Function URL CORS config and the function emit them — [Function URL docs](https://docs.aws.amazon.com/lambda/latest/dg/urls-configuration.html).
- OAC on Function URLs requires an `x-amz-content-sha256` header for POST/PUT — [CloudFront OAC for Lambda](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-lambda.html).
- CloudFront's default root object applies only to `/`, so subdirectory `index.html` needs a function — [AWS blog](https://aws.amazon.com/blogs/networking-and-content-delivery/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-cloudfront-functions).
- Invalidation paths: 1,000 a month free — [CloudFront pay-as-you-go](https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/).
- Reserved concurrency needs 100 unreserved, so it is impossible at a limit of 10 — [Lambda reserved concurrency](https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html).
- The uv `--python-platform aarch64-manylinux2014` flag selects Linux arm64 wheels — [uv AWS Lambda guide](https://docs.astral.sh/uv/guides/integration/aws-lambda/).

### Inferences
1. **Wheels:** never `pip install` into the asset folder without `--python-platform aarch64-manylinux2014`. Windows wheels (`.pyd`) fail at import with `No module named 'pydantic_core._pydantic_core'`. Keep Lambda `architecture=ARM_64` consistent with the wheel platform.
2. **Asset freshness:** CDK hashes `build/api`. Always run `build_backend.ps1` before `cdk deploy`. Stale or empty folders deploy silently.
3. **Line endings:** irrelevant with Mangum. If switching to LWA, `run.sh` must have LF endings and `chmod +x`. Zip permissions on Windows are a known LWA caveat, which the LWA Zip guide mentions.
4. **Routes:** use `/artisan/?id=…` and not `/artisan/[id]`. Wrap `useSearchParams` users in `<Suspense>`. All internal links should end with `/` to match `trailingSlash: true`.
5. **No `next/image` optimisation:** set `images.unoptimized: true`.
6. **API path prefix:** FastAPI routes live under `/api`. Health is at `/api/health`.
7. **CORS:** production is same-origin, so leave CORS off everywhere. For local dev, enable FastAPI `CORSMiddleware` only when `ENV=local`. Do not also set Function URL CORS.
8. **Host header:** use `OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER` for `/api/*`.
9. **Auth header:** send the JWT as `X-Session-Token` rather than `Authorization`, to avoid CloudFront `Authorization` forwarding edge cases. Never cache `/api/*`.
10. **Error responses:** no distribution-level custom error pages. They would rewrite API 403/404 responses.
11. **Cache:** `BucketDeployment(distribution_paths=["/*"])` invalidates each deploy, which takes 1–5 minutes to propagate. Hashed `/_next/static` assets are safe to cache long. HTML is invalidated.
12. **Concurrency 10:** file the increase. Don't load-test. Keep requests fast (no N+1 DynamoDB calls; use `BatchGetItem`).
13. **OneDrive:** develop in `C:\dev\…`. Long paths in `node_modules` and `cdk.out` plus sync locks cause `EPERM` and `EBUSY` errors.
14. **Bootstrap:** do not run `cdk bootstrap` again in us-east-1. Use the existing `CDKToolkit` stack (default qualifier). Never touch the `atria-dev-*`, `Obsidian*`, `RedRising*` or `rest-weather-api` stacks.
15. **USSD form encoding:** FastAPI needs `python-multipart` for `Form(...)` parameters. Alternatively, parse `await request.body()` with `urllib.parse.parse_qs` and skip the extra dependency.
16. **Mangum and the Function URL payload v2:** Mangum handles Function URL events. Set `lifespan="off"` unless startup hooks are needed.
17. **Media key prefix:** the CloudFront `/media/*` path maps 1:1 to S3 keys, so store uploads as `media/uploads/<artId>/<uuid>.jpg`.
18. **Budget visibility:** set `IncludeCredit=false` or alerts never fire while credits absorb spend. Activate the `project` cost-allocation tag.

### Gaps
- `python-multipart` as the FastAPI requirement for form parsing is prior knowledge, not re-verified this session.

---

## Source list

1. CloudFront flat-rate pricing plans (docs) — https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html
2. Amazon CloudFront pricing — https://aws.amazon.com/cloudfront/pricing/
3. Amazon CloudFront pay-as-you-go pricing — https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/
4. AWS Networking & Content Delivery Blog, "Introducing flat-rate pricing plans with no overages" — https://aws.amazon.com/blogs/networking-and-content-delivery/introducing-flat-rate-pricing-plans-with-no-overages
5. AWS Pricing Plan Manager, Available plans — https://docs.aws.amazon.com/PricingPlanManager/latest/UserGuide/plans.html
6. AWS Lambda pricing — https://aws.amazon.com/lambda/pricing/
7. AWS Price List API, Lambda us-east-1 — https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AWSLambda/current/us-east-1/index.json
8. AWS Price List API, Lambda eu-west-3 — https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AWSLambda/current/eu-west-3/index.json
9. AWS Price List API, DynamoDB us-east-1 — https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonDynamoDB/current/us-east-1/index.json
10. AWS Price List API, DynamoDB eu-west-3 — https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonDynamoDB/current/eu-west-3/index.json
11. AWS Price List API, API Gateway us-east-1 — https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonApiGateway/current/us-east-1/index.json
12. AWS Price List API, API Gateway eu-west-3 — https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonApiGateway/current/eu-west-3/index.json
13. AWS Price List API, CloudWatch us-east-1 — https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonCloudWatch/current/us-east-1/index.json
14. AWS Price List API, CloudWatch eu-west-3 — https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonCloudWatch/current/eu-west-3/index.json
15. AWS Price List API, S3 us-east-1 — https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonS3/current/us-east-1/index.json
16. AWS Price List API, S3 eu-west-3 — https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonS3/current/eu-west-3/index.json
17. Amazon S3 pricing — https://aws.amazon.com/s3/pricing/
18. Amazon API Gateway pricing — https://aws.amazon.com/api-gateway/pricing/
19. Amazon DynamoDB on-demand pricing — https://aws.amazon.com/dynamodb/pricing/on-demand/
20. AWS End User Messaging pricing — https://aws.amazon.com/end-user-messaging/pricing/
21. AWS End User Messaging SMS price list (CSV) — https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/business-applications/approved/documents/End-User-Messaging-SMS-Prices.ebc340b4d416d90832dd59629c4792b0deb6f8bc.csv
22. WhatsApp Meta fee rates via AWS (Oct 2026 sheet) — https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/business-applications/approved/documents/2026-10-usd-rates.12c5e2244978e162c3431f0dee6a2c09acfa91b9.csv
23. AWS End User Messaging SMS sandbox — https://docs.aws.amazon.com/sms-voice/latest/userguide/sandbox.html
24. Supported countries for SMS (Cameroon row) — https://docs.aws.amazon.com/sms-voice/latest/userguide/phone-numbers-sms-by-country.html
25. AWS EUM Social, Link a WABA (embedded signup) — https://docs.aws.amazon.com/end-user-messaging/latest/userguide/nx-whatsapp-gsu-link-waba.html
26. AWS EUM Social, Getting started with WhatsApp — https://docs.aws.amazon.com/social-messaging/latest/userguide/getting-started-whatsapp.html
27. AWS EUM Social, Send outbound WhatsApp — https://docs.aws.amazon.com/end-user-messaging/latest/userguide/nx-whatsapp-send-outbound.html
28. WANotifier, Test phone number limitations — https://help.wanotifier.com/en/article/test-phone-number-limitations-kt0ly2/
29. Meta for Developers, Business phone numbers — https://developers.facebook.com/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers.md
30. Blueticks, WhatsApp API without Meta verification — https://blueticks.co/blog/whatsapp-api-without-meta-verification
31. Next.js docs, Static Exports — https://nextjs.org/docs/app/guides/static-exports
32. AWS Amplify Hosting, Next.js support — https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html
33. AWS Amplify Hosting, SSR troubleshooting — https://docs.aws.amazon.com/ko_kr/amplify/latest/userguide/troubleshooting-SSR.html
34. issoh.co.jp, Amplify Hosting Next.js guide — https://www.issoh.co.jp/md/tech/7252
35. Classmethod, Amplify adapter-nextjs v1.7.0 supports Next.js 16 — https://dev.classmethod.jp/articles/aws-amplify-adapter-nextjs-v1-7-0-next-js-16/
36. OpenNext, "3 years of OpenNext" — https://opennext.js.org/news/2026-03-25-3-years-of-opennext
37. Next.js blog, Next.js across platforms — https://nextjs.org/blog/nextjs-across-platforms
38. Amazon Cognito pricing — https://aws.amazon.com/cognito/pricing/
39. CloudFront, Restrict access to a Lambda function URL origin (OAC) — https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-lambda.html
40. AWS Lambda, Creating and managing function URLs — https://docs.aws.amazon.com/lambda/latest/dg/urls-configuration.html
41. AWS Lambda, Configuring reserved concurrency — https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html
42. AWS Lambda quotas — https://docs.aws.amazon.com/lambda/latest/dg/limits.html
43. AWS re:Post, Lambda concurrency set to 10 in new accounts — https://repost.aws/questions/QUto8jBkZtQfSL-Qr3XEHybg/what-can-i-do-about-lambda-concurrency-being-set-to-10-in-new-accounts-even-though-default-is-1000
44. AWS Knowledge Center, Lambda concurrency limit increase — https://www.repost.aws/knowledge-center/lambda-concurrency-limit-increase
45. AWS Lambda runtimes — https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html
46. AWS News Blog, Announcing AWS Lambda Web Functions (12 Oct 2026) — https://aws.amazon.com/blogs/aws/announcing-aws-lambda-web-functions-for-fast-consistent-web-app-performance-anywhere/
47. AWS Lambda Web Adapter (GitHub) — https://github.com/awslabs/aws-lambda-web-adapter
48. AWS Lambda Web Adapter, fastapi-zip example — https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/fastapi-zip
49. Mangum (GitHub) — https://github.com/Kludex/mangum
50. Mangum (PyPI) — https://pypi.org/project/mangum
51. uv docs, Using uv with AWS Lambda — https://docs.astral.sh/uv/guides/integration/aws-lambda/
52. CDK Python local bundling gist — https://gist.github.com/CarlosDomingues/09cf89f29c9c4c4f39e8ac2d1764a7ee
53. aws-cdk issue #18290 (PythonFunction local bundling) — https://github.com/aws/aws-cdk/issues/18290
54. AWS Builder Center, "Welcome to Lazytown" (Python Lambda cold starts) — https://builder.aws.com/content/3JXXtAOIfjr21lkw5ACBG0u6emV/welcome-to-lazytown-how-being-lazy-made-my-python-lambda-9665percent-faster
55. Cloudflare blog, Python Workers advancements (FastAPI cold-start comparison) — https://blog.cloudflare.com/python-workers-advancements
56. Aurora Serverless v2 auto-pause docs — https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html
57. Amazon EventBridge pricing — https://aws.amazon.com/eventbridge/pricing/
58. AWS Budgets pricing — https://aws.amazon.com/aws-cost-management/aws-budgets/pricing/
59. boto3, S3 generate_presigned_post — https://docs.aws.amazon.com/boto3/latest/reference/services/s3/client/generate_presigned_post.html
60. AWS Builder Center, Direct file uploads with presigned requests — https://builder.aws.com/content/3KQNkyoO1Wk5ewDr0IXo8zaAmkH/direct-file-uploads-to-amazon-s3-a-practical-guide-to-presigned-requests
61. CloudFront Functions example, add index.html — https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-index.html
62. AWS blog, Default directory indexes with CloudFront Functions — https://aws.amazon.com/blogs/networking-and-content-delivery/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-cloudfront-functions
63. OneUptime, CloudFront Functions URL rewrites — https://oneuptime.com/blog/post/2026-02-12-cloudfront-functions-url-rewrites/view
64. Classmethod, CDK CloudFront Functions index.html — https://dev.classmethod.jp/articles/adding-index-html-to-request-url-using-cloudfront-functions-in-aws-cdk/
65. InfoQ, AWS free tier changes (July 2025) — https://www.infoq.com/news/2025/07/aws-risk-free-account-credits
66. AWS re:Post Knowledge Center, Free tier start and expiry — https://www.repost.aws/knowledge-center/aws-free-tier-account-start-expire
67. Africloud network page (Douala RTTs) — https://africloud.com/network
68. Economize, AWS latency af-south-1 vs us-east-1 — https://www.economize.cloud/resources/aws/latency/af-south-1-vs-us-east-1/
69. UCT, Measuring Cloud Latency in Africa (PDF) — https://pubs.cs.uct.ac.za/1704/1/Measuring_Cloud_Latency_in_Africa.pdf
70. AWS What's New, CloudFront edge location in Nigeria (2023) — https://aws.amazon.com/about-aws/whats-new/2023/06/aws-edge-location-nigeria
71. DEV, USSD 101 with Africa's Talking — https://dev.to/franciskinyuru/ussd-101-with-africastalking-3846
72. Africa's Talking gitbook, USSD (Python) — https://africastalkingltd.gitbooks.io/mobile-communication-apis/python/programmer_level/ussd.html
73. kubaik, USSD in 2026 — https://kubaik.github.io/ussd-in-2026-africas-silent-infra-layer/
74. Earlier internal notes, 06_system_design_aws_python.md (long-term architecture) — local file `research_notes/Cameroon artisan trust platform/06_system_design_aws_python.md`
75. Read-only AWS CLI checks on the user's account, us-east-1, 12 Nov 2026: `lambda get-account-settings`, `service-quotas get-service-quota`, `pinpoint-sms-voice-v2 describe-account-attributes/describe-spend-limits/describe-verified-destination-numbers`, `sesv2 get-account`, `cloudformation list-stacks`, `budgets describe-budgets`, `cloudfront list-distributions`, `ce get-cost-and-usage` (primary account data, no URL)
