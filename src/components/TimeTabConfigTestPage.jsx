import { useState } from 'react';
import { TimeTabConfiguration } from '@faclon-labs/design-sdk/TimeTabConfiguration';

const defaultConfig = {
  timezone: 'Asia/Kolkata',
  defaultDurationId: 'last_15_minutes',
  allDurations: [],
  defaultPeriodicity: 'minute',
};

export default function TimeTabConfigTestPage() {
  const [config, setConfig] = useState(null);

  function handleChange(value) {
    console.log('[TimeTabConfiguration] onChange', value);
    setConfig(value);
  }

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', height: '100%' }}>
      <div style={{ flex: '0 0 480px', minWidth: 0 }}>
        <TimeTabConfiguration value={defaultConfig} onChange={handleChange} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6b7280' }}>
          onChange output
        </p>
        {config === null ? (
          <p style={{ margin: 0, fontSize: 13, color: '#9ca3af', fontStyle: 'italic' }}>
            Interact with the component to see output…
          </p>
        ) : (
          <pre style={{ margin: 0, padding: 16, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12, lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#111827' }}>
            {JSON.stringify(config, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
