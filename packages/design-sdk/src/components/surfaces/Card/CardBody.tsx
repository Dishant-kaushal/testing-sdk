import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './CardBody.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface CardBodyProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Body text (rendered when no children provided) */
  bodyText?: string;
  /** Custom body content slot — takes precedence over bodyText */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CardBody
   ═══════════════════════════════════════════════════════════════════════════ */

export function CardBody({
  bodyText,
  children,
  className,
  ...rest
}: CardBodyProps) {
  const hasSlot = !!children;

  return (
    <div className={cn('fds-card-body', hasSlot && 'fds-card-body--slot', className)} {...rest}>
      {hasSlot ? children : (
        <p className="fds-card-body__text BodyMediumRegular">
          {bodyText}
        </p>
      )}
    </div>
  );
}

CardBody.displayName = 'CardBody';
