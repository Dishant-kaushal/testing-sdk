import { Button } from '@faclon-labs/design-sdk/Button';
import { EmptyState } from '@faclon-labs/design-sdk/EmptyState';
import { NoDataOneIllustration } from '@faclon-labs/design-sdk/EmptyState/illustrations/NoDataOneIllustration';

const CASES = [
  {
    name: 'NoDataOneIllustration',
    illustration: <NoDataOneIllustration />,
    title: 'No Data (One)',
    description: 'NoDataOneIllustration — no records found',
    primaryAction: <Button onClick={() => {}}>Refresh</Button>,
  },
];

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: 24,
};

const cardStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 24,
  background: '#fff',
};

const labelStyle = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#9ca3af',
  marginBottom: 12,
};

const badgeStyle = {
  display: 'inline-block',
  fontSize: 11,
  padding: '2px 8px',
  borderRadius: 4,
  background: '#f3f4f6',
  color: '#374151',
  fontFamily: 'monospace',
  marginBottom: 16,
};

export default function EmptyStateTestPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <p style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 600, color: '#111827' }}>
          EmptyState — illustration subpath import
        </p>
        <code style={badgeStyle}>
          import {'{'} NoDataOneIllustration {'}'} from '@faclon-labs/design-sdk/EmptyState/illustrations/NoDataOneIllustration'
        </code>
      </div>

      <div style={gridStyle}>
        {CASES.map((c, i) => (
          <div key={i} style={cardStyle}>
            <div style={labelStyle}>{c.name}</div>
            <EmptyState
              illustration={c.illustration}
              title={c.title}
              description={c.description}
              primaryAction={c.primaryAction}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
