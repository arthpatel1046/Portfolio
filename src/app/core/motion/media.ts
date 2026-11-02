/** True when the media query matches. False where matchMedia doesn't exist (e.g. unit tests). */
export function matchesMedia(query: string): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(query).matches;
}

export function prefersReducedMotion(): boolean {
  return matchesMedia('(prefers-reduced-motion: reduce)');
}