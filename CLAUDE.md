## VeganBnB - AI-Powered Complete Vegan Travel Intelligence Platform

**Team**: Prudhvi Raj (Lead, India), Koray Akalin (Berlin), Dhruthi Keerthi (Berlin), Harshini Madhu (India), Tiff Ting (Taiwan)

---

## AI Assistant Instructions (IMPORTANT: Follow before every commit)

Before suggesting any commit message, ALWAYS:

1. Update CLAUDE.md: "What's Implemented", "Next Priority Tasks", "Proposed Task Breakdown", timestamp
2. Update DEVELOPMENT.md: "Next Steps" section
3. Update README.md: Any relevant status indicators
4. THEN suggest commit message

This ensures documentation stays current across all AI sessions.

---

## Current Project State (IMPORTANT: Update this as you go for cross-session continuity)

**Last Updated**: Nov 15, 2025 11:30pm CET (AI Travel Assistant Chatbot complete)

**What's Implemented**:

- ✅ Next.js 15 project with TypeScript (strict mode)
- ✅ ESM modules (`"type": "module"` in package.json)
- ✅ Google Gemini API integration working (`gemini-2.5-flash`)
- ✅ Firebase setup complete (Auth + Firestore, tested)
- ✅ TypeScript interfaces complete (`lib/types.ts` with all core types)
- ✅ Category-adaptive analyzer complete (API + prompts + validation + testing)
- ✅ **AI Travel Assistant Chatbot complete** (RAG + multi-category context + markdown rendering)
- ✅ Demo-ready mock data (`lib/mock-data.js` with realistic safety scores)
- ✅ Professional UI: Landing page + chat interface (shadcn/ui + Tailwind CSS)
- ✅ Working test files: `tests/test-gemini.js`, `tests/test-firebase.js`, `tests/test-analyzer.js`, `tests/test-chatbot.js`
- ✅ Human-readable safety signal formatting
- ✅ Documentation: README.md, DEVELOPMENT.md, CLAUDE.md
- ✅ Environment: `.env.local` with API keys

**Technical Setup**: See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed setup, file structure, testing, and team coordination.

**Key Technical Decisions**:

- **Mobile-first design**: Target audience uses phones while traveling
- Model: `gemini-2.5-flash` (confirmed working)
- Development pattern: Types → Mock data → UI → Real API
- API cost: ~$0.80 for demo

**Next Priority Tasks** (7-hour timeline):

1. ✅ ~~Firebase project setup~~
2. ✅ ~~Create core TypeScript interfaces~~
3. ✅ ~~**CRITICAL**: Implement category-adaptive review analysis (hero feature)~~
4. ✅ ~~**CRITICAL**: Build chatbot with multi-category context~~
5. **NEW PRIORITY**: Basic UI with safety score display (listings pages)
6. Deploy + demo preparation
7. **OPTIONAL**: Computer vision menu translator (TIER 2 feature)

---

### Winning Positioning

**Problem**: Vegan travelers juggle HappyCow + Vegvisits + Google + Reddit + Facebook for EVERY trip. No platform offers complete travel intelligence across restaurants, accommodations, tours, and local experiences.

**Solution**: First AI-powered complete vegan travel intelligence platform using multi-modal AI (NLP review analysis, conversational assistant, computer vision) to provide explainable safety scores across all travel categories and eliminate the fragmented research problem.

**Key differentiators**:

- Complete travel coverage (not just restaurants)
- Explainable AI with review citations
- Multi-modal technology
- Conversational trip planning

---

### MVP Scope (7-hr build window - FOCUSED)

**TIER 1 - MUST DEMO:**

- **Multi-category database**: 20 restaurants + 10 accommodations + 5 tours + 5 events (Berlin) with 3-5 review excerpts each
- **Category-Adaptive AI Review Analyzer** (HERO FEATURE): AI extracts safety signals specific to each category, generates explainable scores with citations
- **AI Travel Assistant Chatbot** (SHOWSTOPPER): Conversational interface for complete trip planning across all categories
- User authentication (Firebase)
- Map view with category filtering

**TIER 2 - IF TIME (unlikely with 7-hr window):**

- **Computer Vision Menu Translator**: Upload photo → translated menu + vegan options highlighted
- Mobile PWA optimization
- Itinerary builder

**CUT:**

- Native mobile app
- Social features
- Booking integration

---

### Tech Stack

- **Frontend**: Next.js 15 + TypeScript + Tailwind + Shadcn/UI
- **AI**: Google Gemini API (`gemini-2.5-flash`)
- **Database**: Firebase (Firestore + Auth)
- **Deploy**: Vercel
- **Optional**: GPT-4 Vision (menu translation)

_Technical details in [DEVELOPMENT.md](DEVELOPMENT.md)_

---

### Data Strategy

**Target**: 40 total listings across 4 categories (Berlin focus)

**Categories & Sources:**

**1. Restaurants (20)**

- Source: HappyCow
- Reviews: Extract from Google Maps, HappyCow
- Signals: Cross-contamination, staff knowledge, ingredient transparency

**2. Accommodations (10)**

