import './TableRowActions.css';
import {
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { MoreHorizontal } from 'react-feather';
import { IconButton } from '../../actions/IconButton/IconButton';
import { DropdownMenu } from '../../overlays/DropdownMenu/DropdownMenu';
import { ActionListItem } from '../../overlays/DropdownMenu/ActionListItem';
import { ActionListItemGroup } from '../../overlays/DropdownMenu/ActionListItemGroup';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useDismissOnScrollOutside } from '../../../hooks/useDismissOnScrollOutside';

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
  /** Dropdown min width in px. Default `OVERFLOW_MENU_MIN_WIDTH`. */
  menuMinWidth?: number;
}

/** Gap between the trigger and the portal'd menu (top or bottom). */
const MENU_GAP = 4;
/** Rough per-row height used for flip-up detection + viewport-overflow
 *  math. The dropdown measures its real height after mount; this is just
 *  a safe upper bound for the first paint. */
const MENU_APPROX_HEIGHT = 200;
/** Default min-width for the overflow menu. Matches Figma's 180 px card. */
const OVERFLOW_MENU_MIN_WIDTH = 180;

/**
 * TableRowActions — max **3 visible slots** per Figma action column spec.
 *
 *   - `actions.length <= 3` → every action renders inline as a bare IconButton.
 *   - `actions.length > 3`  → first 2 actions inline + a `MoreHorizontal`
 *                             overflow trigger as the 3rd slot. The trigger
 *                             opens a `DropdownMenu` containing actions[2..].
 *
 * The dropdown renders via `createPortal` to `document.body` so it is not
 * clipped by the table's `overflow: auto` scroll container (the same pattern
 * `TablePagination` uses for its size dropdown). Position is computed from
 * the trigger's bounding rect on open + on scroll/resize.
 *
 * Bare IconButtons (not filled Buttons) are intentional here — toolbar-level
 * trailing actions are `<Button iconOnly variant="Gray">`, but **row-level**
 * actions sit against the row bg with no chrome of their own. See
 * `feedback_toolbar_icon_buttons.md` for the full rule.
 *
 * `e.stopPropagation()` is applied on every click so row-level `onClick`
 * handlers don't fire alongside the action click.
 */
export function TableRowActions({
  actions,
  moreAriaLabel = 'More actions',
  menuMinWidth = OVERFLOW_MENU_MIN_WIDTH,
}: TableRowActionsProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);

  // Close on any click outside either the trigger or the portal'd menu.
  useClickOutside(menuRef, (e) => {
    if (open && !triggerRef.current?.contains(e.target as Node)) {
      setOpen(false);
    }
  });

  // Position the portal'd menu: right-aligned to the trigger, flipped up if
  // there isn't enough room below.
  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const flipUp = r.bottom + MENU_APPROX_HEIGHT > window.innerHeight;
    setMenuPos({
      top: flipUp ? r.top - MENU_GAP - MENU_APPROX_HEIGHT : r.bottom + MENU_GAP,
      // Anchor the menu's RIGHT edge to the trigger's right edge.
      left: r.right - menuMinWidth,
    });
  }, [open, menuMinWidth]);

  // Standard popover dismissal: close on any scroll or resize EXCEPT scroll
  // originating inside the menu itself (e.g. scrolling the option list).
  useDismissOnScrollOutside(menuRef, () => setOpen(false), open);

  const needsOverflow = actions.length > 3;
  const inline = needsOverflow ? actions.slice(0, 2) : actions;
  const overflow = needsOverflow ? actions.slice(2) : [];

  return (
    <div
      className="fds-table__row-actions"
      // Click-inside-actions must never trigger the row's `onClick` (open-detail).
      onClick={(e) => e.stopPropagation()}
    >
      {inline.map((a) => (
        <IconButton
          key={a.key}
          icon={a.icon}
          aria-label={a.label}
          isDisabled={a.isDisabled}
          onClick={(e) => {
            e.stopPropagation();
            if (a.isDisabled) return;
            a.onClick(e);
          }}
        />
      ))}

      {needsOverflow && (
        <>
          <IconButton
            ref={triggerRef}
            icon={<MoreHorizontal size={20} />}
            aria-label={moreAriaLabel}
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => !o);
            }}
          />
          {open && menuPos && typeof document !== 'undefined' &&
            createPortal(
              <div
                ref={menuRef}
                className="fds-table__row-actions-menu"
                role="presentation"
                style={{
                  top: menuPos.top,
                  left: menuPos.left,
                  minWidth: menuMinWidth,
                }}
              >
                <DropdownMenu>
                  <ActionListItemGroup>
                    {overflow.map((a) => (
                      <ActionListItem
                        key={a.key}
                        title={a.label}
                        leadingIcon={a.icon}
                        isDestructive={a.isDestructive}
                        isDisabled={a.isDisabled}
                        onClick={(e) => {
                          if (a.isDisabled) return;
                          a.onClick(e as ReactMouseEvent);
                          setOpen(false);
                        }}
                      />
                    ))}
                  </ActionListItemGroup>
                </DropdownMenu>
              </div>,
              document.body,
            )
          }
        </>
      )}
    </div>
  );
}
