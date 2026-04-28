import './TableRowActions.css';
import { type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
export interface TableRowAction {
    /** Stable React key. */
    key: string;
    /** Accessible label — also the dropdown text when this action overflows. */
    label: string;
    /** 16-20 px icon (react-feather convention). Reused as both the inline
     *  IconButton glyph and the `leadingIcon` on the dropdown item. */
    icon: ReactNode;
    onClick: (e: ReactMouseEvent) => void;
    isDestructive?: boolean;
    isDisabled?: boolean;
}
export interface TableRowActionsProps {
    actions: TableRowAction[];
    /** Aria-label for the overflow trigger. Default `'More actions'`. */
    moreAriaLabel?: string;
}
/**
 * TableRowActions — max **3 visible slots** per Figma action column spec.
 *
 *   - `actions.length <= 3` → every action renders inline as a bare IconButton.
 *   - `actions.length > 3`  → first 2 actions inline + a `MoreHorizontal`
 *                             overflow trigger as the 3rd slot. The trigger
 *                             opens a `DropdownMenu` containing actions[2..].
 *
 * Bare IconButtons (not filled Buttons) are intentional here — toolbar-level
 * trailing actions are `<Button iconOnly variant="Gray">`, but **row-level**
 * actions sit against the row bg with no chrome of their own. See
 * `feedback_toolbar_icon_buttons.md` for the full rule.
 *
 * `e.stopPropagation()` is applied on every click so row-level `onClick`
 * handlers don't fire alongside the action click.
 *
 * Drop this anywhere inside a `<TableRow>` — typically as the last cell:
 *
 * ```tsx
 * <TableRow item={row}>
 *   <TableCell>...</TableCell>
 *   <td>
 *     <TableRowActions
 *       actions={[
 *         { key: 'edit',   label: 'Edit',   icon: <Edit2 size={20} />,    onClick: () => ... },
 *         { key: 'copy',   label: 'Copy',   icon: <Copy size={20} />,     onClick: () => ... },
 *         { key: 'archive',label: 'Archive',icon: <Archive size={20} />,  onClick: () => ... },
 *         { key: 'delete', label: 'Delete', icon: <Trash2 size={20} />,   onClick: () => ...,
 *           isDestructive: true },
 *       ]}
 *     />
 *   </td>
 * </TableRow>
 * ```
 */
export declare function TableRowActions({ actions, moreAriaLabel, }: TableRowActionsProps): import("react/jsx-runtime").JSX.Element;
