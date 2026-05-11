import { jsx as d } from "react/jsx-runtime";
import { forwardRef as R, useMemo as b } from "react";
import A from "highcharts/esm/highcharts.js";
import "highcharts/esm/highcharts-more.js";
import "highcharts/esm/modules/solid-gauge.js";
import l from "highcharts-react-official";
import { Chart as x } from "../Chart/Chart.js";
import { useFaclonChartTheme as C, FACLON_CHART_PALETTE_TOKENS as m } from "../Chart/highchartsTheme.js";
/* empty css                  */
const T = l.default ?? l;
function _(e, r) {
  return typeof window > "u" ? r : getComputedStyle(document.documentElement).getPropertyValue(e).trim() || r;
}
const c = 24, k = 1, N = c + k, a = (e) => 100 - e * N, u = (e) => a(e) - c, w = R(
  ({
    activities: e,
    showLegend: r = !0,
    highchartsOptions: s,
    ...p
  }, g) => {
    const n = C(), h = b(() => {
      if (!e || e.length === 0)
        return { ...n, chart: { type: "solidgauge" } };
      const i = e.map((t, o) => {
        const y = m[o % m.length];
        return _(y, "#e9690c");
      }), f = i.map(
        (t) => `color-mix(in srgb, ${t} 30%, transparent)`
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
          background: e.map((t, o) => ({
            outerRadius: `${a(o)}%`,
            innerRadius: `${u(o)}%`,
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
          enabled: r
        },
        series: e.map((t, o) => ({
          type: "solidgauge",
          name: t.name,
          showInLegend: !0,
          data: [
            {
              color: i[o],
              radius: `${a(o)}%`,
              innerRadius: `${u(o)}%`,
              y: Math.min(
                100,
                Math.max(0, t.value / (t.max ?? 100) * 100)
              )
            }
          ]
        })),
        ...s
      };
    }, [e, n, r, s]);
    return /* @__PURE__ */ d(x, { ref: g, ...p, children: /* @__PURE__ */ d(
      T,
      {
        highcharts: A,
        options: h,
        containerProps: { className: "fds-activity-gauge" }
      }
    ) });
  }
);
w.displayName = "ActivityGauge";
export {
  w as ActivityGauge
};
