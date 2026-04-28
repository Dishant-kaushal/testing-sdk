import { jsxs as i, jsx as e } from "react/jsx-runtime";
import { X as v, ChevronDown as w } from "react-feather";
import { cn as o } from "../../../utils/cn.js";
import { IconButton as k } from "../../actions/IconButton/IconButton.js";
/* empty css                         */
function B({
  title: p,
  subtitle: c,
  isExpanded: d = !1,
  isActive: t = !0,
  isDisabled: s = !1,
  leadingItem: l,
  trailingIcon: n,
  onToggle: r,
  onClose: m,
  children: f,
  className: _,
  ...h
}) {
  const u = d && t && !s, N = (a) => {
    a.stopPropagation(), m == null || m();
  }, y = (a) => {
    if (a.key === "Enter" || a.key === " ") {
      if (a.target.closest(".fds-pa-item__close")) return;
      a.preventDefault(), s || r == null || r();
    }
  };
  return /* @__PURE__ */ i(
    "div",
    {
      className: o(
        "fds-pa-item",
        d && t && "fds-pa-item--expanded",
        !t && "fds-pa-item--inactive",
        s && "fds-pa-item--disabled",
        _
      ),
      ...h,
      children: [
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: "fds-pa-item__header",
            onClick: s ? void 0 : r,
            onKeyDown: y,
            disabled: s,
            "aria-expanded": d && t,
            children: [
              /* @__PURE__ */ i("div", { className: "fds-pa-item__title-area", children: [
                l,
                /* @__PURE__ */ i("div", { className: "fds-pa-item__title-section", children: [
                  /* @__PURE__ */ i("div", { className: "fds-pa-item__heading-row", children: [
                    /* @__PURE__ */ e("span", { className: "fds-pa-item__title BodyMediumMedium", children: p }),
                    n && /* @__PURE__ */ e("span", { className: "fds-pa-item__trailing-icon", children: n })
                  ] }),
                  c && /* @__PURE__ */ e("span", { className: "fds-pa-item__subtitle BodySmallRegular", children: c })
                ] })
              ] }),
              m && /* @__PURE__ */ e(
                k,
                {
                  icon: /* @__PURE__ */ e(v, { size: 16 }),
                  size: "16",
                  onClick: N,
                  "aria-label": "Close",
                  className: "fds-pa-item__close"
                }
              ),
              t && /* @__PURE__ */ e("span", { className: o("fds-pa-item__chevron", d && "fds-pa-item__chevron--open"), children: /* @__PURE__ */ e(w, { size: 16 }) })
            ]
          }
        ),
        u && /* @__PURE__ */ e("div", { className: "fds-pa-item__body", children: f })
      ]
    }
  );
}
B.displayName = "ProductAccordionItem";
export {
  B as ProductAccordionItem
};
