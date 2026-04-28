import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './TabsTrailingItem.css';

export type TabsTrailingItemType = 'Counter' | 'Badge';

export interface TabsTrailingItemProps extends HTMLAttributes<HTMLSpanElement> {
  /** Slot kind — `Counter` renders a numeric pill, `Badge` renders a consumer-passed `<Badge>`. */
  trailing?: TabsTrailingItemType;
  /** Counter content (number / short string) or `<Badge>` instance. */
  children: ReactNode;
}

export const TabsTrailingItem = forwardRef<HTMLSpanElement, TabsTrailingItemProps>(
  ({ trailing = 'Counter', children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'fds-tab-trailing',
          `fds-tab-trailing--type-${trailing.toLowerCase()}`,
          className,
        )}
        {...props}
      >
        {trailing === 'Counter' ? (
          <span className="fds-tab-trailing__counter BodyXSmallMedium">{children}</span>
        ) : (
          children
        )}
      </span>
    );
  },
);

TabsTrailingItem.displayName = 'TabsTrailingItem';
