import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { ColorPalette, type ColorPaletteData } from './ColorPalette';
import './ColorPickerPresets.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Default palettes (from Figma)
   ═══════════════════════════════════════════════════════════════════════════ */

/* Palette hex values sourced from global tokens (tokens/global/colors.css)
   Blue    → --global-chromatic-blue-{50..1000}
   Green   → --global-chromatic-green-{50..1000}
   Orange  → --global-chromatic-orange-{50..1000}
   Red     → --global-chromatic-red-{50..1000}
   Neutral → --global-neutral-gray-{50..1200} */
export const DEFAULT_PALETTES: ColorPaletteData[] = [
  { name: 'Blue', colors: ['#E7F6FE','#CFEDFC','#A8DFFA','#79CEF8','#57C1F6','#15B0F3','#1291D0','#0F78AD','#0C608A','#094868'] },
  { name: 'Green', colors: ['#EBFAF3','#DAF5E8','#B6ECD1','#91E3BA','#48D08C','#00BE5F','#00A251','#008743','#006C36','#005128'] },
  { name: 'Orange', colors: ['#FFF3EB','#FFE1CC','#FFC499','#FFAC70','#FF9040','#FF7A1A','#E9690C','#C65C10','#A24D10','#813E0E'] },
  { name: 'Red', colors: ['#FFF5F5','#FEE4E2','#FEC6C3','#FD9D96','#F96C62','#F04438','#D92D20','#B42318','#9A0E0E','#880C0C'] },
  { name: 'Neutral', colors: ['#F8FAFC','#F1F5FA','#E3EAF3','#CBD5E2','#B1C1D2','#90A5BB','#768EA7','#6C849D','#58728D','#40566D'] },
];

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ColorPickerPresetsProps extends HTMLAttributes<HTMLDivElement> {
  /** Color palettes to display */
  palettes?: ColorPaletteData[];
  /** Currently selected color (hex) */
  selectedColor?: string;
  /** Called when a swatch is clicked */
  onColorSelect?: (color: string) => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ColorPickerPresets (Presets tab content)
   ═══════════════════════════════════════════════════════════════════════════ */

export function ColorPickerPresets({
  palettes = DEFAULT_PALETTES,
  selectedColor,
  onColorSelect,
  className,
  ...props
}: ColorPickerPresetsProps) {
  return (
    <div className={cn('fds-color-presets', className)} {...props}>
      {palettes.map((palette) => (
        <ColorPalette
          key={palette.name}
          name={palette.name}
          colors={palette.colors}
          selectedColor={selectedColor}
          onColorSelect={onColorSelect}
        />
      ))}
    </div>
  );
}

ColorPickerPresets.displayName = 'ColorPickerPresets';
