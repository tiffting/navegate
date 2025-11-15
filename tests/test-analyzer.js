import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Test data for each category
const testData = {
    restaurant: {
        reviews: [
            "This 100% vegan restaurant is completely safe from cross-contamination! The staff are incredibly knowledgeable about all ingredients.",
            "Chef personally explained every ingredient and preparation method. Separate kitchen area ensures zero contamination risk.",
            "Outstanding transparency - they list every single ingredient and source. Staff could answer any dietary question."
        ],
        expectedSignals: ['cross_contamination', 'staff_knowledge', 'ingredient_transparency', 'community_trust']
    },
    
    accommodation: {
        reviews: [
            "Dedicated vegan kitchen with separate utensils and cookware. Organic cotton bedding throughout.",
            "Amazing vegan breakfast spread with 10+ options. Host extremely knowledgeable about plant-based nutrition.",
            "Shared kitchen but well-organized with vegan section. Host provides comprehensive vegan restaurant guide."
        ],
        expectedSignals: ['kitchen_safety', 'bedding', 'breakfast_quality', 'host_knowledge']
    },
    
    tour: {
        reviews: [
            "Guide was vegan herself and incredibly knowledgeable. All meals perfectly accommodated my dietary needs.",
            "No hidden animal exploitation in any activities. Group was very supportive of dietary restrictions.",
            "Food handling was excellent - guide ensured all meals were properly prepared and clearly labeled."
        ],
        expectedSignals: ['guide_expertise', 'meal_handling', 'hidden_exploitation', 'group_dynamics']
    },
    
    event: {
        reviews: [
            "Outstanding vegan food variety - 20+ dishes! Clearly labeled allergens and accessible venue.",
            "Incredibly welcoming community atmosphere. Staff accommodated all dietary restrictions seamlessly.",
            "Great accessibility features and diverse, inclusive crowd. Food quality was restaurant-level."
        ],
        expectedSignals: ['food_quality', 'accessibility', 'community_vibe', 'inclusivity']
    }
};

async function testAnalyzer() {
    console.log("🧪 Testing Category-Adaptive Analyzer\n");

    const baseUrl = 'http://localhost:3000'; // Next.js dev server
    let passedTests = 0;
    let totalTests = 0;

    // Test each category
    for (const [category, data] of Object.entries(testData)) {
        console.log(`\n=== Testing ${category.toUpperCase()} Analysis ===`);
        totalTests++;

        try {
            const response = await fetch(`${baseUrl}/api/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category,
                    reviews: data.reviews
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.log(`❌ HTTP ${response.status}: ${error.error}`);
                continue;
            }

            const analysis = await response.json();
            
            // Validate basic structure
            console.log("✓ API response received");
            
            if (analysis.score >= 0 && analysis.score <= 100) {
                console.log(`✓ Valid safety score: ${analysis.score}/100`);
            } else {
                console.log(`❌ Invalid safety score: ${analysis.score}`);
                continue;
            }
            
            if (analysis.category === category) {
                console.log(`✓ Correct category: ${analysis.category}`);
            } else {
                console.log(`❌ Wrong category: expected ${category}, got ${analysis.category}`);
                continue;
            }
            
            if (analysis.reasoning && analysis.reasoning.length > 10) {
                console.log("✓ Has reasoning text");
            } else {
                console.log("❌ Missing or insufficient reasoning");
                continue;
            }
            
            // Validate category-specific signals
            const signals = analysis.signals;
            const missingSignals = data.expectedSignals.filter(signal => 
                signals[signal] === undefined || signals[signal] < 0 || signals[signal] > 100
            );
            
            if (missingSignals.length === 0) {
                console.log("✓ All expected signals present and valid");
                console.log(`  Signals: ${Object.entries(signals).map(([k,v]) => `${k}:${v}`).join(', ')}`);
            } else {
                console.log(`❌ Missing/invalid signals: ${missingSignals.join(', ')}`);
                continue;
            }
            
            // Validate citations
            if (analysis.citations && Array.isArray(analysis.citations) && analysis.citations.length > 0) {
                console.log(`✓ Has ${analysis.citations.length} citation(s)`);
            } else {
                console.log("❌ Missing or invalid citations");
                continue;
            }
            
            // Check timestamp
            if (analysis.analyzedAt && new Date(analysis.analyzedAt).getTime() > 0) {
                console.log("✓ Has valid timestamp");
            } else {
                console.log("❌ Missing or invalid timestamp");
                continue;
            }
            
            console.log(`🎉 ${category.toUpperCase()} test PASSED`);
            passedTests++;
            
        } catch (error) {
            console.log(`❌ Test failed: ${error.message}`);
        }
    }

    // Test error scenarios
    console.log("\n=== Testing Error Scenarios ===");
    
    // Test invalid category
    totalTests++;
    try {
        const response = await fetch(`${baseUrl}/api/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                category: 'invalid',
                reviews: ['test review']
            }),
        });
        
        if (response.status === 400) {
            console.log("✓ Invalid category properly rejected");
            passedTests++;
        } else {
            console.log(`❌ Invalid category should return 400, got ${response.status}`);
        }
    } catch (error) {
        console.log(`❌ Error scenario test failed: ${error.message}`);
    }

    // Test empty reviews
    totalTests++;
    try {
        const response = await fetch(`${baseUrl}/api/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                category: 'restaurant',
                reviews: []
            }),
        });
        
        if (response.status === 400) {
            console.log("✓ Empty reviews properly rejected");
            passedTests++;
        } else {
            console.log(`❌ Empty reviews should return 400, got ${response.status}`);
        }
    } catch (error) {
        console.log(`❌ Error scenario test failed: ${error.message}`);
    }

    // Summary
    console.log(`\n📊 Test Results: ${passedTests}/${totalTests} passed`);
    
    if (passedTests === totalTests) {
        console.log("🎉 All tests passed! Category-adaptive analyzer is working correctly.");
        return true;
    } else {
        console.log("❌ Some tests failed. Check the output above for details.");
        return false;
    }
}

// Check if we're running in a Node.js environment with access to dev server
if (typeof window === 'undefined') {
    console.log("⚠️  Note: This test requires the Next.js dev server to be running.");
    console.log("   Start it with: npm run dev");
    console.log("   Then run: node tests/test-analyzer.js\n");
    
    // Try to test if server is running
    testAnalyzer().catch(error => {
        if (error.code === 'ECONNREFUSED') {
            console.log("❌ Could not connect to http://localhost:3000");
            console.log("   Make sure to run 'npm run dev' first!");
        } else {
            console.log("❌ Unexpected error:", error.message);
        }
    });
}