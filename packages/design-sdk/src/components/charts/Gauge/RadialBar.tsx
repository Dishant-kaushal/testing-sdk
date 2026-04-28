import { forwardRef, useMemo, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps } from '../Chart/Chart';
import { useFaclonApexTheme } from '../Chart/apexchartsTheme';
import './RadialBar.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface RadialBarProps extends Omit<ChartProps, 'children'> {
  /** Percentage values (0–100) — one per ring. */
  series: number[];
  /** Labels corresponding to each series value. */
  labels?: string[];
  /** Show value labels in the center / beside the rings. @default true */
  showLabels?: boolean;
  /** ApexCharts options escape hatch — merged last. */
  apexOptions?: ApexOptions;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RadialBar — ApexCharts default radialBar gauge
   ───────────────────────────────────────────────────────────────────────────
   Concentric rings, 0–360°, with Faclon theme colors. Center label shows the
   total (sum) by default. On hover, the center switches to the hovered
   series' label + value. On mouse-leave it reverts to the total.
   ═══════════════════════════════════════════════════════════════════════════ */

export const RadialBar = forwardRef<HTMLDivElement, RadialBarProps>(
  (
    {
      series,
      labels,
      showLabels = true,
      apexOptions,
      ...chartProps
    },
    ref,
  ) => {
    const theme = useFaclonApexTheme();
    const totalRef = useRef<number>(0);

    /* Pre-compute total so the formatter closure can read it. */
    totalRef.current = series.reduce((sum, v) => sum + v, 0);

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
            dataLabels: {
              ...theme.plotOptions?.radialBar?.dataLabels,
              name: {
                ...theme.plotOptions?.radialBar?.dataLabels?.name,
                show: showLabels,
              },
              value: {
                ...theme.plotOptions?.radialBar?.dataLabels?.value,
                show: showLabels,
              },
              total: {
                show: showLabels,
                label: 'Total',
                color: theme.plotOptions?.radialBar?.dataLabels?.name?.color,
                fontFamily: theme.chart?.fontFamily,
                fontSize: '14px',
                formatter: () => `${totalRef.current}`,
              },
            },
          },
        },
        labels: labels ?? [],
        ...apexOptions,
      }),
      [theme, labels, showLabels, apexOptions],
    );

    return (
      <Chart ref={ref} {...chartProps}>
        <div className="fds-radial-bar">
          {/* height must match .fds-chart__canvas min-height in Chart.css */}
          <ReactApexChart
            type="radialBar"
            series={series}
            options={options}
            height={367}
          />
        </div>
      </Chart>
    );
  },
);

RadialBar.displayName = 'RadialBar';
