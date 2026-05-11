import { jsxs as c, jsx as t, Fragment as R } from "react/jsx-runtime";
import { useState as a, useEffect as pe } from "react";
import { SelectInput as _ } from "../../inputs/SelectInput/SelectInput.js";
import { DropdownMenu as y } from "../../overlays/DropdownMenu/DropdownMenu.js";
import { ActionListItem as h } from "../../overlays/DropdownMenu/ActionListItem.js";
import { Radio as _e } from "../../inputs/Radio/Radio.js";
import { RadioGroup as Ee } from "../../inputs/Radio/RadioGroup.js";
import { ProductAccordionItem as $ } from "../ProductAccordion/ProductAccordionItem.js";
import { Switch as j } from "../../inputs/Switch/Switch.js";
import { ListCardLeadingItem as Me } from "../ListCard/ListCardLeadingItem.js";
import { ListCardTrailingItem as g } from "../ListCard/ListCardTrailingItem.js";
import { ListCard as J } from "../ListCard/ListCard.js";
import { TextInput as Le } from "../../inputs/TextInput/TextInput.js";
import { AddDurationPanel as Fe } from "./AddDurationPanel.js";
import { AddShiftPanel as ze } from "./AddShiftPanel.js";
/* empty css                         */
const I = [
  { id: "today", label: "Today", calendarType: "today", isBuiltIn: !0 },
  { id: "yesterday", label: "Yesterday", calendarType: "yesterday", isBuiltIn: !0 },
  { id: "current_week", label: "Current Week", calendarType: "current_week", isBuiltIn: !0 },
  { id: "previous_week", label: "Previous Week", calendarType: "previous_week", isBuiltIn: !0 },
  { id: "last_7d", label: "Last 7 Days", x: 7, xPeriod: "day", isBuiltIn: !0 },
  { id: "current_month", label: "Current Month", calendarType: "current_month", isBuiltIn: !0 },
  { id: "previous_month", label: "Previous Month", calendarType: "previous_month", isBuiltIn: !0 },
  { id: "last_30d", label: "Last 30 Days", x: 30, xPeriod: "day", isBuiltIn: !0 }
], M = new Set(I.map((i) => i.id)), Be = new Set(I.map((i) => i.id)), He = "today", ye = [
  { value: "fixed", label: "Fixed Type" },
  { value: "local", label: "Local Time" },
  { value: "global", label: "Global Timepicker" }
], qe = [
  "UTC",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Paris",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Australia/Sydney"
], Ue = {
  minute: 1,
  hour: 60,
  day: 1440,
  week: 10080,
  month: 43200,
  year: 525600
}, We = Array.from({ length: 24 }, (i, d) => String(d).padStart(2, "0")), Ye = Array.from({ length: 60 }, (i, d) => String(d).padStart(2, "0")), Ge = Array.from({ length: 31 }, (i, d) => String(d + 1).padStart(2, "0")), Re = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], $e = Array.from({ length: 11 }, (i, d) => String(2020 + d)), je = ["S", "M", "T", "W", "T", "F", "S"], Je = {
  identifier: "start",
  hour: "",
  minute: "",
  dayOfWeek: null,
  date: "",
  month: "",
  year: ""
};
function ue(i) {
  var S;
  if ((S = i.periodicities) != null && S.length) return i.periodicities.join(", ");
  if (i.calendarType)
    switch (i.calendarType) {
      case "today":
      case "yesterday":
        return "Hourly";
      case "current_week":
      case "previous_week":
        return "Hourly, Daily";
      case "current_month":
      case "previous_month":
        return "Daily";
    }
  const d = (i.x ?? 1) * (Ue[i.xPeriod ?? "day"] ?? 1440);
  return d <= 60 ? "Minute, Hourly" : d <= 1440 ? "Hourly" : d <= 10080 ? "Hourly, Daily" : d <= 43200 ? "Daily" : "Daily, Monthly";
}
function ri({ value: i, onChange: d, globalTimepickers: S = [], mode: ge }) {
  var de, re, me;
  const [L, K] = a((i == null ? void 0 : i.timezone) ?? "Asia/Kolkata"), [N, Z] = a((i == null ? void 0 : i.timeType) ?? "fixed"), [A, F] = a((i == null ? void 0 : i.globalTimepickerId) ?? ""), [C, z] = a(
    i != null && i.allDurations ? new Set(i.allDurations.filter((e) => M.has(e.id)).map((e) => e.id)) : new Set(Be)
  ), [D, B] = a(
    ((de = i == null ? void 0 : i.allDurations) == null ? void 0 : de.filter((e) => !M.has(e.id))) ?? []
  ), [k, P] = a((i == null ? void 0 : i.defaultDurationId) ?? He), [w, Q] = a((i == null ? void 0 : i.disablePeriodicities) ?? !1), [V, X] = a((i == null ? void 0 : i.comparisonMode) ?? !1), [v, ee] = a((i == null ? void 0 : i.disableTimeSelection) ?? !1), [ie, te] = a((i == null ? void 0 : i.futureDaysAllowed) ?? ""), [b, H] = a((i == null ? void 0 : i.shifts) ?? []), [q, ne] = a((i == null ? void 0 : i.shiftAggregator) ?? ""), [r, le] = a((i == null ? void 0 : i.cycleTime) ?? Je), [be, Te] = a(!1), [Se, De] = a(!1), [Ie, Ne] = a(!1), [p, Ce] = a(null), [ce, u] = a(null), [ae, O] = a(null), [oe, x] = a(null);
  function o(e, n) {
    Ce(n ? e : null);
  }
  pe(() => {
    d(se({}));
  }, []), pe(() => {
    i && (i.timezone !== void 0 && K(i.timezone), i.timeType !== void 0 && Z(i.timeType), i.globalTimepickerId !== void 0 && F(i.globalTimepickerId), i.disablePeriodicities !== void 0 && Q(i.disablePeriodicities), i.comparisonMode !== void 0 && X(i.comparisonMode), i.disableTimeSelection !== void 0 && ee(i.disableTimeSelection), i.futureDaysAllowed !== void 0 && te(i.futureDaysAllowed), i.shiftAggregator !== void 0 && ne(i.shiftAggregator), i.shifts && H(i.shifts), i.cycleTime && le(i.cycleTime), i.defaultDurationId && P(i.defaultDurationId), i.allDurations && (z(new Set(i.allDurations.filter((e) => M.has(e.id)).map((e) => e.id))), B(i.allDurations.filter((e) => !M.has(e.id)))));
  }, [i == null ? void 0 : i.timezone, i == null ? void 0 : i.allDurations, i == null ? void 0 : i.defaultDurationId, i == null ? void 0 : i.shifts, i == null ? void 0 : i.cycleTime]);
  function se(e) {
    var fe, he;
    const n = e.enabledIds ?? C, l = e.customPresets ?? D, m = e.defaultDurationId ?? k, f = [
      ...I.filter((G) => n.has(G.id)),
      ...l
    ], Y = ((fe = f.find((G) => G.id === m)) == null ? void 0 : fe.id) ?? ((he = f[0]) == null ? void 0 : he.id) ?? "";
    return {
      timezone: e.timezone ?? L,
      timeType: e.timeType ?? N,
      globalTimepickerId: e.globalTimepickerId ?? A,
      allDurations: f,
      defaultDurationId: Y,
      defaultPeriodicity: (i == null ? void 0 : i.defaultPeriodicity) ?? "hourly",
      disablePeriodicities: e.disablePeriodicities ?? w,
      comparisonMode: e.comparisonMode ?? V,
      disableTimeSelection: e.disableTimeSelection ?? v,
      futureDaysAllowed: e.futureDaysAllowed ?? ie,
      shifts: e.shifts ?? b,
      shiftAggregator: e.shiftAggregator ?? q,
      cycleTime: e.cycleTime ?? r
    };
  }
  function s(e) {
    d(se(e));
  }
  function U(e, n) {
    const l = new Set(C);
    if (n)
      l.add(e);
    else if (l.delete(e), k === e) {
      const m = I.find((Y) => l.has(Y.id)), f = (m == null ? void 0 : m.id) ?? "";
      P(f), z(l), s({ enabledIds: l, defaultDurationId: f });
      return;
    }
    z(l), s({ enabledIds: l });
  }
  function W(e) {
    P(e), s({ defaultDurationId: e });
  }
  function ke(e) {
    const n = D.filter((l) => l.id !== e);
    if (B(n), k === e) {
      const l = [...I.filter((f) => C.has(f.id)), ...n][0], m = (l == null ? void 0 : l.id) ?? "";
      P(m), s({ customPresets: n, defaultDurationId: m });
    } else
      s({ customPresets: n });
  }
  function Ae(e) {
    let n;
    ae ? n = D.map((l) => l.id === e.id ? e : l) : n = [...D, e], B(n), s({ customPresets: n }), u(null), O(null);
  }
  function Pe(e) {
    const n = b.filter((l) => l.id !== e);
    H(n), s({ shifts: n });
  }
  function we(e) {
    let n;
    oe ? n = b.map((l) => l.id === e.id ? e : l) : n = [...b, e], H(n), s({ shifts: n }), u(null), x(null);
  }
  function T(e) {
    const n = { ...r, ...e };
    le(n), s({ cycleTime: n });
  }
  const Oe = C.size + D.length, xe = N === "global", E = ge === "series";
  return /* @__PURE__ */ c("div", { className: "fds-ttc", children: [
    /* @__PURE__ */ t("div", { className: "fds-ttc__body", children: /* @__PURE__ */ c("div", { className: "fds-ttc__section", children: [
      /* @__PURE__ */ c("div", { style: { padding: "16px 16px 0 16px", display: "flex", flexDirection: "column", gap: 12 }, children: [
        /* @__PURE__ */ t("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ t(
          _,
          {
            label: "TimeZone",
            name: "timezone",
            placeholder: "Select timezone",
            value: L,
            isOpen: p === "timezone",
            onOpenChange: (e) => o("timezone", e),
            children: /* @__PURE__ */ t(y, { children: qe.map((e) => /* @__PURE__ */ t(
              h,
              {
                title: e,
                selectionType: "Single",
                isSelected: L === e,
                onClick: () => {
                  K(e), o("timezone", !1), s({ timezone: e });
                }
              },
              e
            )) })
          }
        ) }),
        /* @__PURE__ */ t("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ t(
          _,
          {
            label: "Time Type",
            name: "timeType",
            placeholder: "Select time type",
            value: ((re = ye.find((e) => e.value === N)) == null ? void 0 : re.label) ?? "",
            isOpen: p === "timeType",
            onOpenChange: (e) => o("timeType", e),
            children: /* @__PURE__ */ t(y, { children: ye.map((e) => /* @__PURE__ */ t(
              h,
              {
                title: e.label,
                selectionType: "Single",
                isSelected: N === e.value,
                onClick: () => {
                  Z(e.value), o("timeType", !1);
                  const n = e.value !== "global" ? "" : A;
                  F(n), s({ timeType: e.value, globalTimepickerId: n });
                }
              },
              e.value
            )) })
          }
        ) }),
        N === "global" && /* @__PURE__ */ t("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ t(
          _,
          {
            label: "Global Timepicker",
            name: "globalTimepicker",
            placeholder: "Select timepicker",
            value: ((me = S.find((e) => e.id === A)) == null ? void 0 : me.name) ?? "",
            isOpen: p === "globalTimepicker",
            onOpenChange: (e) => o("globalTimepicker", e),
            children: /* @__PURE__ */ c(y, { children: [
              S.length === 0 && /* @__PURE__ */ t(h, { title: "No timepickers available", isDisabled: !0 }),
              S.map((e) => /* @__PURE__ */ t(
                h,
                {
                  title: e.name,
                  selectionType: "Single",
                  isSelected: A === e.id,
                  onClick: () => {
                    F(e.id), o("globalTimepicker", !1), s({ globalTimepickerId: e.id });
                  }
                },
                e.id
              ))
            ] })
          }
        ) })
      ] }),
      !xe && /* @__PURE__ */ c(R, { children: [
        /* @__PURE__ */ t(
          $,
          {
            title: "Cycle Time",
            isExpanded: Ie,
            onToggle: () => Ne((e) => !e),
            children: /* @__PURE__ */ c("div", { className: "fds-ttc__cycle-body", children: [
              /* @__PURE__ */ c(
                Ee,
                {
                  label: "Cycle Time Identifier",
                  name: "cycle-identifier",
                  value: r.identifier,
                  onChange: (e) => T({ identifier: e.value }),
                  orientation: "Horizontal",
                  children: [
                    /* @__PURE__ */ t(_e, { value: "start", label: "Start" }),
                    /* @__PURE__ */ t(_e, { value: "end", label: "End" })
                  ]
                }
              ),
              /* @__PURE__ */ c("div", { className: "fds-ttc__cycle-row fds-ttc__cycle-row--gap16", children: [
                /* @__PURE__ */ t("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ t(
                  _,
                  {
                    label: "Hr",
                    name: "cycle-hr",
                    placeholder: "Select Hr",
                    value: r.hour,
                    isOpen: p === "hr",
                    onOpenChange: (e) => o("hr", e),
                    children: /* @__PURE__ */ t(y, { className: "fds-ttc__cycle-dropdown-scroll", children: We.map((e) => /* @__PURE__ */ t(
                      h,
                      {
                        title: e,
                        selectionType: "Single",
                        isSelected: r.hour === e,
                        onClick: () => {
                          T({ hour: e }), o("hr", !1);
                        }
                      },
                      e
                    )) })
                  }
                ) }),
                /* @__PURE__ */ t("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ t(
                  _,
                  {
                    label: "Min",
                    name: "cycle-min",
                    placeholder: "Select min",
                    value: r.minute,
                    isOpen: p === "min",
                    onOpenChange: (e) => o("min", e),
                    children: /* @__PURE__ */ t(y, { className: "fds-ttc__cycle-dropdown-scroll", children: Ye.map((e) => /* @__PURE__ */ t(
                      h,
                      {
                        title: e,
                        selectionType: "Single",
                        isSelected: r.minute === e,
                        onClick: () => {
                          T({ minute: e }), o("min", !1);
                        }
                      },
                      e
                    )) })
                  }
                ) })
              ] }),
              /* @__PURE__ */ c("div", { className: "fds-ttc__cycle-day-section", children: [
                /* @__PURE__ */ c("div", { className: "fds-ttc__cycle-day-label", children: [
                  /* @__PURE__ */ t("span", { className: "fds-ttc__label-text", children: "Day" }),
                  /* @__PURE__ */ t("span", { className: "fds-ttc__required-marker", children: "*" })
                ] }),
                /* @__PURE__ */ t("div", { className: "fds-ttc__cycle-day-row", children: je.map((e, n) => /* @__PURE__ */ t(
                  "button",
                  {
                    className: `fds-ttc__cycle-day-btn${r.dayOfWeek === n ? " fds-ttc__cycle-day-btn--active" : ""}`,
                    onClick: () => T({ dayOfWeek: r.dayOfWeek === n ? null : n }),
                    children: e
                  },
                  n
                )) })
              ] }),
              /* @__PURE__ */ c("div", { className: "fds-ttc__cycle-row fds-ttc__cycle-row--gap12", children: [
                /* @__PURE__ */ t("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ t(
                  _,
                  {
                    label: "Date",
                    name: "cycle-date",
                    placeholder: "Select date",
                    value: r.date,
                    isOpen: p === "date",
                    onOpenChange: (e) => o("date", e),
                    children: /* @__PURE__ */ t(y, { className: "fds-ttc__cycle-dropdown-scroll", children: Ge.map((e) => /* @__PURE__ */ t(
                      h,
                      {
                        title: e,
                        selectionType: "Single",
                        isSelected: r.date === e,
                        onClick: () => {
                          T({ date: e }), o("date", !1);
                        }
                      },
                      e
                    )) })
                  }
                ) }),
                /* @__PURE__ */ t("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ t(
                  _,
                  {
                    label: "Month",
                    name: "cycle-month",
                    placeholder: "Select month",
                    value: r.month,
                    isOpen: p === "month",
                    onOpenChange: (e) => o("month", e),
                    children: /* @__PURE__ */ t(y, { children: Re.map((e) => /* @__PURE__ */ t(
                      h,
                      {
                        title: e,
                        selectionType: "Single",
                        isSelected: r.month === e,
                        onClick: () => {
                          T({ month: e }), o("month", !1);
                        }
                      },
                      e
                    )) })
                  }
                ) })
              ] }),
              /* @__PURE__ */ t("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ t(
                _,
                {
                  label: "Year",
                  name: "cycle-year",
                  placeholder: "Select year",
                  value: r.year,
                  isOpen: p === "year",
                  onOpenChange: (e) => o("year", e),
                  children: /* @__PURE__ */ t(y, { children: $e.map((e) => /* @__PURE__ */ t(
                    h,
                    {
                      title: e,
                      selectionType: "Single",
                      isSelected: r.year === e,
                      onClick: () => {
                        T({ year: e }), o("year", !1);
                      }
                    },
                    e
                  )) })
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ t(
          $,
          {
            title: "Duration",
            isExpanded: be,
            onToggle: () => Te((e) => !e),
            trailingIcon: /* @__PURE__ */ c("div", { className: "fds-ttc__duration-header-actions", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ t("span", { className: "fds-ttc__duration-counter", children: Oe }),
              /* @__PURE__ */ t(
                "span",
                {
                  className: "fds-ttc__duration-add-btn material-icons",
                  role: "button",
                  tabIndex: 0,
                  title: "Add preset",
                  onClick: () => {
                    O(null), u("duration");
                  },
                  children: "add"
                }
              )
            ] }),
            children: /* @__PURE__ */ c("div", { className: "fds-ttc__cycle-body", children: [
              !E && /* @__PURE__ */ c("div", { className: "fds-ttc__duration-toggle-row", children: [
                /* @__PURE__ */ t("span", { className: "fds-ttc__duration-toggle-label", children: "Disable Periodicities" }),
                /* @__PURE__ */ t(
                  j,
                  {
                    name: "disablePeriodicities",
                    accessibilityLabel: "Disable Periodicities",
                    isChecked: w,
                    onChange: ({ isChecked: e }) => {
                      Q(e), s({ disablePeriodicities: e });
                    }
                  }
                )
              ] }),
              I.map((e) => {
                const n = C.has(e.id), l = k === e.id && n, m = ue(e);
                return /* @__PURE__ */ t(
                  J,
                  {
                    title: e.label,
                    subtitle: w || E ? void 0 : `Periodicity: ${m}`,
                    isSelected: l,
                    className: l ? void 0 : "fds-ttc__duration-card--hideable",
                    onClick: () => {
                      n ? l || W(e.id) : U(e.id, !0);
                    },
                    trailingItems: l ? /* @__PURE__ */ t(g, { trailing: "Icon", icon: /* @__PURE__ */ t("span", { className: "material-icons fds-ttc__duration-icon fds-ttc__duration-icon--active", children: "check_circle" }) }) : n ? /* @__PURE__ */ c(R, { children: [
                      /* @__PURE__ */ t(
                        g,
                        {
                          trailing: "Icon",
                          title: "Set as default",
                          icon: /* @__PURE__ */ t("span", { className: "material-icons fds-ttc__duration-icon", children: "check_circle" }),
                          onClick: (f) => {
                            f.stopPropagation(), W(e.id);
                          }
                        }
                      ),
                      /* @__PURE__ */ t(
                        g,
                        {
                          trailing: "Icon",
                          title: "Hide",
                          icon: /* @__PURE__ */ t("span", { className: "material-icons fds-ttc__duration-icon", children: "visibility" }),
                          onClick: (f) => {
                            f.stopPropagation(), U(e.id, !1);
                          }
                        }
                      )
                    ] }) : /* @__PURE__ */ t(
                      g,
                      {
                        trailing: "Icon",
                        title: "Show",
                        icon: /* @__PURE__ */ t("span", { className: "material-icons fds-ttc__duration-icon", children: "visibility_off" }),
                        onClick: (f) => {
                          f.stopPropagation(), U(e.id, !0);
                        }
                      }
                    )
                  },
                  e.id
                );
              }),
              D.map((e) => {
                const n = k === e.id, l = ue(e);
                return /* @__PURE__ */ t(
                  J,
                  {
                    title: e.label,
                    subtitle: w || E ? void 0 : `Periodicity: ${l}`,
                    isSelected: n,
                    className: n ? void 0 : "fds-ttc__duration-card--hideable",
                    onClick: () => {
                      O(e), u("duration");
                    },
                    trailingItems: n ? /* @__PURE__ */ t(g, { trailing: "Icon", icon: /* @__PURE__ */ t("span", { className: "material-icons fds-ttc__duration-icon fds-ttc__duration-icon--active", children: "check_circle" }) }) : /* @__PURE__ */ c(R, { children: [
                      /* @__PURE__ */ t(
                        g,
                        {
                          trailing: "Icon",
                          title: "Set as default",
                          icon: /* @__PURE__ */ t("span", { className: "material-icons fds-ttc__duration-icon", children: "check_circle" }),
                          onClick: (m) => {
                            m.stopPropagation(), W(e.id);
                          }
                        }
                      ),
                      /* @__PURE__ */ t(
                        g,
                        {
                          trailing: "Icon",
                          title: "Delete",
                          icon: /* @__PURE__ */ t("span", { className: "material-icons fds-ttc__duration-icon fds-ttc__duration-icon--danger", children: "delete_outline" }),
                          onClick: (m) => {
                            m.stopPropagation(), ke(e.id);
                          }
                        }
                      )
                    ] })
                  },
                  e.id
                );
              })
            ] })
          }
        ),
        !E && /* @__PURE__ */ t(
          $,
          {
            title: "Shift",
            isExpanded: Se,
            onToggle: () => De((e) => !e),
            trailingIcon: /* @__PURE__ */ c("div", { className: "fds-ttc__duration-header-actions", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ t("span", { className: "fds-ttc__duration-counter", children: b.length }),
              /* @__PURE__ */ t(
                "span",
                {
                  className: "fds-ttc__duration-add-btn material-icons",
                  role: "button",
                  tabIndex: 0,
                  title: "Add shift",
                  onClick: () => {
                    x(null), u("shift");
                  },
                  children: "add"
                }
              )
            ] }),
            children: /* @__PURE__ */ c("div", { className: "fds-ttc__cycle-body", children: [
              b.map((e) => /* @__PURE__ */ t(
                J,
                {
                  title: e.name,
                  subtitle: `Time: ${e.startTime || "00:00"} - ${e.endTime || "00:00"}`,
                  className: "fds-ttc__duration-card--hideable",
                  leadingItem: /* @__PURE__ */ t(Me, { leading: "Color", color: e.color }),
                  onClick: () => {
                    x(e), u("shift");
                  },
                  trailingItems: /* @__PURE__ */ t(
                    g,
                    {
                      trailing: "Icon",
                      title: "Delete",
                      icon: /* @__PURE__ */ t("span", { className: "material-icons fds-ttc__duration-icon fds-ttc__duration-icon--danger", children: "delete_outline" }),
                      onClick: (n) => {
                        n.stopPropagation(), Pe(e.id);
                      }
                    }
                  )
                },
                e.id
              )),
              b.length === 0 && /* @__PURE__ */ t("p", { className: "fds-ttc__shift-empty", children: "No shifts added. Click + to add one." }),
              /* @__PURE__ */ t("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ t(
                _,
                {
                  label: "Shift Aggregator",
                  name: "shiftAggregator",
                  placeholder: "Select aggregator",
                  value: q,
                  isOpen: p === "shiftAggregator",
                  onOpenChange: (e) => o("shiftAggregator", e),
                  children: /* @__PURE__ */ t(y, { children: ["Sum", "Average", "Min", "Max", "First", "Last"].map((e) => /* @__PURE__ */ t(
                    h,
                    {
                      title: e,
                      selectionType: "Single",
                      isSelected: q === e,
                      onClick: () => {
                        ne(e), o("shiftAggregator", !1), s({ shiftAggregator: e });
                      }
                    },
                    e
                  )) })
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ c("label", { className: "fds-ttc__switch-row", children: [
          /* @__PURE__ */ t("span", { className: "fds-ttc__switch-label", children: "Comparison Mode" }),
          /* @__PURE__ */ t(
            j,
            {
              name: "comparisonMode",
              accessibilityLabel: "Comparison Mode",
              isChecked: V,
              onChange: ({ isChecked: e }) => {
                X(e), s({ comparisonMode: e });
              }
            }
          )
        ] }),
        /* @__PURE__ */ c("label", { className: "fds-ttc__switch-row", children: [
          /* @__PURE__ */ c("span", { className: "fds-ttc__switch-label", children: [
            "Disable Time Selection",
            /* @__PURE__ */ t("span", { className: "material-icons fds-ttc__info-icon", title: "When enabled, users cannot change the time selection.", children: "info_outline" })
          ] }),
          /* @__PURE__ */ t(
            j,
            {
              name: "disableTimeSelection",
              accessibilityLabel: "Disable Time Selection",
              isChecked: v,
              onChange: ({ isChecked: e }) => {
                ee(e), s({ disableTimeSelection: e });
              }
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { style: { padding: "16px" }, children: /* @__PURE__ */ t(
          Le,
          {
            label: "Future Days Allowed",
            name: "futureDaysAllowed",
            placeholder: "Enter value",
            value: ie,
            helpText: "Limits how far in the future a date can be selected.",
            onChange: ({ value: e }) => {
              te(e), s({ futureDaysAllowed: e });
            }
          }
        ) })
      ] })
    ] }) }),
    ce === "duration" && /* @__PURE__ */ t("div", { className: "fds-ttc__panel-overlay", children: /* @__PURE__ */ t(
      Fe,
      {
        preset: ae ?? void 0,
        onClose: () => {
          u(null), O(null);
        },
        onSave: Ae
      }
    ) }),
    ce === "shift" && /* @__PURE__ */ t("div", { className: "fds-ttc__panel-overlay", children: /* @__PURE__ */ t(
      ze,
      {
        shift: oe ?? void 0,
        onClose: () => {
          u(null), x(null);
        },
        onSave: we
      }
    ) })
  ] });
}
export {
  ri as TimeTabConfiguration
};
