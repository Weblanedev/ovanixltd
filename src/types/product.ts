/**
 * Product type used across the app.
 * Maps from Google Books API response with mock price when API doesn't provide one.
 */
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  /** Authors from API (optional, for display) */
  authors?: string[];
}
