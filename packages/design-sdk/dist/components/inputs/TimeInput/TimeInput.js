import { jsxs as de, jsx as D } from "react/jsx-runtime";
import { useId as ye, useState as H, useCallback as u, useRef as w, useEffect as O, useMemo as he } from "react";
import { createPortal as ge } from "react-dom";
import { cn as Ie } from "../../../utils/cn.js";
import { useDropdownPortal as Te } from "../../../hooks/useDropdownPortal.js";
import { useKeyboard as ve } from "../../../hooks/useKeyboard.js";
import { TimeInputTrigger as Me } from "./TimeInputTrigger.js";
import { TimeInputPopover as Ae } from "./TimeInputPopover.js";
/* empty css              */
const l = (t) => t < 10 ? `0${t}` : String(t), _e = Array.from({ length: 24 }, (t, r) => l(r)), De = Array.from({ length: 12 }, (t, r) => l(r + 1)), He = Array.from({ length: 60 }, (t, r) => l(r)), E = (t) => t < 12 ? "AM" : "PM", R = (t) => {
  const r = t % 12;
  return r === 0 ? 11 : r - 1;
}, $ = (t, r) => {
  const s = t === 11 ? 12 : t + 1;
  return r === "AM" ? s === 12 ? 0 : s : s === 12 ? 12 : s + 12;
}, we = (t, r) => {
  if (!t) return "";
  const { hours: s, minutes: m } = t;
  if (r === "24") return `${l(s)} : ${l(m)}`;
  const i = s % 12 === 0 ? 12 : s % 12;
  return `${l(i)} : ${l(m)} ${E(s)}`;
}, Ee = "Select time", k = () => {
  const t = /* @__PURE__ */ new Date();
  return { hours: t.getHours(), minutes: t.getMinutes() };
};
function Pe({
  label: t,
  name: r,
  value: s,
  defaultValue: m = null,
  hourFormat: i = "12",
  size: C = "Medium",
  placeholder: N,
  isOpen: P,
  onOpenChange: p,
  onChange: d,
  helpText: V,
  errorText: K,
  successText: U,
  validationState: b = "none",
  isDisabled: y = !1,
  isRequired: L = !1,
  necessityIndicator: j,
  showFooter: q = !0,
  cancelLabel: B,
  applyLabel: z,
  className: G,
  id: J,
  ...Q
}) {
  const W = ye(), X = J ?? W, g = r ?? "", Y = N ?? Ee, I = s !== void 0, [Z, F] = H(m), f = I ? s ?? null : Z, T = P !== void 0, [ee, te] = H(!1), n = T ? P : ee, c = u(
    (e) => {
      T || te(e), p == null || p(e);
    },
    [T, p]
  ), [a, h] = H(() => f ?? k()), v = w(n);
  O(() => {
    !v.current && n && h(f ?? k()), v.current = n;
  }, [n, f]);
  const ne = i === "12" ? De : _e, re = i === "12" ? R(a.hours) : a.hours, oe = a.minutes, se = E(a.hours), ce = he(
    () => we(f, i),
    [f, i]
  ), ie = u(
    (e) => {
      h((o) => ({
        ...o,
        hours: i === "12" ? $(e, E(o.hours)) : e
      }));
    },
    [i]
  ), ue = u((e) => {
    h((o) => ({ ...o, minutes: e }));
  }, []), le = u((e) => {
    h((o) => {
      const x = R(o.hours);
      return { ...o, hours: $(x, e) };
    });
  }, []), S = u(
    (e) => {
      I || F(e), d == null || d({ name: g, value: e });
    },
    [I, g, d]
  ), M = w(!1), ae = u(() => {
    S(a), c(!1);
  }, [S, a, c]), fe = u(() => {
    c(!1);
  }, [c]), A = w(null), { portalRef: me, pos: _ } = Te(A, n, () => c(!1));
  ve(
    "Escape",
    (e) => {
      n && (e.preventDefault(), e.stopPropagation(), M.current = !0, c(!1));
    },
    n
  ), O(() => {
    v.current && !n && M.current && (M.current = !1, requestAnimationFrame(() => {
      var o;
      const e = (o = A.current) == null ? void 0 : o.querySelector(
        ".fds-text-input__input"
      );
      e == null || e.focus();
    }));
  }, [n]);
  const pe = u(
    (e) => {
      if (y) return;
      const o = e.target;
      if (o.closest(".fds-time-trigger") !== null && !o.closest(".fds-time-popover"))
        switch (e.key) {
          case "Enter":
          case " ":
            e.preventDefault(), c(!n);
            break;
          case "ArrowDown":
            n || (e.preventDefault(), c(!0));
            break;
        }
    },
    [y, n, c]
  );
  return /* @__PURE__ */ de(
    "div",
    {
      ref: A,
      id: X,
      className: Ie("fds-time-input", G),
      onKeyDown: pe,
      ...Q,
      children: [
        /* @__PURE__ */ D(
          Me,
          {
            label: t,
            name: g || void 0,
            placeholder: Y,
            displayValue: ce,
            size: C,
            isOpen: n,
            isDisabled: y,
            isRequired: L,
            necessityIndicator: j,
            helpText: V,
            errorText: K,
            successText: U,
            validationState: b,
            onClick: () => {
              y || c(!n);
            }
          }
        ),
        n && _ && typeof document < "u" && ge(
          /* @__PURE__ */ D(
            "div",
            {
              ref: me,
              className: "fds-time-input__popover",
              style: { top: _.top, left: _.left },
              children: /* @__PURE__ */ D(
                Ae,
                {
                  hourFormat: i,
                  hourItems: ne,
                  minuteItems: He,
                  hourIndex: re,
                  minuteIndex: oe,
                  meridiem: se,
                  onHourChange: ie,
                  onMinuteChange: ue,
                  onMeridiemChange: le,
                  showFooter: q,
                  cancelLabel: B,
                  applyLabel: z,
                  onCancel: fe,
                  onApply: ae
                }
              )
            }
          ),
          document.body
        )
      ]
    }
  );
}
Pe.displayName = "TimeInput";
export {
  Pe as TimeInput
};
