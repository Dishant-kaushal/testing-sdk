import { useEffect, useRef, useCallback } from 'react';
import type { HTMLAttributes, ReactNode, KeyboardEvent } from 'react';
import { cn } from '../../../utils/cn';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { DatePickerTrigger } from './DatePickerTrigger';
import { DatePickerPopover } from './DatePickerPopover';
import { CalendarBase } from './CalendarBase';
import { DEFAULT_PRESETS } from './DatePresetSidebar';
import { DropdownMenu } from '../../overlays/DropdownMenu/DropdownMenu';
import { ActionListItem } from '../../overlays/DropdownMenu/ActionListItem';
import { ActionListItemGroup } from '../../overlays/DropdownMenu/ActionListItemGroup';
import type { DatePresetOption } from './DatePresetSidebar';
import { useDatePickerState } from './useDatePickerState';
import { formatDate } from './datePickerUtils';
import './DatePicker.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type DatePickerMode = 'single' | 'range';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  mode?: DatePickerMode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  rangeValue?: DateRange | null;
  onRangeChange?: (value: DateRange | null) => void;
  showPresets?: boolean;
  showPresetChip?: boolean;
  presets?: DatePresetOption[];
  selectedPreset?: string;
  onPresetSelect?: (value: string) => void;
  label?: string;
  placeholder?: string;
  helpText?: string;
  errorText?: string;
  validationState?: 'none' | 'error';
  isDisabled?: boolean;
  showPeriodicity?: boolean;
  periodicitySlot?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Preset label mapping
   ═══════════════════════════════════════════════════════════════════════════ */

const PRESET_LABELS: Record<string, string> = {
  custom: 'Custom',
  today: 'Today',
  yesterday: 'Yesterday',
  current_week: 'Current Week',
  previous_7_days: 'Past 7 days',
  current_month: 'Current Month',
  previous_month: 'Previous Month',
  previous_3_month: 'Previous 3 Month',
  previous_12_month: 'Previous 12 Month',
  current_year: 'Current Year',
  previous_year: 'Previous Year',
};

/* ═══════════════════════════════════════════════════════════════════════════
   DatePicker
   ═══════════════════════════════════════════════════════════════════════════ */

