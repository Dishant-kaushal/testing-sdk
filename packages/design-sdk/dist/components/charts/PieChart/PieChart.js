import { jsx as u } from "react/jsx-runtime";
import { forwardRef as C, useMemo as I } from "react";
import g from "highcharts";
import y from "highcharts-react-official";
import { Chart as N } from "../Chart/Chart.js";
import { useFaclonChartTheme as b } from "../Chart/highchartsTheme.js";
/* empty css             */
const j = y.default ?? y, M = C(
  ({
    data: i,
    showLegend: t = !0,
    showDataLabels: m = !1,
    dataLabelFormat: s = "{point.name}: {point.percentage:.1f}%",
    donut: c = !1,
    innerSize: n = "60%",
    startAngle: h = 0,
    endAngle: f = 360,
    allowPointSelect: d = !1,
    tooltipValueSuffix: r,
    colors: p,
    onPointClick: o,
    highchartsOptions: a,
    ...R
  }, v) => {
    const e = b(), x = I(() => {
      const H = [
        {
          type: "pie",
          data: i,
          ...c && { innerSize: n },
          allowPointSelect: d,
          dataLabels: {
            enabled: m,
            format: s
          },
          ...o && {
            cursor: "pointer",
            point: {
              events: {
                click() {
                  o({
                    name: this.name,
                    value: this.y ?? 0,
                    percentage: this.percentage ?? 0,
                    pointIndex: this.index,
                    color: this.color
                  });
                }
              }
            }
          }
        }
      ], l = {
        ...e,
        ...p && { colors: p },
        chart: {
          ...e.chart,
          type: "pie"
        },
        tooltip: {
          ...e.tooltip,
          ...r && { valueSuffix: r }
        },
        plotOptions: {
          pie: {
            startAngle: h,
            endAngle: f,
            showInLegend: t
          }
        },
        legend: {
          ...e.legend,
          enabled: t
        },
        series: H
      };
      return a ? g.merge(l, a) : l;
    }, [
      e,
      i,
      t,
      m,
      s,
      c,
      n,
      h,
      f,
      d,
      r,
      p,
      o,
      a
    ]);
    return /* @__PURE__ */ u(N, { ref: v, ...R, children: /* @__PURE__ */ u(
      j,
      {
        highcharts: g,
        options: x,
        containerProps: { className: "fds-pie-chart" }
      }
    ) });
  }
);
M.displayName = "PieChart";
export {
  M as PieChart
};
