'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import LocationPulse from '../location-pulse';
import { sectionMotion } from '../shared/section-motion';

type IntroToken = {
  text: string;
  variant?: 'accent-box';
  href?: string;
  ariaLabel?: string;
};

const introTypingIntervalMs = 10;

const introTokens: IntroToken[] = [
  {
    text: 'I am a data engineer focused on building reliable, production-grade data platforms with ',
  },
  {
    text: 'Databricks, Python, PySpark, SQL and Next.js.',
    variant: 'accent-box',
    href: '#tech',
    ariaLabel: 'Jump to tech stack section',
  },
  {
    text: ' My work is increasingly shaped by AI use cases, especially where strong data foundations, high-quality training data, and scalable real-time systems matter. Outside of work, you will usually find me in the ',
  },
  { text: 'gym' },
  { text: ' and spending time ' },
  {
    text: 'surfing',
    variant: 'accent-box',
    href: '#surf-map',
    ariaLabel: 'Jump to surf map section',
  },
  { text: '.' },
];

const introLength = introTokens.reduce(
  (total, token) => total + token.text.length,
  0,
);

const introTokenRanges = introTokens.reduce<
  Array<IntroToken & { start: number; end: number }>
>((ranges, token) => {
  const start = ranges.length ? ranges[ranges.length - 1].end : 0;

  return [
    ...ranges,
    {
      ...token,
      start,
      end: start + token.text.length,
    },
  ];
}, []);

export default function StartSection() {
  const [typedIntroChars, setTypedIntroChars] = useState(() => {
    if (typeof window === 'undefined') {
      return 0;
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    return reducedMotion ? introLength : 0;
  });
  const [showCuriosity, setShowCuriosity] = useState(false);

  useEffect(() => {
    if (typedIntroChars >= introLength) {
      return;
    }

    const timer = window.setInterval(() => {
      setTypedIntroChars((current) => {
        if (current >= introLength) {
          window.clearInterval(timer);
          return current;
        }

        return current + 1;
      });
    }, introTypingIntervalMs);

    return () => window.clearInterval(timer);
  }, [typedIntroChars]);

  useEffect(() => {
    if (typedIntroChars < introLength) {
      return;
    }

    const revealTimer = window.setTimeout(() => {
      setShowCuriosity(true);
    }, 320);

    return () => window.clearTimeout(revealTimer);
  }, [typedIntroChars]);

  const shouldShowCuriosity =
    typedIntroChars >= introLength && showCuriosity;

  return (
    <motion.section
      id="start"
      className="section-shell section-hero start-section"
      variants={sectionMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="start-hero-layout">
        <div className="start-photo-shell relative overflow-hidden rounded-full border border-[var(--color-border)]">
          <div className="h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] md:h-[180px] md:w-[180px] lg:h-[220px] lg:w-[220px]">
            <Image
              src="/benedikt-benz.jpg"
              alt="Profile photo of Benedikt Benz"
              width={400}
              height={400}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="start-content-block">
          <div className="start-identity text-left">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Benedikt Benz
            </h1>
            <LocationPulse />
            <div className="start-links text-sm uppercase tracking-[0.09em]">
              <a
                href="https://www.linkedin.com/in/benediktbenz"
                target="_blank"
                rel="noreferrer"
                className="anchor-link"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/itsBen"
                target="_blank"
                rel="noreferrer"
                className="anchor-link"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="relative">
            {/* Phantom: reserves the full final height so layout never shifts */}
            <p
              className="cli-intro start-intro invisible pointer-events-none select-none"
              aria-hidden="true"
            >
              {introTokens.map((token, i) =>
                token.href ? (
                  <a
                    key={i}
                    className="cli-accent-box cli-accent-link"
                  >
                    {token.text}
                  </a>
                ) : (
                  <span
                    key={i}
                    className={
                      token.variant === 'accent-box'
                        ? 'cli-accent-box'
                        : undefined
                    }
                  >
                    {token.text}
                  </span>
                ),
              )}
              <span className="cli-cursor">|</span>
            </p>

            {/* Animated text overlaid on top */}
            <p
              className="cli-intro start-intro absolute inset-0"
              aria-live="polite"
            >
              {introTokenRanges.map((token, index) => {
                const visibleCharCount = Math.max(
                  0,
                  Math.min(
                    token.text.length,
                    typedIntroChars - token.start,
                  ),
                );

                if (visibleCharCount === 0) {
                  return null;
                }

                return token.href ? (
                  <a
                    key={`${token.text}-${index}`}
                    href={token.href}
                    aria-label={token.ariaLabel}
                    className="cli-accent-box cli-accent-link"
                  >
                    {token.text.slice(0, visibleCharCount)}
                  </a>
                ) : (
                  <span
                    key={`${token.text}-${index}`}
                    className={
                      token.variant === 'accent-box'
                        ? 'cli-accent-box'
                        : undefined
                    }
                  >
                    {token.text.slice(0, visibleCharCount)}
                  </span>
                );
              })}
              <span className="cli-cursor" aria-hidden="true">
                |
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="start-secondary-layout">
        <div className="start-secondary-spacer" aria-hidden="true" />
        <motion.div
          className="curiosity-card mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={
            shouldShowCuriosity
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 0 }
          }
          transition={{ duration: 0.35, ease: 'easeOut' }}
          aria-hidden={!shouldShowCuriosity}
          style={{
            pointerEvents: shouldShowCuriosity ? undefined : 'none',
          }}
        >
          <p className="curiosity-kicker">Currently</p>
          <p className="curiosity-copy">
            Reading{' '}
            <a
              href="https://www.oreilly.com/library/view/spark-the-definitive/9781491912201/"
              target="_blank"
              rel="noreferrer"
              className="anchor-link"
            >
              Spark: The Definitive Guide
            </a>
            . Big Data processing made simple.
          </p>
          <p className="curiosity-keywords">
            Data Systems · LLM Workflows · Pipelines
          </p>
        </motion.div>
      </div>
      <a
        href="#tech"
        className="start-scroll-hint"
        aria-label="Scroll to next section"
      >
        scroll
      </a>
    </motion.section>
  );
}
