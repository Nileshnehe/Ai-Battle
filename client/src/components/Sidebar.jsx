import { useState } from 'react';

function formatTimeAgo(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  if (isNaN(date.getTime())) return '';
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function Sidebar({ history, selectedChatId, onSelectHistory, isMobile, isOpen, onClose }) {
  const [search, setSearch] = useState('');

  const filtered = history.filter((h) =>
    h.question.toLowerCase().includes(search.toLowerCase())
  );

  const sidebarStyle = isMobile
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '280px',
        zIndex: 50,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1)',
        boxShadow: isOpen ? '4px 0 32px rgba(0,0,0,0.12)' : 'none',
      }
    : {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '268px',
        zIndex: 20,
      };

  return (
    <aside
      className="flex flex-col border-r sidebar-scroll"
      style={{
        ...sidebarStyle,
        backgroundColor: 'var(--sidebar)',
        borderColor: 'var(--border)',
        overflowY: 'auto',
      }}
    >
      {/* Logo Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center w-7 h-7 rounded-lg text-sm"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            ⚡
          </div>
          <div>
            <span className="block text-[13px] font-semibold tracking-tight" style={{ color: 'var(--text)' }}>
              AI Battle Arena
            </span>
            <span className="block text-[10px]" style={{ color: 'var(--text-secondary)' }}>
              Powered by Gemini Judge
            </span>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg transition-colors btn-press"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
            style={{ color: 'var(--text-tertiary)' }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border outline-none transition-all duration-200"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
              boxShadow: 'var(--shadow-xs)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent)';
              e.target.style.boxShadow = '0 0 0 3px var(--accent-ring)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border)';
              e.target.style.boxShadow = 'var(--shadow-xs)';
            }}
          />
        </div>
      </div>

      {/* Section label */}
      <div className="px-5 py-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
          Recent Battles
        </span>
      </div>

      {/* History list */}
      <div className="flex-1 overflow-y-auto px-3 pb-6 sidebar-scroll">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-center gap-2">
            <span className="text-2xl opacity-40">📭</span>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              {history.length === 0 ? 'No battles yet.' : 'No results found.'}
            </p>
          </div>
        ) : (
          <ul className="space-y-0.5">
            {filtered.map((item) => {
              const isActive = item.id === selectedChatId;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onSelectHistory(item.id)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all duration-150 group btn-press"
                    style={{
                      backgroundColor: isActive ? 'rgba(37,99,235,0.08)' : 'transparent',
                      color: isActive ? 'var(--accent)' : 'var(--text)',
                      outline: isActive ? '1px solid rgba(37,99,235,0.18)' : '1px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <p
                      className="truncate font-medium leading-snug"
                      style={{ fontSize: '12.5px' }}
                    >
                      {item.question}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                      {formatTimeAgo(item.timestamp || item.createdAt)}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-5 py-3 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
          Mistral · Cohere · Gemini Judge
        </p>
      </div>
    </aside>
  );
}
