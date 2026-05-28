import { useState, useEffect, useRef } from "react";

const STATS = [
  { value: "5+",   label: "Projects\nCompleted",     icon: "⬡" },
  { value: "100+", label: "DSA Problems\nSolved",     icon: "⬢" },
  { value: "10+",  label: "Technologies\nKnown",      icon: "⬣" },
  { value: "1+",   label: "Years\nExperience",        icon: "◈" },
];

const TECH = [
  { name: "React",      color: "#00B0FF", level: 85 },
  { name: "Node.js",    color: "#76C442", level: 80 },
  { name: "MongoDB",    color: "#00C853", level: 75 },
  { name: "Express",    color: "#a78bfa", level: 78 },
  { name: "JavaScript", color: "#F7DF1E", level: 88 },
  { name: "Tailwind",   color: "#38bdf8", level: 82 },
];

const TIMELINE = [
  {
    year: "2022",
    title: "Started the Journey",
    desc: "Discovered programming through HTML & CSS. Built first static websites and fell in love with making things on the web.",
    tags: ["HTML", "CSS", "Basics"],
    side: "left",
  },
  {
    year: "2023",
    title: "JavaScript & React",
    desc: "Dived deep into JavaScript fundamentals, DOM manipulation, and then React. Built interactive UIs and learned component-based thinking.",
    tags: ["JavaScript", "React", "DOM"],
    side: "right",
  },
  {
    year: "2023",
    title: "Backend & MERN Stack",
    desc: "Learned Node.js, Express, and MongoDB. Connected frontend to backend, built REST APIs, and completed first full-stack projects.",
    tags: ["Node.js", "Express", "MongoDB"],
    side: "left",
  },
  {
    year: "2024",
    title: "DSA & Problem Solving",
    desc: "Started solving Data Structures & Algorithms problems on LeetCode. Improved logical thinking and code efficiency significantly.",
    tags: ["DSA", "LeetCode", "Algorithms"],
    side: "right",
  },
  {
    year: "2025",
    title: "Currently Learning",
    desc: "Exploring TypeScript, Next.js, and system design. Building production-grade applications with focus on scalability and clean architecture.",
    tags: ["TypeScript", "Next.js", "System Design"],
    side: "left",
    current: true,
  },
];

function useInView(threshold = 0.15) {
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

function StatCard({ value, label, icon, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .6s ${delay}s, transform .6s ${delay}s cubic-bezier(.22,1,.36,1)`,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(167,139,250,0.15)",
        borderRadius: 18,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        flex: "1 1 140px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(167,139,250,0.08)";
        e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)";
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(167,139,250,0.15)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ position: "absolute", top: 12, right: 16, fontSize: 28, opacity: 0.08, color: "#a78bfa" }}>{icon}</div>
      <span style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 38, fontWeight: 800, lineHeight: 1,
        background: "linear-gradient(135deg,#a78bfa,#60a5fa)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>{value}</span>
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)", textAlign: "center", lineHeight: 1.6,
        whiteSpace: "pre-line",
      }}>{label}</span>
    </div>
  );
}

function TechBar({ name, color, level, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)", transition: `opacity .5s ${delay}s, transform .5s ${delay}s` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: ".08em" }}>{name}</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color }}>{ level}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 4,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          width: inView ? `${level}%` : "0%",
          transition: `width .9s ${delay + 0.1}s cubic-bezier(.22,1,.36,1)`,
          boxShadow: `0 0 8px ${color}60`,
        }} />
      </div>
    </div>
  );
}

function TimelineItem({ item, idx }) {
  const [ref, inView] = useInView(0.2);
  const isLeft = item.side === "left";

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        position: "relative",
        marginBottom: 48,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity .7s ${idx * 0.12}s, transform .7s ${idx * 0.12}s cubic-bezier(.22,1,.36,1)`,
      }}
    >
      {/* Card */}
      <div style={{
        width: "44%",
        background: item.current ? "rgba(167,139,250,0.08)" : "rgba(255,255,255,0.03)",
        border: item.current ? "1px solid rgba(167,139,250,0.35)" : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: "22px 24px",
        position: "relative",
        boxShadow: item.current ? "0 0 32px rgba(167,139,250,0.1)" : "none",
      }}>
        {/* Year chip */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)",
          borderRadius: 100, padding: "3px 12px", marginBottom: 12,
        }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#a78bfa", letterSpacing: ".12em" }}>{item.year}</span>
          {item.current && (
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 0 2px rgba(34,197,94,.25)" }} />
          )}
        </div>

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#e2e8f0", marginBottom: 10, lineHeight: 1.3 }}>
          {item.title}
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 14 }}>
          {item.desc}
        </p>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          {item.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9.5,
              letterSpacing: ".1em", textTransform: "uppercase",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6, padding: "3px 9px", color: "rgba(255,255,255,0.45)",
            }}>{tag}</span>
          ))}
        </div>

        {/* Connector dot on edge */}
        <div style={{
          position: "absolute", top: 32,
          [isLeft ? "right" : "left"]: -38,
          width: 12, height: 12, borderRadius: "50%",
          background: item.current ? "#a78bfa" : "rgba(167,139,250,0.4)",
          border: "2px solid #0f0e1a",
          boxShadow: item.current ? "0 0 12px #a78bfa80" : "none",
          zIndex: 2,
        }} />
      </div>
    </div>
  );
}

