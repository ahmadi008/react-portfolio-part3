import React from 'react';
import { useEffect, useRef, useState } from 'react';

const SKILLS = [
  { name:'HTML',       level:92, color:'#E34F26', fact:'Expert at semantic, accessible HTML5 markup.' },
  { name:'CSS',        level:88, color:'#1572B6', fact:'Loves CSS Grid, Flexbox & CSS animations.' },
  { name:'JavaScript', level:78, color:'#F7DF1E', fact:'ES6+, async/await, DOM manipulation pro.' },
  { name:'React',      level:72, color:'#61DAFB', fact:'Building interactive UIs with hooks & state.' },
  { name:'Joomla',     level:80, color:'#F44321', fact:'Built a full school portal with Joomla CMS.' },
  { name:'TypeScript', level:55, color:'#3178C6', fact:'Learning type safety — growing fast!' },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" style={{ padding:'100px 24px', background:'var(--color-bg)' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <div className="reveal" style={{ textAlign:'center', marginBottom:64 }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:13, letterSpacing:4, textTransform:'uppercase',
            color:'var(--color-primary)', fontWeight:600, marginBottom:8 }}>Expertise</p>
          <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(36px,6vw,64px)',
            fontWeight:700, color:'var(--color-text)' }}>Skills</h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--color-text-muted)', marginTop:12 }}>
            Hover a bar to reveal a fun fact!
          </p>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
          {SKILLS.map((skill, i) => (
            <div key={skill.name} className="reveal" style={{ transitionDelay:`${i*80}ms` }}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:15,
                  color:'var(--color-text)', display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ width:10, height:10, borderRadius:'50%', background:skill.color,
                    display:'inline-block', boxShadow:`0 0 6px ${skill.color}60` }} />
                  {skill.name}
                </span>
                <span style={{ fontFamily:'var(--font-body)', fontWeight:700, fontSize:14,
                  color:'var(--color-primary)' }}>{skill.level}%</span>
              </div>

              <div style={{ height:10, background:'var(--color-border)', borderRadius:8, overflow:'hidden', cursor:'pointer' }}>
                <div style={{
                  height:'100%', borderRadius:8,
                  background:`linear-gradient(90deg,${skill.color},${skill.color}cc)`,
                  width: animated ? `${skill.level}%` : '0%',
                  transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${i*100}ms`,
                  boxShadow: hovered===skill.name ? `0 0 12px ${skill.color}80` : 'none',
                  filter: hovered===skill.name ? 'brightness(1.1)' : 'none',
                }} />
              </div>

              <div style={{ marginTop:6, fontFamily:'var(--font-body)', fontSize:13,
                color:'var(--color-primary)', fontStyle:'italic',
                height: hovered===skill.name ? 20 : 0,
                opacity: hovered===skill.name ? 1 : 0,
                overflow:'hidden', transition:'all 0.3s ease' }}>
                {skill.fact}
              </div>
            </div>
          ))}
        </div>

        {/* Core Skills badges — conditional rendering */}
        <div className="reveal" style={{ marginTop:48, display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
          {SKILLS.filter(s => s.level >= 80).map(s => (
            <span key={s.name} style={{ padding:'4px 14px', borderRadius:100,
              background:`${s.color}20`, border:`1px solid ${s.color}40`,
              fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, color:s.color }}>
              ★ Core Skill: {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
