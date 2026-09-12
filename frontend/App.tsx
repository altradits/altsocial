import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#');

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPath(window.location.hash || '#');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (currentPath === '#dashboard') {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;