import { type HTMLAttributes, type ReactNode } from 'react';
import './Popover.css';
export type PopoverPlacement = 'Top' | 'Top Start' | 'Top End' | 'Right' | 'Right Start' | 'Right End' | 'Bottom' | 'Bottom Start' | 'Bottom End' | 'Left' | 'Left Start' | 'Left End';
export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Element that opens the popover (button, link, avatar, etc.) */
    trigger: ReactNode;
    /** Popover content — typically `<PopoverHeader />`, `<PopoverBody />`, `<PopoverFooter />`.
     *  Popovers always include actions, so a `<PopoverFooter />` is expected. */
    children: ReactNode;
    /** Controlled open state */
    isOpen?: boolean;
    /** Called whenever the open state should change (controlled + uncontrolled) */
    onOpenChange?: (open: boolean) => void;
    /** Starting open state for uncontrolled usage */
    defaultOpen?: boolean;
    /** Position relative to the trigger. Default `'Bottom'`. Figma 778:8023 covers all 12. */
    placement?: PopoverPlacement;
    /** Render the arrow pointing at the trigger. Default `true`. */
    showArrow?: boolean;
    /** Disables the trigger. Popover cannot open. */
    isDisabled?: boolean;
    /** Accessibility label for the popover panel (falls back to the header title when available) */
    'aria-label'?: string;
}
export declare const Popover: import("react").ForwardRefExoticComponent<PopoverProps & import("react").RefAttributes<HTMLDivElement>>;
