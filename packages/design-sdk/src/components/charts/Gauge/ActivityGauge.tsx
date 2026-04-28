import { forwardRef, useMemo } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   highcharts-more + solid-gauge module init — REQUIRED for `solidgauge` type
   ───────────────────────────────────────────────────────────────────────────
   Same ESM import strategy as SeriesGauge — see SeriesGauge.tsx for the full
   explanation of why we use `highcharts/esm/` paths here instead of the
   top-level `'highcharts'` path.
   ═══════════════════════════════════════════════════════════════════════════ */
import Highcharts from 'highcharts/esm/highcharts';
import 'highcharts/esm/highcharts-more';
import 'highcharts/esm/modules/solid-gauge';
import HighchartsReact from 'highcharts-react-official';
import type { Options } from 'highcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps } from '../Chart/Chart';
import {
  useFaclonChartTheme,
  FACLON_CHART_PALETTE_TOKENS,
} from '../Chart/highchartsTheme';
import './ActivityGauge.css';

/** Read a CSS custom property from `:root`. Returns the fallback on the
 *  server (where `window` is undefined) or when the var is missing. */
function readCssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ActivityItem {
  /** Ring label — shown in the tooltip and optional legend. */
  name: string;
  /**
   * Current value on the ring's scale. Normalized to 0–100 internally via
   * `(value / max) * 100` before being passed to Highcharts.
   */
  value: number;
  /**
   * Upper bound for this ring's scale.
   * @default 100
   */
  max?: number;
}

export interface ActivityGaugeProps extends Omit<ChartProps, 'children'> {
  /** One entry per concentric ring — outermost first. */
  activities: ActivityItem[];
  /**
   * Show the Highcharts legend below the chart.
   * @default true
   */
  showLegend?: boolean;
  /** Highcharts options escape hatch — merged last, overrides all defaults. */
  highchartsOptions?: Partial<Options>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Ring geometry — scaled to fit within 100 % so no extra chart.height is
   needed. Same proportions (24 % width, 1 % gap) as the Highcharts demo.
     Ring 0 (outermost): 100 % → 76 %
     Ring 1:              75 % → 51 %
     Ring 2:              50 % → 26 %
     …
   ═══════════════════════════════════════════════════════════════════════════ */
const RING_WIDTH = 24;
const RING_GAP   = 1;
const RING_STEP  = RING_WIDTH + RING_GAP; // 25

const outerR = (i: number) => 100 - i * RING_STEP;
const innerR = (i: number) => outerR(i) - RING_WIDTH;

/* ═══════════════════════════════════════════════════════════════════════════
   ActivityGauge — Multiple KPI concentric ring gauge
   ───────────────────────────────────────────────────────────────────────────
   Verbatim Highcharts Multiple KPI Gauge demo with Faclon semantic token
   colors substituted for the default Highcharts palette. Ring geometry,
   tooltip position, rounded linecaps, track opacity — all match the demo.
   ═══════════════════════════════════════════════════════════════════════════ */

export const ActivityGauge = forwardRef<HTMLDivElement, ActivityGaugeProps>(
  (
    {
      activities,
      showLegend = true,
      highchartsOptions,
      ...chartProps
    },
    ref,
  ) => {
    const theme = useFaclonChartTheme();

    const options = useMemo<Options>(() => {
      if (!activities || activities.length === 0) {
        return { ...theme, chart: { type: 'solidgauge' } };
      }

      /* Resolve one Faclon semantic color per ring from the shared palette. */
      const colors = activities.map((_, i) => {
        const token = FACLON_CHART_PALETTE_TOKENS[i % FACLON_CHART_PALETTE_TOKENS.length];
        return readCssVar(token, '#e9690c');
      });

      /* Track backgrounds — 30 % of the series color, from the demo. */
      const trackColors = colors.map(
        (c) => `color-mix(in srgb, ${c} 30%, transparent)`,
      );

      return {
        ...theme,

        chart: {
          ...theme.chart,
          type: 'solidgauge',
        },

        tooltip: {
          backgroundColor: 'none',
          borderWidth: 0,
          shadow: false,
          fixed: true,
          pointFormat:
            '{series.name}<br>' +
            '<span style="font-size: 2em; color: {point.color}; ' +
            'font-weight: bold">{point.y}</span>',
          position: {
            align: 'center',
            verticalAlign: 'middle',
          },
          valueSuffix: '%',
        },

        pane: {
          startAngle: 0,
          endAngle: 360,
          background: activities.map((_, i) => ({
            outerRadius: `${outerR(i)}%`,
            innerRadius: `${innerR(i)}%`,
            backgroundColor: trackColors[i],
            borderWidth: 0,
          })),
        },

        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: [],
        },

        plotOptions: {
          solidgauge: {
            dataLabels: { enabled: false },
            linecap: 'round',
            stickyTracking: false,
            rounded: true,
          },
        },

        legend: {
          ...theme.legend,
          enabled: showLegend,
        },

        series: activities.map((act, i) => ({
          type: 'solidgauge' as const,
          name: act.name,
          showInLegend: true,
          data: [
            {
              color: colors[i],
              radius: `${outerR(i)}%`,
              innerRadius: `${innerR(i)}%`,
              y: Math.min(
                100,
                Math.max(0, (act.value / (act.max ?? 100)) * 100),
              ),
            },
          ],
        })),

        ...highchartsOptions,
      };
    }, [activities, theme, showLegend, highchartsOptions]);

    return (
      <Chart ref={ref} {...chartProps}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ className: 'fds-activity-gauge' }}
        />
      </Chart>
    );
  },
);

ActivityGauge.displayName = 'ActivityGauge';
