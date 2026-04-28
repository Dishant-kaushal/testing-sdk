import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './PopoverBody.css';

export interface PopoverBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Convenience description — rendered as `BodyMediumRegular` with muted secondary color,
   *  matching the first text line in Figma 778:8023. For anything else use `children`. */
  description?: string;
  /** Custom content slot — rendered below the description with 16 px vertical gap. */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PopoverBody — Faclon Design System 2.0
   Figma: 778:8023 (the `body` slot between header and footer)
   Stacks an optional description + arbitrary consumer content with 16 px gap.
   ═══════════════════════════════════════════════════════════════════════════ */

export function PopoverBody({
  description,
  children,
  className,
  ...props
}: PopoverBodyProps) {
  return (
    <div className={cn('fds-popover-body', className)} {...props}>
      {description && (
        <p className="fds-popover-body__description BodyMediumRegular">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

PopoverBody.displayName = 'PopoverBody';
