import {
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { PopoverContext, type PopoverContextValue } from './PopoverContext';
import './Popover.css';

export type PopoverPlacement =
  | 'Top' | 'Top Start' | 'Top End'
  | 'Right' | 'Right Start' | 'Right End'
  | 'Bottom' | 'Bottom Start' | 'Bottom End'
  | 'Left' | 'Left Start' | 'Left End';

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Element that opens the popover (button, link, avatar, etc.) */
  trigger: ReactNode;
  /** Popover content — typically `<PopoverHeader />`, `<PopoverBody />`, `<PopoverFooter />`.
   *  Popovers always include actions, so a `<PopoverFooter />` is expected. */
  children: ReactNode;
  /** Controlled open state */
  isOpen?: boolean;
  /** Called whenever the open state should change (controlled + uncontrolled) */
  onOpenChange?: (open: boolean) => void;
  /** Starting open state for uncontrolled usage */
  defaultOpen?: boolean;
  /** Position relative to the trigger. Default `'Bottom'`. Figma 778:8023 covers all 12. */
  placement?: PopoverPlacement;
  /** Render the arrow pointing at the trigger. Default `true`. */
  showArrow?: boolean;
  /** Disables the trigger. Popover cannot open. */
  isDisabled?: boolean;
  /** Accessibility label for the popover panel (falls back to the header title when available) */
  'aria-label'?: string;
}

const PLACEMENT_CLASS: Record<PopoverPlacement, string> = {
  'Top': 'fds-popover--top',
  'Top Start': 'fds-popover--top-start',
  'Top End': 'fds-popover--top-end',
  'Right': 'fds-popover--right',
  'Right Start': 'fds-popover--right-start',
  'Right End': 'fds-popover--right-end',
  'Bottom': 'fds-popover--bottom',
  'Bottom Start': 'fds-popover--bottom-start',
  'Bottom End': 'fds-popover--bottom-end',
  'Left': 'fds-popover--left',
  'Left Start': 'fds-popover--left-start',
  'Left End': 'fds-popover--left-end',
};

/* ═══════════════════════════════════════════════════════════════════════════
   Popover — Faclon Design System 2.0
   Figma: 778:8023 (popover + 12 placements) + 778:8461 (header) + 778:8451 (footer)
   ═══════════════════════════════════════════════════════════════════════════ */

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      trigger,
      children,
      isOpen: controlledOpen,
      onOpenChange,
      defaultOpen = false,
      placement = 'Bottom',
      showArrow = true,
      isDisabled = false,
      className,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const panelId = idProp ?? `${autoId}-panel`;

    /* ── Controlled / uncontrolled open state ───────────────────────────── */
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const open = isControlled ? controlledOpen : internalOpen;

    const setOpen = useCallback(
      (next: boolean) => {
        if (isDisabled && next) return;
        if (!isControlled) setInternalOpen(next);
        onOpenChange?.(next);
      },
      [isControlled, onOpenChange, isDisabled],
    );

    const close = useCallback(() => setOpen(false), [setOpen]);

    /* ── Outside-click + Escape ─────────────────────────────────────────── */
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(wrapperRef, () => {
      if (open) close();
    });
    useKeyboard('Escape', close, open);

    /* ── Trigger click handler (click is the only supported trigger) ──── */
    const handleTriggerClick = useCallback(() => {
      setOpen(!open);
    }, [open, setOpen]);

    /* ── Context: expose close() to PopoverHeader ───────────────────────── */
    const contextValue = useMemo<PopoverContextValue>(() => ({ close }), [close]);

    return (
      <div
        ref={(node) => {
          wrapperRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn('fds-popover', className)}
        {...props}
      >
        <div
          className="fds-popover__trigger"
          onClick={handleTriggerClick}
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-haspopup="dialog"
        >
          {trigger}
        </div>

        {open && (
          <PopoverContext.Provider value={contextValue}>
            <div
              id={panelId}
              role="dialog"
              className={cn('fds-popover__panel', PLACEMENT_CLASS[placement])}
            >
              {showArrow && (
                <svg
                  className="fds-popover__arrow"
                  viewBox="0 0 25.8 12.4858"
                  aria-hidden="true"
                  focusable="false"
                >
                  {/* Fill — rounded-apex triangle (apex DOWN by default, for Top placement).
                      Path taken directly from Figma 778:8439. */}
                  <path
                    d="M12.1929 12.1929L0 0H25.8L13.6071 12.1929C13.2166 12.5834 12.5834 12.5834 12.1929 12.1929Z"
                    fill="var(--background-surface-intense)"
                  />
                  {/* Border — rendered as a filled thin-outline path that traces only the
                      two diagonals (with rounded apex), inset 1 px so it sits inside the fill.
                      Path taken from Figma 778:8440, offset (1, 1) to match the Figma layer. */}
                  <path
                    d="M1.67285 0.5L11.0166 9.83984C11.5046 10.3273 12.2952 10.3273 12.7832 9.83984L22.127 0.5H22.5928L12.2529 10.8389C12.0577 11.0341 11.7411 11.0341 11.5459 10.8389L1.20703 0.5H1.67285Z"
                    fill="var(--border-gray-muted)"
                    transform="translate(1 1)"
                  />
                </svg>
              )}
              {children}
            </div>
          </PopoverContext.Provider>
        )}
      </div>
    );
  },
);

Popover.displayName = 'Popover';
