import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Optimizes external Unsplash URLs to appropriate display dimensions and compression.
 * Prevents massive 2400px / 5MB image downloads by requesting calibrated sizes & WebP/AVIF.
 */
export function getOptimizedImageUrl(url: string | undefined | null, width = 800, quality = 75): string {
  if (!url) return 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=75';
  if (url.includes('images.unsplash.com')) {
    try {
      const u = new URL(url);
      u.searchParams.set('auto', 'format');
      u.searchParams.set('fit', 'crop');
      u.searchParams.set('w', width.toString());
      u.searchParams.set('q', quality.toString());
      return u.toString();
    } catch {
      return url;
    }
  }
  return url;
}

/**
 * Lightweight SVG shimmer placeholder for Next.js Image components.
 * Prevents empty content flash and layout shifts during image streaming.
 */
export const SHIMMER_BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMWExYTFhIiAvPjwvc3ZnPg==';

