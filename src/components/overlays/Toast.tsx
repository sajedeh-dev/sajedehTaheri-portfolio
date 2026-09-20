'use client';

import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useToast } from '@/components/overlays/toast-context';

/**
 * Live region for transient success and error messages.
 */
export function Toast() {
  const { toasts, dismissToast } = useToast();

  return (
    <div
      className="pointer-events-none fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4 text-stone-800 shadow-xl animate-toast dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200"
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            )}
            {toast.type === 'info' && <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            {toast.type === 'error' && (
              <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{toast.title}</p>
            {toast.description && (
              <p className="mt-0.5 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                {toast.description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 rounded p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-100"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
