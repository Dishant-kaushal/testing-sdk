import { jsx as C } from "react/jsx-runtime";
import { forwardRef as F, useMemo as M } from "react";
import R from "highcharts";
import A from "highcharts-react-official";
import { Chart as P } from "../Chart/Chart.js";
import { useFaclonChartTheme as V, readCssVar as H } from "../Chart/highchartsTheme.js";
/* empty css             */
const $ = A.default ?? A, q = F(
  ({
    series: n,
    categories: d,
    stacked: h = !1,
    showLegend: f = !0,
    showDataLabels: u = !1,
    onPointClick: o,
    colors: l,
    xAxisTitle: i,
    yAxisTitle: s,
    yAxisUnit: c,
    plotLines: t,
    plotBands: a,
    zoomable: g = !0,
    highchartsOptions: m,
    ...N
  }, S) => {
    const r = V(), w = M(() => {
      var v, I, z;
      const j = n.map((e) => ({
        type: "bar",
        name: e.name,
        data: e.data,
        color: e.color
      })), x = a == null ? void 0 : a.map((e) => ({
        from: e.from,
        to: e.to,
        color: e.color ?? "rgba(239,68,68,0.1)",
        zIndex: e.zIndex ?? 0,
        ...e.label && {
          label: { text: e.label, align: e.labelAlign ?? "right" }
        }
      })), b = t == null ? void 0 : t.map((e) => ({
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
      })), y = {
        ...r,
        ...l && { colors: l },
        chart: {
          ...r.chart,
          type: "bar",
          ...g && { zooming: { type: "y", singleTouch: !0 } }
        },
        xAxis: {
          ...r.xAxis,
          categories: d,
          ...i !== void 0 && { title: { ...(v = r.xAxis) == null ? void 0 : v.title, text: i } }
        },
        yAxis: {
          ...r.yAxis,
          ...s !== void 0 && { title: { ...(I = r.yAxis) == null ? void 0 : I.title, text: s } },
          ...c && { labels: { ...(z = r.yAxis) == null ? void 0 : z.labels, format: `{value} ${c}` } },
          ...b && { plotLines: b },
          ...x && { plotBands: x }
        },
        plotOptions: {
          bar: {
            stacking: h ? "normal" : void 0,
            dataLabels: { enabled: u },
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
      return m ? R.merge(y, m) : y;
    }, [r, n, d, h, f, u, g, o, l, i, s, c, t, a, m]);
    return /* @__PURE__ */ C(P, { ref: S, ...N, children: /* @__PURE__ */ C(
      $,
      {
        highcharts: R,
        options: w,
        containerProps: { className: "fds-bar-chart" }
      }
    ) });
  }
);
q.displayName = "BarChart";
export {
  q as BarChart
};
