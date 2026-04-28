import './TableHeaderCell.css';
import type {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  ThHTMLAttributes,
} from 'react';
import { Info } from 'react-feather';
import { useEffect } from 'react';
import { cn } from '../../../utils/cn';
import { useTableContextOptional } from './TableContext';
import { SortIndicator } from './SortIndicator';

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Sort key — when set and matched in `sortFunctions`, cell becomes a sort button. */
  headerKey?: string;
  /** Freeze this column to the left edge (sticky). First column only in v1. */
  isSticky?: boolean;
  /** Optional `(i)` info icon next to the header text — pass any truthy value
   *  to show the icon (string is reserved for tooltip text in a future iter). */
  infoTooltip?: ReactNode | string | boolean;
  children?: ReactNode;
}

export function TableHeaderCell({
  children,
  infoTooltip,
  className,
  ...rest
}: TableHeaderCellProps) {
  const { isSticky: _isSticky, headerKey, onClick, onKeyDown, ...thProps } = rest;

  const ctx = useTableContextOptional();
  const isSortable = Boolean(
    headerKey && ctx?.sortableKeys?.includes(headerKey),
  );

  // Dev-mode warning: consumer set `headerKey` but no matching `sortFunctions`
  // entry exists on the parent `<Table>` — header won't be sortable, silently.
  if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (headerKey && ctx && !ctx.sortableKeys.includes(headerKey)) {
        // eslint-disable-next-line no-console
        console.warn(
          `[TableHeaderCell] \`headerKey="${headerKey}"\` has no matching entry in \`sortFunctions\` on the parent <Table>. The column will not be sortable.`,
        );
      }
    }, [headerKey, ctx?.sortableKeys]);
  }

  const isActive = isSortable && ctx?.sortState?.sortKey === headerKey;
  const direction: 'asc' | 'desc' | null = isActive ? ctx!.sortState!.direction : null;

  const handleClick = (e: MouseEvent<HTMLTableCellElement>) => {
    onClick?.(e);
    if (isSortable && headerKey) ctx?.toggleSort(headerKey);
  };

  /** Space + Enter both toggle sort, mirroring native button semantics. */
  const handleKeyDown = (e: KeyboardEvent<HTMLTableCellElement>) => {
    onKeyDown?.(e);
    if (!isSortable || !headerKey) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      ctx?.toggleSort(headerKey);
    }
  };

  const ariaSort: 'ascending' | 'descending' | 'none' | undefined = isSortable
    ? direction === 'asc'
      ? 'ascending'
      : direction === 'desc'
        ? 'descending'
        : 'none'
    : undefined;

  return (
    <th
      className={cn('fds-table__header-cell', 'BodyMediumSemibold', className)}
      data-sortable={isSortable ? 'true' : undefined}
      aria-sort={ariaSort}
      tabIndex={isSortable ? 0 : undefined}
      onClick={isSortable ? handleClick : onClick}
      onKeyDown={isSortable ? handleKeyDown : onKeyDown}
      {...thProps}
    >
      {/* Inner flex layout per Figma 1313:15159:
          [text-container (text + (i) icon)]   ⇄   [sort-indicator]    */}
      <div className="fds-table__header-cell-inner">
        <div className="fds-table__header-cell-text-container">
          <span className="fds-table__header-cell-text">{children}</span>
          {infoTooltip && (
            <span className="fds-table__header-cell-info" aria-hidden="true">
              <Info size={16} />
            </span>
          )}
        </div>
        {isSortable && <SortIndicator direction={direction} />}
      </div>
    </th>
  );
}
