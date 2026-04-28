import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './DropdownTrailingItem.css';

export type DropdownTrailingType = 'Action' | 'Link' | 'Badge' | 'Text';

export interface DropdownTrailingItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Type of trailing item — controls layout wrapper */
  trailing?: DropdownTrailingType;
  /**
   * Content slot.
   * - trailing='Action' → pass an IconButton (XSmall)
   * - trailing='Link'   → pass a LinkButton
   * - trailing='Badge'  → pass a Badge component
   * - trailing='Text'   → pass a text string or element
   */
  children?: ReactNode;
}

export function DropdownTrailingItem({
  trailing = 'Action',
  children,
  className,
  ...rest
}: DropdownTrailingItemProps) {
  if (!children) return null;

  return (
    <div className={cn('fds-dropdown-trailing', `fds-dropdown-trailing--${trailing.toLowerCase()}`, className)} {...rest}>
      {children}
    </div>
  );
}

DropdownTrailingItem.displayName = 'DropdownTrailingItem';
