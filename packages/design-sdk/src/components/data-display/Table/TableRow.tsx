import './TableRow.css';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { useTableContextOptional } from './TableContext';
import { SelectionCell } from './SelectionCell';
import type { Identifier } from './types';

export interface TableRowProps<Item = unknown>
  extends Omit<HTMLAttributes<HTMLTableRowElement>, 'onClick'> {
  /** The data item this row represents. Required for selection / expansion / disabled checks. */
  item: Item;
  /** Row click — fires regardless of selection. Used for "open detail" UX. */
  onClick?: (item: Item) => void;
  children?: ReactNode;
}

interface ItemWithId {
  id: Identifier;
  [key: string]: unknown;
}

export function TableRow<Item = unknown>({
  children,
  item,
  onClick,
  ...rest
}: TableRowProps<Item>) {
  const ctx = useTableContextOptional();
  const itemWithId = item as unknown as ItemWithId;

  const isSelectable = ctx ? ctx.isRowSelectable(itemWithId) : true;
  const isSelected = ctx ? ctx.selectedIds.includes(itemWithId.id) : false;

  const isMulti = ctx?.selectionType === 'multiple';
  const isSingle = ctx?.selectionType === 'single';
  const showCheckboxCol = isMulti;
  const rowClickSelects =
    (isMulti && ctx?.multiSelectTrigger === 'row') || isSingle;

  const handleRowClick = (e: MouseEvent<HTMLTableRowElement>) => {
    if (rowClickSelects && isSelectable && ctx) {
      if (e.shiftKey && isMulti) {
        ctx.toggleRowSelectionRange(itemWithId.id);
      } else {
        ctx.toggleRowSelection(itemWithId.id);
      }
    }
    onClick?.(item);
  };

  return (
    <tr
      className="fds-table__row"
      aria-selected={isSelected || undefined}
      data-selected={isSelected ? 'true' : undefined}
      data-disabled={!isSelectable ? 'true' : undefined}
      onClick={onClick || rowClickSelects ? handleRowClick : undefined}
      {...rest}
    >
      {showCheckboxCol && (
        <SelectionCell
          item={itemWithId}
          isSelected={isSelected}
          isDisabled={!isSelectable}
        />
      )}
      {children}
    </tr>
  );
}
