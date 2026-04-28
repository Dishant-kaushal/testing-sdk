import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../../utils/cn';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { TimeInputTrigger, type TimeInputTriggerSize } from './TimeInputTrigger';
import { TimeInputPopover, type TimeInputMeridiem } from './TimeInputPopover';
import './TimeInput.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type TimeInputHourFormat = '12' | '24';
export type TimeInputSize = TimeInputTriggerSize;
export type TimeInputValidationState = 'none' | 'error' | 'success';
export type TimeInputNecessityIndicator = 'optional' | 'required';

export interface TimeInputValue {
  /** 0–23 (canonical 24-hour form regardless of display format) */
  hours: number;
  /** 0–59 */
  minutes: number;
}

export interface TimeInputChangeMeta {
  name: string;
  value: TimeInputValue | null;
}

export interface TimeInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  label: string;
  name?: string;
  value?: TimeInputValue | null;
  defaultValue?: TimeInputValue | null;
  hourFormat?: TimeInputHourFormat;
  size?: TimeInputSize;
  placeholder?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onChange?: (meta: TimeInputChangeMeta) => void;
  helpText?: string;
  errorText?: string;
  successText?: string;
  validationState?: TimeInputValidationState;
  isDisabled?: boolean;
  isRequired?: boolean;
  necessityIndicator?: TimeInputNecessityIndicator;
  showFooter?: boolean;
  cancelLabel?: string;
  applyLabel?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════════════════ */

const pad2 = (n: number): string => (n < 10 ? `0${n}` : String(n));

const HOURS_24 = Array.from({ length: 24 }, (_, i) => pad2(i));
// 12-hour column runs 01, 02, …, 12 (matches Figma 3155:11402 — list starts at 01)
const HOURS_12 = Array.from({ length: 12 }, (_, i) => pad2(i + 1));
const MINUTES = Array.from({ length: 60 }, (_, i) => pad2(i));

const canonicalToMeridiem = (hours: number): TimeInputMeridiem =>
  hours < 12 ? 'AM' : 'PM';

/** Canonical (0–23) → 12-hour column index (index 0 = "01", index 11 = "12") */
const canonicalToHourIndex12 = (hours: number): number => {
  const h12 = hours % 12;
  return h12 === 0 ? 11 : h12 - 1;
};

/** 12-hour column index + meridiem → canonical 0–23 */
const hourIndex12ToCanonical = (index: number, meridiem: TimeInputMeridiem): number => {
  const displayHour = index === 11 ? 12 : index + 1; // 1–12
  if (meridiem === 'AM') return displayHour === 12 ? 0 : displayHour;
  return displayHour === 12 ? 12 : displayHour + 12;
};

