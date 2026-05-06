# Faclon Design SDK — Issue Log

> Logged during ProductsTable + ChartsGallery integration tests (2026-04-27 → 2026-05-01).
> Each issue includes: what broke, who is affected, and what the fix is.
> Last status check: v0.5.0 (2026-05-01).
>
> **Categorisation key**
> - 🔴 **SDK Issue** — root cause is inside the SDK package; fix must come from the SDK team
> - 🟡 **Consumer / Integration issue** — caused by how the consumer app is set up; fixable without SDK changes

---

## ISSUE-001 · Table component missing from npm package

**Severity:** Blocker  
**Status:** ✅ Fixed in v0.5.0 — Table and all related components now ship in the npm package  
**Affects:** Everyone trying to `npm install @faclon-labs/design-sdk` and use Table

### What happened
`@faclon-labs/design-sdk@0.4.0` (latest on npm) does not export any Table-related
components (`Table`, `TableBody`, `TableHeader`, `TableHeaderCell`, `TableRow`,
`TableCell`, `TablePagination`, `TableToolbar`, `TableSkeleton`, `TableEmptyState`,
`TableRowActions`, `CellText`, `CellBadges`, `CellStatus`, `CellIcon`, `SearchInput`).
Importing any of them produces:

```
export 'Table' (imported as 'Table') was not found in '@faclon-labs/design-sdk'
```

### Root cause
The Table component exists in the source (`src/components/data-display/Table/`)
but was never included in the npm publish. The build and publish happened before
the Table was complete.

### Fix required (SDK team)
Publish a new npm version that includes the Table build output.

---

## ISSUE-002 · Duplicate React instance — Invalid hook call crash

**Severity:** Blocker  
**Status:** ⚠️ Still present in v0.5.0 — dist still contains `dist/node_modules/.pnpm/…` baked paths. Vite `resolve.dedupe` workaround remains required.  
**Affects:** Everyone using the SDK via a local `file:` path or `npm link` with a
**webpack-based** app (CRA, Next.js pages router, Vite apps are NOT affected if
`resolve.dedupe` is set)

### What happened
```
react.development.js: Invalid hook call.
Cannot read properties of null (reading 'useRef')
    at Ke (Table.js:56)
```
The page renders blank. No table appears.

### Root cause
The SDK is built with Vite + `preserveModules: true` in a **pnpm workspace**.
Vite resolves `@table-library/react-table-library` through pnpm's virtual store
and bakes **relative paths** to `dist/node_modules/.pnpm/…` into the built output.

When the SDK is installed via `file:` (which npm symlinks), webpack follows the
symlink to the real path on disk and resolves `react` from the SDK's own
`node_modules/react` — a **second React instance** separate from the host app's
React. Two React instances = hooks dispatcher mismatch = crash.

Webpack `resolve.alias` cannot intercept this because the pnpm-nested files are
found by node_modules walking **before** the alias fires.

### Workaround (consumer)
Switch the host app from CRA/webpack to **Vite** and set:

```js
// vite.config.js
resolve: {
  dedupe: ['react', 'react-dom', '@table-library/react-table-library'],
}
```

`resolve.dedupe` is Vite's built-in solution for exactly this scenario — it forces
all copies of the listed packages to resolve to the single instance in the host
app's `node_modules`.

### Fix required (SDK team)
Two options:
- **Option A:** Add `@table-library/react-table-library` to `rollupOptions.external`
  in `vite.config.ts`. Consumers install it as a peer dep. Eliminates the pnpm
  path problem entirely.
- **Option B:** Keep it bundled but use `rollup-plugin-node-resolve` with
  `dedupe: ['react']` so the built output doesn't carry a separate React reference.

---

## ISSUE-003 · Highcharts ESM resolution breaks webpack 5 / CRA

**Severity:** High  
**Status:** ✅ Fixed in v0.5.0 — `.js` extensions added to all Highcharts ESM imports (`highcharts/esm/highcharts.js` etc.)  
**Affects:** Everyone using the SDK in a **CRA or webpack 5** app

### What happened
```
Module not found: Error: Can't resolve 'highcharts/esm/highcharts'
BREAKING CHANGE: The request failed to resolve only because it was resolved as
fully specified (strict EcmaScript Module).
```

