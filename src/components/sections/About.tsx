import { ArrowRight, CheckCircle2, Figma, Layers, Palette, Sparkles } from 'lucide-react';
import { aboutPillars, aboutWorkingPrinciples, developerProfile } from '@/data/portfolio';
import { OpenResumeButton } from '@/components/ui/OpenResumeButton';
import type { AboutPillar } from '@/types/portfolio';

const pillarIcons = {
  Layers,
  Palette,
  Figma,
  Sparkles,
} as const;

function PillarIcon({ iconName }: { iconName: AboutPillar['iconName'] }) {
  const Icon = pillarIcons[iconName];
  return <Icon className="h-5 w-5" />;
}

/**
 * Craft philosophy and about narrative. Server Component.
 */
export function About() {
  return (
    <section
      id="about"
      className="relative border-b border-stone-200/80 bg-[#FAF8F5] py-20 dark:border-stone-800/80 dark:bg-[#121110]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span>Frontend development</span>
            </div>
          </div>

          <OpenResumeButton className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold tracking-widest text-rose-600 uppercase underline underline-offset-4 hover:text-stone-900 dark:text-rose-400 dark:hover:text-stone-100">
            <span>Read full background</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </OpenResumeButton>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="space-y-4 rounded-xl border border-stone-200/80 bg-white p-6 shadow-xs sm:p-7 dark:border-stone-800 dark:bg-stone-900">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-2 dark:border-stone-800">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="text-xs font-bold tracking-wider text-stone-800 uppercase dark:text-stone-200">
                  Approach
                </span>
              </div>

              {developerProfile.aboutStory.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {paragraph}
                </p>
              ))}

              <div className="border-t border-stone-100 pt-4 dark:border-stone-800">
                <p className="mb-3 font-mono text-xs font-bold tracking-widest text-stone-400 uppercase dark:text-stone-500">
                  Working principles
                </p>
                <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300">
                  {aboutWorkingPrinciples.map((principle) => (
                    <div key={principle.title} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <p className="font-bold text-stone-800 dark:text-stone-200">{principle.title}</p>
                        <p className="mt-0.5 leading-relaxed text-stone-600 dark:text-stone-400">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {aboutPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group flex flex-col justify-between rounded-xl border border-stone-200/80 bg-white p-6 transition-all hover:border-rose-300 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900 dark:hover:border-rose-500/50"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-rose-100 bg-rose-50 text-rose-600 transition-all group-hover:bg-rose-600 group-hover:text-white dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400">
                      <PillarIcon iconName={pillar.iconName} />
                    </div>
                    <span className="rounded border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-rose-700 uppercase dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="mb-1.5 text-sm font-bold tracking-wide text-stone-900 uppercase transition-colors group-hover:text-rose-600 dark:text-stone-100 dark:group-hover:text-rose-400">
                    {pillar.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
