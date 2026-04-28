import { jsxs as me, jsx as _ } from "react/jsx-runtime";
import { useId as de, useState as H, useCallback as u, useRef as D, useEffect as k, useMemo as pe } from "react";
import { cn as he } from "../../../utils/cn.js";
import { useClickOutside as ye } from "../../../hooks/useClickOutside.js";
import { useKeyboard as ge } from "../../../hooks/useKeyboard.js";
import { TimeInputTrigger as Ie } from "./TimeInputTrigger.js";
import { TimeInputPopover as Te } from "./TimeInputPopover.js";
/* empty css              */
const l = (t) => t < 10 ? `0${t}` : String(t), ve = Array.from({ length: 24 }, (t, r) => l(r)), Me = Array.from({ length: 12 }, (t, r) => l(r + 1)), Ae = Array.from({ length: 60 }, (t, r) => l(r)), w = (t) => t < 12 ? "AM" : "PM", x = (t) => {
  const r = t % 12;
  return r === 0 ? 11 : r - 1;
}, C = (t, r) => {
  const o = t === 11 ? 12 : t + 1;
  return r === "AM" ? o === 12 ? 0 : o : o === 12 ? 12 : o + 12;
}, _e = (t, r) => {
  if (!t) return "";
  const { hours: o, minutes: m } = t;
  if (r === "24") return `${l(o)} : ${l(m)}`;
  const c = o % 12 === 0 ? 12 : o % 12;
  return `${l(c)} : ${l(m)} ${w(o)}`;
}, He = "Select time", $ = () => {
  const t = /* @__PURE__ */ new Date();
  return { hours: t.getHours(), minutes: t.getMinutes() };
};
function De({
  label: t,
  name: r,
  value: o,
  defaultValue: m = null,
  hourFormat: c = "12",
  size: N = "Medium",
  placeholder: P,
  isOpen: E,
  onOpenChange: d,
  onChange: p,
  helpText: R,
  errorText: V,
  successText: K,
  validationState: U = "none",
  isDisabled: h = !1,
  isRequired: L = !1,
  necessityIndicator: b,
  showFooter: j = !0,
  cancelLabel: q,
  applyLabel: B,
  className: z,
  id: G,
  ...J
}) {
  const Q = de(), W = G ?? Q, g = r ?? "", X = P ?? He, I = o !== void 0, [Y, Z] = H(m), f = I ? o ?? null : Y, T = E !== void 0, [F, ee] = H(!1), n = T ? E : F, i = u(
    (e) => {
      T || ee(e), d == null || d(e);
    },
    [T, d]
  ), [a, y] = H(() => f ?? $()), v = D(n);
  k(() => {
    !v.current && n && y(f ?? $()), v.current = n;
  }, [n, f]);
  const te = c === "12" ? Me : ve, ne = c === "12" ? x(a.hours) : a.hours, re = a.minutes, se = w(a.hours), oe = pe(
    () => _e(f, c),
    [f, c]
  ), ie = u(
    (e) => {
      y((s) => ({
        ...s,
        hours: c === "12" ? C(e, w(s.hours)) : e
      }));
    },
    [c]
  ), ce = u((e) => {
    y((s) => ({ ...s, minutes: e }));
  }, []), ue = u((e) => {
    y((s) => {
      const S = x(s.hours);
      return { ...s, hours: C(S, e) };
    });
  }, []), O = u(
    (e) => {
      I || Z(e), p == null || p({ name: g, value: e });
    },
    [I, g, p]
  ), M = D(!1), le = u(() => {
    O(a), i(!1);
  }, [O, a, i]), ae = u(() => {
    i(!1);
  }, [i]), A = D(null);
  ye(A, () => {
    n && i(!1);
  }), ge(
    "Escape",
    (e) => {
      n && (e.preventDefault(), e.stopPropagation(), M.current = !0, i(!1));
    },
    n
  ), k(() => {
    v.current && !n && M.current && (M.current = !1, requestAnimationFrame(() => {
      var s;
      const e = (s = A.current) == null ? void 0 : s.querySelector(
        ".fds-text-input__input"
      );
      e == null || e.focus();
    }));
  }, [n]);
  const fe = u(
    (e) => {
      if (h) return;
      const s = e.target;
      if (s.closest(".fds-time-trigger") !== null && !s.closest(".fds-time-popover"))
        switch (e.key) {
          case "Enter":
          case " ":
            e.preventDefault(), i(!n);
            break;
          case "ArrowDown":
            n || (e.preventDefault(), i(!0));
            break;
        }
    },
    [h, n, i]
  );
  return /* @__PURE__ */ me(
    "div",
    {
      ref: A,
      id: W,
      className: he("fds-time-input", z),
      onKeyDown: fe,
      ...J,
      children: [
        /* @__PURE__ */ _(
          Ie,
          {
            label: t,
            name: g || void 0,
            placeholder: X,
            displayValue: oe,
            size: N,
            isOpen: n,
            isDisabled: h,
            isRequired: L,
            necessityIndicator: b,
            helpText: R,
            errorText: V,
            successText: K,
            validationState: U,
            onClick: () => {
              h || i(!n);
            }
          }
        ),
        n && /* @__PURE__ */ _("div", { className: "fds-time-input__popover", children: /* @__PURE__ */ _(
          Te,
          {
            hourFormat: c,
            hourItems: te,
            minuteItems: Ae,
            hourIndex: ne,
            minuteIndex: re,
            meridiem: se,
            onHourChange: ie,
            onMinuteChange: ce,
            onMeridiemChange: ue,
            showFooter: j,
            cancelLabel: q,
            applyLabel: B,
            onCancel: ae,
            onApply: le
          }
        ) })
      ]
    }
  );
}
De.displayName = "TimeInput";
export {
  De as TimeInput
};
