import { jsx as e, jsxs as l, Fragment as T } from "react/jsx-runtime";
import { forwardRef as W, useId as X, useRef as Y, useCallback as y } from "react";
import { ChevronDown as q } from "react-feather";
import { cn as r } from "../../../utils/cn.js";
import { Tag as A } from "../../data-display/Tag/Tag.js";
import { InputFieldHeader as Z } from "../../forms/InputFieldHeader/InputFieldHeader.js";
import { InputFieldFooter as $ } from "../../forms/InputFieldFooter/InputFieldFooter.js";
const S = W(
  ({
    type: B = "multiple",
    label: x,
    name: w,
    placeholder: g = "Select",
    tags: a = [],
    maxVisibleTags: M = 2,
    helpText: C,
    errorText: G,
    validationState: J = "none",
    isDisabled: s = !1,
    isOpen: i = !1,
    isReadOnly: R = !1,
    searchValue: n,
    onSearchChange: p,
    onBackspace: o,
    onSubmit: h,
    leadingIcon: u,
    leadingText: f,
    children: b,
    onClick: c,
    onFocus: F,
    onBlur: z,
    className: L
  }, P) => {
    const N = X(), Q = Y(null), m = P ?? Q, _ = B === "multiple-flex", d = a.length > 0, v = J === "error", K = v ? G : C, j = _ ? a : a.slice(0, M), D = _ ? 0 : a.length - M, U = y(
      (t) => {
        var I;
        s || ((I = m.current) == null || I.focus(), c == null || c(t));
      },
      [s, c, m]
    ), E = y(
      (t) => {
        p == null || p(t.target.value);
      },
      [p]
    ), H = y(
      (t) => {
        t.key === "Backspace" && !n && (o == null || o()), t.key === "Enter" && n && h && (t.preventDefault(), h(n));
      },
      [n, o, h]
    );
    return /* @__PURE__ */ e("div", { className: r("fds-select-input__multi", L), children: /* @__PURE__ */ l(
      "div",
      {
        className: r(
          "fds-text-input",
          s && "fds-text-input--disabled",
          v && "fds-text-input--error",
          i && "fds-select-input--open"
        ),
        children: [
          /* @__PURE__ */ e(Z, { label: x, htmlFor: N }),
          /* @__PURE__ */ l("div", { className: "fds-text-input__field-wrapper fds-select-input__multi-field-wrapper", children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: r(
                  "fds-text-input__field fds-select-input__multi-trigger",
                  _ && "fds-select-input__multi-trigger--flex"
                ),
                role: "combobox",
                "aria-expanded": i,
                "aria-haspopup": "listbox",
                "aria-disabled": s || void 0,
                onClick: U,
                children: _ ? /* @__PURE__ */ l(T, { children: [
                  /* @__PURE__ */ l("span", { className: "fds-select-input__leading-col", children: [
                    d && /* @__PURE__ */ e("span", { className: "fds-select-input__tags fds-select-input__tags--flex", children: j.map((t) => /* @__PURE__ */ e(
                      A,
                      {
                        id: t.label,
                        label: t.label,
                        size: "Medium",
                        isDisabled: s,
                        onDismiss: t.onDismiss
                      }
                    )) }),
                    /* @__PURE__ */ l(
                      "span",
                      {
                        className: r(
                          "fds-select-input__input-row",
                          d && !i && "fds-select-input__input-row--hidden"
                        ),
                        children: [
                          u && /* @__PURE__ */ e("span", { className: "fds-text-input__icon", children: u }),
                          f && /* @__PURE__ */ e("span", { className: "fds-text-input__prefix BodyMediumRegular", children: f }),
                          /* @__PURE__ */ e(
                            "input",
                            {
                              ref: m,
                              id: N,
                              type: "text",
                              role: "searchbox",
                              className: "fds-select-input__multi-input BodyMediumRegular",
                              name: w,
                              placeholder: d ? "" : g,
                              value: n ?? "",
                              disabled: s,
                              readOnly: R,
                              "aria-label": x,
                              "aria-autocomplete": "list",
                              autoComplete: "off",
                              onChange: E,
                              onKeyDown: H,
                              onFocus: F,
                              onBlur: z
                            }
                          )
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e("span", { className: "fds-select-input__trailing--flex", children: /* @__PURE__ */ e(
                    "span",
                    {
                      className: r(
                        "fds-select-input__multi-chevron",
                        i && "fds-select-input__multi-chevron--open"
                      ),
                      children: /* @__PURE__ */ e(q, { size: 16 })
                    }
                  ) })
                ] }) : /* @__PURE__ */ l(T, { children: [
                  /* @__PURE__ */ l("span", { className: "fds-text-input__leading", children: [
                    u && /* @__PURE__ */ e("span", { className: "fds-text-input__icon", children: u }),
                    f && /* @__PURE__ */ e("span", { className: "fds-text-input__prefix BodyMediumRegular", children: f }),
                    d && /* @__PURE__ */ l("span", { className: "fds-select-input__tags", children: [
                      j.map((t) => /* @__PURE__ */ e(
                        A,
                        {
                          id: t.label,
                          label: t.label,
                          size: "Medium",
                          isDisabled: s,
                          onDismiss: t.onDismiss
                        }
                      )),
                      D > 0 && /* @__PURE__ */ l("span", { className: "fds-select-input__overflow BodySmallRegular", children: [
                        "+",
                        D,
                        " more"
                      ] })
                    ] }),
                    /* @__PURE__ */ e(
                      "input",
                      {
                        ref: m,
                        id: N,
                        type: "text",
                        role: "searchbox",
                        className: "fds-select-input__multi-input BodyMediumRegular",
                        name: w,
                        placeholder: d ? "" : g,
                        value: n ?? "",
                        disabled: s,
                        readOnly: R,
                        "aria-label": x,
                        "aria-autocomplete": "list",
                        autoComplete: "off",
                        onChange: E,
                        onKeyDown: H,
                        onFocus: F,
                        onBlur: z
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e("span", { className: "fds-text-input__trailing", children: /* @__PURE__ */ e(
                    "span",
                    {
                      className: r(
                        "fds-select-input__multi-chevron",
                        i && "fds-select-input__multi-chevron--open"
                      ),
                      children: /* @__PURE__ */ e(q, { size: 16 })
                    }
                  ) })
                ] })
              }
            ),
            i && b && /* @__PURE__ */ e("div", { className: "fds-select-input__popover", children: b })
          ] }),
          K && /* @__PURE__ */ e(
            $,
            {
              helpText: K,
              state: v ? "error" : "default"
            }
          )
        ]
      }
    ) });
  }
);
S.displayName = "MultiSelectField";
export {
  S as MultiSelectField
};
