// Mock data for demo purposes - realistic-looking data for each category

export const mockListings = [
  // RESTAURANTS
  {
    id: "rest-001",
    category: "restaurant",
    name: "Kopps",
    description: "Berlin's premier fine-dining vegan restaurant with innovative plant-based cuisine",
    location: {
      address: "Linienstraße 94, 10115 Berlin, Germany",
      city: "Berlin",
      country: "Germany",
      coordinates: { lat: 52.5286, lng: 13.4106 }
    },
    website: "https://kopps-berlin.de",
    reviews: [
      "Absolutely incredible! 100% vegan restaurant with zero cross-contamination risk. The staff are extremely knowledgeable about every ingredient.",
      "Outstanding fine dining experience. Chef personally explained preparation methods and ingredient sourcing. Completely safe for strict vegans.",
      "Perfect transparency - they can tell you exactly what's in every dish. Separate kitchen ensures no animal products ever touch the food."
    ],
    safetyScore: {
      score: 98,
      category: "restaurant",
      reasoning: "Exceptional vegan safety with dedicated kitchen, highly trained staff, and complete ingredient transparency",
      signals: {
        cross_contamination: 100,
        staff_knowledge: 95,
        ingredient_transparency: 98,
        community_trust: 97
      },
      citations: [
        "100% vegan restaurant with zero cross-contamination risk",
        "Chef personally explained preparation methods and ingredient sourcing",
        "they can tell you exactly what's in every dish"
      ],
      analyzedAt: new Date('2025-11-15').toISOString()
    },
    createdAt: new Date('2025-11-10'),
    updatedAt: new Date('2025-11-15')
  },

  {
    id: "rest-002", 
    category: "restaurant",
    name: "Zur Letzten Instanz",
    description: "Historic Berlin restaurant with some vegan options",
    location: {
      address: "Waisenstraße 14-16, 10179 Berlin, Germany", 
      city: "Berlin",
      country: "Germany",
      coordinates: { lat: 52.5156, lng: 13.4111 }
    },
    website: "https://zurletzteninstanz.de",
    reviews: [
      "Traditional German restaurant that tries to accommodate vegans but limited options and staff knowledge varies.",
      "Had to ask many questions about ingredients. Some dishes may have hidden dairy or eggs - be careful.",
      "Nice historic atmosphere but not ideal for strict vegans. Cross-contamination is a real concern in their kitchen."
    ],
    safetyScore: {
      score: 42,
      category: "restaurant", 
      reasoning: "Limited vegan expertise with potential cross-contamination risks and inconsistent staff knowledge",
      signals: {
        cross_contamination: 30,
        staff_knowledge: 45,
        ingredient_transparency: 40,
        community_trust: 35
      },
      citations: [
        "staff knowledge varies",
        "may have hidden dairy or eggs - be careful", 
        "Cross-contamination is a real concern in their kitchen"
      ],
      analyzedAt: new Date('2025-11-14').toISOString()
    },
    createdAt: new Date('2025-11-10'),
    updatedAt: new Date('2025-11-15')
  },

  // ACCOMMODATIONS
  {
    id: "accom-001",
    category: "accommodation", 
    name: "Vegan Hostel Berlin",
    description: "Berlin's first completely vegan hostel with organic cotton bedding and plant-based breakfast",
    location: {
      address: "Warschauer Str. 58, 10243 Berlin, Germany",
      city: "Berlin", 
      country: "Germany",
      coordinates: { lat: 52.5067, lng: 13.4532 }
    },
    website: "https://veganhostel.berlin",
    reviews: [
      "Incredible vegan hostel! Dedicated plant-based kitchen with separate utensils. Organic cotton bedding throughout.",
      "Amazing vegan breakfast with 15+ options daily. Host is incredibly knowledgeable about plant-based nutrition and local vegan scene.", 
      "Perfect for vegan travelers - no risk of animal products anywhere. Kitchen is spotless with clear vegan-only policy."
    ],
    safetyScore: {
      score: 96,
      category: "accommodation",
      reasoning: "Outstanding vegan accommodation with dedicated facilities, knowledgeable hosts, and comprehensive plant-based amenities",
      signals: {
        kitchen_safety: 100,
        bedding: 95,
        breakfast_quality: 98,
        host_knowledge: 92
      },
      citations: [
        "Dedicated plant-based kitchen with separate utensils",
        "Amazing vegan breakfast with 15+ options daily",
        "no risk of animal products anywhere"
      ],
      analyzedAt: new Date('2025-11-14').toISOString() 
    },
    createdAt: new Date('2025-11-08'),
    updatedAt: new Date('2025-11-15')
  },

  {
    id: "accom-002",
    category: "accommodation",
    name: "Hotel Adlon Kempinski Berlin", 
    description: "Luxury hotel near Brandenburg Gate with some vegan breakfast options",
    location: {
      address: "Unter den Linden 77, 10117 Berlin, Germany",
      city: "Berlin",
      country: "Germany", 
      coordinates: { lat: 52.5160, lng: 13.3777 }
    },
    website: "https://www.kempinski.com/adlon",
    reviews: [
      "Luxury hotel but shared kitchen facilities. Some vegan breakfast options but very limited selection.",
      "Bedding materials unclear - couldn't get definitive answer about animal-derived materials. Staff not well-trained on vegan needs.",
      "Beautiful hotel but not vegan-focused. Breakfast had 2-3 vegan items only. Had to bring my own plant milk."
    ],
    safetyScore: {
      score: 48,
      category: "accommodation",
      reasoning: "Limited vegan facilities and knowledge despite luxury setting, with unclear bedding materials and minimal breakfast options",
      signals: {
        kitchen_safety: 35,
        bedding: 40, 
        breakfast_quality: 45,
        host_knowledge: 25
      },
      citations: [
        "shared kitchen facilities", 
        "couldn't get definitive answer about animal-derived materials",
        "Breakfast had 2-3 vegan items only"
      ],
      analyzedAt: new Date('2025-11-13').toISOString()
    },
    createdAt: new Date('2025-11-09'),
    updatedAt: new Date('2025-11-15')
  },

  // TOURS
  {
    id: "tour-001", 
    category: "tour",
    name: "Berlin Vegan Food Tour",
    description: "Guided tour of Berlin's best vegan restaurants and markets with tastings",
    location: {
      address: "Meeting point: Hackescher Markt, Berlin, Germany",
      city: "Berlin",
      country: "Germany",
      coordinates: { lat: 52.5225, lng: 13.4015 }
    },
    website: "https://berlinvegantours.com",
    reviews: [
      "Outstanding tour! Guide was vegan herself and incredibly knowledgeable about plant-based nutrition and local scene.",
      "Perfect meal handling - all food was clearly labeled and prepared safely. No risk of cross-contamination at any stop.", 
      "Amazing group dynamic - everyone was supportive of different dietary needs. Guide accommodated gluten-free and nut allergies seamlessly."
    ],
    safetyScore: {
      score: 94,
      category: "tour",
      reasoning: "Excellent vegan tour with expert guide, safe food handling, and inclusive group environment",
      signals: {
        guide_expertise: 96,
        meal_handling: 95,
        hidden_exploitation: 90,
        group_dynamics: 95
      },
      citations: [
        "Guide was vegan herself and incredibly knowledgeable",
        "all food was clearly labeled and prepared safely", 
        "Guide accommodated gluten-free and nut allergies seamlessly"
      ],
      analyzedAt: new Date('2025-11-12').toISOString()
    },
    createdAt: new Date('2025-11-07'),
    updatedAt: new Date('2025-11-15')
  },

  // EVENTS  
  {
    id: "event-001",
    category: "event", 
    name: "Berlin Vegan Market",
    description: "Monthly vegan market with 40+ vendors selling plant-based food, products and crafts",
    location: {
      address: "Boxhagener Platz, 10245 Berlin, Germany",
      city: "Berlin",
      country: "Germany",
      coordinates: { lat: 52.5136, lng: 13.4530 }
    },
    website: "https://berlinveganmarket.de", 
    reviews: [
      "Incredible variety - 40+ vegan vendors with amazing food quality. Clearly labeled allergens and wheelchair accessible.",
      "Such a welcoming community atmosphere! Vendors were knowledgeable about ingredients and very accommodating to dietary restrictions.",
      "Perfect accessibility features and diverse, inclusive crowd. Food quality was restaurant-level across all stalls."
    ],
    safetyScore: {
      score: 91,
      category: "event",
      reasoning: "Excellent vegan event with high-quality food, strong community atmosphere, and good accessibility features", 
      signals: {
        food_quality: 95,
        accessibility: 88,
        community_vibe: 92,
        inclusivity: 89
      },
      citations: [
        "40+ vegan vendors with amazing food quality",
        "very accommodating to dietary restrictions",
        "Perfect accessibility features and diverse, inclusive crowd"
      ],
      analyzedAt: new Date('2025-11-11').toISOString()
    },
    createdAt: new Date('2025-11-06'),
    updatedAt: new Date('2025-11-15')
  }
];

