'use client';

import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { developerProfile, projects, socialLinks } from '@/data/portfolio';
import { usePortfolioUi } from '@/components/layout/portfolio-ui';
import { HeroPortrait } from '@/components/sections/HeroPortrait';

const socialIcons = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
} as const;

/**
 * Opening section with identity, primary actions, and portrait.
 */
export function Hero() {
  const { navigateToSection, openResume } = usePortfolioUi();

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
                <span>{projects.length > 0 ? 'View projects' : 'View skills'}</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </button>

              {socialLinks.map((socialLink) => {
                const Icon = socialIcons[socialLink.id];
                const isExternal = socialLink.id !== 'email';
                return (
                  <a
                    key={socialLink.id}
                    href={socialLink.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-xs font-bold tracking-widest text-stone-600 uppercase transition-colors hover:border-stone-300 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-800/80 dark:text-stone-300 dark:hover:border-stone-700 dark:hover:text-stone-100"
                  >
                    <Icon
                      className={`h-3.5 w-3.5 ${
                        socialLink.id === 'linkedin'
                          ? 'text-blue-600 dark:text-blue-400'
                          : socialLink.id === 'email'
                            ? 'text-rose-500 dark:text-rose-400'
                            : 'text-stone-400 dark:text-stone-500'
                      }`}
                    />
                    <span>{socialLink.label}</span>
                    {isExternal && (
                      <ArrowUpRight className="h-3 w-3 text-stone-400 dark:text-stone-600" />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="border-t border-stone-200/80 pt-4 dark:border-stone-800/80">
              <button
                type="button"
                onClick={openResume}
                className="cursor-pointer text-xs font-bold tracking-widest text-rose-600 uppercase underline underline-offset-4 hover:text-stone-900 dark:text-rose-400 dark:hover:text-stone-100"
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
