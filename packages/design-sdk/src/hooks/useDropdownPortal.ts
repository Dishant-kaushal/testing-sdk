import { useLayoutEffect, useState, useEffect, useRef, useCallback, type RefObject } from 'react';
import { useDismissOnScrollOutside } from './useDismissOnScrollOutside';

export interface DropdownPos {
  top: number;
  left: number;
  width: number;
}

/**
 * Shared portal-positioning hook for all dropdown panels.
 * Returns a ref for the portal element and its fixed-position coordinates.
 * Wires click-outside (ignoring the trigger) and scroll/resize dismiss.
 */
export function useDropdownPortal(
  triggerRef: RefObject<HTMLElement | null>,
  open: boolean,
  onClose: () => void,
  gap = 4,
) {
  const portalRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<DropdownPos | null>(null);

  // Stable ref so the click-outside effect doesn't need onClose in its deps.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const stableClose = useCallback(() => onCloseRef.current(), []);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) {
      setPos(null);
      return;
    }
    const r = triggerRef.current.getBoundingClientRect();
    setPos({ top: r.bottom + gap, left: r.left, width: r.width });
  }, [open, triggerRef, gap]);

  useDismissOnScrollOutside(portalRef, stableClose, open);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (portalRef.current?.contains(target)) return;
      onCloseRef.current();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [open, triggerRef]);

  return { portalRef, pos };
}
