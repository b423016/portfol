import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { Reveal } from './fx/Reveal';
import SectionShell from './fx/SectionShell';

function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const rx = useSpring(rotX, { stiffness: 200, damping: 20 });
  const ry = useSpring(rotY, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
    rotY.set((px - 0.5) * 12);
    rotX.set((0.5 - py) * 12);
  };

  const handleLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  // Theme-aware hover wash (works on Paper light + dark themes)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, color-mix(in srgb, var(--text) 10%, transparent), transparent 55%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      className={`relative group ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: glow }}
      />
      {children}
    </motion.div>
  );
}

const ProjectCard = ({
  title,
  description,
  tags,
  id,
  status,
  delay,
  githubLink,
  externalLink,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 48 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    style={{ perspective: 1000 }}
  >
    <TiltCard className="theme-card h-full rounded-xl overflow-hidden transition-all duration-400 hover:border-lift/25 hover:shadow-card">
      <div className="relative z-10 p-6 flex flex-col h-full min-h-[300px]">
        <div className="flex justify-between items-center mb-5 font-mono text-[10px] tracking-widest text-steel-dim border-b border-lift/5 pb-4">
          <span className="text-steel group-hover:text-steel-bright transition-colors">{id}</span>
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status === 'LIVE' ? 'bg-steel-bright' : 'bg-steel-dim'
              } group-hover:animate-pulse`}
            />
            <span className="text-steel">[{status}]</span>
          </div>
        </div>

        <h3
          className="text-xl sm:text-2xl font-display font-bold text-steel-bright mb-3 group-hover:tracking-tight transition-all duration-300"
          style={{ transform: 'translateZ(24px)' }}
        >
          {title}
        </h3>
        <p className="text-steel text-sm leading-relaxed mb-6 flex-1">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-[10px] font-mono border border-lift/10 text-steel bg-lift/[0.03] rounded group-hover:border-lift/20 group-hover:text-steel-bright transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t border-lift/5 mt-auto">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-lift/5 hover:bg-lift/10 text-xs font-mono text-steel-bright hover:text-steel-bright transition-all rounded border border-transparent hover:border-lift/15"
            >
              <FiGithub /> SOURCE
            </a>
          )}
          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-lift/10 hover:bg-lift/15 text-xs font-mono text-steel-bright border border-lift/15 hover:border-lift/30 transition-all rounded"
            >
              <FiExternalLink /> LIVE
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  </motion.div>
);

const Projects = () => {
  const projects = [
    {
      id: 'PRJ-01',
      status: 'LIVE',
      title: 'NF3-Pro Chess Platform',
      description:
        'Led a 3-person team building chess tournament microservices on AWS EC2 — 5k+ req / 15 min for 250+ concurrent users. Fine-tuned Qwen 2.5 VLM for match-slip OCR (<10.1% CER), FIDE pairings, OpenTelemetry + Grafana.',
      tags: ['PYTHON', 'FASTAPI', 'VLM', 'AWS EC2', 'OTEL'],
      externalLink: 'https://www.nf3pro.com',
      delay: 0.05,
    },
    {
      id: 'PRJ-02',
      status: 'SHIPPED',
      title: 'Xalen Ephemeris',
      description:
        'Pure-Rust Swiss Ephemeris replacement (Apache-2.0): memory-safe, zero data files, WASM. Validated on 100k charts — 0 charts >0.1° divergence. 12+ traditions. 650+ GitHub stars · 50+ forks.',
      tags: ['RUST', 'WASM', 'APACHE-2.0', 'OPEN SOURCE'],
      githubLink: 'https://github.com/vedika-io/xalen-ephemeris',
      delay: 0.1,
    },
    {
      id: 'PRJ-03',
      status: 'SHIPPED',
      title: 'Glance Fashion',
      description:
        'Multimodal fashion retrieval that fixes CLIP bag-of-words binding. FashionSigLIP + training-free compositional re-ranker so “red tie and white shirt” means that — not the swap.',
      tags: ['PYTHON', 'SIGLIP', 'LANCEDB', 'CV'],
      githubLink: 'https://github.com/b423016/Glance-fashion',
      delay: 0.15,
    },
    {
      id: 'PRJ-04',
      status: 'SHIPPED',
      title: 'Quant Hedging Terminal',
      description:
        'Full-stack options terminal. 5-node LangGraph agent for delta-neutral hedging under 800ms. Black-Scholes Greeks + Alpaca for 50+ concurrent positions.',
      tags: ['NEXT.JS', 'FASTAPI', 'LANGGRAPH', 'QUANT'],
      githubLink: 'https://github.com/b423016/Quant-hedging-terminal',
      delay: 0.2,
    },
    {
      id: 'PRJ-05',
      status: 'SHIPPED',
      title: 'ByteFit Manager',
      description:
        'Variable-size memory allocator simulation with Red-Black Tree free-list management — systems-level OS learning.',
      tags: ['JAVA', 'OS', 'ALGORITHMS'],
      githubLink: 'https://github.com/b423016/Memory-Management',
      delay: 0.25,
    },
    {
      id: 'PRJ-06',
      status: 'SOLVED',
      title: 'CSES Solutions',
      description:
        'Optimized solutions for the CSES Problem Set — algorithms, data structures, competitive patterns.',
      tags: ['JAVA', 'C++', 'COMPETITIVE'],
      githubLink: 'https://github.com/b423016/CSES_SOLN',
      delay: 0.3,
    },
  ];

  return (
    <SectionShell id="projects" index={1} className="py-28 sm:py-36 px-4 overflow-hidden">
      {/* Bridge from hero scroll beam */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-lift/20 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="mb-16 sm:mb-20 border-b border-lift/10 pb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-steel font-mono text-xs tracking-[0.3em] mb-3 uppercase">Selected work</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-steel-bright tracking-tight">
              Deployed <span className="text-gradient">units</span>
            </h2>
          </div>
          <div className="font-mono text-[11px] text-steel-dim text-right">
            <div>STATUS · ONLINE</div>
            <div>NODES · {projects.length}</div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        <Reveal delay={0.15} className="mt-16 flex justify-center">
          <a
            href="https://github.com/b423016"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group relative px-8 py-3 border border-lift/15 overflow-hidden rounded-sm hover:border-lift/40 transition-colors"
          >
            <span className="absolute inset-0 w-0 bg-lift/5 transition-all duration-300 group-hover:w-full" />
            <span className="relative font-mono text-steel-bright text-sm tracking-widest group-hover:text-steel-bright transition-colors">
              &gt;&gt; full_repository
            </span>
          </a>
        </Reveal>
      </div>
    </SectionShell>
  );
};

export default Projects;
