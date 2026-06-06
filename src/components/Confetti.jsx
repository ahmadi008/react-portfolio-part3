import { useRef } from 'react';
const COLORS = ['#2563EB','#F97316','#10B981','#FBBF24','#F43F5E','#8B5CF6','#3B82F6'];

export default function Confetti({ active }) {
  const particles = useRef(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2,
    }))
  );

  if (!active) return null;

  return (
    <div aria-hidden style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:9998, overflow:'hidden' }}>
      {particles.current.map(p => (
        <div key={p.id} style={{
          position:'absolute', top:-20, left:`${p.x}%`,
          width:p.size, height:p.size,
          borderRadius: Math.random()>0.5 ? '50%' : '2px',
          background: p.color,
          animation: `confettiFall ${p.duration}s ease ${p.delay}s forwards`,
          transform: `rotate(${Math.random()*360}deg)`,
        }} />
      ))}
    </div>
  );
}
