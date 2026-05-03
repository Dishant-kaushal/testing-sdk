import { type RefObject } from 'react';
export interface DropdownPos {
    top: number;
    left: number;
    width: number;
}
/**
 * Shared portal-positioning hook for all dropdown panels.
 * Returns a ref for the portal element and its fixed-position coordinates.
 * Wires click-outside (ignoring the trigger) and scroll/resize dismiss.
 */
export declare function useDropdownPortal(triggerRef: RefObject<HTMLElement | null>, open: boolean, onClose: () => void, gap?: number): {
    portalRef: RefObject<HTMLDivElement>;
    pos: DropdownPos | null;
};
