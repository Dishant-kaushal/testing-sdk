import { type ReactNode, type HTMLAttributes } from 'react';
import './Tooltip.css';
export type TooltipPlacement = 'Top' | 'TopStart' | 'TopEnd' | 'Bottom' | 'BottomStart' | 'BottomEnd' | 'Left' | 'Right';
export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Tooltip body text */
    bodyText: string;
    /** Optional heading text */
    heading?: string;
    /** Placement relative to trigger */
    placement?: TooltipPlacement;
    /** Controlled visibility — overrides hover/focus when provided */
    isOpen?: boolean;
    /** Delay in ms before showing (default 200) */
    showDelay?: number;
    /** Delay in ms before hiding (default 0) */
    hideDelay?: number;
    /** Max width of the tooltip content (default 200px) */
    maxWidth?: number | string;
    /** Trigger element(s) */
    children: ReactNode;
}
export declare function Tooltip({ bodyText, heading, placement, isOpen: controlledOpen, showDelay, hideDelay, maxWidth, children, className, ...props }: TooltipProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Tooltip {
    var displayName: string;
}
