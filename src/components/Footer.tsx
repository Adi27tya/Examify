import React from 'react';
import { GraduationCap, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">Examify</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Standardized online examination environment for students, educators, and certification seekers.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-3">Core Subjects</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>General Knowledge</li>
              <li>Essential Mathematics</li>
              <li>General Science</li>
              <li>English Language</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-3">Platform Integrity</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Synchronized Timer Engine</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant Diagnostic Scoring</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Review Explanations</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-3">Quick Access</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/signin" className="hover:text-blue-600 transition-colors">Candidate Sign In</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-blue-600 transition-colors">Create Candidate Account</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Exam Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Examify Assessment Systems. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Pass Threshold: 40%</span>
            <span aria-hidden="true">·</span>
            <span>Local Secure Session</span>
            <span aria-hidden="true">·</span>
            <span>Automated Submission Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
