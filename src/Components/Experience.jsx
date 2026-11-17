import { useRef, useEffect, useState } from "react";
import trainxLogo from "../assets/TrainX.png"; // extension apni file ke hisaab se badlo (.png / .jpg / .svg / .webp)

const EXPERIENCE = [
  {
    role: "Software Developer and Facilitator",
    company: "TrainX",
    type: "Full-time",
    duration: "July 2026 — Present",
    status: "Present",
    color: "#a78bfa",
    icon: "💼",
    logo: trainxLogo,
    desc: "Building full-stack web applications with the MERN stack while facilitating technical training sessions for B.Tech students.",
    highlights: [
      "Developing and maintaining full-stack web applications using MongoDB, Express.js, React.js, and Node.js",
      "Designing and implementing RESTful APIs, managing databases, and integrating frontend with backend",
      "Building responsive, user-friendly interfaces while ensuring application performance and scalability",
      "Facilitating technical training sessions for B.Tech students covering web development, JavaScript, React.js, and Node.js",
      "Guiding 300+ students through hands-on coding assignments, project development, debugging, and problem-solving",
    ],
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "JavaScript", "Mentoring"],
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
  }, [threshold]);
  return [ref, inView];
}

function ExperienceCard({ exp, index }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const { role, company, type, duration, status, color, icon, logo, desc, highlights, skills } = exp;
  const isCurrent = status === "Present";

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        paddingLeft: 48,
        marginBottom: 40,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity .7s ${index * 0.15}s, transform .7s ${index * 0.15}s cubic-bezier(.22,1,.36,1)`,
      }}
    >
      {/* Timeline dot */}
      <div style={{
        position: "absolute", top: 34, left: 0,
        width: 14, height: 14, borderRadius: "50%",
        background: color,
        border: "3px solid #0f0e1a",
        boxShadow: `0 0 0 3px ${color}30, 0 0 16px ${color}50`,
        zIndex: 2,
      }} />

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? `${color}07` : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? color + "40" : color + "1c"}`,
          borderRadius: 22,
          padding: "28px 28px",
          position: "relative",
          overflow: "hidden",
          transition: "background .3s, border-color .3s, box-shadow .3s",
          boxShadow: hovered ? `0 16px 48px ${color}10` : "none",
          cursor: "default",
        }}
      >
        {/* Watermark icon */}
        <div style={{ position: "absolute", bottom: -8, right: 12, fontSize: 90, opacity: 0.04, lineHeight: 1, pointerEvents: "none" }}>
          {icon}
        </div>

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, flexShrink: 0,
              background: `${color}15`, border: `1px solid ${color}30`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
              overflow: "hidden",
            }}>
              {logo ? (
                <img
                  src={logo}
                  alt={`${company} logo`}
                  style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }}
                />
              ) : (
                icon
              )}
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.25 }}>
                {role}
              </h3>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color, marginTop: 4, fontWeight: 500 }}>
                {company}
                <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}> &nbsp;•&nbsp; {type}</span>
              </div>
            </div>
          </div>

          {/* Status + duration */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <span style={{
              fontFamily: "'DM Mono',monospace", fontSize: 9,
              letterSpacing: ".12em", textTransform: "uppercase",
              background: isCurrent ? "rgba(52,211,153,0.1)" : `${color}12`,
              border: `1px solid ${isCurrent ? "rgba(52,211,153,0.3)" : color + "25"}`,
              borderRadius: 50, padding: "3px 10px",
              color: isCurrent ? "#34d399" : color,
              display: "flex", alignItems: "center", gap: 5,
            }}>
              {isCurrent && (
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399", display: "inline-block", boxShadow: "0 0 0 2px rgba(52,211,153,0.2)" }} />
              )}
              {isCurrent ? "Currently working" : status}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Mono',monospace", fontSize: 11, color, letterSpacing: ".06em" }}>
              <span style={{ fontSize: 11 }}>📅</span> {duration}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: `linear-gradient(to right,${color}25,transparent)`, marginBottom: 14 }} />

        {/* Description */}
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, lineHeight: 1.78, color: "rgba(255,255,255,0.4)", fontWeight: 300, marginBottom: 16 }}>
          {desc}
        </p>

        {/* Highlights */}
        <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 18 }}>
          {highlights.map((h, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color, fontSize: 12, marginTop: 3, flexShrink: 0 }}>◆</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
                {h}
              </span>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {skills.map(s => (
            <span key={s} style={{
              fontFamily: "'DM Mono',monospace", fontSize: 9.5,
              letterSpacing: ".08em", textTransform: "uppercase",
              background: `${color}10`, border: `1px solid ${color}22`,
              borderRadius: 6, padding: "3px 9px",
              color: hovered ? color : "rgba(255,255,255,0.35)",
              transition: "color .3s",
            }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @media (max-width: 640px) {
          #experience .exp-wrap { padding: 0 20px !important; }
        }
      `}</style>

      <section
        id="experience"
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

        <div className="exp-wrap" style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px" }}>

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
              fontFamily: "'DM Mono',monospace", fontSize: 10,
              letterSpacing: ".22em", textTransform: "uppercase", color: "#a78bfa",
              marginBottom: 16,
            }}>
              <span style={{ width:28, height:1, background:"linear-gradient(to left,#a78bfa,transparent)", display:"inline-block" }} />
              Experience
              <span style={{ width:28, height:1, background:"linear-gradient(to right,#a78bfa,transparent)", display:"inline-block" }} />
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(34px,5vw,58px)", fontWeight: 800, lineHeight: 1.1,
              background: "linear-gradient(135deg,#e2e8f0 0%,#a78bfa 50%,#60a5fa 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "shimmer 5s linear infinite",
              marginBottom: 14,
            }}>
              Where I've Worked
            </h2>

            <p style={{
              fontFamily: "'DM Mono',monospace", fontSize: 11.5,
              color: "rgba(255,255,255,0.28)", letterSpacing: ".08em",
              maxWidth: 420, margin: "0 auto",
            }}>
              Real-world experience building and teaching web development
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>

            {/* Vertical line */}
            <div style={{
              position: "absolute", left: 6, top: 0, bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom,transparent,rgba(167,139,250,0.25) 8%,rgba(167,139,250,0.25) 92%,transparent)",
              zIndex: 1,
            }} />

            {EXPERIENCE.map((exp, i) => (
              <ExperienceCard key={exp.company + exp.role} exp={exp} index={i} />
            ))}

            {/* Bottom dot */}
            <div style={{
              position: "absolute", bottom: -6, left: 1,
              width: 10, height: 10, borderRadius: "50%",
              background: "rgba(167,139,250,0.3)",
              boxShadow: "0 0 0 4px rgba(167,139,250,0.08)",
              zIndex: 2,
            }} />
          </div>

        </div>
      </section>
    </>
  );
}