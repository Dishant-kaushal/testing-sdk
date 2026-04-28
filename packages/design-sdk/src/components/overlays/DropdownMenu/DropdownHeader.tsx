import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { Divider } from '../../layout/Divider/Divider';
import './DropdownHeader.css';

export interface DropdownHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Header title text */
  title: string;
  /** Header subtitle text */
  subtitle?: string;
  /** Leading item slot — pass DropdownLeadingItem */
  leadingItem?: ReactNode;
  /** Trailing item slot — pass DropdownTrailingItem */
  trailingItem?: ReactNode;
  /** Counter slot — shown next to the title */
  counter?: ReactNode;
}

export function DropdownHeader({
  title,
  subtitle,
  leadingItem,
  trailingItem,
  counter,
  className,
  ...rest
}: DropdownHeaderProps) {
  return (
    <div className={cn('fds-dropdown-header', className)} {...rest}>
      <div className="fds-dropdown-header__container">
        <div className="fds-dropdown-header__left">
          {leadingItem}
          <div className="fds-dropdown-header__content">
            <div className="fds-dropdown-header__heading">
              <span className="fds-dropdown-header__title BodyLargeSemibold">{title}</span>
              {counter && (
                <span className="fds-dropdown-header__counter">{counter}</span>
              )}
            </div>
            {subtitle && (
              <span className="fds-dropdown-header__subtitle BodySmallRegular">{subtitle}</span>
            )}
          </div>
        </div>

        {trailingItem}
      </div>

      <Divider variant="Muted" />
    </div>
  );
}

DropdownHeader.displayName = 'DropdownHeader';
