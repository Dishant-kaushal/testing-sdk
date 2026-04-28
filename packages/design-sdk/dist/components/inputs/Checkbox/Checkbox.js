import { jsxs as i, jsx as e } from "react/jsx-runtime";
import { forwardRef as v, useId as y, useRef as L, useCallback as d, useEffect as N } from "react";
import { cn as h } from "../../../utils/cn.js";
/* empty css             */
const B = {
  Small: "BodySmallRegular",
  Medium: "BodyMediumRegular",
  Large: "BodyLargeRegular"
};
function M() {
  return /* @__PURE__ */ e("svg", { viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: /* @__PURE__ */ e(
    "path",
    {
      d: "M9.46967 2.46967C9.76256 2.17678 10.2373 2.17678 10.5302 2.46967C10.8231 2.76256 10.8231 3.23732 10.5302 3.53022L5.03022 9.03022C4.73732 9.32311 4.26256 9.32311 3.96967 9.03022L1.46967 6.53022C1.17678 6.23732 1.17678 5.76256 1.46967 5.46967C1.76256 5.17678 2.23732 5.17678 2.53022 5.46967L4.49994 7.4394L9.46967 2.46967Z",
      fill: "currentColor"
    }
  ) });
}
function D() {
  return /* @__PURE__ */ e("svg", { viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: /* @__PURE__ */ e(
    "path",
    {
      d: "M9.5 5.25C9.91421 5.25 10.25 5.58579 10.25 6C10.25 6.41421 9.91421 6.75 9.5 6.75H2.5C2.08579 6.75 1.75 6.41421 1.75 6C1.75 5.58579 2.08579 5.25 2.5 5.25H9.5Z",
      fill: "currentColor"
    }
  ) });
}
const E = v(
  ({
    label: f,
    size: a = "Small",
    isDisabled: u = !1,
    isIndeterminate: s = !1,
    className: b,
    id: m,
    disabled: x,
    onChange: p,
    ...k
  }, n) => {
    const C = y(), t = m ?? C, o = u || x || !1, r = L(null), w = d(
      (c) => {
        r.current = c, typeof n == "function" ? n(c) : n && (n.current = c);
      },
      [n]
    );
    N(() => {
      r.current && (r.current.indeterminate = s);
    }, [s]);
    const _ = d(
      (c) => {
        if (c.key === "Enter") {
          c.preventDefault();
          const l = c.currentTarget;
          l.checked = !l.checked, l.dispatchEvent(new Event("change", { bubbles: !0 }));
        }
      },
      []
    ), g = h(
      "fds-checkbox",
      `fds-checkbox--size-${a.toLowerCase()}`,
      o && "fds-checkbox--disabled",
      s && "fds-checkbox--indeterminate",
      b
    );
    return /* @__PURE__ */ i("label", { className: g, htmlFor: t, children: [
      /* @__PURE__ */ e(
        "input",
        {
          ref: w,
          className: "fds-checkbox__input",
          type: "checkbox",
          id: t,
          disabled: o,
          "aria-disabled": o || void 0,
          onChange: p,
          onKeyDown: _,
          ...k
        }
      ),
      /* @__PURE__ */ i("span", { className: "fds-checkbox__box", "aria-hidden": "true", children: [
        /* @__PURE__ */ e("span", { className: "fds-checkbox__icon fds-checkbox__icon--check", children: /* @__PURE__ */ e(M, {}) }),
        /* @__PURE__ */ e("span", { className: "fds-checkbox__icon fds-checkbox__icon--minus", children: /* @__PURE__ */ e(D, {}) })
      ] }),
      /* @__PURE__ */ e("span", { className: h("fds-checkbox__label", B[a]), children: f })
    ] });
  }
);
E.displayName = "Checkbox";
export {
  E as Checkbox
};
