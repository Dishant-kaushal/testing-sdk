import { jsx as c } from "react/jsx-runtime";
import { forwardRef as x, useMemo as g } from "react";
import u from "highcharts";
import y from "highcharts-react-official";
import { Chart as b } from "../Chart/Chart.js";
import { useFaclonChartTheme as v } from "../Chart/highchartsTheme.js";
/* empty css             */
const A = x(
  ({
    series: a,
    categories: o,
    stacked: s = !1,
    showLegend: i = !0,
    showDataLabels: n = !1,
    scrollable: m = !1,
    scrollableMinHeight: h = 500,
    onPointClick: e,
    ...p
  }, l) => {
    const r = v(), d = g(() => {
      const f = a.map((t) => ({
        type: "bar",
        name: t.name,
        data: t.data,
        color: t.color
      }));
      return {
        ...r,
        chart: {
          ...r.chart,
          type: "bar",
          ...m && {
            scrollablePlotArea: { minHeight: h, scrollPositionY: 0 }
          }
        },
        xAxis: {
          ...r.xAxis,
          categories: o
        },
        plotOptions: {
          bar: {
            stacking: s ? "normal" : void 0,
            dataLabels: { enabled: n },
            ...e && {
              cursor: "pointer",
              point: {
                events: {
                  click() {
                    e({
                      category: String(this.category ?? ""),
                      seriesName: this.series.name,
                      value: this.y ?? null,
                      pointIndex: this.index,
                      seriesIndex: this.series.index
                    });
                  }
                }
              }
            }
          }
        },
        legend: {
          ...r.legend,
          enabled: i
        },
        series: f
      };
    }, [r, a, o, s, i, n, m, h, e]);
    return /* @__PURE__ */ c(b, { ref: l, ...p, children: /* @__PURE__ */ c(
      y,
      {
        highcharts: u,
        options: d,
        containerProps: { className: "fds-bar-chart" }
      }
    ) });
  }
);
A.displayName = "BarChart";
export {
  A as BarChart
};
