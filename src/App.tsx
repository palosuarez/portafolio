import { useState, useEffect } from 'react';
import { CircuitBackground } from './components/effects/CircuitBackground';
import { Nav } from './components/layout/Nav';
import { CIStrip } from './components/layout/CIStrip';
import { Hero } from './components/sections/Hero';
import { Stack } from './components/sections/Stack';
import { Projects } from './components/sections/Projects';
import { Badges } from './components/sections/Badges';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import './index.css';

function App() {
  const [heroKey, setHeroKey] = useState(0);

  useEffect(() => {
    document.title =
      'Pablo Suárez | Ingeniero de Software Fullstack · IBM Developer · IBM Generative AI Engineering | Pablo Andrés Suárez Sandoval · pan_dev';
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent selection:bg-cyan-500/30">
      <CircuitBackground />
      <Nav onLogoClick={() => setHeroKey((k) => k + 1)} />
      <CIStrip />

      <main>
        <Hero key={heroKey} />
        <Stack />
        <Projects />
        <Badges />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
