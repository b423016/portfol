import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiGrid, FiCpu, FiUser, FiGithub, FiLinkedin, FiMail, FiAward } from 'react-icons/fi';

const Navigation = () => {
    const [activeTab, setActiveTab] = useState('home');

    const scrollToSection = (id) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    React.useEffect(() => {
        const sections = ['home', 'skills', 'achievements', 'projects', 'contact'];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveTab(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const navItems = [
        { id: 'home', icon: <FiHome />, label: 'HOME' },
        { id: 'skills', icon: <FiCpu />, label: 'SKILLS' },
        { id: 'achievements', icon: <FiAward />, label: 'ACHIEVEMENTS' },
        { id: 'projects', icon: <FiGrid />, label: 'PROJECTS' },
        { id: 'contact', icon: <FiMail />, label: 'CONTACT' },
    ];

    return (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full flex justify-center px-4">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="flex items-center justify-between px-2 py-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
            >
                {/* Main Nav Links */}
                <div className="flex items-center gap-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`relative px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 group overflow-hidden
                            ${activeTab === item.id ? 'text-electric-blue bg-electric-blue/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            {/* Active LED Indicator */}
                            {activeTab === item.id && (
                                <span className="absolute left-2 w-1.5 h-1.5 rounded-full bg-electric-blue shadow-[0_0_8px_#64FFDA]" />
                            )}

                            {/* Hover Glitch Line */}
                            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-electric-blue/50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />

                            <span className={`relative z-10 flex items-center gap-2 ${activeTab === item.id ? 'pl-2' : ''}`}>
                                {item.icon}
                                <span className="hidden md:block">{item.label}</span>
                            </span>
                        </button>
                    ))}
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-white/10 mx-1" />

                {/* Social / Comms Module */}
                <div className="flex gap-1">
                    <a href="https://github.com/b423016" target="_blank" rel="noopener noreferrer"
                        className="p-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors border border-transparent hover:border-white/10 group relative overflow-hidden"
                        aria-label="GitHub"
                    >
                        <div className="absolute inset-0 bg-electric-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <FiGithub size={16} className="relative z-10" />
                    </a>
                    <a href="https://linkedin.com/in/ayush-jha-196470287" target="_blank" rel="noopener noreferrer"
                        className="p-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors border border-transparent hover:border-white/10 group relative overflow-hidden"
                        aria-label="LinkedIn"
                    >
                        <div className="absolute inset-0 bg-electric-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <FiLinkedin size={16} className="relative z-10" />
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Navigation;
