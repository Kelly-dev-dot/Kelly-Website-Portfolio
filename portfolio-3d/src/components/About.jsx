import { about } from '../data/content';
import Reveal from './Reveal';
import './About.css';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">About</p>
          <h2 className="section__title">
            Who <span className="grad">am I</span>?
          </h2>
        </Reveal>

        <div className="about">
          <Reveal className="about__text">
            <h3>{about.title}</h3>
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <a href="#contact" className="btn btn--primary">Contact me</a>
          </Reveal>

          <Reveal delay={120} className="about__facts">
            {about.facts.map((f) => (
              <div className="card about__fact" key={f}>{f}</div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
