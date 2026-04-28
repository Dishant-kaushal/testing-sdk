import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './ModalTrailingItem.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type ModalTrailingType = 'Action' | 'Link' | 'Badge' | 'Text';

export interface ModalTrailingItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Trailing variant — controls padding. Action has no extra padding, others get 4px py. */
  trailing?: ModalTrailingType;
  /** Content slot — pass IconButton, LinkButton, Badge, or text */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ModalTrailingItem
   ═══════════════════════════════════════════════════════════════════════════ */

export function ModalTrailingItem({
  trailing = 'Action',
  children,
  className,
  ...props
}: ModalTrailingItemProps) {
  return (
    <div
      className={cn(
        'fds-modal-trailing',
        trailing !== 'Action' && 'fds-modal-trailing--padded',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

ModalTrailingItem.displayName = 'ModalTrailingItem';
