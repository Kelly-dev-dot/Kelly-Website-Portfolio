# Portfolio 3D (fusion) — React + Three.js + Rapier

Style 3D de la vidéo 1 (robot, sphères avec physique) + sections de la vidéo 2
(accueil avec texte qui s'écrit, à propos, services, compétences, projets, contact).

## Lancer le projet
```
npm install
npm run dev        # puis ouvre http://localhost:5173
npm run build      # version de production dans /dist
```

## Ce que tu dois modifier (et seulement ça)
`src/data/content.js` : nom, email, téléphone, liens, textes, niveaux de compétences,
parcours, projets, technologies. Tout le site se met à jour tout seul.

Pour mettre une capture sur un projet : place l'image dans `public/projects/`
puis écris `image: '/projects/nom.jpg'` dans `content.js`.

## Sections (dans l'ordre de la page)
Home (robot 3D dans un anneau néon + texte qui s'écrit) → About → Services →
Skills (barres, cercles, sphères 3D) → Experience (timeline) → Projects → Contact.

## Structure
```
index.html
vite.config.js
src/
  main.jsx, App.jsx, index.css
  data/content.js            TON contenu
  hooks/useInView.js, useActiveSection.js
  components/
    Navbar        barre fixe, menu mobile, section active
    Hero          accueil + RobotScene (robot 3D) + TypingText + Socials
    About, Services, Skills (+ TechStack + TechScene), Experience, Work, Contact
    Icons, Reveal, ErrorBoundary
```

## Pourquoi c'est performant
1. 3D chargée à la demande (React.lazy) : le texte s'affiche avant le 3D.
2. Le moteur physique (le plus lourd) ne se télécharge que près des sphères.
3. Rendu 3D arrêté hors écran (frameloop "never").
4. Pixel ratio limité à 1.5, matériaux et géométries partagés.
5. Animations au scroll avec IntersectionObserver, sans librairie.
6. Aucune image obligatoire : vignettes en CSS, icônes SVG, textures dessinées en code.
7. Respect de prefers-reduced-motion.

## Envoyer le formulaire sans ouvrir le mail (optionnel)
Crée un formulaire gratuit sur formspree.io, puis dans Contact.jsx remplace la
fonction onSubmit par un `fetch('https://formspree.io/f/TON_ID', { method: 'POST', ... })`.

## Mettre en ligne
Pousse le dossier sur GitHub, puis importe le dépôt sur Vercel ou Netlify
(commande de build : `npm run build`, dossier : `dist`).
