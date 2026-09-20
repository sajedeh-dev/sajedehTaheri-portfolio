'use client';

import { useEffect, useRef, useState } from 'react';
import { Code, Menu, X } from 'lucide-react';
import { developerProfile, getVisibleNavigationItems } from '@/data/portfolio';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { usePortfolioUi } from '@/components/layout/portfolio-ui';

interface NavbarProps {
  activeSection: string;
}

/**
 * Fixed site header with section links and theme controls.
 */
export function Navbar({ activeSection }: NavbarProps) {
  const { navigateToSection } = usePortfolioUi();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navLinks = getVisibleNavigationItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const firstLink = mobileMenuRef.current?.querySelector('a');
    firstLink?.focus();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);
    navigateToSection(sectionId);
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'border-b border-stone-200 bg-[#FAF8F5]/90 py-3 shadow-xs backdrop-blur-md dark:border-stone-800 dark:bg-[#0F0E0D]/90'
          : 'border-b border-stone-200/60 bg-[#FAF8F5]/60 py-4 backdrop-blur-sm dark:border-stone-800/60 dark:bg-[#0F0E0D]/60'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-8">
        <a
          href="#hero"
          onClick={(event) => handleNavClick(event, 'hero')}
          className="group flex items-center gap-3"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 font-mono text-xs font-bold text-white shadow-xs transition-colors group-hover:bg-rose-600 dark:bg-stone-100 dark:text-stone-900 dark:group-hover:bg-rose-500 dark:group-hover:text-white">
            <Code className="h-4 w-4" />
          </div>
          <span className="font-display text-base tracking-tight text-stone-900 transition-colors group-hover:text-rose-600 dark:text-stone-100 dark:group-hover:text-rose-400">
            {developerProfile.name}
          </span>
        </a>

        <nav
          className="hidden items-center space-x-6 text-[11px] font-bold tracking-widest text-stone-500 uppercase md:flex dark:text-stone-400"
          aria-label="Main"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => handleNavClick(event, link.id)}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? 'border-b-2 border-rose-500 font-bold text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            className="rounded-lg border border-stone-200 p-2 text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900 md:hidden dark:border-stone-800 dark:text-stone-200 dark:hover:bg-stone-800 dark:hover:text-stone-100"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          ref={mobileMenuRef}
          className="border-b border-stone-200 bg-white px-6 py-5 shadow-lg md:hidden dark:border-stone-800 dark:bg-stone-900"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(event) => handleNavClick(event, link.id)}
                  className={`flex items-center justify-between py-2 text-xs font-bold tracking-widest uppercase transition-colors ${
                    isActive
                      ? 'font-bold text-rose-600 dark:text-rose-400'
                      : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />}
                </a>
              );
            })}

            <p className="mt-2 border-t border-stone-100 pt-4 font-mono text-[11px] tracking-wider text-stone-500 uppercase dark:border-stone-800 dark:text-stone-400">
              {developerProfile.status}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
