import { useRef, useEffect, useState } from "react";

const SOCIALS = [
  {
    label: "GitHub",
    icon: "⌥",
    href: "https://github.com",
    color: "#e2e8f0",
    desc: "Check my code",
  },
  {
    label: "LinkedIn",
    icon: "in",
    href: "https://linkedin.com",
    color: "#60a5fa",
    desc: "Let's connect",
  },
  {
    label: "Email",
    icon: "✉",
    href: "https://mail.google.com/mail/u/0/#inbox?compose=new",
    color: "#a78bfa",
    desc: "amansinghhdi951@gmail.com",
  },
  {
  label: "WhatsApp",
  icon: "💬",
  href: "https://wa.me/917007281970",
  color: "#34d399",
  desc: "@aman_dev",
}
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function Contact() {
  const [headerRef, headerInView] = useInView(0.1);
  const [formRef,   formInView]   = useInView(0.1);
  const [infoRef,   infoInView]   = useInView(0.1);

  const [form,    setForm]    = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [errors,  setErrors]  = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${errors[field] ? "#f87171" : "rgba(255,255,255,0.1)"}`,
    borderRadius: 12,
    padding: "13px 16px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: "#e2e8f0",
    outline: "none",
    transition: "border-color .2s, background .2s",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes spin     { to { transform: rotate(360deg); } }
        @keyframes checkPop { from{opacity:0;transform:scale(.5)} to{opacity:1;transform:scale(1)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        .contact-input:focus {
          border-color: rgba(167,139,250,0.6) !important;
          background: rgba(167,139,250,0.05) !important;
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.2); }

        .social-card {
          transition: transform .3s cubic-bezier(.34,1.56,.64,1), background .2s, border-color .2s;
        }
        .social-card:hover { transform: translateY(-6px); }
      `}</style>

      <section
        id="contact"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          minHeight: "100vh",
          background: "#0f0e1a",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          padding: "100px 0 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blobs */}
        <div style={{ position:"absolute", top:-80, right:-60, width:420, height:420, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(167,139,250,.08),transparent 70%)" }} />
        <div style={{ position:"absolute", bottom:-60, left:-40, width:320, height:320, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(96,165,250,.07),transparent 70%)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

          {/* Header */}
          <div
            ref={headerRef}
            style={{
              textAlign: "center", marginBottom: 72,
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(28px)",
              transition: "opacity .7s, transform .7s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              fontFamily: "'DM Mono', monospace", fontSize: 10,
              letterSpacing: ".22em", textTransform: "uppercase", color: "#a78bfa",
              marginBottom: 16,
            }}>
              <span style={{ width: 28, height: 1, background: "linear-gradient(to left,#a78bfa,transparent)", display:"inline-block" }} />
              Contact
              <span style={{ width: 28, height: 1, background: "linear-gradient(to right,#a78bfa,transparent)", display:"inline-block" }} />
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(34px,5vw,58px)", fontWeight: 800, lineHeight: 1.1,
              background: "linear-gradient(135deg,#e2e8f0 0%,#a78bfa 50%,#60a5fa 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "shimmer 5s linear infinite",
              marginBottom: 14,
            }}>
              Let's Work Together
            </h2>

            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: 11.5,
              color: "rgba(255,255,255,0.28)", letterSpacing: ".08em",
              maxWidth: 400, margin: "0 auto",
            }}>
              Open for freelance, internships & full-time roles
            </p>
          </div>

          {/* Two column layout */}
          <div style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>

            {/* ── LEFT: Form ── */}
            <div
              ref={formRef}
              style={{
                flex: "1 1 420px",
                opacity: formInView ? 1 : 0,
                transform: formInView ? "translateX(0)" : "translateX(-28px)",
                transition: "opacity .7s .1s, transform .7s .1s cubic-bezier(.22,1,.36,1)",
              }}
            >
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                padding: "36px 32px",
              }}>
                {sent ? (
                  /* Success state */
                  <div style={{ textAlign:"center", padding: "40px 0", animation: "fadeUp .5s ease both" }}>
                    <div style={{
                      width: 72, height: 72, borderRadius: "50%",
                      background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 30, margin: "0 auto 20px",
                      animation: "checkPop .5s cubic-bezier(.34,1.56,.64,1) both",
                    }}>✓</div>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize: 22, color:"#e2e8f0", marginBottom: 10 }}>Message Sent!</h3>
                    <p style={{ fontFamily:"'DM Mono',monospace", fontSize: 11, color:"rgba(255,255,255,0.3)", letterSpacing:".08em" }}>
                      I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }); }}
                      style={{
                        marginTop: 24, fontFamily:"'DM Mono',monospace", fontSize: 11,
                        letterSpacing:".1em", textTransform:"uppercase",
                        color:"#a78bfa", background:"transparent",
                        border:"1px solid rgba(167,139,250,0.3)", borderRadius:50,
                        padding:"10px 22px", cursor:"pointer",
                      }}
                    >
                      Send another ↩
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

                      {/* Name + Email row */}
                      <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                        <div style={{ flex:"1 1 160px" }}>
                          <label style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", display:"block", marginBottom:8 }}>
                            Name *
                          </label>
                          <input
                            className="contact-input"
                            type="text"
                            placeholder="Aman Singh"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            style={inputStyle("name")}
                          />
                          {errors.name && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, color:"#f87171", marginTop:4, display:"block" }}>{errors.name}</span>}
                        </div>
                        <div style={{ flex:"1 1 160px" }}>
                          <label style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", display:"block", marginBottom:8 }}>
                            Email *
                          </label>
                          <input
                            className="contact-input"
                            type="email"
                            placeholder="you@email.com"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            style={inputStyle("email")}
                          />
                          {errors.email && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, color:"#f87171", marginTop:4, display:"block" }}>{errors.email}</span>}
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", display:"block", marginBottom:8 }}>
                          Subject
                        </label>
                        <input
                          className="contact-input"
                          type="text"
                          placeholder="Freelance project / Job opportunity / Just saying hi"
                          value={form.subject}
                          onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                          style={inputStyle("subject")}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", display:"block", marginBottom:8 }}>
                          Message *
                        </label>
                        <textarea
                          className="contact-input"
                          rows={5}
                          placeholder="Tell me about your project or opportunity..."
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          style={{ ...inputStyle("message"), resize:"vertical", minHeight:120 }}
                        />
                        {errors.message && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, color:"#f87171", marginTop:4, display:"block" }}>{errors.message}</span>}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={sending}
                        style={{
                          width:"100%", padding:"15px",
                          borderRadius:12, border:"none", cursor: sending ? "not-allowed" : "pointer",
                          fontFamily:"'DM Mono',monospace", fontSize:12,
                          letterSpacing:".14em", textTransform:"uppercase",
                          fontWeight:600,
                          background: sending ? "rgba(167,139,250,0.4)" : "linear-gradient(135deg,#7c3aed,#a78bfa)",
                          color: sending ? "rgba(255,255,255,0.5)" : "#fff",
                          boxShadow: sending ? "none" : "0 8px 24px rgba(124,58,237,.35)",
                          transition:"all .25s",
                          display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                        }}
                        onMouseEnter={e => { if (!sending) e.currentTarget.style.transform="translateY(-2px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; }}
                      >
                        {sending ? (
                          <>
                            <span style={{ width:14, height:14, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" }} />
                            Sending...
                          </>
                        ) : (
                          <>Send Message ↗</>
                        )}
                      </button>

                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* ── RIGHT: Info ── */}
            <div
              ref={infoRef}
              style={{
                flex: "1 1 280px",
                display:"flex", flexDirection:"column", gap:28,
                opacity: infoInView ? 1 : 0,
                transform: infoInView ? "translateX(0)" : "translateX(28px)",
                transition: "opacity .7s .2s, transform .7s .2s cubic-bezier(.22,1,.36,1)",
              }}
            >
              {/* Availability card */}
              <div style={{
                background:"rgba(52,211,153,0.05)",
                border:"1px solid rgba(52,211,153,0.2)",
                borderRadius:18, padding:"22px 24px",
                display:"flex", alignItems:"center", gap:14,
              }}>
                <div style={{
                  width:42, height:42, borderRadius:12,
                  background:"rgba(52,211,153,0.1)", border:"1px solid rgba(52,211,153,0.25)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0,
                }}>
                  🟢
                </div>
                <div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, color:"#e2e8f0", marginBottom:4 }}>
                    Available for Hire
                  </div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(52,211,153,0.8)", letterSpacing:".08em" }}>
                    Response within 24 hours
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", marginBottom:16 }}>
                  Find me on
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {SOCIALS.map(({ label, icon, href, color, desc }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="social-card"
                      style={{
                        display:"flex", alignItems:"center", gap:14,
                        background:"rgba(255,255,255,0.03)",
                        border:"1px solid rgba(255,255,255,0.07)",
                        borderRadius:14, padding:"14px 16px",
                        textDecoration:"none",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background=`${color}10`; e.currentTarget.style.borderColor=`${color}30`; }}
                      onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}
                    >
                      <div style={{
                        width:36, height:36, borderRadius:10,
                        background:`${color}15`, border:`1px solid ${color}30`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:14, color, fontFamily:"'DM Mono',monospace", fontWeight:700,
                        flexShrink:0,
                      }}>
                        {icon}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:500, color:"rgba(255,255,255,0.7)" }}>{label}</div>
                        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.25)", letterSpacing:".06em", marginTop:2 }}>{desc}</div>
                      </div>
                      <span style={{ color:"rgba(255,255,255,0.2)", fontSize:14 }}>↗</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quote card */}
              <div style={{
                background:"rgba(167,139,250,0.05)",
                border:"1px solid rgba(167,139,250,0.15)",
                borderRadius:18, padding:"22px 24px",
                position:"relative",
              }}>
                <div style={{ fontSize:32, color:"#a78bfa", opacity:0.3, lineHeight:1, marginBottom:8, fontFamily:"Georgia,serif" }}>"</div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13.5, lineHeight:1.75, color:"rgba(255,255,255,0.4)", fontStyle:"italic", fontWeight:300 }}>
                  I don't just write code — I craft experiences. Every project is a chance to learn, grow, and build something meaningful.
                </p>
                <div style={{ marginTop:14, fontFamily:"'DM Mono',monospace", fontSize:10, color:"#a78bfa", letterSpacing:".1em" }}>
                  — Aman Singh
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}