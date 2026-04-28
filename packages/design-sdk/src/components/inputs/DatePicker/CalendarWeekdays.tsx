import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './CalendarWeekdays.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface CalendarWeekdaysProps extends HTMLAttributes<HTMLDivElement> {
  /** Weekday labels — defaults to S M T W T F S */
  days?: string[];
}

const DEFAULT_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/* ═══════════════════════════════════════════════════════════════════════════
   CalendarWeekdays
   ═══════════════════════════════════════════════════════════════════════════ */

export function CalendarWeekdays({
  days = DEFAULT_DAYS,
  className,
  ...props
}: CalendarWeekdaysProps) {
  return (
    <div className={cn('fds-calendar-weekdays', className)} {...props}>
      {days.map((day, i) => (
        <div id={`day-${i}`} className="fds-calendar-weekdays__cell">
          <span className="fds-calendar-weekdays__label BodyMediumRegular">{day}</span>
        </div>
      ))}
    </div>
  );
}

CalendarWeekdays.displayName = 'CalendarWeekdays';
