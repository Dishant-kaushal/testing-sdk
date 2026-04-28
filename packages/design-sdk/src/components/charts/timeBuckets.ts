/* ═══════════════════════════════════════════════════════════════════════════
   Time-bucket utilities for chart data shaping.

   Charts in this SDK are dumb renderers — they take `categories` + `series`
   and draw them. The *shape* of the time dimension (how a range is cut into
   buckets, whether first/last buckets are clipped or expanded, whether units
   are fixed or mixed) lives here so consumers have one authoritative
   implementation and every chart behaves the same way.

   Per the Figma spec (node 2883:556):
   - **Clipping** — when ON, boundary buckets are trimmed to the exact range;
     when OFF, they are expanded outward to the nearest whole-period boundary.
   - **Inexact Multiple** — splits a range into mixed-unit buckets (e.g.
     40 days → 1 month + 1 week + 3 days) instead of forcing a single unit.
   ═══════════════════════════════════════════════════════════════════════════ */

export type Periodicity = 'Hourly' | 'Daily' | 'Weekly' | 'Monthly';

export interface TimeBucket {
  /** Inclusive start of this bucket. */
  start: Date;
  /** Exclusive end of this bucket. */
  end: Date;
  /** Human-readable label for axis / tooltip display. */
  label: string;
}

export interface BucketRangeOptions {
  /**
   * When `true` (default), the first and last bucket are trimmed to the exact
   * range boundaries. When `false`, they are expanded outward to the nearest
   * whole-period boundary — useful when the consumer wants every bucket to
   * represent a complete period (e.g. a full calendar month), at the cost of
   * showing data slightly outside the selected range.
   * @default true
   */
  clipping?: boolean;
}

/* ── Internal helpers ─────────────────────────────────────────────────────── */

const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;

function startOfHour(d: Date): Date {
  const r = new Date(d);
  r.setMinutes(0, 0, 0);
  return r;
}

function startOfDay(d: Date): Date {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  return r;
}

/** Sunday-anchored week start. Swap to Monday by adjusting the offset. */
function startOfWeek(d: Date): Date {
  const r = startOfDay(d);
  r.setDate(r.getDate() - r.getDay());
  return r;
}

function startOfMonth(d: Date): Date {
  const r = new Date(d);
  r.setDate(1);
  r.setHours(0, 0, 0, 0);
  return r;
}

function addPeriod(d: Date, periodicity: Periodicity, amount: number): Date {
  const r = new Date(d);
  if (periodicity === 'Hourly') r.setHours(r.getHours() + amount);
  else if (periodicity === 'Daily') r.setDate(r.getDate() + amount);
  else if (periodicity === 'Weekly') r.setDate(r.getDate() + amount * 7);
  else /* Monthly */ r.setMonth(r.getMonth() + amount);
  return r;
}

function periodStart(d: Date, periodicity: Periodicity): Date {
  if (periodicity === 'Hourly') return startOfHour(d);
  if (periodicity === 'Daily') return startOfDay(d);
  if (periodicity === 'Weekly') return startOfWeek(d);
  return startOfMonth(d);
}

function labelFor(d: Date, periodicity: Periodicity): string {
  if (periodicity === 'Hourly') return `${String(d.getHours()).padStart(2, '0')}:00`;
  if (periodicity === 'Daily') return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (periodicity === 'Weekly') {
    const end = addPeriod(d, 'Weekly', 1);
    return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–${end.toLocaleDateString('en-US', { day: 'numeric' })}`;
  }
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/* ── Public API ──────────────────────────────────────────────────────────── */

/**
 * Cut a date range into buckets at the given periodicity.
 *
 * With `clipping: true` (default), the first bucket starts at `range.start`
 * and the last bucket ends at `range.end` — boundary buckets may be partial.
 * With `clipping: false`, buckets are aligned to whole-period boundaries so
 * every bucket represents a complete period; the returned range may extend
 * slightly outside the input on both ends.
 *
 * @example
 * bucketRange({ start: new Date('2026-04-15'), end: new Date('2026-04-17') }, 'Daily');
 * // → 3 daily buckets: Apr 15 (full), Apr 16 (full), Apr 17 (full)
 *
 * @example
 * bucketRange({ start: new Date('2026-04-05'), end: new Date('2026-04-20') }, 'Monthly', { clipping: false });
 * // → 1 monthly bucket starting Apr 1 ending May 1 (expanded outward)
 */
export function bucketRange(
  range: { start: Date; end: Date },
  periodicity: Periodicity,
  opts: BucketRangeOptions = {},
): TimeBucket[] {
  const { clipping = true } = opts;
  if (range.end.getTime() <= range.start.getTime()) return [];

  const firstAnchor = periodStart(range.start, periodicity);
  const buckets: TimeBucket[] = [];
  let cursor = clipping ? new Date(range.start) : firstAnchor;

  while (cursor.getTime() < range.end.getTime()) {
    const nextAnchor = addPeriod(periodStart(cursor, periodicity), periodicity, 1);
    const bucketEnd = clipping
      ? new Date(Math.min(nextAnchor.getTime(), range.end.getTime()))
      : nextAnchor;

    buckets.push({
      start: new Date(cursor),
      end: bucketEnd,
      label: labelFor(periodStart(cursor, periodicity), periodicity),
    });

    cursor = nextAnchor;
    // Safety — prevent runaway loops on pathological input.
    if (buckets.length > 10_000) break;
  }

  return buckets;
}

/**
 * Mixed-unit bucketing — greedily splits a range into the largest possible
 * whole-period buckets, cascading from coarsest to finest.
 *
 * @example
 * bucketRangeInexact({ start: …, end: 40 days later });
 * // → [ { 1 month }, { 1 week }, { 3 days } ]
 */
export function bucketRangeInexact(range: { start: Date; end: Date }): TimeBucket[] {
  const totalMs = range.end.getTime() - range.start.getTime();
  if (totalMs <= 0) return [];

  const buckets: TimeBucket[] = [];
  let cursor = new Date(range.start);

  while (cursor.getTime() < range.end.getTime()) {
    const remainingMs = range.end.getTime() - cursor.getTime();
    let periodicity: Periodicity;
    if (remainingMs >= MS_PER_DAY * 28) periodicity = 'Monthly';
    else if (remainingMs >= MS_PER_DAY * 7) periodicity = 'Weekly';
    else if (remainingMs >= MS_PER_DAY) periodicity = 'Daily';
    else periodicity = 'Hourly';

    const nextAnchor = addPeriod(periodStart(cursor, periodicity), periodicity, 1);
    const bucketEnd = new Date(Math.min(nextAnchor.getTime(), range.end.getTime()));

    buckets.push({
      start: new Date(cursor),
      end: bucketEnd,
      label: labelFor(periodStart(cursor, periodicity), periodicity),
    });

    cursor = bucketEnd;
    if (buckets.length > 10_000) break;
  }

  return buckets;
}
