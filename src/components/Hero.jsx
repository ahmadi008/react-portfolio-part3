import React from 'react';
import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const ROLES = ['Frontend Developer','React Enthusiast','UI Craftsperson','Problem Solver'];

export default function Hero() {
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting,  setDeleting]  = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  // Typing animation
  useEffect(() => {
    const current = ROLES[roleIdx];
    let t;
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length+1)), 80);
    else if (!deleting && displayed.length === current.length)
      t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length-1)), 45);
    else {
      setDeleting(false);
      setRoleIdx(i => (i+1) % ROLES.length);
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  // Parallax
  useEffect(() => {
    const onScroll = () => setParallaxY(window.scrollY * 0.3);
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="home" className="mesh-bg"
      style={{ minHeight:'100vh', display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', textAlign:'center',
        padding:'80px 24px 60px', position:'relative', overflow:'hidden' }}>

      {/* Parallax blobs */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none',
        transform:`translateY(${parallaxY}px)`, transition:'transform 0.05s linear' }}>
        <div style={{ position:'absolute', top:'15%', left:'8%', width:120, height:120,
          borderRadius:'50%', background:'rgba(37,99,235,0.08)', filter:'blur(40px)' }} />
        <div style={{ position:'absolute', bottom:'20%', right:'10%', width:200, height:200,
          borderRadius:'50%', background:'rgba(249,115,22,0.08)', filter:'blur(60px)' }} />
      </div>

      {/* Avatar */}
      <div style={{ width:100, height:100, borderRadius:'50%',
        background:'linear-gradient(135deg,var(--color-primary),var(--color-secondary))',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:'var(--font-heading)', fontSize:40, fontWeight:700, color:'#fff',
        marginBottom:24, boxShadow:'var(--shadow-lg)', animation:'bounceIn 0.8s ease',
        position:'relative', zIndex:1 }}>
        ZA
      </div>

      <p style={{ fontFamily:'var(--font-body)', fontSize:14, letterSpacing:4,
        textTransform:'uppercase', color:'var(--color-primary)', fontWeight:600,
        marginBottom:8, animation:'fadeInUp 0.6s ease 0.2s both', position:'relative', zIndex:1 }}>
        HELLO, I'M
      </p>

      <h1 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(48px,8vw,96px)',
        fontWeight:700, color:'var(--color-text)', lineHeight:1.1, marginBottom:16,
        animation:'fadeInUp 0.6s ease 0.3s both', position:'relative', zIndex:1 }}>
        Zahra Ahmadi
      </h1>

      {/* Typing */}
      <div style={{ fontFamily:'var(--font-body)', fontSize:'clamp(18px,3vw,26px)', fontWeight:500,
        color:'var(--color-primary)', marginBottom:20, minHeight:40,
        display:'flex', alignItems:'center', gap:2,
        animation:'fadeInUp 0.6s ease 0.4s both', position:'relative', zIndex:1 }}>
        {displayed}
        <span style={{ display:'inline-block', width:2, height:'1.1em',
          background:'var(--color-accent)', marginLeft:2,
          animation:'blink 0.9s step-end infinite' }} />
      </div>

      <blockquote style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(18px,2.5vw,24px)',
        fontStyle:'italic', color:'var(--color-text-muted)', maxWidth:480, marginBottom:40,
        animation:'fadeInUp 0.6s ease 0.5s both', position:'relative', zIndex:1 }}>
        "Simplicity is the soul of efficiency."
      </blockquote>

      {/* CTAs */}
      <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center', marginBottom:48,
        animation:'fadeInUp 0.6s ease 0.6s both', position:'relative', zIndex:1 }}>
        <button onClick={() => document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}
          style={{ padding:'13px 32px', background:'var(--color-primary)', color:'#fff',
            border:'none', borderRadius:10, fontFamily:'var(--font-body)', fontSize:15,
            fontWeight:600, cursor:'pointer', boxShadow:'var(--shadow-md)', transition:'all 0.2s' }}
          onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
          onMouseLeave={e=>e.currentTarget.style.transform=''}>
          View Projects
        </button>
        <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
          style={{ padding:'13px 32px', background:'transparent', color:'var(--color-primary)',
            border:'2px solid var(--color-primary)', borderRadius:10, fontFamily:'var(--font-body)',
            fontSize:15, fontWeight:600, cursor:'pointer', transition:'all 0.2s' }}
          onMouseEnter={e=>{ e.currentTarget.style.background='var(--color-primary)'; e.currentTarget.style.color='#fff'; }}
          onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--color-primary)'; }}>
          Get in Touch
        </button>
      </div>

      {/* Social */}
      <div style={{ display:'flex', gap:16, animation:'fadeInUp 0.6s ease 0.7s both', position:'relative', zIndex:1 }}>
        {[
          { icon:<Github size={20}/>, href:'https://github.com/ahmadi008', label:'GitHub' },
          { icon:<Linkedin size={20}/>, href:'#', label:'LinkedIn' },
          { icon:<Mail size={20}/>, href:'#contact', label:'Email' },
        ].map(s => (
          <a key={s.label} href={s.href} aria-label={s.label}
            style={{ width:42, height:42, display:'flex', alignItems:'center', justifyContent:'center',
              borderRadius:10, border:'1px solid var(--color-border)', color:'var(--color-text-muted)',
              textDecoration:'none', transition:'all 0.2s', background:'var(--color-surface)' }}
            onMouseEnter={e=>{ e.currentTarget.style.color='var(--color-primary)'; e.currentTarget.style.borderColor='var(--color-primary)'; e.currentTarget.style.transform='translateY(-2px)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.color='var(--color-text-muted)'; e.currentTarget.style.borderColor='var(--color-border)'; e.currentTarget.style.transform=''; }}>
            {s.icon}
          </a>
        ))}
      </div>

      <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)',
        animation:'pulse 2s ease infinite', color:'var(--color-text-muted)', cursor:'pointer' }}
        onClick={() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'})}>
        <ArrowDown size={22} />
      </div>
    </section>
  );
}
