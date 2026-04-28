import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './Card.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type CardElevation = 'None' | 'LowRaised' | 'MidRaised' | 'HighRaised';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Elevation shadow level */
  elevation?: CardElevation;
  /** Whether the card shows hover shadow effect */
  isHoverable?: boolean;
  /** Whether the card scales up (1.05×) on hover */
  isHoverScaled?: boolean;
  /** Whether the card is in selected state (blue border) */
  isSelected?: boolean;
  /** Card header slot — pass CardHeader */
  header?: ReactNode;
  /** Card body slot — pass CardBody or custom content */
  body?: ReactNode;
  /** Card footer slot — pass CardFooter */
  footer?: ReactNode;
  /** Alternative: pass all content as children instead of header/body/footer slots */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Card
   ═══════════════════════════════════════════════════════════════════════════ */

export function Card({
  elevation = 'None',
  isHoverable = false,
  isHoverScaled = false,
  isSelected = false,
  header,
  body,
  footer,
  children,
  className,
  ...props
}: CardProps) {
  const rootClasses = cn(
    'fds-card',
    `fds-card--elevation-${elevation.toLowerCase()}`,
    isHoverable && 'fds-card--hoverable',
    isHoverScaled && 'fds-card--hover-scaled',
    isSelected && 'fds-card--selected',
    className,
  );

  return (
    <div className={rootClasses} {...props}>
      {header}
      {body}
      {footer}
      {children}
    </div>
  );
}

Card.displayName = 'Card';
