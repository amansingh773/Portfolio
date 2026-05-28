import { useRef, useEffect, useState } from "react";

const EDUCATION = [
  {
    degree: "Bachelor of Technology",
    field: "Information Technology",
    institution: "Dr.APJ Abdul kalaam Technical University Lucknow",
    location: "Lucknow, Uttar Pradesh",
    duration: "2021 — 2025",
    status: "Completed",
    grade: "7.8 CGPA",
    color: "#a78bfa",
    icon: "🎓",
    desc: "Studying core CS subjects including Data Structures, Algorithms, Operating Systems, DBMS, Computer Networks, and Software Engineering.",
    highlights: [
      "Active member of the college coding club",
      "Participated in college-level hackathons",
      "Built multiple projects during coursework",
      "Self-studied full stack development alongside academics",
    ],
    subjects: ["DSA", "DBMS", "OS", "CN", "Software Engg.", "OOP","Cyber Security","COA"],
  },
  {
    degree: "Intermediate (12th)",
    field: "Science — PCM",
    institution: "Maharishi Vidya Mandir",
    location: "Hardoi, Uttar Pradesh",
    duration: "2019 — 2020",
    status: "Completed",
    grade: "85%",
    color: "#60a5fa",
    icon: "🏫",
    desc: "Completed senior secondary education with Physics, Chemistry, Mathematics, and Computer Science as core subjects.",
    highlights: [
      "Strong foundation in Mathematics and Logic",
      "Introduction to C++ and programming basics",
      "Scored 90%+ in Computer Science",
    ],
    subjects: ["Physics", "Chemistry", "Math", "C++", "Computer Sc."],
  },
  {
    degree: "High School (10th)",
    field: "All Subjects — CBSE Board",
    institution: "Maharishi Vidya Mandir",
    location: "Hardoi, Uttar Pradesh",
    duration: "2018 — 2019",
    status: "Completed",
    grade: "88%",
    color: "#34d399",
    icon: "📚",
    desc: "Completed secondary education from CBSE board with distinction. Developed analytical and problem-solving skills.",
    highlights: [
      "School topper in Mathematics",
      "Participated in science exhibitions",
      "Awarded certificate of merit in academics",
    ],
    subjects: ["Math", "Science", "English", "Social Sc.", "Hindi"],
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

function EducationCard({ edu, index }) {
  const [ref, inView] = useInView(0.1);
  const [expanded, setExpanded] = useState(index === 0);
  const [hovered, setHovered] = useState(false);
  const { degree, field, institution, location, duration, status, grade, color, icon, desc, highlights, subjects } = edu;

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        position: "relative",
        marginBottom: 40,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity .7s ${index * 0.15}s, transform .7s ${index * 0.15}s cubic-bezier(.22,1,.36,1)`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "46%",
          background: hovered ? `${color}07` : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? color + "40" : color + "1c"}`,
          borderRadius: 22,
          padding: "28px 26px",
          position: "relative",
          transition: "background .3s, border-color .3s, box-shadow .3s",
          boxShadow: hovered ? `0 16px 48px ${color}10` : "none",
          cursor: "default",
        }}
      >
        {/* Connector dot */}
        <div style={{
          position: "absolute", top: 32,
          [isLeft ? "right" : "left"]: -42,
          width: 14, height: 14, borderRadius: "50%",
          background: color,
          border: "3px solid #0f0e1a",
          boxShadow: `0 0 0 3px ${color}30, 0 0 16px ${color}50`,
          zIndex: 2,
        }} />

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{
              width: 46, height: 46, borderRadius: 14, flexShrink: 0,
              background: `${color}15`, border: `1px solid ${color}30`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
            }}>
              {icon}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{
                  fontFamily: "'DM Mono',monospace", fontSize: 9,
                  letterSpacing: ".12em", textTransform: "uppercase",
                  background: status === "Pursuing" ? "rgba(52,211,153,0.1)" : `${color}12`,
                  border: `1px solid ${status === "Pursuing" ? "rgba(52,211,153,0.3)" : color + "25"}`,
                  borderRadius: 50, padding: "2px 10px",
                  color: status === "Pursuing" ? "#34d399" : color,
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  {status === "Pursuing" && (
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399", display: "inline-block", boxShadow: "0 0 0 2px rgba(52,211,153,0.2)" }} />
                  )}
                  {status}
                </span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.25 }}>
                {degree}
              </h3>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color, marginTop: 3, fontWeight: 500 }}>
                {field}
              </div>
            </div>
          </div>

          {/* Grade badge */}
          <div style={{
            flexShrink: 0, textAlign: "center",
            background: `${color}12`, border: `1px solid ${color}28`,
            borderRadius: 12, padding: "8px 14px",
          }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 800, color, lineHeight: 1 }}>
              {grade}
            </div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8.5, color: "rgba(255,255,255,0.3)", letterSpacing: ".08em", marginTop: 3, textTransform: "uppercase" }}>
              Grade
            </div>
          </div>
        </div>

        {/* Institution + Duration */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>
            <span style={{ fontSize: 12 }}>🏛</span> {institution}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>
            <span style={{ fontSize: 12 }}>📍</span> {location}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Mono',monospace", fontSize: 11, color, letterSpacing: ".06em" }}>
            <span style={{ fontSize: 11 }}>📅</span> {duration}
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: `linear-gradient(to right,${color}25,transparent)`, marginBottom: 14 }} />

        {/* Description */}
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, lineHeight: 1.78, color: "rgba(255,255,255,0.4)", fontWeight: 300, marginBottom: 14 }}>
          {desc}
        </p>

        {/* Subjects */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 14 }}>
          {subjects.map(s => (
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

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(p => !p)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
            fontFamily: "'DM Mono',monospace", fontSize: 10,
            letterSpacing: ".1em", textTransform: "uppercase",
            color: color, padding: 0, marginBottom: expanded ? 14 : 0,
            transition: "opacity .2s",
          }}
        >
          <span style={{
            display: "inline-block",
            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform .3s",
            fontSize: 12,
          }}>▶</span>
          {expanded ? "Hide highlights" : "Show highlights"}
        </button>

        {/* Highlights */}
        {expanded && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex", gap: 10, alignItems: "flex-start",
                  opacity: 0, animation: `fadeIn .4s ${i * 0.07}s forwards`,
                }}
              >
                <span style={{ color, fontSize: 12, marginTop: 2, flexShrink: 0 }}>◆</span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                  {h}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Education() {
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes fadeIn  { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      <section
        id="education"
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
        <div style={{ position:"absolute", top:-80, left:-60, width:420, height:420, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(167,139,250,.08),transparent 70%)" }} />
        <div style={{ position:"absolute", bottom:-60, right:-40, width:320, height:320, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(96,165,250,.07),transparent 70%)" }} />

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
              fontFamily: "'DM Mono',monospace", fontSize: 10,
              letterSpacing: ".22em", textTransform: "uppercase", color: "#a78bfa",
              marginBottom: 16,
            }}>
              <span style={{ width:28, height:1, background:"linear-gradient(to left,#a78bfa,transparent)", display:"inline-block" }} />
              Education
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
              Academic Journey
            </h2>

            <p style={{
              fontFamily: "'DM Mono',monospace", fontSize: 11.5,
              color: "rgba(255,255,255,0.28)", letterSpacing: ".08em",
              maxWidth: 420, margin: "0 auto",
            }}>
              The foundation that shaped my technical thinking
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative", maxWidth: 950, margin: "0 auto" }}>

            {/* Center line */}
            <div style={{
              position: "absolute", left: "50%", top: 0, bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom,transparent,rgba(167,139,250,0.25) 8%,rgba(167,139,250,0.25) 92%,transparent)",
              transform: "translateX(-50%)",
              zIndex: 1,
            }} />

            {EDUCATION.map((edu, i) => (
              <EducationCard key={edu.degree} edu={edu} index={i} />
            ))}

            {/* Bottom dot */}
            <div style={{
              position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
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