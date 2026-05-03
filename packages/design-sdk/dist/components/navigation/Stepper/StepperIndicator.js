import { jsx as r } from "react/jsx-runtime";
import { forwardRef as p } from "react";
import { cn as d } from "../../../utils/cn.js";
/* empty css                     */
const n = {
  positive: "fds-stepper-indicator--positive",
  negative: "fds-stepper-indicator--negative",
  notice: "fds-stepper-indicator--notice",
  information: "fds-stepper-indicator--information",
  primary: "fds-stepper-indicator--primary",
  neutral: "fds-stepper-indicator--neutral"
}, s = p(
  ({ color: i = "neutral", isDisabled: t, className: e, ...a }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: d("fds-stepper-indicator", n[i], e),
      "data-disabled": t || void 0,
      ...a,
      children: /* @__PURE__ */ r("span", { className: "fds-stepper-indicator__dot", "aria-hidden": "true" })
    }
  )
);
s.displayName = "StepperIndicator";
export {
  s as StepperIndicator
};
