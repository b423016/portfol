import React from 'react';
import { motion } from 'framer-motion';
import {
    FaPython, FaJava, FaAws, FaDocker, FaLinux, FaGitAlt, FaDatabase,
} from 'react-icons/fa';
import {
    SiFastapi, SiPostgresql, SiRedis, SiOpencv, SiNextdotjs,
    SiTypescript, SiRust, SiJenkins, SiGrafana, SiGooglecloud,
} from 'react-icons/si';
import { TbBrain, TbServer, TbBrandCpp, TbNetwork, TbBrandAzure } from 'react-icons/tb';
import SectionShell from './fx/SectionShell';

const HUDCard = ({ title, subtitle, icons, colSpan = 'col-span-1', delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${colSpan} theme-card group relative p-6 rounded-lg overflow-hidden hover:border-electric-blue/50 transition-colors duration-300 min-h-[260px] flex flex-col`}
    >
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-lift/20 group-hover:border-electric-blue transition-colors" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-lift/20 group-hover:border-electric-blue transition-colors" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-lift/20 group-hover:border-electric-blue transition-colors" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-lift/20 group-hover:border-electric-blue transition-colors" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-blue/5 to-transparent h-[20%] w-full -translate-y-full group-hover:animate-[scan_2s_linear_infinite] pointer-events-none" />

        <div className="flex justify-between items-center mb-6 font-mono text-[10px] text-steel-dim tracking-widest uppercase">
            <span>SYS_MODULE: {title.split(' ')[0]}</span>
            <span className="group-hover:text-electric-blue transition-colors group-hover:animate-pulse">
                <span className="hidden group-hover:inline">&gt;&gt; SYSTEM_ACTIVE</span>
                <span className="inline group-hover:hidden">IDLE</span>
            </span>
        </div>

        <div className="flex flex-wrap gap-4 mb-auto relative z-10">
            {icons.map((icon, idx) => (
                <div key={idx} className="relative group/icon">
                    <div className="w-12 h-12 rounded bg-lift/5 border border-lift/10 flex items-center justify-center transition-all duration-300 relative z-10 group-hover/icon:border-lift/30 group-hover/icon:bg-lift/10">
                        {icon}
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-current blur-xl opacity-0 group-hover/icon:opacity-40 transition-opacity duration-300" />
                </div>
            ))}
        </div>

        <div className="mt-6 border-t border-lift/5 pt-4">
            <h3 className="text-lg font-bold text-steel-bright mb-1 font-mono tracking-tight">{title}</h3>
            <p className="text-xs text-steel font-mono leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                {subtitle}
            </p>
        </div>
    </motion.div>
);

const Skills = () => {
    return (
        <SectionShell id="skills" index={3} className="py-28 sm:py-36 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-16 sm:mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="inline-block border border-signal/30 px-4 py-1 rounded-full bg-signal/5 text-signal font-mono text-[11px] tracking-widest mb-4 uppercase"
                    >
                        Skill matrix
                    </motion.div>
                    <h2 className="font-display text-4xl md:text-6xl font-extrabold text-steel-bright tracking-tight mb-4">
                        Technical <span className="text-gradient">arsenal</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    <HUDCard
                        title="AI & INTELLIGENCE"
                        subtitle="VLMs, RAG, LLM guardrails, compositional retrieval, and professional AI evals (Handshake · Outlier · AirDawg)."
                        icons={[
                            <TbBrain size={24} className="text-purple-400" key="brain" />,
                            <SiOpencv size={24} className="text-green-400" key="cv" />,
                            <span key="hf" className="font-bold text-xs font-mono text-yellow-400">
                                HF
                            </span>,
                            <span key="eval" className="font-bold text-[9px] font-mono text-electric-blue">
                                EVALS
                            </span>,
                        ]}
                        delay={0.1}
                    />

                    <HUDCard
                        title="BACKEND ARCHITECTURE"
                        subtitle="High-performance async APIs, REST, microservices, real-time voice pipelines."
                        icons={[
                            <SiFastapi size={24} className="text-teal-400" key="fa" />,
                            <TbServer size={24} className="text-blue-400" key="srv" />,
                            <SiNextdotjs size={24} className="text-steel-bright" key="next" />,
                            <TbNetwork size={24} className="text-electric-blue" key="rtc" />,
                        ]}
                        delay={0.2}
                    />

                    <HUDCard
                        title="CLOUD & DATA"
                        subtitle="AWS, GCP, Azure · Docker, Postgres, Redis, Supabase, Jenkins, OpenTelemetry, Grafana."
                        icons={[
                            <FaAws size={24} className="text-orange-400" key="aws" />,
                            <SiGooglecloud size={24} className="text-blue-400" key="gcp" />,
                            <TbBrandAzure size={24} className="text-sky-500" key="azure" />,
                            <FaDocker size={24} className="text-blue-500" key="docker" />,
                            <SiPostgresql size={24} className="text-blue-300" key="pg" />,
                            <SiRedis size={24} className="text-red-500" key="redis" />,
                            <SiJenkins size={24} className="text-red-400" key="jenkins" />,
                            <SiGrafana size={24} className="text-orange-500" key="graf" />,
                        ]}
                        delay={0.3}
                    />

                    <HUDCard
                        colSpan="lg:col-span-2"
                        title="CORE LANGUAGES"
                        subtitle="Python, Rust, Java, TypeScript, SQL — systems performance and rapid shipping."
                        icons={[
                            <FaPython size={24} className="text-yellow-300" key="py" />,
                            <SiRust size={24} className="text-orange-600" key="rs" />,
                            <FaJava size={24} className="text-red-400" key="java" />,
                            <SiTypescript size={24} className="text-blue-400" key="ts" />,
                            <TbBrandCpp size={24} className="text-blue-600" key="cpp" />,
                            <FaDatabase size={24} className="text-steel" key="sql" />,
                            <FaLinux size={24} className="text-yellow-600" key="linux" />,
                            <FaGitAlt size={24} className="text-orange-600" key="git" />,
                        ]}
                        delay={0.4}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="bg-electric-blue/5 border border-electric-blue/20 p-6 rounded-lg flex flex-col justify-center items-center text-center hover:bg-electric-blue/10 transition-colors group"
                    >
                        <h3 className="text-electric-blue font-mono text-sm mb-4 tracking-widest">
                            &gt;&gt; CORE_PROTOCOLS
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {['DSA', 'OOP', 'SYSTEM DESIGN', 'ASYNCIO', 'WEBRTC', 'WASM', 'AI EVALS', 'AGENT BENCHMARKS', 'CI/CD', 'OBSERVABILITY'].map(
                                (tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-panel/90 border border-electric-blue/30 text-[10px] text-steel font-mono rounded"
                                    >
                                        {tag}
                                    </span>
                                )
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionShell>
    );
};

export default Skills;
