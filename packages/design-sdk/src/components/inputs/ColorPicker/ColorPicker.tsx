import { useState, useCallback } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { SwitchButtonBase } from '../../actions/SwitchButton/SwitchButtonBase';
import { SwitchButtonGroup } from '../../actions/SwitchButton/SwitchButtonGroup';
import { ColorPickerPresets } from './ColorPickerPresets';
import { ColorPickerPanel } from './ColorPickerPanel';
import type { ColorPaletteData } from './ColorPalette';
import type { ColorConfigMode } from './ColorConfig';
import './ColorPicker.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type ColorPickerTab = 'Presets' | 'Custom';

export interface ColorPickerProps extends HTMLAttributes<HTMLDivElement> {
  /** Active tab */
  activeTab?: ColorPickerTab;
  /** Called when tab changes */
  onTabChange?: (tab: ColorPickerTab) => void;

  /* ── Color state ─────────────────────────────────────────────────────── */
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

  /* ── Callbacks ───────────────────────────────────────────────────────── */
  onHueChange?: (hue: number) => void;
  onSaturationBrightnessChange?: (s: number, b: number) => void;
  onOpacityChange?: (opacity: number) => void;
  onRgbChange?: (r: number, g: number, b: number) => void;
  onHexChange?: (hex: string) => void;
  onConfigModeChange?: (mode: ColorConfigMode) => void;
  onColorSelect?: (color: string) => void;

  /* ── Presets ─────────────────────────────────────────────────────────── */
  palettes?: ColorPaletteData[];
  selectedColor?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ColorPicker (Popover content — Presets/Custom tabs)
   Figma: 3102:28464
   ═══════════════════════════════════════════════════════════════════════════ */

export function ColorPicker({
  activeTab: controlledTab,
  onTabChange,
  hue, saturation, brightness, opacity, r, g, b, hex, configMode,
  onHueChange, onSaturationBrightnessChange, onOpacityChange,
  onRgbChange, onHexChange, onConfigModeChange, onColorSelect,
  palettes, selectedColor,
  className,
  ...props
}: ColorPickerProps) {
  const [internalTab, setInternalTab] = useState<ColorPickerTab>('Presets');
  const tab = controlledTab ?? internalTab;

  const handleTabChange = useCallback((t: ColorPickerTab) => {
    if (!controlledTab) setInternalTab(t);
    onTabChange?.(t);
  }, [controlledTab, onTabChange]);

  return (
    <div className={cn('fds-color-picker', className)} {...props}>
      {/* Tab bar */}
      <SwitchButtonGroup>
        <SwitchButtonBase
          type="Text"
          label="Presets"
          isActive={tab === 'Presets'}
          onClick={() => handleTabChange('Presets')}
        />
        <SwitchButtonBase
          type="Text"
          label="Custom"
          isActive={tab === 'Custom'}
          onClick={() => handleTabChange('Custom')}
        />
      </SwitchButtonGroup>

      {/* Panel */}
      <div className="fds-color-picker__panel">
        {tab === 'Presets' && (
          <ColorPickerPresets
            palettes={palettes}
            selectedColor={selectedColor}
            onColorSelect={onColorSelect}
          />
        )}
        {tab === 'Custom' && (
          <ColorPickerPanel
            hue={hue}
            saturation={saturation}
            brightness={brightness}
            opacity={opacity}
            r={r}
            g={g}
            b={b}
            hex={hex}
            configMode={configMode}
            onHueChange={onHueChange}
            onSaturationBrightnessChange={onSaturationBrightnessChange}
            onOpacityChange={onOpacityChange}
            onRgbChange={onRgbChange}
            onHexChange={onHexChange}
            onConfigModeChange={onConfigModeChange}
          />
        )}
      </div>
    </div>
  );
}

ColorPicker.displayName = 'ColorPicker';
