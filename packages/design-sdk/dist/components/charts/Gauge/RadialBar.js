import { jsx as l } from "react/jsx-runtime";
import { forwardRef as A, useRef as C, useMemo as L } from "react";
import N from "react-apexcharts";
import { Chart as T } from "../Chart/Chart.js";
import { useFaclonApexTheme as g } from "../Chart/apexchartsTheme.js";
/* empty css              */
const j = A(
  ({
    series: e,
    labels: i,
    showLabels: t = !0,
    apexOptions: p,
    ...x
  }, v) => {
    const a = g(), d = C(0);
    d.current = e.reduce((r, o) => r + o, 0);
    const F = L(
      () => {
        var r, o, n, m, s, c, f, h, u, B, O, R, y, b;
        return {
          ...a,
          chart: {
            ...a.chart,
            type: "radialBar"
          },
          plotOptions: {
            ...a.plotOptions,
            radialBar: {
              ...(r = a.plotOptions) == null ? void 0 : r.radialBar,
              dataLabels: {
                ...(n = (o = a.plotOptions) == null ? void 0 : o.radialBar) == null ? void 0 : n.dataLabels,
                name: {
                  ...(c = (s = (m = a.plotOptions) == null ? void 0 : m.radialBar) == null ? void 0 : s.dataLabels) == null ? void 0 : c.name,
                  show: t
                },
                value: {
                  ...(u = (h = (f = a.plotOptions) == null ? void 0 : f.radialBar) == null ? void 0 : h.dataLabels) == null ? void 0 : u.value,
                  show: t
                },
                total: {
                  show: t,
                  label: "Total",
                  color: (y = (R = (O = (B = a.plotOptions) == null ? void 0 : B.radialBar) == null ? void 0 : O.dataLabels) == null ? void 0 : R.name) == null ? void 0 : y.color,
                  fontFamily: (b = a.chart) == null ? void 0 : b.fontFamily,
                  fontSize: "14px",
                  formatter: () => `${d.current}`
                }
              }
            }
          },
          labels: i ?? [],
          ...p
        };
      },
      [a, i, t, p]
    );
    return /* @__PURE__ */ l(T, { ref: v, ...x, children: /* @__PURE__ */ l("div", { className: "fds-radial-bar", children: /* @__PURE__ */ l(
      N,
      {
        type: "radialBar",
        series: e,
        options: F,
        height: 367
      }
    ) }) });
  }
);
j.displayName = "RadialBar";
export {
  j as RadialBar
};
