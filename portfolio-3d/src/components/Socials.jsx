import { profile } from '../data/content';
import Icon from './Icons';

// Petits boutons ronds (GitHub, LinkedIn, Email) réutilisés dans l'accueil et le contact.
export default function Socials() {
  const items = [
    { name: 'GitHub', icon: 'github', href: profile.github },
    { name: 'LinkedIn', icon: 'linkedin', href: profile.linkedin },
    { name: 'Email', icon: 'mail', href: `mailto:${profile.email}` },
  ];
  return (
    <div className="socials">
      {items.map((s) => (
        <a key={s.name} href={s.href} aria-label={s.name} target="_blank" rel="noreferrer" className="socials__btn">
          <Icon name={s.icon} size={20} />
        </a>
      ))}
    </div>
  );
}
