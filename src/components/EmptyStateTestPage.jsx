import { Button } from '@faclon-labs/design-sdk/Button';
import { EmptyState } from '@faclon-labs/design-sdk/EmptyState';
import { NoDataOneIllustration } from '@faclon-labs/design-sdk/EmptyState/illustrations/NoDataOneIllustration';
import { NoDataTwoIllustration } from '@faclon-labs/design-sdk/EmptyState/illustrations/NoDataTwoIllustration';
import { AddImageIllustration } from '@faclon-labs/design-sdk/EmptyState/illustrations/AddImageIllustration';
import { AddWidgetIllustration } from '@faclon-labs/design-sdk/EmptyState/illustrations/AddWidgetIllustration';
import { NoNotificationIllustration } from '@faclon-labs/design-sdk/EmptyState/illustrations/NoNotificationIllustration';
import { NoDevicesConfiguredIllustration } from '@faclon-labs/design-sdk/EmptyState/illustrations/NoDevicesConfiguredIllustration';
import { TechnicalHiccupIllustration } from '@faclon-labs/design-sdk/EmptyState/illustrations/TechnicalHiccupIllustration';
import { AccessDeniedIllustration } from '@faclon-labs/design-sdk/EmptyState/illustrations/AccessDeniedIllustration';
import { NoSearchResultIllustration } from '@faclon-labs/design-sdk/EmptyState/illustrations/NoSearchResultIllustration';
import { NotFound404Illustration } from '@faclon-labs/design-sdk/EmptyState/illustrations/NotFound404Illustration';

const CASES = [
  {
    name: 'NoDataOneIllustration',
    illustration: <NoDataOneIllustration />,
    title: 'No Data (One)',
    description: 'NoDataOneIllustration — no records found',
    primaryAction: <Button onClick={() => {}}>Refresh</Button>,
  },
  {
    name: 'NoDataTwoIllustration',
    illustration: <NoDataTwoIllustration />,
    title: 'No Data (Two)',
    description: 'NoDataTwoIllustration — empty dataset variant',
  },
  {
    name: 'AddImageIllustration',
    illustration: <AddImageIllustration />,
    title: 'Add Image',
    description: 'AddImageIllustration — prompt to upload',
    primaryAction: <Button onClick={() => {}}>Upload Image</Button>,
  },
  {
    name: 'AddWidgetIllustration',
    illustration: <AddWidgetIllustration />,
    title: 'Add Widget',
    description: 'AddWidgetIllustration — empty dashboard slot',
    primaryAction: <Button onClick={() => {}}>Add Widget</Button>,
  },
  {
    name: 'NoNotificationIllustration',
    illustration: <NoNotificationIllustration />,
    title: 'No Notifications',
    description: 'NoNotificationIllustration — inbox zero',
  },
  {
    name: 'NoDevicesConfiguredIllustration',
    illustration: <NoDevicesConfiguredIllustration />,
    title: 'No Devices',
    description: 'NoDevicesConfiguredIllustration — no devices set up',
    primaryAction: <Button onClick={() => {}}>Configure Device</Button>,
  },
  {
    name: 'TechnicalHiccupIllustration',
    illustration: <TechnicalHiccupIllustration />,
    title: 'Technical Error',
    description: 'TechnicalHiccupIllustration — something went wrong',
    primaryAction: <Button onClick={() => {}}>Try Again</Button>,
  },
  {
    name: 'AccessDeniedIllustration',
    illustration: <AccessDeniedIllustration />,
    title: 'Access Denied',
    description: 'AccessDeniedIllustration — insufficient permissions',
  },
  {
    name: 'NoSearchResultIllustration',
    illustration: <NoSearchResultIllustration />,
    title: 'No Results',
    description: 'NoSearchResultIllustration — search returned nothing',
    primaryAction: <Button onClick={() => {}}>Clear Filters</Button>,
  },
  {
    name: 'NotFound404Illustration',
    illustration: <NotFound404Illustration />,
    title: '404 Not Found',
    description: 'NotFound404Illustration — page missing',
    primaryAction: <Button onClick={() => {}}>Go Home</Button>,
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
          EmptyState — all 10 illustrations (individual subpath imports)
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
