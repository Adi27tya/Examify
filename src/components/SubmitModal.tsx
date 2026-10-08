import React from 'react';
import { AlertCircle, CheckCircle2, Bookmark, HelpCircle } from 'lucide-react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  markedCount: number;
  examTitle: string;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalQuestions,
  answeredCount,
  unansweredCount,
  markedCount,
  examTitle
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-modal-title"
    >
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 id="submit-modal-title" className="text-base font-bold text-slate-900">
              Submit Examination?
            </h3>
            <p className="text-xs text-slate-500 line-clamp-1">{examTitle}</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-5 leading-relaxed">
          Please review your attempt status before finalizing. Once submitted, your answers will be permanently graded.
        </p>

        {/* Status tally cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-5 text-center">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
            <span className="block text-xl font-bold text-emerald-700 tabular-nums">
              {answeredCount}
            </span>
            <span className="text-[11px] font-medium text-emerald-800">Answered</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <span className="block text-xl font-bold text-slate-700 tabular-nums">
              {unansweredCount}
            </span>
            <span className="text-[11px] font-medium text-slate-600">Unanswered</span>
          </div>

          <div className="bg-purple-50 border border-purple-100 rounded-xl p-3">
            <span className="block text-xl font-bold text-purple-700 tabular-nums">
              {markedCount}
            </span>
            <span className="text-[11px] font-medium text-purple-800">Marked</span>
          </div>
        </div>

        {unansweredCount > 0 && (
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs mb-5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              You still have <strong>{unansweredCount} unanswered</strong> {unansweredCount === 1 ? 'question' : 'questions'}. Unanswered questions will receive 0 marks.
            </span>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Review Questions
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Yes, Finalize & Submit
          </button>
        </div>
      </div>
    </div>
  );
};
