import { useRef, useEffect, useState } from "react";

const SKILLS = [
  {
    category: "Frontend",
    icon: "⬡",
    color: "#60a5fa",
    items: [
      { name: "HTML",         level: 90 },
      { name: "CSS",          level: 85 },
      { name: "JavaScript",   level: 88 },
      { name: "React",        level: 85 },
      { name: "Redux Toolkit",level: 75 },
      { name: "Tailwind",     level: 82 },
    ],
  },
  {
    category: "Backend",
    icon: "⬢",
    color: "#34d399",
    items: [
      { name: "Node.js",   level: 80 },
      { name: "Express.js",level: 78 },
    ],
  },
  {
    category: "Database",
    icon: "◈",
    color: "#00C853",
    items: [
      { name: "MongoDB", level: 90 },
      { name: "MySQL", level: 80 },
    ],
  },
  {
    category: "Tools",
    icon: "⬣",
    color: "#f59e0b",
    items: [
      { name: "Git",     level: 80 },
      { name: "GitHub",  level: 82 },
      { name: "Postman", level: 70 },
      { name: "VS Code", level: 90 },
    ],
  },
  {
    category: "DSA",
    icon: "◇",
    color: "#a78bfa",
    items: [
      { name: "Arrays",       level: 75 },
      { name: "Linked Lists", level: 65 },
      { name: "Recursion",    level: 68 },
      { name: "Sorting",    level: 80 },
      { name: "Searching",    level: 90 },
      { name: "Map",    level: 70 },
      { name: "Set",    level: 80 },
    ],
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

function SkillBar({ name, level, color, delay }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0)" : "translateX(-16px)",
      transition: `opacity .5s ${delay}s, transform .5s ${delay}s`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>
          {name}
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color, letterSpacing: ".06em" }}>
          {level}%
        </span>
      </div>
      <div style={{ height: 3, borderRadius: 4, background: "rgba(255,255,255,0.06)" }}>
        <div style={{
          height: "100%", borderRadius: 4,
          background: `linear-gradient(90deg, ${color}66, ${color})`,
          width: inView ? `${level}%` : "0%",
          transition: `width 1s ${delay + 0.1}s cubic-bezier(.22,1,.36,1)`,
          boxShadow: `0 0 6px ${color}50`,
        }} />
      </div>
    </div>
  );
}

function CategoryCard({ category, icon, color, items, cardDelay }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${color}22`,
        borderRadius: 20,
        padding: "28px 28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .6s ${cardDelay}s, transform .6s ${cardDelay}s cubic-bezier(.22,1,.36,1)`,
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}55`; e.currentTarget.style.background = `${color}08`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}22`; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
    >
      {/* bg icon watermark */}
      <div style={{ position: "absolute", top: 12, right: 16, fontSize: 48, color, opacity: 0.05, lineHeight: 1 }}>
        {icon}
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: `${color}18`, border: `1px solid ${color}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, color,
        }}>
          {icon}
        </div>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 17, fontWeight: 700, color: "#e2e8f0",
        }}>
          {category}
        </span>
        <span style={{
          marginLeft: "auto",
          fontFamily: "'DM Mono', monospace",
          fontSize: 9.5, letterSpacing: ".12em",
          color: "rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 6, padding: "2px 8px",
        }}>
          {items.length} skills
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: `linear-gradient(to right, ${color}30, transparent)` }} />

      {/* Skill bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((item, i) => (
          <SkillBar key={item.name} {...item} color={color} delay={cardDelay + 0.05 + i * 0.06} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
      `}</style>

      <section
        id="skills"
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
        {/* Ambient blobs */}
        <div style={{ position:"absolute", top:-80, right:-60, width:400, height:400, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(96,165,250,.07),transparent 70%)" }} />
        <div style={{ position:"absolute", bottom:-60, left:-40, width:320, height:320, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(167,139,250,.07),transparent 70%)" }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 40px" }}>

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
              <span style={{ width: 28, height: 1, background: "linear-gradient(to left,#a78bfa,transparent)", display: "inline-block" }} />
              Skills
              <span style={{ width: 28, height: 1, background: "linear-gradient(to right,#a78bfa,transparent)", display: "inline-block" }} />
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
              Tools of My Trade
            </h2>

            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: 11.5,
              color: "rgba(255,255,255,0.28)", letterSpacing: ".08em", maxWidth: 420, margin: "0 auto",
            }}>
              Technologies I work with across the full stack
            </p>
          </div>

          {/* Cards grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}>
            {SKILLS.map((cat, i) => (
              <CategoryCard key={cat.category} {...cat} cardDelay={0.1 + i * 0.1} />
            ))}
          </div>

          {/* Bottom note */}
          <div style={{
            textAlign: "center", marginTop: 64,
            opacity: headerInView ? 1 : 0,
            transition: "opacity 1s 0.8s",
          }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: 10.5,
              color: "rgba(255,255,255,0.18)", letterSpacing: ".14em",
            }}>
              + always learning new technologies
            </span>
          </div>

        </div>
      </section>
    </>
  );
}