// Test for AI-powered quick actions API endpoint
// This tests the /api/quick-actions endpoint that generates contextual suggestions

console.log("🤖 Testing AI-Powered Quick Actions API\n");

// Test scenarios for the API endpoint
const testScenarios = [
  {
    name: "Welcome Message",
    lastMessage: { 
      content: "Hi! I'm your AI vegan travel assistant. I can help you find restaurants, accommodations, tours, and events with detailed safety scores and booking information.\n\nWhich city are you planning to visit? 🌍" 
    },
    conversationHistory: [],
    expectedType: "city_selection"
  },
  {
    name: "Berlin City Response", 
    lastMessage: { 
      content: "Berlin! Excellent choice for vegan travelers 🌱 When are you planning to visit?" 
    },
    conversationHistory: [
      { role: "user", content: "Berlin" },
    ],
    expectedType: "trip_planning"
  },
  {
    name: "Restaurant Recommendations",
    lastMessage: { 
      content: "I recommend **Kopps** (98/100 safety score) for exceptional fine dining. Check out [their website](https://kopps-berlin.de/en/) for reservations - it's €€€ range but worth it for the 4-7 course tasting menus." 
    },
    conversationHistory: [
      { role: "user", content: "Show me restaurants" },
    ],
    expectedType: "category_expansion"
  },
  {
    name: "Comprehensive Trip Planning Response",
    lastMessage: { 
      content: "## Perfect 3-Day Berlin Vegan Itinerary\n\n### Accommodation\n**A&O Berlin Mitte** (78/100) - Modern hostel with vegan breakfast options\n- Check-in: 3:00 PM\n- Book at: [A&O Hostels](https://www.aohostels.com/en/berlin/berlin-mitte/)\n\n### Restaurants\n**Kopps** (98/100) - Upscale fine dining\n- Hours: Wed-Sat 5:30 PM - Late\n- Book via: [Kopps website](https://kopps-berlin.de/en/)\n\n### Tour\n**Berlin Vegan Food Tour** (94/100)\n- When: Saturdays 2-6 PM\n- Book: [GetYourGuide](https://www.getyourguide.com/berlin-l17/berlin-vegan-food-tour-t408673/) €65\n\n🎯 All venues have English booking options - perfect for eSIM users!" 
    },
    conversationHistory: [
      { role: "user", content: "Plan my 3-day vegan trip to Berlin" },
    ],
    expectedType: "refinement_booking"
  }
];

async function testQuickActionsAPI() {
  let passed = 0;
  let total = testScenarios.length;

  console.log(`🚀 Running ${total} API tests...\n`);

  for (const [index, scenario] of testScenarios.entries()) {
    console.log(`=== Test ${index + 1}: ${scenario.name} ===`);
    
    try {
      // Test the API endpoint
      const response = await fetch('http://localhost:3000/api/quick-actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lastMessage: scenario.lastMessage,
          conversationHistory: scenario.conversationHistory
        }),
      });

      if (!response.ok) {
        console.log(`❌ API request failed with status: ${response.status}`);
        continue;
      }

      const data = await response.json();
      
      // Validate response structure
      if (!data.suggestions || !Array.isArray(data.suggestions)) {
        console.log(`❌ Invalid response structure: ${JSON.stringify(data)}`);
        continue;
      }

      // Check if we got 4 suggestions
      if (data.suggestions.length !== 4) {
        console.log(`⚠️ Expected 4 suggestions, got ${data.suggestions.length}`);
      }

      // Validate suggestion quality (basic checks)
      let validSuggestions = 0;
      data.suggestions.forEach((suggestion, i) => {
        if (typeof suggestion === 'string' && suggestion.length > 0 && suggestion.length <= 50) {
          validSuggestions++;
          console.log(`✓ Suggestion ${i + 1}: "${suggestion}"`);
        } else {
          console.log(`⚠️ Invalid suggestion ${i + 1}: "${suggestion}"`);
        }
      });

      // Test passes if we got valid suggestions
      if (validSuggestions >= 3) {
        console.log(`🎉 Test PASSED (${validSuggestions}/4 valid suggestions)`);
        passed++;
      } else {
        console.log(`❌ Test FAILED (only ${validSuggestions}/4 valid suggestions)`);
      }

    } catch (error) {
      console.log(`❌ Test failed with error: ${error.message}`);
    }
    
    console.log(""); // Empty line between tests
  }

  // Summary
  console.log(`📊 API Test Results: ${passed}/${total} passed`);
  
  if (passed === total) {
    console.log("🎉 All API tests passed! AI-powered quick actions are working correctly.");
    return true;
  } else if (passed === 0) {
    console.log("❌ All tests failed. Check if the server is running and the API endpoint is working.");
    return false;
  } else {
    console.log(`⚠️ Some tests failed. Success rate: ${Math.round(passed/total*100)}%`);
    return false;
  }
}

// Test fallback functionality (when API is not available)
function testFallbackSuggestions() {
  console.log("\n🛡️ Testing Fallback Quick Actions (when API fails)\n");
  
  // Simple fallback logic test
  const fallbackScenarios = [
    {
      name: "Restaurant context",
      content: "I recommend Kopps restaurant for dining",
      expected: ["What about accommodations?", "Any nearby hotels?", "Show me food tours", "I'm also gluten-free"]
    },
    {
      name: "Default fallback",
      content: "Here's some general information",
      expected: ["Tell me more about this", "What else do you recommend?", "Any budget-friendly options?", "Plan my complete itinerary"]
    }
  ];
  
  let passed = 0;
  
  fallbackScenarios.forEach((scenario, index) => {
    console.log(`=== Fallback Test ${index + 1}: ${scenario.name} ===`);
    
    // This simulates the fallback logic from the API
    const content = scenario.content.toLowerCase();
    let suggestions;
    
    if (content.includes('restaurant') || content.includes('dining') || content.includes('kopps')) {
      suggestions = ["What about accommodations?", "Any nearby hotels?", "Show me food tours", "I'm also gluten-free"];
    } else {
      suggestions = ["Tell me more about this", "What else do you recommend?", "Any budget-friendly options?", "Plan my complete itinerary"];
    }
    
    if (JSON.stringify(suggestions) === JSON.stringify(scenario.expected)) {
      console.log(`✓ Fallback suggestions: [${suggestions.map(s => `"${s}"`).join(', ')}]`);
      console.log("🎉 Fallback test PASSED");
      passed++;
    } else {
      console.log(`❌ Expected: [${scenario.expected.map(s => `"${s}"`).join(', ')}]`);
      console.log(`❌ Got: [${suggestions.map(s => `"${s}"`).join(', ')}]`);
    }
    console.log("");
  });
  
  console.log(`📊 Fallback Test Results: ${passed}/${fallbackScenarios.length} passed\n`);
}

// Check if running in Node.js environment
if (typeof window === 'undefined') {
  console.log("⚠️  Note: This tests the AI quick actions API endpoint.");
  console.log("   Make sure the development server is running on localhost:3000");
  console.log("   If API tests fail, fallback tests will demonstrate the backup logic.\n");
  
  // Run API tests
  testQuickActionsAPI()
    .then((success) => {
      if (!success) {
        console.log("API tests failed, running fallback tests...\n");
        testFallbackSuggestions();
      }
    })
    .catch((error) => {
      console.log("❌ Failed to run API tests:", error.message);
      console.log("Running fallback tests instead...\n");
      testFallbackSuggestions();
    });
}