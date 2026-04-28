import type { ReactNode, HTMLAttributes, MouseEvent, KeyboardEvent } from 'react';
import { ChevronDown, X } from 'react-feather';
import { cn } from '../../../utils/cn';
import { IconButton } from '../../actions/IconButton/IconButton';
import './ProductAccordionItem.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ProductAccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Header title */
  title: string;
  /** Subtitle below the title */
  subtitle?: string;
  /** Whether the body is visible */
  isExpanded?: boolean;
  /** Active shows chevron + close; inactive hides action controls */
  isActive?: boolean;
  /** Whether the accordion is disabled */
  isDisabled?: boolean;
  /** Leading item slot — pass PALeadingItem */
  leadingItem?: ReactNode;
  /** Trailing icon next to the title (e.g. info icon) */
  trailingIcon?: ReactNode;
  /** Called when header is clicked to expand/collapse */
  onToggle?: () => void;
  /** Called when close (X) button is clicked */
  onClose?: () => void;
  /** Body content slot */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ProductAccordionItem
   ═══════════════════════════════════════════════════════════════════════════ */

export function ProductAccordionItem({
  title,
  subtitle,
  isExpanded = false,
  isActive = true,
  isDisabled = false,
  leadingItem,
  trailingIcon,
  onToggle,
  onClose,
  children,
  className,
  ...props
}: ProductAccordionItemProps) {
  const showBody = isExpanded && isActive && !isDisabled;

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target as HTMLElement;
      // If focus is on the close IconButton, let it handle its own click
      if (target.closest('.fds-pa-item__close')) return;
      e.preventDefault();
      if (!isDisabled) onToggle?.();
    }
  };

  return (
    <div
      className={cn(
        'fds-pa-item',
        isExpanded && isActive && 'fds-pa-item--expanded',
        !isActive && 'fds-pa-item--inactive',
        isDisabled && 'fds-pa-item--disabled',
        className,
      )}
      {...props}
    >
      {/* Header */}
      <button
        type="button"
        className="fds-pa-item__header"
        onClick={isDisabled ? undefined : onToggle}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
        aria-expanded={isExpanded && isActive}
      >
        <div className="fds-pa-item__title-area">
          {leadingItem}

          <div className="fds-pa-item__title-section">
            <div className="fds-pa-item__heading-row">
              <span className="fds-pa-item__title BodyMediumMedium">{title}</span>
              {trailingIcon && (
                <span className="fds-pa-item__trailing-icon">{trailingIcon}</span>
              )}
            </div>
            {subtitle && (
              <span className="fds-pa-item__subtitle BodySmallRegular">{subtitle}</span>
            )}
          </div>
        </div>

        {onClose && (
          <IconButton
            icon={<X size={16} />}
            size="16"
            onClick={handleClose}
            aria-label="Close"
            className="fds-pa-item__close"
          />
        )}

        {isActive && (
          <span className={cn('fds-pa-item__chevron', isExpanded && 'fds-pa-item__chevron--open')}>
            <ChevronDown size={16} />
          </span>
        )}
      </button>

      {/* Body */}
      {showBody && (
        <div className="fds-pa-item__body">
          {children}
        </div>
      )}
    </div>
  );
}

ProductAccordionItem.displayName = 'ProductAccordionItem';
