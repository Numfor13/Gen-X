# Design Inspiration Moodboard: Material 3 Expressive, Mobile-First Artisan Trust and Matching Platform (Cameroon)

Research date: 12 November 2026. Scope: visual references for every key screen plus a recommended visual direction.

**How this was gathered, and how far to trust it:**
- **Dribbble:** Plain WebFetch and curl were blocked by Dribbble's AWS WAF, which answered with `x-amzn-waf-action: challenge`. I did not try to get around the challenge. Instead, Dribbble search pages were loaded in the desktop app's built-in browser as an ordinary visitor, with no sign-in. Shot IDs, titles and designer names come from the search results there. After about 35 searches, Dribbble began answering 405 to shot-detail requests. So most shot captions could not be read.
- **"What makes it good" notes:** These are based on the shot or project title, the designer, the search context, and a small number of thumbnails I actually saw. They are leads for a designer to confirm by eye. They are not verified visual audits. Where a note goes beyond the title, it is marked *(verify)*.
- **Behance:** Search pages were read in the same browser, with no sign-in.
- **Not reached:** Pinterest and Mobbin (Mobbin needs an account) were not accessed. See the Gaps sections.
- **URL format:** Every URL below came from a live listing on 12 November 2026. Dribbble shot URLs follow `https://dribbble.com/shots/<id>-<slug>`.

---

## Q1. Landing / home with trade picker

### Takeaway
Current home-services shots share one layout: a large greeting or search block, a grid of service-category icon tiles, then a "top-rated near you" carousel. For our picker, borrow that layout. Then make it M3 Expressive: oversized shape-morphed category tiles, and an icon plus picture for every trade so low-literacy users can choose without reading.

### Cited Findings (references)

1. **Handyman App** by Nija Works. https://dribbble.com/shots/27533799-Handyman-App
   - What makes it good: The thumbnail shows an orange-accented phone UI on a warm background, with stacked cards and booking details (seen in the search grid).
   - What to borrow: A warm accent on a neutral surface, and stacked summary cards.
2. **Handyman App Redesign ✸ Home Services** by Digitalkit UI/UX Design. https://dribbble.com/shots/26338546-Handyman-App-Redesign-Home-Services
   - What makes it good: The thumbnail is a deep teal hero with a light app UI and rounded list rows.
   - What to borrow: Dark-hero, light-content contrast for the landing header.
3. **Handyman App UI Design** by aPurple. https://dribbble.com/shots/20339734-Handyman-App-UI-Design
   - What makes it good: A well-liked handyman concept (about 19.3k views in the listing). Its category grid layout needs checking *(verify)*.
   - What to borrow: Category grid and trade iconography.
4. **Handyman & Home Repair Service Mobile App UI UX Design** by Panze. https://dribbble.com/shots/27403590-Handyman-Home-Repair-Service-Mobile-App-UI-UX-Design
   - What makes it good: A studio-grade multi-screen set covering home, category and provider screens.
   - What to borrow: How the home feed is structured.
5. **Hanwik Handyman: Home Repair & Service Marketplace App Design** by Panze. https://dribbble.com/shots/27403629-Hanwik-Handyman-Home-Repair-Service-Marketplace-App-Design
   - What makes it good: A marketplace framing, the same as ours.
   - What to borrow: Mixing a marketplace feed with "book again".
6. **KarigorX: On-Demand Home Services & Expert Booking App** by Ibrahim Khalil. https://dribbble.com/shots/27727583-KarigorX-On-Demand-Home-Services-Expert-Booking-App
   - What makes it good: "Karigor" means artisan or craftsman in Bengali, so this is close to our informal-artisan market.
   - What to borrow: Positioning the craftsperson as an "expert".
7. **Super App: Modern Multi-Service App Design** by Bhargav Nakrani. https://dribbble.com/shots/27623050-Super-App-Modern-Multi-Service-App-Design
   - What makes it good: A multi-vertical tile grid.
   - What to borrow: A dense but scannable picker for more than 10 trades.
8. **Multi Service Mobile App UI Design** by Mohammad Ali. https://dribbble.com/shots/27358367-Multi-Service-Mobile-App-UI-Design
   - What to borrow: An alternative arrangement of category tiles.
9. **Fixora: Home Service Landing Page** by Rylic Studio. https://dribbble.com/shots/26922667-Fixora-Home-Service-Landing-Page
   - What to borrow: The desktop landing hero and trust strip (counts, testimonials) for the desktop breakpoint.
10. **Home Services Landing Page UI/UX Design** by uxui.raha. https://dribbble.com/shots/27817299-Home-Services-Landing-Page-UI-UX-Design
    - What to borrow: The "how it works" three-step band for the desktop landing.
11. **Village: Home Services Landing Page & Brand Identity** (Behance). https://www.behance.net/gallery/256100117/Village-Home-Services-Landing-Page-Brand-Identity
    - What makes it good: The name suggests a community-scale brand, which fits the "quarter" (neighbourhood) framing of Cameroonian cities.
    - What to borrow: A neighbourly brand voice.
12. **Onfix: Home Service App Onboarding Design** by Rafli Yoga. https://dribbble.com/shots/27344484-Onfix-Home-Service-App-Onboarding-Design
    - What to borrow: First-run onboarding illustration slides.

### Inferences
- The trade picker should be a 3-column grid on mobile with tiles at least 96 dp. Each tile should carry a pictogram, the trade name in French and English, and optionally an audio cue. Use M3 Expressive's shape set (cookie or clover shapes) as tile containers so each trade gets a memorable silhouette.
- For desktop, reuse Fixora and Village style landing bands, but swap generic stock photos for illustrated Cameroonian artisans.

### Gaps
- Mobbin's real-app home screens (Thumbtack, TaskRabbit, Urban Company) could not be viewed because Mobbin needs sign-in.

---

## Q2. Request flow (pick trade, then problem, then location/quarter, then urgency)

### Takeaway
The best references split the request into one question per screen with big tappable choice cards and a visible step indicator. Borrow the job-posting flow, the cost-guide pattern, and the escrow-checkout clarity.

### Cited Findings (references)

1. **Home Services App: Job Posting & Escrow Checkout** by Raza ul Mustafa. https://dribbble.com/shots/27662417-Home-Services-App-Job-Posting-Escrow-Checkout
   - What to borrow: A multi-step job-posting flow, and the idea of showing money protection at checkout.
2. **Home Services Booking App UI Design Cost Guide UX** by Farhan ahmed Jibon. https://dribbble.com/shots/27292750-Home-Services-Booking-App-UI-Design-Cost-Guide-UX
   - What to borrow: Showing cost guidance inside the request flow. This feeds directly into our fair price range.
3. **On-Demand Home Services & Contractor Booking Mobile App UI** by Sheikh Raihan UI. https://dribbble.com/shots/27726047-On-Demand-Home-Services-Contractor-Booking-Mobile-App-UI
   - What to borrow: How the problem-description and scheduling steps are laid out.
4. **Handyman Home Service Booking App UX UI Design** by Opedia Studio. https://dribbble.com/shots/26989519-Handyman-Home-Service-Booking-App-UX-UI-Design
   - The same project is also on Behance: https://www.behance.net/gallery/241405203/Handyman-Home-Service-Booking-App-UX-UI-Design
   - What to borrow: The end-to-end booking steps.
5. **FixNest: Home Service Booking App** by Ghazaleh Fathi. https://dribbble.com/shots/27558997-FixNest-Home-Service-Booking-App
   - What to borrow: The design of the stepper and choice cards *(verify)*.
6. **Orderly: UI Design** (Behance). https://www.behance.net/gallery/162581613/UI-Design-Orderly
   - What makes it good: Built around booking a specialist in free time slots "in the shortest time possible" (per its search snippet).
   - What to borrow: An urgency and slot picker.
