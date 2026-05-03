import { jsxs as U, jsx as i } from "react/jsx-runtime";
import { forwardRef as C, useRef as g, useCallback as y, useEffect as G } from "react";
import { createPortal as H } from "react-dom";
import { ChevronDown as I } from "react-feather";
import { cn as F } from "../../../utils/cn.js";
import { TextInput as b } from "../TextInput/TextInput.js";
import { MultiSelectField as ee } from "./MultiSelectField.js";
import { useControllableState as te } from "../../../hooks/useControllableState.js";
import { useDropdownPortal as oe } from "../../../hooks/useDropdownPortal.js";
/* empty css                */
const re = C(
  ({
    multiType: J = "multiple",
    label: O,
    name: R,
    placeholder: k,
    value: L,
    tags: q,
    maxVisibleTags: Q = 2,
    helpText: x,
    errorText: A,
    validationState: m = "none",
    isDisabled: s = !1,
    searchable: o = !1,
    inputValue: N,
    onInputChange: c,
    isOpen: T,
    onOpenChange: W,
    leadingIcon: h,
    leadingText: D,
    onBackspace: X,
    children: d,
    onClick: a,
    className: P
  }, E) => {
    const l = q != null, v = g(null), [Y, K] = te({
      value: T,
      defaultValue: !1,
      onChange: W
    }), t = Y ?? !1, M = g(t), w = g(!1), n = y(
      (e) => {
        e || (w.current = !0), K(e);
      },
      [K]
    ), { portalRef: p, pos: f } = oe(v, t, () => n(!1));
    G(() => {
      t && !o && !l && requestAnimationFrame(() => {
        var u;
        const e = (u = p.current) == null ? void 0 : u.querySelector(
          '[role="menuitem"]:not([aria-disabled="true"])'
        );
        e == null || e.focus();
      });
    }, [t, o, l, p]), G(() => {
      M.current && !t && requestAnimationFrame(() => {
        var u;
        const e = (u = v.current) == null ? void 0 : u.querySelector(
          ".fds-text-input__input, .fds-select-input__multi-input"
        );
        e == null || e.focus();
      }), M.current = t;
    }, [t]);
    const j = y(() => {
      if (w.current) {
        w.current = !1;
        return;
      }
      !s && o && n(!0);
    }, [s, o, n]), V = y(
      (e) => {
        s || e.target.closest(".fds-select-input__popover") || (a == null || a(e), o || n(!t));
      },
      [s, t, o, a, n]
    ), z = y(
      (e) => {
        var B;
        if (s) return;
        const _ = e.target.getAttribute("role") === "menuitem", S = () => {
          var r;
          return (r = p.current) == null ? void 0 : r.querySelectorAll(
            '[role="menuitem"]:not([aria-disabled="true"])'
          );
        };
        switch (e.key) {
          case "Enter":
          case " ":
            if (_) break;
            if ((o || l) && t) {
              const r = (B = S()) == null ? void 0 : B[0];
              r && (e.preventDefault(), r.click());
            } else o || (e.preventDefault(), n(!t));
            break;
          case "Escape":
            t && (e.preventDefault(), e.stopPropagation(), n(!1));
            break;
          case "ArrowDown":
            if (!_)
              if (e.preventDefault(), !t)
                n(!0);
              else {
                const r = S();
                r && r.length > 0 && r[0].focus();
              }
            break;
          case "ArrowUp":
            if (!_)
              if (e.preventDefault(), !t)
                n(!0);
              else {
                const r = S();
                r && r.length > 0 && r[r.length - 1].focus();
              }
            break;
        }
      },
      [s, t, o, l, n]
    );
    if (l)
      return /* @__PURE__ */ U(
        "div",
        {
          ref: v,
          className: F("fds-select-input", t && "fds-select-input--open", P),
          onClick: V,
          onKeyDown: z,
          children: [
            /* @__PURE__ */ i(
              ee,
              {
                type: J,
                ref: E,
                label: O,
                name: R,
                placeholder: k ?? "Select",
                tags: q,
                maxVisibleTags: Q,
                searchValue: N,
                onSearchChange: c,
                onBackspace: X,
                helpText: m === "error" ? void 0 : x,
                errorText: A,
                validationState: m,
                isDisabled: s,
                isReadOnly: !c,
                isOpen: t,
                leadingIcon: h,
                leadingText: D,
                onFocus: j
              }
            ),
            t && d && f && typeof document < "u" && H(
              /* @__PURE__ */ i(
                "div",
                {
                  ref: p,
                  className: "fds-select-input__popover",
                  style: { top: f.top, left: f.left, width: f.width },
                  children: d
                }
              ),
              document.body
            )
          ]
        }
      );
    const Z = o ? N : L, $ = k ?? (o ? "Search" : "Select");
    return /* @__PURE__ */ U(
      "div",
      {
        ref: v,
        className: F("fds-select-input", t && "fds-select-input--open", P),
        onClick: V,
        onKeyDown: z,
        children: [
          /* @__PURE__ */ i(
            b,
            {
              ref: E,
              label: O,
              name: R,
              placeholder: $,
              value: Z ?? "",
              readOnly: !o,
              onChange: o ? (e) => c == null ? void 0 : c(e.value) : void 0,
              onFocus: j,
              helpText: m === "error" ? void 0 : x,
              errorText: A,
              validationState: m,
              isDisabled: s,
              icon: h,
              prefix: D,
              autoComplete: o ? "off" : void 0,
              "aria-expanded": t,
              "aria-haspopup": "listbox",
              "aria-autocomplete": o ? "list" : void 0,
              trailingIcon: /* @__PURE__ */ i("span", { className: F("fds-select-input__chevron", t && "fds-select-input__chevron--open"), children: /* @__PURE__ */ i(I, { size: 16 }) })
            }
          ),
          t && d && f && typeof document < "u" && H(
            /* @__PURE__ */ i(
              "div",
              {
                ref: p,
                className: "fds-select-input__popover",
                style: { top: f.top, left: f.left, width: f.width },
                children: d
              }
            ),
            document.body
          )
        ]
      }
    );
  }
);
re.displayName = "SelectInput";
export {
  re as SelectInput
};
