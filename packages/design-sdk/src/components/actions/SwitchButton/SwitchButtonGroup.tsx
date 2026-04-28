import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './SwitchButtonGroup.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface SwitchButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** SwitchButtonBase children */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SwitchButtonGroup
   ═══════════════════════════════════════════════════════════════════════════ */

export function SwitchButtonGroup({
  children,
  className,
  ...props
}: SwitchButtonGroupProps) {
  return (
    <div className={cn('fds-switch-btn-group', className)} role="group" {...props}>
      {children}
    </div>
  );
}

SwitchButtonGroup.displayName = 'SwitchButtonGroup';
