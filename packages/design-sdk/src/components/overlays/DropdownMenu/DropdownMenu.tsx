import { useRef, useCallback, type ReactNode, type HTMLAttributes, type KeyboardEvent } from 'react';
import { cn } from '../../../utils/cn';
import './DropdownMenu.css';

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Header slot — pass DropdownHeader */
  header?: ReactNode;
  /** Footer slot — pass DropdownFooter */
  footer?: ReactNode;
  /** Menu items — pass ActionListItem components or groups */
  children?: ReactNode;
}

function getMenuItems(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'),
  );
}

export function DropdownMenu({
  header,
  footer,
  children,
  className,
  ...props
}: DropdownMenuProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const list = listRef.current;
    if (!list) return;

    const items = getMenuItems(list);
    if (items.length === 0) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    let nextIndex: number | null = null;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = items.length - 1;
        break;
      case 'Enter':
      case ' ':
        if (currentIndex >= 0) {
          e.preventDefault();
          items[currentIndex].click();
        }
        break;
    }

    if (nextIndex !== null) {
      items[nextIndex].focus();
    }
  }, []);

  return (
    <div className={cn('fds-dropdown-menu', className)} {...props}>
      <div className="fds-dropdown-menu__wrapper">
        {header}

        <div
          ref={listRef}
          className="fds-dropdown-menu__list"
          role="menu"
          onKeyDown={handleKeyDown}
        >
          {children}
        </div>

        {footer}
      </div>
    </div>
  );
}

DropdownMenu.displayName = 'DropdownMenu';
