import { useRef, useCallback, type MouseEvent, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { ColorConfig, type ColorConfigMode } from './ColorConfig';
import './ColorPickerPanel.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ColorPickerPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Current hue (0–360) */
  hue?: number;
  /** Current saturation (0–100) */
  saturation?: number;
  /** Current brightness (0–100) */
  brightness?: number;
  /** Current opacity (0–100) */
  opacity?: number;
  /** RGB values */
  r?: number;
  g?: number;
  b?: number;
  /** HEX value */
  hex?: string;
  /** Config mode (Hex/RGB) */
  configMode?: ColorConfigMode;
  /** Called when color changes via canvas/sliders */
  onHueChange?: (hue: number) => void;
  onSaturationBrightnessChange?: (s: number, b: number) => void;
  onOpacityChange?: (opacity: number) => void;
  onRgbChange?: (r: number, g: number, b: number) => void;
  onHexChange?: (hex: string) => void;
  onConfigModeChange?: (mode: ColorConfigMode) => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ColorPickerPanel (Custom tab content)
   Figma: 3102:28464
   ═══════════════════════════════════════════════════════════════════════════ */

export function ColorPickerPanel({
  hue = 0,
  saturation = 100,
  brightness = 100,
  opacity = 100,
  r = 255,
  g = 0,
  b = 0,
  hex = '#FF0000',
  configMode = 'Hex',
  onHueChange,
  onSaturationBrightnessChange,
  onOpacityChange,
  onRgbChange,
  onHexChange,
  onConfigModeChange,
  className,
  ...props
}: ColorPickerPanelProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const opacityRef = useRef<HTMLDivElement>(null);

  /* ── Canvas drag (saturation + brightness) ───────────────────────────── */
  const handleCanvasMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const update = (cx: number, cy: number) => {
        const s = Math.max(0, Math.min(100, ((cx - rect.left) / rect.width) * 100));
        const br = Math.max(0, Math.min(100, 100 - ((cy - rect.top) / rect.height) * 100));
        onSaturationBrightnessChange?.(s, br);
      };
      update(e.clientX, e.clientY);
      const onMove = (ev: globalThis.MouseEvent) => update(ev.clientX, ev.clientY);
      const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [onSaturationBrightnessChange],
  );

  /* ── Hue slider drag ─────────────────────────────────────────────────── */
  const handleHueMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = hueRef.current?.getBoundingClientRect();
      if (!rect) return;
      const update = (cx: number) => {
        onHueChange?.(Math.round(Math.max(0, Math.min(360, ((cx - rect.left) / rect.width) * 360))));
      };
      update(e.clientX);
      const onMove = (ev: globalThis.MouseEvent) => update(ev.clientX);
      const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [onHueChange],
  );

  /* ── Opacity slider drag ─────────────────────────────────────────────── */
  const handleOpacityMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = opacityRef.current?.getBoundingClientRect();
      if (!rect) return;
      const update = (cx: number) => {
        onOpacityChange?.(Math.round(Math.max(0, Math.min(100, ((cx - rect.left) / rect.width) * 100))));
      };
      update(e.clientX);
      const onMove = (ev: globalThis.MouseEvent) => update(ev.clientX);
      const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [onOpacityChange],
  );

  const hueColor = `hsl(${hue}, 100%, 50%)`;

  return (
    <div className={cn('fds-color-panel', className)} {...props}>
      {/* Saturation/Brightness canvas */}
      <div
        ref={canvasRef}
        className="fds-color-panel__canvas"
        style={{ background: hueColor }}
        onMouseDown={handleCanvasMouseDown}
      >
        <div className="fds-color-panel__canvas-white" />
        <div className="fds-color-panel__canvas-black" />
        <div
          className="fds-color-panel__picker"
          style={{ left: `${saturation}%`, top: `${100 - brightness}%` }}
        />
      </div>

      {/* Hue slider */}
      <div ref={hueRef} className="fds-color-panel__hue" onMouseDown={handleHueMouseDown}>
        <div className="fds-color-panel__hue-track" />
        <div className="fds-color-panel__slider-thumb" style={{ left: `${(hue / 360) * 100}%`, backgroundColor: hueColor }} />
      </div>

      {/* Opacity slider */}
      <div ref={opacityRef} className="fds-color-panel__opacity" onMouseDown={handleOpacityMouseDown}>
        <div
          className="fds-color-panel__opacity-track"
          style={{ background: `linear-gradient(to right, rgba(${r},${g},${b},0), rgb(${r},${g},${b}))` }}
        />
        <div className="fds-color-panel__slider-thumb" style={{ left: `${opacity}%`, backgroundColor: `rgb(${r},${g},${b})` }} />
      </div>

      {/* Color config (Hex/RGB inputs) */}
      <ColorConfig
        mode={configMode}
        hex={hex}
        r={r}
        g={g}
        b={b}
        opacity={opacity}
        onModeChange={onConfigModeChange}
        onHexChange={onHexChange}
        onRgbChange={onRgbChange}
        onOpacityChange={onOpacityChange}
      />
    </div>
  );
}

ColorPickerPanel.displayName = 'ColorPickerPanel';
