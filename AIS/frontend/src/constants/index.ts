/**
 * Global Constants
 * 
 * Centralized constants prevent magic strings/numbers scattered across the codebase.
 * This improves maintainability, makes refactoring easier, and ensures consistency.
 */

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
export const API_TIMEOUT = 30000; // 30 seconds

// ============================================================================
// PAGINATION
// ============================================================================

export const DEFAULT_PAGE_SIZE = 20;
export const PRODUCT_LIST_PAGE_SIZE = 12;
export const WISHLIST_PAGE_SIZE = 20;

// ============================================================================
// CURRENCY & PRICING
// ============================================================================

export const CURRENCY_SYMBOL = '$';
export const CURRENCY_CODE = 'USD';
export const TAX_RATE = 0.08; // 8%
export const SHIPPING_COST = 10;
export const FREE_SHIPPING_THRESHOLD = 100;

// ============================================================================
// LOCAL STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  USER: 'user',
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  CART: 'cart',
  WISHLIST: 'wishlist',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
} as const;

// ============================================================================
// UI BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

// ============================================================================
// NAVIGATION ROUTES
// ============================================================================

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  WISHLIST: '/wishlist',
  CHECKOUT: '/checkout',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  ORDERS: '/dashboard/orders',
  ADDRESSES: '/dashboard/addresses',
  ADMIN: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_USERS: '/admin/users',
  NOT_FOUND: '/404',
} as const;

// ============================================================================
// PRODUCT CATEGORIES
// ============================================================================

export const PRODUCT_CATEGORIES = {
  GAMING: 'Gaming',
  ULTRABOOK: 'Ultrabook',
  WORKSTATION: 'Workstation',
  BUDGET: 'Budget',
  CHROMEBOOK: 'Chromebook',
  TOUCHSCREEN: 'Touchscreen',
} as const;

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  PHONE_REGEX: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  ZIP_CODE_REGEX: /^\d{5}(-\d{4})?$/,
} as const;

// ============================================================================
// CACHE DURATIONS (in milliseconds)
// ============================================================================

export const CACHE_DURATIONS = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const;

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================

export const TOAST_DURATION = 3000; // 3 seconds

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
} as const;

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURE_FLAGS = {
  ENABLE_WISHLIST: true,
  ENABLE_GUEST_CHECKOUT: true,
  ENABLE_SOCIAL_LOGIN: false,
  ENABLE_LIVE_CHAT: false,
  ENABLE_PRODUCT_REVIEWS: true,
} as const;
