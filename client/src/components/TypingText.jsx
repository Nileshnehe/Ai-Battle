export default function TypingText({ text, placeholder, isStreaming }) {
  if (!text) {
    return (
      <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
        {isStreaming ? (
          <span className="inline-flex items-center gap-1.5">
            <span>Thinking</span>
            <span className="thinking-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </span>
        ) : (
          placeholder
        )}
      </p>
    );
  }

  const lines = text.split('\n');

  return (
    <div className="text-sm leading-relaxed">
      {lines.map((line, index) => (
        <p
          key={`${index}-${line.slice(0, 20)}`}
          className="transition-opacity duration-300"
          style={{ opacity: line ? 1 : 0.6, marginBottom: line ? '0.5em' : '0.25em' }}
        >
          {line || '\u00A0'}
        </p>
      ))}

      {isStreaming && <span className="cursor-blink" aria-hidden="true" />}
    </div>
  );
}
