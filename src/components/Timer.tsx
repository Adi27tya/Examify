import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  isPaused?: boolean;
}

export const Timer: React.FC<TimerProps> = ({ initialSeconds, onTimeUp, isPaused = false }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  useEffect(() => {
    setRemainingSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isPaused) return;

    if (remainingSeconds <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds, isPaused, onTimeUp]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLowTime = remainingSeconds <= 120; // 2 minutes
  const isCritical = remainingSeconds <= 60; // 1 minute

  const percentLeft = Math.max(0, Math.min(100, (remainingSeconds / initialSeconds) * 100));

  return (
    <div className="flex items-center gap-3">
      <div 
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border transition-all ${
          isCritical
            ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
            : isLowTime
            ? 'bg-amber-50 border-amber-300 text-amber-800'
            : 'bg-blue-50/70 border-blue-200 text-blue-800'
        }`}
      >
        {isCritical ? (
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
        ) : (
          <Clock className="w-4 h-4 shrink-0 text-current" />
        )}
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider leading-none">
            {isCritical ? 'Time Expiring' : 'Time Left'}
          </span>
          <span className="text-sm font-bold font-mono tracking-tight tabular-nums mt-0.5">
            {formattedTime}
          </span>
        </div>
      </div>

      {/* Mini indicator bar for desktop */}
      <div className="hidden sm:block w-24 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
        <div 
          className={`h-full transition-all duration-1000 ${
            isCritical ? 'bg-rose-500' : isLowTime ? 'bg-amber-500' : 'bg-blue-600'
          }`}
          style={{ width: `${percentLeft}%` }}
        />
      </div>
    </div>
  );
};
