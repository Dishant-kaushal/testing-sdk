import { jsx as e, jsxs as r } from "react/jsx-runtime";
import { useState as g, useCallback as f } from "react";
import { cn as B } from "../../../utils/cn.js";
import { useAccordionContext as L } from "./Accordion.js";
import { AccordionLeadingItem as b } from "./AccordionLeadingItem.js";
/* empty css                  */
function k() {
  return /* @__PURE__ */ e("svg", { viewBox: "0 0 9.33 5.33", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: /* @__PURE__ */ e(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M0.195 0.195C0.456-0.065 0.878-0.065 1.138 0.195L4.667 3.724L8.195 0.195C8.456-0.065 8.878-0.065 9.138 0.195C9.398 0.456 9.398 0.878 9.138 1.138L5.138 5.138C4.878 5.398 4.456 5.398 4.195 5.138L0.195 1.138C-0.065 0.878-0.065 0.456 0.195 0.195Z",
      fill: "currentColor"
    }
  ) });
}
function A({
  value: i,
  title: p,
  bodyText: s,
  children: d,
  leading: u = "None",
  leadingIcon: _,
  leadingNumber: h,
  isExpanded: m,
  defaultExpanded: y = !1,
  onExpandedChange: c,
  className: N
}) {
  const t = L(), [v, w] = g(y), a = m !== void 0, n = t && i ? t.expandedKeys.has(i) : a ? m : v, l = f(() => {
    if (t && i)
      t.toggleKey(i);
    else {
      const o = !n;
      a || w(o), c == null || c(o);
    }
  }, [t, i, n, a, c]), x = f(
    (o) => {
      (o.key === "Enter" || o.key === " ") && (o.preventDefault(), l());
    },
    [l]
  ), C = B(
    "fds-accordion-item",
    n && "fds-accordion-item--expanded",
    N
  );
  return /* @__PURE__ */ e("div", { className: C, children: /* @__PURE__ */ r("div", { className: "fds-accordion-item__root", children: [
    /* @__PURE__ */ r(
      "button",
      {
        className: "fds-accordion-item__header",
        type: "button",
        onClick: l,
        onKeyDown: x,
        "aria-expanded": n,
        children: [
          /* @__PURE__ */ r("div", { className: "fds-accordion-item__title-area", children: [
            /* @__PURE__ */ e(
              b,
              {
                leading: u,
                icon: _,
                number: h
              }
            ),
            /* @__PURE__ */ e("span", { className: "fds-accordion-item__title BodyMediumMedium", children: p })
          ] }),
          /* @__PURE__ */ e("span", { className: "fds-accordion-item__chevron", children: /* @__PURE__ */ e(k, {}) })
        ]
      }
    ),
    (d || s) && /* @__PURE__ */ r("div", { className: "fds-accordion-item__body", role: "region", children: [
      s && !d && /* @__PURE__ */ e("p", { className: "fds-accordion-item__body-text BodyMediumRegular", children: s }),
      d
    ] })
  ] }) });
}
A.displayName = "AccordionItem";
export {
  A as AccordionItem
};
