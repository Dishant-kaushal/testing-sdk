import { jsxs as m, jsx as e } from "react/jsx-runtime";
import { useState as l } from "react";
import { X as j } from "react-feather";
import { TextInput as g } from "../../inputs/TextInput/TextInput.js";
import { SelectInput as c } from "../../inputs/SelectInput/SelectInput.js";
import { DropdownMenu as t } from "../../overlays/DropdownMenu/DropdownMenu.js";
import { ActionListItem as r } from "../../overlays/DropdownMenu/ActionListItem.js";
import { Divider as C } from "../../layout/Divider/Divider.js";
import { Button as F } from "../../actions/Button/Button.js";
/* empty css                     */
const R = ["Previous", "Next"], S = ["Minute", "Hour", "Day", "Week", "Month", "Year"], b = ["Start", "Now", "End"], V = ["Minute", "Hourly", "Daily", "Weekly", "Monthly"];
function I(d) {
  return d && d[0].toUpperCase() + d.slice(1);
}
function ni({ onClose: d, onSave: D, preset: n }) {
  const N = !!n, [u, T] = l((n == null ? void 0 : n.label) ?? ""), [v, k] = l((n == null ? void 0 : n.navigation) ?? "Previous"), [E, q] = l(String((n == null ? void 0 : n.x) ?? 1)), [y, w] = l(I((n == null ? void 0 : n.xPeriod) ?? "Day")), [h, M] = l((n == null ? void 0 : n.xEvent) ?? "Start"), [O, Y] = l(String((n == null ? void 0 : n.y) ?? 1)), [f, X] = l(I((n == null ? void 0 : n.yPeriod) ?? "Day")), [P, A] = l((n == null ? void 0 : n.yEvent) ?? "End"), [_, x] = l((n == null ? void 0 : n.periodicities) ?? ["Hourly", "Daily"]), [o, B] = l(null);
  function a(i, s) {
    B(s ? i : null);
  }
  function L(i) {
    x(
      (s) => s.includes(i) ? s.filter((W) => W !== i) : [...s, i]
    );
  }
  function z() {
    if (!u.trim()) return;
    const i = {
      id: (n == null ? void 0 : n.id) ?? `custom_${Date.now()}`,
      label: u.trim(),
      x: Number(E) || 1,
      xPeriod: y.toLowerCase(),
      navigation: v,
      xEvent: h,
      y: Number(O) || 1,
      yPeriod: f.toLowerCase(),
      yEvent: P,
      periodicities: _,
      isBuiltIn: !1
    };
    D(i);
  }
  const H = _.map((i) => ({ id: i, label: i }));
  return /* @__PURE__ */ m("div", { className: "fds-adp", children: [
    /* @__PURE__ */ m("div", { className: "fds-adp__header", children: [
      /* @__PURE__ */ e("span", { className: "fds-adp__title", children: N ? "Edit Duration" : "Add Duration" }),
      /* @__PURE__ */ e("button", { className: "fds-adp__close", onClick: d, "aria-label": "Close", children: /* @__PURE__ */ e(j, { size: 16 }) })
    ] }),
    /* @__PURE__ */ e(C, { variant: "Muted" }),
    /* @__PURE__ */ m("div", { className: "fds-adp__body", children: [
      /* @__PURE__ */ e(
        g,
        {
          label: "Name",
          name: "name",
          placeholder: "Enter duration name",
          value: u,
          necessityIndicator: "required",
          onChange: ({ value: i }) => T(i)
        }
      ),
      /* @__PURE__ */ e("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ e(
        c,
        {
          label: "Navigation",
          name: "navigation",
          value: v,
          isOpen: o === "navigation",
          onOpenChange: (i) => a("navigation", i),
          children: /* @__PURE__ */ e(t, { children: R.map((i) => /* @__PURE__ */ e(
            r,
            {
              title: i,
              selectionType: "Single",
              isSelected: v === i,
              onClick: () => {
                k(i), a("navigation", !1);
              }
            },
            i
          )) })
        }
      ) }),
      /* @__PURE__ */ m("div", { className: "fds-adp__row", children: [
        /* @__PURE__ */ e(
          g,
          {
            label: "X",
            name: "x",
            type: "number",
            value: E,
            necessityIndicator: "required",
            onChange: ({ value: i }) => q(i)
          }
        ),
        /* @__PURE__ */ e("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ e(
          c,
          {
            label: "X Period",
            name: "xPeriod",
            value: y,
            isOpen: o === "xPeriod",
            onOpenChange: (i) => a("xPeriod", i),
            children: /* @__PURE__ */ e(t, { children: S.map((i) => /* @__PURE__ */ e(
              r,
              {
                title: i,
                selectionType: "Single",
                isSelected: y === i,
                onClick: () => {
                  w(i), a("xPeriod", !1);
                }
              },
              i
            )) })
          }
        ) })
      ] }),
      /* @__PURE__ */ e("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ e(
        c,
        {
          label: "X Event",
          name: "xEvent",
          value: h,
          isOpen: o === "xEvent",
          onOpenChange: (i) => a("xEvent", i),
          children: /* @__PURE__ */ e(t, { children: b.map((i) => /* @__PURE__ */ e(
            r,
            {
              title: i,
              selectionType: "Single",
              isSelected: h === i,
              onClick: () => {
                M(i), a("xEvent", !1);
              }
            },
            i
          )) })
        }
      ) }),
      /* @__PURE__ */ m("div", { className: "fds-adp__row", children: [
        /* @__PURE__ */ e(
          g,
          {
            label: "Y",
            name: "y",
            type: "number",
            value: O,
            necessityIndicator: "required",
            onChange: ({ value: i }) => Y(i)
          }
        ),
        /* @__PURE__ */ e("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ e(
          c,
          {
            label: "Y Period",
            name: "yPeriod",
            value: f,
            isOpen: o === "yPeriod",
            onOpenChange: (i) => a("yPeriod", i),
            children: /* @__PURE__ */ e(t, { children: S.map((i) => /* @__PURE__ */ e(
              r,
              {
                title: i,
                selectionType: "Single",
                isSelected: f === i,
                onClick: () => {
                  X(i), a("yPeriod", !1);
                }
              },
              i
            )) })
          }
        ) })
      ] }),
      /* @__PURE__ */ e("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ e(
        c,
        {
          label: "Y Event",
          name: "yEvent",
          value: P,
          isOpen: o === "yEvent",
          onOpenChange: (i) => a("yEvent", i),
          children: /* @__PURE__ */ e(t, { children: b.map((i) => /* @__PURE__ */ e(
            r,
            {
              title: i,
              selectionType: "Single",
              isSelected: P === i,
              onClick: () => {
                A(i), a("yEvent", !1);
              }
            },
            i
          )) })
        }
      ) }),
      /* @__PURE__ */ e("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ e(
        c,
        {
          label: "Periodicity",
          name: "periodicity",
          multiType: "multiple-flex",
          tags: H,
          isOpen: o === "periodicity",
          onOpenChange: (i) => a("periodicity", i),
          onBackspace: () => x((i) => i.slice(0, -1)),
          children: /* @__PURE__ */ e(t, { children: V.map((i) => /* @__PURE__ */ e(
            r,
            {
              title: i,
              selectionType: "Multiple",
              isSelected: _.includes(i),
              onClick: () => L(i)
            },
            i
          )) })
        }
      ) })
    ] }),
    /* @__PURE__ */ e(C, { variant: "Muted" }),
    /* @__PURE__ */ e("div", { className: "fds-adp__footer", children: /* @__PURE__ */ e(
      F,
      {
        label: N ? "Save Changes" : "Add Duration",
        variant: "Primary",
        size: "Large",
        isFullWidth: !0,
        onClick: z
      }
    ) })
  ] });
}
export {
  ni as AddDurationPanel
};
