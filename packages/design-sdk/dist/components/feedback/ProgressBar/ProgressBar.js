import { jsxs as d, jsx as a } from "react/jsx-runtime";
import { cn as n } from "../../../utils/cn.js";
/* empty css                */
function t({
  label: s,
  value: l = 0,
  size: i = "Large",
  intent: p = "None",
  isIndeterminate: r = !1,
  showPercentage: o = !0,
  className: c,
  ...g
}) {
  const e = Math.min(100, Math.max(0, l)), m = !!s || o && !r;
  return /* @__PURE__ */ d(
    "div",
    {
      className: n(
        "fds-progress-bar",
        `fds-progress-bar--size-${i.toLowerCase()}`,
        `fds-progress-bar--intent-${p.toLowerCase()}`,
        r && "fds-progress-bar--indeterminate",
        c
      ),
      role: "progressbar",
      "aria-valuenow": r ? void 0 : e,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": s ?? "Progress",
      ...g,
      children: [
        m && /* @__PURE__ */ d("div", { className: "fds-progress-bar__header", children: [
          s && /* @__PURE__ */ a("span", { className: "fds-progress-bar__label BodySmallRegular", children: s }),
          o && !r && /* @__PURE__ */ a("span", { className: "fds-progress-bar__percentage BodySmallRegular", children: `${Math.round(e)}%` })
        ] }),
        /* @__PURE__ */ a("div", { className: "fds-progress-bar__track", children: /* @__PURE__ */ a(
          "div",
          {
            className: "fds-progress-bar__indicator",
            style: r ? void 0 : { width: `${e}%` }
          }
        ) })
      ]
    }
  );
}
t.displayName = "ProgressBar";
export {
  t as ProgressBar
};
