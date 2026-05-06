import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useBattle } from '../hooks/useBattle';

export default function MainLayout({ children }) {
  const { history, selectedChatId, loadHistory } = useBattle();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Close sidebar on mobile when a history item is selected
  const handleSelectHistory = (id) => {
    loadHistory(id);
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(2px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        history={history}
        selectedChatId={selectedChatId}
        onSelectHistory={handleSelectHistory}
        isMobile={isMobile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main
        className="flex-1 overflow-y-auto min-h-screen content-scroll"
        style={{ marginLeft: isMobile ? 0 : '268px', transition: 'margin var(--transition-base)' }}
      >
        {/* Mobile top bar */}
        {isMobile && (
          <div
            className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 border-b"
            style={{
              backgroundColor: 'rgba(248,247,244,0.92)',
              borderColor: 'var(--border)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-col gap-1.5 p-1.5 rounded-lg btn-press"
              aria-label="Open sidebar"
            >
              <span className="block w-5 h-0.5 rounded" style={{ backgroundColor: 'var(--text)' }} />
              <span className="block w-4 h-0.5 rounded" style={{ backgroundColor: 'var(--text)' }} />
              <span className="block w-5 h-0.5 rounded" style={{ backgroundColor: 'var(--text)' }} />
            </button>
            <div className="flex items-center gap-1.5">
              <span className="text-base">⚡</span>
              <span className="text-sm font-semibold tracking-tight" style={{ color: 'var(--text)' }}>
                AI Battle Arena
              </span>
            </div>
          </div>
        )}

        {children}
      </main>
    </div>
  );
}
