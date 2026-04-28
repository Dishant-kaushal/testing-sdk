import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './DropdownLeadingItem.css';

export type DropdownLeadingType = 'Icon' | 'Asset';

export interface DropdownLeadingItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Type of leading item */
  leading?: DropdownLeadingType;
  /**
   * Content slot.
   * - leading='Icon' → pass a 20px icon element (constrained to 20×20)
   * - leading='Asset' → pass any ReactNode (constrained to 32×32)
   */
  children?: ReactNode;
}

export function DropdownLeadingItem({
  leading = 'Icon',
  children,
  className,
  ...rest
}: DropdownLeadingItemProps) {
  if (!children) return null;

  if (leading === 'Icon') {
    return (
      <div className={cn('fds-dropdown-leading', 'fds-dropdown-leading--icon', className)} {...rest}>
        <span className="fds-dropdown-leading__icon">{children}</span>
      </div>
    );
  }

  return (
    <div className={cn('fds-dropdown-leading', 'fds-dropdown-leading--asset', className)} {...rest}>
      {children}
    </div>
  );
}

DropdownLeadingItem.displayName = 'DropdownLeadingItem';
