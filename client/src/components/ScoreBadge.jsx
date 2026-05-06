export default function ScoreBadge({ score, isWinner }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all duration-200"
      style={
        isWinner
          ? {
              backgroundColor: 'var(--winner-bg)',
              color: 'var(--winner)',
              border: '1px solid rgba(22,163,74,0.3)',
            }
          : {
              backgroundColor: '#F3F4F6',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
            }
      }
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: isWinner ? 'var(--winner)' : 'var(--text-tertiary)' }}
      />
      {score}/10
    </span>
  );
}
