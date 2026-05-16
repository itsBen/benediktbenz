'use client';

import { MdConstruction } from 'react-icons/md';
import SectionLayout from '../shared/section-layout';

export default function ProjectsSection() {
  return (
    <SectionLayout
      id="projects"
      title="Selected Projects"
      copy="Projects are coming soon."
    >
      <div className="mt-8 flex flex-col items-center gap-5 text-center">
        <MdConstruction
          aria-hidden="true"
          className="text-[var(--color-text-muted)]"
          size={96}
        />
        <a
          href="https://github.com/itsBen/benediktbenz/issues/17"
          target="_blank"
          rel="noreferrer"
          className="anchor-link text-sm"
        >
          Follow progress on GitHub →
        </a>
      </div>
    </SectionLayout>
  );
}
