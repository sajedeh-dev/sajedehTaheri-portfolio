'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ToastMessage } from '@/types/portfolio';

interface ToastContextValue {
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  dismissToast: (toastId: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: ReactNode;
}

/**
 * Holds ephemeral toast notifications for copy/theme feedback.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((toastId: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== toastId));
  }, []);

  const showToast = useCallback(
    (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
      const toastId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((currentToasts) => [
        ...currentToasts,
        { id: toastId, title, description, type },
      ]);
      window.setTimeout(() => {
        dismissToast(toastId);
      }, 4000);
    },
    [dismissToast]
  );

  const contextValue = useMemo(
    () => ({ toasts, showToast, dismissToast }),
    [toasts, showToast, dismissToast]
  );

  return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>;
}

/**
 * Accesses the toast notification helpers.
 *
 * @returns Toast state and actions.
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
