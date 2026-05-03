import { type HTMLAttributes, type ReactNode } from 'react';
import { type StepperOrientation } from './StepperContext';
import './Stepper.css';
export type { StepperOrientation } from './StepperContext';
export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
    /** `<StepperStep>` children. For nesting, render a nested `<Stepper>` as a
     *  SIBLING of the StepperStep items (not inside one of them). The flattener
     *  walks siblings to build the curved connector between parent and nested
     *  groups — Blade's StepGroup model verbatim. */
    children: ReactNode;
    /** Flow direction. Default `'vertical'`. */
    orientation?: StepperOrientation;
    /** @internal — set by parent Stepper when this is a nested group. */
    _nestingLevel?: number;
}
export declare const Stepper: import("react").ForwardRefExoticComponent<StepperProps & import("react").RefAttributes<HTMLDivElement>>;
