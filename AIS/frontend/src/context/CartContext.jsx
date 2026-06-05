/**
 * Cart Context Provider
 * 
 * Manages shopping cart state globally.
 * Provides methods to add/remove items, update quantities, and manage the cart.
 */

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@/constants';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart({ items: [], totalPrice: 0, totalItems: 0 });
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
      setCart({ items: [], totalPrice: 0, totalItems: 0 });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    }
  }, [cart]);

  const addItem = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.productId === product.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = prevCart.items.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [
          ...prevCart.items,
          {
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            quantity,
            product,
          },
        ];
      }

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return { ...prevCart, items: updatedItems, totalItems, totalPrice };
    });
  };

  const removeItem = (itemId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== itemId);
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return { ...prevCart, items: updatedItems, totalItems, totalPrice };
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return { ...prevCart, items: updatedItems, totalItems, totalPrice };
    });
  };

  const clearCart = () => {
    setCart({ items: [], totalPrice: 0, totalItems: 0 });
  };

  const value = {
    cart,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
