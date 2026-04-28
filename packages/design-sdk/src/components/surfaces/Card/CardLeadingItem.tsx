import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './CardLeadingItem.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type CardLeadingType = 'None' | 'Icon' | 'Custom';

export interface CardLeadingItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Type of leading item */
  leading?: CardLeadingType;
  /**
   * Content slot.
   * - leading='Icon' → pass a 24px icon element (constrained to 24×24)
   * - leading='Custom' → pass any ReactNode (flexible size)
   */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CardLeadingItem
   ═══════════════════════════════════════════════════════════════════════════ */

export function CardLeadingItem({
  leading = 'None',
  children,
  className,
  ...rest
}: CardLeadingItemProps) {
  if (leading === 'None' || !children) return null;

  if (leading === 'Icon') {
    return (
      <div className={cn('fds-card-leading', 'fds-card-leading--icon', className)} {...rest}>
        <span className="fds-card-leading__icon">{children}</span>
      </div>
    );
  }

  return (
    <div className={cn('fds-card-leading', 'fds-card-leading--custom', className)} {...rest}>
      {children}
    </div>
  );
}

CardLeadingItem.displayName = 'CardLeadingItem';
