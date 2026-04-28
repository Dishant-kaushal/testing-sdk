import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useId,
  isValidElement,
  cloneElement,
  type ReactNode,
  type ReactElement,
  type HTMLAttributes,
} from 'react';
import { cn } from '../../../utils/cn';
import { useKeyboard } from '../../../hooks/useKeyboard';
import './Tooltip.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type TooltipPlacement =
  | 'Top'
  | 'TopStart'
  | 'TopEnd'
  | 'Bottom'
  | 'BottomStart'
  | 'BottomEnd'
  | 'Left'
  | 'Right';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Tooltip body text */
  bodyText: string;
  /** Optional heading text */
  heading?: string;
  /** Placement relative to trigger */
  placement?: TooltipPlacement;
  /** Controlled visibility — overrides hover/focus when provided */
  isOpen?: boolean;
  /** Delay in ms before showing (default 200) */
  showDelay?: number;
  /** Delay in ms before hiding (default 0) */
  hideDelay?: number;
  /** Max width of the tooltip content (default 200px) */
  maxWidth?: number | string;
  /** Trigger element(s) */
  children: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Placement → CSS modifier mapping
   ═══════════════════════════════════════════════════════════════════════════ */

const PLACEMENT_CLASS: Record<TooltipPlacement, string> = {
  Top: 'fds-tooltip--top',
  TopStart: 'fds-tooltip--top-start',
  TopEnd: 'fds-tooltip--top-end',
  Bottom: 'fds-tooltip--bottom',
  BottomStart: 'fds-tooltip--bottom-start',
  BottomEnd: 'fds-tooltip--bottom-end',
  Left: 'fds-tooltip--left',
  Right: 'fds-tooltip--right',
};

/* ═══════════════════════════════════════════════════════════════════════════
   Tooltip
   Figma: 776:4283
   ═══════════════════════════════════════════════════════════════════════════ */

export function Tooltip({
  bodyText,
  heading,
  placement = 'Top',
  isOpen: controlledOpen,
  showDelay = 200,
  hideDelay = 0,
  maxWidth,
  children,
  className,
  ...props
}: TooltipProps) {
  const tooltipId = useId();
  const [internalOpen, setInternalOpen] = useState(false);
  const showTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hideTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const open = controlledOpen ?? internalOpen;

  const show = useCallback(() => {
    clearTimeout(hideTimeout.current);
    showTimeout.current = setTimeout(() => setInternalOpen(true), showDelay);
  }, [showDelay]);

  const hide = useCallback(() => {
    clearTimeout(showTimeout.current);
    hideTimeout.current = setTimeout(() => setInternalOpen(false), hideDelay);
  }, [hideDelay]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeout(showTimeout.current);
      clearTimeout(hideTimeout.current);
    };
  }, []);

  // Escape dismiss
  useKeyboard('Escape', hide, open);

  // Inject aria-describedby on the trigger child
  let trigger: ReactNode = children;
  if (isValidElement(children)) {
    trigger = cloneElement(children as ReactElement<Record<string, unknown>>, {
      'aria-describedby': open ? tooltipId : undefined,
    });
  }

  return (
    <span
      className={cn('fds-tooltip-wrapper', className)}
      onMouseEnter={controlledOpen === undefined ? show : undefined}
      onMouseLeave={controlledOpen === undefined ? hide : undefined}
      onFocus={controlledOpen === undefined ? show : undefined}
      onBlur={controlledOpen === undefined ? hide : undefined}
      {...props}
    >
      {trigger}

      {open && (
        <div
          className={cn('fds-tooltip', PLACEMENT_CLASS[placement])}
          role="tooltip"
          id={tooltipId}
          style={maxWidth ? { '--fds-tooltip-max-width': typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } as React.CSSProperties : undefined}
        >
          <div className="fds-tooltip__content">
            {heading && (
              <span className="fds-tooltip__heading BodyMediumSemibold">{heading}</span>
            )}
            <span className="fds-tooltip__body BodySmallRegular">{bodyText}</span>
          </div>

          {/* Arrow — 14×8 triangle, points up by default (for bottom placement) */}
          <svg
            className="fds-tooltip__arrow"
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M7 0L14 8H0L7 0Z" fill="currentColor" />
          </svg>
        </div>
      )}
    </span>
  );
}

Tooltip.displayName = 'Tooltip';
