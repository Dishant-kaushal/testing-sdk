import { jsx as e } from "react/jsx-runtime";
import { forwardRef as a } from "react";
import { User as d } from "react-feather";
import { cn as o } from "../../../utils/cn.js";
/* empty css                     */
const f = {
  Inactive: "fds-stepper-indicator--inactive",
  Active: "fds-stepper-indicator--active",
  Success: "fds-stepper-indicator--success",
  Warning: "fds-stepper-indicator--warning"
}, m = 12, I = a(
  ({ status: i = "Inactive", type: t = "Indicator", icon: s, className: c, ...n }, p) => {
    const r = t === "Icon";
    return /* @__PURE__ */ e(
      "div",
      {
        ref: p,
        className: o(
          "fds-stepper-indicator",
          r ? "fds-stepper-indicator--type-icon" : "fds-stepper-indicator--type-dot",
          f[i],
          c
        ),
        ...n,
        children: r ? /* @__PURE__ */ e("span", { className: "fds-stepper-indicator__glyph", "aria-hidden": "true", children: s ?? /* @__PURE__ */ e(d, { size: m }) }) : /* @__PURE__ */ e("span", { className: "fds-stepper-indicator__dot", "aria-hidden": "true" })
      }
    );
  }
);
I.displayName = "StepperIndicator";
export {
  I as StepperIndicator
};
