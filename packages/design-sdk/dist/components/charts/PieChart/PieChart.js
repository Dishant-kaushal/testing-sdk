import { jsx as g } from "react/jsx-runtime";
import { forwardRef as C, useMemo as I } from "react";
import l from "highcharts";
import y from "highcharts-react-official";
import { Chart as N } from "../Chart/Chart.js";
import { useFaclonChartTheme as b } from "../Chart/highchartsTheme.js";
/* empty css             */
const j = y.default ?? y, M = C(
  ({
    data: o,
    showLegend: r = !0,
    showDataLabels: s = !1,
    dataLabelFormat: i = "{point.name}: {point.percentage:.1f}%",
    donut: c = !1,
    innerSize: n = "60%",
    startAngle: h = 0,
    endAngle: f = 360,
    allowPointSelect: d = !1,
    tooltipValueSuffix: t,
    colors: p,
    onPointClick: a,
    highchartsOptions: m,
    ...R
  }, v) => {
    const e = b(), x = I(() => {
      const H = [
        {
          type: "pie",
          data: o,
          ...c && { innerSize: n },
          allowPointSelect: d,
          dataLabels: {
            enabled: s,
            format: i
          },
          ...a && {
            cursor: "pointer",
            point: {
              events: {
                click() {
                  a({
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
      ], u = {
        ...e,
        ...p && { colors: p },
        chart: {
          ...e.chart,
          type: "pie"
        },
        tooltip: {
          ...t && { valueSuffix: t }
        },
        plotOptions: {
          pie: {
            startAngle: h,
            endAngle: f,
            showInLegend: r
          }
        },
        legend: {
          ...e.legend,
          enabled: r
        },
        series: H
      };
      return m ? l.merge(u, m) : u;
    }, [
      e,
      o,
      r,
      s,
      i,
      c,
      n,
      h,
      f,
      d,
      t,
      p,
      a,
      m
    ]);
    return /* @__PURE__ */ g(N, { ref: v, ...R, children: /* @__PURE__ */ g(
      j,
      {
        highcharts: l,
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
