import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiBookOpen, FiExternalLink, FiCpu } from 'react-icons/fi';
import SectionShell from './fx/SectionShell';

/** Formal experience — aligned to LinkedIn */
const roles = [
    {
        id: 'exp-01',
        role: 'SDE Intern',
        company: 'Xalen AI',
        location: 'Pune · Remote',
        period: 'May 2026 – Present',
        current: true,
        points: [
            'Building open-source and proprietary systems for real-time AI and astro-infra.',
            'Core contributor to Xalen Ephemeris — pure-Rust astronomical engine (Apache-2.0) replacing Swiss Ephemeris liabilities: memory-safe, zero external data files, WASM-ready.',
            'Engineered real-time voice pipelines (HTTP → WebRTC), fixed-chunk STT streaming, Cerebras inference + semantic caching (TTFB ~80ms; perceived RTT 3.2s → ~600ms).',
            'Mentoring a 1st-year intern on technical onboarding and delivery.',
        ],
        tags: ['Rust', 'WebRTC', 'WASM', 'LLM', 'Open Source', 'Cerebras'],
    },
    {
        id: 'exp-02',
        role: 'AI Evaluation Expert',
        company: 'Handshake AI',
        location: 'Remote',
        period: 'Present',
        current: true,
        points: [
            'Active on the Handshake AI evaluation platform — designing and running rigorous AI agent / model evals.',
            'Multi-domain environments: ML infrastructure, security, scientific computing, data/ETL, debugging & repair, regulated knowledge work.',
            'High-signal task specs, scoring rubrics, and production-grade agent benchmarks.',
        ],
        tags: ['AI Evals', 'Agent Benchmarks', 'Rubrics', 'ML Infra'],
    },
    {
        id: 'exp-03',
        role: 'AI Evals',
        company: 'Outlier (Scale AI)',
        location: 'Remote · Freelance',
        period: 'Mar 2026 – Jun 2026',
        points: [
            'Freelance AI evaluation specialist on Outlier — expert platform operated by Scale AI for frontier model improvement.',
            'LLM evaluation workflows: preference data, response ranking, prompt analysis, logical reasoning, and quality review.',
            'Trusted enough to run referrals for Meter Pavilion (direct Outlier project) for new AI-eval contributors.',
        ],
        tags: ['AI Evals', 'Preference Data', 'Prompt Analysis', 'Quality Review'],
    },
    {
        id: 'exp-04',
        role: 'Technical Contributor',
        company: 'AirDawg Labs',
        location: 'Mumbai · Remote · Part-time',
        period: 'Jan 2026 – Mar 2026',
        points: [
            'Terminal benchmarking and AI evaluation for premium AI training / model-improvement pipelines.',
            'Expert-driven eval ops: rigorous task environments, quality control, and technical review under production accuracy standards.',
        ],
        tags: ['Terminal Benchmarking', 'AI Evals', 'Quality Control'],
    },
    {
        id: 'exp-05',
        role: 'AI Engineer Intern',
        company: 'PrepAiro',
        location: 'Bengaluru · Remote',
        period: 'May 2025 – Jun 2025',
        points: [
            'Multimodal AI services with FastAPI / LangChain — 85% positive feedback (Superset) for 500+ daily active users.',
            'Prompt-shifting pipelines, structured feedback generation, and guardrails against prompt injection.',
            '30+ pull requests with product, DevOps, and frontend teams; active code review.',
        ],
        tags: ['FastAPI', 'LangChain', 'LLM Guardrails', 'DAU 500+'],
    },
    {
        id: 'exp-06',
        role: 'AI Backend Developer (Freelance)',
        company: 'Early-stage Legal AI Startup',
        location: 'Remote',
        period: 'Sep 2024 – Nov 2024',
        points: [
            'Async REST APIs improving throughput by ~15% under concurrent load.',
            'RAG document pipelines: parse → embed → vector search → LLM response for legal corpora.',
        ],
        tags: ['FastAPI', 'RAG', 'Vector Search', 'Async'],
    },
];

