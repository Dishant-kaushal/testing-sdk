import { type HTMLAttributes, type ReactNode } from 'react';
import { type StepperIndicatorType, type StepperStepStatus } from './StepperIndicator';
import './StepperStep.css';
export type StepperStepPosition = 'start' | 'intermediate' | 'end';
export type StepperStepProgress = 'full' | 'start' | 'end' | 'none';
export interface StepperStepProps extends HTMLAttributes<HTMLDivElement> {
    /** "Header Title" per Figma 3192:1860 */
    label: string;
    description?: string;
    status?: StepperStepStatus;
    indicatorType?: StepperIndicatorType;
    /** Custom 12 px icon for Icon-type indicator */
    icon?: ReactNode;
    /** Mutes text block + suppresses hover. Does NOT cascade to trailing / children. */
    isDisabled?: boolean;
    /** Vertical-only. Right-aligned slot in the header row — typically a `<Badge>` / `<IconButton>`. */
    trailing?: ReactNode;
    /** Vertical-only. Renders below the header; accepts any JSX including a nested `<Stepper>`.
     *  When a nested Stepper is detected, a connector curve is drawn from the parent's bar into
     *  the first nested indicator. */
    children?: ReactNode;
    /** Dotted-line progress per Blade semantics:
     *  `full` (both solid, default) • `start` (bottom dotted) • `end` (top dotted) • `none` (both dotted). */
    stepProgress?: StepperStepProgress;
    /** Injected by the `<Stepper>` parent — do not set manually. */
    'data-step-position'?: StepperStepPosition;
    /** Injected by the `<Stepper>` parent — nesting depth (0 = root). */
    'data-nesting-level'?: number;
    /** Injected by the `<Stepper>` parent — marks the first step of a nested group. */
    'data-step-first-of-nested'?: boolean;
}
export declare const StepperStep: import("react").ForwardRefExoticComponent<StepperStepProps & import("react").RefAttributes<HTMLDivElement>>;
