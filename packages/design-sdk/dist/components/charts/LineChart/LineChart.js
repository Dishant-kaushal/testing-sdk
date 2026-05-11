import { jsx as R } from "react/jsx-runtime";
import { forwardRef as V, useMemo as $ } from "react";
import A from "highcharts";
import H from "highcharts-react-official";
import { Chart as q } from "../Chart/Chart.js";
import { useFaclonChartTheme as E, readCssVar as N } from "../Chart/highchartsTheme.js";
/* empty css              */
const G = H.default ?? H, J = V(
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
    highchartsOptions: m,
    ...S
  }, j) => {
    const t = E(), F = $(() => {
      var z, C, p;
      const g = u ? "spline" : "line", P = h.map((e) => ({
        type: g,
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
      })), y = r == null ? void 0 : r.map((e) => ({
        value: e.value,
        color: (e.color ?? N("--border-error-default")) || "#ef4444",
        width: e.width ?? 2,
        dashStyle: e.dashStyle ?? "Dash",
        zIndex: e.zIndex ?? 5,
        ...e.label && {
          label: {
            text: e.label,
            align: e.labelAlign ?? "right",
            style: { color: (e.color ?? N("--border-error-default")) || "#ef4444" }
          }
        }
      })), v = i ? {
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
      } : {}, I = {
        ...t,
        ...n && { colors: n },
        chart: {
          ...t.chart,
          type: g,
          zooming: { type: "x", singleTouch: !0 }
        },
        xAxis: {
          ...t.xAxis,
          categories: f,
          ...s !== void 0 && { title: { ...(z = t.xAxis) == null ? void 0 : z.title, text: s } }
        },
        yAxis: {
          ...t.yAxis,
          ...c !== void 0 && { title: { ...(C = t.yAxis) == null ? void 0 : C.title, text: c } },
          ...d && { labels: { ...(p = t.yAxis) == null ? void 0 : p.labels, format: `{value} ${d}` } },
          ...y && { plotLines: y },
          ...b && { plotBands: b }
        },
        plotOptions: {
          line: {
            dataLabels: { enabled: l },
            ...v
          },
          spline: {
            dataLabels: { enabled: l },
            ...v
          }
        },
        legend: {
          ...t.legend,
          enabled: x
        },
        series: P
      };
      return m ? A.merge(I, m) : I;
    }, [t, h, f, u, o, x, l, i, n, s, c, d, r, a, m]);
    return /* @__PURE__ */ R(q, { ref: j, ...S, children: /* @__PURE__ */ R(
      G,
      {
        highcharts: A,
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
