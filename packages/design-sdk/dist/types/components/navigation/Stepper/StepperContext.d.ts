/** Signals that a Stepper is rendered inside a `StepperStep`'s children slot.
 *  Used to force nested Steppers to vertical orientation regardless of the
 *  `orientation` prop the consumer passes. */
export interface StepperContextValue {
    isNested: boolean;
}
export declare const StepperContext: import("react").Context<StepperContextValue>;
