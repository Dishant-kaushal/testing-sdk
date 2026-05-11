import type { Options } from 'highcharts';
import type { ChartProps, ChartPointClickContext, ChartPlotLine, ChartPlotBand } from '../Chart/Chart';
import './LineChart.css';
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
     * Enable drag-to-zoom on the plot area.
     * @default false
     */
    zoomable?: boolean;
    /**
     * Which axis the zoom selection should apply to.
     * @default 'x'
     */
    zoomType?: 'x' | 'y' | 'xy';
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
export declare const LineChart: import("react").ForwardRefExoticComponent<LineChartProps & import("react").RefAttributes<HTMLDivElement>>;
