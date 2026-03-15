import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Stack.css';

const stack = [
  {
    category: 'FRONTEND',
    name: 'React 18 · Vite',
    tags: ['TypeScript', 'Framer Motion', 'D3.js', 'CSS vars'],
    color: 'purple',
  },
  {
    category: 'BACKEND',
    name: 'Node.js · Fastify',
    tags: ['TypeScript', 'REST APIs', 'OpenAPI', 'JWT'],
    color: 'cyan',
  },
  {
    category: 'IA & LLM',
    name: 'Anthropic · Python',
    tags: ['Claude API', 'RAG', 'Prompt Eng.', 'Agentes LLM'],
    color: 'cyan',
  },
  {
    category: 'DEVOPS',
    name: 'Docker · CI/CD',
    tags: ['Docker Compose', 'GitHub Actions', 'Railway', 'IBM Cloud'],
    color: 'green',
  },
  {
    category: 'DATOS',
    name: 'PostgreSQL · Redis',
    tags: ['pgvector', 'Redis cache', 'MongoDB', 'Prisma ORM'],
    color: 'purple',
  },
  {
    category: 'OBSERVABILIDAD',
    name: 'Pino · OpenTelemetry',
    tags: ['Structured logs', 'Tracing', '/health', 'SLA tracking'],
    color: 'green',
  },
];

export function Stack() {
  const ref = useScrollReveal();

  return (
    <section
      className="stack reveal"
      id="stack"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="stack-inner">
        <div className="stack-header">
          <span className="section-tag">// STACK TÉCNICO</span>
          <h2 className="section-title">
            Herramientas que uso
            <br />
            en producción.
          </h2>
          <p className="section-sub">
            No es un listado de cosas que "conozco".
            <br />
            Es lo que efectivamente corre en mis sistemas.
          </p>
        </div>

        <div className="stack-grid">
          {stack.map((item) => (
            <div
              className={`stack-cell stack-cell--${item.color}`}
              key={item.category}
            >
              <div className="stack-cell-cat">{item.category}</div>
              <div className="stack-cell-name">{item.name}</div>
              <div className="stack-cell-tags">
                {item.tags.map((tag) => (
                  <span className="stack-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
