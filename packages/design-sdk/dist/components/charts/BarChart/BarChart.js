import { jsx as z } from "react/jsx-runtime";
import { forwardRef as j, useMemo as F } from "react";
import C from "highcharts";
import R from "highcharts-react-official";
import { Chart as M } from "../Chart/Chart.js";
import { useFaclonChartTheme as P, readCssVar as A } from "../Chart/highchartsTheme.js";
/* empty css             */
const V = R.default ?? R, $ = j(
  ({
    series: n,
    categories: d,
    stacked: h = !1,
    showLegend: f = !0,
    showDataLabels: x = !1,
    onPointClick: o,
    colors: l,
    xAxisTitle: i,
    yAxisTitle: s,
    yAxisUnit: m,
    plotLines: a,
    plotBands: t,
    highchartsOptions: c,
    ...H
  }, N) => {
    const r = P(), S = F(() => {
      var y, v, I;
      const w = n.map((e) => ({
        type: "bar",
        name: e.name,
        data: e.data,
        color: e.color
      })), g = t == null ? void 0 : t.map((e) => ({
        from: e.from,
        to: e.to,
        color: e.color ?? "rgba(239,68,68,0.1)",
        zIndex: e.zIndex ?? 0,
        ...e.label && {
          label: { text: e.label, align: e.labelAlign ?? "right" }
        }
      })), u = a == null ? void 0 : a.map((e) => ({
        value: e.value,
        color: (e.color ?? A("--border-error-default")) || "#ef4444",
        width: e.width ?? 2,
        dashStyle: e.dashStyle ?? "Dash",
        zIndex: e.zIndex ?? 5,
        ...e.label && {
          label: {
            text: e.label,
            align: e.labelAlign ?? "right",
            style: { color: (e.color ?? A("--border-error-default")) || "#ef4444" }
          }
        }
      })), b = {
        ...r,
        ...l && { colors: l },
        chart: {
          ...r.chart,
          type: "bar"
        },
        xAxis: {
          ...r.xAxis,
          categories: d,
          ...i !== void 0 && { title: { ...(y = r.xAxis) == null ? void 0 : y.title, text: i } }
        },
        yAxis: {
          ...r.yAxis,
          ...s !== void 0 && { title: { ...(v = r.yAxis) == null ? void 0 : v.title, text: s } },
          ...m && { labels: { ...(I = r.yAxis) == null ? void 0 : I.labels, format: `{value} ${m}` } },
          ...u && { plotLines: u },
          ...g && { plotBands: g }
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
        series: w
      };
      return c ? C.merge(b, c) : b;
    }, [r, n, d, h, f, x, o, l, i, s, m, a, t, c]);
    return /* @__PURE__ */ z(M, { ref: N, ...H, children: /* @__PURE__ */ z(
      V,
      {
        highcharts: C,
        options: S,
        containerProps: { className: "fds-bar-chart" }
      }
    ) });
  }
);
$.displayName = "BarChart";
export {
  $ as BarChart
};
