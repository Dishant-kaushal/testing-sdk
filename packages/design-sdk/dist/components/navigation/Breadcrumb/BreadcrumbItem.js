import { jsxs as f, jsx as e } from "react/jsx-runtime";
import { cn as r } from "../../../utils/cn.js";
import { LinkButton as N } from "../../actions/LinkButton/LinkButton.js";
import { IconButton as B } from "../../actions/IconButton/IconButton.js";
/* empty css                   */
const I = {
  Small: "BodySmallMedium",
  Medium: "BodyMediumMedium",
  Large: "BodyLargeMedium"
}, M = {
  Small: "12",
  Medium: "16",
  Large: "16"
}, S = {
  Small: "Small",
  Medium: "Medium",
  Large: "Large"
};
function g({
  type: m = "Text",
  currentItem: c = !1,
  showSeparator: o = !0,
  size: a = "Medium",
  value: t,
  icon: i,
  href: u,
  target: n,
  rel: b,
  onClick: d,
  "aria-label": l,
  className: p,
  ..._
}) {
  const s = I[a];
  return /* @__PURE__ */ f("li", { className: r("fds-breadcrumb-item", p), ..._, children: [
    c ? /* @__PURE__ */ e("span", { className: r("fds-breadcrumb-item__current", s), "aria-current": "page", children: m === "Icon" ? i : t }) : m === "Icon" ? /* @__PURE__ */ e(
      B,
      {
        icon: i,
        size: M[a],
        className: "fds-breadcrumb-item__action",
        onClick: d,
        "aria-label": l
      }
    ) : /* @__PURE__ */ e(
      N,
      {
        type: "Action",
        color: "Neutral",
        size: S[a],
        label: t,
        href: u,
        target: n,
        rel: b,
        onClick: d,
        className: "fds-breadcrumb-item__action",
        "aria-label": l
      }
    ),
    o && /* @__PURE__ */ e("span", { className: r("fds-breadcrumb-item__separator", s), "aria-hidden": "true", children: "/" })
  ] });
}
g.displayName = "BreadcrumbItem";
export {
  g as BreadcrumbItem
};
