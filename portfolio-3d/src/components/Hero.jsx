import { lazy, Suspense } from 'react';
import { useInView } from '../hooks/useInView';
import { profile } from '../data/content';
import ErrorBoundary from './ErrorBoundary';
import TypingText from './TypingText';
import Socials from './Socials';
import './Hero.css';

// Chargé APRÈS l'affichage du texte : le site est lisible immédiatement,
// le robot 3D arrive juste après.
const RobotScene = lazy(() => import('./RobotScene'));

export default function Hero() {
  const [ref, inView] = useInView({ rootMargin: '100px' });

  return (
    <section id="home" className="hero">
      <div className="hero__inner container">
        <div className="hero__text">
          <p className="hero__hello">Hi, it's me</p>
          <h1 className="hero__title">
            <span className="grad">{profile.name}</span>
          </h1>
          <p className="hero__role">
            And I'm a <TypingText words={profile.roles} />
          </p>
          <p className="hero__tagline">{profile.tagline}</p>
          <Socials />
          <div className="hero__cta">
            <a href="#about" className="btn btn--primary">Learn more</a>
            <a href="#contact" className="btn">Contact me</a>
          </div>
        </div>

        {/* Le robot 3D remplace la photo de la vidéo 2, dans son anneau néon */}
        <div className="hero__ring" ref={ref} aria-hidden="true">
          <div className="hero__canvas">
            <ErrorBoundary fallback={<div className="hero__fallback" />}>
              <Suspense fallback={<div className="hero__fallback" />}>
                <RobotScene active={inView} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </section>
  );
}
