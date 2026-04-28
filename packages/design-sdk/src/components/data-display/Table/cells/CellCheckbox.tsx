import type { ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
import { Checkbox } from '../../../inputs/Checkbox/Checkbox';

export interface CellCheckboxProps {
  /** Screen-reader label. Required — there's no visible label in this cell type. */
  accessibilityLabel: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
}

/**
 * CellCheckbox — non-selection checkbox column (e.g., "Featured", "Archived").
 * Drop inside `<TableCell contentType="checkbox">`. Maps to Figma node
 * 1313:12869.
 *
 * **Not for row selection** — that's owned by `<TableRow>` and auto-injected
 * when `selectionType="multiple"`. Use this component only for arbitrary
 * boolean-value columns in your data.
 *
 * Click propagation is stopped so the row's `onClick` doesn't fire alongside
 * the checkbox toggle.
 */
export function CellCheckbox({
  accessibilityLabel,
  checked,
  onChange,
  isDisabled,
  isIndeterminate,
}: CellCheckboxProps) {
  return (
    <Checkbox
      label=""
      size="Medium"
      aria-label={accessibilityLabel}
      checked={checked}
      isDisabled={isDisabled}
      isIndeterminate={isIndeterminate}
      onClick={(e: ReactMouseEvent<HTMLInputElement>) => e.stopPropagation()}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
    />
  );
}
