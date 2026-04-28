import type { ChartProps, ChartPointClickContext } from '../Chart/Chart';
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
export declare const LineChart: import("react").ForwardRefExoticComponent<LineChartProps & import("react").RefAttributes<HTMLDivElement>>;