7. **Helpo: Home Services App, UX/UI Case Study** (Behance). https://www.behance.net/gallery/255426939/Helpo-Home-Services-App-UXUI-Case-Study
   - What to borrow: Rationale from the case study for the request flow.
8. **FixNear: Home Services App, UI/UX Case Study** (Behance). https://www.behance.net/gallery/257518525/FixNear-Home-Services-App-UIUX-Case-Study
   - What makes it good: A "near" framing.
   - What to borrow: Proximity and location selection.
9. **HandyNaija: home services marketplace** (Nigeria; Peerlist write-up linking to a Behance case study). https://peerlist.io/mdibrahimshimul/project/handynaija--home-services-marketplace
   - What makes it good: Described as a problem-first case study for booking trusted home services in Nigeria.
   - What to borrow: West-African context and trust framing.
10. **Multilingual Login** by Vinu Aakash. https://dribbble.com/shots/27801911-Multilingual-Login
    - What to borrow: The language-choice pattern for French, English and Pidgin at the first step.

### Inferences
- Present "quarter" (Bonapriso, Akwa, Bastos, and so on) as a searchable chip list with the recent quarter pinned. Map pins alone are not enough, because addresses are informal.
- Show urgency as three big pictogram cards ("Now", "Today", "This week"). Use the M3 Expressive emphasised type scale for the selected card.

### Gaps
- I found no reference designed specifically around informal landmark-based addressing. That pattern will need original design.

---

## Q3. Match results with score explanation and fair price range

### Takeaway
No shot found combines a match score with an explanation. The nearest patterns are provider cards from services marketplaces and "why recommended" or benchmark cards from dashboards. Compose our card from those parts: avatar, tier badge, distance, a score ring with two or three reasons as chips, and a price-range bar.

### Cited Findings (references)

1. **Service Marketplace App** by Zubair un Nisa. https://dribbble.com/shots/27340895-Service-Marketplace-App
   - What to borrow: The layout of the provider list card.
2. **Toolsy: Your Trusted Handyman for Home Repairs** by Walid Khan. https://dribbble.com/shots/26164702-Toolsy-Your-Trusted-Handyman-for-Home-Repairs
   - What makes it good: Its positioning puts trust first.
   - What to borrow: Trust copy and badge placement on result cards.
3. **Home Service App UIUX Design** by KG UX DESIGN. https://dribbble.com/shots/27628854-Home-Service-App-UIUX-Design
   - What to borrow: An alternative provider-card density.
4. **Cleaning & Repair Services App UI Concept** by Asad. https://dribbble.com/shots/27053531-Cleaning-Repair-Services-App-UI-Concept
   - What to borrow: How the listing filters are laid out.
5. **Benchmark Dashboard card review UI** by Shahriar Sultan. https://dribbble.com/shots/27184240-Benchmark-Dashboard-card-review-UI
   - What to borrow: Benchmark-bar visualisation, reused as "fair price range: low, typical, high" with a marker for the quoted price.
6. **Gen-Z Teens Job Discovery App with Time-Bound Gig Matching** by Raza ul Mustafa. https://dribbble.com/shots/27306004-Gen-Z-Teens-Job-Discovery-App-with-Time-Bound-Gig-Matching
   - What to borrow: How a match is shown in a gig context.
7. **Car Mechanic Finder App UIUX** by Md. Liakat. https://dribbble.com/shots/25864127-Car-Mechanic-Finder-App-UIUX
   - What to borrow: A mechanic-specific results list, with distance shown.
8. **Turbo Tech: Workshop Finder & Mechanic Assistance Mobile Apps** by Firsa Meyva. https://dribbble.com/shots/27698695-Turbo-Tech-Workshop-Finder-Mechanic-Assistance-Mobile-Apps
   - What to borrow: Mixing a map with list results.

### Inferences
- Express the score as a circular "fit" indicator using M3 Expressive's wavy or progress shapes, with a plain-language line underneath. For example: "Close to you · 42 verified jobs · 96% satisfied".
- The price range should be a horizontal bar with a FCFA min–max and a dot showing the typical price. This follows the benchmark-card idea.

### Gaps
- No public shot was found showing algorithmic match explanations for consumers. This pattern is under-explored, and we can stand out with it.

---

## Q4. Artisan trust profile (badge tier ladder, vouches, verified jobs, % satisfied, QR badge)

### Takeaway
Combine a bento-grid profile with gamification badge ladders. Then present them in a grown-up, credential style rather than a playful game style. Each bento tile carries one trust fact.

### Cited Findings (references)

1. **Bento Card Profile** by DevDock. https://dribbble.com/shots/25763787-Bento-Card-Profile
   - What to borrow: Bento tiles for stats such as jobs, satisfaction and vouches.
2. **Bento box user profile** by Ági Rigó. https://dribbble.com/shots/24912778-Bento-box-user-profile
   - What to borrow: Mixed tile sizes, with a hero tile for the tier badge.
3. **Gen Z Gamified Profile UI: From Blank Slate to Persona** by Lakshay Bansal. https://dribbble.com/shots/27240303-Gen-Z-Gamified-Profile-UI-From-Blank-Slate-to-Persona
   - What to borrow: A profile that visibly fills up as the artisan earns trust.
4. **Services page of a service provider profile** by Hexcode Studio. https://dribbble.com/shots/27420618-Services-page-of-a-service-provider-profile
   - What to borrow: A tabbed provider profile (services, reviews, about).
5. **Badges levels from bronze to shiny** by Aymeric Delpeuch. https://dribbble.com/shots/24389972-Badges-levels-from-bronze-to-shiny
   - What to borrow: A material progression across tiers.
6. **Badges Levels UI** by Dev Mehta. https://dribbble.com/shots/23077839-Badges-Levels-UI
   - What to borrow: The ladder or progress view showing the next tier.
7. **Gamification Design System: XP, Streaks, Badges, Level-Up Components** by Design Studio. https://dribbble.com/shots/27683402-Gamification-Design-System-XP-Streaks-Badges-Level-Up-Comp
   - What to borrow: A component set approach for building tier badges.
8. **Admin Dashboard for a Gig Worker Hiring Platform** by Aan Sharma. https://dribbble.com/shots/27651818-Admin-Dashboard-for-a-Gig-Worker-Hiring-Platform
   - What to borrow: How worker-verification status is shown, for the admin side of the profile.
9. **Tailor App UI/UX: Custom Clothing Designer Marketplace** by UIX Maruf Hossen. https://dribbble.com/shots/27666243-Tailor-App-UI-UX-Custom-Clothing-Designer-Marketplace
   - What to borrow: A portfolio gallery inside the profile, so a tailor's work photos act as proof.
10. **TailorMate: Custom Clothing & Personal Tailoring App** by Tajkim Masum. https://dribbble.com/shots/26570553-TailorMate-Custom-Clothing-Personal-Tailoring-App
    - What to borrow: The tailor-specific profile and measurement context.

### Inferences
- Layout: a hero tile with photo, name, trade and tier medal; a 2×2 grid of stat tiles (verified jobs, % satisfied, vouches, years active); a portfolio strip; and a "Show QR badge" floating action button.

### Gaps
- No African-artisan profile reference was found on Dribbble.

---

## Q5. Badge / medal design for trust tiers

### Takeaway
Achievement-badge shots offer rich medal languages. Choose a restrained set: three or four tiers, each with a distinct shape plus colour plus a short label. Do not rely on colour alone. That serves colour-blind and low-literacy users, and it maps naturally onto M3 Expressive's shape library.

### Cited Findings (references)

1. **Radiate: Achievement Badges for a Mindfulness App** by tubik. https://dribbble.com/shots/27449131-Radiate-Achievement-Badges-for-a-Mindfulness-App
   - What to borrow: Calm, non-childish badges from a top studio.
2. **freud v3: AI Mental Health App Achievements Badges UIUX** by strangehelix. https://dribbble.com/shots/24683923-freud-v3-AI-Mental-Health-App-Achievements-Badges-UIUX
   - What to borrow: Badges with soft, organic shapes.
