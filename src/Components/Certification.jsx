import { useRef, useEffect, useState } from "react";

const CERTIFICATIONS = [
  {
    title: "MERN Full-stack Developer",
    issuer: "Apna College",
    color: "#a78bfa",
    icon: "🎓",
    link: "https://drive.google.com/file/d/1iz5bOdAg37iJiZOE3EuiDXcAiqa29BKi/view?usp=drive_link",
    tags: ["HTML", "CSS", "JavaScript", "React", "Node.js","MongoDB","Express.js","Bootstrap","Tailwindcss"],
  },
  {
    title: "Alpha DSA with Java",
    issuer: "Apna College",
    color: "#60a5fa",
    icon: "📝",
    link: "#",
    tags: ["JAva","Data Structure and Algorithms"],
  },
  {
  title: "Developer and Technology Job Simulation",
  issuer: "Accenture",
  color: "#34d399",
  icon:   "💼",
  link: "https://drive.google.com/drive/u/0/home",
  tags: ["SDLC Life cycle", "DBMS", "Technologies"],
},
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    color: "#f59e0b",
    icon: "🏅",
    link: "#",
    tags: ["DSA", "JavaScript", "Algorithms"],
  },
];

const ACHIEVEMENTS = [
  // {
  //   title: "100+ DSA Problems Solved",
  //   desc: "Solved over 100 problems on LeetCode covering arrays, strings, linked lists, and recursion.",
  //   icon: "⚡",
  //   color: "#f59e0b",
  //   stat: "100+",
  //   statLabel: "Problems",
  // },
  {
    title: "5+ Full Stack Projects",
    desc: "Built and deployed multiple production-grade MERN stack applications from scratch.",
    icon: "🚀",
    color: "#60a5fa",
    stat: "5+",
    statLabel: "Projects",
  },
  {
    title: "Open Source Contributor",
    desc: "Contributed to open source repositories on GitHub with bug fixes and feature additions.",
    icon: "🌐",
    color: "#34d399",
    stat: "3+",
    statLabel: "Contributions",
  },
  {
    title: "Self-Taught Full Stack Dev",
    desc: "Learned full stack development independently through structured online resources and hands-on building.",
    icon: "🧠",
    color: "#a78bfa",
    stat: "1+",
    statLabel: "Year Journey",
  },
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

function CertCard({ cert, delay }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const { title, issuer, date, color, icon, credentialId, link, tags } = cert;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${color}08` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? color + "44" : color + "1a"}`,
        borderRadius: 20,
        padding: "26px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        position: "relative",
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .6s ${delay}s, transform .6s ${delay}s cubic-bezier(.22,1,.36,1), background .3s, border-color .3s`,
        boxShadow: hovered ? `0 12px 40px ${color}10` : "none",
        cursor: "default",
      }}
    >
      {/* Watermark */}
      <div style={{ position:"absolute", bottom:-10, right:10, fontSize:72, opacity:0.04, lineHeight:1, pointerEvents:"none" }}>
        {icon}
      </div>

      {/* Top */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{
            width:44, height:44, borderRadius:14,
            background:`${color}15`, border:`1px solid ${color}30`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:20, flexShrink:0,
          }}>
            {icon}
          </div>
          <div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color, marginBottom:4 }}>
              {issuer}
            </div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:15.5, fontWeight:700, color:"#e2e8f0", lineHeight:1.3 }}>
              {title}
            </h3>
          </div>
        </div>

        {/* Verify link */}
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          style={{
            width:34, height:34, borderRadius:10, flexShrink:0,
            background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"rgba(255,255,255,0.4)", fontSize:14, textDecoration:"none",
            transition:"all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background=`${color}20`; e.currentTarget.style.color=color; e.currentTarget.style.borderColor=`${color}40`; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }}
          title="Verify Certificate"
        >
          ↗
        </a>
      </div>

      {/* Divider */}
      <div style={{ height:1, background:`linear-gradient(to right,${color}25,transparent)` }} />

      {/* Credential + Date */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <span style={{ fontSize:10 }}></span>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, color:"rgba(255,255,255,0.25)", letterSpacing:".06em" }}>
             {credentialId}
          </span>
        </div>
        <span style={{
          fontFamily:"'DM Mono',monospace", fontSize:9.5,
          background:`${color}15`, border:`1px solid ${color}25`,
          borderRadius:6, padding:"3px 10px",
          color: hovered ? color : "rgba(255,255,255,0.35)",
          transition:"color .3s",
          letterSpacing:".06em",
        }}>
          {date}
        </span>
      </div>

      {/* Tags */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontFamily:"'DM Mono',monospace", fontSize:9.5,
            letterSpacing:".1em", textTransform:"uppercase",
            background:`${color}10`, border:`1px solid ${color}22`,
            borderRadius:6, padding:"3px 9px",
            color: hovered ? color : "rgba(255,255,255,0.35)",
            transition:"color .3s",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function AchievementCard({ item, delay }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const { title, desc, icon, color, stat, statLabel } = item;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${color}08` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? color + "40" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 18,
        padding: "24px 22px",
        display: "flex",
        gap: 18,
        alignItems: "flex-start",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .6s ${delay}s, transform .6s ${delay}s cubic-bezier(.22,1,.36,1), background .3s, border-color .3s`,
        cursor: "default",
      }}
    >
      {/* Stat */}
      <div style={{
        display:"flex", flexDirection:"column", alignItems:"center",
        background:`${color}12`, border:`1px solid ${color}25`,
        borderRadius:14, padding:"14px 16px", flexShrink:0, minWidth:68,
        transition:"background .3s",
      }}>
        <span style={{ fontSize:20, lineHeight:1, marginBottom:6 }}>{icon}</span>
        <span style={{
          fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:800, lineHeight:1,
          background:`linear-gradient(135deg,${color},${color}99)`,
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        }}>{stat}</span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:8.5, color:"rgba(255,255,255,0.3)", letterSpacing:".08em", textTransform:"uppercase", marginTop:3, textAlign:"center" }}>
          {statLabel}
        </span>
      </div>

      {/* Text */}
      <div>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:"#e2e8f0", marginBottom:8, lineHeight:1.3 }}>
          {title}
        </h3>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, lineHeight:1.75, color:"rgba(255,255,255,0.38)", fontWeight:300 }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function Achievements() {
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
      `}</style>

      <section
        id="achievements"
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
        <div style={{ position:"absolute", top:-80, right:-60, width:400, height:400, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(167,139,250,.08),transparent 70%)" }} />
        <div style={{ position:"absolute", bottom:-60, left:-40, width:320, height:320, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(96,165,250,.07),transparent 70%)" }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 40px" }}>

          {/* Header */}
          <div
            ref={headerRef}
            style={{
              textAlign:"center", marginBottom:72,
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(28px)",
              transition: "opacity .7s, transform .7s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <div style={{
              display:"inline-flex", alignItems:"center", gap:12,
              fontFamily:"'DM Mono',monospace", fontSize:10,
              letterSpacing:".22em", textTransform:"uppercase", color:"#a78bfa",
              marginBottom:16,
            }}>
              <span style={{ width:28, height:1, background:"linear-gradient(to left,#a78bfa,transparent)", display:"inline-block" }} />
              Achievements & Certifications
              <span style={{ width:28, height:1, background:"linear-gradient(to right,#a78bfa,transparent)", display:"inline-block" }} />
            </div>

            <h2 style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(34px,5vw,58px)", fontWeight:800, lineHeight:1.1,
              background:"linear-gradient(135deg,#e2e8f0 0%,#a78bfa 50%,#60a5fa 100%)",
              backgroundSize:"200% auto",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              animation:"shimmer 5s linear infinite",
              marginBottom:14,
            }}>
              Earned & Accomplished
            </h2>

            <p style={{
              fontFamily:"'DM Mono',monospace", fontSize:11.5,
              color:"rgba(255,255,255,0.28)", letterSpacing:".08em",
              maxWidth:440, margin:"0 auto",
            }}>
              Certifications I've earned and milestones I've hit along the journey
            </p>
          </div>

          {/* ── Certifications ── */}
          <div style={{ marginBottom:72 }}>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32 }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)" }}>
                Certifications
              </span>
              <div style={{ flex:1, height:1, background:"linear-gradient(to right,rgba(255,255,255,0.08),transparent)" }} />
              <span style={{
                fontFamily:"'DM Mono',monospace", fontSize:9.5,
                background:"rgba(167,139,250,0.1)", border:"1px solid rgba(167,139,250,0.2)",
                borderRadius:50, padding:"3px 12px", color:"#a78bfa", letterSpacing:".08em",
              }}>
                {CERTIFICATIONS.length} certificates
              </span>
            </div>

            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",
              gap:20,
            }}>
              {CERTIFICATIONS.map((cert, i) => (
                <CertCard key={cert.title} cert={cert} delay={0.1 + i * 0.1} />
              ))}
            </div>
          </div>

          {/* ── Achievements ── */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32 }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)" }}>
                Achievements
              </span>
              <div style={{ flex:1, height:1, background:"linear-gradient(to right,rgba(255,255,255,0.08),transparent)" }} />
              <span style={{
                fontFamily:"'DM Mono',monospace", fontSize:9.5,
                background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.2)",
                borderRadius:50, padding:"3px 12px", color:"#f59e0b", letterSpacing:".08em",
              }}>
                {ACHIEVEMENTS.length} milestones
              </span>
            </div>

            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))",
              gap:18,
            }}>
              {ACHIEVEMENTS.map((item, i) => (
                <AchievementCard key={item.title} item={item} delay={0.1 + i * 0.1} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}