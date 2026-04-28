import { createContext, useContext } from 'react';

/** Internal context — lets `PopoverHeader` call the root `close()` without
 *  consumers having to wire state manually. */
export interface PopoverContextValue {
  close: () => void;
}

export const PopoverContext = createContext<PopoverContextValue | null>(null);

/** Reads the close function from context. Returns a no-op outside a Popover. */
export function usePopoverContext(): PopoverContextValue {
  return useContext(PopoverContext) ?? { close: () => {} };
}
