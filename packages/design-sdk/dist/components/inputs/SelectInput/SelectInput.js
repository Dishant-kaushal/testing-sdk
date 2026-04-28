import { jsx as i, jsxs as W } from "react/jsx-runtime";
import { forwardRef as X, useRef as w, useCallback as a, useEffect as z } from "react";
import { ChevronDown as Y } from "react-feather";
import { cn as O } from "../../../utils/cn.js";
import { TextInput as Z } from "../TextInput/TextInput.js";
import { MultiSelectField as $ } from "./MultiSelectField.js";
import { useClickOutside as I } from "../../../hooks/useClickOutside.js";
import { useControllableState as b } from "../../../hooks/useControllableState.js";
/* empty css                */
const ee = X(
  ({
    multiType: B = "multiple",
    label: S,
    name: k,
    placeholder: x,
    value: U,
    tags: F,
    maxVisibleTags: C = 2,
    helpText: g,
    errorText: q,
    validationState: p = "none",
    isDisabled: s = !1,
    searchable: r = !1,
    inputValue: A,
    onInputChange: c,
    isOpen: G,
    onOpenChange: H,
    leadingIcon: R,
    leadingText: N,
    onBackspace: J,
    children: d,
    onClick: m,
    className: D
  }, E) => {
    const l = F != null, u = w(null), [L, K] = b({
      value: G,
      defaultValue: !1,
      onChange: H
    }), t = L ?? !1, M = w(t), v = w(!1), n = a(
      (e) => {
        e || (v.current = !0), K(e);
      },
      [K]
    );
    I(u, () => {
      t && n(!1);
    }), z(() => {
      t && !r && !l && requestAnimationFrame(() => {
        var f;
        const e = (f = u.current) == null ? void 0 : f.querySelector(
          '.fds-select-input__popover [role="menuitem"]:not([aria-disabled="true"])'
        );
        e == null || e.focus();
      });
    }, [t, r, l]), z(() => {
      M.current && !t && requestAnimationFrame(() => {
        var f;
        const e = (f = u.current) == null ? void 0 : f.querySelector(
          ".fds-text-input__input, .fds-select-input__multi-input"
        );
        e == null || e.focus();
      }), M.current = t;
    }, [t]);
    const j = a(() => {
      if (v.current) {
        v.current = !1;
        return;
      }
      !s && r && n(!0);
    }, [s, r, n]), P = a(
      (e) => {
        s || e.target.closest(".fds-select-input__popover") || (m == null || m(e), r || n(!t));
      },
      [s, t, r, m, n]
    ), V = a(
      (e) => {
        var h;
        if (s) return;
        const _ = e.target.getAttribute("role") === "menuitem", y = () => {
          var o;
          return (o = u.current) == null ? void 0 : o.querySelectorAll(
            '.fds-select-input__popover [role="menuitem"]:not([aria-disabled="true"])'
          );
        };
        switch (e.key) {
          case "Enter":
          case " ":
            if (_) break;
            if ((r || l) && t) {
              const o = (h = y()) == null ? void 0 : h[0];
              o && (e.preventDefault(), o.click());
            } else r || (e.preventDefault(), n(!t));
            break;
          case "Escape":
            t && (e.preventDefault(), e.stopPropagation(), n(!1));
            break;
          case "ArrowDown":
            if (!_)
              if (e.preventDefault(), !t)
                n(!0);
              else {
                const o = y();
                o && o.length > 0 && o[0].focus();
              }
            break;
          case "ArrowUp":
            if (!_)
              if (e.preventDefault(), !t)
                n(!0);
              else {
                const o = y();
                o && o.length > 0 && o[o.length - 1].focus();
              }
            break;
        }
      },
      [s, t, r, l, n]
    );
    if (l)
      return /* @__PURE__ */ i(
        "div",
        {
          ref: u,
          className: O("fds-select-input", t && "fds-select-input--open", D),
          onClick: P,
          onKeyDown: V,
          children: /* @__PURE__ */ i(
            $,
            {
              type: B,
              ref: E,
              label: S,
              name: k,
              placeholder: x ?? "Select",
              tags: F,
              maxVisibleTags: C,
              searchValue: A,
              onSearchChange: c,
              onBackspace: J,
              helpText: p === "error" ? void 0 : g,
              errorText: q,
              validationState: p,
              isDisabled: s,
              isReadOnly: !c,
              isOpen: t,
              leadingIcon: R,
              leadingText: N,
              onFocus: j,
              children: d
            }
          )
        }
      );
    const Q = r ? A : U, T = x ?? (r ? "Search" : "Select");
    return /* @__PURE__ */ W(
      "div",
      {
        ref: u,
        className: O("fds-select-input", t && "fds-select-input--open", D),
        onClick: P,
        onKeyDown: V,
        children: [
          /* @__PURE__ */ i(
            Z,
            {
              ref: E,
              label: S,
              name: k,
              placeholder: T,
              value: Q ?? "",
              readOnly: !r,
              onChange: r ? (e) => c == null ? void 0 : c(e.value) : void 0,
              onFocus: j,
              helpText: p === "error" ? void 0 : g,
              errorText: q,
              validationState: p,
              isDisabled: s,
              icon: R,
              prefix: N,
              suffix: void 0,
              autoComplete: r ? "off" : void 0,
              "aria-expanded": t,
              "aria-haspopup": "listbox",
              "aria-autocomplete": r ? "list" : void 0
            }
          ),
          /* @__PURE__ */ i("span", { className: O("fds-select-input__chevron", t && "fds-select-input__chevron--open"), children: /* @__PURE__ */ i(Y, { size: 16 }) }),
          t && d && /* @__PURE__ */ i("div", { className: "fds-select-input__popover", children: d })
        ]
      }
    );
  }
);
ee.displayName = "SelectInput";
export {
  ee as SelectInput
};
