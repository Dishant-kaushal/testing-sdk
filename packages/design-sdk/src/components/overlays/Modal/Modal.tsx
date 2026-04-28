import { useCallback, type ReactNode, type HTMLAttributes, type MouseEvent } from 'react';
import { X } from 'react-feather';
import { cn } from '../../../utils/cn';
import { IconButton } from '../../actions/IconButton/IconButton';
import { useKeyboard } from '../../../hooks/useKeyboard';
import './Modal.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type ModalSize = 'Small' | 'Medium' | 'Large';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Width — Small: 400px, Medium: 760px, Large: 1024px */
  size?: ModalSize;
  /** Whether the modal is visible */
  isOpen?: boolean;
  /** Body padding — true: 20px, false: 0px */
  hasBodyPadding?: boolean;
  /** Header slot — pass ModalHeader */
  header?: ReactNode;
  /** Footer slot — pass ModalFooter */
  footer?: ReactNode;
  /** Body content — pass ModalBody or custom content */
  children?: ReactNode;
  /** Called when backdrop or close button is clicked / Escape is pressed */
  onClose?: () => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Modal
   ═══════════════════════════════════════════════════════════════════════════ */

export function Modal({
  size = 'Small',
  isOpen = false,
  hasBodyPadding = true,
  header,
  footer,
  children,
  onClose,
  className,
  ...props
}: ModalProps) {
  const handleBackdropClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose?.();
    },
    [onClose],
  );

  useKeyboard('Escape', () => onClose?.(), isOpen);

  if (!isOpen) return null;

  return (
    <div
      className={cn('fds-modal__backdrop', className)}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      {...props}
    >
      <div className={cn('fds-modal', `fds-modal--${size.toLowerCase()}`)}>
        {header}

        {!header && onClose && (
          <IconButton
            icon={<X size={20} />}
            size="20"
            onClick={onClose}
            aria-label="Close modal"
            className="fds-modal__close"
          />
        )}

        {children && (
          <div className={cn('fds-modal__body', hasBodyPadding && 'fds-modal__body--padded')}>
            {children}
          </div>
        )}

        {footer}
      </div>
    </div>
  );
}

Modal.displayName = 'Modal';
