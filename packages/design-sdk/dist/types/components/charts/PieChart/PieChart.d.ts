import type { Options } from 'highcharts';
import type { ChartProps } from '../Chart/Chart';
import './PieChart.css';
export interface PieDataPoint {
    /** Slice label shown in legend/tooltip/data labels. */
    name: string;
    /** Slice numeric value. */
    y: number;
    /** Optional explicit color for this slice. */
    color?: string;
    /** Render this slice as pre-sliced. */
    sliced?: boolean;
    /** Render this slice as selected. */
    selected?: boolean;
}
export interface PiePointClickContext {
    name: string;
    value: number;
    percentage: number;
    pointIndex: number;
    color?: string;
}
export interface PieChartProps extends Omit<ChartProps, 'children'> {
    /** Pie data points. */
    data: PieDataPoint[];
    /**
     * Show legend below chart.
     * @default true
     */
    showLegend?: boolean;
    /**
     * Show slice data labels.
     * @default false
     */
    showDataLabels?: boolean;
    /**
     * Data-label format string used by Highcharts.
     * @default '{point.name}: {point.percentage:.1f}%'
     */
    dataLabelFormat?: string;
    /**
     * Enable donut mode by applying an inner hole.
     * @default false
     */
    donut?: boolean;
    /**
     * Inner size for donut mode. Ignored when `donut` is false.
     * @default '60%'
     */
    innerSize?: number | string;
    /**
     * Pie start angle in degrees.
     * @default 0
     */
    startAngle?: number;
    /**
     * Pie end angle in degrees.
     * @default 360
     */
    endAngle?: number;
    /**
     * Allow click-to-select pie slices.
     * @default false
     */
    allowPointSelect?: boolean;
    /**
     * Suffix appended to tooltip values.
     */
    tooltipValueSuffix?: string;
    /**
     * Override palette for this chart.
     */
    colors?: string[];
    /**
     * Fires when a slice is clicked.
     */
    onPointClick?: (ctx: PiePointClickContext) => void;
    /**
     * Full Highcharts options escape hatch.
     */
    highchartsOptions?: Options;
}
export declare const PieChart: import("react").ForwardRefExoticComponent<PieChartProps & import("react").RefAttributes<HTMLDivElement>>;
