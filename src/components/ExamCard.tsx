import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Exam, ExamResult } from '../types';
import { 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Calculator, 
  Atom, 
  Binary, 
  BrainCircuit, 
  Globe2 
} from 'lucide-react';

interface ExamCardProps {
  exam: Exam;
  latestResult?: ExamResult;
  bestResult?: ExamResult;
}

const getSubjectIcon = (subject: string) => {
  switch (subject) {
    case 'General Knowledge':
      return <Globe2 className="w-5 h-5 text-blue-600" />;
    case 'Mathematics':
      return <Calculator className="w-5 h-5 text-indigo-600" />;
    case 'Science':
      return <Atom className="w-5 h-5 text-emerald-600" />;
    case 'English':
      return <BookOpen className="w-5 h-5 text-purple-600" />;
    case 'Computer Basics':
      return <Binary className="w-5 h-5 text-cyan-600" />;
    case 'Reasoning':
      return <BrainCircuit className="w-5 h-5 text-amber-600" />;
    default:
      return <BookOpen className="w-5 h-5 text-blue-600" />;
  }
};

export const ExamCard: React.FC<ExamCardProps> = ({ exam, latestResult, bestResult }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between p-6">
      <div>
        {/* Header line with icon and subject metadata */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
              {getSubjectIcon(exam.subject)}
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {exam.subject}
              </span>
              <span className="text-xs text-slate-400">
                {exam.difficulty} Level
              </span>
            </div>
          </div>

          {bestResult && (
            <div className="text-right">
              <span className={`text-xs font-semibold ${bestResult.passed ? 'text-emerald-600' : 'text-slate-500'}`}>
                Best: {bestResult.score}/{bestResult.totalQuestions} ({Math.round(bestResult.percentage)}%)
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
          {exam.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {exam.description}
        </p>

        {/* Metadata info */}
        <div className="flex items-center gap-4 text-xs text-slate-500 py-3 border-y border-slate-100 mb-4 tabular-nums">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{exam.durationMinutes} mins</span>
          </div>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>{exam.totalQuestions} questions</span>
          </div>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Pass: {exam.passingPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-1">
        <button
          onClick={() => navigate(`/exam/${exam.id}`)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm shadow-blue-500/10 cursor-pointer"
        >
          <span>{latestResult ? 'Retake Exam' : 'Start Exam'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
