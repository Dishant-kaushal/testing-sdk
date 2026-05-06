import { jsxs as B, jsx as i } from "react/jsx-runtime";
import { forwardRef as $, useRef as k, useCallback as y, useEffect as U } from "react";
import { createPortal as G } from "react-dom";
import { ChevronDown as I } from "react-feather";
import { cn as O } from "../../../utils/cn.js";
import { TextInput as b } from "../TextInput/TextInput.js";
import { MultiSelectField as ee } from "./MultiSelectField.js";
import { useControllableState as te } from "../../../hooks/useControllableState.js";
import { useDropdownPortal as oe } from "../../../hooks/useDropdownPortal.js";
/* empty css                */
const re = $(
  ({
    multiType: H = "multiple",
    label: S,
    name: F,
    placeholder: R,
    value: J,
    tags: q,
    maxVisibleTags: L = 2,
    helpText: x,
    errorText: A,
    validationState: m = "none",
    isDisabled: s = !1,
    searchable: o = !1,
    inputValue: h,
    onInputChange: l,
    isOpen: Q,
    onOpenChange: T,
    leadingIcon: D,
    leadingText: N,
    onBackspace: W,
    children: a,
    onClick: d,
    className: P
  }, M) => {
    const c = q != null, v = k(null), [X, C] = te({
      value: Q,
      defaultValue: !1,
      onChange: T
    }), t = X ?? !1, E = k(t), w = k(!1), n = y(
      (e) => {
        e || (w.current = !0), C(e);
      },
      [C]
    ), { portalRef: p, pos: f } = oe(v, t, () => n(!1));
    U(() => {
      t && !o && !c && requestAnimationFrame(() => {
        var u;
        const e = (u = p.current) == null ? void 0 : u.querySelector(
          '[role="menuitem"]:not([aria-disabled="true"])'
        );
        e == null || e.focus();
      });
    }, [t, o, c, p]), U(() => {
      E.current && !t && requestAnimationFrame(() => {
        var u;
        const e = (u = v.current) == null ? void 0 : u.querySelector(
          ".fds-text-input__input, .fds-select-input__multi-input"
        );
        e == null || e.focus();
      }), E.current = t;
    }, [t]);
    const K = y(() => {
      if (w.current) {
        w.current = !1;
        return;
      }
      !s && o && n(!0);
    }, [s, o, n]), j = y(
      (e) => {
        s || e.target.closest(".fds-select-input__popover") || (d == null || d(e), o || n(!t));
      },
      [s, t, o, d, n]
    ), V = y(
      (e) => {
        var z;
        if (s) return;
        const _ = e.target.getAttribute("role") === "menuitem", g = () => {
          var r;
          return (r = p.current) == null ? void 0 : r.querySelectorAll(
            '[role="menuitem"]:not([aria-disabled="true"])'
          );
        };
        switch (e.key) {
          case "Enter":
          case " ":
            if (_) break;
            if ((o || c) && t) {
              const r = (z = g()) == null ? void 0 : z[0];
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
                const r = g();
                r && r.length > 0 && r[0].focus();
              }
            break;
          case "ArrowUp":
            if (!_)
              if (e.preventDefault(), !t)
                n(!0);
              else {
                const r = g();
                r && r.length > 0 && r[r.length - 1].focus();
              }
            break;
        }
      },
      [s, t, o, c, n]
    );
    if (c)
      return /* @__PURE__ */ B(
        "div",
        {
          ref: v,
          className: O("fds-select-input", t && "fds-select-input--open", P),
          onClick: j,
          onKeyDown: V,
          children: [
            /* @__PURE__ */ i(
              ee,
              {
                type: H,
                ref: M,
                label: S,
                name: F,
                placeholder: R ?? "Select",
                tags: q,
                maxVisibleTags: L,
                searchValue: h,
                onSearchChange: l,
                onBackspace: W,
                helpText: m === "error" ? void 0 : x,
                errorText: A,
                validationState: m,
                isDisabled: s,
                isReadOnly: !l,
                isOpen: t,
                leadingIcon: D,
                leadingText: N,
                onFocus: K,
                onChevronClick: () => n(!t)
              }
            ),
            t && a && f && typeof document < "u" && G(
              /* @__PURE__ */ i(
                "div",
                {
                  ref: p,
                  className: "fds-select-input__popover",
                  style: { top: f.top, left: f.left, width: f.width },
                  children: a
                }
              ),
              document.body
            )
          ]
        }
      );
    const Y = o ? h : J, Z = R ?? (o ? "Search" : "Select");
    return /* @__PURE__ */ B(
      "div",
      {
        ref: v,
        className: O("fds-select-input", t && "fds-select-input--open", P),
        onClick: j,
        onKeyDown: V,
        children: [
          /* @__PURE__ */ i(
            b,
            {
              ref: M,
              label: S,
              name: F,
              placeholder: Z,
              value: Y ?? "",
              readOnly: !o,
              onChange: o ? (e) => l == null ? void 0 : l(e.value) : void 0,
              onFocus: K,
              helpText: m === "error" ? void 0 : x,
              errorText: A,
              validationState: m,
              isDisabled: s,
              icon: D,
              prefix: N,
              autoComplete: o ? "off" : void 0,
              "aria-expanded": t,
              "aria-haspopup": "listbox",
              "aria-autocomplete": o ? "list" : void 0,
              trailingIcon: /* @__PURE__ */ i(
                "span",
                {
                  className: O("fds-select-input__chevron", t && "fds-select-input__chevron--open"),
                  role: "button",
                  "aria-label": t ? "Close menu" : "Open menu",
                  onMouseDown: (e) => {
                    e.preventDefault();
                  },
                  onClick: (e) => {
                    s || (e.stopPropagation(), n(!t));
                  },
                  children: /* @__PURE__ */ i(I, { size: 16 })
                }
              )
            }
          ),
          t && a && f && typeof document < "u" && G(
            /* @__PURE__ */ i(
              "div",
              {
                ref: p,
                className: "fds-select-input__popover",
                style: { top: f.top, left: f.left, width: f.width },
                children: a
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
