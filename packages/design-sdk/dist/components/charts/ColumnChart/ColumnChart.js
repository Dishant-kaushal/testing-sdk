import { jsx as A } from "react/jsx-runtime";
import { forwardRef as w, useMemo as F } from "react";
import N from "highcharts";
import V from "highcharts-react-official";
import { Chart as X } from "../Chart/Chart.js";
import { useFaclonChartTheme as $, readCssVar as P } from "../Chart/highchartsTheme.js";
/* empty css                */
const q = w(
  ({
    series: c,
    categories: d,
    stacked: h = !1,
    showLegend: f = !0,
    showDataLabels: u = !1,
    scrollable: x = !1,
    scrollableMinWidth: g = 900,
    onPointClick: a,
    colors: l,
    xAxisTitle: m,
    yAxisTitle: n,
    yAxisUnit: i,
    plotLines: t,
    plotBands: o,
    highchartsOptions: s,
    ...S
  }, H) => {
    const r = $(), R = F(() => {
      var C, I, z;
      const j = c.map((e) => ({
        type: "column",
        name: e.name,
        data: e.data,
        color: e.color
      })), y = o == null ? void 0 : o.map((e) => ({
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
      })), b = t == null ? void 0 : t.map((e) => ({
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
      })), v = {
        ...r,
        ...l && { colors: l },
        chart: {
          ...r.chart,
          type: "column",
          ...x && {
            scrollablePlotArea: { minWidth: g, scrollPositionX: 0 }
          }
        },
        xAxis: {
          ...r.xAxis,
          categories: d,
          ...m !== void 0 && { title: { ...(C = r.xAxis) == null ? void 0 : C.title, text: m } }
        },
        yAxis: {
          ...r.yAxis,
          ...n !== void 0 && { title: { ...(I = r.yAxis) == null ? void 0 : I.title, text: n } },
          ...i && { labels: { ...(z = r.yAxis) == null ? void 0 : z.labels, format: `{value} ${i}` } },
          ...b && { plotLines: b },
          ...y && { plotBands: y }
        },
        plotOptions: {
          column: {
            stacking: h ? "normal" : void 0,
            dataLabels: { enabled: u },
            ...a && {
              cursor: "pointer",
              point: {
                events: {
                  click() {
                    a({
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
          enabled: f
        },
        series: j
      };
      return s ? N.merge(v, s) : v;
    }, [r, c, d, h, f, u, x, g, a, l, m, n, i, t, o, s]);
    return /* @__PURE__ */ A(X, { ref: H, ...S, children: /* @__PURE__ */ A(
      V,
      {
        highcharts: N,
        options: R,
        containerProps: { className: "fds-column-chart" }
      }
    ) });
  }
);
q.displayName = "ColumnChart";
export {
  q as ColumnChart
};
