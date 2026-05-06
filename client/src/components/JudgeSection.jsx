import { useState } from 'react';

function ScoreBar({ score, isWinner }) {
  const pct = (score / 10) * 100;
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: isWinner ? 'var(--winner)' : 'var(--text-tertiary)',
          }}
        />
      </div>
      <span
        className="text-xs font-bold w-8 text-right"
        style={{ color: isWinner ? 'var(--winner)' : 'var(--text-secondary)' }}
      >
        {score}/10
      </span>
    </div>
  );
}

export default function JudgeSection({ judge }) {
  const [open, setOpen] = useState(true);

  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;
  const s1Wins = solution_1_score >= solution_2_score;

  return (
    <div
      className="rounded-[20px] border overflow-hidden fade-in"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Toggle Header */}
      <button
        id="judge-toggle"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 transition-colors duration-150 btn-press"
        style={{ color: 'var(--text)' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{ backgroundColor: '#F3F4F6', border: '1px solid var(--border)' }}
          >
            ⚖️
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold leading-none" style={{ color: 'var(--text)' }}>
              Judge Analysis
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
              Powered by Gemini
            </p>
          </div>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-semibold ml-1"
            style={{ backgroundColor: 'var(--winner-bg)', color: 'var(--winner)' }}
          >
            {s1Wins ? '🌪️ Mistral wins' : '🌊 Cohere wins'}
          </span>
        </div>

        <div
          className="w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200"
          style={{
            backgroundColor: 'var(--bg)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {/* Body */}
      {open && (
        <div
          className="slide-up"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {/* Score comparison bar */}
          <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs">🌪️</span>
                  <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Mistral
                  </p>
                </div>
                <ScoreBar score={solution_1_score} isWinner={s1Wins} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs">🌊</span>
                  <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Cohere
                  </p>
                </div>
                <ScoreBar score={solution_2_score} isWinner={!s1Wins} />
              </div>
            </div>
          </div>

          {/* Reasoning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {/* Solution 1 reasoning */}
            <div
              className="px-6 py-5"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs">🌪️</span>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                  Mistral Reasoning
                </p>
                {s1Wins && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: 'var(--winner-bg)', color: 'var(--winner)' }}
                  >
                    WINNER
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                {solution_1_reasoning}
              </p>
            </div>

            {/* Solution 2 reasoning */}
            <div className="px-6 py-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs">🌊</span>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                  Cohere Reasoning
                </p>
                {!s1Wins && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: 'var(--winner-bg)', color: 'var(--winner)' }}
                  >
                    WINNER
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                {solution_2_reasoning}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
