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

    {
        id: "rest-003",
        category: "restaurant",
        name: "+84 Vietnamese Vegan Kitchen",
        description: "Fully vegan Vietnamese restaurant in Berlin Mitte offering noodle soups, clay pot dishes, salads and more, with shared outdoor seating with the omnivorous +84 Asian Deli.",
        location: {
            address: "Habersaathstraße 52 (rechts), 10115 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5323410036667, lng: 13.3794164657593 },
        },
        website: "http://www.plus84-berlin.com",
        logistics: {
            hours: {
                monday: "11:30 AM - 11:00 PM",
                tuesday: "11:30 AM - 11:00 PM",
                wednesday: "11:30 AM - 11:00 PM",
                thursday: "11:30 AM - 11:00 PM",
                friday: "11:30 AM - 11:00 PM",
                saturday: "12:30 PM - 11:00 PM",
                sunday: "12:30 PM - 11:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Reservations usually not required" },
                    { type: "phone", contact: "(030) 40751791", note: "Phone reservations possible" },
                ],
                advance_notice: "Same-day usually fine for small groups",
            },
            pricing: {
                range: "€€",
                average_meal: "€10-18",
                note: "Vietnamese soups, clay pot dishes and salads",
            },
            accessibility: {
                wheelchair: true,
                dietary_accommodations: [
                    "100% vegan menu",
                    "gluten-free options available",
                ],
            },
        },
        reviews: [
            "Fully vegan Vietnamese kitchen with classic noodle soups, clay pot dishes and plenty of fresh vegetables.",
            "Shared outdoor seating area with the omnivorous +84 Asian Deli, but food from this venue is fully plant-based.",
        ],
        safetyScore: {
            score: 88,
            category: "restaurant",
            reasoning: "Fully vegan menu with clearly labeled dishes and strong focus on vegan options; outdoor seating shared with non-vegan venue but kitchen appears dedicated.",
            signals: {
                cross_contamination: 90,
                staff_knowledge: 85,
                ingredient_transparency: 85,
                community_trust: 90,
            },
            citations: [
                "100% vegan Vietnamese cuisine",
                "Outdoor seating shared with omnivorous +84 Asian Deli",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // 1990 Vegan Living
    {
        id: "rest-004",
        category: "restaurant",
        name: "1990 Vegan Living",
        description: "Popular fully vegan Vietnamese restaurant in Friedrichshain focusing on small tapas-style bowls, bowls, soups and homemade drinks in a 1990s Vietnam-inspired setting.",
        location: {
            address: "Krossener Straße 19, 10245 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.510348, lng: 13.458575 },
        },
        website: "http://www.restaurant1990.de",
        logistics: {
            hours: {
                monday: "12:00 PM - 12:00 AM",
                tuesday: "12:00 PM - 12:00 AM",
                wednesday: "12:00 PM - 12:00 AM",
                thursday: "12:00 PM - 12:00 AM",
                friday: "12:00 PM - 12:00 AM",
                saturday: "12:00 PM - 12:00 AM",
                sunday: "12:00 PM - 12:00 AM",
            },
            booking: {
                required: true,
                methods: [
                    { type: "walk-in", note: "Possible but often very busy, long waits" },
                    { type: "phone", contact: "(030) 85614761", note: "Phone reservations recommended" },
                ],
                advance_notice: "2-3 days recommended for peak evenings",
            },
            pricing: {
                range: "€€",
                average_meal: "€15-25",
                note: "Tapas-style small plates and bowls, plus drinks",
            },
            accessibility: {
                wheelchair: true,
                dietary_accommodations: [
                    "100% vegan menu",
                    "some gluten-free options",
                ],
            },
        },
        reviews: [
            "Tapas-style Vietnamese plates let you try many different vegan dishes in one meal.",
            "Very busy and popular; reservations are highly recommended especially in the evening.",
        ],
        safetyScore: {
            score: 90,
            category: "restaurant",
            reasoning: "Long-established fully vegan restaurant with dedicated kitchen and strong community reputation.",
            signals: {
                cross_contamination: 92,
                staff_knowledge: 90,
                ingredient_transparency: 88,
                community_trust: 92,
            },
            citations: [
                "Fully vegan Vietnamese tapas concept",
                "Very strong reputation in the Berlin vegan community",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Ajanta
    {
        id: "rest-005",
        category: "restaurant",
        name: "Ajanta",
        description: "Indian restaurant in Köpenick offering a separate vegan section with dishes like Palak Aloo and lentil-based curries, many served with rice and salad.",
        location: {
            address: "Bahnhofstraße 12, 12555 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.45558, lng: 13.57736 },
        },
        website: "http://www.ajanta-koepenick.de",
        logistics: {
            hours: {
                monday: "11:00 AM - 11:00 PM",
                tuesday: "11:00 AM - 11:00 PM",
                wednesday: "11:00 AM - 11:00 PM",
                thursday: "11:00 AM - 11:00 PM",
                friday: "11:00 AM - 11:00 PM",
                saturday: "11:00 AM - 11:00 PM",
                sunday: "11:00 AM - 11:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Usually space available except peak evenings" },
                    { type: "phone", contact: "(030) 65482963", note: "Phone reservations possible" },
                ],
                advance_notice: "Same-day sufficient",
            },
            pricing: {
                range: "€€",
                average_meal: "€10-18",
                note: "Indian curries with rice and salad",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "several vegan main dishes",
                    "some gluten-free options",
                    "partly organic ingredients",
                ],
            },
        },
        reviews: [
            "Indian restaurant with clearly marked vegan mains like Palak Aloo and Champignon Dal.",
            "Good option for mixed groups, but kitchen is not fully vegan.",
        ],
        safetyScore: {
            score: 60,
            category: "restaurant",
            reasoning: "Several explicitly vegan dishes, but shared kitchen with non-vegan food and limited information on cross-contamination.",
            signals: {
                cross_contamination: 55,
                staff_knowledge: 65,
                ingredient_transparency: 60,
                community_trust: 60,
            },
            citations: [
                "Multiple explicitly vegan curry dishes",
                "Serves non-vegan dishes in the same kitchen",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Al teatro – Neukölln (Gropius Passagen)
    {
        id: "rest-006",
        category: "ice_cream",
        name: "Al teatro (Gropius Passagen)",
        description: "Ice cream café inside the Gropius Passagen in Neukölln offering several vegan sorbets and fruit-based flavors.",
        location: {
            address: "Johannisthaler Chaussee 317 (Gropius Passagen), 12351 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.431565, lng: 13.457523 },
        },
        website: "https://alteatro-eismanufaktur.berlin/",
        logistics: {
            hours: {
                monday: "09:00 AM - 08:00 PM",
                tuesday: "09:00 AM - 08:00 PM",
                wednesday: "09:00 AM - 08:00 PM",
                thursday: "09:00 AM - 08:00 PM",
                friday: "09:00 AM - 08:00 PM",
                saturday: "09:00 AM - 10:00 PM",
                sunday: "11:30 AM - 07:30 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Mall ice cream café, no reservations" },
                ],
                advance_notice: "Not required",
            },
            pricing: {
                range: "€",
                average_meal: "€4-8",
                note: "Scooped ice cream and sorbets",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "several vegan sorbets",
                ],
            },
        },
        reviews: [
            "Offers several vegan fruit sorbets at a mall ice cream counter.",
            "Good casual vegan dessert option when shopping in Gropius Passagen.",
        ],
        safetyScore: {
            score: 65,
            category: "ice_cream",
            reasoning: "Clearly labeled vegan sorbets but shared display and scoops with dairy ice cream.",
            signals: {
                cross_contamination: 55,
                staff_knowledge: 60,
                ingredient_transparency: 60,
                community_trust: 70,
            },
            citations: [
                "Several vegan sorbet options",
                "Shared counter with dairy ice cream",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Al teatro – Steglitz (Schloss)
    {
        id: "rest-007",
        category: "ice_cream",
        name: "Al teatro (Schlossstraße)",
        description: "Ice cream café on Schlossstraße in Steglitz serving sorbets and some vegan-friendly options.",
        location: {
            address: "Schlossstr. 34 (Schloss), 12163 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.4579822, lng: 13.3188921 },
        },
        website: "https://alteatro-eismanufaktur.berlin/",
        logistics: {
            hours: {
                monday: "10:00 AM - 08:00 PM",
                tuesday: "10:00 AM - 08:00 PM",
                wednesday: "10:00 AM - 08:00 PM",
                thursday: "10:00 AM - 08:00 PM",
                friday: "10:00 AM - 08:00 PM",
                saturday: "10:00 AM - 08:00 PM",
                sunday: "10:00 AM - 08:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "No reservations" },
                    { type: "phone", contact: "(030) 684 031 77", note: "Phone contact for groups" },
                ],
                advance_notice: "Not required",
            },
            pricing: {
                range: "€",
                average_meal: "€4-8",
                note: "Ice cream, sorbets and coffee",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "some vegan sorbets",
                ],
            },
        },
        reviews: [
            "Several vegan fruit sorbets plus classic Italian-style ice cream.",
        ],
        safetyScore: {
            score: 62,
            category: "ice_cream",
            reasoning: "Some vegan flavors available but shared scoops and limited information about ingredients.",
            signals: {
                cross_contamination: 50,
                staff_knowledge: 60,
                ingredient_transparency: 60,
                community_trust: 65,
            },
            citations: [
                "Some explicitly vegan sorbets",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Alaska
    {
        id: "rest-008",
        category: "bar",
        name: "Alaska",
        description: "Vegan Spanish-style tapas bar in Neukölln offering tapas, churros, vegan cheeses, cocktails and wine in a cozy bar setting.",
        location: {
            address: "Reuterstraße 85, 12053 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.4828978313905, lng: 13.4288012981415 },
        },
        website: "http://www.facebook.com/alaskabarberlin",
        logistics: {
            hours: {
                monday: "Closed",
                tuesday: "06:00 PM - 01:00 AM",
                wednesday: "06:00 PM - 01:00 AM",
                thursday: "06:00 PM - 01:00 AM",
                friday: "06:00 PM - 03:00 AM",
                saturday: "06:00 PM - 03:00 AM",
                sunday: "06:00 PM - 01:00 AM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Walk-ins welcome, can be busy on weekends" },
                    { type: "phone", contact: "(030) 23914138", note: "Reservations for groups recommended" },
                ],
                advance_notice: "1-2 days recommended for weekend evenings",
            },
            pricing: {
                range: "€€",
                average_meal: "€15-25",
                note: "Vegan tapas and drinks",
            },
            accessibility: {
                wheelchair: true,
                dietary_accommodations: [
                    "100% vegan menu",
                    "some gluten-free options",
                ],
            },
        },
        reviews: [
            "Vegan Spanish tapas bar with creative tapas, house-made vegan cheeses and churros.",
            "Lively neighborhood bar atmosphere; great for drinks plus small plates.",
        ],
        safetyScore: {
            score: 90,
            category: "bar",
            reasoning: "Fully vegan bar kitchen with strong concept and clearly vegan menu; alcohol options are also vegan-focused.",
            signals: {
                cross_contamination: 92,
                staff_knowledge: 90,
                ingredient_transparency: 88,
                community_trust: 90,
            },
            citations: [
                "Spanish tapas bar with 100% vegan food",
                "Known vegan destination in Neukölln",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Aldemir Eis
    {
        id: "rest-009",
        category: "ice_cream",
        name: "Aldemir Eis",
        description: "Traditional ice cream shop in Kreuzberg with several vegan fruit sorbets and seasonal flavors.",
        location: {
            address: "Falckensteinstraße 7, 10997 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.4993, lng: 13.4425 },
        },
        website: "http://www.aldemireis.de",
        logistics: {
            hours: {
                monday: "10:00 AM - 10:00 PM",
                tuesday: "10:00 AM - 10:00 PM",
                wednesday: "10:00 AM - 10:00 PM",
                thursday: "10:00 AM - 10:00 PM",
                friday: "10:00 AM - 10:00 PM",
                saturday: "10:00 AM - 10:00 PM",
                sunday: "10:00 AM - 10:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Classic ice cream shop, no reservations" },
                ],
                advance_notice: "Not required",
            },
            pricing: {
                range: "€",
                average_meal: "€4-8",
                note: "Ice cream and sorbets; seasonal opening March–September",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "several vegan fruit sorbets",
                ],
            },
        },
        reviews: [
            "Popular Kreuzberg ice cream spot with multiple vegan sorbet options.",
        ],
        safetyScore: {
            score: 65,
            category: "ice_cream",
            reasoning: "Several clearly vegan sorbets but dairy and vegan options share the same display and scoops.",
            signals: {
                cross_contamination: 50,
                staff_knowledge: 60,
                ingredient_transparency: 60,
                community_trust: 70,
            },
            citations: [
                "Several vegan fruit sorbets",
                "Shared counter with dairy ice cream",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Ali Baba
    {
        id: "rest-010",
        category: "restaurant",
        name: "Ali Baba",
        description: "Italian-leaning restaurant in Charlottenburg with a large pizza menu including 17 vegetable pizzas that can be ordered with vegan cheese.",
        location: {
            address: "Bleibtreustraße 45, 10623 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.50393, lng: 13.32028 },
        },
        website: "http://www.alibaba-berlin.de",
        logistics: {
            hours: {
                monday: "11:00 AM - 01:00 AM",
                tuesday: "11:00 AM - 01:00 AM",
                wednesday: "11:00 AM - 01:00 AM",
                thursday: "11:00 AM - 01:00 AM",
                friday: "11:00 AM - 02:00 AM",
                saturday: "11:00 AM - 02:00 AM",
                sunday: "11:00 AM - 01:00 AM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Large seating capacity, walk-ins common" },
                    { type: "phone", contact: "(030) -8811350", note: "Recommended for larger groups" },
                ],
                advance_notice: "Same-day usually fine",
            },
            pricing: {
                range: "€€",
                average_meal: "€10-18",
                note: "Italian-style pizzas and other dishes; vegan cheese on request",
            },
            accessibility: {
                wheelchair: true,
                dietary_accommodations: [
                    "vegetable pizzas with vegan cheese",
                ],
            },
        },
        reviews: [
            "Italian restaurant with an unusually large number of vegetable pizzas that can be ordered with vegan cheese.",
        ],
        safetyScore: {
            score: 58,
            category: "restaurant",
            reasoning: "Good vegan pizza options but shared kitchen with meat and dairy and limited info on cross-contamination.",
            signals: {
                cross_contamination: 50,
                staff_knowledge: 60,
                ingredient_transparency: 55,
                community_trust: 65,
            },
            citations: [
                "17 vegetable pizzas optionally with vegan cheese",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Alin Gaza Kitchen
    {
        id: "rest-011",
        category: "restaurant",
        name: "Alin Gaza Kitchen",
        description: "Small restaurant in Prenzlauer Berg serving authentic Palestinian vegan and vegetarian dishes based on family recipes.",
        location: {
            address: "Eberswalder Straße 1, 10437 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5405553, lng: 13.4050848 },
        },
        website: null,
        logistics: {
            hours: {
                monday: "Closed",
                tuesday: "Closed",
                wednesday: "05:00 PM - 10:00 PM",
                thursday: "10:00 PM - 10:00 PM", // (source string was likely incorrect; keep as-is structurally)
                friday: "05:00 PM - 10:00 PM",
                saturday: "05:00 PM - 10:00 PM",
                sunday: "11:00 AM - 08:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Small space, reservations recommended for evenings" },
                    { type: "phone", contact: "(0177) 3432095", note: "Phone reservations possible" },
                ],
                advance_notice: "1-2 days suggested for weekend dinner",
            },
            pricing: {
                range: "€€",
                average_meal: "€12-20",
                note: "Palestinian vegan/vegetarian dishes and catering",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "vegan and vegetarian menu",
                    "gluten-free options",
                    "catering available",
                ],
            },
        },
        reviews: [
            "Authentic Palestinian vegan/vegetarian kitchen from family recipes with standout falafel.",
        ],
        safetyScore: {
            score: 80,
            category: "restaurant",
            reasoning: "Strong vegan/vegetarian focus and many clearly plant-based dishes; small kitchen but menu is largely animal-free.",
            signals: {
                cross_contamination: 78,
                staff_knowledge: 82,
                ingredient_transparency: 80,
                community_trust: 80,
            },
            citations: [
                "Authentic vegan/vegetarian Palestinian kitchen",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2019-05-23"),
        updatedAt: new Date("2019-05-23"),
    },

    // Anh Ba
    {
        id: "rest-012",
        category: "restaurant",
        name: "Anh Ba",
        description: "Vietnamese restaurant in Wilmersdorf serving spring rolls, soups, rice and noodle dishes and homemade drinks with some vegan options.",
        location: {
            address: "Nassauische Straße 36, 10717 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.4873276, lng: 13.3263731 },
        },
        website: "http://www.anhba-restaurant.de/",
        logistics: {
            hours: {
                monday: "12:00 PM - 11:00 PM",
                tuesday: "12:00 PM - 11:00 PM",
                wednesday: "12:00 PM - 11:00 PM",
                thursday: "12:00 PM - 11:00 PM",
                friday: "12:00 PM - 11:00 PM",
                saturday: "12:00 PM - 11:00 PM",
                sunday: "12:00 PM - 11:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Walk-ins common" },
                    { type: "phone", contact: "030 68400481", note: "Phone reservations for groups" },
                ],
                advance_notice: "Same-day usually fine",
            },
            pricing: {
                range: "€€",
                average_meal: "€10-18",
                note: "Vietnamese mains, some vegan options",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "some vegan dishes",
                ],
            },
        },
        reviews: [
            "Vietnamese kitchen with various rice and noodle dishes; some vegan options available.",
        ],
        safetyScore: {
            score: 55,
            category: "restaurant",
            reasoning: "Has vegan dishes but kitchen is not focused on veganism and cross-contamination controls are unclear.",
            signals: {
                cross_contamination: 50,
                staff_knowledge: 55,
                ingredient_transparency: 55,
                community_trust: 60,
            },
            citations: [
                "Offers some vegan dishes among a broader menu",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-05-30"),
        updatedAt: new Date("2018-05-30"),
    },

    // Anh Dao
    {
        id: "rest-013",
        category: "restaurant",
        name: "Anh Dao",
        description: "Vegan Vietnamese restaurant in Prenzlauer Berg with soups, dumplings, noodle and rice dishes and desserts.",
        location: {
            address: "Danziger Straße 42, 10435 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.53964, lng: 13.41902 },
        },
        website: "https://www.facebook.com/anhdaoindochineveganrestaurant/",
        logistics: {
            hours: {
                monday: "12:00 PM - 10:30 PM",
                tuesday: "12:00 PM - 10:30 PM",
                wednesday: "12:00 PM - 10:30 PM",
                thursday: "12:00 PM - 10:30 PM",
                friday: "12:00 PM - 10:30 PM",
                saturday: "03:00 PM - 11:30 PM",
                sunday: "12:00 PM - 10:30 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Very popular; waits common at peak times" },
                    { type: "phone", contact: "(030) 44352707", note: "Phone reservations recommended" },
                ],
                advance_notice: "2-3 days recommended on weekends",
            },
            pricing: {
                range: "€€",
                average_meal: "€12-20",
                note: "Vegan Vietnamese dishes and desserts",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "100% vegan menu",
                ],
            },
        },
        reviews: [
            "Fully vegan Vietnamese restaurant with many soups, dumplings and noodle dishes.",
        ],
        safetyScore: {
            score: 88,
            category: "restaurant",
            reasoning: "Fully vegan Vietnamese kitchen with strong community reputation; no animal products on the menu.",
            signals: {
                cross_contamination: 90,
                staff_knowledge: 85,
                ingredient_transparency: 85,
                community_trust: 90,
            },
            citations: [
                "Vegan Vietnamese cuisine with broad menu",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Annagrazia
    {
        id: "rest-014",
        category: "cafe",
        name: "Annagrazia",
        description: "Ice cream café and café in Steglitz offering vegan sorbets, chocolate and almond ice cream, vegan cones and sometimes vegan cakes.",
        location: {
            address: "Bismarckstraße 1, 12157 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.4642920502582, lng: 13.338657617569 },
        },
        website: "https://www.facebook.com/EiscafeAnnagrazia/",
        logistics: {
            hours: {
                monday: "10:00 AM - 08:00 PM",
                tuesday: "10:00 AM - 08:00 PM",
                wednesday: "10:00 AM - 08:00 PM",
                thursday: "10:00 AM - 08:00 PM",
                friday: "10:00 AM - 08:00 PM",
                saturday: "10:00 AM - 08:00 PM",
                sunday: "10:00 AM - 08:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Neighborhood ice cream café; no reservations" },
                ],
                advance_notice: "Not required",
            },
            pricing: {
                range: "€",
                average_meal: "€4-10",
                note: "Ice cream, sorbets and cake",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "vegan sorbets",
                    "vegan chocolate & almond ice cream",
                    "vegan cones",
                ],
            },
        },
        reviews: [
            "Local ice cream café with several clearly vegan ice creams and cones.",
        ],
        safetyScore: {
            score: 70,
            category: "cafe",
            reasoning: "Strong set of vegan ice cream options but shared counter with dairy; cakes not always vegan.",
            signals: {
                cross_contamination: 60,
                staff_knowledge: 70,
                ingredient_transparency: 70,
                community_trust: 75,
            },
            citations: [
                "Vegan sorbet, chocolate & almond ice cream and vegan cones available",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-05-30"),
        updatedAt: new Date("2018-05-30"),
    },

    // Ashantika
    {
        id: "rest-015",
        category: "restaurant",
        name: "Ashantika",
        description: "Indian restaurant in Steglitz with a wide selection of vegan dishes such as curries, lentil dishes and vegetable variations with coconut milk.",
        location: {
            address: "Bornstrasse 2, 12163 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.465208, lng: 13.327093 },
        },
        website: "http://www.ashantika-steglitz.de",
        logistics: {
            hours: {
                monday: "11:00 AM - 11:00 PM",
                tuesday: "11:00 AM - 11:00 PM",
                wednesday: "11:00 AM - 11:00 PM",
                thursday: "11:00 AM - 11:00 PM",
                friday: "11:00 AM - 11:00 PM",
                saturday: "12:00 PM - 11:00 PM",
                sunday: "12:00 PM - 10:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Walk-ins welcome" },
                    { type: "phone", contact: "(030) 85079223", note: "Reservations for groups possible" },
                ],
                advance_notice: "Same-day usually fine",
            },
            pricing: {
                range: "€€",
                average_meal: "€10-18",
                note: "Indian curries with many vegan options",
            },
            accessibility: {
                wheelchair: true,
                dietary_accommodations: [
                    "many vegan dishes",
                ],
            },
        },
        reviews: [
            "Indian restaurant with many clearly vegan curries and lentil dishes.",
        ],
        safetyScore: {
            score: 62,
            category: "restaurant",
            reasoning: "Large selection of vegan dishes but non-vegan items in the same kitchen; typical Indian restaurant setup.",
            signals: {
                cross_contamination: 55,
                staff_knowledge: 65,
                ingredient_transparency: 60,
                community_trust: 65,
            },
            citations: [
                "Wide selection of vegan dishes like Gobi Pokora, Daal and coconut curries",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // AtayaCaffe
    {
        id: "rest-016",
        category: "cafe",
        name: "AtayaCaffe",
        description: "Cozy living-room style café in Prenzlauer Berg serving Italian and African vegan cuisine, a popular vegan Sunday brunch and various homemade dishes.",
        location: {
            address: "Zelterstraße 6, 10439 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5472538, lng: 13.4274554 },
        },
        website: "http://www.atayacaffe.de",
        logistics: {
            hours: {
                monday: "Closed",
                tuesday: "12:00 PM - 04:00 PM",
                wednesday: "12:00 PM - 04:00 PM",
                thursday: "12:00 PM - 04:00 PM",
                friday: "06:00 PM - 10:00 PM",
                saturday: "06:00 PM - 10:00 PM",
                sunday: "11:00 AM - 04:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Walk-ins possible but often full for Sunday brunch" },
                    { type: "phone", contact: "(030) 33021041", note: "Reservations strongly recommended for brunch" },
                ],
                advance_notice: "Several days recommended for Sunday brunch",
            },
            pricing: {
                range: "€€",
                average_meal: "€12-20",
                note: "Vegan brunch and warm Italian/African dishes",
            },
            accessibility: {
                wheelchair: true,
                dietary_accommodations: [
                    "100% vegan cuisine",
                    "gluten-free options",
                    "vegan brunch",
                ],
            },
        },
        reviews: [
            "Beloved vegan brunch spot combining Italian and Senegalese influences.",
            "Feels like a living room, with freshly cooked dishes and warm atmosphere.",
        ],
        safetyScore: {
            score: 92,
            category: "cafe",
            reasoning: "Fully vegan concept with strong emphasis on fresh, home-style cooking and positive reputation.",
            signals: {
                cross_contamination: 92,
                staff_knowledge: 92,
                ingredient_transparency: 90,
                community_trust: 95,
            },
            citations: [
                "Italian/African vegan cuisine with popular vegan brunch",
                "All dishes prepared vegan with clear concept",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Attila Hildmann vegan food – CLOSED
    {
        id: "rest-017",
        category: "restaurant",
        name: "Attila Hildmann vegan food (Kreuzberg – CLOSED)",
        description: "Former vegan snack bar and ice cream place in Kreuzberg offering burgers, snacks and soft ice cream. Closed since November 2019.",
        location: {
            address: "Adalbertstraße 7, 10999 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5004572928796, lng: 13.4188932180405 },
        },
        website: "https://www.attilahildmann.de/de/vegan-food-snackbar-berlin-kreuzberg.html",
        logistics: {
            hours: {
                monday: "Closed",
                tuesday: "Closed",
                wednesday: "Closed",
                thursday: "Closed",
                friday: "Closed",
                saturday: "Closed",
                sunday: "Closed",
            },
            booking: {
                required: false,
                methods: [],
                advance_notice: "Location permanently closed",
            },
            pricing: {
                range: "€€",
                average_meal: "€10-15",
                note: "Former snack bar pricing; now closed",
            },
            accessibility: {
                wheelchair: false,
                dietary_accommodations: [
                    "formerly 100% vegan menu",
                ],
            },
        },
        reviews: [
            "Former vegan snack bar; permanently closed since November 24, 2019.",
        ],
        safetyScore: {
            score: 0,
            category: "restaurant",
            reasoning: "Location permanently closed; no longer a relevant option for vegan safety.",
            signals: {
                cross_contamination: 0,
                staff_knowledge: 0,
                ingredient_transparency: 0,
                community_trust: 0,
            },
            citations: [
                "Closed since 24.11.2019",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-05-05"),
        updatedAt: new Date("2019-11-24"),
    },

    // Attila Hildmann vegan food – Charlottenburg
    {
        id: "rest-018",
        category: "restaurant",
        name: "Attila Hildmann vegan food (Charlottenburg)",
        description: "Vegan snack bar in Charlottenburg offering burgers, club sandwiches, matcha shakes and soft serve ice cream.",
        location: {
            address: "Schillerstraße 71, 10627 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.509593, lng: 13.303558 },
        },
        website: "http://www.attilahildmann.de/de/vegan-food-snackbar-berlin.html",
        logistics: {
            hours: {
                monday: "Closed",
                tuesday: "12:00 PM - 09:00 PM",
                wednesday: "12:00 PM - 09:00 PM",
                thursday: "12:00 PM - 09:00 PM",
                friday: "12:00 PM - 09:00 PM",
                saturday: "12:00 PM - 09:00 PM",
                sunday: "12:00 PM - 09:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Fast-casual snack bar concept" },
                    { type: "phone", contact: "(030) 89616746", note: "Phone contact for group reservations" },
                ],
                advance_notice: "Not usually needed",
            },
            pricing: {
                range: "€€",
                average_meal: "€10-15",
                note: "Vegan burgers and snacks",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "100% vegan menu",
                    "some gluten-free options",
                    "partly organic ingredients",
                ],
            },
        },
        reviews: [
            "Vegan snack bar focused on burgers, sandwiches and shakes.",
        ],
        safetyScore: {
            score: 80,
            category: "restaurant",
            reasoning: "Fully vegan menu and snack-bar concept; good for casual vegan fast food.",
            signals: {
                cross_contamination: 82,
                staff_knowledge: 78,
                ingredient_transparency: 78,
                community_trust: 80,
            },
            citations: [
                "Burger, club sandwiches, matcha shakes and soft ice are all vegan",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Auf die Hand
    {
        id: "rest-019",
        category: "cafe",
        name: "Auf die Hand",
        description: "Cafe in Berlin Mitte serving salads, sandwiches and coffee with plant milks plus changing daily options.",
        location: {
            address: "Luisenstraße 45, 10117 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.523078, lng: 13.379762 },
        },
        website: "http://www.auf-die-hand.de",
        logistics: {
            hours: {
                monday: "08:00 AM - 06:00 PM",
                tuesday: "08:00 AM - 06:00 PM",
                wednesday: "08:00 AM - 06:00 PM",
                thursday: "08:00 AM - 06:00 PM",
                friday: "08:00 AM - 06:00 PM",
                saturday: "10:00 AM - 04:00 PM",
                sunday: "Closed",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Daytime cafe; reservations rarely needed" },
                    { type: "phone", contact: "(030) 48823759", note: "Phone contact for catering or larger groups" },
                ],
                advance_notice: "Not required for individuals",
            },
            pricing: {
                range: "€€",
                average_meal: "€8-14",
                note: "Lunch salads and sandwiches",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "some vegan options",
                    "coffee with soy milk",
                ],
            },
        },
        reviews: [
            "Daytime cafe with salads, sandwiches and coffee with soy milk; vegan options vary with daily menu.",
        ],
        safetyScore: {
            score: 55,
            category: "cafe",
            reasoning: "Offers some vegan items and plant milks but not a vegan-focused kitchen.",
            signals: {
                cross_contamination: 50,
                staff_knowledge: 55,
                ingredient_transparency: 55,
                community_trust: 60,
            },
            citations: [
                "Salads, sandwiches and coffee with soy milk; daily changing menu",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Aviatrix Cafe
    {
        id: "rest-020",
        category: "cafe",
        name: "Aviatrix Cafe",
        description: "Small cafe in Neukölln where all cakes are vegan and gluten-free, serving lunch that is always vegan and gluten-free.",
        location: {
            address: "Herrfurthstraße 13, 12049 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.476987, lng: 13.419832 },
        },
        website: "http://www.aviatrixatelier.com",
        logistics: {
            hours: {
                monday: "12:00 PM - 07:00 PM",
                tuesday: "12:00 PM - 07:00 PM",
                wednesday: "12:00 PM - 07:00 PM",
                thursday: "12:00 PM - 07:00 PM",
                friday: "12:00 PM - 07:00 PM",
                saturday: "10:00 AM - 07:00 PM",
                sunday: "10:00 AM - 07:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Tiny cafe; weekend seating limited" },
                    { type: "phone", contact: "(0152) 34512411", note: "Phone reservations or pre-orders recommended" },
                ],
                advance_notice: "Recommended for groups or special orders",
            },
            pricing: {
                range: "€€",
                average_meal: "€8-15",
                note: "Vegan and gluten-free cakes and lunch dishes",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "100% vegan cakes",
                    "100% gluten-free cakes",
                    "vegan and gluten-free lunch",
                    "organic ingredients",
                ],
            },
        },
        reviews: [
            "All cakes and lunch dishes are vegan and gluten-free, including banana bread, lemon cake and stews.",
        ],
        safetyScore: {
            score: 92,
            category: "cafe",
            reasoning: "Fully vegan lunch and baked goods with clearly gluten-free focus and high attention to ingredients.",
            signals: {
                cross_contamination: 90,
                staff_knowledge: 92,
                ingredient_transparency: 92,
                community_trust: 92,
            },
            citations: [
                "All cakes vegan and gluten-free; lunch always vegan and gluten-free",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // AVOCAI food and pilates studio
    {
        id: "rest-021",
        category: "cafe",
        name: "AVOCAI food and pilates studio",
        description: "Daytime restaurant and Pilates studio in Mitte serving paleo-inspired bowls, breakfast bowls and gluten-free bread with several vegan options.",
        location: {
            address: "Brunnenstr. 165, 10119 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.534048, lng: 13.39811 },
        },
        website: "http://www.avocai.de",
        logistics: {
            hours: {
                monday: "Closed",
                tuesday: "Closed",
                wednesday: "09:00 AM - 07:00 PM",
                thursday: "09:00 AM - 07:00 PM",
                friday: "09:00 AM - 07:00 PM",
                saturday: "09:00 AM - 07:00 PM",
                sunday: "09:00 AM - 04:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Daytime spot; reservations more relevant for Pilates classes" },
                    { type: "phone", contact: "(030) 44317130", note: "Phone reservations for classes or groups" },
                ],
                advance_notice: "Recommended for classes; spontaneous ok for food",
            },
            pricing: {
                range: "€€",
                average_meal: "€10-18",
                note: "Bowls, breakfast and smoothies with vegan options",
            },
            accessibility: {
                wheelchair: true,
                dietary_accommodations: [
                    "vegan bowls and breakfast options",
                    "gluten-free bread",
                ],
            },
        },
        reviews: [
            "Paleo-style daytime restaurant with vegan bowls like Green Protein Bowl and Avocado Acai Breakfast Bowl.",
        ],
        safetyScore: {
            score: 70,
            category: "cafe",
            reasoning: "Several clearly vegan bowl and breakfast options but menu is mixed and not fully vegan.",
            signals: {
                cross_contamination: 60,
                staff_knowledge: 70,
                ingredient_transparency: 72,
                community_trust: 70,
            },
            citations: [
                "Offers vegan bowls and breakfast bowls, gluten-free homemade bread",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Feinberg's
    {
        id: "rest-22",
        category: "restaurant",
        name: "Feinberg's",
        description: "Israeli restaurant in Schöneberg with a large variety of dishes and many clearly labeled vegan options, including vegan shakshuka and sabich.",
        location: {
            address: "Fuggerstraße 35, 10777 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.4990791809834, lng: 13.3417904376984 },
        },
        website: "http://www.feinbergs.de",
        logistics: {
            hours: {
                monday: "Closed",
                tuesday: "12:00 PM - 11:00 PM",
                wednesday: "12:00 PM - 11:00 PM",
                thursday: "12:00 PM - 11:00 PM",
                friday: "12:00 PM - 11:00 PM",
                saturday: "12:00 PM - 11:00 PM",
                sunday: "12:00 PM - 11:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Popular for dinner, reservations recommended on weekends" },
                    { type: "phone", contact: "(030) 91 55 34 62", note: "Phone reservations" },
                    { type: "email", contact: "info@feinbergs.de", note: "Group or special requests" },
                ],
                advance_notice: "1-3 days recommended for peak nights",
            },
            pricing: {
                range: "€€",
                average_meal: "€15-25",
                note: "Israeli mains, mezze and platters",
            },
            accessibility: {
                wheelchair: true,
                dietary_accommodations: [
                    "many vegan dishes",
                    "vegan versions of some vegetarian dishes (e.g. shakshuka, sabich)",
                    "gluten-free options",
                ],
            },
        },
        reviews: [
            "Israeli restaurant with many vegan mains and clearly labeled vegan alternatives.",
            "Good choice for mixed groups; vegan guests have several substantial options.",
        ],
        safetyScore: {
            score: 70,
            category: "restaurant",
            reasoning: "Strong vegan selection and some explicitly veganized dishes, but shared kitchen with meat and dairy.",
            signals: {
                cross_contamination: 60,
                staff_knowledge: 75,
                ingredient_transparency: 70,
                community_trust: 72,
            },
            citations: [
                "Many vegan dishes and vegan versions of shakshuka and sabich are on the menu.",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-10-26"),
        updatedAt: new Date("2018-10-26"),
    },

    // Fellas Österreichische & Vegane Küche
    {
        id: "rest-023",
        category: "restaurant",
        name: "Fellas Österreichische & Vegane Küche",
        description: "Austrian restaurant in Prenzlauer Berg with a separate vegan section, including vegan Kaiserschmarrn and seitan Wiener Schnitzel.",
        location: {
            address: "Stargarder Straße 3, 10437 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5474539, lng: 13.4143462 },
        },
        website: "http://www.restaurant-fellas-berlin.de/",
        logistics: {
            hours: {
                monday: "05:00 PM - 10:30 PM",
                tuesday: "05:00 PM - 10:30 PM",
                wednesday: "05:00 PM - 10:30 PM",
                thursday: "05:00 PM - 10:30 PM",
                friday: "05:00 PM - 10:30 PM",
                saturday: "12:30 PM - 11:00 PM",
                sunday: "12:30 PM - 10:30 PM",
            },
            booking: {
                required: true,
                methods: [
                    { type: "walk-in", note: "Possible but often full in the evenings" },
                    { type: "phone", contact: "(030) 64432136", note: "Reservations highly recommended" },
                    { type: "email", contact: "email@restaurant-fellas.de", note: "Groups and special occasions" },
                ],
                advance_notice: "2-4 days for weekends",
            },
            pricing: {
                range: "€€",
                average_meal: "€18-28",
                note: "Austrian mains and desserts with vegan alternatives",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "several vegan mains (e.g. seitan Wiener Schnitzel)",
                    "vegan desserts (e.g. vegan Kaiserschmarrn)",
                ],
            },
        },
        reviews: [
            "Austrian comfort food with vegan versions of classic dishes like Wiener Schnitzel and Kaiserschmarrn.",
        ],
        safetyScore: {
            score: 58,
            category: "restaurant",
            reasoning: "Good vegan choices, but small part of an otherwise non-vegan Austrian kitchen with heavy dairy and egg use.",
            signals: {
                cross_contamination: 50,
                staff_knowledge: 60,
                ingredient_transparency: 60,
                community_trust: 60,
            },
            citations: [
                "Vegan Kaiserschmarrn and seitan Wiener Schnitzel on the menu.",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-07-11"),
        updatedAt: new Date("2018-07-11"),
    },

    // Feuer und Flamme
    {
        id: "rest-024",
        category: "restaurant",
        name: "Feuer und Flamme",
        description: "Fondue restaurant in Friedrichshain offering classic cheese and meat fondues plus a vegetable broth fondue suitable for vegans when combined with plant-based sides.",
        location: {
            address: "Am Comeniusplatz 1, 10243 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.512314, lng: 13.447926 },
        },
        website: "https://fuf.berlin/",
        logistics: {
            hours: {
                monday: "06:00 PM - 12:00 AM",
                tuesday: "06:00 PM - 12:00 AM",
                wednesday: "06:00 PM - 12:00 AM",
                thursday: "06:00 PM - 12:00 AM",
                friday: "06:00 PM - 12:00 AM",
                saturday: "06:00 PM - 12:00 AM",
                sunday: "06:00 PM - 12:00 AM",
            },
            booking: {
                required: true,
                methods: [
                    { type: "phone", contact: "(030) 66404861", note: "Reservations required for fondue" },
                    { type: "online", url: "https://fuf.berlin/", note: "Online booking possible" },
                ],
                advance_notice: "Several days in advance recommended, especially weekends",
            },
            pricing: {
                range: "€€€",
                average_meal: "€25-40",
                note: "Fondue menus, includes non-vegan options",
            },
            accessibility: {
                wheelchair: false,
                dietary_accommodations: [
                    "vegetable broth fondue with vegetables and sides can be ordered vegan",
                ],
            },
        },
        reviews: [
            "Fondue restaurant where vegans can opt for vegetable broth fondue and vegetables.",
            "Cross-contamination with dairy and meat is likely due to shared fondue equipment.",
        ],
        safetyScore: {
            score: 40,
            category: "restaurant",
            reasoning: "Fondue concept is highly dairy- and meat-centric with shared pots and equipment; vegan broth option exists but cross-contamination risk is significant.",
            signals: {
                cross_contamination: 30,
                staff_knowledge: 45,
                ingredient_transparency: 45,
                community_trust: 40,
            },
            citations: [
                "Fondue restaurant with vegetable broth fondue as a vegan-friendly option.",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Fino im Nikolaiviertel
    {
        id: "rest-025",
        category: "cafe",
        name: "Fino im Nikolaiviertel",
        description: "Dessert-focused cafe in the Nikolaiviertel serving cakes, chocolates, crêpes and hot drinks with various plant milks.",
        location: {
            address: "Propststraße 4, 10178 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.516902, lng: 13.406552 },
        },
        website: "http://facebook.com/Fino-im-Nikolaiviertel-125045954227607",
        logistics: {
            hours: {
                monday: "10:00 AM - 06:00 PM",
                tuesday: "10:00 AM - 06:00 PM",
                wednesday: "10:00 AM - 06:00 PM",
                thursday: "10:00 AM - 06:00 PM",
                friday: "10:00 AM - 06:00 PM",
                saturday: "10:00 AM - 06:00 PM",
                sunday: "11:00 AM - 06:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Tourist-heavy area; may be full at peak times" },
                    { type: "phone", contact: "(0176) 10351915", note: "Group bookings and inquiries" },
                ],
                advance_notice: "Recommended for larger groups",
            },
            pricing: {
                range: "€€",
                average_meal: "€6-12",
                note: "Cakes, chocolate, crêpes and hot drinks",
            },
            accessibility: {
                wheelchair: true,
                dietary_accommodations: [
                    "plant milks (oat, soy, almond) for drinks",
                    "some vegan cakes and crêpes possible",
                    "some gluten-free options",
                ],
            },
        },
        reviews: [
            "Small cafe in Nikolaiviertel with cakes and crêpes; plant milks available for coffee.",
        ],
        safetyScore: {
            score: 60,
            category: "cafe",
            reasoning: "Several vegan-friendly drink and dessert options, but not a dedicated vegan bakery and limited info about ingredients.",
            signals: {
                cross_contamination: 55,
                staff_knowledge: 60,
                ingredient_transparency: 60,
                community_trust: 62,
            },
            citations: [
                "Offers cakes, chocolate, crêpes and various plant milks (oat, soy, almond).",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // FLOCKYS Schneeeis
    {
        id: "rest-026",
        category: "ice_cream",
        name: "FLOCKYS Schneeeis",
        description: "Small ice cream spot in Friedrichshain specializing in snow ice ('Schneeeis') with various vegan flavors like banana, mango and lime.",
        location: {
            address: "Boxhagener Straße 71, 10245 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.50675, lng: 13.46941 },
        },
        website: "http://www.flockys.de",
        logistics: {
            hours: {
                monday: "11:00 AM - 08:00 PM",
                tuesday: "11:00 AM - 08:00 PM",
                wednesday: "11:00 AM - 08:00 PM",
                thursday: "11:00 AM - 08:00 PM",
                friday: "11:00 AM - 08:00 PM",
                saturday: "11:00 AM - 08:00 PM",
                sunday: "11:00 AM - 08:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Ice cream shop, no reservations" },
                    { type: "phone", contact: "(0177) 7204546", note: "Catering and group requests" },
                    { type: "email", contact: "jw@flockys.de", note: "Catering inquiries" },
                ],
                advance_notice: "Recommended for catering",
            },
            pricing: {
                range: "€",
                average_meal: "€4-8",
                note: "Snow ice portions and toppings",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "multiple vegan snow ice flavors (e.g. banana, mango, lime)",
                    "gluten-free options",
                    "organic ingredients for some items",
                ],
            },
        },
        reviews: [
            "Specialized 'Schneeeis' concept with several fruity vegan flavors.",
        ],
        safetyScore: {
            score: 72,
            category: "ice_cream",
            reasoning: "Concept is largely fruit-based snow ice with clearly vegan flavours; however, shared production and toppings may involve cross-contamination.",
            signals: {
                cross_contamination: 60,
                staff_knowledge: 70,
                ingredient_transparency: 72,
                community_trust: 75,
            },
            citations: [
                "Snow ice in flavors like banana, mango or lime; vegan marked.",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // FLOP-Café
    {
        id: "rest-027",
        category: "cafe",
        name: "FLOP-Café",
        description: "Small oriental cafe and snack bar in Wedding with soups, salads, wraps and several vegan Arabic specialties, plus at least one vegan cake.",
        location: {
            address: "Otawistraße 11, 13351 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.555131, lng: 13.34121 },
        },
        website: "http://www.bakri-orient.com/",
        logistics: {
            hours: {
                monday: "11:00 AM - 07:00 PM",
                tuesday: "Closed",
                wednesday: "11:00 AM - 07:00 PM",
                thursday: "11:00 AM - 07:00 PM",
                friday: "11:00 AM - 07:00 PM",
                saturday: "11:00 AM - 07:00 PM",
                sunday: "11:00 AM - 07:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Neighborhood cafe; walk-ins expected" },
                    { type: "phone", contact: "(030) 81618840", note: "Pre-orders and group reservations" },
                ],
                advance_notice: "Recommended for larger groups",
            },
            pricing: {
                range: "€",
                average_meal: "€7-12",
                note: "Soups, salads, wraps and small dishes",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "several vegan mains and sides (hummus, aubergine spread, etc.)",
                ],
            },
        },
        reviews: [
            "Oriental cafe with vegan wraps, hummus, aubergine spread and a vegan cake.",
        ],
        safetyScore: {
            score: 70,
            category: "cafe",
            reasoning: "Very vegan-friendly daily menu, but still mixed kitchen with non-vegan items.",
            signals: {
                cross_contamination: 60,
                staff_knowledge: 72,
                ingredient_transparency: 70,
                community_trust: 72,
            },
            citations: [
                "Soups, salads, wraps and a vegan cake plus hummus and aubergine spread.",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Flora Burger
    {
        id: "rest-028",
        category: "restaurant",
        name: "Flora Burger",
        description: "Burger snack bar in Pankow offering several vegan burgers alongside a conventional burger menu.",
        location: {
            address: "Florastraße 41, 13187 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.565966, lng: 13.408606 },
        },
        website: "http://www.facebook.com/Floraburger-1739795012942439",
        logistics: {
            hours: {
                monday: "11:00 AM - 11:00 PM",
                tuesday: "11:00 AM - 11:00 PM",
                wednesday: "11:00 AM - 11:00 PM",
                thursday: "11:00 AM - 11:00 PM",
                friday: "11:00 AM - 11:00 PM",
                saturday: "11:00 AM - 11:00 PM",
                sunday: "11:00 AM - 11:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Classic burger takeaway/imbiss style" },
                ],
                advance_notice: "Not required",
            },
            pricing: {
                range: "€",
                average_meal: "€7-12",
                note: "Burgers and fries, including vegan options",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "three vegan burger choices",
                ],
            },
        },
        reviews: [
            "Imbiss with three vegan burger options (classic, spicy with jalapenos, special with fried vegetables).",
        ],
        safetyScore: {
            score: 55,
            category: "restaurant",
            reasoning: "Good set of vegan burgers but fried on shared equipment with non-vegan items and limited documentation.",
            signals: {
                cross_contamination: 45,
                staff_knowledge: 55,
                ingredient_transparency: 55,
                community_trust: 60,
            },
            citations: [
                "Three vegan burgers on offer (classic, spicy, special).",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Flying Cake
    {
        id: "rest-029",
        category: "cafe",
        name: "Flying Cake",
        description: "Cafe and bakery in Prenzlauer Berg serving bagels and cakes with a strong focus on vegan baked goods.",
        location: {
            address: "Stargarder Straße 45, 10437 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5435289, lng: 13.4254008 },
        },
        website: null,
        logistics: {
            hours: {
                monday: "08:00 AM - 06:00 PM",
                tuesday: "08:00 AM - 06:00 PM",
                wednesday: "08:00 AM - 06:00 PM",
                thursday: "08:00 AM - 06:00 PM",
                friday: "08:00 AM - 06:00 PM",
                saturday: "10:00 AM - 06:00 PM",
                sunday: "12:00 PM - 06:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Neighborhood cafe with limited seating" },
                    { type: "phone", contact: "(0176) 83166448", note: "Cake pre-orders and catering" },
                ],
                advance_notice: "Recommended for cake orders and catering",
            },
            pricing: {
                range: "€",
                average_meal: "€5-10",
                note: "Bagels, cakes and hot drinks",
            },
            accessibility: {
                wheelchair: false,
                dietary_accommodations: [
                    "several vegan cakes and snacks",
                ],
            },
        },
        reviews: [
            "Small cafe offering bagels and cakes, including multiple vegan options.",
        ],
        safetyScore: {
            score: 65,
            category: "cafe",
            reasoning: "Vegan baked goods are a focus, but not a fully vegan bakery and shared kitchen with non-vegan items.",
            signals: {
                cross_contamination: 55,
                staff_knowledge: 65,
                ingredient_transparency: 65,
                community_trust: 70,
            },
            citations: [
                "Bagels and cakes with multiple vegan choices.",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Foreign Affairs
    {
        id: "rest-030",
        category: "restaurant",
        name: "Foreign Affairs",
        description: "Upscale restaurant at Werderscher Markt with a few creative vegan mains and desserts alongside a predominantly non-vegan fine dining menu.",
        location: {
            address: "Werderscher Markt 11, 10117 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.51507, lng: 13.39788 },
        },
        website: "http://www.foreign-affairs-berlin.de",
        logistics: {
            hours: {
                monday: "12:00 PM - 11:00 PM",
                tuesday: "12:00 PM - 11:00 PM",
                wednesday: "12:00 PM - 11:00 PM",
                thursday: "12:00 PM - 11:00 PM",
                friday: "12:00 PM - 11:00 PM",
                saturday: "12:00 PM - 11:00 PM",
                sunday: "12:00 PM - 11:00 PM",
            },
            booking: {
                required: true,
                methods: [
                    { type: "online", url: "http://www.foreign-affairs-berlin.de", note: "Table reservations recommended" },
                    { type: "phone", contact: "(030) 4050461800", note: "Phone reservations and menu questions" },
                    { type: "email", contact: "restaurant.johnf@arcotelhotels.com", note: "Events and catering" },
                ],
                advance_notice: "Several days recommended for dinner, especially weekends",
            },
            pricing: {
                range: "€€€",
                average_meal: "€30-50",
                note: "High-end dining, vegan options available but limited",
            },
            accessibility: {
                wheelchair: true,
                dietary_accommodations: [
                    "some vegan mains",
                    "gluten-free options",
                ],
            },
        },
        reviews: [
            "Fine dining restaurant with a few vegan dishes such as cep dumplings, vegetable strudel and vegan dessert.",
        ],
        safetyScore: {
            score: 50,
            category: "restaurant",
            reasoning: "Has some well-crafted vegan options in a non-vegan upscale kitchen with mixed preparation areas.",
            signals: {
                cross_contamination: 45,
                staff_knowledge: 60,
                ingredient_transparency: 55,
                community_trust: 50,
            },
            citations: [
                "Sautéed mushroom dumplings and vegetable strudel listed as vegan-friendly mains.",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Formidable
    {
        id: "rest-031",
        category: "restaurant",
        name: "Formidable",
        description: "Croque-focused snack bar in Prenzlauer Berg offering several vegan croques with vegan cheese and dips and plant milks for coffee.",
        location: {
            address: "Schönhauser Allee 126, 10437 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.547163, lng: 13.412588 },
        },
        website: "http://www.facebook.com/Formidable.Berlin/?fref=ts",
        logistics: {
            hours: {
                monday: "11:00 AM - 10:00 PM",
                tuesday: "11:00 AM - 10:00 PM",
                wednesday: "11:00 AM - 10:00 PM",
                thursday: "11:00 AM - 10:00 PM",
                friday: "11:00 AM - 11:00 PM",
                saturday: "11:00 AM - 11:00 PM",
                sunday: "11:00 AM - 10:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Fast casual croque bar; reservations not needed" },
                    { type: "phone", contact: "(030) 28035508", note: "Pre-orders for groups possible" },
                ],
                advance_notice: "Not required",
            },
            pricing: {
                range: "€",
                average_meal: "€6-10",
                note: "Croques and coffee drinks",
            },
            accessibility: {
                wheelchair: null,
                dietary_accommodations: [
                    "multiple vegan croques with vegan melting cheese",
                    "vegan dips",
                    "soy, almond and oat milk for coffee",
                ],
            },
        },
        reviews: [
            "Serves vegan croques with vegan cheese and several plant milks for coffee.",
        ],
        safetyScore: {
            score: 65,
            category: "restaurant",
            reasoning: "Good vegan comfort food options but shared equipment with dairy-based croques.",
            signals: {
                cross_contamination: 55,
                staff_knowledge: 65,
                ingredient_transparency: 65,
                community_trust: 68,
            },
            citations: [
                "Three different vegan croques with vegan dips and multiple plant milks.",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-04-29"),
        updatedAt: new Date("2018-04-29"),
    },

    // Frau Honig
    {
        id: "rest-032",
        category: "cafe",
        name: "Frau Honig",
        description: "Neighbourhood cafe in Friedrichshain with several vegan cakes, pastries and plant milks for coffee.",
        location: {
            address: "Straßmannstr. 1, 10249 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.521568, lng: 13.446862 },
        },
        website: null,
        logistics: {
            hours: {
                monday: "09:00 AM - 06:00 PM",
                tuesday: "09:00 AM - 06:00 PM",
                wednesday: "09:00 AM - 06:00 PM",
                thursday: "09:00 AM - 06:00 PM",
                friday: "09:00 AM - 06:00 PM",
                saturday: "10:00 AM - 07:00 PM",
                sunday: "10:00 AM - 07:00 PM",
            },
            booking: {
                required: false,
                methods: [
                    { type: "walk-in", note: "Local cafe; walk-ins welcome" },
                    { type: "phone", contact: "(030) 42807222", note: "Cake orders and group inquiries" },
                ],
                advance_notice: "Recommended for cake orders or larger groups",
            },
            pricing: {
                range: "€",
                average_meal: "€5-10",
                note: "Cakes, pastries and coffee",
            },
            accessibility: {
                wheelchair: true,
                dietary_accommodations: [
                    "vegan carrot cake and orange cake",
                    "vegan pastries (e.g. nut corners, cinnamon rolls)",
                    "plant milks for hot drinks",
                ],
            },
        },
        reviews: [
            "Offers several vegan cakes and pastries plus plant milk options for hot drinks.",
        ],
        safetyScore: {
            score: 70,
            category: "cafe",
            reasoning: "Consistently vegan cake and pastry options and plant milks, but kitchen is mixed and not exclusively vegan.",
            signals: {
                cross_contamination: 60,
                staff_knowledge: 70,
                ingredient_transparency: 70,
                community_trust: 72,
            },
            citations: [
                "Vegan carrot cake, orange cake, vegan pastries and plant milk for hot drinks.",
            ],
            analyzedAt: new Date("2025-11-15").toISOString(),
        },
        createdAt: new Date("2018-05-15"),
        updatedAt: new Date("2018-05-15"),
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


    {
        id: "accom-004",
        category: "accommodation",
        name: "ARCOTEL John F Berlin",
        description: "Design hotel in central Berlin-Mitte near Gendarmenmarkt with a vegan-friendly breakfast buffet and on-site restaurant offering vegan options",
        location: {
            address: "Werderscher Markt 11, 10117 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.515295, lng: 13.39765 },
        },
        website: "https://johnf.arcotel.com/en/",
        logistics: {
            check_in: {
                time: "3:00 PM - 12:00 AM",
                late_arrival: "24/7 front desk, late arrival possible with prior notice",
                methods: ["front desk"],
            },
            check_out: "12:00 PM",
            breakfast: {
                time: "6:30 AM - 10:00 AM (Mon–Fri), 7:00 AM - 10:30 AM (Sat–Sun & holidays)",
                price: "approx. €22 (buffet)",
                note: "Breakfast buffet with clearly marked vegan options; additional vegan cold cuts and spreads available on request",
            },
            booking: {
                methods: [
                    {
                        type: "online",
                        url: "https://johnf.arcotel.com/en/",
                        note: "Direct booking with best-rate guarantee",
                    },
                    {
                        type: "platform",
                        url: "https://www.booking.com/hotel/de/john-f.de.html",
                        note: "Book via Booking.com",
                    },
                    {
                        type: "phone",
                        contact: "+49 30 40 50 46 0",
                        note: "Reservations and special dietary requests",
                    },
                ],
                cancellation: "Depends on rate; many rates allow free cancellation until 24–48 hours before arrival",
            },
            pricing: {
                range: "€€€",
                standard_room: "€120-190/night",
                note: "4-star city hotel; prices vary by season and demand",
            },
            facilities: {
                restaurant: "On-site restaurant 'Foreign Affairs' with vegan, gluten-free and dairy-free options",
                wellness: "Sauna and small spa area; fitness room",
                wifi: "Free high-speed Wi-Fi throughout the hotel",
                parking: "Paid underground parking and nearby public parking",
            },
        },
        reviews: [
            "Central design hotel with a good breakfast buffet where vegan options are clearly labeled; extra vegan items can be requested.",
            "Staff are used to dietary requests – vegan, gluten-free and dairy-free options are available both at breakfast and in the restaurant.",
            "Excellent location near Gendarmenmarkt and Museum Island, with easy access to many vegan restaurants in Mitte and Friedrichshain-Kreuzberg.",
        ],
        safetyScore: {
            score: 82,
            category: "accommodation",
            reasoning: "Vegan-friendly breakfast buffet with labeled options, an on-site restaurant that offers vegan dishes, and staff familiar with vegan, gluten-free and dairy-free requests. Not fully vegan, but clearly above average for plant-based guests.",
            signals: {
                kitchen_safety: 78,
                bedding: 80,
                breakfast_quality: 88,
                host_knowledge: 82,
            },
            citations: [
                "Breakfast buffet with labeled vegan selection",
                "The modern restaurant serves German cuisine with vegan, gluten-free and dairy-free options",
                "Dairy-free, vegan and gluten-free options can be requested from the staff",
            ],
            analyzedAt: new Date("2025-11-16").toISOString(),
        },
        createdAt: new Date("2025-11-16"),
        updatedAt: new Date("2025-11-16"),
    },

    {
        id: "accom-005",
        category: "accommodation",
        name: "Essential by Dorint Berlin-Adlershof",
        description: "Modern city hotel in Berlin’s Adlershof district offering vegan-friendly breakfast buffet and restaurant with vegan options, powered by 100 % renewable electricity.",
        location: {
            address: "Rudower Chaussee 15, 12489 Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5075, lng: 13.4450 },
        },
        website: "https://hotel-berlin-adlershof.dorint.com/en/",
        logistics: {
            check_in: {
                time: "3:00 PM - 12:00 AM",
                late_arrival: "24/7 front desk available",
                methods: ["front desk", "online pre-registration available"],
            },
            check_out: "12:00 PM",
            breakfast: {
                time: "6:30 AM - 10:00 AM (Mon–Fri), 7:00 AM - 11:00 AM (Sat–Sun)",
                price: "approx. €20–25 buffet",
                note: "Breakfast buffet includes vegan selections and clearly labelled vegan items. :contentReference[oaicite:0]{index=0}",
            },
            booking: {
                methods: [
                    {
                        type: "online",
                        url: "https://hotel-berlin-adlershof.dorint.com/en/",
                        note: "Direct booking via hotel website",
                    },
                    {
                        type: "platform",
                        url: "https://www.booking.com/hotel/de/dorintberlinadlershof.html",
                        note: "Book via Booking.com",
                    },
                ],
                cancellation: "Varies by rate; many allow free cancellation up to 24-48 hours before arrival",
            },
            pricing: {
                range: "€€",
                standard_room: "€100-150/night",
                note: "City hotel with strong tech-park location; vegan-friendly amenities above average for category",
            },
            facilities: {
                restaurant: "On-site restaurant ‘elf99’ offering vegan bulgur salad and other vegan choices. :contentReference[oaicite:1]{index=1}",
                wifi: "Free high-speed WiFi throughout the hotel",
                parking: "Private paid parking available on site",
                sustainability: "100% renewable electricity from hydropower. :contentReference[oaicite:2]{index=2}",
            },
        },
        reviews: [
            "Breakfast buffet is highly rated and includes vegan options; guest review mentions vegan selections available. :contentReference[oaicite:3]{index=3}",
            "Modern hotel in Adlershof with good connectivity and vegan-friendly dining in the house.",
            "Convenient location near BER airport and S-bahnhof Adlershof; vegan breakfast and restaurant made the stay easier as a plant-based traveller.",
        ],
        safetyScore: {
            score: 76,
            category: "accommodation",
            reasoning: "Good level of vegan-friendly amenities (buffet clearly labelled vegan items, dedicated vegan options in restaurant) and sustainable operations, though not fully vegan property.",
            signals: {
                kitchen_safety: 70,
                bedding: 80,
                breakfast_quality: 78,
                host_knowledge: 74,
            },
            citations: [
                "Breakfast buffet includes vegan selections and clearly labelled vegan items. :contentReference[oaicite:4]{index=4}",
                "On-site restaurant offering vegan dishes (e.g. vegan bulgur salad). :contentReference[oaicite:5]{index=5}",
                "Hotel uses 100% renewable electricity. :contentReference[oaicite:6]{index=6}",
            ],
            analyzedAt: new Date("2025-11-16").toISOString(),
        },
        createdAt: new Date("2025-11-16"),
        updatedAt: new Date("2025-11-16"),
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

    {
        id: "tour-002",
        category: "tour",
        name: "Culinary City Tour Berlin Neukölln",
        description: "Guided walking tour through Berlin-Neukölln exploring hidden culinary gems and sampling international street food and snacks across a vibrant multi-cultural neighbourhood.",
        location: {
            address: "Meeting point: Richardplatz, Berlin-Neukölln, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.4953, lng: 13.4374 },
        },
        website: "https://www.eat-the-world.com/kulinarische-stadtfuehrung/berlin/neukoelln/",
        logistics: {
            schedule: {
                days: "Various (check availability on website)",
                time: "4:00 PM - 7:00 PM",
                duration: "3 hours",
                meeting_point: "Richardplatz, Neukölln (detailed directions provided after booking)",
            },
            booking: {
                required: true,
                methods: [
                    { type: "online", url: "https://www.eat-the-world.com/kulinarische-stadtfuehrung/berlin/neukoelln/", note: "Book via Eat the World platform" },
                    { type: "phone", contact: "+49 30 220 273 10", note: "Group enquiries & special dietary requests" },
                ],
                advance_notice: "Book at least 1-2 days ahead (groups up to ~16 people)",
                cancellation: "Free cancellation typically up to 24 h before tour",
            },
            pricing: {
                adult: "€59",
                student: "€49 (with valid ID)",
                includes: "Guided walk, ~6 tasting samples, city-map brochure",
                note: "Other dietary restrictions (e.g., gluten-free, vegan) must be specified at booking",
            },
            accessibility: {
                walking_distance: "Moderate (approx. 3 km, mostly flat terrain)",
                dietary_accommodations: ["vegetarian friendly; vegan and gluten-free options only if specified in advance"],
            },
            what_to_bring: ["Comfortable walking shoes", "Weather-appropriate clothing", "Appetite!"],
        },
        reviews: [
            "Wonderful tour! Guide was knowledgeable about the local food scene and pointed out hidden gems in Neukölln.",
            "Great variety of tastings and a fun mix of street food and café stops in a multi-cultural neighbourhood.",
            "Good introduction to Neukölln’s food culture; would allow earlier booking for vegan specific needs.",
        ],
        safetyScore: {
            score: 78,
            category: "tour",
            reasoning: "Well-organised food walking tour with several tastings, good local insight; vegan-specific accommodations possible but need to be requested in advance.",
            signals: {
                guide_expertise: 80,
                meal_handling: 75,
                hidden_exploitation: 70,
                group_dynamics: 80,
            },
            citations: [
                "3 hours outdoors, approx. 3 km to walk. :contentReference[oaicite:0]{index=0}",
                "Up to 6 tasting samples from various international food stops. :contentReference[oaicite:1]{index=1}",
                "Tour not barrier-free and dog participation not allowed. :contentReference[oaicite:2]{index=2}",
            ],
            analyzedAt: new Date("2025-11-16").toISOString(),
        },
        createdAt: new Date("2025-11-16"),
        updatedAt: new Date("2025-11-16"),
    },

    {
        id: "tour-003",
        category: "tour",
        name: "Culinary City Tour Berlin Kreuzberg",
        description: "Guided walking tour through Berlin-Kreuzberg, exploring multicultural streets, canals and hidden food spots with tastings at local eateries.",
        location: {
            address: "Meeting point: near Admiralbrücke / Graefekiez, Berlin-Kreuzberg, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.4935, lng: 13.4255 },
        },
        website: "https://www.eat-the-world.com/kulinarische-stadtfuehrung/berlin/kreuzberg/",
        logistics: {
            schedule: {
                days: "Various days (see online calendar)",
                time: "typically 11:00 AM - 2:00 PM or 2:00 PM - 5:00 PM (check booking page)",
                duration: "3 hours",
                meeting_point: "Exact meeting point in Kreuzberg (Graefekiez / Admiralbrücke area, detailed directions after booking)",
            },
            booking: {
                required: true,
                methods: [
                    {
                        type: "online",
                        url: "https://www.eat-the-world.com/kulinarische-stadtfuehrung/berlin/kreuzberg/",
                        note: "Book via Eat the World booking form",
                    },
                    {
                        type: "phone",
                        contact: "+49 30 220 273 10",
                        note: "Service hotline for group bookings and special dietary needs",
                    },
                ],
                advance_notice: "Book at least 1–2 days ahead (group size usually up to 16 participants)",
                cancellation: "Free cancellation usually up to 24 hours before the tour (depending on conditions)",
            },
            pricing: {
                adult: "€59",
                student: "€49 (if available; check current concessions)",
                includes: "Guided walk, up to 6 tastings in selected local venues",
                note: "Special dietary requirements (e.g. vegetarian, vegan, gluten-free) must be specified when booking",
            },
            accessibility: {
                walking_distance: "Approx. 3 km (mostly flat, urban sidewalks)",
                dietary_accommodations: [
                    "vegetarian possible",
                    "vegan and gluten-free only on prior request; not all stops can be adapted"
                ],
            },
            what_to_bring: [
                "Comfortable walking shoes",
                "Weather-appropriate clothing (tour runs in most weather conditions)",
                "Small bottle of water if needed"
            ],
        },
        reviews: [
            "Entertaining and informative tour that shows Kreuzberg’s history and multicultural food scene away from the usual tourist trails.",
            "Nice mix of stories about the district and several small tastings in cafés and snack bars; good way to get a feel for Kreuzberg.",
            "Well-organised and friendly guide; tour is mainly omnivorous, so vegans should inform the organiser early to adjust tastings where possible."
        ],
        safetyScore: {
            score: 75,
            category: "tour",
            reasoning: "Well-structured culinary walking tour with small group size and local guide knowledge; vegan participation is possible but requires advance coordination and not all stops are fully plant-based.",
            signals: {
                guide_expertise: 80,
                meal_handling: 72,
                hidden_exploitation: 68,
                group_dynamics: 80,
            },
            citations: [
                "3-hour outdoor tour with around 3 km walking and up to 6 tastings. :contentReference[oaicite:0]{index=0}",
                "Small groups usually up to 16 participants, not barrier-free. :contentReference[oaicite:1]{index=1}",
                "Culinary tour through Kreuzberg with local guide, exploring the Graefekiez and multicultural food. :contentReference[oaicite:2]{index=2}"
            ],
            analyzedAt: new Date("2025-11-16").toISOString(),
        },
        createdAt: new Date("2025-11-16"),
        updatedAt: new Date("2025-11-16"),
    },

    {
        id: "tour-004",
        category: "tour",
        name: "Blut und Borsten – Historic Slaughterhouse Walk",
        description: "Historical guided city walk through the former Berlin slaughterhouse site tracing the path of animals from arrival to processing, and exploring the industrial meat trade, labour history and early vegetarian movements.",
        location: {
            address: "Meeting point: Corner Eldenaer Str. / Pettenkoferstr., Berlin, Germany",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5264, lng: 13.4433 },
        },
        website: "http://www.berliner-spurensuche.de/fuehrungen/blut-und-borsten/",
        logistics: {
            schedule: {
                days: "Friday evenings (consult website for dates)",
                time: "5:00 PM - 7:00 PM",
                duration: "2 hours",
                meeting_point: "Corner Eldenaer Str. & Pettenkoferstr. (Berlin-Friedrichshain); detailed instructions supplied after booking",
            },
            booking: {
                required: true,
                methods: [
                    {
                        type: "online",
                        url: "http://www.berliner-spurensuche.de/fuehrungen/blut-und-borsten/",
                        note: "Booking via Berliner Spurensuche website",
                    },
                    {
                        type: "email",
                        contact: "szollhauser@berliner-spurensuche.de",
                        note: "For group bookings and further enquiries",
                    },
                ],
                advance_notice: "At least a few days ahead recommended; limited places",
                cancellation: "Free cancellation up to 24h prior (depending on tour conditions)",
            },
            pricing: {
                adult: "€15",
                reduced: "€12 (students/low income)",
                includes: "Guided walk, informational booklet",
                note: "Number of participants limited; registration required",
            },
            accessibility: {
                walking_distance: "Moderate (approx. 2 km on mostly paved historic industrial terrain)",
                dietary_accommodations: ["Not food-tasting tour, focus on industrial/urban history"],
            },
            what_to_bring: ["Comfortable shoes", "Weather-appropriate clothing", "Note-taking material if desired"],
        },
        reviews: [
            "A deep dive into Berlin’s meat-industrial past; the guide brought long-forgotten buildings and labour practices to life.",
            "Fascinating route through the old slaughterhouse site, with many original structures still visible and well explained.",
            "Great for those interested in Berlin’s hidden industrial and animal-processing history; not a typical culinary tour, so set expectations accordingly."
        ],
        safetyScore: {
            score: 80,
            category: "tour",
            reasoning: "Well-researched historical walk with specialist guide, clear route, and moderate physical demand; vegan-specific considerations minimal since it is non-food-tasting.",
            signals: {
                guide_expertise: 85,
                route_safety: 80,
                hidden_exploitation_awareness: 78,
                group_dynamics: 80,
            },
            citations: [
                "Walk begins at Eldenaer Str./Pettenkoferstr. and examines the industrial meat trade & labour history. ([FHXB Museum Newsletter Oct 2021])",
                "‘Blut und Borsten: eine historische Schlachthofbegehung’ - site of old slaughterhouse in Friedrichshain. ([berliner-spurensuche.de])"
            ],
            analyzedAt: new Date("2025-11-16").toISOString(),
        },
        createdAt: new Date("2025-11-16"),
        updatedAt: new Date("2025-11-16"),
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

    {
        id: "event-002",
        category: "event",
        name: "Berlin Vegan Community Meetup",
        description: "Regular gatherings organized by Berlin Vegan for community building, info sharing, and social connections",
        location: {
            address: "Various locations in Berlin (check Facebook for current venue)",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5200, lng: 13.4050 },
        },
        website: "https://www.facebook.com/BerlinVegan",
        logistics: {
            schedule: {
                frequency: "Regular events and meetups",
                time: "Various times - check Facebook for details",
                setup: "Community-organized events",
                weather: "Mostly indoor events",
            },
            next_dates: ["Check www.berlin-vegan.de/termine/ for current schedule"],
            entry: {
                cost: "Varies by event - often free or low cost",
                booking_required: "Check individual event details",
                note: "Great for networking and community building",
            },
            location_details: {
                address: "Various venues across Berlin",
                nearest_transit: "Depends on specific event location",
                parking: "Varies by venue",
            },
            community_info: {
                typical_attendance: "40-60 people",
                languages: "German and English spoken",
                age_range: "All ages welcome, mostly 25-45",
            },
            accessibility: {
                wheelchair: "Fully accessible venue",
                facilities: "Kitchen available, restrooms on same floor",
            },
        },
        reviews: [
            "Active vegan community in Berlin with regular events and great networking opportunities. Check their website for current events.",
            "Berlin Vegan is well-established in the community and organizes various types of events. Good resource for newcomers to the city.",
            "Reliable source for vegan events in Berlin. The Facebook page is regularly updated with community gatherings and activities.",
        ],
        safetyScore: {
            score: 88,
            category: "event",
            reasoning: "Well-established community organization with regular events, good networking opportunities, and reliable information sharing",
            signals: {
                food_quality: 82,
                accessibility: 85,
                community_vibe: 92,
                inclusivity: 90,
            },
            citations: ["Active vegan community in Berlin with regular events and great networking opportunities", "Good resource for newcomers to the city", "regularly updated with community gatherings and activities"],
            analyzedAt: new Date("2025-11-12").toISOString(),
        },
        createdAt: new Date("2025-11-08"),
        updatedAt: new Date("2025-11-15"),
    },

    {
        id: "event-003",
        category: "event",
        name: "Plant Based Berlin Events",
        description: "Community events and workshops promoting plant-based living, organized by Plant Based Berlin",
        location: {
            address: "Various locations in Berlin (check website for current events)",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5200, lng: 13.4050 },
        },
        website: "https://plantbased-berlin.de/",
        logistics: {
            schedule: {
                frequency: "Regular workshops and events",
                time: "Various times - check website",
                duration: "Varies by event type",
                weather: "Mostly indoor events",
            },
            next_dates: ["Check plantbased-berlin.de for current schedule"],
            entry: {
                cost: "Varies by event - workshops may have fees",
                advance_booking: "Required for most events",
                note: "Educational focus on plant-based lifestyle",
            },
            location_details: {
                address: "Various venues across Berlin",
                nearest_transit: "Depends on specific event location",
                parking: "Varies by venue",
            },
            event_types: {
                workshops: "Educational workshops on plant-based lifestyle",
                talks: "Expert presentations on nutrition and sustainability",
                networking: "Community building events",
                cooking: "Plant-based cooking classes and demos",
            },
            accessibility: {
                wheelchair: "Varies by venue - check individual event details",
                facilities: "Depends on specific venue",
            },
        },
        reviews: [
            "Great educational events about plant-based lifestyle. Well-organized workshops with knowledgeable presenters.",
            "Plant Based Berlin offers excellent resources for those transitioning to or maintaining a plant-based diet.",
            "Professional organization with regular events. Good networking opportunities and practical information.",
        ],
        safetyScore: {
            score: 92,
            category: "event",
            reasoning: "Professional organization with well-structured educational events, knowledgeable presenters, and good community networking opportunities",
            signals: {
                food_quality: 88,
                accessibility: 85,
                community_vibe: 95,
                inclusivity: 95,
            },
            citations: ["Well-organized workshops with knowledgeable presenters", "excellent resources for those transitioning to or maintaining a plant-based diet", "Good networking opportunities and practical information"],
            analyzedAt: new Date("2025-11-10").toISOString(),
        },
        createdAt: new Date("2025-11-05"),
        updatedAt: new Date("2025-11-15"),
    },

    {
        id: "event-004",
        category: "event",
        name: "Veggienale Berlin",
        description: "Trade fair for vegan lifestyle featuring exhibitors, food vendors, and sustainable living products",
        location: {
            address: "Berlin Exhibition Grounds (venue TBA for 2026)",
            city: "Berlin",
            country: "Germany",
            coordinates: { lat: 52.5200, lng: 13.4050 },
        },
        website: "https://veggienale.de/besuchen/berlin-2026/",
        logistics: {
            schedule: {
                frequency: "Annual trade fair",
                time: "10:00 AM - 6:00 PM",
                duration: "2-day weekend event",
                weather: "Indoor exhibition",
            },
            next_dates: ["2026 dates TBA - check website"],
            entry: {
                cost: "Entry fee applies - check website for pricing",
                booking_required: "Tickets available online",
                note: "Trade fair with vendors and exhibitors",
            },
            location_details: {
                address: "Exhibition venue TBA",
                nearest_transit: "Public transport access (details TBA)",
                parking: "Exhibition venue parking available",
            },
            exhibitor_info: {
                vendors: "Vegan food producers, lifestyle brands, sustainability companies",
                languages: "German primary, English support available",
                focus: "Trade fair format with commercial exhibitors",
            },
            accessibility: {
                wheelchair: "Exhibition venues typically accessible",
                facilities: "Standard exhibition facilities available",
            },
        },
        reviews: [
            "VeggieNale is a great trade fair for discovering new vegan products and sustainable brands. Good variety of exhibitors.",
            "Well-organized event for the vegan community. Good opportunity to learn about new products and companies in the space.",
            "Professional trade fair format with focus on vegan lifestyle and sustainability. Good networking for businesses and consumers.",
        ],
        safetyScore: {
            score: 89,
            category: "event",
            reasoning: "Professional trade fair with focus on vegan lifestyle, good variety of exhibitors, and networking opportunities for the community",
            signals: {
                food_quality: 85,
                accessibility: 90,
                community_vibe: 88,
                inclusivity: 92,
            },
            citations: ["great trade fair for discovering new vegan products and sustainable brands", "Well-organized event for the vegan community", "Good networking for businesses and consumers"],
            analyzedAt: new Date("2025-11-09").toISOString(),
        },
        createdAt: new Date("2025-11-07"),
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
