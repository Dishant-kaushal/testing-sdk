import { jsx as o, jsxs as J } from "react/jsx-runtime";
import { forwardRef as L, useRef as l, useCallback as K, useEffect as Q } from "react";
import { TextInput as W } from "../TextInput/TextInput.js";
import { MultiSelectField as X } from "../SelectInput/MultiSelectField.js";
import { cn as j } from "../../../utils/cn.js";
import { useClickOutside as Y } from "../../../hooks/useClickOutside.js";
import { useControllableState as Z } from "../../../hooks/useControllableState.js";
/* empty css                */
const $ = L(
  ({
    type: p = "single",
    label: v,
    name: g,
    placeholder: w = "Search",
    inputValue: x,
    onInputChange: c,
    helpText: _,
    errorText: y,
    validationState: a = "none",
    isDisabled: s = !1,
    isRequired: E,
    isOpen: M,
    onOpenChange: F,
    icon: k,
    prefix: P,
    children: A,
    onFocus: m,
    onBlur: f,
    className: O,
    tags: T,
    maxVisibleTags: U,
    onBackspace: V,
    onSubmit: z,
    noResultsText: G = "No results found",
    ...R
  }, S) => {
    const [H, N] = Z({
      value: M,
      defaultValue: !1,
      onChange: F
    }), r = H ?? !1, b = l(r), d = l(!1), i = l(null), n = l(null), u = K(
      (e) => {
        e || (d.current = !0), N(e);
      },
      [N]
    );
    Y(i, () => {
      r && u(!1);
    });
    const q = () => {
      if (d.current) {
        d.current = !1;
        return;
      }
      s || u(!0), m == null || m();
    };
    Q(() => {
      b.current && !r && requestAnimationFrame(() => {
        var h;
        const e = (h = i.current) == null ? void 0 : h.querySelector(
          ".fds-text-input__input, .fds-select-input__multi-input"
        );
        e == null || e.focus();
      }), b.current = r;
    }, [r]);
    const C = K(
      (e) => {
        if (s) return;
        const D = e.target.getAttribute("role") === "menuitem";
        switch (e.key) {
          case "Escape":
            r && (e.preventDefault(), e.stopPropagation(), u(!1));
            break;
          case "ArrowDown":
            if (!D && r && n.current) {
              e.preventDefault();
              const t = n.current.querySelectorAll(
                '[role="menuitem"]:not([aria-disabled="true"])'
              );
              t.length > 0 && t[0].focus();
            }
            break;
          case "ArrowUp":
            if (!D && r && n.current) {
              e.preventDefault();
              const t = n.current.querySelectorAll(
                '[role="menuitem"]:not([aria-disabled="true"])'
              );
              t.length > 0 && t[t.length - 1].focus();
            }
            break;
        }
      },
      [s, r, u]
    );
    if (p === "multiple" || p === "multiple-flex")
      return /* @__PURE__ */ o("div", { ref: i, className: j("fds-search-input", O), onKeyDown: C, ...R, children: /* @__PURE__ */ o(
        X,
        {
          type: p,
          ref: S,
          label: v,
          name: g,
          placeholder: w,
          tags: T,
          maxVisibleTags: U,
          searchValue: x,
          onSearchChange: c,
          onBackspace: V,
          onSubmit: z,
          helpText: a === "error" ? void 0 : _,
          errorText: y,
          validationState: a,
          isDisabled: s,
          isOpen: r,
          leadingIcon: k,
          onFocus: q,
          onBlur: f,
          children: A
        }
      ) });
    const I = (e) => {
      c == null || c(e.value);
    };
    return /* @__PURE__ */ J("div", { ref: i, className: j("fds-search-input", O), onKeyDown: C, ...R, children: [
      /* @__PURE__ */ o(
        W,
        {
          ref: S,
          label: v,
          name: g,
          placeholder: w,
          value: x,
          onChange: I,
          onFocus: () => q(),
          onBlur: () => f == null ? void 0 : f(),
          helpText: a === "error" ? void 0 : _,
          errorText: y,
          validationState: a,
          isDisabled: s,
          isRequired: E,
          icon: k,
          prefix: P,
          suffix: void 0,
          autoComplete: "off",
          "aria-expanded": r,
          "aria-haspopup": "listbox",
          "aria-autocomplete": "list"
        }
      ),
      r && /* @__PURE__ */ o("div", { ref: n, className: "fds-search-input__popover", children: A || /* @__PURE__ */ o("div", { className: "fds-search-input__empty", children: G }) })
    ] });
  }
);
$.displayName = "SearchInput";
export {
  $ as SearchInput
};
