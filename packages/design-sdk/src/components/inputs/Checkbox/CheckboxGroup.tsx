import type { HTMLAttributes, ReactNode } from 'react';
import type { CheckboxSize } from './Checkbox';
import { cn } from '../../../utils/cn';
import './CheckboxGroup.css';

export interface CheckboxGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Group label displayed above the checkboxes */
  label?: string;
  /** Size — controls label typography */
  size?: CheckboxSize;
  /** Orientation of the checkbox group */
  orientation?: 'Vertical' | 'Horizontal';
  /** Checkbox children */
  children: ReactNode;
}

const LABEL_TYPOGRAPHY: Record<CheckboxSize, string> = {
  Small: 'BodySmallSemibold',
  Medium: 'BodySmallSemibold',
  Large: 'BodyMediumSemibold',
};

export function CheckboxGroup({
  label,
  size = 'Small',
  orientation = 'Vertical',
  children,
  className,
  ...rest
}: CheckboxGroupProps) {
  return (
    <div
      role="group"
      className={cn('fds-checkbox-group', `fds-checkbox-group--${orientation.toLowerCase()}`, className)}
      aria-label={label}
      {...rest}
    >
      {label && (
        <span className={cn('fds-checkbox-group__label', LABEL_TYPOGRAPHY[size])}>
          {label}
        </span>
      )}
      <div className="fds-checkbox-group__body">
        {children}
      </div>
    </div>
  );
}

CheckboxGroup.displayName = 'CheckboxGroup';
