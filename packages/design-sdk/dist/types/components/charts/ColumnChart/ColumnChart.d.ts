import type { ChartProps, ChartPointClickContext } from '../Chart/Chart';
import './ColumnChart.css';
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
export declare const ColumnChart: import("react").ForwardRefExoticComponent<ColumnChartProps & import("react").RefAttributes<HTMLDivElement>>;
