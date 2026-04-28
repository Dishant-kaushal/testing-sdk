import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './ListCardLeadingItem.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type ListCardLeadingType = 'Icon' | 'Slot' | 'Color';

export interface ListCardLeadingItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Leading variant */
  leading?: ListCardLeadingType;
  /** Icon slot — for 'Icon' variant, pass a 16px react-feather icon */
  icon?: ReactNode;
  /** Custom content slot — for 'Slot' variant */
  children?: ReactNode;
  /** Color value — for 'Color' variant (any CSS color) */
  color?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ListCardLeadingItem
   ═══════════════════════════════════════════════════════════════════════════ */

export function ListCardLeadingItem({
  leading = 'Icon',
  icon,
  children,
  color,
  className,
  ...props
}: ListCardLeadingItemProps) {
  if (leading === 'Color') {
    return (
      <div className={cn('fds-list-card-leading', className)} {...props}>
        <span
          className="fds-list-card-leading__color"
          style={color ? { backgroundColor: color } : undefined}
        />
      </div>
    );
  }

  if (leading === 'Slot') {
    return (
      <div className={cn('fds-list-card-leading', className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn('fds-list-card-leading', className)} {...props}>
      {icon}
    </div>
  );
}

ListCardLeadingItem.displayName = 'ListCardLeadingItem';
