import { jsx as N } from "react/jsx-runtime";
import { forwardRef as q, useMemo as E } from "react";
import S from "highcharts";
import j from "highcharts-react-official";
import { Chart as G } from "../Chart/Chart.js";
import { useFaclonChartTheme as J, readCssVar as F } from "../Chart/highchartsTheme.js";
/* empty css              */
const K = j.default ?? j, M = q(
  ({
    series: f,
    categories: h,
    stacked: g = !1,
    percentStacked: u = !1,
    smooth: x = !1,
    showMarkers: o,
    showLegend: b = !0,
    showDataLabels: l = !1,
    onPointClick: i,
    colors: n,
    xAxisTitle: s,
    yAxisTitle: c,
    yAxisUnit: d,
    plotLines: a,
    plotBands: t,
    highchartsOptions: m,
    ...P
  }, V) => {
    const r = J(), $ = E(() => {
      var p, R, H;
      const y = x ? "areaspline" : "area", v = u ? "percent" : g ? "normal" : void 0, k = f.map((e) => ({
        type: y,
        name: e.name,
        data: e.data,
        color: e.color,
        ...o !== void 0 && { marker: { enabled: o } }
      })), I = t == null ? void 0 : t.map((e) => ({
        from: e.from,
        to: e.to,
        color: e.color ?? "rgba(239,68,68,0.1)",
        zIndex: e.zIndex ?? 0,
        ...e.label && {
          label: { text: e.label, align: e.labelAlign ?? "right" }
        }
      })), z = a == null ? void 0 : a.map((e) => ({
        value: e.value,
        color: (e.color ?? F("--border-error-default")) || "#ef4444",
        width: e.width ?? 2,
        dashStyle: e.dashStyle ?? "Dash",
        zIndex: e.zIndex ?? 5,
        ...e.label && {
          label: {
            text: e.label,
            align: e.labelAlign ?? "right",
            style: { color: (e.color ?? F("--border-error-default")) || "#ef4444" }
          }
        }
      })), A = i ? {
        cursor: "pointer",
        point: {
          events: {
            click() {
              i({
                category: String(this.category ?? ""),
                seriesName: this.series.name,
                value: this.y ?? null,
                pointIndex: this.index,
                seriesIndex: this.series.index
              });
            }
          }
        }
      } : {}, C = {
        ...r,
        ...n && { colors: n },
        chart: {
          ...r.chart,
          type: y,
          zooming: { type: "x", singleTouch: !0 }
        },
        xAxis: {
          ...r.xAxis,
          categories: h,
          ...s !== void 0 && { title: { ...(p = r.xAxis) == null ? void 0 : p.title, text: s } }
        },
        yAxis: {
          ...r.yAxis,
          ...c !== void 0 && { title: { ...(R = r.yAxis) == null ? void 0 : R.title, text: c } },
          ...d && { labels: { ...(H = r.yAxis) == null ? void 0 : H.labels, format: `{value} ${d}` } },
          ...z && { plotLines: z },
          ...I && { plotBands: I }
        },
        plotOptions: {
          area: {
            stacking: v,
            dataLabels: { enabled: l },
            ...A
          },
          areaspline: {
            stacking: v,
            dataLabels: { enabled: l },
            ...A
          }
        },
        legend: {
          ...r.legend,
          enabled: b
        },
        series: k
      };
      return m ? S.merge(C, m) : C;
    }, [r, f, h, g, u, x, o, b, l, i, n, s, c, d, a, t, m]);
    return /* @__PURE__ */ N(G, { ref: V, ...P, children: /* @__PURE__ */ N(
      K,
      {
        highcharts: S,
        options: $,
        containerProps: { className: "fds-area-chart" }
      }
    ) });
  }
);
M.displayName = "AreaChart";
export {
  M as AreaChart
};
