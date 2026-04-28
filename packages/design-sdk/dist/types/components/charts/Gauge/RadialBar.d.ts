import type { ApexOptions } from 'apexcharts';
import type { ChartProps } from '../Chart/Chart';
import './RadialBar.css';
export interface RadialBarProps extends Omit<ChartProps, 'children'> {
    /** Percentage values (0–100) — one per ring. */
    series: number[];
    /** Labels corresponding to each series value. */
    labels?: string[];
    /** Show value labels in the center / beside the rings. @default true */
    showLabels?: boolean;
    /** ApexCharts options escape hatch — merged last. */
    apexOptions?: ApexOptions;
}
export declare const RadialBar: import("react").ForwardRefExoticComponent<RadialBarProps & import("react").RefAttributes<HTMLDivElement>>;
