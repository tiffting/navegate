// Core business types for VeganBnB platform

// ============================================================================
// CORE DOMAIN TYPES
// ============================================================================

/**
 * The four main categories of vegan travel listings
 */
export type Category = 'restaurant' | 'accommodation' | 'tour' | 'event';

/**
 * Core listing data structure for all categories
 */
export interface Listing {
  id: string;
  category: Category;
  name: string;
  description?: string;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  website?: string;
  bookingUrl?: string;
  reviews: string[]; // Array of review excerpts
  safetyScore?: SafetyScore;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// AI ANALYSIS TYPES
// ============================================================================

/**
 * AI-generated safety analysis with category-specific signals
 */
export interface SafetyScore {
  score: number; // 0-100 overall safety rating
  category: Category;
  reasoning: string; // AI explanation of the score
  signals: CategorySignals; // Category-specific safety indicators
  citations: string[]; // Quotes from reviews that support the analysis
  analyzedAt: Date;
}

/**
 * Category-adaptive safety signals (0-100 each)
 */
export type CategorySignals = 
  | RestaurantSignals 
  | AccommodationSignals 
  | TourSignals 
  | EventSignals;

export interface RestaurantSignals {
  cross_contamination: number; // Prevention of cross-contamination
  staff_knowledge: number; // Staff knowledge about vegan requirements  
  ingredient_transparency: number; // Clear ingredient information
  community_trust: number; // Community trust indicators
}

export interface AccommodationSignals {
  kitchen_safety: number; // Shared kitchen cross-contamination handling
  bedding: number; // Animal-free bedding materials
  breakfast_quality: number; // Vegan breakfast quality and variety
  host_knowledge: number; // Host knowledge of dietary needs
}

export interface TourSignals {
  guide_expertise: number; // Guide knowledge of veganism
  meal_handling: number; // Meal/food handling during tour
  hidden_exploitation: number; // Avoidance of hidden animal exploitation
  group_dynamics: number; // Group accommodation of dietary restrictions
}

export interface EventSignals {
  food_quality: number; // Food quality and variety
  accessibility: number; // Allergen/dietary accommodation
  community_vibe: number; // Community atmosphere
  inclusivity: number; // Accessibility and inclusivity
}

// ============================================================================
// API TYPES
// ============================================================================

/**
 * Request to analyze reviews for a specific category
 */
export interface AnalyzeRequest {
  category: Category;
  reviews: string[];
  listingId?: string;
}

/**
 * Response from AI analysis
 */
export interface AnalyzeResponse {
  success: boolean;
  safetyScore?: SafetyScore;
  error?: string;
}

/**
 * Chatbot conversation types
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    listingReferences?: string[]; // Referenced listing IDs
    category?: Category;
  };
}

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
  userLocation?: string;
}

export interface ChatResponse {
  success: boolean;
  message?: ChatMessage;
  listingRecommendations?: Listing[];
  error?: string;
}

// ============================================================================
// USER & AUTH TYPES  
// ============================================================================

/**
 * User account information
 */
export interface User {
  id: string;
  email: string;
  displayName?: string;
  preferences?: UserPreferences;
  createdAt: Date;
}

/**
 * User travel and dietary preferences
 */
export interface UserPreferences {
  dietaryRestrictions?: string[]; // e.g., ['gluten-free', 'nut-free']
  preferredCategories?: Category[];
  homeLocation?: string;
  travelStyle?: 'budget' | 'mid-range' | 'luxury';
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

/**
 * Pagination for listing queries
 */
export interface PaginationParams {
  page: number;
  limit: number;
  category?: Category;
  city?: string;
}

/**
 * Search and filter parameters
 */
export interface SearchParams extends PaginationParams {
  query?: string;
  minSafetyScore?: number;
  hasReviews?: boolean;
  sortBy?: 'score' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}