import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from '../../../src/components/data-display/Table/Table';
import { TableBody } from '../../../src/components/data-display/Table/TableBody';
import { TableCell } from '../../../src/components/data-display/Table/TableCell';
import { TableHeader } from '../../../src/components/data-display/Table/TableHeader';
import { TableHeaderCell } from '../../../src/components/data-display/Table/TableHeaderCell';
import { TableHeaderRow } from '../../../src/components/data-display/Table/TableHeaderRow';
import { TableRow } from '../../../src/components/data-display/Table/TableRow';
import { TableRowActions } from '../../../src/components/data-display/Table/TableRowActions';
import { CellText } from '../../../src/components/data-display/Table/cells/CellText';
import { CellTextAction } from '../../../src/components/data-display/Table/cells/CellTextAction';
import { CellCheckbox } from '../../../src/components/data-display/Table/cells/CellCheckbox';
import { CellIcon } from '../../../src/components/data-display/Table/cells/CellIcon';
import { CellBadges } from '../../../src/components/data-display/Table/cells/CellBadges';
import { CellButtons } from '../../../src/components/data-display/Table/cells/CellButtons';
import { CellStatus } from '../../../src/components/data-display/Table/cells/CellStatus';
import { ProgressBar } from '../../../src/components/feedback/ProgressBar/ProgressBar';
import {
  AlertCircle,
  Bookmark,
  Copy,
  Edit2,
  ExternalLink,
  Eye,
  Menu,
  MoreVertical,
  Star,
  Trash2,
  X,
} from 'react-feather';

