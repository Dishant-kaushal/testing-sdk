import { jsxs as R, jsx as c } from "react/jsx-runtime";
import { forwardRef as V, useMemo as W } from "react";
import H from "highcharts";
import S from "highcharts-react-official";
import { Chart as $ } from "../Chart/Chart.js";
import { useFaclonChartTheme as k, readCssVar as j } from "../Chart/highchartsTheme.js";
/* empty css                */
const q = S.default ?? S, D = V(
  ({
    series: n,
    categories: x,
    stacked: b = !1,
    showLegend: m = !0,
    showDataLabels: y = !1,
    onPointClick: d,
    colors: i,
    xAxisTitle: h,
    yAxisTitle: u,
    yAxisUnit: f,
    plotLines: t,
    plotBands: l,
    zoomable: v = !0,
    scrollable: o = !1,
    scrollableMinWidth: C,
    highchartsOptions: g,
    ...P
  }, w) => {
    const r = k(), F = W(() => {
      var p, z, A;
      const a = n.map((e) => ({
        type: "column",
        name: e.name,
        data: e.data,
        color: e.color
      })), s = l == null ? void 0 : l.map((e) => ({
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
      })), N = t == null ? void 0 : t.map((e) => ({
        value: e.value,
        color: (e.color ?? j("--border-error-default")) || "#ef4444",
        width: e.width ?? 2,
        dashStyle: e.dashStyle ?? "Dash",
        zIndex: e.zIndex ?? 5,
        ...e.label && {
          label: {
            text: e.label,
            align: e.labelAlign ?? "right",
            style: { color: (e.color ?? j("--border-error-default")) || "#ef4444" }
          }
        }
      })), I = {
        ...r,
        ...i && { colors: i },
        chart: {
          ...r.chart,
          type: "column",
          ...v && { zooming: { type: "x", singleTouch: !0, mouseWheel: { enabled: !0 } } },
          ...o && { scrollablePlotArea: { minWidth: C ?? 800, opacity: 1 } }
        },
        xAxis: {
          ...r.xAxis,
          categories: x,
          ...h !== void 0 && { title: { ...(p = r.xAxis) == null ? void 0 : p.title, text: h } }
        },
        yAxis: {
          ...r.yAxis,
          ...u !== void 0 && { title: { ...(z = r.yAxis) == null ? void 0 : z.title, text: u } },
          ...f && { labels: { ...(A = r.yAxis) == null ? void 0 : A.labels, format: `{value} ${f}` } },
          ...N && { plotLines: N },
          ...s && { plotBands: s }
        },
        plotOptions: {
          column: {
            stacking: b ? "normal" : void 0,
            dataLabels: { enabled: y },
            ...d && {
              cursor: "pointer",
              point: {
                events: {
                  click() {
                    d({
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
          enabled: o ? !1 : m
        },
        series: a
      };
      return g ? H.merge(I, g) : I;
    }, [r, n, x, b, m, y, v, o, C, d, i, h, u, f, t, l, g]), _ = r.colors ?? [];
    return /* @__PURE__ */ R($, { ref: w, ...P, children: [
      /* @__PURE__ */ c(
        q,
        {
          highcharts: H,
          options: F,
          containerProps: { className: "fds-column-chart" }
        }
      ),
      o && m && /* @__PURE__ */ c("div", { className: "fds-chart__scrollable-legend", children: n.map((a, s) => /* @__PURE__ */ R("span", { className: "fds-chart__scrollable-legend-item", children: [
        /* @__PURE__ */ c(
          "span",
          {
            className: "fds-chart__scrollable-legend-symbol",
            style: { backgroundColor: a.color ?? _[s % _.length] }
          }
        ),
        /* @__PURE__ */ c("span", { className: "fds-chart__scrollable-legend-label", children: a.name })
      ] }, a.name)) })
    ] });
  }
);
D.displayName = "ColumnChart";
export {
  D as ColumnChart
};
