import { jsxs as f, jsx as l } from "react/jsx-runtime";
import { useRef as p, useCallback as M } from "react";
import { cn as A } from "../../../utils/cn.js";
import { ColorConfig as G } from "./ColorConfig.js";
/* empty css                     */
function I({
  hue: _ = 0,
  saturation: h = 100,
  brightness: w = 100,
  opacity: $ = 100,
  r: m = 255,
  g: a = 0,
  b: u = 0,
  hex: b = "#FF0000",
  configMode: x = "Hex",
  onHueChange: i,
  onSaturationBrightnessChange: v,
  onOpacityChange: d,
  onRgbChange: R,
  onHexChange: D,
  onConfigModeChange: X,
  className: P,
  ...y
}) {
  const E = p(null), L = p(null), N = p(null), U = M(
    (r) => {
      var c;
      const e = (c = E.current) == null ? void 0 : c.getBoundingClientRect();
      if (!e) return;
      const t = (o, Y) => {
        const q = Math.max(0, Math.min(100, (o - e.left) / e.width * 100)), z = Math.max(0, Math.min(100, 100 - (Y - e.top) / e.height * 100));
        v == null || v(q, z);
      };
      t(r.clientX, r.clientY);
      const n = (o) => t(o.clientX, o.clientY), s = () => {
        document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", s);
      };
      document.addEventListener("mousemove", n), document.addEventListener("mouseup", s);
    },
    [v]
  ), j = M(
    (r) => {
      var c;
      const e = (c = L.current) == null ? void 0 : c.getBoundingClientRect();
      if (!e) return;
      const t = (o) => {
        i == null || i(Math.round(Math.max(0, Math.min(360, (o - e.left) / e.width * 360))));
      };
      t(r.clientX);
      const n = (o) => t(o.clientX), s = () => {
        document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", s);
      };
      document.addEventListener("mousemove", n), document.addEventListener("mouseup", s);
    },
    [i]
  ), F = M(
    (r) => {
      var c;
      const e = (c = N.current) == null ? void 0 : c.getBoundingClientRect();
      if (!e) return;
      const t = (o) => {
        d == null || d(Math.round(Math.max(0, Math.min(100, (o - e.left) / e.width * 100))));
      };
      t(r.clientX);
      const n = (o) => t(o.clientX), s = () => {
        document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", s);
      };
      document.addEventListener("mousemove", n), document.addEventListener("mouseup", s);
    },
    [d]
  ), k = `hsl(${_}, 100%, 50%)`;
  return /* @__PURE__ */ f("div", { className: A("fds-color-panel", P), ...y, children: [
    /* @__PURE__ */ f(
      "div",
      {
        ref: E,
        className: "fds-color-panel__canvas",
        style: { background: k },
        onMouseDown: U,
        children: [
          /* @__PURE__ */ l("div", { className: "fds-color-panel__canvas-white" }),
          /* @__PURE__ */ l("div", { className: "fds-color-panel__canvas-black" }),
          /* @__PURE__ */ l(
            "div",
            {
              className: "fds-color-panel__picker",
              style: { left: `${h}%`, top: `${100 - w}%` }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ f("div", { ref: L, className: "fds-color-panel__hue", onMouseDown: j, children: [
      /* @__PURE__ */ l("div", { className: "fds-color-panel__hue-track" }),
      /* @__PURE__ */ l("div", { className: "fds-color-panel__slider-thumb", style: { left: `${_ / 360 * 100}%`, backgroundColor: k } })
    ] }),
    /* @__PURE__ */ f("div", { ref: N, className: "fds-color-panel__opacity", onMouseDown: F, children: [
      /* @__PURE__ */ l(
        "div",
        {
          className: "fds-color-panel__opacity-track",
          style: { background: `linear-gradient(to right, rgba(${m},${a},${u},0), rgb(${m},${a},${u}))` }
        }
      ),
      /* @__PURE__ */ l("div", { className: "fds-color-panel__slider-thumb", style: { left: `${$}%`, backgroundColor: `rgb(${m},${a},${u})` } })
    ] }),
    /* @__PURE__ */ l(
      G,
      {
        mode: x,
        hex: b,
        r: m,
        g: a,
        b: u,
        opacity: $,
        onModeChange: X,
        onHexChange: D,
        onRgbChange: R,
        onOpacityChange: d
      }
    )
  ] });
}
I.displayName = "ColorPickerPanel";
export {
  I as ColorPickerPanel
};