// Helper function to get listings by category
export function getListingsByCategory(category) {
  return mockListings.filter(listing => listing.category === category);
}

// Helper function to get high-scoring listings (for recommendations)
export function getHighScoringListings(minScore = 80) {
  return mockListings.filter(listing => listing.safetyScore?.score >= minScore);
}

// Helper function to get listing by ID
export function getListingById(id) {
  return mockListings.find(listing => listing.id === id);
}

// Sample user preferences for testing
export const mockUserPreferences = {
  dietaryRestrictions: ['gluten-free'],
  preferredCategories: ['restaurant', 'accommodation'], 
  homeLocation: 'Berlin, Germany',
  travelStyle: 'mid-range'
};

// Sample chat conversation for testing
export const mockChatHistory = [
  {
    id: 'msg-001',
    role: 'user',
    content: 'Plan my 3-day vegan trip to Berlin',
    timestamp: new Date('2025-11-15T10:00:00Z'),
  },
  {
    id: 'msg-002', 
    role: 'assistant',
    content: 'I\'d be happy to help plan your 3-day vegan trip to Berlin! Based on our listings, I recommend:\n\n**Accommodation**: Vegan Hostel Berlin (Safety Score: 96/100) - dedicated plant-based facilities\n\n**Restaurants**: \n- Kopps (98/100) - fine dining with exceptional safety\n- Try the Berlin Vegan Food Tour (94/100) for a guided experience\n\n**Activities**: Berlin Vegan Market (91/100) - great community atmosphere\n\nWould you like more details about any of these recommendations?',
    timestamp: new Date('2025-11-15T10:01:00Z'),
    metadata: {
      listingReferences: ['accom-001', 'rest-001', 'tour-001', 'event-001'],
      category: 'multiple'
    }
  }
];