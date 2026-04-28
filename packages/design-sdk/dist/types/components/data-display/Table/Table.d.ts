import './Table.css';
import type { TableNode, TableProps } from './types';
/**
 * Table — root. Instantiates the headless engine
 * (`@table-library/react-table-library`) and provides the full
 * `TableContext` to subcomponents.
 *
 * Engine hooks wired:
 *   - useRowSelect    → selection (single / multi, row-click vs button-click)
 *   - useSort         → sort     (state + cycling driven by toggleSort)
 *   - usePagination   → paging   (client for `pagination`, server for
 *                                 controlled `page` + `pageSize` + `rowCount`)
 *   - useTree         → tree     (only enabled when isGrouped)
 *
 * Each hook has an `onChange` middleware that
 *   (1) updates a `useControllableState` slot so controlled props stay in sync,
 *   (2) fires the consumer's `onXxxChange` callback.
 *
 * --------------------------------------------------------------------------
 * Gotchas (promoted from the Blade reference — please read before using):
 *
 * 1. Every item in `data.nodes` MUST have a unique `id`. The engine uses it
 *    for selection, expansion, and range-select. Dev mode warns on missing ids.
 * 2. `children` is a render prop — `(rows) => <>...</>`. Plain JSX children
 *    are a TypeScript compile error. The `rows` you get are already sorted
 *    and paginated; iterate them, don't re-read `data.nodes`.
 * 3. `sortFunctions` is keyed by the string you pass as `headerKey` on a
 *    `<TableHeaderCell>`. Mismatch = silent no-op; dev mode warns.
 * 4. Sticky header (`isHeaderSticky`, default `true`) needs `maxHeight` to
 *    have a scroll container; without it the header has nothing to stick to.
 *    Dev mode warns.
 * 5. `isLoading` replaces the body with a skeleton — use it only for the
 *    initial fetch. Use `isRefreshing` for subsequent fetches so rows stay
 *    visible under a spinner overlay.
 * --------------------------------------------------------------------------
 */
export declare function Table<Item extends TableNode = TableNode>(props: TableProps<Item>): import("react/jsx-runtime").JSX.Element;
