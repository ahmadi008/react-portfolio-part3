import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Star, User, MessageSquare, AlertCircle, ArrowUpDown } from 'lucide-react';

const SAMPLE = [
  { id:1, name:'Sarah K.',  rating:5, comment:'Incredible work! The animations are so smooth.', time: new Date(Date.now()-3600000*5) },
  { id:2, name:'Ahmed R.',  rating:4, comment:'Great projects! School Portal impressed me.', time: new Date(Date.now()-3600000*12) },
  { id:3, name:'Maya S.',   rating:5, comment:'Love the attention to detail in every section!', time: new Date(Date.now()-3600000*24) },
  { id:4, name:'Omar T.',   rating:3, comment:'Nice portfolio, would love more projects. Keep going!', time: new Date(Date.now()-3600000*36) },
];

export default function FeedbackWall() {
  const sectionRef = useRef(null);
  const [feedbacks, setFeedbacks] = useState(SAMPLE);
  const [form,      setForm]      = useState({ name:'', rating:0, comment:'' });
  const [hoverStar, setHoverStar] = useState(0);
  const [errors,    setErrors]    = useState({});
  const [sort,      setSort]      = useState('newest');
  const [ok,        setOk]        = useState(false);
  const nextId = useRef(SAMPLE.length+1);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required.';
    if (!form.rating)         e.rating  = 'Please select a rating.';
    if (!form.comment.trim()) e.comment = 'Comment is required.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setFeedbacks(p => [{ id:nextId.current++, name:form.name.trim(),
      rating:form.rating, comment:form.comment.trim(), time:new Date() }, ...p]);
    setForm({ name:'', rating:0, comment:'' }); setErrors({});
    setOk(true); setTimeout(() => setOk(false), 3000);
  };

  const sorted = [...feedbacks].sort((a,b) => {
    if (sort==='newest')  return b.time - a.time;
    if (sort==='highest') return b.rating - a.rating;
    return a.rating - b.rating;
  });

  const avg = feedbacks.length ? (feedbacks.reduce((s,f)=>s+f.rating,0)/feedbacks.length).toFixed(1) : '0.0';
  const timeAgo = (d) => {
    const s = (Date.now()-d)/1000;
    if (s<60) return 'just now';
    if (s<3600) return Math.floor(s/60)+'m ago';
    if (s<86400) return Math.floor(s/3600)+'h ago';
    return Math.floor(s/86400)+'d ago';
  };

  return (
    <section ref={sectionRef} id="feedback" style={{ padding:'100px 24px', background:'var(--color-bg-alt)' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div className="reveal" style={{ textAlign:'center', marginBottom:48 }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:13, letterSpacing:4, textTransform:'uppercase', color:'var(--color-primary)', fontWeight:600, marginBottom:8 }}>Community</p>
          <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(36px,6vw,64px)', fontWeight:700, color:'var(--color-text)' }}>Feedback Wall</h2>
          <div style={{ display:'flex', gap:32, justifyContent:'center', marginTop:16 }}>
            <div><span style={{ fontFamily:'var(--font-heading)', fontSize:36, fontWeight:700, color:'var(--color-primary)' }}>{avg}</span><span style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--color-text-muted)', marginLeft:6 }}>avg</span></div>
            <div><span style={{ fontFamily:'var(--font-heading)', fontSize:36, fontWeight:700, color:'var(--color-text)' }}>{feedbacks.length}</span><span style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--color-text-muted)', marginLeft:6 }}>reviews</span></div>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:40, alignItems:'start' }}>
          {/* Submit form */}
          <div className="reveal">
            <div style={{ background:'var(--color-surface)', borderRadius:'var(--radius-lg)', padding:28, border:'1px solid var(--color-border)', boxShadow:'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily:'var(--font-heading)', fontSize:26, color:'var(--color-text)', marginBottom:20 }}>Leave a Review</h3>
              {ok && <div style={{ padding:'10px 14px', background:'rgba(16,185,129,0.12)', border:'1px solid var(--color-success)', borderRadius:8, marginBottom:16, fontFamily:'var(--font-body)', fontSize:14, color:'var(--color-success)', animation:'fadeInUp 0.3s ease' }}>Thanks for your feedback!</div>}
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom:16 }}>
                  <label style={{ display:'block', fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, color:'var(--color-text)', marginBottom:6 }}>Name</label>
                  <div style={{ position:'relative' }}>
                    <User size={14} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--color-text-muted)', pointerEvents:'none' }}/>
                    <input type="text" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Your name"
                      style={{ width:'100%', padding:'10px 10px 10px 34px', borderRadius:8, border:`1.5px solid ${errors.name?'var(--color-error)':'var(--color-border)'}`, background:'var(--color-bg)', fontFamily:'var(--font-body)', fontSize:14, color:'var(--color-text)', outline:'none' }} />
                  </div>
                  {errors.name && <p style={{ marginTop:4, fontSize:12, color:'var(--color-error)', fontFamily:'var(--font-body)', display:'flex', alignItems:'center', gap:4 }}><AlertCircle size={11}/> {errors.name}</p>}
                </div>

                <div style={{ marginBottom:16 }}>
                  <label style={{ display:'block', fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, color:'var(--color-text)', marginBottom:8 }}>Rating</label>
                  <div style={{ display:'flex', gap:6 }}>
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={()=>setForm(p=>({...p,rating:n}))}
                        onMouseEnter={()=>setHoverStar(n)} onMouseLeave={()=>setHoverStar(0)}
                        style={{ background:'transparent', border:'none', cursor:'pointer', padding:2, transition:'transform 0.15s', transform: hoverStar>=n||form.rating>=n?'scale(1.15)':'scale(1)' }}>
                        <Star size={28} fill={hoverStar>=n||form.rating>=n?'#FBBF24':'none'} color={hoverStar>=n||form.rating>=n?'#FBBF24':'var(--color-border)'}
                          style={{ animation: form.rating===n ? 'starPop 0.3s ease' : 'none' }} />
                      </button>
                    ))}
                    {form.rating>0 && <span style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--color-text-muted)', alignSelf:'center', marginLeft:4 }}>
                      {['Terrible','Poor','OK','Good','Excellent'][form.rating-1]}
                    </span>}
                  </div>
                  {errors.rating && <p style={{ marginTop:4, fontSize:12, color:'var(--color-error)', fontFamily:'var(--font-body)', display:'flex', alignItems:'center', gap:4 }}><AlertCircle size={11}/> {errors.rating}</p>}
                </div>

                <div style={{ marginBottom:20 }}>
                  <label style={{ display:'block', fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, color:'var(--color-text)', marginBottom:6 }}>Comment</label>
                  <textarea value={form.comment} onChange={e=>setForm(p=>({...p,comment:e.target.value}))}
                    placeholder="Share your thoughts..." rows={3}
                    style={{ width:'100%', padding:'10px', borderRadius:8, border:`1.5px solid ${errors.comment?'var(--color-error)':'var(--color-border)'}`, background:'var(--color-bg)', fontFamily:'var(--font-body)', fontSize:14, color:'var(--color-text)', outline:'none', resize:'vertical' }}/>
                  {errors.comment && <p style={{ marginTop:4, fontSize:12, color:'var(--color-error)', fontFamily:'var(--font-body)', display:'flex', alignItems:'center', gap:4 }}><AlertCircle size={11}/> {errors.comment}</p>}
                </div>

                <button type="submit" style={{ width:'100%', padding:'11px', background:'var(--color-primary)', color:'#fff',
                  border:'none', borderRadius:8, fontFamily:'var(--font-body)', fontSize:14, fontWeight:600, cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='none'; }}>
                  Submit Review
                </button>
              </form>
            </div>
          </div>

          {/* Reviews list */}
          <div className="reveal">
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16, justifyContent:'flex-end' }}>
              <ArrowUpDown size={14} style={{ color:'var(--color-text-muted)' }}/>
              {['newest','highest','lowest'].map(s => (
                <button key={s} onClick={()=>setSort(s)}
                  style={{ padding:'4px 12px', borderRadius:100, border:'1px solid', textTransform:'capitalize',
                    borderColor: sort===s ? 'var(--color-primary)' : 'var(--color-border)',
                    background: sort===s ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: sort===s ? '#fff' : 'var(--color-text-muted)',
                    fontFamily:'var(--font-body)', fontSize:12, fontWeight:500, cursor:'pointer', transition:'all 0.2s' }}>
                  {s}
                </button>
              ))}
            </div>

            {/* Render with .map() */}
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {sorted.map(fb => (
                <div key={fb.id} style={{ background:'var(--color-surface)', borderRadius:'var(--radius)', padding:18,
                  border:'1px solid var(--color-border)',
                  borderTop: fb.rating===5 ? '3px solid #FBBF24' : '1px solid var(--color-border)',
                  boxShadow:'var(--shadow-sm)', animation:'fadeInUp 0.3s ease', transition:'all 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='translateX(4px)'}
                  onMouseLeave={e=>e.currentTarget.style.transform=''}>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:8 }}>
                    <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,var(--color-primary),var(--color-secondary))', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontSize:16, fontWeight:700, color:'#fff', flexShrink:0 }}>
                      {fb.name.charAt(0)}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                        <span style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:14, color:'var(--color-text)' }}>{fb.name}</span>
                        {/* Conditional: 5-star featured badge */}
                        {fb.rating===5 && (
                          <span style={{ padding:'2px 10px', background:'linear-gradient(90deg,#F59E0B,#FBBF24)', borderRadius:100, fontFamily:'var(--font-body)', fontSize:11, fontWeight:700, color:'#fff' }}>
                            ⭐ Featured
                          </span>
                        )}
                        <span style={{ marginLeft:'auto', fontFamily:'var(--font-body)', fontSize:11, color:'var(--color-text-muted)' }}>{timeAgo(fb.time)}</span>
                      </div>
                      <div style={{ display:'flex', gap:2, marginTop:3 }}>
                        {[1,2,3,4,5].map(n => (
                          <Star key={n} size={13} fill={n<=fb.rating?'#FBBF24':'none'} color={n<=fb.rating?'#FBBF24':'var(--color-border)'}/>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--color-text-muted)', lineHeight:1.7, paddingLeft:46 }}>{fb.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
