import { useEffect, useState, type RefObject } from 'react';

/**
 * Listens to a scroll container's `scrollLeft`. Sets a `data-scrolled` attr
 * on the element and returns the same boolean for context consumption.
 *
 * Phase 6 will use this to render a shadow on the right edge of frozen
 * columns when the table is scrolled horizontally.
 */
export function useStickyShadow(ref: RefObject<HTMLElement | null>): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const scrolled = el.scrollLeft > 0;
      setIsScrolled(scrolled);
      el.dataset.scrolled = scrolled ? 'true' : 'false';
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [ref]);

  return isScrolled;
}
