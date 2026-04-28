import { jsxs as f, jsx as a } from "react/jsx-runtime";
import { cn as p } from "../../../utils/cn.js";
import { CalendarHeader as j } from "./CalendarHeader.js";
import { CalendarWeekdays as B } from "./CalendarWeekdays.js";
import { CalendarDayCell as L } from "./CalendarDayCell.js";
import { CalendarFooter as g } from "./CalendarFooter.js";
import { MonthYearCell as F } from "./MonthYearCell.js";
/* empty css                 */
function W({
  view: r = "date",
  headerLabel: b = "March 2026",
  onPrev: n,
  onNext: _,
  onHeaderClick: h,
  days: $ = [],
  onDayClick: l,
  onDayHover: t,
  onDayHoverEnd: m,
  items: o = [],
  onItemClick: c,
  showFooter: u = !1,
  isApplyDisabled: N = !1,
  onCancel: C,
  onApply: M,
  className: S,
  ...x
}) {
  return /* @__PURE__ */ f("div", { className: p("fds-calendar-base", S), ...x, children: [
    /* @__PURE__ */ f("div", { className: "fds-calendar-base__header", children: [
      /* @__PURE__ */ a(
        j,
        {
          label: b,
          onPrev: n,
          onNext: _,
          onLabelClick: h
        }
      ),
      r === "date" && /* @__PURE__ */ a(B, {})
    ] }),
    /* @__PURE__ */ f("div", { className: p("fds-calendar-base__body", r !== "date" && "fds-calendar-base__body--grid"), children: [
      r === "date" && /* @__PURE__ */ a("div", { onMouseLeave: () => m == null ? void 0 : m(), children: $.map((i, d) => /* @__PURE__ */ a("div", { id: `week-${d}`, className: "fds-calendar-base__week", children: i.map((e, s) => /* @__PURE__ */ a(
        L,
        {
          id: `${d}-${s}`,
          date: e.date,
          type: e.type,
          isSelected: e.isSelected,
          isCurrentDate: e.isCurrentDate,
          onClick: () => l == null ? void 0 : l(e),
          onMouseEnter: () => t == null ? void 0 : t(e)
        },
        `${d}-${s}`
      )) }, d)) }),
      r !== "date" && o.map((i, d) => /* @__PURE__ */ a("div", { id: `row-${d}`, className: "fds-calendar-base__item-row", children: i.map((e, s) => /* @__PURE__ */ a(
        F,
        {
          id: `${d}-${s}`,
          label: e.label,
          isSelected: e.isSelected,
          onClick: () => c == null ? void 0 : c(e)
        }
      )) }))
    ] }),
    u && /* @__PURE__ */ a(g, { onCancel: C, onApply: M, isApplyDisabled: N })
  ] });
}
W.displayName = "CalendarBase";
export {
  W as CalendarBase
};
