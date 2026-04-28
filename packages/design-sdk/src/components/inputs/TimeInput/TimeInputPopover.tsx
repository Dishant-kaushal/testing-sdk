import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { TimeInputFooter } from './TimeInputFooter';
import { TimeColumn } from './TimeColumn';
import './TimeInputPopover.css';

export type TimeInputMeridiem = 'AM' | 'PM';

export interface TimeInputPopoverProps extends HTMLAttributes<HTMLDivElement> {
  /** 12-hour mode shows the meridiem column; 24-hour hides it */
  hourFormat: '12' | '24';
  /** Draft hour items (display strings) */
  hourItems: readonly string[];
  /** Draft minute items (display strings) */
  minuteItems: readonly string[];
  /** Selected hour index */
  hourIndex: number;
  /** Selected minute index */
  minuteIndex: number;
  /** Selected meridiem (ignored when hourFormat === '24') */
  meridiem: TimeInputMeridiem;
  /** Called when the user picks an hour */
  onHourChange: (index: number) => void;
  /** Called when the user picks a minute */
  onMinuteChange: (index: number) => void;
  /** Called when the user picks a meridiem */
  onMeridiemChange: (meridiem: TimeInputMeridiem) => void;
  /** Show the Cancel / Apply footer */
  showFooter?: boolean;
  /** Apply button label */
  applyLabel?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Disable the Apply button */
  isApplyDisabled?: boolean;
  /** Called when Cancel is pressed */
  onCancel?: () => void;
  /** Called when Apply is pressed */
  onApply?: () => void;
}

const MERIDIEM_ITEMS = ['AM', 'PM'] as const;

export function TimeInputPopover({
  hourFormat,
  hourItems,
  minuteItems,
  hourIndex,
  minuteIndex,
  meridiem,
  onHourChange,
  onMinuteChange,
  onMeridiemChange,
  showFooter = true,
  applyLabel,
  cancelLabel,
  isApplyDisabled = false,
  onCancel,
  onApply,
  className,
  ...props
}: TimeInputPopoverProps) {
  const meridiemIndex = meridiem === 'AM' ? 0 : 1;

  return (
    <div className={cn('fds-time-popover', className)} {...props}>
      <div className="fds-time-popover__columns">
        <TimeColumn
          label="Hours"
          items={hourItems}
          selectedIndex={hourIndex}
          onSelect={onHourChange}
        />
        <TimeColumn
          label="Minutes"
          items={minuteItems}
          selectedIndex={minuteIndex}
          onSelect={onMinuteChange}
        />
        {hourFormat === '12' && (
          <TimeColumn
            label="Meridiem"
            items={MERIDIEM_ITEMS}
            selectedIndex={meridiemIndex}
            onSelect={(i) => onMeridiemChange(MERIDIEM_ITEMS[i])}
          />
        )}
      </div>
      {showFooter && (
        <TimeInputFooter
          cancelLabel={cancelLabel}
          applyLabel={applyLabel}
          isApplyDisabled={isApplyDisabled}
          onCancel={onCancel}
          onApply={onApply}
        />
      )}
    </div>
  );
}

TimeInputPopover.displayName = 'TimeInputPopover';
