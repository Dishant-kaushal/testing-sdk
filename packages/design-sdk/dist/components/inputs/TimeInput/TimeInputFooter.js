import { jsxs as i, jsx as r } from "react/jsx-runtime";
import { cn as c } from "../../../utils/cn.js";
import { Button as o } from "../../actions/Button/Button.js";
import { Divider as p } from "../../layout/Divider/Divider.js";
/* empty css                    */
function d({
  cancelLabel: a = "Cancel",
  applyLabel: e = "Apply",
  isApplyDisabled: t = !1,
  onCancel: l,
  onApply: m,
  className: n,
  ...s
}) {
  return /* @__PURE__ */ i("div", { className: c("fds-time-footer", n), ...s, children: [
    /* @__PURE__ */ r(p, { variant: "Muted" }),
    /* @__PURE__ */ i("div", { className: "fds-time-footer__actions", children: [
      /* @__PURE__ */ r(
        o,
        {
          variant: "Gray",
          color: "Primary",
          size: "XSmall",
          label: a,
          onClick: l
        }
      ),
      /* @__PURE__ */ r(
        o,
        {
          variant: "Primary",
          color: "Primary",
          size: "XSmall",
          label: e,
          isDisabled: t,
          onClick: m
        }
      )
    ] })
  ] });
}
d.displayName = "TimeInputFooter";
export {
  d as TimeInputFooter
};
