import { projects } from '../data/content';
import Reveal from './Reveal';
import './Work.css';

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Portfolio</p>
          <h2 className="section__title">
            Latest <span className="grad">projects</span>
          </h2>
        </Reveal>

        <div className="work__grid">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 110}>
              <a className="card work__card" href={p.href} target="_blank" rel="noreferrer">
                <div className="work__thumb" style={{ '--h': `${(i * 70 + 190) % 360}deg` }}>
                  {p.image ? (
                    <img src={p.image} alt={p.title} loading="lazy" decoding="async" />
                  ) : (
                    <span>{String(i + 1).padStart(2, '0')}</span>
                  )}
                  <div className="work__overlay">View project</div>
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
