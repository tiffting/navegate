// Simple, selective quick actions without AI dependency

// Check if content has enough detail for calendar export
function canExportToCalendar(content) {
  const lowerContent = content.toLowerCase();
  
  // Don't show export if AI is asking questions
  const isAskingQuestions = lowerContent.includes('could you please') ||
                           lowerContent.includes('would you like') ||
                           lowerContent.includes('what time') ||
                           lowerContent.includes('when do you') ||
                           lowerContent.includes('please share') ||
                           lowerContent.includes('to help you') ||
                           lowerContent.includes('with this information');
  
  if (isAskingQuestions) return false;
  
  // Must have specific venue names (indicates detailed recommendations)
  const hasSpecificVenues = lowerContent.includes('kopps') ||
                           lowerContent.includes('gratitude') ||
                           lowerContent.includes('alaska') ||
                           lowerContent.includes('a&o berlin') ||
                           lowerContent.includes('brammibal') ||
                           lowerContent.includes('michelberger hotel') ||
                           lowerContent.includes('1990 vegan living') ||
                           lowerContent.includes('+84 vietnamese');

  // Look for detailed travel plan indicators
  const hasTravelPlan = lowerContent.includes('here\'s a tailored') ||
                       lowerContent.includes('travel plan') ||
                       lowerContent.includes('vegan travel plan') ||
                       lowerContent.includes('accommodations') && lowerContent.includes('dining experiences') ||
                       lowerContent.includes('tours and activities');

  // Must have venue details (addresses, booking info, pricing)
  const hasVenueDetails = lowerContent.includes('booking:') ||
                         lowerContent.includes('location:') ||
                         lowerContent.includes('pricing:') ||
                         lowerContent.includes('hours:') ||
                         lowerContent.includes('check-in') ||
                         lowerContent.includes('address') ||
                         lowerContent.includes('safety signals') ||
                         (lowerContent.includes('score:') && lowerContent.includes('/100'));

  return hasSpecificVenues && hasTravelPlan && hasVenueDetails;
}

export async function POST(request) {
  try {
    const { lastMessage } = await request.json();

    // Input validation
    if (!lastMessage || typeof lastMessage.content !== 'string') {
      return Response.json({ error: "Last message is required" }, { status: 400 });
    }

    // Only show quick actions when they're genuinely helpful
    const suggestions = getSmartQuickActions(lastMessage.content);
    
    return Response.json({
      suggestions,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Quick actions API error:', error);
    
    return Response.json({
      suggestions: [],
      timestamp: new Date().toISOString(),
      error: true
    });
  }
}

// Smart quick actions - only show when genuinely helpful
function getSmartQuickActions(messageContent) {
  const content = messageContent.toLowerCase();
  
  // INTERVIEW QUESTIONS with clear enumerated options
  
  // Budget range question
  if (content.includes('budget range') || (content.includes('budget') && (content.includes('€') || content.includes('trip')))) {
    return ['€', '€€', '€€€', 'any'];
  }
  
  // Eating style question
  if (content.includes('eating style') || (content.includes('foodie') && content.includes('casual') && content.includes('efficient'))) {
    return ['foodie', 'casual', 'efficient'];
  }
  
  // Yes/No questions - Breakfast
  if (content.includes('include breakfast in your travel plans') || content.includes('breakfast') && content.includes('travel plans')) {
    return ['yes', 'no'];
  }
  
  // Yes/No questions - Wheelchair accessibility
  if (content.includes('wheelchair accessibility a requirement') || (content.includes('wheelchair') && content.includes('requirement'))) {
    return ['yes', 'no'];
  }
  
  // Transport modes (multiple choice) - only for the smart interview context
  if (content.includes('how do you prefer to get around') && 
      (content.includes('travel style') || content.includes('personalized recommendations') || content.includes('you can type "skip"'))) {
    return ['walking', 'public transit', 'taxi', 'walking, public transit'];
  }
  
  // Planning style (binary choice)
  if (content.includes('structured') && content.includes('flexible') || (content.includes('structured') && content.includes('itinerary'))) {
    return ['structured', 'flexible'];
  }
  
  // Dietary restrictions (common options)
  if (content.includes('dietary restrictions beyond veganism') || (content.includes('dietary restrictions') && content.includes('beyond'))) {
    return ['none', 'gluten-free', 'nut-free', 'gluten-free, nut-free'];
  }
  
  // CALENDAR EXPORT (when detailed itinerary is provided)
  if (canExportToCalendar(content)) {
    return ['📅 Export to Calendar'];
  }
  
  // CITY SELECTION (clear choice scenario)
  if (content.includes('which city would you like to explore') || 
      (content.includes('city') && content.includes('comprehensive data for berlin'))) {
    return ['Berlin', 'Amsterdam', 'Barcelona', 'Paris'];
  }
  
  // SKIP/CONTINUE options (when interview is mentioned)
  if (content.includes('you can type "skip"') || content.includes('continue without the interview')) {
    return ['skip'];
  }
  
  // NO QUICK ACTIONS for:
  // - Travel dates (too personal/specific)
  // - Open-ended responses (recommendations, explanations)
  // - Follow-up conversations
  // - Complex recommendations
  
  return []; // No quick actions needed
}