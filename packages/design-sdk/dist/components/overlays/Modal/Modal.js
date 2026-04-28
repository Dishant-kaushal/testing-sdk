import { jsx as r, jsxs as u } from "react/jsx-runtime";
import { useCallback as _ } from "react";
import { X as b } from "react-feather";
import { cn as d } from "../../../utils/cn.js";
import { IconButton as k } from "../../actions/IconButton/IconButton.js";
import { useKeyboard as N } from "../../../hooks/useKeyboard.js";
/* empty css          */
function y({
  size: c = "Small",
  isOpen: m = !1,
  hasBodyPadding: o = !0,
  header: i,
  footer: f,
  children: l,
  onClose: a,
  className: s,
  ...e
}) {
  const p = _(
    (t) => {
      t.target === t.currentTarget && (a == null || a());
    },
    [a]
  );
  return N("Escape", () => a == null ? void 0 : a(), m), m ? /* @__PURE__ */ r(
    "div",
    {
      className: d("fds-modal__backdrop", s),
      onClick: p,
      role: "dialog",
      "aria-modal": "true",
      ...e,
      children: /* @__PURE__ */ u("div", { className: d("fds-modal", `fds-modal--${c.toLowerCase()}`), children: [
        i,
        !i && a && /* @__PURE__ */ r(
          k,
          {
            icon: /* @__PURE__ */ r(b, { size: 20 }),
            size: "20",
            onClick: a,
            "aria-label": "Close modal",
            className: "fds-modal__close"
          }
        ),
        l && /* @__PURE__ */ r("div", { className: d("fds-modal__body", o && "fds-modal__body--padded"), children: l }),
        f
      ] })
    }
  ) : null;
}
y.displayName = "Modal";
export {
  y as Modal
};
