import React from 'react';
import { Bookmark, CheckCircle2, CircleDashed } from 'lucide-react';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentIndex: number;
  userAnswers: Record<number, number>;
  markedForReview: number[];
  onSelectQuestion: (index: number) => void;
  questionIds: number[];
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  totalQuestions,
  currentIndex,
  userAnswers,
  markedForReview,
  onSelectQuestion,
  questionIds
}) => {
  const answeredCount = Object.keys(userAnswers).length;
  const markedCount = markedForReview.length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Question Navigator</h3>
        <span className="text-xs text-slate-500 tabular-nums">
          {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      {/* Grid of buttons */}
      <div className="grid grid-cols-5 gap-2.5 mb-6">
        {questionIds.map((qId, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = userAnswers[qId] !== undefined;
          const isMarked = markedForReview.includes(qId);

          let buttonStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

          if (isCurrent) {
            buttonStyle = 'bg-blue-600 border-blue-600 text-white shadow-sm ring-2 ring-blue-300 font-bold';
          } else if (isAnswered && isMarked) {
            buttonStyle = 'bg-amber-100 border-amber-400 text-amber-900 font-semibold';
          } else if (isMarked) {
            buttonStyle = 'bg-purple-100 border-purple-400 text-purple-900 font-semibold';
          } else if (isAnswered) {
            buttonStyle = 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold';
          }

          return (
            <button
              key={qId}
              type="button"
              onClick={() => onSelectQuestion(idx)}
              className={`relative h-10 w-full rounded-lg border text-xs flex items-center justify-center transition-all cursor-pointer ${buttonStyle}`}
              aria-label={`Jump to question ${idx + 1}`}
            >
              <span>{idx + 1}</span>
              {isMarked && !isCurrent && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full border border-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* Summary Tallies */}
      <div className="space-y-2 text-xs pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span>Answered</span>
          </div>
          <span className="font-semibold text-slate-900 tabular-nums">{answeredCount}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300 inline-block" />
            <span>Unanswered</span>
          </div>
          <span className="font-semibold text-slate-900 tabular-nums">{unansweredCount}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
            <span>Marked for Review</span>
          </div>
          <span className="font-semibold text-slate-900 tabular-nums">{markedCount}</span>
        </div>
      </div>
    </div>
  );
};
