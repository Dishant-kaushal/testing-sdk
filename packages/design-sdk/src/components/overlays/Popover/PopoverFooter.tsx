import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './PopoverFooter.css';

export interface PopoverFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Primary action — typically `<Button variant="Primary" size="Small">`. Rendered on the right. */
  primaryAction?: ReactNode;
  /** Secondary action — typically `<Button variant="Gray" size="Small">`. Rendered before primary. */
  secondaryAction?: ReactNode;
  /** Custom content — when present, overrides the primary/secondary slots entirely. */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PopoverFooter — Faclon Design System 2.0
   Figma: 778:8451
   Right-aligned action row, 12 px gap between buttons, no divider.
   ═══════════════════════════════════════════════════════════════════════════ */

export function PopoverFooter({
  primaryAction,
  secondaryAction,
  children,
  className,
  ...props
}: PopoverFooterProps) {
  return (
    <div className={cn('fds-popover-footer', className)} {...props}>
      {children ?? (
        <>
          {secondaryAction}
          {primaryAction}
        </>
      )}
    </div>
  );
}

PopoverFooter.displayName = 'PopoverFooter';