- Sources: Vegvisits, Booking.com (filter "vegan breakfast"), Airbnb
- Reviews: Focus on kitchen facilities, breakfast, bedding
- Signals: Shared kitchen safety, animal-free bedding, vegan breakfast quality, host knowledge

**3. Tours/Experiences (5)**

- Sources: Manual curation (Vegan Berlin Tours, alternative-berlin.com, local vegan guides)
- Reviews: TripAdvisor, Google, direct testimonials
- Signals: Guide vegan expertise, meal handling, hidden animal exploitation, group dynamics

**4. Events (5)**

- Sources: Eventbrite, Facebook Events, vegan meetup groups, local vegan community pages
- Reviews: Past attendee feedback, organizer reputation
- Signals: Food quality/options, accessibility, community vibe, inclusivity

**Each listing needs**: Name, address/location, category, description, website/booking link, 3-5 review excerpts

---

### AI Feature Specs

#### 1. Category-Adaptive AI Review Analyzer

**Input**: 3-5 reviews per listing
**Process**: Claude API with category-specific prompts

**Restaurant prompt:**

```
Analyze these restaurant reviews for vegan safety signals:
- Cross-contamination prevention
- Staff knowledge about vegan requirements
- Ingredient transparency
- Community trust indicators

Output JSON: {
  "score": 0-100,
  "category": "restaurant",
  "reasoning": "explanation",
  "signals": {"cross_contamination": score, "staff_knowledge": score, ...},
  "citations": ["quote from review 1", ...]
}
```

**Accommodation prompt:**

```
Analyze these accommodation reviews for vegan traveler safety:
- Shared kitchen cross-contamination handling
- Bedding materials (animal-free certification)
- Vegan breakfast quality and variety
- Host knowledge and accommodation of dietary needs
- Nearby vegan restaurant access

Output JSON: {...}
```

**Tour/Experience prompt:**

```
Analyze these tour reviews for vegan safety:
- Guide knowledge of veganism
- Meal/food handling during tour
- Hidden animal exploitation in activities
- Accommodation of dietary restrictions
- Group dynamics and inclusivity

Output JSON: {...}
```

**Event prompt:**

```
Analyze these event reviews for vegan attendee experience:
- Food quality and variety
- Allergen/dietary accommodation
- Community atmosphere
- Accessibility and inclusivity

Output JSON: {...}
```

**UI Display**:

- Safety score badge (Safe 80-100 / Moderate 50-79 / Caution 0-49)
- Category-specific icon
- "Why this score?" modal → AI reasoning + review citations
- Signal breakdown tailored to category

**Implementation priority**: Core demo feature, allocate 4hrs.

---

#### 2. AI Travel Assistant Chatbot

**Interface**: Chat UI (shadcn Chat component)
**RAG Architecture**:

- Vector embeddings of complete database (all 4 categories)
- Claude API with multi-category context injection

**Example interactions:**

- "Plan my 3-day vegan trip to Berlin" → restaurants + hotel + walking tour + Sunday market
- "I'm celiac and vegan, need accommodation with private kitchen near Kreuzberg"
- "Romantic dinner + nearby hotel recommendations for anniversary weekend"
- "What vegan events are happening this weekend?"

**Implementation**:

- Chat UI component (1hr)
- Claude API integration with multi-category context (2hrs)
- Category-aware response formatting
- 5-10 test conversations pre-loaded

**Demo value**: Live interaction showing complete trip planning, solves "cobbling problem"

---

#### 3. Computer Vision Menu Translator (TIER 2)

**Input**: Photo upload (German menu)
**Process**: GPT-4 Vision prompt:

```
Translate this restaurant menu to English.
Highlight items that are:
1. Already vegan
2. Can be made vegan with modifications
3. Contain hidden animal products

Format as structured JSON.
```

**UI**: Camera/upload → instant translation overlay
**Implementation**: 1-2hrs if TIER 1 complete early
**Demo value**: "Wow factor" technical innovation

---

### Proposed Task Breakdown _(to discuss with team)_

**Prudhvi (Lead)**: API routes, Gemini integration, safety scores ✅
**Koray**: AI chatbot UI ✅, multi-category views, map integration
**Dhruthi**: Detail views, score explanation modals, auth UI
**Harshini**: Dataset prep (tours/events), UI components (computer vision moved to TIER 2)
**Tiff**: Design system ✅, wireframes, dataset coordination, Firebase setup ✅, TypeScript interfaces ✅, Category analyzer ✅, AI Travel Assistant Chatbot ✅

**COMPLETED MAJOR MILESTONES**:

- ✅ Category-adaptive analyzer (hero feature)
- ✅ AI Travel Assistant Chatbot (showstopper feature)
- ✅ Professional landing page + chat UI
- ✅ Complete RAG architecture with human-readable safety signals

_Note: These are initial suggestions based on stated interests/locations. Final assignments to be determined as a team._

_Technical details in [DEVELOPMENT.md](DEVELOPMENT.md)_

---

### Pre-Hackathon Prep (Before Sunday)

**ALL TEAM:**

1. Join Discord server
2. Clone repo when created
3. Install: Node.js 18+, pnpm/npm
4. Add API keys to .env.local

