import { forwardRef, useMemo } from 'react';
/* ═══════════════════════════════════════════════════════════════════════════
   highcharts-more module init — REQUIRED for `chart.type: 'gauge'`
   ───────────────────────────────────────────────────────────────────────────
   We import BOTH the Highcharts namespace AND the highcharts-more module
   from the `highcharts/esm/` directory (NOT the top-level `'highcharts'`
   path) so that:

     1. `<HighchartsReact>` and `highcharts-more` operate on the SAME module
        instance — the relative `./highcharts.js` import inside the ESM
        highcharts-more file resolves to the exact same `esm/highcharts.js`
        file we load here, so the gauge series type registers on the
        instance we then pass to `<HighchartsReact>`.
     2. No window-global lookup — the top-level UMD bundle of highcharts-
        more crashes under Vite/Storybook with "Cannot read properties of
        undefined (reading 'SeriesRegistry')" because it expects
        `window._Highcharts.SeriesRegistry` to exist, which the top-level
        `'highcharts'` UMD bundle does NOT set when loaded via ESM import.

   The other chart wrappers (Column/Line/Area/Bar) don't need highcharts-
   more so they keep using the top-level `'highcharts'` path. Two Highcharts
   instances coexist in memory at runtime — independent and safe.
   ═══════════════════════════════════════════════════════════════════════════ */
import Highcharts from 'highcharts/esm/highcharts.js';
import 'highcharts/esm/highcharts-more.js';
import HighchartsReact from 'highcharts-react-official';
import type { Options } from 'highcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps } from '../Chart/Chart';
import { useFaclonChartTheme } from '../Chart/highchartsTheme';
import './SeriesGauge.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * A single colored zone rendered behind the needle as a Highcharts plotBand.
 * `from` and `to` are positions on the gauge value scale (NOT percentages),
 * `color` is any valid CSS color string — pass a Faclon semantic token via
 * `getComputedStyle` (see `tokenColor()` in the story file) to keep the band
 * palette aligned with the design system.
 */
export interface GaugeBand {
  /** Lower bound of the band on the gauge value scale. */
  from: number;
  /** Upper bound of the band on the gauge value scale. */
  to: number;
  /** Fill color — hex, rgb, hsl, or a token-resolved hex string. */
  color: string;
}

export interface SeriesGaugeProps extends Omit<ChartProps, 'children'> {
  /** Current value the needle points to. Clamped to [`min`, `max`] by Highcharts. */
  value: number;
  /**
   * Lower bound of the gauge value scale.
   * @default 0
   */
  min?: number;
  /**
   * Upper bound of the gauge value scale.
   * @default 100
   */
  max?: number;
  /**
   * Colored zones rendered as plot bands behind the needle. Each entry is a
   * `{ from, to, color }` triple on the gauge value scale.
   * @default []
   */
  bands?: GaugeBand[];
  /** Suffix appended to the auto-generated value label (e.g. `'kWh'`). */
  unit?: string;
  /**
   * Display string rendered below the gauge center. Supports Highcharts
   * format syntax via `{y}` for the current value. If omitted, falls back
   * to `{y}${unit ?? ''}` so passing only `unit` formats nicely.
   */
  label?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SeriesGauge — half-circle needle gauge
   ───────────────────────────────────────────────────────────────────────────
   Wraps the design-system `Chart` base for the header / breadcrumb / actions /
   filters / canvas layout, and renders a Highcharts `gauge` instance inside
   the canvas slot.

   This component uses the **Highcharts default gauge series** demo as its
   baseline (https://www.highcharts.com/demo/gauge-speedometer) — the same
   speedometer config Highcharts ships in its docs, with the dial, pivot,
   tick marks, plotBand thickness, pane center / size, and pane background
   that the demo specifies. The ONLY things substituted in are Faclon design-
   system tokens for colors (dial, pivot, tick, label colors), font family
   (Noto Sans), and the consumer's `value` / `min` / `max` / `bands` /
   `unit` / `label` props. No custom logic on top of the demo.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Read a CSS custom property from `:root`. Returns the fallback on the
 *  server (where `window` is undefined) or when the var is missing. */
function readCssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
}

export const SeriesGauge = forwardRef<HTMLDivElement, SeriesGaugeProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      bands = [],
      unit,
      label,
      ...chartProps
    },
    ref,
  ) => {
    const theme = useFaclonChartTheme();

    const options = useMemo<Options>(() => {
      /* Faclon design-system token resolution — only used to substitute
         colors and font into the Highcharts speedometer demo config. */
      const fontFamily = "'Noto Sans Variable', 'Noto Sans', sans-serif";
      const textPrimary = readCssVar('--text-gray-primary', '#192839');
      const bgIntense = readCssVar('--background-surface-intense', '#ffffff');

      return {
        ...theme,
        chart: {
          ...theme.chart,
          type: 'gauge',
          plotBackgroundColor: undefined,
          plotBackgroundImage: undefined,
          plotBorderWidth: 0,
          plotShadow: false,
        },

        /* Half-circle pane with the dial pivot pulled down so the dome
           fills the upper portion of the canvas. The Highcharts speedometer
           demo uses `background: null` to remove the default gray track ring,
           but TypeScript's `Highcharts.PaneBackgroundOptions[]` type doesn't
           allow null. Instead we provide a single transparent background
           entry — same visual result (no gray ring), no `innerRadius` crash,
           and TypeScript-clean. */
        pane: {
          startAngle: -90,
          endAngle: 89.9,
          background: [
            {
              backgroundColor: 'transparent',
              borderWidth: 0,
              innerRadius: '0%',
              outerRadius: '100%',
              shape: 'arc',
            },
          ],
          center: ['50%', '75%'],
          size: '110%',
        },

        yAxis: {
          min,
          max,
          tickPixelInterval: 72,
          /* Tick marks hidden — the speedometer demo uses white tick marks
             on top of the colored bands to subdivide them, but the Faclon
             design wants continuous bands. Setting tickLength + tickWidth
             to 0 removes the tick marks while keeping the auto-derived tick
             label positions. */
          tickLength: 0,
          tickWidth: 0,
          tickColor: bgIntense,
          minorTickInterval: undefined,
          labels: {
            distance: 20,
            style: {
              fontSize: '14px',
              color: textPrimary,
              fontFamily,
            },
          },
          lineWidth: 0,
          plotBands: bands.map((b) => ({
            from: b.from,
            to: b.to,
            color: b.color,
            thickness: 20,
          })),
          title: { text: undefined },
        },

        series: [
          {
            type: 'gauge',
            name: 'Value',
            data: [value],
            dataLabels: {
              format: label ?? `{y}${unit ?? ''}`,
              borderWidth: 0,
              color: textPrimary,
              style: {
                fontSize: '16px',
                fontFamily,
              },
            },
            dial: {
              radius: '80%',
              backgroundColor: textPrimary,
              baseWidth: 12,
              baseLength: '0%',
              rearLength: '0%',
            },
            pivot: {
              backgroundColor: textPrimary,
              radius: 6,
            },
          },
        ],
      };
    }, [theme, value, min, max, bands, unit, label]);

    return (
      <Chart ref={ref} {...chartProps}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ className: 'fds-series-gauge' }}
        />
      </Chart>
    );
  },
);

SeriesGauge.displayName = 'SeriesGauge';
