import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './CardTrailingItem.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type CardTrailingType = 'None' | 'Action' | 'Link' | 'Badge';

export interface CardTrailingItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Type of trailing item — controls layout wrapper */
  trailing?: CardTrailingType;
  /**
   * Content slot — pass your Badge, LinkButton, or IconButton here.
   *
   * Examples:
   * - trailing='Action' → <IconButton icon={<Download />} ... />
   * - trailing='Link'   → <LinkButton type="Action" label="Link" ... />
   * - trailing='Badge'  → <Badge color="Positive" label="Label" ... />
   */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CardTrailingItem
   ═══════════════════════════════════════════════════════════════════════════ */

export function CardTrailingItem({
  trailing = 'None',
  children,
  className,
  ...rest
}: CardTrailingItemProps) {
  if (trailing === 'None' || !children) return null;

  return (
    <div className={cn('fds-card-trailing', `fds-card-trailing--${trailing.toLowerCase()}`, className)} {...rest}>
      {children}
    </div>
  );
}

CardTrailingItem.displayName = 'CardTrailingItem';
