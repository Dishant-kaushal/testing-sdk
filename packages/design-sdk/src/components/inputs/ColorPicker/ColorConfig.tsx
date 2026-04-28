import { useState, useRef, useEffect, useCallback } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { TextInput } from '../TextInput/TextInput';
import { SelectInput } from '../SelectInput/SelectInput';
import { DropdownMenu } from '../../overlays/DropdownMenu/DropdownMenu';
import { ActionListItem } from '../../overlays/DropdownMenu/ActionListItem';
import { ActionListItemGroup } from '../../overlays/DropdownMenu/ActionListItemGroup';
import { useClickOutside } from '../../../hooks/useClickOutside';
import './ColorConfig.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type ColorConfigMode = 'Hex' | 'RGB';

export interface ColorConfigProps extends HTMLAttributes<HTMLDivElement> {
  mode?: ColorConfigMode;
  hex?: string;
  r?: number;
  g?: number;
  b?: number;
  opacity?: number;
  onModeChange?: (mode: ColorConfigMode) => void;
  onHexChange?: (hex: string) => void;
  onRgbChange?: (r: number, g: number, b: number) => void;
  onOpacityChange?: (opacity: number) => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ColorConfig
   Figma: 3112:30584
   ═══════════════════════════════════════════════════════════════════════════ */

export function ColorConfig({
  mode = 'Hex',
  hex = '#000000',
  r = 0,
  g = 0,
  b = 0,
  opacity = 100,
  onModeChange,
  onHexChange,
  onRgbChange,
  onOpacityChange,
  className,
  ...props
}: ColorConfigProps) {
  const [modeOpen, setModeOpen] = useState(false);
  const modeRef = useRef<HTMLDivElement>(null);

  useClickOutside(modeRef, () => { if (modeOpen) setModeOpen(false); });

  /* ── Local input state — commit on blur/Enter ────────────────────────── */
  const [localHex, setLocalHex] = useState(hex);
  const [localR, setLocalR] = useState(String(r));
  const [localG, setLocalG] = useState(String(g));
  const [localB, setLocalB] = useState(String(b));
  const [localOpacity, setLocalOpacity] = useState(`${opacity}%`);

  useEffect(() => { setLocalHex(hex); }, [hex]);
  useEffect(() => { setLocalR(String(r)); }, [r]);
  useEffect(() => { setLocalG(String(g)); }, [g]);
  useEffect(() => { setLocalB(String(b)); }, [b]);
  useEffect(() => { setLocalOpacity(`${opacity}%`); }, [opacity]);

  const commitHex = useCallback(() => { onHexChange?.(localHex); }, [localHex, onHexChange]);
  const commitRgb = useCallback(() => {
    onRgbChange?.(
      Math.max(0, Math.min(255, parseInt(localR) || 0)),
      Math.max(0, Math.min(255, parseInt(localG) || 0)),
      Math.max(0, Math.min(255, parseInt(localB) || 0)),
    );
  }, [localR, localG, localB, onRgbChange]);
  const commitOpacity = useCallback(() => {
    onOpacityChange?.(Math.max(0, Math.min(100, parseInt(localOpacity) || 0)));
  }, [localOpacity, onOpacityChange]);

  return (
    <div className={cn('fds-color-config', className)} {...props}>
      {/* Mode selector — SelectInput, 78px, no label */}
      <div ref={modeRef} className="fds-color-config__mode">
        <SelectInput
          label=""
          value={mode}
          isOpen={modeOpen}
          onClick={() => setModeOpen(!modeOpen)}
        >
          {modeOpen && (
            <DropdownMenu>
              <ActionListItemGroup>
                <ActionListItem
                  title="Hex"
                  selectionType="Single"
                  isSelected={mode === 'Hex'}
                  onClick={() => { onModeChange?.('Hex'); setModeOpen(false); }}
                />
                <ActionListItem
                  title="RGB"
                  selectionType="Single"
                  isSelected={mode === 'RGB'}
                  onClick={() => { onModeChange?.('RGB'); setModeOpen(false); }}
                />
              </ActionListItemGroup>
            </DropdownMenu>
          )}
        </SelectInput>
      </div>

      {mode === 'Hex' ? (
        /* Hex: single TextInput */
        <div className="fds-color-config__hex">
          <TextInput
            label=""
            value={localHex}
            onChange={(meta) => setLocalHex(meta.value)}
            onBlur={() => commitHex()}
            maxCharacters={7}
          />
        </div>
      ) : (
        /* RGB: 3 value inputs + opacity, gap spacing/2 */
        <div className="fds-color-config__rgb">
          <TextInput
            label=""
            value={localR}
            onChange={(meta) => setLocalR(meta.value)}
            onBlur={() => commitRgb()}
          />
          <TextInput
            label=""
            value={localG}
            onChange={(meta) => setLocalG(meta.value)}
            onBlur={() => commitRgb()}
          />
          <TextInput
            label=""
            value={localB}
            onChange={(meta) => setLocalB(meta.value)}
            onBlur={() => commitRgb()}
          />
          <TextInput
            label=""
            value={localOpacity}
            onChange={(meta) => setLocalOpacity(meta.value)}
            onBlur={() => commitOpacity()}
          />
        </div>
      )}
    </div>
  );
}

ColorConfig.displayName = 'ColorConfig';
