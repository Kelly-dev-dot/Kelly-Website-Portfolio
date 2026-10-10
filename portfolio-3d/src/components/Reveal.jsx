import { useInView } from '../hooks/useInView';

// Enveloppe n'importe quel bloc : il apparaît en douceur quand on arrive dessus.
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView({ once: true, threshold: 0.12 });
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
