import type {
  AboutPillar,
  DeveloperProfile,
  ExperienceItem,
  NavItem,
  Project,
  ResumeExtras,
  SkillCategory,
  SocialLink,
  WorkingPrinciple,
} from '@/types/portfolio';

export const developerProfile: DeveloperProfile = {
  name: 'Sajedeh Taheri',
  role: 'Frontend Developer',
  location: 'Iran, Shiraz',
  status: 'Open to frontend development opportunities',
  availableForHire: true,
  shortBio:
    'Frontend developer building production interfaces with React, TypeScript, and Next.js. I moved from personal learning projects into professional product work—responsive UI, API integration, and maintainable component implementation.',
  aboutStory: [
    "I'm a frontend developer with a Computer Engineering background, focused on building reliable product interfaces with React, TypeScript, and Next.js.",
    'My work goes beyond implementing screens. I work with real API contracts, application state, authentication flows, and product requirements to turn designs and specifications into interfaces that are structured, responsive, and maintainable.',
    'I care about understanding how a feature fits into the product before implementing it—how data moves through the interface, how different states are handled, and how the code can remain understandable as the product grows.',
  ],
  email: 'sajedeh.taheri79@gmail.com',
  github: 'https://github.com/sajedeh-dev',
  linkedin: 'https://www.linkedin.com/in/sajedeh-taheri-63974627b/',
};

