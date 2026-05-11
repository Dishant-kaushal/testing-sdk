import { forwardRef, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { Options, SeriesPieOptions } from 'highcharts';
import { Chart } from '../Chart/Chart';
import type { ChartProps, ChartPointClickContext } from '../Chart/Chart';
import { useFaclonChartTheme } from '../Chart/highchartsTheme';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface PieDataPoint {
  name: string;
  y: number;
  color?: string;
}

export interface PieChartProps extends Omit<ChartProps, 'children'> {
  data: PieDataPoint[];
  showLegend?: boolean;
  showDataLabels?: boolean;
  dataLabelFormat?: string;
  donut?: boolean;
  innerSize?: string;
  startAngle?: number;
  endAngle?: number;
  allowPointSelect?: boolean;
  tooltipValueSuffix?: string;
  colors?: string[];
  onPointClick?: (ctx: ChartPointClickContext & { percentage: number; color?: string }) => void;
  highchartsOptions?: Options;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PieChart
   ═══════════════════════════════════════════════════════════════════════════ */

export const PieChart = forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      data,
      showLegend = true,
      showDataLabels = false,
      dataLabelFormat = '{point.name}: {point.percentage:.1f}%',
      donut = false,
      innerSize = '60%',
      startAngle = 0,
      endAngle = 360,
      allowPointSelect = false,
      tooltipValueSuffix,
      colors,
      onPointClick,
      highchartsOptions,
      ...chartProps
    },
    ref,
  ) => {
    const theme = useFaclonChartTheme();

    const options = useMemo<Options>(() => {
      const seriesConfig: SeriesPieOptions = {
        type: 'pie',
        data,
        ...(donut && { innerSize }),
        allowPointSelect,
        dataLabels: {
          enabled: showDataLabels,
          format: dataLabelFormat,
        },
        ...(onPointClick && {
          cursor: 'pointer',
          point: {
            events: {
              click(this: Highcharts.Point) {
                onPointClick({
                  name: String(this.name ?? ''),
                  value: this.y ?? 0,
                  percentage: this.percentage ?? 0,
                  pointIndex: this.index,
                  color: this.color,
                } as any);
              },
            },
          },
        }),
        startAngle,
        endAngle,
      };

      const computed: Options = {
        ...theme,
        ...(colors && { colors }),
        chart: {
          ...theme.chart,
          type: 'pie',
        },
        tooltip: {
          ...theme.tooltip,
          ...(tooltipValueSuffix && { valueSuffix: tooltipValueSuffix }),
        },
        plotOptions: {
          pie: {
            allowPointSelect,
            cursor: onPointClick ? 'pointer' : undefined,
            dataLabels: {
              enabled: showDataLabels,
              format: dataLabelFormat,
            },
          },
        },
        legend: {
          ...theme.legend,
          enabled: showLegend,
        },
        series: [seriesConfig],
      };

      return highchartsOptions ? Highcharts.merge(computed, highchartsOptions) : computed;
    }, [theme, data, showLegend, showDataLabels, dataLabelFormat, donut, innerSize, startAngle, endAngle, allowPointSelect, tooltipValueSuffix, colors, onPointClick, highchartsOptions]);

    return (
      <Chart ref={ref} {...chartProps}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ className: 'fds-pie-chart' }}
        />
      </Chart>
    );
  },
);

PieChart.displayName = 'PieChart';
