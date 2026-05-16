'use client';

import { motion } from 'framer-motion';

type SectionNavItem = {
  id: string;
  label: string;
};

type SectionDotNavProps = {
  items: SectionNavItem[];
  activeSection: string;
};

export default function SectionDotNav({
  items,
  activeSection,
}: SectionDotNavProps) {
  return (
    <nav className="dot-nav" aria-label="Section navigation">
      <ul className="dot-track">
        {items.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <li key={item.id} className="dot-row">
              <motion.a
                href={`#${item.id}`}
                aria-label={item.label}
                className={`dot-item ${isActive ? 'dot-item-active' : ''}`}
                animate={{
                  scale: isActive ? 1.22 : 1,
                  opacity: isActive ? 1 : 0.56,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <span className="dot-label">{item.label}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
