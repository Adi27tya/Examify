import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_EXAMS } from '../data/exams';
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  BarChart3, 
  UserPlus, 
  ListChecks, 
  PenTool, 
  Trophy,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleExamClick = (examId: string) => {
    if (currentUser) {
      navigate(`/exam/${examId}`);
    } else {
      navigate('/signin', { state: { redirectTo: `/exam/${examId}` } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50 pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Header kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Standardized Assessment Environment</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight md:leading-[1.15] mb-6" style={{ textWrap: 'balance' }}>
              Master Assessments with Confidence on <span className="text-blue-600">Examify</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              An intuitive, precision-engineered online examination platform. Experience timed multiple-choice assessments, automated grading, instant analytical scorecards, and comprehensive question reviews.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <span>Sign Up Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/signin"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Sign In</span>
                  </Link>
                </>
              )}
            </div>

            {/* Trust Markers */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>6 Standardized Subjects</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Automated Timed Submissions</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Instant Diagnostic Scoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "How it works" section */}
      <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              How It Works
            </h2>
            <p className="text-sm text-slate-500">
              Four straightforward steps from account creation to detailed performance review.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <UserPlus className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 1</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Sign Up</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Create your student profile in seconds using your name and email.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <ListChecks className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Step 2</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Choose an Exam</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Browse our catalog across STEM, Humanities, General Knowledge, and Aptitude.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <PenTool className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Step 3</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Take the Test</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Answer one question at a time, track time, and mark tough questions for review.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Step 4</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">See Your Result</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive instant scoring, pass/fail status, and a full question-by-question explanation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Catalog Preview */}
      <section id="catalog" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
                Explore Assessments
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Available Examinations
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Each exam features 10 curated multiple-choice questions with 4 options, timed constraints, and comprehensive answer keys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_EXAMS.map(exam => (
              <div
                key={exam.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-semibold uppercase tracking-wider text-blue-600">
                      {exam.subject}
                    </span>
                    <span>{exam.difficulty}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {exam.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {exam.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 py-3 border-y border-slate-100 mb-5 tabular-nums">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exam.durationMinutes} Mins</span>
                    </div>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <div className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>10 Questions</span>
                    </div>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>40% Pass</span>
                  </div>
                </div>

                <button
                  onClick={() => handleExamClick(exam.id)}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{currentUser ? 'Start Exam' : 'Sign In to Start'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              Built for Testing Integrity & Speed
            </h2>
            <p className="text-sm text-slate-500">
              Everything students need for a frictionless, stress-free testing experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Automated Timekeeper</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Real-time synchronized countdown timer that automatically packages and grades your submission when the timer expires.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Instant Granular Scorecards</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Immediately know your score, total correct, incorrect, and skipped counts with percentage calculation against the 40% threshold.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                <ListChecks className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Question Palette & Review</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Jump across any question, toggle questions for review, and inspect complete educational explanations once completed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
