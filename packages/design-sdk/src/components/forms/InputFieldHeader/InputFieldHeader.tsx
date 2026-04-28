import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './InputFieldHeader.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type InputFieldHeaderSize = 'Medium' | 'Large';
export type InputFieldNecessityIndicator = 'none' | 'required';

export interface InputFieldHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Label text */
  label: string;
  /** Shows a red asterisk when 'required' */
  necessityIndicator?: InputFieldNecessityIndicator;
  /** Medium: 12px/18px, Large: 14px/20px */
  size?: InputFieldHeaderSize;
  /** Trailing slot — link, action, or custom content on the right */
  trailing?: ReactNode;
  /** Associates the label with an input via htmlFor */
  htmlFor?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Typography map
   ═══════════════════════════════════════════════════════════════════════════ */

const TYPOGRAPHY: Record<InputFieldHeaderSize, string> = {
  Medium: 'BodySmallSemibold',
  Large: 'BodyMediumSemibold',
};

/* ═══════════════════════════════════════════════════════════════════════════
   InputFieldHeader
   ═══════════════════════════════════════════════════════════════════════════ */

export function InputFieldHeader({
  label,
  necessityIndicator = 'none',
  size = 'Medium',
  trailing,
  htmlFor,
  className,
  ...props
}: InputFieldHeaderProps) {
  return (
    <div className={cn('fds-field-header', className)} {...props}>
      <div className="fds-field-header__row">
        <label className={cn('fds-field-header__label', TYPOGRAPHY[size])} htmlFor={htmlFor}>
          {label}
          {necessityIndicator === 'required' && (
            <span className="fds-field-header__required">*</span>
          )}
        </label>
        {trailing && (
          <div className="fds-field-header__trailing">{trailing}</div>
        )}
      </div>
    </div>
  );
}

InputFieldHeader.displayName = 'InputFieldHeader';