3. **Achievement badges** by Aleksandar Savić / Almigor. https://dribbble.com/shots/25572775-Achievement-badges
   - Second set: https://dribbble.com/shots/25553522-Achievement-badges
   - What to borrow: Line-and-fill badge craft.
4. **Gamification Achievement Badge UI Screen** by Jaynal Abedin. https://dribbble.com/shots/27284605-Gamification-Achievement-Badge-UI-Screen
   - What to borrow: The "badge earned" celebration screen.
5. **Tarteel ai: Achievement Badges Icon Illustration** by M Wildan Cahya Syarief. https://dribbble.com/shots/15777429-Tarteel-ai-Achievement-Badges-Icon-Illustration
   - What to borrow: Culturally specific motifs inside a badge, worth echoing with Cameroonian textile patterns.
6. **Corporate badge level 2** by Valter Bispo. https://dribbble.com/shots/23849332-Corporate-badge-level-2
   - What to borrow: A professional, credential-like medal tone.
7. **Game UI Rank Badges & Achievement Medals Set** (Behance). https://www.behance.net/gallery/257188143/Game-UI-Rank-Badges-Achievement-Medals-Set
   - What to borrow: Rank progression logic. Avoid the game styling.
8. **Collection of achievement badges/medals** (Behance). https://www.behance.net/gallery/155051371/collection-of-achievement-badgesmedals
   - What to borrow: Ideas for medal silhouettes.

### Inferences
- See Q14 (Visual direction) for the proposed tier system.

### Gaps
- None beyond the general visual-verification caveat.

---

## Q6. QR badge card design

### Takeaway
The best references are ID-badge and employee-directory card designs, plus brand ID-card systems. The QR badge should read as an official credential: photo, name, trade, tier medal, QR code, and a short ID number.

### Cited Findings (references)

1. **Signature: A modern elite employee connection directory** by Theunis Hall. https://dribbble.com/shots/20749265-Signature-A-modern-elite-employee-connection-directory
   - What to borrow: A digital ID card with a QR code.
2. **I Will Design a Modern Professional ID Badge** by Joel Mwangi (Kenya-based designer name). https://dribbble.com/shots/26034165-I-Will-Design-a-Modern-Professional-ID-Badge
   - What to borrow: The layout of a printed lanyard badge.
3. **Digital badging app: bring motivation outside of classroom** by Jongmi Bae. https://dribbble.com/shots/22087911-Digital-badging-app-bring-motivation-outside-of-classroom
   - What to borrow: Showing and sharing badges digitally.
4. **Brand Identity Design: AI Startup Logo & ID Card System** by Orix Creative. https://dribbble.com/shots/27614371-Brand-Identity-Design-AI-Startup-Logo-ID-Card-System
   - What to borrow: An ID card as part of a brand system.
5. **Onco Brand Application: ID Card & Stationery** by Orix Creative. https://dribbble.com/shots/27502524-Onco-Brand-Application-ID-Card-Stationery
   - What to borrow: The hierarchy of a printed card.
6. **Paywave Mobile Apps** by SlabPixel. https://dribbble.com/shots/24169730-Paywave-Mobile-Apps
   - What to borrow: QR presentation inside a wallet-style card.

### Inferences
- See Q14 for the card specification.

### Gaps
- No African artisan-ID or market-trader badge reference was found online.

---

## Q7. Booking with a 4-digit job code

### Takeaway
OTP-entry screens and ticket or boarding-pass cards are the two patterns to blend. The job code should look like a ticket stub with big monospaced digits that can be read aloud over the phone.

### Cited Findings (references)

1. **Phone Number Verification App UI with OTP Authentication** by Farhan ahmed Jibon. https://dribbble.com/shots/27380410-Phone-Number-Verification-App-UI-with-OTP-Authentication
   - What to borrow: Large segmented digit boxes, for the artisan's code-entry side.
2. **Zevoa Mobile App: Login & OTP Verification Flow** by Orbix Studio LLC. https://dribbble.com/shots/26800898-Zevoa-Mobile-App-Login-OTP-Verification-Flow
   - What to borrow: The OTP flow states (entering, error, success).
3. **Modern Mobile UI Login Flow for Secure Authentication** by Ssm_Siam. https://dribbble.com/shots/26087066-Modern-Mobile-UI-Login-Flow-for-Secure-Authentication
   - What to borrow: Secure-feeling visual cues.
4. **Flight Ticket Card UX/UI concept** by Mariana. https://dribbble.com/shots/27061378-Flight-Ticket-Card-UX-UI-concept
   - What to borrow: The ticket-stub metaphor for the booking confirmation card.
5. **passenger ticket design** by zeanver. https://dribbble.com/shots/27567904-passenger-ticket-design
   - What to borrow: A perforation line and two-part card.
6. **Travel Booking App: Event Ticket Flow** by Keitoto. https://dribbble.com/shots/26527418-Travel-Booking-App-Event-Ticket-Flow
   - What to borrow: The "booking confirmed" moment.
7. **Cleaning Service App: Booking Management Flow** by Viktoriya Savchenko. https://dribbble.com/shots/27328253-Cleaning-Service-App-Booking-Management-Flow
   - What to borrow: The booking summary and management screen.

### Inferences
- Customer side: a ticket card showing "Your job code" with four 48sp digits, plus "Give this code to the artisan only when they arrive". Add a share-to-WhatsApp button.
- Artisan side: four large digit boxes with a numeric keypad, and a voice prompt.

### Gaps
- None beyond the general visual-verification caveat.

---

## Q8. Job tracking

### Takeaway
Order-tracking and dispatch shots provide the vertical status timeline. M3 Expressive's wavy progress indicator is a natural fit for the "on the way" state.

### Cited Findings (references)

1. **Tranzit: Order Tracking App UI** by Moobliy. https://dribbble.com/shots/27554909-Tranzit-Order-Tracking-App-UI
   - Second shot: https://dribbble.com/shots/27555010-Tranzit-Order-Tracking-App-UI
   - What to borrow: The status timeline.
2. **Trako: Order Tracking App** by Moobliy. https://dribbble.com/shots/27509595-Trako-Order-Tracking-App
   - What to borrow: Status chips and an ETA card.
3. **HelloGov: Mobile Order Tracking Application Status** by Eugen Eşanu. https://dribbble.com/shots/26363608--HelloGov-Mobile-Order-Tracking-Application-Status
   - What makes it good: Calm status design in a civic/government setting.
   - What to borrow: Status wording that reassures.
4. **Driver Jobs Tracking App: Minimal Mobile UI/UX** by Arafat Rahman. https://dribbble.com/shots/27216818-Driver-Jobs-Tracking-App-Minimal-Mobile-UI-UX
   - What to borrow: A minimal job list on the worker side.
5. **Delivery Tracking App: Modern Logistics Shipping Courier UI** by Kites Design. https://dribbble.com/shots/26832798-Delivery-Tracking-App-Modern-Logistics-Shipping-Courier-UI
   - What to borrow: A live-tracking card over a map.
6. **Haul: Fleet Dispatch & Delivery App** by Kudzi Zvourere (designer also behind African-context apps; see Q13). https://dribbble.com/shots/27827389-Haul-Fleet-Dispatch-Delivery-App
   - What to borrow: Clear dispatch states.

### Inferences
- Use five states, each with a pictogram and a colour role: Booked, On the way, Arrived (code verified), Work done, Rated.

### Gaps
- None beyond the general visual-verification caveat.

---

## Q9. Completion and two-sided thumbs-up/down rating with tags

### Takeaway
Rating-screen shots mostly use stars, so the thumbs-plus-tags pattern has to be adapted. Borrow the big emotive choice at the top, then tag chips, then optional text.

### Cited Findings (references)

1. **Rating Screen** by Favour Charles (Nigerian-sounding designer name; nationality not verified). https://dribbble.com/shots/24591439-Rating-Screen
   - What to borrow: A simple, large rating control.
