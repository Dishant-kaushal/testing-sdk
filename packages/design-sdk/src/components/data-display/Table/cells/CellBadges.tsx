import './CellBadges.css';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { Badge, type BadgeColor, type BadgeEmphasis } from '../../../data-display/Badge/Badge';
import { IconButton } from '../../../actions/IconButton/IconButton';
import { cn } from '../../../../utils/cn';

export interface CellBadge {
  label: string;
  color?: BadgeColor;
  emphasis?: BadgeEmphasis;
  leadingIcon?: ReactNode;
}

export interface CellBadgesTrailingAction {
  icon: ReactNode;
  ariaLabel: string;
  onClick: (e: ReactMouseEvent) => void;
}

export interface CellBadgesProps {
  badges: CellBadge[];
  /**
   * Max number of visible badges before extras collapse into a neutral "+N"
   * badge. Default `3`. Mirrors the 3-slot rule used by `TableRowActions`.
   */
  maxVisible?: number;
  /** Optional trailing action icon (e.g., clear / remove). */
  trailingAction?: CellBadgesTrailingAction;
  className?: string;
}

/**
 * CellBadges — horizontal badge list with overflow support.
 * Drop inside `<TableCell contentType="badges">`. Maps to Figma node
 * 1313:12918. Uses DS `<Badge size="Small">` (20 px pill, matches Figma).
 */
export function CellBadges({
  badges,
  maxVisible = 3,
  trailingAction,
  className,
}: CellBadgesProps) {
  const visible = badges.slice(0, maxVisible);
  const overflow = badges.length - visible.length;

  return (
    <span className={cn('fds-table-cell-badges', className)}>
      {visible.map((b, i) => (
        <Badge
          key={`${b.label}-${i}`}
          label={b.label}
          color={b.color ?? 'Neutral'}
          emphasis={b.emphasis ?? 'Subtle'}
          size="Small"
          leadingIcon={b.leadingIcon}
        />
      ))}
      {overflow > 0 && (
        <Badge label={`+${overflow}`} color="Neutral" emphasis="Subtle" size="Small" />
      )}
      {trailingAction && (
        <IconButton
          size="20"
          icon={trailingAction.icon}
          aria-label={trailingAction.ariaLabel}
          onClick={(e) => {
            e.stopPropagation();
            trailingAction.onClick(e);
          }}
        />
      )}
    </span>
  );
}
