import { createElement } from 'react';

export default function PageFooter() {
  return (
    <footer className="site-footer fixed inset-x-0 bottom-0 z-30 px-6 py-4 md:px-12">
      <div className="mx-auto flex w-full max-w-6xl justify-end text-sm">
        <div className="flex items-center gap-4">
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
      </div>
    </footer>
  );
}
