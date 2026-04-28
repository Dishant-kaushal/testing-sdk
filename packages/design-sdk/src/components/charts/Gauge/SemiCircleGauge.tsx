import { forwardRef, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps } from '../Chart/Chart';
import { useFaclonApexTheme } from '../Chart/apexchartsTheme';
import './SemiCircleGauge.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface SemiCircleGaugeProps extends Omit<ChartProps, 'children'> {
  /** Percentage value (0–100). */
  value: number;
  /** Label shown below the value in the center. */
  label?: string;
  /** ApexCharts options escape hatch — merged last. */
  apexOptions?: ApexOptions;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SemiCircleGauge — ApexCharts radialBar half-circle (−90° → 90°)
   ───────────────────────────────────────────────────────────────────────────
   Default ApexCharts semi-circle radialBar gauge with Faclon theme.
   ═══════════════════════════════════════════════════════════════════════════ */

export const SemiCircleGauge = forwardRef<HTMLDivElement, SemiCircleGaugeProps>(
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
          sparkline: { enabled: true },
        },
        plotOptions: {
          ...theme.plotOptions,
          radialBar: {
            ...theme.plotOptions?.radialBar,
            startAngle: -90,
            endAngle: 90,
            track: {
              ...theme.plotOptions?.radialBar?.track,
              startAngle: -90,
              endAngle: 90,
            },
            dataLabels: {
              ...theme.plotOptions?.radialBar?.dataLabels,
              name: {
                ...theme.plotOptions?.radialBar?.dataLabels?.name,
                show: !!label,
                offsetY: 20,
              },
              value: {
                ...theme.plotOptions?.radialBar?.dataLabels?.value,
                show: true,
                offsetY: -20,
              },
            },
          },
        },
        grid: { padding: { top: -10 } },
        labels: label ? [label] : [],
        ...apexOptions,
      }),
      [theme, label, apexOptions],
    );

    return (
      <Chart ref={ref} {...chartProps}>
        <div className="fds-semi-circle-gauge">
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

SemiCircleGauge.displayName = 'SemiCircleGauge';
