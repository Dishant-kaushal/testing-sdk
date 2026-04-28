import { jsx as d } from "react/jsx-runtime";
import { forwardRef as g, useMemo as y } from "react";
import v from "highcharts";
import I from "highcharts-react-official";
import { Chart as N } from "../Chart/Chart.js";
import { useFaclonChartTheme as b } from "../Chart/highchartsTheme.js";
/* empty css              */
const A = g(
  ({
    series: n,
    categories: a,
    smooth: o = !1,
    showMarkers: t,
    showLegend: m = !0,
    showDataLabels: i = !1,
    scrollable: l = !1,
    scrollableMinWidth: p = 900,
    onPointClick: e,
    ...h
  }, x) => {
    const r = b(), f = y(() => {
      const c = o ? "spline" : "line", u = n.map((s) => ({
        type: c,
        name: s.name,
        data: s.data,
        color: s.color,
        ...t !== void 0 && { marker: { enabled: t } }
      }));
      return {
        ...r,
        chart: {
          ...r.chart,
          type: c,
          ...l && {
            scrollablePlotArea: { minWidth: p, scrollPositionX: 0 }
          }
        },
        xAxis: {
          ...r.xAxis,
          categories: a
        },
        plotOptions: {
          line: {
            dataLabels: { enabled: i },
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
          },
          spline: {
            dataLabels: { enabled: i },
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
          enabled: m
        },
        series: u
      };
    }, [r, n, a, o, t, m, i, l, p, e]);
    return /* @__PURE__ */ d(N, { ref: x, ...h, children: /* @__PURE__ */ d(
      I,
      {
        highcharts: v,
        options: f,
        containerProps: { className: "fds-line-chart" }
      }
    ) });
  }
);
A.displayName = "LineChart";
export {
  A as LineChart
};
