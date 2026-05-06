import { useState, useRef, useEffect } from 'react';

export default function QuestionInput({ onSubmit, isLoading }) {
  const [question, setQuestion] = useState('');
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onSubmit(question.trim());
      setQuestion('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const canSubmit = question.trim().length > 0 && !isLoading;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className="relative rounded-2xl border transition-all duration-200"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: focused ? 'var(--accent)' : 'var(--border)',
          boxShadow: focused
            ? '0 0 0 3px var(--accent-ring), var(--shadow-input)'
            : 'var(--shadow-input)',
        }}
      >
        <textarea
          ref={textareaRef}
          id="question-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask anything... Mistral and Cohere will battle it out."
          rows={2}
          disabled={isLoading}
          className="w-full px-5 pt-4 pb-14 text-sm resize-none outline-none bg-transparent leading-relaxed"
          style={{
            color: 'var(--text)',
            minHeight: '80px',
            maxHeight: '160px',
          }}
        />

        {/* Bottom bar inside input */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2.5 rounded-b-2xl"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
            <kbd
              className="px-1.5 py-0.5 rounded text-[10px] font-mono"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              Enter
            </kbd>
            {' '}to battle · Shift+Enter for newline
          </span>

          <button
            id="battle-submit-btn"
            type="submit"
            disabled={!canSubmit}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white btn-press transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: canSubmit ? 'var(--accent)' : '#9CA3AF',
              minWidth: '100px',
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = 'var(--accent)';
            }}
          >
            {isLoading ? (
              <>
                <span
                  className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  style={{ flexShrink: 0 }}
                />
                Battling...
              </>
            ) : (
              <>
                <span>⚡</span>
                Ask AI
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
