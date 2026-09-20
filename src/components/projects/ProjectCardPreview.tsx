'use client';

import { useState } from 'react';
import { Activity, ShoppingBag, Volume2 } from 'lucide-react';
import type { Project } from '@/types/portfolio';

interface ProjectCardPreviewProps {
  project: Project;
}

/**
 * CSS mock UI used until a real project image is supplied.
 */
export function ProjectCardPreview({ project }: ProjectCardPreviewProps) {
  const [activeSwatch, setActiveSwatch] = useState('#E5DFD5');
  const [soundFrequency, setSoundFrequency] = useState(432);

  if (project.previewType === 'design-system') {
    return (
      <div className="flex min-h-[300px] w-full flex-col justify-between bg-[#FAF8F5] p-6 select-none dark:bg-[#1A1918]">
        <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-3 dark:border-stone-800">
          <span className="font-mono text-xs font-semibold text-stone-700 dark:text-stone-300">
            {project.title}
          </span>
          <span className="rounded border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-rose-700 uppercase dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
            Design tokens
          </span>
        </div>
        <div className="space-y-3.5">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-2 rounded-lg border border-stone-200/90 bg-white p-3 shadow-xs dark:border-stone-800 dark:bg-stone-900">
              <span className="text-[9px] font-bold tracking-widest text-stone-400 uppercase dark:text-stone-500">
                Button
              </span>
              <button
                type="button"
                className="rounded bg-stone-900 px-3 py-2 text-center text-[11px] font-bold tracking-wider text-white uppercase shadow-xs transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-stone-100 dark:text-stone-900"
              >
                Primary
              </button>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-stone-200/90 bg-white p-3 shadow-xs dark:border-stone-800 dark:bg-stone-900">
              <span className="text-[9px] font-bold tracking-widest text-stone-400 uppercase dark:text-stone-500">
                Badge
              </span>
              <div className="rounded border border-emerald-200 bg-emerald-50 py-2 text-center text-[10px] font-bold tracking-wider text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                Contrast pass
              </div>
            </div>
          </div>
          <div className="flex h-6 gap-1.5 overflow-hidden rounded">
            <div className="flex-1 bg-rose-900" />
            <div className="flex-1 bg-rose-700" />
            <div className="flex-1 bg-rose-500" />
            <div className="flex-1 bg-rose-300" />
            <div className="flex-1 bg-amber-400" />
            <div className="flex-1 bg-stone-300" />
            <div className="flex-1 bg-stone-100 dark:bg-stone-700" />
          </div>
        </div>
      </div>
    );
  }

  if (project.previewType === 'dashboard') {
    return (
      <div className="flex min-h-[300px] w-full flex-col justify-between bg-gradient-to-br from-rose-50/70 via-white to-amber-50/50 p-6 select-none dark:from-[#1E1718] dark:via-[#181615] dark:to-[#1C1A16]">
        <div className="mb-3 flex items-center justify-between border-b border-rose-100 pb-3 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-rose-500 dark:text-rose-400" />
            <span className="font-mono text-xs font-semibold text-stone-800 dark:text-stone-200">
              {project.title}
            </span>
          </div>
        </div>
        <div className="space-y-3 rounded-xl border border-rose-200/80 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider text-stone-600 uppercase dark:text-stone-300">
              Preview meter
            </span>
            <span className="font-mono text-[10px] font-bold text-rose-600 dark:text-rose-400">
              {soundFrequency} Hz
            </span>
          </div>
          <div className="flex h-16 items-end gap-1.5 pt-2">
            {[35, 65, 45, 90, 80, 100, 75, 88, 55, 70, 95, 60, 40, 85].map((height, index) => (
              <div
                key={`${height}-${index}`}
                className="flex-1 rounded-t bg-rose-100 transition-all dark:bg-rose-950/50"
                style={{ height: `${height * 0.7}%` }}
              />
            ))}
          </div>
          <input
            type="range"
            min="250"
            max="850"
            value={soundFrequency}
            onChange={(event) => setSoundFrequency(Number(event.target.value))}
            className="h-1 w-full cursor-pointer appearance-none rounded bg-rose-200 accent-rose-600 dark:bg-stone-700 dark:accent-rose-400"
            aria-label="Preview frequency"
          />
        </div>
        <div className="mt-3.5 flex items-center justify-between border-t border-rose-100 pt-2.5 font-mono text-[11px] text-stone-500 dark:border-stone-800 dark:text-stone-400">
          <span>Interactive preview</span>
          <span className="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400">
            <Activity className="h-3.5 w-3.5" /> Live
          </span>
        </div>
      </div>
    );
  }

  if (project.previewType === 'ecommerce') {
    const swatches = [
      { name: 'Bouclé Cream', color: '#E5DFD5' },
      { name: 'Terracotta Velour', color: '#C86D51' },
      { name: 'Sage Linen', color: '#8A9A86' },
      { name: 'Midnight Charcoal', color: '#2C2B29' },
    ];

    return (
      <div className="flex min-h-[300px] w-full flex-col justify-between bg-[#FAF8F5] p-6 select-none dark:bg-[#1A1918]">
        <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-3 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-stone-800 dark:text-stone-200" />
            <span className="font-mono text-xs font-semibold text-stone-700 dark:text-stone-300">
              {project.title}
            </span>
          </div>
        </div>
        <div className="space-y-3 rounded-xl border border-stone-200/90 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between">
            <p className="font-serif text-xs font-bold text-stone-900 dark:text-stone-100">
              Material study
            </p>
            <div
              className="h-7 w-7 rounded-full border-2 border-white shadow-sm ring-1 ring-stone-300 transition-colors dark:border-stone-800 dark:ring-stone-700"
              style={{ backgroundColor: activeSwatch }}
            />
          </div>
          <div className="flex items-center justify-between border-t border-stone-100 pt-2 dark:border-stone-800">
            <span className="text-[10px] font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
              Swatches
            </span>
            <div className="flex items-center gap-2">
              {swatches.map((swatch) => (
                <button
                  key={swatch.name}
                  type="button"
                  onClick={() => setActiveSwatch(swatch.color)}
                  className={`h-5 w-5 cursor-pointer rounded-full transition-transform ${
                    activeSwatch === swatch.color
                      ? 'scale-125 ring-2 ring-stone-900 ring-offset-2 ring-offset-white dark:ring-stone-100 dark:ring-offset-stone-900'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: swatch.color }}
                  aria-label={swatch.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[300px] w-full flex-col justify-between rounded-lg bg-stone-900 p-6 font-mono text-stone-200 select-none">
      <div className="mb-3 flex items-center justify-between border-b border-stone-800 pb-3">
        <span className="text-xs text-stone-400">{project.title}</span>
        <span className="rounded border border-rose-800 bg-rose-950/80 px-2 py-0.5 text-[10px] font-bold tracking-wider text-rose-400 uppercase">
          Code
        </span>
      </div>
      <div className="space-y-1.5 rounded border border-stone-800 bg-stone-950/80 p-3 text-[11px] leading-relaxed">
        <p className="text-stone-500">// Project preview placeholder</p>
        <p>
          <span className="font-bold text-rose-400">const</span> work ={' '}
          <span className="text-amber-300">await</span> loadCaseStudy();
        </p>
      </div>
    </div>
  );
}
