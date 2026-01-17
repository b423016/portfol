import React from 'react';
import { motion } from 'framer-motion';
import {
    FaPython, FaJava, FaAws, FaDocker, FaLinux, FaGitAlt,
    FaDatabase, FaReact, FaNodeJs
} from 'react-icons/fa';
import {
    SiFastapi, SiPostgresql, SiRedis, SiOpencv, SiPytorch,
    SiTailwindcss, SiNextdotjs, SiMongodb, SiSpringboot
} from 'react-icons/si';
import { TbApi, TbBrain, TbServer, TbBrandCpp } from 'react-icons/tb';

const HUDCard = ({ title, subtitle, icons, colSpan = "col-span-1", delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${colSpan} group relative bg-black/40 border border-white/10 p-6 rounded-lg overflow-hidden backdrop-blur-md hover:border-electric-blue/50 transition-colors duration-300 min-h-[260px] flex flex-col`}
    >
        {/* HUD Markers (Corners) */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20 group-hover:border-electric-blue transition-colors" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-electric-blue transition-colors" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20 group-hover:border-electric-blue transition-colors" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20 group-hover:border-electric-blue transition-colors" />

        {/* Scanning Line Animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-blue/5 to-transparent h-[20%] w-full -translate-y-full group-hover:animate-[scan_2s_linear_infinite] pointer-events-none" />

        {/* Header Status */}
        <div className="flex justify-between items-center mb-6 font-mono text-[10px] text-gray-500 tracking-widest uppercase">
            <span>SYS_MODULE: {title.split(' ')[0]}</span>
            <span className="group-hover:text-electric-blue transition-colors group-hover:animate-pulse">
                <span className="hidden group-hover:inline">&gt;&gt; SYSTEM_ACTIVE</span>
                <span className="inline group-hover:hidden">IDLE</span>
            </span>
        </div>

        {/* Projected Icons */}
        <div className="flex flex-wrap gap-4 mb-auto relative z-10">
            {icons.map((icon, idx) => (
                <div key={idx} className="relative group/icon">
                    <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 relative z-10 group-hover/icon:border-white/30 group-hover/icon:bg-white/10">
                        {icon}
                    </div>
                    {/* Holographic Projection Glow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-current blur-xl opacity-0 group-hover/icon:opacity-40 transition-opacity duration-300" />
                </div>
            ))}
        </div>

        {/* Description / Feedback */}
        <div className="mt-6 border-t border-white/5 pt-4">
            <h3 className="text-lg font-bold text-white mb-1 font-mono tracking-tight">{title}</h3>
            <p className="text-xs text-gray-400 font-mono leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                {subtitle}
            </p>
        </div>

        {/* Crosshair Overlay (Decorative) */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 flex items-center justify-center">
            <div className="w-[90%] h-[90%] border border-electric-blue/20 rounded-sm" />
            <div className="absolute w-full h-[1px] bg-electric-blue/20" />
            <div className="absolute h-full w-[1px] bg-electric-blue/20" />
        </div>
    </motion.div>
);

const Skills = () => {
    return (
        <section id="skills" className="py-32 px-4 bg-black relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="inline-block border border-electric-blue/30 px-4 py-1 rounded-full bg-electric-blue/5 text-electric-blue font-mono text-xs mb-4"
                    >
                        {/* Initializing Matrix */}
                        {'//'} INITIALIZING SKILL_MATRIX_V2.0
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                        TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-purple-600">ARSENAL</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {/* AI & ML */}
                    <HUDCard
                        title="AI & INTELLIGENCE"
                        subtitle="Neural Networks, Computer Vision, RAG Pipelines, Large Language Models."
                        icons={[
                            <TbBrain size={24} className="text-purple-400" />,
                            <SiPytorch size={24} className="text-orange-500" />,
                            <SiOpencv size={24} className="text-green-400" />,
                            <span key="hf" className="font-bold text-xs font-mono text-yellow-400">HF</span>
                        ]}
                        delay={0.1}
                    />

                    {/* Backend */}
                    <HUDCard
                        title="BACKEND ARCHITECTURE"
                        subtitle="High-performance APIs, Microservices, Asynchronous Systems."
                        icons={[
                            <SiFastapi size={24} className="text-teal-400" />,
                            <FaNodeJs size={24} className="text-green-500" />,
                            <TbServer size={24} className="text-blue-400" />,
                            <SiSpringboot size={24} className="text-green-600" />
                        ]}
                        delay={0.2}
                    />

                    {/* Cloud */}
                    <HUDCard
                        title="CLOUD INFRASTRUCTURE"
                        subtitle="Containerization, Orchestration, Database Management, Scalable Deployment."
                        icons={[
                            <FaAws size={24} className="text-orange-400" />,
                            <FaDocker size={24} className="text-blue-500" />,
                            <SiPostgresql size={24} className="text-blue-300" />,
                            <SiRedis size={24} className="text-red-500" />
                        ]}
                        delay={0.3}
                    />

                    {/* Languages - Wide */}
                    <HUDCard
                        colSpan="lg:col-span-2"
                        title="CORE LANGUAGES"
                        subtitle="Polyglot programming proficiency optimized for system performance and rapid development."
                        icons={[
                            <FaPython size={24} className="text-yellow-300" />,
                            <FaJava size={24} className="text-red-400" />,
                            <TbBrandCpp size={24} className="text-blue-600" />,
                            <FaDatabase size={24} className="text-gray-300" />,
                            <FaLinux size={24} className="text-yellow-600" />,
                            <FaGitAlt size={24} className="text-orange-600" />
                        ]}
                        delay={0.4}
                    />

                    {/* Concepts */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="bg-electric-blue/5 border border-electric-blue/20 p-6 rounded-lg flex flex-col justify-center items-center text-center hover:bg-electric-blue/10 transition-colors group"
                    >
                        <h3 className="text-electric-blue font-mono text-sm mb-4 tracking-widest">&gt;&gt; CORE_PROTOCOLS</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {["DSA", "OOP", "SYSTEM DESIGN", "OS", "NETWORKS"].map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-black/50 border border-electric-blue/30 text-[10px] text-gray-300 font-mono rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
