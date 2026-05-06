# Faclon Design SDK — Charts Integration Notes

> Audited against `@faclon-labs/design-sdk` v0.5.0 (local file install).
> Test file: `src/components/ChartsGallery.jsx`
> Last updated: 2026-04-30

---

## Overview

The SDK ships two chart engines under the hood:

| Engine | Chart types |
|---|---|
| **Highcharts** | AreaChart, BarChart, ColumnChart, LineChart, ActivityGauge, SeriesGauge |
| **ApexCharts** | CircleGauge, RadialBar, SemiCircleGauge, StrokedCircularGauge |

All chart components share a common chrome API (`title`, `duration`, `actions`) and are self-contained — no chart-specific CSS import is needed beyond the global `@faclon-labs/design-sdk/styles.css`.

---

## ChartActions

Companion component that renders a row of icon buttons in the chart header.

```jsx
import { ChartActions } from '@faclon-labs/design-sdk';

<ChartActions
  onInfoClick={fn}       // (i) info icon
  onSettingsClick={fn}   // gear icon
  onMoreClick={fn}       // … ellipsis icon
/>
```

- All three handlers are optional — only pass the ones you want rendered.
- Pass as the `actions` prop on any chart component.

---

## Axis Charts (Highcharts)

All four axis charts share the same core props:

| Prop | Type | Notes |
|---|---|---|
| `title` | string | Chart header title |
| `duration` | string | Subtitle / date range label |
| `actions` | ReactNode | Typically `<ChartActions />` |
| `series` | `{ name: string; data: number[] }[]` | Required |
| `categories` | `string[]` | X-axis labels, must match series data length |
| `showLegend` | boolean | |
| `showMarkers` | boolean | Dots on data points |
| `showDataLabels` | boolean | Value labels on each point |
| `smooth` | boolean | Curves (AreaChart, LineChart) |
| `stacked` | boolean | Stacked series (AreaChart, ColumnChart) |
| `percentStacked` | boolean | 100 % stacked (AreaChart) |
| `scrollable` | boolean | Enables horizontal scroll |
| `scrollableMinWidth` | number | Pixel width before scroll kicks in |
| `onPointClick` | `(ctx: ChartPointClickContext) => void` | Click handler |

**`ChartPointClickContext` shape:**
```ts
{
  category:    string;   // X-axis label
  seriesName:  string;   // series.name
  value:       number;   // Y value
  pointIndex:  number;   // index within the series
  seriesIndex: number;   // index of the series
}
```

---

### AreaChart

```jsx
import { AreaChart } from '@faclon-labs/design-sdk';

<AreaChart
  title="Energy Output"
  duration="Jan – Dec 2025"
  actions={<ChartActions onMoreClick={fn} />}
  series={[
    { name: 'Solar', data: [420, 380, 510, ...] },
    { name: 'Wind',  data: [310, 420, 390, ...] },
  ]}
  categories={['Jan', 'Feb', 'Mar', ...]}
  showLegend
  showMarkers
  smooth
  stacked           // or percentStacked
  scrollable
  scrollableMinWidth={1200}
  onPointClick={fn}
/>
```

**Variants tested:**
- Basic (markers, legend)
- Smooth + stacked
- 100 % stacked (`percentStacked`)
- Scrollable (`scrollable` + `scrollableMinWidth`)

**Notes:** `stacked` and `percentStacked` are mutually exclusive. `smooth` works with both. `scrollable` is independent of stacking.

---

### LineChart

```jsx
import { LineChart } from '@faclon-labs/design-sdk';

<LineChart
  title="Boiler Temps"
  duration="Jan – Dec 2025"
  series={TEMP_SERIES}
  categories={MONTHS}
  showLegend
  showMarkers
  smooth
  showDataLabels
  onPointClick={fn}
/>
```

**Variants tested:**
- Basic with markers
- Smooth with data labels

**Notes:** `smooth` and `showMarkers` compose cleanly. Data labels can get crowded with dense series — consider using only for 1–2 series.

---

### ColumnChart

Vertical bar chart.

