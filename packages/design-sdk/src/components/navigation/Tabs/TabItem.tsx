import {
  forwardRef,
  useCallback,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';
import { useTabsContext } from './TabsContext';
import './TabItem.css';

export interface TabItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Unique identifier matching the parent `<Tabs value>` / `defaultValue`. */
  value: string;
  /** Displayed tab label. */
  label: string;
  /** Leading slot — pass `<TabsLeadingItem .../>`. */
  leadingItem?: ReactNode;
  /** Trailing slot — pass `<TabsTrailingItem .../>`. */
  trailing?: ReactNode;
  /** Disables interaction; skipped during arrow-key navigation. */
  isDisabled?: boolean;
}

export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(
  (
    { value, label, leadingItem, trailing, isDisabled = false, className, onClick, ...props },
    forwardedRef,
  ) => {
    const ctx = useTabsContext();

    /**
     * Single ref callback handles both the parent's registry (for keyboard
     * navigation) and any user-forwarded ref. React invokes this with `null`
     * on unmount, so no separate cleanup effect is needed.
     */
    const setRefs = useCallback(
      (el: HTMLButtonElement | null) => {
        ctx.registerItem(value, el);
        if (typeof forwardedRef === 'function') forwardedRef(el);
        else if (forwardedRef) forwardedRef.current = el;
      },
      [ctx, value, forwardedRef],
    );

    const isSelected = ctx.selectedValue === value;
    const isFallbackFocusable =
      ctx.selectedValue === undefined &&
      !isDisabled &&
      ctx.firstFocusableValue === value;

    const typographyClass = ctx.size === 'Large' ? 'BodyLargeSemibold' : 'BodyMediumSemibold';

    const classes = cn(
      'fds-tab-item',
      `fds-tab-item--variant-${ctx.variant.toLowerCase()}`,
      `fds-tab-item--orientation-${ctx.orientation.toLowerCase()}`,
      `fds-tab-item--size-${ctx.size.toLowerCase()}`,
      isSelected && 'fds-tab-item--selected',
      isDisabled && 'fds-tab-item--disabled',
      ctx.orientation === 'Horizontal' &&
        (ctx.variant === 'Filled' || ctx.isFullWidthTabItem) &&
        'fds-tab-item--full-width',
      typographyClass,
      className,
    );

    return (
      <button
        ref={setRefs}
        type="button"
        role="tab"
        id={`${ctx.baseId}-tab-${value}`}
        aria-controls={`${ctx.baseId}-panel-${value}`}
        aria-selected={isSelected}
        aria-disabled={isDisabled || undefined}
        disabled={isDisabled}
        tabIndex={isSelected || isFallbackFocusable ? 0 : -1}
        data-value={value}
        className={classes}
        onClick={(e) => {
          ctx.setSelectedValue(value);
          onClick?.(e);
        }}
        {...props}
      >
        {leadingItem && <span className="fds-tab-item__leading">{leadingItem}</span>}
        <span className="fds-tab-item__label">{label}</span>
        {trailing && <span className="fds-tab-item__trailing">{trailing}</span>}
      </button>
    );
  },
);

TabItem.displayName = 'TabItem';
