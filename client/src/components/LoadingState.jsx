export default function LoadingState({ message = 'AI is thinking...' }) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-4 rounded-2xl border fade-in"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'var(--accent-light)', border: '1px solid rgba(37,99,235,0.15)' }}
      >
        <span
          className="w-4 h-4 border-2 rounded-full animate-spin"
          style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
        />
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          {message}
          <span className="thinking-dots ml-0.5">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          Generating two AI answers simultaneously
        </p>
      </div>
    </div>
  );
}
