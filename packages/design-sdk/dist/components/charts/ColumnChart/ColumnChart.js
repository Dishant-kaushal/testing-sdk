import { jsx as I } from "react/jsx-runtime";
import { forwardRef as j, useMemo as F } from "react";
import z from "highcharts";
import R from "highcharts-react-official";
import { Chart as M } from "../Chart/Chart.js";
import { useFaclonChartTheme as P, readCssVar as A } from "../Chart/highchartsTheme.js";
/* empty css                */
const V = R.default ?? R, $ = j(
  ({
    series: s,
    categories: d,
    stacked: h = !1,
    showLegend: u = !0,
    showDataLabels: f = !1,
    onPointClick: o,
    colors: l,
    xAxisTitle: m,
    yAxisTitle: n,
    yAxisUnit: c,
    plotLines: t,
    plotBands: a,
    highchartsOptions: i,
    ...H
  }, N) => {
    const r = P(), S = F(() => {
      var b, v, C;
      const w = s.map((e) => ({
        type: "column",
        name: e.name,
        data: e.data,
        color: e.color
      })), g = a == null ? void 0 : a.map((e) => ({
        from: e.from,
        to: e.to,
        color: e.color ?? "rgba(239,68,68,0.1)",
        zIndex: e.zIndex ?? 0,
        ...e.label && {
          label: {
            text: e.label,
            align: e.labelAlign ?? "right"
          }
        }
      })), x = t == null ? void 0 : t.map((e) => ({
        value: e.value,
        color: (e.color ?? A("--border-error-default")) || "#ef4444",
        width: e.width ?? 2,
        dashStyle: e.dashStyle ?? "Dash",
        zIndex: e.zIndex ?? 5,
        ...e.label && {
          label: {
            text: e.label,
            align: e.labelAlign ?? "right",
            style: { color: (e.color ?? A("--border-error-default")) || "#ef4444" }
          }
        }
      })), y = {
        ...r,
        ...l && { colors: l },
        chart: {
          ...r.chart,
          type: "column",
          zooming: { type: "x", singleTouch: !0 }
        },
        xAxis: {
          ...r.xAxis,
          categories: d,
          ...m !== void 0 && { title: { ...(b = r.xAxis) == null ? void 0 : b.title, text: m } }
        },
        yAxis: {
          ...r.yAxis,
          ...n !== void 0 && { title: { ...(v = r.yAxis) == null ? void 0 : v.title, text: n } },
          ...c && { labels: { ...(C = r.yAxis) == null ? void 0 : C.labels, format: `{value} ${c}` } },
          ...x && { plotLines: x },
          ...g && { plotBands: g }
        },
        plotOptions: {
          column: {
            stacking: h ? "normal" : void 0,
            dataLabels: { enabled: f },
            ...o && {
              cursor: "pointer",
              point: {
                events: {
                  click() {
                    o({
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
          enabled: u
        },
        series: w
      };
      return i ? z.merge(y, i) : y;
    }, [r, s, d, h, u, f, o, l, m, n, c, t, a, i]);
    return /* @__PURE__ */ I(M, { ref: N, ...H, children: /* @__PURE__ */ I(
      V,
      {
        highcharts: z,
        options: S,
        containerProps: { className: "fds-column-chart" }
      }
    ) });
  }
);
$.displayName = "ColumnChart";
export {
  $ as ColumnChart
};
