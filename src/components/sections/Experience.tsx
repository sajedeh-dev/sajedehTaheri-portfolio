import { ArrowUpRight, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { experience } from '@/data/portfolio';
import { OpenResumeButton } from '@/components/ui/OpenResumeButton';

/**
 * Career timeline. Hidden until real experience is added to the data layer.
 */
export function Experience() {
  if (experience.length === 0) {
    return null;
  }

  return (
    <section
      id="experience"
      className="relative border-b border-stone-200/80 bg-[#FAF8F5] py-20 dark:border-stone-800/80 dark:bg-[#151413]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span>Career track</span>
            </div>
            <h2 className="font-display text-2xl tracking-tight text-stone-900 sm:text-3xl dark:text-stone-100">
              Experience
            </h2>
          </div>

          <OpenResumeButton className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold tracking-widest text-rose-600 uppercase underline underline-offset-4 hover:text-stone-900 dark:text-rose-400 dark:hover:text-stone-100">
            <span>View full CV</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </OpenResumeButton>
        </div>

        <div className="space-y-6">
          {experience.map((experienceItem) => (
            <article
              key={experienceItem.id}
              className="rounded-xl border border-stone-200/80 bg-white p-6 transition-all hover:border-rose-300 hover:shadow-xs sm:p-8 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-rose-500/50"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-stone-100 pb-4 lg:flex-row lg:items-start dark:border-stone-800">
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100">
                      {experienceItem.role}
                    </h3>
                    <span className="text-stone-400 dark:text-stone-500">@</span>
                    <span className="font-display text-base font-bold text-rose-600 dark:text-rose-400">
                      {experienceItem.company}
                    </span>
                    <span className="rounded border border-stone-200 bg-stone-100 px-2 py-0.5 font-mono text-[10px] text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300">
                      {experienceItem.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-stone-500 dark:text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
                      <span>{experienceItem.period}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
                      <span>{experienceItem.location}</span>
                    </span>
                  </div>
                </div>

                {experienceItem.companyUrl && (
                  <a
                    href={experienceItem.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-bold tracking-wider text-stone-600 uppercase hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                  >
                    <span>Company</span>
                    <ArrowUpRight className="h-3 w-3 text-stone-400 dark:text-stone-500" />
                  </a>
                )}
              </div>

              <div className="space-y-3 pt-4">
                <p className="text-xs leading-relaxed text-stone-600 sm:text-sm dark:text-stone-300">
                  {experienceItem.summary}
                </p>
                <div className="space-y-2 pt-1">
                  {experienceItem.achievements.map((achievement) => (
                    <div
                      key={achievement}
                      className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-stone-100 pt-4 dark:border-stone-800">
                {experienceItem.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded border border-stone-200 bg-stone-50 px-2 py-0.5 font-mono text-[10px] text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
