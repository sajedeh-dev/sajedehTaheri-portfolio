import Image from 'next/image';
import { developerProfile } from '@/data/portfolio';

/**
 * Hero portrait framed to match the editorial card styling of the section.
 */
export function HeroPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
      <div className="relative overflow-hidden rounded-xl border border-stone-200/90 bg-[#FDFDFC] p-2 shadow-xl dark:border-stone-800 dark:bg-[#181716]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-800">
          <Image
            src="/images/me.jpg"
            alt={`Portrait of ${developerProfile.name}`}
            fill
            priority
            className="object-cover object-[center_20%]"
            sizes="(max-width: 1024px) min(100vw, 24rem), 22rem"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent dark:from-black/25" />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-stone-900/[0.04] dark:ring-white/10" />
      </div>
      <div
        className="pointer-events-none absolute -right-3 -bottom-3 -z-10 h-full w-full rounded-xl border border-rose-200/60 bg-rose-50/40 dark:border-rose-900/40 dark:bg-rose-950/20"
        aria-hidden
      />
    </div>
  );
}
