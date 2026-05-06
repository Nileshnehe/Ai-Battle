export default function SkeletonCard() {
  return (
    <div
      className="rounded-[20px] border p-6 space-y-5"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl shimmer flex-shrink-0" />
          <div className="space-y-2">
            <div className="h-2 w-16 rounded shimmer" />
            <div className="h-3.5 w-24 rounded shimmer" />
            <div className="h-2 w-12 rounded shimmer" />
          </div>
        </div>
        <div className="h-6 w-14 rounded-full shimmer" />
      </div>

      {/* Divider */}
      <div className="h-px shimmer rounded" />

      {/* Thinking indicator */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full shimmer" />
        <div className="h-3 w-20 rounded shimmer" />
      </div>

      {/* Content lines */}
      <div className="space-y-3">
        {[100, 92, 97, 78, 88, 70].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded shimmer"
            style={{ width: `${w}%`, animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-4 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="h-3 w-16 rounded shimmer" />
        <div className="h-7 w-16 rounded-lg shimmer" />
      </div>
    </div>
  );
}
