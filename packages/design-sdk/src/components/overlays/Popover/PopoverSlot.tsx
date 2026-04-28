import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './PopoverSlot.css';

export interface PopoverSlotProps extends HTMLAttributes<HTMLDivElement> {
  /** Arbitrary consumer content — forms, inputs, images, chips, etc. */
  children: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PopoverSlot — Faclon Design System 2.0
   Figma: 778:8023 (the "Slot" region between body text and footer — node
   237:13316, marked in Figma as "This is a placeholder component. Swap me
   with your custom content by using the component instance swapper").

   Full-width, min-height 48 px, 4 px radius, centred flex container.
   ═══════════════════════════════════════════════════════════════════════════ */

export function PopoverSlot({ children, className, ...props }: PopoverSlotProps) {
  return (
    <div className={cn('fds-popover-slot', className)} {...props}>
      {children}
    </div>
  );
}

PopoverSlot.displayName = 'PopoverSlot';
