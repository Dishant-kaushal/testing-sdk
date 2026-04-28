import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';
import type { ButtonColor, ButtonSize, ButtonVariant } from '../Button/Button';
import { ButtonGroupContext, type ButtonGroupContextValue } from './ButtonGroupContext';
import {
  ButtonGroupItem,
  type ButtonGroupItemPosition,
  type ButtonGroupItemProps,
} from './ButtonGroupItem';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Size applied to every child item. Default: `Medium`. */
  size?: ButtonSize;
  /** Visual style applied to every child item. Default: `Primary`. */
  variant?: ButtonVariant;
  /** Semantic color palette applied to every child item. Default: `Primary`. */
  color?: ButtonColor;
  /** Stretches the group and distributes items evenly across its container width. */
  isFullWidth?: boolean;
  /** Disables every child item. */
  isDisabled?: boolean;
  /** `aria-label` applied to the group wrapper when no visible label is present. */
  accessibilityLabel?: string;
  /** Typically `<ButtonGroupItem>` elements. Other nodes pass through untouched. */
  children: ReactNode;
}

function isButtonGroupItemElement(
  node: ReactNode,
): node is ReactElement<ButtonGroupItemProps> {
  return isValidElement(node) && node.type === ButtonGroupItem;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      size = 'Medium',
      variant = 'Primary',
      color = 'Primary',
      isFullWidth = false,
      isDisabled = false,
      accessibilityLabel,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const contextValue = useMemo<ButtonGroupContextValue>(
      () => ({ size, variant, color, isFullWidth, isDisabled }),
      [size, variant, color, isFullWidth, isDisabled],
    );

    const items = Children.toArray(children);
    const itemCount = items.filter(isButtonGroupItemElement).length;

    let itemIndex = -1;
    const enhanced = items.map((child) => {
      if (!isButtonGroupItemElement(child)) return child;
      itemIndex += 1;

      let computed: ButtonGroupItemPosition;
      if (itemCount === 1) computed = 'Only';
      else if (itemIndex === 0) computed = 'Left';
      else if (itemIndex === itemCount - 1) computed = 'Right';
      else computed = 'Center';

      // Respect an explicitly-set `position` on the child.
      const position = child.props.position ?? computed;
      return cloneElement(child, { position });
    });

    return (
      <div
        ref={ref}
        role="group"
        aria-label={accessibilityLabel}
        className={cn(
          'fds-btn-group',
          isFullWidth && 'fds-btn-group--full-width',
          className,
        )}
        {...rest}
      >
        <ButtonGroupContext.Provider value={contextValue}>
          {enhanced}
        </ButtonGroupContext.Provider>
      </div>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';
