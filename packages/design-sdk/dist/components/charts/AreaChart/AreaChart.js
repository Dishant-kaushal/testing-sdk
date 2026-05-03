import { jsx as S } from "react/jsx-runtime";
import { forwardRef as q, useMemo as E } from "react";
import j from "highcharts";
import G from "highcharts-react-official";
import { Chart as J } from "../Chart/Chart.js";
import { useFaclonChartTheme as K, readCssVar as F } from "../Chart/highchartsTheme.js";
/* empty css              */
const O = q(
  ({
    series: f,
    categories: h,
    stacked: g = !1,
    percentStacked: x = !1,
    smooth: u = !1,
    showMarkers: o,
    showLegend: b = !0,
    showDataLabels: l = !1,
    scrollable: y = !1,
    scrollableMinWidth: v = 900,
    onPointClick: i,
    colors: n,
    xAxisTitle: s,
    yAxisTitle: c,
    yAxisUnit: m,
    plotLines: a,
    plotBands: t,
    highchartsOptions: d,
    ...V
  }, X) => {
    const r = K(), $ = E(() => {
      var P, H, R;
      const A = u ? "areaspline" : "area", I = x ? "percent" : g ? "normal" : void 0, k = f.map((e) => ({
        type: A,
        name: e.name,
        data: e.data,
        color: e.color,
        ...o !== void 0 && { marker: { enabled: o } }
      })), C = t == null ? void 0 : t.map((e) => ({
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
      } : {}, N = {
        ...r,
        ...n && { colors: n },
        chart: {
          ...r.chart,
          type: A,
          ...y && {
            scrollablePlotArea: { minWidth: v, scrollPositionX: 0 }
          }
        },
        xAxis: {
          ...r.xAxis,
          categories: h,
          ...s !== void 0 && { title: { ...(P = r.xAxis) == null ? void 0 : P.title, text: s } }
        },
        yAxis: {
          ...r.yAxis,
          ...c !== void 0 && { title: { ...(H = r.yAxis) == null ? void 0 : H.title, text: c } },
          ...m && { labels: { ...(R = r.yAxis) == null ? void 0 : R.labels, format: `{value} ${m}` } },
          ...z && { plotLines: z },
          ...C && { plotBands: C }
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
          enabled: b
        },
        series: k
      };
      return d ? j.merge(N, d) : N;
    }, [r, f, h, g, x, u, o, b, l, y, v, i, n, s, c, m, a, t, d]);
    return /* @__PURE__ */ S(J, { ref: X, ...V, children: /* @__PURE__ */ S(
      G,
      {
        highcharts: j,
        options: $,
        containerProps: { className: "fds-area-chart" }
      }
    ) });
  }
);
O.displayName = "AreaChart";
export {
  O as AreaChart
};
