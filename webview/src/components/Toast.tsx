import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => dismiss(), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => onDismiss(toast.id), 350);
  };

  const config = {
    success: {
      border: 'rgba(16,185,129,0.3)',
      bg: 'rgba(16,185,129,0.08)',
      glow: 'rgba(16,185,129,0.15)',
      iconColor: '#4ade80',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
        </svg>
      ),
    },
    error: {
      border: 'rgba(239,68,68,0.3)',
      bg: 'rgba(239,68,68,0.08)',
      glow: 'rgba(239,68,68,0.15)',
      iconColor: '#f87171',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
    info: {
      border: 'rgba(59,130,246,0.3)',
      bg: 'rgba(59,130,246,0.08)',
      glow: 'rgba(59,130,246,0.15)',
      iconColor: '#60a5fa',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
    },
  }[toast.type];

  return (
    <div
      onClick={dismiss}
      style={{
        border: `1px solid ${config.border}`,
        background: config.bg,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${config.glow}`,
        transform: visible && !exiting ? 'translateX(0) scale(1)' : 'translateX(calc(100% + 24px)) scale(0.95)',
        opacity: visible && !exiting ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease',
        backdropFilter: 'blur(16px)',
      }}
      className="flex items-start gap-3 px-4 py-3.5 rounded-2xl cursor-pointer min-w-[280px] max-w-[340px] relative overflow-hidden"
    >
      {/* Shimmer line */}
      <div className="toast-shimmer absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${config.iconColor}60, transparent)` }} />

      <span style={{ color: config.iconColor }} className="shrink-0 mt-0.5">{config.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white leading-tight">{toast.title}</div>
        {toast.description && (
          <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{toast.description}</div>
        )}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); dismiss(); }}
        className="shrink-0 text-slate-600 hover:text-slate-300 transition-colors border-none bg-transparent cursor-pointer p-0 mt-0.5"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2.5 z-50 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}
