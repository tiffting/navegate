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
type Category = 'restaurant' | 'accommodation' | 'tour' | 'event'

interface SafetyScore {
  score: number      // 0-100
  reasoning: string
  signals: Record<string, number>
  citations: string[]
}

interface Listing {
  id: string
  category: Category
  name: string
  reviews: string[]
  safetyScore?: SafetyScore
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
- **Gemini 404**: Use `gemini-2.5-flash` (not `gemini-1.5-flash`)
- **Mock first**: Build UI with fake data, connect APIs last
- **Validate responses**: AI can return malformed JSON

### Before Every Commit
- [ ] Update CLAUDE.md: "What's Implemented", "Next Priority Tasks", "Proposed Task Breakdown", timestamp
- [ ] Update DEVELOPMENT.md: "Next Steps" section
- [ ] Update README.md: Any relevant status indicators
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

**Documentation**: [README.md](README.md) | [CLAUDE.md](CLAUDE.md)  
**Next Steps**: Chatbot integration → Basic UI → Deploy → Demo prep (7hr timeline)
