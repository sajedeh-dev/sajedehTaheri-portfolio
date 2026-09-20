const DEFAULT_NAV_OFFSET_PIXELS = 72;

/**
 * Returns whether the user requested reduced motion.
 *
 * @returns True when reduced motion is preferred.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Smoothly scrolls to a section, accounting for the fixed navbar.
 *
 * @param sectionId - Element id of the target section.
 */
export function scrollToSection(sectionId: string): void {
  const sectionElement = document.getElementById(sectionId);
  if (!sectionElement) {
    return;
  }

  const targetPosition =
    sectionElement.getBoundingClientRect().top + window.scrollY - DEFAULT_NAV_OFFSET_PIXELS;
  window.scrollTo({
    top: targetPosition,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });

  const nextHash = `#${sectionId}`;
  if (window.location.hash !== nextHash) {
    history.replaceState(null, '', nextHash);
  }
}

/**
 * Determines which section is currently in view for scroll-spy highlighting.
 *
 * @param sectionIds - Section ids to consider, in document order.
 * @returns The active section id, defaulting to the first id.
 */
export function getActiveSectionId(sectionIds: string[]): string {
  if (sectionIds.length === 0) {
    return 'hero';
  }

  const scrollPosition = window.scrollY + 120;
  for (const sectionId of sectionIds) {
    const sectionElement = document.getElementById(sectionId);
    if (!sectionElement) {
      continue;
    }
    const sectionTop = sectionElement.offsetTop;
    const sectionHeight = sectionElement.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      return sectionId;
    }
  }

  return sectionIds[0];
}
