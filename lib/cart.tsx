'use client';

// ================================================================
// LA TOILE BLANCHE — Cart State Management
// ================================================================

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { CartItem, CartState, CartAction } from './types';

const STORAGE_KEY = 'ltb-cart';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.artworkId === action.artworkId);
      if (existing) {
        // Artworks are unique originals — quantity stays at 1
        return state;
      }
      return {
        items: [...state.items, { artworkId: action.artworkId, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter(i => i.artworkId !== action.artworkId),
      };
    }
    case 'CLEAR_CART': {
      return { items: [] };
    }
    default:
      return state;
  }
}

function loadCart(): CartState {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return { items: [] };
}

interface CartContextValue {
  state: CartState;
  addItem: (artworkId: string) => void;
  removeItem: (artworkId: string) => void;
  clearCart: () => void;
  itemCount: number;
  isInCart: (artworkId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [hydrated, setHydrated] = React.useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = loadCart();
    saved.items.forEach(item => {
      dispatch({ type: 'ADD_ITEM', artworkId: item.artworkId });
    });
    setHydrated(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, hydrated]);

  const addItem = useCallback((artworkId: string) => {
    dispatch({ type: 'ADD_ITEM', artworkId });
  }, []);

  const removeItem = useCallback((artworkId: string) => {
    dispatch({ type: 'REMOVE_ITEM', artworkId });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const isInCart = useCallback(
    (artworkId: string) => state.items.some(i => i.artworkId === artworkId),
    [state.items]
  );

  const value: CartContextValue = {
    state,
    addItem,
    removeItem,
    clearCart,
    itemCount: state.items.length,
    isInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