### Root cause
The SDK's chart components (`ActivityGauge`, `SeriesGauge`) import:
```js
import 'highcharts/esm/highcharts'
import 'highcharts/esm/highcharts-more'
import 'highcharts/esm/modules/solid-gauge'
```
Without the `.js` extension. Webpack 5 with strict ESM mode (`"type": "module"`)
requires fully specified paths (with extension). Highcharts v12 ships as ESM and
webpack cannot auto-resolve the extension.

### Workaround (consumer — CRA/webpack)
Add a webpack rule via `react-app-rewired` / `craco`:
```js
config.module.rules.push({
  test: /\.m?js$/,
  resolve: { fullySpecified: false },
});
```

### Fix required (SDK team)
Either:
- Add `highcharts/esm/highcharts`, `highcharts/esm/highcharts-more`,
  `highcharts/esm/modules/solid-gauge` to `rollupOptions.external` in
  `vite.config.ts` (they already list `"highcharts"` but not the ESM sub-paths).
- Or add `.js` extensions to those imports in the chart source files.

---

## ISSUE-004 · `TableEmptyState` dist renders bare `<div>` instead of `<tr><td>`

**Severity:** Medium  
**Status:** ✅ Fixed in v0.5.0 — dist now ships the full implementation with `asCell` defaulting to `true`. Our manual `<tr><td>` wrapper in `ProductsTable.jsx` can be removed.  
**Affects:** Everyone — causes React hydration warning and broken layout

### What happened
```
In HTML, <div> cannot be a child of <tbody>. This will cause a hydration error.
```

### Root cause
The **built dist** (`dist/components/data-display/Table/TableEmptyState.js`) is an
old stub that only renders:
```js
function r({ children }) {
  return <div className="fds-table__empty-state">{children}</div>;
}
```
The **source** (`src/…/TableEmptyState.tsx`) has the full implementation with
`asCell={true}` defaulting to wrapping in `<tr><td colSpan={…}>`, but this newer
source was never rebuilt and published.

### Workaround (consumer)
Wrap `<TableEmptyState>` manually:
```jsx
<tr>
  <td colSpan={9}>
    <TableEmptyState title="…" description="…" />
  </td>
</tr>
```

### Fix required (SDK team)
Rebuild and publish. The source is already correct — this is purely a stale dist.

---

## ISSUE-005 · `key` prop warning from internal TableBody rendering

**Severity:** Low (console warning only, no functional impact)  
**Status:** ⚠️ Unverified in v0.5.0 — `TableBody` source has no explicit list renders; warning may originate from `@table-library/react-table-library` internals. Monitor console on next test run.  
**Affects:** Everyone

### What happened
```
Each child in a list should have a unique "key" prop.
Check the render method of `div`. It was passed a child from O.
```

### Root cause
The minified SDK dist's `TableBody` (or an internal list renderer) renders children
without stable `key` props in at least one code path. The warning comes from inside
the SDK bundle, not consumer code.

### Fix required (SDK team)
Add `key` props to the internal list render inside `TableBody` / the relevant
internal component.

---

## ISSUE-006 · Action column dropdown clipped by table overflow

**Severity:** Medium  
**Status:** ✅ Fixed in v0.5.0 — `TableRowActions` now renders the dropdown via `createPortal` to `document.body` with position computed from `getBoundingClientRect()`.  
**Affects:** Everyone using `TableRowActions` with a sticky or bounded table container

### What happened
The `TableRowActions` overflow menu (the `…` button) opens a dropdown that is
clipped/hidden when the table container has `overflow: hidden` or `overflow: auto`
applied — which the SDK itself sets to enable sticky columns and `maxHeight`
scrolling. The dropdown renders inside the table's scroll container instead of
being portalled to `document.body`, so it gets cut off by the container boundary.

### Root cause
`TableRowActions` renders its dropdown in-place in the DOM tree rather than via a
React portal. Any ancestor with `overflow` other than `visible` will clip it.

### Fix required (SDK team)
Render the dropdown via `ReactDOM.createPortal(…, document.body)` so it escapes
the table's scroll container. CSS `position: fixed` coordinates should be computed
from the trigger button's `getBoundingClientRect()`.

