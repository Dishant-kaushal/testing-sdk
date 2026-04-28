import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { InputFieldHeader } from '../../forms/InputFieldHeader/InputFieldHeader';
import { InputFieldFooter } from '../../forms/InputFieldFooter/InputFieldFooter';
import './DateSelectorGroup.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface DateSelectorGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Label above the button row */
  label?: string;
  /** Help text below the button row */
  helpText?: string;
  /** DateSelectorButton children */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DateSelectorGroup
   ═══════════════════════════════════════════════════════════════════════════ */

export function DateSelectorGroup({
  label,
  helpText,
  children,
  className,
  ...props
}: DateSelectorGroupProps) {
  return (
    <div className={cn('fds-date-selector-group', className)} {...props}>
      {label && <InputFieldHeader label={label} />}

      <div className="fds-date-selector-group__body">
        <div className="fds-date-selector-group__row">
          {children}
        </div>
        {helpText && <InputFieldFooter helpText={helpText} />}
      </div>
    </div>
  );
}

DateSelectorGroup.displayName = 'DateSelectorGroup';
