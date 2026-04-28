import { jsxs as k, jsx as l } from "react/jsx-runtime";
import { useState as i, useRef as M, useEffect as c, useCallback as N } from "react";
import { cn as q } from "../../../utils/cn.js";
import { TextInput as r } from "../TextInput/TextInput.js";
import { SelectInput as z } from "../SelectInput/SelectInput.js";
import { DropdownMenu as F } from "../../overlays/DropdownMenu/DropdownMenu.js";
import { ActionListItem as O } from "../../overlays/DropdownMenu/ActionListItem.js";
import { ActionListItemGroup as J } from "../../overlays/DropdownMenu/ActionListItemGroup.js";
import { useClickOutside as K } from "../../../hooks/useClickOutside.js";
/* empty css                */
function P({
  mode: s = "Hex",
  hex: n = "#000000",
  r: p = 0,
  g: v = 0,
  b: d = 0,
  opacity: S = 100,
  onModeChange: e,
  onHexChange: o,
  onRgbChange: m,
  onOpacityChange: a,
  className: $,
  ...w
}) {
  const [f, u] = i(!1), H = M(null);
  K(H, () => {
    f && u(!1);
  });
  const [x, R] = i(n), [B, T] = i(String(p)), [I, b] = i(String(v)), [L, j] = i(String(d)), [G, A] = i(`${S}%`);
  c(() => {
    R(n);
  }, [n]), c(() => {
    T(String(p));
  }, [p]), c(() => {
    b(String(v));
  }, [v]), c(() => {
    j(String(d));
  }, [d]), c(() => {
    A(`${S}%`);
  }, [S]);
  const D = N(() => {
    o == null || o(x);
  }, [x, o]), _ = N(() => {
    m == null || m(
      Math.max(0, Math.min(255, parseInt(B) || 0)),
      Math.max(0, Math.min(255, parseInt(I) || 0)),
      Math.max(0, Math.min(255, parseInt(L) || 0))
    );
  }, [B, I, L, m]), E = N(() => {
    a == null || a(Math.max(0, Math.min(100, parseInt(G) || 0)));
  }, [G, a]);
  return /* @__PURE__ */ k("div", { className: q("fds-color-config", $), ...w, children: [
    /* @__PURE__ */ l("div", { ref: H, className: "fds-color-config__mode", children: /* @__PURE__ */ l(
      z,
      {
        label: "",
        value: s,
        isOpen: f,
        onClick: () => u(!f),
        children: f && /* @__PURE__ */ l(F, { children: /* @__PURE__ */ k(J, { children: [
          /* @__PURE__ */ l(
            O,
            {
              title: "Hex",
              selectionType: "Single",
              isSelected: s === "Hex",
              onClick: () => {
                e == null || e("Hex"), u(!1);
              }
            }
          ),
          /* @__PURE__ */ l(
            O,
            {
              title: "RGB",
              selectionType: "Single",
              isSelected: s === "RGB",
              onClick: () => {
                e == null || e("RGB"), u(!1);
              }
            }
          )
        ] }) })
      }
    ) }),
    s === "Hex" ? (
      /* Hex: single TextInput */
      /* @__PURE__ */ l("div", { className: "fds-color-config__hex", children: /* @__PURE__ */ l(
        r,
        {
          label: "",
          value: x,
          onChange: (t) => R(t.value),
          onBlur: () => D(),
          maxCharacters: 7
        }
      ) })
    ) : (
      /* RGB: 3 value inputs + opacity, gap spacing/2 */
      /* @__PURE__ */ k("div", { className: "fds-color-config__rgb", children: [
        /* @__PURE__ */ l(
          r,
          {
            label: "",
            value: B,
            onChange: (t) => T(t.value),
            onBlur: () => _()
          }
        ),
        /* @__PURE__ */ l(
          r,
          {
            label: "",
            value: I,
            onChange: (t) => b(t.value),
            onBlur: () => _()
          }
        ),
        /* @__PURE__ */ l(
          r,
          {
            label: "",
            value: L,
            onChange: (t) => j(t.value),
            onBlur: () => _()
          }
        ),
        /* @__PURE__ */ l(
          r,
          {
            label: "",
            value: G,
            onChange: (t) => A(t.value),
            onBlur: () => E()
          }
        )
      ] })
    )
  ] });
}
P.displayName = "ColorConfig";
export {
  P as ColorConfig
};
