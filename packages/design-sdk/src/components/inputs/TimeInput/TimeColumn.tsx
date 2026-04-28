import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../../utils/cn';
import './TimeColumn.css';

export interface TimeColumnProps {
  /** Accessible label for the scroll list (e.g. "Hours") */
  label: string;
  /** Display strings for each row (e.g. ['01', '02', …, '12']) */
  items: readonly string[];
  /** Index of the currently-selected item */
  selectedIndex: number;
  /** Called when the user clicks, key-selects, or scrolls a new row onto the band */
  onSelect: (index: number) => void;
  /** When true, scrolls the selected row under the band on mount and when selectedIndex changes */
  scrollToSelected?: boolean;
  className?: string;
}

/* ───────────────────────────────────────────────────────────────────────────
   Geometry — MUST stay in sync with TimeColumn.css
   Figma 3155:10656 — cell is 28px tall (4px top-pad + 20px line-height + 4px bot-pad)
   ─────────────────────────────────────────────────────────────────────────── */
const ROW_HEIGHT = 28;
const BAND_TOP = 68;
const BAND_HEIGHT = 28;

/** Borrowed from Blade SpinWheel — 300ms guard window around scrollIntoView */
const PROGRAMMATIC_SCROLL_GUARD_MS = 300;

export const TimeColumn = forwardRef<HTMLDivElement, TimeColumnProps>(
  ({ label, items, selectedIndex, onSelect, scrollToSelected = true, className }, ref) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    // Suppresses onSelect during programmatic scrollTo (opening the popover
    // or responding to an external `value` prop change) so the ensuing scroll
    // event doesn't feed back into setDraft.
    const isProgrammaticRef = useRef(false);
    const programmaticTimeoutRef = useRef<number | null>(null);

    // Tracks the last index WE committed from a user scroll. The prop-sync
    // effect only snaps when the incoming prop differs from this — i.e. the
    // change came from outside (parent value prop), not from our own scroll.
    const lastCommittedRef = useRef(selectedIndex);

    const snapToSelected = useCallback((behavior: ScrollBehavior = 'smooth') => {
      const scroll = scrollRef.current;
      if (!scroll) return;
      isProgrammaticRef.current = true;
      if (programmaticTimeoutRef.current !== null) {
        window.clearTimeout(programmaticTimeoutRef.current);
      }
      scroll.scrollTo({ top: selectedIndex * ROW_HEIGHT, behavior });
      programmaticTimeoutRef.current = window.setTimeout(() => {
        isProgrammaticRef.current = false;
      }, PROGRAMMATIC_SCROLL_GUARD_MS);
    }, [selectedIndex]);

    // Prop-sync: only snap when the parent drove the change, not when our
    // own scroll already landed on this index.
    useEffect(() => {
      if (!scrollToSelected) return;
      if (selectedIndex === lastCommittedRef.current) return;
      lastCommittedRef.current = selectedIndex;
      snapToSelected('smooth');
    }, [scrollToSelected, selectedIndex, snapToSelected]);

    // Initial snap — BEFORE the browser paints, so the selected row is already
    // on the highlight band at first frame. Uses direct scrollTop assignment
    // instead of scrollTo() to bypass the CSS scroll-behavior: smooth animation
    // and avoid a visible scroll on first open.
    useLayoutEffect(() => {
      const scroll = scrollRef.current;
      if (!scroll) return;
      isProgrammaticRef.current = true;
      scroll.scrollTop = selectedIndex * ROW_HEIGHT;
      if (programmaticTimeoutRef.current !== null) {
        window.clearTimeout(programmaticTimeoutRef.current);
      }
      programmaticTimeoutRef.current = window.setTimeout(() => {
        isProgrammaticRef.current = false;
      }, 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(
      () => () => {
        if (programmaticTimeoutRef.current !== null) {
          window.clearTimeout(programmaticTimeoutRef.current);
        }
      },
      [],
    );

    // Live active-row detection via elementFromPoint at the band centre —
    // matches Blade's SpinWheel approach for real-time visual feedback.
    const handleScroll = useCallback(() => {
      if (isProgrammaticRef.current) return;
      const scroll = scrollRef.current;
      if (!scroll) return;
      const rect = scroll.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + BAND_TOP + BAND_HEIGHT / 2;
      const el = document.elementFromPoint(x, y);
      if (!el) return;
      const rowEl = (el as HTMLElement).closest<HTMLElement>('[data-time-row-index]');
      if (!rowEl) return;
      const raw = Number(rowEl.dataset.timeRowIndex);
      if (Number.isNaN(raw)) return;
      const clamped = Math.max(0, Math.min(raw, items.length - 1));
      if (clamped === selectedIndex) return;
      // Mark this index as user-driven so the prop-sync effect doesn't re-snap.
      lastCommittedRef.current = clamped;
      onSelect(clamped);
    }, [selectedIndex, items.length, onSelect]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            onSelect(Math.min(selectedIndex + 1, items.length - 1));
            break;
          case 'ArrowUp':
            e.preventDefault();
            onSelect(Math.max(selectedIndex - 1, 0));
            break;
          case 'Home':
            e.preventDefault();
            onSelect(0);
            break;
          case 'End':
            e.preventDefault();
            onSelect(items.length - 1);
            break;
        }
      },
      [selectedIndex, items.length, onSelect],
    );

    return (
      <div ref={ref} className={cn('fds-time-column', className)}>
        {/* Fixed highlight band — stays put while the scrolling rows move beneath */}
        <div className="fds-time-column__highlight" aria-hidden="true" />

        <div
          ref={scrollRef}
          className="fds-time-column__scroll"
          role="listbox"
          aria-label={label}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
        >
          <div className="fds-time-column__spacer fds-time-column__spacer--top" aria-hidden="true" />
          {items.map((display, i) => {
            const isOnBand = i === selectedIndex;
            return (
              <button
                key={i}
                type="button"
                role="option"
                aria-selected={isOnBand}
                data-time-row-index={i}
                className={cn(
                  'fds-time-column__cell',
                  isOnBand ? 'BodyMediumSemibold' : 'BodyMediumRegular',
                  isOnBand && 'fds-time-column__cell--on-band',
                )}
                onClick={() => onSelect(i)}
              >
                {display}
              </button>
            );
          })}
          <div className="fds-time-column__spacer fds-time-column__spacer--bottom" aria-hidden="true" />
        </div>
      </div>
    );
  },
);

TimeColumn.displayName = 'TimeColumn';
