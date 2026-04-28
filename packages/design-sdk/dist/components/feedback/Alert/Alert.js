import { jsxs as a, jsx as e } from "react/jsx-runtime";
import { forwardRef as g } from "react";
import { X as B, Info as n, AlertTriangle as C, AlertCircle as b, CheckCircle as x } from "react-feather";
import { cn as S } from "../../../utils/cn.js";
import { IconButton as j } from "../../actions/IconButton/IconButton.js";
/* empty css          */
const k = {
  Positive: /* @__PURE__ */ e(x, {}),
  Negative: /* @__PURE__ */ e(b, {}),
  Notice: /* @__PURE__ */ e(C, {}),
  Information: /* @__PURE__ */ e(n, {}),
  Neutral: /* @__PURE__ */ e(n, {})
}, w = g(
  ({
    title: c,
    description: o,
    color: i = "Information",
    emphasis: m = "Subtle",
    isFullWidth: l = !1,
    icon: f,
    primaryAction: r,
    secondaryAction: s,
    isDismissible: _ = !1,
    onDismiss: N,
    dismissAriaLabel: h = "Dismiss alert",
    className: p,
    ...v
  }, u) => {
    const I = f ?? k[i], t = _ ? /* @__PURE__ */ e(
      j,
      {
        size: "16",
        icon: /* @__PURE__ */ e(B, {}),
        onClick: N,
        "aria-label": h,
        className: "fds-alert__close"
      }
    ) : null, d = !!(r || s);
    return /* @__PURE__ */ a(
      "div",
      {
        ref: u,
        role: "alert",
        className: S("fds-alert", p),
        "data-color": i,
        "data-emphasis": m,
        "data-full-width": l || void 0,
        ...v,
        children: [
          /* @__PURE__ */ e("span", { className: "fds-alert__leading-icon", "aria-hidden": "true", children: I }),
          /* @__PURE__ */ a("div", { className: "fds-alert__content", children: [
            /* @__PURE__ */ a("div", { className: "fds-alert__header", children: [
              /* @__PURE__ */ e("p", { className: "fds-alert__title BodyMediumSemibold", children: c }),
              l && t
            ] }),
            o && /* @__PURE__ */ e("p", { className: "fds-alert__description BodySmallRegular", children: o }),
            l && d && /* @__PURE__ */ a("div", { className: "fds-alert__actions", children: [
              r,
              s
            ] })
          ] }),
          !l && (d || t) && /* @__PURE__ */ a("div", { className: "fds-alert__trailing", children: [
            r,
            s,
            t
          ] })
        ]
      }
    );
  }
);
w.displayName = "Alert";
export {
  w as Alert
};
