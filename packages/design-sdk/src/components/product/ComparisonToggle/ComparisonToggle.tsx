import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { ComparisonButton } from './ComparisonButton';
import './ComparisonToggle.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type ComparisonToggleValue = 'left' | 'right';

export interface ComparisonToggleProps extends HTMLAttributes<HTMLDivElement> {
  /** Which side is selected */
  value?: ComparisonToggleValue;
  /** Whether the entire toggle is disabled */
  isDisabled?: boolean;
  /** Called when a side is clicked */
  onValueChange?: (value: ComparisonToggleValue) => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ComparisonToggle
   ═══════════════════════════════════════════════════════════════════════════ */

export function ComparisonToggle({
  value = 'left',
  isDisabled = false,
  onValueChange,
  className,
  ...props
}: ComparisonToggleProps) {
  return (
    <div className={cn('fds-comparison-toggle', className)} {...props}>
      <ComparisonButton
        isSelected={value === 'left'}
        isDisabled={isDisabled}
        className="fds-comparison-toggle__left"
        onClick={() => onValueChange?.('left')}
        aria-label="Select left comparison"
      />
      <ComparisonButton
        isSelected={value === 'right'}
        isDisabled={isDisabled}
        className="fds-comparison-toggle__right"
        onClick={() => onValueChange?.('right')}
        aria-label="Select right comparison"
      />
    </div>
  );
}

ComparisonToggle.displayName = 'ComparisonToggle';
