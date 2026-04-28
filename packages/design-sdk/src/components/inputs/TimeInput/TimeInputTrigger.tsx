import { forwardRef, type MouseEvent } from 'react';
import { Clock } from 'react-feather';
import { cn } from '../../../utils/cn';
import { TextInput } from '../TextInput/TextInput';
import './TimeInputTrigger.css';

export type TimeInputTriggerSize = 'Medium' | 'Large';
export type TimeInputTriggerValidationState = 'none' | 'error' | 'success';
export type TimeInputTriggerNecessityIndicator = 'optional' | 'required';

export interface TimeInputTriggerProps {
  label: string;
  name?: string;
  placeholder?: string;
  /** Formatted display value, e.g. "12 : 00 AM" (empty string shows placeholder) */
  displayValue?: string;
  size?: TimeInputTriggerSize;
  isOpen?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  necessityIndicator?: TimeInputTriggerNecessityIndicator;
  helpText?: string;
  errorText?: string;
  successText?: string;
  validationState?: TimeInputTriggerValidationState;
  onClick?: (e: MouseEvent) => void;
  className?: string;
}

export const TimeInputTrigger = forwardRef<HTMLInputElement, TimeInputTriggerProps>(
  (
    {
      label,
      name,
      placeholder = '00 : 00 AM',
      displayValue = '',
      size = 'Medium',
      isOpen = false,
      isDisabled = false,
      isRequired = false,
      necessityIndicator,
      helpText,
      errorText,
      successText,
      validationState = 'none',
      onClick,
      className,
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'fds-time-trigger',
          `fds-time-trigger--size-${size.toLowerCase()}`,
          isOpen && 'fds-time-trigger--open',
          className,
        )}
        onClick={onClick}
      >
        <TextInput
          ref={ref}
          label={label}
          name={name}
          placeholder={placeholder}
          value={displayValue}
          readOnly
          icon={<Clock size={16} />}
          helpText={validationState === 'error' ? undefined : helpText}
          errorText={errorText}
          successText={successText}
          validationState={validationState}
          isDisabled={isDisabled}
          isRequired={isRequired}
          necessityIndicator={necessityIndicator}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        />
      </div>
    );
  },
);

TimeInputTrigger.displayName = 'TimeInputTrigger';
