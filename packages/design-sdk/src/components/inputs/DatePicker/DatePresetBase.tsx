import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './DatePresetBase.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface DatePresetBaseProps extends HTMLAttributes<HTMLButtonElement> {
  /** Preset label (e.g. "Custom", "Today", "Last 7 Days") */
  label: string;
  /** Whether this preset is currently selected */
  isSelected?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DatePresetBase
   ═══════════════════════════════════════════════════════════════════════════ */

export function DatePresetBase({
  label,
  isSelected = false,
  className,
  ...props
}: DatePresetBaseProps) {
  return (
    <button
      type="button"
      className={cn(
        'fds-date-preset',
        isSelected && 'fds-date-preset--selected',
        className,
      )}
      aria-pressed={isSelected}
      {...props}
    >
      <span className="fds-date-preset__label BodyMediumRegular">{label}</span>
    </button>
  );
}

DatePresetBase.displayName = 'DatePresetBase';
