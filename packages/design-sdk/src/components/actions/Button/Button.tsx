import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Spinner, type SpinnerColor } from '../../feedback/Spinner/Spinner';
import { cn } from '../../../utils/cn';
import './Button.css';

export type ButtonVariant = 'Primary' | 'Secondary' | 'Gray';
export type ButtonColor = 'Primary' | 'Negative' | 'Positive' | 'Warning' | 'Info';
export type ButtonSize = 'Large' | 'Medium' | 'Small' | 'XSmall';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button */
  variant?: ButtonVariant;
  /** Semantic color palette */
  color?: ButtonColor;
  /** Size of the button */
  size?: ButtonSize;
  /** Button label text */
  label?: string;
  /** Leading icon slot rendered before the label */
  leadingIcon?: ReactNode;
  /** Trailing icon slot rendered after the label */
  trailingIcon?: ReactNode;
  /** Renders icon-only button (no label) */
  iconOnly?: boolean;
  /** Stretches button to fill its container width */
  isFullWidth?: boolean;
  /** Disables interaction */
  isDisabled?: boolean;
  /** Shows loading spinner instead of content */
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'Primary',
      color = 'Primary',
      size = 'Medium',
      label,
      leadingIcon,
      trailingIcon,
      iconOnly = false,
      isFullWidth = false,
      isDisabled = false,
      isLoading = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const typographyClass: Record<ButtonSize, string> = {
      Large: 'BodyLargeSemibold',
      Medium: 'BodyMediumSemibold',
      Small: 'BodySmallSemibold',
      XSmall: 'BodySmallSemibold',
    };

    const classes = cn(
      'fds-btn',
      `fds-btn--variant-${variant.toLowerCase()}`,
      `fds-btn--color-${color.toLowerCase()}`,
      `fds-btn--size-${size.toLowerCase()}`,
      typographyClass[size],
      iconOnly && 'fds-btn--icon-only',
      isFullWidth && 'fds-btn--full-width',
      isLoading && 'fds-btn--loading',
      className,
    );

    const spinnerSize = size === 'Large' ? 'Large' as const : 'Medium' as const;

    const SPINNER_COLOR_MAP: Record<ButtonColor, SpinnerColor> = {
      Primary: 'Brand',
      Negative: 'Negative',
      Positive: 'Positive',
      Warning: 'Warning',
      Info: 'Information',
    };

    const spinnerColor: SpinnerColor =
      variant === 'Primary' ? 'White' : SPINNER_COLOR_MAP[color];

    return (
      <button
        ref={ref}
        className={classes}
        type="button"
        disabled={isDisabled || isLoading}
        aria-disabled={isDisabled || isLoading || undefined}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <Spinner color={spinnerColor} size={spinnerSize} />
        ) : (
          <>
            {leadingIcon && (
              <span className="fds-btn__icon fds-btn__icon--leading">{leadingIcon}</span>
            )}
            {!iconOnly && label && <span className="fds-btn__label">{label}</span>}
            {!iconOnly && !label && children && (
              <span className="fds-btn__label">{children}</span>
            )}
            {iconOnly && !leadingIcon && !trailingIcon && children && (
              <span className="fds-btn__icon">{children}</span>
            )}
            {trailingIcon && (
              <span className="fds-btn__icon fds-btn__icon--trailing">{trailingIcon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
