import { jsxs as t, jsx as e } from "react/jsx-runtime";
import { cn as N } from "../../../utils/cn.js";
import { TimeInputFooter as P } from "./TimeInputFooter.js";
import { TimeColumn as o } from "./TimeColumn.js";
/* empty css                     */
const m = ["AM", "PM"];
function _({
  hourFormat: i,
  hourItems: r,
  minuteItems: s,
  hourIndex: n,
  minuteIndex: l,
  meridiem: d,
  onHourChange: p,
  onMinuteChange: c,
  onMeridiemChange: a,
  showFooter: u = !0,
  applyLabel: I,
  cancelLabel: f,
  isApplyDisabled: M = !1,
  onCancel: x,
  onApply: v,
  className: T,
  ...S
}) {
  const b = d === "AM" ? 0 : 1;
  return /* @__PURE__ */ t("div", { className: N("fds-time-popover", T), ...S, children: [
    /* @__PURE__ */ t("div", { className: "fds-time-popover__columns", children: [
      /* @__PURE__ */ e(
        o,
        {
          label: "Hours",
          items: r,
          selectedIndex: n,
          onSelect: p
        }
      ),
      /* @__PURE__ */ e(
        o,
        {
          label: "Minutes",
          items: s,
          selectedIndex: l,
          onSelect: c
        }
      ),
      i === "12" && /* @__PURE__ */ e(
        o,
        {
          label: "Meridiem",
          items: m,
          selectedIndex: b,
          onSelect: (E) => a(m[E])
        }
      )
    ] }),
    u && /* @__PURE__ */ e(
      P,
      {
        cancelLabel: f,
        applyLabel: I,
        isApplyDisabled: M,
        onCancel: x,
        onApply: v
      }
    )
  ] });
}
_.displayName = "TimeInputPopover";
export {
  _ as TimeInputPopover
};
