import { useState } from 'react';
import { Clock, Database, BarChart2, AlertTriangle, Layout, Settings } from 'react-feather';
import { Accordion } from '@faclon-labs/design-sdk/Accordion';
import { AccordionItem } from '@faclon-labs/design-sdk/AccordionItem';
import { TextInput } from '@faclon-labs/design-sdk/TextInput';
import { SelectInput } from '@faclon-labs/design-sdk/SelectInput';
import { ActionListItem } from '@faclon-labs/design-sdk/ActionListItem';
import { ActionListItemGroup } from '@faclon-labs/design-sdk/ActionListItemGroup';
import { Switch } from '@faclon-labs/design-sdk/Switch';
import { Checkbox } from '@faclon-labs/design-sdk/Checkbox';
import { Button } from '@faclon-labs/design-sdk/Button';
import { DatePicker } from '@faclon-labs/design-sdk/DatePicker';
import { Badge } from '@faclon-labs/design-sdk/Badge';

// ─── helpers ────────────────────────────────────────────────────────────────

function useSelect(initial = '') {
  const [value, setValue] = useState(initial);
  const [isOpen, setIsOpen] = useState(false);
  function select(v) { setValue(v); setIsOpen(false); }
  return { value, isOpen, setIsOpen, select };
}

function FormRow({ children }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>{children}</div>;
}

