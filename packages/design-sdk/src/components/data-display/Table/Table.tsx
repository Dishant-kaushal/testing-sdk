import './Table.css';
import { TableContext, type TableContextValue } from './TableContext';
import { useTableEngine } from './hooks/useTableEngine';
import { Spinner } from '../../feedback/Spinner/Spinner';
import type { TableNode, TableProps } from './types';

/**
 * Table — root. Thin render wrapper around `useTableEngine`, which owns all
 * of the `@table-library/react-table-library` adapter logic (selection,
 * sort, pagination, tree) and produces the memoised TableContext value.
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
export function Table<Item extends TableNode = TableNode>(props: TableProps<Item>) {
  const {
    toolbar,
    footer,
    children,
    maxHeight,
    showBorderedCells = false,
    rowDensity = 'compact',
    selectionType = 'none',
    isHeaderSticky = true,
    isFirstColumnSticky = false,
    hasStickyActionColumn = false,
    isLoading = false,
    isRefreshing = false,
  } = props;

  const { ctx, processedRows, scrollContainerRef } = useTableEngine(props);

  return (
    <TableContext.Provider value={ctx as unknown as TableContextValue}>
      {/* Surface = outer chrome holding toolbar + scroll-area. Footer is a
          SEPARATE sibling div below the surface — keeps the table chrome
          structurally independent of pagination/footer content while the
          two share borders so they read as one card visually. */}
      <div
        className="fds-table-surface"
        data-density={rowDensity}
        data-bordered={showBorderedCells ? 'true' : 'false'}
        data-header-sticky={isHeaderSticky ? 'true' : 'false'}
        data-first-col-sticky={isFirstColumnSticky ? 'true' : 'false'}
        data-action-col-sticky={hasStickyActionColumn ? 'true' : 'false'}
        data-selection={selectionType}
        data-has-footer={footer ? 'true' : 'false'}
        data-loading={isLoading ? 'true' : undefined}
        data-refreshing={isRefreshing ? 'true' : undefined}
        style={maxHeight !== undefined ? { maxHeight } : undefined}
      >
        {toolbar && <div className="fds-table-surface__toolbar">{toolbar}</div>}
        <div ref={scrollContainerRef} className="fds-table-surface__scroll">
          <table className="fds-table">
            {/* When `isLoading`, hand an empty array to the render prop so
                consumers don't need to null-check. The consumer is expected
                to render `<TableSkeleton>` inside their `<TableBody>` when
                context.isLoading is true (Gotcha #5 above). */}
            {children(isLoading ? [] : processedRows)}
          </table>
          {isRefreshing && (
            <div
              className="fds-table-surface__refresh-overlay"
              role="status"
              aria-live="polite"
              aria-label="Refreshing data"
            >
              <Spinner size="Medium" />
            </div>
          )}
        </div>
      </div>
      {footer && <div className="fds-table-footer-bar">{footer}</div>}
    </TableContext.Provider>
  );
}
