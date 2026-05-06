import { useState, useRef } from 'react';

export default function QuestionInput({ onSubmit, isLoading }) {
  const [question, setQuestion] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onSubmit(question.trim());
      setQuestion('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-3 w-full"
    >
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          id="question-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything... (Press Enter to battle)"
          rows={2}
          disabled={isLoading}
          className="w-full px-4 py-3 text-sm rounded-xl border resize-none outline-none transition-all duration-200 leading-relaxed"
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
            boxShadow: 'var(--shadow-card)',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
        />
      </div>
      <button
        id="battle-submit-btn"
        type="submit"
        disabled={!question.trim() || isLoading}
        className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--accent)', minHeight: '56px' }}
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
        }}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Battling...</span>
          </>
        ) : (
          <>⚡ Battle</>
        )}
      </button>
    </form>
  );
}
