import { jsxs as i, jsx as a } from "react/jsx-runtime";
import { forwardRef as B, useId as P, useState as T, useCallback as f, useRef as w, useMemo as y } from "react";
import { cn as m } from "../../../utils/cn.js";
import { useClickOutside as I } from "../../../hooks/useClickOutside.js";
import { useKeyboard as M } from "../../../hooks/useKeyboard.js";
import { PopoverContext as H } from "./PopoverContext.js";
/* empty css            */
const j = {
  Top: "fds-popover--top",
  "Top Start": "fds-popover--top-start",
  "Top End": "fds-popover--top-end",
  Right: "fds-popover--right",
  "Right Start": "fds-popover--right-start",
  "Right End": "fds-popover--right-end",
  Bottom: "fds-popover--bottom",
  "Bottom Start": "fds-popover--bottom-start",
  "Bottom End": "fds-popover--bottom-end",
  Left: "fds-popover--left",
  "Left Start": "fds-popover--left-start",
  "Left End": "fds-popover--left-end"
}, A = B(
  ({
    trigger: u,
    children: h,
    isOpen: l,
    onOpenChange: r,
    defaultOpen: L = !1,
    placement: g = "Bottom",
    showArrow: b = !0,
    isDisabled: n = !1,
    className: E,
    id: S,
    ..._
  }, e) => {
    const C = P(), c = S ?? `${C}-panel`, d = l !== void 0, [N, R] = T(L), o = d ? l : N, s = f(
      (t) => {
        n && t || (d || R(t), r == null || r(t));
      },
      [d, r, n]
    ), p = f(() => s(!1), [s]), v = w(null);
    I(v, () => {
      o && p();
    }), M("Escape", p, o);
    const k = f(() => {
      s(!o);
    }, [o, s]), x = y(() => ({ close: p }), [p]);
    return /* @__PURE__ */ i(
      "div",
      {
        ref: (t) => {
          v.current = t, typeof e == "function" ? e(t) : e && (e.current = t);
        },
        className: m("fds-popover", E),
        ..._,
        children: [
          /* @__PURE__ */ a(
            "div",
            {
              className: "fds-popover__trigger",
              onClick: k,
              "aria-expanded": o,
              "aria-controls": o ? c : void 0,
              "aria-haspopup": "dialog",
              children: u
            }
          ),
          o && /* @__PURE__ */ a(H.Provider, { value: x, children: /* @__PURE__ */ i(
            "div",
            {
              id: c,
              role: "dialog",
              className: m("fds-popover__panel", j[g]),
              children: [
                b && /* @__PURE__ */ i(
                  "svg",
                  {
                    className: "fds-popover__arrow",
                    viewBox: "0 0 25.8 12.4858",
                    "aria-hidden": "true",
                    focusable: "false",
                    children: [
                      /* @__PURE__ */ a(
                        "path",
                        {
                          d: "M12.1929 12.1929L0 0H25.8L13.6071 12.1929C13.2166 12.5834 12.5834 12.5834 12.1929 12.1929Z",
                          fill: "var(--background-surface-intense)"
                        }
                      ),
                      /* @__PURE__ */ a(
                        "path",
                        {
                          d: "M1.67285 0.5L11.0166 9.83984C11.5046 10.3273 12.2952 10.3273 12.7832 9.83984L22.127 0.5H22.5928L12.2529 10.8389C12.0577 11.0341 11.7411 11.0341 11.5459 10.8389L1.20703 0.5H1.67285Z",
                          fill: "var(--border-gray-muted)",
                          transform: "translate(1 1)"
                        }
                      )
                    ]
                  }
                ),
                h
              ]
            }
          ) })
        ]
      }
    );
  }
);
A.displayName = "Popover";
export {
  A as Popover
};
