/**
 * Product Service
 * 
 * Business logic for product-related API calls.
 * Separates API calls from components for better testability and reusability.
 */

import { apiClient } from './api';
import { PRODUCT_LIST_PAGE_SIZE } from '@/constants';

export const productService = {
  /**
   * Fetch all products with pagination and filters
   */
  async getProducts(page = 1, category = null, searchQuery = null) {
    const params = new URLSearchParams({
      page,
      limit: PRODUCT_LIST_PAGE_SIZE,
      ...(category && { category }),
      ...(searchQuery && { search: searchQuery }),
    });

    return apiClient.get(`/products?${params}`);
  },

  /**
   * Fetch single product by ID
   */
  async getProductById(id) {
    return apiClient.get(`/products/${id}`);
  },

  /**
   * Search products by query
   */
  async searchProducts(query, limit = 10) {
    return apiClient.get(`/products/search?q=${query}&limit=${limit}`);
  },

  /**
   * Get featured/trending products
   */
  async getFeaturedProducts() {
    return apiClient.get('/products/featured');
  },

  /**
   * Get product recommendations
   */
  async getRecommendations(productId) {
    return apiClient.get(`/products/${productId}/recommendations`);
  },
};
