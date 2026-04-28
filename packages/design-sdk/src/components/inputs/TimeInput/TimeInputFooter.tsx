import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { Button } from '../../actions/Button/Button';
import { Divider } from '../../layout/Divider/Divider';
import './TimeInputFooter.css';

export interface TimeInputFooterProps extends HTMLAttributes<HTMLDivElement> {
  cancelLabel?: string;
  applyLabel?: string;
  isApplyDisabled?: boolean;
  onCancel?: () => void;
  onApply?: () => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TimeInputFooter — Figma 3155:10656 (Time Picker Footer)
   192×60, centred Cancel (Gray) + Apply (Primary), 16px gap, XSmall buttons
   Kept separate from CalendarFooter because DatePicker needs right-aligned
   Secondary/Primary; the two footers diverge on three axes.
   ═══════════════════════════════════════════════════════════════════════════ */

export function TimeInputFooter({
  cancelLabel = 'Cancel',
  applyLabel = 'Apply',
  isApplyDisabled = false,
  onCancel,
  onApply,
  className,
  ...props
}: TimeInputFooterProps) {
  return (
    <div className={cn('fds-time-footer', className)} {...props}>
      <Divider variant="Muted" />
      <div className="fds-time-footer__actions">
        <Button
          variant="Gray"
          color="Primary"
          size="XSmall"
          label={cancelLabel}
          onClick={onCancel}
        />
        <Button
          variant="Primary"
          color="Primary"
          size="XSmall"
          label={applyLabel}
          isDisabled={isApplyDisabled}
          onClick={onApply}
        />
      </div>
    </div>
  );
}

TimeInputFooter.displayName = 'TimeInputFooter';
