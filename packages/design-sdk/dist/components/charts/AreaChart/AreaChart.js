import { jsxs as k, jsx as n } from "react/jsx-runtime";
import { forwardRef as J, useMemo as K } from "react";
import F from "highcharts";
import V from "highcharts-react-official";
import { Chart as O } from "../Chart/Chart.js";
import { useFaclonChartTheme as Q, readCssVar as W } from "../Chart/highchartsTheme.js";
/* empty css              */
const X = V.default ?? V, Y = J(
  ({
    series: c,
    categories: y,
    stacked: v = !1,
    percentStacked: p = !1,
    smooth: _ = !1,
    showMarkers: i,
    showLegend: d = !0,
    showDataLabels: m = !1,
    onPointClick: h,
    colors: f,
    xAxisTitle: g,
    yAxisTitle: u,
    yAxisUnit: x,
    plotLines: t,
    plotBands: l,
    zoomable: C = !0,
    scrollable: o = !1,
    scrollableMinWidth: N,
    highchartsOptions: b,
    ...$
  }, q) => {
    const a = Q(), E = K(() => {
      var j, P, S;
      const r = _ ? "areaspline" : "area", s = p ? "percent" : v ? "normal" : void 0, G = c.map((e) => ({
        type: r,
        name: e.name,
        data: e.data,
        color: e.color,
        ...i !== void 0 && { marker: { enabled: i } }
      })), I = l == null ? void 0 : l.map((e) => ({
        from: e.from,
        to: e.to,
        color: e.color ?? "rgba(239,68,68,0.1)",
        zIndex: e.zIndex ?? 0,
        ...e.label && {
          label: { text: e.label, align: e.labelAlign ?? "right" }
        }
      })), z = t == null ? void 0 : t.map((e) => ({
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
      })), R = h ? {
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
      } : {}, H = {
        ...a,
        ...f && { colors: f },
        chart: {
          ...a.chart,
          type: r,
          ...C && { zooming: { type: "x", singleTouch: !0, mouseWheel: { enabled: !0 } } },
          ...o && { scrollablePlotArea: { minWidth: N ?? 800, opacity: 1 } }
        },
        xAxis: {
          ...a.xAxis,
          categories: y,
          ...g !== void 0 && { title: { ...(j = a.xAxis) == null ? void 0 : j.title, text: g } }
        },
        yAxis: {
          ...a.yAxis,
          ...u !== void 0 && { title: { ...(P = a.yAxis) == null ? void 0 : P.title, text: u } },
          ...x && { labels: { ...(S = a.yAxis) == null ? void 0 : S.labels, format: `{value} ${x}` } },
          ...z && { plotLines: z },
          ...I && { plotBands: I }
        },
        plotOptions: {
          area: {
            stacking: s,
            dataLabels: { enabled: m },
            ...R
          },
          areaspline: {
            stacking: s,
            dataLabels: { enabled: m },
            ...R
          }
        },
        legend: {
          ...a.legend,
          enabled: o ? !1 : d
        },
        series: G
      };
      return b ? F.merge(H, b) : H;
    }, [a, c, y, v, p, _, i, d, m, C, o, N, h, f, g, u, x, t, l, b]), A = a.colors ?? [];
    return /* @__PURE__ */ k(O, { ref: q, ...$, children: [
      /* @__PURE__ */ n(
        X,
        {
          highcharts: F,
          options: E,
          containerProps: { className: "fds-area-chart" }
        }
      ),
      o && d && /* @__PURE__ */ n("div", { className: "fds-chart__scrollable-legend", children: c.map((r, s) => /* @__PURE__ */ k("span", { className: "fds-chart__scrollable-legend-item", children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "fds-chart__scrollable-legend-symbol",
            style: { backgroundColor: r.color ?? A[s % A.length] }
          }
        ),
        /* @__PURE__ */ n("span", { className: "fds-chart__scrollable-legend-label", children: r.name })
      ] }, r.name)) })
    ] });
  }
);
Y.displayName = "AreaChart";
export {
  Y as AreaChart
};
