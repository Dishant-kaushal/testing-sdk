import { jsx as s } from "react/jsx-runtime";
import "./TableEditableCell.css.js";
import { useState as y, useRef as D, useCallback as _ } from "react";
import { TextInput as g } from "../../inputs/TextInput/TextInput.js";
import { cn as h } from "../../../utils/cn.js";
function T({
  type: c = "text",
  value: l,
  item: u,
  onCommit: n,
  placeholder: i,
  isDisabled: o,
  validationState: b = "none",
  accessibilityLabel: d,
  className: p,
  ...m
}) {
  const [t, a] = y(l), r = D(l);
  l !== r.current && t === r.current && (r.current = l, a(l));
  const f = _(() => {
    t !== r.current && (r.current = t, n == null || n({ value: t, item: u }));
  }, [t, u, n]), x = (e) => {
    e.key === "Enter" ? (e.preventDefault(), f(), e.target.blur()) : e.key === "Escape" && (e.preventDefault(), a(r.current), e.target.blur());
  };
  return /* @__PURE__ */ s(
    "td",
    {
      className: h("fds-table__editable-cell", "fds-table__cell", p),
      "data-content-type": "editable",
      ...m,
      children: /* @__PURE__ */ s(
        g,
        {
          label: "",
          "aria-label": d,
          type: c === "email" ? "email" : c === "number" ? "number" : "text",
          size: "Medium",
          value: t,
          placeholder: i,
          isDisabled: o,
          validationState: b,
          onChange: ({ value: e }) => a(e),
          onBlur: () => f(),
          onKeyDown: x
        }
      )
    }
  );
}
export {
  T as TableEditableCell
};
