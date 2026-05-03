import { type HTMLAttributes } from 'react';
import type { StepperColor } from './StepperContext';
import './StepperIndicator.css';
export interface StepperIndicatorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    color?: StepperColor;
    /** Forwarded by `<StepperStep>` when its `isDisabled` is true. */
    isDisabled?: boolean;
}
export declare const StepperIndicator: import("react").ForwardRefExoticComponent<StepperIndicatorProps & import("react").RefAttributes<HTMLDivElement>>;
