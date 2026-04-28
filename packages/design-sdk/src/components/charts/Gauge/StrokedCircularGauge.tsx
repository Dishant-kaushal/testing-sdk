import { forwardRef, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps } from '../Chart/Chart';
import { useFaclonApexTheme } from '../Chart/apexchartsTheme';
import './StrokedCircularGauge.css';

/** Read a CSS var stored as a bare number and return `"{value}px"`. */
function cssPx(token: string, fallback: number): string {
  if (typeof window === 'undefined') return `${fallback}px`;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  return raw ? `${raw}px` : `${fallback}px`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface StrokedCircularGaugeProps extends Omit<ChartProps, 'children'> {
  /** Percentage value (0–100). */
  value: number;
  /** Label shown below the value in the center. */
  label?: string;
  /** ApexCharts options escape hatch — merged last. */
  apexOptions?: ApexOptions;
}

/* ═══════════════════════════════════════════════════════════════════════════
   StrokedCircularGauge — ApexCharts "Stroked Gauge" demo
   ───────────────────────────────────────────────────────────────────────────
   Verbatim ApexCharts Stroked Gauge demo (−135° → 135°, 270° arc) with
   dashed track stroke, gradient fill, and Faclon theme colors.
   ═══════════════════════════════════════════════════════════════════════════ */

export const StrokedCircularGauge = forwardRef<HTMLDivElement, StrokedCircularGaugeProps>(
  (
    {
      value,
      label,
      apexOptions,
      ...chartProps
    },
    ref,
  ) => {
    const theme = useFaclonApexTheme();

    const options = useMemo<ApexOptions>(
      () => ({
        ...theme,
        chart: {
          ...theme.chart,
          type: 'radialBar',
          offsetY: -10,
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: cssPx('--global-fz-16', 16),
                color: theme.plotOptions?.radialBar?.dataLabels?.name?.color,
                offsetY: 120,
              },
              value: {
                offsetY: 76,
                fontSize: cssPx('--global-fz-24', 24),
                color: theme.plotOptions?.radialBar?.dataLabels?.value?.color,
                formatter: (val: number) => `${val}%`,
              },
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91],
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: label ? [label] : [],
        ...apexOptions,
      }),
      [theme, label, apexOptions],
    );

    return (
      <Chart ref={ref} {...chartProps}>
        <div className="fds-stroked-circular-gauge">
          {/* height must match .fds-chart__canvas min-height in Chart.css */}
          <ReactApexChart
            type="radialBar"
            series={[value]}
            options={options}
            height={367}
          />
        </div>
      </Chart>
    );
  },
);

StrokedCircularGauge.displayName = 'StrokedCircularGauge';
