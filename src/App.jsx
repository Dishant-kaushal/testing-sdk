import { useState } from 'react';
import ProductsTable from './components/ProductsTable';
import ChartsGallery from './components/ChartsGallery';
import ChatTestPage from './components/ChatTestPage';
import EmptyStateTestPage from './components/EmptyStateTestPage';
import IOLensSidebar from './components/IOLensSidebar';
import InputsTestPage from './components/InputsTestPage';
import ChartTestPage from './components/ChartTestPage';

const VIEWS = [
  { id: 'table',      label: 'Products Table' },
  { id: 'charts',     label: 'Charts Gallery' },
  { id: 'chartstest', label: 'Charts Test' },
  { id: 'chat',       label: 'Chat Test' },
  { id: 'emptystate', label: 'EmptyState Test' },
  { id: 'iolens',     label: 'IOLens Sidebar' },
  { id: 'inputs',     label: 'Inputs Test' },
];

const navStyle = {
  display: 'flex',
  gap: 4,
  padding: '0 24px',
  borderBottom: '1px solid #e5e7eb',
  background: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 50,
};

const tabStyle = (active) => ({
  padding: '12px 20px',
  fontSize: 14,
  fontWeight: active ? 600 : 400,
  color: active ? '#111827' : '#6b7280',
  borderBottom: active ? '2px solid #111827' : '2px solid transparent',
  background: 'none',
  border: 'none',
  borderBottom: active ? '2px solid #111827' : '2px solid transparent',
  cursor: 'pointer',
  marginBottom: -1,
});

function App() {
  const [view, setView] = useState('table');

  const isFullBleed = view === 'iolens';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <nav style={navStyle}>
        {VIEWS.map((v) => (
          <button
            key={v.id}
            style={tabStyle(view === v.id)}
            onClick={() => setView(v.id)}
          >
            {v.label}
          </button>
        ))}
      </nav>

      <div style={isFullBleed
        ? { flex: 1, overflow: 'hidden' }
        : { flex: 1, overflowY: 'auto', padding: '24px' }
      }>
        {view === 'table'      && <ProductsTable />}
        {view === 'charts'     && <ChartsGallery />}
        {view === 'chartstest' && <ChartTestPage />}
        {view === 'chat'       && <ChatTestPage />}
        {view === 'emptystate' && <EmptyStateTestPage />}
        {view === 'iolens'     && <IOLensSidebar />}
        {view === 'inputs'     && <InputsTestPage />}
      </div>
    </div>
  );
}

export default App;
