import { useMemo } from 'react';
import type { Options } from 'highcharts';

/* ═══════════════════════════════════════════════════════════════════════════
   Faclon Highcharts theme
   ───────────────────────────────────────────────────────────────────────────
   Internal module — NOT re-exported from `Chart/index.ts` so the base
   Chart bundle stays free of any Highcharts dependency. Each chart-type
   wrapper (ColumnChart, LineChart, BarChart, etc.) imports this module
   directly via a relative path.

   This theme is intentionally minimal: it only sets the **colors** and
   **text styling** that come from the Faclon design system, and leaves
   every other Highcharts default untouched. The directive (per the SDK
   owner) is "all charts are from default Highcharts lib only the colors
   and text styling are from our design system, don't make anything custom
   on top of that". Concretely:

   - Series palette → Faclon semantic color tokens
   - Chart background → Faclon `--background-surface-intense`
   - Font family → Noto Sans Variable
   - Axis label / title text colors → Faclon text tokens
   - Axis line / tick / gridline COLORS → Faclon `--border-gray-subtle`
   - Legend item text colors → Faclon text tokens

   Everything else (legend symbol shape, plotOptions, tooltip styling,
   chart spacing, animation timing, hover states, gridline width, …) uses
   Highcharts' built-in defaults. Per-chart-type wrappers should NOT
   re-introduce the kind of custom styling this theme intentionally omits.

   Note: this module does NOT auto-flip on dark-mode toggle. CSS vars are
   read once when the chart mounts. If a consumer needs the chart to react
   to a runtime theme change, they should re-mount the chart (e.g. by
   keying its parent on the active theme).
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Default Faclon chart series palette — entirely token-driven, sourced
 * exclusively from the SDK's **semantic** color tokens (not global hex
 * tokens). The chart resolves each variable to an actual color at runtime
 * via `getComputedStyle` inside `useFaclonChartTheme()`.
 *
 * Used in source order — series 1 gets the first color, series 2 gets the
 * second, etc. Consumers can override per-series via
 * `<ColumnChart series={[{ color: '#...' }]} />`.
 */
export const FACLON_CHART_PALETTE_TOKENS: readonly string[] = [
  '--background-warning-default',        // 1. orange
  '--background-info-default',           // 2. blue
  '--background-positive-default',       // 3. green
  '--background-error-default',          // 4. red
  '--background-warning-default-hover',  // 5. dark orange
  '--background-info-default-hover',     // 6. dark blue
  '--background-positive-default-hover', // 7. dark green
  '--background-brand-default',          // 8. brand (charcoal — neutral, last)
];

/**
 * Read a CSS custom property from `:root`. Returns an empty string on the
 * server (where `window` is undefined) so that the `||` fallback in the
 * theme builder picks up a sane default.
 */
export function readCssVar(name: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Read a CSS var that's stored as a plain number (e.g. `--global-fz-12: 12`)
 * and append "px" so it can be passed to Highcharts as a font-size string.
 */
function readCssPx(name: string, fallbackPx: number): string {
  const raw = readCssVar(name);
  return raw ? `${raw}px` : `${fallbackPx}px`;
}

/**
 * Build a Highcharts options object themed to match Faclon tokens.
 *
 * Returns a memoized `Highcharts.Options` that contains ONLY the Faclon
 * color + text styling overrides. Each chart-type wrapper merges this with
 * its own type-specific config (`type: 'column'`, series data, etc.) before
 * passing to `<HighchartsReact>`.
 *
 * Uses Faclon semantic color tokens via `getComputedStyle`. Falls back to
 * the literal token value if `window` is unavailable (SSR) or the var is
 * missing.
 */
export function useFaclonChartTheme(): Options {
  return useMemo<Options>(() => {
    const fontFamily = "'Noto Sans Variable', 'Noto Sans', sans-serif";

    const textPrimary = readCssVar('--text-gray-primary') || '#192839';
    const textSecondary = readCssVar('--text-gray-secondary') || '#40566d';
    const bgIntense = readCssVar('--background-surface-intense') || '#ffffff';
    const borderSubtle = readCssVar('--border-gray-subtle') || '#cbd5e2';

    const fontSize12 = readCssPx('--global-fz-12', 12);
    const fontSize14 = readCssPx('--global-fz-14', 14);

    /* Resolve palette tokens at runtime. Empty entries (SSR, missing var)
       are dropped so Highcharts cycles only the colors it can actually use. */
    const palette = FACLON_CHART_PALETTE_TOKENS
      .map((name) => readCssVar(name))
      .filter((color): color is string => color.length > 0);

    return {
      colors: palette,

      chart: {
        backgroundColor: bgIntense,
        style: { fontFamily },
      },

      title: { text: undefined },
      subtitle: { text: undefined },
      credits: { enabled: false },

      xAxis: {
        labels: {
          style: { color: textPrimary, fontFamily, fontSize: fontSize12 },
        },
        lineColor: borderSubtle,
        tickColor: borderSubtle,
        title: {
          style: { color: textSecondary, fontFamily, fontSize: fontSize12 },
        },
      },

      yAxis: {
        labels: {
          style: { color: textPrimary, fontFamily, fontSize: fontSize12 },
        },
        gridLineColor: borderSubtle,
        lineColor: borderSubtle,
        tickColor: borderSubtle,
        title: {
          style: { color: textSecondary, fontFamily, fontSize: fontSize12 },
        },
      },

      legend: {
        itemStyle: { color: textSecondary, fontFamily, fontSize: fontSize14 },
        itemHoverStyle: { color: textPrimary },
      },
    };
  }, []);
}
