import { jsxs as F, jsx as s } from "react/jsx-runtime";
import { forwardRef as ee, useState as d, useRef as w, useEffect as oe, useCallback as a } from "react";
import { cn as H } from "../../../utils/cn.js";
import { useClickOutside as te } from "../../../hooks/useClickOutside.js";
import { InputFieldHeader as re } from "../../forms/InputFieldHeader/InputFieldHeader.js";
import { InputFieldFooter as ne } from "../../forms/InputFieldFooter/InputFieldFooter.js";
import { ColorPicker as se } from "./ColorPicker.js";
import { hexToRgb as N, rgbToHsb as ae, hsbToRgb as E, rgbToHex as h } from "./colorUtils.js";
/* empty css               */
const ce = ee(
  ({
    label: O,
    value: l = "",
    onChange: u,
    placeholder: I = "Enter color hex code",
    helpText: P,
    errorText: q,
    validationState: B = "none",
    isDisabled: i = !1,
    palettes: M,
    className: $,
    ...A
  }, D) => {
    const [t, c] = d(!1), f = w(null);
    te(f, () => {
      t && c(!1);
    });
    const K = N(l || "#000000"), [m, g, b] = K ?? [0, 0, 0], [_, C, y] = ae(m, g, b), [R, j] = d(100), [U, V] = d("Hex"), [z, G] = d("Presets"), x = B === "error", S = x ? q : P, k = !!l, p = w(!1), T = w(t);
    oe(() => {
      !T.current && t && requestAnimationFrame(() => {
        var n;
        const e = (n = f.current) == null ? void 0 : n.querySelector(".fds-color-input__popover"), o = e == null ? void 0 : e.querySelector("button:not([disabled]), input:not([disabled])");
        o == null || o.focus();
      }), T.current && !t && p.current && (p.current = !1, requestAnimationFrame(() => {
        var o;
        const e = (o = f.current) == null ? void 0 : o.querySelector(".fds-color-input__field");
        e == null || e.focus();
      })), T.current = t;
    }, [t]);
    const J = a((e) => {
      if (i) return;
      if (!(e.target.closest(".fds-color-input__field") !== null)) {
        e.key === "Escape" && t && (e.preventDefault(), e.stopPropagation(), p.current = !0, c(!1));
        return;
      }
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault(), c(!t);
          break;
        case "Escape":
          t && (e.preventDefault(), e.stopPropagation(), p.current = !0, c(!1));
          break;
        case "ArrowDown":
          e.preventDefault(), t || c(!0);
          break;
      }
    }, [i, t]), r = a((e) => {
      u == null || u(e);
    }, [u]), L = a((e) => {
      r(e.toUpperCase());
    }, [r]), Q = a((e) => {
      const [o, n, v] = E(e, C, y);
      r(h(o, n, v));
    }, [C, y, r]), W = a((e, o) => {
      const [n, v, Z] = E(_, e, o);
      r(h(n, v, Z));
    }, [_, r]), X = a((e, o, n) => {
      r(h(e, o, n));
    }, [r]), Y = a((e) => {
      const o = N(e);
      o && r(h(...o));
    }, [r]);
    return /* @__PURE__ */ F("div", { ref: f, className: H("fds-color-input", $), onKeyDown: J, ...A, children: [
      O && /* @__PURE__ */ s(re, { label: O }),
      /* @__PURE__ */ F(
        "div",
        {
          className: H(
            "fds-color-input__field",
            t && "fds-color-input__field--open",
            x && "fds-color-input__field--error",
            i && "fds-color-input__field--disabled"
          ),
          tabIndex: i ? -1 : 0,
          role: "button",
          "aria-haspopup": "dialog",
          "aria-expanded": t,
          onClick: () => {
            i || c(!t);
          },
          children: [
            /* @__PURE__ */ s(
              "span",
              {
                ref: D,
                className: H(
                  "fds-color-input__value BodyMediumRegular",
                  !k && "fds-color-input__value--placeholder"
                ),
                children: k ? l : I
              }
            ),
            /* @__PURE__ */ s("span", { className: "fds-color-input__swatch", children: k && /* @__PURE__ */ s(
              "span",
              {
                className: "fds-color-input__swatch-fill",
                style: { background: `rgba(${m},${g},${b},${R / 100})` }
              }
            ) })
          ]
        }
      ),
      S && /* @__PURE__ */ s(
        ne,
        {
          helpText: S,
          state: x ? "error" : "default"
        }
      ),
      t && /* @__PURE__ */ s("div", { className: "fds-color-input__popover", children: /* @__PURE__ */ s(
        se,
        {
          activeTab: z,
          onTabChange: G,
          hue: _,
          saturation: C,
          brightness: y,
          opacity: R,
          r: m,
          g,
          b,
          hex: l || "#000000",
          configMode: U,
          onHueChange: Q,
          onSaturationBrightnessChange: W,
          onOpacityChange: j,
          onRgbChange: X,
          onHexChange: Y,
          onConfigModeChange: V,
          onColorSelect: L,
          palettes: M,
          selectedColor: l
        }
      ) })
    ] });
  }
);
ce.displayName = "ColorInput";
export {
  ce as ColorInput
};