2. **Customer Feedback Rating Screen** by Suraj Shettigar. https://dribbble.com/shots/9758255-Customer-Feedback-Rating-Screen
   - What to borrow: An emotive feedback scale.
3. **Rating Screen** by Hanna. https://dribbble.com/shots/27206609-Rating-Screen
   - What to borrow: A modern rating layout.
4. **Review & Rating Screen UI Design** by kalak khadayat. https://dribbble.com/shots/27093073-Review-Rating-Screen-UI-Design
   - What to borrow: The order of rating, then tags, then comment.
5. **Feedback & Rating Screen: Challenge Evaluation Flow** by Kytzlabs. https://dribbble.com/shots/26489983-Feedback-Rating-Screen-Challenge-Evaluation-Flow
   - What to borrow: Rating as a short multi-step flow.
6. **Car Rental Mobile App: Reviews & Ratings Screen** by Nodus Labs. https://dribbble.com/shots/26600690-Car-Rental-Mobile-App-Reviews-Ratings-Screen
   - What to borrow: How a list of reviews is displayed.
7. **Foodie App: Order Summary & Restaurant Rating Screens** by Rayhan Nasir. https://dribbble.com/shots/25091155-Foodie-App-Order-Summary-Restaurant-Rating-Screens
   - What to borrow: Pairing the completion summary with the rating.
8. **Photofeeler "Voting" Screens** (found via search). https://dribbble.com/shots/24170727-Photofeeler-Voting-Screens
   - What to borrow: Binary voting with an attribute breakdown, close to thumbs plus tags.
9. **Restaurant Review UI case** by Cuberto. https://dribbble.com/shots/7032542-Restaurant-Review-UI-case
   - What makes it good: Cuberto is known for its motion work.
   - What to borrow: Micro-interactions on review submit.

### Inferences
- Show two huge buttons, 👍 and 👎 in pictogram form (not emoji), each at least 120 dp. Below them, show tag chips that change with the choice: positive tags such as "On time", "Clean work", "Fair price"; negative tags such as "Late", "Overcharged", "Unfinished". The artisan side mirrors this for the customer: "Paid as agreed", "Respectful", "Clear directions".

### Gaps
- Thumbs-based two-sided rating is rare on Dribbble. The Photofeeler voting shot is the closest analogue found.

---

## Q10. Agent console for registering and vouching

### Takeaway
Use KYC flows (several by Nigerian designers) and field-technician apps for the agent's mobile registration, and field-service dashboards for the desktop console.

### Cited Findings (references)

1. **Personal and Business KYC Flow** by Ibrahim Okanlawon. https://dribbble.com/shots/27329723-Personal-and-Business-KYC-Flow
   - What to borrow: Step-by-step identity capture.
2. **Bank Account Opening KYC Flow** by Neointeraction Design. https://dribbble.com/shots/27231604-Bank-Account-Opening-KYC-Flow
   - What to borrow: Patterns for capturing documents and selfies.
3. **KYC Flow: Fintech Mobile App** by Jelil Ajao. https://dribbble.com/shots/22457187-KYC-Flow-Fintech-Mobile-App
   - What to borrow: A West-African fintech KYC (designer name suggests Nigeria; not verified).
4. **KYC flow for new users of an insurtech product** by Alison Eyo. https://dribbble.com/shots/16020614-KYC-flow-for-new-users-of-an-insurtech-product
   - What to borrow: Copy for a gentle KYC.
5. **Fintech KYC Verification** by Basil Orekwu. https://dribbble.com/shots/26829279-Fintech-KYC-Verification
   - What to borrow: Verification status screens.
6. **Kaiterra Technicians App** by widelab. https://dribbble.com/shots/26467630-Kaiterra-Technicians-App
   - What to borrow: A field-worker task list from a strong studio.
7. **A Mobile Workday Designed for EV Field Technicians** by Denovers. https://dribbble.com/shots/27674332-A-Mobile-Workday-Designed-for-EV-Field-Technicians
   - What to borrow: The daily task view for agents.
8. **EV Safety Evidence and Completion** by Denovers. https://dribbble.com/shots/27674303-EV-Safety-Evidence-and-Completion
   - What to borrow: Capturing photo evidence, which suits workshop-photo verification.
9. **Field Service Dispatch Mobile App** by Isaac Sanchez. https://dribbble.com/shots/26302643-Field-Service-Dispatch-Mobile-App
   - What to borrow: Field-ops layout.
10. **Ops Loops: Micro-Task Platform Worker Flow** by Wolfpixel Agency. https://dribbble.com/shots/26845162-Ops-Loops-Micro-Task-Platform-Worker-Flow
    - What to borrow: A tight flow for completing tasks.
11. **Home Services App UI Overhaul ✸ Field Management** by Digitalkit. https://dribbble.com/shots/26369007-Home-Services-App-UI-Overhaul-Field-Management
    - What to borrow: The field-management side of a home-services app.

### Inferences
- The agent registration wizard has five steps: Photo, then ID (optional), then Trade and skills, then Workshop photo and GPS, then Vouchers. Make it work offline, with sync status chips.

### Gaps
- None beyond the general visual-verification caveat.

---

## Q11. Admin fraud dashboard

### Takeaway
Plenty of fintech fraud and KYC dashboards exist, including one by a Nigerian designer. Borrow risk-score tables, flag queues and link-graph ideas for detecting vouch rings.

### Cited Findings (references)

1. **Bank Fraud Investigation Dashboard Concept** by Agemandi. https://dribbble.com/shots/27216857-Bank-Fraud-Investigation-Dashboard-Concept
   - What to borrow: An investigation case view.
2. **Analytics Dashboard: Fraud & Bot Detection UI** by Simul Sarker. https://dribbble.com/shots/26373637-Analytics-Dashboard-Fraud-Bot-Detection-UI
   - What to borrow: Anomaly charts.
3. **Fraud Analyzer Admin Dashboard** by Abiola Fisolami. https://dribbble.com/shots/25902186-Fraud-Analyzer-Admin-Dashboard
   - What to borrow: A risk-flag queue.
4. **Fraud Management Snippets** by Jordi Plaza. https://dribbble.com/shots/16965493-Fraud-Management-Snippets
   - What to borrow: Component-level fraud UI such as rule cards.
5. **AI KYC/AML Screening Dashboard** by EASIN ARAFAT. https://dribbble.com/shots/26225932-AI-KYC-AML-Screening-Dashboard
   - What to borrow: The screening-results table.
6. **First Hour Cyber Fraud Response System** (Behance). https://www.behance.net/gallery/258029809/First-Hour-Cyber-Fraud-Response-System
   - What to borrow: Incident-response triage.
7. **Dataspike: AI-Powered Risk Identification** (Behance). https://www.behance.net/gallery/249245433/Dataspike-AI-Powered-Risk-Identification
   - What to borrow: Risk-scoring visual language.
8. **Dashboard Analytics: Material You (M3) Design System** by Setproduct. https://dribbble.com/shots/22523192-Dashboard-Analytics-Material-You-m3-Design-system
   - What to borrow: How to apply M3 to a dense admin dashboard.

### Inferences
- Use M3 surface-container tones for dashboard density, with error and tertiary roles for risk levels. Keep expressive shapes for empty and success states only, since the admin view should stay calm.

### Gaps
- None beyond the general visual-verification caveat.

---

## Q12. Simulated USSD phone and WhatsApp chat panels

### Takeaway
African designers have published USSD and WhatsApp-chat UIs. Use them for the demo's device frames.

### Cited Findings (references)

1. **USSD Payment Screens** by Gabriel C. Enemor. https://dribbble.com/shots/25894259-USSD-Payment-Screens
   - What to borrow: Faithful USSD menu typography (monospace, numbered options).
