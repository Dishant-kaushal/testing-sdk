import './CellTextAction.css';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { IconButton } from '../../../actions/IconButton/IconButton';
import { cn } from '../../../../utils/cn';

export interface CellTextActionDescriptor {
  /** 20 px icon, typically from react-feather. */
  icon: ReactNode;
  /** Aria-label for the trailing IconButton. */
  ariaLabel: string;
  onClick: (e: ReactMouseEvent) => void;
  /** Show the action unconditionally instead of hover-reveal. Default `false`. */
  alwaysVisible?: boolean;
}

export interface CellTextActionProps {
  title: string;
  description?: string;
  leading?: ReactNode;
  /**
   * Trailing action icon. Hidden by default; revealed when the enclosing
   * `<TableRow>` is hovered/focused (CSS rule — no JS listeners). Pass
   * `alwaysVisible: true` to pin it on.
   */
  trailingAction: CellTextActionDescriptor;
  className?: string;
}

/**
 * CellTextAction — text cell with a hover-revealed trailing action icon.
 * Drop inside `<TableCell contentType="text-action">`. Maps to Figma
 * node 1966:4367 (`Text (Action Icon)` variant).
 */
export function CellTextAction({
  title,
  description,
  leading,
  trailingAction,
  className,
}: CellTextActionProps) {
  return (
    <span className={cn('fds-table-cell-text-action', className)}>
      {leading && (
        <span className="fds-table-cell-text-action__leading">{leading}</span>
      )}
      <span className="fds-table-cell-text-action__content">
        <span className="fds-table-cell-text-action__title BodyMediumRegular">{title}</span>
        {description && (
          <span className="fds-table-cell-text-action__description BodySmallRegular">
            {description}
          </span>
        )}
      </span>
      <span
        className="fds-table-cell-hover-action"
        data-always-visible={trailingAction.alwaysVisible ? 'true' : undefined}
      >
        <IconButton
          size="20"
          icon={trailingAction.icon}
          aria-label={trailingAction.ariaLabel}
          onClick={(e) => {
            e.stopPropagation();
            trailingAction.onClick(e);
          }}
        />
      </span>
    </span>
  );
}
