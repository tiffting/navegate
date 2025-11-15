import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const testConversations = [
  {
    name: "Trip Planning",
    message: "Plan my 3-day vegan trip to Berlin",
    expectedElements: ["accommodation", "restaurant", "safety score", "Kopps", "Vegan Hostel"]
  },
  {
    name: "Restaurant Query", 
    message: "What are the best vegan restaurants with high safety scores?",
    expectedElements: ["Kopps", "safety score", "cross-contamination", "98"]
  },
  {
    name: "Accommodation Query",
    message: "I need vegan accommodation with good breakfast options",
    expectedElements: ["Vegan Hostel", "breakfast", "96", "kitchen"]
  },
  {
    name: "Activity Planning",
    message: "What vegan tours and events are available?",
    expectedElements: ["Berlin Vegan Food Tour", "Berlin Vegan Market", "tour", "event"]
  },
  {
    name: "Multi-Category",
    message: "I'm celiac and vegan, need safe options for dining and accommodation",
    expectedElements: ["gluten", "cross-contamination", "kitchen", "safety"]
  }
];

async function testChatbot() {
  console.log("🤖 Testing VeganBnB Chatbot\n");

  const baseUrl = 'http://localhost:3000';
  let passedTests = 0;
  let totalTests = testConversations.length;

  for (const [index, test] of testConversations.entries()) {
    console.log(`\n=== Test ${index + 1}: ${test.name} ===`);
    
    try {
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: test.message,
          chatHistory: []
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(`❌ HTTP ${response.status}: ${error.error}`);
        continue;
      }

      const chatResponse = await response.json();
      
      // Validate response structure
      if (!chatResponse.response || typeof chatResponse.response !== 'string') {
        console.log("❌ Invalid response structure");
        continue;
      }

      console.log(`✓ Received response (${chatResponse.response.length} chars)`);

      // Check for expected elements in response
      const responseText = chatResponse.response.toLowerCase();
      let foundElements = 0;
      
      for (const element of test.expectedElements) {
        if (responseText.includes(element.toLowerCase())) {
          foundElements++;
          console.log(`✓ Found expected element: "${element}"`);
        } else {
          console.log(`⚠️ Missing expected element: "${element}"`);
        }
      }

      // Test passes if it finds most expected elements
      const successThreshold = Math.ceil(test.expectedElements.length * 0.6); // 60%
      if (foundElements >= successThreshold) {
        console.log(`🎉 Test PASSED (${foundElements}/${test.expectedElements.length} elements found)`);
        passedTests++;
      } else {
        console.log(`❌ Test FAILED (${foundElements}/${test.expectedElements.length} elements found, needed ${successThreshold})`);
      }

      // Check metadata
      if (chatResponse.metadata) {
        console.log(`✓ Metadata included: categories=${chatResponse.metadata.categories?.join(',') || 'none'}, listings=${chatResponse.metadata.listingReferences?.length || 0}`);
      }

      // Show snippet of response
      const snippet = chatResponse.response.substring(0, 150);
      console.log(`Response snippet: "${snippet}${snippet.length < chatResponse.response.length ? '...' : ''}"`);

    } catch (error) {
      console.log(`❌ Test failed with error: ${error.message}`);
    }
  }

  // Test error scenarios
  console.log("\n=== Testing Error Scenarios ===");
  
  // Test empty message
  totalTests++;
  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: "",
        chatHistory: []
      }),
    });
    
    if (response.status === 400) {
      console.log("✓ Empty message properly rejected");
      passedTests++;
    } else {
      console.log(`❌ Empty message should return 400, got ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Error test failed: ${error.message}`);
  }

  // Summary
  console.log(`\n📊 Test Results: ${passedTests}/${totalTests} passed`);
  
  if (passedTests === totalTests) {
    console.log("🎉 All chatbot tests passed! The AI assistant is working correctly.");
    return true;
  } else {
    console.log("❌ Some tests failed. Check responses above for details.");
    return false;
  }
}

// Test conversation flow
async function testConversationFlow() {
  console.log("\n🗣️ Testing Conversation Flow\n");
  
  const baseUrl = 'http://localhost:3000';
  let chatHistory = [];
  
  const conversationSteps = [
    "Hi, I'm planning a vegan trip to Berlin",
    "What accommodation would you recommend?", 
    "Tell me more about the safety score for Vegan Hostel Berlin",
    "What restaurants are nearby?"
  ];
  
  try {
    for (const [index, message] of conversationSteps.entries()) {
      console.log(`Step ${index + 1}: ${message}`);
      
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          chatHistory: chatHistory.slice(-3) // Keep last 3 messages for context
        }),
      });
      
      if (response.ok) {
        const chatResponse = await response.json();
        console.log(`✓ Response: ${chatResponse.response.substring(0, 100)}...`);
        
        // Add to conversation history
        chatHistory.push(
          { role: 'user', content: message },
          { role: 'assistant', content: chatResponse.response }
        );
      } else {
        console.log(`❌ Step ${index + 1} failed`);
      }
      
      // Small delay between messages
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log("🎉 Conversation flow test completed!");
    
  } catch (error) {
    console.log(`❌ Conversation flow test failed: ${error.message}`);
  }
}

// Check if running in Node.js environment
if (typeof window === 'undefined') {
  console.log("⚠️  Note: This test requires the Next.js dev server to be running.");
  console.log("   Start it with: npm run dev");
  console.log("   Then run: node tests/test-chatbot.js\n");
  
  // Run tests
  testChatbot()
    .then(() => testConversationFlow())
    .catch(error => {
      if (error.code === 'ECONNREFUSED') {
        console.log("❌ Could not connect to http://localhost:3000");
        console.log("   Make sure to run 'npm run dev' first!");
      } else {
        console.log("❌ Unexpected error:", error.message);
      }
    });
}