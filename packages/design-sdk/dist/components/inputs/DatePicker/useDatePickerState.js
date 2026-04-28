import { useState as h, useCallback as n, useRef as r, useEffect as P, useMemo as v } from "react";
import { formatDate as o, formatTime as k, generateCalendarDays as Bt, generateMonths as Kt, generateYears as Nt, getPresetDateRange as jt, formatDateInput as zt, parseDateDMY as l, parseTime as tt, getHeaderLabel as Gt } from "./datePickerUtils.js";
function Ut({
  mode: f,
  controlledOpen: X,
  onOpenChange: Q,
  value: d,
  onChange: U,
  rangeValue: t,
  onRangeChange: b,
  controlledPreset: N,
  controlledPresetSelect: W,
  isDisabled: Jt
}) {
  const [st, it] = h(!1), A = X ?? st, T = n(
    (s) => {
      X === void 0 && it(s), Q == null || Q(s);
    },
    [X, Q]
  ), u = /* @__PURE__ */ new Date(), R = f === "single" ? d : t == null ? void 0 : t.start, [p, H] = h((R == null ? void 0 : R.getMonth()) ?? u.getMonth()), [S, y] = h((R == null ? void 0 : R.getFullYear()) ?? u.getFullYear()), [w, q] = h("date"), Z = Math.floor(S / 12) * 12, [D, E] = h((t == null ? void 0 : t.start) ?? null), [L, Y] = h((t == null ? void 0 : t.end) ?? null), [_, x] = h(t ? 2 : 0), [e, j] = h(null), [z, g] = h(!1), [ct, V] = h(N ?? "custom"), $ = N ?? ct, m = n(
    (s) => {
      V(s), W == null || W(s);
    },
    [W]
  ), [B, K] = h(d ?? null), [ft, G] = h(d ? o(d) : ""), [ot, I] = h(t != null && t.start ? o(t.start) : ""), [dt, F] = h(t != null && t.end ? o(t.end) : ""), [nt, J] = h(t != null && t.start ? k(t.start) : "00:00"), [Dt, O] = h(t != null && t.end ? k(t.end) : "00:00"), a = r(null), ht = r(!1), C = r($);
  P(() => {
    f === "single" && (K(d ?? null), G(d ? o(d) : ""), d && (H(d.getMonth()), y(d.getFullYear())));
  }, [d, f]), P(() => {
    f === "range" && (E((t == null ? void 0 : t.start) ?? null), Y((t == null ? void 0 : t.end) ?? null), I(t != null && t.start ? o(t.start) : ""), F(t != null && t.end ? o(t.end) : ""), J(t != null && t.start ? k(t.start) : "00:00"), O(t != null && t.end ? k(t.end) : "00:00"), x(t ? 2 : 0), t != null && t.start && (H(t.start.getMonth()), y(t.start.getFullYear())));
  }, [t, f]), P(() => {
    N !== void 0 && V(N);
  }, [N]), P(() => {
    if (A) {
      C.current = $;
      const s = f === "single" ? d : t == null ? void 0 : t.start;
      s && (H(s.getMonth()), y(s.getFullYear())), q("date");
    }
  }, [A]), P(() => {
    z && requestAnimationFrame(() => {
      var c;
      const s = (c = a.current) == null ? void 0 : c.querySelector(".fds-datepicker__preset-dropdown"), i = s == null ? void 0 : s.querySelector('[role="menuitem"]:not([aria-disabled="true"])');
      i == null || i.focus();
    });
  }, [z]);
  const wt = n(() => {
    A && (f === "single" ? (K(d ?? null), G(d ? o(d) : "")) : (E((t == null ? void 0 : t.start) ?? null), Y((t == null ? void 0 : t.end) ?? null), I(t != null && t.start ? o(t.start) : ""), F(t != null && t.end ? o(t.end) : ""), J(t != null && t.start ? k(t.start) : "00:00"), O(t != null && t.end ? k(t.end) : "00:00"), x(t ? 2 : 0)), m(C.current), j(null), q("date"), T(!1)), z && g(!1);
  }, [A, z, f, d, t, T, m]), Mt = v(
    () => Bt(
      S,
      p,
      f === "range" ? D : null,
      f === "range" ? L : null,
      f === "single" ? B : null,
      f === "range" ? e : null
    ),
    [S, p, D, L, B, e, f]
  ), pt = v(() => Kt(p), [p]), yt = v(() => Nt(Z, S), [Z, S]), mt = Gt(w, S, p, Z), Tt = n(() => {
    w === "date" ? p === 0 ? (H(11), y((s) => s - 1)) : H((s) => s - 1) : y(w === "month" ? (s) => s - 1 : (s) => s - 12);
  }, [w, p]), Ht = n(() => {
    w === "date" ? p === 11 ? (H(0), y((s) => s + 1)) : H((s) => s + 1) : y(w === "month" ? (s) => s + 1 : (s) => s + 12);
  }, [w, p]), St = n(() => {
    w === "date" ? q("month") : w === "month" && q("year");
  }, [w]), Yt = n((s) => {
    w === "year" ? (y(s.value), q("month")) : w === "month" && (H(s.value), q("date"));
  }, [w]), kt = n((s) => {
    if (s.type === "outOfMonth") return;
    const i = new Date(S, p, s.date);
    f === "single" ? (K(i), G(o(i))) : _ === 0 || _ === 2 ? (E(i), Y(null), I(o(i)), F(""), x(1), m("custom")) : (i < D ? (E(i), Y(D), I(o(i)), F(o(D))) : (Y(i), F(o(i))), x(2), j(null));
  }, [S, p, f, _, D, m]), Et = n((s) => {
    m(s);
    const i = jt(s);
    i && (E(i.start), Y(i.end), I(o(i.start)), F(o(i.end)), J(k(i.start)), O(k(i.end)), x(2), H(i.start.getMonth()), y(i.start.getFullYear()), b == null || b({ start: i.start, end: i.end }), T(!1));
  }, [m, b, T]), Ft = n(() => {
    f === "single" ? U == null || U(B) : D && L && (b == null || b({ start: D, end: L })), T(!1);
  }, [f, B, D, L, U, b, T]), bt = n(() => {
    f === "single" ? (K(d ?? null), G(d ? o(d) : "")) : (E((t == null ? void 0 : t.start) ?? null), Y((t == null ? void 0 : t.end) ?? null), I(t != null && t.start ? o(t.start) : ""), F(t != null && t.end ? o(t.end) : ""), J(t != null && t.start ? k(t.start) : "00:00"), O(t != null && t.end ? k(t.end) : "00:00"), x(t ? 2 : 0)), m(C.current), j(null), q("date"), T(!1);
  }, [f, d, t, T, m]), xt = n((s) => {
    f !== "range" || _ !== 1 || s.type === "outOfMonth" || j(new Date(S, p, s.date));
  }, [f, _, S, p]), It = n(() => {
    j(null);
  }, []), At = n((s) => {
    const i = zt(s);
    if (G(i), i === "") {
      K(null);
      return;
    }
    const c = l(i);
    c && (K(c), H(c.getMonth()), y(c.getFullYear()), A || T(!0));
  }, [A, T]), qt = n((s) => {
    I(s);
    const i = l(s);
    i && (E((c) => {
      const M = new Date(i);
      return c && M.setHours(c.getHours(), c.getMinutes()), M;
    }), H(i.getMonth()), y(i.getFullYear()), x(1), m("custom"));
  }, [m]), Rt = n((s) => {
    F(s);
    const i = l(s);
    if (i) {
      if (D && i < D) {
        const c = new Date(i), M = new Date(D);
        c.setHours(D.getHours(), D.getMinutes()), E(c), Y(M), I(o(c)), F(o(M));
      } else
        Y((c) => {
          const M = new Date(i);
          return c && M.setHours(c.getHours(), c.getMinutes()), M;
        });
      x(2), m("custom");
    }
  }, [D, m]), Lt = n((s) => {
    J(s);
    const i = tt(s);
    i && E((c) => {
      if (!c) return c;
      const M = new Date(c);
      return M.setHours(i.hours, i.minutes), M;
    });
  }, []), _t = n((s) => {
    O(s);
    const i = tt(s);
    i && Y((c) => {
      if (!c) return c;
      const M = new Date(c);
      return M.setHours(i.hours, i.minutes), M;
    });
  }, []);
  return {
    // State
    open: A,
    setOpen: T,
    presetOpen: z,
    setPresetOpen: g,
    preset: $,
    view: w,
    // Refs
    containerRef: a,
    closedByKeyboard: ht,
    // Calendar data
    days: Mt,
    monthItems: pt,
    yearItems: yt,
    headerLabel: mt,
    // Draft values
    draftSingle: B,
    singleInputText: ft,
    startRawText: ot,
    endRawText: dt,
    startTimeRaw: nt,
    endTimeRaw: Dt,
    // Derived
    isApplyDisabled: f === "single" ? B === null : !(D && L && _ === 2),
    // Handlers
    closeAndRevert: wt,
    handlePrev: Tt,
    handleNext: Ht,
    handleHeaderClick: St,
    handleItemClick: Yt,
    handleDayClick: kt,
    handleDayHover: xt,
    handleDayHoverEnd: It,
    handlePresetSelect: Et,
    handleApply: Ft,
    handleCancel: bt,
    handleSingleInputChange: At,
    handleStartDateChange: qt,
    handleEndDateChange: Rt,
    handleStartTimeChange: Lt,
    handleEndTimeChange: _t
  };
}
export {
  Ut as useDatePickerState
};
