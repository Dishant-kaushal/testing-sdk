import { forwardRef, useId, useCallback, type InputHTMLAttributes, type ChangeEvent, type KeyboardEvent } from 'react';
import { cn } from '../../../utils/cn';
import { useRadioGroupContext } from './RadioGroup';
import './Radio.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type RadioSize = 'Small' | 'Medium' | 'Large';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text displayed next to the radio */
  label: string;
  /** Size of the radio */
  size?: RadioSize;
  /** Whether the radio is disabled */
  isDisabled?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Typography map
   ═══════════════════════════════════════════════════════════════════════════ */

const TYPOGRAPHY: Record<RadioSize, string> = {
  Small: 'BodySmallRegular',
  Medium: 'BodyMediumRegular',
  Large: 'BodyLargeRegular',
};

/* ═══════════════════════════════════════════════════════════════════════════
   Radio
   ═══════════════════════════════════════════════════════════════════════════ */

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      size = 'Small',
      isDisabled = false,
      className,
      id: idProp,
      disabled,
      value,
      checked,
      onChange,
      name: nameProp,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const group = useRadioGroupContext();

    const resolvedDisabled = isDisabled || disabled || group?.isDisabled || false;
    const resolvedName = nameProp ?? group?.name;
    const resolvedChecked = group ? group.value === value : checked;

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (group && value !== undefined) {
          group.onChange(String(value));
        }
        onChange?.(e);
      },
      [group, value, onChange],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const input = e.currentTarget;
          if (!input.checked) {
            input.checked = true;
            input.dispatchEvent(new Event('change', { bubbles: true }));
            if (group && value !== undefined) {
              group.onChange(String(value));
            }
          }
        }
      },
      [group, value],
    );

    const rootClasses = cn(
      'fds-radio',
      `fds-radio--size-${size.toLowerCase()}`,
      resolvedDisabled && 'fds-radio--disabled',
      className,
    );

    return (
      <label className={rootClasses} htmlFor={id}>
        <input
          ref={ref}
          className="fds-radio__input"
          type="radio"
          id={id}
          name={resolvedName}
          value={value}
          checked={resolvedChecked}
          disabled={resolvedDisabled}
          aria-disabled={resolvedDisabled || undefined}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...props}
        />
        <span className="fds-radio__circle" aria-hidden="true" />
        <span className={cn('fds-radio__label', TYPOGRAPHY[size])}>{label}</span>
      </label>
    );
  },
);

Radio.displayName = 'Radio';
