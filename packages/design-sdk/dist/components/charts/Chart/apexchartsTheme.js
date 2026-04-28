import { useMemo as u } from "react";
const c = [
  "--background-warning-default",
  "--background-info-default",
  "--background-positive-default",
  "--background-error-default",
  "--background-warning-default-hover",
  "--background-info-default-hover",
  "--background-positive-default-hover",
  "--background-brand-default"
];
function t(e) {
  return typeof window > "u" ? "" : getComputedStyle(document.documentElement).getPropertyValue(e).trim();
}
function s() {
  return u(() => {
    const e = "'Noto Sans Variable', 'Noto Sans', sans-serif", r = t("--text-gray-primary") || "#192839", n = t("--text-gray-secondary") || "#40566d", a = t("--background-surface-intense") || "#ffffff", d = t("--border-gray-subtle") || "#cbd5e2";
    return {
      colors: c.map((o) => t(o)).filter((o) => o.length > 0),
      chart: {
        fontFamily: e,
        foreColor: r,
        background: a
      },
      plotOptions: {
        radialBar: {
          track: {
            background: d
          },
          dataLabels: {
            name: {
              color: n,
              fontFamily: e,
              fontSize: "14px"
            },
            value: {
              color: r,
              fontFamily: e,
              fontSize: "24px",
              fontWeight: 600
            }
          }
        }
      },
      legend: {
        fontFamily: e,
        labels: { colors: n }
      }
    };
  }, []);
}
export {
  c as FACLON_APEX_PALETTE_TOKENS,
  s as useFaclonApexTheme
};
