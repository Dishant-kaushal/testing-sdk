import { createContext, useContext, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import type { RadioSize } from './Radio';
import './RadioGroup.css';

/* ═══════════════════════════════════════════════════════════════════════════
   RadioGroup Context
   ═══════════════════════════════════════════════════════════════════════════ */

interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
  isDisabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext() {
  return useContext(RadioGroupContext);
}

/* ═══════════════════════════════════════════════════════════════════════════
   RadioGroup
   ═══════════════════════════════════════════════════════════════════════════ */

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  /** Group label displayed above the radios */
  label?: string;
  /** Name attribute shared by all radios in the group */
  name: string;
  /** Controlled selected value */
  value: string;
  /** Called when selection changes */
  onChange: (value: string) => void;
  /** Size — controls label typography */
  size?: RadioSize;
  /** Disables all radios in the group */
  isDisabled?: boolean;
  /** Radio children */
  children: ReactNode;
  /** Orientation of the radio group */
  orientation?: 'Vertical' | 'Horizontal';
}

const LABEL_TYPOGRAPHY: Record<RadioSize, string> = {
  Small: 'BodySmallSemibold',
  Medium: 'BodySmallSemibold',
  Large: 'BodyMediumSemibold',
};

export function RadioGroup({
  label,
  name,
  value,
  onChange,
  size = 'Small',
  isDisabled = false,
  children,
  className,
  orientation = 'Vertical',
  ...rest
}: RadioGroupProps) {
  const contextValue: RadioGroupContextValue = {
    name,
    value,
    onChange,
    isDisabled,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        role="radiogroup"
        className={cn('fds-radio-group', `fds-radio-group--${orientation.toLowerCase()}`, className)}
        aria-label={label}
        {...rest}
      >
        {label && (
          <span className={cn('fds-radio-group__label', LABEL_TYPOGRAPHY[size])}>
            {label}
          </span>
        )}
        <div className="fds-radio-group__body">
          {children}
        </div>
      </div>
    </RadioGroupContext.Provider>
  );
}

RadioGroup.displayName = 'RadioGroup';
