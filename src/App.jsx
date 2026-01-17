import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

const App = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80 pointer-events-none"></div>

      <Navigation />
      <Hero />
      <Skills />
      <Achievements />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