**Prudhvi + Tiff:**

1. **Multi-category dataset**:
    - 20 restaurants (HappyCow + Google reviews)
    - 10 accommodations (Vegvisits, Booking.com)
    - Each with 3-5 review excerpts
2. Test Gemini API with 2 listings per category (validate category-adaptive prompts work) ✅

**Harshini + Tiff:**

1. **Events & Tours dataset**:
    - 5 tours (manual curation)
    - 5 events (Eventbrite, Facebook Events)
    - Each with 3-5 review/testimonial excerpts

**Tiff:**

1. Wireframes (6 screens: home with categories, multi-category list, detail views per category, AI explanation modal, chatbot, menu upload)
2. GitHub repo + Next.js boilerplate with category structure ✅
3. Curate 2 German menu photos for translator demo
4. Test GPT-4 Vision API (1 menu photo)
5. Estimate API costs (should be <$10 for demo) ✅
6. Share setup instructions ✅

**Koray**: Review tech stack (Next.js + Firebase + Gemini), Shadcn Chat docs, UI patterns

---

### Timeline (Sun, Nov 16)

**10:00-10:15 CET**: Opening remarks, team setup, final task assignments
**10:15-12:30**: Core features (category-adaptive analyzer, basic UI, data loading)
**12:30-13:30**: Lunch + integration check
**13:30-16:00**: Chatbot integration, score explanation UI
**16:00-17:15**: Testing, deploy, demo data prep
**17:15**: Coding ends - demo prep only
**17:30-18:30**: 5-minute presentations
**18:30-19:00**: Judging + awards

---

### Demo Script (5 minutes)

**0:00-0:30 | The Problem**
"As vegan travelers, we juggle research from HappyCow for restaurants, Vegvisits for hotels, Google for tours, Reddit for events. Every trip = 5+ sources. No one gives us complete travel intelligence. Until now."

**0:30-2:00 | Multi-Category AI Analysis (HERO)**

- Show home page with 4 categories
- Click accommodation → safety score displayed
- **Click "Why this score?"** → modal shows:
    - AI reasoning specific to accommodations
    - Review citations ("2 reviews mention 'dedicated vegan kitchen'...")
    - Signal breakdown (shared kitchen safety: 85, bedding: 100, breakfast: 90)
- Quick click through restaurant (different signals: cross-contamination, staff knowledge)
- "Our LLM adapts to each category. Same explainable intelligence across all travel decisions."

**2:00-4:00 | Complete Trip Planning (SHOWSTOPPER)**

- Switch to chat interface
- **Live demo**: "Plan my 3-day vegan trip to Berlin"
- AI responds with:
    - 2 accommodation recommendations
    - 4 restaurant suggestions (breakfast, lunch, dinner options)
    - 1 walking tour
    - 1 weekend event
- Follow-up: "Which hotel has the best vegan breakfast?"
- Shows contextual understanding across categories
- "No more juggling. One conversation. Complete trip."

**4:00-4:45 | Impact & Innovation**

- "Multi-modal AI: NLP + Vision + Conversational"
- "Category-adaptive: Different safety signals per travel decision"
- "Explainable: Shows reasoning, not black box"
- "Complete: Solves the cobbling problem"
- "40 listings today, any city tomorrow"
- "First platform treating vegan travel as integrated experience, not just restaurants"
- "$2,000 funding: expand to 5 cities (200 listings each), mobile app, booking integration"

**4:45-5:00 | Q&A**

---

### Winning Criteria Alignment

**Impact** (Judges' #1 concern):

- Addresses millions of vegan travelers globally
- Solves real pain point (juggling multiple sources)
- First complete vegan travel platform
- Authentic founder story (Prudhvi "lives this daily", and Tiff does this for trips multiple times a year)

**Innovation** (Technical judges):

- Multi-modal AI (NLP + Vision + Conversational)
- Category-adaptive analysis (not one-size-fits-all)
- Explainable AI (shows reasoning)
- RAG architecture (knowledge base)
- Real-time LLM inference

**Feasibility** (Can it actually work?):

- Web app = clean demo
- APIs proven pre-hackathon
- Realistic 11hr scope for 40 listings
- Clear data sources

**Scalability** (Prize = $2,000 to continue):

- API-driven (add cities easily)
- Category-agnostic architecture
- Community-powered (reviews → better scores)
- Clear go-to-market (vegan travel blogs, advocacy orgs)

---

### Budget Notes

**API costs for demo:**

- Gemini API: ~$0.80 for 40 listing analyses (4 categories)
- GPT-4 Vision: ~$0.10 per menu photo
- Total: <$10 for entire hackathon

**$2,000 prize usage plan** (mention in pitch):

- Expand to 5 cities (200 listings each: 100 restaurants, 50 accommodations, 30 tours, 20 events)
- Partner with advocacy orgs for data
- User testing with 100 travelers
- Mobile app development
- Booking API integration

---

### n8n Note

Optional. Potential uses:

- Automate review scraping → analysis pipeline
- Schedule weekly database updates across all categories
- Event monitoring (Eventbrite API → auto-add new events)
- Mention as "production automation layer" in pitch
