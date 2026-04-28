import { useMemo } from 'react';
import type { ApexOptions } from 'apexcharts';

/* ═══════════════════════════════════════════════════════════════════════════
   Faclon ApexCharts theme
   ───────────────────────────────────────────────────────────────────────────
   Internal module — NOT re-exported from `Chart/index.ts` so the base Chart
   bundle stays free of any ApexCharts dependency. Each ApexCharts gauge
   wrapper imports this module directly via a relative path.

   Same philosophy as `highchartsTheme.ts`: only colors and text styling from
   the Faclon design system, everything else is ApexCharts defaults.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Faclon chart palette — same tokens used by the Highcharts theme. */
export const FACLON_APEX_PALETTE_TOKENS: readonly string[] = [
  '--background-warning-default',
  '--background-info-default',
  '--background-positive-default',
  '--background-error-default',
  '--background-warning-default-hover',
  '--background-info-default-hover',
  '--background-positive-default-hover',
  '--background-brand-default',
];

function readCssVar(name: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Build an ApexCharts options object themed to match Faclon tokens.
 *
 * Returns a memoized `ApexOptions` with ONLY Faclon color + text styling.
 * Each gauge wrapper merges this with its type-specific config before
 * passing to `<ReactApexChart>`.
 */
export function useFaclonApexTheme(): ApexOptions {
  return useMemo<ApexOptions>(() => {
    const fontFamily = "'Noto Sans Variable', 'Noto Sans', sans-serif";

    const textPrimary = readCssVar('--text-gray-primary') || '#192839';
    const textSecondary = readCssVar('--text-gray-secondary') || '#40566d';
    const bgIntense = readCssVar('--background-surface-intense') || '#ffffff';
    const borderSubtle = readCssVar('--border-gray-subtle') || '#cbd5e2';

    const palette = FACLON_APEX_PALETTE_TOKENS
      .map((name) => readCssVar(name))
      .filter((c): c is string => c.length > 0);

    return {
      colors: palette,
      chart: {
        fontFamily,
        foreColor: textPrimary,
        background: bgIntense,
      },
      plotOptions: {
        radialBar: {
          track: {
            background: borderSubtle,
          },
          dataLabels: {
            name: {
              color: textSecondary,
              fontFamily,
              fontSize: '14px',
            },
            value: {
              color: textPrimary,
              fontFamily,
              fontSize: '24px',
              fontWeight: 600,
            },
          },
        },
      },
      legend: {
        fontFamily,
        labels: { colors: textSecondary },
      },
    };
  }, []);
}
