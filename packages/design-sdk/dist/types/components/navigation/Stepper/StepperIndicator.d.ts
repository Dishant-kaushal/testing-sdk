import { type HTMLAttributes, type ReactNode } from 'react';
import './StepperIndicator.css';
export type StepperStepStatus = 'Inactive' | 'Active' | 'Success' | 'Warning';
export type StepperIndicatorType = 'Indicator' | 'Icon';
export interface StepperIndicatorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    status?: StepperStepStatus;
    type?: StepperIndicatorType;
    /** Custom 12 px icon for `type='Icon'`. Defaults to `<User size={12} />`. */
    icon?: ReactNode;
}
export declare const StepperIndicator: import("react").ForwardRefExoticComponent<StepperIndicatorProps & import("react").RefAttributes<HTMLDivElement>>;
