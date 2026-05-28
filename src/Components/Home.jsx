import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ROLES = [
  "Full Stack Developer",
  "MERN Stack Engineer",
  "React Specialist",
  "Node.js Developer",
];

const STACK = [
  { letter: "M", full: "MongoDB",  accent: "#00C853" },
  { letter: "E", full: "Express",  accent: "#607D8B" },
  { letter: "R", full: "React",    accent: "#00B0FF" },
  { letter: "N", full: "Node.js",  accent: "#76C442" },
];

const STATS = [
  { value: "1+",   label: "Years Exp"    },
  { value: "5+",   label: "Projects"     },
  { value: "5+",   label: "Technologies" },
  { value: "100%", label: "Dedication"   },
];

const TICKER = [
  "React","Redux","Node.js","MongoDB","Express","HTML","CSS",
  "REST APIs","Git","GitHub","Tailwind CSS","JavaScript","Full Stack",
];

/* ─── CSS-only Avatar ─── */
function Avatar() {
  return (
    <div style={{
      width:260, height:260, borderRadius:"50%",
      background:"linear-gradient(145deg,#1e1b4b,#2d1b6e 40%,#1e3a5f)",
      display:"flex", alignItems:"flex-end", justifyContent:"center",
      overflow:"hidden", position:"relative",
      border:"3px solid rgba(167,139,250,0.3)",
      boxShadow:"0 20px 60px rgba(139,92,246,.2),0 4px 16px rgba(0,0,0,.3)",
    }}>
      {/* Head */}
      <div style={{
        position:"absolute", top:52, left:"50%", transform:"translateX(-50%)",
        width:88, height:88, borderRadius:"50%", background:"#FFDBB5",
        boxShadow:"0 4px 12px rgba(0,0,0,.2)",
      }}>
        <div style={{ position:"absolute", top:-6, left:-4, right:-4, height:48, borderRadius:"50% 50% 0 0", background:"#1a1a2e" }} />
        <div style={{ position:"absolute", top:36, left:20,  width:10, height:10, borderRadius:"50%", background:"#1a1a2e" }} />
        <div style={{ position:"absolute", top:36, right:20, width:10, height:10, borderRadius:"50%", background:"#1a1a2e" }} />
        <div style={{
          position:"absolute", bottom:18, left:"50%", transform:"translateX(-50%)",
          width:28, height:14, borderRadius:"0 0 20px 20px",
          borderBottom:"2.5px solid #c0764a", borderLeft:"2.5px solid #c0764a", borderRight:"2.5px solid #c0764a",
        }} />
      </div>
      {/* Neck */}
      <div style={{ position:"absolute", top:134, left:"50%", transform:"translateX(-50%)", width:32, height:24, background:"#FFDBB5" }} />
      {/* Body */}
      <div style={{
        position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
        width:160, height:110, borderRadius:"60px 60px 0 0",
        background:"linear-gradient(160deg,#3730a3,#4f46e5 60%,#7c3aed)",
        display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:18,
      }}>
        <div style={{ width:0, height:0, borderLeft:"18px solid #fff", borderRight:"18px solid #fff", borderTop:"22px solid transparent" }} />
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:12, height:55, background:"#f59e0b", borderRadius:"0 0 4px 4px" }} />
      </div>
    </div>
  );
}

