import type { ReactNode, HTMLAttributes } from 'react';
import { X } from 'react-feather';
import { cn } from '../../../utils/cn';
import { IconButton } from '../../actions/IconButton/IconButton';
import { Divider } from '../../layout/Divider/Divider';
import './ModalHeader.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ModalHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Header title */
  title: string;
  /** Subtitle below the title */
  subtitle?: string;
  /** Leading item slot — pass ModalLeadingItem */
  leadingItem?: ReactNode;
  /** Trailing item slot — pass ModalTrailingItem */
  trailingItem?: ReactNode;
  /** Counter slot — pass Badge next to the title */
  counter?: ReactNode;
  /** Called when the close button is clicked */
  onClose?: () => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ModalHeader
   ═══════════════════════════════════════════════════════════════════════════ */

export function ModalHeader({
  title,
  subtitle,
  leadingItem,
  trailingItem,
  counter,
  onClose,
  className,
  ...props
}: ModalHeaderProps) {
  return (
    <div className={cn('fds-modal-header', className)} {...props}>
      <div className="fds-modal-header__root">
        <div className="fds-modal-header__wrapper">
          <div className="fds-modal-header__left">
            {leadingItem}

            <div className="fds-modal-header__content">
              <div className="fds-modal-header__heading">
                <span className="fds-modal-header__title BodyLargeSemibold">{title}</span>
                {counter && (
                  <div className="fds-modal-header__counter">{counter}</div>
                )}
              </div>
              {subtitle && (
                <span className="fds-modal-header__subtitle BodySmallRegular">{subtitle}</span>
              )}
            </div>
          </div>

          {trailingItem}

          <IconButton
            icon={<X size={20} />}
            size="20"
            onClick={onClose}
            aria-label="Close"
            className="fds-modal-header__close"
          />
        </div>

        <Divider variant="Muted" />
      </div>
    </div>
  );
}

ModalHeader.displayName = 'ModalHeader';
