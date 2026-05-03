import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { TextInput } from '../../inputs/TextInput/TextInput';
import { formatDateInput, formatTimeInput } from './datePickerUtils';
import { Divider } from '../../layout/Divider/Divider';
import { CalendarHeader } from './CalendarHeader';
import { CalendarWeekdays } from './CalendarWeekdays';
import { CalendarDayCell } from './CalendarDayCell';
import { CalendarFooter } from './CalendarFooter';
import { MonthYearCell } from './MonthYearCell';
import { DatePresetSidebar, type DatePresetOption } from './DatePresetSidebar';
import type { CalendarDay, CalendarView, CalendarMonthYear } from './CalendarBase';
import './DatePickerPopover.css';

export interface DatePickerPopoverProps extends HTMLAttributes<HTMLDivElement> {
  showPresets?: boolean;
  presets?: DatePresetOption[];
  selectedPreset?: string;
  onPresetSelect?: (value: string) => void;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  onStartDateChange?: (value: string) => void;
  onStartTimeChange?: (value: string) => void;
  onEndDateChange?: (value: string) => void;
  onEndTimeChange?: (value: string) => void;
  calendarLabel?: string;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onCalendarLabelClick?: () => void;
  /** Current calendar view */
  view?: CalendarView;
  days?: CalendarDay[][];
  onDayClick?: (day: CalendarDay) => void;
  /** Called when the pointer enters a day cell */
  onDayHover?: (day: CalendarDay) => void;
  /** Called when the pointer leaves the day grid */
  onDayHoverEnd?: () => void;
  /** Month/year items for month/year picker views */
  items?: CalendarMonthYear[][];
  /** Called when a month/year item is clicked */
  onItemClick?: (item: CalendarMonthYear) => void;
  /** Disable the Apply button */
  isApplyDisabled?: boolean;
  onCancel?: () => void;
  onApply?: () => void;
}

export function DatePickerPopover({
  showPresets = true,
  presets,
  selectedPreset,
  onPresetSelect,
  startDate = '',
  startTime = '',
  endDate = '',
  endTime = '',
  onStartDateChange,
  onStartTimeChange,
  onEndDateChange,
  onEndTimeChange,
  calendarLabel = 'March 2026',
  onPrevMonth,
  onNextMonth,
  onCalendarLabelClick,
  view = 'date',
  days = [],
  onDayClick,
  onDayHover,
  onDayHoverEnd,
  items = [],
  onItemClick,
  isApplyDisabled = false,
  onCancel,
  onApply,
  className,
  ...props
}: DatePickerPopoverProps) {
  return (
    <div className={cn('fds-datepicker-popover', className)} {...props}>
      {/* Left: Preset sidebar */}
      {showPresets && (
        <DatePresetSidebar
          presets={presets}
          selectedValue={selectedPreset}
          onPresetSelect={onPresetSelect}
        />
      )}

      {/* Right panel */}
      <div className="fds-datepicker-popover__panel">
        {/* Date/Time inputs — rows: Start Date + Start Time, End Date + End Time */}
        <div className="fds-datepicker-popover__inputs">
          <div className="fds-datepicker-popover__input-row">
            <TextInput
              label="Start Date"
              placeholder="DD/MM/YYYY"
              value={startDate}
              maxLength={10}
              onChange={(meta) => onStartDateChange?.(formatDateInput(meta.value))}
            />
            <TextInput
              label="Start Time"
              placeholder="HH:MM"
              value={startTime}
              maxLength={5}
              onChange={(meta) => onStartTimeChange?.(formatTimeInput(meta.value))}
            />
          </div>
          <div className="fds-datepicker-popover__input-row">
            <TextInput
              label="End Date"
              placeholder="DD/MM/YYYY"
              value={endDate}
              maxLength={10}
              onChange={(meta) => onEndDateChange?.(formatDateInput(meta.value))}
            />
            <TextInput
              label="End Time"
              placeholder="HH:MM"
              value={endTime}
              maxLength={5}
              onChange={(meta) => onEndTimeChange?.(formatTimeInput(meta.value))}
            />
          </div>
        </div>

        {/* Divider between inputs and calendar */}
        <Divider variant="Muted" />

        {/* Calendar — header+weekdays with border-b, then day/month/year grid */}
        <div className="fds-datepicker-popover__calendar">
          <div className="fds-datepicker-popover__calendar-header">
            <CalendarHeader
              label={calendarLabel}
              onPrev={onPrevMonth}
              onNext={onNextMonth}
              onLabelClick={onCalendarLabelClick}
            />
            {view === 'date' && <CalendarWeekdays />}
          </div>

          <div className={cn('fds-datepicker-popover__calendar-body', view !== 'date' && 'fds-datepicker-popover__calendar-body--grid')}>
            {view === 'date' && (
              <div onMouseLeave={() => onDayHoverEnd?.()}>
                {days.map((week, wi) => (
                  <div id={`week-${wi}`} className="fds-datepicker-popover__week">
                    {week.map((day, di) => (
                      <CalendarDayCell
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
              <div id={`row-${ri}`} className="fds-datepicker-popover__item-row">
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
        </div>

        {/* Footer */}
        <CalendarFooter onCancel={onCancel} onApply={onApply} isApplyDisabled={isApplyDisabled} />
      </div>
    </div>
  );
}

DatePickerPopover.displayName = 'DatePickerPopover';
