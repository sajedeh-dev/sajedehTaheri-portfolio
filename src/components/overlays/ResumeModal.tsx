'use client';

import { useEffect, useRef } from 'react';
import { Briefcase, Download, ExternalLink, GraduationCap, Mail, MapPin, Sparkles, X } from 'lucide-react';
import { developerProfile, experience, resumeExtras, skillCategories } from '@/data/portfolio';
import { useFocusTrap } from '@/lib/focus-trap';
import { usePortfolioUi } from '@/components/layout/portfolio-ui';

/**
 * In-page curriculum vitae assembled from the portfolio data layer.
 */
export function ResumeModal() {
  const { isResumeOpen, closeResume, copyEmail } = usePortfolioUi();
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isResumeOpen, panelRef);

  useEffect(() => {
    if (!isResumeOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeResume();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isResumeOpen, closeResume]);

  if (!isResumeOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
      onClick={closeResume}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        className="relative my-8 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white text-stone-800 shadow-2xl animate-overlay dark:border-stone-800 dark:bg-[#181716] dark:text-stone-200"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-stone-200 bg-stone-50 px-6 py-4 dark:border-stone-800 dark:bg-stone-900">
          <div>
            <h2
              id="resume-modal-title"
              className="font-display text-base font-bold text-stone-900 dark:text-stone-100"
            >
              Curriculum Vitae — {developerProfile.name}
            </h2>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
              {developerProfile.role}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="hidden cursor-pointer items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-bold tracking-wider text-stone-700 uppercase transition-colors hover:text-stone-900 sm:inline-flex dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Save / Print PDF</span>
            </button>
            <button
              type="button"
              onClick={closeResume}
              className="cursor-pointer rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-stone-200 hover:text-stone-900 dark:text-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-100"
              aria-label="Close resume"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-8 overflow-y-auto p-6 text-sm leading-relaxed md:p-10">
          <div className="border-b border-stone-200 pb-6 dark:border-stone-800">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-display text-2xl tracking-tight text-stone-900 md:text-3xl dark:text-stone-100">
                  {developerProfile.name}
                </p>
                <p className="mt-1 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
                  {developerProfile.role}
                </p>
              </div>
              <div className="space-y-1 font-mono text-xs text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
                  <span>{developerProfile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
                  <button
                    type="button"
                    onClick={() => {
                      void copyEmail();
                    }}
                    className="cursor-pointer text-stone-700 underline underline-offset-2 transition-colors hover:text-rose-600 dark:text-stone-300 dark:hover:text-rose-400"
                  >
                    {developerProfile.email}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
                  <a
                    href={developerProfile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-700 underline underline-offset-2 hover:text-rose-600 dark:text-stone-300 dark:hover:text-rose-400"
                  >
                    GitHub
                  </a>
                  <span>•</span>
                  <a
                    href={developerProfile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-700 underline underline-offset-2 hover:text-rose-600 dark:text-stone-300 dark:hover:text-rose-400"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {developerProfile.shortBio}
            </p>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
              <Sparkles className="h-4 w-4" />
              <span>Skills</span>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {skillCategories.map((category) => (
                <div
                  key={category.title}
                  className="rounded-xl border border-stone-200/80 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900"
                >
                  <p className="mb-2 text-xs font-bold tracking-wider text-stone-900 uppercase dark:text-stone-100">
                    {category.title}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded border border-stone-200 bg-white px-2 py-0.5 text-xs text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {experience.length > 0 && (
            <div>
              <div className="mb-5 flex items-center gap-2 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
                <Briefcase className="h-4 w-4" />
                <span>Work experience</span>
              </div>
              <div className="space-y-6">
                {experience.map((experienceItem) => (
                  <div
                    key={experienceItem.id}
                    className="relative border-l-2 border-rose-300 pl-5 dark:border-rose-800"
                  >
                    <div className="absolute top-1.5 -left-[5px] h-2 w-2 rounded-full bg-rose-600 dark:bg-rose-500" />
                    <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="font-display text-sm font-bold text-stone-900 dark:text-stone-100">
                        {experienceItem.role}{' '}
                        <span className="text-xs font-bold tracking-wider text-rose-600 uppercase dark:text-rose-400">
                          @ {experienceItem.company}
                        </span>
                      </h3>
                      <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
                        {experienceItem.period}
                      </span>
                    </div>
                    <p className="mb-2 text-xs text-stone-500 dark:text-stone-400">
                      {experienceItem.location} • {experienceItem.type}
                    </p>
                    <p className="mb-2.5 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                      {experienceItem.summary}
                    </p>
                    <ul className="ml-3 list-outside list-disc space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                      {experienceItem.achievements.map((achievement) => (
                        <li key={achievement} className="leading-relaxed">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(resumeExtras.education.length > 0 || resumeExtras.certifications.length > 0) && (
            <div className="grid grid-cols-1 gap-6 border-t border-stone-200 pt-4 md:grid-cols-2 dark:border-stone-800">
              {resumeExtras.education.length > 0 && (
                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
                    <GraduationCap className="h-4 w-4" />
                    <span>Education</span>
                  </div>
                  <div className="space-y-3">
                    {resumeExtras.education.map((educationItem) => (
                      <div
                        key={`${educationItem.title}-${educationItem.institution}`}
                        className="rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900"
                      >
                        <p className="font-display text-xs font-bold text-stone-900 dark:text-stone-100">
                          {educationItem.title}
                        </p>
                        <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                          {educationItem.institution} • {educationItem.period}
                        </p>
                        {educationItem.detail && (
                          <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">
                            {educationItem.detail}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {resumeExtras.certifications.length > 0 && (
                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
                    <Sparkles className="h-4 w-4" />
                    <span>Certifications</span>
                  </div>
                  <div className="space-y-1.5 rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
                    {resumeExtras.certifications.map((certification) => (
                      <p key={certification}>• {certification}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-stone-200 bg-stone-50 px-6 py-3 text-xs text-stone-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
          <span>{developerProfile.status}</span>
          <button
            type="button"
            onClick={() => {
              void copyEmail();
            }}
            className="cursor-pointer text-[11px] font-bold tracking-wider text-rose-600 uppercase hover:text-stone-900 dark:text-rose-400 dark:hover:text-stone-100"
          >
            Copy email →
          </button>
        </div>
      </div>
    </div>
  );
}