function FieldGroup({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {label && (
        <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6b7280' }}>
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

function SectionDivider() {
  return <div style={{ height: 1, background: '#f3f4f6', margin: '4px 0' }} />;
}

// ─── sections ───────────────────────────────────────────────────────────────

function TimeConfig() {
  const [dateRange, setDateRange] = useState(null);
  const resolution = useSelect('5 min');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const refreshInterval = useSelect('30 s');

  return (
    <FormRow>
      <FieldGroup label="Date Range">
        <DatePicker
          mode="range"
          showPresets
          placeholder="Select range"
          rangeValue={dateRange}
          onRangeChange={setDateRange}
        />
      </FieldGroup>

      <SectionDivider />

      <SelectInput
        label="Resolution"
        value={resolution.value}
        isOpen={resolution.isOpen}
        onOpenChange={resolution.setIsOpen}
      >
        <ActionListItemGroup>
          {['Raw', '1 min', '5 min', '15 min', '1 hr', '6 hr', '1 day'].map((opt) => (
            <ActionListItem key={opt} title={opt} onClick={() => resolution.select(opt)} />
          ))}
        </ActionListItemGroup>
      </SelectInput>

      <SectionDivider />

      <Switch
        label="Auto Refresh"
        name="autoRefresh"
        isChecked={autoRefresh}
        onChange={({ checked }) => setAutoRefresh(checked)}
      />

      {autoRefresh && (
        <SelectInput
          label="Refresh Interval"
          value={refreshInterval.value}
          isOpen={refreshInterval.isOpen}
          onOpenChange={refreshInterval.setIsOpen}
        >
          <ActionListItemGroup>
            {['10 s', '30 s', '1 min', '5 min'].map((opt) => (
              <ActionListItem key={opt} title={opt} onClick={() => refreshInterval.select(opt)} />
            ))}
          </ActionListItemGroup>
        </SelectInput>
      )}
    </FormRow>
  );
}

function DataConfig() {
  const source = useSelect('Sensor Data');
  const aggregation = useSelect('Mean');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParams, setSelectedParams] = useState(['Temperature']);

  const ALL_PARAMS = ['Temperature', 'Humidity', 'Pressure', 'Voltage', 'Current', 'Power', 'Flow Rate', 'RPM'];
  const filtered = ALL_PARAMS.filter((p) =>
    p.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function toggleParam(p) {
    setSelectedParams((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  return (
    <FormRow>
      <SelectInput
        label="Data Source"
        value={source.value}
        isOpen={source.isOpen}
        onOpenChange={source.setIsOpen}
        searchable
        inputValue={searchQuery}
        onInputChange={(value) => setSearchQuery(value)}
      >
        <ActionListItemGroup>
          {['Sensor Data', 'SCADA', 'Historian', 'Modbus', 'OPC-UA'].map((opt) => (
            <ActionListItem key={opt} title={opt} onClick={() => { source.select(opt); setSearchQuery(''); }} />
          ))}
        </ActionListItemGroup>
      </SelectInput>

      <SectionDivider />

      <FieldGroup label="Parameters">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 4 }}>
          {selectedParams.map((p) => (
            <Badge key={p} label={p} />
          ))}
        </div>
        <TextInput
          label=""
          placeholder="Search parameters…"
          value={searchQuery}
          onChange={({ value }) => setSearchQuery(value)}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 140, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 6, padding: 6 }}>
          {filtered.map((p) => (
            <Checkbox
              key={p}
              label={p}
              name={p}
              isChecked={selectedParams.includes(p)}
              onChange={() => toggleParam(p)}
            />
          ))}
        </div>
      </FieldGroup>

      <SectionDivider />

      <SelectInput
        label="Aggregation"
        value={aggregation.value}
        isOpen={aggregation.isOpen}
        onOpenChange={aggregation.setIsOpen}
      >
        {['None', 'Mean', 'Min', 'Max', 'Sum', 'Count', 'Median'].map((opt) => (
          <ActionListItem key={opt} title={opt} onClick={() => aggregation.select(opt)} />
        ))}
      </SelectInput>
    </FormRow>
  );
}

function VisualConfig() {
  const chartType = useSelect('Line');
  const [settings, setSettings] = useState({
    showLegend: true,
    showGrid: true,
    showDataLabels: false,
    showMarkers: true,
    smoothCurve: false,
    stacked: false,
  });

  function toggle(key) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <FormRow>
      <SelectInput
        label="Chart Type"
        value={chartType.value}
        isOpen={chartType.isOpen}
        onOpenChange={chartType.setIsOpen}
      >
        {['Line', 'Area', 'Bar', 'Column', 'Scatter'].map((opt) => (
          <ActionListItem key={opt} title={opt} onClick={() => chartType.select(opt)} />
        ))}
      </SelectInput>

      <SectionDivider />

      <FieldGroup label="Display Options">
        {[
          { key: 'showLegend',     label: 'Show Legend' },
          { key: 'showGrid',       label: 'Show Grid Lines' },
          { key: 'showDataLabels', label: 'Data Labels' },
          { key: 'showMarkers',    label: 'Show Markers' },
          { key: 'smoothCurve',    label: 'Smooth Curve' },
          { key: 'stacked',        label: 'Stacked' },
        ].map(({ key, label }) => (
          <Switch
            key={key}
            name={key}
            label={label}
            isChecked={settings[key]}
            onChange={({ checked }) => setSettings((prev) => ({ ...prev, [key]: checked }))}
          />
        ))}
      </FieldGroup>
    </FormRow>
  );
}

function ThresholdConfig() {
  const [thresholds, setThresholds] = useState({
    warningEnabled: true,
    criticalEnabled: true,
    warningMin: '20',
    warningMax: '80',
    criticalMin: '10',
    criticalMax: '90',
  });

  function update(key, value) {
    setThresholds((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <FormRow>
      <FieldGroup>
        <Checkbox
          label="Warning Threshold"
          name="warningEnabled"
          isChecked={thresholds.warningEnabled}
          onChange={({ checked }) => update('warningEnabled', checked)}
        />
        {thresholds.warningEnabled && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, paddingLeft: 8 }}>
            <TextInput
              label="Min"
              name="warningMin"
              type="number"
              value={thresholds.warningMin}
              onChange={({ value }) => update('warningMin', value)}
            />
            <TextInput
              label="Max"
              name="warningMax"
              type="number"
              value={thresholds.warningMax}
              onChange={({ value }) => update('warningMax', value)}
            />
          </div>
        )}
      </FieldGroup>

      <SectionDivider />

      <FieldGroup>
        <Checkbox
          label="Critical Threshold"
          name="criticalEnabled"
          isChecked={thresholds.criticalEnabled}
          onChange={({ checked }) => update('criticalEnabled', checked)}
        />
        {thresholds.criticalEnabled && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, paddingLeft: 8 }}>
            <TextInput
              label="Min"
              name="criticalMin"
              type="number"
              value={thresholds.criticalMin}
              onChange={({ value }) => update('criticalMin', value)}
            />
            <TextInput
              label="Max"
              name="criticalMax"
              type="number"
              value={thresholds.criticalMax}
              onChange={({ value }) => update('criticalMax', value)}
            />
          </div>
        )}
      </FieldGroup>
    </FormRow>
  );
}

