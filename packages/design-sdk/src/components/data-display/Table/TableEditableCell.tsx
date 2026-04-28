import './TableEditableCell.css';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type TdHTMLAttributes,
} from 'react';
import { Edit2 } from 'react-feather';
import { TextInput } from '../../inputs/TextInput/TextInput';
import { IconButton } from '../../actions/IconButton/IconButton';
import { cn } from '../../../utils/cn';

export type EditableCellType = 'text' | 'number' | 'email';

/**
 * When the cell enters edit mode.
 *   - `'click'`    (default) — single click or Enter/Space on the focused
 *                               read-mode cell swaps in the input.
 *   - `'dblclick'` — double-click only. Single click does nothing.
 *   - `'always'`   — legacy behaviour; the TextInput is always mounted.
 */
export type EditableCellMode = 'click' | 'dblclick' | 'always';

export interface TableEditableCellProps<Item = unknown>
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'onChange'> {
  /** Input type routed to the inner `<TextInput>`. Default `'text'`. */
  type?: EditableCellType;
  /** Current value (controlled) or initial value (uncontrolled). */
  value: string;
  /** Optional back-reference to the row item — forwarded verbatim to `onCommit`. */
  item?: Item;
  /** Fired when the user Enters or blurs with a changed value. NOT fired on
   *  every keystroke — that's intentional so consumers don't need to debounce
   *  API writes. */
  onCommit?: (args: { value: string; item?: Item }) => void;
  /** Placeholder shown when the value is empty. */
  placeholder?: string;
  /** Text shown in read mode when `value` is empty. Default `'—'`. */
  emptyText?: string;
  /** How the cell enters edit mode. Default `'click'`. */
  editMode?: EditableCellMode;
  /** Disables the input. */
  isDisabled?: boolean;
  /** Marks the input visually invalid — also pairs with `errorText` in tooltip UIs. */
  validationState?: 'none' | 'error' | 'success';
  /** Aria-label for the input. Required for a11y since there's no visible label. */
  accessibilityLabel: string;
}

/**
 * TableEditableCell — a cell that shows the value as read-only text by
 * default, then swaps in a DS `<TextInput>` on click / Enter / Space for
 * editing. Matches the Figma "editable cell" pattern where the input chrome
 * only appears while the user is actively editing.
 *
 * **Keyboard support (read mode):** the cell exposes `role="button"` and is
 * focusable with `Tab`. Press `Enter` or `Space` to enter edit mode.
 *
 * **Keyboard support (edit mode):**
 *   - `Enter`  → commit + return to read mode
 *   - `Escape` → revert + return to read mode
 *   - blur     → commit (if value changed) + return to read mode
 *
 * The parent is responsible for persisting `onCommit` to its data source.
 * `editMode="always"` preserves the pre-v0.3.1 always-editable behaviour as
 * an escape hatch.
 */
