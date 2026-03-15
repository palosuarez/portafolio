import { useState } from 'react';
import './index.css';
import { CircuitBackground } from './components/effects/CircuitBackground';
import { Nav } from './components/layout/Nav';
import { CIStrip } from './components/layout/CIStrip';
import { Hero } from './components/sections/Hero';
import { Stack } from './components/sections/Stack';
import { Projects } from './components/sections/Projects';
import { Badges } from './components/sections/Badges';
import { About } from './components/sections/About';
import { Footer } from './components/layout/Footer';
import { Contact } from './components/sections/Contact';
function App() {
  const [heroKey, setHeroKey] = useState(0);

  return (
    <div>
      <CircuitBackground />
      <Nav onLogoClick={() => setHeroKey((k) => k + 1)} />
      <CIStrip />
      <Hero key={heroKey} />
      <Stack />
      <Projects />
      <Badges />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
