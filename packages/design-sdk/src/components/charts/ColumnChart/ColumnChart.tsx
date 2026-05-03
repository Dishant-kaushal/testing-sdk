import { forwardRef, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { Options, SeriesColumnOptions } from 'highcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps, ChartPointClickContext, ChartPlotLine, ChartPlotBand } from '../Chart/Chart';
import { useFaclonChartTheme, readCssVar } from '../Chart/highchartsTheme';
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
   * Fires when a column is clicked. Typical use: time drill-down.
   * When set, data points use a pointer cursor to signal interactivity.
   */
  onPointClick?: (ctx: ChartPointClickContext) => void;
  /**
   * Override the default Faclon palette for this chart instance.
   * Array of CSS color strings applied in series order.
   */
  colors?: string[];
  /** X-axis title label shown below the axis. */
  xAxisTitle?: string;
  /** Y-axis title label shown beside the axis. */
  yAxisTitle?: string;
  /**
   * Unit string appended to every y-axis tick label (e.g. `'°C'`, `'%'`, `'bar'`).
   * Applied as `{value} unit`. For full control use `highchartsOptions.yAxis.labels.formatter`.
   */
  yAxisUnit?: string;
  /**
   * Horizontal reference lines drawn across the plot area.
   * Commonly used for single threshold markers.
   */
  plotLines?: ChartPlotLine[];
  /**
   * Shaded Y-axis bands across the plot area.
   * Use for threshold zones e.g. warning band 80–90, critical band 90+.
   */
  plotBands?: ChartPlotBand[];
  /**
   * Full Highcharts options escape hatch — deep-merged last, after all
   * computed options. Use this to override anything not covered by the props
   * above without losing the Faclon theme.
   */
  highchartsOptions?: Options;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ColumnChart
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
      colors,
      xAxisTitle,
      yAxisTitle,
      yAxisUnit,
      plotLines,
      plotBands,
      highchartsOptions,
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

      const hcPlotBands = plotBands?.map((pb) => ({
        from: pb.from,
        to: pb.to,
        color: pb.color ?? 'rgba(239,68,68,0.1)',
        zIndex: pb.zIndex ?? 0,
        ...(pb.label && {
          label: {
            text: pb.label,
            align: pb.labelAlign ?? 'right',
          },
        }),
      }));

      const hcPlotLines = plotLines?.map((pl) => ({
        value: pl.value,
        color: (pl.color ?? readCssVar('--border-error-default')) || '#ef4444',
        width: pl.width ?? 2,
        dashStyle: pl.dashStyle ?? 'Dash',
        zIndex: pl.zIndex ?? 5,
        ...(pl.label && {
          label: {
            text: pl.label,
            align: pl.labelAlign ?? 'right',
            style: { color: (pl.color ?? readCssVar('--border-error-default')) || '#ef4444' },
          },
        }),
      }));

      const computed: Options = {
        ...theme,
        ...(colors && { colors }),
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
          ...(xAxisTitle !== undefined && { title: { ...theme.xAxis?.title, text: xAxisTitle } }),
        },
        yAxis: {
          ...theme.yAxis,
          ...(yAxisTitle !== undefined && { title: { ...theme.yAxis?.title, text: yAxisTitle } }),
          ...(yAxisUnit && { labels: { ...theme.yAxis?.labels, format: `{value} ${yAxisUnit}` } }),
          ...(hcPlotLines && { plotLines: hcPlotLines }),
          ...(hcPlotBands && { plotBands: hcPlotBands }),
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

      return highchartsOptions ? Highcharts.merge(computed, highchartsOptions) : computed;
    }, [theme, series, categories, stacked, showLegend, showDataLabels, scrollable, scrollableMinWidth, onPointClick, colors, xAxisTitle, yAxisTitle, yAxisUnit, plotLines, plotBands, highchartsOptions]);

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
