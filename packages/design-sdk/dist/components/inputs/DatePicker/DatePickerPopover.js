import { jsxs as d, jsx as e } from "react/jsx-runtime";
import { cn as M } from "../../../utils/cn.js";
import { TextInput as s } from "../TextInput/TextInput.js";
import { formatDateInput as N, formatTimeInput as b } from "./datePickerUtils.js";
import { Divider as O } from "../../layout/Divider/Divider.js";
import { CalendarHeader as Q } from "./CalendarHeader.js";
import { CalendarWeekdays as R } from "./CalendarWeekdays.js";
import { CalendarDayCell as U } from "./CalendarDayCell.js";
import { CalendarFooter as X } from "./CalendarFooter.js";
import { MonthYearCell as Z } from "./MonthYearCell.js";
import { DatePresetSidebar as I } from "./DatePresetSidebar.js";
/* empty css                      */
function S({
  showPresets: k = !0,
  presets: h,
  selectedPreset: x,
  onPresetSelect: Y,
  startDate: $ = "",
  startTime: L = "",
  endDate: P = "",
  endTime: j = "",
  onStartDateChange: t,
  onStartTimeChange: c,
  onEndDateChange: o,
  onEndTimeChange: m,
  calendarLabel: F = "March 2026",
  onPrevMonth: V,
  onNextMonth: W,
  onCalendarLabelClick: q,
  view: a = "date",
  days: w = [],
  onDayClick: f,
  onDayHover: v,
  onDayHoverEnd: u,
  items: z = [],
  onItemClick: _,
  isApplyDisabled: A = !1,
  onCancel: B,
  onApply: G,
  className: J,
  ...K
}) {
  return /* @__PURE__ */ d("div", { className: M("fds-datepicker-popover", J), ...K, children: [
    k && /* @__PURE__ */ e(
      I,
      {
        presets: h,
        selectedValue: x,
        onPresetSelect: Y
      }
    ),
    /* @__PURE__ */ d("div", { className: "fds-datepicker-popover__panel", children: [
      /* @__PURE__ */ d("div", { className: "fds-datepicker-popover__inputs", children: [
        /* @__PURE__ */ d("div", { className: "fds-datepicker-popover__input-row", children: [
          /* @__PURE__ */ e(
            s,
            {
              label: "Start Date",
              placeholder: "DD/MM/YYYY",
              value: $,
              maxLength: 10,
              onChange: (r) => t == null ? void 0 : t(N(r.value))
            }
          ),
          /* @__PURE__ */ e(
            s,
            {
              label: "Start Time",
              placeholder: "HH:MM",
              value: L,
              maxLength: 5,
              onChange: (r) => c == null ? void 0 : c(b(r.value))
            }
          )
        ] }),
        /* @__PURE__ */ d("div", { className: "fds-datepicker-popover__input-row", children: [
          /* @__PURE__ */ e(
            s,
            {
              label: "End Date",
              placeholder: "DD/MM/YYYY",
              value: P,
              maxLength: 10,
              onChange: (r) => o == null ? void 0 : o(N(r.value))
            }
          ),
          /* @__PURE__ */ e(
            s,
            {
              label: "End Time",
              placeholder: "HH:MM",
              value: j,
              maxLength: 5,
              onChange: (r) => m == null ? void 0 : m(b(r.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e(O, { variant: "Muted" }),
      /* @__PURE__ */ d("div", { className: "fds-datepicker-popover__calendar", children: [
        /* @__PURE__ */ d("div", { className: "fds-datepicker-popover__calendar-header", children: [
          /* @__PURE__ */ e(
            Q,
            {
              label: F,
              onPrev: V,
              onNext: W,
              onLabelClick: q
            }
          ),
          a === "date" && /* @__PURE__ */ e(R, {})
        ] }),
        /* @__PURE__ */ d("div", { className: M("fds-datepicker-popover__calendar-body", a !== "date" && "fds-datepicker-popover__calendar-body--grid"), children: [
          a === "date" && /* @__PURE__ */ e("div", { onMouseLeave: () => u == null ? void 0 : u(), children: w.map((r, p) => /* @__PURE__ */ e("div", { id: `week-${p}`, className: "fds-datepicker-popover__week", children: r.map((l, i) => /* @__PURE__ */ e(
            U,
            {
              id: `${p}-${i}`,
              date: l.date,
              type: l.type,
              isSelected: l.isSelected,
              isCurrentDate: l.isCurrentDate,
              onClick: () => f == null ? void 0 : f(l),
              onMouseEnter: () => v == null ? void 0 : v(l)
            },
            `${p}-${i}`
          )) }, p)) }),
          a !== "date" && z.map((r, p) => /* @__PURE__ */ e("div", { id: `row-${p}`, className: "fds-datepicker-popover__item-row", children: r.map((l, i) => /* @__PURE__ */ e(
            Z,
            {
              id: `${p}-${i}`,
              label: l.label,
              isSelected: l.isSelected,
              onClick: () => _ == null ? void 0 : _(l)
            }
          )) }))
        ] })
      ] }),
      /* @__PURE__ */ e(X, { onCancel: B, onApply: G, isApplyDisabled: A })
    ] })
  ] });
}
S.displayName = "DatePickerPopover";
export {
  S as DatePickerPopover
};
