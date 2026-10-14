import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// ============================================================
//  1) TEXTES : modifie seulement cette partie
// ============================================================
const TITLE = 'Data Entry & Web Research';
const INTRO = 'Real freelance assignments. Client names and private data are hidden.';
const CATEGORIES = [
  {
    id: 'google-sheet', // = nom du dossier dans src/assets/freelance/
    label: 'Google Sheets / Excel',
    text: 'Structured spreadsheets, formulas, cleaning and formatting of raw data.',
  },
  {
    id: 'data-entry',
    label: 'Data Entry',
    text: 'Fast and accurate data entry from documents, forms and web sources.',
  },
  {
    id: 'web-research',
    label: 'Web Research',
    text: 'Finding, checking and organizing information online, with video demos.',
  },
];

// ============================================================
//  2) FICHIERS : trouvés automatiquement (images + vidéos .mp4/.webm)
//     Dépose-les dans src/assets/freelance/google-sheet, data-entry, web-research
// ============================================================
const files = import.meta.glob(
  '../assets/freelance/*/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,gif,mp4,MP4,webm}',
  { eager: true, query: '?url', import: 'default' },
);

// "02-invoice-cleanup.png" -> "Invoice cleanup" ; "Screenshot 2026-..." -> pas de texte
function toCaption(path) {
  const name = path.split('/').pop().replace(/\.[^.]+$/, '');
  const text = name.replace(/^\d+[\s._-]+/, '').replace(/[-_]+/g, ' ').trim();
  if (!text || /^\d+$/.test(text) || /^(screenshot|capture|img|image|video)\b/i.test(text)) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const MEDIA = Object.fromEntries(
  CATEGORIES.map((c) => [
    c.id,
    Object.keys(files)
      .filter((path) => path.includes(`/freelance/${c.id}/`))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((path) => ({
        src: files[path],
        video: /\.(mp4|webm)$/i.test(path),
        caption: toCaption(path),
      })),
  ]),
);

// ============================================================
//  3) LA FENÊTRE
// ============================================================
export default function FreelanceModal({ onClose }) {
  const [tab, setTab] = useState(CATEGORIES[0].id);
  const [zoom, setZoom] = useState(null); // image agrandie
  const category = CATEGORIES.find((c) => c.id === tab);
  const items = MEDIA[tab];

  // Échap : ferme l'image agrandie, puis la fenêtre
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (zoom) setZoom(null);
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom, onClose]);

  // Bloque le scroll de la page derrière la fenêtre
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return createPortal(
    <div className="fm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <style>{CSS}</style>

      <div className="fm__dialog" role="dialog" aria-modal="true" aria-label={TITLE}>
        <header className="fm__head">
          <div>
            <p className="eyebrow">Freelance</p>
            <h3 className="fm__title">{TITLE}</h3>
          </div>
          <button type="button" className="fm__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <p className="fm__muted">{INTRO}</p>

        <div className="fm__tabs" role="tablist">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={c.id === tab}
              className={`fm__tab ${c.id === tab ? 'is-active' : ''}`}
              onClick={() => setTab(c.id)}
            >
              {c.label} <span className="fm__count">{MEDIA[c.id].length}</span>
            </button>
          ))}
        </div>

        <p className="fm__muted">{category.text}</p>

        {items.length === 0 ? (
          <div className="fm__empty">Screenshots coming soon.</div>
        ) : (
          <ul className="fm__grid">
            {items.map((m) => (
              <li key={m.src} className={m.video ? 'fm__video' : ''}>
                {m.video ? (
                  <video src={`${m.src}#t=0.1`} controls preload="metadata" playsInline />
                ) : (
                  <button type="button" className="fm__shot" onClick={() => setZoom(m.src)}>
                    <img src={m.src} alt={m.caption || `${category.label} screenshot`} loading="lazy" />
                  </button>
                )}
                {m.caption && <p className="fm__cap">{m.caption}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>

      {zoom && (
        <div className="fm__zoom" role="dialog" aria-label="Image preview" onClick={() => setZoom(null)}>
          <img src={zoom} alt="" />
        </div>
      )}
    </div>,
    document.body,
  );
}

// ============================================================
//  4) STYLE
// ============================================================
const CSS = `
.fm { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 16px;
  background: rgba(3,5,10,.8); backdrop-filter: blur(6px); }
.fm__dialog { width: min(1040px, 100%); max-height: 90vh; overflow-y: auto; padding: 0 28px 28px;
  background: #0b0e16; border: 1px solid var(--border); border-radius: var(--radius);
  box-shadow: 0 30px 80px rgba(0,0,0,.6); }
.fm__head { position: sticky; top: 0; z-index: 1; display: flex; justify-content: space-between;
  align-items: flex-start; gap: 16px; padding: 26px 0 14px; background: #0b0e16; }
.fm__head .eyebrow { margin-bottom: 6px; }
.fm__title { font-size: clamp(1.4rem, 3.5vw, 2rem); }
.fm__muted { color: var(--muted); margin-bottom: 16px; }
.fm__close { flex: none; width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--border);
  background: var(--surface); color: var(--text); font: inherit; font-size: 1.5rem; line-height: 1; cursor: pointer; }
.fm__close:hover { border-color: var(--cyan); color: var(--cyan); }
.fm__tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.fm__tab { padding: 9px 16px; border-radius: 999px; border: 1px solid var(--border); background: transparent;
  color: var(--muted); font: inherit; font-size: .92rem; font-weight: 600; cursor: pointer; }
.fm__tab:hover { color: var(--text); }
.fm__tab.is-active { color: var(--cyan); border-color: rgba(34,211,238,.45); background: rgba(34,211,238,.12); }
.fm__count { margin-left: 4px; padding: 1px 7px; border-radius: 999px; background: rgba(255,255,255,.08); font-size: .75rem; }
.fm__grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
.fm__grid li { margin: 0; }
.fm__shot { display: block; width: 100%; padding: 0; border: 1px solid var(--border); border-radius: 12px;
  overflow: hidden; background: var(--surface); cursor: zoom-in; }
.fm__shot:hover { border-color: rgba(34,211,238,.45); }
.fm__shot img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top left; }
.fm__grid video { display: block; width: 100%; aspect-ratio: 16 / 9; border: 1px solid var(--border);
  border-radius: 12px; background: #000; }
.fm__cap { margin-top: 8px; color: var(--muted); font-size: .88rem; }
.fm__empty { padding: 48px 16px; text-align: center; color: var(--muted); border: 1px dashed var(--border); border-radius: 12px; }
.fm__zoom { position: absolute; inset: 0; display: grid; place-items: center; padding: 24px;
  background: rgba(3,5,10,.95); cursor: zoom-out; }
.fm__zoom img { max-width: 100%; max-height: 100%; border-radius: 10px; }
@media (min-width: 700px) { .fm__video { grid-column: span 2; } }
@media (max-width: 640px) { .fm__dialog { padding: 0 16px 20px; } }
`;