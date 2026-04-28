import type { HTMLAttributes, ReactNode } from 'react';
import { Checkbox } from '../../inputs/Checkbox/Checkbox';
import { useTableContextOptional } from './TableContext';

export interface TableHeaderRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
}

/**
 * Selection header cell — auto-injected when `selectionType="multiple"`.
 * Mirrors the body row's checkbox column (48 px wide, content-centered).
 * Toggle flows entirely through Checkbox's `onChange` — no wrapper-click hack.
 */
function SelectionHeaderCell() {
  const ctx = useTableContextOptional();
  if (!ctx) return null;

  return (
    <th
      className="fds-table__header-cell fds-table__header-cell--selection"
      data-content-type="selection"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="fds-table__cell-selection-wrapper">
        <Checkbox
          label=""
          size="Medium"
          aria-label={ctx.isAllSelected ? 'Deselect all rows' : 'Select all rows'}
          checked={ctx.isAllSelected}
          isIndeterminate={ctx.isIndeterminate}
          onChange={() => ctx.toggleAllRowsSelection()}
        />
      </div>
    </th>
  );
}

export function TableHeaderRow({ children, ...rest }: TableHeaderRowProps) {
  const ctx = useTableContextOptional();
  const showSelection = ctx?.selectionType === 'multiple';

  return (
    <tr className="fds-table__header-row" {...rest}>
      {showSelection && <SelectionHeaderCell />}
      {children}
    </tr>
  );
}
