import { jsx as P } from "react/jsx-runtime";
import { forwardRef as X, useMemo as $ } from "react";
import S from "highcharts";
import q from "highcharts-react-official";
import { Chart as E } from "../Chart/Chart.js";
import { useFaclonChartTheme as G, readCssVar as H } from "../Chart/highchartsTheme.js";
/* empty css              */
const J = X(
  ({
    series: f,
    categories: h,
    smooth: x = !1,
    showMarkers: o,
    showLegend: u = !0,
    showDataLabels: l = !1,
    scrollable: g = !1,
    scrollableMinWidth: b = 900,
    onPointClick: i,
    colors: n,
    xAxisTitle: s,
    yAxisTitle: d,
    yAxisUnit: m,
    plotLines: t,
    plotBands: a,
    highchartsOptions: c,
    ...R
  }, j) => {
    const r = G(), F = $(() => {
      var A, p, N;
      const y = x ? "spline" : "line", V = f.map((e) => ({
        type: y,
        name: e.name,
        data: e.data,
        color: e.color,
        ...o !== void 0 && { marker: { enabled: o } }
      })), v = a == null ? void 0 : a.map((e) => ({
        from: e.from,
        to: e.to,
        color: e.color ?? "rgba(239,68,68,0.1)",
        zIndex: e.zIndex ?? 0,
        ...e.label && {
          label: { text: e.label, align: e.labelAlign ?? "right" }
        }
      })), I = t == null ? void 0 : t.map((e) => ({
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
      })), C = i ? {
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
          type: y,
          ...g && {
            scrollablePlotArea: { minWidth: b, scrollPositionX: 0 }
          }
        },
        xAxis: {
          ...r.xAxis,
          categories: h,
          ...s !== void 0 && { title: { ...(A = r.xAxis) == null ? void 0 : A.title, text: s } }
        },
        yAxis: {
          ...r.yAxis,
          ...d !== void 0 && { title: { ...(p = r.yAxis) == null ? void 0 : p.title, text: d } },
          ...m && { labels: { ...(N = r.yAxis) == null ? void 0 : N.labels, format: `{value} ${m}` } },
          ...I && { plotLines: I },
          ...v && { plotBands: v }
        },
        plotOptions: {
          line: {
            dataLabels: { enabled: l },
            ...C
          },
          spline: {
            dataLabels: { enabled: l },
            ...C
          }
        },
        legend: {
          ...r.legend,
          enabled: u
        },
        series: V
      };
      return c ? S.merge(z, c) : z;
    }, [r, f, h, x, o, u, l, g, b, i, n, s, d, m, t, a, c]);
    return /* @__PURE__ */ P(E, { ref: j, ...R, children: /* @__PURE__ */ P(
      q,
      {
        highcharts: S,
        options: F,
        containerProps: { className: "fds-line-chart" }
      }
    ) });
  }
);
J.displayName = "LineChart";
export {
  J as LineChart
};
