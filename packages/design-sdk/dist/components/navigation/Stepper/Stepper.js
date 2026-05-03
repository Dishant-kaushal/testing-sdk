import { jsx as c } from "react/jsx-runtime";
import { forwardRef as W, Children as I, useMemo as x, isValidElement as P, cloneElement as l } from "react";
import { cn as N } from "../../../utils/cn.js";
import { StepperStep as j } from "./StepperStep.js";
import { StepperContext as v, useStepper as y } from "./StepperContext.js";
/* empty css            */
function E(t) {
  return typeof t != "string" && (t == null ? void 0 : t.displayName) === "Stepper";
}
function T(t) {
  return t === j;
}
function w({
  children: t,
  orientation: r,
  _nestingLevel: n
}) {
  const a = y(), p = x(() => {
    let o = 0;
    const s = (d, u, f) => {
      let S = f;
      return I.map(d, (e, C) => {
        if (!P(e)) return e;
        if (T(e.type)) {
          const h = {
            _index: S++,
            _totalIndex: o++,
            _nestingLevel: u
          };
          return l(e, { ...h, key: C });
        }
        return E(e.type) && u < 3 ? l(e, {
          orientation: r,
          _nestingLevel: u + 1,
          children: s(
            e.props.children,
            u + 1,
            0
          )
        }) : e;
      });
    };
    return {
      childrenWithIndex: n === 0 ? s(t, 0, 0) : t,
      totalIndex: o
    };
  }, [t, n, r]), i = n === 0 ? p.totalIndex : a.totalItemsInParentGroupCount;
  return {
    childrenWithIndex: p.childrenWithIndex,
    totalItemsInParentGroupCount: i
  };
}
const G = W(
  ({
    children: t,
    orientation: r = "vertical",
    _nestingLevel: n = 0,
    className: a,
    ...p
  }, i) => {
    const o = I.count(t), { childrenWithIndex: s, totalItemsInParentGroupCount: m } = w({
      children: t,
      orientation: r,
      _nestingLevel: n
    }), d = x(
      () => ({
        orientation: r,
        itemsInGroupCount: o,
        totalItemsInParentGroupCount: m
      }),
      [r, o, m]
    );
    return /* @__PURE__ */ c(v.Provider, { value: d, children: /* @__PURE__ */ c(
      "div",
      {
        ref: i,
        className: N("fds-stepper", a),
        "data-orientation": r,
        "data-nesting-level": n,
        ...p,
        children: s
      }
    ) });
  }
);
G.displayName = "Stepper";
export {
  G as Stepper
};