---

## ISSUE-007 · `DatePicker` range mode — selected range not reflected in trigger button

**Severity:** Medium  
**Status:** ✅ Fixed in v0.5.0 — trigger label now derives from `resolvedRange.start`/`.end` via `formatDate()` and updates reactively after selection.  
**Affects:** Everyone using `DatePicker mode="range"`

### What happened
After selecting a start and end date via the calendar, the trigger button still
shows the default placeholder text (e.g. "Select date range") instead of
displaying the chosen range (e.g. "Apr 1 – Apr 27, 2026").

### Root cause
The `DatePicker` component's controlled/uncontrolled display logic does not update
the button label from the `onChange` callback value. The internal display state is
likely only initialised on mount and never re-synced after a date selection.

### Fix required (SDK team)
After `onChange` fires, the trigger button label should update to reflect
`startDate` – `endDate` formatted with the locale string. If the component is
uncontrolled, this should happen internally; if controlled, the `value` prop must
drive the label.

---

## ISSUE-008 · Page resets to page 1 when changing page size

**Severity:** Low (UX — behaviour is intentional but surprising)  
**Status:** ✅ Fixed in v0.5.0 — `TablePagination` now accepts `resetPageOnSizeChange?: boolean` (defaults `true`). Set to `false` to preserve the current page when page size changes.  
**Affects:** Everyone using server-driven pagination with `TablePagination`

### What happened
When a user is on page 2+ and changes the page size via the rows-per-page dropdown,
`TablePagination` resets the current page to 0 (page 1). In a server-driven table
the consumer already fetches only the current page's data, so the reset itself is
not wrong — but the lack of any option to suppress it is the problem.

For example: user is on page 3, browsing 10-per-page. They switch to 50-per-page.
The intent is usually "show me more rows in this area of the list", but the SDK
always takes them back to page 1.

### Root cause
Hard-coded reset in `TablePagination.handlePageSize`
(`src/components/data-display/Table/TablePagination.tsx`, lines 112-116):

```ts
const handlePageSize = (next: number) => {
  ctx.setPageSize(next);
  if (page !== 0) ctx.setPage(0);  // always resets — no way to opt out
  ...
};
```

There is no prop on `TablePagination` to preserve the current page on size change.

### Fix required (SDK team)
Add a `resetPageOnSizeChange?: boolean` prop to `TablePagination` (default `true`
for backwards compatibility). Consumers doing server-driven pagination who manage
page state themselves can set it to `false` to keep the current logical position.

---

---

## ISSUE-009 · `SelectInput` has no `options` / `onChange` props — undocumented children API

**Severity:** High  
**Status:** ❌ Still present in v0.5.0 — no `options` or `onChange` props added. Children-based API with `DropdownMenu` + `ActionListItem` remains the only way.  
**Affects:** Everyone trying to use `SelectInput` for the first time

### What happened
Standard usage of `SelectInput` with `options={[...]}` and `onChange={(val) => ...}` silently does nothing — no dropdown, no selection callback. The component renders a field that opens but never populates.

### Root cause
`SelectInput` does not accept `options` or `onChange` as props. The correct API is:
- Pass a `<DropdownMenu>` with `<ActionListItem>` children as the dropdown content
- Use controlled `isOpen`/`onOpenChange` to close the dropdown after a selection
- Use the `value` prop to reflect the selected option's label in the trigger

```jsx
<SelectInput label="Category" value={selected} isOpen={open} onOpenChange={setOpen}>
  <DropdownMenu>
    {options.map((opt) => (
      <ActionListItem
        key={opt}
        title={opt}
        selectionType="Single"
        isSelected={selected === opt}
        onClick={() => { setSelected(opt); setOpen(false); }}
      />
    ))}
  </DropdownMenu>
</SelectInput>
```

This pattern is not documented and is the opposite of every standard React select library.

### Fix required (SDK team)
Either add `options: { label, value }[]` and `onChange` convenience props (wrapping the children pattern internally), or add a usage example to the component's documentation/Storybook story.

---

## ISSUE-010 · `SearchInput` clear button hidden by default, `label` prop required but non-obvious

