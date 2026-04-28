import {
  forwardRef,
  useId,
  useCallback,
  type InputHTMLAttributes,
  type ReactNode,
  type ChangeEvent,
} from 'react';
import { cn } from '../../../utils/cn';
import { Divider } from '../../layout/Divider/Divider';
import './Switch.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type SwitchSize = 'Small' | 'Medium';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  /** Size of the switch */
  size?: SwitchSize;
  /** Whether the switch is on */
  isChecked?: boolean;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Whether the switch is disabled */
  isDisabled?: boolean;
  /** Called when the switch is toggled */
  onChange?: (meta: { name: string; checked: boolean }) => void;
  /** Field name for form submissions */
  name?: string;
  /** Accessible label (use when no visible label) */
  accessibilityLabel?: string;
  /** Title text — when provided, renders the "with text" layout */
  label?: string;
  /** Subheading text below the title */
  helpText?: string;
  /** Icon slot next to the title (e.g. Info icon) */
  trailingIcon?: ReactNode;
  /** Show a muted divider below the row */
  showDivider?: boolean;
  /** Additional class name */
  className?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Checkmark icon (shown on thumb when checked)
   ═══════════════════════════════════════════════════════════════════════════ */

function CheckIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="fds-switch__check-icon"
    >
      <path
        d="M9.46967 2.46967C9.76256 2.17678 10.2373 2.17678 10.5302 2.46967C10.8231 2.76256 10.8231 3.23732 10.5302 3.53022L5.03022 9.03022C4.73732 9.32311 4.26256 9.32311 3.96967 9.03022L1.46967 6.53022C1.17678 6.23732 1.17678 5.76256 1.46967 5.46967C1.76256 5.17678 2.23732 5.17678 2.53022 5.46967L4.49994 7.4394L9.46967 2.46967Z"
        fill="currentColor"
      />
    </svg>
  );
}

const ICON_SIZE: Record<SwitchSize, number> = {
  Small: 8,
  Medium: 10,
};

/* ═══════════════════════════════════════════════════════════════════════════
   Switch
   ═══════════════════════════════════════════════════════════════════════════ */

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = 'Medium',
      isChecked,
      defaultChecked,
      isDisabled = false,
      onChange,
      name: nameProp,
      accessibilityLabel,
      label,
      helpText,
      trailingIcon,
      showDivider = false,
      className,
      id: idProp,
      disabled,
      ...restProps
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const fieldName = nameProp ?? '';
    const resolvedDisabled = isDisabled || disabled || false;

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.({ name: fieldName, checked: e.target.checked });
      },
      [fieldName, onChange],
    );

    const rootClasses = cn(
      'fds-switch',
      `fds-switch--${size.toLowerCase()}`,
      resolvedDisabled && 'fds-switch--disabled',
      !label && className,
    );

    const toggle = (
      <>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          className="fds-switch__input"
          name={fieldName || undefined}
          checked={isChecked}
          defaultChecked={defaultChecked}
          disabled={resolvedDisabled}
          aria-label={accessibilityLabel ?? label}
          aria-checked={isChecked}
          onChange={handleChange}
          {...restProps}
        />
        <span className="fds-switch__wrapper">
          <span className="fds-switch__track">
            <span className="fds-switch__thumb">
              <CheckIcon size={ICON_SIZE[size]} />
            </span>
          </span>
        </span>
      </>
    );

    if (!label) {
      return <label className={rootClasses} htmlFor={id}>{toggle}</label>;
    }

    return (
      <div className={cn('fds-switch-field', className)}>
        <label className={rootClasses} htmlFor={id}>
          <div className="fds-switch-field__row">
            <div className="fds-switch-field__text">
              <div className="fds-switch-field__heading">
                <span className="fds-switch-field__title BodySmallSemibold">{label}</span>
                {trailingIcon && (
                  <span className="fds-switch-field__icon">{trailingIcon}</span>
                )}
              </div>
              {helpText && (
                <span className="fds-switch-field__help BodySmallRegular">{helpText}</span>
              )}
            </div>
            {toggle}
          </div>
        </label>
        {showDivider && <Divider variant="Muted" />}
      </div>
    );
  },
);

Switch.displayName = 'Switch';
