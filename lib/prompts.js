export const CATEGORY_PROMPTS = {
    restaurant: (reviews) => `Analyze these restaurant reviews for vegan safety signals:
- Cross-contamination prevention
- Staff knowledge about vegan requirements
- Ingredient transparency
- Community trust indicators

Reviews:
${reviews.join("\n\n")}

Output ONLY valid JSON with NO markdown formatting, NO backticks, NO explanatory text. Just the raw JSON object:
{
  "score": [number 0-100],
  "category": "restaurant",
  "reasoning": "[brief explanation]",
  "signals": {
    "cross_contamination": [number 0-100],
    "staff_knowledge": [number 0-100],
    "ingredient_transparency": [number 0-100],
    "community_trust": [number 0-100]
  },
  "citations": ["[quote from review]", "[another quote]"]
}`,

    accommodation: (reviews) => `Analyze these accommodation reviews for vegan traveler safety:
- Shared kitchen cross-contamination handling
- Bedding materials (animal-free)
- Vegan breakfast quality
- Host knowledge of veganism
- Nearby vegan restaurant access

Reviews:
${reviews.join("\n\n")}

Output ONLY valid JSON with NO markdown formatting, NO backticks, NO explanatory text. Just the raw JSON object:
{
  "score": [number 0-100],
  "category": "accommodation",
  "reasoning": "[brief explanation]",
  "signals": {
    "kitchen_safety": [number 0-100],
    "bedding": [number 0-100],
    "breakfast_quality": [number 0-100],
    "host_knowledge": [number 0-100]
  },
  "citations": ["[quote from review]", "[another quote]"]
}`,

    tour: (reviews) => `Analyze these tour reviews for vegan safety:
- Guide knowledge of veganism
- Meal/food handling during tour
- Hidden animal exploitation in activities
- Accommodation of dietary restrictions
- Group dynamics and inclusivity

Reviews:
${reviews.join("\n\n")}

Output ONLY valid JSON with NO markdown formatting, NO backticks, NO explanatory text. Just the raw JSON object:
{
  "score": [number 0-100],
  "category": "tour",
  "reasoning": "[brief explanation]",
  "signals": {
    "guide_expertise": [number 0-100],
    "meal_handling": [number 0-100],
    "hidden_exploitation": [number 0-100],
    "group_dynamics": [number 0-100]
  },
  "citations": ["[quote from review]", "[another quote]"]
}`,

    event: (reviews) => `Analyze these event reviews for vegan attendee experience:
- Food quality and variety
- Allergen/dietary accommodation
- Community atmosphere
- Accessibility and inclusivity

Reviews:
${reviews.join("\n\n")}

Output ONLY valid JSON with NO markdown formatting, NO backticks, NO explanatory text. Just the raw JSON object:
{
  "score": [number 0-100],
  "category": "event",
  "reasoning": "[brief explanation]",
  "signals": {
    "food_quality": [number 0-100],
    "accessibility": [number 0-100],
    "community_vibe": [number 0-100],
    "inclusivity": [number 0-100]
  },
  "citations": ["[quote from review]", "[another quote]"]
}`,
};
