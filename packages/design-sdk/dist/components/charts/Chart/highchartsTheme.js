import { useMemo as z } from "react";
import s from "highcharts";
s.__fdsWheelZoom || (s.__fdsWheelZoom = !0, s.addEvent(s.Chart, "afterGetContainer", function() {
  var f, n, r;
  const t = this, e = (r = (n = (f = t.options) == null ? void 0 : f.chart) == null ? void 0 : n.zooming) == null ? void 0 : r.mouseWheel;
  if (e === !1 || typeof e == "object" && (e == null ? void 0 : e.enabled) === !1) return;
  const o = typeof e == "object" && (e == null ? void 0 : e.sensitivity) || 1.1;
  t.container.addEventListener(
    "wheel",
    (a) => {
      const c = a.offsetX, l = a.offsetY;
      if (!t.isInsidePlot(c - t.plotLeft, l - t.plotTop)) return;
      const p = a.deltaY / 120, x = Math.pow(o, p);
      t.xAxis.forEach((u) => {
        const { min: d, max: b, dataMin: S, dataMax: v } = u.getExtremes();
        if (!s.isNumber(d) || !s.isNumber(b)) return;
        const g = b - d, m = g * x, C = (c - t.plotLeft) / t.plotWidth, y = Math.max(S ?? -1 / 0, d + (g - m) * C), k = Math.min(v ?? 1 / 0, y + m);
        u.setExtremes(y, k, !0, !1);
      }), a.preventDefault();
    },
    { passive: !1 }
  );
}));
const E = [
  "--background-warning-default",
  // 1. orange
  "--background-info-default",
  // 2. blue
  "--background-positive-default",
  // 3. green
  "--background-error-default",
  // 4. red
  "--background-warning-default-hover",
  // 5. dark orange
  "--background-info-default-hover",
  // 6. dark blue
  "--background-positive-default-hover",
  // 7. dark green
  "--background-brand-default"
  // 8. brand (charcoal — neutral, last)
];
function i(t) {
  return typeof window > "u" ? "" : getComputedStyle(document.documentElement).getPropertyValue(t).trim();
}
function h(t, e) {
  const o = i(t);
  return o ? `${o}px` : `${e}px`;
}
function _() {
  return z(() => {
    const t = "'Noto Sans Variable', 'Noto Sans', sans-serif", e = i("--text-gray-primary") || "#192839", o = i("--text-gray-secondary") || "#40566d", f = i("--background-surface-intense") || "#ffffff", n = i("--border-gray-subtle") || "#cbd5e2", r = h("--global-fz-12", 12), a = h("--global-fz-14", 14);
    return {
      colors: E.map((l) => i(l)).filter((l) => l.length > 0),
      chart: {
        backgroundColor: f,
        style: { fontFamily: t }
      },
      title: { text: void 0 },
      subtitle: { text: void 0 },
      credits: { enabled: !1 },
      xAxis: {
        labels: {
          style: { color: e, fontFamily: t, fontSize: r }
        },
        lineColor: n,
        tickColor: n,
        title: {
          style: { color: o, fontFamily: t, fontSize: r }
        }
      },
      yAxis: {
        labels: {
          style: { color: e, fontFamily: t, fontSize: r }
        },
        gridLineColor: n,
        lineColor: n,
        tickColor: n,
        title: {
          style: { color: o, fontFamily: t, fontSize: r }
        }
      },
      legend: {
        itemStyle: { color: o, fontFamily: t, fontSize: a },
        itemHoverStyle: { color: e }
      }
    };
  }, []);
}
export {
  E as FACLON_CHART_PALETTE_TOKENS,
  i as readCssVar,
  _ as useFaclonChartTheme
};
