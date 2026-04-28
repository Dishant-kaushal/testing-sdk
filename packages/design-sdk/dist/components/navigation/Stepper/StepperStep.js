import { jsxs as s, jsx as t } from "react/jsx-runtime";
import { forwardRef as _ } from "react";
import { cn as u } from "../../../utils/cn.js";
import { StepperIndicator as v } from "./StepperIndicator.js";
/* empty css                */
function N(e) {
  return e === "end" || e === "none";
}
function h(e) {
  return e === "start" || e === "none";
}
const S = _(
  ({
    label: e,
    description: p,
    status: d = "Inactive",
    indicatorType: l = "Indicator",
    icon: n,
    isDisabled: o = !1,
    trailing: r,
    children: a,
    stepProgress: i = "full",
    className: c,
    ...m
  }, f) => /* @__PURE__ */ s(
    "div",
    {
      ref: f,
      className: u("fds-stepper-step", c),
      role: "group",
      "aria-label": e,
      "aria-current": d === "Active" ? "step" : void 0,
      "aria-disabled": o || void 0,
      "data-line-top-dotted": N(i) || void 0,
      "data-line-bottom-dotted": h(i) || void 0,
      ...m,
      children: [
        /* @__PURE__ */ s("div", { className: "fds-stepper-step__connector-row", children: [
          /* @__PURE__ */ t("span", { className: "fds-stepper-step__line fds-stepper-step__line--left", "aria-hidden": "true" }),
          /* @__PURE__ */ t(v, { status: d, type: l, icon: n }),
          /* @__PURE__ */ t("span", { className: "fds-stepper-step__line fds-stepper-step__line--right", "aria-hidden": "true" })
        ] }),
        /* @__PURE__ */ s("div", { className: "fds-stepper-step__text-block", children: [
          /* @__PURE__ */ s("div", { className: "fds-stepper-step__header", children: [
            /* @__PURE__ */ s("div", { className: "fds-stepper-step__text-stack", children: [
              /* @__PURE__ */ t("p", { className: "fds-stepper-step__label BodyMediumRegular", children: e }),
              p && /* @__PURE__ */ t("p", { className: "fds-stepper-step__description BodySmallRegular", children: p })
            ] }),
            r && /* @__PURE__ */ t("span", { className: "fds-stepper-step__trailing", children: r })
          ] }),
          a && /* @__PURE__ */ t("div", { className: "fds-stepper-step__slot", children: a })
        ] })
      ]
    }
  )
);
S.displayName = "StepperStep";
export {
  S as StepperStep
};
