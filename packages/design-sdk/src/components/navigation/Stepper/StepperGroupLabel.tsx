import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './StepperGroupLabel.css';

export interface StepperGroupLabelProps extends HTMLAttributes<HTMLDivElement> {
  /** Caption text or nodes rendered in BodySmallSemibold muted tone. */
  children: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   StepperGroupLabel — Faclon Design System 2.0
   A caption node that separates step clusters inside a vertical `<Stepper>`.
   Rendering order: the parent `<Stepper>` detects labels and adjusts the
   connector lines of the steps directly before / after the label so no
   continuous line runs through the caption's space.
   ═══════════════════════════════════════════════════════════════════════════ */

export function StepperGroupLabel({ children, className, ...props }: StepperGroupLabelProps) {
  return (
    <div className={cn('fds-stepper-group-label', 'BodySmallSemibold', className)} {...props}>
      {children}
    </div>
  );
}

StepperGroupLabel.displayName = 'StepperGroupLabel';
