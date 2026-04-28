import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Package, Eye, Edit2, Trash2, Share2 } from 'react-feather';
import '@faclon-labs/design-sdk/styles.css';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TablePagination,
  TableSkeleton,
  TableEmptyState,
  TableToolbar,
  TableToolbarActions,
  TableRowActions,
  CellText,
  CellBadges,
  CellStatus,
  CellIcon,
  Button,
  SearchInput,
  DatePicker,
  SelectInput,
  DropdownMenu,
  ActionListItem,
} from '@faclon-labs/design-sdk';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalize(p) {
  return {
    ...p,
    id: String(p.id),
    // Spread created-at dates so date range filter has meaningful data to test
    createdAt: new Date(Date.now() - Number(p.id) * 86_400_000 * 3),
  };
}

const BADGE_COLORS = ['Blue', 'Purple', 'Pink', 'Green', 'Yellow', 'Orange', 'Red', 'Gray'];
const categoryColorCache = {};
let colorIdx = 0;
function colorForCategory(cat) {
  if (!categoryColorCache[cat]) {
    categoryColorCache[cat] = BADGE_COLORS[colorIdx % BADGE_COLORS.length];
    colorIdx += 1;
  }
  return categoryColorCache[cat];
}

// ─── Category select ──────────────────────────────────────────────────────────
// SelectInput takes children (DropdownMenu), not an options[] prop.
// isOpen/onOpenChange are needed to close the dropdown after selection.