```jsx
import { ColumnChart } from '@faclon-labs/design-sdk';

<ColumnChart
  title="Quarterly Downtime"
  duration="2025"
  series={DOWNTIME_SERIES}
  categories={MONTHS}
  showLegend
  showDataLabels
  stacked
  scrollable
  scrollableMinWidth={1000}
  onPointClick={fn}
/>
```

**Variants tested:**
- Grouped (multi-series, side by side)
- Stacked
- Scrollable with many categories

---

### BarChart

Horizontal bar chart. Same props as ColumnChart.

```jsx
import { BarChart } from '@faclon-labs/design-sdk';

<BarChart
  title="Regional Sales"
  duration="2025"
  series={REGION_SERIES}
  categories={REGIONS}
  showLegend
  showDataLabels
  stacked
  onPointClick={fn}
/>
```

**Variants tested:**
- Grouped
- Stacked

**Notes:** Categories are rendered on the Y-axis (left side). `scrollable` is available but less commonly needed since bars expand vertically.

---

## Gauge Charts — Highcharts

### ActivityGauge

Concentric arc gauge, one arc per KPI.

```jsx
import { ActivityGauge } from '@faclon-labs/design-sdk';

<ActivityGauge
  title="System Resource Usage"
  duration="Live"
  actions={<ChartActions onInfoClick={fn} onSettingsClick={fn} onMoreClick={fn} />}
  activities={[
    { name: 'CPU',     value: 73,  max: 100 },
    { name: 'Memory',  value: 4.8, max: 8   },
    { name: 'Disk I/O',value: 240, max: 500  },
    { name: 'Network', value: 18,  max: 100  },
  ]}
  showLegend
/>
```

**Props:**

| Prop | Type | Notes |
|---|---|---|
| `activities` | `{ name, value, max }[]` | Each becomes one arc |
| `showLegend` | boolean | |

**Notes:** `value` is in whatever unit makes sense; percentage fill is computed as `value / max`. No `onPointClick` — arcs are display only.

---

### SeriesGauge

Speedometer-style dial gauge with colored bands.

```jsx
import { SeriesGauge } from '@faclon-labs/design-sdk';

<SeriesGauge
  title="Turbine Load"
  duration="Live"
  actions={<ChartActions onMoreClick={fn} />}
  value={67}
  min={0}
  max={100}
  unit="%"
  bands={[
    { from: 0,  to: 40,  color: '#22c55e' },
    { from: 40, to: 75,  color: '#f59e0b' },
    { from: 75, to: 100, color: '#ef4444' },
  ]}
/>
```

**Props:**

| Prop | Type | Notes |
|---|---|---|
| `value` | number | Current reading |
| `min` | number | Scale minimum |
| `max` | number | Scale maximum |
| `unit` | string | Displayed after the value |
| `bands` | `{ from, to, color }[]` | Colored arc segments |

**Reactivity:** `value` is a controlled prop — updating it animates the needle. Confirmed with live range-slider demo.

---

## Gauge Charts — ApexCharts

### CircleGauge

Full-circle radial gauge, single value.

```jsx
import { CircleGauge } from '@faclon-labs/design-sdk';

<CircleGauge
  title="OEE Score"
  duration="Shift average"
  actions={<ChartActions onInfoClick={fn} />}
  value={84}
  label="Overall"
/>
```

**Props:**

| Prop | Type | Notes |
|---|---|---|
| `value` | number | 0–100 |
| `label` | string | Center text label |

---

### RadialBar

Multi-series radial bar, one ring per series.

```jsx
import { RadialBar } from '@faclon-labs/design-sdk';

<RadialBar
  title="Production KPIs"
  duration="This week"
  actions={<ChartActions onInfoClick={fn} onMoreClick={fn} />}
  series={[92, 78, 65, 88]}
  labels={['Availability', 'Performance', 'Quality', 'Safety']}
  showLabels
/>
```

**Props:**

| Prop | Type | Notes |
|---|---|---|
| `series` | `number[]` | One value per ring (0–100) |
| `labels` | `string[]` | Must match `series` length |
| `showLabels` | boolean | Shows label text on each ring |

---

### SemiCircleGauge

Half-circle gauge, single value.

