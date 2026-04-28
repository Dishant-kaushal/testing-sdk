import 'highcharts/esm/highcharts-more';
import 'highcharts/esm/modules/solid-gauge';
import type { Options } from 'highcharts';
import type { ChartProps } from '../Chart/Chart';
import './ActivityGauge.css';
export interface ActivityItem {
    /** Ring label — shown in the tooltip and optional legend. */
    name: string;
    /**
     * Current value on the ring's scale. Normalized to 0–100 internally via
     * `(value / max) * 100` before being passed to Highcharts.
     */
    value: number;
    /**
     * Upper bound for this ring's scale.
     * @default 100
     */
    max?: number;
}
export interface ActivityGaugeProps extends Omit<ChartProps, 'children'> {
    /** One entry per concentric ring — outermost first. */
    activities: ActivityItem[];
    /**
     * Show the Highcharts legend below the chart.
     * @default true
     */
    showLegend?: boolean;
    /** Highcharts options escape hatch — merged last, overrides all defaults. */
    highchartsOptions?: Partial<Options>;
}
export declare const ActivityGauge: import("react").ForwardRefExoticComponent<ActivityGaugeProps & import("react").RefAttributes<HTMLDivElement>>;
