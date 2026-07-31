import React, { lazy, Suspense, useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import ScrollProgress from './components/fx/ScrollProgress';
import SectionBridge from './components/fx/SectionBridge';

const CustomCursor = lazy(() => import('./components/fx/CustomCursor'));
const SignalField = lazy(() => import('./components/fx/SignalField'));
const ScrollRail = lazy(() => import('./components/fx/ScrollRail'));

/**
 * Lazy ambient FX · critical UI eager.
 * Never auto-deploy.
 */
const App = () => {
  const [finePointer, setFinePointer] = useState(false);
  // Defer ambient canvas one frame so first paint isn't blocked
  const [fxReady, setFxReady] = useState(false);

  useEffect(() => {
    setFinePointer(window.matchMedia('(pointer: fine)').matches);
    const id = window.requestAnimationFrame(() => setFxReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <div className="bg-void min-h-screen text-steel-bright relative">
      <ScrollProgress />

      <Suspense fallback={null}>
        {fxReady && <SignalField />}
        {fxReady && <ScrollRail />}
        {fxReady && finePointer && <CustomCursor />}
      </Suspense>

      {/* light grid only — SignalField carries color/motion */}
      <div className="fixed inset-0 z-0 pointer-events-none grid-bg opacity-15" aria-hidden="true" />

      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <SectionBridge />
          <Projects />
          <SectionBridge />
          <Experience />
          <SectionBridge />
          <Skills />
          <SectionBridge />
          <Achievements />
          <SectionBridge />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default App;
