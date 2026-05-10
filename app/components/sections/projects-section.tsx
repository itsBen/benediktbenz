'use client';

import SectionLayout from '../shared/section-layout';

type Project = {
  name: string;
  description: string;
  tags: string[];
  shot: string;
};

const projects: Project[] = [
  {
    name: 'Supply Chain Signal Hub',
    description:
      'Built a forecasting dashboard that cut stockout alerts by combining Python feature pipelines with lightweight React visualizations.',
    tags: ['Python', 'React', 'SQL', 'Forecasting'],
    shot: 'Linear trend + anomaly overlay',
  },
  {
    name: 'Fleet Carbon Pulse',
    description:
      'Designed a telemetry ingestion and reporting workflow to surface emissions hotspots and optimize route planning.',
    tags: ['Node.js', 'TypeScript', 'Databricks', 'API'],
    shot: 'Geo route map + KPI side panel',
  },
  {
    name: 'Quality Ops Console',
    description:
      'Shipped an operations cockpit for production quality checks with auto-prioritized incidents and human-in-the-loop remediation notes.',
    tags: ['Next.js', 'PostgreSQL', 'LLM', 'UX'],
    shot: 'Card grid + drill-down timeline',
  },
];

export default function ProjectsSection() {
  return (
    <SectionLayout
      id="projects"
      kicker="Section 2"
      title="Selected Projects"
      copy="Placeholder projects for now, represented as reusable portfolio cards."
    >
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.name} className="project-card">
            <div className="project-shot">
              <span>{project.shot}</span>
            </div>
            <h3 className="mt-5 text-xl font-medium tracking-tight">
              {project.name}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
              {project.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="tag-pill">
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionLayout>
  );
}
