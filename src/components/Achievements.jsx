import React from 'react';
import { motion } from 'framer-motion';
import { SiMeta, SiKaggle, SiCodeforces, SiDevpost } from 'react-icons/si';

const achievements = [
    {
        id: 1,
        title: "Meta Hacker Cup",
        rank: "Global Rank 1226",
        icon: <SiMeta />,
        description: "Secured top rank in one of the world's most challenging coding competitions.",
        color: "text-blue-500" // Meta Blue
    },
    {
        id: 2,
        title: "D3 Hackathon",
        rank: "Finalist",
        icon: <SiDevpost />, // Using Devpost icon as a proxy for Hackathons/D3
        description: "Recognized for innovative problem solving and rapid prototype development.",
        color: "text-electric-blue"
    },
    {
        id: 3,
        title: "Codeforces",
        rank: "Max Rating: 1270 (Pupil)",
        icon: <SiCodeforces />,
        description: "Consistent competitive programmer solving complex algorithmic problems.",
        color: "text-red-500" // Codeforces Red (or similar brand color)
    },
    {
        id: 4,
        title: "Kaggle Competitions",
        rank: "Top 2000 Global",
        icon: <SiKaggle />,
        description: "Achieved sub-2k rank in global data science competitions.",
        color: "text-sky-400" // Kaggle Blue
    }
];

const Achievements = () => {
    return (
        <section id="achievements" className="min-h-screen flex flex-col justify-center px-6 py-20 bg-black relative overflow-hidden">
            {/* Background Matrix Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(100,255,218,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="container mx-auto z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-800 mb-4 uppercase tracking-tighter">
                        Achievements <span className="text-electric-blue">_</span>
                    </h2>
                    <div className="h-1 w-24 bg-electric-blue rounded-full shadow-[0_0_15px_#64FFDA]" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-electric-blue/50 transition-colors duration-300"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                            <div className="relative z-10 flex items-start gap-6">
                                <div className={`text-5xl ${item.color} p-4 bg-white/5 rounded-xl border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2 font-mono">{item.title}</h3>
                                    <div className="ttext-lg text-electric-blue font-bold tracking-wide mb-3 uppercase text-sm border border-electric-blue/30 px-2 py-1 rounded inline-block bg-electric-blue/10">
                                        {item.rank}
                                    </div>
                                    <p className="text-gray-400 leading-relaxed font-light mt-2">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute top-4 right-4 text-xs font-mono text-gray-600 opacity-50">
                                REL_{index + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
