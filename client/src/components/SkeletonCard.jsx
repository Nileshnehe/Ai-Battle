export default function SkeletonCard() {
  return (
    <div
      className="rounded-2xl border p-5 space-y-4"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full shimmer" />
          <div className="space-y-1.5">
            <div className="h-2.5 w-16 rounded shimmer" />
            <div className="h-3.5 w-24 rounded shimmer" />
          </div>
        </div>
        <div className="h-6 w-14 rounded-full shimmer" />
      </div>

      {/* Lines */}
      <div className="space-y-2.5">
        {[100, 90, 95, 75, 85].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded shimmer"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="h-3 w-16 rounded shimmer" />
        <div className="h-7 w-16 rounded-lg shimmer" />
      </div>
    </div>
  );
}