**Severity:** Medium  
**Status:** ✅ Partially fixed in v0.5.0 — `showClearButton` now defaults to `true` and `label` is now optional. Live search via `onInputChange` + debounce still undocumented.  
**Affects:** Everyone using `SearchInput` in single mode

### What happened
Two separate surprises in `SearchInput`:

1. **Clear button invisible by default** — `showClearButton` defaults to `false`. Even after the user types, there is no way to clear the field unless `showClearButton` is explicitly set. This is unexpected behaviour; most search inputs show a clear button as soon as there is text.

2. **`label` is a required prop** — omitting `label` causes a TypeScript error and may break rendering. In toolbar/inline search contexts, a visible label is unwanted, requiring consumers to pass `label=""` to suppress it while satisfying the prop requirement.

3. **`onSubmit`-only by default** — the component does not fire on every keystroke. `onInputChange` must be wired separately (with debounce) to achieve live search. This is undocumented.

### Fix required (SDK team)
- Default `showClearButton` to `true` in single mode, or at minimum call it out prominently in docs.
- Make `label` optional (default `""`) for inline/toolbar usage contexts.
- Add a note in docs that live search requires `onInputChange` + debounce; `onSubmit` alone only fires on Enter.

---

---

## ISSUE-011 · `highcharts-react-official` default import resolves to object instead of component (Vite 8)

**Severity:** Blocker  
**Status:** ❌ Present in v0.5.0 — affects Vite 8 consumers. Workaround required (see below).  
**Affects:** Everyone using the SDK's Highcharts-based charts (`AreaChart`, `LineChart`, `ColumnChart`, `BarChart`, `ActivityGauge`, `SeriesGauge`) in a **Vite 8** app.

### What happened
```
Uncaught Error: Element type is invalid: expected a string (for built-in components)
or a class/function (for composite components) but got: object.
Check the render method of `AreaChart`.
```
All Highcharts-based chart components crash on render. The page shows a blank error boundary.

### Root cause
`highcharts-react-official` ships only a UMD bundle (no `module`/`exports` field in its `package.json`). Vite 8's esbuild pre-bundler wraps it with `__commonJSMin` and emits:

```js
export default require_highcharts_react_min();
```

`require_highcharts_react_min()` returns the entire `module.exports` object — `{ __esModule: true, default: Component, HighchartsReact: Component }`. Vite 8 does **not** apply the `__esModule` interop at this step, so the `default` export of the pre-bundled file is the whole object, not the React component.

When the SDK's `AreaChart.js` does `import b from "highcharts-react-official"` and then renders `<b ... />`, React receives an object instead of a function and throws.

### Workaround (consumer — Vite 8)

Add a Vite transform plugin in `vite.config.js` that rewrites the import in the SDK dist files to explicitly extract `.default`:

```js
function fixHighchartsReactInterop() {
  return {
    name: 'fix-highcharts-react-interop',
    transform(code, id) {
      if (!id.includes('highcharts-react-official') && code.includes('"highcharts-react-official"')) {
        return code.replace(
          /import\s+(\w+)\s+from\s+"highcharts-react-official";/g,
          (_, name) =>
            `import _${name}_hrc from "highcharts-react-official";\nconst ${name} = _${name}_hrc.default ?? _${name}_hrc;`
        );
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), fixHighchartsReactInterop()],
  optimizeDeps: { include: ['highcharts-react-official'] },
  // ...
});
```

The plugin intercepts the six SDK dist files that import `highcharts-react-official` and rewrites e.g. `import b from "highcharts-react-official"` → `import _b_hrc from "highcharts-react-official"; const b = _b_hrc.default ?? _b_hrc;`. Even though the pre-bundled package gives back the full module.exports object as the default, the transform extracts `.default` before it reaches JSX.

### Fix required (SDK team)
Two options:
- **Option A:** Add `highcharts-react-official` to `rollupOptions.external` in `vite.config.ts` and treat it as a peer dep. Consumers install it themselves and Vite pre-bundles it only once in the host app, avoiding the double-wrap problem.
- **Option B:** Bundle `highcharts-react-official` into the SDK dist using Rollup's CJS plugin with `interop: 'auto'` so the component is baked in as a proper named export and doesn't need to be resolved at all from the host side.

