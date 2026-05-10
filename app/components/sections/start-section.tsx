'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { sectionMotion } from '../shared/section-motion';

type IntroToken = {
  text: string;
  variant?: 'accent-box';
};

const introTypingIntervalMs = 18;

const introTokens: IntroToken[] = [
  {
    text: 'I am a data engineer focused on building reliable, production-grade data platforms with ',
  },
  {
    text: 'SQL, Python, Databricks, Apache Spark, and Next.js.',
    variant: 'accent-box',
  },
  {
    text: ' My work is increasingly shaped by AI use cases, especially where strong data foundations, high-quality training data, and scalable real-time systems matter. Outside of work, you will usually find me in the ',
  },
  { text: 'gym', variant: 'accent-box' },
  { text: ' and spending time ' },
  { text: 'surfing', variant: 'accent-box' },
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

  return (
    <motion.section
      id="start"
      className="section-shell section-hero"
      variants={sectionMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="hero-center">
        <div className="relative overflow-hidden rounded-full border border-[var(--color-border)]">
          <div className="h-[180px] w-[180px] md:h-[220px] md:w-[220px]">
            <Image
              src="https://github.com/itsBen.png?size=400"
              alt="Profile photo of Benedikt Benz"
              width={400}
              height={400}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-2 text-left">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Benedikt Benz
          </h1>
          <div className="flex items-center gap-4 text-sm uppercase tracking-[0.09em]">
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
      </div>

      <p className="cli-intro" aria-live="polite">
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

          return (
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
    </motion.section>
  );
}
