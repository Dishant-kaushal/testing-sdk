import type { HTMLAttributes } from 'react';
import type { ColorPaletteData } from './ColorPalette';
import './ColorInput.css';
export interface ColorInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    label?: string;
    value?: string;
    onChange?: (hex: string) => void;
    placeholder?: string;
    helpText?: string;
    errorText?: string;
    validationState?: 'none' | 'error';
    isDisabled?: boolean;
    palettes?: ColorPaletteData[];
}
export declare const ColorInput: import("react").ForwardRefExoticComponent<ColorInputProps & import("react").RefAttributes<HTMLInputElement>>;
