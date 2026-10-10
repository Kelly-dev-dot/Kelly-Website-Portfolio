import { useEffect, useState } from 'react';

// Texte qui s'écrit puis s'efface (effet "And I'm a ..." de la vidéo 2).
// Sans librairie. Si l'utilisateur préfère moins d'animations : texte fixe.
export default function TypingText({ words }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0]);
      return undefined;
    }
    let w = 0;
    let i = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      setText(word.slice(0, i));
      let delay = deleting ? 45 : 85;
      if (!deleting && i === word.length) {
        deleting = true;
        delay = 1400;
      } else if (deleting && i === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span className="typing">
      {text}
      <i className="typing__cursor" />
    </span>
  );
}
