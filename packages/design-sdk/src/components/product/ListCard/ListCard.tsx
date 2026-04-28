import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './ListCard.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ListCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card title */
  title: string;
  /** Subtitle below the title */
  subtitle?: string;
  /** Whether the card is selected */
  isSelected?: boolean;
  /** Whether the card is disabled */
  isDisabled?: boolean;
  /** Leading item slot — pass ListCardLeadingItem */
  leadingItem?: ReactNode;
  /** Trailing items slot — pass ListCardTrailingItem(s) */
  trailingItems?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ListCard
   ═══════════════════════════════════════════════════════════════════════════ */

export function ListCard({
  title,
  subtitle,
  isSelected = false,
  isDisabled = false,
  leadingItem,
  trailingItems,
  className,
  ...props
}: ListCardProps) {
  return (
    <div
      className={cn(
        'fds-list-card',
        isSelected && 'fds-list-card--selected',
        isDisabled && 'fds-list-card--disabled',
        className,
      )}
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled || undefined}
      {...props}
    >
      <div className="fds-list-card__content">
        {leadingItem}

        <div className="fds-list-card__text">
          <span className="fds-list-card__title BodyMediumMedium">{title}</span>
          {subtitle && (
            <span className="fds-list-card__subtitle BodySmallRegular">{subtitle}</span>
          )}
        </div>
      </div>

      {trailingItems && (
        <div className="fds-list-card__trailing">
          {trailingItems}
        </div>
      )}
    </div>
  );
}

ListCard.displayName = 'ListCard';