2. **USSD Power Utility Bill Payment Dashboard** by Suleiman Abdullahi. https://dribbble.com/shots/25028117-USSD-Power-Utility-Bill-Payment-Dashboard
   - What to borrow: A USSD flow shown beside a web dashboard. This is exactly our demo split.
3. **Dashboard UI for a USSD menu builder platform** by Oluwatobi Immanuel. https://dribbble.com/shots/12127983-Dashboard-UI-for-a-USSD-menu-builder-platform-Settings
   - What to borrow: Visualising the USSD tree for the admin.
4. **Owo mi** by Adedoyin Ayandele. https://dribbble.com/shots/27686414-Owo-mi
   - What makes it good: Yoruba for "my money"; it appeared in USSD search results.
   - What to borrow: A local-language name.
5. **WhatsApp Chat Screen** by Fatima Oyinlola. https://dribbble.com/shots/27630088-WhatsApp-Chat-Screen
   - What to borrow: A faithful WhatsApp chat skin.
6. **Whatsapp chat page** by Tijani Sodiq. https://dribbble.com/shots/25114235-Whatsapp-chat-page
   - What to borrow: The chat layout.
7. **WhatsApp Chat UI** by Otueme Chioma. https://dribbble.com/shots/24599186-WhatsApp-Chat-UI
   - What to borrow: Bubble styling.
8. **WhatsApp Chatbot Admin Panel** by Dot Designer. https://dribbble.com/shots/26560429-WhatsApp-Chatbot-Admin-Panel
   - What to borrow: The bot-flow admin view.
9. **Breaking Language Barrier in WhatsApp Chat** by Anima Agrawal. https://dribbble.com/shots/26794653-Breaking-Language-Barrier-in-Whatsapp-Chat
   - What to borrow: Translating messages in the chat, for French and English toggling.
10. **WhatsApp Chat Animation for Transport & Delivery Services** by W1sdom Prod. https://dribbble.com/shots/27428164-WhatsApp-Chat-Animation-for-Transport-Delivery-Services
    - What to borrow: An animated scripted chat for the demo video.

### Inferences
- Render the USSD panel inside a stylised feature-phone frame: grey LCD green-tint background, monospace font, and an "Send / Cancel" softkey bar. Render the WhatsApp panel with a generic chat skin. Do not use WhatsApp's trademarks beyond what's needed to signal the channel.

### Gaps
- None beyond the general visual-verification caveat.

---

## Q13. Material 3 Expressive references and African-made app design

### Takeaway
There are few true M3 Expressive shots on Dribbble yet. Dan's reservations concept (light and dark) and Setproduct's M3 kits are the best. The authoritative references are Google's own: the design.google research article, m3.material.io, and the codelab. African-made design work is plentiful in fintech, from Nigerian, Kenyan and Zimbabwean designers.

### Cited Findings (references): Material 3 Expressive

1. **Mobile App Concept: Reservations (Material 3 Expressive)** by Dan. https://dribbble.com/shots/25913303-Mobile-App-Concept-Reservations-Material-3-Expressive
   - Dark version: https://dribbble.com/shots/25913316-Mobile-App-Concept-Reservations-Material-3-Expressive-Dark
   - What makes it good: An explicit M3E booking concept, so the closest analogue to our booking.
   - What to borrow: Expressive shapes in a reservation context, and the dark theme.
2. **Material 3 UI Widgets** by Kunal Bharaj. https://dribbble.com/shots/26025034-Material-3-UI-Widgets
   - What to borrow: Widget and bento treatments for the home screen.
3. **Plant Care Tracker App** by Oleh Yuzva (appeared top in the M3E search). https://dribbble.com/shots/27570405-Plant-Care-Tracker-App
   - What to borrow: Playful shape containers.
4. **Daily UI 009: Music Player** by Tom (M3E search). https://dribbble.com/shots/26305579-Daily-UI-009-Music-Player
   - What to borrow: Wavy progress and morphing play button.
5. **Messenger App Screens** by Sascha Klement (M3E search). https://dribbble.com/shots/27543033-Messenger-App-Screens
   - What to borrow: An M3E chat UI.
6. **Onboarding Prototype** by Nelson (M3E search). https://dribbble.com/shots/26079812-Onboarding-Prototype
   - What to borrow: Expressive motion in onboarding.
7. **Warehouse Management AI Product** by Prashanth Yadav (M3E search). https://dribbble.com/shots/26624810-Warehouse-Management-AI-Product
   - What to borrow: M3E styling for an ops tool.
8. **Booking app (Airbnb), Material You M3 Design system** by Setproduct. https://dribbble.com/shots/22405755-Booking-app-Airbnb-Material-You-m3-Design-system
   - What to borrow: An M3 booking flow.
9. **Material You Design System Components UI Kit** by Setproduct. https://dribbble.com/shots/21539476-Material-You-Design-System-Components-UI-Kit
10. **Forms & inputs, Material You Design System** by Setproduct. https://dribbble.com/shots/22405826-Forms-inputs-Material-You-Design-System
11. **Android 16.1 OS** by Geex Arts. https://dribbble.com/shots/25818747-Android-16-1-OS
    - What to borrow: The Android 16 system-UI aesthetic.
12. **M3 Expressive To-Do App** (Behance). https://www.behance.net/gallery/248932125/M3-Expressive-To-Do-App
13. **Material 3 Expressive** (Behance). https://www.behance.net/gallery/229889443/Material-3-Expressive
14. **Medium: Material You Redesign** (Behance). https://www.behance.net/gallery/253194429/Medium-Material-You-Redesign
15. **M3E Canvas: Material 3 Expressive UI builder** (Setproduct freebie). https://setproduct.com/freebies/m3e-canvas
16. **Google Design: "Better, Easier, Emotional UX"** (M3 Expressive research). https://design.google/library/expressive-material-design-google-research
    - Google calls this its most researched design-system update, and names colour, shape, size, motion and containment as the fundamentals of expressive design.
17. **Codelab "M3 Expressive: Design with emotion".** https://codelabs.developers.google.com/codelabs/mdc-102-objc
    - Covers a token-driven motion physics system and a set of 35 shapes with built-in shape morphing.
18. **Wear OS: Material 3 Expressive design language.** https://developer.android.com/design/ui/wear/guides/get-started/apply
    - Describes a shape-morphing framework, an edge button, wavy progress, and differently shaped confirm and cancel buttons.
