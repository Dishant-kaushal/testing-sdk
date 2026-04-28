import { forwardRef, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { Options, SeriesOptionsType } from 'highcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps, ChartPointClickContext } from '../Chart/Chart';
import { useFaclonChartTheme } from '../Chart/highchartsTheme';
import './AreaChart.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

/** A single area-chart series — name + numeric data points + optional color override. */
export interface AreaSeries {
  /** Series label shown in the legend */
  name: string;
  /** Numeric values, one per category */
  data: number[];
  /** Override the auto-assigned palette color for this series */
  color?: string;
}

export interface AreaChartProps extends Omit<ChartProps, 'children'> {
  /** Series to render — each rendered as a filled area below a line. */
  series: AreaSeries[];
  /** X-axis category labels (one per index in each series's `data` array). */
  categories: string[];
  /**
   * Stack areas from each category instead of overlapping them. When `true`,
   * Highcharts uses `stacking: 'normal'` so the series stack additively.
   * @default false
   */
  stacked?: boolean;
  /**
   * Render as a 100% stacked area chart — every category sums to 100% and
   * each series is shown as its proportional share. Implies `stacked: true`
   * (overrides it if both are passed).
   * @default false
   */
  percentStacked?: boolean;
  /**
   * Smooth area edges using spline (Bezier) interpolation. Highcharts treats
   * this as `chart.type: 'areaspline'` — same axes, same legend, same fill,
   * just curved boundaries instead of straight ones.
   * @default false
   */
  smooth?: boolean;
  /**
   * Show data-point markers along each area's top edge. Forwarded to each
   * series's `marker.enabled`. Leaving this `undefined` lets Highcharts use
   * its default `'auto'`.
   */
  showMarkers?: boolean;
  /**
   * Show the legend below the chart canvas.
   * @default true
   */
  showLegend?: boolean;
  /**
   * Render exact numeric values at each data point.
   * @default false
   */
  showDataLabels?: boolean;
  /**
   * Make the plot horizontally scrollable when categories overflow.
   * @default false
   */
  scrollable?: boolean;
  /**
   * Minimum plot width (px) when `scrollable` is true.
   * @default 900
   */
  scrollableMinWidth?: number;
  /**
   * Fires when a data point (marker) is clicked. Typical use: time drill-down.
   * Consumer owns the hierarchy state.
   */
  onPointClick?: (ctx: ChartPointClickContext) => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   AreaChart — filled-area chart with optional stacking, percent stacking,
   and smooth (spline) variants.
   ───────────────────────────────────────────────────────────────────────────
   Wraps the design-system `Chart` base for the header / breadcrumb / actions /
   filters / canvas layout, and renders a Highcharts area (or areaspline)
   instance inside the canvas slot. The Faclon theme (colors, typography)
   comes from `useFaclonChartTheme()` — every other Highcharts default
   (fill opacity, line width, marker config, animation, tooltip, …) is left
   untouched.
   ═══════════════════════════════════════════════════════════════════════════ */

export const AreaChart = forwardRef<HTMLDivElement, AreaChartProps>(
  (
    {
      series,
      categories,
      stacked = false,
      percentStacked = false,
      smooth = false,
      showMarkers,
      showLegend = true,
      showDataLabels = false,
      scrollable = false,
      scrollableMinWidth = 900,
      onPointClick,
      ...chartProps
    },
    ref,
  ) => {
    const theme = useFaclonChartTheme();

    const options = useMemo<Options>(() => {
      const seriesType: 'area' | 'areaspline' = smooth ? 'areaspline' : 'area';
      const stackingMode: 'normal' | 'percent' | undefined = percentStacked
        ? 'percent'
        : stacked
          ? 'normal'
          : undefined;

      const seriesConfig: SeriesOptionsType[] = series.map((s) => ({
        type: seriesType,
        name: s.name,
        data: s.data,
        color: s.color,
        ...(showMarkers !== undefined && { marker: { enabled: showMarkers } }),
      }));

      return {
        ...theme,
        chart: {
          ...theme.chart,
          type: seriesType,
          ...(scrollable && {
            scrollablePlotArea: { minWidth: scrollableMinWidth, scrollPositionX: 0 },
          }),
        },
        xAxis: {
          ...theme.xAxis,
          categories,
        },
        plotOptions: {
          area: {
            stacking: stackingMode,
            dataLabels: { enabled: showDataLabels },
            ...(onPointClick && {
              cursor: 'pointer',
              point: {
                events: {
                  click() {
                    onPointClick({
                      category: String(this.category ?? ''),
                      seriesName: this.series.name,
                      value: this.y ?? null,
                      pointIndex: this.index,
                      seriesIndex: this.series.index,
                    });
                  },
                },
              },
            }),
          },
          areaspline: {
            stacking: stackingMode,
            dataLabels: { enabled: showDataLabels },
            ...(onPointClick && {
              cursor: 'pointer',
              point: {
                events: {
                  click() {
                    onPointClick({
                      category: String(this.category ?? ''),
                      seriesName: this.series.name,
                      value: this.y ?? null,
                      pointIndex: this.index,
                      seriesIndex: this.series.index,
                    });
                  },
                },
              },
            }),
          },
        },
        legend: {
          ...theme.legend,
          enabled: showLegend,
        },
        series: seriesConfig,
      };
    }, [
      theme,
      series,
      categories,
      stacked,
      percentStacked,
      smooth,
      showMarkers,
      showLegend,
      showDataLabels,
      scrollable,
      scrollableMinWidth,
      onPointClick,
    ]);

    return (
      <Chart ref={ref} {...chartProps}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ className: 'fds-area-chart' }}
        />
      </Chart>
    );
  },
);

AreaChart.displayName = 'AreaChart';
