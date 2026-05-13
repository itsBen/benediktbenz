'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { sectionMotion } from './section-motion';

const titleMotion = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
  },
};

const titleHighlightMotion = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.42,
      delay: 0.1,
    },
  },
};

type SectionLayoutProps = {
  id: string;
  title: string;
  copy: string;
  children: ReactNode;
  className?: string;
  copyClassName?: string;
  viewportAmount?: number;
};

export default function SectionLayout({
  id,
  title,
  copy,
  children,
  className,
  copyClassName,
  viewportAmount = 0.2,
}: SectionLayoutProps) {
  const sectionClassName = className
    ? `section-shell ${className}`
    : 'section-shell';
  const descriptionClassName = copyClassName
    ? `section-copy ${copyClassName}`
    : 'section-copy';

  return (
    <motion.section
      id={id}
      className={sectionClassName}
      variants={sectionMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
    >
      <motion.h2
        className="section-title"
        variants={titleMotion}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
      >
        <span className="section-title-highlight-wrap">
          <motion.span
            className="section-title-highlight-bg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            variants={titleHighlightMotion}
          />
          <span className="section-title-highlight-text">
            {title}
          </span>
        </span>
      </motion.h2>
      <p className={descriptionClassName}>{copy}</p>
      {children}
    </motion.section>
  );
}
