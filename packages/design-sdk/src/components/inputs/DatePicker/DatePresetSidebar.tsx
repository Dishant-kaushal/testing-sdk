import { useCallback, type HTMLAttributes, type KeyboardEvent } from 'react';
import { cn } from '../../../utils/cn';
import { DatePresetBase } from './DatePresetBase';
import './DatePresetSidebar.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface DatePresetOption {
  label: string;
  value: string;
}

export interface DatePresetSidebarProps extends HTMLAttributes<HTMLDivElement> {
  /** Preset options to display */
  presets?: DatePresetOption[];
  /** Currently selected preset value */
  selectedValue?: string;
  /** Called when a preset is clicked */
  onPresetSelect?: (value: string) => void;
}

export const DEFAULT_PRESETS: DatePresetOption[] = [
  { label: 'Custom', value: 'custom' },
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Current Week', value: 'current_week' },
  { label: 'Previous 7 Days', value: 'previous_7_days' },
  { label: 'Current Month', value: 'current_month' },
  { label: 'Previous Month', value: 'previous_month' },
  { label: 'Previous 3 Month', value: 'previous_3_month' },
  { label: 'Previous 12 Month', value: 'previous_12_month' },
  { label: 'Current Year', value: 'current_year' },
  { label: 'Previous Year', value: 'previous_year' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   DatePresetSidebar
   ═══════════════════════════════════════════════════════════════════════════ */

export function DatePresetSidebar({
  presets = DEFAULT_PRESETS,
  selectedValue,
  onPresetSelect,
  className,
  ...props
}: DatePresetSidebarProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'BUTTON') return;

    const buttons = Array.from(
      (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('button'),
    );
    const index = buttons.indexOf(target);
    if (index === -1) return;

    let next = -1;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      next = index < buttons.length - 1 ? index + 1 : 0;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      next = index > 0 ? index - 1 : buttons.length - 1;
    }
    if (next >= 0) buttons[next].focus();
  }, []);

  return (
    <div
      className={cn('fds-date-preset-sidebar', className)}
      role="listbox"
      onKeyDown={handleKeyDown}
      {...props}
    >
      {presets.map((preset) => (
        <DatePresetBase
          key={preset.value}
          id={preset.value}
          label={preset.label}
          isSelected={selectedValue === preset.value}
          onClick={() => onPresetSelect?.(preset.value)}
          role="option"
          aria-selected={selectedValue === preset.value}
        />
      ))}
    </div>
  );
}

DatePresetSidebar.displayName = 'DatePresetSidebar';
