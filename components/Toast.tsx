'use client';

import React from 'react';
import { Check, AlertCircle, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'warning' | 'error';
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', visible }) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'error':
        return 'bg-rose-500 text-white';
      case 'warning':
        return 'bg-amber-500 text-white';
      case 'success':
      default:
        return 'bg-emerald-500 text-white';
    }
  };

  const renderIcon = () => {
    switch (type) {
      case 'error':
        return <XCircle className="w-3.5 h-3.5" />;
      case 'warning':
        return <AlertCircle className="w-3.5 h-3.5" />;
      case 'success':
      default:
        return <Check className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      } bg-slate-900/95 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs border ${
        type === 'error'
          ? 'border-rose-500/50'
          : type === 'warning'
          ? 'border-amber-500/50'
          : 'border-emerald-500/50'
      } backdrop-blur-md`}
    >
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${getBadgeStyle()}`}
      >
        {renderIcon()}
      </div>
      <span className="font-medium text-slate-100">{message}</span>
    </div>
  );
};
