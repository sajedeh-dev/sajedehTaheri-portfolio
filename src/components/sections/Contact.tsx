import { ArrowUpRight, Clock, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { developerProfile } from '@/data/portfolio';
import { CopyEmailButton } from '@/components/ui/CopyEmailButton';

/**
 * Direct contact CTAs. No form and no backend.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="relative border-b border-stone-200/80 bg-white py-20 dark:border-stone-800/80 dark:bg-[#121110]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span>Let’s collaborate</span>
            </div>
            <h2 className="font-display text-2xl tracking-tight text-stone-900 sm:text-3xl dark:text-stone-100">
              Get in touch
            </h2>
          </div>

          {developerProfile.availableForHire && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-mono text-xs text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{developerProfile.status}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="space-y-6 rounded-xl border border-stone-200/80 bg-[#FAF8F5] p-6 shadow-xs sm:p-7 dark:border-stone-800 dark:bg-stone-900">
              <div>
                <h3 className="text-base font-bold tracking-wide text-stone-900 uppercase dark:text-stone-100">
                  Direct inquiries
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  The fastest way to reach me is email. GitHub and LinkedIn are also open for
                  collaboration and conversation.
                </p>
              </div>

              <div className="space-y-2 rounded-lg border border-stone-200/90 bg-white p-4 dark:border-stone-700 dark:bg-stone-800/80">
                <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase dark:text-stone-500">
                  Primary email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${developerProfile.email}`}
                    className="truncate font-mono text-xs font-bold text-stone-900 transition-colors hover:text-rose-600 sm:text-sm dark:text-stone-100 dark:hover:text-rose-400"
                  >
                    {developerProfile.email}
                  </a>
                  <CopyEmailButton />
                </div>
              </div>

              <div className="space-y-3 text-xs text-stone-600 dark:text-stone-400">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-stone-400 dark:text-stone-500" />
                  <span>{developerProfile.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-stone-400 dark:text-stone-500" />
                  <span>Usually replies within a couple of days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex h-full flex-col justify-center rounded-xl border border-stone-200/80 bg-white p-6 shadow-xs sm:p-8 dark:border-stone-800 dark:bg-stone-900">
              <p className="mb-6 max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                If you have a frontend role or a product interface to build, send a note.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`mailto:${developerProfile.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-6 py-3 text-xs font-bold tracking-widest text-white uppercase shadow-sm transition-colors hover:bg-rose-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-rose-500 dark:hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email me</span>
                </a>
                <a
                  href={developerProfile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-5 py-3 text-xs font-bold tracking-widest text-stone-700 uppercase transition-colors hover:border-stone-900 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:text-white"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-stone-400" />
                </a>
                <a
                  href={developerProfile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-5 py-3 text-xs font-bold tracking-widest text-stone-700 uppercase transition-colors hover:border-rose-400 hover:text-rose-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:text-rose-400"
                >
                  <Linkedin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-stone-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
