import { jsxs as n, jsx as e } from "react/jsx-runtime";
import { useId as B, useState as S, useRef as T, useCallback as h, useEffect as y, isValidElement as L, cloneElement as M } from "react";
import { cn as b } from "../../../utils/cn.js";
import { useKeyboard as x } from "../../../hooks/useKeyboard.js";
/* empty css            */
const C = {
  Top: "fds-tooltip--top",
  TopStart: "fds-tooltip--top-start",
  TopEnd: "fds-tooltip--top-end",
  Bottom: "fds-tooltip--bottom",
  BottomStart: "fds-tooltip--bottom-start",
  BottomEnd: "fds-tooltip--bottom-end",
  Left: "fds-tooltip--left",
  Right: "fds-tooltip--right"
};
function I({
  bodyText: w,
  heading: p,
  placement: g = "Top",
  isOpen: t,
  showDelay: a = 200,
  hideDelay: m = 0,
  maxWidth: o,
  children: i,
  className: E,
  ..._
}) {
  const c = B(), [N, u] = S(!1), s = T(void 0), r = T(void 0), d = t ?? N, f = h(() => {
    clearTimeout(r.current), s.current = setTimeout(() => u(!0), a);
  }, [a]), l = h(() => {
    clearTimeout(s.current), r.current = setTimeout(() => u(!1), m);
  }, [m]);
  y(() => () => {
    clearTimeout(s.current), clearTimeout(r.current);
  }, []), x("Escape", l, d);
  let v = i;
  return L(i) && (v = M(i, {
    "aria-describedby": d ? c : void 0
  })), /* @__PURE__ */ n(
    "span",
    {
      className: b("fds-tooltip-wrapper", E),
      onMouseEnter: t === void 0 ? f : void 0,
      onMouseLeave: t === void 0 ? l : void 0,
      onFocus: t === void 0 ? f : void 0,
      onBlur: t === void 0 ? l : void 0,
      ..._,
      children: [
        v,
        d && /* @__PURE__ */ n(
          "div",
          {
            className: b("fds-tooltip", C[g]),
            role: "tooltip",
            id: c,
            style: o ? { "--fds-tooltip-max-width": typeof o == "number" ? `${o}px` : o } : void 0,
            children: [
              /* @__PURE__ */ n("div", { className: "fds-tooltip__content", children: [
                p && /* @__PURE__ */ e("span", { className: "fds-tooltip__heading BodyMediumSemibold", children: p }),
                /* @__PURE__ */ e("span", { className: "fds-tooltip__body BodySmallRegular", children: w })
              ] }),
              /* @__PURE__ */ e(
                "svg",
                {
                  className: "fds-tooltip__arrow",
                  width: "14",
                  height: "8",
                  viewBox: "0 0 14 8",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ e("path", { d: "M7 0L14 8H0L7 0Z", fill: "currentColor" })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
I.displayName = "Tooltip";
export {
  I as Tooltip
};
