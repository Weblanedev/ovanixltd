import { create } from 'zustand';
import type { Product } from '../types';
import type { CartItem } from '../types/cart';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (product: Product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product, quantity }],
      };
    });
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    }));
  },

  updateQuantity: (productId: string, delta: number) => {
    set((state) => {
      const next = state.items
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0);
      return { items: next };
    });
  },

  clearCart: () => set({ items: [] }),
}));

/** Sum of all item quantities for badge and totals */
export function getCartTotalItemCount(state: CartState): number {
  return state.items.reduce((sum, i) => sum + i.quantity, 0);
}

export function getCartSubtotal(state: CartState): number {
  return state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
}
