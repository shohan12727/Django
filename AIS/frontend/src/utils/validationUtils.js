/**
 * Validation Utilities
 * 
 * Input validation and form validation utilities.
 */

import { VALIDATION_RULES } from '@/constants';

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password) => {
  return password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone) => {
  return VALIDATION_RULES.PHONE_REGEX.test(phone);
};

/**
 * Validate zip code (US format)
 */
export const isValidZipCode = (zipCode) => {
  return VALIDATION_RULES.ZIP_CODE_REGEX.test(zipCode);
};

/**
 * Validate URL
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
