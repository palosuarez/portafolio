import { TextReveal } from '../effects/TextReveal';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-left">
          <h1 className="hero-name">
            <TextReveal text="Pablo" delay={200} />
            <br />
            <TextReveal text="Suárez" delay={800} />
          </h1>
          <p className="hero-sub">
            <TextReveal
              text="Code that ships. Ideas that scale."
              delay={1500}
            />
          </p>
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            FULL STACK DEVELOPER · BOGOTÁ, CO
          </div>
          <div className="hero-actions">
            <a className="btn-primary" href="#stack">
              Explorar →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
