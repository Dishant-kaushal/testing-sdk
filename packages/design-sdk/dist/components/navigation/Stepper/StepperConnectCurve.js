import { jsx as e } from "react/jsx-runtime";
import { cn as n } from "../../../utils/cn.js";
/* empty css                        */
function o({ className: r, ...t }) {
  return /* @__PURE__ */ e("span", { className: n("fds-stepper-connect-curve", r), "aria-hidden": "true", ...t, children: /* @__PURE__ */ e("svg", { width: "20", height: "16", viewBox: "0 0 20 16", fill: "none", children: /* @__PURE__ */ e(
    "path",
    {
      d: "M 0.5 0 V 8 Q 0.5 15.5 8 15.5 H 20",
      stroke: "var(--border-gray-muted)",
      strokeWidth: "1"
    }
  ) }) });
}
o.displayName = "StepperConnectCurve";
export {
  o as StepperConnectCurve
};
