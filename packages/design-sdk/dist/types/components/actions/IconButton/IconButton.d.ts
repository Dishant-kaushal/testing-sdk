import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import './IconButton.css';
export type IconButtonSize = '12' | '16' | '20';
export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** Icon element to render */
    icon: ReactNode;
    /** Icon size — 12px, 16px, or 20px */
    size?: IconButtonSize;
    /** Whether the button is disabled */
    isDisabled?: boolean;
}
export declare const IconButton: import("react").ForwardRefExoticComponent<IconButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
