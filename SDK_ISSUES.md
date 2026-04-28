# Faclon Design SDK — Issue Log

> Logged during ProductsTable integration test (2026-04-27).
> Each issue includes: what broke, who is affected, and what the fix is.

---

## ISSUE-001 · Table component missing from npm package

**Severity:** Blocker  
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

---

## ISSUE-006 · Action column dropdown clipped by table overflow

**Severity:** Medium  
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

---

## ISSUE-008 · Page resets to page 1 when changing page size

**Severity:** Low (UX — behaviour is intentional but surprising)  
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

## Summary table

| ID | Issue | Affects | Severity | Fix owner |
|---|---|---|---|---|
| 001 | Table not on npm | Everyone | Blocker | SDK — publish |
| 002 | Duplicate React / hook crash | webpack users | Blocker | SDK — externalize `@table-library` |
| 003 | Highcharts ESM resolution | CRA/webpack users | High | SDK — external sub-paths |
| 004 | `TableEmptyState` bare `<div>` | Everyone | Medium | SDK — rebuild dist |
| 005 | `key` warning in TableBody | Everyone | Low | SDK — add key props |
| 006 | Action column dropdown clipped | Everyone | Medium | SDK — portal the dropdown |
| 007 | `DatePicker` range label not updated | Everyone | Medium | SDK — sync button label from onChange |
| 008 | Page resets to page 1 on size change | Everyone | Low | SDK — add `resetPageOnSizeChange` prop |