```jsx
import { SemiCircleGauge } from '@faclon-labs/design-sdk';

<SemiCircleGauge
  title="Plant Efficiency"
  duration="Today"
  actions={<ChartActions onInfoClick={fn} />}
  value={71}
  label="Efficiency"
/>
```

**Props:** Same shape as `CircleGauge` — `value` (0–100) and `label`.

---

### StrokedCircularGauge

Circle gauge with a visible stroke track, single value.

```jsx
import { StrokedCircularGauge } from '@faclon-labs/design-sdk';

<StrokedCircularGauge
  title="Capacity Utilisation"
  duration="MTD"
  actions={<ChartActions onMoreClick={fn} />}
  value={58}
  label="Utilised"
/>
```

**Props:** Same shape as `CircleGauge` — `value` (0–100) and `label`.

---

## Data Shapes Reference

```js
// Axis chart series (AreaChart, LineChart, ColumnChart, BarChart)
const series = [
  { name: 'Series A', data: [10, 20, 30, 40] },
  { name: 'Series B', data: [15, 25, 35, 45] },
];
const categories = ['Q1', 'Q2', 'Q3', 'Q4']; // length must match data[]

// ActivityGauge activities
const activities = [
  { name: 'CPU',    value: 73,  max: 100 },
  { name: 'Memory', value: 4.8, max: 8   },
];

// SeriesGauge bands
const bands = [
  { from: 0,  to: 33,  color: '#22c55e' },
  { from: 33, to: 66,  color: '#f59e0b' },
  { from: 66, to: 100, color: '#ef4444' },
];

// RadialBar
const series = [92, 78, 65];
const labels = ['Availability', 'Performance', 'Quality'];
```

---

## ChartActions — What the buttons actually do

`ChartActions` buttons are **callback-only**. None of the three icons (ⓘ info, ⚙ settings, ☰ more) open any built-in UI. You must build all overlays consumer-side.

| Button | Prop | What SDK provides | What consumer must build |
|---|---|---|---|
| ⓘ Info | `onInfoClick` | Fires callback | Custom tooltip / modal / drawer |
| ⚙ Settings | `onSettingsClick` | Fires callback | Custom settings panel (we used `Switch` toggles in a positioned div) |
| ☰ More/Burger | `onMoreClick` | Fires callback | Custom dropdown (we used `DropdownMenu` + `ActionListItem`) |

### Building the More menu (export + fullscreen)

```jsx
import Highcharts from 'highcharts';
import { DropdownMenu, ActionListItem, ChartActions } from '@faclon-labs/design-sdk';

function downloadSVG(wrapperEl) {
  const chart = Highcharts.charts.find(c => c && wrapperEl?.contains(c.container));
  if (!chart) return;
  const svg = chart.getSVG();
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  Object.assign(document.createElement('a'), { href: url, download: 'chart.svg' }).click();
  URL.revokeObjectURL(url);
}

function ChartMoreMenu({ wrapperRef }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 299 }} onClick={() => setOpen(false)} />
          <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 6px)', zIndex: 300 }}>
            <DropdownMenu>
              <ActionListItem title="Download SVG" onClick={() => { downloadSVG(wrapperRef?.current); setOpen(false); }} />
              <ActionListItem title="View Fullscreen" onClick={() => { wrapperRef?.current?.requestFullscreen(); setOpen(false); }} />
            </DropdownMenu>
          </div>
        </>
      )}
      <ChartActions onMoreClick={() => setOpen(o => !o)} />
    </div>
  );
}
```

### In-chart date range filter (undocumented `filters` slot)

The base `Chart` wrapper has an undocumented `filters` prop that renders a full-width row between the header and the canvas. Pass it via AxisCharts' rest-prop spread:

```jsx
<AreaChart
  filters={
    <DatePicker
      mode="range"
      showPresets
      onChange={({ startDate, endDate }) => console.log(startDate, endDate)}
    />
  }
  // ...other props
/>
```

### Escape hatches for raw Highcharts / ApexCharts options