const Experience = () => {
    return (
        <SectionShell id="experience" index={2} className="py-28 sm:py-36 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-16 border-b border-white/10 pb-8">
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-signal font-mono text-xs mb-3 tracking-[0.3em] uppercase"
                    >
                        Career trace
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-6xl font-extrabold text-white tracking-tight"
                    >
                        Experience <span className="text-gradient">&amp; research</span>
                    </motion.h2>
                    <p className="mt-4 text-gray-500 font-mono text-sm max-w-3xl leading-relaxed">
                        IIIT BBSR · Knight @ LeetCode · Meta Hacker Cup #1154 · Specialist @ CF · Placement Coordinator
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 p-5 md:p-6 border border-electric-blue/25 bg-electric-blue/5 rounded-xl flex flex-col md:flex-row md:items-center gap-4"
                >
                    <div className="w-12 h-12 rounded-lg bg-electric-blue/15 border border-electric-blue/40 flex items-center justify-center text-electric-blue shrink-0">
                        <FiCpu size={22} />
                    </div>
                    <div className="flex-1">
                        <p className="font-mono text-xs text-electric-blue tracking-widest mb-1">AI_EVALS_STACK</p>
                        <p className="text-white text-sm md:text-base leading-relaxed">
                            Professional AI evaluation across{' '}
                            <span className="text-electric-blue font-semibold">Handshake AI</span> (current),{' '}
                            <span className="text-white font-semibold">Outlier / Scale AI</span> (Mar–Jun 2026), and{' '}
                            <span className="text-white font-semibold">AirDawg Labs</span> (Jan–Mar 2026 — terminal
                            benchmarking &amp; AI evals).
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
                        {['Handshake', 'Outlier', 'AirDawg'].map((p) => (
                            <span
                                key={p}
                                className="px-3 py-1 text-[10px] font-mono tracking-wider border border-electric-blue/30 text-electric-blue bg-black/40 rounded"
                            >
                                {p}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <div className="space-y-8 mb-12">
                    {roles.map((job, index) => (
                        <motion.article
                            key={job.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: Math.min(index * 0.06, 0.3) }}
                            className={`group relative border bg-black/40 backdrop-blur-sm rounded-xl p-6 md:p-8 hover:border-electric-blue/40 transition-colors ${
                                job.current ? 'border-electric-blue/30' : 'border-white/10'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center text-electric-blue shrink-0">
                                        <FiBriefcase size={20} />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <h3 className="text-xl md:text-2xl font-bold text-white font-mono">
                                                {job.role}
                                            </h3>
                                            {job.current && (
                                                <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest text-green-400 border border-green-500/40 bg-green-500/10 rounded">
                                                    ACTIVE
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-electric-blue font-mono text-sm mt-1">
                                            {job.company} · {job.location}
                                        </p>
                                    </div>
                                </div>
                                <span className="font-mono text-xs text-gray-500 border border-white/10 px-3 py-1 rounded self-start">
                                    {job.period}
                                </span>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {job.points.map((point, i) => (
                                    <li key={i} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                                        <span className="text-electric-blue font-mono shrink-0 mt-0.5">&gt;</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                {job.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-[10px] font-mono border border-white/10 text-gray-400 bg-white/5 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="border border-white/10 bg-black/40 rounded-xl p-6 hover:border-electric-blue/30 transition-colors"
                    >
                        <div className="flex items-center gap-3 mb-4 text-electric-blue">
                            <FiBookOpen size={20} />
                            <h3 className="font-mono text-sm tracking-widest">EDUCATION</h3>
                        </div>
                        <p className="text-white font-bold text-lg mb-1">IIIT Bhubaneswar</p>
                        <p className="text-gray-400 text-sm mb-2">B.Tech Information Technology · GPA 8.53/10.0</p>
                        <p className="font-mono text-xs text-gray-500">Aug 2023 – May 2027 · Bhubaneswar, Odisha</p>
                        <p className="mt-4 text-xs text-gray-500 font-mono">
                            Placement Coordinator · Team Lead (NF3-Pro) · Intern Mentor @ Xalen
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="border border-electric-blue/20 bg-electric-blue/5 rounded-xl p-6 hover:border-electric-blue/40 transition-colors"
                    >
                        <div className="flex items-center gap-3 mb-4 text-electric-blue">
                            <FiExternalLink size={20} />
                            <h3 className="font-mono text-sm tracking-widest">PUBLICATION</h3>
                        </div>
                        <p className="text-white font-bold text-lg mb-2 leading-snug">
                            Do Large Language Models Fail on Competitive Programming?
                        </p>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                            First-authored empirical study on 315 Codeforces problems — Chain-of-Thought prompting degrades
                            LLM performance on greedy algorithms via constraint hallucinations.
                        </p>
                        <a
                            href="https://arxiv.org/abs/2606.05228"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-electric-blue font-mono text-xs hover:underline"
                        >
                            arXiv:2606.05228 <FiExternalLink size={12} />
                        </a>
                    </motion.div>
                </div>
            </div>
        </SectionShell>
    );
};

export default Experience;
