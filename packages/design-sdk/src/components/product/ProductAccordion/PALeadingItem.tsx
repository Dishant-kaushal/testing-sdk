import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './PALeadingItem.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type PALeadingType = 'None' | 'Icon' | 'Number' | 'Slot';

export interface PALeadingItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Leading variant */
  leading?: PALeadingType;
  /** Icon slot — for 'Icon' variant, pass a 20px react-feather icon */
  icon?: ReactNode;
  /** Number text — for 'Number' variant (e.g. "1.", "2.") */
  number?: string;
  /** Custom content slot — for 'Slot' variant */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PALeadingItem
   ═══════════════════════════════════════════════════════════════════════════ */

export function PALeadingItem({
  leading = 'Icon',
  icon,
  number,
  children,
  className,
  ...props
}: PALeadingItemProps) {
  if (leading === 'None') return null;

  if (leading === 'Number') {
    return (
      <div className={cn('fds-pa-leading fds-pa-leading--number', className)} {...props}>
        <span className="fds-pa-leading__number BodyMediumMedium">{number}</span>
      </div>
    );
  }

  if (leading === 'Slot') {
    return (
      <div className={cn('fds-pa-leading', className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn('fds-pa-leading fds-pa-leading--icon', className)} {...props}>
      {icon}
    </div>
  );
}

PALeadingItem.displayName = 'PALeadingItem';
