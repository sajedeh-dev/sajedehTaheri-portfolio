export type ThemeMode = 'light' | 'dark';

export type SkillLevel = 'Core' | 'Advanced' | 'Proficient';

export type ProjectCategory = 'Web App' | 'Design System' | 'Tooling' | 'Open Source';

export type ProjectPreviewType =
  | 'dashboard'
  | 'ecommerce'
  | 'code-editor'
  | 'design-system'
  | 'analytics';

export interface DeveloperProfile {
  name: string;
  role: string;
  location: string;
  status: string;
  availableForHire: boolean;
  shortBio: string;
  aboutStory: string[];
  email: string;
  github: string;
  linkedin: string;
}

export interface SocialLink {
  id: 'email' | 'github' | 'linkedin';
  label: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  requires?: 'projects' | 'experience';
}

export interface AboutPillar {
  title: string;
  badge: string;
  description: string;
  iconName: 'Layers' | 'Palette' | 'Figma' | 'Sparkles';
}

export interface WorkingPrinciple {
  title: string;
  description: string;
}

export interface SkillItem {
  name: string;
  level: SkillLevel;
  iconName: string;
  yearsOrFocus?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  featured: boolean;
  technologies: string[];
  metrics?: ProjectMetric[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  previewType: ProjectPreviewType;
  imageSrc?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Open Source';
  current?: boolean;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  title: string;
  institution: string;
  period: string;
  detail?: string;
}

export interface ResumeExtras {
  education: EducationItem[];
  certifications: string[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}
