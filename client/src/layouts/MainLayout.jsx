import Sidebar from '../components/Sidebar';
import { useBattle } from '../hooks/useBattle';

export default function MainLayout({ children }) {
  const { history, activeHistoryId, loadHistory } = useBattle();

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--bg)' }}>
      <Sidebar
        history={history}
        activeHistoryId={activeHistoryId}
        onSelectHistory={loadHistory}
      />
      <main
        className="flex-1 overflow-y-auto"
        style={{ marginLeft: '260px', minHeight: '100vh' }}
      >
        {children}
      </main>
    </div>
  );
}
