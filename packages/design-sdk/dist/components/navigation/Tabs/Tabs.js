import { jsx as E, jsxs as j } from "react/jsx-runtime";
import { forwardRef as N, useId as P, useRef as S, useCallback as c, useMemo as H, Children as T, isValidElement as B } from "react";
import { cn as F } from "../../../utils/cn.js";
import { useControllableState as O } from "../../../hooks/useControllableState.js";
import { TabsContext as U } from "./TabsContext.js";
import { TabIndicator as q } from "./TabIndicator.js";
/* empty css         */
function G(i) {
  let o;
  return T.forEach(i, (l) => {
    if (o !== void 0 || !B(l)) return;
    const r = l.props;
    typeof r.value == "string" && !r.isDisabled && (o = r.value);
  }), o;
}
const J = N(
  ({
    value: i,
    defaultValue: o,
    onChange: l,
    variant: r = "Bordered",
    size: d = "Medium",
    orientation: s = "Horizontal",
    isFullWidthTabItem: u = !1,
    className: I,
    children: m,
    onKeyDown: f,
    ...g
  }, k) => {
    const z = P(), p = g.id ?? `fds-tabs-${z}`, [h, w] = O({
      value: i,
      defaultValue: o,
      onChange: l
    }), n = S(/* @__PURE__ */ new Map()), x = c((e, t) => {
      t ? n.current.set(e, t) : n.current.delete(e);
    }, []), C = c(
      (e) => n.current.get(e),
      []
    ), v = H(
      () => G(m),
      [m]
    ), a = c(
      (e, t) => {
        if (e.length === 0) return;
        e[(t + e.length) % e.length].focus();
      },
      []
    ), L = c(
      (e) => {
        if (f == null || f(e), e.defaultPrevented) return;
        const t = Array.from(n.current.values()).filter(
          (M) => !M.disabled
        );
        if (t.length === 0) return;
        const b = document.activeElement, y = b ? t.indexOf(b) : -1, A = s === "Horizontal", $ = A ? "ArrowRight" : "ArrowDown", D = A ? "ArrowLeft" : "ArrowUp";
        e.key === $ ? (e.preventDefault(), a(t, y + 1)) : e.key === D ? (e.preventDefault(), a(t, y - 1)) : e.key === "Home" ? (e.preventDefault(), a(t, 0)) : e.key === "End" && (e.preventDefault(), a(t, t.length - 1));
      },
      [a, f, s]
    ), R = H(
      () => ({
        selectedValue: h,
        setSelectedValue: w,
        variant: r,
        size: d,
        orientation: s,
        isFullWidthTabItem: u,
        baseId: p,
        registerItem: x,
        getItemEl: C,
        firstFocusableValue: v
      }),
      [
        h,
        w,
        r,
        d,
        s,
        u,
        p,
        x,
        C,
        v
      ]
    ), V = F(
      "fds-tabs",
      `fds-tabs--variant-${r.toLowerCase()}`,
      `fds-tabs--orientation-${s.toLowerCase()}`,
      `fds-tabs--size-${d.toLowerCase()}`,
      s === "Horizontal" && u && "fds-tabs--full-width",
      I
    );
    return /* @__PURE__ */ E(U.Provider, { value: R, children: /* @__PURE__ */ j(
      "div",
      {
        ref: k,
        role: "tablist",
        "aria-orientation": s === "Horizontal" ? "horizontal" : "vertical",
        className: V,
        onKeyDown: L,
        ...g,
        id: p,
        children: [
          m,
          /* @__PURE__ */ E(q, {})
        ]
      }
    ) });
  }
);
J.displayName = "Tabs";
export {
  J as Tabs
};
