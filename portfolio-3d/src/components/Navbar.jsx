import { useEffect, useState } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import './Navbar.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
// Constante hors du composant : sa référence ne change jamais (pas de re-render inutile)
const IDS = ['home', ...LINKS.map((l) => l.id)];

export default function Navbar() {
  const active = useActiveSection(IDS);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Cache la barre quand on descend, la remet quand on remonte.
  // requestAnimationFrame + passive = aucun ralentissement du scroll.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setHidden(y > last && y > 120 && !open);
        last = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  return (
    <header className={`nav ${hidden ? 'nav--hidden' : ''}`}>
      <nav className="nav__inner container" aria-label="Main navigation">
        <a href="#home" className="nav__logo" onClick={() => setOpen(false)}>
          <span>&lt;</span>Portfolio<span>/&gt;</span>
        </a>

        <button
          className="nav__burger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <i /><i /><i />
        </button>

        <ul className={`nav__links ${open ? 'is-open' : ''}`}>
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={active === l.id ? 'is-active' : ''}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
