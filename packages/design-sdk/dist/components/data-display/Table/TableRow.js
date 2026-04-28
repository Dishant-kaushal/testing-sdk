import { jsxs as b, jsx as s } from "react/jsx-runtime";
/* empty css             */
import { Checkbox as p } from "../../inputs/Checkbox/Checkbox.js";
import { useTableContextOptional as h } from "./TableContext.js";
function w({
  item: c,
  isSelected: i,
  isDisabled: t
}) {
  const n = h();
  return n ? /* @__PURE__ */ s(
    "td",
    {
      className: "fds-table__cell fds-table__cell--selection",
      "data-content-type": "selection",
      onClick: (l) => l.stopPropagation(),
      children: /* @__PURE__ */ s("div", { className: "fds-table__cell-selection-wrapper", children: /* @__PURE__ */ s(
        p,
        {
          label: "",
          size: "Medium",
          "aria-label": i ? "Deselect row" : "Select row",
          checked: i,
          isDisabled: t,
          onClick: (l) => {
            t || l.shiftKey && (l.preventDefault(), n.toggleRowSelectionRange(c.id));
          },
          onChange: (l) => {
            t || n.toggleRowSelection(c.id);
          }
        }
      ) })
    }
  ) : null;
}
function _({
  children: c,
  item: i,
  onClick: t,
  ...n
}) {
  const e = h(), o = i, l = e ? e.isRowSelectable(o) : !0, a = e ? e.selectedIds.includes(o.id) : !1, r = (e == null ? void 0 : e.selectionType) === "multiple", f = (e == null ? void 0 : e.selectionType) === "single", g = r, d = r && (e == null ? void 0 : e.multiSelectTrigger) === "row" || f;
  return /* @__PURE__ */ b(
    "tr",
    {
      className: "fds-table__row",
      "aria-selected": a || void 0,
      "data-selected": a ? "true" : void 0,
      "data-disabled": l ? void 0 : "true",
      onClick: t || d ? (u) => {
        d && l && e && (u.shiftKey && r ? e.toggleRowSelectionRange(o.id) : e.toggleRowSelection(o.id)), t == null || t(i);
      } : void 0,
      ...n,
      children: [
        g && /* @__PURE__ */ s(
          w,
          {
            item: o,
            isSelected: a,
            isDisabled: !l
          }
        ),
        c
      ]
    }
  );
}
export {
  _ as TableRow
};
