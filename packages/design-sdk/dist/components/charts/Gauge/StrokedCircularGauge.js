import { jsx as a } from "react/jsx-runtime";
import { forwardRef as x, useMemo as C } from "react";
import A from "react-apexcharts";
import { Chart as B } from "../Chart/Chart.js";
import { useFaclonApexTheme as S } from "../Chart/apexchartsTheme.js";
/* empty css                         */
function f(o, e) {
  if (typeof window > "u") return `${e}px`;
  const r = getComputedStyle(document.documentElement).getPropertyValue(o).trim();
  return r ? `${r}px` : `${e}px`;
}
const k = x(
  ({
    value: o,
    label: e,
    apexOptions: r,
    ...u
  }, g) => {
    const t = S(), h = C(
      () => {
        var i, s, l, n, d, p, m, c;
        return {
          ...t,
          chart: {
            ...t.chart,
            type: "radialBar",
            offsetY: -10
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              dataLabels: {
                name: {
                  fontSize: f("--global-fz-16", 16),
                  color: (n = (l = (s = (i = t.plotOptions) == null ? void 0 : i.radialBar) == null ? void 0 : s.dataLabels) == null ? void 0 : l.name) == null ? void 0 : n.color,
                  offsetY: 120
                },
                value: {
                  offsetY: 76,
                  fontSize: f("--global-fz-24", 24),
                  color: (c = (m = (p = (d = t.plotOptions) == null ? void 0 : d.radialBar) == null ? void 0 : p.dataLabels) == null ? void 0 : m.value) == null ? void 0 : c.color,
                  formatter: (y) => `${y}%`
                }
              }
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              shadeIntensity: 0.15,
              inverseColors: !1,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 65, 91]
            }
          },
          stroke: {
            dashArray: 4
          },
          labels: e ? [e] : [],
          ...r
        };
      },
      [t, e, r]
    );
    return /* @__PURE__ */ a(B, { ref: g, ...u, children: /* @__PURE__ */ a("div", { className: "fds-stroked-circular-gauge", children: /* @__PURE__ */ a(
      A,
      {
        type: "radialBar",
        series: [o],
        options: h,
        height: 367
      }
    ) }) });
  }
);
k.displayName = "StrokedCircularGauge";
export {
  k as StrokedCircularGauge
};
