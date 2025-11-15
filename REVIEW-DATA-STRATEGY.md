# Review Data Sourcing Strategy

## Current Status

✅ **Mock Data Ready**: `lib/mock-data.js` contains realistic demo data for all 4 categories  
✅ **API Working**: Category-adaptive analyzer processes reviews and generates safety scores  
✅ **TypeScript Interfaces**: Complete type safety for all data structures  

## For Hackathon Demo (Nov 16)

**Recommendation**: Use pre-curated review excerpts for speed and reliability.

### Approach 1: Manual Curation (RECOMMENDED for hackathon)
- **Time required**: 2-3 hours
- **Reliability**: 100% 
- **Quality**: High - can select impactful quotes
- **Risk**: Low - no API dependencies

**Process**:
1. Research 40 Berlin venues across categories using:
   - HappyCow for restaurants
   - Vegvisits + Booking.com for accommodations  
   - TripAdvisor for tours
   - Eventbrite for events
2. Extract 3-5 representative review excerpts per venue
3. Focus on quotes that highlight category-specific safety signals
4. Store in `lib/demo-data.js` with pre-analyzed safety scores

### Approach 2: Semi-Automated Scraping (if time permits)
- **Time required**: 4-6 hours
- **Reliability**: 80% (rate limits, anti-bot measures)
- **Quality**: Variable - needs filtering
- **Risk**: Medium - could break during demo

**Process**:
1. Use public APIs where available (Google Places API only)
2. **Try HappyCowler tool**: `https://github.com/peterwittek/happycowler`
   - Python scraper specifically for HappyCow
   - May need updates for current HappyCow structure
   - Test thoroughly before relying on it
3. Respectful web scraping with delays for other sources
4. Focus on extracting review text + basic metadata
5. Filter for relevance to vegan safety signals

## Data Sources by Category

### 🍽️ Restaurants
**Primary**: HappyCow.com
- Largest database of vegan/veg-friendly restaurants
- User reviews focus on vegan safety
- Clear categorization (fully vegan vs vegan options)
- **Collection options**: 
  - Manual (safest for hackathon)
  - HappyCowler scraper tool (needs testing first)

**Secondary**: Google Maps, TripAdvisor
- Broader review base
- Need to filter for vegan-relevant content

### 🏨 Accommodations  
**Primary**: Vegvisits.com
- Vegan-focused accommodation platform
- Reviews mention kitchen facilities, bedding, breakfast

**Secondary**: Booking.com, Airbnb
- Filter for "vegan breakfast" or "plant-based" mentions
- Look for shared kitchen info

### 🚶 Tours & Experiences
**Primary**: TripAdvisor, GetYourGuide
- Tour reviews often mention food handling
- Look for dietary accommodation mentions

**Secondary**: Local vegan tour company websites
- Direct testimonials
- More detailed food safety info

### 🎪 Events
**Primary**: Eventbrite, Facebook Events
- Past event reviews/comments
- Attendee testimonials

**Secondary**: Vegan community groups
- Meetup.com reviews
- Facebook group discussions

## Data Quality Guidelines

### Review Selection Criteria
1. **Relevance**: Must mention category-specific safety signals
2. **Specificity**: Concrete details over general opinions  
3. **Credibility**: Multiple sources confirming similar experiences
4. **Recency**: Prefer reviews from last 12 months
5. **Balance**: Include both positive and cautionary examples

### Example Good Review Excerpts

**Restaurant**: *"100% vegan restaurant with separate kitchen. Staff explained every ingredient and preparation method."*

**Accommodation**: *"Shared kitchen but dedicated vegan section with separate utensils. Organic cotton bedding confirmed."*

**Tour**: *"Guide was vegan herself and ensured all food stops were safely prepared with no cross-contamination."*

**Event**: *"Amazing food variety with clear allergen labeling. Wheelchair accessible venue with inclusive atmosphere."*

## Implementation Priority

**For Nov 16 Hackathon**:
1. **Use mock data** for demo (already complete)
2. **Manual curation** for 5-10 real Berlin venues per category
3. **Focus on demo impact** over comprehensive coverage

**Post-Hackathon**:
1. Expand to 40+ venues with detailed curation
2. Implement semi-automated scraping tools
3. Build community review submission system
4. Add real-time review monitoring

## Legal & Ethical Considerations

- **Respect robots.txt** and rate limits
- **Attribution**: Credit review sources appropriately  
- **Privacy**: No personal information from reviews
- **Fair use**: Extract minimal excerpts for analysis
- **Terms of Service**: Comply with all platform ToS

## Team Coordination

**Prudhvi + Tiff**: Restaurant data (20 venues)
**Harshini + Tiff**: Tour & Event data (10 venues)  
**All team**: Accommodation validation (10 venues)

**Timeline**: Complete data collection by Nov 16 10:00 CET (hackathon start)