import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './DateSelectorButton.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface DateSelectorButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** Button label (e.g. "M", "T", "W") */
  label: string;
  /** Whether the button is active/selected */
  isActive?: boolean;
  /** Whether the button is disabled */
  isDisabled?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DateSelectorButton
   ═══════════════════════════════════════════════════════════════════════════ */

export function DateSelectorButton({
  label,
  isActive = false,
  isDisabled = false,
  className,
  ...props
}: DateSelectorButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'fds-date-selector-btn',
        isActive && 'fds-date-selector-btn--active',
        isDisabled && 'fds-date-selector-btn--disabled',
        className,
      )}
      disabled={isDisabled}
      aria-pressed={isActive}
      {...props}
    >
      <span className="fds-date-selector-btn__label BodySmallSemibold">{label}</span>
    </button>
  );
}

DateSelectorButton.displayName = 'DateSelectorButton';
