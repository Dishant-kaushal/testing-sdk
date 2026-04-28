import { useMemo as d } from "react";
const f = [
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
function o(e) {
  return typeof window > "u" ? "" : getComputedStyle(document.documentElement).getPropertyValue(e).trim();
}
function i(e, r) {
  const t = o(e);
  return t ? `${t}px` : `${r}px`;
}
function g() {
  return d(() => {
    const e = "'Noto Sans Variable', 'Noto Sans', sans-serif", r = o("--text-gray-primary") || "#192839", t = o("--text-gray-secondary") || "#40566d", c = o("--background-surface-intense") || "#ffffff", n = o("--border-gray-subtle") || "#cbd5e2", l = i("--global-fz-12", 12), s = i("--global-fz-14", 14);
    return {
      colors: f.map((a) => o(a)).filter((a) => a.length > 0),
      chart: {
        backgroundColor: c,
        style: { fontFamily: e }
      },
      title: { text: void 0 },
      subtitle: { text: void 0 },
      credits: { enabled: !1 },
      xAxis: {
        labels: {
          style: { color: r, fontFamily: e, fontSize: l }
        },
        lineColor: n,
        tickColor: n,
        title: {
          style: { color: t, fontFamily: e, fontSize: l }
        }
      },
      yAxis: {
        labels: {
          style: { color: r, fontFamily: e, fontSize: l }
        },
        gridLineColor: n,
        lineColor: n,
        tickColor: n,
        title: {
          style: { color: t, fontFamily: e, fontSize: l }
        }
      },
      legend: {
        itemStyle: { color: t, fontFamily: e, fontSize: s },
        itemHoverStyle: { color: r }
      }
    };
  }, []);
}
export {
  f as FACLON_CHART_PALETTE_TOKENS,
  g as useFaclonChartTheme
};
