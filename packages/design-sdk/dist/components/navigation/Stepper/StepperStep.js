import { jsxs as c, jsx as e } from "react/jsx-runtime";
import { forwardRef as P, useMemo as U, Children as C, isValidElement as N, cloneElement as K } from "react";
import { cn as y } from "../../../utils/cn.js";
import { useStepper as L } from "./StepperContext.js";
import { StepperIndicator as q } from "./StepperIndicator.js";
import { StepLine as H } from "./StepLine.js";
/* empty css                */
function J(r, p, o) {
  return p === 0 ? "default" : o === 1 ? "single-item" : r === 0 ? "start" : r === o - 1 ? "end" : "middle";
}
const Q = /* @__PURE__ */ e(q, { color: "neutral" }), W = P(
  ({
    title: r,
    titleColor: p,
    description: o,
    stepProgress: g = "none",
    marker: s,
    trailing: f,
    isSelected: m,
    isDisabled: t,
    href: u,
    target: M,
    onClick: a,
    children: h,
    _index: I = 0,
    _totalIndex: E = 0,
    _nestingLevel: n = 0,
    className: R,
    style: z
  }, T) => {
    const {
      itemsInGroupCount: b,
      totalItemsInParentGroupCount: x,
      orientation: i
    } = L(), F = U(
      () => J(I, n, b),
      [I, n, b]
    ), G = i === "vertical", V = E === 0, j = E === x - 1, S = !!u || !!a;
    if (process.env.NODE_ENV !== "production") {
      f && i === "horizontal" && console.warn("[StepperStep] `trailing` is ignored in horizontal Stepper."), n >= 1 && i === "horizontal" && console.warn(
        "[StepperStep] Nested Steppers are not supported in horizontal orientation."
      );
      let l = !1;
      C.forEach(h, (B) => {
        var w;
        N(B) && ((w = B.type) == null ? void 0 : w.displayName) === "Stepper" && (l = !0);
      }), l && console.warn(
        "[StepperStep] Found a nested <Stepper> inside `children`. Move it OUT of <StepperStep> and render it as a SIBLING of the StepperStep items in the parent <Stepper> for nesting curves to render."
      );
    }
    const A = N(s) ? K(s, {
      isDisabled: t ?? s.props.isDisabled
    }) : Q, O = (N(s) ? s.props.color : void 0) ?? "neutral", v = /* @__PURE__ */ c("div", { className: "fds-stepper-step__header", children: [
      /* @__PURE__ */ c("div", { className: "fds-stepper-step__text-stack", children: [
        /* @__PURE__ */ e(
          "p",
          {
            className: "fds-stepper-step__title BodyMediumRegular",
            style: p ? { color: p } : void 0,
            children: r
          }
        ),
        o && /* @__PURE__ */ e("p", { className: "fds-stepper-step__description BodySmallRegular", children: o })
      ] }),
      f && G && /* @__PURE__ */ e("span", { className: "fds-stepper-step__trailing", children: f })
    ] }), _ = {
      className: y(
        "fds-stepper-step__header-box",
        S && "fds-stepper-step__header-box--interactive"
      )
    };
    let d;
    return u ? d = /* @__PURE__ */ e(
      "a",
      {
        ..._,
        href: t ? void 0 : u,
        target: M,
        "aria-disabled": t || void 0,
        onClick: t ? (l) => l.preventDefault() : a,
        children: v
      }
    ) : a ? d = /* @__PURE__ */ e(
      "button",
      {
        ..._,
        type: "button",
        disabled: t,
        onClick: a,
        children: v
      }
    ) : d = /* @__PURE__ */ e("div", { ..._, children: v }), /* @__PURE__ */ c(
      "div",
      {
        ref: T,
        className: y("fds-stepper-step", R),
        style: z,
        role: "group",
        "aria-label": r,
        "aria-current": m ? "step" : void 0,
        "aria-disabled": t || void 0,
        "data-orientation": i,
        "data-nesting-level": n,
        "data-selected": m || void 0,
        "data-disabled": t || void 0,
        "data-color": O,
        children: [
          /* @__PURE__ */ e(
            H,
            {
              stepType: F,
              shouldShowStartBranch: !V,
              shouldShowEndBranch: !j,
              marker: A,
              stepProgress: g
            }
          ),
          /* @__PURE__ */ c(
            "div",
            {
              className: y(
                "fds-stepper-step__body",
                S && "fds-stepper-step__body--interactive"
              ),
              "data-selected": m || void 0,
              "data-interactive": S || void 0,
              children: [
                d,
                h && /* @__PURE__ */ e("div", { className: "fds-stepper-step__slot", children: h })
              ]
            }
          )
        ]
      }
    );
  }
);
W.displayName = "StepperStep";
export {
  W as StepperStep
};
