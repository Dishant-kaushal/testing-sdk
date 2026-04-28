import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './ColorCell.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ColorCellProps extends HTMLAttributes<HTMLButtonElement> {
  /** Color value (any CSS color string) */
  color: string;
  /** Whether this cell is selected */
  isSelected?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ColorCell — 36×24 horizontal rectangle
   Figma: 2586:1855
   ═══════════════════════════════════════════════════════════════════════════ */

export function ColorCell({
  color,
  isSelected = false,
  className,
  ...props
}: ColorCellProps) {
  return (
    <button
      type="button"
      className={cn(
        'fds-color-cell',
        isSelected && 'fds-color-cell--selected',
        className,
      )}
      aria-label={color}
      aria-pressed={isSelected}
      {...props}
    >
      <div
        className="fds-color-cell__color"
        style={{ backgroundColor: color }}
      />
    </button>
  );
}

ColorCell.displayName = 'ColorCell';
