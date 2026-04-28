import type { ButtonHTMLAttributes } from 'react';
import { MoreHorizontal, ChevronsLeft, ChevronsRight } from 'react-feather';
import { cn } from '../../../utils/cn';
import './PaginationEllipsis.css';

export interface PaginationEllipsisProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Skip direction — determines which chevrons icon shows on hover */
  direction: 'previous' | 'next';
}

export function PaginationEllipsis({ direction, className, ...props }: PaginationEllipsisProps) {
  const SkipIcon = direction === 'previous' ? ChevronsLeft : ChevronsRight;

  return (
    <button
      type="button"
      className={cn('fds-pagination-ellipsis', className)}
      aria-label={direction === 'previous' ? 'Skip to previous pages' : 'Skip to next pages'}
      {...props}
    >
      <span className="fds-pagination-ellipsis__dots">
        <MoreHorizontal size={16} />
      </span>
      <span className="fds-pagination-ellipsis__skip">
        <SkipIcon size={16} />
      </span>
    </button>
  );
}

PaginationEllipsis.displayName = 'PaginationEllipsis';
