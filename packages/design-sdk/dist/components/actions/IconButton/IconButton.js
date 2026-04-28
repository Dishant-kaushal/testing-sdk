import { jsx as m } from "react/jsx-runtime";
import { forwardRef as s } from "react";
import { cn as c } from "../../../utils/cn.js";
/* empty css               */
const f = s(
  ({ icon: o, size: t = "16", isDisabled: n = !1, className: r, ...e }, i) => /* @__PURE__ */ m(
    "button",
    {
      ref: i,
      type: "button",
      className: c("fds-icon-btn", `fds-icon-btn--${t}`, r),
      disabled: n,
      ...e,
      children: o
    }
  )
);
f.displayName = "IconButton";
export {
  f as IconButton
};
