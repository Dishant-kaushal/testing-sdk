import type { ChangeEvent, MouseEvent } from 'react';
import { Checkbox } from '../../inputs/Checkbox/Checkbox';
import { useTableContextOptional } from './TableContext';
import type { Identifier } from './types';

export interface SelectionCellProps {
  item: { id: Identifier; [key: string]: unknown };
  isSelected: boolean;
  isDisabled: boolean;
}

/**
 * Selection cell — auto-injected by `<TableRow>` when the parent Table has
 * `selectionType="multiple"`.
 *
 * Click flow (no double-toggle, no readOnly hack):
 *   - Wrapper `onClick` only stops propagation so row's onClick (open-detail)
 *     doesn't fire alongside selection.
 *   - Plain click on checkbox → native toggle → `onChange` → toggleRowSelection.
 *   - Shift-click on checkbox → `onClick` runs first; `preventDefault` stops
 *     the native toggle (which suppresses `onChange`); we call
 *     `toggleRowSelectionRange` instead.
 *   - Keyboard space on focused checkbox → `onChange` → toggleRowSelection
 *     (no shift semantics from keyboard).
 */
export function SelectionCell({ item, isSelected, isDisabled }: SelectionCellProps) {
  const ctx = useTableContextOptional();
  if (!ctx) return null;

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    if (e.shiftKey) {
      e.preventDefault();
      ctx.toggleRowSelectionRange(item.id);
    }
  };

  const handleChange = (_e: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    ctx.toggleRowSelection(item.id);
  };

  return (
    <td
      className="fds-table__cell fds-table__cell--selection"
      data-content-type="selection"
      onClick={(e: MouseEvent<HTMLTableCellElement>) => e.stopPropagation()}
    >
      <div className="fds-table__cell-selection-wrapper">
        <Checkbox
          label=""
          size="Medium"
          aria-label={isSelected ? 'Deselect row' : 'Select row'}
          checked={isSelected}
          isDisabled={isDisabled}
          onClick={handleClick}
          onChange={handleChange}
        />
      </div>
    </td>
  );
}
