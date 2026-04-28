import { jsxs as i, Fragment as y, jsx as s } from "react/jsx-runtime";
import { forwardRef as I, useId as M, useCallback as B } from "react";
import { cn as w } from "../../../utils/cn.js";
import { Divider as F } from "../../layout/Divider/Divider.js";
/* empty css           */
function j({ size: e }) {
  return /* @__PURE__ */ s(
    "svg",
    {
      width: e,
      height: e,
      viewBox: "0 0 12 12",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      className: "fds-switch__check-icon",
      children: /* @__PURE__ */ s(
        "path",
        {
          d: "M9.46967 2.46967C9.76256 2.17678 10.2373 2.17678 10.5302 2.46967C10.8231 2.76256 10.8231 3.23732 10.5302 3.53022L5.03022 9.03022C4.73732 9.32311 4.26256 9.32311 3.96967 9.03022L1.46967 6.53022C1.17678 6.23732 1.17678 5.76256 1.46967 5.46967C1.76256 5.17678 2.23732 5.17678 2.53022 5.46967L4.49994 7.4394L9.46967 2.46967Z",
          fill: "currentColor"
        }
      )
    }
  );
}
const D = {
  Small: 8,
  Medium: 10
}, R = I(
  ({
    size: e = "Medium",
    isChecked: t,
    defaultChecked: _,
    isDisabled: p = !1,
    onChange: c,
    name: u,
    accessibilityLabel: N,
    label: d,
    helpText: r,
    trailingIcon: h,
    showDivider: v = !1,
    className: n,
    id: k,
    disabled: b,
    ...C
  }, S) => {
    const g = M(), a = k ?? g, l = u ?? "", o = p || b || !1, x = B(
      (L) => {
        c == null || c({ name: l, checked: L.target.checked });
      },
      [l, c]
    ), m = w(
      "fds-switch",
      `fds-switch--${e.toLowerCase()}`,
      o && "fds-switch--disabled",
      !d && n
    ), f = /* @__PURE__ */ i(y, { children: [
      /* @__PURE__ */ s(
        "input",
        {
          ref: S,
          id: a,
          type: "checkbox",
          role: "switch",
          className: "fds-switch__input",
          name: l || void 0,
          checked: t,
          defaultChecked: _,
          disabled: o,
          "aria-label": N ?? d,
          "aria-checked": t,
          onChange: x,
          ...C
        }
      ),
      /* @__PURE__ */ s("span", { className: "fds-switch__wrapper", children: /* @__PURE__ */ s("span", { className: "fds-switch__track", children: /* @__PURE__ */ s("span", { className: "fds-switch__thumb", children: /* @__PURE__ */ s(j, { size: D[e] }) }) }) })
    ] });
    return d ? /* @__PURE__ */ i("div", { className: w("fds-switch-field", n), children: [
      /* @__PURE__ */ s("label", { className: m, htmlFor: a, children: /* @__PURE__ */ i("div", { className: "fds-switch-field__row", children: [
        /* @__PURE__ */ i("div", { className: "fds-switch-field__text", children: [
          /* @__PURE__ */ i("div", { className: "fds-switch-field__heading", children: [
            /* @__PURE__ */ s("span", { className: "fds-switch-field__title BodySmallSemibold", children: d }),
            h && /* @__PURE__ */ s("span", { className: "fds-switch-field__icon", children: h })
          ] }),
          r && /* @__PURE__ */ s("span", { className: "fds-switch-field__help BodySmallRegular", children: r })
        ] }),
        f
      ] }) }),
      v && /* @__PURE__ */ s(F, { variant: "Muted" })
    ] }) : /* @__PURE__ */ s("label", { className: m, htmlFor: a, children: f });
  }
);
R.displayName = "Switch";
export {
  R as Switch
};
