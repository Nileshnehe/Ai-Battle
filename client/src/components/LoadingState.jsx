export default function LoadingState({ message = 'AI is thinking...' }) {
  return (
    <div
      className="rounded-3xl border p-6 flex items-center gap-4"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <span
        className="w-12 h-12 rounded-full border-4 border-current border-t-transparent animate-spin"
        style={{ color: 'var(--accent)' }}
      />
      <div>
        <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          {message}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Generating two AI answers in real time...
        </p>
      </div>
    </div>
  );
}
