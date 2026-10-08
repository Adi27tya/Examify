import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SAMPLE_EXAMS } from '../data/exams';
import { useAuth } from '../context/AuthContext';
import { Timer } from '../components/Timer';
import { QuestionPalette } from '../components/QuestionPalette';
import { SubmitModal } from '../components/SubmitModal';
import { 
  Clock, 
  HelpCircle, 
  ShieldAlert, 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  BookmarkCheck, 
  RotateCcw, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

export const ExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { saveResult } = useAuth();

  const exam = useMemo(() => {
    return SAMPLE_EXAMS.find(e => e.id === examId);
  }, [examId]);

  // Exam flow states
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // If exam doesn't exist, redirect to dashboard
  useEffect(() => {
    if (!exam) {
      navigate('/dashboard', { replace: true });
    }
  }, [exam, navigate]);

  if (!exam) return null;

  const currentQuestion = exam.questions[currentQuestionIndex];
  const questionIds = exam.questions.map(q => q.id);

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = exam.totalQuestions - answeredCount;
  const markedCount = markedForReview.length;

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleClearResponse = () => {
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const handleToggleMarkReview = () => {
    setMarkedForReview(prev => {
      if (prev.includes(currentQuestion.id)) {
        return prev.filter(id => id !== currentQuestion.id);
      } else {
        return [...prev, currentQuestion.id];
      }
    });
  };

  const handleStartExam = () => {
    setHasStarted(true);
    setStartTime(Date.now());
  };

  // Submission calculation
  const handleFinalSubmit = useCallback(() => {
    setIsSubmitModalOpen(false);

    let correctCount = 0;
    exam.questions.forEach(q => {
      const selected = userAnswers[q.id];
      if (selected !== undefined && selected === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });

    const answeredTotal = Object.keys(userAnswers).length;
    const unansweredTotal = exam.totalQuestions - answeredTotal;
    const wrongCount = answeredTotal - correctCount;
    const percentage = (correctCount / exam.totalQuestions) * 100;
    const passed = percentage >= exam.passingPercentage;

    const timeSpentSeconds = startTime 
      ? Math.round((Date.now() - startTime) / 1000) 
      : exam.durationMinutes * 60;

    const savedResult = saveResult({
      examId: exam.id,
      examTitle: exam.title,
      examSubject: exam.subject,
      totalQuestions: exam.totalQuestions,
      answeredCount: answeredTotal,
      unansweredCount: unansweredTotal,
      correctCount,
      wrongCount,
      score: correctCount,
      percentage,
      passed,
      timeSpentSeconds,
      userAnswers,
      markedForReview
    });

    navigate(`/result/${savedResult.id}`, { replace: true });
  }, [exam, userAnswers, markedForReview, startTime, saveResult, navigate]);

  // Handle timer expiry auto-submission
  const handleTimeUp = useCallback(() => {
    // Automatically submit when timer hits 0
    handleFinalSubmit();
  }, [handleFinalSubmit]);

  // Instructions screen before beginning
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
            {/* Header info */}
            <div className="border-b border-slate-100 pb-6 mb-6">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
                Candidate Assessment Briefing
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {exam.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                {exam.description}
              </p>
            </div>

            {/* Assessment parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-center">
                <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
                <span className="text-xs text-slate-500 block">Duration</span>
                <span className="text-sm font-bold text-slate-900 tabular-nums">
                  {exam.durationMinutes} Minutes
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-center">
                <HelpCircle className="w-5 h-5 text-indigo-600 mx-auto mb-1.5" />
                <span className="text-xs text-slate-500 block">Questions</span>
                <span className="text-sm font-bold text-slate-900 tabular-nums">
                  {exam.totalQuestions} MCQs
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
                <span className="text-xs text-slate-500 block">Pass Mark</span>
                <span className="text-sm font-bold text-slate-900 tabular-nums">
                  {exam.passingPercentage}% ({Math.ceil(exam.totalQuestions * 0.4)} Correct)
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-center">
                <ShieldAlert className="w-5 h-5 text-amber-600 mx-auto mb-1.5" />
                <span className="text-xs text-slate-500 block">Format</span>
                <span className="text-sm font-bold text-slate-900">
                  4 Options Single Choice
                </span>
              </div>
            </div>

            {/* Rules list */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-bold text-slate-900">Important Instructions</h3>
              <ul className="space-y-2.5 text-xs text-slate-600 list-disc pl-5 leading-relaxed">
                <li>
                  <strong>Synchronized Countdown:</strong> The examination timer begins immediately upon clicking &quot;Begin Exam&quot;. When the timer reaches 00:00, your test will auto-submit.
                </li>
                <li>
                  <strong>One Question per Screen:</strong> You can navigate freely between questions using the Next and Previous buttons, or by clicking any question number on the navigator palette.
                </li>
                <li>
                  <strong>Review Feature:</strong> If you are uncertain about an answer, you can click &quot;Mark for Review&quot; to highlight the question and revisit it before final submission.
                </li>
                <li>
                  <strong>Scoring Scheme:</strong> Each correct answer awards 1 point. There is no negative marking for incorrect or unanswered questions.
                </li>
                <li>
                  <strong>Submission Confirmation:</strong> You will be shown a summary of your answered and unanswered questions before confirming your final submission.
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Ready to start? Ensure a stable connection and quiet environment.
              </span>
              <button
                type="button"
                onClick={handleStartExam}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Begin Exam</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Exam Interface
  const isQuestionAnswered = userAnswers[currentQuestion.id] !== undefined;
  const isQuestionMarked = markedForReview.includes(currentQuestion.id);

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Top Fixed Exam Header Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div>
              <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider block">
                {exam.subject} Assessment
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                {exam.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Real-time countdown timer */}
            <Timer
              initialSeconds={exam.durationMinutes * 60}
              onTimeUp={handleTimeUp}
            />

            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Exam</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Examination Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question Viewport (8 Columns on desktop) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              {/* Question Header */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Question {currentQuestionIndex + 1}
                  </span>
                  <span className="text-xs text-slate-400">of {exam.totalQuestions}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleMarkReview}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isQuestionMarked
                        ? 'bg-purple-100 text-purple-800 border border-purple-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-transparent'
                    }`}
                  >
                    {isQuestionMarked ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5 text-purple-600" />
                        <span>Marked for Review</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                        <span>Mark for Review</span>
                      </>
                    )}
                  </button>

                  {isQuestionAnswered && (
                    <button
                      type="button"
                      onClick={handleClearResponse}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Clear selected option"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Question Statement */}
              <div className="mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* 4 Radio-button Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((optionText, optIdx) => {
                  const isSelected = userAnswers[currentQuestion.id] === optIdx;
                  const optionLabel = String.fromCharCode(65 + optIdx); // A, B, C, D

                  return (
                    <label
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`flex items-center gap-3.5 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                        isSelected
                          ? 'bg-blue-50/70 border-blue-500 ring-1 ring-blue-500 text-slate-900 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <input
                          type="radio"
                          name={`question_${currentQuestion.id}`}
                          value={optIdx}
                          checked={isSelected}
                          onChange={() => handleSelectOption(optIdx)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center gap-3 flex-1">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {optionLabel}
                        </span>
                        <span className="text-sm font-medium">{optionText}</span>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-3">
                  {currentQuestionIndex < exam.totalQuestions - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <span>Review & Submit</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Question Palette (4 Columns on desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <QuestionPalette
              totalQuestions={exam.totalQuestions}
              currentIndex={currentQuestionIndex}
              userAnswers={userAnswers}
              markedForReview={markedForReview}
              onSelectQuestion={setCurrentQuestionIndex}
              questionIds={questionIds}
            />

            {/* Quick Summary Pill Bar */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-xs text-slate-600 shadow-xs">
              <span className="font-semibold text-slate-900 block mb-1">Keyboard & Fast Navigation</span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Click any question number above to jump instantly. You may submit anytime once you feel ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleFinalSubmit}
        totalQuestions={exam.totalQuestions}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        markedCount={markedCount}
        examTitle={exam.title}
      />
    </div>
  );
};
