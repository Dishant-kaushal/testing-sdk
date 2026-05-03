import { jsx as l } from "react/jsx-runtime";
import { forwardRef as h, useMemo as y } from "react";
import k from "highcharts/esm/highcharts.js";
import "highcharts/esm/highcharts-more.js";
import C from "highcharts-react-official";
import { Chart as b } from "../Chart/Chart.js";
import { useFaclonChartTheme as x } from "../Chart/highchartsTheme.js";
/* empty css                */
function m(e, t) {
  return typeof window > "u" ? t : getComputedStyle(document.documentElement).getPropertyValue(e).trim() || t;
}
const S = h(
  ({
    value: e,
    min: t = 0,
    max: i = 100,
    bands: n = [],
    unit: s,
    label: d,
    ...p
  }, u) => {
    const o = x(), g = y(() => {
      const c = "'Noto Sans Variable', 'Noto Sans', sans-serif", r = m("--text-gray-primary", "#192839"), f = m("--background-surface-intense", "#ffffff");
      return {
        ...o,
        chart: {
          ...o.chart,
          type: "gauge",
          plotBackgroundColor: void 0,
          plotBackgroundImage: void 0,
          plotBorderWidth: 0,
          plotShadow: !1
        },
        /* Half-circle pane with the dial pivot pulled down so the dome
           fills the upper portion of the canvas. The Highcharts speedometer
           demo uses `background: null` to remove the default gray track ring,
           but TypeScript's `Highcharts.PaneBackgroundOptions[]` type doesn't
           allow null. Instead we provide a single transparent background
           entry — same visual result (no gray ring), no `innerRadius` crash,
           and TypeScript-clean. */
        pane: {
          startAngle: -90,
          endAngle: 89.9,
          background: [
            {
              backgroundColor: "transparent",
              borderWidth: 0,
              innerRadius: "0%",
              outerRadius: "100%",
              shape: "arc"
            }
          ],
          center: ["50%", "75%"],
          size: "110%"
        },
        yAxis: {
          min: t,
          max: i,
          tickPixelInterval: 72,
          /* Tick marks hidden — the speedometer demo uses white tick marks
             on top of the colored bands to subdivide them, but the Faclon
             design wants continuous bands. Setting tickLength + tickWidth
             to 0 removes the tick marks while keeping the auto-derived tick
             label positions. */
          tickLength: 0,
          tickWidth: 0,
          tickColor: f,
          minorTickInterval: void 0,
          labels: {
            distance: 20,
            style: {
              fontSize: "14px",
              color: r,
              fontFamily: c
            }
          },
          lineWidth: 0,
          plotBands: n.map((a) => ({
            from: a.from,
            to: a.to,
            color: a.color,
            thickness: 20
          })),
          title: { text: void 0 }
        },
        series: [
          {
            type: "gauge",
            name: "Value",
            data: [e],
            dataLabels: {
              format: d ?? `{y}${s ?? ""}`,
              borderWidth: 0,
              color: r,
              style: {
                fontSize: "16px",
                fontFamily: c
              }
            },
            dial: {
              radius: "80%",
              backgroundColor: r,
              baseWidth: 12,
              baseLength: "0%",
              rearLength: "0%"
            },
            pivot: {
              backgroundColor: r,
              radius: 6
            }
          }
        ]
      };
    }, [o, e, t, i, n, s, d]);
    return /* @__PURE__ */ l(b, { ref: u, ...p, children: /* @__PURE__ */ l(
      C,
      {
        highcharts: k,
        options: g,
        containerProps: { className: "fds-series-gauge" }
      }
    ) });
  }
);
S.displayName = "SeriesGauge";
export {
  S as SeriesGauge
};
