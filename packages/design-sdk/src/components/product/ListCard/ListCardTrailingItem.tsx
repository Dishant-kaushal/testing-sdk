import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './ListCardTrailingItem.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type ListCardTrailingType = 'Icon' | 'Slot';

export interface ListCardTrailingItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Trailing variant */
  trailing?: ListCardTrailingType;
  /** Icon slot — for 'Icon' variant, pass a 16px icon or IconButton */
  icon?: ReactNode;
  /** Custom content slot — for 'Slot' variant */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ListCardTrailingItem
   ═══════════════════════════════════════════════════════════════════════════ */

export function ListCardTrailingItem({
  trailing = 'Icon',
  icon,
  children,
  className,
  ...props
}: ListCardTrailingItemProps) {
  return (
    <div className={cn('fds-list-card-trailing', className)} {...props}>
      {trailing === 'Slot' ? children : icon}
    </div>
  );
}

ListCardTrailingItem.displayName = 'ListCardTrailingItem';
