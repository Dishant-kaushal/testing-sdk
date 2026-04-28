import './TableEditableCell.css';
import { type TdHTMLAttributes } from 'react';
export type EditableCellType = 'text' | 'number' | 'email';
export interface TableEditableCellProps<Item = unknown> extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'onChange'> {
    /** Input type routed to the inner `<TextInput>`. Default `'text'`. */
    type?: EditableCellType;
    /** Current value (controlled) or initial value (uncontrolled). */
    value: string;
    /** Optional back-reference to the row item — forwarded verbatim to `onCommit`. */
    item?: Item;
    /** Fired when the user Enters or blurs with a changed value. NOT fired on
     *  every keystroke — that's intentional so consumers don't need to debounce
     *  API writes. */
    onCommit?: (args: {
        value: string;
        item?: Item;
    }) => void;
    /** Placeholder shown when the value is empty. */
    placeholder?: string;
    /** Disables the input. */
    isDisabled?: boolean;
    /** Marks the input visually invalid — also pairs with `errorText` in tooltip UIs. */
    validationState?: 'none' | 'error' | 'success';
    /** Aria-label for the input. Required for a11y since there's no visible label. */
    accessibilityLabel: string;
}
/**
 * TableEditableCell — inline-editable text cell. Renders a `<td>` containing
 * a DS `<TextInput>` (size=Medium) wired with:
 *
 *   - `Enter`  → commit + blur
 *   - `Escape` → revert to the last committed value + blur
 *   - `blur`   → commit (if value changed)
 *
 * The parent is responsible for persisting `onCommit` to its data source.
 */
export declare function TableEditableCell<Item = unknown>({ type, value, item, onCommit, placeholder, isDisabled, validationState, accessibilityLabel, className, ...tdProps }: TableEditableCellProps<Item>): import("react/jsx-runtime").JSX.Element;
