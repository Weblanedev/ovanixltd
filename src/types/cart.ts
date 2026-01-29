import type { Product } from './product';

/**
 * Cart line item: product + quantity.
 */
export interface CartItem {
  product: Product;
  quantity: number;
}
