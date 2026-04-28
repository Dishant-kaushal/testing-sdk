import { jsxs as x, jsx as r } from "react/jsx-runtime";
import { forwardRef as C, useId as v, useCallback as l } from "react";
import { cn as c } from "../../../utils/cn.js";
import { useRadioGroupContext as B } from "./RadioGroup.js";
/* empty css          */
const E = {
  Small: "BodySmallRegular",
  Medium: "BodyMediumRegular",
  Large: "BodyLargeRegular"
}, L = C(
  ({
    label: m,
    size: t = "Small",
    isDisabled: f = !1,
    className: p,
    id: b,
    disabled: h,
    value: a,
    checked: u,
    onChange: s,
    name: y,
    ...R
  }, k) => {
    const N = v(), n = b ?? N, e = B(), o = f || h || (e == null ? void 0 : e.isDisabled) || !1, _ = y ?? (e == null ? void 0 : e.name), g = e ? e.value === a : u, w = l(
      (d) => {
        e && a !== void 0 && e.onChange(String(a)), s == null || s(d);
      },
      [e, a, s]
    ), D = l(
      (d) => {
        if (d.key === "Enter") {
          d.preventDefault();
          const i = d.currentTarget;
          i.checked || (i.checked = !0, i.dispatchEvent(new Event("change", { bubbles: !0 })), e && a !== void 0 && e.onChange(String(a)));
        }
      },
      [e, a]
    ), S = c(
      "fds-radio",
      `fds-radio--size-${t.toLowerCase()}`,
      o && "fds-radio--disabled",
      p
    );
    return /* @__PURE__ */ x("label", { className: S, htmlFor: n, children: [
      /* @__PURE__ */ r(
        "input",
        {
          ref: k,
          className: "fds-radio__input",
          type: "radio",
          id: n,
          name: _,
          value: a,
          checked: g,
          disabled: o,
          "aria-disabled": o || void 0,
          onChange: w,
          onKeyDown: D,
          ...R
        }
      ),
      /* @__PURE__ */ r("span", { className: "fds-radio__circle", "aria-hidden": "true" }),
      /* @__PURE__ */ r("span", { className: c("fds-radio__label", E[t]), children: m })
    ] });
  }
);
L.displayName = "Radio";
export {
  L as Radio
};
