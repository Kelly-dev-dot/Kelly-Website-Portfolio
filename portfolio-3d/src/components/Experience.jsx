import { experience } from '../data/content';
import Reveal from './Reveal';
import './Experience.css';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Journey</p>
          <h2 className="section__title">
            My <span className="grad">experience</span>
          </h2>
        </Reveal>

        <ol className="timeline">
          {experience.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 100} className="timeline__item">
              <span className="timeline__dot" />
              <p className="timeline__when">{e.when}</p>
              <h3>{e.title}</h3>
              <p className="timeline__place">{e.place}</p>
              <p className="timeline__text">{e.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
