import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { CalendarHeader } from './CalendarHeader';
import { CalendarWeekdays } from './CalendarWeekdays';
import { CalendarDayCell, type DayCellType } from './CalendarDayCell';
import { CalendarFooter } from './CalendarFooter';
import { MonthYearCell } from './MonthYearCell';
import './CalendarBase.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type CalendarView = 'date' | 'month' | 'year';

export interface CalendarDay {
  date: number;
  type?: DayCellType;
  isSelected?: boolean;
  isCurrentDate?: boolean;
}

export interface CalendarMonthYear {
  label: string;
  value: string | number;
  isSelected?: boolean;
}

export interface CalendarBaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Current view mode */
  view?: CalendarView;
  /** Header label ("March 2026", "2026", "2020 - 2031") */
  headerLabel?: string;
  /** Called when prev button clicked */
  onPrev?: () => void;
  /** Called when next button clicked */
  onNext?: () => void;
  /** Called when header label clicked (to switch view) */
  onHeaderClick?: () => void;
  /** Day grid — for 'date' view (6 rows × 7 cols) */
  days?: CalendarDay[][];
  /** Called when a day is clicked */
  onDayClick?: (day: CalendarDay) => void;
  /** Called when the pointer enters a day cell (for range hover preview) */
  onDayHover?: (day: CalendarDay) => void;
  /** Called when the pointer leaves the day grid */
  onDayHoverEnd?: () => void;
  /** Month/year items — for 'month'/'year' views (4 rows × 3 cols) */
  items?: CalendarMonthYear[][];
  /** Called when a month/year item is clicked */
  onItemClick?: (item: CalendarMonthYear) => void;
  /** Whether to show the footer */
  showFooter?: boolean;
  /** Disable the Apply button */
  isApplyDisabled?: boolean;
  /** Called when Cancel clicked */
  onCancel?: () => void;
  /** Called when Apply clicked */
  onApply?: () => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CalendarBase
   ═══════════════════════════════════════════════════════════════════════════ */

export function CalendarBase({
  view = 'date',
  headerLabel = 'March 2026',
  onPrev,
  onNext,
  onHeaderClick,
  days = [],
  onDayClick,
  onDayHover,
  onDayHoverEnd,
  items = [],
  onItemClick,
  showFooter = false,
  isApplyDisabled = false,
  onCancel,
  onApply,
  className,
  ...props
}: CalendarBaseProps) {
  return (
    <div className={cn('fds-calendar-base', className)} {...props}>
      {/* Header + weekdays */}
      <div className="fds-calendar-base__header">
        <CalendarHeader
          label={headerLabel}
          onPrev={onPrev}
          onNext={onNext}
          onLabelClick={onHeaderClick}
        />
        {view === 'date' && <CalendarWeekdays />}
      </div>

      {/* Body */}
      <div className={cn('fds-calendar-base__body', view !== 'date' && 'fds-calendar-base__body--grid')}>
        {view === 'date' && (
          <div onMouseLeave={() => onDayHoverEnd?.()}>
            {days.map((week, wi) => (
              <div key={wi} id={`week-${wi}`} className="fds-calendar-base__week">
                {week.map((day, di) => (
                  <CalendarDayCell
                    key={`${wi}-${di}`}
                    id={`${wi}-${di}`}
                    date={day.date}
                    type={day.type}
                    isSelected={day.isSelected}
                    isCurrentDate={day.isCurrentDate}
                    onClick={() => onDayClick?.(day)}
                    onMouseEnter={() => onDayHover?.(day)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {view !== 'date' && items.map((row, ri) => (
          <div id={`row-${ri}`} className="fds-calendar-base__item-row">
            {row.map((item, ii) => (
              <MonthYearCell
                id={`${ri}-${ii}`}
                label={item.label}
                isSelected={item.isSelected}
                onClick={() => onItemClick?.(item)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      {showFooter && <CalendarFooter onCancel={onCancel} onApply={onApply} isApplyDisabled={isApplyDisabled} />}
    </div>
  );
}

CalendarBase.displayName = 'CalendarBase';
