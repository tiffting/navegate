// Test for dynamic quick actions functionality
// This tests the contextual suggestion logic without requiring the full UI

console.log("🎯 Testing Dynamic Quick Actions\n");

// Mock the getContextualSuggestions function (copied from component)
function getContextualSuggestions(lastMessage, allMessages) {
  const content = lastMessage.content.toLowerCase();
  const conversationHistory = allMessages.slice(-4).map(m => m.content.toLowerCase()).join(' ');
  
  // Welcome/initial city mention
  if (content.includes('which city') || content.includes('planning to visit')) {
    return [
      "I'm planning a 3-day trip",
      "What are your top recommendations?",
      "I need accommodations too",
      "When's the best time to visit?"
    ];
  }
  
  // After city acknowledged, asking for trip details
  if (content.includes('berlin') && (content.includes('dates') || content.includes('when are you') || content.includes('planning'))) {
    return [
      "I'm going next month",
      "Planning a weekend trip",
      "I need restaurants and hotels",
      "What about food tours?"
    ];
  }
  
  // Restaurant-focused responses
  if (content.includes('kopps') || content.includes('restaurant') || content.includes('dining') || content.includes('€€€')) {
    return [
      "What about accommodations?",
      "Any nearby hotels?",
      "Show me food tours",
      "I'm also gluten-free"
    ];
  }
  
  // Accommodation-focused responses  
  if (content.includes('vegan hostel') || content.includes('check-in') || content.includes('accommodation') || content.includes('bedding')) {
    return [
      "What restaurants are nearby?",
      "Any walking tours?",
      "Show me local events",
      "What's the nightlife like?"
    ];
  }
  
  // Tour-focused responses
  if (content.includes('food tour') || content.includes('saturdays') || content.includes('hackescher markt') || content.includes('€65')) {
    return [
      "When should I book this?",
      "What else is in that area?",
      "Any evening tours?",
      "Where should I stay nearby?"
    ];
  }
  
  // Event-focused responses
  if (content.includes('vegan market') || content.includes('boxhagener platz') || content.includes('first saturday')) {
    return [
      "What time should I arrive?",
      "Any restaurants near the market?",
      "Where should I stay in that area?",
      "Other events this weekend?"
    ];
  }
  
  // Multi-category or comprehensive responses
  if (content.includes('safety score') && (content.includes('restaurant') && content.includes('accommodation'))) {
    return [
      "Plan my 3-day itinerary",
      "What about tours and events?",
      "Book everything for next month",
      "Any hidden gems?"
    ];
  }
  
  // Logistics/booking focused
  if (content.includes('booking') || content.includes('reservation') || content.includes('advance notice')) {
    return [
      "Help me create an itinerary",
      "What order should I book things?",
      "Any group discounts?",
      "What else should I know?"
    ];
  }
  
  // Dietary restrictions mentioned
  if (conversationHistory.includes('gluten') || conversationHistory.includes('allerg') || conversationHistory.includes('celiac')) {
    return [
      "More allergy-friendly options?",
      "What about cross-contamination?",
      "Safe accommodations too?",
      "Any specialized tours?"
    ];
  }
  
  // Non-Berlin cities (fallback for demo)
  if (content.includes('paris') || content.includes('amsterdam') || content.includes('barcelona')) {
    return [
      "Tell me about Berlin instead",
      "Berlin has amazing options",
      "What about Berlin for now?",
      "Berlin for my demo?"
    ];
  }
  
  // Default suggestions for other contexts
  return [
    "Tell me more about this",
    "What else do you recommend?", 
    "Any budget-friendly options?",
    "Plan my complete itinerary"
  ];
}

