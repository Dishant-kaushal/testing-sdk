import { jsxs as i, jsx as e } from "react/jsx-runtime";
import { useState as G, useCallback as I } from "react";
import { cn as q } from "../../../utils/cn.js";
import { SwitchButtonBase as m } from "../../actions/SwitchButton/SwitchButtonBase.js";
import { SwitchButtonGroup as z } from "../../actions/SwitchButton/SwitchButtonGroup.js";
import { ColorPickerPresets as D } from "./ColorPickerPresets.js";
import { ColorPickerPanel as E } from "./ColorPickerPanel.js";
/* empty css                */
function F({
  activeTab: s,
  onTabChange: r,
  hue: l,
  saturation: p,
  brightness: a,
  opacity: f,
  r: u,
  g: P,
  b: n,
  hex: k,
  configMode: d,
  onHueChange: C,
  onSaturationBrightnessChange: v,
  onOpacityChange: x,
  onRgbChange: y,
  onHexChange: B,
  onConfigModeChange: N,
  onColorSelect: S,
  palettes: h,
  selectedColor: j,
  className: w,
  ...A
}) {
  const [_, b] = G("Presets"), t = s ?? _, o = I((c) => {
    s || b(c), r == null || r(c);
  }, [s, r]);
  return /* @__PURE__ */ i("div", { className: q("fds-color-picker", w), ...A, children: [
    /* @__PURE__ */ i(z, { children: [
      /* @__PURE__ */ e(
        m,
        {
          type: "Text",
          label: "Presets",
          isActive: t === "Presets",
          onClick: () => o("Presets")
        }
      ),
      /* @__PURE__ */ e(
        m,
        {
          type: "Text",
          label: "Custom",
          isActive: t === "Custom",
          onClick: () => o("Custom")
        }
      )
    ] }),
    /* @__PURE__ */ i("div", { className: "fds-color-picker__panel", children: [
      t === "Presets" && /* @__PURE__ */ e(
        D,
        {
          palettes: h,
          selectedColor: j,
          onColorSelect: S
        }
      ),
      t === "Custom" && /* @__PURE__ */ e(
        E,
        {
          hue: l,
          saturation: p,
          brightness: a,
          opacity: f,
          r: u,
          g: P,
          b: n,
          hex: k,
          configMode: d,
          onHueChange: C,
          onSaturationBrightnessChange: v,
          onOpacityChange: x,
          onRgbChange: y,
          onHexChange: B,
          onConfigModeChange: N
        }
      )
    ] })
  ] });
}
F.displayName = "ColorPicker";
export {
  F as ColorPicker
};
