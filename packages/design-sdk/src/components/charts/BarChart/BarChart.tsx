import { forwardRef, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { Options, SeriesBarOptions } from 'highcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps, ChartPointClickContext, ChartPlotLine, ChartPlotBand } from '../Chart/Chart';
import { useFaclonChartTheme, readCssVar } from '../Chart/highchartsTheme';
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
   * renders vertically for `type: 'bar'`.
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
   * Make the plot vertically scrollable when categories overflow.
   * @default false
   */
  scrollable?: boolean;
  /**
   * Minimum plot height (px) when `scrollable` is true.
   * @default 500
   */
  scrollableMinHeight?: number;
  /**
   * Fires when a bar is clicked. Consumer owns drill-down state.
   * When set, bars use a pointer cursor.
   */
  onPointClick?: (ctx: ChartPointClickContext) => void;
  /**
   * Override the default Faclon palette for this chart instance.
   */
  colors?: string[];
  /**
   * Category-axis (vertical) title label.
   * Highcharts calls this `xAxis` internally even though it renders on the left for `type: 'bar'`.
   */
  xAxisTitle?: string;
  /** Value-axis (horizontal) title label. */
  yAxisTitle?: string;
  /**
   * Unit string appended to every value-axis tick label (e.g. `'ms'`, `'kg'`).
   */
  yAxisUnit?: string;
  /**
   * Vertical reference lines drawn across the plot area (value axis).
   * Commonly used for target / threshold annotations on bar charts.
   */
  plotLines?: ChartPlotLine[];
  /**
   * Shaded value-axis bands across the plot area.
   * Use for threshold zones e.g. warning band 80–90, critical band 90+.
   */
  plotBands?: ChartPlotBand[];
  /**
   * Full Highcharts options escape hatch — deep-merged last after all
   * computed options.
   */
  highchartsOptions?: Options;
}

/* ═══════════════════════════════════════════════════════════════════════════
   BarChart
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
      const seriesConfig: SeriesBarOptions[] = series.map((s) => ({
        type: 'bar',
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
          label: { text: pb.label, align: pb.labelAlign ?? 'right' },
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
          type: 'bar',
          zooming: { type: 'y', singleTouch: true },
        },
        ...(scrollable && {
          scrollablePlotArea: { minHeight: scrollableMinHeight, scrollPositionY: 0 },
        }),
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

      return highchartsOptions ? Highcharts.merge(computed, highchartsOptions) : computed;
    }, [theme, series, categories, stacked, showLegend, showDataLabels, scrollable, scrollableMinHeight, onPointClick, colors, xAxisTitle, yAxisTitle, yAxisUnit, plotLines, plotBands, highchartsOptions]);

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
