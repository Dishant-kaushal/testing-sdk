import React, { forwardRef, type ChangeEvent, type MouseEvent } from 'react';
import { Calendar } from 'react-feather';
import { ExpandAllIcon } from './ExpandAllIcon';
import { cn } from '../../../utils/cn';
import { InputFieldHeader } from '../../forms/InputFieldHeader/InputFieldHeader';
import { InputFieldFooter } from '../../forms/InputFieldFooter/InputFieldFooter';
import './DatePickerTrigger.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type DatePickerSelectionType = 'single' | 'range';

export interface DatePickerTriggerProps {
  /** Selection type — single date or date range */
  selectionType?: DatePickerSelectionType;
  /** Label above the field */
  label?: string;
  /** Placeholder text (single mode) */
  placeholder?: string;
  /** Selected date display (single mode: "20/03/2026") */
  date?: string;
  /** Preset label (range mode: "Past 7 days") */
  presetValue?: string;
  /** Date range display (range mode: "13/03/2026 - 19/03/2026") */
  range?: string;
  /** Whether the popover is open */
  isOpen?: boolean;
  /** Whether the field is disabled */
  isDisabled?: boolean;
  /** Help text below the field */
  helpText?: string;
  /** Error text */
  errorText?: string;
  /** Validation state */
  validationState?: 'none' | 'error';
  /** Called when the trigger is clicked */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Whether to show the preset chip (range mode, default true) */
  showPreset?: boolean;
  /** Called when the preset chip is clicked (range mode — separate from the main field click) */
  onPresetClick?: () => void;
  /** Called when the user types in the single-mode input */
  onInputChange?: (value: string) => void;
  /** Controlled value for the single-mode typed input */
  inputValue?: string;
  /** Called when the single-mode input is focused */
  onInputFocus?: () => void;
  /** Additional class name */
  className?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DatePickerTrigger
   ═══════════════════════════════════════════════════════════════════════════ */

export const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  (
    {
      selectionType = 'single',
      label,
      placeholder,
      date,
      presetValue,
      range,
      isOpen = false,
      isDisabled = false,
      helpText,
      errorText,
      validationState = 'none',
      showPreset = true,
      onClick,
      onPresetClick,
      onInputChange,
      inputValue,
      onInputFocus,
      className,
    },
    ref,
  ) => {
    const resolvedPlaceholder = placeholder ?? (selectionType === 'single' ? 'Select Date' : 'Select Date Range');
    const isError = validationState === 'error';
    const footerText = isError ? errorText : helpText;
    const hasValue = selectionType === 'single' ? !!date : !!range;

    const rootClass = cn(
      'fds-date-trigger',
      selectionType === 'range' && 'fds-date-trigger--range',
      selectionType === 'range' && !showPreset && 'fds-date-trigger--no-chip',
      isOpen && 'fds-date-trigger--open',
      isDisabled && 'fds-date-trigger--disabled',
      isError && 'fds-date-trigger--error',
      className,
    );

    return (
      <div className={rootClass}>
        {label && <InputFieldHeader label={label} />}

        {selectionType === 'single' ? (
          /* ── Single date — editable input field ───────────── */
          <div
            className="fds-date-trigger__field"
            onClick={onClick as unknown as React.MouseEventHandler<HTMLDivElement>}
            aria-expanded={isOpen}
          >
            <span className="fds-date-trigger__leading">
              <span className="fds-date-trigger__icon">
                <Calendar size={16} />
              </span>
              <input
                type="text"
                className={cn(
                  'fds-date-trigger__input BodyMediumRegular',
                  !hasValue && !inputValue && 'fds-date-trigger__input--placeholder',
                )}
                placeholder={resolvedPlaceholder}
                value={inputValue ?? date ?? ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange?.(e.target.value)}
                onFocus={() => onInputFocus?.()}
                onClick={(e) => e.stopPropagation()}
                disabled={isDisabled}
              />
            </span>
          </div>
        ) : (
          /* ── Range trigger — button (read-only) ───────────── */
          <button
            ref={ref}
            type="button"
            className="fds-date-trigger__field"
            onClick={onClick}
            disabled={isDisabled}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
          >
            <span className="fds-date-trigger__leading">
              {showPreset ? (
                <span
                  className="fds-date-trigger__preset"
                  onClick={(e) => { e.stopPropagation(); onPresetClick?.(); }}
                  role="button"
                  tabIndex={-1}
                >
                  <Calendar size={16} />
                  <span className="fds-date-trigger__preset-label BodyMediumRegular">
                    {presetValue || 'Custom'}
                  </span>
                  <span className="fds-date-trigger__preset-expand"><ExpandAllIcon /></span>
                </span>
              ) : (
                <span className="fds-date-trigger__icon">
                  <Calendar size={16} />
                </span>
              )}
              <span
                className={cn(
                  'fds-date-trigger__value BodyMediumRegular',
                  !hasValue && 'fds-date-trigger__value--placeholder',
                )}
              >
                {range || resolvedPlaceholder}
              </span>
            </span>
          </button>
        )}

        {footerText && (
          <InputFieldFooter
            helpText={footerText}
            state={isError ? 'error' : 'default'}
          />
        )}
      </div>
    );
  },
);

DatePickerTrigger.displayName = 'DatePickerTrigger';
