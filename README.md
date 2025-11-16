# VeganBnB - AI-Powered Complete Vegan Travel Intelligence Platform

**Team**: Prudhvi Raj (Lead), Koray Akalin, Dhruthi Keerthi, Harshini Madhu, Tiff Ting

First AI-powered complete vegan travel intelligence platform providing explainable safety scores across restaurants, accommodations, tours, and events using multi-modal AI.

## Tech Stack

Next.js 15 + TypeScript + Tailwind + Google Gemini API + Firebase

*Full tech details in [DEVELOPMENT.md](DEVELOPMENT.md)*

## Setup

### Prerequisites
- Node.js 18+
- npm/pnpm
- Git

### Environment Variables
Create `.env.local` with:
```
GEMINI_API_KEY=your_google_gemini_api_key
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

🎉 **PRODUCTION READY - ALL CORE FEATURES COMPLETE + AI ENHANCEMENTS**:
- ✅ **Category-Adaptive AI Analyzer** - Hero feature with explainable safety scores
- ✅ **AI Travel Assistant Chatbot** - Showstopper feature with multi-category planning
- ✅ **Actionable Logistics** - eSIM-friendly booking, pricing, schedules for international travelers
- ✅ **AI-Powered Quick Actions** - Context-intelligent conversation flow with Gemini-generated suggestions
- ✅ **Professional UI** - Landing page + chat interface
- ✅ **RAG Architecture** - Complete database context with human-readable formatting

**Try the demo**: `http://localhost:3000/chat`

## Development Workflow

### Essential Commands
```bash
npm run dev       # Development server
npm run lint      # Code quality check
npm run build     # Production build test

# Test Gemini API (see DEVELOPMENT.md for details)
node tests/test-gemini.js
```

For detailed testing, troubleshooting, and code organization → see **[DEVELOPMENT.md](DEVELOPMENT.md)**

## Team

**5-person distributed team** across India, Berlin, and Taiwan working on AI-powered vegan travel platform.

*See [CLAUDE.md](CLAUDE.md) for proposed task breakdown and team coordination.*  

## What We're Building

AI-powered vegan travel platform with category-adaptive review analysis, explainable safety scores, and conversational trip planning across restaurants, accommodations, tours, and events.

*Complete feature specs and project strategy in [CLAUDE.md](CLAUDE.md)*  
*Design system and UX strategy in [DESIGN.md](DESIGN.md)*

## Documentation

- **[CLAUDE.md](CLAUDE.md)** → Complete project specifications, AI prompts, team strategy
- **[DESIGN.md](DESIGN.md)** → UX strategy, visual language, component patterns  
- **[DEVELOPMENT.md](DEVELOPMENT.md)** → Technical setup, testing, troubleshooting, code organization
