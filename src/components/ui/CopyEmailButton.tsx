'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { usePortfolioUi } from '@/components/layout/portfolio-ui';

interface CopyEmailButtonProps {
  className?: string;
}

/**
 * Copies the profile email and shows local confirmation on the control.
 */
export function CopyEmailButton({ className = '' }: CopyEmailButtonProps) {
  const { copyEmail } = usePortfolioUi();
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    await copyEmail();
    setHasCopied(true);
    window.setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`cursor-pointer rounded p-1.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-100 ${className}`}
      aria-label={hasCopied ? 'Email copied' : 'Copy email address'}
    >
      {hasCopied ? (
        <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}