---

## ISSUE-012 · `key` prop warning from internal chart rendering (Highcharts charts)

**Severity:** Low (console warning only, no functional impact)  
**Status:** ⚠️ Confirmed present in v0.5.0 — seen on the Charts Gallery page when any Highcharts-based chart renders a list of children.  
**Affects:** Everyone using any axis chart or Highcharts gauge

### What happened
```
Each child in a list should have a unique "key" prop.
Check the render method of `div`. It was passed a child from F.
```

### Root cause
The SDK's internal chart wrapper (`Chart.js`) renders an array of children (header sections, canvas, filters) as a JSX fragment but without stable `key` props in at least one code path. The warning originates from inside the SDK bundle, not consumer code.

This is the same class of issue as ISSUE-005 (TableBody `key` warning).

### Fix required (SDK team)
Add `key` props to the internal list renders in `Chart.js` / any intermediate component that maps children arrays.

---

---

## ISSUE-013 · AxisCharts have no `highchartsOptions` escape hatch — tooltip not customisable

**Severity:** Medium  
**Status:** ❌ Present in v0.5.0  
**Category:** 🔴 SDK Issue  
**Affects:** Everyone using `AreaChart`, `LineChart`, `BarChart`, `ColumnChart`

### What happened
Highcharts renders a built-in tooltip on hover — that part works. But there is no way to customise the tooltip formatter, style, header, or any other Highcharts option for these four charts. Any attempt to pass e.g. `tooltip={{ ... }}` is silently ignored (spread into the `Chart` wrapper div as a DOM attribute).

### Root cause
`ActivityGauge` and `SeriesGauge` expose a `highchartsOptions` prop that is spread last onto the internal Highcharts options object, letting consumers override anything. The four axis chart components (`AreaChart`, `LineChart`, `BarChart`, `ColumnChart`) have no such prop — all chart options are computed internally from the explicit props and there is no override hatch.

### Fix required (SDK team)
Add `highchartsOptions?: Highcharts.Options` prop to all four axis charts, spread last in the `useMemo` options build (same pattern `ActivityGauge` already uses).

---

## ISSUE-014 · `ChartActions` buttons have no built-in dropdowns — consumer must build all overlay menus

**Severity:** Medium (documentation / DX gap)  
**Status:** ❌ Present in v0.5.0  
**Category:** 🔴 SDK Issue  
**Affects:** Everyone expecting working export / settings / info panels from the chart header

### What happened
Clicking the ⚙ settings icon or ☰ burger icon in the chart header does nothing visible. `ChartActions` exposes `onSettingsClick` and `onMoreClick` callbacks only — no dropdown, panel, or popover is rendered by the SDK.

### Root cause
`ChartActions` is a thin wrapper around three `IconButton`s that fire callbacks. There is no companion `ChartSettingsPanel` or `ChartExportMenu` component, and the Storybook implies built-in menus exist (the icons strongly imply functionality).

### Workaround (consumer)
Build the menus manually using the SDK's `DropdownMenu` + `ActionListItem` + `Switch` primitives. Position them with `position: absolute` relative to the ChartActions container; use a fixed full-screen backdrop div (z-index below the panel) for click-outside dismissal.

For export/download: use `Highcharts.charts` global array to find the chart instance by container containment, then call `chart.getSVG()` and trigger a browser download.

For fullscreen: call `wrapperElement.requestFullscreen()` / `document.exitFullscreen()`.

### Fix required (SDK team)
Either:
- Add a `ChartExportMenu` companion component that renders a correctly-positioned `DropdownMenu` with SVG/PNG/CSV/fullscreen options, wired to Highcharts export API.
- Add a `ChartSettingsPanel` companion component for toggling chart config options.
- At minimum, document the expected pattern for building these overlays.

---

## ISSUE-015 · `Chart` `filters` slot is undocumented

**Severity:** Low (docs gap only)  
**Status:** ❌ Present in v0.5.0  
**Category:** 🔴 SDK Issue  
**Affects:** Everyone who wants to put a date range picker or filter row inside a chart card

