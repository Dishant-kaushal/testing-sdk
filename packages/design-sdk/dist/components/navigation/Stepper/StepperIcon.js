import { jsx as e } from "react/jsx-runtime";
import { forwardRef as s, createElement as a } from "react";
import { cn as c } from "../../../utils/cn.js";
/* empty css                */
const d = {
  positive: "fds-stepper-icon--positive",
  negative: "fds-stepper-icon--negative",
  notice: "fds-stepper-icon--notice",
  information: "fds-stepper-icon--information",
  primary: "fds-stepper-icon--primary",
  neutral: "fds-stepper-icon--neutral"
}, f = 12, m = s(
  ({ icon: r, color: i = "neutral", isDisabled: t = !1, className: p, ...n }, o) => /* @__PURE__ */ e(
    "div",
    {
      ref: o,
      className: c("fds-stepper-icon", d[i], p),
      "data-disabled": t || void 0,
      ...n,
      children: /* @__PURE__ */ e("span", { className: "fds-stepper-icon__glyph", "aria-hidden": "true", children: a(r, { size: f }) })
    }
  )
);
m.displayName = "StepperIcon";
export {
  m as StepperIcon
};
