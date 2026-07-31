import React, { Suspense, lazy, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi';
import Magnetic from './fx/Magnetic';

const Scene3D = lazy(() => import('./fx/Scene3D'));

const proof = [
  { label: 'Meta HC', value: '#1154' },
  { label: 'LeetCode', value: 'Knight' },
  { label: 'Codeforces', value: 'Specialist' },
  { label: 'Xalen ★', value: '650+' },
];

const GlitchText = ({ text }) => (
  <span className="relative inline-block group">
    <span className="relative z-10">{text}</span>
    <span
      aria-hidden="true"
      className="absolute inset-0 text-white/50 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-150 blur-[0.5px]"
    >
      {text}
    </span>
  </span>
);

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);

  // Hero → page: scroll-driven exit into the rest of the site
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  const contentY = useTransform(progress, [0, 1], reduced ? [0, 0] : [0, -140]);
  const contentOpacity = useTransform(progress, [0, 0.45, 0.85], reduced ? [1, 1, 1] : [1, 0.65, 0.2]);
  const contentScale = useTransform(progress, [0, 1], reduced ? [1, 1] : [1, 0.9]);
  const stageY = useTransform(progress, [0, 1], reduced ? [0, 0] : [0, 80]);
  const stageRotate = useTransform(progress, [0, 1], reduced ? [0, 0] : [0, -6]);
  const stageScale = useTransform(progress, [0, 1], reduced ? [1, 1] : [1, 0.88]);
  const beamHeight = useTransform(progress, [0, 0.3, 1], reduced ? ['0%', '0%', '0%'] : ['12%', '55%', '120%']);
  const beamOpacity = useTransform(progress, [0, 0.15, 0.7, 1], [0.2, 0.7, 0.4, 0]);
  const veilOpacity = useTransform(progress, [0, 0.5, 1], [0, 0.25, 0.65]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-28 px-4"
    >
      {/* Soft ambient only — 3D lives in its own stage, not under the terminal */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-1/4 right-0 w-[50vw] h-[50vh] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Scroll veil — darkens as you leave the hero toward the page */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-transparent via-void/40 to-void"
        style={{ opacity: veilOpacity }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto w-full"
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
      >
        {/* Top: copy + 3D stage side by side */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10 lg:mb-12">
          <div className="lg:col-span-5 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-[11px] tracking-widest text-steel-bright uppercase">
                Open to work · India
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="font-mono text-xs text-steel-dim tracking-[0.25em] mb-3 uppercase"
            >
              Systems · AI · Evals · Open Source
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[0.95] mb-5"
            >
              <span className="text-white">
                <GlitchText text="Ayush" />
              </span>{' '}
              <span className="text-gradient">
                <GlitchText text="Jha" />
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-steel-bright text-sm sm:text-base mb-5 min-h-[1.75rem]"
            >
              <TypeAnimation
                sequence={[
                  'SDE Intern @ Xalen AI',
                  2200,
                  'AI Evals @ Handshake · Outlier · AirDawg',
                  2200,
                  'Rust · WebRTC · FastAPI · Frontier Evals',
                  2200,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-steel text-base leading-relaxed mb-8 max-w-md text-balance"
            >
              Real-time voice systems, pure-Rust ephemeris (650+★), and professional AI evals for frontier labs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <Magnetic>
                <a
                  href="#projects"
                  data-cursor="hover"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white text-void font-display font-bold text-sm tracking-wide rounded-sm overflow-hidden"
                >
                  <span className="relative z-10">View work</span>
                  <FiArrowDown className="relative z-10 group-hover:translate-y-0.5 transition-transform" />
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href="https://linkedin.com/in/ayush-jha-196470287"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-white/15 hover:border-white/40 text-sm font-mono text-steel-bright hover:text-white transition-colors rounded-sm glass-panel"
                >
                  <FiLinkedin /> Connect
                </a>
              </Magnetic>

              <a
                href="https://github.com/b423016"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 p-3 text-steel hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex flex-wrap gap-2"
            >
              {proof.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.06 }}
                  className="px-3 py-2 glass-panel rounded-lg"
                >
                  <div className="font-mono text-[10px] text-steel-dim tracking-wider uppercase">{p.label}</div>
                  <div className="font-display font-bold text-white text-sm">{p.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dedicated 3D stage — parallax drifts opposite as you scroll out */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            style={{ y: stageY, rotateZ: stageRotate, scale: stageScale }}
            className="lg:col-span-7 relative h-[320px] sm:h-[380px] lg:h-[460px] will-change-transform"
          >
            <div className="absolute -inset-4 bg-white/[0.03] blur-3xl rounded-full pointer-events-none" />
            <div className="relative h-full rounded-2xl overflow-hidden border border-white/12 bg-black/40 shadow-[0_25px_80px_rgba(0,0,0,0.5)]">

              {!reduced ? (
                <Suspense
                  fallback={
                    <div className="h-full w-full flex items-center justify-center font-mono text-xs text-steel-dim">
                      loading scene…
                    </div>
                  }
                >
                  <Scene3D />
                </Suspense>
              ) : (
                <div className="h-full w-full grid-bg opacity-60" />
              )}
            </div>
          </motion.div>
        </div>

        {/* Terminal — below the fold of the 3D, full width so it never covers the mesh */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="relative max-w-4xl mx-auto"
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
            whileHover={{ rotateX: 2, rotateY: -3, y: -4 }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
          >
            <div
              className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10"
              style={{ transform: 'translateZ(-20px) scale(1.02)' }}
              aria-hidden="true"
            />
            <span className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t-2 border-l-2 border-white/35 rounded-tl z-20" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 border-t-2 border-r-2 border-white/35 rounded-tr z-20" />
            <span className="absolute -bottom-0.5 -left-0.5 w-4 h-4 border-b-2 border-l-2 border-white/35 rounded-bl z-20" />
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b-2 border-r-2 border-white/35 rounded-br z-20" />

            <div className="relative glass-panel rounded-2xl overflow-hidden border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-black/50">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/35" />
                <span className="ml-2 font-mono text-[11px] text-steel">ayush_profile.exe</span>
                <span className="ml-auto font-mono text-[10px] text-white/30">SYS · ONLINE</span>
              </div>

              <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start">
                <div className="relative shrink-0 mx-auto sm:mx-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-white/20">
                    <img
                      src="/assets/profile.png"
                      alt="Ayush Kumar Jha"
                      className="w-full h-full object-cover"
                      width={96}
                      height={96}
                      decoding="async"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full border-2 border-panel" />
                </div>

                <div className="font-mono text-xs sm:text-sm text-steel leading-relaxed flex-1 min-w-0">
                  <p className="mb-2">
                    <span className="text-white">➜</span> <span className="text-steel-dim">~</span>{' '}
                    <span className="text-white/90">whoami</span>
                  </p>
                  <p className="pl-3 border-l border-white/15 space-y-1">
                    <span className="block text-white">SDE Intern @ Xalen AI</span>
                    <span className="block">Evals: Handshake · Outlier · AirDawg</span>
                    <span className="block text-steel-dim">
                      IIIT BBSR · Meta HC #1154 · LC Knight · CF Specialist
                    </span>
                  </p>
                  <p className="mt-3 text-white/70">
                    <span className="text-white">➜</span> stack — rust · fastapi · webrtc · evals{' '}
                    <span className="animate-pulse text-white">_</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Continuum beam: hero → rest of page */}
      <div
        className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 z-20 flex flex-col items-center w-full max-w-[2px]"
        aria-hidden="true"
      >
        <motion.div
          className="w-px bg-gradient-to-b from-white/80 via-white/30 to-transparent origin-top"
          style={{ height: beamHeight, opacity: beamOpacity, minHeight: 48 }}
        />
        <motion.div
          className="absolute bottom-0 w-32 h-32 rounded-full bg-white/10 blur-3xl"
          style={{ opacity: beamOpacity }}
        />
      </div>

      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-steel-dim hover:text-white transition-colors"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll into work</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.a>
    </section>
  );
}
