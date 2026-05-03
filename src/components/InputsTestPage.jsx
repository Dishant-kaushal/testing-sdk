import { useState } from 'react';
import { TextInput } from '@faclon-labs/design-sdk/TextInput';
import { TextArea } from '@faclon-labs/design-sdk/TextArea';
import { SelectInput } from '@faclon-labs/design-sdk/SelectInput';
import { SearchInput } from '@faclon-labs/design-sdk/SearchInput';
import { DatePicker } from '@faclon-labs/design-sdk/DatePicker';
import { TimeInput } from '@faclon-labs/design-sdk/TimeInput';
import { CounterInput } from '@faclon-labs/design-sdk/CounterInput';
import { ColorPicker } from '@faclon-labs/design-sdk/ColorPicker';
import { Checkbox } from '@faclon-labs/design-sdk/Checkbox';
import { Switch } from '@faclon-labs/design-sdk/Switch';
import { ActionListItem } from '@faclon-labs/design-sdk/ActionListItem';
import { ActionListItemGroup } from '@faclon-labs/design-sdk/ActionListItemGroup';

// ── shared helpers ─────────────────────────────────────────────────────────────

const NARROW = {
  maxWidth: 450,
  // overflow: 'hidden',
  border: '1px solid red',
  padding: 12,
  borderRadius: 6,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
};

const FLEX_ROW = {
  display: 'flex',
  gap: 12,
  alignItems: 'flex-start',
};

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Label({ children }) {
  return (
    <p style={{ margin: '0 0 6px', fontSize: 11, color: '#6b7280', fontWeight: 500 }}>
      {children}
    </p>
  );
}

function useSelect(initial = '') {
  const [value, setValue] = useState(initial);
  const [isOpen, setIsOpen] = useState(false);
  function select(v) { setValue(v); setIsOpen(false); }
  return { value, isOpen, setIsOpen, select };
}

const OPTS = ['Option A', 'Option B', 'Option C', 'Option D', 'Option E'];

// ── components ─────────────────────────────────────────────────────────────────

function TextInputTest() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  return (
    <Section title="TextInput">
      <Label>Narrow (300px, overflow hidden)</Label>
      <div style={NARROW}>
        <TextInput label="Full width inside narrow" value={a} onChange={({ value }) => setA(value)} placeholder="Type here…" />
      </div>
      <Label>Flex row — equal width sharing</Label>
      <div style={FLEX_ROW}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <TextInput label="First" value={a} onChange={({ value }) => setA(value)} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <TextInput label="Second" value={b} onChange={({ value }) => setB(value)} />
        </div>
      </div>
    </Section>
  );
}

function TextAreaTest() {
  const [v, setV] = useState('');
  return (
    <Section title="TextArea">
      <Label>Narrow (300px, overflow hidden)</Label>
      <div style={NARROW}>
        <TextArea label="Notes" value={v} onChange={({ value }) => setV(value)} placeholder="Enter notes…" />
      </div>
    </Section>
  );
}

function SelectSingleTest() {
  const sel1 = useSelect('');
  const sel2 = useSelect('');
  const sel3 = useSelect('');
  return (
    <Section title="SelectInput (single)">
      <Label>Narrow (300px, overflow hidden) — portal should escape red border</Label>
      <div style={NARROW}>
        <SelectInput
          label="Select option"
          value={sel1.value}
          isOpen={sel1.isOpen}
          onOpenChange={sel1.setIsOpen}
        >
          <ActionListItemGroup>
            {OPTS.map((o) => <ActionListItem key={o} title={o} onClick={() => sel1.select(o)} />)}
          </ActionListItemGroup>
        </SelectInput>
      </div>
      <Label>Flex row — equal width sharing</Label>
      <div style={FLEX_ROW}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SelectInput
            label="Left"
            value={sel2.value}
            isOpen={sel2.isOpen}
            onOpenChange={sel2.setIsOpen}
          >
            <ActionListItemGroup>
              {OPTS.map((o) => <ActionListItem key={o} title={o} onClick={() => sel2.select(o)} />)}
            </ActionListItemGroup>
          </SelectInput>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SelectInput
            label="Right"
            value={sel3.value}
            isOpen={sel3.isOpen}
            onOpenChange={sel3.setIsOpen}
          >
            <ActionListItemGroup>
              {OPTS.map((o) => <ActionListItem key={o} title={o} onClick={() => sel3.select(o)} />)}
            </ActionListItemGroup>
          </SelectInput>
        </div>
      </div>
    </Section>
  );
}

function SelectSearchableTest() {
  const [query, setQuery] = useState('');
  const sel = useSelect('');
  const filtered = OPTS.filter((o) => o.toLowerCase().includes(query.toLowerCase()));
  return (
    <Section title="SelectInput (searchable)">
      <Label>Narrow (300px, overflow hidden)</Label>
      <div style={NARROW}>
        <SelectInput
          label="Search & select"
          value={sel.value}
          isOpen={sel.isOpen}
          onOpenChange={sel.setIsOpen}
          searchable
          inputValue={query}
          onInputChange={(v) => setQuery(v)}
        >
          <ActionListItemGroup>
            {filtered.map((o) => <ActionListItem key={o} title={o} onClick={() => { sel.select(o); setQuery(''); }} />)}
          </ActionListItemGroup>
        </SelectInput>
      </div>
    </Section>
  );
}

