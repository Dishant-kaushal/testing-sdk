import { jsxs as S, jsx as n } from "react/jsx-runtime";
import { forwardRef as te, useState as d, useRef as v, useEffect as re, useCallback as s } from "react";
import { createPortal as ne } from "react-dom";
import { cn as H } from "../../../utils/cn.js";
import { useDropdownPortal as se } from "../../../hooks/useDropdownPortal.js";
import { InputFieldHeader as ae } from "../../forms/InputFieldHeader/InputFieldHeader.js";
import { InputFieldFooter as ce } from "../../forms/InputFieldFooter/InputFieldFooter.js";
import { ColorPicker as le } from "./ColorPicker.js";
import { hexToRgb as E, rgbToHsb as ie, hsbToRgb as I, rgbToHex as u } from "./colorUtils.js";
/* empty css               */
const pe = te(
  ({
    label: P,
    value: l = "",
    onChange: p,
    placeholder: q = "Enter color hex code",
    helpText: B,
    errorText: D,
    validationState: M = "none",
    isDisabled: i = !1,
    palettes: $,
    className: A,
    ...K
  }, j) => {
    const [o, a] = d(!1), m = v(null), { portalRef: F, pos: h } = se(m, o, () => a(!1), 8), U = E(l || "#000000"), [g, b, _] = U ?? [0, 0, 0], [y, C, x] = ie(g, b, _), [N, V] = d(100), [z, G] = d("Hex"), [J, L] = d("Presets"), k = M === "error", O = k ? D : B, w = !!l, f = v(!1), R = v(o);
    re(() => {
      !R.current && o && requestAnimationFrame(() => {
        var t;
        const e = (t = F.current) == null ? void 0 : t.querySelector("button:not([disabled]), input:not([disabled])");
        e == null || e.focus();
      }), R.current && !o && f.current && (f.current = !1, requestAnimationFrame(() => {
        var t;
        const e = (t = m.current) == null ? void 0 : t.querySelector(".fds-color-input__field");
        e == null || e.focus();
      })), R.current = o;
    }, [o]);
    const Q = s((e) => {
      if (i) return;
      if (!(e.target.closest(".fds-color-input__field") !== null)) {
        e.key === "Escape" && o && (e.preventDefault(), e.stopPropagation(), f.current = !0, a(!1));
        return;
      }
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault(), a(!o);
          break;
        case "Escape":
          o && (e.preventDefault(), e.stopPropagation(), f.current = !0, a(!1));
          break;
        case "ArrowDown":
          e.preventDefault(), o || a(!0);
          break;
      }
    }, [i, o]), r = s((e) => {
      p == null || p(e);
    }, [p]), W = s((e) => {
      r(e.toUpperCase());
    }, [r]), X = s((e) => {
      const [t, c, T] = I(e, C, x);
      r(u(t, c, T));
    }, [C, x, r]), Y = s((e, t) => {
      const [c, T, oe] = I(y, e, t);
      r(u(c, T, oe));
    }, [y, r]), Z = s((e, t, c) => {
      r(u(e, t, c));
    }, [r]), ee = s((e) => {
      const t = E(e);
      t && r(u(...t));
    }, [r]);
    return /* @__PURE__ */ S("div", { ref: m, className: H("fds-color-input", A), onKeyDown: Q, ...K, children: [
      P && /* @__PURE__ */ n(ae, { label: P }),
      /* @__PURE__ */ S(
        "div",
        {
          className: H(
            "fds-color-input__field",
            o && "fds-color-input__field--open",
            k && "fds-color-input__field--error",
            i && "fds-color-input__field--disabled"
          ),
          tabIndex: i ? -1 : 0,
          role: "button",
          "aria-haspopup": "dialog",
          "aria-expanded": o,
          onClick: () => {
            i || a(!o);
          },
          children: [
            /* @__PURE__ */ n(
              "span",
              {
                ref: j,
                className: H(
                  "fds-color-input__value BodyMediumRegular",
                  !w && "fds-color-input__value--placeholder"
                ),
                children: w ? l : q
              }
            ),
            /* @__PURE__ */ n("span", { className: "fds-color-input__swatch", children: w && /* @__PURE__ */ n(
              "span",
              {
                className: "fds-color-input__swatch-fill",
                style: { background: `rgba(${g},${b},${_},${N / 100})` }
              }
            ) })
          ]
        }
      ),
      O && /* @__PURE__ */ n(
        ce,
        {
          helpText: O,
          state: k ? "error" : "default"
        }
      ),
      o && h && typeof document < "u" && ne(
        /* @__PURE__ */ n(
          "div",
          {
            ref: F,
            className: "fds-color-input__popover",
            style: { top: h.top, left: h.left },
            children: /* @__PURE__ */ n(
              le,
              {
                activeTab: J,
                onTabChange: L,
                hue: y,
                saturation: C,
                brightness: x,
                opacity: N,
                r: g,
                g: b,
                b: _,
                hex: l || "#000000",
                configMode: z,
                onHueChange: X,
                onSaturationBrightnessChange: Y,
                onOpacityChange: V,
                onRgbChange: Z,
                onHexChange: ee,
                onConfigModeChange: G,
                onColorSelect: W,
                palettes: $,
                selectedColor: l
              }
            )
          }
        ),
        document.body
      )
    ] });
  }
);
pe.displayName = "ColorInput";
export {
  pe as ColorInput
};
