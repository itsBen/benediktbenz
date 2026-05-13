'use client';

import { useEffect, useRef, useState } from 'react';
import ContactSection from './sections/contact-section';
import PageFooter from './page-footer';
import PageHeader from './page-header';
import ProjectsSection from './sections/projects-section';
import SectionDotNav from './section-dot-nav';
import StartSection from './sections/start-section';
import SurfMapSection from './sections/surf-map-section';
import TechStackSection from './sections/tech-stack-section';

const sectionNav = [
  { id: 'start', label: 'Start' },
  { id: 'tech', label: 'Tech stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'surf-map', label: 'Surf map' },
  { id: 'contact', label: 'Contact' },
];

export default function PortfolioPage() {
  const visibilityRef = useRef<Record<string, number>>({});
  const [activeSection, setActiveSection] = useState('start');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    return saved ? saved === 'dark' : prefersDark;
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityRef.current[entry.target.id] =
            entry.intersectionRatio;
        });

        const startSection = document.getElementById('start');

        if (startSection) {
          const startBounds = startSection.getBoundingClientRect();
          const heroMidpoint = window.innerHeight * 0.42;

          if (
            startBounds.top <= heroMidpoint &&
            startBounds.bottom >= heroMidpoint
          ) {
            setActiveSection('start');
            return;
          }
        }

        const mostVisible = sectionNav
          .map((item) => ({
            id: item.id,
            ratio: visibilityRef.current[item.id] ?? 0,
          }))
          .sort((a, b) => b.ratio - a.ratio)[0];

        if (mostVisible && mostVisible.ratio > 0.14) {
          setActiveSection(mostVisible.id);
        }
      },
      {
        threshold: [0.15, 0.3, 0.45, 0.6, 0.75],
        rootMargin: '-16% 0px -24% 0px',
      },
    );

    sectionNav.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    window.localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  };

  return (
    <>
      <PageHeader
        activeSection={activeSection}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      <SectionDotNav
        items={sectionNav}
        activeSection={activeSection}
      />

      <main className="portfolio-main mx-auto w-full max-w-6xl px-6 pb-40 pt-16 md:px-12">
        <StartSection />
        <TechStackSection />
        <ProjectsSection />
        <SurfMapSection />
        <ContactSection />
      </main>

      <PageFooter />
    </>
  );
}
