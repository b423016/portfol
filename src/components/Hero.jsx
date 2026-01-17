import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiTerminal, FiCpu } from 'react-icons/fi';
import { TypeAnimation } from 'react-type-animation';

// --- Components ---

// 1. Interactive Neural Network Background
const ParticleNetwork = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = 'rgba(100, 255, 218, 0.5)'; // Electric blue/teal
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            particles.forEach((p, index) => {
                p.update();
                p.draw();

                // Connect nearby particles
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(100, 255, 218, ${0.2 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 -z-0 opacity-40 mix-blend-screen pointer-events-none" />;
};

// 2. Glitch Text Component
const GlitchText = ({ text }) => {
    return (
        <div className="relative group inline-block">
            <span className="relative z-10 text-white">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:animate-glitch translate-x-[2px] blur-[1px]">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-fuchsia-500 opacity-0 group-hover:opacity-100 group-hover:animate-glitch translate-x-[-2px] delay-75 blur-[1px]">
                {text}
            </span>
        </div>
    );
};

// 3. Terminal Window Bio
const TerminalBio = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-2xl bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden font-mono text-sm text-gray-400 shadow-2xl relative z-10"
    >
        <div className="bg-[#1a1a1a] px-4 py-2 flex items-center gap-2 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-gray-500">ayush_profile.exe</span>
        </div>
        <div className="p-6">
            <p className="mb-2">
                <span className="text-green-500">➜</span> <span className="text-blue-400">~</span> <span className="text-yellow-500">whoami</span>
            </p>
            <p className="mb-4 leading-relaxed pl-4 border-l-2 border-gray-800">
                Backend & AI Engineer specializing in <span className="text-white">FastAPI</span>, <span className="text-white">Vector Search</span>, and <span className="text-white">Scalable Systems</span>.
                <br />Currently building intelligent pipelines and applied ML solutions.
            </p>

            <p>
                <span className="text-green-500">➜</span> <span className="text-blue-400">~</span> <span className="animate-pulse">_</span>
            </p>
        </div>
    </motion.div>
);

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-center px-4 pt-20 relative overflow-hidden bg-black text-white">

            <ParticleNetwork />

            {/* Content Container */}
            <div className="max-w-5xl w-full flex flex-col items-center relative z-10">

                {/* Profile Picture with 'Reactor' Glow */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative mb-12 group"
                >
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-white/10 relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <img
                            src="/assets/profile.png"
                            alt="Ayush Kumar Jha"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Reactor Rings */}
                    <div className="absolute inset-0 rounded-full border border-electric-blue/30 scale-110 animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-0 rounded-full border border-dashed border-electric-blue/20 scale-125 animate-[spin_15s_linear_infinite_reverse]" />
                </motion.div>

                {/* Cyberpunk Title */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter text-center"
                >
                    <GlitchText text="Ayush Kumar" /> <span className="text-gray-600 inline-block md:hidden"><br /></span> <GlitchText text="Jha" />
                </motion.h1>

                {/* Subtitle with Tech Font */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 mb-12"
                >
                    <FiCpu className="text-electric-blue text-xl" />
                    <div className="text-xl md:text-2xl font-mono text-electric-blue bg-electric-blue/10 px-4 py-1 rounded">
                        <TypeAnimation
                            sequence={[
                                'System Architect', 2000,
                                'Backend Specialist', 2000,
                                'AI Engineer', 2000
                            ]}
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>
                </motion.div>

                {/* Terminal Summary */}
                <TerminalBio />

                {/* Tech CTA */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16"
                >
                    <a
                        href="#projects"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-electric-blue hover:text-white transition-all duration-300 clip-path-polygon"
                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }} // Angular "Cyber" shape
                    >
                        Initialize Showcase
                        <FiArrowDown className="group-hover:translate-y-1 transition-transform" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
