import { jsxs as v, jsx as l } from "react/jsx-runtime";
import { forwardRef as q, useMemo as w } from "react";
import k from "highcharts";
import P from "highcharts-react-official";
import { Chart as E } from "../Chart/Chart.js";
import { useFaclonChartTheme as G, readCssVar as W } from "../Chart/highchartsTheme.js";
/* empty css              */
const J = P.default ?? P, K = q(
  ({
    series: s,
    categories: p,
    smooth: C = !1,
    showMarkers: c,
    showLegend: d = !0,
    showDataLabels: m = !1,
    onPointClick: h,
    colors: f,
    xAxisTitle: x,
    yAxisTitle: u,
    yAxisUnit: g,
    plotLines: o,
    plotBands: i,
    zoomable: I = !0,
    scrollable: n = !1,
    scrollableMinWidth: N,
    highchartsOptions: y,
    ...F
  }, V) => {
    const r = G(), $ = w(() => {
      var S, H, j;
      const t = C ? "spline" : "line", b = s.map((e) => ({
        type: t,
        name: e.name,
        data: e.data,
        color: e.color,
        ...c !== void 0 && { marker: { enabled: c } }
      })), a = i == null ? void 0 : i.map((e) => ({
        from: e.from,
        to: e.to,
        color: e.color ?? "rgba(239,68,68,0.1)",
        zIndex: e.zIndex ?? 0,
        ...e.label && {
          label: { text: e.label, align: e.labelAlign ?? "right" }
        }
      })), z = o == null ? void 0 : o.map((e) => ({
        value: e.value,
        color: (e.color ?? W("--border-error-default")) || "#ef4444",
        width: e.width ?? 2,
        dashStyle: e.dashStyle ?? "Dash",
        zIndex: e.zIndex ?? 5,
        ...e.label && {
          label: {
            text: e.label,
            align: e.labelAlign ?? "right",
            style: { color: (e.color ?? W("--border-error-default")) || "#ef4444" }
          }
        }
      })), A = h ? {
        cursor: "pointer",
        point: {
          events: {
            click() {
              h({
                category: String(this.category ?? ""),
                seriesName: this.series.name,
                value: this.y ?? null,
                pointIndex: this.index,
                seriesIndex: this.series.index
              });
            }
          }
        }
      } : {}, R = {
        ...r,
        ...f && { colors: f },
        chart: {
          ...r.chart,
          type: t,
          ...I && { zooming: { type: "x", singleTouch: !0, mouseWheel: { enabled: !0 } } },
          ...n && { scrollablePlotArea: { minWidth: N ?? 800, opacity: 1 } }
        },
        xAxis: {
          ...r.xAxis,
          categories: p,
          ...x !== void 0 && { title: { ...(S = r.xAxis) == null ? void 0 : S.title, text: x } }
        },
        yAxis: {
          ...r.yAxis,
          ...u !== void 0 && { title: { ...(H = r.yAxis) == null ? void 0 : H.title, text: u } },
          ...g && { labels: { ...(j = r.yAxis) == null ? void 0 : j.labels, format: `{value} ${g}` } },
          ...z && { plotLines: z },
          ...a && { plotBands: a }
        },
        plotOptions: {
          line: {
            dataLabels: { enabled: m },
            ...A
          },
          spline: {
            dataLabels: { enabled: m },
            ...A
          }
        },
        legend: {
          ...r.legend,
          enabled: n ? !1 : d
        },
        series: b
      };
      return y ? k.merge(R, y) : R;
    }, [r, s, p, C, c, d, m, I, n, N, h, f, x, u, g, o, i, y]), _ = r.colors ?? [];
    return /* @__PURE__ */ v(E, { ref: V, ...F, children: [
      /* @__PURE__ */ l(
        J,
        {
          highcharts: k,
          options: $,
          containerProps: { className: "fds-line-chart" }
        }
      ),
      n && d && /* @__PURE__ */ l("div", { className: "fds-chart__scrollable-legend", children: s.map((t, b) => {
        const a = t.color ?? _[b % _.length];
        return /* @__PURE__ */ v("span", { className: "fds-chart__scrollable-legend-item", children: [
          /* @__PURE__ */ v("svg", { width: "16", height: "12", viewBox: "0 0 16 12", "aria-hidden": "true", style: { flexShrink: 0 }, children: [
            /* @__PURE__ */ l("line", { x1: "0", y1: "6", x2: "16", y2: "6", stroke: a, strokeWidth: "2" }),
            /* @__PURE__ */ l("circle", { cx: "8", cy: "6", r: "3", fill: a })
          ] }),
          /* @__PURE__ */ l("span", { className: "fds-chart__scrollable-legend-label", children: t.name })
        ] }, t.name);
      }) })
    ] });
  }
);
K.displayName = "LineChart";
export {
  K as LineChart
};
