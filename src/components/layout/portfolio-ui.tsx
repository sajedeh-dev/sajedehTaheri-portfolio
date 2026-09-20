'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { developerProfile } from '@/data/portfolio';
import { copyToClipboard } from '@/lib/clipboard';
import { scrollToSection } from '@/lib/navigation';
import { useToast } from '@/components/overlays/toast-context';

interface PortfolioUiContextValue {
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  isResumeOpen: boolean;
  openResume: () => void;
  closeResume: () => void;
  selectedProjectId: string | null;
  selectProject: (projectId: string | null) => void;
  navigateToSection: (sectionId: string) => void;
  copyEmail: () => Promise<void>;
}

const PortfolioUiContext = createContext<PortfolioUiContextValue | null>(null);

interface PortfolioUiProviderProps {
  children: ReactNode;
}

/**
 * Local UI actions shared by the shell, hero, overlays, and section triggers.
 */
export function PortfolioUiProvider({ children }: PortfolioUiProviderProps) {
  const { showToast } = useToast();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const navigateToSection = useCallback((sectionId: string) => {
    scrollToSection(sectionId);
  }, []);

  const copyEmail = useCallback(async () => {
    const didCopy = await copyToClipboard(developerProfile.email);
    if (didCopy) {
      showToast('Email copied to clipboard', `${developerProfile.email} is ready to paste.`, 'success');
      return;
    }
    showToast('کپی ایمیل انجام نشد', 'لطفاً آدرس ایمیل را به‌صورت دستی کپی کنید.', 'error');
  }, [showToast]);

  const contextValue = useMemo(
    () => ({
      isCommandPaletteOpen,
      openCommandPalette: () => setIsCommandPaletteOpen(true),
      closeCommandPalette: () => setIsCommandPaletteOpen(false),
      isResumeOpen,
      openResume: () => setIsResumeOpen(true),
      closeResume: () => setIsResumeOpen(false),
      selectedProjectId,
      selectProject: setSelectedProjectId,
      navigateToSection,
      copyEmail,
    }),
    [isCommandPaletteOpen, isResumeOpen, selectedProjectId, navigateToSection, copyEmail]
  );

  return (
    <PortfolioUiContext.Provider value={contextValue}>{children}</PortfolioUiContext.Provider>
  );
}

/**
 * Accesses shell-level UI actions.
 *
 * @returns Portfolio UI actions and overlay state.
 */
export function usePortfolioUi(): PortfolioUiContextValue {
  const context = useContext(PortfolioUiContext);
  if (!context) {
    throw new Error('usePortfolioUi must be used within PortfolioUiProvider');
  }
  return context;
}
