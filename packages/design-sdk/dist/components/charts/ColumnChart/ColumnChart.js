import { jsx as l } from "react/jsx-runtime";
import { forwardRef as f, useMemo as x } from "react";
import g from "highcharts";
import y from "highcharts-react-official";
import { Chart as C } from "../Chart/Chart.js";
import { useFaclonChartTheme as v } from "../Chart/highchartsTheme.js";
/* empty css                */
const A = f(
  ({
    series: o,
    categories: a,
    stacked: s = !1,
    showLegend: i = !0,
    showDataLabels: n = !1,
    scrollable: m = !1,
    scrollableMinWidth: c = 900,
    onPointClick: r,
    ...h
  }, p) => {
    const e = v(), d = x(() => {
      const u = o.map((t) => ({
        type: "column",
        name: t.name,
        data: t.data,
        color: t.color
      }));
      return {
        ...e,
        chart: {
          ...e.chart,
          type: "column",
          ...m && {
            scrollablePlotArea: { minWidth: c, scrollPositionX: 0 }
          }
        },
        xAxis: {
          ...e.xAxis,
          categories: a
        },
        plotOptions: {
          column: {
            stacking: s ? "normal" : void 0,
            dataLabels: { enabled: n },
            ...r && {
              cursor: "pointer",
              point: {
                events: {
                  click() {
                    r({
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
          ...e.legend,
          enabled: i
        },
        series: u
      };
    }, [e, o, a, s, i, n, m, c, r]);
    return /* @__PURE__ */ l(C, { ref: p, ...h, children: /* @__PURE__ */ l(
      y,
      {
        highcharts: g,
        options: d,
        containerProps: { className: "fds-column-chart" }
      }
    ) });
  }
);
A.displayName = "ColumnChart";
export {
  A as ColumnChart
};
