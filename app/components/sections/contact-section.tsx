'use client';

import { createElement } from 'react';
import SectionLayout from '../shared/section-layout';

export default function ContactSection() {
  return (
    <SectionLayout
      id="contact"
      kicker="Section 4"
      title="Get In Touch"
      copy="If you are building something meaningful and need a pragmatic product engineer, let us talk."
      copyClassName="max-w-xl"
    >
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="mailto:benedikt.benz@outlook.com"
          className="btn-accent"
        >
          Email me
        </a>
        <a
          href="https://github.com/itsBen"
          target="_blank"
          rel="noreferrer"
          className="icon-link"
          aria-label="GitHub"
        >
          {createElement('ion-icon', {
            name: 'logo-github',
            'aria-hidden': 'true',
          })}
        </a>
        <a
          href="https://www.linkedin.com/in/benediktbenz"
          target="_blank"
          rel="noreferrer"
          className="icon-link"
          aria-label="LinkedIn"
        >
          {createElement('ion-icon', {
            name: 'logo-linkedin',
            'aria-hidden': 'true',
          })}
        </a>
      </div>
    </SectionLayout>
  );
}