export default function About() {
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes ringPulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.08);opacity:.2} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .about-section {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #0f0e1a;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          position: relative;
          overflow: hidden;
          padding: 100px 0 80px;
        }

        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #a78bfa;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .section-label::before {
          content: '';
          width: 32px; height: 1px;
          background: linear-gradient(to right, #a78bfa, transparent);
        }

        .about-img-frame {
          width: 320px; height: 380px;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(167,139,250,0.2);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.08);
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .about-grid { flex-direction: column !important; }
          .about-img-frame { width: 100% !important; height: 280px !important; }
          .timeline-line { left: 20px !important; }
          .tl-item > div:first-child { width: 80% !important; margin-left: 48px !important; justify-content: flex-start !important; }
        }
      `}</style>

      <section className="about-section">

        {/* Ambient blobs */}
        <div style={{ position:"absolute", top:-80, left:-60, width:400, height:400, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(139,92,246,.08),transparent 70%)" }} />
        <div style={{ position:"absolute", bottom:-60, right:-40, width:320, height:320, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(59,130,246,.07),transparent 70%)" }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 40px" }}>

          {/* ── Section Header ── */}
          <div
            ref={headerRef}
            style={{
              textAlign: "center", marginBottom: 72,
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(28px)",
              transition: "opacity .7s, transform .7s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <div className="section-label" style={{ justifyContent: "center" }}>
              <span style={{ width: 32, height: 1, background: "linear-gradient(to left, #a78bfa, transparent)", display: "inline-block" }} />
              About Me
              <span style={{ width: 32, height: 1, background: "linear-gradient(to right, #a78bfa, transparent)", display: "inline-block" }} />
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px,5vw,60px)", fontWeight: 800, lineHeight: 1.1,
              background: "linear-gradient(135deg,#e2e8f0 0%,#a78bfa 50%,#60a5fa 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "shimmer 5s linear infinite",
            }}>
              The Developer Behind the Code
            </h2>
          </div>

          {/* ── Top: Image + Bio ── */}
          <div className="about-grid" style={{ display: "flex", gap: 64, alignItems: "flex-start", marginBottom: 80 }}>

            {/* Image */}
            <div style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateX(0)" : "translateX(-32px)",
              transition: "opacity .8s .2s, transform .8s .2s cubic-bezier(.22,1,.36,1)",
              animation: "floatSlow 6s ease-in-out infinite",
            }}>
              <div className="about-img-frame">
                {/* Placeholder — replace src with your actual image */}
                <div style={{
                  width: "100%", height: "80%",
                  background: "linear-gradient(145deg,#1e1b4b,#2d1b6e 50%,#1e3a5f)",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 16,
                }}>
                  <div style={{ fontSize: 64, opacity: 0.4 }}>👤</div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: ".18em", color: "rgba(167,139,250,0.5)", textTransform: "uppercase" }}>
                    <img src="/Aman_Profile.jpg" alt="" />
                  </span>
                  {/* To use real image: <img src="/your-photo.jpg" style={{width:"100%",height:"100%",objectFit:"cover"}} /> */}
                </div>
                {/* Corner accent */}
                <div style={{ position: "absolute", top: 0, left: 0, width: 40, height: 40, borderTop: "2px solid #a78bfa", borderLeft: "2px solid #a78bfa", borderRadius: "24px 0 0 0" }} />
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 40, height: 40, borderBottom: "2px solid #60a5fa", borderRight: "2px solid #60a5fa", borderRadius: "0 0 24px 0" }} />
              </div>
            </div>

            {/* Bio */}
            <div style={{
              flex: 1,
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateX(0)" : "translateX(32px)",
              transition: "opacity .8s .3s, transform .8s .3s cubic-bezier(.22,1,.36,1)",
            }}>
              <div className="section-label" style={{ marginBottom: 20 }}>Who I Am</div>

              <p style={{ fontSize: 15.5, lineHeight: 1.85, color: "rgba(255,255,255,0.55)", fontWeight: 300, marginBottom: 20 }}>
                Hi, I'm <span style={{ color: "#a78bfa", fontWeight: 600 }}>Aman Singh</span> — a passionate MERN Stack Developer focused on building fast, scalable, and visually polished web applications. I enjoy turning complex problems into clean, intuitive digital experiences.
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.85, color: "rgba(255,255,255,0.55)", fontWeight: 300, marginBottom: 20 }}>
                Currently pursuing my degree while actively building projects and sharpening my skills in <span style={{ color: "#60a5fa" }}>full-stack development</span>. I'm drawn to the intersection of logic and creativity — where good engineering meets great design.
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.85, color: "rgba(255,255,255,0.55)", fontWeight: 300, marginBottom: 32 }}>
                <span style={{ color: "#22c55e", fontWeight: 500 }}>Currently exploring:</span> TypeScript, Next.js, system design patterns, and advanced DSA. My goal is to join a product-driven team where I can grow as an engineer and ship meaningful work.
              </p>

              {/* Career Goal pill */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: 12, padding: "12px 20px",
              }}>
                <span style={{ fontSize: 16 }}>🎯</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: ".08em" }}>
                  Goal: <span style={{ color: "#22c55e" }}>Land a role as a Full Stack / MERN Developer</span>
                </span>
              </div>

              {/* Tech skill bars */}
              <div style={{ marginTop: 36 }}>
                <div className="section-label" style={{ marginBottom: 20 }}>Tech Proficiency</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {TECH.map((t, i) => (
                    <TechBar key={t.name} {...t} delay={0.4 + i * 0.07} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats Row ── */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 96 }}>
            {STATS.map((s, i) => (
              <StatCard key={s.label} {...s} delay={0.1 + i * 0.1} />
            ))}
          </div>

          {/* ── Timeline ── */}
          <div>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label" style={{ justifyContent: "center" }}>
                <span style={{ width: 24, height: 1, background: "linear-gradient(to left, #a78bfa, transparent)", display: "inline-block" }} />
                Learning Journey
                <span style={{ width: 24, height: 1, background: "linear-gradient(to right, #a78bfa, transparent)", display: "inline-block" }} />
              </div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: ".1em" }}>
                From zero to full-stack — the milestones that shaped me
              </p>
            </div>

            {/* Timeline wrapper */}
            <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
              {/* Center vertical line */}
              <div className="timeline-line" style={{
                position: "absolute", left: "50%", top: 0, bottom: 0,
                width: 1,
                background: "linear-gradient(to bottom, transparent, rgba(167,139,250,0.3) 10%, rgba(167,139,250,0.3) 90%, transparent)",
                transform: "translateX(-50%)",
              }} />

              {TIMELINE.map((item, i) => (
                <TimelineItem key={i} item={item} idx={i} />
              ))}

              {/* End dot */}
              <div style={{
                position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)",
                width: 10, height: 10, borderRadius: "50%",
                background: "rgba(167,139,250,0.3)",
                boxShadow: "0 0 0 4px rgba(167,139,250,0.08)",
              }} />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}