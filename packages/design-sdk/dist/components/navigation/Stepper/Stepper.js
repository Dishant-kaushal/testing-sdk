import { jsx as k } from "react/jsx-runtime";
import { forwardRef as b, cloneElement as c, Children as m, isValidElement as d } from "react";
import { cn as v } from "../../../utils/cn.js";
import { StepperGroupLabel as S } from "./StepperGroupLabel.js";
import { StepperStep as y } from "./StepperStep.js";
/* empty css            */
function C(t) {
  return typeof t != "string" && (t == null ? void 0 : t.displayName) === "Stepper";
}
function u(t, s, r, l) {
  m.forEach(t, (o) => {
    if (d(o))
      if (o.type === y) {
        const a = o.props.children, e = [], n = [];
        m.forEach(a, (p) => {
          d(p) && C(p.type) ? r && n.push(p.props.children) : e.push(p);
        }), l.push({
          kind: "step",
          element: o,
          level: s,
          slotContent: e.length ? e : null
        }), r && n.forEach((p) => u(p, s + 1, r, l));
      } else o.type === S && l.push({ kind: "label", element: o, level: s });
  });
}
function E(t) {
  const s = [];
  for (let r = 0; r < t.length; r++) {
    const l = t[r];
    if (l.kind !== "step") {
      s.push("start");
      continue;
    }
    let o = !1;
    for (let e = r - 1; e >= 0; e--) {
      const n = t[e];
      if (n.kind === "label") break;
      if (n.kind === "step") {
        if (n.level >= l.level) {
          o = !0;
          break;
        }
        break;
      }
    }
    let a = !1;
    for (let e = r + 1; e < t.length; e++) {
      const n = t[e];
      if (n.kind === "label") break;
      if (n.kind === "step") {
        if (n.level >= l.level) {
          a = !0;
          break;
        }
        break;
      }
    }
    o ? a ? s.push("intermediate") : s.push("end") : s.push("start");
  }
  return s;
}
const N = b(
  ({ children: t, orientation: s = "horizontal", className: r, ...l }, o) => {
    const a = s === "vertical", e = [];
    u(t, 0, a, e);
    const n = E(e), p = e.map((i, f) => {
      if (i.kind === "label")
        return c(i.element, {
          key: i.element.key ?? `label-${f}`,
          "data-nesting-level": i.level
        });
      const h = i.level > 0 && n[f] === "start";
      return c(i.element, {
        key: i.element.key ?? `step-${f}`,
        "data-step-position": n[f],
        "data-nesting-level": i.level,
        "data-step-first-of-nested": h ? !0 : void 0,
        // Strip nested <Stepper>s from children; keep only the slotContent.
        children: i.slotContent
      });
    });
    return /* @__PURE__ */ k(
      "div",
      {
        ref: o,
        className: v("fds-stepper", r),
        "data-orientation": s,
        ...l,
        children: p
      }
    );
  }
);
N.displayName = "Stepper";
export {
  N as Stepper,
  y as StepperStep
};
