import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { Divider } from '../../layout/Divider/Divider';
import './ModalFooter.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type ModalFooterStacking = 'Horizontal' | 'Vertical';

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Button layout — Horizontal: side-by-side right-aligned; Vertical: stacked full-width */
  stacking?: ModalFooterStacking;
  /** Primary action slot — pass a Button (Primary variant) */
  primaryAction?: ReactNode;
  /** Secondary action slot — pass a Button (Secondary variant) */
  secondaryAction?: ReactNode;
  /** Optional content above the actions (e.g. checkbox, text) */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ModalFooter
   ═══════════════════════════════════════════════════════════════════════════ */

export function ModalFooter({
  stacking = 'Horizontal',
  primaryAction,
  secondaryAction,
  children,
  className,
  ...props
}: ModalFooterProps) {
  const isVertical = stacking === 'Vertical';

  return (
    <div className={cn('fds-modal-footer', className)} {...props}>
      <Divider variant="Muted" />

      <div className={cn('fds-modal-footer__actions', isVertical && 'fds-modal-footer__actions--vertical')}>
        {children && (
          <div className="fds-modal-footer__slot">{children}</div>
        )}

        <div className={cn('fds-modal-footer__stack', isVertical && 'fds-modal-footer__stack--vertical')}>
          {isVertical ? (
            <>
              {primaryAction}
              {secondaryAction}
            </>
          ) : (
            <>
              {secondaryAction}
              {primaryAction}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

ModalFooter.displayName = 'ModalFooter';
