import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_EXAMS } from '../data/exams';
import { ExamCard } from '../components/ExamCard';
import { 
  Trophy, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  BookOpen, 
  Search, 
  ArrowUpRight, 
  History, 
  XCircle,
  FileText
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentUser, getUserResults } = useAuth();
  const navigate = useNavigate();
  const results = getUserResults();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Stats calculation
  const totalAttempts = results.length;
  const passedAttempts = results.filter(r => r.passed).length;
  const avgPercentage = totalAttempts > 0
    ? Math.round(results.reduce((acc, curr) => acc + curr.percentage, 0) / totalAttempts)
    : 0;

  // Filter exams
  const categories = ['All', 'STEM', 'General', 'Humanities', 'Aptitude', 'Technology'];

  const filteredExams = SAMPLE_EXAMS.filter(exam => {
    const matchesSearch = 
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || exam.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Map latest and best result for each exam
  const examStatsMap = SAMPLE_EXAMS.reduce((acc, exam) => {
    const examAttempts = results.filter(r => r.examId === exam.id);
    if (examAttempts.length > 0) {
      const latest = examAttempts[0]; // already sorted descending by completedAt
      const best = [...examAttempts].sort((a, b) => b.score - a.score)[0];
      acc[exam.id] = { latest, best };
    }
    return acc;
  }, {} as Record<string, { latest: typeof results[0]; best: typeof results[0] }>);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase block mb-1">
              Candidate Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {currentUser?.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Select an assessment below to challenge your knowledge, or review your historical performance analytics.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 sm:gap-6 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 shrink-0 text-center min-w-[90px]">
              <span className="block text-xl font-bold text-slate-900 tabular-nums">
                {totalAttempts}
              </span>
              <span className="text-[11px] font-medium text-slate-500">Completed</span>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl px-4 py-3 shrink-0 text-center min-w-[90px]">
              <span className="block text-xl font-bold text-emerald-700 tabular-nums">
                {passedAttempts}
              </span>
              <span className="text-[11px] font-medium text-emerald-800">Passed</span>
            </div>

            <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl px-4 py-3 shrink-0 text-center min-w-[90px]">
              <span className="block text-xl font-bold text-blue-700 tabular-nums">
                {avgPercentage}%
              </span>
              <span className="text-[11px] font-medium text-blue-800">Avg Score</span>
            </div>
          </div>
        </div>

        {/* Available Exams Section */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Available Examinations
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Standardized assessments with 10 questions each and automated grading
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search subject or topic..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of Exam Cards */}
          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map(exam => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  latestResult={examStatsMap[exam.id]?.latest}
                  bestResult={examStatsMap[exam.id]?.best}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-800">No exams match your search</p>
              <p className="text-xs text-slate-500 mt-1">Try clearing your filters to view all available exams.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        {/* "My Results" section */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                My Examination Results
              </h2>
            </div>
            {results.length > 0 && (
              <span className="text-xs text-slate-500 tabular-nums">
                {results.length} total {results.length === 1 ? 'attempt' : 'attempts'}
              </span>
            )}
          </div>

          {results.length > 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                      <th className="py-3.5 px-4 sm:px-6">Exam Title</th>
                      <th className="py-3.5 px-4">Subject</th>
                      <th className="py-3.5 px-4">Score</th>
                      <th className="py-3.5 px-4">Percentage</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Date & Time</th>
                      <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {results.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                          {item.examTitle}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {item.examSubject}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-medium tabular-nums text-slate-800">
                          {item.score} / {item.totalQuestions}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-medium tabular-nums text-slate-800">
                          {Math.round(item.percentage)}%
                        </td>
                        <td className="py-3.5 px-4">
                          {item.passed ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              PASS
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                              <XCircle className="w-3 h-3 text-rose-600" />
                              FAIL
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 tabular-nums">
                          {new Date(item.completedAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-right">
                          <button
                            type="button"
                            onClick={() => navigate(`/result/${item.id}`)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
                          >
                            <span>Review</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">No examination attempts yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4 leading-relaxed">
                Choose any test from the available examinations above to begin your first test and see your performance breakdown here.
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
              >
                Explore Exam Catalog
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
