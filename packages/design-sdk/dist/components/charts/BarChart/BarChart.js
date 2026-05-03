import { jsx as C } from "react/jsx-runtime";
import { forwardRef as w, useMemo as F } from "react";
import N from "highcharts";
import V from "highcharts-react-official";
import { Chart as Y } from "../Chart/Chart.js";
import { useFaclonChartTheme as $, readCssVar as P } from "../Chart/highchartsTheme.js";
/* empty css             */
const q = w(
  ({
    series: c,
    categories: d,
    stacked: h = !1,
    showLegend: f = !0,
    showDataLabels: x = !1,
    scrollable: g = !1,
    scrollableMinHeight: u = 500,
    onPointClick: o,
    colors: l,
    xAxisTitle: i,
    yAxisTitle: s,
    yAxisUnit: m,
    plotLines: a,
    plotBands: t,
    highchartsOptions: n,
    ...S
  }, H) => {
    const r = $(), R = F(() => {
      var I, z, A;
      const j = c.map((e) => ({
        type: "bar",
        name: e.name,
        data: e.data,
        color: e.color
      })), b = t == null ? void 0 : t.map((e) => ({
        from: e.from,
        to: e.to,
        color: e.color ?? "rgba(239,68,68,0.1)",
        zIndex: e.zIndex ?? 0,
        ...e.label && {
          label: { text: e.label, align: e.labelAlign ?? "right" }
        }
      })), y = a == null ? void 0 : a.map((e) => ({
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
          type: "bar",
          ...g && {
            scrollablePlotArea: { minHeight: u, scrollPositionY: 0 }
          }
        },
        xAxis: {
          ...r.xAxis,
          categories: d,
          ...i !== void 0 && { title: { ...(I = r.xAxis) == null ? void 0 : I.title, text: i } }
        },
        yAxis: {
          ...r.yAxis,
          ...s !== void 0 && { title: { ...(z = r.yAxis) == null ? void 0 : z.title, text: s } },
          ...m && { labels: { ...(A = r.yAxis) == null ? void 0 : A.labels, format: `{value} ${m}` } },
          ...y && { plotLines: y },
          ...b && { plotBands: b }
        },
        plotOptions: {
          bar: {
            stacking: h ? "normal" : void 0,
            dataLabels: { enabled: x },
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
          enabled: f
        },
        series: j
      };
      return n ? N.merge(v, n) : v;
    }, [r, c, d, h, f, x, g, u, o, l, i, s, m, a, t, n]);
    return /* @__PURE__ */ C(Y, { ref: H, ...S, children: /* @__PURE__ */ C(
      V,
      {
        highcharts: N,
        options: R,
        containerProps: { className: "fds-bar-chart" }
      }
    ) });
  }
);
q.displayName = "BarChart";
export {
  q as BarChart
};
