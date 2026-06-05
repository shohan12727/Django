/**
 * useNavigation - Custom Hook
 * 
 * Provides navigation utilities and hooks for programmatic navigation.
 * Useful for handling navigation after actions (add to cart, login, etc.).
 */

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';

export const useNavigation = () => {
  const router = useRouter();

  return {
    goHome: () => router.push(ROUTES.HOME),
    goProducts: () => router.push(ROUTES.PRODUCTS),
    goProductDetail: (id) => router.push(`/products/${id}`),
    goCart: () => router.push(ROUTES.CART),
    goCheckout: () => router.push(ROUTES.CHECKOUT),
    goLogin: () => router.push(ROUTES.LOGIN),
    goDashboard: () => router.push(ROUTES.DASHBOARD),
    goBack: () => router.back(),
    push: (path) => router.push(path),
  };
};
