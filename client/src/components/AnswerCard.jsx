import { useState, useRef, useEffect } from 'react';
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

const MODEL_SUBTITLES = {
  solution_1: 'Mistral 7B',
  solution_2: 'Command R+',
};

export default function AnswerCard({ solutionKey, displayText, fullText, score, isWinner, isStreaming }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const contentRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (el && !expanded) {
      setIsOverflowing(el.scrollHeight > 290);
    }
  }, [displayText, expanded]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullText || displayText || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardBorder = isWinner ? 'var(--winner-border)' : hovered ? '#D1D0C8' : 'var(--border)';
  const cardShadow = isWinner
    ? 'var(--winner-glow)'
    : hovered
    ? 'var(--shadow-lifted)'
    : 'var(--shadow-card)';

  return (
    <div
      className="flex flex-col rounded-[20px] border transition-all duration-200 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: cardBorder,
        boxShadow: cardShadow,
        padding: '24px',
        transform: hovered && !isWinner ? 'translateY(-1px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Winner top accent bar */}
      {isWinner && (
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ backgroundColor: 'var(--winner)' }}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          {/* Model avatar */}
          <div
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base"
            style={{
              backgroundColor: solutionKey === 'solution_1' ? '#FEF3C7' : '#DBEAFE',
              border: '1px solid',
              borderColor: solutionKey === 'solution_1' ? '#FDE68A' : '#BFDBFE',
            }}
          >
            {MODEL_ICONS[solutionKey]}
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-tertiary)' }}>
              AI Response {solutionKey === 'solution_1' ? '1' : '2'}
            </p>
            <p className="text-sm font-semibold leading-none" style={{ color: 'var(--text)' }}>
              {MODEL_LABELS[solutionKey]}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
              {MODEL_SUBTITLES[solutionKey]}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <ScoreBadge score={score} isWinner={isWinner} />
          {isWinner && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full fade-in"
              style={{ backgroundColor: 'var(--winner-bg)', color: 'var(--winner)' }}
            >
              🏆 Winner
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="mb-4" style={{ height: '1px', backgroundColor: 'var(--border)' }} />

      {/* Content */}
      <div
        ref={contentRef}
        className="flex-1 text-sm leading-relaxed overflow-hidden content-scroll prose-answer transition-all duration-300"
        style={{
          color: 'var(--text)',
          maxHeight: expanded ? 'none' : '290px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          position: 'relative',
        }}
      >
        <TypingText
          text={displayText}
          placeholder="AI is preparing the response..."
          isStreaming={isStreaming}
        />

        {/* Gradient fade when collapsed and overflowing */}
        {!expanded && isOverflowing && !isStreaming && (
          <div
            className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--surface))',
            }}
          />
        )}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between mt-5 pt-4 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        {/* Expand / collapse */}
        {isOverflowing && !isStreaming ? (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-medium transition-all duration-150 btn-press"
            style={{ color: 'var(--accent)' }}
          >
            <span
              className="inline-block transition-transform duration-200"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              ↓
            </span>
            {expanded ? 'Show less' : 'Read more'}
          </button>
        ) : (
          <div />
        )}

        {/* Copy button */}
        <button
          id={`copy-btn-${solutionKey}`}
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 btn-press"
          style={{
            borderColor: copied ? 'var(--winner)' : 'var(--border)',
            color: copied ? 'var(--winner)' : 'var(--text-secondary)',
            backgroundColor: copied ? 'var(--winner-bg)' : 'transparent',
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = 'var(--bg)';
              e.currentTarget.style.borderColor = '#C5C3BC';
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border)';
            }
          }}
        >
          {copied ? (
            <>✓ Copied!</>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 5V3C11 2.45 10.55 2 10 2H3C2.45 2 2 2.45 2 3V10C2 10.55 2.45 11 3 11H5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
