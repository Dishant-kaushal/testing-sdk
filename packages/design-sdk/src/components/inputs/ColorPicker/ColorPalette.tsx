import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { ColorCell } from './ColorCell';
import './ColorPalette.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ColorPaletteData {
  name: string;
  colors: string[];
}

export interface ColorPaletteProps extends HTMLAttributes<HTMLDivElement> {
  /** Palette label */
  name: string;
  /** Array of color hex strings */
  colors: string[];
  /** Currently selected color */
  selectedColor?: string;
  /** Called when a color cell is clicked */
  onColorSelect?: (color: string) => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ColorPalette
   Figma: 3102:29042
   ═══════════════════════════════════════════════════════════════════════════ */

export function ColorPalette({
  name,
  colors,
  selectedColor,
  onColorSelect,
  className,
  ...props
}: ColorPaletteProps) {
  return (
    <div className={cn('fds-color-palette', className)} {...props}>
      <span className="fds-color-palette__label BodySmallRegular">{name}</span>
      <div className="fds-color-palette__row">
        {colors.map((color) => (
          <ColorCell
            key={color}
            color={color}
            isSelected={selectedColor?.toLowerCase() === color.toLowerCase()}
            onClick={() => onColorSelect?.(color)}
          />
        ))}
      </div>
    </div>
  );
}

ColorPalette.displayName = 'ColorPalette';