const formatDisplay = (
  value: TimeInputValue | null,
  hourFormat: TimeInputHourFormat,
): string => {
  if (!value) return '';
  const { hours, minutes } = value;
  if (hourFormat === '24') return `${pad2(hours)} : ${pad2(minutes)}`;
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${pad2(displayHour)} : ${pad2(minutes)} ${canonicalToMeridiem(hours)}`;
};

const DEFAULT_PLACEHOLDER = 'Select time';

/** Snapshot of the current wall-clock time — used to seed the wheels when the
 *  popover opens without a committed value. */
const getCurrentTime = (): TimeInputValue => {
  const now = new Date();
  return { hours: now.getHours(), minutes: now.getMinutes() };
};

/* ═══════════════════════════════════════════════════════════════════════════
   TimeInput
   ═══════════════════════════════════════════════════════════════════════════ */

export function TimeInput({
  label,
  name,
  value,
  defaultValue = null,
  hourFormat = '12',
  size = 'Medium',
  placeholder,
  isOpen: controlledOpen,
  onOpenChange,
  onChange,
  helpText,
  errorText,
  successText,
  validationState = 'none',
  isDisabled = false,
  isRequired = false,
  necessityIndicator,
  showFooter = true,
  cancelLabel,
  applyLabel,
  className,
  id: idProp,
  ...props
}: TimeInputProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const fieldName = name ?? '';
  const resolvedPlaceholder = placeholder ?? DEFAULT_PLACEHOLDER;

  /* ── Controlled/uncontrolled value ──────────────────────────────────── */
  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<TimeInputValue | null>(defaultValue);
  const committedValue = isValueControlled ? value ?? null : internalValue;

  /* ── Controlled/uncontrolled open ───────────────────────────────────── */
  const isOpenControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpenControlled ? controlledOpen! : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isOpenControlled, onOpenChange],
  );

  /* ── Draft state (applied on Apply, discarded on Cancel) ────────────── */
  const [draft, setDraft] = useState<TimeInputValue>(() => committedValue ?? getCurrentTime());

  // Re-seed draft from committed value whenever the popover opens. If no value
  // has been applied yet, fall back to the current system time so the wheels
  // land somewhere sensible instead of always 12:00 AM.
  const prevOpen = useRef(open);
  useEffect(() => {
    if (!prevOpen.current && open) {
      setDraft(committedValue ?? getCurrentTime());
    }
    prevOpen.current = open;
  }, [open, committedValue]);

  /* ── Derived column data ────────────────────────────────────────────── */
  const hourItems = hourFormat === '12' ? HOURS_12 : HOURS_24;
  const hourIndex =
    hourFormat === '12' ? canonicalToHourIndex12(draft.hours) : draft.hours;
  const minuteIndex = draft.minutes;
  const meridiem = canonicalToMeridiem(draft.hours);

  const displayValue = useMemo(
    () => formatDisplay(committedValue, hourFormat),
    [committedValue, hourFormat],
  );

  /* ── Column change handlers — update DRAFT only ─────────────────────── */
  const handleHourChange = useCallback(
    (i: number) => {
      setDraft((d) => ({
        ...d,
        hours: hourFormat === '12' ? hourIndex12ToCanonical(i, canonicalToMeridiem(d.hours)) : i,
      }));
    },
    [hourFormat],
  );

  const handleMinuteChange = useCallback((i: number) => {
    setDraft((d) => ({ ...d, minutes: i }));
  }, []);

  const handleMeridiemChange = useCallback((m: TimeInputMeridiem) => {
    setDraft((d) => {
      const h12Index = canonicalToHourIndex12(d.hours);
      return { ...d, hours: hourIndex12ToCanonical(h12Index, m) };
    });
  }, []);

  /* ── Commit / revert ────────────────────────────────────────────────── */
  const commit = useCallback(
    (next: TimeInputValue | null) => {
      if (!isValueControlled) setInternalValue(next);
      onChange?.({ name: fieldName, value: next });
    },
    [isValueControlled, fieldName, onChange],
  );

  const closedByKeyboard = useRef(false);

  const handleApply = useCallback(() => {
    commit(draft);
    setOpen(false);
  }, [commit, draft, setOpen]);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  /* ── Outside-click + Escape (mirror DatePicker) ─────────────────────── */
  const containerRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(containerRef, () => {
    if (open) setOpen(false);
  });
  useKeyboard(
    'Escape',
    (e) => {
      if (open) {
        e.preventDefault();
        e.stopPropagation();
        closedByKeyboard.current = true;
        setOpen(false);
      }
    },
    open,
  );

  /* ── Focus management: on Escape close, return focus to trigger ─────── */
  useEffect(() => {
    if (prevOpen.current && !open && closedByKeyboard.current) {
      closedByKeyboard.current = false;
      requestAnimationFrame(() => {
        const input = containerRef.current?.querySelector<HTMLElement>(
          '.fds-text-input__input',
        );
        input?.focus();
      });
    }
  }, [open]);

  const handleTriggerKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      const target = e.target as HTMLElement;
      const isOnTrigger = target.closest('.fds-time-trigger') !== null && !target.closest('.fds-time-popover');
      if (!isOnTrigger) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          setOpen(!open);
          break;
        case 'ArrowDown':
          if (!open) {
            e.preventDefault();
            setOpen(true);
          }
          break;
      }
    },
    [isDisabled, open, setOpen],
  );

  return (
    <div
      ref={containerRef}
      id={id}
      className={cn('fds-time-input', className)}
      onKeyDown={handleTriggerKeyDown}
      {...props}
    >
      <TimeInputTrigger
        label={label}
        name={fieldName || undefined}
        placeholder={resolvedPlaceholder}
        displayValue={displayValue}
        size={size}
        isOpen={open}
        isDisabled={isDisabled}
        isRequired={isRequired}
        necessityIndicator={necessityIndicator}
        helpText={helpText}
        errorText={errorText}
        successText={successText}
        validationState={validationState}
        onClick={() => {
          if (!isDisabled) setOpen(!open);
        }}
      />

      {open && (
        <div className="fds-time-input__popover">
          <TimeInputPopover
            hourFormat={hourFormat}
            hourItems={hourItems}
            minuteItems={MINUTES}
            hourIndex={hourIndex}
            minuteIndex={minuteIndex}
            meridiem={meridiem}
            onHourChange={handleHourChange}
            onMinuteChange={handleMinuteChange}
            onMeridiemChange={handleMeridiemChange}
            showFooter={showFooter}
            cancelLabel={cancelLabel}
            applyLabel={applyLabel}
            onCancel={handleCancel}
            onApply={handleApply}
          />
        </div>
      )}
    </div>
  );
}

TimeInput.displayName = 'TimeInput';
