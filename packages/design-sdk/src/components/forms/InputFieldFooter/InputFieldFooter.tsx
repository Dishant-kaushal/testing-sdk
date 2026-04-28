import type { HTMLAttributes } from 'react';
import { AlertCircle, CheckCircle } from 'react-feather';
import { cn } from '../../../utils/cn';
import './InputFieldFooter.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type InputFieldFooterSize = 'Medium' | 'Large';
export type InputFieldFooterState = 'default' | 'error' | 'success';

export interface InputFieldFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Help / error / success message text */
  helpText?: string;
  /** Counter text (e.g. "0/232") */
  counterText?: string;
  /** Visual state — controls text color and leading icon */
  state?: InputFieldFooterState;
  /** Medium: 12px text, Large: 14px text */
  size?: InputFieldFooterSize;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Typography + icon size maps
   ═══════════════════════════════════════════════════════════════════════════ */

const TEXT_TYPOGRAPHY: Record<InputFieldFooterSize, string> = {
  Medium: 'BodySmallRegular',
  Large: 'BodyMediumRegular',
};

const ICON_SIZE: Record<InputFieldFooterSize, number> = {
  Medium: 12,
  Large: 16,
};

/* ═══════════════════════════════════════════════════════════════════════════
   InputFieldFooter
   ═══════════════════════════════════════════════════════════════════════════ */

export function InputFieldFooter({
  helpText,
  counterText,
  state = 'default',
  size = 'Medium',
  className,
  ...props
}: InputFieldFooterProps) {
  if (!helpText && !counterText) return null;

  const iconSize = ICON_SIZE[size];

  return (
    <div className={cn('fds-field-footer', className)} {...props}>
      <div className={cn('fds-field-footer__row', state !== 'default' && 'fds-field-footer__row--center')}>
        {helpText && (
          <div className="fds-field-footer__help-group">
            {state === 'error' && (
              <span className="fds-field-footer__icon fds-field-footer__icon--error">
                <AlertCircle size={iconSize} />
              </span>
            )}
            {state === 'success' && (
              <span className="fds-field-footer__icon fds-field-footer__icon--success">
                <CheckCircle size={iconSize} />
              </span>
            )}
            <span className={cn(`fds-field-footer__text fds-field-footer__text--${state}`, TEXT_TYPOGRAPHY[size])}>
              {helpText}
            </span>
          </div>
        )}
        {counterText && (
          <span className={cn('fds-field-footer__counter', `fds-field-footer__counter--${state}`, 'BodySmallRegular')}>
            {counterText}
          </span>
        )}
      </div>
    </div>
  );
}

InputFieldFooter.displayName = 'InputFieldFooter';
