/**
 * Components Barrel Export
 * 
 * Central hub for all component imports. This prevents scattered imports
 * and makes it easy for new team members to discover available components.
 * 
 * Organization:
 * - UI: Base reusable components (Button, Input, Card, Modal)
 * - Shared: Layout components used across pages (Navbar, Footer, Sidebar)
 * - Features: Feature-specific components (in features folder)
 * 
 * USAGE:
 * import { Button, Navbar, Input } from '@/components';
 * import { ProductCard } from '@/features/product-catalog/components';
 */

// UI Components - Base, reusable components
export { Button, Card, Input, Modal } from './ui';

// Shared Components - Layout and cross-page components
export { Navbar } from './shared';