function WidgetConfig({ onApply }) {
  const [title, setTitle] = useState('');
  const [unit, setUnit] = useState('');
  const [decimals, setDecimals] = useState('2');
  const yAxisMode = useSelect('Auto');

  return (
    <FormRow>
      <TextInput
        label="Widget Title"
        placeholder="e.g. Temperature Trend"
        name="title"
        value={title}
        onChange={({ value }) => setTitle(value)}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <TextInput
          label="Unit"
          placeholder="°C, %, kW…"
          name="unit"
          value={unit}
          onChange={({ value }) => setUnit(value)}
        />
        <TextInput
          label="Decimals"
          name="decimals"
          type="number"
          value={decimals}
          onChange={({ value }) => setDecimals(value)}
        />
      </div>

      <SelectInput
        label="Y-Axis Scale"
        value={yAxisMode.value}
        isOpen={yAxisMode.isOpen}
        onOpenChange={yAxisMode.setIsOpen}
      >
        {['Auto', 'Fixed', 'Log'].map((opt) => (
          <ActionListItem key={opt} title={opt} onClick={() => yAxisMode.select(opt)} />
        ))}
      </SelectInput>

      <SectionDivider />

      <div style={{ display: 'flex', gap: 8 }}>
        <Button style={{ flex: 1 }} onClick={onApply}>Apply</Button>
        <Button variant="Outlined" style={{ flex: 1 }} onClick={() => {}}>Reset</Button>
      </div>
    </FormRow>
  );
}

// ─── sidebar ────────────────────────────────────────────────────────────────

const SECTIONS = [
  { key: 'time',      title: 'Time Range',   icon: <Clock size={14} />,         content: (p) => <TimeConfig {...p} /> },
  { key: 'data',      title: 'Data Config',  icon: <Database size={14} />,      content: (p) => <DataConfig {...p} /> },
  { key: 'visual',    title: 'Visual',       icon: <BarChart2 size={14} />,     content: (p) => <VisualConfig {...p} /> },
  { key: 'threshold', title: 'Thresholds',   icon: <AlertTriangle size={14} />, content: (p) => <ThresholdConfig {...p} /> },
  { key: 'widget',    title: 'Widget Info',  icon: <Layout size={14} />,        content: (p) => <WidgetConfig {...p} /> },
];

const sidebarStyle = {
  width: 300,
  flexShrink: 0,
  height: '100%',
  overflowY: 'auto',
  borderRight: '1px solid #e5e7eb',
  background: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
};

const sidebarHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '14px 16px 12px',
  borderBottom: '1px solid #e5e7eb',
  flexShrink: 0,
};

const contentPadStyle = {};

const canvasStyle = {
  flex: 1,
  background: '#f9fafb',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
};

export default function IOLensSidebar() {
  const [applied, setApplied] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

      {/* ── Left panel ── */}
      <div style={sidebarStyle}>
        <div style={sidebarHeaderStyle}>
          <Settings size={16} color="#374151" />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Widget Config</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Accordion mode="single" defaultExpandedKeys={['time']}>
            {SECTIONS.map(({ key, title, icon, content }) => (
              <AccordionItem
                key={key}
                value={key}
                title={title}
                leading="Icon"
                leadingIcon={icon}
              >
                <div style={contentPadStyle}>
                  {content({ onApply: () => setApplied(true) })}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* ── Canvas ── */}
      <div style={canvasStyle}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Layout size={22} color="#9ca3af" />
        </div>
        <p style={{ margin: 0, fontSize: 14, color: '#6b7280', fontWeight: 500 }}>Canvas area</p>
        <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>Configure the widget using the left panel</p>
        {applied && (
          <div style={{ marginTop: 8, padding: '6px 14px', background: '#d1fae5', borderRadius: 6, fontSize: 12, color: '#065f46' }}>
            ✓ Config applied
          </div>
        )}
      </div>

    </div>
  );
}
