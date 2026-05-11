import { jsx as z } from "react/jsx-runtime";
import { forwardRef as F, useMemo as M } from "react";
import R from "highcharts";
import A from "highcharts-react-official";
import { Chart as P } from "../Chart/Chart.js";
import { useFaclonChartTheme as V, readCssVar as H } from "../Chart/highchartsTheme.js";
/* empty css                */
const $ = A.default ?? A, q = F(
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
    zoomable: g = !0,
    highchartsOptions: i,
    ...N
  }, S) => {
    const r = V(), w = M(() => {
      var v, C, I;
      const j = s.map((e) => ({
        type: "column",
        name: e.name,
        data: e.data,
        color: e.color
      })), x = a == null ? void 0 : a.map((e) => ({
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
      })), y = t == null ? void 0 : t.map((e) => ({
        value: e.value,
        color: (e.color ?? H("--border-error-default")) || "#ef4444",
        width: e.width ?? 2,
        dashStyle: e.dashStyle ?? "Dash",
        zIndex: e.zIndex ?? 5,
        ...e.label && {
          label: {
            text: e.label,
            align: e.labelAlign ?? "right",
            style: { color: (e.color ?? H("--border-error-default")) || "#ef4444" }
          }
        }
      })), b = {
        ...r,
        ...l && { colors: l },
        chart: {
          ...r.chart,
          type: "column",
          ...g && { zooming: { type: "x", singleTouch: !0 } }
        },
        xAxis: {
          ...r.xAxis,
          categories: d,
          ...m !== void 0 && { title: { ...(v = r.xAxis) == null ? void 0 : v.title, text: m } }
        },
        yAxis: {
          ...r.yAxis,
          ...n !== void 0 && { title: { ...(C = r.yAxis) == null ? void 0 : C.title, text: n } },
          ...c && { labels: { ...(I = r.yAxis) == null ? void 0 : I.labels, format: `{value} ${c}` } },
          ...y && { plotLines: y },
          ...x && { plotBands: x }
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
        series: j
      };
      return i ? R.merge(b, i) : b;
    }, [r, s, d, h, u, f, g, o, l, m, n, c, t, a, i]);
    return /* @__PURE__ */ z(P, { ref: S, ...N, children: /* @__PURE__ */ z(
      $,
      {
        highcharts: R,
        options: w,
        containerProps: { className: "fds-column-chart" }
      }
    ) });
  }
);
q.displayName = "ColumnChart";
export {
  q as ColumnChart
};