/* ─── Home ─── */
export default function Home() {
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [vis,       setVis]       = useState(false);
  const [mernVis,   setMernVis]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setVis(true),    100);
    setTimeout(() => setMernVis(true), 900);
  }, []);

  useEffect(() => {
    const cur = ROLES[roleIdx];
    let t;
    if (!deleting && displayed.length < cur.length)
      t = setTimeout(() => setDisplayed(cur.slice(0, displayed.length + 1)), 68);
    else if (!deleting && displayed.length === cur.length)
      t = setTimeout(() => setDeleting(true), 2400);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(cur.slice(0, displayed.length - 1)), 40);
    else { setDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeRgt  { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes popIn    { from{opacity:0;transform:scale(.75) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes statPop  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes ticker   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spinSlow { to{transform:rotate(360deg)} }
        @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes ringPulse{ 0%,100%{transform:scale(1);opacity:.4} 50%{transform:scale(1.06);opacity:.2} }
        @keyframes badgePop { from{opacity:0;transform:scale(.7)} to{opacity:1;transform:scale(1)} }

        .fu  { opacity:0; animation:fadeUp  .7s cubic-bezier(.22,1,.36,1) forwards; }
        .fr  { opacity:0; animation:fadeRgt .7s cubic-bezier(.22,1,.36,1) forwards; }
        .pi  { opacity:0; animation:popIn   .55s cubic-bezier(.34,1.56,.64,1) forwards; }
        .sp  { opacity:0; animation:statPop .5s  cubic-bezier(.34,1.56,.64,1) forwards; }
        .bp  { opacity:0; animation:badgePop .5s cubic-bezier(.34,1.56,.64,1) forwards; }

        .caret { animation:blink 1.1s step-start infinite; }
        .avatar-wrap { animation:floatBob 5s ease-in-out infinite; }
        .orbit { animation:spinSlow 18s linear infinite; }
        .ring  { animation:ringPulse 3s ease-in-out infinite; }

        .name-gradient {
          background: linear-gradient(135deg, #e2e8f0 0%, #a78bfa 45%, #60a5fa 100%);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 4s linear infinite;
        }

        .mern-tile { transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s; cursor:default; }
        .mern-tile:hover { transform:translateY(-8px) scale(1.07); }

        .stat-card {
          display:flex; flex-direction:column; align-items:center;
          padding:18px 20px; border-radius:14px;
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.08);
          box-shadow:0 2px 12px rgba(0,0,0,.2); min-width:105px;
          transition:transform .25s,box-shadow .25s;
        }
        .stat-card:hover { transform:translateY(-4px); box-shadow:0 8px 28px rgba(139,92,246,.15); }

        .cta-primary {
          padding:14px 32px; border-radius:10px; border:none; cursor:pointer;
          font-size:13px; font-weight:600; letter-spacing:.08em; text-transform:uppercase;
          font-family:inherit; color:#fff;
          background:linear-gradient(135deg,#7c3aed,#6366f1);
          box-shadow:0 8px 24px rgba(124,58,237,.4);
          transition:all .25s;
        }
        .cta-primary:hover { transform:translateY(-2px); box-shadow:0 14px 32px rgba(124,58,237,.5); }
        .cta-primary:active { transform:scale(.97); }

        .cta-secondary {
          padding:13px 32px; border-radius:10px; cursor:pointer;
          font-size:13px; font-weight:500; letter-spacing:.08em; text-transform:uppercase;
          font-family:inherit; color:#a78bfa;
          background:transparent; border:1.5px solid rgba(167,139,250,0.3);
          transition:all .25s;
        }
        .cta-secondary:hover { background:rgba(167,139,250,0.08); border-color:rgba(167,139,250,0.6); transform:translateY(-2px); }
        .cta-secondary:active { transform:scale(.97); }

        .float-badge {
          position:absolute; border-radius:12px; padding:9px 15px;
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.1);
          box-shadow:0 8px 24px rgba(0,0,0,.3);
          font-family:'DM Mono',monospace; white-space:nowrap;
          backdrop-filter: blur(8px);
        }

        @media (max-width:900px) {
          .hero-grid { flex-direction:column-reverse !important; align-items:center !important; }
          .hero-left  { align-items:center !important; text-align:center !important; }
          .stats-row  { justify-content:center !important; }
          .mern-row   { justify-content:center !important; }
          .cta-row    { justify-content:center !important; }
          .float-badge { display:none !important; }
        }
      `}</style>

      {/* ── dark grid bg ── */}
      <div style={{
        fontFamily:"'DM Sans',sans-serif",
        minHeight:"100vh", position:"relative", overflow:"hidden",
        background:"#0f0e1a",
        backgroundImage:`
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize:"40px 40px",
      }}>

        {/* Ambient blobs */}
        <div style={{ position:"fixed", top:-120, right:-80, width:500, height:500, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(139,92,246,.12),transparent 70%)" }} />
        <div style={{ position:"fixed", bottom:-100, left:-80, width:400, height:400, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(59,130,246,.08),transparent 70%)" }} />

        {/* ── Hero ── */}
        <section style={{ position:"relative", zIndex:1, maxWidth:1200, margin:"0 auto", padding:"130px 32px 80px" }}>
          <div className="hero-grid" style={{ display:"flex", alignItems:"center", gap:72 }}>

            {/* ══ LEFT ══ */}
            <div className="hero-left" style={{ flex:1, display:"flex", flexDirection:"column", gap:26 }}>

              {/* Eyebrow badge */}
              {vis && (
                <div className="fu" style={{ animationDelay:".05s" }}>
                  <span style={{
                    display:"inline-flex", alignItems:"center", gap:9,
                    padding:"6px 16px", borderRadius:100,
                    background:"rgba(167,139,250,0.1)", border:"1px solid rgba(167,139,250,0.25)",
                    fontFamily:"'DM Mono',monospace", fontSize:10.5,
                    fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"#a78bfa",
                  }}>
                    <span style={{
                      width:7, height:7, borderRadius:"50%", background:"#22c55e",
                      boxShadow:"0 0 0 3px rgba(34,197,94,.25)",
                      animation:"ringPulse 2s ease-in-out infinite",
                    }} />
                    Available for new opportunities
                  </span>
                </div>
              )}

              {/* Name */}
              {vis && (
                <div className="fu" style={{ animationDelay:".18s" }}>
                  <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(46px,6vw,82px)", lineHeight:1.07, fontWeight:800 }}>
                    <span className="name-gradient">Aman Singh</span>
                  </h1>
                </div>
              )}

              {/* Typewriter */}
              {vis && (
                <div className="fu" style={{ animationDelay:".3s", display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:4, height:26, borderRadius:2, background:"linear-gradient(to bottom,#7c3aed,#a78bfa)", flexShrink:0 }} />
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:15, color:"rgba(255,255,255,0.5)", fontWeight:500 }}>{displayed}</span>
                  <span className="caret" style={{ width:2, height:18, background:"#a78bfa", borderRadius:1, display:"inline-block" }} />
                </div>
              )}

              {/* Bio */}
              {vis && (
                <p className="fu" style={{ animationDelay:".42s", fontSize:15.5, lineHeight:1.78, color:"rgba(255,255,255,0.4)", maxWidth:480, fontWeight:300 }}>
                  Enthusiastic MERN Stack Developer with hands-on experience building
                  dynamic, scalable web applications using React, Node.js, Express &amp;
                  MongoDB — focused on clean architecture, performance, and exceptional UX.
                </p>
              )}

              {/* MERN Stack */}
              {vis && (
                <div className="fu" style={{ animationDelay:".55s" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)" }}>Tech Stack</span>
                    <div style={{ height:1, flex:1, background:"linear-gradient(to right,rgba(255,255,255,0.1),transparent)" }} />
                  </div>
                  <div className="mern-row" style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                    {STACK.map(({ letter, full, accent }, i) => (
                      <div
                        key={letter}
                        className={`mern-tile${mernVis ? " pi" : ""}`}
                        style={{
                          animationDelay:`${i * .1}s`,
                          width:78, height:78, borderRadius:16,
                          background:"rgba(255,255,255,0.04)", border:`1.5px solid ${accent}40`,
                          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5,
                          boxShadow:`0 4px 18px ${accent}20`,
                        }}
                      >
                        <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:28, color:accent, lineHeight:1 }}>{letter}</span>
                        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:8.5, color:"rgba(255,255,255,0.3)", letterSpacing:".1em", textTransform:"uppercase" }}>{full}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              {vis && (
                <div className="fu cta-row" style={{ animationDelay:".85s", display:"flex", gap:14, flexWrap:"wrap" }}>
                  <button
                    className="cta-primary"
                    onClick={() => {
                      document
                        .getElementById("projects")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    View Projects →
                  </button>
                  <button className="cta-secondary"
                    onClick={() => window.open("/Aman Resume.pdf")}
                    >
                     Download CV ↓
                  </button>
                </div>
              )}
            </div>

            {/* ══ RIGHT ══ */}
            {vis && (
              <div className="fr" style={{ animationDelay:".25s", display:"flex", flexDirection:"column", alignItems:"center", gap:28, flexShrink:0 }}>

                <div style={{ position:"relative" }}>
                  {/* Orbit ring */}
                  <div className="orbit" style={{ position:"absolute", inset:-18, borderRadius:"50%", border:"1.5px dashed rgba(167,139,250,0.3)" }} />
                  {/* Glow ring */}
                  <div className="ring" style={{ position:"absolute", inset:-4, borderRadius:"50%", background:"linear-gradient(135deg,rgba(124,58,237,0.2),rgba(99,102,241,0.15),rgba(59,130,246,0.1))" }} />

                  <div className="avatar-wrap" style={{ position:"relative", zIndex:2 }}>
                    <Avatar />
                  </div>

                  {/* Badge — top right */}
                  <div
                    className="float-badge bp"
                    style={{
                      top:18, right:-58, animationDelay:".9s",
                      fontSize:11, color:"#a78bfa", fontWeight:500,
                      animation:"floatBob 4s ease-in-out infinite",
                      animationDelay:".5s",
                    }}
                  >
                    &lt;/&gt; Clean Code
                  </div>

                  {/* Badge — bottom left */}
                  <div
                    className="bp"
                    style={{
                      position:"absolute", bottom:28, left:-62,
                      borderRadius:12, padding:"11px 18px",
                      background:"linear-gradient(135deg,#7c3aed,#6366f1)",
                      boxShadow:"0 8px 24px rgba(124,58,237,.4)",
                      animation:"floatBob 5s ease-in-out infinite",
                      animationDelay:"1s",
                    }}
                  >
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:800, color:"#fff", lineHeight:1 }}>1+</div>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"rgba(255,255,255,.7)", letterSpacing:".1em", textTransform:"uppercase", marginTop:3 }}>yrs exp</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="stats-row" style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
                  {STATS.map(({ value, label }, i) => (
                    <div key={label} className={`stat-card${vis ? " sp" : ""}`} style={{ animationDelay:`${.7 + i * .1}s` }}>
                      <span style={{
                        fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:800,
                        background:"linear-gradient(135deg,#a78bfa,#60a5fa)",
                        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                      }}>{value}</span>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, color:"rgba(255,255,255,0.35)", fontWeight:500, letterSpacing:".07em", textTransform:"uppercase", marginTop:3, textAlign:"center" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Ticker ── */}
        <div style={{ overflow:"hidden", borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)", background:"rgba(255,255,255,0.02)", padding:"14px 0" }}>
          <div style={{ display:"flex", gap:48, width:"max-content", animation:"ticker 20s linear infinite" }}>
            {[...Array(2)].map((_, r) =>
              TICKER.map(t => (
                <span key={r + t} style={{
                  fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:".18em",
                  textTransform:"uppercase", color:"rgba(255,255,255,0.25)", whiteSpace:"nowrap",
                  display:"flex", alignItems:"center", gap:20,
                }}>
                  {t}<span style={{ color:"rgba(167,139,250,0.4)", fontSize:8 }}>◆</span>
                </span>
              ))
            )}
          </div>
        </div>

      </div>
    </>
  );
}