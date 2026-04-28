import { jsx as a, jsxs as _, Fragment as h } from "react/jsx-runtime";
import { forwardRef as L } from "react";
import { cn as N } from "../../../utils/cn.js";
/* empty css               */
const k = {
  Large: "BodyLargeRegular",
  Medium: "BodyMediumRegular",
  Small: "BodySmallRegular",
  XSmall: "BodyXSmallRegular"
}, R = {
  Large: "BodyLargeSemibold",
  Medium: "BodyMediumSemibold",
  Small: "BodySmallSemibold",
  XSmall: "BodyXSmallSemibold"
}, A = L(
  ({
    type: l = "Anchor",
    color: c = "Primary",
    size: f = "Large",
    label: p,
    leadingIcon: o,
    trailingIcon: n,
    isDisabled: s = !1,
    className: u,
    children: y,
    href: b,
    target: S,
    rel: g,
    onClick: t,
    ...r
  }, d) => {
    const B = l === "Action" ? R : k, i = N(
      "fds-link",
      `fds-link--type-${l.toLowerCase()}`,
      `fds-link--color-${c.toLowerCase()}`,
      B[f],
      u
    ), e = p ?? y, m = /* @__PURE__ */ _(h, { children: [
      o && /* @__PURE__ */ a("span", { className: "fds-link__icon", children: o }),
      /* @__PURE__ */ a("span", { className: "fds-link__label", "data-text": typeof e == "string" ? e : void 0, children: /* @__PURE__ */ a("span", { className: "fds-link__label-inner", children: e }) }),
      n && /* @__PURE__ */ a("span", { className: "fds-link__icon", children: n })
    ] });
    return l === "Action" ? /* @__PURE__ */ a(
      "button",
      {
        ref: d,
        className: i,
        type: "button",
        disabled: s,
        "aria-disabled": s || void 0,
        onClick: t,
        ...r,
        children: m
      }
    ) : /* @__PURE__ */ a(
      "a",
      {
        ref: d,
        className: i,
        href: b,
        target: S,
        rel: g,
        onClick: t,
        ...r,
        children: m
      }
    );
  }
);
A.displayName = "LinkButton";
export {
  A as LinkButton
};
