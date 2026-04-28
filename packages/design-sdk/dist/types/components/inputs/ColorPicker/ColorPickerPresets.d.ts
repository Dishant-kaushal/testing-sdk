import type { HTMLAttributes } from 'react';
import { type ColorPaletteData } from './ColorPalette';
import './ColorPickerPresets.css';
export declare const DEFAULT_PALETTES: ColorPaletteData[];
export interface ColorPickerPresetsProps extends HTMLAttributes<HTMLDivElement> {
    /** Color palettes to display */
    palettes?: ColorPaletteData[];
    /** Currently selected color (hex) */
    selectedColor?: string;
    /** Called when a swatch is clicked */
    onColorSelect?: (color: string) => void;
}
export declare function ColorPickerPresets({ palettes, selectedColor, onColorSelect, className, ...props }: ColorPickerPresetsProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ColorPickerPresets {
    var displayName: string;
}