function CategorySelect({ categories, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectInput
      label=""
      placeholder="All categories"
      value={value || undefined}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      style={{ minWidth: 180 }}
    >
      <DropdownMenu>
        <ActionListItem
          title="All categories"
          selectionType="Single"
          isSelected={!value}
          onClick={() => { onChange(''); setIsOpen(false); }}
        />
        {categories.map((cat) => (
          <ActionListItem
            key={cat}
            title={cat}
            selectionType="Single"
            isSelected={value === cat}
            onClick={() => { onChange(cat); setIsOpen(false); }}
          />
        ))}
      </DropdownMenu>
    </SelectInput>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function ProductsToolbar({
  total,
  categories,
  category,
  onSearchInput,
  onSearchSubmit,
  onClearSearch,
  onCategoryChange,
  onDateRangeChange,
  onDensityToggle,
  onRefresh,
}) {
  return (
    <TableToolbar
      title="Product Catalogue"
      subtitle={`${total} products`}
      trailing={
        <TableToolbarActions>
          {/*
            onInputChange fires on every keystroke → debounced search.
            onSubmit fires on Enter → immediate search.
            label="" satisfies the required prop without showing visible label text.
          */}
          <SearchInput
            label=""
            placeholder="Search products…"
            type="single"
            showClearButton
            onInputChange={onSearchInput}
            onSubmit={onSearchSubmit}
            onClearButtonClicked={onClearSearch}
          />

          <CategorySelect
            categories={categories}
            value={category}
            onChange={onCategoryChange}
          />

          <DatePicker
            mode="range"
            showPresets
            onChange={({ startDate, endDate }) =>
              onDateRangeChange({ startDate, endDate })
            }
          />

          <Button variant="Gray" size="Medium" onClick={onDensityToggle}>
            Density
          </Button>

          <Button variant="Gray" size="Medium" onClick={onRefresh}>
            Refresh
          </Button>

          <Button variant="Secondary" size="Medium" isDisabled>
            Export
          </Button>
        </TableToolbarActions>
      }
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [density, setDensity] = useState('compact');
  const [, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const hasLoadedRef = useRef(false);
  const searchDebounceRef = useRef(null);

  // Clean up debounce on unmount
  useEffect(() => () => clearTimeout(searchDebounceRef.current), []);

  // Live search: fires 400ms after typing stops
  const handleSearchInput = useCallback((val) => {
    clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setSearch(val);
      setPage(0);
    }, 400);
  }, []);

  // Immediate search: fires on Enter key
  const handleSearchSubmit = useCallback((val) => {
    clearTimeout(searchDebounceRef.current);
    setSearch(val);
    setPage(0);
  }, []);

  // Clear: cancel debounce and reset immediately
  const handleSearchClear = useCallback(() => {
    clearTimeout(searchDebounceRef.current);
    setSearch('');
    setPage(0);
  }, []);

  // Fetch category list from API once on mount
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((r) => r.json())
      .then((data) => {
        const cats = Array.isArray(data)
          ? data.map((c) => (typeof c === 'string' ? c : c.slug ?? c.name))
          : [];
        setCategories(cats);
      })
      .catch(() => setCategories([]));
  }, []);

  // Fetch products — search and category go through the API.
  // DummyJSON has no combined category+search endpoint, so when both are active
  // we fetch the full category set and filter by search term locally.
  // Date range has no API support and is always applied client-side.
  useEffect(() => {
    let cancelled = false;

    if (hasLoadedRef.current) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    const skip = page * pageSize;

    async function load() {
      if (category && search) {
        // Fetch all items in the category (limit=0), then filter by search locally
        const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=0`);
        const data = await res.json();
        const all = (data.products ?? []).map(normalize);
        const q = search.toLowerCase();
        const matched = all.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            (p.brand ?? '').toLowerCase().includes(q) ||
            (p.tags ?? []).some((t) => t.toLowerCase().includes(q))
        );
        return { nodes: matched.slice(skip, skip + pageSize), apiTotal: matched.length };
      }

      if (category) {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}?limit=${pageSize}&skip=${skip}`
        );
        const data = await res.json();
        return { nodes: (data.products ?? []).map(normalize), apiTotal: data.total ?? 0 };
      }

      if (search) {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${pageSize}&skip=${skip}`
        );
        const data = await res.json();
        return { nodes: (data.products ?? []).map(normalize), apiTotal: data.total ?? 0 };
      }

      const res = await fetch(
        `https://dummyjson.com/products?limit=${pageSize}&skip=${skip}`
      );
      const data = await res.json();
      return { nodes: (data.products ?? []).map(normalize), apiTotal: data.total ?? 0 };
    }

    load()
      .then(({ nodes, apiTotal }) => {
        if (cancelled) return;

        // Apply date range client-side (no DummyJSON API support)
        const filtered =
          dateRange.startDate || dateRange.endDate
            ? nodes.filter((p) => {
                if (dateRange.startDate && p.createdAt < dateRange.startDate) return false;
                if (dateRange.endDate && p.createdAt > dateRange.endDate) return false;
                return true;
              })
            : nodes;

        setProducts(filtered);
        setTotal(apiTotal);
        hasLoadedRef.current = true;
      })
      .catch(() => {
        if (cancelled) return;
        setProducts([]);
        setTotal(0);
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
        setIsRefreshing(false);
      });

    return () => { cancelled = true; };
  }, [page, pageSize, search, category, dateRange, refreshKey]);

  return (
    <Table
      data={{ nodes: products }}
      rowCount={total}

      selectionType="multiple"
      multiSelectTrigger="checkbox"
      isRowSelectable={(item) => item.stock > 0}
      onSelectionChange={({ values }) => setSelected(values)}

      sortFunctions={{
        title:  (arr) => [...arr].sort((a, b) => a.title.localeCompare(b.title)),
        price:  (arr) => [...arr].sort((a, b) => a.price - b.price),
        rating: (arr) => [...arr].sort((a, b) => b.rating - a.rating),
        stock:  (arr) => [...arr].sort((a, b) => b.stock - a.stock),
      }}
      defaultSort={{ sortKey: 'rating', direction: 'desc' }}
      onSortChange={(sort) => console.log('sort', sort)}

      page={page}
      pageSize={pageSize}
      onPaginationChange={({ page: p, size }) => { setPage(p); setPageSize(size); }}

      rowDensity={density}
      showBorderedCells
      isHeaderSticky
      isFirstColumnSticky
      hasStickyActionColumn
      maxHeight="620px"

      isLoading={isLoading}
      isRefreshing={isRefreshing}

      toolbar={
        <ProductsToolbar
          total={total}
          categories={categories}
          category={category}
          onSearchInput={handleSearchInput}
          onSearchSubmit={handleSearchSubmit}
          onClearSearch={handleSearchClear}
          onCategoryChange={(val) => { setCategory(val); setPage(0); }}
          onDateRangeChange={(range) => { setDateRange(range); setPage(0); }}
          onDensityToggle={() => setDensity((d) => (d === 'compact' ? 'comfortable' : 'compact'))}
          onRefresh={() => setRefreshKey((k) => k + 1)}
        />
      }
      footer={
        <TablePagination pageSizeOptions={[5, 10, 25, 50]} showLabel showRowsPerPage />
      }
    >
      {(rows) => (
        <>
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell headerKey="title">Product</TableHeaderCell>
              <TableHeaderCell headerKey="category">Category</TableHeaderCell>
              <TableHeaderCell headerKey="price" align="right">Price</TableHeaderCell>
              <TableHeaderCell headerKey="discountPercentage" infoTooltip="% off RRP">Discount</TableHeaderCell>
              <TableHeaderCell headerKey="rating">Rating</TableHeaderCell>
              <TableHeaderCell headerKey="stock">Stock</TableHeaderCell>
              <TableHeaderCell headerKey="tags">Tags</TableHeaderCell>
              <TableHeaderCell headerKey="actions" />
            </TableHeaderRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableSkeleton columns={8} rows={pageSize} />
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={9}>
                  <TableEmptyState
                    title="No products found"
                    description={
                      search && category
                        ? `No "${category}" products matching "${search}"`
                        : search
                        ? `No results for "${search}"`
                        : category
                        ? `No products in "${category}"`
                        : 'Try adjusting the date range or other filters.'
                    }
                  />
                </td>
              </tr>
            ) : (
              rows.map((item) => (
                <TableRow key={item.id} item={item}>
                  <TableCell contentType="slot">
                    <CellText
                      title={item.title}
                      description={item.brand}
                      leading={
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }}
                        />
                      }
                    />
                  </TableCell>

                  <TableCell contentType="badges">
                    <CellBadges
                      badges={[{ label: item.category, color: colorForCategory(item.category) }]}
                    />
                  </TableCell>

                  <TableCell contentType="text" align="right">
                    <CellText title={`$${item.price.toFixed(2)}`} />
                  </TableCell>

                  <TableCell contentType="text">
                    <CellText title={`${item.discountPercentage.toFixed(1)}% off`} />
                  </TableCell>

                  <TableCell contentType="status">
                    <CellStatus
                      color={
                        item.rating >= 4 ? 'positive'
                        : item.rating >= 3 ? 'notice'
                        : 'negative'
                      }
                      label={`${item.rating}/5`}
                    />
                  </TableCell>

                  <TableCell contentType="icon">
                    <CellIcon
                      color={
                        item.stock > 50 ? 'positive'
                        : item.stock > 10 ? 'notice'
                        : 'negative'
                      }
                      icon={<Package size={16} />}
                    />
                  </TableCell>

                  <TableCell contentType="badges">
                    <CellBadges
                      badges={(item.tags ?? []).map((t) => ({ label: t }))}
                      maxVisible={2}
                    />
                  </TableCell>

                  <TableCell contentType="actions">
                    <TableRowActions
                      actions={[
                        { label: 'View',   icon: <Eye size={16} />,    onClick: () => console.log('view', item.id) },
                        { label: 'Edit',   icon: <Edit2 size={16} />,  onClick: () => console.log('edit', item.id) },
                        { label: 'Delete', icon: <Trash2 size={16} />, onClick: () => console.log('delete', item.id), isDestructive: true },
                        { label: 'Share',  icon: <Share2 size={16} />, onClick: () => console.log('share', item.id) },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </>
      )}
    </Table>
  );
}