// Test scenarios
const testScenarios = [
  {
    name: "Welcome Message",
    lastMessage: { content: "Hi! I'm your AI vegan travel assistant. Which city are you planning to visit? 🌍" },
    allMessages: [],
    expectedSuggestions: ["I'm planning a 3-day trip", "What are your top recommendations?", "I need accommodations too", "When's the best time to visit?"]
  },
  {
    name: "Berlin City Response",
    lastMessage: { content: "Berlin! Excellent choice for vegan travelers 🌱 When are you planning to visit?" },
    allMessages: [
      { content: "Berlin" },
      { content: "Berlin! Excellent choice for vegan travelers 🌱 When are you planning to visit?" }
    ],
    expectedSuggestions: ["I'm going next month", "Planning a weekend trip", "I need restaurants and hotels", "What about food tours?"]
  },
  {
    name: "Restaurant Recommendations",
    lastMessage: { content: "I recommend Kopps (98/100 safety score) for exceptional fine dining. It's €€€ range but worth it for the experience." },
    allMessages: [
      { content: "Show me restaurants" },
      { content: "I recommend Kopps (98/100 safety score) for exceptional fine dining. It's €€€ range but worth it for the experience." }
    ],
    expectedSuggestions: ["What about accommodations?", "Any nearby hotels?", "Show me food tours", "I'm also gluten-free"]
  },
  {
    name: "Accommodation Info",
    lastMessage: { content: "A&O Berlin Mitte (78/100) is a modern hostel with vegan breakfast options and check-in from 3:00 PM." },
    allMessages: [
      { content: "What accommodation would you recommend?" },
      { content: "A&O Berlin Mitte (78/100) is a modern hostel with vegan breakfast options and check-in from 3:00 PM." }
    ],
    expectedSuggestions: ["What restaurants are nearby?", "Any walking tours?", "Show me local events", "What's the nightlife like?"]
  },
  {
    name: "Tour Details",
    lastMessage: { content: "Berlin Vegan Food Tour runs Saturdays 2-6pm, meeting at Hackescher Markt. €65 per person, book 2-3 days ahead." },
    allMessages: [
      { content: "Any tours available?" },
      { content: "Berlin Vegan Food Tour runs Saturdays 2-6pm, meeting at Hackescher Markt. €65 per person, book 2-3 days ahead." }
    ],
    expectedSuggestions: ["When should I book this?", "What else is in that area?", "Any evening tours?", "Where should I stay nearby?"]
  },
  {
    name: "Event Information",
    lastMessage: { content: "The Green Market Berlin is a regular vegan market at Boxhagener Platz, 10am-6pm. Free entry!" },
    allMessages: [
      { content: "Any events this weekend?" },
      { content: "The Green Market Berlin is a regular vegan market at Boxhagener Platz, 10am-6pm. Free entry!" }
    ],
    expectedSuggestions: ["What time should I arrive?", "Any restaurants near the market?", "Where should I stay in that area?", "Other events this weekend?"]
  },
  {
    name: "Dietary Restrictions Context",
    lastMessage: { content: "Both options accommodate gluten-free needs with dedicated preparation areas." },
    allMessages: [
      { content: "I'm celiac and vegan, need safe options" },
      { content: "Both options accommodate gluten-free needs with dedicated preparation areas." }
    ],
    expectedSuggestions: ["More allergy-friendly options?", "What about cross-contamination?", "Safe accommodations too?", "Any specialized tours?"]
  },
  {
    name: "Booking Logistics",
    lastMessage: { content: "For general booking questions, you can book accommodations and tours separately with 24-48h advance notice." },
    allMessages: [
      { content: "How should I plan my bookings?" },
      { content: "For general booking questions, you can book accommodations and tours separately with 24-48h advance notice." }
    ],
    expectedSuggestions: ["Help me create an itinerary", "What order should I book things?", "Any group discounts?", "What else should I know?"]
  },
  {
    name: "Non-Berlin City",
    lastMessage: { content: "I'd love to help with Paris, but for this demo I have detailed data for Berlin. Let me show you Berlin's amazing vegan scene!" },
    allMessages: [
      { content: "Paris" },
      { content: "I'd love to help with Paris, but for this demo I have detailed data for Berlin. Let me show you Berlin's amazing vegan scene!" }
    ],
    expectedSuggestions: ["Tell me about Berlin instead", "Berlin has amazing options", "What about Berlin for now?", "Berlin for my demo?"]
  },
  {
    name: "Default Fallback",
    lastMessage: { content: "That's an interesting question about local transportation options in the area." },
    allMessages: [
      { content: "How's public transport?" },
      { content: "That's an interesting question about local transportation options in the area." }
    ],
    expectedSuggestions: ["Tell me more about this", "What else do you recommend?", "Any budget-friendly options?", "Plan my complete itinerary"]
  }
];

// Run tests
function runQuickActionTests() {
  let passed = 0;
  let total = testScenarios.length;

  testScenarios.forEach((scenario, index) => {
    console.log(`\n=== Test ${index + 1}: ${scenario.name} ===`);
    
    try {
      const actualSuggestions = getContextualSuggestions(scenario.lastMessage, scenario.allMessages);
      
      // Check if we got the expected suggestions
      const actualSet = new Set(actualSuggestions);
      
      let matches = 0;
      scenario.expectedSuggestions.forEach(expected => {
        if (actualSet.has(expected)) {
          matches++;
          console.log(`✓ Found expected: "${expected}"`);
        } else {
          console.log(`⚠️ Missing expected: "${expected}"`);
        }
      });
      
      // Show what we actually got
      console.log(`Actual suggestions: [${actualSuggestions.map(s => `"${s}"`).join(', ')}]`);
      
      // Test passes if we got the exact expected suggestions
      if (actualSuggestions.length === scenario.expectedSuggestions.length && matches === scenario.expectedSuggestions.length) {
        console.log(`🎉 Test PASSED (${matches}/${scenario.expectedSuggestions.length} suggestions matched exactly)`);
        passed++;
      } else {
        console.log(`❌ Test FAILED (${matches}/${scenario.expectedSuggestions.length} expected suggestions found)`);
      }
      
    } catch (error) {
      console.log(`❌ Test failed with error: ${error.message}`);
    }
  });

  // Summary
  console.log(`\n📊 Quick Actions Test Results: ${passed}/${total} passed`);
  
  if (passed === total) {
    console.log("🎉 All quick action tests passed! Dynamic suggestions are working correctly.");
    return true;
  } else {
    console.log("❌ Some quick action tests failed. Check the logic above for details.");
    return false;
  }
}

// Check if running in Node.js environment
if (typeof window === 'undefined') {
  console.log("⚠️  Note: This tests the quick actions logic in isolation.");
  console.log("   For full UI testing, use the browser and manually verify suggestions appear correctly.\\n");
  
  // Run tests
  runQuickActionTests();
}