const meta: Meta = {
  title: 'Components/Table/Cells',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Cell content primitives — 7 components + 3 structural types covering Figma `_Table/Cell` (node 1313:12838 + siblings). Drop each inside `<TableCell contentType="…">` to get the correct alignment, width, and spacing without hand-rolling.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/* ── Shared data ────────────────────────────────────────────────────────── */

type Row = {
  id: number;
  name: string;
  subtitle: string;
  role: string;
};

const ROWS: Row[] = [
  { id: 1, name: 'Alice Johnson',  subtitle: 'alice@acme.com',   role: 'Engineer' },
  { id: 2, name: 'Bob Smith',      subtitle: 'bob@acme.com',     role: 'Designer' },
  { id: 3, name: 'Carol White',    subtitle: 'carol@acme.com',   role: 'PM'       },
  { id: 4, name: 'David Lee',      subtitle: 'david@acme.com',   role: 'Engineer' },
];

/* ══════════════════════════════════════════════════════════════════════
   C01. CellText — title + description + leading slot + dropdown indicator
   ══════════════════════════════════════════════════════════════════════ */

export const C01_CellText: Story = {
  name: 'C01. CellText',
  render: () => (
    <Table data={{ nodes: ROWS }}>
      {(rows) => (
        <>
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell>Title only</TableHeaderCell>
              <TableHeaderCell>Title + Description</TableHeaderCell>
              <TableHeaderCell>With leading icon</TableHeaderCell>
              <TableHeaderCell>Dropdown column</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} item={r}>
                <TableCell contentType="text">
                  <CellText title={r.name} />
                </TableCell>
                <TableCell contentType="text">
                  <CellText title={r.name} description={r.subtitle} />
                </TableCell>
                <TableCell contentType="text">
                  <CellText title={r.name} description={r.role} leading={<Star size={20} />} />
                </TableCell>
                <TableCell contentType="text">
                  <CellText title={r.role} trailingIndicator="dropdown" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Table>
  ),
};

/* ══════════════════════════════════════════════════════════════════════
   C02. CellTextAction — hover-reveal trailing action
   ══════════════════════════════════════════════════════════════════════ */

export const C02_CellTextAction: Story = {
  name: 'C02. CellTextAction',
  render: () => (
    <Table data={{ nodes: ROWS }}>
      {(rows) => (
        <>
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell>Name (hover-reveal action)</TableHeaderCell>
              <TableHeaderCell>Role (always-visible action)</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} item={r}>
                <TableCell contentType="text-action">
                  <CellTextAction
                    title={r.name}
                    description={r.subtitle}
                    trailingAction={{
                      icon: <ExternalLink size={20} />,
                      ariaLabel: `Open ${r.name}`,
                      onClick: () => console.log('open', r.id),
                    }}
                  />
                </TableCell>
                <TableCell contentType="text-action">
                  <CellTextAction
                    title={r.role}
                    trailingAction={{
                      icon: <Copy size={20} />,
                      ariaLabel: 'Copy role',
                      onClick: () => console.log('copy', r.id),
                      alwaysVisible: true,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Table>
  ),
};

/* ══════════════════════════════════════════════════════════════════════
   C03. CellCheckbox — non-selection boolean column
   ══════════════════════════════════════════════════════════════════════ */

export const C03_CellCheckbox: Story = {
  name: 'C03. CellCheckbox',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [featured, setFeatured] = useState<Record<number, boolean>>({ 1: true, 3: true });
    return (
      <Table data={{ nodes: ROWS }}>
        {(rows) => (
          <>
            <TableHeader>
              <TableHeaderRow>
                <TableHeaderCell>Featured</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
              </TableHeaderRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} item={r}>
                  <TableCell contentType="checkbox">
                    <CellCheckbox
                      accessibilityLabel={`Feature ${r.name}`}
                      checked={!!featured[r.id]}
                      onChange={(v) => setFeatured((f) => ({ ...f, [r.id]: v }))}
                    />
                  </TableCell>
                  <TableCell contentType="text">
                    <CellText title={r.name} />
                  </TableCell>
                  <TableCell contentType="text">
                    <CellText title={r.role} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
    );
  },
};

/* ══════════════════════════════════════════════════════════════════════
   C04. CellIcon — 5 colors centered in narrow column
   ══════════════════════════════════════════════════════════════════════ */

export const C04_CellIcon: Story = {
  name: 'C04. CellIcon',
  render: () => (
    <Table data={{ nodes: ROWS }}>
      {(rows) => (
        <>
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell>Default</TableHeaderCell>
              <TableHeaderCell>Positive</TableHeaderCell>
              <TableHeaderCell>Negative</TableHeaderCell>
              <TableHeaderCell>Notice</TableHeaderCell>
              <TableHeaderCell>Info</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} item={r}>
                <TableCell contentType="icon">
                  <CellIcon icon={<Menu size={20} />} ariaLabel="Drag handle" />
                </TableCell>
                <TableCell contentType="icon">
                  <CellIcon icon={<Star size={20} />} color="positive" />
                </TableCell>
                <TableCell contentType="icon">
                  <CellIcon icon={<AlertCircle size={20} />} color="negative" />
                </TableCell>
                <TableCell contentType="icon">
                  <CellIcon icon={<AlertCircle size={20} />} color="notice" />
                </TableCell>
                <TableCell contentType="icon">
                  <CellIcon icon={<Bookmark size={20} />} color="info" />
                </TableCell>
                <TableCell contentType="text">
                  <CellText title={r.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Table>
  ),
};

/* ══════════════════════════════════════════════════════════════════════
   C05. CellBadges — 1, 3, and 5-with-overflow
   ══════════════════════════════════════════════════════════════════════ */

export const C05_CellBadges: Story = {
  name: 'C05. CellBadges',
  render: () => (
    <Table data={{ nodes: ROWS }}>
      {(rows) => (
        <>
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>1 badge</TableHeaderCell>
              <TableHeaderCell>3 badges</TableHeaderCell>
              <TableHeaderCell>5 badges (overflow)</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} item={r}>
                <TableCell contentType="text">
                  <CellText title={r.name} />
                </TableCell>
                <TableCell contentType="badges">
                  <CellBadges badges={[{ label: 'Active', color: 'Positive', emphasis: 'Intense' }]} />
                </TableCell>
                <TableCell contentType="badges">
                  <CellBadges
                    badges={[
                      { label: 'Frontend' },
                      { label: 'TypeScript', color: 'Information' },
                      { label: 'Urgent',   color: 'Notice' },
                    ]}
                  />
                </TableCell>
                <TableCell contentType="badges">
                  <CellBadges
                    badges={[
                      { label: 'Q4',    color: 'Primary'   },
                      { label: '2026',  color: 'Neutral'   },
                      { label: 'NA',    color: 'Information' },
                      { label: 'APAC',  color: 'Notice'   },
                      { label: 'EU',    color: 'Positive' },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Table>
  ),
};

/* ══════════════════════════════════════════════════════════════════════
   C06. CellButtons — Primary + Secondary XSmall
   ══════════════════════════════════════════════════════════════════════ */

export const C06_CellButtons: Story = {
  name: 'C06. CellButtons',
  render: () => (
    <Table data={{ nodes: ROWS }}>
      {(rows) => (
        <>
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Primary only</TableHeaderCell>
              <TableHeaderCell>Secondary + Primary</TableHeaderCell>
              <TableHeaderCell>Disabled</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} item={r}>
                <TableCell contentType="text">
                  <CellText title={r.name} />
                </TableCell>
                <TableCell contentType="buttons">
                  <CellButtons
                    primary={{ label: 'Approve', onClick: () => console.log('approve', r.id) }}
                  />
                </TableCell>
                <TableCell contentType="buttons">
                  <CellButtons
                    secondary={{ label: 'Reject',  onClick: () => console.log('reject', r.id) }}
                    primary={{    label: 'Approve', onClick: () => console.log('approve', r.id) }}
                  />
                </TableCell>
                <TableCell contentType="buttons">
                  <CellButtons
                    secondary={{ label: 'Reject',  onClick: () => {}, isDisabled: true }}
                    primary={{    label: 'Approve', onClick: () => {}, isDisabled: true }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Table>
  ),
};

/* ══════════════════════════════════════════════════════════════════════
   C07. CellStatus — all 5 intents + badges + action
   ══════════════════════════════════════════════════════════════════════ */

export const C07_CellStatus: Story = {
  name: 'C07. CellStatus',
  render: () => (
    <Table data={{ nodes: ROWS }}>
      {(rows) => (
        <>
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Positive</TableHeaderCell>
              <TableHeaderCell>Negative</TableHeaderCell>
              <TableHeaderCell>Notice</TableHeaderCell>
              <TableHeaderCell>Information</TableHeaderCell>
              <TableHeaderCell>With badge + action</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} item={r}>
                <TableCell contentType="text">
                  <CellText title={r.name} />
                </TableCell>
                <TableCell contentType="status">
                  <CellStatus intent="Positive" label="Active" />
                </TableCell>
                <TableCell contentType="status">
                  <CellStatus intent="Negative" label="Failed" />
                </TableCell>
                <TableCell contentType="status">
                  <CellStatus intent="Notice" label="Pending" />
                </TableCell>
                <TableCell contentType="status">
                  <CellStatus intent="Information" label="Draft" />
                </TableCell>
                <TableCell contentType="status">
                  <CellStatus
                    intent="Neutral"
                    label="Archived"
                    badges={[{ label: 'Q4', color: 'Neutral' }]}
                    trailingAction={{
                      icon: <X size={20} />,
                      ariaLabel: `Dismiss ${r.name}`,
                      onClick: () => console.log('dismiss', r.id),
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Table>
  ),
};

/* ══════════════════════════════════════════════════════════════════════
   C08. Kitchen Sink — all 10 content types in one table
   ══════════════════════════════════════════════════════════════════════ */

type KitchenRow = {
  id: number;
  featured: boolean;
  name: string;
  subtitle: string;
  note: string;
  priority: 'Positive' | 'Negative' | 'Notice' | 'Information';
  statusLabel: string;
  tags: string[];
  progress: number;
};

const KITCHEN_DATA: KitchenRow[] = [
  { id: 1, featured: true,  name: 'Alice Johnson', subtitle: 'alice@acme.com', note: 'Lead on Q4 roadmap',  priority: 'Positive',    statusLabel: 'Active',  tags: ['Frontend', 'Lead'],          progress: 85 },
  { id: 2, featured: false, name: 'Bob Smith',     subtitle: 'bob@acme.com',   note: 'Out until Mon',       priority: 'Notice',      statusLabel: 'Pending', tags: ['Design', 'Figma', 'Urgent'], progress: 45 },
  { id: 3, featured: true,  name: 'Carol White',   subtitle: 'carol@acme.com', note: 'Owns product strategy', priority: 'Information', statusLabel: 'Draft',   tags: ['PM'],                        progress: 70 },
  { id: 4, featured: false, name: 'David Lee',     subtitle: 'david@acme.com', note: 'PR #4421 blocked',    priority: 'Negative',    statusLabel: 'Failed',  tags: ['Backend', 'Infra', 'API', 'Auth', 'DB'], progress: 15 },
];

export const C08_KitchenSink: Story = {
  name: 'C08. All Cell Types — Kitchen Sink',
  parameters: {
    docs: {
      description: {
        story:
          'Every cell content type in one table. Columns (in order): spacer, checkbox, icon, text (with description), text-action (hover-reveal), status, badges (with overflow), buttons, actions (3-slot + overflow via TableRowActions), slot (custom content — DS ProgressBar).',
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [featured, setFeatured] = useState<Record<number, boolean>>(() =>
      Object.fromEntries(KITCHEN_DATA.map((r) => [r.id, r.featured])),
    );
    return (
      <Table data={{ nodes: KITCHEN_DATA }}>
        {(rows) => (
          <>
            <TableHeader>
              <TableHeaderRow>
                <TableHeaderCell />
                <TableHeaderCell>Featured</TableHeaderCell>
                <TableHeaderCell>Pri</TableHeaderCell>
                <TableHeaderCell>Person</TableHeaderCell>
                <TableHeaderCell>Note</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Tags</TableHeaderCell>
                <TableHeaderCell>Approve</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
                <TableHeaderCell>Progress</TableHeaderCell>
              </TableHeaderRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} item={r}>
                  {/* spacer */}
                  <TableCell contentType="spacer" />
                  {/* checkbox */}
                  <TableCell contentType="checkbox">
                    <CellCheckbox
                      accessibilityLabel={`Feature ${r.name}`}
                      checked={!!featured[r.id]}
                      onChange={(v) => setFeatured((f) => ({ ...f, [r.id]: v }))}
                    />
                  </TableCell>
                  {/* icon */}
                  <TableCell contentType="icon">
                    <CellIcon
                      icon={<AlertCircle size={20} />}
                      color={
                        r.priority === 'Positive'
                          ? 'positive'
                          : r.priority === 'Negative'
                            ? 'negative'
                            : r.priority === 'Notice'
                              ? 'notice'
                              : 'info'
                      }
                      ariaLabel={`Priority ${r.priority}`}
                    />
                  </TableCell>
                  {/* text + description */}
                  <TableCell contentType="text">
                    <CellText title={r.name} description={r.subtitle} leading={<Star size={20} />} />
                  </TableCell>
                  {/* text-action hover reveal */}
                  <TableCell contentType="text-action">
                    <CellTextAction
                      title={r.note}
                      trailingAction={{
                        icon: <Edit2 size={20} />,
                        ariaLabel: `Edit note for ${r.name}`,
                        onClick: () => console.log('edit-note', r.id),
                      }}
                    />
                  </TableCell>
                  {/* status */}
                  <TableCell contentType="status">
                    <CellStatus intent={r.priority === 'Information' ? 'Neutral' : r.priority} label={r.statusLabel} />
                  </TableCell>
                  {/* badges */}
                  <TableCell contentType="badges">
                    <CellBadges badges={r.tags.map((t) => ({ label: t, color: 'Information' }))} />
                  </TableCell>
                  {/* buttons */}
                  <TableCell contentType="buttons">
                    <CellButtons
                      secondary={{ label: 'Reject',  onClick: () => console.log('reject', r.id) }}
                      primary={{    label: 'Approve', onClick: () => console.log('approve', r.id) }}
                    />
                  </TableCell>
                  {/* actions / link — reuses TableRowActions */}
                  <TableCell contentType="actions">
                    <TableRowActions
                      actions={[
                        { key: 'view',    label: 'View',    icon: <Eye size={20} />,    onClick: () => console.log('view', r.id)    },
                        { key: 'edit',    label: 'Edit',    icon: <Edit2 size={20} />,  onClick: () => console.log('edit', r.id)    },
                        { key: 'copy',    label: 'Copy',    icon: <Copy size={20} />,   onClick: () => console.log('copy', r.id)    },
                        { key: 'delete',  label: 'Delete',  icon: <Trash2 size={20} />, onClick: () => console.log('delete', r.id), isDestructive: true },
                        { key: 'more',    label: 'Open menu', icon: <MoreVertical size={20} />, onClick: () => console.log('menu', r.id) },
                      ]}
                    />
                  </TableCell>
                  {/* slot — arbitrary DS content */}
                  <TableCell contentType="slot">
                    <ProgressBar value={r.progress} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
    );
  },
};
