import type { Product } from '../types';

const GOOGLE_BOOKS_BASE = 'https://www.googleapis.com/books/v1';

/** Raw volume from Google Books API */
interface VolumeItem {
  id: string;
  volumeInfo?: {
    title?: string;
    description?: string;
    authors?: string[];
    imageLinks?: { thumbnail?: string; smallThumbnail?: string };
  };
}

/** Generate a stable mock price from book id (no real payment). */
function mockPriceFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash << 5) - hash + id.charCodeAt(i);
  return 9.99 + (Math.abs(hash) % 50);
}

/**
 * Maps a Google Books volume to our Product type.
 * Adds mock price when API doesn't provide one.
 */
function mapVolumeToProduct(volume: VolumeItem): Product {
  const vi = volume.volumeInfo ?? {};
  const title = vi.title ?? 'Untitled';
  const description = vi.description ?? '';
  const authors = vi.authors;
  const image =
    vi.imageLinks?.thumbnail?.replace('http://', 'https://') ??
    vi.imageLinks?.smallThumbnail?.replace('http://', 'https://') ??
    '';

  return {
    id: volume.id,
    title,
    description,
    price: mockPriceFromId(volume.id),
    image: image || 'https://via.placeholder.com/128x192?text=No+cover',
    authors,
  };
}

export interface FetchBooksResult {
  products: Product[];
  totalItems: number;
}

/**
 * Fetches books from Google Books API and returns normalized products.
 * Uses mock prices; no API key required for public volumes list.
 */
export async function fetchBooks(options?: {
  query?: string;
  maxResults?: number;
}): Promise<FetchBooksResult> {
  const query = options?.query ?? 'business technology';
  const maxResults = Math.min(options?.maxResults ?? 24, 40);

  const url = `${GOOGLE_BOOKS_BASE}/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Books API error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as {
    items?: VolumeItem[];
    totalItems?: number;
  };

  const items = data.items ?? [];
  const products = items
    .filter((v) => v.id && v.volumeInfo?.title)
    .map(mapVolumeToProduct);

  return {
    products,
    totalItems: data.totalItems ?? 0,
  };
}

/**
 * Fetches a single book by ID (e.g. when opening /products/:id directly).
 */
export async function fetchBookById(id: string): Promise<Product | null> {
  const url = `${GOOGLE_BOOKS_BASE}/volumes/${encodeURIComponent(id)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const volume = (await res.json()) as VolumeItem;
  if (!volume?.id) return null;
  return mapVolumeToProduct(volume);
}