export function DatePicker({
  mode = 'single',
  isOpen: controlledOpen,
  onOpenChange,
  value,
  onChange,
  rangeValue,
  onRangeChange,
  showPresets = true,
  showPresetChip = true,
  presets,
  selectedPreset: controlledPreset,
  onPresetSelect: controlledPresetSelect,
  label,
  placeholder,
  helpText,
  errorText,
  validationState,
  isDisabled,
  showPeriodicity = false,
  periodicitySlot,
  className,
  ...props
}: DatePickerProps) {
  const state = useDatePickerState({
    mode, controlledOpen, onOpenChange,
    value, onChange, rangeValue, onRangeChange,
    controlledPreset, controlledPresetSelect, isDisabled,
  });

  const {
    open, setOpen, presetOpen, setPresetOpen, preset, view,
    containerRef, closedByKeyboard,
    days, monthItems, yearItems, headerLabel,
    singleInputText, startRawText, endRawText, startTimeRaw, endTimeRaw,
    isApplyDisabled,
    closeAndRevert,
    handlePrev, handleNext, handleHeaderClick, handleItemClick,
    handleDayClick, handleDayHover, handleDayHoverEnd,
    handlePresetSelect, handleApply, handleCancel,
    handleSingleInputChange,
    handleStartDateChange, handleEndDateChange,
    handleStartTimeChange, handleEndTimeChange,
  } = state;

  /* ── Outside click + Escape ──────────────────────────────────────────── */
  useClickOutside(containerRef, closeAndRevert);
  useKeyboard('Escape', closeAndRevert);

  /* ── Focus management ────────────────────────────────────────────────── */
  const prevOpen = useRef(open);
  useEffect(() => {
    if (!prevOpen.current && open) {
      requestAnimationFrame(() => {
        const popover = containerRef.current?.querySelector<HTMLElement>('.fds-datepicker__popover');
        if (!popover) return;
        const firstFocusable = popover.querySelector<HTMLElement>(
          'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        firstFocusable?.focus();
      });
    }
    if (prevOpen.current && !open && closedByKeyboard.current) {
      closedByKeyboard.current = false;
      requestAnimationFrame(() => {
        const trigger = containerRef.current?.querySelector<HTMLElement>(
          'button.fds-date-trigger__field, input.fds-date-trigger__input',
        );
        trigger?.focus();
      });
    }
    prevOpen.current = open;
  }, [open, containerRef, closedByKeyboard]);

  /* ── Keyboard handler (trigger-level only) ───────────────────────────── */
  const handleTriggerKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      const target = e.target as HTMLElement;
      const isOnTrigger = target.closest('.fds-date-trigger__field') !== null;

      if (!isOnTrigger) {
        if (e.key === 'Escape' && (open || presetOpen)) {
          e.preventDefault(); e.stopPropagation();
          closedByKeyboard.current = true;
          closeAndRevert();
        }
        return;
      }

      const isOnInput = target.tagName === 'INPUT';
      switch (e.key) {
        case 'Enter': case ' ':
          if (!isOnInput && mode === 'range') { e.preventDefault(); setPresetOpen(false); setOpen(!open); }
          break;
        case 'Escape':
          if (open || presetOpen) { e.preventDefault(); e.stopPropagation(); closedByKeyboard.current = true; closeAndRevert(); }
          break;
        case 'ArrowDown': case 'ArrowUp':
          if (!isOnInput) { e.preventDefault(); if (!open) { setPresetOpen(false); setOpen(true); } }
          break;
      }
    },
    [isDisabled, open, presetOpen, mode, setOpen, setPresetOpen, closeAndRevert, closedByKeyboard],
  );

  /* ── Trigger display values ──────────────────────────────────────────── */
  const triggerDate = mode === 'single' && value ? formatDate(value) : undefined;
  const triggerRange = mode === 'range' && rangeValue
    ? `${formatDate(rangeValue.start)} - ${formatDate(rangeValue.end)}`
    : undefined;
  const presetLabel = PRESET_LABELS[preset] ?? 'Custom';

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <div ref={containerRef} className={cn('fds-datepicker', className)} onKeyDown={handleTriggerKeyDown} {...props}>
      <div className={cn('fds-datepicker__trigger-row', showPeriodicity && !!periodicitySlot && 'fds-datepicker__trigger-row--with-periodicity')}>
        <DatePickerTrigger
          selectionType={mode}
          label={label}
          placeholder={placeholder}
          date={triggerDate}
          presetValue={presetLabel}
          range={triggerRange}
          showPreset={showPresetChip}
          isOpen={open}
          isDisabled={isDisabled}
          helpText={helpText}
          errorText={errorText}
          validationState={validationState}
          onClick={() => {
            if (!isDisabled) {
              if (!open && containerRef.current) {
                containerRef.current.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
              }
              setPresetOpen(false);
              setOpen(!open);
            }
          }}
          onPresetClick={() => {
            if (!isDisabled) {
              if (!presetOpen && containerRef.current) {
                containerRef.current.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
              }
              setOpen(false);
              setPresetOpen(!presetOpen);
            }
          }}
          inputValue={mode === 'single' ? singleInputText : undefined}
          onInputChange={mode === 'single' ? handleSingleInputChange : undefined}
          onInputFocus={() => { if (!isDisabled && !open) setOpen(true); }}
        />
        {showPeriodicity && periodicitySlot && (
          <div className="fds-datepicker__periodicity" onMouseDown={() => { if (open) setOpen(false); if (presetOpen) setPresetOpen(false); }}>
            {periodicitySlot}
          </div>
        )}
      </div>

      {showPresetChip && presetOpen && (
        <div className="fds-datepicker__preset-dropdown">
          <DropdownMenu>
            <ActionListItemGroup>
              {(presets ?? DEFAULT_PRESETS).filter((p) => p.value !== 'custom').map((p) => (
                <ActionListItem
                  key={p.value}
                  title={p.label}
                  selectionType="Single"
                  isSelected={preset === p.value}
                  onClick={() => {
                    handlePresetSelect(p.value);
                    setPresetOpen(false);
                  }}
                />
              ))}
            </ActionListItemGroup>
          </DropdownMenu>
        </div>
      )}

      {open && (
        <div className="fds-datepicker__popover">
          {mode === 'single' ? (
            <CalendarBase
              view={view}
              headerLabel={headerLabel}
              days={days}
              items={view === 'month' ? monthItems : yearItems}
              onDayClick={handleDayClick}
              onItemClick={handleItemClick}
              onHeaderClick={handleHeaderClick}
              onPrev={handlePrev}
              onNext={handleNext}
              showFooter
              isApplyDisabled={isApplyDisabled}
              onCancel={handleCancel}
              onApply={handleApply}
            />
          ) : (
            <DatePickerPopover
              showPresets={showPresets && showPresetChip}
              presets={presets}
              selectedPreset={preset}
              onPresetSelect={handlePresetSelect}
              startDate={startRawText}
              endDate={endRawText}
              startTime={startTimeRaw}
              endTime={endTimeRaw}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              onStartTimeChange={handleStartTimeChange}
              onEndTimeChange={handleEndTimeChange}
              calendarLabel={headerLabel}
              view={view}
              days={days}
              items={view === 'month' ? monthItems : yearItems}
              onDayClick={handleDayClick}
              onDayHover={handleDayHover}
              onDayHoverEnd={handleDayHoverEnd}
              onItemClick={handleItemClick}
              onCalendarLabelClick={handleHeaderClick}
              onPrevMonth={handlePrev}
              onNextMonth={handleNext}
              isApplyDisabled={isApplyDisabled}
              onCancel={handleCancel}
              onApply={handleApply}
            />
          )}
        </div>
      )}
    </div>
  );
}

DatePicker.displayName = 'DatePicker';
