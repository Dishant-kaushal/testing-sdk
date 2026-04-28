import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './TabsLeadingItem.css';

export type TabsLeadingItemType = 'Icon' | 'Asset';
export type TabsLeadingItemSize = '16' | '20';

export interface TabsLeadingItemProps extends HTMLAttributes<HTMLSpanElement> {
  /** Slot kind — `Icon` for react-feather icons, `Asset` for arbitrary children (image, custom SVG). */
  leading?: TabsLeadingItemType;
  /** Square dimension in pixels. Aligns with TabItem size: Medium → 16, Large → 20. */
  size?: TabsLeadingItemSize;
  /** Icon node, used when `leading="Icon"`. */
  icon?: ReactNode;
  /** Custom asset node, used when `leading="Asset"`. */
  children?: ReactNode;
}

export const TabsLeadingItem = forwardRef<HTMLSpanElement, TabsLeadingItemProps>(
  ({ leading = 'Icon', size = '16', icon, children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'fds-tab-leading',
          `fds-tab-leading--size-${size}`,
          `fds-tab-leading--type-${leading.toLowerCase()}`,
          className,
        )}
        aria-hidden="true"
        {...props}
      >
        {leading === 'Icon' ? icon : children}
      </span>
    );
  },
);

TabsLeadingItem.displayName = 'TabsLeadingItem';
