import './TablePagination.css';
import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'react-feather';
import { cn } from '../../../utils/cn';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useDismissOnScrollOutside } from '../../../hooks/useDismissOnScrollOutside';
import { Pagination } from '../../navigation/Pagination/Pagination';
import { DropdownMenu } from '../../overlays/DropdownMenu/DropdownMenu';
import { ActionListItem } from '../../overlays/DropdownMenu/ActionListItem';
import { ActionListItemGroup } from '../../overlays/DropdownMenu/ActionListItemGroup';
import { useTableContextOptional } from './TableContext';

export type TablePaginationVariant = 'simple' | 'numbered';

export interface TablePaginationProps {
  /** Page sizes to show in the picker. Default `[10, 25, 50, 100]`. */
  pageSizeOptions?: number[];
  /** Override the total-row count shown in the label. Prefer setting
   *  `rowCount` on the parent `<Table>` — it flows here via context — and
   *  only use this prop if you need a per-pagination override. For
   *  server-driven pagination, set `rowCount` on `<Table>` and use
   *  controlled `page`/`pageSize` props. */
  totalItemCount?: number;
  /** Show the page-size dropdown. Default `true`. */
  showRowsPerPage?: boolean;
  /** Show the "Showing N of T" label on the left. Default `true`. */
  showLabel?: boolean;
  /** `'simple'` = prev/next arrows; `'numbered'` = full page numbers (1 ... 5 6 [7] 8 9 ... 20). */
  variant?: TablePaginationVariant;
  /** Override the auto-generated label. */
  label?: string | ((args: { start: number; end: number; total: number }) => string);
  /** When `true` (default), changing page size resets to page 1. Set to `false`
   *  for server-driven pagination where the parent manages page state. */
  resetPageOnSizeChange?: boolean;
  onPageChange?: (args: { page: number }) => void;
  onPageSizeChange?: (args: { pageSize: number }) => void;
  className?: string;
}

const DEFAULT_PAGE_SIZES = [10, 25, 50, 100];
/** Gap between the trigger and the portal'd menu, matching the flip-up offset. */
const MENU_GAP = 4;
/** Approximate menu height used for flip-up detection (we don't measure
 *  the menu before opening — this is a safe upper bound for ~6 options). */
const MENU_APPROX_HEIGHT = 200;

/**
 * TablePagination — Figma 1313:14707.
 *
 * Four layout variants based on `showLabel × showRowsPerPage × variant`:
 *   - showLabel + showRowsPerPage  → "Showing N of T" + size + < >
 *   - showLabel only               → "Showing N of T" + < >
 *   - showRowsPerPage only         → size + < >  (right-aligned)
 *   - variant='numbered'           → page numbers right-aligned
 *
 * Page-size dropdown renders via `createPortal` to `document.body` so it's
 * never clipped by the surface's `overflow: hidden`. Position is computed
 * from the trigger's bounding rect on open + on resize.
 */
export function TablePagination({
  pageSizeOptions = DEFAULT_PAGE_SIZES,
  totalItemCount,
  showRowsPerPage = true,
  showLabel = true,
  variant = 'simple',
  label,
  resetPageOnSizeChange = true,
  onPageChange,
  onPageSizeChange,
  className,
}: TablePaginationProps = {}) {
  const ctx = useTableContextOptional();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; minWidth: number } | null>(null);

  // Close on outside click of EITHER the trigger or the portal'd menu.
  useClickOutside(menuRef, (e) => {
    if (sizeOpen && !triggerRef.current?.contains(e.target as Node)) {
      setSizeOpen(false);
    }
  });

  // Position the portal'd menu just below the trigger; flip up if no room.
  useLayoutEffect(() => {
    if (!sizeOpen || !triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const flipUp = r.bottom + MENU_APPROX_HEIGHT > window.innerHeight;
    setMenuPos({
      top: flipUp ? r.top - MENU_GAP - MENU_APPROX_HEIGHT : r.bottom + MENU_GAP,
      left: r.left,
      minWidth: r.width,
    });
  }, [sizeOpen]);

  // Standard popover dismissal: close on any scroll or resize EXCEPT scroll
  // originating inside the menu itself (e.g. scrolling the size-option list).
  useDismissOnScrollOutside(menuRef, () => setSizeOpen(false), sizeOpen);

  if (!ctx) return null;

  const total = totalItemCount ?? ctx.totalItems;
  const { page, size } = ctx.pageState;

  const start = total === 0 ? 0 : page * size + 1;
  const end = Math.min((page + 1) * size, total);
  const totalPages = Math.max(1, Math.ceil(total / size));

  const computedLabel =
    typeof label === 'function'
      ? label({ start, end, total })
      : label ?? `Showing ${end} of ${total} Items`;

  const handlePageSize = (next: number) => {
    ctx.setPageSize(next);
    if (resetPageOnSizeChange && page !== 0) ctx.setPage(0);
    onPageSizeChange?.({ pageSize: next });
    setSizeOpen(false);
  };

  const handlePageChange = (next1Based: number) => {
    const next0Based = next1Based - 1;
    ctx.setPage(next0Based);
    onPageChange?.({ page: next0Based });
  };

  return (
    <div className={cn('fds-table__pagination', className)}>
      {showLabel && (
        <span className="fds-table__pagination-label BodyMediumRegular">
          {computedLabel}
        </span>
      )}
      <div className="fds-table__pagination-controls">
        {showRowsPerPage && (
          <>
            <button
              ref={triggerRef}
              type="button"
              className="fds-table__pagination-size-trigger BodyMediumRegular"
              onClick={() => setSizeOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={sizeOpen}
              aria-label="Rows per page"
            >
              <span>{size}</span>
              <ChevronDown size={12} aria-hidden="true" />
            </button>
            <span className="fds-table__pagination-size-label BodyMediumRegular">
              rows / page
            </span>
          </>
        )}
        <Pagination
          /* `<Pagination>` exposes 'default' (page numbers) and 'simple'
             (prev/next only). Map our `'numbered'` → 'default'. */
          variant={variant === 'numbered' ? 'default' : 'simple'}
          currentPage={page + 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Portal'd dropdown — escapes surface's overflow:hidden. */}
      {sizeOpen && menuPos && typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            className="fds-table__pagination-size-menu BodyMediumRegular"
            role="presentation"
            style={{
              top: menuPos.top,
              left: menuPos.left,
              minWidth: menuPos.minWidth,
            }}
          >
            <DropdownMenu>
              <ActionListItemGroup>
                {pageSizeOptions.map((opt) => (
                  <ActionListItem
                    key={opt}
                    title={String(opt)}
                    selectionType="Single"
                    isSelected={opt === size}
                    onClick={() => handlePageSize(opt)}
                  />
                ))}
              </ActionListItemGroup>
            </DropdownMenu>
          </div>,
          document.body,
        )
      }
    </div>
  );
}
