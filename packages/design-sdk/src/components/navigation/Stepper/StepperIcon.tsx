import { forwardRef, createElement, type ComponentType, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import type { StepperColor } from './StepperContext';
import './StepperIcon.css';

type IconComponent = ComponentType<{ size?: number | string; color?: string }>;

export interface StepperIconProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  icon: IconComponent;
  color?: StepperColor;
  isDisabled?: boolean;
}

const COLOR_CLASS: Record<StepperColor, string> = {
  positive: 'fds-stepper-icon--positive',
  negative: 'fds-stepper-icon--negative',
  notice: 'fds-stepper-icon--notice',
  information: 'fds-stepper-icon--information',
  primary: 'fds-stepper-icon--primary',
  neutral: 'fds-stepper-icon--neutral',
};

const ICON_PX = 12;

export const StepperIcon = forwardRef<HTMLDivElement, StepperIconProps>(
  ({ icon, color = 'neutral', isDisabled = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('fds-stepper-icon', COLOR_CLASS[color], className)}
        data-disabled={isDisabled || undefined}
        {...props}
      >
        <span className="fds-stepper-icon__glyph" aria-hidden="true">
          {createElement(icon, { size: ICON_PX })}
        </span>
      </div>
    );
  },
);

StepperIcon.displayName = 'StepperIcon';
