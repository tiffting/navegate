// Test script to verify smart interview responses are persisted and used by AI

const testUserPreferences = {
    budgetRange: "€€",
    minSafetyScore: 80,
    dietaryRestrictions: ["gluten-free"],
    maxDistance: 2000,
    openNow: false,
    eatingPreferences: {
        includeBreakfast: true,
        includeSnacks: false,
        style: "foodie",
        preferredMealTimes: undefined
    },
    mobilityPreferences: {
        transportModes: ["walking", "public_transit"],
        wheelchairAccessible: false,
        maxWalkingDistance: 15,
        preferredPace: "moderate"
    },
    tripPreferences: {
        planningStyle: "structured",
        groupSize: 2,
        travelDates: "March 15-18, 2024"
    }
};

async function testInterviewPersistence() {
    console.log('🧪 Testing Smart Interview Persistence\n');
    
    try {
        // Test the chat API with user preferences
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Berlin',
                chatHistory: [],
                userPreferences: testUserPreferences
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ API Response received\n');
        
        // Check if the AI response references the user's preferences
        const aiResponse = data.response.toLowerCase();
        
        const checks = {
            'Budget (€€)': aiResponse.includes('€€') || aiResponse.includes('budget'),
            'Foodie style': aiResponse.includes('foodie') || aiResponse.includes('culinary'),
            'Structured planning': aiResponse.includes('structured') || aiResponse.includes('plan'),
            'Travel dates': aiResponse.includes('march') || aiResponse.includes('15'),
            'Transport modes': aiResponse.includes('walking') || aiResponse.includes('public'),
            'Gluten-free': aiResponse.includes('gluten'),
            'Breakfast': aiResponse.includes('breakfast'),
            'Not re-asking basic info': !aiResponse.includes('what are your travel dates') && 
                                      !aiResponse.includes('what\'s your budget') &&
                                      !aiResponse.includes('tell me about your eating style')
        };
        
        console.log('🔍 Preference Integration Analysis:');
        Object.entries(checks).forEach(([check, passed]) => {
            console.log(`${passed ? '✅' : '❌'} ${check}`);
        });
        
        const passedChecks = Object.values(checks).filter(Boolean).length;
        const totalChecks = Object.keys(checks).length;
        
        console.log(`\n📊 Score: ${passedChecks}/${totalChecks} checks passed`);
        
        if (passedChecks >= totalChecks * 0.6) {
            console.log('✅ SUCCESS: AI appears to be using interview preferences!');
        } else {
            console.log('❌ ISSUE: AI may not be properly using interview preferences');
        }
        
        console.log('\n📝 Full AI Response:');
        console.log('---');
        console.log(data.response);
        console.log('---');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\n💡 Make sure the development server is running (npm run dev)');
    }
}

// Run the test if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    testInterviewPersistence();
}

export { testInterviewPersistence };