import { jsx as r, jsxs as l } from "react/jsx-runtime";
import { useMemo as M, useState as N, useEffect as _ } from "react";
import { ChevronLeft as j, ChevronRight as x } from "react-feather";
import { cn as S } from "../../../utils/cn.js";
import { Button as f } from "../../actions/Button/Button.js";
import { PageNumber as k } from "./PageNumber.js";
import { PaginationEllipsis as E } from "./PaginationEllipsis.js";
/* empty css               */
function z(o, e, p) {
  if (e <= 0) return [];
  if (e === 1) return [{ type: "page", page: 1 }];
  const n = [{ type: "page", page: 1 }], s = Math.max(2, o - p);
  s > 2 && n.push({ type: "ellipsis", direction: "previous" });
  for (let d = s; d <= Math.min(e - 1, o + p); d++)
    n.push({ type: "page", page: d });
  return Math.min(e - 1, o + p) < e - 1 && n.push({ type: "ellipsis", direction: "next" }), e > 1 && n.push({ type: "page", page: e }), n;
}
function B({
  currentPage: o,
  totalPages: e,
  onPageChange: p,
  variant: n = "default",
  siblingCount: s = 2,
  isDisabled: t = !1,
  className: d,
  ...g
}) {
  const a = Math.max(1, Math.min(o, Math.max(1, e))), h = a <= 1, y = a >= e || e <= 0, v = M(
    () => n === "default" ? z(a, e, s) : [],
    [n, a, e, s]
  ), [c, m] = N(String(a));
  _(() => {
    m(String(a));
  }, [a]);
  const u = () => {
    const i = parseInt(c, 10);
    !isNaN(i) && i >= 1 && i <= e ? p(i) : m(String(a));
  };
  return e <= 0 ? null : /* @__PURE__ */ r("div", { className: S("fds-pagination", t && "fds-pagination--disabled", d), "aria-disabled": t || void 0, ...g, children: /* @__PURE__ */ r("div", { className: "fds-pagination__root", children: /* @__PURE__ */ l("div", { className: "fds-pagination__wrapper", children: [
    /* @__PURE__ */ r(
      f,
      {
        iconOnly: !0,
        size: "Small",
        variant: "Gray",
        color: "Primary",
        leadingIcon: /* @__PURE__ */ r(j, { size: 16 }),
        isDisabled: h || t,
        onClick: () => p(a - 1),
        "aria-label": "Previous page"
      }
    ),
    n === "default" && /* @__PURE__ */ r("div", { className: "fds-pagination__pages", children: v.map(
      (i) => i.type === "page" ? /* @__PURE__ */ r(
        k,
        {
          page: i.page,
          isSelected: i.page === a,
          disabled: t,
          onClick: () => p(i.page)
        },
        i.page
      ) : /* @__PURE__ */ r(
        E,
        {
          direction: i.direction,
          disabled: t,
          onClick: () => {
            p(
              i.direction === "previous" ? Math.max(1, a - 5) : Math.min(e, a + 5)
            );
          }
        },
        `ellipsis-${i.direction}`
      )
    ) }),
    n === "jumper" && /* @__PURE__ */ l("div", { className: "fds-pagination__jumper", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          className: "fds-pagination__jumper-input BodyMediumRegular",
          value: c,
          disabled: t,
          onChange: (i) => m(i.target.value),
          onKeyDown: (i) => i.key === "Enter" && u(),
          onBlur: u,
          "aria-label": "Go to page"
        }
      ),
      /* @__PURE__ */ l("span", { className: "fds-pagination__jumper-label BodyMediumRegular", children: [
        "of ",
        e
      ] })
    ] }),
    /* @__PURE__ */ r(
      f,
      {
        iconOnly: !0,
        size: "Small",
        variant: "Gray",
        color: "Primary",
        leadingIcon: /* @__PURE__ */ r(x, { size: 16 }),
        isDisabled: y || t,
        onClick: () => p(a + 1),
        "aria-label": "Next page"
      }
    )
  ] }) }) });
}
B.displayName = "Pagination";
export {
  B as Pagination
};
