import type { HTMLAttributes, ReactNode } from 'react';
import { X } from 'react-feather';
import { cn } from '../../../utils/cn';
import { IconButton } from '../../actions/IconButton/IconButton';
import { usePopoverContext } from './PopoverContext';
import './PopoverHeader.css';

export type PopoverHeaderLeading = 'None' | 'Icon' | 'Asset';

export interface PopoverHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Title text — rendered as `BodyLargeSemibold` */
  title: string;
  /** Leading slot — a react-feather icon (16px) or a small asset (24×24). Pass `null` to hide. */
  leading?: ReactNode;
  /** When true, renders a close `<IconButton icon={<X/>} />` that triggers the parent Popover's close. */
  showClose?: boolean;
  /** Accessibility label for the close button */
  closeLabel?: string;
  /** Override the close handler. Defaults to calling `close()` from PopoverContext. */
  onClose?: () => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PopoverHeader — Faclon Design System 2.0
   Figma: 778:8461 (leading=None | Icon | Asset)
   ═══════════════════════════════════════════════════════════════════════════ */

export function PopoverHeader({
  title,
  leading,
  showClose = true,
  closeLabel = 'Close',
  onClose,
  className,
  ...props
}: PopoverHeaderProps) {
  const { close } = usePopoverContext();
  const handleClose = onClose ?? close;

  return (
    <div className={cn('fds-popover-header', className)} {...props}>
      <div className="fds-popover-header__left">
        {leading && <span className="fds-popover-header__leading">{leading}</span>}
        <h3 className="fds-popover-header__title BodyLargeSemibold">{title}</h3>
      </div>
      {showClose && (
        <IconButton
          className="fds-popover-header__close"
          icon={<X size={16} />}
          size="16"
          onClick={handleClose}
          aria-label={closeLabel}
        />
      )}
    </div>
  );
}

PopoverHeader.displayName = 'PopoverHeader';
