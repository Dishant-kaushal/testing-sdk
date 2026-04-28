import type { HTMLAttributes, ReactNode } from 'react';
import type { CheckboxSize } from './Checkbox';
import './CheckboxGroup.css';
export interface CheckboxGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Group label displayed above the checkboxes */
    label?: string;
    /** Size — controls label typography */
    size?: CheckboxSize;
    /** Orientation of the checkbox group */
    orientation?: 'Vertical' | 'Horizontal';
    /** Checkbox children */
    children: ReactNode;
}
export declare function CheckboxGroup({ label, size, orientation, children, className, ...rest }: CheckboxGroupProps): import("react/jsx-runtime").JSX.Element;
export declare namespace CheckboxGroup {
    var displayName: string;
}
