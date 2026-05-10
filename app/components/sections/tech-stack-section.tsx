'use client';

import { useState } from 'react';
import type { IconType } from 'react-icons';
import {
  RiArrowDownSLine,
  RiBarChartBoxLine,
  RiCloudLine,
  RiDatabase2Line,
  RiSlideshowLine,
  RiStackLine,
} from 'react-icons/ri';
import {
  SiApachespark,
  SiDatabricks,
  SiDocker,
  SiDotnet,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiJavascript,
  SiJest,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPandas,
  SiPython,
  SiPytest,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
import SectionLayout from '../shared/section-layout';

type SkillItem = {
  name: string;
  detail: string;
  icon: IconType;
};

type SkillGroup = {
  number: string;
  title: string;
  description: string;
  skills: SkillItem[];
};

const skillGroups: SkillGroup[] = [
  {
    number: '01',
    title: 'Data Engineering',
    description:
      'Designing production-grade data workflows, platform foundations, and scalable transformation layers around modern data engineering stacks.',
    skills: [
      {
        name: 'Python',
        detail:
          'Automation, ETL, scripting, orchestration, and testable data workflows.',
        icon: SiPython,
      },
      {
        name: 'SQL',
        detail:
          'Query design, data modeling, warehouse transformations, and performance-oriented analytical workloads.',
        icon: RiDatabase2Line,
      },
      {
        name: 'PySpark',
        detail:
          'Distributed transformation logic, large-scale batch processing, and optimization.',
        icon: SiApachespark,
      },
      {
        name: 'Databricks',
        detail:
          'Asset Bundles, Spark Declarative Pipelines, and Databricks AI/BI dashboards for production data platforms.',
        icon: SiDatabricks,
      },
      {
        name: 'Microsoft Fabric',
        detail:
          'Lakehouse-oriented analytics workflows and tightly integrated data + reporting experiences.',
        icon: RiStackLine,
      },
      {
        name: 'SSIS / SSMS',
        detail:
          'Package-based integrations, SQL Server workflow management, and database development tooling.',
        icon: RiDatabase2Line,
      },
    ],
  },
  {
    number: '02',
    title: 'BI & Analytics',
    description:
      'Turning data into usable insight through semantic layers, reporting surfaces, and exploratory analysis for business-facing decisions.',
    skills: [
      {
        name: 'Power BI',
        detail:
          'Interactive reporting, semantic models, and business-facing dashboards.',
        icon: RiBarChartBoxLine,
      },
      {
        name: 'Tableau',
        detail:
          'Visual analytics, storytelling dashboards, and exploratory data presentation.',
        icon: RiSlideshowLine,
      },
      {
        name: 'Pandas',
        detail:
          'Data wrangling, profiling, prototyping, and exploratory analysis.',
        icon: SiPandas,
      },
    ],
  },
  {
    number: '03',
    title: 'TypeScript Frontend',
    description:
      'Building typed user interfaces and modern web applications with a focus on maintainable frontend architecture.',
    skills: [
      {
        name: 'JavaScript',
        detail:
          'Modern ES syntax, async flows, browser-side application logic.',
        icon: SiJavascript,
      },
      {
        name: 'TypeScript',
        detail:
          'Strict typing, shared contracts, and safer large-scale refactors.',
        icon: SiTypescript,
      },
      {
        name: 'React',
        detail:
          'Component systems, stateful UI patterns, and interactive frontends.',
        icon: SiReact,
      },
      {
        name: 'Next.js',
        detail:
          'App Router, rendering strategies, and production-ready frontend delivery.',
        icon: SiNextdotjs,
      },
    ],
  },
  {
    number: '04',
    title: 'Application Services',
    description:
      'Designing backend logic and API layers that support data-heavy products and connected frontend systems.',
    skills: [
      {
        name: 'Node.js',
        detail:
          'Express, Socket.io, MongoDB, and event-driven backend services.',
        icon: SiNodedotjs,
      },
      {
        name: 'Java',
        detail:
          'Strongly typed backend services and application-layer logic.',
        icon: SiOpenjdk,
      },
      {
        name: 'C# / .NET',
        detail:
          'Web APIs, enterprise app structure, and server-side application work.',
        icon: SiDotnet,
      },
    ],
  },
  {
    number: '05',
    title: 'CI/CD & Testing',
    description:
      'Automating delivery, environment consistency, and quality checks across build, test, and deployment workflows.',
    skills: [
      {
        name: 'GitHub Actions',
        detail:
          'CI workflows, checks, deployments, scheduled jobs, and automation pipelines.',
        icon: SiGithubactions,
      },
      {
        name: 'Docker',
        detail:
          'Containerized development, packaging, and environment consistency.',
        icon: SiDocker,
      },
      {
        name: 'Azure Stack',
        detail:
          'Cloud platform operations and deployment environments built around Microsoft Azure tooling.',
        icon: RiCloudLine,
      },
      {
        name: 'pytest',
        detail:
          'Python test suites, fixtures, parametrization, and regression coverage for data workflows.',
        icon: SiPytest,
      },
      {
        name: 'Jest',
        detail:
          'JavaScript and TypeScript unit testing for frontend and service-layer code.',
        icon: SiJest,
      },
    ],
  },
  {
    number: '06',
    title: 'Git Workflow',
    description:
      'Working cleanly in teams through reviewable history, repository hygiene, and collaborative delivery workflows.',
    skills: [
      {
        name: 'Git',
        detail:
          'Branching strategies, rebasing, conflict resolution, and readable history.',
        icon: SiGit,
      },
      {
        name: 'GitHub',
        detail:
          'Pull requests, code reviews, issue management, and repository collaboration.',
        icon: SiGithub,
      },
    ],
  },
];

export default function TechStackSection() {
  const [expandedSkillKey, setExpandedSkillKey] = useState<
    string | null
  >(null);

  return (
    <SectionLayout
      id="tech"
      title="Tech Stack"
      copy="A grouped view of the areas I work across most, with hover details for the tools and frameworks behind each one."
    >
      <div className="skills-layout mt-10">
        {skillGroups.map((group) => (
          <article key={group.number} className="skill-block">
            <div className="skill-block-intro">
              <p className="skill-block-number">{group.number}</p>
              <h3 className="skill-block-title">{group.title}</h3>
              <p className="skill-block-copy">{group.description}</p>
            </div>

            <ul className="skill-list" aria-label={group.title}>
              {group.skills.map((skill) => {
                const skillKey = `${group.number}-${skill.name}`;
                const isExpanded = expandedSkillKey === skillKey;
                const SkillIcon = skill.icon;

                return (
                  <li
                    key={skill.name}
                    className={`skill-item-card ${
                      isExpanded ? 'skill-item-card-open' : ''
                    }`}
                  >
                    <button
                      type="button"
                      className="skill-item-trigger"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedSkillKey((current) =>
                          current === skillKey ? null : skillKey,
                        )
                      }
                    >
                      <div className="skill-item-head">
                        <div>
                          <p className="skill-item-name">
                            {skill.name}
                          </p>
                          <p className="skill-item-detail">
                            {skill.detail}
                          </p>
                        </div>
                        <span className="skill-item-meta">
                          <span
                            className="skill-item-icon"
                            aria-hidden="true"
                          >
                            <SkillIcon />
                          </span>
                          <span
                            className={`skill-item-chevron ${
                              isExpanded
                                ? 'skill-item-chevron-open'
                                : ''
                            }`}
                            aria-hidden="true"
                          >
                            <RiArrowDownSLine />
                          </span>
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </SectionLayout>
  );
}
