import type { ReactNode, HTMLAttributes } from 'react';
import { AlertTriangle, AlertCircle, CheckCircle } from 'react-feather';
import { cn } from '../../../utils/cn';
import './ModalLeadingItem.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type ModalLeadingType = 'Icon' | 'Asset' | 'error' | 'warning' | 'success';

export interface ModalLeadingItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Leading variant */
  leading?: ModalLeadingType;
  /** Icon slot — for 'Icon' variant, pass a 20px react-feather icon */
  icon?: ReactNode;
  /** Custom content slot — for 'Asset' variant */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ModalLeadingItem
   ═══════════════════════════════════════════════════════════════════════════ */

export function ModalLeadingItem({
  leading = 'Icon',
  icon,
  children,
  className,
  ...props
}: ModalLeadingItemProps) {
  if (leading === 'error') {
    return (
      <div className={cn('fds-modal-leading fds-modal-leading--error', className)} {...props}>
        <AlertTriangle size={16} />
      </div>
    );
  }

  if (leading === 'warning') {
    return (
      <div className={cn('fds-modal-leading fds-modal-leading--warning', className)} {...props}>
        <AlertCircle size={16} />
      </div>
    );
  }

  if (leading === 'success') {
    return (
      <div className={cn('fds-modal-leading fds-modal-leading--success', className)} {...props}>
        <CheckCircle size={16} />
      </div>
    );
  }

  if (leading === 'Asset') {
    return (
      <div className={cn('fds-modal-leading fds-modal-leading--asset', className)} {...props}>
        {children}
      </div>
    );
  }

  /* Icon (default) */
  return (
    <div className={cn('fds-modal-leading fds-modal-leading--icon', className)} {...props}>
      {icon}
    </div>
  );
}

ModalLeadingItem.displayName = 'ModalLeadingItem';
