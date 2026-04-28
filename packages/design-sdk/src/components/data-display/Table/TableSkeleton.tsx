import './TableSkeleton.css';

export interface TableSkeletonProps {
  /** Number of shimmer rows to render. Default `5`. */
  rows?: number;
  /** Number of shimmer cells per row. Must match the real column count so
   *  the skeleton lines up with the table's grid once data arrives. */
  columns: number;
}

/**
 * TableSkeleton — shimmer loading state. Render inside a `<TableBody>` when
 * `context.isLoading` is `true`; consumers typically guard it with the prop:
 *
 * ```tsx
 * <TableBody>
 *   {isLoading
 *     ? <TableSkeleton rows={10} columns={5} />
 *     : rows.map(r => <TableRow item={r}>...</TableRow>)}
 * </TableBody>
 * ```
 *
 * Renders native `<tr>/<td>` so it sits inside a `<tbody>` without breaking
 * table semantics. The animated bar is a pure-CSS gradient sweep — no JS.
 */
export function TableSkeleton({ rows = 5, columns }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr
          key={r}
          className="fds-table__skeleton-row"
          aria-hidden="true"
        >
          {Array.from({ length: columns }).map((__, c) => (
            <td key={c} className="fds-table__skeleton-cell">
              <span className="fds-table__skeleton-bar" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
