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
            <span className="hero-sub-line">
              <TextReveal text="Full Stack Software Developer ·" delay={1500} />
            </span>
            <span className="hero-sub-line">
              <TextReveal text="Generative AI Engineering ·" delay={3000} />
            </span>
            <span className="hero-sub-line">
              <TextReveal text="IBM Certified" delay={4500} />
            </span>
          </p>
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            PABLO ANDRÉS SUÁREZ SANDOVAL · PAN_DEV · BOGOTÁ, CO
          </div>
        </div>
      </div>
    </section>
  );
}
