'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Briefcase,
  ExternalLink,
  FolderGit2,
  Hash,
  Mail,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { developerProfile, getVisibleNavigationItems, projects } from '@/data/portfolio';
import { useFocusTrap } from '@/lib/focus-trap';
import { usePortfolioUi } from '@/components/layout/portfolio-ui';

interface PaletteItem {
  id: string;
  category: 'action' | 'navigation' | 'project';
  label: string;
  description?: string;
  onSelect: () => void;
}

const sectionIcons = {
  hero: Sparkles,
  about: Hash,
  skills: Hash,
  projects: FolderGit2,
  experience: Briefcase,
} as const;

/**
 * Command palette with search, arrow-key navigation, and real clipboard copy.
 */
export function CommandPalette() {
  const {
    isCommandPaletteOpen,
    closeCommandPalette,
    navigateToSection,
    copyEmail,
    selectProject,
  } = usePortfolioUi();
  const panelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  useFocusTrap(isCommandPaletteOpen, panelRef);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setActiveIndex(0);
    }
  }, [isCommandPaletteOpen]);

  useEffect(() => {
    if (!isCommandPaletteOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCommandPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, closeCommandPalette]);

  const items = useMemo<PaletteItem[]>(() => {
    const normalizedQuery = query.toLowerCase().trim();
    const actionItems: PaletteItem[] = [
      {
        id: 'copy-email',
        category: 'action',
        label: `Copy email (${developerProfile.email})`,
        onSelect: () => {
          void copyEmail();
          closeCommandPalette();
        },
      },
      {
        id: 'open-github',
        category: 'action',
        label: 'Open GitHub profile',
        onSelect: () => {
          window.open(developerProfile.github, '_blank', 'noopener,noreferrer');
          closeCommandPalette();
        },
      },
    ];

    const navigationItems = getVisibleNavigationItems().map((section) => ({
      id: `nav-${section.id}`,
      category: 'navigation' as const,
      label: `Jump to ${section.label}`,
      description: `#${section.id}`,
      onSelect: () => {
        navigateToSection(section.id);
        closeCommandPalette();
      },
    }));

    const projectItems = projects.map((project) => ({
      id: `project-${project.id}`,
      category: 'project' as const,
      label: project.title,
      description: project.tagline,
      onSelect: () => {
        selectProject(project.id);
        navigateToSection('projects');
        closeCommandPalette();
      },
    }));

    const matchesQuery = (label: string, description?: string) => {
      if (!normalizedQuery) {
        return true;
      }
      return (
        label.toLowerCase().includes(normalizedQuery) ||
        description?.toLowerCase().includes(normalizedQuery) === true
      );
    };

    return [
      ...actionItems.filter((item) => matchesQuery(item.label)),
      ...navigationItems.filter((item) => matchesQuery(item.label, item.description)),
      ...projectItems.filter(
        (item) =>
          matchesQuery(item.label, item.description) ||
          projects
            .find((project) => `project-${project.id}` === item.id)
            ?.technologies.some((technology) =>
              technology.toLowerCase().includes(normalizedQuery)
            )
      ),
    ];
  }, [query, copyEmail, closeCommandPalette, navigateToSection, selectProject]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) => (items.length === 0 ? 0 : (current + 1) % items.length));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) =>
        items.length === 0 ? 0 : (current - 1 + items.length) % items.length
      );
    }
    if (event.key === 'Enter' && items[activeIndex]) {
      event.preventDefault();
      items[activeIndex].onSelect();
    }
  };

  if (!isCommandPaletteOpen) {
    return null;
  }

  const activeItemId = items[activeIndex]?.id;
  const actionItems = items.filter((item) => item.category === 'action');
  const navigationItems = items.filter((item) => item.category === 'navigation');
  const projectItems = items.filter((item) => item.category === 'project');

  const renderItemButton = (item: PaletteItem, icon: ReactNode, extra?: ReactNode) => {
    const isActive = item.id === activeItemId;
    return (
      <button
        key={item.id}
        id={item.id}
        type="button"
        onClick={item.onSelect}
        onMouseEnter={() =>
          setActiveIndex(items.findIndex((paletteItem) => paletteItem.id === item.id))
        }
        className={`group flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
          isActive
            ? 'bg-stone-100 text-rose-600 dark:bg-stone-800 dark:text-rose-400'
            : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
        }`}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          {icon}
          <div className="min-w-0">
            <span className="block truncate">{item.label}</span>
            {item.description && item.category === 'project' && (
              <p className="mt-0.5 line-clamp-1 text-[11px] text-stone-500 dark:text-stone-400">
                {item.description}
              </p>
            )}
          </div>
        </div>
        {extra ?? (
          <ArrowRight className="h-3.5 w-3.5 text-rose-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-rose-400" />
        )}
      </button>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 p-4 pt-16 backdrop-blur-sm sm:pt-24"
      onClick={closeCommandPalette}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-stone-200 bg-white text-stone-800 shadow-2xl animate-overlay dark:border-stone-800 dark:bg-[#181716] dark:text-stone-200"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-stone-200 bg-stone-50 px-4 py-3.5 dark:border-stone-800 dark:bg-stone-900">
          <Search className="h-5 w-5 shrink-0 text-stone-400 dark:text-stone-500" />
          <input
            id="command-palette-input"
            autoFocus
            type="text"
            placeholder="Search sections, actions, or projects..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm text-stone-900 placeholder-stone-400 focus:outline-none dark:text-stone-100 dark:placeholder-stone-500"
            aria-activedescendant={activeItemId}
            aria-controls="command-palette-results"
            aria-autocomplete="list"
            role="combobox"
            aria-expanded="true"
            aria-label="Search portfolio"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="cursor-pointer p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="hidden rounded border border-stone-200 bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-stone-500 sm:inline-block dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400">
              ESC
            </kbd>
          )}
        </div>

        <div id="command-palette-results" className="max-h-[60vh] space-y-3 overflow-y-auto p-2 text-xs" role="listbox">
          <p id="command-palette-title" className="sr-only">
            Command palette
          </p>

          {actionItems.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[10px] font-bold tracking-widest text-stone-400 uppercase dark:text-stone-500">
                Quick actions
              </p>
              <div className="space-y-0.5">
                {actionItems.map((item) =>
                  renderItemButton(
                    item,
                    item.id === 'copy-email' ? (
                      <Mail className="h-4 w-4 text-rose-500 dark:text-rose-400" />
                    ) : (
                      <ExternalLink className="h-4 w-4 text-stone-500 dark:text-stone-400" />
                    )
                  )
                )}
              </div>
            </div>
          )}

          {navigationItems.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[10px] font-bold tracking-widest text-stone-400 uppercase dark:text-stone-500">
                Navigation
              </p>
              <div className="space-y-0.5">
                {navigationItems.map((item) => {
                  const sectionId = item.id.replace('nav-', '') as keyof typeof sectionIcons;
                  const Icon = sectionIcons[sectionId] ?? Hash;
                  return renderItemButton(
                    item,
                    <Icon className="h-4 w-4 text-stone-400 dark:text-stone-500" />,
                    <span className="ml-2 shrink-0 font-mono text-[10px] text-stone-400 dark:text-stone-500">
                      {item.description}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {projectItems.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[10px] font-bold tracking-widest text-stone-400 uppercase dark:text-stone-500">
                Projects ({projectItems.length})
              </p>
              <div className="space-y-0.5">
                {projectItems.map((item) =>
                  renderItemButton(
                    item,
                    <FolderGit2 className="h-4 w-4 text-stone-400 dark:text-stone-500" />
                  )
                )}
              </div>
            </div>
          )}

          {items.length === 0 && (
            <div className="py-8 text-center text-stone-400 dark:text-stone-500">
              <p>No results found for “{query}”</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-stone-200 bg-stone-50 px-4 py-2 text-[11px] text-stone-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
          <span>Navigate with keyboard</span>
          <div className="flex items-center gap-2 font-mono text-[10px]">
            <span>
              <kbd className="rounded border border-stone-200 bg-white px-1 dark:border-stone-700 dark:bg-stone-800">
                ↑
              </kbd>{' '}
              <kbd className="rounded border border-stone-200 bg-white px-1 dark:border-stone-700 dark:bg-stone-800">
                ↓
              </kbd>{' '}
              to move,{' '}
              <kbd className="rounded border border-stone-200 bg-white px-1 dark:border-stone-700 dark:bg-stone-800">
                Enter
              </kbd>{' '}
              to select
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
