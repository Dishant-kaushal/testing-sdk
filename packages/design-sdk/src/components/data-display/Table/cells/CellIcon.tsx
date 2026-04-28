import './CellIcon.css';
import type { ReactNode } from 'react';
import { cn } from '../../../../utils/cn';

export type CellIconColor =
  | 'default'
  | 'positive'
  | 'negative'
  | 'notice'
  | 'info'
  | 'gray';

export interface CellIconProps {
  /** react-feather (or any SVG) icon — will be rendered at 20 px. */
  icon: ReactNode;
  /** Token-driven color. Default `'default'` (= `--text-gray-secondary`). */
  color?: CellIconColor;
  /**
   * Aria-label. When omitted the icon is marked `aria-hidden="true"` — use
   * only for purely decorative glyphs that duplicate adjacent text.
   */
  ariaLabel?: string;
  className?: string;
}

/**
 * CellIcon — single 20 px icon centered in a 48 px cell.
 * Drop inside `<TableCell contentType="icon">`. Maps to Figma node
 * 1313:12877. Common uses: priority glyph, link-out indicator, visual-only
 * status dot (for labelled status use `<CellStatus>`).
 */
export function CellIcon({ icon, color = 'default', ariaLabel, className }: CellIconProps) {
  return (
    <span
      className={cn('fds-table-cell-icon', className)}
      data-color={color}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {icon}
    </span>
  );
}