function SelectMultiTest() {
  const [tags, setTags] = useState([{ label: 'Option A', value: 'a' }]);
  const [isOpen, setIsOpen] = useState(false);
  function toggle(label, value) {
    setTags((prev) =>
      prev.find((t) => t.value === value)
        ? prev.filter((t) => t.value !== value)
        : [...prev, { label, value }]
    );
  }
  return (
    <Section title="SelectInput (multi)">
      <Label>Narrow (300px, overflow hidden)</Label>
      <div style={NARROW}>
        <SelectInput
          label="Multi-select"
          tags={tags}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <ActionListItemGroup>
            {OPTS.map((o, i) => (
              <ActionListItem
                key={o}
                title={o}
                onClick={() => toggle(o, String(i))}
              />
            ))}
          </ActionListItemGroup>
        </SelectInput>
      </div>
    </Section>
  );
}

function SearchInputTest() {
  const [v, setV] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const filtered = OPTS.filter((o) => o.toLowerCase().includes(v.toLowerCase()));
  return (
    <Section title="SearchInput">
      <Label>Narrow (300px, overflow hidden) — portal dropdown should escape</Label>
      <div style={NARROW}>
        <SearchInput
          label="Search"
          placeholder="Search…"
          inputValue={v}
          onInputChange={(val) => setV(val)}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <ActionListItemGroup>
            {filtered.map((o) => (
              <ActionListItem key={o} title={o} onClick={() => { setV(o); setIsOpen(false); }} />
            ))}
          </ActionListItemGroup>
        </SearchInput>
      </div>
    </Section>
  );
}

function DatePickerTest() {
  const [single, setSingle] = useState(null);
  const [range, setRange] = useState(null);
  return (
    <Section title="DatePicker">
      <Label>Single — narrow (300px)</Label>
      <div style={NARROW}>
        <DatePicker
          label="Pick a date"
          value={single}
          onChange={setSingle}
          placeholder="Select date"
        />
      </div>
      <Label>Range — narrow (300px) — calendar should not be clipped</Label>
      <div style={NARROW}>
        <DatePicker
          label="Date range"
          mode="range"
          showPresets
          rangeValue={range}
          onRangeChange={setRange}
          placeholder="Select range"
        />
      </div>
    </Section>
  );
}

function TimeInputTest() {
  const [v, setV] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Section title="TimeInput">
      <Label>Narrow (300px, overflow hidden)</Label>
      <div style={NARROW}>
        <TimeInput
          label="Pick time"
          value={v}
          onChange={setV}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        />
      </div>
    </Section>
  );
}

function CounterInputTest() {
  const [v, setV] = useState(5);
  return (
    <Section title="CounterInput">
      <Label>Narrow (300px, overflow hidden)</Label>
      <div style={NARROW}>
        <CounterInput
          label="Quantity"
          value={v}
          min={0}
          max={100}
          onChange={({ value }) => setV(value)}
        />
      </div>
      <Label>Flex row — equal width sharing</Label>
      <div style={FLEX_ROW}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <CounterInput label="Min" value={v} min={0} max={100} onChange={({ value }) => setV(value)} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <CounterInput label="Max" value={v + 10} min={0} max={100} onChange={() => {}} />
        </div>
      </div>
    </Section>
  );
}

function ColorPickerTest() {
  return (
    <Section title="ColorPicker">
      <Label>Narrow (300px, overflow hidden)</Label>
      <div style={NARROW}>
        <ColorPicker />
      </div>
    </Section>
  );
}

function CheckboxTest() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <Section title="Checkbox">
      <Label>Narrow (300px, overflow hidden)</Label>
      <div style={NARROW}>
        <Checkbox label="Option one" name="cb1" isChecked={a} onChange={({ checked }) => setA(checked)} />
        <Checkbox label="Option two with a longer label to test wrapping behaviour" name="cb2" isChecked={b} onChange={({ checked }) => setB(checked)} />
      </div>
      <Label>Flex row</Label>
      <div style={FLEX_ROW}>
        <Checkbox label="Left" name="cbl" isChecked={a} onChange={({ checked }) => setA(checked)} />
        <Checkbox label="Right" name="cbr" isChecked={b} onChange={({ checked }) => setB(checked)} />
      </div>
    </Section>
  );
}

function SwitchTest() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <Section title="Switch">
      <Label>Narrow (300px, overflow hidden)</Label>
      <div style={NARROW}>
        <Switch label="Enable feature" name="sw1" isChecked={a} onChange={({ checked }) => setA(checked)} />
        <Switch label="Another toggle with a slightly longer label" name="sw2" isChecked={b} onChange={({ checked }) => setB(checked)} />
      </div>
    </Section>
  );
}

// ── page ────────────────────────────────────────────────────────────────────────

export default function InputsTestPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700 }}>Input Components — Overflow & Layout Test</h2>
      <p style={{ margin: '0 0 32px', fontSize: 13, color: '#6b7280' }}>
        Each input is rendered inside a <strong>300px red-bordered container with overflow:hidden</strong> to verify it doesn't bleed out, and in a flex row to verify equal-width sharing. Dropdowns should portal above the red border.
      </p>

      <TextInputTest />
      <TextAreaTest />
      <SelectSingleTest />
      <SelectSearchableTest />
      <SelectMultiTest />
      <SearchInputTest />
      <DatePickerTest />
      <TimeInputTest />
      <CounterInputTest />
      <ColorPickerTest />
      <CheckboxTest />
      <SwitchTest />
    </div>
  );
}
