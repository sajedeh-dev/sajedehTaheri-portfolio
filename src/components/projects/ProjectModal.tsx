'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, Code, Figma, Github, Sparkles, X } from 'lucide-react';
import type { Project } from '@/types/portfolio';
import { useFocusTrap } from '@/lib/focus-trap';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Case study dialog with focus trap and Escape-to-close.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpen = project !== null;
  useFocusTrap(isOpen, panelRef);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative my-8 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white text-stone-800 shadow-2xl animate-overlay dark:border-stone-800 dark:bg-[#181716] dark:text-stone-200"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-stone-200/80 bg-stone-50/80 px-6 py-4 dark:border-stone-800 dark:bg-stone-900/80">
          <div className="flex items-center gap-2">
            <span className="rounded border border-stone-200 bg-white px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-stone-700 uppercase dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300">
              {project.category}
            </span>
            {project.featured && (
              <span className="flex items-center gap-1 rounded border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-rose-700 uppercase dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                <Sparkles className="h-3 w-3 text-rose-500 dark:text-rose-400" /> Featured
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-stone-200 hover:text-stone-900 dark:text-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-100"
            aria-label="Close project details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto p-6 text-sm md:p-8">
          <div>
            <h2
              id="project-modal-title"
              className="font-display text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100"
            >
              {project.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              {project.tagline}
            </p>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-3 rounded-xl border border-stone-200/80 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-[9px] font-bold tracking-widest text-stone-400 uppercase dark:text-stone-500">
                    {metric.label}
                  </p>
                  <p className="mt-0.5 font-mono text-base font-bold text-stone-900 dark:text-stone-100">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <h3 className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
              <Figma className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
              <span>Overview</span>
            </h3>
            <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              {project.longDescription || project.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
              <Code className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>Highlights</span>
            </h3>
            <div className="space-y-2.5">
              {project.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-500 dark:text-rose-400" />
                  <span className="text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 border-t border-stone-100 pt-2 dark:border-stone-800">
            <h3 className="font-mono text-xs font-bold tracking-widest text-stone-400 uppercase dark:text-stone-500">
              Tools & technologies
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded border border-stone-200 bg-stone-50 px-2.5 py-1 font-mono text-xs text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-stone-100 pt-4 dark:border-stone-800">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-xs font-bold tracking-widest text-white uppercase shadow-sm transition-colors hover:bg-rose-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-rose-500 dark:hover:text-white"
              >
                <span>Launch</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-xs font-bold tracking-widest text-stone-700 uppercase transition-colors hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:text-white"
              >
                <Github className="h-3.5 w-3.5" />
                <span>Source</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
