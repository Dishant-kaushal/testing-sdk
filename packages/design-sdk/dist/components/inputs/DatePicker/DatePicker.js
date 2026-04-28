import { jsxs as H, jsx as o } from "react/jsx-runtime";
import { useRef as ge, useEffect as ve, useCallback as ye } from "react";
import { cn as q } from "../../../utils/cn.js";
import { useClickOutside as ke } from "../../../hooks/useClickOutside.js";
import { useKeyboard as Ce } from "../../../hooks/useKeyboard.js";
import { DatePickerTrigger as _e } from "./DatePickerTrigger.js";
import { DatePickerPopover as De } from "./DatePickerPopover.js";
import { CalendarBase as Pe } from "./CalendarBase.js";
import { DEFAULT_PRESETS as we } from "./DatePresetSidebar.js";
import { DropdownMenu as Te } from "../../overlays/DropdownMenu/DropdownMenu.js";
import { ActionListItem as Ee } from "../../overlays/DropdownMenu/ActionListItem.js";
import { ActionListItemGroup as be } from "../../overlays/DropdownMenu/ActionListItemGroup.js";
import { useDatePickerState as Se } from "./useDatePickerState.js";
import { formatDate as C } from "./datePickerUtils.js";
/* empty css               */
const Ae = {
  custom: "Custom",
  today: "Today",
  yesterday: "Yesterday",
  current_week: "Current Week",
  previous_7_days: "Past 7 days",
  current_month: "Current Month",
  previous_month: "Previous Month",
  previous_3_month: "Previous 3 Month",
  previous_12_month: "Previous 12 Month",
  current_year: "Current Year",
  previous_year: "Previous Year"
};
function Ie({
  mode: r = "single",
  isOpen: F,
  onOpenChange: K,
  value: m,
  onChange: B,
  rangeValue: p,
  onRangeChange: U,
  showPresets: Y = !0,
  showPresetChip: h = !0,
  presets: _,
  selectedPreset: j,
  onPresetSelect: $,
  label: G,
  placeholder: W,
  helpText: z,
  errorText: J,
  validationState: Q,
  isDisabled: s,
  showPeriodicity: D = !1,
  periodicitySlot: g,
  className: X,
  ...Z
}) {
  const V = Se({
    mode: r,
    controlledOpen: F,
    onOpenChange: K,
    value: m,
    onChange: B,
    rangeValue: p,
    onRangeChange: U,
    controlledPreset: j,
    controlledPresetSelect: $,
    isDisabled: s
  }), {
    open: t,
    setOpen: i,
    presetOpen: c,
    setPresetOpen: l,
    preset: v,
    view: f,
    containerRef: n,
    closedByKeyboard: u,
    days: P,
    monthItems: w,
    yearItems: T,
    headerLabel: E,
    singleInputText: ee,
    startRawText: te,
    endRawText: re,
    startTimeRaw: ne,
    endTimeRaw: ae,
    isApplyDisabled: b,
    closeAndRevert: d,
    handlePrev: S,
    handleNext: A,
    handleHeaderClick: I,
    handleItemClick: x,
    handleDayClick: N,
    handleDayHover: oe,
    handleDayHoverEnd: se,
    handlePresetSelect: M,
    handleApply: O,
    handleCancel: R,
    handleSingleInputChange: ie,
    handleStartDateChange: ce,
    handleEndDateChange: le,
    handleStartTimeChange: ue,
    handleEndTimeChange: de
  } = V;
  ke(n, d), Ce("Escape", d);
  const y = ge(t);
  ve(() => {
    !y.current && t && requestAnimationFrame(() => {
      var k;
      const e = (k = n.current) == null ? void 0 : k.querySelector(".fds-datepicker__popover");
      if (!e) return;
      const a = e.querySelector(
        'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      a == null || a.focus();
    }), y.current && !t && u.current && (u.current = !1, requestAnimationFrame(() => {
      var a;
      const e = (a = n.current) == null ? void 0 : a.querySelector(
        "button.fds-date-trigger__field, input.fds-date-trigger__input"
      );
      e == null || e.focus();
    })), y.current = t;
  }, [t, n, u]);
  const pe = ye(
    (e) => {
      if (s) return;
      const a = e.target;
      if (!(a.closest(".fds-date-trigger__field") !== null)) {
        e.key === "Escape" && (t || c) && (e.preventDefault(), e.stopPropagation(), u.current = !0, d());
        return;
      }
      const L = a.tagName === "INPUT";
      switch (e.key) {
        case "Enter":
        case " ":
          !L && r === "range" && (e.preventDefault(), l(!1), i(!t));
          break;
        case "Escape":
          (t || c) && (e.preventDefault(), e.stopPropagation(), u.current = !0, d());
          break;
        case "ArrowDown":
        case "ArrowUp":
          L || (e.preventDefault(), t || (l(!1), i(!0)));
          break;
      }
    },
    [s, t, c, r, i, l, d, u]
  ), fe = r === "single" && m ? C(m) : void 0, me = r === "range" && p ? `${C(p.start)} - ${C(p.end)}` : void 0, he = Ae[v] ?? "Custom";
  return /* @__PURE__ */ H("div", { ref: n, className: q("fds-datepicker", X), onKeyDown: pe, ...Z, children: [
    /* @__PURE__ */ H("div", { className: q("fds-datepicker__trigger-row", D && !!g && "fds-datepicker__trigger-row--with-periodicity"), children: [
      /* @__PURE__ */ o(
        _e,
        {
          selectionType: r,
          label: G,
          placeholder: W,
          date: fe,
          presetValue: he,
          range: me,
          showPreset: h,
          isOpen: t,
          isDisabled: s,
          helpText: z,
          errorText: J,
          validationState: Q,
          onClick: () => {
            s || (!t && n.current && n.current.dispatchEvent(new MouseEvent("mousedown", { bubbles: !0, cancelable: !0 })), l(!1), i(!t));
          },
          onPresetClick: () => {
            s || (!c && n.current && n.current.dispatchEvent(new MouseEvent("mousedown", { bubbles: !0, cancelable: !0 })), i(!1), l(!c));
          },
          inputValue: r === "single" ? ee : void 0,
          onInputChange: r === "single" ? ie : void 0,
          onInputFocus: () => {
            !s && !t && i(!0);
          }
        }
      ),
      D && g && /* @__PURE__ */ o("div", { className: "fds-datepicker__periodicity", onMouseDown: () => {
        t && i(!1), c && l(!1);
      }, children: g })
    ] }),
    h && c && /* @__PURE__ */ o("div", { className: "fds-datepicker__preset-dropdown", children: /* @__PURE__ */ o(Te, { children: /* @__PURE__ */ o(be, { children: (_ ?? we).filter((e) => e.value !== "custom").map((e) => /* @__PURE__ */ o(
      Ee,
      {
        title: e.label,
        selectionType: "Single",
        isSelected: v === e.value,
        onClick: () => {
          M(e.value), l(!1);
        }
      },
      e.value
    )) }) }) }),
    t && /* @__PURE__ */ o("div", { className: "fds-datepicker__popover", children: r === "single" ? /* @__PURE__ */ o(
      Pe,
      {
        view: f,
        headerLabel: E,
        days: P,
        items: f === "month" ? w : T,
        onDayClick: N,
        onItemClick: x,
        onHeaderClick: I,
        onPrev: S,
        onNext: A,
        showFooter: !0,
        isApplyDisabled: b,
        onCancel: R,
        onApply: O
      }
    ) : /* @__PURE__ */ o(
      De,
      {
        showPresets: Y && h,
        presets: _,
        selectedPreset: v,
        onPresetSelect: M,
        startDate: te,
        endDate: re,
        startTime: ne,
        endTime: ae,
        onStartDateChange: ce,
        onEndDateChange: le,
        onStartTimeChange: ue,
        onEndTimeChange: de,
        calendarLabel: E,
        view: f,
        days: P,
        items: f === "month" ? w : T,
        onDayClick: N,
        onDayHover: oe,
        onDayHoverEnd: se,
        onItemClick: x,
        onCalendarLabelClick: I,
        onPrevMonth: S,
        onNextMonth: A,
        isApplyDisabled: b,
        onCancel: R,
        onApply: O
      }
    ) })
  ] });
}
Ie.displayName = "DatePicker";
export {
  Ie as DatePicker
};
