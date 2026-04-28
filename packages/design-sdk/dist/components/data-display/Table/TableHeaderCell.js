import { jsx as s, jsxs as _ } from "react/jsx-runtime";
/* empty css                    */
import { Info as S, ChevronUp as g, ChevronDown as K } from "react-feather";
import { useEffect as C } from "react";
import { cn as f } from "../../../utils/cn.js";
import { useTableContextOptional as k } from "./TableContext.js";
function w({ direction: r }) {
  const l = r === "desc", c = r === "asc";
  return /* @__PURE__ */ _("span", { className: "fds-table__sort-indicator", "aria-hidden": "true", children: [
    /* @__PURE__ */ s(
      g,
      {
        size: 12,
        className: f(
          "fds-table__sort-indicator__chevron",
          l && "fds-table__sort-indicator__chevron--active"
        )
      }
    ),
    /* @__PURE__ */ s(
      K,
      {
        size: 12,
        className: f(
          "fds-table__sort-indicator__chevron",
          c && "fds-table__sort-indicator__chevron--active"
        )
      }
    )
  ] });
}
function H({
  children: r,
  infoTooltip: l,
  className: c,
  ...p
}) {
  var h, b, m;
  const { isSticky: T, headerKey: t, onClick: a, onKeyDown: i, ...u } = p, e = k(), o = !!(t && ((h = e == null ? void 0 : e.sortableKeys) != null && h.includes(t)));
  typeof process < "u" && ((b = process.env) == null ? void 0 : b.NODE_ENV) !== "production" && C(() => {
    t && e && !e.sortableKeys.includes(t) && console.warn(
      `[TableHeaderCell] \`headerKey="${t}"\` has no matching entry in \`sortFunctions\` on the parent <Table>. The column will not be sortable.`
    );
  }, [t, e == null ? void 0 : e.sortableKeys]);
  const d = o && ((m = e == null ? void 0 : e.sortState) == null ? void 0 : m.sortKey) === t ? e.sortState.direction : null, v = (n) => {
    a == null || a(n), o && t && (e == null || e.toggleSort(t));
  }, y = (n) => {
    i == null || i(n), !(!o || !t) && (n.key === "Enter" || n.key === " ") && (n.preventDefault(), e == null || e.toggleSort(t));
  }, N = o ? d === "asc" ? "ascending" : d === "desc" ? "descending" : "none" : void 0;
  return /* @__PURE__ */ s(
    "th",
    {
      className: f("fds-table__header-cell", "BodyMediumSemibold", c),
      "data-sortable": o ? "true" : void 0,
      "aria-sort": N,
      tabIndex: o ? 0 : void 0,
      onClick: o ? v : a,
      onKeyDown: o ? y : i,
      ...u,
      children: /* @__PURE__ */ _("div", { className: "fds-table__header-cell-inner", children: [
        /* @__PURE__ */ _("div", { className: "fds-table__header-cell-text-container", children: [
          /* @__PURE__ */ s("span", { className: "fds-table__header-cell-text", children: r }),
          l && /* @__PURE__ */ s("span", { className: "fds-table__header-cell-info", "aria-hidden": "true", children: /* @__PURE__ */ s(S, { size: 16 }) })
        ] }),
        o && /* @__PURE__ */ s(w, { direction: d })
      ] })
    }
  );
}
export {
  H as TableHeaderCell
};
