import { jsx as t } from "react/jsx-runtime";
import { forwardRef as O, useMemo as C } from "react";
import L from "react-apexcharts";
import { Chart as v } from "../Chart/Chart.js";
import { useFaclonApexTheme as w } from "../Chart/apexchartsTheme.js";
/* empty css                */
const x = O(
  ({
    value: u,
    label: r,
    hollowSize: e = "70%",
    apexOptions: o,
    ...f
  }, B) => {
    const a = w(), g = C(
      () => {
        var i, s, l, p, m, d, n, c, h;
        return {
          ...a,
          chart: {
            ...a.chart,
            type: "radialBar"
          },
          plotOptions: {
            ...a.plotOptions,
            radialBar: {
              ...(i = a.plotOptions) == null ? void 0 : i.radialBar,
              hollow: {
                size: e
              },
              dataLabels: {
                ...(l = (s = a.plotOptions) == null ? void 0 : s.radialBar) == null ? void 0 : l.dataLabels,
                name: {
                  ...(d = (m = (p = a.plotOptions) == null ? void 0 : p.radialBar) == null ? void 0 : m.dataLabels) == null ? void 0 : d.name,
                  show: !!r
                },
                value: {
                  ...(h = (c = (n = a.plotOptions) == null ? void 0 : n.radialBar) == null ? void 0 : c.dataLabels) == null ? void 0 : h.value,
                  show: !0
                }
              }
            }
          },
          labels: r ? [r] : [],
          ...o
        };
      },
      [a, r, e, o]
    );
    return /* @__PURE__ */ t(v, { ref: B, ...f, children: /* @__PURE__ */ t("div", { className: "fds-circle-gauge", children: /* @__PURE__ */ t(
      L,
      {
        type: "radialBar",
        series: [u],
        options: g,
        height: 367
      }
    ) }) });
  }
);
x.displayName = "CircleGauge";
export {
  x as CircleGauge
};
