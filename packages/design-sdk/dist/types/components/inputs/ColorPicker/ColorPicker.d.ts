import type { HTMLAttributes } from 'react';
import type { ColorPaletteData } from './ColorPalette';
import type { ColorConfigMode } from './ColorConfig';
import './ColorPicker.css';
export type ColorPickerTab = 'Presets' | 'Custom';
export interface ColorPickerProps extends HTMLAttributes<HTMLDivElement> {
    /** Active tab */
    activeTab?: ColorPickerTab;
    /** Called when tab changes */
    onTabChange?: (tab: ColorPickerTab) => void;
    /** Current hue (0–360) */
    hue?: number;
    saturation?: number;
    brightness?: number;
    opacity?: number;
    r?: number;
    g?: number;
    b?: number;
    hex?: string;
    configMode?: ColorConfigMode;
    onHueChange?: (hue: number) => void;
    onSaturationBrightnessChange?: (s: number, b: number) => void;
    onOpacityChange?: (opacity: number) => void;
    onRgbChange?: (r: number, g: number, b: number) => void;
    onHexChange?: (hex: string) => void;
    onConfigModeChange?: (mode: ColorConfigMode) => void;
    onColorSelect?: (color: string) => void;
    palettes?: ColorPaletteData[];
    selectedColor?: string;
}
export declare function ColorPicker({ activeTab: controlledTab, onTabChange, hue, saturation, brightness, opacity, r, g, b, hex, configMode, onHueChange, onSaturationBrightnessChange, onOpacityChange, onRgbChange, onHexChange, onConfigModeChange, onColorSelect, palettes, selectedColor, className, ...props }: ColorPickerProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ColorPicker {
    var displayName: string;
}
