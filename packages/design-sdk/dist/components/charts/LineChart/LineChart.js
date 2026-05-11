import { jsx as A } from "react/jsx-runtime";
import { forwardRef as $, useMemo as q } from "react";
import H from "highcharts";
import N from "highcharts-react-official";
import { Chart as E } from "../Chart/Chart.js";
import { useFaclonChartTheme as G, readCssVar as S } from "../Chart/highchartsTheme.js";
/* empty css              */
const J = N.default ?? N, K = $(
  ({
    series: h,
    categories: f,
    smooth: u = !1,
    showMarkers: o,
    showLegend: x = !0,
    showDataLabels: l = !1,
    onPointClick: i,
    colors: n,
    xAxisTitle: s,
    yAxisTitle: c,
    yAxisUnit: d,
    plotLines: r,
    plotBands: a,
    zoomable: g = !0,
    highchartsOptions: m,
    ...j
  }, F) => {
    const t = G(), P = q(() => {
      var p, z, R;
      const y = u ? "spline" : "line", V = h.map((e) => ({
        type: y,
        name: e.name,
        data: e.data,
        color: e.color,
        ...o !== void 0 && { marker: { enabled: o } }
      })), b = a == null ? void 0 : a.map((e) => ({
        from: e.from,
        to: e.to,
        color: e.color ?? "rgba(239,68,68,0.1)",
        zIndex: e.zIndex ?? 0,
        ...e.label && {
          label: { text: e.label, align: e.labelAlign ?? "right" }
        }
      })), v = r == null ? void 0 : r.map((e) => ({
        value: e.value,
        color: (e.color ?? S("--border-error-default")) || "#ef4444",
        width: e.width ?? 2,
        dashStyle: e.dashStyle ?? "Dash",
        zIndex: e.zIndex ?? 5,
        ...e.label && {
          label: {
            text: e.label,
            align: e.labelAlign ?? "right",
            style: { color: (e.color ?? S("--border-error-default")) || "#ef4444" }
          }
        }
      })), I = i ? {
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
        ...t,
        ...n && { colors: n },
        chart: {
          ...t.chart,
          type: y,
          ...g && { zooming: { type: "x", singleTouch: !0 } }
        },
        xAxis: {
          ...t.xAxis,
          categories: f,
          ...s !== void 0 && { title: { ...(p = t.xAxis) == null ? void 0 : p.title, text: s } }
        },
        yAxis: {
          ...t.yAxis,
          ...c !== void 0 && { title: { ...(z = t.yAxis) == null ? void 0 : z.title, text: c } },
          ...d && { labels: { ...(R = t.yAxis) == null ? void 0 : R.labels, format: `{value} ${d}` } },
          ...v && { plotLines: v },
          ...b && { plotBands: b }
        },
        plotOptions: {
          line: {
            dataLabels: { enabled: l },
            ...I
          },
          spline: {
            dataLabels: { enabled: l },
            ...I
          }
        },
        legend: {
          ...t.legend,
          enabled: x
        },
        series: V
      };
      return m ? H.merge(C, m) : C;
    }, [t, h, f, u, o, x, l, g, i, n, s, c, d, r, a, m]);
    return /* @__PURE__ */ A(E, { ref: F, ...j, children: /* @__PURE__ */ A(
      J,
      {
        highcharts: H,
        options: P,
        containerProps: { className: "fds-line-chart" }
      }
    ) });
  }
);
K.displayName = "LineChart";
export {
  K as LineChart
};
