import { useEffect, useMemo, useRef } from 'react';
import {
  useRowSelect,
  SelectTypes,
  SelectClickTypes,
} from '@table-library/react-table-library/select';
import { useSort } from '@table-library/react-table-library/sort';
import type { SortFn } from '@table-library/react-table-library/types/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useTree } from '@table-library/react-table-library/tree';
import { useControllableState } from '../../../../hooks/useControllableState';
import { useStickyShadow } from './useStickyShadow';
import type { TableContextValue } from '../TableContext';
import type {
  Identifier,
  PaginationState,
  SortState,
  TableNode,
  TableProps,
} from '../types';

/**
 * useTableEngine — wires `@table-library/react-table-library` (selection,
 * sort, pagination, tree) to Faclon's controlled-prop surface and returns
 * the memoised `{ ctx, processedRows, scrollContainerRef }` that `<Table>`
 * pushes into `<TableContext>`.
 *
 * Kept in a sibling hook so `<Table>` itself stays a thin render wrapper —
 * all engine adapter logic (which is volume-wise ~80% of the component)
 * lives here. Import paths are one level deeper than Table.tsx so relative
 * references bump up an extra `..`.
 *
 * **Dev-mode warnings** about missing row ids, `isHeaderSticky` without
 * `maxHeight`, and controlled pagination without `rowCount` fire from this
 * hook — see the Gotchas block in `Table.tsx` for the consumer-facing rules.
 */
