import QuestionInput from '../components/QuestionInput';
import AnswerCard from '../components/AnswerCard';
import SkeletonCard from '../components/SkeletonCard';
import JudgeSection from '../components/JudgeSection';
import LoadingState from '../components/LoadingState';
import { useBattle } from '../hooks/useBattle';
import useStreamingText from '../hooks/useStreamingText';

export default function BattlePage() {
  const { status, result, error, isLoading, submitQuestion } = useBattle();

  const {
    text: solutionOneText,
    isStreaming: isSolutionOneStreaming,
  } = useStreamingText(result?.solution_1 ?? '', {
    speed: 26,
    startDelay: 450,
  });

  const {
    text: solutionTwoText,
    isStreaming: isSolutionTwoStreaming,
  } = useStreamingText(result?.solution_2 ?? '', {
    speed: 34,
    startDelay: 650,
  });

  const winner =
    result?.judge?.solution_1_score >= result?.judge?.solution_2_score
      ? 'solution_1'
      : 'solution_2';

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--text)' }}>
          AI Battle Arena ⚡
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Ask a question. Two AIs battle. A judge decides the winner.
        </p>
      </div>

      {/* Input */}
      <QuestionInput onSubmit={submitQuestion} isLoading={isLoading} />

      {/* Error */}
      {status === 'failed' && error && (
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl border text-sm"
          style={{
            backgroundColor: '#FFF5F5',
            borderColor: '#FCA5A5',
            color: '#B91C1C',
          }}
        >
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Skeleton loading */}
      {isLoading && (
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
            Generating responses...
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      )}

      {/* Results */}
      {status === 'succeeded' && result && (
        <div className="space-y-6">
          {/* Question recap */}
          <div
            className="px-4 py-3 rounded-xl border text-sm font-medium"
            style={{
              backgroundColor: 'rgba(59,130,246,0.05)',
              borderColor: 'rgba(59,130,246,0.2)',
              color: 'var(--accent)',
            }}
          >
            🗣️ {result.question}
          </div>

          {/* Scores summary */}
          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span>
              🌪️ Mistral:{' '}
              <strong style={{ color: 'var(--text)' }}>{result.judge.solution_1_score}/10</strong>
            </span>
            <span className="text-xs">vs</span>
            <span>
              🌊 Cohere:{' '}
              <strong style={{ color: 'var(--text)' }}>{result.judge.solution_2_score}/10</strong>
            </span>
          </div>

          {(!solutionOneText && !solutionTwoText) && (
            <LoadingState message="AI is thinking..." />
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnswerCard
              solutionKey="solution_1"
              displayText={solutionOneText}
              fullText={result.solution_1}
              score={result.judge.solution_1_score}
              isWinner={winner === 'solution_1'}
              isStreaming={isSolutionOneStreaming}
            />
            <AnswerCard
              solutionKey="solution_2"
              displayText={solutionTwoText}
              fullText={result.solution_2}
              score={result.judge.solution_2_score}
              isWinner={winner === 'solution_2'}
              isStreaming={isSolutionTwoStreaming}
            />
          </div>

          {/* Judge */}
          <JudgeSection judge={result.judge} />
        </div>
      )}

      {/* Empty state */}
      {status === 'idle' && (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
          <div className="text-5xl">⚔️</div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
            Ready to Battle
          </h2>
          <p className="text-sm max-w-xs" style={{ color: 'var(--text-secondary)' }}>
            Enter a question above and watch two AI models compete. A judge scores both.
          </p>
        </div>
      )}
    </div>
  );
}
