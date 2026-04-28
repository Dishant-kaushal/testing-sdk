import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { Button } from '../../actions/Button/Button';
import { Divider } from '../../layout/Divider/Divider';
import './CalendarFooter.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface CalendarFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Cancel button label */
  cancelLabel?: string;
  /** Apply button label */
  applyLabel?: string;
  /** Disable the Apply button */
  isApplyDisabled?: boolean;
  /** Called when Cancel is clicked */
  onCancel?: () => void;
  /** Called when Apply is clicked */
  onApply?: () => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CalendarFooter
   ═══════════════════════════════════════════════════════════════════════════ */

export function CalendarFooter({
  cancelLabel = 'Cancel',
  applyLabel = 'Apply',
  isApplyDisabled = false,
  onCancel,
  onApply,
  className,
  ...props
}: CalendarFooterProps) {
  return (
    <div className={cn('fds-calendar-footer', className)} {...props}>
      <Divider variant="Muted" />
      <div className="fds-calendar-footer__actions">
        <Button
          variant="Secondary"
          color="Primary"
          size="Small"
          label={cancelLabel}
          onClick={onCancel}
        />
        <Button
          variant="Primary"
          color="Primary"
          size="Small"
          label={applyLabel}
          isDisabled={isApplyDisabled}
          onClick={onApply}
        />
      </div>
    </div>
  );
}

CalendarFooter.displayName = 'CalendarFooter';
