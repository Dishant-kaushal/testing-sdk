import type { CalendarDay, CalendarMonthYear } from './CalendarBase';
import type { DayCellType } from './CalendarDayCell';

/* ═══════════════════════════════════════════════════════════════════════════
   Calendar grid generation
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Generate a calendar grid for the given month/year.
 * Only produces as many rows as needed (typically 5, sometimes 4 or 6).
 * Applies range/selection/currentDate types automatically.
 */
export function generateCalendarDays(
  year: number,
  month: number,
  rangeStart?: Date | null,
  rangeEnd?: Date | null,
  selectedDate?: Date | null,
  hoverDate?: Date | null,
): CalendarDay[][] {
  const firstDay = new Date(year, month, 1);
  const startDow = firstDay.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const totalCells = startDow + daysInMonth;
  const totalWeeks = Math.ceil(totalCells / 7);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  const grid: CalendarDay[][] = [];
  let dayCounter = 1;
  let nextMonthCounter = 1;

  for (let week = 0; week < totalWeeks; week++) {
    const row: CalendarDay[] = [];
    for (let dow = 0; dow < 7; dow++) {
      const cellIndex = week * 7 + dow;

      if (cellIndex < startDow) {
        // Previous month
        const d = prevMonthDays - startDow + cellIndex + 1;
        row.push({ date: d, type: 'outOfMonth' });
      } else if (dayCounter > daysInMonth) {
        // Next month
        row.push({ date: nextMonthCounter++, type: 'outOfMonth' });
      } else {
        // Current month
        const currentDate = new Date(year, month, dayCounter);
        const dateStr = `${year}-${month}-${dayCounter}`;
        const isToday = dateStr === todayStr;

        let type: DayCellType = isToday ? 'currentDate' : 'default';
        let isSelected = false;

        // Range typing — overrides currentDate type but isCurrentDate flag preserves dot
        if (rangeStart && rangeEnd) {
          const start = rangeStart.getTime();
          const end = rangeEnd.getTime();
          const cur = currentDate.getTime();

          if (start === end && cur === start) {
            // Same date clicked twice — fully rounded, treat as a regular selected cell
            isSelected = true;
          } else if (cur === start) {
            type = 'rangeStart';
          } else if (cur === end) {
            type = 'rangeEnd';
          } else if (cur > start && cur < end) {
            type = 'rangeIn';
          }
        } else if (rangeStart && !rangeEnd) {
          const start = rangeStart.getTime();
          const cur = currentDate.getTime();

          if (hoverDate) {
            const hover = hoverDate.getTime();
            if (start === hover) {
              // Hovering over the start itself — fully rounded
              if (cur === start) isSelected = true;
            } else {
              const lo = Math.min(start, hover);
              const hi = Math.max(start, hover);
              if (cur === lo) type = 'rangeStart';
              else if (cur === hi) type = 'rangeEnd';
              else if (cur > lo && cur < hi) type = 'rangeIn';
            }
          } else {
            // No hover yet — show start as fully-rounded selected
            if (cur === start) isSelected = true;
          }
        }

        // Single selection
        if (
          selectedDate &&
          selectedDate.getFullYear() === year &&
          selectedDate.getMonth() === month &&
          selectedDate.getDate() === dayCounter
        ) {
          isSelected = true;
        }

        row.push({ date: dayCounter, type, isSelected, isCurrentDate: isToday });
        dayCounter++;
      }
    }
    grid.push(row);
  }

  return grid;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Month / Year grids
   ═══════════════════════════════════════════════════════════════════════════ */

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Generate a 4×3 month grid, marking `selectedMonth` (0-based). */
export function generateMonths(selectedMonth?: number): CalendarMonthYear[][] {
  const grid: CalendarMonthYear[][] = [];
  for (let row = 0; row < 4; row++) {
    const r: CalendarMonthYear[] = [];
    for (let col = 0; col < 3; col++) {
      const idx = row * 3 + col;
      r.push({ label: MONTH_LABELS[idx], value: idx, isSelected: idx === selectedMonth });
    }
    grid.push(r);
  }
  return grid;
}

/** Generate a 4×3 year grid starting from `decadeStart`, marking `selectedYear`. */
export function generateYears(decadeStart: number, selectedYear?: number): CalendarMonthYear[][] {
  const grid: CalendarMonthYear[][] = [];
  let y = decadeStart;
  for (let row = 0; row < 4; row++) {
    const r: CalendarMonthYear[] = [];
    for (let col = 0; col < 3; col++) {
      r.push({ label: String(y), value: y, isSelected: y === selectedYear });
      y++;
    }
    grid.push(r);
  }
  return grid;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Preset date ranges
   ═══════════════════════════════════════════════════════════════════════════ */

/** Map a preset value to a concrete date range. Returns null for 'custom'. */
export function getPresetDateRange(presetValue: string): { start: Date; end: Date } | null {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  switch (presetValue) {
    case 'today':
      return { start: today, end: today };

    case 'yesterday':
      return { start: yesterday, end: yesterday };

    case 'current_week': {
      const dow = today.getDay();
      const monday = new Date(today);
      monday.setDate(today.getDate() - ((dow + 6) % 7));
      return { start: monday, end: today };
    }

    case 'previous_7_days': {
      const start = new Date(today);
      start.setDate(today.getDate() - 7);
      return { start, end: yesterday };
    }

    case 'current_month':
      return { start: new Date(today.getFullYear(), today.getMonth(), 1), end: today };

    case 'previous_month': {
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const end = new Date(today.getFullYear(), today.getMonth(), 0);
      return { start, end };
    }

    case 'previous_3_month': {
      const start = new Date(today.getFullYear(), today.getMonth() - 3, 1);
      const end = new Date(today.getFullYear(), today.getMonth(), 0);
      return { start, end };
    }

    case 'previous_12_month': {
      const start = new Date(today.getFullYear(), today.getMonth() - 12, 1);
      const end = new Date(today.getFullYear(), today.getMonth(), 0);
      return { start, end };
    }

    case 'current_year':
      return { start: new Date(today.getFullYear(), 0, 1), end: today };

    case 'previous_year': {
      const y = today.getFullYear() - 1;
      return { start: new Date(y, 0, 1), end: new Date(y, 11, 31) };
    }

    default:
      return null; // 'custom' or unknown
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   Formatting
   ═══════════════════════════════════════════════════════════════════════════ */

/** Format a Date as DD/MM/YYYY */
export function formatDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

/**
 * Format a raw keystroke string into DD/MM/YYYY with auto-slashes and clamping.
 * - Strips non-digits, keeps max 8 digits (DDMMYYYY).
 * - Clamps day to 01–31, month to 01–12.
 * - Inserts "/" automatically after the day and month segments fill up.
 */
export function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);

  let d = digits.slice(0, 2);
  let m = digits.slice(2, 4);
  const y = digits.slice(4, 8);

  // Clamp two-digit day (01–31)
  if (d.length === 2) {
    const v = parseInt(d, 10);
    if (v < 1) d = '01';
    else if (v > 31) d = '31';
  }

  // Clamp two-digit month (01–12)
  if (m.length === 2) {
    const v = parseInt(m, 10);
    if (v < 1) m = '01';
    else if (v > 12) m = '12';
  }

  // Reassemble with auto-slashes only when the next segment has digits
  let result = d;
  if (d.length === 2 && digits.length > 2) result += '/';
  if (m) result += m;
  if (m.length === 2 && digits.length > 4) result += '/';
  if (y) result += y;

  return result;
}

/** Parse a DD/MM/YYYY string into a Date. Returns null if the string is incomplete or invalid. */
export function parseDateDMY(value: string): Date | null {
  const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  const d = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const y = parseInt(match[3], 10);
  if (m < 1 || m > 12 || d < 1) return null;
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

/**
 * Format a raw keystroke string into HH:MM (24-hour) with auto-colon and clamping.
 * - Strips non-digits, keeps max 4 digits (HHMM).
 * - Clamps hours to 00–23, minutes to 00–59.
 * - Inserts ":" automatically after the hour segment fills up.
 */
export function formatTimeInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4);

  let h = digits.slice(0, 2);
  const m = digits.slice(2, 4);

  // Clamp two-digit hours (00–23)
  if (h.length === 2) {
    const v = parseInt(h, 10);
    if (v > 23) h = '23';
  }

  // Clamp two-digit minutes (00–59)
  let mClamped = m;
  if (m.length === 2) {
    const v = parseInt(m, 10);
    if (v > 59) mClamped = '59';
  }

  let result = h;
  if (h.length === 2 && digits.length > 2) result += ':';
  if (mClamped) result += mClamped;

  return result;
}

/** Parse a HH:MM string and return { hours, minutes } or null if invalid. */
export function parseTime(value: string): { hours: number; minutes: number } | null {
  const match = value.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  if (hours > 23 || minutes > 59) return null;
  return { hours, minutes };
}

/** Format a Date as HH:MM */
export function formatTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

/** Get the header label for the current view */
export function getHeaderLabel(view: 'date' | 'month' | 'year', year: number, month: number, decadeStart: number): string {
  switch (view) {
    case 'date':
      return `${MONTH_LABELS[month]} ${year}`;
    case 'month':
      return String(year);
    case 'year':
      return `${decadeStart} - ${decadeStart + 11}`;
  }
}
