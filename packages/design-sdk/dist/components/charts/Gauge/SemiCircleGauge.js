import { jsx as e } from "react/jsx-runtime";
import { forwardRef as O, useMemo as C } from "react";
import L from "react-apexcharts";
import { Chart as b } from "../Chart/Chart.js";
import { useFaclonApexTheme as k } from "../Chart/apexchartsTheme.js";
/* empty css                    */
const v = O(
  ({
    value: g,
    label: r,
    apexOptions: t,
    ...u
  }, B) => {
    const a = k(), A = C(
      () => {
        var o, i, s, l, p, n, d, m, c, f, h;
        return {
          ...a,
          chart: {
            ...a.chart,
            type: "radialBar",
            sparkline: { enabled: !0 }
          },
          plotOptions: {
            ...a.plotOptions,
            radialBar: {
              ...(o = a.plotOptions) == null ? void 0 : o.radialBar,
              startAngle: -90,
              endAngle: 90,
              track: {
                ...(s = (i = a.plotOptions) == null ? void 0 : i.radialBar) == null ? void 0 : s.track,
                startAngle: -90,
                endAngle: 90
              },
              dataLabels: {
                ...(p = (l = a.plotOptions) == null ? void 0 : l.radialBar) == null ? void 0 : p.dataLabels,
                name: {
                  ...(m = (d = (n = a.plotOptions) == null ? void 0 : n.radialBar) == null ? void 0 : d.dataLabels) == null ? void 0 : m.name,
                  show: !!r,
                  offsetY: 20
                },
                value: {
                  ...(h = (f = (c = a.plotOptions) == null ? void 0 : c.radialBar) == null ? void 0 : f.dataLabels) == null ? void 0 : h.value,
                  show: !0,
                  offsetY: -20
                }
              }
            }
          },
          grid: { padding: { top: -10 } },
          labels: r ? [r] : [],
          ...t
        };
      },
      [a, r, t]
    );
    return /* @__PURE__ */ e(b, { ref: B, ...u, children: /* @__PURE__ */ e("div", { className: "fds-semi-circle-gauge", children: /* @__PURE__ */ e(
      L,
      {
        type: "radialBar",
        series: [g],
        options: A,
        height: 367
      }
    ) }) });
  }
);
v.displayName = "SemiCircleGauge";
export {
  v as SemiCircleGauge
};
