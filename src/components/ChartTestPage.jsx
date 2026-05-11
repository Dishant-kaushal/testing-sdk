import { useState } from 'react';
import {
  LineChart,
  ColumnChart,
  AreaChart,
  BarChart,
  PieChart,
  ActivityGauge,
  ChartActions,
} from '@faclon-labs/design-sdk';

// ── shared ────────────────────────────────────────────────────────────────────

function wrap(widthPct) {
  return {
    width: `${widthPct}%`,
    margin: '0 0 36px',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    padding: 20,
    boxSizing: 'border-box',
    transition: 'width 80ms linear',
  };
}

const TAG = {
  display: 'inline-block',
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#6b7280',
  marginBottom: 10,
};

const CHECK = {
  margin: '10px 0 0',
  paddingLeft: 18,
  fontSize: 12,
  color: '#374151',
  lineHeight: 1.8,
};

// ── page ──────────────────────────────────────────────────────────────────────

export default function ChartTestPage() {
  const [widthPct, setWidthPct] = useState(100);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: '0 0 2px', fontSize: 18, fontWeight: 700 }}>Chart Props — SDK Test</h2>
          <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
            5 tests. Verify axis titles, units, plotLines, plotBands, colors, stacking, and escape hatch.
          </p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap' }}>Container width</span>
          <input
            type="range"
            min={20}
            max={100}
            value={widthPct}
            onChange={(e) => setWidthPct(Number(e.target.value))}
            style={{ width: 160, accentColor: '#6366f1', cursor: 'pointer' }}
          />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#111827', minWidth: 38, textAlign: 'right' }}>
            {widthPct}%
          </span>
        </div>
      </div>

      {/* ── 1. ColumnChart — all new props ───────────────────────────────── */}
      <div style={wrap(widthPct)}>
        <span style={TAG}>1 — ColumnChart: xAxisTitle, yAxisUnit, colors, plotLines, plotBands, showLegend, showDataLabels</span>
        <ColumnChart
          title="Monthly Revenue"
          categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
          series={[
            { name: 'Product A', data: [42, 85, 60, 92, 75, 88] },
            { name: 'Product B', data: [30, 55, 70, 45, 60, 72] },
          ]}
          highchartsOptions={{
            chart: { zooming: { type: 'x' } },
            xAxis: { minRange: 1, startOnTick: false, endOnTick: false },
          }}
          xAxisTitle="Month"
          yAxisTitle="Revenue"
          yAxisUnit="k"
          colors={['#6366f1', '#22c55e']}
          plotLines={[{ value: 75, label: 'Target', labelAlign: 'left' }]}
          plotBands={[{ from: 75, to: 100, label: 'Good zone' }]}
          showLegend={true}
          showDataLabels={true}
        />
        <ul style={CHECK}>
          <li><strong>X-axis</strong>: "Month" label below axis</li>
          <li><strong>Y-axis</strong>: "Revenue" label beside axis, tick labels end in <strong>k</strong></li>
          <li>Columns: Product A = <strong>indigo</strong>, Product B = <strong>green</strong></li>
          <li>Dashed line at 75 labelled <strong>Target</strong> (left-aligned)</li>
          <li>Light shaded band 75–100 labelled <strong>Good zone</strong></li>
          <li>Data labels visible above each column</li>
          <li>Legend shows both series</li>
        </ul>
      </div>

      {/* ── 2. LineChart — smooth + threshold ────────────────────────────── */}
      <div style={wrap(widthPct)}>
        <span style={TAG}>2 — LineChart: smooth, xAxisTitle, yAxisUnit, plotLine, plotBand</span>
        <LineChart
          title="Server Latency"
          categories={['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']}
          series={[{ name: 'p99', data: [12, 18, 45, 38, 22, 15] }]}
          zoomable={true}
          highchartsOptions={{
            xAxis: { minRange: 1, startOnTick: false, endOnTick: false },
          }}
          smooth={true}
          xAxisTitle="Time"
          yAxisTitle="Latency"
          yAxisUnit="ms"
          plotLines={[{ value: 35, label: 'SLA limit', color: '#ef4444' }]}
          plotBands={[{ from: 35, to: 60, color: 'rgba(239,68,68,0.08)' }]}
        />
        <ul style={CHECK}>
          <li>Line is <strong>smooth / curved</strong> (not angular)</li>
          <li><strong>X-axis</strong>: "Time" label below axis</li>
          <li><strong>Y-axis</strong>: "Latency" label, tick labels end in <strong>ms</strong></li>
          <li>Red dashed line at 35 labelled <strong>SLA limit</strong></li>
          <li>Very light red shaded band 35–60</li>
        </ul>
      </div>

      {/* ── 3a. AreaChart — stacked ──────────────────────────────────────── */}
      <div style={wrap(widthPct)}>
        <span style={TAG}>3a — AreaChart: stacked=true, showMarkers=false, xAxisTitle, yAxisUnit</span>
        <AreaChart
          title="Traffic Sources (Stacked)"
          categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
          series={[
            { name: 'Organic', data: [400, 430, 390, 500, 480] },
            { name: 'Paid',    data: [200, 180, 220, 190, 210] },
            { name: 'Direct',  data: [100, 120,  90, 130, 115] },
          ]}
          zoomable={true}
          highchartsOptions={{
            xAxis: { minRange: 1, startOnTick: false, endOnTick: false },
          }}
          stacked={true}
          xAxisTitle="Day"
          yAxisTitle="Visits"
          yAxisUnit="k"
          showMarkers={false}
        />
        <ul style={CHECK}>
          <li>Areas are <strong>stacked</strong> (total reaches ~700–800)</li>
          <li>No dot markers on the lines</li>
          <li><strong>X-axis</strong>: "Day", <strong>Y-axis</strong>: "Visits" + <strong>k</strong> suffix</li>
        </ul>
      </div>

      {/* ── 3b. AreaChart — percentStacked ───────────────────────────────── */}
      <div style={wrap(widthPct)}>
        <span style={TAG}>3b — AreaChart: percentStacked=true</span>
        <AreaChart
          title="Traffic Sources (% Stacked)"
          categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
          series={[
            { name: 'Organic', data: [400, 430, 390, 500, 480] },
            { name: 'Paid',    data: [200, 180, 220, 190, 210] },
            { name: 'Direct',  data: [100, 120,  90, 130, 115] },
          ]}
          zoomable={true}
          highchartsOptions={{
            xAxis: { minRange: 1, startOnTick: false, endOnTick: false },
          }}
          percentStacked={true}
          xAxisTitle="Day"
          yAxisTitle="Share"
          showMarkers={false}
        />
        <ul style={CHECK}>
          <li>Y-axis goes <strong>0–100</strong> (percent)</li>
          <li>All three areas together always fill to 100%</li>
          <li>Each segment shows relative proportion, not absolute values</li>
        </ul>
      </div>

      {/* ── 4. BarChart — horizontal + showDataLabels ─────────────────────── */}
      <div style={wrap(widthPct)}>
        <span style={TAG}>4 — BarChart: xAxisTitle, yAxisUnit, plotLine, plotBand, showDataLabels</span>
        <BarChart
          title="Top Machines by Downtime"
          categories={['Machine A', 'Machine B', 'Machine C', 'Machine D', 'Machine E']}
          series={[{ name: 'Downtime', data: [2.1, 4.5, 1.8, 6.2, 3.3] }]}
          zoomable={true}
          xAxisTitle="Machine"
          yAxisTitle="Hours"
          yAxisUnit="h"
          plotLines={[{ value: 4, label: 'Alert threshold', labelAlign: 'right' }]}
          plotBands={[{ from: 4, to: 8, color: 'rgba(239,68,68,0.1)' }]}
          showDataLabels={true}
        />
        <ul style={CHECK}>
          <li>Horizontal bars (machines on Y-axis, hours on X-axis)</li>
          <li><strong>X-axis</strong>: "Hours", tick labels end in <strong>h</strong></li>
          <li>Dashed line at 4 labelled <strong>Alert threshold</strong> (right)</li>
          <li>Light red shaded band from 4 to 8</li>
          <li>Data labels visible at end of each bar</li>
        </ul>
      </div>

      {/* ── 5. ColumnChart — highchartsOptions escape hatch ─────────────── */}
      <div style={wrap(widthPct)}>
        <span style={TAG}>5 — ColumnChart: highchartsOptions escape hatch (tooltip suffix + borderRadius)</span>
        <ColumnChart
          title="Custom Tooltip"
          categories={['Q1', 'Q2', 'Q3', 'Q4']}
          series={[{ name: 'Sales', data: [120, 145, 98, 160] }]}
          highchartsOptions={{
            chart: { zooming: { type: 'x' } },
            xAxis: { minRange: 1, startOnTick: false, endOnTick: false },
            tooltip: { valueSuffix: ' units', shared: true },
            plotOptions: { column: { borderRadius: 6 } },
          }}
        />
        <ul style={CHECK}>
          <li>Hover any column — tooltip shows value followed by <strong>" units"</strong></li>
          <li>Columns have <strong>rounded top corners</strong> (borderRadius 6)</li>
          <li>Faclon theme still applies (colors, font, grid)</li>
        </ul>
      </div>

      {/* ── 6. PieChart — basic ──────────────────────────────────────────── */}
      <div style={wrap(widthPct)}>
        <span style={TAG}>6 — PieChart: basic slices, custom slice color, Faclon tooltip</span>
        <PieChart
          title="Revenue Split"
          data={[
            { name: 'Product A', y: 45 },
            { name: 'Product B', y: 30 },
            { name: 'Product C', y: 25, color: '#e9690c' },
          ]}
          showLegend
        />
        <ul style={CHECK}>
          <li>Three slices render with correct proportions (45 / 30 / 25)</li>
          <li>Product C slice is <strong>orange (#e9690c)</strong></li>
          <li>Hover a slice — Faclon styled tooltip (dark bg, rounded corners)</li>
          <li>Legend shows all three names</li>
        </ul>
      </div>

      {/* ── 7. PieChart — donut mode ─────────────────────────────────────── */}
      <div style={wrap(widthPct)}>
        <span style={TAG}>7 — PieChart: donut mode + data labels</span>
        <PieChart
          title="Donut"
          donut
          innerSize="60%"
          data={[
            { name: 'Done', y: 70 },
            { name: 'Pending', y: 30 },
          ]}
          showDataLabels
          dataLabelFormat="{point.name}: {point.percentage:.1f}%"
        />
        <ul style={CHECK}>
          <li>Center hole is visible (60% innerSize)</li>
          <li>Data labels show <strong>"Done: 70.0%"</strong> and <strong>"Pending: 30.0%"</strong></li>
        </ul>
      </div>

      {/* ── 8. Zoom — wheel + drag (ColumnChart / LineChart / AreaChart) ──── */}
      <div style={wrap(widthPct)}>
        <span style={TAG}>8 — Zoom: mouse-wheel in/out + drag-to-zoom + reset (ColumnChart)</span>
        <p style={{ margin: '0 0 12px', fontSize: 12, color: '#6b7280' }}>
          Two-finger scroll <strong>down → zoom in</strong>, scroll <strong>up → zoom out</strong> on X axis. Click-drag also selects a range to zoom.
        </p>
        <ColumnChart
          title="Monthly Revenue — Wheel + Drag Zoom"
          categories={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']}
          series={[
            { name: 'Product A', data: [42, 85, 60, 92, 75, 88, 70, 95, 65, 80, 55, 78] },
            { name: 'Product B', data: [30, 55, 70, 45, 60, 72, 50, 68, 40, 62, 48, 58] },
          ]}
          zoomable
          xAxisTitle="Month"
          yAxisTitle="Revenue"
          yAxisUnit="k"
          showLegend
        />
        <ul style={CHECK}>
          <li>Two-finger scroll down → <strong>zooms in</strong> on X axis; scroll up → <strong>zooms out</strong></li>
          <li>Click and drag across columns → blue selection box → <strong>zooms to range</strong></li>
          <li><strong>Reset zoom</strong> button appears after any zoom action</li>
        </ul>
      </div>

      <div style={wrap(widthPct)}>
        <span style={TAG}>8b — Zoom: LineChart + AreaChart wheel zoom</span>
        <p style={{ margin: '0 0 12px', fontSize: 12, color: '#6b7280' }}>
          Same wheel + drag zoom on LineChart and AreaChart.
        </p>
        <LineChart
          title="Server Latency — Wheel Zoom"
          categories={['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00']}
          series={[{ name: 'p99', data: [12, 14, 18, 22, 45, 38, 30, 28, 22, 18, 15, 13] }]}
          zoomable
          smooth
          xAxisTitle="Time"
          yAxisTitle="Latency"
          yAxisUnit="ms"
        />
        <div style={{ marginTop: 16 }}>
          <AreaChart
            title="Traffic Sources — Wheel Zoom"
            categories={['Mon','Tue','Wed','Thu','Fri','Sat','Sun']}
            series={[
              { name: 'Organic', data: [400, 430, 390, 500, 480, 320, 290] },
              { name: 'Paid',    data: [200, 180, 220, 190, 210, 150, 130] },
            ]}
            zoomable
            xAxisTitle="Day"
            yAxisTitle="Visits"
            yAxisUnit="k"
            showLegend
          />
        </div>
        <ul style={CHECK}>
          <li>Both charts respond to two-finger scroll <strong>in/out on X axis</strong></li>
          <li>Reset zoom button appears after zooming</li>
        </ul>
      </div>

      <div style={wrap(widthPct)}>
        <span style={TAG}>8c — Zoom disabled: zoomable=false (ColumnChart)</span>
        <ColumnChart
          title="No Zoom"
          zoomable={false}
          categories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
          series={[{ name: 'Sales', data: [10, 20, 15, 30, 25] }]}
        />
        <ul style={CHECK}>
          <li>Two-finger scroll and drag — <strong>no zoom, no selection box</strong></li>
        </ul>
      </div>

      {/* ── 9. ActivityGauge — interop ───────────────────────────────────── */}
      <div style={wrap(widthPct)}>
        <span style={TAG}>9 — ActivityGauge: concentric rings, no console errors</span>
        <ActivityGauge
          title="Activity"
          activities={[
            { name: 'CPU', value: 75 },
            { name: 'Memory', value: 50 },
          ]}
        />
        <ul style={CHECK}>
          <li>Two concentric rings render (CPU outer, Memory inner)</li>
          <li>Values shown as arc fill (75% and 50%)</li>
          <li>No console errors</li>
        </ul>
      </div>

      {/* ── 10a. LineChart — native scrollable prop ───────────────────────── */}
      <div style={wrap(widthPct)}>
        <span style={TAG}>10a — LineChart: scrollable=true, scrollableMinWidth=1500 (60 pts)</span>
        <div style={{ maxWidth: 600 }}>
          <LineChart
            title="Hourly Readings — 60 hrs"
            categories={Array.from({ length: 60 }, (_, i) => `${String(Math.floor(i / 24) + 1).padStart(2, '0')}d ${String(i % 24).padStart(2, '0')}:00`)}
            series={[
              { name: 'Sensor A', data: Array.from({ length: 60 }, (_, i) => +(20 + 8 * Math.sin(i / 5) + Math.random() * 2).toFixed(1)) },
              { name: 'Sensor B', data: Array.from({ length: 60 }, (_, i) => +(30 + 6 * Math.cos(i / 4) + Math.random() * 2).toFixed(1)) },
            ]}
            xAxisTitle="Time"
            yAxisTitle="Temperature"
            yAxisUnit="°C"
            smooth
            showLegend
            scrollable
            scrollableMinWidth={1500}
          />
        </div>
        <ul style={CHECK}>
          <li><strong>Only the plot area scrolls</strong> — legend, axis titles, header stay pinned</li>
          <li>Scrollbar appears inside the 600px container; all 60 points reachable</li>
        </ul>
      </div>

      {/* ── 10b. ColumnChart — native scrollable prop ────────────────────── */}
      <div style={wrap(widthPct)}>
        <span style={TAG}>10b — ColumnChart: scrollable=true, scrollableMinWidth=1500 (24 months)</span>
        <div style={{ maxWidth: 600 }}>
          <ColumnChart
            title="Monthly Revenue — 2 Years"
            categories={Array.from({ length: 24 }, (_, i) => {
              const d = new Date(2023, i, 1);
              return `${d.toLocaleString('en', { month: 'short' })} '${String(d.getFullYear()).slice(2)}`;
            })}
            series={[
              { name: 'Product A', data: Array.from({ length: 24 }, (_, i) => Math.round(40 + 30 * Math.sin(i / 6 + 1) + i * 0.8)) },
              { name: 'Product B', data: Array.from({ length: 24 }, (_, i) => Math.round(25 + 20 * Math.cos(i / 5) + i * 0.5)) },
            ]}
            xAxisTitle="Month"
            yAxisTitle="Revenue"
            yAxisUnit="k"
            colors={['#6366f1', '#22c55e']}
            showLegend
            scrollable
            scrollableMinWidth={1500}
          />
        </div>
        <ul style={CHECK}>
          <li><strong>Only the columns scroll</strong> — legend bottom, y-axis, and title stay static</li>
          <li>24 columns fit across a 1500px plot area inside a 600px card</li>
        </ul>
      </div>

    </div>
  );
}
