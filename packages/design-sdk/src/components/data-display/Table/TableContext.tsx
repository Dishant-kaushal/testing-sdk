import { createContext, useContext, type RefObject } from 'react';
import type {
  Identifier,
  MultiSelectTrigger,
  PaginationState,
  RowDensity,
  SelectionType,
  SortState,
  TableNode,
} from './types';

export interface TableContextValue<Item extends TableNode = TableNode> {
  /* data */
  data: { nodes: Item[] };
  totalItems: number;

  /* selection */
  selectionType: SelectionType;
  multiSelectTrigger: MultiSelectTrigger;
  selectedIds: Identifier[];
  toggleRowSelection: (id: Identifier) => void;
  /** Engine's shift-click range select. Pass the row id and the SAME modifier
   *  the table is currently using (sort × pagination chain) so the engine can
   *  walk the visible-row order. */
  toggleRowSelectionRange: (id: Identifier) => void;
  toggleAllRowsSelection: () => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  /** Per-item selectability predicate. Disabled rows skip the header
   *  "select all" tally and render a disabled checkbox in the row. */
  isRowSelectable: (item: TableNode) => boolean;

  /* sort */
  sortState: SortState | null;
  sortableKeys: string[];
  toggleSort: (sortKey: string) => void;

  /* pagination */
  pageState: PaginationState;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;

  /* expansion */
  expandedIds: Identifier[];
  toggleExpansion: (id: Identifier) => void;
  isGrouped: boolean;

  /* visual */
  rowDensity: RowDensity;
  isLoading: boolean;
  isRefreshing: boolean;
  isHeaderSticky: boolean;
  isFirstColumnSticky: boolean;
  hasStickyActionColumn: boolean;

  /* refs */
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  isScrolledHorizontally: boolean;
}

export const TableContext = createContext<TableContextValue | null>(null);

export function useTableContext<Item extends TableNode = TableNode>(): TableContextValue<Item> {
  const ctx = useContext(TableContext);
  if (!ctx) {
    throw new Error('useTableContext() must be used inside <Table>.');
  }
  return ctx as unknown as TableContextValue<Item>;
}

export function useTableContextOptional<
  Item extends TableNode = TableNode,
>(): TableContextValue<Item> | null {
  return useContext(TableContext) as unknown as TableContextValue<Item> | null;
}
