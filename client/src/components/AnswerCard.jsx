import { useState } from 'react';
import ScoreBadge from './ScoreBadge';
import TypingText from './TypingText';

const MODEL_LABELS = {
  solution_1: 'Mistral AI',
  solution_2: 'Cohere AI',
};

const MODEL_ICONS = {
  solution_1: '🌪️',
  solution_2: '🌊',
};

export default function AnswerCard({ solutionKey, displayText, fullText, score, isWinner, isStreaming }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullText || displayText || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="flex flex-col rounded-2xl border transition-all duration-300"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: isWinner ? 'var(--winner)' : 'var(--border)',
        boxShadow: isWinner ? 'var(--winner-glow)' : 'var(--shadow-card)',
        padding: '20px',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-base">{MODEL_ICONS[solutionKey]}</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
              AI Response {solutionKey === 'solution_1' ? '1' : '2'}
            </p>
            <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
              {MODEL_LABELS[solutionKey]}
            </p>
          </div>
        </div>
        <ScoreBadge score={score} isWinner={isWinner} />
      </div>

      {/* Content */}
      <div
        className="flex-1 text-sm leading-relaxed overflow-y-auto transition-all duration-300"
        style={{
          color: 'var(--text)',
          maxHeight: expanded ? 'none' : '280px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        <TypingText
          text={displayText}
          placeholder="AI is preparing the response..."
          isStreaming={isStreaming}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-xs font-medium transition-colors duration-150"
          style={{ color: 'var(--accent)' }}
        >
          {expanded ? '▲ Collapse' : '▼ Read more'}
        </button>
        <button
          id={`copy-btn-${solutionKey}`}
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all duration-150"
          style={{
            borderColor: 'var(--border)',
            color: copied ? 'var(--winner)' : 'var(--text-secondary)',
            backgroundColor: copied ? 'var(--winner-bg)' : 'transparent',
          }}
        >
          {copied ? '✓ Copied' : '⎘ Copy'}
        </button>
      </div>
    </div>
  );
}
