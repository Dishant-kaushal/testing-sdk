import { forwardRef, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { Options, SeriesBarOptions } from 'highcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps, ChartPointClickContext } from '../Chart/Chart';
import { useFaclonChartTheme } from '../Chart/highchartsTheme';
import './BarChart.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

/** A single bar-chart series — name + numeric data points + optional color override. */
export interface BarSeries {
  /** Series label shown in the legend */
  name: string;
  /** Numeric values, one per category */
  data: number[];
  /** Override the auto-assigned palette color for this series */
  color?: string;
}

export interface BarChartProps extends Omit<ChartProps, 'children'> {
  /** Series to render — each rendered as a grouped horizontal bar. */
  series: BarSeries[];
  /**
   * Group labels rendered on the visual Y-axis (left side). Highcharts keeps
   * the option key as `xAxis.categories` even though the categorical axis
   * renders vertically for `type: 'bar'` — only the visual orientation
   * swaps, the API stays consistent with `ColumnChart`.
   */
  categories: string[];
  /**
   * Stack bars from each category instead of grouping them side-by-side.
   * @default false
   */
  stacked?: boolean;
  /**
   * Show the legend below the chart canvas.
   * @default true
   */
  showLegend?: boolean;
  /**
   * Render exact numeric values at the end of each bar.
   * @default false
   */
  showDataLabels?: boolean;
  /**
   * Make the plot vertically scrollable when categories overflow. Because bars
   * are horizontal, scrolling is vertical — the chart renders at
   * `scrollableMinHeight` px tall and scrolls inside its container.
   * @default false
   */
  scrollable?: boolean;
  /**
   * Minimum plot height (px) when `scrollable` is true.
   * @default 500
   */
  scrollableMinHeight?: number;
  /**
   * Fires when a bar is clicked. Typical use: time drill-down. Consumer owns
   * the hierarchy state. When set, bars use a pointer cursor.
   */
  onPointClick?: (ctx: ChartPointClickContext) => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   BarChart — horizontal grouped or stacked bar chart
   ───────────────────────────────────────────────────────────────────────────
   Wraps the design-system `Chart` base for the header / breadcrumb / actions /
   filters / canvas layout, and renders a Highcharts bar instance inside the
   canvas slot. The Faclon theme (colors, typography) comes from
   `useFaclonChartTheme()` — every other Highcharts default is left
   untouched, including the chart-type-aware axis title rotations Highcharts
   handles internally for `type: 'bar'`.
   ═══════════════════════════════════════════════════════════════════════════ */

export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      series,
      categories,
      stacked = false,
      showLegend = true,
      showDataLabels = false,
      scrollable = false,
      scrollableMinHeight = 500,
      onPointClick,
      ...chartProps
    },
    ref,
  ) => {
    const theme = useFaclonChartTheme();

    const options = useMemo<Options>(() => {
      const seriesConfig: SeriesBarOptions[] = series.map((s) => ({
        type: 'bar',
        name: s.name,
        data: s.data,
        color: s.color,
      }));

      return {
        ...theme,
        chart: {
          ...theme.chart,
          type: 'bar',
          ...(scrollable && {
            scrollablePlotArea: { minHeight: scrollableMinHeight, scrollPositionY: 0 },
          }),
        },
        xAxis: {
          ...theme.xAxis,
          categories,
        },
        plotOptions: {
          bar: {
            stacking: stacked ? 'normal' : undefined,
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
    }, [theme, series, categories, stacked, showLegend, showDataLabels, scrollable, scrollableMinHeight, onPointClick]);

    return (
      <Chart ref={ref} {...chartProps}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ className: 'fds-bar-chart' }}
        />
      </Chart>
    );
  },
);

BarChart.displayName = 'BarChart';
