import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { X as m } from "react-feather";
import { cn as n } from "../../../utils/cn.js";
import { IconButton as f } from "../../actions/IconButton/IconButton.js";
import { usePopoverContext as h } from "./PopoverContext.js";
/* empty css                  */
function v({
  title: s,
  leading: o,
  showClose: a = !0,
  closeLabel: d = "Close",
  onClose: p,
  className: i,
  ...l
}) {
  const { close: t } = h(), c = p ?? t;
  return /* @__PURE__ */ r("div", { className: n("fds-popover-header", i), ...l, children: [
    /* @__PURE__ */ r("div", { className: "fds-popover-header__left", children: [
      o && /* @__PURE__ */ e("span", { className: "fds-popover-header__leading", children: o }),
      /* @__PURE__ */ e("h3", { className: "fds-popover-header__title BodyLargeSemibold", children: s })
    ] }),
    a && /* @__PURE__ */ e(
      f,
      {
        className: "fds-popover-header__close",
        icon: /* @__PURE__ */ e(m, { size: 16 }),
        size: "16",
        onClick: c,
        "aria-label": d
      }
    )
  ] });
}
v.displayName = "PopoverHeader";
export {
  v as PopoverHeader
};
