import { forwardRef, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { Options, SeriesColumnOptions } from 'highcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps, ChartPointClickContext } from '../Chart/Chart';
import { useFaclonChartTheme } from '../Chart/highchartsTheme';
import './ColumnChart.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

/** A single column-chart series — name + numeric data points + optional color override. */
export interface ColumnSeries {
  /** Series label shown in the legend */
  name: string;
  /** Numeric values, one per category */
  data: number[];
  /** Override the auto-assigned palette color for this series */
  color?: string;
}

export interface ColumnChartProps extends Omit<ChartProps, 'children'> {
  /** Series to render — each rendered as a grouped column. */
  series: ColumnSeries[];
  /** X-axis category labels (one per index in each series's `data` array). */
  categories: string[];
  /**
   * Stack columns from each category instead of grouping them side-by-side.
   * @default false
   */
  stacked?: boolean;
  /**
   * Show the legend below the chart canvas.
   * @default true
   */
  showLegend?: boolean;
  /**
   * Render exact numeric values on top of each column.
   * @default false
   */
  showDataLabels?: boolean;
  /**
   * Make the plot horizontally scrollable when categories overflow. When true,
   * the chart renders at `scrollableMinWidth` px wide and scrolls inside its
   * container rather than compressing the columns.
   * @default false
   */
  scrollable?: boolean;
  /**
   * Minimum plot width (px) when `scrollable` is true. Ignored when `scrollable`
   * is false.
   * @default 900
   */
  scrollableMinWidth?: number;
  /**
   * Fires when a column is clicked. Typical use: time drill-down — the
   * consumer owns the hierarchy state (Month → Week → Day → Hour) and
   * re-feeds the chart with categories/series for the next level. When set,
   * data points use a pointer cursor to signal interactivity.
   */
  onPointClick?: (ctx: ChartPointClickContext) => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ColumnChart — basic grouped or stacked column chart
   ───────────────────────────────────────────────────────────────────────────
   Wraps the design-system `Chart` base for the header / breadcrumb / actions /
   filters / canvas layout, and renders a Highcharts column instance inside
   the canvas slot. The Faclon theme (colors, typography) comes from
   `useFaclonChartTheme()` — every other Highcharts default (column padding,
   border radius, animation, tooltip, gridline width, …) is left untouched.
   ═══════════════════════════════════════════════════════════════════════════ */

export const ColumnChart = forwardRef<HTMLDivElement, ColumnChartProps>(
  (
    {
      series,
      categories,
      stacked = false,
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
      const seriesConfig: SeriesColumnOptions[] = series.map((s) => ({
        type: 'column',
        name: s.name,
        data: s.data,
        color: s.color,
      }));

      return {
        ...theme,
        chart: {
          ...theme.chart,
          type: 'column',
          ...(scrollable && {
            scrollablePlotArea: { minWidth: scrollableMinWidth, scrollPositionX: 0 },
          }),
        },
        xAxis: {
          ...theme.xAxis,
          categories,
        },
        plotOptions: {
          column: {
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
    }, [theme, series, categories, stacked, showLegend, showDataLabels, scrollable, scrollableMinWidth, onPointClick]);

    return (
      <Chart ref={ref} {...chartProps}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ className: 'fds-column-chart' }}
        />
      </Chart>
    );
  },
);

ColumnChart.displayName = 'ColumnChart';
