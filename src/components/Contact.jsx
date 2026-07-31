import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone } from 'react-icons/fi';
import SectionShell from './fx/SectionShell';

// Decrypting Text Component
const DecryptText = ({ text, className }) => {
    const [displayText, setDisplayText] = useState('');
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(text.split('').map((char, index) => {
                if (index < iteration) {
                    return text[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(''));

            if (iteration >= text.length) {
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return <span className={className}>{displayText}</span>;
};

const Contact = () => {
    return (
        <SectionShell id="contact" index={5} className="min-h-screen text-white relative overflow-hidden flex flex-col justify-between py-20 px-4">
            {/* Background Static Noise */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

            <div className="max-w-6xl mx-auto w-full relative z-10 flex-grow flex flex-col justify-center">

                {/* Header: Signal Established */}
                <div className="flex items-center gap-2 text-electric-blue font-mono text-xs tracking-widest mb-10 opacity-70">
                    <span className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" />
                    SECURE_UPLINK_ESTABLISHED
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Left: Branding & Encryption */}
                    <div>
                        <h1 className="font-display text-[14vw] md:text-[8vw] font-extrabold leading-none tracking-tighter mb-4 text-gradient select-none">
                            Ayush
                        </h1>
                        <p className="text-lg md:text-xl text-steel font-mono mb-8">
                            <span className="text-signal">&gt;</span> open to work · ayushjha.online
                        </p>

                        <div className="font-mono space-y-6 text-gray-500 mb-12">
                            <div>
                                <span className="block text-xs text-gray-600 mb-1 tracking-widest uppercase">Target Coordinates (Email)</span>
                                <a href="mailto:ayushjha4277@gmail.com" className="hover:text-electric-blue transition-colors">
                                    <DecryptText text="ayushjha4277@gmail.com" className="text-lg text-white" />
                                </a>
                            </div>
                            <div>
                                <span className="block text-xs text-gray-600 mb-1 tracking-widest uppercase">Comms Frequency (Phone)</span>
                                <a href="tel:+919155388390" className="hover:text-electric-blue transition-colors">
                                    <DecryptText text="(+91) 9155388390" className="text-lg text-white" />
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Right: Reactor Button (Restored & Active) */}
                    <div className="flex justify-center md:justify-end">
                        <motion.a
                            href="https://linkedin.com/in/ayush-jha-196470287"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative w-48 h-48 rounded-full flex items-center justify-center group"
                        >
                            {/* Reactor Core Animation */}
                            <div className="absolute inset-0 rounded-full border-2 border-electric-blue/30 animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-2 rounded-full border border-dashed border-electric-blue/50 animate-[spin_8s_linear_infinite_reverse]" />
                            <div className="absolute inset-0 rounded-full bg-electric-blue/10 blur-xl group-hover:bg-electric-blue/20 transition-colors duration-500" />

                            <div className="relative z-10 text-center">
                                <span className="block text-2xl font-bold text-white group-hover:text-electric-blue transition-colors">INIT</span>
                                <span className="text-xs font-mono text-electric-blue tracking-widest">CONNECTION</span>
                            </div>
                        </motion.a>
                    </div>
                </div>
            </div>

            {/* Footer: System Status */}
            <div className="max-w-6xl mx-auto w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600 relative z-10">
                <div className="flex gap-6">
                    <a href="https://github.com/b423016" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GITHUB</a>
                    <a href="https://linkedin.com/in/ayush-jha-196470287" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>
                    <a href="mailto:ayushjha4277@gmail.com" className="hover:text-white transition-colors">EMAIL</a>
                </div>
                <div>
                    SYSTEM_ID: PORTFOLIO_V2 // © 2026 AYUSH KUMAR JHA
                </div>
            </div>
        </SectionShell>
    );
};

export default Contact;
