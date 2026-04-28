import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import type { StepperColor } from './StepperContext';
import './StepperIndicator.css';

export interface StepperIndicatorProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  color?: StepperColor;
  /** Forwarded by `<StepperStep>` when its `isDisabled` is true. */
  isDisabled?: boolean;
}

const COLOR_CLASS: Record<StepperColor, string> = {
  positive: 'fds-stepper-indicator--positive',
  negative: 'fds-stepper-indicator--negative',
  notice: 'fds-stepper-indicator--notice',
  information: 'fds-stepper-indicator--information',
  primary: 'fds-stepper-indicator--primary',
  neutral: 'fds-stepper-indicator--neutral',
};

export const StepperIndicator = forwardRef<HTMLDivElement, StepperIndicatorProps>(
  ({ color = 'neutral', isDisabled, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('fds-stepper-indicator', COLOR_CLASS[color], className)}
        data-disabled={isDisabled || undefined}
        {...props}
      >
        <span className="fds-stepper-indicator__dot" aria-hidden="true" />
      </div>
    );
  },
);

StepperIndicator.displayName = 'StepperIndicator';
