import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const CYAN = '#22d3ee';
const CORAL = '#ff7a59';

function Robot() {
  const group = useRef();
  const head = useRef();
  const eyes = useRef();
  const handL = useRef();
  const handR = useRef();

  // Matériaux créés UNE seule fois et partagés par toutes les pièces (économie de mémoire)
  const m = useMemo(
    () => ({
      white: new THREE.MeshStandardMaterial({ color: '#e9eef7', roughness: 0.35, metalness: 0.15 }),
      dark: new THREE.MeshStandardMaterial({ color: '#0b1020', roughness: 0.3, metalness: 0.6 }),
      cyan: new THREE.MeshBasicMaterial({ color: CYAN, toneMapped: false }),
      coral: new THREE.MeshStandardMaterial({ color: CORAL, roughness: 0.4, metalness: 0.1 }),
      coralGlow: new THREE.MeshBasicMaterial({ color: CORAL, toneMapped: false }),
    }),
    []
  );

  useFrame((state, dt) => {
    const { x, y } = state.pointer;
    const t = state.clock.elapsedTime;

    // La tête et le corps suivent la souris en douceur
    head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, x * 0.6, 4, dt);
    head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -y * 0.35, 4, dt);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, x * 0.25, 3, dt);

    // Clignement des yeux
    const blink = Math.sin(t * 1.7) > 0.992 ? 0.1 : 1;
    eyes.current.scale.y = THREE.MathUtils.damp(eyes.current.scale.y, blink, 30, dt);

    // Les mains "tapent" sur le clavier
    handL.current.position.y = -0.62 + Math.sin(t * 9) * 0.035;
    handR.current.position.y = -0.62 + Math.sin(t * 9 + Math.PI) * 0.035;
  });

  return (
    <group ref={group} position={[0, 0.2, 0]}>
      {/* Tête */}
      <group ref={head} position={[0, 1.15, 0]}>
        <RoundedBox args={[1.5, 1.15, 1.1]} radius={0.28} smoothness={4} material={m.white} />
        <RoundedBox args={[1.15, 0.6, 0.12]} radius={0.2} smoothness={4} position={[0, 0.02, 0.55]} material={m.dark} />
        <group ref={eyes} position={[0, 0.05, 0.62]}>
          <RoundedBox args={[0.2, 0.2, 0.04]} radius={0.08} position={[-0.28, 0, 0]} material={m.cyan} />
          <RoundedBox args={[0.2, 0.2, 0.04]} radius={0.08} position={[0.28, 0, 0]} material={m.cyan} />
        </group>
        <mesh position={[-0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={m.coral}>
          <cylinderGeometry args={[0.18, 0.18, 0.2, 24]} />
        </mesh>
        <mesh position={[0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={m.coral}>
          <cylinderGeometry args={[0.18, 0.18, 0.2, 24]} />
        </mesh>
        <mesh position={[0, 0.75, 0]} material={m.dark}>
          <cylinderGeometry args={[0.04, 0.04, 0.35, 12]} />
        </mesh>
        <mesh position={[0, 0.98, 0]} material={m.coralGlow}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
      </group>

      {/* Cou + corps */}
      <mesh position={[0, 0.5, 0]} material={m.dark}>
        <cylinderGeometry args={[0.22, 0.22, 0.3, 16]} />
      </mesh>
      <RoundedBox args={[1.3, 1.0, 0.85]} radius={0.3} smoothness={4} position={[0, -0.1, 0]} material={m.white} />
      <RoundedBox args={[0.7, 0.18, 0.05]} radius={0.05} position={[0, 0.05, 0.43]} material={m.dark} />
      <RoundedBox args={[0.5, 0.05, 0.02]} radius={0.02} position={[0, 0.05, 0.46]} material={m.cyan} />

      {/* Mains */}
      <mesh ref={handL} position={[-0.5, -0.62, 0.8]} material={m.coral}>
        <sphereGeometry args={[0.2, 20, 20]} />
      </mesh>
      <mesh ref={handR} position={[0.5, -0.62, 0.8]} material={m.coral}>
        <sphereGeometry args={[0.2, 20, 20]} />
      </mesh>

      {/* Ordinateur portable */}
      <group position={[0, -0.85, 0.85]} rotation={[0.05, 0, 0]}>
        <RoundedBox args={[1.25, 0.07, 0.8]} radius={0.03} smoothness={3} material={m.dark} />
        <group position={[0, 0.02, -0.38]} rotation={[-0.28, 0, 0]}>
          <RoundedBox args={[1.25, 0.8, 0.05]} radius={0.04} smoothness={3} position={[0, 0.4, 0]} material={m.dark} />
          <mesh position={[0, 0.4, 0.03]}>
            <planeGeometry args={[1.1, 0.64]} />
            <meshBasicMaterial color="#073a47" toneMapped={false} />
          </mesh>
          {/* Lignes de code lumineuses */}
          <mesh position={[-0.22, 0.58, 0.035]} material={m.cyan}>
            <planeGeometry args={[0.5, 0.05]} />
          </mesh>
          <mesh position={[-0.12, 0.46, 0.035]} material={m.coralGlow}>
            <planeGeometry args={[0.7, 0.05]} />
          </mesh>
          <mesh position={[-0.27, 0.34, 0.035]} material={m.cyan}>
            <planeGeometry args={[0.4, 0.05]} />
          </mesh>
          <mesh position={[-0.05, 0.22, 0.035]} material={m.cyan}>
            <planeGeometry args={[0.85, 0.05]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// `active` = le Hero est visible à l'écran. Hors écran on arrête complètement le rendu
// (frameloop "never") : zéro CPU/GPU consommé quand on regarde une autre section.
export default function RobotScene({ active }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 6.8], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#dff7ff" />
      <directionalLight position={[-4, 1, -2]} intensity={1.6} color={CORAL} />
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.6}>
        <Robot />
      </Float>
    </Canvas>
  );
}
