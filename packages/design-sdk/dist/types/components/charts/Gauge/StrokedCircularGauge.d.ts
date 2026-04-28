import type { ApexOptions } from 'apexcharts';
import type { ChartProps } from '../Chart/Chart';
import './StrokedCircularGauge.css';
export interface StrokedCircularGaugeProps extends Omit<ChartProps, 'children'> {
    /** Percentage value (0–100). */
    value: number;
    /** Label shown below the value in the center. */
    label?: string;
    /** ApexCharts options escape hatch — merged last. */
    apexOptions?: ApexOptions;
}
export declare const StrokedCircularGauge: import("react").ForwardRefExoticComponent<StrokedCircularGaugeProps & import("react").RefAttributes<HTMLDivElement>>;
