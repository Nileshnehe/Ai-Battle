export default function TypingText({ text, placeholder, isStreaming }) {
  const lines = text.split('\n');

  return (
    <div className="text-sm leading-relaxed space-y-2">
      {text ? (
        lines.map((line, index) => (
          <p
            key={`${index}-${line}`}
            className="transition-opacity duration-300"
            style={{ opacity: line ? 1 : 0.65 }}
          >
            {line || '\u00A0'}
          </p>
        ))
      ) : (
        <p className="text-sm text-gray-400">{placeholder}</p>
      )}

      {isStreaming && (
        <span
          className="inline-block h-5 w-1 rounded-sm bg-current animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
