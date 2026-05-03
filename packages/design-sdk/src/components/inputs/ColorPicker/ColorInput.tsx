import { useState, useRef, useCallback, useEffect, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import type { HTMLAttributes, KeyboardEvent } from 'react';
import { cn } from '../../../utils/cn';
import { useDropdownPortal } from '../../../hooks/useDropdownPortal';
import { InputFieldHeader } from '../../forms/InputFieldHeader/InputFieldHeader';
import { InputFieldFooter } from '../../forms/InputFieldFooter/InputFieldFooter';
import { ColorPicker, type ColorPickerTab } from './ColorPicker';
import type { ColorPaletteData } from './ColorPalette';
import type { ColorConfigMode } from './ColorConfig';
import { hexToRgb, rgbToHsb, hsbToRgb, rgbToHex } from './colorUtils';
import './ColorInput.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════════════════════
   ColorInput — InputFieldHeader + field (input + swatch) + InputFieldFooter
   Figma: 3071:11289
   ═══════════════════════════════════════════════════════════════════════════ */

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  (
    {
      label,
      value = '',
      onChange,
      placeholder = 'Enter color hex code',
      helpText,
      errorText,
      validationState = 'none',
      isDisabled = false,
      palettes,
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { portalRef, pos } = useDropdownPortal(containerRef, isOpen, () => setIsOpen(false), 8);

    /* ── Derived color state ───────────────────────────────────────────── */
    const rgb = hexToRgb(value || '#000000');
    const [r, g, b] = rgb ?? [0, 0, 0];
    const [hue, sat, bri] = rgbToHsb(r, g, b);
    const [opacity, setOpacity] = useState(100);
    const [configMode, setConfigMode] = useState<ColorConfigMode>('Hex');
    const [tab, setTab] = useState<ColorPickerTab>('Presets');

    const isError = validationState === 'error';
    const footerText = isError ? errorText : helpText;
    const hasValue = !!value;
    const closedByKeyboard = useRef(false);

    /* ── Focus management ──────────────────────────────────────────────── */
    const prevOpen = useRef(isOpen);
    useEffect(() => {
      if (!prevOpen.current && isOpen) {
        requestAnimationFrame(() => {
          const first = portalRef.current?.querySelector<HTMLElement>('button:not([disabled]), input:not([disabled])');
          first?.focus();
        });
      }
      if (prevOpen.current && !isOpen && closedByKeyboard.current) {
        closedByKeyboard.current = false;
        requestAnimationFrame(() => {
          const field = containerRef.current?.querySelector<HTMLElement>('.fds-color-input__field');
          field?.focus();
        });
      }
      prevOpen.current = isOpen;
    }, [isOpen]);

    /* ── Keyboard handler ──────────────────────────────────────────────── */
    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      const target = e.target as HTMLElement;
      const isOnField = target.closest('.fds-color-input__field') !== null;

      if (!isOnField) {
        if (e.key === 'Escape' && isOpen) {
          e.preventDefault();
          e.stopPropagation();
          closedByKeyboard.current = true;
          setIsOpen(false);
        }
        return;
      }

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          setIsOpen(!isOpen);
          break;
        case 'Escape':
          if (isOpen) {
            e.preventDefault();
            e.stopPropagation();
            closedByKeyboard.current = true;
            setIsOpen(false);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) setIsOpen(true);
          break;
      }
    }, [isDisabled, isOpen]);

    /* ── Color change handlers ─────────────────────────────────────────── */
    const commitColor = useCallback((hex: string) => {
      onChange?.(hex);
    }, [onChange]);

    const handlePresetSelect = useCallback((color: string) => {
      commitColor(color.toUpperCase());
    }, [commitColor]);

    const handleHueChange = useCallback((h: number) => {
      const [nr, ng, nb] = hsbToRgb(h, sat, bri);
      commitColor(rgbToHex(nr, ng, nb));
    }, [sat, bri, commitColor]);

    const handleSatBriChange = useCallback((s: number, br: number) => {
      const [nr, ng, nb] = hsbToRgb(hue, s, br);
      commitColor(rgbToHex(nr, ng, nb));
    }, [hue, commitColor]);

    const handleRgbChange = useCallback((nr: number, ng: number, nb: number) => {
      commitColor(rgbToHex(nr, ng, nb));
    }, [commitColor]);

    const handlePanelHexChange = useCallback((hex: string) => {
      const parsed = hexToRgb(hex);
      if (parsed) commitColor(rgbToHex(...parsed));
    }, [commitColor]);

    return (
      <div ref={containerRef} className={cn('fds-color-input', className)} onKeyDown={handleKeyDown} {...props}>
        {label && <InputFieldHeader label={label} />}

        {/* Field — matches TextInput field structure */}
        <div
          className={cn(
            'fds-color-input__field',
            isOpen && 'fds-color-input__field--open',
            isError && 'fds-color-input__field--error',
            isDisabled && 'fds-color-input__field--disabled',
          )}
          tabIndex={isDisabled ? -1 : 0}
          role="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onClick={() => { if (!isDisabled) setIsOpen(!isOpen); }}
        >
          <span
            ref={ref as React.Ref<HTMLSpanElement>}
            className={cn(
              'fds-color-input__value BodyMediumRegular',
              !hasValue && 'fds-color-input__value--placeholder',
            )}
          >
            {hasValue ? value : placeholder}
          </span>
          <span className="fds-color-input__swatch">
            {hasValue && (
              <span
                className="fds-color-input__swatch-fill"
                style={{ background: `rgba(${r},${g},${b},${opacity / 100})` }}
              />
            )}
          </span>
        </div>

        {footerText && (
          <InputFieldFooter
            helpText={footerText}
            state={isError ? 'error' : 'default'}
          />
        )}

        {isOpen && pos && typeof document !== 'undefined' &&
          createPortal(
            <div
              ref={portalRef}
              className="fds-color-input__popover"
              style={{ top: pos.top, left: pos.left }}
            >
              <ColorPicker
                activeTab={tab}
                onTabChange={setTab}
                hue={hue}
                saturation={sat}
                brightness={bri}
                opacity={opacity}
                r={r}
                g={g}
                b={b}
                hex={value || '#000000'}
                configMode={configMode}
                onHueChange={handleHueChange}
                onSaturationBrightnessChange={handleSatBriChange}
                onOpacityChange={setOpacity}
                onRgbChange={handleRgbChange}
                onHexChange={handlePanelHexChange}
                onConfigModeChange={setConfigMode}
                onColorSelect={handlePresetSelect}
                palettes={palettes}
                selectedColor={value}
              />
            </div>,
            document.body,
          )
        }
      </div>
    );
  },
);

ColorInput.displayName = 'ColorInput';
