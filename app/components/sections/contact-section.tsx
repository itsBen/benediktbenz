'use client';

import { createElement } from 'react';
import SectionLayout from '../shared/section-layout';

export default function ContactSection() {
  return (
    <SectionLayout
      id="contact"
      title="Get In Touch"
      copy="I love building practical data products that turn messy inputs into clear decisions. If you are working on something meaningful and need support with pipelines, analytics, or product-minded data engineering, I would love to hear about it. And if your message includes a good surf spot recommendation, even better."
      copyClassName="max-w-xl"
    >
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="https://github.com/itsBen"
          target="_blank"
          rel="noreferrer"
          className="icon-link contact-social-link"
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
          className="icon-link contact-social-link"
          aria-label="LinkedIn"
        >
          {createElement('ion-icon', {
            name: 'logo-linkedin',
            'aria-hidden': 'true',
          })}
        </a>
        <a
          href="https://instagram.com/it.s.ben"
          target="_blank"
          rel="noreferrer"
          className="icon-link contact-social-link"
          aria-label="Instagram"
        >
          {createElement('ion-icon', {
            name: 'logo-instagram',
            'aria-hidden': 'true',
          })}
        </a>
      </div>
    </SectionLayout>
  );
}
