# VeganBnB - AI-Powered Complete Vegan Travel Intelligence Platform

**Team**: Tiff Ting (Lead/Full-Stack), Eitan (Persona Strategy), Felix (Data Curation)

First AI-powered complete vegan travel intelligence platform providing explainable safety scores across restaurants, accommodations, tours, and events using multi-modal AI.

## Tech Stack

Next.js 15 + TypeScript + Tailwind + OpenRouter AI + Firebase

*Full tech details in [DEVELOPMENT.md](DEVELOPMENT.md)*

## Setup

### Prerequisites
- Node.js 18+
- npm/pnpm
- Git

### Environment Variables
Create `.env.local` with:
```
OPENROUTER_API_KEY=your_openrouter_api_key
OPENAI_API_KEY=your_openai_api_key  # (backup)
GEMINI_API_KEY=your_google_gemini_api_key  # (backup)
# Firebase config ✅ 
# Maps API key (to be added)
```

### Installation
```bash
# Clone and install
git clone https://github.com/tiffting/veganbnb.git
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Current Status

🎯 **BREAKTHROUGH POSITIONING - DUAL PERSONA TRAVEL AI**:
- ✅ **Category-Adaptive AI Analyzer** - Hero feature with explainable safety scores
- ✅ **AI Travel Assistant Chatbot** - Showstopper feature with multi-category planning
- ✅ **Actionable Logistics** - eSIM-friendly booking, pricing, schedules for international travelers
- ✅ **AI-Powered Quick Actions** - Context-intelligent conversation flow with Gemini-generated suggestions
- ✅ **Dual Travel Personas** - Planner (calendar export, itineraries) + Explorer (maps, filters)
- ✅ **Persistent User Preferences** - Budget, safety scores, dietary restrictions remembered
- ✅ **Professional UI** - Landing page + persona-adaptive interfaces
- ✅ **Smart Interview Process (PRODUCTION READY)** - AI discovers travel style through strategic questions with fixed state management and enhanced UX

**Try the demo**: `http://localhost:3000/chat`

## Development Workflow

### Essential Commands
```bash
npm run dev       # Development server
npm run lint      # Code quality check
npm run build     # Production build test

# Test OpenRouter AI (primary)
node tests/test-openrouter.js

# Test OpenAI API (backup)
node tests/test-openai.js

# Test Gemini API (backup)
node tests/test-gemini.js
```

For detailed testing, troubleshooting, and code organization → see **[DEVELOPMENT.md](DEVELOPMENT.md)**

## Team

**3-person team** developing AI-powered vegan travel intelligence platform with dual persona strategy.

*See [CLAUDE.md](CLAUDE.md) for complete feature specifications and development roadmap.*  

## What We're Building

AI-powered vegan travel platform with category-adaptive review analysis, explainable safety scores, and conversational trip planning across restaurants, accommodations, tours, and events.

*Complete feature specs and project strategy in [CLAUDE.md](CLAUDE.md)*  
*Design system and UX strategy in [DESIGN.md](DESIGN.md)*

## Documentation

- **[CLAUDE.md](CLAUDE.md)** → Complete project specifications, AI prompts, development strategy
- **[DESIGN.md](DESIGN.md)** → UX strategy, visual language, component patterns  
- **[DEVELOPMENT.md](DEVELOPMENT.md)** → Technical setup, testing, troubleshooting, code organization
