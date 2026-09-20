'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { developerProfile, projects } from '@/data/portfolio';
import { usePortfolioUi } from '@/components/layout/portfolio-ui';
import { HeroPortrait } from '@/components/sections/HeroPortrait';

/**
 * Opening section with identity, primary actions, and portrait.
 */
export function Hero() {
  const { copyEmail, navigateToSection, openResume } = usePortfolioUi();
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    await copyEmail();
    setHasCopiedEmail(true);
    window.setTimeout(() => setHasCopiedEmail(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative mt-16 overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-[#FAF8F5] via-white to-white pt-12 pb-16 md:pt-16 md:pb-24 dark:border-stone-800/80 dark:from-[#0F0E0D] dark:via-[#141312] dark:to-[#141312]"
    >
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -top-32 -left-20 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl dark:bg-rose-950/20" />
      <div className="pointer-events-none absolute top-1/2 -right-20 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl dark:bg-amber-950/20" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-stone-800 shadow-xs dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{developerProfile.status}</span>
            </div>

            <div>
              <h1 className="font-display mb-2 text-4xl leading-[1.08] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl dark:text-stone-50">
                {developerProfile.name}
                <span className="font-display ml-1 text-rose-500 italic dark:text-rose-400">.</span>
              </h1>
              <p className="mb-4 text-xs font-bold tracking-widest text-rose-600 uppercase sm:text-sm dark:text-rose-400">
                {developerProfile.role}
              </p>
              <p className="max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg dark:text-stone-300">
                {developerProfile.shortBio}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  navigateToSection(projects.length > 0 ? 'projects' : 'skills')
                }
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-stone-900 px-6 py-3 text-xs font-bold tracking-widest text-white uppercase shadow-md transition-colors hover:bg-rose-600 active:scale-[0.99] dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-rose-500 dark:hover:text-white"
              >
                <span>{projects.length > 0 ? 'View selected works' : 'View toolkit'}</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => navigateToSection('contact')}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-6 py-3 text-xs font-bold tracking-widest text-stone-900 uppercase shadow-xs transition-colors hover:border-rose-400 hover:text-rose-600 active:scale-[0.99] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-rose-500 dark:hover:text-rose-400"
              >
                <span>Get in touch</span>
                <Mail className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
              </button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-xs font-bold tracking-widest text-stone-600 uppercase transition-colors hover:border-stone-300 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-800/80 dark:text-stone-300 dark:hover:border-stone-700 dark:hover:text-stone-100"
              >
                {hasCopiedEmail ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
                    <span>Copy email</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-5 border-t border-stone-200/80 pt-4 text-xs font-bold tracking-widest text-stone-500 uppercase dark:border-stone-800/80 dark:text-stone-400">
              <span className="font-mono text-stone-400 dark:text-stone-500">Connect:</span>
              <a
                href={developerProfile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 transition-colors hover:text-stone-900 dark:hover:text-stone-100"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3 w-3 text-stone-400 dark:text-stone-600" />
              </a>
              <a
                href={developerProfile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 transition-colors hover:text-stone-900 dark:hover:text-stone-100"
              >
                <Linkedin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3 w-3 text-stone-400 dark:text-stone-600" />
              </a>
              <button
                type="button"
                onClick={openResume}
                className="ml-auto cursor-pointer font-bold text-rose-600 underline underline-offset-4 hover:text-stone-900 dark:text-rose-400 dark:hover:text-stone-100"
              >
                View full resume →
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroPortrait />
          </div>
        </div>
      </div>
    </section>
  );
}
