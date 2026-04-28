import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './ModalBody.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Body text — renders as BodyMediumRegular paragraph */
  bodyText?: string;
  /** Custom content slot — overrides bodyText when provided */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ModalBody
   ═══════════════════════════════════════════════════════════════════════════ */

export function ModalBody({
  bodyText,
  children,
  className,
  ...props
}: ModalBodyProps) {
  return (
    <div className={cn('fds-modal-body', className)} {...props}>
      {children ?? (
        bodyText && (
          <p className="fds-modal-body__text BodyMediumRegular">{bodyText}</p>
        )
      )}
    </div>
  );
}

ModalBody.displayName = 'ModalBody';