### What happened
The base `Chart` wrapper has a `filters` prop that renders a full-width row between the chart header and the canvas. This is the intended slot for in-chart time pickers and filter controls. It works correctly (confirmed with `DatePicker mode="range"` passed to axis charts). It is entirely undocumented.

### How to use it (workaround)
Because AxisCharts spread their rest props onto `Chart`, `filters` can be passed directly:
```jsx
<AreaChart
  filters={<DatePicker mode="range" showPresets onChange={...} />}
  // ...
/>
```

### Fix required (SDK team)
Add `filters` to the prop table in Storybook and docs for `Chart`, `AreaChart`, `LineChart`, `BarChart`, `ColumnChart`.

---

## Summary table

| ID | Issue | Category | Severity | v0.5.0 Status |
|---|---|---|---|---|
| 001 | Table not on npm | 🔴 SDK | Blocker | ✅ Fixed |
| 002 | Duplicate React / hook crash | 🔴 SDK | Blocker | ⚠️ Still present |
| 003 | Highcharts ESM resolution | 🔴 SDK | High | ✅ Fixed |
| 004 | `TableEmptyState` bare `<div>` | 🔴 SDK | Medium | ✅ Fixed |
| 005 | `key` warning in TableBody | 🔴 SDK | Low | ⚠️ Unverified |
| 006 | Action column dropdown clipped | 🔴 SDK | Medium | ✅ Fixed |
| 007 | `DatePicker` range label not updated | 🔴 SDK | Medium | ✅ Fixed |
| 008 | Page resets to page 1 on size change | 🔴 SDK | Low | ✅ Fixed |
| 009 | `SelectInput` undocumented children API | 🔴 SDK | High | ❌ Not fixed |
| 010 | `SearchInput` hidden clear + required label | 🔴 SDK | Medium | ✅ Partially fixed |
| 011 | `highcharts-react-official` object import (Vite 8) | 🔴 SDK | Blocker | ❌ Not fixed — workaround applied |
| 012 | `key` warning in chart internal rendering | 🔴 SDK | Low | ⚠️ Confirmed present |
| 013 | AxisCharts: no `highchartsOptions` escape hatch | 🔴 SDK | Medium | ❌ Not fixed |
| 014 | `ChartActions` buttons callback-only, no built-in menus | 🔴 SDK | Medium | ❌ Not fixed — workaround applied |
| 015 | `Chart` `filters` slot undocumented | 🔴 SDK | Low | ❌ Not fixed (docs gap) |

### Issues by category

**🔴 SDK Issues (15 total) — report all to SDK team**
All 15 issues above have root causes inside the SDK package (missing exports, stale dist, undocumented API, packaging incompatibility, missing escape hatches).

**🟡 Consumer / Integration issues — resolved in this test app, no SDK fix needed**

| # | Issue | Resolution |
|---|---|---|
| C-01 | Vite app needed `resolve.dedupe` for React + `@table-library/react-table-library` | Added to `vite.config.js` |
| C-02 | `file:` local SDK path broke Vercel deployment | Copied SDK into repo under `packages/design-sdk/` with relative path |
| C-03 | Windows `git` rejected pnpm-nested paths > 260 chars | `git config core.longpaths true`; excluded `dist/node_modules` from `.gitignore` |
| C-04 | Missing `@emotion/is-prop-valid` peer dep for v0.5.0 framer-motion | `npm install @emotion/is-prop-valid` |
| C-05 | `rowDensity` value `'comfortable'` renamed to `'expanded'` in v0.5.0 | Updated consumer code |
| C-06 | `SearchInput` live search requires `onInputChange` + 400 ms debounce | Implemented debounce pattern with `useRef` |
| C-07 | `SelectInput` requires children API (`DropdownMenu` + `ActionListItem`) | Built `CategorySelect` sub-component |
| C-08 | No combined category + search API endpoint on DummyJSON | Implemented fallback: fetch full category with `limit=0`, filter locally |
| C-09 | `highcharts-react-official` UMD interop broken in Vite 8 | Vite transform plugin rewrites imports in SDK dist to extract `.default` |
| C-10 | `ChartActions` has no built-in export/settings menus | Built consumer-side `ChartActionsMenu` using `DropdownMenu` + `Switch` |
