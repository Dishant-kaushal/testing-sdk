import { forwardRef, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps } from '../Chart/Chart';
import { useFaclonApexTheme } from '../Chart/apexchartsTheme';
import './CircleGauge.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface CircleGaugeProps extends Omit<ChartProps, 'children'> {
  /** Percentage value (0–100). */
  value: number;
  /** Label shown below the value in the center. */
  label?: string;
  /** Size of the hollow center as a percentage of the ring diameter. @default '70%' */
  hollowSize?: string;
  /** ApexCharts options escape hatch — merged last. */
  apexOptions?: ApexOptions;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CircleGauge — ApexCharts radialBar full-circle (0° → 360°)
   ───────────────────────────────────────────────────────────────────────────
   Single-value full-circle radialBar gauge with Faclon theme. Shows
   the percentage value in a hollow center.
   ═══════════════════════════════════════════════════════════════════════════ */

export const CircleGauge = forwardRef<HTMLDivElement, CircleGaugeProps>(
  (
    {
      value,
      label,
      hollowSize = '70%',
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
        },
        plotOptions: {
          ...theme.plotOptions,
          radialBar: {
            ...theme.plotOptions?.radialBar,
            hollow: {
              size: hollowSize,
            },
            dataLabels: {
              ...theme.plotOptions?.radialBar?.dataLabels,
              name: {
                ...theme.plotOptions?.radialBar?.dataLabels?.name,
                show: !!label,
              },
              value: {
                ...theme.plotOptions?.radialBar?.dataLabels?.value,
                show: true,
              },
            },
          },
        },
        labels: label ? [label] : [],
        ...apexOptions,
      }),
      [theme, label, hollowSize, apexOptions],
    );

    return (
      <Chart ref={ref} {...chartProps}>
        <div className="fds-circle-gauge">
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

CircleGauge.displayName = 'CircleGauge';
