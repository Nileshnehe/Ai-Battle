import { useState } from 'react';

export default function JudgeSection({ judge }) {
  const [open, setOpen] = useState(true);

  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;
  const s1Wins = solution_1_score >= solution_2_score;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Toggle Header */}
      <button
        id="judge-toggle"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 transition-colors duration-150"
        style={{ color: 'var(--text)' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <div className="flex items-center gap-2">
          <span>⚖️</span>
          <span className="font-semibold text-sm">Judge Analysis</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: 'var(--winner-bg)', color: 'var(--winner)' }}
          >
            {s1Wins ? 'Mistral wins' : 'Cohere wins'}
          </span>
        </div>
        <span
          className="text-xs transition-transform duration-200"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'var(--text-secondary)',
          }}
        >
          ▼
        </span>
      </button>

      {/* Body */}
      {open && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 pb-5"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {/* Solution 1 */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">🌪️</span>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                Mistral AI Reasoning
              </p>
              <span
                className="text-xs font-semibold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: s1Wins ? 'var(--winner-bg)' : '#F3F4F6', color: s1Wins ? 'var(--winner)' : 'var(--text-secondary)' }}
              >
                {solution_1_score}/10
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
              {solution_1_reasoning}
            </p>
          </div>

          {/* Solution 2 */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">🌊</span>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                Cohere AI Reasoning
              </p>
              <span
                className="text-xs font-semibold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: !s1Wins ? 'var(--winner-bg)' : '#F3F4F6', color: !s1Wins ? 'var(--winner)' : 'var(--text-secondary)' }}
              >
                {solution_2_score}/10
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
              {solution_2_reasoning}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
