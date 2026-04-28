import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './CardFooter.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type CardFooterLayout = 'Desktop' | 'Mobile';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Footer title text */
  title?: string;
  /** Footer subtitle text */
  subtitle?: string;
  /** Primary action slot — pass a Button (Primary variant) */
  primaryAction?: ReactNode;
  /** Secondary action slot — pass a Button (Secondary variant) */
  secondaryAction?: ReactNode;
  /** Show top divider */
  showDivider?: boolean;
  /** Layout — Desktop (inline) or Mobile (stacked full-width buttons) */
  layout?: CardFooterLayout;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CardFooter
   ═══════════════════════════════════════════════════════════════════════════ */

export function CardFooter({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  showDivider = true,
  layout = 'Desktop',
  className,
  ...rest
}: CardFooterProps) {
  const hasContent = title || subtitle;
  const hasActions = primaryAction || secondaryAction;

  return (
    <div className={cn('fds-card-footer', `fds-card-footer--${layout.toLowerCase()}`, className)} {...rest}>
      {showDivider && <hr className="fds-card-footer__divider" />}

      <div className="fds-card-footer__container">
        {hasContent && (
          <div className="fds-card-footer__content">
            {title && (
              <span className="fds-card-footer__title BodyMediumSemibold">{title}</span>
            )}
            {subtitle && (
              <span className="fds-card-footer__subtitle BodySmallRegular">{subtitle}</span>
            )}
          </div>
        )}

        {hasActions && (
          <div className="fds-card-footer__actions">
            {secondaryAction && (
              <div className="fds-card-footer__action">{secondaryAction}</div>
            )}
            {primaryAction && (
              <div className="fds-card-footer__action">{primaryAction}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

CardFooter.displayName = 'CardFooter';
