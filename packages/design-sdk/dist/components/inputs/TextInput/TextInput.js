import { jsxs as _, jsx as e } from "react/jsx-runtime";
import { forwardRef as _e, useId as xe, useState as D, useCallback as x } from "react";
import { X as Ne } from "react-feather";
import { IconButton as he } from "../../actions/IconButton/IconButton.js";
import { Spinner as be } from "../../feedback/Spinner/Spinner.js";
import { InputFieldHeader as ye } from "../../forms/InputFieldHeader/InputFieldHeader.js";
import { InputFieldFooter as we } from "../../forms/InputFieldFooter/InputFieldFooter.js";
import { cn as N } from "../../../utils/cn.js";
/* empty css              */
const Ie = {
  name: "name",
  email: "email",
  countryName: "country-name",
  postalCode: "postal-code",
  telephone: "tel",
  username: "username",
  none: "off",
  currentPassword: "current-password",
  newPassword: "new-password",
  oneTimeCode: "one-time-code"
}, Pe = {
  text: "text",
  search: "search",
  telephone: "tel",
  email: "email",
  url: "url",
  number: "number",
  password: "password"
}, Te = _e(
  ({
    label: n,
    size: h = "Medium",
    labelPosition: R = "top",
    necessityIndicator: X,
    name: Y,
    type: g = "text",
    placeholder: G,
    value: b,
    defaultValue: M,
    validationState: y = "none",
    helpText: J,
    errorText: F,
    successText: K,
    onChange: s,
    onFocus: c,
    onBlur: u,
    isDisabled: Q = !1,
    isRequired: p = !1,
    icon: $,
    showClearButton: z = !1,
    onClearButtonClicked: m,
    prefix: A,
    suffix: w,
    trailingIcon: H,
    isLoading: d = !1,
    maxCharacters: r,
    autoFocus: W = !1,
    autoCompleteSuggestionType: S,
    keyboardReturnKeyType: V,
    className: Z,
    id: B,
    disabled: k,
    ...C
  }, ee) => {
    const te = xe(), I = B ?? te, j = `${I}-help`, t = Y ?? "", f = Q || k || !1, se = G ?? "Enter value", o = X ?? (p ? "required" : void 0), [re, ie] = D(!1), [de, L] = D(M ?? ""), i = b !== void 0, P = i ? b : de, a = y === "error" || (o === "required" || p) && re && !P, T = y === "success" && !a, O = a ? y === "error" ? F ?? "Error" : F ?? `${n} is required` : T ? K ?? "" : J ?? "", oe = a ? "error" : T ? "success" : "default", U = !d && (!!O || r !== void 0), ae = P.length, le = r !== void 0 ? `${ae}/${r}` : "", ne = x((l) => {
      const E = l.target.value;
      r !== void 0 && E.length > r || (i || L(E), s == null || s({ name: t, value: E }));
    }, [i, t, s, r]), ce = x((l) => {
      ie(!0), u == null || u({ name: t, value: l.target.value });
    }, [t, u]), ue = x((l) => {
      c == null || c({ name: t, value: l.target.value });
    }, [t, c]), pe = x(() => {
      i || L(""), m == null || m(), s == null || s({ name: t, value: "" });
    }, [i, t, m, s]), v = h === "Large", q = v ? "BodyLargeRegular" : "BodyMediumRegular", me = v ? 20 : 16, fe = v ? "20" : "16", ve = N(
      "fds-text-input",
      v && "fds-text-input--size-large",
      R === "left" && "fds-text-input--label-left",
      f && "fds-text-input--disabled",
      d && "fds-text-input--loading",
      a && "fds-text-input--error",
      T && "fds-text-input--success",
      Z
    );
    return /* @__PURE__ */ _("div", { className: ve, children: [
      /* @__PURE__ */ e(
        ye,
        {
          label: o === "optional" ? `${n} (optional)` : n,
          necessityIndicator: o === "required" ? "required" : "none",
          size: h,
          htmlFor: I
        }
      ),
      /* @__PURE__ */ e("div", { className: "fds-text-input__field-wrapper", children: /* @__PURE__ */ _("div", { className: "fds-text-input__field", children: [
        /* @__PURE__ */ _("div", { className: "fds-text-input__leading", children: [
          $ && /* @__PURE__ */ e("span", { className: "fds-text-input__icon", children: $ }),
          A && /* @__PURE__ */ e("span", { className: N("fds-text-input__prefix", q), children: A }),
          /* @__PURE__ */ e(
            "input",
            {
              ref: ee,
              className: N("fds-text-input__input", q),
              type: Pe[g],
              id: I,
              name: t || void 0,
              placeholder: se,
              value: i ? b : void 0,
              defaultValue: i ? void 0 : M,
              disabled: f,
              required: o === "required" || p || void 0,
              autoFocus: W || void 0,
              autoComplete: S ? Ie[S] : void 0,
              enterKeyHint: V !== "default" ? V : void 0,
              maxLength: r,
              "aria-label": n,
              "aria-required": o === "required" || p || void 0,
              "aria-disabled": f || void 0,
              "aria-invalid": a || void 0,
              "aria-describedby": U ? j : void 0,
              "aria-busy": d || void 0,
              onChange: ne,
              onBlur: ce,
              onFocus: ue,
              ...C
            }
          )
        ] }),
        (w || z || d || H) && /* @__PURE__ */ _("span", { className: "fds-text-input__trailing", children: [
          w && /* @__PURE__ */ e("span", { className: N("fds-text-input__suffix", q), children: w }),
          z && P && !f && !d && /* @__PURE__ */ e(
            he,
            {
              icon: /* @__PURE__ */ e(Ne, { size: me }),
              size: fe,
              onClick: pe,
              "aria-label": "Clear",
              className: "fds-text-input__clear"
            }
          ),
          d && /* @__PURE__ */ e(be, { color: "Brand", size: "Medium", accessibilityLabel: "Loading" }),
          H
        ] })
      ] }) }),
      U && /* @__PURE__ */ e(
        we,
        {
          helpText: O || void 0,
          counterText: r !== void 0 ? le : void 0,
          state: oe,
          size: h,
          id: j
        }
      )
    ] });
  }
);
Te.displayName = "TextInput";
export {
  Te as TextInput
};
