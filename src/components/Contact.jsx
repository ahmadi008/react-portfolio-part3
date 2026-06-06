import { useState, useEffect, useRef } from 'react';
import { Send, User, AtSign, MessageSquare, CheckCircle, X, AlertCircle, Eye } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LS_KEY = 'portfolio-contact-draft';

export default function Contact() {
  const sectionRef = useRef(null);

  // ── Req 1: Controlled components with useState
  const [form,      setForm]      = useState({ name:'', email:'', message:'' });
  const [errors,    setErrors]    = useState({});
  const [touched,   setTouched]   = useState({});
  const [showToast, setShowToast] = useState(false);
  const [submitting,setSubmitting]= useState(false);
  const [hasSaved,  setHasSaved]  = useState(false);

  // Req 5: Debounced email validation
  const [emailHint, setEmailHint] = useState('');
  const [debEmail,  setDebEmail]  = useState('');

  // ── Req 2: Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const p = JSON.parse(saved);
        if (p.name || p.email || p.message) { setForm(p); setHasSaved(true); }
      }
    } catch {}
  }, []);

  // ── Req 2: Auto-save on every change
  useEffect(() => {
    if (form.name || form.email || form.message) {
      localStorage.setItem(LS_KEY, JSON.stringify(form));
      setHasSaved(true);
    }
  }, [form]);

  // ── Req 5: Debounce email — 400ms timer
  useEffect(() => {
    const t = setTimeout(() => setDebEmail(form.email), 400);
    return () => clearTimeout(t); // cleanup prevents flicker
  }, [form.email]);

  useEffect(() => {
    if (!debEmail) { setEmailHint(''); return; }
    if (!debEmail.includes('@'))       setEmailHint('💡 Tip: Your email needs an @ symbol');
    else if (!EMAIL_REGEX.test(debEmail)) setEmailHint('💡 Tip: Looks incomplete — try user@domain.com');
    else                               setEmailHint('✓ Looks good!');
  }, [debEmail]);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const validate = (data) => {
    const e = {};
    if (!data.name.trim()) e.name = 'Name is required.';
    if (!data.email.trim()) e.email = 'Email is required.';
    else if (!EMAIL_REGEX.test(data.email)) e.email = 'Please enter a valid email address.';
    if (!data.message.trim()) e.message = 'Message is required.';
    else if (data.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
    return e;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm(p => ({ ...p, [field]: value }));
    if (touched[field]) {
      const errs = validate({ ...form, [field]: value });
      setErrors(p => ({ ...p, [field]: errs[field] }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched(p => ({ ...p, [field]: true }));
    setErrors(p => ({ ...p, [field]: validate(form)[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name:true, email:true, message:true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200)); // simulate send
    setSubmitting(false);
    setShowToast(true);
    setForm({ name:'', email:'', message:'' });
    setTouched({}); setErrors({});
    setHasSaved(false); localStorage.removeItem(LS_KEY);
    setTimeout(() => setShowToast(false), 5000);
  };

  const inputStyle = (field) => ({
    width:'100%', padding:'12px 14px 12px 42px', borderRadius:10,
    border:`1.5px solid ${touched[field] && errors[field] ? 'var(--color-error)' : 'var(--color-border)'}`,
    background:'var(--color-bg)', fontFamily:'var(--font-body)', fontSize:15,
    color:'var(--color-text)', outline:'none', transition:'border-color 0.2s',
  });

  return (
    <section ref={sectionRef} id="contact" style={{ padding:'100px 24px', background:'var(--color-bg)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal" style={{ textAlign:'center', marginBottom:64 }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:13, letterSpacing:4, textTransform:'uppercase', color:'var(--color-primary)', fontWeight:600, marginBottom:8 }}>Get in Touch</p>
          <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(36px,6vw,64px)', fontWeight:700, color:'var(--color-text)' }}>Let's Connect</h2>
        </div>

        {/* Bonus hint: unsaved draft */}
        {hasSaved && (
          <div style={{ background:'rgba(37,99,235,0.08)', border:'1px solid var(--color-primary)',
            borderRadius:10, padding:'10px 16px', marginBottom:24,
            display:'flex', alignItems:'center', gap:10,
            fontFamily:'var(--font-body)', fontSize:14, color:'var(--color-primary)',
            animation:'fadeInUp 0.4s ease' }}>
            <AlertCircle size={16} />
            You have unsent message data saved!
            <button onClick={() => { setForm({name:'',email:'',message:''}); setHasSaved(false); localStorage.removeItem(LS_KEY); }}
              style={{ marginLeft:'auto', background:'transparent', border:'none', cursor:'pointer', color:'var(--color-text-muted)', display:'flex', alignItems:'center' }}>
              <X size={14}/>
            </button>
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:40, alignItems:'start' }}>

          {/* ── FORM ── */}
          <div className="reveal-left">
            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, color:'var(--color-text)', marginBottom:6 }}>
                  Name <span style={{ color:'var(--color-error)' }}>*</span>
                </label>
                <div style={{ position:'relative' }}>
                  <User size={16} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--color-text-muted)', pointerEvents:'none' }} />
                  <input type="text" value={form.name} onChange={handleChange('name')} onBlur={handleBlur('name')}
                    placeholder="Your full name" style={inputStyle('name')} />
                </div>
                {touched.name && errors.name && (
                  <p style={{ marginTop:5, fontFamily:'var(--font-body)', fontSize:12, color:'var(--color-error)', display:'flex', alignItems:'center', gap:4, animation:'fadeInUp 0.2s ease' }}>
                    <AlertCircle size={12}/> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, color:'var(--color-text)', marginBottom:6 }}>
                  Email <span style={{ color:'var(--color-error)' }}>*</span>
                </label>
                <div style={{ position:'relative' }}>
                  <AtSign size={16} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--color-text-muted)', pointerEvents:'none' }} />
                  <input type="email" value={form.email} onChange={handleChange('email')} onBlur={handleBlur('email')}
                    placeholder="your@email.com" style={inputStyle('email')} />
                </div>
                {/* Debounced hint (Req 5) */}
                {!errors.email && emailHint && (
                  <p style={{ marginTop:5, fontFamily:'var(--font-body)', fontSize:12, animation:'fadeInUp 0.2s ease',
                    color: emailHint.startsWith('✓') ? 'var(--color-success)' : 'var(--color-primary)' }}>
                    {emailHint}
                  </p>
                )}
                {touched.email && errors.email && (
                  <p style={{ marginTop:5, fontFamily:'var(--font-body)', fontSize:12, color:'var(--color-error)', display:'flex', alignItems:'center', gap:4 }}>
                    <AlertCircle size={12}/> {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div style={{ marginBottom:28 }}>
                <label style={{ display:'block', fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, color:'var(--color-text)', marginBottom:6 }}>
                  Message <span style={{ color:'var(--color-error)' }}>*</span>
                </label>
                <div style={{ position:'relative' }}>
                  <MessageSquare size={16} style={{ position:'absolute', left:14, top:14, color:'var(--color-text-muted)', pointerEvents:'none' }} />
                  <textarea value={form.message} onChange={handleChange('message')} onBlur={handleBlur('message')}
                    placeholder="Tell me about your project or just say hello..." rows={5}
                    style={{ ...inputStyle('message'), paddingTop:12, resize:'vertical' }} />
                </div>
                {touched.message && errors.message && (
                  <p style={{ marginTop:5, fontFamily:'var(--font-body)', fontSize:12, color:'var(--color-error)', display:'flex', alignItems:'center', gap:4 }}>
                    <AlertCircle size={12}/> {errors.message}
                  </p>
                )}
                <div style={{ textAlign:'right', marginTop:4, fontFamily:'var(--font-body)', fontSize:12,
                  color: form.message.length > 500 ? 'var(--color-error)' : 'var(--color-text-muted)' }}>
                  {form.message.length}/500
                </div>
              </div>

              <button type="submit" disabled={submitting}
                style={{ width:'100%', padding:'14px 24px',
                  background: submitting ? 'var(--color-text-muted)' : 'var(--color-primary)',
                  color:'#fff', border:'none', borderRadius:10, fontFamily:'var(--font-body)',
                  fontSize:15, fontWeight:600, cursor: submitting ? 'not-allowed' : 'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                  transition:'all 0.2s', boxShadow:'var(--shadow-md)' }}
                onMouseEnter={e=>{ if(!submitting) e.currentTarget.style.transform='translateY(-1px)'; }}
                onMouseLeave={e=>e.currentTarget.style.transform=''}>
                {submitting ? <span style={{animation:'pulse 1s infinite'}}>Sending...</span> : <><Send size={16}/> Send Message</>}
              </button>
            </form>
          </div>

          {/* ── LIVE PREVIEW (Req 3) ── */}
          <div className="reveal-right">
            <div style={{ background:'var(--color-surface)', borderRadius:'var(--radius-lg)',
              border:'1px solid var(--color-border)', padding:24, boxShadow:'var(--shadow-sm)',
              position:'sticky', top:80 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20, paddingBottom:16, borderBottom:'1px solid var(--color-border)' }}>
                <Eye size={18} style={{ color:'var(--color-primary)' }}/>
                <h3 style={{ fontFamily:'var(--font-heading)', fontSize:22, color:'var(--color-text)' }}>Live Preview</h3>
                <span style={{ marginLeft:'auto', width:8, height:8, borderRadius:'50%', background:'#10B981', animation:'pulse 2s ease infinite' }} />
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:11, fontWeight:600, color:'var(--color-text-muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:4 }}>From</p>
                  <p style={{ fontFamily:'var(--font-heading)', fontSize:20, color: form.name ? 'var(--color-text)' : 'var(--color-border)', minHeight:24, transition:'color 0.2s' }}>
                    {form.name || 'Your name here...'}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:11, fontWeight:600, color:'var(--color-text-muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:4 }}>Email</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:14, color: form.email ? 'var(--color-primary)' : 'var(--color-border)', minHeight:20, transition:'color 0.2s' }}>
                    {form.email || 'your@email.com'}
                  </p>
                </div>
                <div style={{ background:'var(--color-bg-alt)', borderRadius:10, padding:16, borderLeft:'3px solid var(--color-accent)', minHeight:80 }}>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:11, fontWeight:600, color:'var(--color-text-muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>Message Preview</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:14, color: form.message ? 'var(--color-text)' : 'var(--color-border)', lineHeight:1.7, whiteSpace:'pre-wrap', wordBreak:'break-word', transition:'color 0.2s' }}>
                    {form.message || 'Your message will appear here as you type...'}
                  </p>
                </div>

                {/* Completeness progress */}
                <div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--color-text-muted)', marginBottom:8 }}>Completeness</p>
                  <div style={{ display:'flex', gap:6 }}>
                    {['name','email','message'].map(f => (
                      <div key={f} style={{ flex:1, height:4, borderRadius:4,
                        background: form[f].trim() ? 'var(--color-success)' : 'var(--color-border)',
                        transition:'background 0.3s' }} title={f} />
                    ))}
                  </div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:11, color:'var(--color-text-muted)', marginTop:4 }}>
                    {['name','email','message'].filter(f => form[f].trim()).length}/3 fields filled
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div role="alert" style={{ position:'fixed', bottom:32, right:32, background:'var(--color-success)',
          color:'#fff', borderRadius:12, padding:'16px 24px',
          boxShadow:'0 8px 32px rgba(16,185,129,0.3)', display:'flex', alignItems:'center', gap:12,
          zIndex:999, animation:'toastSlide 0.4s cubic-bezier(0.34,1.56,0.64,1)', minWidth:280 }}>
          <CheckCircle size={22}/>
          <div>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:700, fontSize:15, marginBottom:2 }}>Message sent!</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:13, opacity:0.9 }}>Thanks! I'll get back to you soon.</p>
          </div>
          <button onClick={() => setShowToast(false)}
            style={{ marginLeft:'auto', background:'transparent', border:'none', cursor:'pointer', color:'#fff', display:'flex', alignItems:'center' }}>
            <X size={16}/>
          </button>
        </div>
      )}
    </section>
  );
}
