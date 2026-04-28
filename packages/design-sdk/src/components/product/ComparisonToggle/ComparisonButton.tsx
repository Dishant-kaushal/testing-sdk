import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './ComparisonButton.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ComparisonButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** Whether comparison is active (colored arrows) or inactive (gray arrows) */
  isSelected?: boolean;
  /** Whether the button is disabled */
  isDisabled?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Swap icon — green up arrow + red down arrow when selected, gray when not
   ═══════════════════════════════════════════════════════════════════════════ */

function SwapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        className="fds-comparison-btn__arrow-up"
        d="M5.33 6L8 3.33L10.67 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="fds-comparison-btn__arrow-down"
        d="M10.67 10L8 12.67L5.33 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ComparisonButton
   ═══════════════════════════════════════════════════════════════════════════ */

export function ComparisonButton({
  isSelected = false,
  isDisabled = false,
  className,
  ...props
}: ComparisonButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'fds-comparison-btn',
        isSelected ? 'fds-comparison-btn--selected' : 'fds-comparison-btn--unselected',
        isDisabled && 'fds-comparison-btn--disabled',
        className,
      )}
      disabled={isDisabled}
      aria-pressed={isSelected}
      aria-label="Toggle comparison"
      {...props}
    >
      <SwapIcon />
    </button>
  );
}

ComparisonButton.displayName = 'ComparisonButton';
