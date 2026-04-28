import { jsx as x } from "react/jsx-runtime";
import { forwardRef as A, useMemo as I } from "react";
import N from "highcharts";
import b from "highcharts-react-official";
import { Chart as H } from "../Chart/Chart.js";
import { useFaclonChartTheme as R } from "../Chart/highchartsTheme.js";
/* empty css              */
const T = A(
  ({
    series: i,
    categories: n,
    stacked: o = !1,
    percentStacked: m = !1,
    smooth: c = !1,
    showMarkers: t,
    showLegend: l = !0,
    showDataLabels: a = !1,
    scrollable: p = !1,
    scrollableMinWidth: d = 900,
    onPointClick: e,
    ...g
  }, u) => {
    const r = R(), y = I(() => {
      const h = c ? "areaspline" : "area", f = m ? "percent" : o ? "normal" : void 0, v = i.map((s) => ({
        type: h,
        name: s.name,
        data: s.data,
        color: s.color,
        ...t !== void 0 && { marker: { enabled: t } }
      }));
      return {
        ...r,
        chart: {
          ...r.chart,
          type: h,
          ...p && {
            scrollablePlotArea: { minWidth: d, scrollPositionX: 0 }
          }
        },
        xAxis: {
          ...r.xAxis,
          categories: n
        },
        plotOptions: {
          area: {
            stacking: f,
            dataLabels: { enabled: a },
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
          areaspline: {
            stacking: f,
            dataLabels: { enabled: a },
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
          enabled: l
        },
        series: v
      };
    }, [
      r,
      i,
      n,
      o,
      m,
      c,
      t,
      l,
      a,
      p,
      d,
      e
    ]);
    return /* @__PURE__ */ x(H, { ref: u, ...g, children: /* @__PURE__ */ x(
      b,
      {
        highcharts: N,
        options: y,
        containerProps: { className: "fds-area-chart" }
      }
    ) });
  }
);
T.displayName = "AreaChart";
export {
  T as AreaChart
};