export const socialLinks: SocialLink[] = [
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${developerProfile.email}`,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: developerProfile.github,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: developerProfile.linkedin,
  },
];

export const navigationItems: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Philosophy' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'projects', label: 'Works', requires: 'projects' },
  { id: 'experience', label: 'Career', requires: 'experience' },
  { id: 'contact', label: 'Connect' },
];

export const aboutWorkingPrinciples: WorkingPrinciple[] = [
  {
    title: 'Understand the product, not just the screen',
    description:
      'I consider requirements, data flow, user states, and API behavior before implementation.',
  },
  {
    title: 'Build for change',
    description:
      'I keep component responsibilities clear and structure frontend code so features can evolve without unnecessary complexity.',
  },
  {
    title: 'Treat UI as part of the system',
    description:
      'Responsive behavior, RTL support, loading and error states, and interaction details are part of the implementation—not afterthoughts.',
  },
  {
    title: 'Write code I can own',
    description:
      'I prefer solutions I can understand, explain, debug, and extend rather than code that simply works once.',
  },
];

const pillarPresentation: Pick<AboutPillar, 'iconName' | 'badge'>[] = [
  { iconName: 'Layers', badge: 'Product context' },
  { iconName: 'Palette', badge: 'Maintainability' },
  { iconName: 'Sparkles', badge: 'System UI' },
  { iconName: 'Figma', badge: 'Ownership' },
];

export const aboutPillars: AboutPillar[] = aboutWorkingPrinciples.map((principle, index) => ({
  title: principle.title,
  description: principle.description,
  iconName: pillarPresentation[index].iconName,
  badge: pillarPresentation[index].badge,
}));

export const skillCategories: SkillCategory[] = [
  {
    title: 'Core Web & Styling',
    description: 'Markup, styling, and UI libraries used across projects',
    skills: [
      { name: 'HTML & CSS', level: 'Core', iconName: 'Layout', yearsOrFocus: 'Semantic markup & layout' },
      { name: 'JavaScript (ESNext)', level: 'Core', iconName: 'FileCode', yearsOrFocus: 'DOM, modules & fundamentals' },
      { name: 'Tailwind CSS', level: 'Core', iconName: 'Brush', yearsOrFocus: 'Utility-first product UI' },
      { name: 'Bootstrap', level: 'Proficient', iconName: 'Layout', yearsOrFocus: 'Component-based layouts' },
      { name: 'MUI', level: 'Proficient', iconName: 'Component', yearsOrFocus: 'React component libraries' },
      { name: 'Figma', level: 'Proficient', iconName: 'Figma', yearsOrFocus: 'Reading specs & handoff' },
    ],
  },
  {
    title: 'Frontend Engineering',
    description: 'Modern React applications and Next.js product work',
    skills: [
      { name: 'React', level: 'Core', iconName: 'Atom', yearsOrFocus: 'Hooks, composition & client UI' },
      { name: 'TypeScript', level: 'Core', iconName: 'Code', yearsOrFocus: 'Typed components & props' },
      { name: 'Next.js (App Router)', level: 'Core', iconName: 'Layers', yearsOrFocus: 'Routing & server/client UI' },
      { name: 'API Integration', level: 'Core', iconName: 'Globe', yearsOrFocus: 'Fetching & displaying product data' },
      { name: 'Responsive UI', level: 'Core', iconName: 'MonitorCheck', yearsOrFocus: 'Breakpoints & layout stability' },
      { name: 'RTL Interfaces', level: 'Proficient', iconName: 'Layout', yearsOrFocus: 'Right-to-left product layouts' },
    ],
  },
  {
    title: 'State & Data',
    description: 'Client state, caching, and full-stack exposure from projects',
    skills: [
      { name: 'TanStack Query', level: 'Core', iconName: 'RefreshCw', yearsOrFocus: 'Server state & async UI' },
      { name: 'Redux Toolkit', level: 'Core', iconName: 'Database', yearsOrFocus: 'Predictable client stores' },
      { name: 'NextAuth', level: 'Proficient', iconName: 'ShieldCheck', yearsOrFocus: 'Session-based auth flows' },
      { name: 'MongoDB', level: 'Proficient', iconName: 'Database', yearsOrFocus: 'Full-stack project exposure' },
      { name: 'React Router', level: 'Proficient', iconName: 'Layers', yearsOrFocus: 'SPA navigation patterns' },
    ],
  },
  {
    title: 'Tooling & Delivery',
    description: 'Version control and everyday frontend workflow',
    skills: [
      { name: 'Git', level: 'Core', iconName: 'GitBranch', yearsOrFocus: 'Branches, reviews & history' },
      { name: 'GitHub', level: 'Core', iconName: 'GitBranch', yearsOrFocus: 'Open-source & portfolio repos' },
      { name: 'GitLab', level: 'Core', iconName: 'GitBranch', yearsOrFocus: 'Repos, merge requests & CI' },
      { name: 'Next.js Tooling', level: 'Core', iconName: 'Zap', yearsOrFocus: 'Local dev & production builds' },
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'siavash',
    title: 'Siavash',
    tagline: 'AI-powered legal assistant for lawyers',
    description:
      'Professional product work on an AI legal assistant—frontend implementation of chat, documents, cases, auth, subscriptions, and RTL-aware UI.',
    longDescription:
      'Siavash is an AI-powered legal assistant aimed at lawyers. As a frontend developer on the team, I implement product screens and interactions: complex chat interfaces, document and project views, session-based authentication, subscription and usage UI, text-to-speech controls, and RTL layouts—integrated with backend APIs via React, Next.js, and TypeScript.',
    category: 'Web App',
    featured: true,
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'App Router'],
    highlights: [
      'Chat, documents, and case/project interfaces with non-trivial client state',
      'Authentication and subscription flows connected to product APIs',
      'Responsive and RTL UI for a Persian-language legal product',
    ],
    previewType: 'code-editor',
  },
  {
    id: 'company-website',
    title: 'Company Website',
    tagline: 'Marketing and product presence on the web',
    description:
      'Frontend development on the company\'s public website—responsive pages, consistent layout, and maintainable Next.js implementation alongside product work.',
    longDescription:
      'Alongside Siavash, I contribute frontend work on the company\'s own website: structuring pages in Next.js, styling with Tailwind CSS, and keeping the public site aligned with product branding and responsive requirements.',
    category: 'Web App',
    featured: true,
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    highlights: [
      'Responsive marketing and product pages',
      'Shared styling patterns with ongoing product frontend work',
      'Implemented as part of professional frontend responsibilities',
    ],
    previewType: 'analytics',
  },
  {
    id: 'todo-nextjs',
    title: 'ToDo App',
    tagline: 'Full-stack task app (personal project)',
    description:
      'Personal Next.js app with authentication, MongoDB persistence, and Redux Toolkit—practice turning a CRUD idea into a structured frontend.',
    category: 'Web App',
    featured: false,
    technologies: ['Next.js', 'NextAuth', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS'],
    highlights: [
      'Session-based auth and protected views',
      'Client state with Redux Toolkit',
    ],
    githubUrl: 'https://github.com/sajedeh-dev/ToDo-App-Next.js',
    previewType: 'dashboard',
  },
  {
    id: 'orange-store',
    title: 'Orange Store Redux v2',
    tagline: 'E-commerce UI (personal project)',
    description:
      'React storefront with Redux Toolkit and React Query—routing, cart-style flows, and MUI/Tailwind styling from a learning-focused codebase.',
    category: 'Web App',
    featured: false,
    technologies: ['React', 'Redux Toolkit', 'React Query', 'MUI', 'Tailwind CSS'],
    highlights: [
      'Centralized state for catalog and cart interactions',
      'Data fetching patterns with React Query',
    ],
    githubUrl: 'https://github.com/sajedeh-dev/orange-store-redux-v2',
    previewType: 'ecommerce',
  },
  {
    id: 'freshfood',
    title: 'FreshFood',
    tagline: 'Food ordering UI (personal project)',
    description:
      'Next.js 13 and React 18 interface built with Tailwind CSS—focused on layout, components, and a clean browsing experience.',
    category: 'Open Source',
    featured: false,
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    highlights: ['Component-based page structure', 'Tailwind-driven responsive layout'],
    githubUrl: 'https://github.com/sajedeh-dev/FreshFood-next.js',
    previewType: 'ecommerce',
  },
];

export const experience: ExperienceItem[] = [
  {
    id: 'frontend-developer-product',
    role: 'Frontend Developer',
    company: 'Product company',
    period: '2025 – Present',
    location: 'Iran',
    type: 'Full-time',
    current: true,
    summary:
      'Professional frontend development on production software—approximately nine months building user-facing features with React, Next.js, and TypeScript.',
    achievements: [
      'Frontend implementation on Siavash, an AI legal assistant: chat UI, documents, projects/cases, auth sessions, subscriptions, TTS, and RTL interfaces.',
      'Responsive UI development on the company website alongside core product work.',
      'API-driven features: integrating backend responses into typed React components and managing client state for multi-step flows.',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'TanStack Query'],
  },
];

export const resumeExtras: ResumeExtras = {
  education: [
    {
      title: 'B.Sc. Computer Engineering',
      institution: 'Persian Gulf University',
      period: '2019 – 2023',
    },
  ],
  certifications: [],
};

/**
 * Returns navigation items whose required data collections are populated.
 *
 * @returns Visible homepage section links.
 */
export function getVisibleNavigationItems(): NavItem[] {
  return navigationItems.filter((item) => {
    if (item.requires === 'projects') {
      return projects.length > 0;
    }
    if (item.requires === 'experience') {
      return experience.length > 0;
    }
    return true;
  });
}
