import {
  forwardRef,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';
import { useChipGroupContext } from './ChipGroupContext';
import './Chip.css';

export type ChipSize = 'XSmall' | 'Small' | 'Medium' | 'Large';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Label text. Required unless `iconOnly` is true (then used as aria-label). */
  label?: string;
  /** Identifier used by a parent `ChipGroup` to track selection. */
  value?: string;
  /** Size of the chip. Overridden by `ChipGroup`'s `size` when nested. */
  size?: ChipSize;
  /** Standalone presentational selected state — ignored when inside a `ChipGroup`. */
  isSelected?: boolean;
  /** Disables interaction. Overridden by `ChipGroup`'s `isDisabled` when nested. */
  isDisabled?: boolean;
  /** Leading icon slot. When `iconOnly` is true, this icon is the only visual. */
  icon?: ReactNode;
  /** Renders an icon-only chip (square padding). `label` becomes `aria-label`. */
  iconOnly?: boolean;
}

const SIZE_CLASS: Record<ChipSize, string> = {
  XSmall: 'fds-chip--size-xsmall',
  Small: 'fds-chip--size-small',
  Medium: 'fds-chip--size-medium',
  Large: 'fds-chip--size-large',
};

const LABEL_TYPOGRAPHY: Record<ChipSize, string> = {
  XSmall: 'BodySmallRegular',
  Small: 'BodyMediumRegular',
  Medium: 'BodyLargeRegular',
  Large: 'HeadingMediumRegular',
};

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      label,
      value,
      size: sizeProp = 'Small',
      isSelected: isSelectedProp = false,
      isDisabled: isDisabledProp = false,
      icon,
      iconOnly = false,
      className,
      type,
      onClick,
      ...props
    },
    ref,
  ) => {
    const group = useChipGroupContext();

    const size = group?.size ?? sizeProp;
    const isDisabled = group?.isDisabled || isDisabledProp;
    const isSelected = group && value != null ? group.selectedValues.has(value) : isSelectedProp;

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (isDisabled) return;
      if (group && value != null) group.onChipToggle(value);
    };

    if (process.env.NODE_ENV !== 'production' && iconOnly && !label) {
      // eslint-disable-next-line no-console
      console.warn(
        '[Chip] `iconOnly` is true but no `label` was provided — screen readers will announce an unlabeled button.',
      );
    }

    const ariaLabel = iconOnly ? label : props['aria-label'];

    return (
      <button
        {...props}
        ref={ref}
        type={type ?? 'button'}
        className={cn(
          'fds-chip',
          SIZE_CLASS[size],
          iconOnly && 'fds-chip--icon-only',
          isSelected && 'fds-chip--selected',
          isDisabled && 'fds-chip--disabled',
          className,
        )}
        aria-pressed={isSelected}
        aria-disabled={isDisabled || undefined}
        aria-label={ariaLabel}
        disabled={isDisabled}
        data-value={value}
        onClick={handleClick}
      >
        {icon && (
          <span className="fds-chip__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        {!iconOnly && label && (
          <span className={cn('fds-chip__label', LABEL_TYPOGRAPHY[size])}>{label}</span>
        )}
      </button>
    );
  },
);

Chip.displayName = 'Chip';