export function useTableEngine<Item extends TableNode = TableNode>(
  props: TableProps<Item>,
) {
  const {
    data,
    rowCount,

    selectionType = 'none',
    defaultSelectedIds,
    onSelectionChange,
    isRowSelectable,
    multiSelectTrigger = 'checkbox',

    sortFunctions = {},
    defaultSort,
    onSortChange,

    pagination = false,
    defaultPageSize = 10,
    pageSize,
    page,
    onPaginationChange,

    defaultExpandedIds,
    onExpansionChange,
    isGrouped = false,

    rowDensity = 'compact',
    isLoading = false,
    isRefreshing = false,
    isHeaderSticky = true,
    isFirstColumnSticky = false,
    hasStickyActionColumn = false,

    maxHeight,
  } = props;

  /* ── Dev-mode invariant checks (stripped in prod by Vite's dead-code
       elimination — `process.env.NODE_ENV !== 'production'` is a literal
       at build time). */
  if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const missingId = data.nodes.filter((n) => n?.id === undefined);
      if (missingId.length > 0) {
        // eslint-disable-next-line no-console
        console.error(
          `[Table] ${missingId.length} row(s) are missing an \`id\`. Every item in \`data.nodes\` must have a unique identifier.`,
        );
      }
      if (isHeaderSticky && maxHeight === undefined) {
        // eslint-disable-next-line no-console
        console.warn(
          '[Table] `isHeaderSticky` has no effect without `maxHeight` — the header needs a scroll container to stick to.',
        );
      }
      if ((page !== undefined || pageSize !== undefined) && rowCount === undefined) {
        // eslint-disable-next-line no-console
        console.warn(
          '[Table] Controlled pagination (`page`/`pageSize`) is set but `rowCount` is missing — the pagination label will under-count total rows.',
        );
      }
    }, [data.nodes, isHeaderSticky, maxHeight, page, pageSize, rowCount]);
  }

  /* ── Refs ─────────────────────────────────────────────────────── */
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isScrolledHorizontally = useStickyShadow(scrollContainerRef);

  /* ── Selection (engine-owned) ─────────────────────────────────── */
  const isSingle = selectionType === 'single';

  const select = useRowSelect(
    data as never,
    {
      state: isSingle
        ? { id: defaultSelectedIds?.[0] ?? null }
        : { ids: defaultSelectedIds ?? [] },
      onChange: (_action: unknown, state: Record<string, unknown>) => {
        if (!onSelectionChange) return;
        const stateId = state.id as Identifier | null | undefined;
        const stateIds = state.ids as Identifier[] | undefined;
        const next: Identifier[] = isSingle
          ? stateId != null ? [stateId] : []
          : stateIds ?? [];
        const values = data.nodes.filter((n) => next.includes(n.id));
        onSelectionChange({ values });
      },
    },
    {
      rowSelect: isSingle ? SelectTypes.SingleSelect : SelectTypes.MultiSelect,
      buttonSelect: SelectTypes.MultiSelect,
      clickType:
        multiSelectTrigger === 'row'
          ? SelectClickTypes.RowClick
          : SelectClickTypes.ButtonClick,
    },
  );

  /* Read selection back from the engine — single source of truth. */
  const currentSelection: Identifier[] = isSingle
    ? select.state.id != null ? [select.state.id as Identifier] : []
    : ((select.state.ids as Identifier[] | undefined) ?? []);

  /* ── Sort (engine-owned) ──────────────────────────────────────── */
  const sortObj = useSort(
    data as never,
    {
      state: defaultSort
        ? {
            sortKey: defaultSort.sortKey,
            reverse: defaultSort.direction === 'desc',
          }
        : { sortKey: '', reverse: false },
      onChange: (_action: unknown, state: Record<string, unknown>) => {
        if (!onSortChange) return;
        const sortKey = state.sortKey as string | undefined;
        const reverse = state.reverse as boolean | undefined;
        const next: SortState | null = sortKey
          ? { sortKey, direction: reverse ? 'desc' : 'asc' }
          : null;
        onSortChange(next);
      },
    },
    {
      // The engine constrains SortFn to its own TableNode; consumers write
      // sort fns in terms of their own Item type. The cast bridges the gap.
      sortFns: sortFunctions as unknown as Record<string, SortFn>,
    },
  );

  const currentSort: SortState | null = sortObj.state.sortKey
    ? {
        sortKey: sortObj.state.sortKey as string,
        direction: (sortObj.state.reverse as boolean) ? 'desc' : 'asc',
      }
    : null;

  /* ── Pagination ───────────────────────────────────────────────── */
  const isPaginationControlled = page !== undefined || pageSize !== undefined;
  const initialPage: PaginationState = {
    page: page ?? 0,
    size: pageSize ?? defaultPageSize,
  };
  const [pageStateInternal, setPageState] = useControllableState<PaginationState>({
    value: isPaginationControlled
      ? { page: page ?? 0, size: pageSize ?? defaultPageSize }
      : undefined,
    defaultValue: initialPage,
  });
  const currentPageState = pageStateInternal ?? initialPage;

  const paginationObj = usePagination(
    data as never,
    {
      state: { page: currentPageState.page, size: currentPageState.size },
      onChange: (_action: unknown, state: Record<string, unknown>) => {
        const next: PaginationState = {
          page: state.page as number,
          size: state.size as number,
        };
        setPageState(next);
        onPaginationChange?.(next);
      },
    },
    {},
  );

  /* ── Tree (gated by isGrouped, engine-owned) ──────────────────── */
  const treeObj = useTree(
    (isGrouped ? data : { nodes: [] }) as never,
    {
      state: { ids: defaultExpandedIds ?? [] },
      onChange: (_action: unknown, state: Record<string, unknown>) => {
        if (!onExpansionChange) return;
        const next = (state.ids as Identifier[] | undefined) ?? [];
        onExpansionChange(next);
      },
    },
    {},
  );

  const currentExpanded: Identifier[] =
    (treeObj.state.ids as Identifier[] | undefined) ?? [];

  /* ── Apply engine modifiers in canonical order: sort → pagination.
       Tree modifier runs before render-time, only when grouped.
       The modifier refs change when their internal state changes, so
       currentSort / currentPageState / currentExpanded are redundant deps. */
  const processedRows = useMemo(() => {
    let nodes: Item[] = data.nodes;
    if (sortObj.modifier) {
      nodes = sortObj.modifier(nodes as never) as Item[];
    }
    if (pagination && paginationObj.modifier) {
      nodes = paginationObj.modifier(nodes as never) as Item[];
    }
    if (isGrouped && treeObj.modifier) {
      nodes = treeObj.modifier(nodes as never) as Item[];
    }
    return nodes;
  }, [
    data.nodes,
    sortObj.modifier,
    paginationObj.modifier,
    treeObj.modifier,
    pagination,
    isGrouped,
  ]);

  /* ── Header-checkbox derived state ────────────────────────────── */
  const allSelectableIds = useMemo(
    () =>
      data.nodes
        .filter((n) => (isRowSelectable ? isRowSelectable(n) : true))
        .map((n) => n.id),
    [data.nodes, isRowSelectable],
  );
  const isAllSelected =
    allSelectableIds.length > 0 &&
    allSelectableIds.every((id) => currentSelection.includes(id));
  const isIndeterminate =
    !isAllSelected &&
    allSelectableIds.some((id) => currentSelection.includes(id));

  /* ── Context value (memoised) ─────────────────────────────────── */
  const ctx = useMemo<TableContextValue<Item>>(
    () => ({
      data,
      totalItems: rowCount ?? data.nodes.length,

      selectionType,
      multiSelectTrigger,
      selectedIds: currentSelection,
      toggleRowSelection: (id) => select.fns.onToggleById(id),
      toggleRowSelectionRange: (id) =>
        // Engine walks visible nodes in render order. We feed the canonical
        // sort+paginate modifier chain so the range is what the user sees.
        select.fns.onToggleByIdShift(
          id,
          { isCarryForward: false, isPartialToAll: false },
          ((nodes: Item[]) => {
            let n = nodes;
            if (sortObj.modifier) n = sortObj.modifier(n as never) as Item[];
            if (pagination && paginationObj.modifier) {
              n = paginationObj.modifier(n as never) as Item[];
            }
            return n;
          }) as never,
        ),
      toggleAllRowsSelection: () =>
        select.fns.onToggleAll({ isCarryForward: false, isPartialToAll: false }),
      isAllSelected,
      isIndeterminate,
      isRowSelectable: (item) =>
        isRowSelectable ? isRowSelectable(item as Item) : true,

      sortState: currentSort,
      sortableKeys: Object.keys(sortFunctions),
      toggleSort: (sortKey) => sortObj.fns.onToggleSort({ sortKey }),

      pageState: currentPageState,
      setPage: (p) => paginationObj.fns.onSetPage(p),
      setPageSize: (s) => paginationObj.fns.onSetSize(s),

      expandedIds: currentExpanded,
      toggleExpansion: (id) => treeObj.fns.onToggleById(id),
      isGrouped,

      rowDensity,
      isLoading,
      isRefreshing,
      isHeaderSticky,
      isFirstColumnSticky,
      hasStickyActionColumn,

      scrollContainerRef,
      isScrolledHorizontally,
    }),
    [
      data,
      rowCount,
      selectionType,
      multiSelectTrigger,
      currentSelection,
      isAllSelected,
      isIndeterminate,
      isRowSelectable,
      select.fns,
      currentSort,
      sortFunctions,
      sortObj.fns,
      sortObj.modifier,
      pagination,
      currentPageState,
      paginationObj.fns,
      paginationObj.modifier,
      currentExpanded,
      treeObj.fns,
      isGrouped,
      rowDensity,
      isLoading,
      isRefreshing,
      isHeaderSticky,
      isFirstColumnSticky,
      hasStickyActionColumn,
      isScrolledHorizontally,
    ],
  );

  return { ctx, processedRows, scrollContainerRef };
}
