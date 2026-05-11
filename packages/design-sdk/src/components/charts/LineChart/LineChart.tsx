import { forwardRef, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { Options, SeriesOptionsType } from 'highcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps, ChartPointClickContext, ChartPlotLine, ChartPlotBand } from '../Chart/Chart';
import { useFaclonChartTheme, readCssVar } from '../Chart/highchartsTheme';
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
   * Smooth lines using spline (Bezier) interpolation.
   * @default false
   */
  smooth?: boolean;
  /**
   * Show data-point markers along each line. `undefined` lets Highcharts use
   * its default `'auto'` (shown when data points are sparse enough).
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
   * Fires when a data point is clicked. Consumer owns drill-down state.
   * When set, data points use a pointer cursor.
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
   * Full Highcharts options escape hatch — deep-merged last after all
   * computed options. Use this to override anything not covered by props.
   */
  highchartsOptions?: Options;
}

/* ═══════════════════════════════════════════════════════════════════════════
   LineChart
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
      const seriesType: 'line' | 'spline' = smooth ? 'spline' : 'line';
      const seriesConfig: SeriesOptionsType[] = series.map((s) => ({
        type: seriesType,
        name: s.name,
        data: s.data,
        color: s.color,
        ...(showMarkers !== undefined && { marker: { enabled: showMarkers } }),
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

      const pointClickOptions = onPointClick
        ? {
            cursor: 'pointer' as const,
            point: {
              events: {
                click(this: Highcharts.Point) {
                  onPointClick({
                    category: String((this as any).category ?? ''),
                    seriesName: this.series.name,
                    value: this.y ?? null,
                    pointIndex: this.index,
                    seriesIndex: this.series.index,
                  });
                },
              },
            },
          }
        : {};

      const computed: Options = {
        ...theme,
        ...(colors && { colors }),
        chart: {
          ...theme.chart,
          type: seriesType,
          zooming: { type: 'x', singleTouch: true },
        },
        ...(scrollable && {
          scrollablePlotArea: { minWidth: scrollableMinWidth, scrollPositionX: 0 },
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
          line: {
            dataLabels: { enabled: showDataLabels },
            ...pointClickOptions,
          },
          spline: {
            dataLabels: { enabled: showDataLabels },
            ...pointClickOptions,
          },
        },
        legend: {
          ...theme.legend,
          enabled: showLegend,
        },
        series: seriesConfig,
      };

      return highchartsOptions ? Highcharts.merge(computed, highchartsOptions) : computed;
    }, [theme, series, categories, smooth, showMarkers, showLegend, showDataLabels, scrollable, scrollableMinWidth, onPointClick, colors, xAxisTitle, yAxisTitle, yAxisUnit, plotLines, plotBands, highchartsOptions]);

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
