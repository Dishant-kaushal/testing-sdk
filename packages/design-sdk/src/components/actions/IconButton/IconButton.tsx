import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './IconButton.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type IconButtonSize = '12' | '16' | '20';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Icon element to render */
  icon: ReactNode;
  /** Icon size — 12px, 16px, or 20px */
  size?: IconButtonSize;
  /** Whether the button is disabled */
  isDisabled?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   IconButton — bare icon button (no bg, no padding)
   Figma: 231:6208
   ═══════════════════════════════════════════════════════════════════════════ */

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = '16', isDisabled = false, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn('fds-icon-btn', `fds-icon-btn--${size}`, className)}
        disabled={isDisabled}
        {...props}
      >
        {icon}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
