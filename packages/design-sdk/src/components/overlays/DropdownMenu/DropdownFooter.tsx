import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { Divider } from '../../layout/Divider/Divider';
import './DropdownFooter.css';

export type DropdownFooterStacking = 'Horizontal' | 'Vertical';

export interface DropdownFooterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Primary action slot — pass a Button (Primary variant, fullWidth) */
  primaryAction?: ReactNode;
  /** Secondary action slot — pass a Button (Secondary variant, fullWidth) */
  secondaryAction?: ReactNode;
  /** Optional custom content slot above/beside actions */
  children?: ReactNode;
  /** Action layout — Horizontal (side by side) or Vertical (stacked full width) */
  stacking?: DropdownFooterStacking;
}

export function DropdownFooter({
  primaryAction,
  secondaryAction,
  children,
  stacking = 'Horizontal',
  className,
  ...rest
}: DropdownFooterProps) {
  const hasActions = primaryAction || secondaryAction;

  return (
    <div className={cn('fds-dropdown-footer', `fds-dropdown-footer--${stacking.toLowerCase()}`, className)} {...rest}>
      <Divider variant="Muted" />

      <div className="fds-dropdown-footer__container">
        {children && (
          <div className="fds-dropdown-footer__slot">{children}</div>
        )}

        {hasActions && (
          <div className="fds-dropdown-footer__actions">
            {stacking === 'Horizontal' ? (
              <>
                {secondaryAction && (
                  <div className="fds-dropdown-footer__action">{secondaryAction}</div>
                )}
                {primaryAction && (
                  <div className="fds-dropdown-footer__action">{primaryAction}</div>
                )}
              </>
            ) : (
              <>
                {primaryAction && (
                  <div className="fds-dropdown-footer__action">{primaryAction}</div>
                )}
                {secondaryAction && (
                  <div className="fds-dropdown-footer__action">{secondaryAction}</div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

DropdownFooter.displayName = 'DropdownFooter';
