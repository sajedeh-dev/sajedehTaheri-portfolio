'use client';

import { ArrowUpRight, CheckCircle2, ChevronRight, Github, Sparkles } from 'lucide-react';
import type { Project } from '@/types/portfolio';
import { ProjectCardPreview } from '@/components/projects/ProjectCardPreview';

interface ProjectCardProps {
  project: Project;
  variant: 'featured' | 'secondary';
  reverseLayout?: boolean;
  onOpenDetails: () => void;
}

/**
 * Featured split layout or compact secondary card for a case study.
 */
export function ProjectCard({
  project,
  variant,
  reverseLayout = false,
  onOpenDetails,
}: ProjectCardProps) {
  if (variant === 'secondary') {
    return (
      <article className="group flex flex-col justify-between rounded-xl border border-stone-200/80 bg-[#FAF8F5] p-6 transition-all hover:border-rose-300 hover:shadow-xs dark:border-stone-800 dark:bg-stone-900 dark:hover:border-rose-500/50">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="rounded border border-stone-200 bg-white px-2 py-0.5 text-[9px] font-bold tracking-wider text-stone-700 uppercase dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300">
              {project.category}
            </span>
            <div className="flex items-center gap-2 text-stone-400 dark:text-stone-500">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 transition-colors hover:text-stone-900 dark:hover:text-stone-100"
                  aria-label={`${project.title} GitHub repository`}
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 transition-colors hover:text-rose-600 dark:hover:text-rose-400"
                  aria-label={`${project.title} live demo`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          <h3 className="font-display text-sm font-bold text-stone-900 transition-colors group-hover:text-rose-600 dark:text-stone-100 dark:group-hover:text-rose-400">
            {project.title}
          </h3>
          <p className="line-clamp-3 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
            {project.description}
          </p>
        </div>
        <div className="mt-3 border-t border-stone-200/80 pt-4 dark:border-stone-800">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((technology) => (
              <span
                key={technology}
                className="rounded border border-stone-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-xs transition-all hover:border-rose-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-rose-500/50">
      <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-12">
        <div
          className={`flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 ${
            reverseLayout ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="rounded border border-stone-200 bg-stone-100 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-stone-700 uppercase dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300">
                {project.category}
              </span>
              <span className="flex items-center gap-1 rounded border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-rose-700 uppercase dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                <Sparkles className="h-3 w-3 text-rose-500 dark:text-rose-400" /> Case study
              </span>
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight text-stone-900 sm:text-2xl dark:text-stone-100">
              {project.title}
            </h3>
            <p className="text-xs leading-relaxed text-stone-600 sm:text-sm dark:text-stone-300">
              {project.description}
            </p>
            <div className="space-y-2 pt-2">
              {project.highlights.slice(0, 2).map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-2.5 text-xs text-stone-600 dark:text-stone-300"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500 dark:text-rose-400" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
            {project.metrics && (
              <div className="grid grid-cols-3 gap-2 border-t border-stone-100 pt-3 dark:border-stone-800">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-lg border border-stone-100 bg-stone-50 p-2.5 dark:border-stone-800 dark:bg-stone-800/60"
                  >
                    <p className="text-[9px] font-bold tracking-widest text-stone-400 uppercase dark:text-stone-500">
                      {metric.label}
                    </p>
                    <p className="mt-0.5 font-mono text-xs font-bold text-stone-900 dark:text-stone-100">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded border border-stone-200 bg-stone-50 px-2 py-0.5 font-mono text-[10px] text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-stone-100 pt-6 dark:border-stone-800">
            <button
              type="button"
              onClick={onOpenDetails}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-stone-900 px-4 py-2.5 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-rose-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-rose-500 dark:hover:text-white"
            >
              <span>Case study</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-xs font-bold tracking-widest text-stone-700 uppercase transition-colors hover:border-rose-400 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-rose-500 dark:hover:text-white"
              >
                <span>Live</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold tracking-widest text-stone-500 uppercase transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              >
                <Github className="h-3.5 w-3.5" />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>

        <div
          className={`flex flex-col justify-center border-stone-200/80 bg-stone-50 dark:border-stone-800 dark:bg-[#1A1918] lg:col-span-6 ${
            reverseLayout
              ? 'border-t lg:order-1 lg:border-t-0 lg:border-r'
              : 'border-t lg:order-2 lg:border-t-0 lg:border-l'
          }`}
        >
          {project.imageSrc ? (
            <div className="relative min-h-[300px] w-full bg-stone-100 dark:bg-stone-800" />
          ) : (
            <ProjectCardPreview project={project} />
          )}
        </div>
      </div>
    </article>
  );
}
