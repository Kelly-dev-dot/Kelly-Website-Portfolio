import { useState } from 'react';
import { projects } from '../data/content';
import Reveal from './Reveal';
import FreelanceModal from './FreelanceModal';
import './Work.css';

function CardBody({ p, i }) {
  return (
    <>
      <div className="work__thumb" style={{ '--h': `${(i * 70 + 190) % 360}deg` }}>
        {p.image ? (
          <img src={p.image} alt={p.title} loading="lazy" decoding="async" />
        ) : (
          <span>{String(i + 1).padStart(2, '0')}</span>
        )}
        <div className="work__overlay">{p.gallery ? 'View gallery' : 'View project'}</div>
      </div>
      <h3>{p.title}</h3>
      <p>{p.text}</p>
      <div className="tags">
        {p.tags.map((t) => (
          <span className="tag" key={t}>{t}</span>
        ))}
      </div>
    </>
  );
}

export default function Work() {
  const [galleryOpen, setGalleryOpen] = useState(false);

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
              {p.gallery ? (
                <div
                  className="card work__card"
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  onClick={() => setGalleryOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setGalleryOpen(true);
                    }
                  }}
                >
                  <CardBody p={p} i={i} />
                </div>
              ) : (
                <a className="card work__card" href={p.href} target="_blank" rel="noreferrer">
                  <CardBody p={p} i={i} />
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      {galleryOpen && <FreelanceModal onClose={() => setGalleryOpen(false)} />}
    </section>
  );
}