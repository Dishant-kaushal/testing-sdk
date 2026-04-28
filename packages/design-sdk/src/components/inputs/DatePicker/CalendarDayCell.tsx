import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './CalendarDayCell.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type DayCellType =
  | 'default'
  | 'currentDate'
  | 'rangeStart'
  | 'rangeIn'
  | 'rangeEnd'
  | 'outOfMonth';

export interface CalendarDayCellProps extends HTMLAttributes<HTMLButtonElement> {
  /** Day number to display */
  date: number | string;
  /** Cell type — controls shape, bg, and range styling */
  type?: DayCellType;
  /** Whether this cell is selected */
  isSelected?: boolean;
  /** Whether this cell is disabled */
  isDisabled?: boolean;
  /** Whether this cell is today — shows dot even when type is a range type */
  isCurrentDate?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CalendarDayCell
   ═══════════════════════════════════════════════════════════════════════════ */

export function CalendarDayCell({
  date,
  type = 'default',
  isSelected = false,
  isDisabled = false,
  isCurrentDate = false,
  className,
  ...props
}: CalendarDayCellProps) {
  const showDot = type === 'currentDate' || isCurrentDate;

  return (
    <button
      type="button"
      className={cn(
        'fds-day-cell',
        `fds-day-cell--${type}`,
        isSelected && 'fds-day-cell--selected',
        isCurrentDate && 'fds-day-cell--today',
        isDisabled && 'fds-day-cell--disabled',
        className,
      )}
      tabIndex={-1}
      disabled={isDisabled || type === 'outOfMonth'}
      aria-selected={isSelected}
      {...props}
    >
      <span className="fds-day-cell__inner">
        <span className="fds-day-cell__text BodyMediumRegular">{date}</span>
      </span>
      {showDot && <span className="fds-day-cell__dot" />}
    </button>
  );
}

CalendarDayCell.displayName = 'CalendarDayCell';
