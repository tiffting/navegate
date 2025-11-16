// Mock data for demo purposes - realistic-looking data for each category

export const mockListings = [
    // RESTAURANTS
    {
        id: "rest-001",
        category: "restaurant",
        name: "Kopps",
        description: "Upscale vegan fine dining restaurant in Berlin Mitte offering 3-7 course tasting menus",
        location: {
            address: "Linienstraße 94, 10115 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5286, lng: 13.4106 },
        },
        website: "https://kopps-berlin.de/en/",
        logistics: {
            hours: {
                monday: "Closed",
                tuesday: "Closed",
                wednesday: "5:30 PM - Late",
                thursday: "5:30 PM - Late",
                friday: "5:30 PM - Late",
                saturday: "5:30 PM - Late",
                sunday: "Closed",
            },
            booking: {
                required: true,
                methods: [
                    { type: "online", url: "https://kopps-berlin.de/en/", note: "English available - reservations via contact form" },
                    { type: "phone", contact: "+49 30 43 20 97 75", note: "English spoken" },
                ],
                advance_notice: "2-3 days recommended for dinner",
            },
            pricing: {
                range: "€€€",
                average_meal: "€45-65",
                note: "Fine dining, 4-course menu available",
            },
            accessibility: {
                wheelchair: true,
                dietary_accommodations: ["gluten-free menu available", "nut allergies accommodated"],
            },
        },
        reviews: [
            "Absolutely incredible! 100% vegan restaurant with zero cross-contamination risk. The staff are extremely knowledgeable about every ingredient.",
            "Outstanding fine dining experience. Chef personally explained preparation methods and ingredient sourcing. Completely safe for strict vegans.",
            "Perfect transparency - they can tell you exactly what's in every dish. Separate kitchen ensures no animal products ever touch the food.",
        ],
        safetyScore: {
            score: 98,
            category: "restaurant",
            reasoning: "Exceptional vegan safety with dedicated kitchen, highly trained staff, and complete ingredient transparency",
            signals: {
                cross_contamination: 100,
                staff_knowledge: 95,
                ingredient_transparency: 98,
                community_trust: 97,
            },
            citations: [
                "100% vegan restaurant with zero cross-contamination risk",
                "Chef personally explained preparation methods and ingredient sourcing",
                "they can tell you exactly what's in every dish",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2025-11-10"),
        updatedAt: new Date("2025-11-15"),
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
            coordinates: { lat: 52.5156, lng: 13.4111 },
        },
        website: "https://zurletzteninstanz.de/",
        logistics: {
            hours: {
                monday: "12:00 PM - 11:00 PM",
                tuesday: "12:00 PM - 11:00 PM",
                wednesday: "12:00 PM - 11:00 PM",
                thursday: "12:00 PM - 11:00 PM",
                friday: "12:00 PM - 12:00 AM",
                saturday: "12:00 PM - 12:00 AM",
                sunday: "12:00 PM - 11:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Vegan options limited, call ahead recommended" },
                    { type: "phone", contact: "+49 30 242 5528", note: "German only, limited English" },
                ],
                advance_notice: "Same day usually fine",
            },
            pricing: {
                range: "€€",
                average_meal: "€15-25",
                note: "Traditional German, few vegan options",
            },
            accessibility: {
                wheelchair: false,
                dietary_accommodations: ["limited vegan knowledge"],
            },
        },
        reviews: [
            "Traditional German restaurant that tries to accommodate vegans but limited options and staff knowledge varies.",
            "Had to ask many questions about ingredients. Some dishes may have hidden dairy or eggs - be careful.",
            "Nice historic atmosphere but not ideal for strict vegans. Cross-contamination is a real concern in their kitchen.",
        ],
        safetyScore: {
            score: 42,
            category: "restaurant",
            reasoning: "Limited vegan expertise with potential cross-contamination risks and inconsistent staff knowledge",
            signals: {
                cross_contamination: 30,
                staff_knowledge: 45,
                ingredient_transparency: 40,
                community_trust: 35,
            },
            citations: ["staff knowledge varies", "may have hidden dairy or eggs - be careful", "Cross-contamination is a real concern in their kitchen"],
            analyzedAt: new Date("2025-11-14").toISOString(),
        },
        createdAt: new Date("2025-11-10"),
        updatedAt: new Date("2025-11-15"),
    },

    // ACCOMMODATIONS
    {
        id: "accom-001",
        category: "accommodation",
        name: "A&O Berlin Mitte",
        description: "Modern hostel in Berlin Mitte with vegan breakfast options and vegan-friendly amenities",
        location: {
            address: "Warschauer Str. 58, 10243 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5067, lng: 13.4532 },
        },
        website: "https://www.aohostels.com/en/berlin/berlin-mitte/",
        logistics: {
            check_in: {
                time: "3:00 PM - 10:00 PM",
                late_arrival: "24/7 with advance notice via email",
                methods: ["online check-in available", "contactless entry code"],
            },
            check_out: "11:00 AM",
            breakfast: {
                time: "7:00 AM - 10:00 AM",
                price: "€12 buffet",
                note: "Vegan options available upon request",
            },
            booking: {
                methods: [
                    { type: "online", url: "https://www.aohostels.com/en/berlin/berlin-mitte/", note: "Direct booking available" },
                    { type: "platform", url: "https://www.booking.com/hotel/de/a-o-berlin-mitte.html", note: "Book via Booking.com" },
                ],
                cancellation: "Free cancellation up to 24h before arrival",
            },
            pricing: {
                range: "€€",
                dorm_bed: "€25-35/night",
                private_room: "€65-85/night",
                note: "Vegan breakfast +€8",
            },
            facilities: {
                kitchen_hours: "24/7 access",
                common_areas: "Until 11:00 PM (quiet time)",
                wifi: "Free high-speed throughout",
            },
        },
        reviews: [
            "Good modern hostel in central location. They accommodate vegan breakfast requests well when asked in advance.",
            "Clean facilities and helpful staff who understand dietary requirements. Kitchen available for self-catering with vegan options nearby.",
            "Convenient location for exploring Berlin's vegan scene. Staff are accommodating about vegan needs when communicated clearly.",
        ],
        safetyScore: {
            score: 78,
            category: "accommodation",
            reasoning: "Vegan-friendly accommodation with good staff understanding of dietary needs and convenient location for plant-based dining",
            signals: {
                kitchen_safety: 75,
                bedding: 80,
                breakfast_quality: 70,
                host_knowledge: 85,
            },
            citations: [
                "They accommodate vegan breakfast requests well when asked in advance",
                "helpful staff who understand dietary requirements",
                "Staff are accommodating about vegan needs when communicated clearly",
            ],
            analyzedAt: new Date("2025-11-14").toISOString(),
        },
        createdAt: new Date("2025-11-08"),
        updatedAt: new Date("2025-11-15"),
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
            coordinates: { lat: 52.516, lng: 13.3777 },
        },
        website: "https://www.kempinski.com/adlon",
        logistics: {
            check_in: {
                time: "3:00 PM",
                late_arrival: "24/7 front desk",
                methods: ["traditional front desk only"],
            },
            check_out: "12:00 PM",
            breakfast: {
                time: "6:30 AM - 10:30 AM",
                price: "€49 (buffet)",
                note: "Limited vegan options, advance request recommended",
            },
            booking: {
                methods: [
                    { type: "online", url: "https://www.kempinski.com/adlon", note: "English available" },
                    { type: "booking_platforms", platforms: ["Booking.com", "Expedia"] },
                ],
                cancellation: "Varies by rate, typically 24h-48h notice",
            },
            pricing: {
                range: "€€€€",
                standard_room: "€400-600/night",
                note: "Luxury hotel, limited vegan amenities",
            },
            facilities: {
                concierge: "24/7, can assist with vegan restaurant bookings",
                room_service: "Limited vegan options",
            },
        },
        reviews: [
            "Luxury hotel but shared kitchen facilities. Some vegan breakfast options but very limited selection.",
            "Bedding materials unclear - couldn't get definitive answer about animal-derived materials. Staff not well-trained on vegan needs.",
            "Beautiful hotel but not vegan-focused. Breakfast had 2-3 vegan items only. Had to bring my own plant milk.",
        ],
        safetyScore: {
            score: 48,
            category: "accommodation",
            reasoning: "Limited vegan facilities and knowledge despite luxury setting, with unclear bedding materials and minimal breakfast options",
            signals: {
                kitchen_safety: 35,
                bedding: 40,
                breakfast_quality: 45,
                host_knowledge: 25,
            },
            citations: ["shared kitchen facilities", "couldn't get definitive answer about animal-derived materials", "Breakfast had 2-3 vegan items only"],
            analyzedAt: new Date("2025-11-13").toISOString(),
        },
        createdAt: new Date("2025-11-09"),
        updatedAt: new Date("2025-11-15"),
    },

    {
        id: "accom-003",
        category: "accommodation",
        name: "Michelberger Hotel",
        description: "Boutique design hotel in Friedrichshain with vegan breakfast options and plant-based restaurant menu",
        location: {
            address: "Warschauer Str. 39, 10243 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5067, lng: 13.4532 },
        },
        website: "https://michelbergerhotel.com/en/",
        logistics: {
            check_in: {
                time: "3:00 PM",
                late_arrival: "24/7 front desk",
                methods: ["front desk", "online check-in available"],
            },
            check_out: "12:00 PM",
            breakfast: {
                time: "7:00 AM - 11:00 AM",
                price: "€18 buffet",
                note: "Vegan options clearly labeled on breakfast buffet",
            },
            booking: {
                methods: [
                    { type: "online", url: "https://michelbergerhotel.com/en/", note: "Direct booking with instant confirmation" },
                    { type: "platform", url: "https://www.booking.com/hotel/de/michelberger.html", note: "Book via Booking.com" },
                ],
                cancellation: "Free cancellation up to 24h before arrival",
            },
            pricing: {
                range: "€€€",
                standard_room: "€120-180/night",
                note: "Design hotel with restaurant on-site",
            },
            facilities: {
                restaurant: "On-site restaurant with vegan dishes",
                common_areas: "24/7 lobby, bar until late",
                wifi: "Free high-speed throughout",
            },
        },
        reviews: [
            "Great design hotel with clearly labeled vegan options at breakfast. The on-site restaurant has several delicious plant-based dishes.",
            "Hip boutique hotel with good vegan breakfast selection. Staff are knowledgeable about dietary restrictions and very accommodating.",
            "Excellent location in Friedrichshain near many vegan restaurants. The hotel's restaurant menu includes creative vegan options.",
        ],
        safetyScore: {
            score: 84,
            category: "accommodation",
            reasoning: "Strong vegan-friendly hotel with clearly labeled breakfast options, knowledgeable staff, and plant-based restaurant dishes",
            signals: {
                kitchen_safety: 80,
                bedding: 85,
                breakfast_quality: 88,
                host_knowledge: 85,
            },
            citations: [
                "clearly labeled vegan options at breakfast",
                "Staff are knowledgeable about dietary restrictions and very accommodating",
                "The hotel's restaurant menu includes creative vegan options",
            ],
            analyzedAt: new Date("2025-11-13").toISOString(),
        },
        createdAt: new Date("2025-11-08"),
        updatedAt: new Date("2025-11-15"),
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
            coordinates: { lat: 52.5225, lng: 13.4015 },
        },
        website: "https://www.getyourguide.com/berlin-l17/berlin-vegan-food-tour-t408673/",
        logistics: {
            schedule: {
                days: "Saturdays only",
                time: "2:00 PM - 6:00 PM",
                duration: "4 hours",
                meeting_point: "Hackescher Markt U-Bahn exit (detailed directions sent after booking)",
            },
            booking: {
                required: true,
                methods: [
                    { type: "online", url: "https://www.getyourguide.com/berlin-l17/berlin-vegan-food-tour-t408673/", note: "Book through GetYourGuide" },
                    { type: "alternative", url: "https://www.viator.com/tours/Berlin/", note: "Search for vegan food tours" },
                ],
                advance_notice: "Book 2-3 days ahead (limited to 12 people)",
                cancellation: "Free cancellation 24h before tour",
            },
            pricing: {
                adult: "€65",
                student: "€55 (with valid ID)",
                includes: "All food tastings, water, tour guide",
                note: "Payment via card/PayPal, no cash needed",
            },
            accessibility: {
                walking_distance: "Moderate (3km total with stops)",
                dietary_accommodations: ["gluten-free", "nut allergies", "soy-free upon request"],
            },
            what_to_bring: ["Comfortable walking shoes", "Weather-appropriate clothing", "Appetite!"],
        },
        reviews: [
            "Outstanding tour! Guide was vegan herself and incredibly knowledgeable about plant-based nutrition and local scene.",
            "Perfect meal handling - all food was clearly labeled and prepared safely. No risk of cross-contamination at any stop.",
            "Amazing group dynamic - everyone was supportive of different dietary needs. Guide accommodated gluten-free and nut allergies seamlessly.",
        ],
        safetyScore: {
            score: 94,
            category: "tour",
            reasoning: "Excellent vegan tour with expert guide, safe food handling, and inclusive group environment",
            signals: {
                guide_expertise: 96,
                meal_handling: 95,
                hidden_exploitation: 90,
                group_dynamics: 95,
            },
            citations: [
                "Guide was vegan herself and incredibly knowledgeable",
                "all food was clearly labeled and prepared safely",
                "Guide accommodated gluten-free and nut allergies seamlessly",
            ],
            analyzedAt: new Date("2025-11-12").toISOString(),
        },
        createdAt: new Date("2025-11-07"),
        updatedAt: new Date("2025-11-15"),
    },

    // EVENTS
    {
        id: "event-001",
        category: "event",
        name: "The Green Market Berlin",
        description: "Popular vegan market with diverse vendors selling plant-based food, products and crafts",
        location: {
            address: "Boxhagener Platz, 10245 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5136, lng: 13.453 },
        },
        website: "https://www.facebook.com/greenmarketberlin",
        logistics: {
            schedule: {
                frequency: "First Saturday of every month",
                time: "10:00 AM - 6:00 PM",
                setup: "Vendors start setting up at 9:30 AM",
                weather: "Cancelled only in extreme weather (check website)",
            },
            next_dates: ["December 7, 2024", "January 4, 2025", "February 1, 2025"],
            entry: {
                cost: "Free entry",
                no_booking_required: true,
            },
            location_details: {
                address: "Boxhagener Platz, 10245 Berlin",
                nearest_transit: "Warschauer Str. S-Bahn (5min walk) or Samariterstr. U-Bahn (8min walk)",
                parking: "Limited street parking, public transport recommended",
            },
            vendor_info: {
                count: "40+ vendors",
                payment: "Most accept cards, some cash-only (ATM nearby)",
                languages: "German primary, many vendors speak English",
            },
            accessibility: {
                wheelchair: "Outdoor market, mostly accessible",
                facilities: "Public restrooms nearby at RAW-Gelände",
            },
        },
        reviews: [
            "Great variety of vegan vendors with good food quality. Well organized market with friendly atmosphere.",
            "Nice community vibe! Vendors are knowledgeable about ingredients and accommodate different dietary needs well.",
            "Good accessibility and welcoming crowd. Food quality varies by vendor but generally solid options.",
        ],
        safetyScore: {
            score: 91,
            category: "event",
            reasoning: "Excellent vegan event with high-quality food, strong community atmosphere, and good accessibility features",
            signals: {
                food_quality: 95,
                accessibility: 88,
                community_vibe: 92,
                inclusivity: 89,
            },
            citations: ["Great variety of vegan vendors with good food quality", "accommodate different dietary needs well", "Good accessibility and welcoming crowd"],
            analyzedAt: new Date("2025-11-11").toISOString(),
        },
        createdAt: new Date("2025-11-06"),
        updatedAt: new Date("2025-11-15"),
    },
];

// Helper function to get listings by category
export function getListingsByCategory(category) {
    return mockListings.filter((listing) => listing.category === category);
}

// Helper function to get high-scoring listings (for recommendations)
export function getHighScoringListings(minScore = 80) {
    return mockListings.filter((listing) => listing.safetyScore?.score >= minScore);
}

// Helper function to get listing by ID
export function getListingById(id) {
    return mockListings.find((listing) => listing.id === id);
}

// Sample user preferences for testing
export const mockUserPreferences = {
    dietaryRestrictions: ["gluten-free"],
    preferredCategories: ["restaurant", "accommodation"],
    homeLocation: "Berlin, Germany",
    travelStyle: "mid-range",
};

// Sample welcome message with city-first approach
export const mockChatHistory = [
    {
        id: "welcome-001",
        role: "assistant",
        content:
            "Hi! I'm your AI vegan travel assistant. I can help you find restaurants, accommodations, tours, and events with detailed safety scores and booking information.\n\nWhich city are you planning to visit? 🌍",
        timestamp: new Date("2025-11-16T08:00:00Z"),
        metadata: {
            categories: ["welcome"],
        },
    },
];
