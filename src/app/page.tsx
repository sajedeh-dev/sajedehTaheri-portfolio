import { AppShell } from '@/components/layout/AppShell';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';

export default function HomePage() {
  return (
    <AppShell>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </AppShell>
  );
}
