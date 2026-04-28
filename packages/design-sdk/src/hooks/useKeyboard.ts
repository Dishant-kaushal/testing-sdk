import { useEffect } from 'react';

/**
 * Registers a global keyboard shortcut.
 *
 * @example
 *   useKeyboard('Escape', () => setOpen(false));
 */
export function useKeyboard(
  key: string,
  handler: (event: KeyboardEvent) => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: KeyboardEvent) => {
      if (event.key === key) handler(event);
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [key, handler, enabled]);
}
