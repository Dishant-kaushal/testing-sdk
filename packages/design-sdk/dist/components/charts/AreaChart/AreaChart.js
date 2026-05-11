import { jsx as S } from "react/jsx-runtime";
import { forwardRef as E, useMemo as G } from "react";
import j from "highcharts";
import F from "highcharts-react-official";
import { Chart as J } from "../Chart/Chart.js";
import { useFaclonChartTheme as K, readCssVar as P } from "../Chart/highchartsTheme.js";
/* empty css              */
const M = F.default ?? F, O = E(
  ({
    series: f,
    categories: h,
    stacked: g = !1,
    percentStacked: u = !1,
    smooth: x = !1,
    showMarkers: o,
    showLegend: y = !0,
    showDataLabels: l = !1,
    onPointClick: i,
    colors: n,
    xAxisTitle: s,
    yAxisTitle: c,
    yAxisUnit: d,
    plotLines: a,
    plotBands: t,
    zoomable: b = !0,
    highchartsOptions: m,
    ...V
  }, $) => {
    const r = K(), k = G(() => {
      var R, H, N;
      const v = x ? "areaspline" : "area", I = u ? "percent" : g ? "normal" : void 0, q = f.map((e) => ({
        type: v,
        name: e.name,
        data: e.data,
        color: e.color,
        ...o !== void 0 && { marker: { enabled: o } }
      })), A = t == null ? void 0 : t.map((e) => ({
        from: e.from,
        to: e.to,
        color: e.color ?? "rgba(239,68,68,0.1)",
        zIndex: e.zIndex ?? 0,
        ...e.label && {
          label: { text: e.label, align: e.labelAlign ?? "right" }
        }
      })), C = a == null ? void 0 : a.map((e) => ({
        value: e.value,
        color: (e.color ?? P("--border-error-default")) || "#ef4444",
        width: e.width ?? 2,
        dashStyle: e.dashStyle ?? "Dash",
        zIndex: e.zIndex ?? 5,
        ...e.label && {
          label: {
            text: e.label,
            align: e.labelAlign ?? "right",
            style: { color: (e.color ?? P("--border-error-default")) || "#ef4444" }
          }
        }
      })), p = i ? {
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
      } : {}, z = {
        ...r,
        ...n && { colors: n },
        chart: {
          ...r.chart,
          type: v,
          ...b && { zooming: { type: "x", singleTouch: !0 } }
        },
        xAxis: {
          ...r.xAxis,
          categories: h,
          ...s !== void 0 && { title: { ...(R = r.xAxis) == null ? void 0 : R.title, text: s } }
        },
        yAxis: {
          ...r.yAxis,
          ...c !== void 0 && { title: { ...(H = r.yAxis) == null ? void 0 : H.title, text: c } },
          ...d && { labels: { ...(N = r.yAxis) == null ? void 0 : N.labels, format: `{value} ${d}` } },
          ...C && { plotLines: C },
          ...A && { plotBands: A }
        },
        plotOptions: {
          area: {
            stacking: I,
            dataLabels: { enabled: l },
            ...p
          },
          areaspline: {
            stacking: I,
            dataLabels: { enabled: l },
            ...p
          }
        },
        legend: {
          ...r.legend,
          enabled: y
        },
        series: q
      };
      return m ? j.merge(z, m) : z;
    }, [r, f, h, g, u, x, o, y, l, b, i, n, s, c, d, a, t, m]);
    return /* @__PURE__ */ S(J, { ref: $, ...V, children: /* @__PURE__ */ S(
      M,
      {
        highcharts: j,
        options: k,
        containerProps: { className: "fds-area-chart" }
      }
    ) });
  }
);
O.displayName = "AreaChart";
export {
  O as AreaChart
};
