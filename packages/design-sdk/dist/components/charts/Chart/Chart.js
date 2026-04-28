import { jsxs as e, jsx as a } from "react/jsx-runtime";
import { forwardRef as H } from "react";
import { ChevronDown as S, Clock as C } from "react-feather";
import { cn as d } from "../../../utils/cn.js";
/* empty css          */
const b = {
  Small: "HeadingSmallSemibold",
  Medium: "HeadingMediumSemibold",
  Large: "HeadingLargeSemibold"
}, R = H(
  ({
    title: s,
    titleSize: h = "Small",
    titleClassName: m,
    titleHasDropdown: o = !1,
    onTitleClick: _,
    breadcrumb: c,
    duration: l,
    actions: r,
    filters: i,
    children: f,
    className: u,
    ...N
  }, p) => {
    const v = typeof s == "string", n = s != null || c != null, t = n || l != null, g = t || r != null;
    return /* @__PURE__ */ e("div", { ref: p, className: d("fds-chart", u), ...N, children: [
      g && /* @__PURE__ */ e("div", { className: "fds-chart__header", children: [
        t && /* @__PURE__ */ e("div", { className: "fds-chart__header-main", children: [
          n && /* @__PURE__ */ e("div", { className: "fds-chart__header-row", children: [
            v ? /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: d("fds-chart__title", m),
                onClick: _,
                children: [
                  /* @__PURE__ */ a(
                    "span",
                    {
                      className: d(
                        "fds-chart__title-label",
                        b[h]
                      ),
                      children: s
                    }
                  ),
                  o && /* @__PURE__ */ a(
                    S,
                    {
                      className: "fds-chart__title-icon",
                      "aria-hidden": "true"
                    }
                  )
                ]
              }
            ) : s,
            c
          ] }),
          l != null && /* @__PURE__ */ e("div", { className: "fds-chart__duration", children: [
            /* @__PURE__ */ a(C, { className: "fds-chart__duration-icon", "aria-hidden": "true" }),
            /* @__PURE__ */ a("span", { className: "fds-chart__duration-label BodyMediumRegular", children: l })
          ] })
        ] }),
        r != null && /* @__PURE__ */ a("div", { className: "fds-chart__actions", children: r })
      ] }),
      i != null && /* @__PURE__ */ a("div", { className: "fds-chart__filters", children: i }),
      /* @__PURE__ */ a("div", { className: "fds-chart__canvas", children: f })
    ] });
  }
);
R.displayName = "Chart";
export {
  b as CHART_TITLE_TYPOGRAPHY,
  R as Chart
};
