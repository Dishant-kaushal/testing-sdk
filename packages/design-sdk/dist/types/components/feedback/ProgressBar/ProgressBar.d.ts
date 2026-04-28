import type { HTMLAttributes } from 'react';
import './ProgressBar.css';
export type ProgressBarSize = 'Large' | 'Small';
export type ProgressBarIntent = 'None' | 'Positive' | 'Negative' | 'Notice' | 'Information' | 'Neutral';
export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
    /** Label text shown above the track */
    label?: string;
    /** Progress value 0–100 */
    value?: number;
    /** Size of the track — Large (4px) or Small (2px) */
    size?: ProgressBarSize;
    /** Color intent of the indicator */
    intent?: ProgressBarIntent;
    /** Whether the progress is indeterminate (animated, no percentage) */
    isIndeterminate?: boolean;
    /** Whether to show the percentage text (default true, hidden when indeterminate) */
    showPercentage?: boolean;
}
export declare function ProgressBar({ label, value, size, intent, isIndeterminate, showPercentage, className, ...props }: ProgressBarProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ProgressBar {
    var displayName: string;
}
