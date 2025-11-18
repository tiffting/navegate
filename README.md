# VeganBnB - AI-Powered Complete Vegan Travel Intelligence Platform

**Project Origin**: Started at [Code for Compassion Berlin](https://electric-sheep-org.squarespace.com/code-for-compassion) hackathon (Nov 16, 2025), now a personal project by Tiff Ting

First AI-powered complete vegan travel intelligence platform providing explainable safety scores across restaurants, accommodations, tours, and events using multi-modal AI.

## Tech Stack

Next.js 15 + TypeScript + Tailwind + OpenRouter AI + Firebase

_Full tech details in [DEVELOPMENT.md](DEVELOPMENT.md)_

## Setup

### Prerequisites

- Node.js 18+
- npm/pnpm
- Git

### Environment Variables

Create `.env.local` with:

```
# AI Provider Configuration
AI_PROVIDER=openrouter  # Options: openrouter (default), openai, gemini

# API Keys (only need the key for your chosen provider)
OPENROUTER_API_KEY=your_openrouter_api_key
OPENAI_API_KEY=your_openai_api_key
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

## AI Configuration

VeganBnB supports multiple AI providers for flexibility and reliability:

- **OpenRouter** (default) - Free tier using `openai/gpt-oss-20b:free` model
- **OpenAI** - Fast and cost-effective with `gpt-4o-mini`
- **Google Gemini** - Free tier using `gemini-2.0-flash-lite` (quota limited)

To switch providers, simply update `AI_PROVIDER` in `.env.local`:

```bash
AI_PROVIDER=openai     # Use OpenAI GPT-4o-mini
AI_PROVIDER=gemini     # Use Google Gemini
AI_PROVIDER=openrouter # Use OpenRouter (default)
```

Test your configuration:

```bash
node tests/test-ai-config.js
```

## Current Status

### ✅ Completed Features

- **Category-Adaptive AI Analyzer** - Explainable safety scores with review citations
- **AI Travel Assistant Chatbot** - Complete trip planning across all venue categories
- **Smart Interview Process** - AI discovers travel style through strategic questions
- **Actionable Logistics** - Hours, pricing, booking methods for real trip execution
- **User Preferences** - Persistent settings (budget, safety, dietary restrictions)
- **API Error Handling** - User-friendly rate limit messages and fallbacks
- **Token Optimization** - Response caching and chat history compression

### 🚧 In Progress

- **Interactive Map** - Mapbox integration for Explorer persona
- **Calendar Export** - Generate .ics files from multi-day itineraries

### 🎯 Vision

First travel AI that adapts to YOUR travel personality - whether you're a detailed planner who wants calendar events and itineraries, or a spontaneous explorer who discovers through maps and filters.

### Demo

**🌐 Live Demo**: https://veganbnb-zeta.vercel.app/

**💻 Local Development**: `npm run dev` then visit `http://localhost:3000`

## Development Workflow

### Essential Commands

```bash
npm run dev       # Development server
npm run lint      # Code quality check
npm run build     # Production build test

# Test AI configuration (checks current provider)
node tests/test-ai-config.js

# Legacy individual provider tests (optional)
node tests/test-openrouter.js
node tests/test-openai.js
node tests/test-gemini.js
```

## Documentation

- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Technical setup, project structure, and development guide
- **[CLAUDE.md](CLAUDE.md)** - Feature specifications and product roadmap
- **[DESIGN.md](DESIGN.md)** - UI/UX design system and principles

## Contributing

This is currently a personal project, but contributions are welcome! Please open an issue to discuss major changes before submitting PRs.

## License

MIT
