import type { ChartProps, ChartPointClickContext } from '../Chart/Chart';
import './AreaChart.css';
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
export declare const AreaChart: import("react").ForwardRefExoticComponent<AreaChartProps & import("react").RefAttributes<HTMLDivElement>>;
