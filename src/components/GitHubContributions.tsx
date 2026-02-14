import { ExternalLink, GitBranch } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import 'react-github-calendar/tooltips.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { TerminalWindow } from './TerminalWindow';
import './GitHubContributions.css';

const GITHUB_USERNAME = 'eclipse-walker';

type ColorScheme = 'light' | 'dark';

const calendarTheme = {
  light: [
    'var(--bg-tertiary)',
    'rgba(26, 127, 55, 0.2)',
    'rgba(26, 127, 55, 0.4)',
    'rgba(26, 127, 55, 0.65)',
    'var(--accent-green)',
  ],
  dark: [
    'var(--bg-tertiary)',
    'rgba(63, 185, 80, 0.2)',
    'rgba(63, 185, 80, 0.4)',
    'rgba(63, 185, 80, 0.65)',
    'var(--accent-green)',
  ],
};

function getColorScheme(): ColorScheme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark';
}

export function GitHubContributions() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(getColorScheme);

  useEffect(() => {
    if (
      typeof document === 'undefined' ||
      typeof MutationObserver === 'undefined'
    ) {
      return;
    }

    const observer = new MutationObserver(() => {
      setColorScheme(getColorScheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="github" className="github" ref={ref}>
      <div className="github-container">
        <h2
          className={`section-title scroll-animate ${isVisible ? 'visible' : ''}`}
        >
          <span className="title-prefix">04.</span> GitHub Activity
        </h2>

        <div
          className={`github-content scroll-animate stagger-1 ${isVisible ? 'visible' : ''}`}
        >
          <TerminalWindow title="contributions.tsx">
            <div className="github-header">
              <div className="github-meta">
                <GitBranch
                  size={16}
                  className="github-icon"
                  aria-hidden="true"
                />
                <span className="syntax-comment">
                  # Last year contributions
                </span>
              </div>

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="github-profile-link"
              >
                <span className="syntax-string">@{GITHUB_USERNAME}</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>

            <div className="github-calendar-wrapper" aria-live="polite">
              {isVisible ? (
                <GitHubCalendar
                  username={GITHUB_USERNAME}
                  blockSize={13}
                  blockMargin={4}
                  fontSize={12}
                  showWeekdayLabels
                  colorScheme={colorScheme}
                  theme={calendarTheme}
                  labels={{
                    totalCount: '{{count}} contributions in the last year',
                  }}
                />
              ) : (
                <p className="github-loading-text">
                  <span className="syntax-comment">
                    {'// Scroll to load contribution graph'}
                  </span>
                </p>
              )}
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}
