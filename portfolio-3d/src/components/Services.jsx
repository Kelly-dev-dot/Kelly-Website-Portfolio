import { services } from '../data/content';
import Icon from './Icons';
import Reveal from './Reveal';
import './Services.css';

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Services</p>
          <h2 className="section__title">
            My <span className="grad">services</span>
          </h2>
        </Reveal>

        <div className="services__grid">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 110}>
              <article className="card services__card">
                <span className="services__icon"><Icon name={s.icon} size={30} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <a href="#contact" className="btn services__btn">Learn more</a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
