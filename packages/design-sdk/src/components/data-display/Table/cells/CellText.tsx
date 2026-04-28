import './CellText.css';
import type { ReactNode } from 'react';
import { ChevronDown } from 'react-feather';
import { cn } from '../../../../utils/cn';

export interface CellTextProps {
  /** Primary row label — `Body/MediumRegular`, `--text-gray-secondary`. */
  title: string;
  /** Optional second line — `Body/SmallRegular`, `--text-gray-tertiary`. */
  description?: string;
  /**
   * Optional leading slot (icon, avatar, or both). Consumer composes — for
   * "icon + avatar together" pass a `<span style={{display:'flex', gap:8}}>…</span>`.
   * 20 px icons fit the row; 32 px fits avatars per Figma 1313:12838.
   */
  leading?: ReactNode;
  /**
   * Renders a 20 px `ChevronDown` after the title to hint the column is
   * dropdown-editable. Visual only — attach the onClick on `<TableCell>`
   * or a wrapping button if the cell should open a picker.
   */
  trailingIndicator?: 'dropdown' | 'none';
  className?: string;
}

/**
 * CellText — the default text-with-leading cell content.
 * Drop inside `<TableCell contentType="text">`. Maps to Figma node 1313:12838.
 */
export function CellText({
  title,
  description,
  leading,
  trailingIndicator = 'none',
  className,
}: CellTextProps) {
  return (
    <span className={cn('fds-table-cell-text', className)}>
      {leading && <span className="fds-table-cell-text__leading">{leading}</span>}
      <span className="fds-table-cell-text__content">
        <span className="fds-table-cell-text__title BodyMediumRegular">{title}</span>
        {description && (
          <span className="fds-table-cell-text__description BodySmallRegular">
            {description}
          </span>
        )}
      </span>
      {trailingIndicator === 'dropdown' && (
        <span className="fds-table-cell-text__trailing" aria-hidden="true">
          <ChevronDown size={20} />
        </span>
      )}
    </span>
  );
}
