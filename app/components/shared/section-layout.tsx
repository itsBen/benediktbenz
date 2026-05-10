'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { sectionMotion } from './section-motion';

type SectionLayoutProps = {
  id: string;
  kicker: string;
  title: string;
  copy: string;
  children: ReactNode;
  className?: string;
  copyClassName?: string;
  viewportAmount?: number;
};

export default function SectionLayout({
  id,
  kicker,
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
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      <p className={descriptionClassName}>{copy}</p>
      {children}
    </motion.section>
  );
}
