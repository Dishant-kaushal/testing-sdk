import { jsxs as H, jsx as m } from "react/jsx-runtime";
import { useEffect as de, useRef as ce, useMemo as O } from "react";
import { useRowSelect as fe } from "../../../node_modules/.pnpm/@table-library_react-table-library@4.1.15_@emotion_react@11.14.0_@types_react@18.3.28_r_b1ae3ad8bf4f174fa5413c12b8f6a307/node_modules/@table-library/react-table-library/select.js";
import { useSort as ue } from "../../../node_modules/.pnpm/@table-library_react-table-library@4.1.15_@emotion_react@11.14.0_@types_react@18.3.28_r_b1ae3ad8bf4f174fa5413c12b8f6a307/node_modules/@table-library/react-table-library/sort.js";
import { usePagination as ge } from "../../../node_modules/.pnpm/@table-library_react-table-library@4.1.15_@emotion_react@11.14.0_@types_react@18.3.28_r_b1ae3ad8bf4f174fa5413c12b8f6a307/node_modules/@table-library/react-table-library/pagination.js";
import { useTree as me } from "../../../node_modules/.pnpm/@table-library_react-table-library@4.1.15_@emotion_react@11.14.0_@types_react@18.3.28_r_b1ae3ad8bf4f174fa5413c12b8f6a307/node_modules/@table-library/react-table-library/tree.js";
import { useControllableState as pe } from "../../../hooks/useControllableState.js";
import { useStickyShadow as Se } from "./hooks/useStickyShadow.js";
import { TableContext as he } from "./TableContext.js";
import { Spinner as ye } from "../../feedback/Spinner/Spinner.js";
/* empty css          */
import { S as X, a as M } from "../../../node_modules/.pnpm/@table-library_react-table-library@4.1.15_@emotion_react@11.14.0_@types_react@18.3.28_r_b1ae3ad8bf4f174fa5413c12b8f6a307/node_modules/@table-library/react-table-library/select-d972db04.js";
function Ke(Y) {
  var Q;
  const {
    data: s,
    rowCount: p,
    selectionType: S = "none",
    defaultSelectedIds: h,
    onSelectionChange: D,
    isRowSelectable: r,
    multiSelectTrigger: T = "checkbox",
    sortFunctions: k = {},
    defaultSort: R,
    onSortChange: V,
    pagination: y = !1,
    defaultPageSize: q = 10,
    pageSize: d,
    page: c,
    onPaginationChange: z,
    defaultExpandedIds: Z,
    onExpansionChange: G,
    isGrouped: f = !1,
    rowDensity: I = "compact",
    showBorderedCells: ee = !1,
    isHeaderSticky: u = !0,
    isFirstColumnSticky: P = !1,
    hasStickyActionColumn: _ = !1,
    isLoading: v = !1,
    isRefreshing: b = !1,
    maxHeight: w,
    toolbar: L,
    footer: K,
    children: te
  } = Y;
  typeof process < "u" && ((Q = process.env) == null ? void 0 : Q.NODE_ENV) !== "production" && de(() => {
    const e = s.nodes.filter((t) => (t == null ? void 0 : t.id) === void 0);
    e.length > 0 && console.error(
      `[Table] ${e.length} row(s) are missing an \`id\`. Every item in \`data.nodes\` must have a unique identifier.`
    ), u && w === void 0 && console.warn(
      "[Table] `isHeaderSticky` has no effect without `maxHeight` — the header needs a scroll container to stick to."
    ), (c !== void 0 || d !== void 0) && p === void 0 && console.warn(
      "[Table] Controlled pagination (`page`/`pageSize`) is set but `rowCount` is missing — the pagination label will under-count total rows."
    );
  }, [s.nodes, u, w, c, d, p]);
  const E = ce(null), W = Se(E), C = S === "single", n = fe(
    s,
    {
      state: C ? { id: (h == null ? void 0 : h[0]) ?? null } : { ids: h ?? [] },
      onChange: (e, t) => {
        if (!D) return;
        const o = t.id, F = t.ids, U = C ? o != null ? [o] : [] : F ?? [], re = s.nodes.filter((le) => U.includes(le.id));
        D({ values: re });
      }
    },
    {
      rowSelect: C ? M.SingleSelect : M.MultiSelect,
      buttonSelect: M.MultiSelect,
      clickType: T === "row" ? X.RowClick : X.ButtonClick
    }
  ), x = C ? n.state.id != null ? [n.state.id] : [] : n.state.ids ?? [], i = ue(
    s,
    {
      state: R ? {
        sortKey: R.sortKey,
        reverse: R.direction === "desc"
      } : { sortKey: "", reverse: !1 },
      onChange: (e, t) => {
        if (!V) return;
        const o = t.sortKey, F = t.reverse;
        V(o ? { sortKey: o, direction: F ? "desc" : "asc" } : null);
      }
    },
    {
      // The engine constrains SortFn to its own TableNode; consumers write
      // sort fns in terms of their own Item type. The cast bridges the gap.
      sortFns: k
    }
  ), N = i.state.sortKey ? {
    sortKey: i.state.sortKey,
    direction: i.state.reverse ? "desc" : "asc"
  } : null, oe = c !== void 0 || d !== void 0, $ = {
    page: c ?? 0,
    size: d ?? q
  }, [se, ie] = pe({
    value: oe ? { page: c ?? 0, size: d ?? q } : void 0,
    defaultValue: $
  }), g = se ?? $, a = ge(
    s,
    {
      state: { page: g.page, size: g.size },
      onChange: (e, t) => {
        const o = {
          page: t.page,
          size: t.size
        };
        ie(o), z == null || z(o);
      }
    },
    {}
  ), l = me(
    f ? s : { nodes: [] },
    {
      state: { ids: Z ?? [] },
      onChange: (e, t) => {
        if (!G) return;
        const o = t.ids ?? [];
        G(o);
      }
    },
    {}
  ), j = l.state.ids ?? [], ae = O(() => {
    let e = s.nodes;
    return i.modifier && (e = i.modifier(e)), y && a.modifier && (e = a.modifier(e)), f && l.modifier && (e = l.modifier(e)), e;
  }, [
    s.nodes,
    i.modifier,
    a.modifier,
    l.modifier,
    y,
    f,
    N,
    g,
    j
  ]), A = O(
    () => s.nodes.filter((e) => r ? r(e) : !0).map((e) => e.id),
    [s.nodes, r]
  ), B = A.length > 0 && A.every((e) => x.includes(e)), J = !B && A.some((e) => x.includes(e)), ne = O(
    () => ({
      data: s,
      totalItems: p ?? s.nodes.length,
      selectionType: S,
      multiSelectTrigger: T,
      selectedIds: x,
      toggleRowSelection: (e) => n.fns.onToggleById(e),
      toggleRowSelectionRange: (e) => (
        // Engine walks visible nodes in render order. We feed the canonical
        // sort+paginate modifier chain so the range is what the user sees.
        n.fns.onToggleByIdShift(
          e,
          { isCarryForward: !1, isPartialToAll: !1 },
          ((t) => {
            let o = t;
            return i.modifier && (o = i.modifier(o)), y && a.modifier && (o = a.modifier(o)), o;
          })
        )
      ),
      toggleAllRowsSelection: () => n.fns.onToggleAll({ isCarryForward: !1, isPartialToAll: !1 }),
      isAllSelected: B,
      isIndeterminate: J,
      isRowSelectable: (e) => r ? r(e) : !0,
      sortState: N,
      sortableKeys: Object.keys(k),
      toggleSort: (e) => i.fns.onToggleSort({ sortKey: e }),
      pageState: g,
      setPage: (e) => a.fns.onSetPage(e),
      setPageSize: (e) => a.fns.onSetSize(e),
      expandedIds: j,
      toggleExpansion: (e) => l.fns.onToggleById(e),
      isGrouped: f,
      rowDensity: I,
      isLoading: v,
      isRefreshing: b,
      isHeaderSticky: u,
      isFirstColumnSticky: P,
      hasStickyActionColumn: _,
      scrollContainerRef: E,
      isScrolledHorizontally: W
    }),
    [
      s,
      p,
      S,
      T,
      x,
      B,
      J,
      r,
      n.fns,
      N,
      k,
      i.fns,
      i.modifier,
      y,
      g,
      a.fns,
      a.modifier,
      j,
      l.fns,
      f,
      I,
      v,
      b,
      u,
      P,
      _,
      W
    ]
  );
  return /* @__PURE__ */ H(he.Provider, { value: ne, children: [
    /* @__PURE__ */ H(
      "div",
      {
        className: "fds-table-surface",
        "data-density": I,
        "data-bordered": ee ? "true" : "false",
        "data-header-sticky": u ? "true" : "false",
        "data-first-col-sticky": P ? "true" : "false",
        "data-action-col-sticky": _ ? "true" : "false",
        "data-selection": S,
        "data-has-footer": K ? "true" : "false",
        "data-loading": v ? "true" : void 0,
        "data-refreshing": b ? "true" : void 0,
        style: w !== void 0 ? { maxHeight: w } : void 0,
        children: [
          L && /* @__PURE__ */ m("div", { className: "fds-table-surface__toolbar", children: L }),
          /* @__PURE__ */ H("div", { ref: E, className: "fds-table-surface__scroll", children: [
            /* @__PURE__ */ m("table", { className: "fds-table", children: te(v ? [] : ae) }),
            b && /* @__PURE__ */ m(
              "div",
              {
                className: "fds-table-surface__refresh-overlay",
                role: "status",
                "aria-live": "polite",
                "aria-label": "Refreshing data",
                children: /* @__PURE__ */ m(ye, { size: "Medium" })
              }
            )
          ] })
        ]
      }
    ),
    K && /* @__PURE__ */ m("div", { className: "fds-table-footer-bar", children: K })
  ] });
}
export {
  Ke as Table
};
