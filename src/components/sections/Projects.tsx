'use client';

import { useEffect, useState } from 'react';
import { projects } from '@/data/portfolio';
import type { Project } from '@/types/portfolio';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { usePortfolioUi } from '@/components/layout/portfolio-ui';

const projectCategories = ['All', 'Design System', 'Web App', 'Tooling', 'Open Source'] as const;

/**
 * Selected works. Hidden until real projects are added to the data layer.
 */
export function Projects() {
  const { selectedProjectId, selectProject } = usePortfolioUi();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProjectId) {
      return;
    }
    const foundProject = projects.find((project) => project.id === selectedProjectId);
    if (foundProject) {
      setModalProject(foundProject);
    }
  }, [selectedProjectId]);

  if (projects.length === 0) {
    return null;
  }

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'All') {
      return true;
    }
    return project.category === activeCategory;
  });
  const featuredProjects = filteredProjects.filter((project) => project.featured);
  const secondaryProjects = filteredProjects.filter((project) => !project.featured);

  return (
    <section
      id="projects"
      className="relative border-b border-stone-200/80 bg-white py-20 dark:border-stone-800/80 dark:bg-[#121110]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span>Selected works</span>
            </div>
            <h2 className="font-display text-2xl tracking-tight text-stone-900 sm:text-3xl dark:text-stone-100">
              Frontend engineering & interface work
            </h2>
          </div>
        </div>

        <div className="mb-10 flex items-center gap-2 overflow-x-auto pb-4">
          {projectCategories.map((categoryName) => {
            const isSelected = activeCategory === categoryName;
            return (
              <button
                key={categoryName}
                type="button"
                onClick={() => setActiveCategory(categoryName)}
                className={`cursor-pointer rounded-lg px-4 py-2 text-xs font-bold tracking-widest whitespace-nowrap uppercase transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs dark:bg-stone-100 dark:text-stone-900'
                    : 'border border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-400 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-600 dark:hover:text-stone-100'
                }`}
              >
                {categoryName}
              </button>
            );
          })}
        </div>

        {featuredProjects.length > 0 && (
          <div className="mb-16 space-y-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="featured"
                reverseLayout={index % 2 === 1}
                onOpenDetails={() => setModalProject(project)}
              />
            ))}
          </div>
        )}

        {secondaryProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="secondary"
                onOpenDetails={() => setModalProject(project)}
              />
            ))}
          </div>
        )}
      </div>

      <ProjectModal
        project={modalProject}
        onClose={() => {
          setModalProject(null);
          selectProject(null);
        }}
      />
    </section>
  );
}
