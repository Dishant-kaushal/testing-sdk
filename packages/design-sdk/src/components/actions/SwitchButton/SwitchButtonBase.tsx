import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './SwitchButtonBase.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type SwitchButtonType = 'Icon' | 'Text';

export interface SwitchButtonBaseProps extends HTMLAttributes<HTMLButtonElement> {
  /** Button type — Icon: 36×36 square with icon; Text: 36px height with label */
  type?: SwitchButtonType;
  /** Whether this button is the active/selected one */
  isActive?: boolean;
  /** Whether the button is disabled */
  isDisabled?: boolean;
  /** Label text — for Text type */
  label?: string;
  /** Icon slot — for Icon type, pass a 16px react-feather icon */
  icon?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SwitchButtonBase
   ═══════════════════════════════════════════════════════════════════════════ */

export function SwitchButtonBase({
  type = 'Icon',
  isActive = false,
  isDisabled = false,
  label,
  icon,
  className,
  ...props
}: SwitchButtonBaseProps) {
  return (
    <button
      disabled={isDisabled}
      aria-pressed={isActive}
      className={cn(
        'fds-switch-btn',
        type === 'Icon' ? 'fds-switch-btn--icon' : 'fds-switch-btn--text',
        isActive && 'fds-switch-btn--active',
        isDisabled && 'fds-switch-btn--disabled',
        className,
      )}
      {...props}
    >
      {type === 'Icon' && icon}
      {type === 'Text' && (
        <span className="fds-switch-btn__label BodyMediumSemibold">{label}</span>
      )}
    </button>
  );
}

SwitchButtonBase.displayName = 'SwitchButtonBase';
