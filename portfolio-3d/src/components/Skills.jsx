import { technicalSkills, softSkills, levels } from '../data/content';
import { useInView } from '../hooks/useInView';
import Icon from './Icons';
import Reveal from './Reveal';
import TechStack from './TechStack';
import './Skills.css';

const MAX_LEVEL = 4;

function SkillBar({ name, level }) {
  const [ref, inView] = useInView({ once: true, threshold: 0.4 });
  return (
    <div className="bar" ref={ref}>
      <div className="bar__top">
        <span>{name}</span>
        <span className="bar__level">{levels[level]}</span>
      </div>
      <div className="bar__track">
        <div
          className="bar__fill"
          style={{ width: inView ? `${(level / MAX_LEVEL) * 100}%` : '0%' }}
        />
      </div>
    </div>
  );
}

function Ring({ name, icon }) {
  const [ref, inView] = useInView({ once: true, threshold: 0.4 });
  return (
    <div className="ring" ref={ref}>
      <div className="ring__circle">
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <circle className="ring__bg" cx="40" cy="40" r="34" />
          <circle className={`ring__fg ${inView ? 'is-drawn' : ''}`} cx="40" cy="40" r="34" />
        </svg>
        <Icon name={icon} size={26} className="ring__icon" />
      </div>
      <span>{name}</span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Skills</p>
          <h2 className="section__title">
            My <span className="grad">skills</span>
          </h2>
        </Reveal>

        <div className="skills">
          <Reveal>
            <h3 className="skills__title">Technical skills</h3>
            {technicalSkills.map((s) => (
              <SkillBar key={s.name} name={s.name} level={s.level} />
            ))}
          </Reveal>

          <Reveal delay={120}>
            <h3 className="skills__title">Soft skills</h3>
            <div className="rings">
              {softSkills.map((s) => (
                <Ring key={s.name} name={s.name} icon={s.icon} />
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="skills__stack">
          <h3 className="skills__title">My 3D tech stack</h3>
          <p className="skills__hint">Play with the spheres: move your mouse over them.</p>
        </Reveal>
        <TechStack />
      </div>
    </section>
  );
}
