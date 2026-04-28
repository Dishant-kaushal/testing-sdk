import { useState, useEffect, useMemo, type HTMLAttributes, type ChangeEvent, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { cn } from '../../../utils/cn';
import { Button } from '../../actions/Button/Button';
import { PageNumber } from './PageNumber';
import { PaginationEllipsis } from './PaginationEllipsis';
import './Pagination.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type PaginationVariant = 'default' | 'simple' | 'jumper';

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  /** Current active page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Called when page changes */
  onPageChange: (page: number) => void;
  /** Variant — default shows page numbers, simple shows just prev/next, jumper shows input */
  variant?: PaginationVariant;
  /** Number of sibling pages to show around the current page */
  siblingCount?: number;
  /** Disables all pagination controls */
  isDisabled?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Page range generation
   ═══════════════════════════════════════════════════════════════════════════ */

type PageItem = { type: 'page'; page: number } | { type: 'ellipsis'; direction: 'previous' | 'next' };

function generatePages(current: number, total: number, siblings: number): PageItem[] {
  if (total <= 0) return [];
  if (total === 1) return [{ type: 'page', page: 1 }];

  const items: PageItem[] = [{ type: 'page', page: 1 }];

  const leftStart = Math.max(2, current - siblings);
  if (leftStart > 2) {
    items.push({ type: 'ellipsis', direction: 'previous' });
  }

  for (let i = leftStart; i <= Math.min(total - 1, current + siblings); i++) {
    items.push({ type: 'page', page: i });
  }

  const rightEnd = Math.min(total - 1, current + siblings);
  if (rightEnd < total - 1) {
    items.push({ type: 'ellipsis', direction: 'next' });
  }

  if (total > 1) {
    items.push({ type: 'page', page: total });
  }

  return items;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Pagination
   Figma: 780:9576
   ═══════════════════════════════════════════════════════════════════════════ */

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'default',
  siblingCount = 2,
  isDisabled = false,
  className,
  ...props
}: PaginationProps) {
  // Clamp currentPage to valid range
  const clampedPage = Math.max(1, Math.min(currentPage, Math.max(1, totalPages)));
  const isFirstPage = clampedPage <= 1;
  const isLastPage = clampedPage >= totalPages || totalPages <= 0;

  const pages = useMemo(
    () => (variant === 'default' ? generatePages(clampedPage, totalPages, siblingCount) : []),
    [variant, clampedPage, totalPages, siblingCount],
  );

  // Jumper input — syncs with clamped currentPage
  const [jumperValue, setJumperValue] = useState(String(clampedPage));
  useEffect(() => {
    setJumperValue(String(clampedPage));
  }, [clampedPage]);

  const handleJumperCommit = () => {
    const page = parseInt(jumperValue, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      setJumperValue(String(clampedPage));
    }
  };

  // Don't render if no pages
  if (totalPages <= 0) return null;

  return (
    <div className={cn('fds-pagination', isDisabled && 'fds-pagination--disabled', className)} aria-disabled={isDisabled || undefined} {...props}>
      <div className="fds-pagination__root">
        <div className="fds-pagination__wrapper">
          {/* Previous */}
          <Button
            iconOnly
            size="Small"
            variant="Gray"
            color="Primary"
            leadingIcon={<ChevronLeft size={16} />}
            isDisabled={isFirstPage || isDisabled}
            onClick={() => onPageChange(clampedPage - 1)}
            aria-label="Previous page"
          />

          {/* Page numbers */}
          {variant === 'default' && (
            <div className="fds-pagination__pages">
              {pages.map((item) =>
                item.type === 'page' ? (
                  <PageNumber
                    key={item.page}
                    page={item.page}
                    isSelected={item.page === clampedPage}
                    disabled={isDisabled}
                    onClick={() => onPageChange(item.page)}
                  />
                ) : (
                  <PaginationEllipsis
                    key={`ellipsis-${item.direction}`}
                    direction={item.direction}
                    disabled={isDisabled}
                    onClick={() => {
                      const jump = 5;
                      onPageChange(
                        item.direction === 'previous'
                          ? Math.max(1, clampedPage - jump)
                          : Math.min(totalPages, clampedPage + jump),
                      );
                    }}
                  />
                ),
              )}
            </div>
          )}

          {/* Page jumper */}
          {variant === 'jumper' && (
            <div className="fds-pagination__jumper">
              <input
                type="text"
                inputMode="numeric"
                className="fds-pagination__jumper-input BodyMediumRegular"
                value={jumperValue}
                disabled={isDisabled}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setJumperValue(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleJumperCommit()}
                onBlur={handleJumperCommit}
                aria-label="Go to page"
              />
              <span className="fds-pagination__jumper-label BodyMediumRegular">of {totalPages}</span>
            </div>
          )}

          {/* Next */}
          <Button
            iconOnly
            size="Small"
            variant="Gray"
            color="Primary"
            leadingIcon={<ChevronRight size={16} />}
            isDisabled={isLastPage || isDisabled}
            onClick={() => onPageChange(clampedPage + 1)}
            aria-label="Next page"
          />
        </div>
      </div>
    </div>
  );
}

Pagination.displayName = 'Pagination';
