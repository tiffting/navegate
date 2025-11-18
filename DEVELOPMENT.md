# Development Guide

## Setup & Configuration

### Environment Variables

```bash
# .env.local

# AI Provider Configuration (choose one)
AI_PROVIDER=openrouter  # Options: openrouter (default), openai, gemini

# API Keys - only need the key for your chosen provider
OPENROUTER_API_KEY=your_openrouter_api_key  # For OpenRouter (default)
OPENAI_API_KEY=your_openai_api_key          # For OpenAI GPT-4o-mini
GEMINI_API_KEY=your_gemini_api_key          # For Google Gemini

# Firebase & Maps APIs added later
```

### Essential Commands

```bash
npm run dev              # Development server
npm run build && npm run lint  # Pre-push check
npx tsc --noEmit         # TypeScript check

# Test current AI configuration
node tests/test-ai-config.js
```

### AI Provider Configuration

VeganBnB uses a centralized AI configuration system (`lib/ai-config.js`) that supports multiple providers:

#### Available Providers:

1. **OpenRouter** (default)
    - Model: `openai/gpt-oss-20b:free` (free tier)
    - Stability: High
    - Cost: $0
    - Good for: Development and production use

2. **OpenAI**
    - Model: `gpt-4o-mini`
    - Speed: Very fast
    - Cost: Low (~$0.15 per 1M tokens)
    - Good for: Quick responses, cost-effective production

3. **Google Gemini**
    - Model: `gemini-2.0-flash-lite`
    - Speed: Fast
    - Cost: Free tier (15 requests/min)
    - Note: Limited quota on free tier
    - Good for: Development, testing

#### Switching Providers:

Simply change `AI_PROVIDER` in `.env.local` and restart the dev server:

```bash
AI_PROVIDER=openai     # Switch to OpenAI
AI_PROVIDER=gemini     # Switch to Gemini
AI_PROVIDER=openrouter # Back to default
```

#### Cost Estimates:

- Demo usage (40 listings): ~$0.50-$1.00
- Production (1000 queries/day): ~$5-15/day depending on provider

## Development Workflow

### TypeScript Essentials

**Key Types** (create `lib/types.ts`):

```typescript
type Category = "restaurant" | "accommodation" | "tour" | "event";

interface SafetyScore {
    score: number; // 0-100
    reasoning: string;
    signals: Record<string, number>;
    citations: string[];
}

interface Listing {
    id: string;
    category: Category;
    name: string;
    reviews: string[];
    safetyScore?: SafetyScore;
}
```

### File Organization

```
components/
├── ui/        # Shadcn/UI components (shared)
├── chat/      # Koray - chatbot
├── listings/  # Dhruthi - detail views
├── maps/      # Koray - map integration
└── auth/      # Dhruthi - authentication

lib/
├── types.ts     # Shared types
├── mock-data.js # Shared test data
├── prompts.js   # AI agent prompts
└── firebase.js  # Database for storing venues
```

### Development Principles

- **Mobile-first**: Design for travelers on phones - responsive breakpoints essential
- **Persona-driven UI**: Established vegans want efficiency + safety transparency (see [DESIGN.md](DESIGN.md))
- **Gemini 404**: Use `gemini-2.5-flash` (not `gemini-1.5-flash`)
- **Mock first**: Build UI with fake data, connect APIs last
- **Validate responses**: AI can return malformed JSON
- **Premium aesthetic**: UI should justify $5-15/month pricing

### Before Every Commit

- [ ] Update [CLAUDE.md](CLAUDE.md): "What's Implemented", "Next Priority Tasks", "Proposed Task Breakdown", timestamp
- [ ] Update [DEVELOPMENT.md](DEVELOPMENT.md): "Next Steps" section
- [ ] Update [README.md](README.md): Any relevant status indicators
- [ ] Test changes work (`npm run build && npm run lint`)
- [ ] Then commit with descriptive message

## Development Workflow

### Git Best Practices

```bash
git pull origin main                    # Always pull first
git checkout -b feature/map-integration # Feature branches
git commit -m "feat: add Mapbox map"   # Conventional commits
```

### Development Pattern

**Recommended approach**: Types → Mock data → UI → Real API

