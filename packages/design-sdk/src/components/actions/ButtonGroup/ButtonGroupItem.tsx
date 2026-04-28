import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { Button, type ButtonProps } from '../Button/Button';
import { useButtonGroupContext } from './ButtonGroupContext';

export type ButtonGroupItemPosition = 'Left' | 'Center' | 'Right' | 'Only';

export interface ButtonGroupItemProps
  extends Omit<ButtonProps, 'variant' | 'size' | 'color' | 'isFullWidth' | 'isDisabled'> {
  /**
   * Auto-assigned by `ButtonGroup` based on child index. Only set manually when rendering
   * outside a `ButtonGroup` (rarely useful — a standalone item is just a `Button`).
   */
  position?: ButtonGroupItemPosition;
}

/**
 * A single item in a `ButtonGroup`. Renders a `<span>` wrapper around the composed
 * `Button`. The wrapper owns layout (overlap margin, focus/hover z-index lift) so the
 * inner `Button` keeps its native paint — including its full focus ring, which sits
 * above neighbouring items when focused.
 */
export const ButtonGroupItem = forwardRef<HTMLButtonElement, ButtonGroupItemProps>(
  ({ position = 'Only', className, ...rest }, ref) => {
    const ctx = useButtonGroupContext();

    const size = ctx?.size ?? 'Medium';
    const variant = ctx?.variant ?? 'Primary';
    const color = ctx?.color ?? 'Primary';
    const isDisabled = ctx?.isDisabled ?? false;

    return (
      <span
        className={cn(
          'fds-btn-group__item',
          `fds-btn-group__item--${position.toLowerCase()}`,
          `fds-btn-group__item--variant-${variant.toLowerCase()}`,
        )}
      >
        <Button
          ref={ref}
          variant={variant}
          size={size}
          color={color}
          isDisabled={isDisabled}
          className={cn('fds-btn-group__button', className)}
          {...rest}
        />
      </span>
    );
  },
);

ButtonGroupItem.displayName = 'ButtonGroupItem';
