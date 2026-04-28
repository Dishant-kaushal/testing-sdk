import { forwardRef, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { Options, SeriesOptionsType } from 'highcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps, ChartPointClickContext } from '../Chart/Chart';
import { useFaclonChartTheme } from '../Chart/highchartsTheme';
import './LineChart.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

/** A single line-chart series — name + numeric data points + optional color override. */
export interface LineSeries {
  /** Series label shown in the legend */
  name: string;
  /** Numeric values, one per category */
  data: number[];
  /** Override the auto-assigned palette color for this series */
  color?: string;
}

export interface LineChartProps extends Omit<ChartProps, 'children'> {
  /** Series to render — each rendered as a connected line. */
  series: LineSeries[];
  /** X-axis category labels (one per index in each series's `data` array). */
  categories: string[];
  /**
   * Smooth lines using spline (Bezier) interpolation. Highcharts treats this
   * as `chart.type: 'spline'` — same axes, same legend, same markers, just
   * curved segments instead of straight ones.
   * @default false
   */
  smooth?: boolean;
  /**
   * Show data-point markers along each line. Forwarded to each series's
   * `marker.enabled`. Leaving this `undefined` lets Highcharts use its
   * default `'auto'` (markers shown when data points are sparse enough).
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
   * Consumer owns the hierarchy state. When set, data points use a pointer
   * cursor to signal interactivity.
   */
  onPointClick?: (ctx: ChartPointClickContext) => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   LineChart — straight or smoothed line chart
   ───────────────────────────────────────────────────────────────────────────
   Wraps the design-system `Chart` base for the header / breadcrumb / actions /
   filters / canvas layout, and renders a Highcharts line (or spline) instance
   inside the canvas slot. The Faclon theme (colors, typography) comes from
   `useFaclonChartTheme()` — every other Highcharts default (line width,
   marker radius, hover state, animation, tooltip, …) is left untouched.
   ═══════════════════════════════════════════════════════════════════════════ */

export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      series,
      categories,
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
      const seriesType: 'line' | 'spline' = smooth ? 'spline' : 'line';
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
          line: {
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
          spline: {
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
    }, [theme, series, categories, smooth, showMarkers, showLegend, showDataLabels, scrollable, scrollableMinWidth, onPointClick]);

    return (
      <Chart ref={ref} {...chartProps}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ className: 'fds-line-chart' }}
        />
      </Chart>
    );
  },
);

LineChart.displayName = 'LineChart';