19. **Research claims from the leaked Google post** (secondary reporting; unverified against Google's original). https://9to5google.com/2025/05/05/material-3-expressive-leak/
    - Claims 46 studies and more than 18,000 participants, with expressive designs helping users "spot the key action" faster.
    - Another summary says shape-based indicators improved recognition across cultures and age groups: https://www.designmonks.co/blog/material-3-expressive
    - That cross-cultural claim is directly relevant for low-literacy users.

### Cited Findings (references): African-made app designs

20. **Funda: School Parent App** by Kudzi Zvourere. https://dribbble.com/shots/27827447-Funda-School-Parent-App
21. **Moroho: Irrigation Frost Alert App** by Kudzi Zvourere. https://dribbble.com/shots/27841925-Moroho-Irrigation-Frost-Alert-App
    - What to borrow: Utility apps designed for African users. Zimbabwean language names suggest the context; not verified.
22. **Embrace Your Roots and Learn African Languages** by K&Z Design. https://dribbble.com/shots/27802802-Embrace-Your-Roots-and-Learn-African-Languages
    - What to borrow: African visual identity in an app.
23. **Nelora mobile banking app concept** by Ismail Folorunsho Rasaq. https://dribbble.com/shots/27872353-Nelora-mobile-banking-app-concept
24. **Moni Mobile App** by Inioluwa. https://dribbble.com/shots/24313303-Moni-Mobile-App
25. **Haven: Property Management App** by Zakariya Buhari. https://dribbble.com/shots/27831912-Haven-Property-Management-App
26. **Prepaid Meter Energy Management App UI/UX Design** by CreativeBox (Nigeria search). https://dribbble.com/shots/27541221-Prepaid-Meter-Energy-Management-App-UI-UX-Design
    - What to borrow: Utility UX for a constrained-infrastructure context.
27. **Flyer designs for Motsi Ride-hailing app in Nigeria** by Kayode Okedigba. https://dribbble.com/shots/27805940-Flyer-designs-for-Motsi-Ride-haling-app-in-Nigeria
    - What to borrow: Offline marketing collateral, useful for agent flyers.
28. **LETU: International Money Transfer** by David Karuma. https://dribbble.com/shots/27379196-LETU-International-Money-Transfer
29. **Greep Pay: Fintech Super App** by Suki Taiwo. https://dribbble.com/shots/26943661-Greep-Pay-Fintech-Super-App
30. **Wlee Pay: Mobile and web app design** by O2geeks. https://dribbble.com/shots/25753148-Wlee-Pay-Mobile-and-web-app-design
31. **Afbank Money: Digital Bank App UI Concept.** https://dribbble.com/shots/10073352-New-Digital-Bank-App-UI-Kit
    - Reportedly resold to a Tanzanian company, per its search snippet.
32. **Alat: the first digital bank in Nigeria** (Behance). https://www.behance.net/gallery/258208953/Alat-the-first-digital-bank-in-Nigeria
33. **Tafiya: get your passport without an agent** (Behance; Hausa word meaning "journey"). https://www.behance.net/gallery/257836775/Tafiya-get-your-passport-without-an-agent
    - What to borrow: A civic flow that removes intermediaries, a theme parallel to ours.
34. **Swiftmonie** (Contra case study). https://contra.com/p/67eQRWbX-nigerian-fintech-mobile-banking
    - Its designers chose greens and off-white instead of the usual fintech blue, per the search snippet.
    - Also referenced: https://contra.com/p/Ql6qR6XB-a-scale-to-financial-freedom-for-africans
35. **SA Heritage 2** by Nick Phaba Ntuli. https://dribbble.com/shots/27185258-SA-Heritage-2
    - What to borrow: Contemporary South African illustration.
36. **Women's Innovation Vector Illustrations** by Nikita Abuya (Behance). https://www.behance.net/gallery/254572143/Womens-Innovation-Vector-Illustrations-by-Nikita-Abuya
    - What to borrow: African women characters in flat vector style.
37. **Home+ App** (South Africa; Apptension case study). https://apptension.com/case-study/home-app
    - What makes it good: Combines a house-maintenance services marketplace, prepaid electricity and security for the South African market.

### Inferences
- No "Cameroon app design" results surfaced on Dribbble or Behance. The Behance "cameroon app" query returned unrelated generic projects. Cameroonian visual identity therefore has to be built originally.

### Gaps
- The m3.material.io component pages and the official Figma "Material 3 Design Kit" were not fetched in this pass. Both are the canonical build references.
- No Cameroon-specific app design references were found.

---

## Q14. Recommended visual direction

### Takeaway
Build a warm, credible, "market-day professional" look:
- an ochre/terracotta primary (craft and earth);
- a deep forest-green secondary (growth and trust, a nod to the flag);
- a trustworthy indigo-blue tertiary for verification states;
- the flag's yellow used only as a small star or spark accent on top-tier badges.

Pair this with M3 Expressive shapes, illustrated Cameroonian artisans, and pictogram-first navigation.

### Cited Findings
- M3 Expressive's fundamentals are colour, shape, size, motion and containment. — [Google Design](https://design.google/library/expressive-material-design-google-research)
- M3 Expressive ships 35 decorative shapes with built-in morphing and token-based motion physics. — [Google Codelab](https://codelabs.developers.google.com/codelabs/mdc-102-objc)
- Expressive design uses differently shaped confirm and cancel buttons, and wavy progress indicators. — [Android Developers, Wear OS](https://developer.android.com/design/ui/wear/guides/get-started/apply)
- An African fintech deliberately chose greens and off-white over conventional blue to stand apart. — [Contra / Swiftmonie](https://contra.com/p/67eQRWbX-nigerian-fintech-mobile-banking)
- Shape-based indicators reportedly improve recognition across cultures and age groups (secondary source). — [Design Monks](https://www.designmonks.co/blog/material-3-expressive)
- The M3 kit's colour roles are compatible with Material Theme Builder, so a seed colour generates the full scheme. — [Material blog](https://material.io/blog/material-3-figma-design-kit)

### Inferences (recommendations)

**Colour seeds (for Material Theme Builder):**
- **Primary seed: ochre/terracotta, about `#B5562B` to `#C46A2B`.** It evokes laterite earth and the clay and wood crafts of the Grassfields. It is warm without being "safari".
- **Secondary: forest green, about `#1F6B4A`.** It references the flag's green and reads as "go / safe / verified".
- **Tertiary: indigo-blue, about `#2E4A9E`.** Reserve it for verification and system trust: the QR badge, "Agent verified" and "Code confirmed". Blue is the conventional trust colour, and here it stays a role, not the brand.
- **Accent: flag yellow, about `#F2B705`.** Use it only for the gold tier, the star spark, and the celebration confetti.
- **Red:** Use the M3 error role, tuned slightly toward the flag's red, about `#C8102E`. Use it only for errors and fraud flags, never decoratively.
- **Option B, if a cooler brand is preferred:** an ochre seed plus a trustworthy blue primary, with green as success.
- **Avoid:** equal-weight green, red and yellow stripes, or flag-pattern backgrounds. That reads as kitsch or political.

**Illustration style:**
- Use flat or semi-flat vector characters with visible tool props:
  - a voltmeter for the electrician
  - a wrench for the plumber
  - a sewing machine and tape measure for the tailor
  - a jack for the mechanic
  - a trowel for the mason
  - clippers and braids for the hairdresser
- Show a range of dark skin tones, women in trades (tailor, hairdresser, also electrician), real Cameroonian streetscapes (moto-taxi, market stalls), and wax-print patterns used sparingly as texture inside shapes.
- Draw on Nikita Abuya's flat vector characters (Behance) and Nick Phaba Ntuli's heritage work (Dribbble) for tone. Commission original work rather than copying either.

**Iconography:**
- Use Material Symbols Rounded, with fill toggled to show the selected state.
- Add a custom set of about 12 trade pictograms on 48 dp grids, each inside a unique M3E shape (for example, electrician in a "burst" shape, plumber in a "pill", tailor in a "flower"). Shape plus pictogram plus colour gives triple encoding for low-literacy recognition.
- Pair every icon with a short French and English label, and optional text-to-speech.

**Trust-tier badges:**
- Use four tiers. Each changes **shape**, not just colour:
  1. **New:** circle outline, neutral.
  2. **Vouched:** filled circle with a handshake glyph, green.
  3. **Verified:** a 6-point "cookie" shape with a check, indigo.
  4. **Trusted Pro:** an 8-point "sunny" burst with a yellow star spark, ochre and gold.
- Show the ladder as a horizontal stepper on the profile, with the next tier ghosted and a plain line under it. For example: "3 more verified jobs to reach Verified".
- Animate a shape morph from the current tier to the next on promotion.

**QR badge card:**
- Card size and shape: credit-card ratio (85.6 × 54 mm) so it can also be printed and laminated by agents.
- Left side: photo, name, trade pictogram, quarter.
- Right side: a QR code with a short readable ID below it (for example `ART-DLA-0427`).
- Top band: the tier colour.
- Security cues: a subtle guilloché or wax-print micro-pattern, and a "Scan to check" instruction.
- In-app, the card flips to show live stats (jobs, % satisfied, last verified date). This helps defeat screenshots of old cards.

**Empty states:**
- Use spot illustrations of an artisan waiting at a workshop door, or an empty toolbox, with one action button.
- Keep copy short and human. For example: "No electrician free in Akwa right now. Try a nearby quarter?"
- Use the Getillustrations and One Week Wonders empty-state sets on Dribbble as references for composition only.

**Micro-interactions:**
- Tile-press shape morph on the trade picker.
- Spring-physics bottom sheets.
- Wavy progress for "Finding artisans" and "Artisan on the way".
- Code digits that pop in one by one.
- A badge-earned confetti in the tier colour.
- Haptics on thumbs-up and thumbs-down.
- Animated "verified" checks drawn in indigo.
- Keep motion short (under 300 ms for standard transitions) and honour reduced-motion, for low-end Android performance.

### Gaps
- Pinterest was not accessed, so its board-level aggregation of African illustration and afrocentric UI is missing.
- Mobbin was not accessed (it needs an account), so real shipped-app flows (Uber, Bolt, Urban Company, M-Pesa, Wave) are missing.
- The cultural appropriateness of specific Cameroonian motifs (Ndop cloth, Toghu embroidery, Bamileke masks) should be checked with local users before use. This was not researched here.

---

## Source list

**Official and editorial sources**
1. https://design.google/library/expressive-material-design-google-research
2. https://codelabs.developers.google.com/codelabs/mdc-102-objc
3. https://developer.android.com/design/ui/wear/guides/get-started/apply
4. https://9to5google.com/2025/05/05/material-3-expressive-leak/
5. https://www.designmonks.co/blog/material-3-expressive
6. https://material.io/blog/material-3-figma-design-kit
7. https://setproduct.com/freebies/m3e-canvas

**Dribbble: landing, home and request flow**
8. https://dribbble.com/shots/27533799-Handyman-App
9. https://dribbble.com/shots/26338546-Handyman-App-Redesign-Home-Services
10. https://dribbble.com/shots/20339734-Handyman-App-UI-Design
11. https://dribbble.com/shots/27403590-Handyman-Home-Repair-Service-Mobile-App-UI-UX-Design
12. https://dribbble.com/shots/27403629-Hanwik-Handyman-Home-Repair-Service-Marketplace-App-Design
13. https://dribbble.com/shots/27727583-KarigorX-On-Demand-Home-Services-Expert-Booking-App
14. https://dribbble.com/shots/27623050-Super-App-Modern-Multi-Service-App-Design
15. https://dribbble.com/shots/27358367-Multi-Service-Mobile-App-UI-Design
16. https://dribbble.com/shots/26922667-Fixora-Home-Service-Landing-Page
17. https://dribbble.com/shots/27817299-Home-Services-Landing-Page-UI-UX-Design
18. https://dribbble.com/shots/27344484-Onfix-Home-Service-App-Onboarding-Design
19. https://dribbble.com/shots/27662417-Home-Services-App-Job-Posting-Escrow-Checkout
20. https://dribbble.com/shots/27292750-Home-Services-Booking-App-UI-Design-Cost-Guide-UX
21. https://dribbble.com/shots/27726047-On-Demand-Home-Services-Contractor-Booking-Mobile-App-UI
22. https://dribbble.com/shots/26989519-Handyman-Home-Service-Booking-App-UX-UI-Design
23. https://dribbble.com/shots/27558997-FixNest-Home-Service-Booking-App
24. https://dribbble.com/shots/27801911-Multilingual-Login

**Dribbble: match results and trust profile**
25. https://dribbble.com/shots/27340895-Service-Marketplace-App
26. https://dribbble.com/shots/26164702-Toolsy-Your-Trusted-Handyman-for-Home-Repairs
27. https://dribbble.com/shots/27628854-Home-Service-App-UIUX-Design
28. https://dribbble.com/shots/27053531-Cleaning-Repair-Services-App-UI-Concept
29. https://dribbble.com/shots/27184240-Benchmark-Dashboard-card-review-UI
30. https://dribbble.com/shots/27306004-Gen-Z-Teens-Job-Discovery-App-with-Time-Bound-Gig-Matching
31. https://dribbble.com/shots/25864127-Car-Mechanic-Finder-App-UIUX
32. https://dribbble.com/shots/27698695-Turbo-Tech-Workshop-Finder-Mechanic-Assistance-Mobile-Apps
33. https://dribbble.com/shots/25763787-Bento-Card-Profile
34. https://dribbble.com/shots/24912778-Bento-box-user-profile
35. https://dribbble.com/shots/27240303-Gen-Z-Gamified-Profile-UI-From-Blank-Slate-to-Persona
36. https://dribbble.com/shots/27420618-Services-page-of-a-service-provider-profile
37. https://dribbble.com/shots/27651818-Admin-Dashboard-for-a-Gig-Worker-Hiring-Platform
38. https://dribbble.com/shots/27666243-Tailor-App-UI-UX-Custom-Clothing-Designer-Marketplace
39. https://dribbble.com/shots/26570553-TailorMate-Custom-Clothing-Personal-Tailoring-App

**Dribbble: badges and QR card**
40. https://dribbble.com/shots/24389972-Badges-levels-from-bronze-to-shiny
41. https://dribbble.com/shots/23077839-Badges-Levels-UI
42. https://dribbble.com/shots/27683402-Gamification-Design-System-XP-Streaks-Badges-Level-Up-Comp
43. https://dribbble.com/shots/27449131-Radiate-Achievement-Badges-for-a-Mindfulness-App
44. https://dribbble.com/shots/24683923-freud-v3-AI-Mental-Health-App-Achievements-Badges-UIUX
45. https://dribbble.com/shots/25572775-Achievement-badges
46. https://dribbble.com/shots/25553522-Achievement-badges
47. https://dribbble.com/shots/27284605-Gamification-Achievement-Badge-UI-Screen
48. https://dribbble.com/shots/15777429-Tarteel-ai-Achievement-Badges-Icon-Illustration
49. https://dribbble.com/shots/23849332-Corporate-badge-level-2
50. https://dribbble.com/shots/20749265-Signature-A-modern-elite-employee-connection-directory
51. https://dribbble.com/shots/26034165-I-Will-Design-a-Modern-Professional-ID-Badge
52. https://dribbble.com/shots/22087911-Digital-badging-app-bring-motivation-outside-of-classroom
53. https://dribbble.com/shots/27614371-Brand-Identity-Design-AI-Startup-Logo-ID-Card-System
54. https://dribbble.com/shots/27502524-Onco-Brand-Application-ID-Card-Stationery
55. https://dribbble.com/shots/24169730-Paywave-Mobile-Apps

**Dribbble: booking code and job tracking**
56. https://dribbble.com/shots/27380410-Phone-Number-Verification-App-UI-with-OTP-Authentication
57. https://dribbble.com/shots/26800898-Zevoa-Mobile-App-Login-OTP-Verification-Flow
58. https://dribbble.com/shots/26087066-Modern-Mobile-UI-Login-Flow-for-Secure-Authentication
59. https://dribbble.com/shots/27061378-Flight-Ticket-Card-UX-UI-concept
60. https://dribbble.com/shots/27567904-passenger-ticket-design
61. https://dribbble.com/shots/26527418-Travel-Booking-App-Event-Ticket-Flow
62. https://dribbble.com/shots/27328253-Cleaning-Service-App-Booking-Management-Flow
63. https://dribbble.com/shots/27554909-Tranzit-Order-Tracking-App-UI
64. https://dribbble.com/shots/27555010-Tranzit-Order-Tracking-App-UI
65. https://dribbble.com/shots/27509595-Trako-Order-Tracking-App
66. https://dribbble.com/shots/26363608--HelloGov-Mobile-Order-Tracking-Application-Status
67. https://dribbble.com/shots/27216818-Driver-Jobs-Tracking-App-Minimal-Mobile-UI-UX
68. https://dribbble.com/shots/26832798-Delivery-Tracking-App-Modern-Logistics-Shipping-Courier-UI
69. https://dribbble.com/shots/27827389-Haul-Fleet-Dispatch-Delivery-App

**Dribbble: rating**
70. https://dribbble.com/shots/24591439-Rating-Screen
71. https://dribbble.com/shots/9758255-Customer-Feedback-Rating-Screen
72. https://dribbble.com/shots/27206609-Rating-Screen
73. https://dribbble.com/shots/27093073-Review-Rating-Screen-UI-Design
74. https://dribbble.com/shots/26489983-Feedback-Rating-Screen-Challenge-Evaluation-Flow
75. https://dribbble.com/shots/26600690-Car-Rental-Mobile-App-Reviews-Ratings-Screen
76. https://dribbble.com/shots/25091155-Foodie-App-Order-Summary-Restaurant-Rating-Screens
77. https://dribbble.com/shots/24170727-Photofeeler-Voting-Screens
78. https://dribbble.com/shots/7032542-Restaurant-Review-UI-case

**Dribbble: agent console**
79. https://dribbble.com/shots/27329723-Personal-and-Business-KYC-Flow
80. https://dribbble.com/shots/27231604-Bank-Account-Opening-KYC-Flow
81. https://dribbble.com/shots/22457187-KYC-Flow-Fintech-Mobile-App
82. https://dribbble.com/shots/16020614-KYC-flow-for-new-users-of-an-insurtech-product
83. https://dribbble.com/shots/26829279-Fintech-KYC-Verification
84. https://dribbble.com/shots/26467630-Kaiterra-Technicians-App
85. https://dribbble.com/shots/27674332-A-Mobile-Workday-Designed-for-EV-Field-Technicians
86. https://dribbble.com/shots/27674303-EV-Safety-Evidence-and-Completion
87. https://dribbble.com/shots/26302643-Field-Service-Dispatch-Mobile-App
88. https://dribbble.com/shots/26845162-Ops-Loops-Micro-Task-Platform-Worker-Flow
89. https://dribbble.com/shots/26369007-Home-Services-App-UI-Overhaul-Field-Management

**Dribbble: fraud dashboard**
90. https://dribbble.com/shots/27216857-Bank-Fraud-Investigation-Dashboard-Concept
91. https://dribbble.com/shots/26373637-Analytics-Dashboard-Fraud-Bot-Detection-UI
92. https://dribbble.com/shots/25902186-Fraud-Analyzer-Admin-Dashboard
93. https://dribbble.com/shots/16965493-Fraud-Management-Snippets
94. https://dribbble.com/shots/26225932-AI-KYC-AML-Screening-Dashboard
95. https://dribbble.com/shots/22523192-Dashboard-Analytics-Material-You-m3-Design-system

**Dribbble: USSD and WhatsApp panels**
96. https://dribbble.com/shots/25894259-USSD-Payment-Screens
97. https://dribbble.com/shots/25028117-USSD-Power-Utility-Bill-Payment-Dashboard
98. https://dribbble.com/shots/12127983-Dashboard-UI-for-a-USSD-menu-builder-platform-Settings
99. https://dribbble.com/shots/27686414-Owo-mi
100. https://dribbble.com/shots/27630088-WhatsApp-Chat-Screen
101. https://dribbble.com/shots/25114235-Whatsapp-chat-page
102. https://dribbble.com/shots/24599186-WhatsApp-Chat-UI
103. https://dribbble.com/shots/26560429-WhatsApp-Chatbot-Admin-Panel
104. https://dribbble.com/shots/26794653-Breaking-Language-Barrier-in-Whatsapp-Chat
105. https://dribbble.com/shots/27428164-WhatsApp-Chat-Animation-for-Transport-Delivery-Services

**Dribbble: Material 3 Expressive and Material You**
106. https://dribbble.com/shots/25913303-Mobile-App-Concept-Reservations-Material-3-Expressive
107. https://dribbble.com/shots/25913316-Mobile-App-Concept-Reservations-Material-3-Expressive-Dark
108. https://dribbble.com/shots/26025034-Material-3-UI-Widgets
109. https://dribbble.com/shots/27570405-Plant-Care-Tracker-App
110. https://dribbble.com/shots/26305579-Daily-UI-009-Music-Player
111. https://dribbble.com/shots/27543033-Messenger-App-Screens
112. https://dribbble.com/shots/26079812-Onboarding-Prototype
113. https://dribbble.com/shots/26624810-Warehouse-Management-AI-Product
114. https://dribbble.com/shots/22405755-Booking-app-Airbnb-Material-You-m3-Design-system
115. https://dribbble.com/shots/21539476-Material-You-Design-System-Components-UI-Kit
116. https://dribbble.com/shots/22405826-Forms-inputs-Material-You-Design-System
117. https://dribbble.com/shots/25818747-Android-16-1-OS

**Dribbble: African-made designs and illustration**
118. https://dribbble.com/shots/27827447-Funda-School-Parent-App
119. https://dribbble.com/shots/27841925-Moroho-Irrigation-Frost-Alert-App
120. https://dribbble.com/shots/27802802-Embrace-Your-Roots-and-Learn-African-Languages
121. https://dribbble.com/shots/27872353-Nelora-mobile-banking-app-concept
122. https://dribbble.com/shots/24313303-Moni-Mobile-App
123. https://dribbble.com/shots/27831912-Haven-Property-Management-App
124. https://dribbble.com/shots/27541221-Prepaid-Meter-Energy-Management-App-UI-UX-Design
125. https://dribbble.com/shots/27805940-Flyer-designs-for-Motsi-Ride-haling-app-in-Nigeria
126. https://dribbble.com/shots/27379196-LETU-International-Money-Transfer
127. https://dribbble.com/shots/26943661-Greep-Pay-Fintech-Super-App
128. https://dribbble.com/shots/25753148-Wlee-Pay-Mobile-and-web-app-design
129. https://dribbble.com/shots/10073352-New-Digital-Bank-App-UI-Kit
130. https://dribbble.com/shots/27185258-SA-Heritage-2
131. https://dribbble.com/shots/26076732-New-Empty-State-Illustrations
132. https://dribbble.com/shots/24507908-E-commerce-empty-state-Illustrations
133. https://dribbble.com/shots/14734420-Empty-states-illustration-set

**Behance**
134. https://www.behance.net/gallery/256100117/Village-Home-Services-Landing-Page-Brand-Identity
135. https://www.behance.net/gallery/162581613/UI-Design-Orderly
136. https://www.behance.net/gallery/255426939/Helpo-Home-Services-App-UXUI-Case-Study
137. https://www.behance.net/gallery/257518525/FixNear-Home-Services-App-UIUX-Case-Study
138. https://www.behance.net/gallery/241405203/Handyman-Home-Service-Booking-App-UX-UI-Design
139. https://www.behance.net/gallery/257188143/Game-UI-Rank-Badges-Achievement-Medals-Set
140. https://www.behance.net/gallery/155051371/collection-of-achievement-badgesmedals
141. https://www.behance.net/gallery/258029809/First-Hour-Cyber-Fraud-Response-System
142. https://www.behance.net/gallery/249245433/Dataspike-AI-Powered-Risk-Identification
143. https://www.behance.net/gallery/248932125/M3-Expressive-To-Do-App
144. https://www.behance.net/gallery/229889443/Material-3-Expressive
145. https://www.behance.net/gallery/253194429/Medium-Material-You-Redesign
146. https://www.behance.net/gallery/258208953/Alat-the-first-digital-bank-in-Nigeria
147. https://www.behance.net/gallery/257836775/Tafiya-get-your-passport-without-an-agent
148. https://www.behance.net/gallery/254572143/Womens-Innovation-Vector-Illustrations-by-Nikita-Abuya

**Other case studies**
149. https://peerlist.io/mdibrahimshimul/project/handynaija--home-services-marketplace
150. https://contra.com/p/67eQRWbX-nigerian-fintech-mobile-banking
151. https://contra.com/p/Ql6qR6XB-a-scale-to-financial-freedom-for-africans
152. https://apptension.com/case-study/home-app
