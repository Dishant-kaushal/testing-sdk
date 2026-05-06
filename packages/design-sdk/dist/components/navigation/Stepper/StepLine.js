import { jsx as t, jsxs as a } from "react/jsx-runtime";
import { Divider as f } from "../../layout/Divider/Divider.js";
import { StepperIndicator as b } from "./StepperIndicator.js";
import { useStepper as w } from "./StepperContext.js";
/* empty css             */
const u = 6, n = 31, h = 2;
function y(e) {
  const i = e === "Large" ? 24 : 20;
  return {
    markerBg: i,
    markerLeftAlignment: (i + h) / 2,
    markerTopAlignment: -(i + h * 2 + 2) / 2
  };
}
const N = /* @__PURE__ */ t(b, { color: "neutral" });
function o(e) {
  return e === "none" || e === "end";
}
function s(e) {
  return e === "none" || e === "start";
}
function d(e) {
  const i = {
    visibility: e.visible ? "visible" : "hidden",
    marginLeft: e.marginLeft
  };
  return e.fixedHeight != null ? i.height = `${e.fixedHeight}px` : i.flex = "1 1 0", /* @__PURE__ */ t(
    f,
    {
      orientation: "Vertical",
      thickness: "Thicker",
      variant: "Muted",
      lineStyle: e.isDotted ? "Dashed" : "Solid",
      className: "fds-step-line__straight fds-step-line__straight--vertical",
      style: i
    }
  );
}
function c(e) {
  return /* @__PURE__ */ t(
    f,
    {
      orientation: "Horizontal",
      thickness: "Thicker",
      variant: "Muted",
      lineStyle: e.isDotted ? "Dashed" : "Solid",
      className: "fds-step-line__straight fds-step-line__straight--horizontal",
      style: { visibility: e.visible ? "visible" : "hidden", flex: "1 1 0" }
    }
  );
}
function C({ isDotted: e, visible: i }) {
  const r = { visibility: i ? "visible" : "hidden" };
  return e ? /* @__PURE__ */ a(
    "svg",
    {
      className: "fds-step-line__curve",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      style: r,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ t("path", { d: "M2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1Z" }),
        /* @__PURE__ */ t("path", { d: "M2 6C2 6.55228 1.55228 7 1 7C0.447715 7 0 6.55228 0 6C0 5.44772 0.447715 5 1 5C1.55228 5 2 5.44772 2 6Z" }),
        /* @__PURE__ */ t("path", { d: "M1 12C1.55228 12 2 11.5523 2 11C2 10.4477 1.55228 10 1 10C0.447715 10 0 10.4477 0 11C0 11.5523 0.447715 12 1 12Z" }),
        /* @__PURE__ */ t("path", { d: "M3 16C3 16.5523 2.55228 17 2 17C1.44772 17 1 16.5523 1 16C1 15.4477 1.44772 15 2 15C2.55228 15 3 15.4477 3 16Z" }),
        /* @__PURE__ */ t("path", { d: "M7 20C7.55228 20 8 19.5523 8 19C8 18.4477 7.55228 18 7 18C6.44772 18 6 18.4477 6 19C6 19.5523 6.44772 20 7 20Z" }),
        /* @__PURE__ */ t("path", { d: "M14 19C14 19.5523 13.5523 20 13 20C12.4477 20 12 19.5523 12 19C12 18.4477 12.4477 18 13 18C13.5523 18 14 18.4477 14 19Z" }),
        /* @__PURE__ */ t("path", { d: "M19 20C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18C18.4477 18 18 18.4477 18 19C18 19.5523 18.4477 20 19 20Z" })
      ]
    }
  ) : /* @__PURE__ */ t(
    "svg",
    {
      className: "fds-step-line__curve",
      width: "20",
      height: "14",
      viewBox: "0 0 20 14",
      fill: "none",
      style: r,
      "aria-hidden": "true",
      children: /* @__PURE__ */ t(
        "path",
        {
          d: "M1 0V5C1 9.41828 4.58172 13 9 13H20",
          stroke: "currentColor",
          strokeWidth: "2"
        }
      )
    }
  );
}
function g({ isDotted: e, visible: i }) {
  const r = { visibility: i ? "visible" : "hidden" };
  return e ? /* @__PURE__ */ a(
    "svg",
    {
      className: "fds-step-line__curve",
      width: "42",
      height: "5",
      viewBox: "0 0 42 5",
      fill: "currentColor",
      style: r,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ t("path", { d: "M32 1C32 1.55228 31.5523 2 31 2C30.4477 2 30 1.55228 30 1C30 0.447715 30.4477 0 31 0C31.5523 0 32 0.447715 32 1Z" }),
        /* @__PURE__ */ t("path", { d: "M2 4C2 4.55228 1.55228 5 1 5C0.447715 5 0 4.55228 0 4C0 3.44772 0.447715 3 1 3C1.55228 3 2 3.44772 2 4Z" }),
        /* @__PURE__ */ t("path", { d: "M27.5 3.5C28.0523 3.5 28.5 3.05228 28.5 2.5C28.5 1.94772 28.0523 1.5 27.5 1.5C26.9477 1.5 26.5 1.94772 26.5 2.5C26.5 3.05228 26.9477 3.5 27.5 3.5Z" }),
        /* @__PURE__ */ t("path", { d: "M5.5 2.5C5.5 3.05228 5.05228 3.5 4.5 3.5C3.94772 3.5 3.5 3.05228 3.5 2.5C3.5 1.94772 3.94772 1.5 4.5 1.5C5.05228 1.5 5.5 1.94772 5.5 2.5Z" }),
        /* @__PURE__ */ t("path", { d: "M16.5 3.5C17.0523 3.5 17.5 3.05228 17.5 2.5C17.5 1.94772 17.0523 1.5 16.5 1.5C15.9477 1.5 15.5 1.94772 15.5 2.5C15.5 3.05228 15.9477 3.5 16.5 3.5Z" }),
        /* @__PURE__ */ t("path", { d: "M11.5 2.5C11.5 3.05228 11.0523 3.5 10.5 3.5C9.94771 3.5 9.5 3.05228 9.5 2.5C9.5 1.94772 9.94771 1.5 10.5 1.5C11.0523 1.5 11.5 1.94772 11.5 2.5Z" }),
        /* @__PURE__ */ t("path", { d: "M22.5 3.5C23.0523 3.5 23.5 3.05228 23.5 2.5C23.5 1.94772 23.0523 1.5 22.5 1.5C21.9477 1.5 21.5 1.94772 21.5 2.5C21.5 3.05228 21.9477 3.5 22.5 3.5Z" })
      ]
    }
  ) : /* @__PURE__ */ t(
    "svg",
    {
      className: "fds-step-line__curve",
      width: "33",
      height: "5",
      viewBox: "0 0 33 5",
      fill: "none",
      style: r,
      "aria-hidden": "true",
      children: /* @__PURE__ */ t(
        "path",
        {
          d: "M1 5V5C1 3.63251 2.108 2.52363 3.47549 2.52255L29.5 2.50198C30.881 2.50088 32 1.38103 32 1.19209e-07V1.19209e-07",
          stroke: "currentColor",
          strokeWidth: "2"
        }
      )
    }
  );
}
function m(e) {
  const i = e.isIndented ? n : void 0;
  return /* @__PURE__ */ a("span", { className: "fds-step-line__column", style: { marginLeft: i }, children: [
    /* @__PURE__ */ t(
      d,
      {
        isDotted: o(e.stepProgress),
        visible: e.shouldShowStartBranch,
        fixedHeight: u
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        className: "fds-step-line__marker",
        style: { marginLeft: -e.geometry.markerLeftAlignment },
        children: e.marker
      }
    ),
    /* @__PURE__ */ t(
      d,
      {
        isDotted: s(e.stepProgress),
        visible: e.shouldShowEndBranch
      }
    )
  ] });
}
function B(e) {
  return /* @__PURE__ */ a("span", { className: "fds-step-line__column", children: [
    /* @__PURE__ */ t(
      C,
      {
        visible: e.shouldShowStartBranch,
        isDotted: o(e.stepProgress)
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        className: "fds-step-line__marker",
        style: {
          marginLeft: -e.geometry.markerLeftAlignment + n,
          marginTop: e.geometry.markerTopAlignment
        },
        children: e.marker
      }
    ),
    /* @__PURE__ */ t(
      d,
      {
        visible: e.shouldShowEndBranch,
        marginLeft: n,
        isDotted: s(e.stepProgress)
      }
    )
  ] });
}
function D(e) {
  return /* @__PURE__ */ a("span", { className: "fds-step-line__column", children: [
    /* @__PURE__ */ t(
      d,
      {
        visible: e.shouldShowStartBranch,
        marginLeft: n,
        fixedHeight: u,
        isDotted: o(e.stepProgress)
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        className: "fds-step-line__marker",
        style: { marginLeft: -e.geometry.markerLeftAlignment + n },
        children: e.marker
      }
    ),
    /* @__PURE__ */ t(
      d,
      {
        marginLeft: n,
        visible: e.shouldShowEndBranch,
        isDotted: s(e.stepProgress)
      }
    ),
    /* @__PURE__ */ t(
      g,
      {
        visible: e.shouldShowEndBranch,
        isDotted: s(e.stepProgress)
      }
    )
  ] });
}
function x(e) {
  return /* @__PURE__ */ a("span", { className: "fds-step-line__column", children: [
    /* @__PURE__ */ t(
      C,
      {
        visible: e.shouldShowStartBranch,
        isDotted: o(e.stepProgress)
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        className: "fds-step-line__marker",
        style: {
          marginLeft: -e.geometry.markerLeftAlignment + n,
          marginTop: e.geometry.markerTopAlignment
        },
        children: e.marker
      }
    ),
    /* @__PURE__ */ t(
      d,
      {
        marginLeft: n,
        visible: e.shouldShowEndBranch,
        isDotted: s(e.stepProgress)
      }
    ),
    /* @__PURE__ */ t(
      g,
      {
        visible: e.shouldShowEndBranch,
        isDotted: s(e.stepProgress)
      }
    )
  ] });
}
function Z(e) {
  return /* @__PURE__ */ a("span", { className: "fds-step-line__row", children: [
    /* @__PURE__ */ t(
      c,
      {
        isDotted: o(e.stepProgress),
        visible: e.shouldShowStartBranch
      }
    ),
    /* @__PURE__ */ t("span", { className: "fds-step-line__marker", children: e.marker }),
    /* @__PURE__ */ t(
      c,
      {
        isDotted: s(e.stepProgress),
        visible: e.shouldShowEndBranch
      }
    )
  ] });
}
function A({
  stepType: e,
  shouldShowStartBranch: i,
  shouldShowEndBranch: r,
  marker: v,
  stepProgress: _
}) {
  const { orientation: S, size: k } = w(), L = v ?? N, M = y(k), l = {
    marker: L,
    stepProgress: _,
    shouldShowStartBranch: i,
    shouldShowEndBranch: r,
    geometry: M
  };
  return S === "horizontal" ? /* @__PURE__ */ t(Z, { ...l }) : e === "start" ? /* @__PURE__ */ t(B, { ...l }) : e === "middle" ? /* @__PURE__ */ t(m, { ...l, isIndented: !0 }) : e === "end" ? /* @__PURE__ */ t(D, { ...l }) : e === "single-item" ? /* @__PURE__ */ t(x, { ...l }) : /* @__PURE__ */ t(m, { ...l, isIndented: !1 });
}
A.displayName = "StepLine";
export {
  A as StepLine
};
