import { type HTMLAttributes, type ReactNode } from 'react';
import { StepperStep } from './StepperStep';
import './Stepper.css';
export type StepperOrientation = 'horizontal' | 'vertical';
export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
    /** `<StepperStep>`, `<StepperGroupLabel>`, and/or nested `<Stepper>` inside a step's children. */
    children: ReactNode;
    /** Flow direction. Default `'horizontal'`. Nesting & labels are vertical-only. */
    orientation?: StepperOrientation;
}
export declare const Stepper: import("react").ForwardRefExoticComponent<StepperProps & import("react").RefAttributes<HTMLDivElement>>;
export { StepperStep };