export function TableEditableCell<Item = unknown>({
  type = 'text',
  value,
  item,
  onCommit,
  placeholder,
  emptyText = '—',
  editMode = 'click',
  isDisabled,
  validationState = 'none',
  accessibilityLabel,
  className,
  style,
  ...tdProps
}: TableEditableCellProps<Item>) {
  const [isEditing, setIsEditing] = useState(editMode === 'always');
  const [draft, setDraft] = useState(value);
  const committedRef = useRef(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const tdRef = useRef<HTMLTableCellElement>(null);
  /**
   * Locked width in px. Measured from the `<td>` in read mode and re-applied
   * as an inline `width` + `maxWidth` when entering edit mode so the
   * `table-layout: auto` algorithm can't widen the column to accommodate
   * the TextInput's intrinsic content width (~150 px native input size +
   * chrome + placeholder). Null outside edit mode.
   */
  const [lockedWidth, setLockedWidth] = useState<number | null>(null);

  // Sync external value changes back into draft — the canonical "controlled
  // input that also holds an un-committed draft" pattern.
  if (value !== committedRef.current && draft === committedRef.current) {
    committedRef.current = value;
    setDraft(value);
  }

  const commit = useCallback(() => {
    if (draft !== committedRef.current) {
      committedRef.current = draft;
      onCommit?.({ value: draft, item });
    }
    if (editMode !== 'always') {
      setIsEditing(false);
      setLockedWidth(null);
    }
  }, [draft, item, onCommit, editMode]);

  const cancel = useCallback(() => {
    setDraft(committedRef.current);
    if (editMode !== 'always') {
      setIsEditing(false);
      setLockedWidth(null);
    }
  }, [editMode]);

  const enterEdit = useCallback(() => {
    if (isDisabled || editMode === 'always') return;
    // Snapshot the current td width BEFORE the input mounts, otherwise the
    // input's intrinsic width already widened the column by the time we
    // read it. `offsetWidth` returns the integer pixel value; we apply it
    // as both `width` and `maxWidth` below.
    if (tdRef.current) {
      setLockedWidth(tdRef.current.offsetWidth);
    }
    setIsEditing(true);
  }, [isDisabled, editMode]);

  // When we transition into edit mode, auto-focus the input and select its
  // current value so the user can start typing over it immediately.
  useEffect(() => {
    if (!isEditing) return;
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    el.select();
  }, [isEditing]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    }
  };

  const handleReadKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      enterEdit();
    }
  };

  // Read-mode rendering — also used when `editMode` is `'click'` or
  // `'dblclick'` and the user hasn't triggered edit yet.
  const showInput = isEditing || editMode === 'always';

  // When editing, pin the cell to its read-mode width so the TextInput's
  // intrinsic ~150 px content footprint can't widen the column.
  const mergedStyle =
    lockedWidth != null
      ? { ...style, width: lockedWidth, maxWidth: lockedWidth }
      : style;

  return (
    <td
      ref={tdRef}
      className={cn('fds-table__editable-cell', 'fds-table__cell', className)}
      data-content-type="editable"
      data-editing={showInput ? 'true' : undefined}
      onDoubleClick={editMode === 'dblclick' ? enterEdit : undefined}
      style={mergedStyle}
      {...tdProps}
    >
      {showInput ? (
        <TextInput
          ref={inputRef}
          label=""
          aria-label={accessibilityLabel}
          type={type === 'email' ? 'email' : type === 'number' ? 'number' : 'text'}
          size="Medium"
          value={draft}
          placeholder={placeholder}
          isDisabled={isDisabled}
          validationState={validationState}
          onChange={({ value: next }) => setDraft(next)}
          onBlur={() => commit()}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className="fds-table__editable-cell-read BodyMediumRegular">
          <span
            role="button"
            tabIndex={isDisabled ? -1 : 0}
            aria-label={`${accessibilityLabel}. Currently ${value || emptyText}. ${editMode === 'dblclick' ? 'Double-click' : 'Press Enter'} to edit.`}
            aria-disabled={isDisabled || undefined}
            className={cn(
              'fds-table__editable-cell-read-value',
              !value && 'fds-table__editable-cell-read-value--empty',
            )}
            onClick={editMode === 'click' ? enterEdit : undefined}
            onKeyDown={handleReadKeyDown}
          >
            {value || emptyText}
          </span>
          {/* Hover-revealed edit affordance — clear visual hint that the cell
              is editable without occupying space at rest. Reuses the
              `.fds-table-cell-hover-action` CSS hook from CellTextAction. */}
          {!isDisabled && (
            <span className="fds-table-cell-hover-action">
              <IconButton
                size="20"
                icon={<Edit2 size={16} />}
                aria-label={`Edit ${accessibilityLabel}`}
                onClick={(e: ReactMouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  enterEdit();
                }}
              />
            </span>
          )}
        </span>
      )}
    </td>
  );
}
