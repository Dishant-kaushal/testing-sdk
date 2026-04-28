import type { ChartProps, ChartPointClickContext } from '../Chart/Chart';
import './BarChart.css';
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
export declare const BarChart: import("react").ForwardRefExoticComponent<BarChartProps & import("react").RefAttributes<HTMLDivElement>>;
