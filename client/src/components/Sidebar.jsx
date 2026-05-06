import { useState } from 'react';

function formatTimeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function Sidebar({ history, activeHistoryId, onSelectHistory }) {
  const [search, setSearch] = useState('');

  const filtered = history.filter((h) =>
    h.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside
      className="fixed top-0 left-0 h-screen flex flex-col border-r"
      style={{
        width: '260px',
        backgroundColor: 'var(--sidebar)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="font-semibold text-sm tracking-tight" style={{ color: 'var(--text)' }}>
            AI Battle Arena
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <input
          type="text"
          placeholder="Search history..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-lg border outline-none transition-colors duration-200"
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
        />
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {filtered.length === 0 ? (
          <p className="text-xs px-3 py-6 text-center" style={{ color: 'var(--text-secondary)' }}>
            {history.length === 0 ? 'No chats yet.' : 'No results found.'}
          </p>
        ) : (
          <ul className="space-y-0.5">
            {filtered.map((item) => {
              const isActive = item.id === activeHistoryId;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onSelectHistory(item.id)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group"
                    style={{
                      backgroundColor: isActive ? 'rgba(59,130,246,0.08)' : 'transparent',
                      borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                      color: isActive ? 'var(--accent)' : 'var(--text)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <p className="truncate font-medium leading-snug">{item.question}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {formatTimeAgo(item.timestamp)}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
