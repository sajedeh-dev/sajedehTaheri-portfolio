'use client';

import { useMemo, useState, type ElementType } from 'react';
import {
  Atom,
  Boxes,
  Brush,
  Code,
  Component,
  Database,
  Figma,
  FileCode,
  GitBranch,
  Globe,
  Layout,
  Layers,
  MonitorCheck,
  Palette,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { skillCategories } from '@/data/portfolio';

const iconMap: Record<string, ElementType> = {
  Code,
  Atom,
  Layers,
  FileCode,
  Globe,
  Boxes,
  Palette,
  Layout,
  Sparkles,
  Component,
  Figma,
  Brush,
  RefreshCw,
  Database,
  Zap,
  GitBranch,
  MonitorCheck,
  ShieldCheck,
};

/**
 * Filterable skills grid.
 */
export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categoryNames = ['All', ...skillCategories.map((category) => category.title)];
  const totalSkillCount = skillCategories.reduce(
    (count, category) => count + category.skills.length,
    0
  );

  const filteredCategories = useMemo(() => {
    return skillCategories
      .map((category) => {
        if (selectedCategory !== 'All' && category.title !== selectedCategory) {
          return null;
        }
        const filteredSkills = category.skills.filter(
          (skill) =>
            skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            skill.yearsOrFocus?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredSkills.length === 0) {
          return null;
        }
        return { ...category, skills: filteredSkills };
      })
      .filter((category) => category !== null);
  }, [selectedCategory, searchQuery]);

  return (
    <section
      id="skills"
      className="relative border-b border-stone-200/80 bg-white py-20 dark:border-stone-800/80 dark:bg-[#141312]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span>Skills</span>
            </div>
            <h2 className="font-display text-2xl tracking-tight text-stone-900 sm:text-3xl dark:text-stone-100">
              Frontend architecture & UI skills
            </h2>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
            <input
              type="search"
              placeholder={`Search ${totalSkillCount} tools & frameworks...`}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2 pr-3 pl-9 text-xs text-stone-900 placeholder-stone-400 transition-colors focus:border-rose-500 focus:bg-white focus:outline-none dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 dark:placeholder-stone-500 dark:focus:border-rose-400"
              aria-label="Search skills"
            />
          </div>
        </div>

        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-4">
          {categoryNames.map((categoryName) => {
            const isSelected = selectedCategory === categoryName;
            return (
              <button
                key={categoryName}
                type="button"
                onClick={() => setSelectedCategory(categoryName)}
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-xl border border-stone-200/80 bg-[#FAF8F5] p-6 shadow-xs transition-all hover:border-stone-300 dark:border-stone-800 dark:bg-[#1A1918] dark:hover:border-stone-700"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-base font-bold tracking-wide text-stone-900 uppercase dark:text-stone-100">
                  {category.title}
                </h3>
                <span className="font-mono text-[11px] font-medium text-stone-400 dark:text-stone-500">
                  {category.skills.length} competencies
                </span>
              </div>
              <p className="mb-5 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                {category.description}
              </p>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill.iconName] || Code;
                  const isCore = skill.level === 'Core';
                  const isAdvanced = skill.level === 'Advanced';

                  return (
                    <div
                      key={skill.name}
                      className="group flex items-start gap-3 rounded-lg border border-stone-200/90 bg-white p-3 shadow-xs transition-colors hover:border-rose-300 dark:border-stone-800 dark:bg-stone-900/90 dark:hover:border-rose-500/50"
                    >
                      <div className="mt-0.5 shrink-0 rounded border border-stone-200 bg-stone-50 p-1.5 text-stone-600 transition-colors group-hover:border-rose-300 group-hover:bg-rose-50 group-hover:text-rose-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400 dark:group-hover:border-rose-500/50 dark:group-hover:bg-rose-950/40 dark:group-hover:text-rose-400">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate text-xs font-bold text-stone-900 group-hover:text-rose-600 dark:text-stone-100 dark:group-hover:text-rose-400">
                            {skill.name}
                          </span>
                          <span
                            className={`shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase ${
                              isCore
                                ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                                : isAdvanced
                                  ? 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/60 dark:text-violet-300'
                                  : 'border-stone-200 bg-stone-100 text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300'
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>
                        {skill.yearsOrFocus && (
                          <p className="mt-0.5 line-clamp-1 text-[11px] text-stone-500 dark:text-stone-400">
                            {skill.yearsOrFocus}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="col-span-2 rounded-xl border border-stone-200 bg-stone-50 py-12 text-center text-stone-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
              <p>No technologies matched “{searchQuery}”</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-2 cursor-pointer text-xs font-bold tracking-wider text-rose-600 uppercase hover:underline dark:text-rose-400"
              >
                Reset search & filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
