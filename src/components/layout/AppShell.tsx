'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { getVisibleNavigationItems } from '@/data/portfolio';
import { getActiveSectionId } from '@/lib/navigation';
import { ToastProvider } from '@/components/overlays/toast-context';
import { Toast } from '@/components/overlays/Toast';
import { CommandPalette } from '@/components/overlays/CommandPalette';
import { ResumeModal } from '@/components/overlays/ResumeModal';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PortfolioUiProvider, usePortfolioUi } from '@/components/layout/portfolio-ui';

interface AppShellProps {
  children: ReactNode;
}

function ShellChrome({ children }: AppShellProps) {
  const { openCommandPalette, closeCommandPalette, isCommandPaletteOpen } = usePortfolioUi();
  const [activeSection, setActiveSection] = useState('hero');
  const visibleSectionIds = useMemo(
    () => getVisibleNavigationItems().map((item) => item.id),
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setActiveSection(getActiveSectionId(visibleSectionIds));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSectionIds]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (isCommandPaletteOpen) {
          closeCommandPalette();
        } else {
          openCommandPalette();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, openCommandPalette, closeCommandPalette]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 transition-colors duration-200 dark:bg-[#0F0E0D] dark:text-stone-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-stone-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Navbar activeSection={activeSection} />
      <main id="main-content">{children}</main>
      <Footer />
      <CommandPalette />
      <ResumeModal />
      <Toast />
    </div>
  );
}

/**
 * Client chrome around server-rendered homepage sections.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <ToastProvider>
      <PortfolioUiProvider>
        <ShellChrome>{children}</ShellChrome>
      </PortfolioUiProvider>
    </ToastProvider>
  );
}
