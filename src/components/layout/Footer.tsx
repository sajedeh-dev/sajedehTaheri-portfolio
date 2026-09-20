'use client';

import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { developerProfile, socialLinks } from '@/data/portfolio';
import { prefersReducedMotion } from '@/lib/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const socialIcons = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
} as const;

/**
 * Site footer with social links, theme toggle, and back-to-top.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="border-t border-stone-200/80 bg-white py-12 text-xs text-stone-500 dark:border-stone-800/80 dark:bg-[#0E0D0C] dark:text-stone-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-stone-100 pb-8 md:flex-row dark:border-stone-800">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <span className="font-display font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {developerProfile.name}
            </span>
            <p className="mt-0.5 text-center text-[11px] text-stone-500 md:text-left dark:text-stone-400">
              {developerProfile.role}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {socialLinks.map((socialLink) => {
              const Icon = socialIcons[socialLink.id];
              const isExternal = socialLink.id !== 'email';
              return (
                <a
                  key={socialLink.id}
                  href={socialLink.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  className="rounded-lg border border-stone-200 p-2 text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-100 dark:hover:text-stone-100"
                  aria-label={socialLink.label}
                >
                  <Icon
                    className={`h-4 w-4 ${socialLink.id === 'linkedin' ? 'text-blue-600 dark:text-blue-400' : ''}`}
                  />
                </a>
              );
            })}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-4 py-2 text-[10px] font-bold tracking-widest text-stone-700 uppercase shadow-xs transition-all hover:bg-stone-900 hover:text-white dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-100 dark:hover:text-stone-900"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-[11px] text-stone-400 sm:flex-row dark:text-stone-500">
          <p>
            © {currentYear} {developerProfile.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px]">React, TypeScript, Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
