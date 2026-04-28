import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './MonthYearCell.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface MonthYearCellProps extends HTMLAttributes<HTMLButtonElement> {
  /** Display label (e.g. "Jan", "2023") */
  label: string;
  /** Whether this cell is selected */
  isSelected?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MonthYearCell
   ═══════════════════════════════════════════════════════════════════════════ */

export function MonthYearCell({
  label,
  isSelected = false,
  className,
  ...props
}: MonthYearCellProps) {
  return (
    <button
      type="button"
      tabIndex={-1}
      className={cn(
        'fds-month-year-cell',
        isSelected && 'fds-month-year-cell--selected',
        className,
      )}
      aria-selected={isSelected}
      {...props}
    >
      <span className="fds-month-year-cell__text BodyMediumRegular">{label}</span>
    </button>
  );
}

MonthYearCell.displayName = 'MonthYearCell';
