import type { Options } from 'highcharts';
import type { ChartProps, ChartPointClickContext, ChartPlotLine, ChartPlotBand } from '../Chart/Chart';
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
     * Enable drag-to-zoom on the plot area.
     * @default false
     */
    zoomable?: boolean;
    /**
     * Which axis the zoom selection should apply to.
     * For `type: 'bar'`, the value axis is horizontal (Highcharts' `yAxis`),
     * and the category axis is vertical (Highcharts' `xAxis`).
     * @default 'y'
     */
    zoomType?: 'x' | 'y' | 'xy';
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
export declare const BarChart: import("react").ForwardRefExoticComponent<BarChartProps & import("react").RefAttributes<HTMLDivElement>>;
