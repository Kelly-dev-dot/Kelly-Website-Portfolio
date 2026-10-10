import { lazy, Suspense, useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import ErrorBoundary from './ErrorBoundary';
import './TechStack.css';

// Le moteur physique (Rapier) est lourd : on ne le télécharge QUE quand
// l'utilisateur s'approche de ce bloc.
const TechScene = lazy(() => import('./TechScene'));

export default function TechStack() {
  const [ref, near] = useInView({ rootMargin: '300px' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (near) setMounted(true);
  }, [near]);

  return (
    <div className="stack__canvas" ref={ref}>
      {mounted && (
        <ErrorBoundary fallback={<div className="stack__fallback">3D is not available on this device.</div>}>
          <Suspense fallback={null}>
            <TechScene active={near} />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
}
