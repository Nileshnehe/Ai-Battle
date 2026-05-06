export default function ScoreBadge({ score, isWinner }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide"
      style={
        isWinner
          ? { backgroundColor: 'var(--winner-bg)', color: 'var(--winner)' }
          : { backgroundColor: '#F3F4F6', color: 'var(--text-secondary)' }
      }
    >
      {score}/10 {isWinner && '🏆'}
    </span>
  );
}
