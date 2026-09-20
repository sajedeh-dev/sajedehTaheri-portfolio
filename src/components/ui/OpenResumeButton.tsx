'use client';

import type { ReactNode } from 'react';
import { usePortfolioUi } from '@/components/layout/portfolio-ui';

interface OpenResumeButtonProps {
  children: ReactNode;
  className?: string;
}

/**
 * Client trigger that opens the in-page curriculum vitae dialog.
 */
export function OpenResumeButton({ children, className }: OpenResumeButtonProps) {
  const { openResume } = usePortfolioUi();

  return (
    <button type="button" onClick={openResume} className={className}>
      {children}
    </button>
  );
}
