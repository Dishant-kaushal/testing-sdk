import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './CardHeader.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Header title text */
  title: string;
  /** Header subtitle text */
  subtitle?: string;
  /** Leading item slot — pass CardLeadingItem or icon */
  leadingItem?: ReactNode;
  /** Trailing item slot — pass CardTrailingItem with Badge/Link/IconButton */
  trailingItem?: ReactNode;
  /** Counter slot — shown next to the title */
  counter?: ReactNode;
  /** Show bottom divider */
  showDivider?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CardHeader
   ═══════════════════════════════════════════════════════════════════════════ */

export function CardHeader({
  title,
  subtitle,
  leadingItem,
  trailingItem,
  counter,
  showDivider = true,
  className,
  ...rest
}: CardHeaderProps) {
  return (
    <div className={cn('fds-card-header', className)} {...rest}>
      <div className="fds-card-header__container">
        {/* Left: leading + content */}
        <div className="fds-card-header__left">
          {leadingItem}
          <div className="fds-card-header__content">
            <div className="fds-card-header__title-container">
              <span className="fds-card-header__title BodyLargeSemibold">{title}</span>
              {counter}
            </div>
            {subtitle && (
              <span className="fds-card-header__subtitle BodySmallRegular">{subtitle}</span>
            )}
          </div>
        </div>

        {/* Right: trailing */}
        {trailingItem && (
          <div className="fds-card-header__right">
            {trailingItem}
          </div>
        )}
      </div>

      {showDivider && <hr className="fds-card-header__divider" />}
    </div>
  );
}

CardHeader.displayName = 'CardHeader';