```typescript
// 1. Define interface
interface VenueCardProps { 
  venue: Listing;
  onClose: () => void;
}

// 2. Use mock data during development
const mockVenue = mockListings[0];

// 3. Build UI components
// 4. Connect to real APIs last
```

### Performance Tips

- **Use mock data during development** to save API costs
- **Test before committing**: `npm run build && npm run lint`
- **Enable response caching** to avoid duplicate API calls
- **Use free tier models** (OpenRouter) during development

## Reference

**Documentation**: [README.md](README.md) | [CLAUDE.md](CLAUDE.md) | [DESIGN.md](DESIGN.md)
**Next Steps**: ✅ ~~Chatbot integration~~ → ✅ ~~**Actionable logistics complete**~~ → ✅ ~~**AI-powered quick actions + UX polish**~~ → ✅ ~~**Smart Interview Process (PRODUCTION READY)**~~ → ✅ ~~**API Error Handling + Token Optimization**~~ → **Map integration (Mapbox)** + **Calendar export** → Deploy → Demo prep (PRODUCTION READY!)

**DEMO-CRITICAL COMPLETED**: ✅ Enhanced mock data + chatbot responses with actionable logistics (hours, schedules, eSIM-friendly booking) + AI-powered contextual quick actions with welcome message optimization

**STRATEGIC FOCUS**: Dual persona interfaces (Planner vs Explorer) - no traditional listing pages needed

**TECHNICAL IMPLEMENTATION**: Hybrid architecture complete - stable data stored locally with comprehensive logistics fields

## Data Integration Guide

### **Available APIs for Future Integration**

- **Google Places API**: Restaurant data, reviews, hours, real-time info
- **Yelp Fusion API**: Restaurant reviews and ratings  
- **TripAdvisor Content API**: Reviews for restaurants, hotels, attractions
- **OpenRouter/OpenAI**: AI processing for review analysis
- **Booking.com API**: Accommodation availability
- **GetYourGuide API**: Tours and activities

### **Target Data Sources**

- **Google Places**: Restaurant data, reviews, hours, photos
- **Yelp**: Restaurant reviews and ratings (free API tier)
- **TripAdvisor**: Tour and accommodation reviews (partner required)
- **Booking.com/Airbnb**: Accommodation availability and pricing
- **Eventbrite/Facebook Events**: Event listings and schedules
- **Berlin Vegan GitHub**: Open source venue data for Berlin
- **Web scraping**: As fallback for sites without APIs

### **Integration Points**

- **Current mock data** in `lib/mock-data.js` - shows expected data structure
- **API routes** in `app/api/` - modify to fetch live data instead of mock
- **Safety score analyzer** in `app/api/analyze/route.js` - ready for real reviews
- **Database schema** - Firebase Firestore already set up for live data

### **Development Workflow**

```bash
git checkout -b feature/external-data-sources
# Work on data integrations
# Test with small datasets first
# Merge back to main when stable
```

**ACTIONABLE LOGISTICS FEATURES**:

- ✅ eSIM-friendly booking methods (online/email priority, no phone required)
- ✅ Complete operational details (hours, pricing, schedules, transit)
- ✅ Language barrier solutions (English booking platforms highlighted)
- ✅ Enhanced TypeScript interfaces for logistics data
- ✅ International traveler considerations built-in

## Chatbot Implementation Complete

### Features Delivered:

- **Multi-category RAG**: AI has complete context across restaurants, accommodations, tours, events
- **Human-readable signals**: "Food Quality: 95" instead of "food_quality:95"
- **Markdown formatting**: Professional responses with **bold**, bullet points, sections
- **Real-time chat**: Auto-scroll, typing indicators, conversation history
- **Professional UI**: Landing page + chat interface with quick suggestions

### API Endpoints:

- `POST /api/chat` - Multi-category travel planning conversations
- `POST /api/analyze` - Category-adaptive safety score analysis

### Testing:

- `tests/test-chatbot.js` - Comprehensive conversation scenarios
- `tests/test-calendar-export.js` - Calendar export functionality validation
- All TypeScript/lint compliant

```bash
# Test calendar export feature
npx tsx tests/test-calendar-export.js
```
