import { jsx as d } from "react/jsx-runtime";
import { forwardRef as y, useMemo as R } from "react";
import b from "highcharts/esm/highcharts.js";
import "highcharts/esm/highcharts-more.js";
import "highcharts/esm/modules/solid-gauge.js";
import A from "highcharts-react-official";
import { Chart as x } from "../Chart/Chart.js";
import { useFaclonChartTheme as C, FACLON_CHART_PALETTE_TOKENS as l } from "../Chart/highchartsTheme.js";
/* empty css                  */
function T(e, t) {
  return typeof window > "u" ? t : getComputedStyle(document.documentElement).getPropertyValue(e).trim() || t;
}
const u = 24, _ = 1, k = u + _, a = (e) => 100 - e * k, m = (e) => a(e) - u, N = y(
  ({
    activities: e,
    showLegend: t = !0,
    highchartsOptions: i,
    ...c
  }, p) => {
    const n = C(), g = R(() => {
      if (!e || e.length === 0)
        return { ...n, chart: { type: "solidgauge" } };
      const s = e.map((r, o) => {
        const h = l[o % l.length];
        return T(h, "#e9690c");
      }), f = s.map(
        (r) => `color-mix(in srgb, ${r} 30%, transparent)`
      );
      return {
        ...n,
        chart: {
          ...n.chart,
          type: "solidgauge"
        },
        tooltip: {
          backgroundColor: "none",
          borderWidth: 0,
          shadow: !1,
          fixed: !0,
          pointFormat: '{series.name}<br><span style="font-size: 2em; color: {point.color}; font-weight: bold">{point.y}</span>',
          position: {
            align: "center",
            verticalAlign: "middle"
          },
          valueSuffix: "%"
        },
        pane: {
          startAngle: 0,
          endAngle: 360,
          background: e.map((r, o) => ({
            outerRadius: `${a(o)}%`,
            innerRadius: `${m(o)}%`,
            backgroundColor: f[o],
            borderWidth: 0
          }))
        },
        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: []
        },
        plotOptions: {
          solidgauge: {
            dataLabels: { enabled: !1 },
            linecap: "round",
            stickyTracking: !1,
            rounded: !0
          }
        },
        legend: {
          ...n.legend,
          enabled: t
        },
        series: e.map((r, o) => ({
          type: "solidgauge",
          name: r.name,
          showInLegend: !0,
          data: [
            {
              color: s[o],
              radius: `${a(o)}%`,
              innerRadius: `${m(o)}%`,
              y: Math.min(
                100,
                Math.max(0, r.value / (r.max ?? 100) * 100)
              )
            }
          ]
        })),
        ...i
      };
    }, [e, n, t, i]);
    return /* @__PURE__ */ d(x, { ref: p, ...c, children: /* @__PURE__ */ d(
      A,
      {
        highcharts: b,
        options: g,
        containerProps: { className: "fds-activity-gauge" }
      }
    ) });
  }
);
N.displayName = "ActivityGauge";
export {
  N as ActivityGauge
};
