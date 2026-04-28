import { jsxs as d, jsx as n, Fragment as P } from "react/jsx-runtime";
/* empty css                    */
import { useRef as w, useState as _, useLayoutEffect as A, useEffect as O } from "react";
import { createPortal as T } from "react-dom";
import { ChevronDown as W } from "react-feather";
import { cn as k } from "../../../utils/cn.js";
import { useClickOutside as D } from "../../../hooks/useClickOutside.js";
import { Pagination as j } from "../../navigation/Pagination/Pagination.js";
import { DropdownMenu as F } from "../../overlays/DropdownMenu/DropdownMenu.js";
import { ActionListItem as G } from "../../overlays/DropdownMenu/ActionListItem.js";
import { ActionListItemGroup as H } from "../../overlays/DropdownMenu/ActionListItemGroup.js";
import { useTableContextOptional as U } from "./TableContext.js";
const $ = [10, 25, 50, 100];
function ie({
  pageSizeOptions: v = $,
  totalItemCount: x,
  showRowsPerPage: y = !0,
  showLabel: z = !0,
  variant: E = "simple",
  label: m,
  onPageChange: u,
  onPageSizeChange: p,
  className: L
} = {}) {
  const o = U(), r = w(null), g = w(null), [i, f] = _(!1), [l, h] = _(null);
  if (D(g, (e) => {
    var t;
    i && !((t = r.current) != null && t.contains(e.target)) && f(!1);
  }), A(() => {
    if (!i || !r.current) return;
    const e = r.current.getBoundingClientRect(), t = 200, N = e.bottom + t > window.innerHeight;
    h({
      top: N ? e.top - 4 - t : e.bottom + 4,
      left: e.left,
      minWidth: e.width
    });
  }, [i]), O(() => {
    if (!i) return;
    const e = () => {
      if (!r.current) return;
      const t = r.current.getBoundingClientRect();
      h({ top: t.bottom + 4, left: t.left, minWidth: t.width });
    };
    return window.addEventListener("scroll", e, !0), window.addEventListener("resize", e), () => {
      window.removeEventListener("scroll", e, !0), window.removeEventListener("resize", e);
    };
  }, [i]), !o) return null;
  const s = x ?? o.totalItems, { page: c, size: a } = o.pageState, R = s === 0 ? 0 : c * a + 1, b = Math.min((c + 1) * a, s), M = Math.max(1, Math.ceil(s / a)), S = typeof m == "function" ? m({ start: R, end: b, total: s }) : m ?? `Showing ${b} of ${s} Items`, B = (e) => {
    o.setPageSize(e), c !== 0 && o.setPage(0), p == null || p({ pageSize: e }), f(!1);
  }, I = (e) => {
    const t = e - 1;
    o.setPage(t), u == null || u({ page: t });
  };
  return /* @__PURE__ */ d("div", { className: k("fds-table__pagination", L), children: [
    z && /* @__PURE__ */ n("span", { className: "fds-table__pagination-label BodyMediumRegular", children: S }),
    /* @__PURE__ */ d("div", { className: "fds-table__pagination-controls", children: [
      y && /* @__PURE__ */ d(P, { children: [
        /* @__PURE__ */ d(
          "button",
          {
            ref: r,
            type: "button",
            className: "fds-table__pagination-size-trigger BodyMediumRegular",
            onClick: () => f((e) => !e),
            "aria-haspopup": "menu",
            "aria-expanded": i,
            "aria-label": "Rows per page",
            children: [
              /* @__PURE__ */ n("span", { children: a }),
              /* @__PURE__ */ n(W, { size: 12, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ n("span", { className: "fds-table__pagination-size-label BodyMediumRegular", children: "rows / page" })
      ] }),
      /* @__PURE__ */ n(
        j,
        {
          variant: E === "numbered" ? "default" : "simple",
          currentPage: c + 1,
          totalPages: M,
          onPageChange: I
        }
      )
    ] }),
    i && l && typeof document < "u" && T(
      /* @__PURE__ */ n(
        "div",
        {
          ref: g,
          className: "fds-table__pagination-size-menu",
          role: "presentation",
          style: {
            position: "fixed",
            top: l.top,
            left: l.left,
            minWidth: l.minWidth,
            zIndex: 1e3
          },
          children: /* @__PURE__ */ n(F, { children: /* @__PURE__ */ n(H, { children: v.map((e) => /* @__PURE__ */ n(
            G,
            {
              title: String(e),
              selectionType: "Single",
              isSelected: e === a,
              onClick: () => B(e)
            },
            e
          )) }) })
        }
      ),
      document.body
    )
  ] });
}
export {
  ie as TablePagination
};
