import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import type { CalendarView, CalendarDay, CalendarMonthYear } from './CalendarBase';
import type { DatePresetOption } from './DatePresetSidebar';
import type { DatePickerMode, DateRange } from './DatePicker';
import {
  generateCalendarDays,
  generateMonths,
  generateYears,
  getPresetDateRange,
  getHeaderLabel,
  formatDate,
  formatTime,
  formatDateInput,
  parseDateDMY,
  parseTime,
} from './datePickerUtils';

/* ═══════════════════════════════════════════════════════════════════════════
   Hook params
   ═══════════════════════════════════════════════════════════════════════════ */

export interface UseDatePickerStateParams {
  mode: DatePickerMode;
  controlledOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  rangeValue?: DateRange | null;
  onRangeChange?: (value: DateRange | null) => void;
  controlledPreset?: string;
  controlledPresetSelect?: (value: string) => void;
  isDisabled?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   useDatePickerState
   ═══════════════════════════════════════════════════════════════════════════ */

export function useDatePickerState({
  mode,
  controlledOpen,
  onOpenChange,
  value,
  onChange,
  rangeValue,
  onRangeChange,
  controlledPreset,
  controlledPresetSelect,
  isDisabled,
}: UseDatePickerStateParams) {
  /* ── Open state ──────────────────────────────────────────────────────── */
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback(
    (v: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [controlledOpen, onOpenChange],
  );

  /* ── Calendar navigation ─────────────────────────────────────────────── */
  const now = new Date();
  const initialDate = mode === 'single' ? value : rangeValue?.start;
  const [currentMonth, setCurrentMonth] = useState(initialDate?.getMonth() ?? now.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate?.getFullYear() ?? now.getFullYear());
  const [view, setView] = useState<CalendarView>('date');
  const decadeStart = Math.floor(currentYear / 12) * 12;

  /* ── Range draft state ───────────────────────────────────────────────── */
  const [internalRange, setInternalRange] = useState<DateRange | null>(rangeValue ?? null);
  const resolvedRange = rangeValue !== undefined ? rangeValue : internalRange;
  const [draftStart, setDraftStart] = useState<Date | null>(rangeValue?.start ?? null);
  const [draftEnd, setDraftEnd] = useState<Date | null>(rangeValue?.end ?? null);
  const [rangeClickCount, setRangeClickCount] = useState(rangeValue ? 2 : 0);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [presetOpen, setPresetOpen] = useState(false);

  /* ── Preset state ────────────────────────────────────────────────────── */
  const [internalPreset, setInternalPreset] = useState(controlledPreset ?? 'custom');
  const preset = controlledPreset ?? internalPreset;

  const updatePreset = useCallback(
    (value: string) => {
      setInternalPreset(value);
      controlledPresetSelect?.(value);
    },
    [controlledPresetSelect],
  );

  /* ── Single mode draft ───────────────────────────────────────────────── */
  const [draftSingle, setDraftSingle] = useState<Date | null>(value ?? null);
  const [singleInputText, setSingleInputText] = useState(value ? formatDate(value) : '');

  /* ── Range mode raw input text ───────────────────────────────────────── */
  const [startRawText, setStartRawText] = useState(rangeValue?.start ? formatDate(rangeValue.start) : '');
  const [endRawText, setEndRawText] = useState(rangeValue?.end ? formatDate(rangeValue.end) : '');
  const [startTimeRaw, setStartTimeRaw] = useState(rangeValue?.start ? formatTime(rangeValue.start) : '00:00');
  const [endTimeRaw, setEndTimeRaw] = useState(rangeValue?.end ? formatTime(rangeValue.end) : '00:00');

  /* ── Refs ─────────────────────────────────────────────────────────────── */
  const containerRef = useRef<HTMLDivElement>(null);
  const closedByKeyboard = useRef(false);
  const originalPresetRef = useRef<string>(preset);

  /* ── Sync when external props change ──────────────────────────────────── */
  useEffect(() => {
    if (mode === 'single') {
      setDraftSingle(value ?? null);
      setSingleInputText(value ? formatDate(value) : '');
      if (value) {
        setCurrentMonth(value.getMonth());
        setCurrentYear(value.getFullYear());
      }
    }
  }, [value, mode]);

  useEffect(() => {
    if (mode === 'range') {
      setDraftStart(rangeValue?.start ?? null);
      setDraftEnd(rangeValue?.end ?? null);
      setStartRawText(rangeValue?.start ? formatDate(rangeValue.start) : '');
      setEndRawText(rangeValue?.end ? formatDate(rangeValue.end) : '');
      setStartTimeRaw(rangeValue?.start ? formatTime(rangeValue.start) : '00:00');
      setEndTimeRaw(rangeValue?.end ? formatTime(rangeValue.end) : '00:00');
      setRangeClickCount(rangeValue ? 2 : 0);
      if (rangeValue?.start) {
        setCurrentMonth(rangeValue.start.getMonth());
        setCurrentYear(rangeValue.start.getFullYear());
      }
    }
  }, [rangeValue, mode]);

  useEffect(() => {
    if (controlledPreset !== undefined) setInternalPreset(controlledPreset);
  }, [controlledPreset]);

  /* ── Snapshot preset + jump calendar on open ─────────────────────────── */
  useEffect(() => {
    if (open) {
      originalPresetRef.current = preset;
      const target = mode === 'single' ? value : rangeValue?.start;
      if (target) {
        setCurrentMonth(target.getMonth());
        setCurrentYear(target.getFullYear());
      }
      setView('date');
    }
  }, [open]);

  /* ── Auto-focus preset dropdown items ────────────────────────────────── */
  useEffect(() => {
    if (presetOpen) {
      requestAnimationFrame(() => {
        const dropdown = containerRef.current?.querySelector<HTMLElement>('.fds-datepicker__preset-dropdown');
        const firstItem = dropdown?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
        firstItem?.focus();
      });
    }
  }, [presetOpen]);

  /* ── Close and revert ────────────────────────────────────────────────── */
  const closeAndRevert = useCallback(() => {
    if (open) {
      if (mode === 'single') {
        setDraftSingle(value ?? null);
        setSingleInputText(value ? formatDate(value) : '');
      } else {
        setDraftStart(rangeValue?.start ?? null);
        setDraftEnd(rangeValue?.end ?? null);
        setStartRawText(rangeValue?.start ? formatDate(rangeValue.start) : '');
        setEndRawText(rangeValue?.end ? formatDate(rangeValue.end) : '');
        setStartTimeRaw(rangeValue?.start ? formatTime(rangeValue.start) : '00:00');
        setEndTimeRaw(rangeValue?.end ? formatTime(rangeValue.end) : '00:00');
        setRangeClickCount(rangeValue ? 2 : 0);
      }
      updatePreset(originalPresetRef.current);
      setHoverDate(null);
      setView('date');
      setOpen(false);
    }
    if (presetOpen) setPresetOpen(false);
  }, [open, presetOpen, mode, value, rangeValue, setOpen, updatePreset]);

  /* ── Calendar data ───────────────────────────────────────────────────── */
  const days = useMemo(
    () => generateCalendarDays(
      currentYear, currentMonth,
      mode === 'range' ? draftStart : null,
      mode === 'range' ? draftEnd : null,
      mode === 'single' ? draftSingle : null,
      mode === 'range' ? hoverDate : null,
    ),
    [currentYear, currentMonth, draftStart, draftEnd, draftSingle, hoverDate, mode],
  );

  const monthItems = useMemo(() => generateMonths(currentMonth), [currentMonth]);
  const yearItems = useMemo(() => generateYears(decadeStart, currentYear), [decadeStart, currentYear]);
  const headerLabel = getHeaderLabel(view, currentYear, currentMonth, decadeStart);

  /* ── Navigation ──────────────────────────────────────────────────────── */
  const handlePrev = useCallback(() => {
    if (view === 'date') {
      if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
      else setCurrentMonth((m) => m - 1);
    } else if (view === 'month') setCurrentYear((y) => y - 1);
    else setCurrentYear((y) => y - 12);
  }, [view, currentMonth]);

  const handleNext = useCallback(() => {
    if (view === 'date') {
      if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
      else setCurrentMonth((m) => m + 1);
    } else if (view === 'month') setCurrentYear((y) => y + 1);
    else setCurrentYear((y) => y + 12);
  }, [view, currentMonth]);

  const handleHeaderClick = useCallback(() => {
    if (view === 'date') setView('month');
    else if (view === 'month') setView('year');
  }, [view]);

  const handleItemClick = useCallback((item: CalendarMonthYear) => {
    if (view === 'year') { setCurrentYear(item.value as number); setView('month'); }
    else if (view === 'month') { setCurrentMonth(item.value as number); setView('date'); }
  }, [view]);

  /* ── Day click ───────────────────────────────────────────────────────── */
  const handleDayClick = useCallback((day: CalendarDay) => {
    if (day.type === 'outOfMonth') return;
    const clicked = new Date(currentYear, currentMonth, day.date);

    if (mode === 'single') {
      setDraftSingle(clicked);
      setSingleInputText(formatDate(clicked));
    } else {
      if (rangeClickCount === 0 || rangeClickCount === 2) {
        setDraftStart(clicked); setDraftEnd(null);
        setStartRawText(formatDate(clicked)); setEndRawText('');
        setRangeClickCount(1); updatePreset('custom');
      } else {
        if (clicked < draftStart!) {
          setDraftStart(clicked); setDraftEnd(draftStart);
          setStartRawText(formatDate(clicked)); setEndRawText(formatDate(draftStart!));
        } else {
          setDraftEnd(clicked); setEndRawText(formatDate(clicked));
        }
        setRangeClickCount(2); setHoverDate(null);
      }
    }
  }, [currentYear, currentMonth, mode, rangeClickCount, draftStart, updatePreset]);

  /* ── Preset click ──────────────────────────────────────────────────────
     Presets commit immediately and close the popover — user expectation is
     that picking "Last 7 days" updates the chart without clicking Apply.
     Calendar day clicks (handleDayClick) stay in draft and still need Apply. */
  const handlePresetSelect = useCallback((presetValue: string) => {
    updatePreset(presetValue);
    const range = getPresetDateRange(presetValue);
    if (range) {
      setDraftStart(range.start); setDraftEnd(range.end);
      setStartRawText(formatDate(range.start)); setEndRawText(formatDate(range.end));
      setStartTimeRaw(formatTime(range.start)); setEndTimeRaw(formatTime(range.end));
      setRangeClickCount(2);
      setCurrentMonth(range.start.getMonth()); setCurrentYear(range.start.getFullYear());
      const committed = { start: range.start, end: range.end };
      onRangeChange?.(committed);
      setInternalRange(committed);
      setOpen(false);
    }
  }, [updatePreset, onRangeChange, setOpen]);

  /* ── Apply / Cancel ──────────────────────────────────────────────────── */
  const handleApply = useCallback(() => {
    if (mode === 'single') onChange?.(draftSingle);
    else if (draftStart && draftEnd) {
      const committed = { start: draftStart, end: draftEnd };
      onRangeChange?.(committed);
      setInternalRange(committed);
    }
    setOpen(false);
  }, [mode, draftSingle, draftStart, draftEnd, onChange, onRangeChange, setOpen]);

  const handleCancel = useCallback(() => {
    if (mode === 'single') {
      setDraftSingle(value ?? null);
      setSingleInputText(value ? formatDate(value) : '');
    } else {
      setDraftStart(rangeValue?.start ?? null); setDraftEnd(rangeValue?.end ?? null);
      setStartRawText(rangeValue?.start ? formatDate(rangeValue.start) : '');
      setEndRawText(rangeValue?.end ? formatDate(rangeValue.end) : '');
      setStartTimeRaw(rangeValue?.start ? formatTime(rangeValue.start) : '00:00');
      setEndTimeRaw(rangeValue?.end ? formatTime(rangeValue.end) : '00:00');
      setRangeClickCount(rangeValue ? 2 : 0);
    }
    updatePreset(originalPresetRef.current);
    setHoverDate(null); setView('date'); setOpen(false);
  }, [mode, value, rangeValue, setOpen, updatePreset]);

  /* ── Range hover preview ─────────────────────────────────────────────── */
  const handleDayHover = useCallback((day: CalendarDay) => {
    if (mode !== 'range' || rangeClickCount !== 1 || day.type === 'outOfMonth') return;
    setHoverDate(new Date(currentYear, currentMonth, day.date as number));
  }, [mode, rangeClickCount, currentYear, currentMonth]);

  const handleDayHoverEnd = useCallback(() => { setHoverDate(null); }, []);

  /* ── Single mode input handler ───────────────────────────────────────── */
  const handleSingleInputChange = useCallback((text: string) => {
    const formatted = formatDateInput(text);
    setSingleInputText(formatted);
    if (formatted === '') { setDraftSingle(null); return; }
    const parsed = parseDateDMY(formatted);
    if (parsed) {
      setDraftSingle(parsed);
      setCurrentMonth(parsed.getMonth()); setCurrentYear(parsed.getFullYear());
      if (!open) setOpen(true);
    }
  }, [open, setOpen]);

  /* ── Range mode input handlers ───────────────────────────────────────── */
  const handleStartDateChange = useCallback((text: string) => {
    setStartRawText(text);
    const parsed = parseDateDMY(text);
    if (parsed) {
      setDraftStart((prev) => { const next = new Date(parsed); if (prev) next.setHours(prev.getHours(), prev.getMinutes()); return next; });
      setCurrentMonth(parsed.getMonth()); setCurrentYear(parsed.getFullYear());
      setRangeClickCount(1); updatePreset('custom');
    }
  }, [updatePreset]);

  const handleEndDateChange = useCallback((text: string) => {
    setEndRawText(text);
    const parsed = parseDateDMY(text);
    if (parsed) {
      if (draftStart && parsed < draftStart) {
        const newStart = new Date(parsed); const newEnd = new Date(draftStart);
        newStart.setHours(draftStart.getHours(), draftStart.getMinutes());
        setDraftStart(newStart); setDraftEnd(newEnd);
        setStartRawText(formatDate(newStart)); setEndRawText(formatDate(newEnd));
      } else {
        setDraftEnd((prev) => { const next = new Date(parsed); if (prev) next.setHours(prev.getHours(), prev.getMinutes()); return next; });
      }
      setRangeClickCount(2); updatePreset('custom');
    }
  }, [draftStart, updatePreset]);

  const handleStartTimeChange = useCallback((text: string) => {
    setStartTimeRaw(text);
    const parsed = parseTime(text);
    if (parsed) setDraftStart((prev) => { if (!prev) return prev; const next = new Date(prev); next.setHours(parsed.hours, parsed.minutes); return next; });
  }, []);

  const handleEndTimeChange = useCallback((text: string) => {
    setEndTimeRaw(text);
    const parsed = parseTime(text);
    if (parsed) setDraftEnd((prev) => { if (!prev) return prev; const next = new Date(prev); next.setHours(parsed.hours, parsed.minutes); return next; });
  }, []);

  /* ── Derived values ──────────────────────────────────────────────────── */
  const isApplyDisabled = mode === 'single'
    ? draftSingle === null
    : !(draftStart && draftEnd && rangeClickCount === 2);

  return {
    // State
    open, setOpen, presetOpen, setPresetOpen, preset, view,
    // Refs
    containerRef, closedByKeyboard,
    // Calendar data
    days, monthItems, yearItems, headerLabel,
    // Draft values
    draftSingle, singleInputText, startRawText, endRawText, startTimeRaw, endTimeRaw,
    resolvedRange,
    // Derived
    isApplyDisabled,
    // Handlers
    closeAndRevert,
    handlePrev, handleNext, handleHeaderClick, handleItemClick,
    handleDayClick, handleDayHover, handleDayHoverEnd,
    handlePresetSelect, handleApply, handleCancel,
    handleSingleInputChange,
    handleStartDateChange, handleEndDateChange,
    handleStartTimeChange, handleEndTimeChange,
  };
}
