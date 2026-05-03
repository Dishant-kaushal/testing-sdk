import React, { useState, useRef, useCallback } from 'react';
import Highcharts from 'highcharts';
import {
  // Axis charts
  AreaChart,
  BarChart,
  ColumnChart,
  LineChart,
  // Gauge — Highcharts
  ActivityGauge,
  SeriesGauge,
  // Gauge — ApexCharts
  CircleGauge,
  RadialBar,
  SemiCircleGauge,
  StrokedCircularGauge,
  // Chart chrome
  ChartActions,
  // Overlay primitives (used to build the More/Settings menus consumer-side)
  DropdownMenu,
  ActionListItem,
  // Form controls
  Switch,
  DatePicker,
} from '@faclon-labs/design-sdk';

// ─── Utilities ────────────────────────────────────────────────────────────────

function downloadSVG(wrapperEl) {
  // Highcharts.charts is a global registry of all active chart instances.
  // We match by checking whether the chart's container lives inside our wrapper.
  const chart = Highcharts.charts.find(c => c && wrapperEl?.contains(c.container));
  if (!chart) { console.warn('[downloadSVG] No Highcharts instance found in wrapper'); return; }
  const svg = chart.getSVG();
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: 'chart.svg' });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function enterFullscreen(wrapperEl) {
  if (!document.fullscreenElement) {
    wrapperEl?.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

function formatRange(start, end) {
  if (!start || !end) return null;
  const fmt = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${fmt(start)} – ${fmt(end)}`;
}

// ─── Shared data ──────────────────────────────────────────────────────────────

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const WEEKS  = ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'];

const ENERGY_SERIES = [
  { name: 'Solar', data: [420,380,510,640,730,890,950,920,780,610,430,360] },
  { name: 'Wind',  data: [310,420,390,280,200,150,130,160,240,350,410,380] },
  { name: 'Grid',  data: [880,760,710,590,480,400,370,410,530,680,820,910] },
];

const REGION_SERIES = [
  { name: 'Q1', data: [340,280,410,190,520,370] },
  { name: 'Q2', data: [390,310,460,220,480,420] },
  { name: 'Q3', data: [450,360,390,310,540,490] },
  { name: 'Q4', data: [510,430,500,280,610,550] },
];
const REGIONS = ['North','South','East','West','Central','Offshore'];

const TEMP_SERIES = [
  { name: 'Boiler A', data: [72,74,78,82,88,85,91,87,84,80,76,73] },
  { name: 'Boiler B', data: [68,70,73,79,84,88,86,90,83,77,71,69] },
  { name: 'Ambient',  data: [22,24,28,33,38,42,45,44,39,33,27,23] },
];

const DOWNTIME_SERIES = [
  { name: 'Planned',   data: [4,2,6,3,5,2,8,4,3,6,2,5] },
  { name: 'Unplanned', data: [1,3,0,2,1,4,0,2,3,1,2,0] },
];

// ─── Settings metadata ────────────────────────────────────────────────────────

const SETTING_META = {
  showLegend:     'Legend',
  showDataLabels: 'Data Labels',
  showMarkers:    'Markers',
  smooth:         'Smooth Curves',
  stacked:        'Stacked',
  percentStacked: '100 % Stacked',
};

// ─── ChartActionsMenu ─────────────────────────────────────────────────────────
// SDK gap: ChartActions buttons fire callbacks only — there are no built-in
// dropdowns or panels. This component builds the menus consumer-side using
// the SDK's DropdownMenu + ActionListItem + Switch primitives.

const PANEL_STYLE = {
  position: 'absolute',
  right: 0,
  top: 'calc(100% + 6px)',
  zIndex: 300,
  background: 'var(--background-surface-default, #fff)',
  border: '1px solid var(--border-gray-subtle, #e5e7eb)',
  borderRadius: 8,
  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
};

function ChartActionsMenu({ wrapperRef, settings, onSettingChange, availableSettings }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const closeAll = useCallback(() => {
    setSettingsOpen(false);
    setMoreOpen(false);
  }, []);

  return (
    <>
      {/* Click-outside backdrop — sits below the panel (z 299) so clicking anywhere else closes */}
      {(settingsOpen || moreOpen) && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 299 }} onClick={closeAll} />
      )}

      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>

        {/* ── Settings panel ── */}
        {settingsOpen && (
          <div style={{ ...PANEL_STYLE, padding: '12px 16px', minWidth: 220 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 10 }}>
              Chart Settings
            </div>
            {availableSettings.map(key => (
              <Switch
                key={key}
                label={SETTING_META[key]}
                isChecked={!!settings[key]}
                showDivider
                onChange={({ checked }) => {
                  // stacked and percentStacked are mutually exclusive
                  if (key === 'stacked' && checked) onSettingChange('percentStacked')(false);
                  if (key === 'percentStacked' && checked) onSettingChange('stacked')(false);
                  onSettingChange(key)(checked);
                }}
              />
            ))}
            <p style={{ fontSize: 11, color: '#9ca3af', margin: '10px 0 0' }}>
              Changes apply immediately
            </p>
          </div>
        )}

        {/* ── More / export dropdown ── */}
        {moreOpen && (
          <div style={{ ...PANEL_STYLE }}>
            <DropdownMenu>
              <ActionListItem
                title="Download SVG"
                onClick={() => { downloadSVG(wrapperRef?.current); closeAll(); }}
              />
              <ActionListItem
                title="View Fullscreen"
                onClick={() => { enterFullscreen(wrapperRef?.current); closeAll(); }}
              />
            </DropdownMenu>
          </div>
        )}

        <ChartActions
          onInfoClick={() => { closeAll(); console.log('[chart] info'); }}
          onSettingsClick={() => { setMoreOpen(false); setSettingsOpen(o => !o); }}
          onMoreClick={() => { setSettingsOpen(false); setMoreOpen(o => !o); }}
        />
      </div>
    </>
  );
}

// ─── ControlledAxisChart ──────────────────────────────────────────────────────
// Generic controlled wrapper for any axis chart. Provides:
//  • Settings panel  (⚙ icon → live prop toggles via Switch)
//  • Export/fullscreen menu  (☰ icon → DropdownMenu with download + fullscreen)
//  • In-chart date range filter  (DatePicker in Chart's `filters` slot)
// All state is local; changes re-render the chart reactively via Highcharts update.

const DEFAULT_SETTINGS = {
  showLegend: true,
  showDataLabels: false,
  showMarkers: false,
  smooth: false,
  stacked: false,
  percentStacked: false,
};

function ControlledAxisChart({
  ChartComponent,
  title,
  defaultDuration,
  series,
  categories,
  initialSettings = {},
  availableSettings = ['showLegend', 'showDataLabels', 'showMarkers'],
  extraProps = {},
}) {
  const wrapperRef = useRef(null);
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS, ...initialSettings });
  const [duration, setDuration] = useState(defaultDuration);

  const onSettingChange = useCallback(
    (key) => (val) => setSettings(s => ({ ...s, [key]: val })),
    []
  );

  return (
    <div ref={wrapperRef}>
      <ChartComponent
        title={title}
        duration={duration}
        actions={
          <ChartActionsMenu
            wrapperRef={wrapperRef}
            settings={settings}
            onSettingChange={onSettingChange}
            availableSettings={availableSettings}
          />
        }
        // `filters` is an undocumented slot on the base Chart wrapper that renders
        // a row below the header. Any ReactNode works here — we use DatePicker.
        filters={
          <DatePicker
            mode="range"
            showPresets
            onChange={({ startDate, endDate }) =>
              setDuration(formatRange(startDate, endDate) ?? defaultDuration)
            }
          />
        }
        series={series}
        categories={categories}
        showLegend={settings.showLegend}
        showDataLabels={settings.showDataLabels}
        showMarkers={settings.showMarkers}
        smooth={settings.smooth}
        stacked={settings.stacked}
        percentStacked={settings.percentStacked}
        onPointClick={ctx => console.log('[point click]', ctx)}
        {...extraProps}
      />
    </div>
  );
}

// ─── Section layout ───────────────────────────────────────────────────────────

function Section({ title, note, children }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <div style={{ marginBottom: 24, paddingBottom: 8, borderBottom: '2px solid var(--border-gray-subtle,#e5e7eb)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-gray-primary,#111)', margin: 0 }}>
          {title}
        </h2>
        {note && (
          <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4, marginBottom: 0 }}>{note}</p>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(540px, 1fr))', gap: 24 }}>
        {children}
      </div>
    </section>
  );
}

// ─── Gauge demos — Highcharts ─────────────────────────────────────────────────

function ActivityGaugeDemo() {
  const wrapperRef = useRef(null);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div ref={wrapperRef}>
      {moreOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 299 }} onClick={() => setMoreOpen(false)} />
      )}
      <ActivityGauge
        title="System Resource Usage"
        duration="Live"
        actions={
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            {moreOpen && (
              <div style={{ ...PANEL_STYLE }}>
                <DropdownMenu>
                  <ActionListItem title="Download SVG" onClick={() => { downloadSVG(wrapperRef?.current); setMoreOpen(false); }} />
                  <ActionListItem title="View Fullscreen" onClick={() => { enterFullscreen(wrapperRef?.current); setMoreOpen(false); }} />
                </DropdownMenu>
              </div>
            )}
            <ChartActions
              onInfoClick={() => console.log('[activity gauge] info')}
              onSettingsClick={() => console.log('[activity gauge] settings')}
              onMoreClick={() => setMoreOpen(o => !o)}
            />
          </div>
        }
        activities={[
          { name: 'CPU',      value: 73,  max: 100 },
          { name: 'Memory',   value: 4.8, max: 8   },
          { name: 'Disk I/O', value: 240, max: 500  },
          { name: 'Network',  value: 18,  max: 100  },
        ]}
        showLegend
        // highchartsOptions escape hatch — only ActivityGauge exposes this.
        // AxisCharts (AreaChart, LineChart, BarChart, ColumnChart) have no equivalent.
        highchartsOptions={{
          tooltip: {
            backgroundColor: 'rgba(15,23,42,0.92)',
            borderWidth: 0,
            shadow: false,
            style: { color: '#f8fafc', fontSize: '13px' },
            useHTML: true,
            formatter() { return `<b>${this.series.name}</b><br/>${this.y.toFixed(1)} %`; },
          },
        }}
      />
    </div>
  );
}

function LiveSeriesGaugeDemo() {
  const [value, setValue] = useState(67);
  return (
    <div>
      <SeriesGauge
        title="Live Turbine Load"
        duration="Simulated"
        actions={<ChartActions onInfoClick={() => console.log('info')} />}
        value={value}
        min={0}
        max={100}
        unit="%"
        label="Load"
        bands={[
          { from: 0,  to: 40,  color: '#22c55e' },
          { from: 40, to: 75,  color: '#f59e0b' },
          { from: 75, to: 100, color: '#ef4444' },
        ]}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12, padding: '0 16px' }}>
        <input
          type="range" min={0} max={100} value={value}
          onChange={e => setValue(Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <span style={{ minWidth: 48, fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
          {value} %
        </span>
      </div>
    </div>
  );
}

// ─── Gauge demos — ApexCharts ─────────────────────────────────────────────────

function CircleGaugeDemo() {
  return (
    <CircleGauge
      title="OEE Score"
      duration="Shift average"
      actions={<ChartActions onInfoClick={() => console.log('info')} />}
      value={84}
      label="Overall"
      hollowSize="65%"
      apexOptions={{
        tooltip: { enabled: true },
        plotOptions: {
          radialBar: {
            dataLabels: { value: { formatter: v => `${v} %` } },
          },
        },
      }}
    />
  );
}

function RadialBarDemo() {
  return (
    <RadialBar
      title="Production KPIs"
      duration="This week"
      actions={<ChartActions onInfoClick={() => console.log('info')} onMoreClick={() => console.log('more')} />}
      series={[92, 78, 65, 88]}
      labels={['Availability', 'Performance', 'Quality', 'Safety']}
      showLabels
      apexOptions={{ tooltip: { enabled: true } }}
    />
  );
}

function SemiCircleGaugeDemo() {
  return (
    <SemiCircleGauge
      title="Plant Efficiency"
      duration="Today"
      actions={<ChartActions onInfoClick={() => console.log('info')} />}
      value={71}
      label="Efficiency"
      apexOptions={{
        tooltip: { enabled: true },
        plotOptions: {
          radialBar: {
            dataLabels: { value: { formatter: v => `${v} %` } },
          },
        },
      }}
    />
  );
}

function StrokedCircularGaugeDemo() {
  return (
    <StrokedCircularGauge
      title="Capacity Utilisation"
      duration="MTD"
      actions={<ChartActions onMoreClick={() => console.log('more')} />}
      value={58}
      label="Utilised"
      apexOptions={{ tooltip: { enabled: true } }}
    />
  );
}

// ─── Gallery page ─────────────────────────────────────────────────────────────

export default function ChartsGallery() {
  return (
    <div style={{ padding: '32px 24px', maxWidth: 1400, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Charts Integration Gallery</h1>
      <p style={{ color: 'var(--text-gray-secondary,#6b7280)', marginBottom: 12 }}>
        All SDK chart components with maximum prop coverage.
      </p>
      <div style={{
        background: '#fef9c3', border: '1px solid #fde047', borderRadius: 6,
        padding: '8px 12px', marginBottom: 32, fontSize: 13, color: '#713f12',
      }}>
        <strong>Controls:</strong> ⚙ settings icon → live chart-option toggles &nbsp;|&nbsp;
        ☰ burger icon → Download SVG / Fullscreen &nbsp;|&nbsp;
        Date picker → filters slot (updates duration label) &nbsp;|&nbsp;
        Hover data points → built-in Highcharts tooltip
      </div>

      <Section
        title="Area Chart"
        note="Props: series, categories, stacked, percentStacked, smooth, showMarkers, showLegend, showDataLabels, scrollable, scrollableMinWidth, onPointClick, filters (Chart slot)"
      >
        <ControlledAxisChart
          ChartComponent={AreaChart}
          title="Energy Output — Monthly"
          defaultDuration="Jan – Dec 2025"
          series={ENERGY_SERIES}
          categories={MONTHS}
          initialSettings={{ showLegend: true, showMarkers: true }}
          availableSettings={['showLegend','showDataLabels','showMarkers','smooth','stacked','percentStacked']}
        />
        <ControlledAxisChart
          ChartComponent={AreaChart}
          title="Energy Output — Scrollable"
          defaultDuration="12-week window"
          series={[
            { name: 'Solar', data: [310,340,290,380,420,460,440,410,390,350,320,300] },
            { name: 'Wind',  data: [180,210,230,200,170,160,190,220,250,230,200,190] },
          ]}
          categories={WEEKS}
          initialSettings={{ showLegend: true, smooth: true }}
          availableSettings={['showLegend','showDataLabels','showMarkers','smooth']}
          extraProps={{ scrollable: true, scrollableMinWidth: 1200 }}
        />
      </Section>

      <Section
        title="Line Chart"
        note="Props: series, categories, smooth, showMarkers, showLegend, showDataLabels, scrollable, onPointClick, filters (Chart slot)"
      >
        <ControlledAxisChart
          ChartComponent={LineChart}
          title="Boiler Temperature — Monthly Avg"
          defaultDuration="Jan – Dec 2025"
          series={TEMP_SERIES}
          categories={MONTHS}
          initialSettings={{ showLegend: true, showMarkers: true }}
          availableSettings={['showLegend','showDataLabels','showMarkers','smooth']}
        />
        <ControlledAxisChart
          ChartComponent={LineChart}
          title="Boiler Temperature — Smooth"
          defaultDuration="Jan – Dec 2025"
          series={TEMP_SERIES}
          categories={MONTHS}
          initialSettings={{ showLegend: true, smooth: true }}
          availableSettings={['showLegend','showDataLabels','showMarkers','smooth']}
        />
      </Section>

      <Section
        title="Column Chart (Vertical Bars)"
        note="Props: series, categories, stacked, showLegend, showDataLabels, scrollable, scrollableMinWidth, onPointClick, filters (Chart slot)"
      >
        <ControlledAxisChart
          ChartComponent={ColumnChart}
          title="Quarterly Downtime by Type"
          defaultDuration="2025"
          series={DOWNTIME_SERIES}
          categories={MONTHS}
          initialSettings={{ showLegend: true, showDataLabels: true }}
          availableSettings={['showLegend','showDataLabels','stacked']}
        />
        <ControlledAxisChart
          ChartComponent={ColumnChart}
          title="Regional Sales — Scrollable"
          defaultDuration="2025"
          series={REGION_SERIES}
          categories={REGIONS}
          initialSettings={{ showLegend: true }}
          availableSettings={['showLegend','showDataLabels','stacked']}
          extraProps={{ scrollable: true, scrollableMinWidth: 1000 }}
        />
      </Section>

      <Section
        title="Bar Chart (Horizontal Bars)"
        note="Props: series, categories, stacked, showLegend, showDataLabels, onPointClick, filters (Chart slot)"
      >
        <ControlledAxisChart
          ChartComponent={BarChart}
          title="Regional Sales by Quarter"
          defaultDuration="2025"
          series={REGION_SERIES}
          categories={REGIONS}
          initialSettings={{ showLegend: true, showDataLabels: true }}
          availableSettings={['showLegend','showDataLabels','stacked']}
        />
        <ControlledAxisChart
          ChartComponent={BarChart}
          title="Regional Sales — Stacked"
          defaultDuration="2025"
          series={REGION_SERIES}
          categories={REGIONS}
          initialSettings={{ showLegend: true, stacked: true }}
          availableSettings={['showLegend','showDataLabels','stacked']}
        />
      </Section>

      <Section
        title="Gauge Charts — Highcharts"
        note="ActivityGauge: activities[], showLegend, highchartsOptions escape hatch (tooltip customised). SeriesGauge: value, min, max, unit, label, bands[]. Live slider demo confirms reactive value prop."
      >
        <ActivityGaugeDemo />
        <LiveSeriesGaugeDemo />
      </Section>

      <Section
        title="Gauge Charts — ApexCharts"
        note="All four accept apexOptions escape hatch. tooltip enabled via apexOptions. hollowSize on CircleGauge. showLabels on RadialBar."
      >
        <CircleGaugeDemo />
        <RadialBarDemo />
        <SemiCircleGaugeDemo />
        <StrokedCircularGaugeDemo />
      </Section>
    </div>
  );
}
