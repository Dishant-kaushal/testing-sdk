import { jsxs as s, jsx as n } from "react/jsx-runtime";
import { useState as l } from "react";
import { X as $ } from "react-feather";
import { TextInput as x } from "../../inputs/TextInput/TextInput.js";
import { SelectInput as i } from "../../inputs/SelectInput/SelectInput.js";
import { DropdownMenu as c } from "../../overlays/DropdownMenu/DropdownMenu.js";
import { ActionListItem as p } from "../../overlays/DropdownMenu/ActionListItem.js";
import { ColorInput as F } from "../../inputs/ColorPicker/ColorInput.js";
import { Divider as M } from "../../layout/Divider/Divider.js";
import { Button as L } from "../../actions/Button/Button.js";
/* empty css                  */
const g = "#e4553d", H = Array.from({ length: 24 }, (o, a) => String(a).padStart(2, "0")), T = Array.from({ length: 60 }, (o, a) => String(a).padStart(2, "0"));
function O(o) {
  const [a, t] = (o || ":").split(":");
  return { hour: a ?? "", minute: t ?? "" };
}
function Q({ onClose: o, onSave: a, shift: t }) {
  const f = !!t, h = O((t == null ? void 0 : t.startTime) ?? ""), N = O((t == null ? void 0 : t.endTime) ?? ""), [u, b] = l((t == null ? void 0 : t.name) ?? ""), [C, w] = l((t == null ? void 0 : t.color) ?? g), [m, y] = l(h.hour), [_, E] = l(h.minute), [S, A] = l(N.hour), [v, D] = l(N.minute), [d, I] = l(null);
  function r(e, q) {
    I(q ? e : null);
  }
  function k() {
    if (!u.trim()) return;
    const e = {
      id: (t == null ? void 0 : t.id) ?? `shift_${Date.now()}`,
      name: u.trim(),
      color: C || g,
      startTime: `${m || "00"}:${_ || "00"}`,
      endTime: `${S || "00"}:${v || "00"}`
    };
    a(e);
  }
  return /* @__PURE__ */ s("div", { className: "fds-asp", children: [
    /* @__PURE__ */ s("div", { className: "fds-asp__header", children: [
      /* @__PURE__ */ n("span", { className: "fds-asp__title", children: f ? "Edit Shift" : "Add Shift" }),
      /* @__PURE__ */ n("button", { className: "fds-asp__close", onClick: o, "aria-label": "Close", children: /* @__PURE__ */ n($, { size: 16 }) })
    ] }),
    /* @__PURE__ */ n(M, { variant: "Muted" }),
    /* @__PURE__ */ s("div", { className: "fds-asp__body", children: [
      /* @__PURE__ */ n(
        x,
        {
          label: "Name",
          name: "shiftName",
          placeholder: "Enter shift name",
          value: u,
          necessityIndicator: "required",
          onChange: ({ value: e }) => b(e)
        }
      ),
      /* @__PURE__ */ n(
        F,
        {
          label: "Color",
          placeholder: "Select a color",
          value: C,
          onChange: (e) => w(e)
        }
      ),
      /* @__PURE__ */ n("span", { className: "fds-asp__section-label", children: "Shift Duration Settings" }),
      /* @__PURE__ */ s("div", { className: "fds-asp__row", children: [
        /* @__PURE__ */ n("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ n(
          i,
          {
            label: "Start Hour",
            name: "startHour",
            placeholder: "Select hr",
            value: m,
            isOpen: d === "startHour",
            onOpenChange: (e) => r("startHour", e),
            children: /* @__PURE__ */ n(c, { className: "fds-asp__dropdown-scroll", children: H.map((e) => /* @__PURE__ */ n(
              p,
              {
                title: e,
                selectionType: "Single",
                isSelected: m === e,
                onClick: () => {
                  y(e), r("startHour", !1);
                }
              },
              e
            )) })
          }
        ) }),
        /* @__PURE__ */ n("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ n(
          i,
          {
            label: "Start Minute",
            name: "startMinute",
            placeholder: "Select min",
            value: _,
            isOpen: d === "startMinute",
            onOpenChange: (e) => r("startMinute", e),
            children: /* @__PURE__ */ n(c, { className: "fds-asp__dropdown-scroll", children: T.map((e) => /* @__PURE__ */ n(
              p,
              {
                title: e,
                selectionType: "Single",
                isSelected: _ === e,
                onClick: () => {
                  E(e), r("startMinute", !1);
                }
              },
              e
            )) })
          }
        ) })
      ] }),
      /* @__PURE__ */ s("div", { className: "fds-asp__row", children: [
        /* @__PURE__ */ n("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ n(
          i,
          {
            label: "End Hour",
            name: "endHour",
            placeholder: "Select hr",
            value: S,
            isOpen: d === "endHour",
            onOpenChange: (e) => r("endHour", e),
            children: /* @__PURE__ */ n(c, { className: "fds-asp__dropdown-scroll", children: H.map((e) => /* @__PURE__ */ n(
              p,
              {
                title: e,
                selectionType: "Single",
                isSelected: S === e,
                onClick: () => {
                  A(e), r("endHour", !1);
                }
              },
              e
            )) })
          }
        ) }),
        /* @__PURE__ */ n("div", { className: "fds-ttc__required-select", children: /* @__PURE__ */ n(
          i,
          {
            label: "End Minute",
            name: "endMinute",
            placeholder: "Select min",
            value: v,
            isOpen: d === "endMinute",
            onOpenChange: (e) => r("endMinute", e),
            children: /* @__PURE__ */ n(c, { className: "fds-asp__dropdown-scroll", children: T.map((e) => /* @__PURE__ */ n(
              p,
              {
                title: e,
                selectionType: "Single",
                isSelected: v === e,
                onClick: () => {
                  D(e), r("endMinute", !1);
                }
              },
              e
            )) })
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ n(M, { variant: "Muted" }),
    /* @__PURE__ */ n("div", { className: "fds-asp__footer", children: /* @__PURE__ */ n(
      L,
      {
        label: f ? "Save Changes" : "Add Shift",
        variant: "Primary",
        size: "Large",
        isFullWidth: !0,
        onClick: k
      }
    ) })
  ] });
}
export {
  Q as AddShiftPanel
};
