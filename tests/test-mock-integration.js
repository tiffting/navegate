import { mockListings, getListingsByCategory, getHighScoringListings } from "../lib/mock-data.js";

console.log("🧪 Testing Mock Data Integration\n");

// Test basic import
console.log(`✓ Imported ${mockListings.length} mock listings`);

// Test category filtering
const restaurants = getListingsByCategory('restaurant');
const accommodations = getListingsByCategory('accommodation');  
const tours = getListingsByCategory('tour');
const events = getListingsByCategory('event');

console.log(`✓ Restaurants: ${restaurants.length}`);
console.log(`✓ Accommodations: ${accommodations.length}`);
console.log(`✓ Tours: ${tours.length}`);
console.log(`✓ Events: ${events.length}`);

// Test high-scoring filter
const highScoring = getHighScoringListings(85);
console.log(`✓ High-scoring listings (85+): ${highScoring.length}`);

// Validate data structure matches TypeScript interfaces
const firstListing = mockListings[0];
const requiredFields = ['id', 'category', 'name', 'location', 'reviews', 'safetyScore'];
const missingFields = requiredFields.filter(field => !firstListing.hasOwnProperty(field));

if (missingFields.length === 0) {
    console.log("✓ Mock data structure matches Listing interface");
} else {
    console.log(`❌ Missing fields: ${missingFields.join(', ')}`);
}

// Validate safety score structure
const safetyScore = firstListing.safetyScore;
const requiredScoreFields = ['score', 'category', 'reasoning', 'signals', 'citations', 'analyzedAt'];
const missingScoreFields = requiredScoreFields.filter(field => !safetyScore.hasOwnProperty(field));

if (missingScoreFields.length === 0) {
    console.log("✓ Safety score structure matches SafetyScore interface");
    console.log(`  Sample: ${firstListing.name} scored ${safetyScore.score}/100`);
} else {
    console.log(`❌ Missing score fields: ${missingScoreFields.join(', ')}`);
}

console.log("\n🎉 Mock data integration test complete!");