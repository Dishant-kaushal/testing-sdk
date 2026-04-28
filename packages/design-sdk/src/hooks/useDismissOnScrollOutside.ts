import { useEffect, type RefObject } from 'react';

/**
 * Close a portalled popover when the user scrolls or resizes — **unless**
 * the scroll originates inside the popover itself (e.g. scrolling a long
 * option list within a dropdown menu).
 *
 * Standard popover dismissal behaviour: once a popover is open, any page
 * scroll or window resize hides it, because the underlying layout has
 * changed and the popover's anchor position is no longer valid. This hook
 * is the canonical place to implement that — reuse it for every portalled
 * menu inside the Table (TableRowActions, TablePagination size picker, any
 * future editable-cell dropdown, etc.).
 *
 * ```ts
 * useDismissOnScrollOutside(menuRef, () => setOpen(false), open);
 * ```
 *
 * The scroll listener runs in the **capture** phase on `window` so it picks
 * up scroll events from any nested scroll container — the Table's
 * `.fds-table-surface__scroll` included.
 */
export function useDismissOnScrollOutside(
  menuRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  enabled: boolean,
): void {
  useEffect(() => {
    if (!enabled) return;

    const handleScroll = (e: Event) => {
      const target = e.target as Node | null;
      if (target && menuRef.current?.contains(target)) {
        // Scrolling inside the popover itself — keep it open.
        return;
      }
      onClose();
    };

    const handleResize = () => onClose();

    // Capture-phase scroll so we catch nested scroll containers too.
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled, menuRef, onClose]);
}
