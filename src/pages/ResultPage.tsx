import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_EXAMS } from '../data/exams';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  HelpCircle, 
  Clock, 
  RotateCcw, 
  ArrowLeft, 
  Trophy, 
  Check, 
  X, 
  BookOpen, 
  Share2 
} from 'lucide-react';

export const ResultPage: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const { getResultById } = useAuth();

  const [filterMode, setFilterMode] = useState<'all' | 'correct' | 'wrong' | 'unanswered'>('all');

  const result = useMemo(() => {
    return resultId ? getResultById(resultId) : undefined;
  }, [resultId, getResultById]);

  const exam = useMemo(() => {
    return result ? SAMPLE_EXAMS.find(e => e.id === result.examId) : undefined;
  }, [result]);

  if (!result || !exam) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md w-full text-center shadow-sm">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900 mb-1">Result Not Found</h2>
          <p className="text-xs text-slate-500 mb-6">
            The requested examination report could not be found or has expired.
          </p>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Filter question items
  const filteredQuestions = exam.questions.filter(q => {
    const userAnswer = result.userAnswers[q.id];
    const isUnanswered = userAnswer === undefined;
    const isCorrect = userAnswer === q.correctAnswerIndex;
    const isWrong = !isUnanswered && !isCorrect;

    if (filterMode === 'correct') return isCorrect;
    if (filterMode === 'wrong') return isWrong;
    if (filterMode === 'unanswered') return isUnanswered;
    return true;
  });

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation row */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => navigate(`/exam/${exam.id}`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam</span>
          </button>
        </div>

        {/* Hero Score Card */}
        <div className={`rounded-2xl border p-6 sm:p-8 shadow-sm ${
          result.passed 
            ? 'bg-gradient-to-br from-white via-emerald-50/30 to-emerald-50/60 border-emerald-200' 
            : 'bg-gradient-to-br from-white via-rose-50/30 to-rose-50/60 border-rose-200'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                {result.passed ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    EXAMINATION PASSED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    FAILED (PASS MARK: 40%)
                  </span>
                )}
                <span className="text-xs text-slate-500">· {exam.subject}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {exam.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Completed on {new Date(result.completedAt).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {/* Score circle */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs text-center shrink-0 min-w-[140px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Total Score
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                {result.score}<span className="text-slate-400 text-xl font-medium">/{result.totalQuestions}</span>
              </div>
              <span className={`text-xs font-bold mt-1 block tabular-nums ${
                result.passed ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {Math.round(result.percentage)}%
              </span>
            </div>
          </div>

          {/* Granular metric counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-200/60">
            <div className="bg-white/80 rounded-xl p-3 border border-slate-200 text-center">
              <span className="text-lg font-bold text-emerald-700 block tabular-nums">
                {result.correctCount}
              </span>
              <span className="text-[11px] font-medium text-slate-500">Correct Answers</span>
            </div>

            <div className="bg-white/80 rounded-xl p-3 border border-slate-200 text-center">
              <span className="text-lg font-bold text-rose-700 block tabular-nums">
                {result.wrongCount}
              </span>
              <span className="text-[11px] font-medium text-slate-500">Wrong Answers</span>
            </div>

            <div className="bg-white/80 rounded-xl p-3 border border-slate-200 text-center">
              <span className="text-lg font-bold text-slate-600 block tabular-nums">
                {result.unansweredCount}
              </span>
              <span className="text-[11px] font-medium text-slate-500">Unanswered</span>
            </div>

            <div className="bg-white/80 rounded-xl p-3 border border-slate-200 text-center">
              <span className="text-lg font-bold text-blue-700 block tabular-nums">
                {formatSeconds(result.timeSpentSeconds)}
              </span>
              <span className="text-[11px] font-medium text-slate-500">Time Taken</span>
            </div>
          </div>
        </div>

        {/* Detailed Question Review Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Detailed Question Review
              </h2>
              <p className="text-xs text-slate-500">
                Inspect your responses, correct answers, and conceptual explanations
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold overflow-x-auto">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  filterMode === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({exam.totalQuestions})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('correct')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  filterMode === 'correct' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Correct ({result.correctCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('wrong')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  filterMode === 'wrong' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Wrong ({result.wrongCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('unanswered')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  filterMode === 'unanswered' ? 'bg-slate-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Skipped ({result.unansweredCount})
              </button>
            </div>
          </div>

          {/* Question cards list */}
          <div className="space-y-4">
            {filteredQuestions.map((question, idx) => {
              const userAnswerIndex = result.userAnswers[question.id];
              const isUnanswered = userAnswerIndex === undefined;
              const isCorrect = userAnswerIndex === question.correctAnswerIndex;
              const isWrong = !isUnanswered && !isCorrect;

              return (
                <div
                  key={question.id}
                  className={`bg-white rounded-xl border p-5 sm:p-6 shadow-xs transition-all ${
                    isCorrect
                      ? 'border-emerald-200/80 hover:border-emerald-300'
                      : isWrong
                      ? 'border-rose-200/80 hover:border-rose-300'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Status header */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Question {question.id}
                    </span>

                    {isCorrect && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Correct (+1)
                      </span>
                    )}

                    {isWrong && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                        <X className="w-3.5 h-3.5 text-rose-600" />
                        Incorrect (0)
                      </span>
                    )}

                    {isUnanswered && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                        Skipped (0)
                      </span>
                    )}
                  </div>

                  {/* Question Prompt */}
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-4 leading-snug">
                    {question.question}
                  </h3>

                  {/* Options List */}
                  <div className="grid grid-cols-1 gap-2 mb-4">
                    {question.options.map((optText, optIdx) => {
                      const isCandidateChoice = userAnswerIndex === optIdx;
                      const isActualCorrect = question.correctAnswerIndex === optIdx;
                      const optionLetter = String.fromCharCode(65 + optIdx);

                      let containerStyle = 'bg-slate-50/60 border-slate-200 text-slate-700';
                      let badgeStyle = 'bg-slate-200 text-slate-700';

                      if (isActualCorrect) {
                        containerStyle = 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium ring-1 ring-emerald-300';
                        badgeStyle = 'bg-emerald-600 text-white';
                      } else if (isCandidateChoice && !isCorrect) {
                        containerStyle = 'bg-rose-50/80 border-rose-300 text-rose-950 ring-1 ring-rose-300';
                        badgeStyle = 'bg-rose-600 text-white';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`flex items-center justify-between p-3 rounded-lg border text-xs transition-colors ${containerStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] ${badgeStyle}`}>
                              {optionLetter}
                            </span>
                            <span>{optText}</span>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] font-semibold shrink-0">
                            {isActualCorrect && (
                              <span className="text-emerald-700 flex items-center gap-1">
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                Correct Answer
                              </span>
                            )}
                            {isCandidateChoice && !isActualCorrect && (
                              <span className="text-rose-700 flex items-center gap-1">
                                <X className="w-3.5 h-3.5 text-rose-600" />
                                Your Choice
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Callout */}
                  <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-blue-950 flex items-start gap-2.5">
                    <BookOpen className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-blue-900 block mb-0.5">Explanation</span>
                      <p className="text-slate-700 leading-relaxed">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredQuestions.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                No questions found under the selected &quot;{filterMode}&quot; filter.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Back to Dashboard
          </button>

          <button
            type="button"
            onClick={() => navigate(`/exam/${exam.id}`)}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Retake This Exam
          </button>
        </div>
      </div>
    </div>
  );
};
