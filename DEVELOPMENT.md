# Development Guide

## Setup & Configuration

### Environment Variables

```bash
# .env.local
GEMINI_API_KEY=your_key_here
# Firebase & Maps APIs added later
```

### Essential Commands

```bash
npm run dev              # Development server
npm run build && npm run lint  # Pre-push check
npx tsc --noEmit         # TypeScript check

# Test Gemini API
node tests/test-gemini.js
```

**Model**: `gemini-2.5-flash` | **Cost**: ~$0.80 for demo

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
├── gemini.js    # Prudhvi - AI client
└── firebase.js  # Prudhvi - database
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

## Team Coordination

### Git Workflow

```bash
git pull origin main                    # Always pull first
git checkout -b feature/chatbot-ui      # Feature branches
git commit -m "feat: add safety scores" # Clear commit messages
```

### Communication Rules

- **Discord check-ins every 2 hours**
- **Share blockers immediately**
- **Test before pushing**: `npm run build && npm run lint`
- **Mock data during UI dev** - save API costs

### Rapid Development

**Pattern**: Types → Mock data → UI → Real API

```typescript
// 1. Define interface
interface CardProps { listing: Listing }

// 2. Mock data first
const mockData = { ... }

// 3. Build UI, connect API last
```

### Crisis Management

- **Don't panic push** - coordinate first
- **Quick revert**: `git reset --hard HEAD~1`
- **API limits**: Use cached demo responses
- **Merge conflicts**: Ask for help immediately

### Demo Day

- **Deploy 2 hours early** (not localhost)
- **Backup demo data** if APIs fail
- **Focus on functionality** over perfect styling

## Reference

**Documentation**: [README.md](README.md) | [CLAUDE.md](CLAUDE.md) | [DESIGN.md](DESIGN.md)
**Next Steps**: ✅ ~~Chatbot integration~~ → ✅ ~~**Actionable logistics complete**~~ → ✅ ~~**AI-powered quick actions**~~ → **External data sourcing** (Eitan/Felix/Jean-Luc) + **Frontend polish** (Tiff) → Deploy → Demo prep (PRODUCTION READY!)

**DEMO-CRITICAL COMPLETED**: ✅ Enhanced mock data + chatbot responses with actionable logistics (hours, schedules, eSIM-friendly booking) + AI-powered contextual quick actions

**TECHNICAL IMPLEMENTATION**: Hybrid architecture complete - stable data stored locally with comprehensive logistics fields

## Data Sourcing Team Guide (Eitan, Felix, Jean-Luc)

### **Available APIs from Organizers**
- **ScrapingDog**: Web scraping for reviews and venue details  
- **OpenRouter**: Access to multiple LLM models for data processing
- **Potentially**: Google Places API, other APIs Sam can provide

### **Target Data Sources**
- **HappyCow**: Restaurant data and reviews
- **Google Places**: Hours, contact info, basic details
- **TripAdvisor**: Tour and accommodation reviews  
- **Booking.com/Airbnb**: Accommodation availability and pricing
- **Eventbrite/Facebook Events**: Event listings and schedules

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
- All TypeScript/lint compliant
