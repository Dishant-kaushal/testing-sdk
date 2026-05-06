import { jsxs as N, jsx as _ } from "react/jsx-runtime";
import { forwardRef as tt, useId as et, useState as x, useCallback as i, useEffect as D, useRef as g, useLayoutEffect as ot, useMemo as rt } from "react";
import { createPortal as st } from "react-dom";
import { cn as V } from "../../../utils/cn.js";
import { useKeyboard as nt } from "../../../hooks/useKeyboard.js";
import { PopoverContext as ct } from "./PopoverContext.js";
/* empty css            */
const lt = {
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
}, s = 8, ut = 150, it = 100, Z = 'button:not(:disabled),a[href],[tabindex]:not([tabindex="-1"]),input:not(:disabled),select:not(:disabled),textarea:not(:disabled)';
function dt(u, w, y) {
  const d = u.width, S = u.height, n = w.width, e = w.height, o = u.left, l = u.top, a = u.right, f = u.bottom;
  switch (y) {
    case "Top":
      return { top: l - e - s, left: o + d / 2 - n / 2 };
    case "Top Start":
      return { top: l - e - s, left: o };
    case "Top End":
      return { top: l - e - s, left: a - n };
    case "Bottom":
      return { top: f + s, left: o + d / 2 - n / 2 };
    case "Bottom Start":
      return { top: f + s, left: o };
    case "Bottom End":
      return { top: f + s, left: a - n };
    case "Left":
      return { top: l + S / 2 - e / 2, left: o - n - s };
    case "Left Start":
      return { top: l, left: o - n - s };
    case "Left End":
      return { top: f - e, left: o - n - s };
    case "Right":
      return { top: l + S / 2 - e / 2, left: a + s };
    case "Right Start":
      return { top: l, left: a + s };
    case "Right End":
      return { top: f - e, left: a + s };
  }
}
const at = tt(
  ({
    trigger: u,
    children: w,
    isOpen: y,
    onOpenChange: d,
    defaultOpen: S = !1,
    placement: n = "Bottom",
    openInteraction: e = "click",
    initialFocusRef: o,
    zIndex: l,
    className: a,
    id: f,
    "aria-label": z,
    ...G
  }, T) => {
    const O = et(), H = f ?? `${O}-panel`, B = y !== void 0, [U, Y] = x(S), r = B ? y : U, m = i(
      (t) => {
        B || Y(t), d == null || d(t);
      },
      [B, d]
    ), p = i(() => m(!1), [m]), [R, K] = x(r), [$, P] = x(!1);
    D(() => {
      if (r)
        K(!0), P(!1);
      else if (R) {
        P(!0);
        const t = setTimeout(() => {
          K(!1), P(!1);
        }, ut);
        return () => clearTimeout(t);
      }
    }, [r]);
    const J = g(null), M = g(null), h = g(null), q = g(null), [A, j] = x(null);
    ot(() => {
      if (!R) {
        j(null);
        return;
      }
      const t = () => {
        if (!M.current || !h.current) return;
        const c = M.current.getBoundingClientRect(), v = h.current.getBoundingClientRect();
        j(dt(c, v, n));
      };
      return t(), window.addEventListener("scroll", t, !0), window.addEventListener("resize", t), () => {
        window.removeEventListener("scroll", t, !0), window.removeEventListener("resize", t);
      };
    }, [R, n]), D(() => {
      if (!r) return;
      const t = (c) => {
        var L, b;
        const v = c.target;
        (L = M.current) != null && L.contains(v) || (b = h.current) != null && b.contains(v) || p();
      };
      return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
    }, [r, p]), nt("Escape", p, r), D(() => {
      if (r && e !== "hover")
        return q.current = document.activeElement, requestAnimationFrame(() => {
          var c;
          const t = (o == null ? void 0 : o.current) ?? ((c = h.current) == null ? void 0 : c.querySelector(Z));
          t == null || t.focus();
        }), () => {
          var t;
          (t = q.current) == null || t.focus();
        };
    }, [r, e, o]);
    const Q = i((t) => {
      var b;
      if (t.key !== "Tab") return;
      const c = Array.from(
        ((b = h.current) == null ? void 0 : b.querySelectorAll(Z)) ?? []
      );
      if (!c.length) return;
      const v = c[0], L = c[c.length - 1];
      t.shiftKey && document.activeElement === v ? (t.preventDefault(), L.focus()) : !t.shiftKey && document.activeElement === L && (t.preventDefault(), v.focus());
    }, []), W = i(() => {
      e === "click" && m(!r);
    }, [e, r, m]), C = g(null), E = i(() => {
      C.current && (clearTimeout(C.current), C.current = null);
    }, []), k = i(() => {
      E(), C.current = setTimeout(p, it);
    }, [E, p]), X = i(() => {
      e === "hover" && (E(), m(!0));
    }, [e, E, m]), F = i(() => {
      e === "hover" && k();
    }, [e, k]), I = rt(() => ({ close: p }), [p]);
    return /* @__PURE__ */ N(
      "div",
      {
        ref: (t) => {
          J.current = t, typeof T == "function" ? T(t) : T && (T.current = t);
        },
        className: V("fds-popover", a),
        ...G,
        children: [
          /* @__PURE__ */ _(
            "div",
            {
              ref: M,
              className: "fds-popover__trigger",
              onClick: W,
              onMouseEnter: X,
              onMouseLeave: F,
              "aria-expanded": r,
              "aria-controls": r ? H : void 0,
              "aria-haspopup": "dialog",
              children: u
            }
          ),
          R && typeof document < "u" && st(
            /* @__PURE__ */ _(ct.Provider, { value: I, children: /* @__PURE__ */ N(
              "div",
              {
                ref: h,
                id: H,
                role: "dialog",
                "aria-label": z,
                onKeyDown: Q,
                onMouseEnter: e === "hover" ? E : void 0,
                onMouseLeave: e === "hover" ? k : void 0,
                className: V(
                  "fds-popover__panel",
                  lt[n],
                  $ && "fds-popover__panel--exiting"
                ),
                style: A ? { top: A.top, left: A.left, ...l !== void 0 && { zIndex: l } } : { top: 0, left: 0, visibility: "hidden" },
                children: [
                  /* @__PURE__ */ N(
                    "svg",
                    {
                      className: "fds-popover__arrow",
                      viewBox: "0 0 25.8 12.4858",
                      "aria-hidden": "true",
                      focusable: "false",
                      children: [
                        /* @__PURE__ */ _(
                          "path",
                          {
                            d: "M12.1929 12.1929L0 0H25.8L13.6071 12.1929C13.2166 12.5834 12.5834 12.5834 12.1929 12.1929Z",
                            fill: "var(--background-surface-intense)"
                          }
                        ),
                        /* @__PURE__ */ _(
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
                  w
                ]
              }
            ) }),
            document.body
          )
        ]
      }
    );
  }
);
at.displayName = "Popover";
export {
  at as Popover
};
