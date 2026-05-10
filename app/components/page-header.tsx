import { createElement } from 'react';

type PageHeaderProps = {
  activeSection: string;
  isDark: boolean;
  onToggleTheme: () => void;
};

export default function PageHeader({
  activeSection,
  isDark,
  onToggleTheme,
}: PageHeaderProps) {
  const showFullName = activeSection !== 'start';

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40 px-4 py-4 md:px-6 lg:px-12">
      <div className="header-shell mx-auto flex w-full max-w-6xl items-center justify-between">
        <a
          href="#start"
          className="logo-mark"
          aria-label="Jump to start"
        >
          <span
            className={
              showFullName ? 'logo-wordmark' : 'logo-wordmark-hidden'
            }
          >
            Benedikt Benz
          </span>
        </a>
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle dark mode"
          className="icon-button theme-toggle"
        >
          {createElement('ion-icon', {
            name: isDark ? 'sunny-outline' : 'moon-outline',
            'aria-hidden': 'true',
          })}
        </button>
      </div>
    </header>
  );
}
