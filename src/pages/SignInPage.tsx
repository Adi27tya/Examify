import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, AlertCircle, CheckCircle2, Eye, EyeOff, Mail, Lock, KeyRound } from 'lucide-react';

export const SignInPage: React.FC = () => {
  const { signIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check state passed from navigation or redirect
  useEffect(() => {
    if (location.state?.message) {
      setSuccessNotice(location.state.message);
    }
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  // If already logged in, redirect
  useEffect(() => {
    if (currentUser) {
      const target = location.state?.from?.pathname || location.state?.redirectTo || '/dashboard';
      navigate(target, { replace: true });
    }
  }, [currentUser, navigate, location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError('Please provide both your email address and password.');
      return;
    }

    setIsSubmitting(true);
    const result = signIn(trimmedEmail, password);
    setIsSubmitting(false);

    if (result.success) {
      const target = location.state?.from?.pathname || location.state?.redirectTo || '/dashboard';
      navigate(target, { replace: true });
    } else {
      setError(result.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  const fillDemoAccount = () => {
    setEmail('alex@example.com');
    setPassword('password123');
    setError(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Exam<span className="text-blue-600">ify</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900">Sign In to Your Account</h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your examination terminal and review historical scores
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-7 sm:p-8">
          {successNotice && (
            <div className="flex items-start gap-2.5 p-3.5 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successNotice}</span>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2.5 p-3.5 mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="signin-email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="signin-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700" htmlFor="signin-password">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="signin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-10 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                {isSubmitting ? 'Verifying...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-5 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
            <div className="text-xs">
              <span className="font-semibold text-blue-900 block">Demo Candidate:</span>
              <span className="text-blue-700 font-mono text-[11px]">alex@example.com / password123</span>
            </div>
            <button
              type="button"
              onClick={fillDemoAccount}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-white border border-blue-200 rounded-md hover:bg-blue-100/50 transition-colors cursor-pointer"
            >
              <KeyRound className="w-3 h-3" />
              <span>Fill</span>
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
