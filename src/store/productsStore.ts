import { create } from 'zustand';
import type { Product } from '../types';
import { fetchBooks, fetchBookById } from '../services/booksApi';

interface ProductsState {
  products: Product[];
  productById: Record<string, Product>;
  loading: boolean;
  error: string | null;
  fetchProducts: (query?: string) => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
  getProductById: (id: string) => Product | undefined;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  productById: {},
  loading: false,
  error: null,

  fetchProducts: async (query = 'business technology') => {
    set({ loading: true, error: null });
    try {
      const { products } = await fetchBooks({ query, maxResults: 24 });
      set({ products, loading: false });
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : 'Failed to load products',
        loading: false,
      });
    }
  },

  fetchProductById: async (id: string) => {
    const existing = get().products.find((p) => p.id === id) ?? get().productById[id];
    if (existing) return existing;
    try {
      const product = await fetchBookById(id);
      if (product) {
        set((s) => ({
          productById: { ...s.productById, [id]: product },
        }));
        return product;
      }
    } catch {
      // ignore
    }
    return null;
  },

  getProductById: (id: string) => {
    return get().products.find((p) => p.id === id) ?? get().productById[id];
  },
}));
