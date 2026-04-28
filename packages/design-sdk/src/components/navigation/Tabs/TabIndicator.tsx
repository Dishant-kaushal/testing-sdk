import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useTabsContext } from './TabsContext';
import './TabIndicator.css';

/**
 * Sliding selected-tab indicator. Single shared element used by ALL 3 variants:
 * - Bordered/Borderless: thin line at the bottom (horizontal) / left (vertical) edge.
 * - Filled: full-size pill that slides between tabs (matches Blade's segmented control).
 *
 * Measures the selected tab via context's `getItemEl`, applies position +
 * size inline, and re-measures on tablist resize via ResizeObserver.
 */
export function TabIndicator() {
  const ctx = useTabsContext();
  const indicatorRef = useRef<HTMLSpanElement>(null);
  /** Suppress the very first transition so the indicator renders at its
   *  initial position instead of sliding in from (0, 0). */
  const indicatorReadyRef = useRef(false);

  const updateIndicator = useCallback(() => {
    const indicator = indicatorRef.current;
    if (!indicator) return;
    if (!ctx.selectedValue) {
      indicator.style.opacity = '0';
      return;
    }
    const selectedEl = ctx.getItemEl(ctx.selectedValue);
    if (!selectedEl) return;

    const isFirstPaint = !indicatorReadyRef.current;
    if (isFirstPaint) {
      indicator.style.transitionProperty = 'none';
    }

    if (ctx.variant === 'Filled') {
      // Full pill — both axes track the selected tab's box.
      indicator.style.transform = `translate(${selectedEl.offsetLeft}px, ${selectedEl.offsetTop}px)`;
      indicator.style.width = `${selectedEl.offsetWidth}px`;
      indicator.style.height = `${selectedEl.offsetHeight}px`;
    } else if (ctx.orientation === 'Horizontal') {
      indicator.style.transform = `translateX(${selectedEl.offsetLeft}px)`;
      indicator.style.width = `${selectedEl.offsetWidth}px`;
      indicator.style.height = '';
    } else {
      indicator.style.transform = `translateY(${selectedEl.offsetTop}px)`;
      indicator.style.height = `${selectedEl.offsetHeight}px`;
      indicator.style.width = '';
    }
    // Filled bg comes from CSS (background-brand-secondary). Bordered/Borderless
    // bg is the brand line; disabled selected uses the disabled brand colour.
    if (ctx.variant === 'Filled') {
      indicator.style.backgroundColor = '';
    } else {
      indicator.style.backgroundColor = selectedEl.disabled
        ? 'var(--text-brand-disabled)'
        : '';
    }
    indicator.style.opacity = '1';

    if (isFirstPaint) {
      void indicator.offsetWidth;
      indicator.style.transitionProperty = '';
      indicatorReadyRef.current = true;
    }
  }, [ctx]);

  useLayoutEffect(() => {
    updateIndicator();
  });

  useEffect(() => {
    const tablistEl = indicatorRef.current?.parentElement;
    if (!tablistEl || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => updateIndicator());
    observer.observe(tablistEl);
    return () => observer.disconnect();
  }, [updateIndicator]);

  return <span ref={indicatorRef} className="fds-tabs__indicator" aria-hidden="true" />;
}

TabIndicator.displayName = 'TabIndicator';