| Component | Escape hatch prop | Notes |
|---|---|---|
| `ActivityGauge` | `highchartsOptions` | Spread last — overrides any built option |
| `SeriesGauge` | ❌ None | Cannot customise tooltip, pane, etc. |
| `AreaChart`, `LineChart`, `BarChart`, `ColumnChart` | ❌ None | Cannot customise tooltip, crosshair, animation |
| `CircleGauge`, `RadialBar`, `SemiCircleGauge`, `StrokedCircularGauge` | `apexOptions` | Spread last — overrides any built option |

Use `highchartsOptions` / `apexOptions` to enable tooltips, change formatters, add annotations, etc.

```jsx
// ActivityGauge — custom tooltip via escape hatch
<ActivityGauge
  activities={...}
  highchartsOptions={{
    tooltip: {
      backgroundColor: 'rgba(15,23,42,0.9)',
      style: { color: '#f8fafc' },
      formatter() { return `<b>${this.series.name}</b><br/>${this.y.toFixed(1)} %`; },
    },
  }}
/>

// CircleGauge — custom value formatter via apexOptions
<CircleGauge
  value={84}
  apexOptions={{
    tooltip: { enabled: true },
    plotOptions: { radialBar: { dataLabels: { value: { formatter: v => `${v} %` } } } },
  }}
/>
```

---

## Integration Checklist

- [x] CSS imported once in the app root: `import '@faclon-labs/design-sdk/styles.css'`
- [x] `highcharts` + `highcharts-react-official` + `apexcharts` + `react-apexcharts` installed as peer deps
- [x] `resolve.dedupe: ['react', 'react-dom', 'highcharts']` in `vite.config.js`
- [x] Vite 8 `fixHighchartsReactInterop` plugin applied (see SDK_ISSUES.md ISSUE-011)
- [x] All 10 chart types render without errors
- [x] `ChartActions` composes with every chart
- [x] `onPointClick` fires on axis charts — shape: `{ category, seriesName, value, pointIndex, seriesIndex }`
- [x] `SeriesGauge` needle animates on controlled `value` update (confirmed with live slider demo)
- [x] `ActivityGauge` `highchartsOptions` escape hatch confirmed working (custom tooltip)
- [x] ApexCharts `apexOptions` escape hatch confirmed working (tooltip + formatter)
- [x] `filters` slot on axis charts confirmed working (DatePicker renders in chart header row)
- [x] Consumer-built settings panel (Switch toggles) reactively updates all chart options
- [x] Consumer-built export menu downloads SVG via `Highcharts.charts` global registry
- [x] Fullscreen works via `element.requestFullscreen()`

---

## Known Issues / Observations

| # | Component | Observation | Type | Severity |
|---|---|---|---|---|
| 1 | All axis charts | `onPointClick` works — shape: `{ category, seriesName, value, pointIndex, seriesIndex }` | ✅ Works | — |
| 2 | `SeriesGauge` | Needle animates smoothly on reactive `value` changes | ✅ Works | — |
| 3 | `ActivityGauge` | Tooltip customisable via `highchartsOptions` | ✅ Works | — |
| 4 | `ActivityGauge` | No `onPointClick` — arcs are display-only | 🔴 SDK gap | Low |
| 5 | AxisCharts | No `highchartsOptions` escape hatch — tooltip/crosshair not customisable | 🔴 SDK gap | Medium |
| 6 | `ChartActions` | All three buttons are callback-only, no built-in menus or panels | 🔴 SDK gap | Medium |
| 7 | `Chart` | `filters` prop slot works but is completely undocumented | 🔴 Docs gap | Low |
| 8 | `RadialBar` | `showLabels` can overlap on containers < 400 px wide | ⚠️ Observation | Low |
| 9 | All charts | `duration` is a plain string — no date parsing or live update built in | ⚠️ By design | — |
| 10 | Highcharts 12 + Vite 8 | `highcharts-react-official` UMD interop bug — requires workaround plugin | 🔴 SDK gap | Blocker |

---

## File Locations

| File | Purpose |
|---|---|
| `src/components/ChartsGallery.jsx` | Live demo of all chart types, maximally configured |
| `src/App.jsx` | Navigation tab to switch between ProductsTable and ChartsGallery |
| `SDK_ISSUES.md` | SDK bug log with v0.5.0 status |
