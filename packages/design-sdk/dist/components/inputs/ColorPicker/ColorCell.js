import { jsx as r } from "react/jsx-runtime";
import { cn as s } from "../../../utils/cn.js";
/* empty css              */
function c({
  color: l,
  isSelected: o = !1,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      className: s(
        "fds-color-cell",
        o && "fds-color-cell--selected",
        e
      ),
      "aria-label": l,
      "aria-pressed": o,
      ...a,
      children: /* @__PURE__ */ r(
        "div",
        {
          className: "fds-color-cell__color",
          style: { backgroundColor: l }
        }
      )
    }
  );
}
c.displayName = "ColorCell";
export {
  c as ColorCell
};
