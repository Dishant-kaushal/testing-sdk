import { type HTMLAttributes } from 'react';
import './Pagination.css';
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
export declare function Pagination({ currentPage, totalPages, onPageChange, variant, siblingCount, isDisabled, className, ...props }: PaginationProps): import("react/jsx-runtime").JSX.Element | null;
export declare namespace Pagination {
    var displayName: string;
}
