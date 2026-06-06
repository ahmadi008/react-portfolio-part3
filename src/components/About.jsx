import { useEffect, useRef, useState } from 'react';
import { BookOpen, Code2, Lightbulb, Target, Zap, Coffee } from 'lucide-react';

const REACTIONS = [
  { emoji: '👋', label: 'Wave' }, { emoji: '🚀', label: 'Launch' },
  { emoji: '💡', label: 'Idea' }, { emoji: '❤️', label: 'Love' },
  { emoji: '🎉', label: 'Celebrate' },
];
const ENJOY_ITEMS = [
  { icon: <Code2 size={18}/>, title:'Building Projects', desc:'Turning ideas into working apps' },
  { icon: <BookOpen size={18}/>, title:'Learning Tech', desc:'Exploring new frameworks & tools' },
  { icon: <Lightbulb size={18}/>, title:'Problem Solving', desc:'Finding elegant solutions' },
  { icon: <Coffee size={18}/>, title:'Creative Thinking', desc:'Designing intuitive UX' },
];

export default function About() {
  const sectionRef = useRef(null);
  const [reaction, setReaction] = useState(null);
  const [floating, setFloating] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const triggerReaction = (emoji) => {
    setReaction(emoji);
    const id = nextId.current++;
    setFloating(p => [...p, { id, emoji, x: 30 + Math.random()*40 }]);
    setTimeout(() => setFloating(p => p.filter(r => r.id !== id)), 1500);
    setTimeout(() => setReaction(null), 300);
  };

  return (
    <section ref={sectionRef} id="about"
      style={{ padding:'100px 24px', background:'var(--color-bg-alt)', position:'relative', overflow:'hidden' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal" style={{ textAlign:'center', marginBottom:64 }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:13, letterSpacing:4, textTransform:'uppercase', color:'var(--color-primary)', fontWeight:600, marginBottom:8 }}>About Me</p>
          <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(36px,6vw,64px)', fontWeight:700, color:'var(--color-text)' }}>My Story</h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:48, alignItems:'start' }}>

          {/* Avatar + Reactions */}
          <div className="reveal-left" style={{ textAlign:'center' }}>
            <div style={{ position:'relative', display:'inline-block' }}>
              <div style={{ width:200, height:200, borderRadius:'50%',
                background:'linear-gradient(135deg,var(--color-primary),var(--color-accent))',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'var(--font-heading)', fontSize:72, fontWeight:700, color:'#fff',
                margin:'0 auto 24px', boxShadow:'var(--shadow-lg)',
                transition:'transform 0.3s', transform: reaction ? 'scale(1.08)' : 'scale(1)' }}>
                ZA
              </div>
              {floating.map(r => (
                <span key={r.id} style={{ position:'absolute', bottom:80, left:`${r.x}%`,
                  fontSize:28, pointerEvents:'none', animation:'confettiFall 1.4s ease forwards', zIndex:10 }}>
                  {r.emoji}
                </span>
              ))}
            </div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--color-text-muted)', marginBottom:12 }}>
              React to my profile!
            </p>
            <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
              {REACTIONS.map(r => (
                <button key={r.label} onClick={() => triggerReaction(r.emoji)} title={r.label}
                  style={{ fontSize:22, padding:'6px 10px', borderRadius:10,
                    border:'1px solid var(--color-border)', background:'var(--color-surface)',
                    cursor:'pointer', transition:'all 0.15s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='scale(1.2)'; e.currentTarget.style.borderColor='var(--color-primary)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='var(--color-border)'; }}>
                  {r.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="reveal-right">
            <div style={{ background:'var(--color-surface)', borderRadius:'var(--radius-lg)', padding:32,
              border:'1px solid var(--color-border)', marginBottom:24, boxShadow:'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily:'var(--font-heading)', fontSize:28, color:'var(--color-text)', marginBottom:16 }}>
                <Target size={20} style={{ display:'inline', marginRight:8, color:'var(--color-primary)' }} />
                Goals &amp; Journey
              </h3>
              <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--color-text-muted)', lineHeight:1.8 }}>
                I'm a frontend developer studying at Kabul University and CodeWeekend bootcamp.
                I built a Joomla CMS project and I'm passionate about AI and modern web technologies.
                My goal is to create beautiful, accessible, and meaningful digital experiences.
              </p>
            </div>
            <h3 style={{ fontFamily:'var(--font-heading)', fontSize:26, color:'var(--color-text)', marginBottom:16 }}>
              <Zap size={20} style={{ display:'inline', marginRight:8, color:'var(--color-accent)' }} />
              What I Enjoy
            </h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {ENJOY_ITEMS.map(item => (
                <div key={item.title} style={{ background:'var(--color-surface)', borderRadius:'var(--radius)',
                  padding:'14px 16px', border:'1px solid var(--color-border)',
                  display:'flex', gap:10, alignItems:'flex-start', transition:'all 0.2s', cursor:'default' }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--color-primary)'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--color-border)'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='none'; }}>
                  <span style={{ color:'var(--color-primary)', marginTop:2 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:14, color:'var(--color-text)', marginBottom:2 }}>{item.title}</div>
                    <div style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--color-text-muted)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
