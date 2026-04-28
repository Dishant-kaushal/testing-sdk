import { jsxs as a, jsx as e } from "react/jsx-runtime";
/* empty css                    */
import { useState as f, useRef as u } from "react";
import { MoreHorizontal as b } from "react-feather";
import { IconButton as c } from "../../actions/IconButton/IconButton.js";
import { DropdownMenu as k } from "../../overlays/DropdownMenu/DropdownMenu.js";
import { ActionListItem as D } from "../../overlays/DropdownMenu/ActionListItem.js";
import { ActionListItemGroup as v } from "../../overlays/DropdownMenu/ActionListItemGroup.js";
import { useClickOutside as w } from "../../../hooks/useClickOutside.js";
function O({
  actions: s,
  moreAriaLabel: m = "More actions"
}) {
  const [n, r] = f(!1), l = u(null);
  w(l, () => r(!1));
  const t = s.length > 3, p = t ? s.slice(0, 2) : s, d = t ? s.slice(2) : [];
  return /* @__PURE__ */ a(
    "div",
    {
      className: "fds-table__row-actions",
      onClick: (o) => o.stopPropagation(),
      children: [
        p.map((o) => /* @__PURE__ */ e(
          c,
          {
            icon: o.icon,
            "aria-label": o.label,
            isDisabled: o.isDisabled,
            onClick: (i) => {
              i.stopPropagation(), !o.isDisabled && o.onClick(i);
            }
          },
          o.key
        )),
        t && /* @__PURE__ */ a("div", { ref: l, className: "fds-table__row-actions-more", children: [
          /* @__PURE__ */ e(
            c,
            {
              icon: /* @__PURE__ */ e(b, { size: 20 }),
              "aria-label": m,
              "aria-haspopup": "menu",
              "aria-expanded": n,
              onClick: (o) => {
                o.stopPropagation(), r((i) => !i);
              }
            }
          ),
          n && /* @__PURE__ */ e("div", { className: "fds-table__row-actions-menu", role: "presentation", children: /* @__PURE__ */ e(k, { children: /* @__PURE__ */ e(v, { children: d.map((o) => /* @__PURE__ */ e(
            D,
            {
              title: o.label,
              leadingIcon: o.icon,
              isDestructive: o.isDestructive,
              isDisabled: o.isDisabled,
              onClick: (i) => {
                o.isDisabled || (o.onClick(i), r(!1));
              }
            },
            o.key
          )) }) }) })
        ] })
      ]
    }
  );
}
export {
  O as TableRowActions
};
