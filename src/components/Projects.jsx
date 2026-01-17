import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCpu, FiDatabase, FiCode, FiActivity } from 'react-icons/fi';

const ProjectCard = ({ title, description, tags, id, status, delay, githubLink, externalLink }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="group relative bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:border-electric-blue/50 transition-all duration-500 backdrop-blur-sm flex flex-col h-full"
    >
        {/* Holographic Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />

        {/* "Power Up" Glow Effect */}
        <div className="absolute inset-0 bg-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

        <div className="relative z-10 p-6 flex flex-col h-full">
            {/* Header: Project ID & Status */}
            <div className="flex justify-between items-center mb-6 font-mono text-xs tracking-widest text-gray-500 border-b border-white/5 pb-4">
                <span className="text-electric-blue group-hover:animate-pulse">ID: {id}</span>
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${status === 'LIVE' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
                    <span>[{status}]</span>
                </div>
            </div>

            {/* Title & Icons */}
            <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors duration-300 font-mono">
                    {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                    {description}
                </p>
            </div>

            {/* Tech Stack Pills - Cyberpunk Style */}
            <div className="flex flex-wrap gap-2 mt-auto mb-6">
                {tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-[10px] font-mono border border-white/10 text-gray-400 bg-white/5 rounded hover:border-electric-blue/50 hover:text-electric-blue transition-colors cursor-default">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer: Action Buttons */}
            <div className="flex gap-4 pt-4 border-t border-white/5 mt-auto">
                <a href={githubLink || "https://github.com/b423016"} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-sm font-mono text-gray-300 hover:text-white transition-all rounded group/btn border border-transparent hover:border-white/20">
                    <FiGithub /> <span className="group-hover/btn:hidden">SOURCE</span> <span className="hidden group-hover/btn:inline">ACCESS_CODE</span>
                </a>
                {externalLink && (
                    <a href={externalLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-electric-blue/10 hover:bg-electric-blue/20 text-sm font-mono text-electric-blue border border-electric-blue/20 hover:border-electric-blue/50 transition-all rounded cursor-pointer">
                        <FiActivity /> DEPLOY
                    </a>
                )}
            </div>
        </div>

        {/* Corner Markers */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-electric-blue transition-colors" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-electric-blue transition-colors" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-electric-blue transition-colors" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-electric-blue transition-colors" />
    </motion.div>
);

const Projects = () => {
    const projects = [
        {
            id: "PRJ-01",
            status: "DEV",
            title: "NF3-Pro Chess Platform",
            description: "Advanced chess platform with legal move validation using OpenCV and VLMs. Fine-tuned Qwen2.5-VL-3B model achieving 87% accuracy.",
            tags: ["OPENCV", "VLM", "FASTAPI", "PYTHON"],
            githubLink: "https://github.com/b423016/NF3-Pro",
            externalLink: "https://nf3-pro.vercel.app/",
            delay: 0.1
        },
        {
            id: "PRJ-02",
            status: "DEV",
            title: "ByteFit Manager",
            description: "Variable-size memory allocator simulation benchmarking placement strategies. Optimized free-list management using Red-Black Trees.",
            tags: ["JAVA", "OS", "ALGORITHMS", "SYSTEMS"],
            githubLink: "https://github.com/b423016/ByteFit-Manager",
            delay: 0.2
        },
        {
            id: "PRJ-03",
            status: "DEV",
            title: "Project Alpha",
            description: "Experimental AI development sandbox exploring advanced agentic behaviors and neural architectures.",
            tags: ["AI", "RESEARCH", "NEURAL-NETS", "PYTHON"],
            githubLink: "https://github.com/b423016/Project_alpha",
            delay: 0.3
        },
        {
            id: "PRJ-04",
            status: "SOLVED",
            title: "CSES Solutions",
            description: "Optimized C++ solutions for the CSES Problem Set. Focus on high-performance algorithms and data structures.",
            tags: ["C++", "ALGORITHMS", "COMPETITIVE", "MATH"],
            githubLink: "https://github.com/b423016/CSES_SOLN",
            delay: 0.4
        },
        {
            id: "PRJ-05",
            status: "SOLVED",
            title: "Codeforces Archive",
            description: "Comprehensive repository of solution code for Codeforces contests. automated testing and template generation.",
            tags: ["C++", "CP", "MATH", "DP"],
            githubLink: "https://github.com/b423016/codeforces",
            delay: 0.5
        },
        {
            id: "PRJ-06",
            status: "DEV",
            title: "Multi-modal AI Service",
            description: "Scalable AI service integrating text and image generation pipelines. Implements RAG for context-aware responses.",
            tags: ["GENAI", "PYTHON", "RAG", "LLMS"],
            delay: 0.6
        }
    ];

    return (
        <section id="projects" className="py-32 px-4 bg-black relative overflow-hidden">
            {/* Background Technical Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="flex items-end justify-between mb-20 border-b border-white/10 pb-8">
                    <div>
                        <motion.p
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            className="text-electric-blue font-mono text-sm mb-2 tracking-widest"
                        >
                    // ARCHIVE_ACCESS
                        </motion.p>
                        <motion.h2
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="text-4xl md:text-6xl font-black text-white tracking-tighter"
                        >
                            DEPLOYED <span className="text-gray-800">UNITS</span>
                        </motion.h2>
                    </div>
                    <div className="hidden md:block text-right">
                        <div className="text-gray-500 font-mono text-xs">SYS_STATUS: ONLINE</div>
                        <div className="text-gray-500 font-mono text-xs">NODES: {projects.length}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} index={index} />
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <a href="https://github.com/b423016" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-3 bg-transparent border border-electric-blue/30 overflow-hidden rounded-sm hover:border-electric-blue transition-colors">
                        <div className="absolute inset-0 w-0 bg-electric-blue/10 transition-all duration-[250ms] ease-out group-hover:w-full" />
                        <span className="relative font-mono text-electric-blue text-sm tracking-widest group-hover:text-white transition-colors">&gt;&gt; VIEW_FULL_REPOSITORY</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
