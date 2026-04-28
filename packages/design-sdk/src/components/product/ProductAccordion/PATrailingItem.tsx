import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './PATrailingItem.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type PATrailingType = 'Icon' | 'Badge' | 'Counter';

export interface PATrailingItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Trailing variant */
  trailing?: PATrailingType;
  /** Icon slot — for 'Icon' variant, pass a 20px react-feather icon */
  icon?: ReactNode;
  /** Content slot — for 'Badge' or 'Counter' variant, pass Badge/Counter component */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PATrailingItem
   ═══════════════════════════════════════════════════════════════════════════ */

export function PATrailingItem({
  trailing = 'Icon',
  icon,
  children,
  className,
  ...props
}: PATrailingItemProps) {
  if (trailing === 'Icon') {
    return (
      <div className={cn('fds-pa-trailing fds-pa-trailing--icon', className)} {...props}>
        {icon}
      </div>
    );
  }

  return (
    <div className={cn('fds-pa-trailing', className)} {...props}>
      {children}
    </div>
  );
}

PATrailingItem.displayName = 'PATrailingItem';
