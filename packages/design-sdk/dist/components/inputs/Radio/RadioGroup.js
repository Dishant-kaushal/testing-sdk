import { jsx as r, jsxs as f } from "react/jsx-runtime";
import { useContext as x, createContext as S } from "react";
import { cn as e } from "../../../utils/cn.js";
/* empty css               */
const a = S(null);
function b() {
  return x(a);
}
const g = {
  Small: "BodySmallSemibold",
  Medium: "BodySmallSemibold",
  Large: "BodyMediumSemibold"
};
function y({
  label: o,
  name: d,
  value: i,
  onChange: l,
  size: t = "Small",
  isDisabled: s = !1,
  children: m,
  className: n,
  orientation: u = "Vertical",
  ...p
}) {
  const c = {
    name: d,
    value: i,
    onChange: l,
    isDisabled: s
  };
  return /* @__PURE__ */ r(a.Provider, { value: c, children: /* @__PURE__ */ f(
    "div",
    {
      role: "radiogroup",
      className: e("fds-radio-group", `fds-radio-group--${u.toLowerCase()}`, n),
      "aria-label": o,
      ...p,
      children: [
        o && /* @__PURE__ */ r("span", { className: e("fds-radio-group__label", g[t]), children: o }),
        /* @__PURE__ */ r("div", { className: "fds-radio-group__body", children: m })
      ]
    }
  ) });
}
y.displayName = "RadioGroup";
export {
  y as RadioGroup,
  b as useRadioGroupContext
};
