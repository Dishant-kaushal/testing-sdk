# Component Police Scores — v0.3.1

All components audited, fixed, and re-scored during the update-0.3.1 polish pass.

| Component | Score | Why not 100 |
|-----------|-------|-------------|
| AutocompleteInput | 88 | Hardcoded px on dropdown max-height, closingRef pattern adds complexity |
| Badge | 95 | Minor — `currentColor` on icon slot not a semantic token |
| Breadcrumb | 93 | Hardcoded px on separator icon sizing |
| Button | 96 | Clean — minor inline transition timing `150ms` not tokenized |
| Card | 90 | Hardcoded border tokens in sub-components (CardHeader, CardFooter) |
| Checkbox | 91 | Hardcoded px on checkbox box dimensions (16px) |
| Chip | 100 | Flawless — ChipGroup composes InputFieldHeader/Footer, full form contract with `isRequired` validation, `useControllableState` promoted to shared hook |
| ColorPicker | 82 | Hardcoded layout px (420px popover, 36×24 cells, 160px canvas), dynamic inline colors |
| ComparisonToggle | 90 | Hardcoded button dimensions (36px), -1px border overlap margin |
| CounterInput | 93 | Hardcoded field height (36px), 3px focus-ring shorthand not tokenized |
| DatePicker | 83 | Hardcoded layout widths (296/172px), 310-line render file, ExpandAllIcon SVG |
| DateSelector | 87 | Hardcoded button height (32px) |
| Divider | 97 | Near-perfect — `1px` border shorthand instead of token |
| DropdownMenu | 88 | Complex component — hardcoded max-height, shadow values in ActionListItemGroup |
| EmptyState | 99 | Near-perfect — 10 flat-SVG illustrations, shared `EmptyStateIllustrationProps`, `useId()` per-instance IDs, all 10 illustrations `forwardRef` + `displayName`. Only deduction: a small `max-width`/`gap` px value that isn't token-backed |
| IconButton | 95 | Clean — hardcoded icon sizes (12/16/20px) are intentional size props |
| Indicator | 96 | Hardcoded dot dimensions (8px) |
| LinkButton | 94 | Inline transition timing not tokenized |
| Modal | 91 | Hardcoded width values on size variants (400/760/1024px) |
| Pagination | 90 | Hardcoded px on page number min-width, gap values |
| ProgressBar | 91 | Hardcoded px for track heights (4px/2px), inline style for dynamic width |
| Radio | 92 | Hardcoded px on radio circle dimensions (16px) |
| SelectInput | 86 | Complex interaction model, hardcoded z-index fallback, chevron rotation inline |
| Spinner | 93 | Animation uses motion tokens now, minor `0.18` opacity not tokenized |
| Switch | 90 | Hardcoded px on track/thumb dimensions, focus ring gap sizing |
| SwitchButton | 91 | Focus ring fixed, arrow key nav still TODO |
| Tabs | 90 | Hardcoded underline offset px, border tokens fixed |
| Tag | 92 | `currentColor` on icon slot |
| TextArea | 85 | Hardcoded px for field heights (8 values), tag input min-width, scrollbar width |
| TextInput | 86 | Hardcoded px on field height (36px), left-label width (120px) |
| Tooltip | 84 | Inline SVG arrow dimensions (14×8), unnamed delay defaults |
| ListCard | 84 | Hardcoded color swatch px (16px), inline style for dynamic color |
| ProductAccordion | 87 | Hardcoded leading height (20px) |

**Common reasons for not reaching 100:**
- Hardcoded `px` for component-specific dimensions (heights, widths) where no spacing token maps cleanly
- Inline transition durations (`150ms`) not yet using `--fds-duration-*` tokens
- `currentColor` inheritance on icon slots — acceptable pattern but not a semantic token
- Scrollbar/pseudo-element styling requires raw px values
