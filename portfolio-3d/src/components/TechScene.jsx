import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody, BallCollider, CuboidCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { techStack } from '../data/content';

// Une seule géométrie partagée par toutes les sphères
const sphereGeo = new THREE.SphereGeometry(1, 32, 32);

// Petit générateur pseudo-aléatoire stable (pas de Math.random à chaque rendu)
const rand = (i) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

// Dessine le nom de la techno sur une texture (aucune image à télécharger)
function makeTexture(label, color) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 512, 256);
  g.addColorStop(0, color);
  g.addColorStop(1, '#0b1020');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  let size = 54;
  ctx.font = `700 ${size}px system-ui, sans-serif`;
  while (ctx.measureText(label).width > 190 && size > 22) {
    size -= 2;
    ctx.font = `700 ${size}px system-ui, sans-serif`;
  }
  // Le nom apparaît 2 fois (côtés opposés de la sphère)
  ctx.fillText(label, 128, 128);
  ctx.fillText(label, 384, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function Orb({ tech, index, radius, spawn }) {
  const body = useRef();

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: makeTexture(tech.name, tech.color),
        roughness: 0.35,
        metalness: 0.1,
      }),
    [tech]
  );
  // Libère la mémoire GPU quand la section est retirée
  useEffect(
    () => () => {
      material.map.dispose();
      material.dispose();
    },
    [material]
  );

  // La souris repousse les sphères proches (calcul très léger)
  useFrame(({ pointer, viewport }, dt) => {
    const b = body.current;
    if (!b) return;
    const px = (pointer.x * viewport.width) / 2;
    const py = (pointer.y * viewport.height) / 2;
    const p = b.translation();
    const dx = p.x - px;
    const dy = p.y - py;
    const reach = radius + 1.5;
    const d2 = dx * dx + dy * dy;
    if (d2 < reach * reach) {
      const d = Math.sqrt(d2) || 0.001;
      const f = 55 * radius ** 3 * (1 - d / reach) * Math.min(dt, 0.05);
      b.applyImpulse({ x: (dx / d) * f, y: (dy / d) * f, z: 0 }, true);
    }
  });

  return (
    <RigidBody
      ref={body}
      colliders={false}
      position={spawn}
      restitution={0.35}
      friction={0.6}
      linearDamping={0.35}
      angularDamping={0.6}
      enabledTranslations={[true, true, false]} // reste sur le plan : calcul 2D, plus léger
    >
      <BallCollider args={[radius]} />
      <mesh geometry={sphereGeo} scale={radius} material={material} />
    </RigidBody>
  );
}

function World() {
  const { viewport } = useThree();
  const w = viewport.width;
  const h = viewport.height;
  const base = Math.min(0.85, Math.max(0.5, w / 14)); // sphères plus petites sur mobile

  const orbs = useMemo(
    () =>
      techStack.map((tech, i) => ({
        tech,
        radius: base * (0.8 + rand(i + 1) * 0.4),
        spawn: [(rand(i + 20) - 0.5) * (w - 2), h / 2 + 1 + i * 0.9, 0],
      })),
    [w, h, base]
  );

  return (
    // key = on reconstruit le monde si la fenêtre change de largeur
    <Physics key={Math.round(w)} gravity={[0, -12, 0]}>
      {orbs.map((o, i) => (
        <Orb key={o.tech.name} tech={o.tech} index={i} radius={o.radius} spawn={o.spawn} />
      ))}
      <CuboidCollider position={[0, -h / 2 - 0.5, 0]} args={[w / 2 + 3, 0.5, 5]} />
      <CuboidCollider position={[-w / 2 - 0.5, 0, 0]} args={[0.5, h * 3, 5]} />
      <CuboidCollider position={[w / 2 + 0.5, 0, 0]} args={[0.5, h * 3, 5]} />
    </Physics>
  );
}

export default function TechScene({ active }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 12], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 8]} intensity={2.2} />
      <directionalLight position={[-5, -2, 4]} intensity={1.1} color="#ff7a59" />
      <World />
    </Canvas>
  );
}
