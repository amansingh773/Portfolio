import { useRef, useEffect, useState } from "react";

const PROJECTS = [
  {
    title: "WanderLust",
    desc: "Full-stack MERN e-commerce app with product listings, cart, authentication, and payment integration. Admin dashboard with order management.",
    tags: ["HTML","CSS","Javascript", "Node.js", "MongoDB", "Express", "Bootstrap"],
    color: "#60a5fa",
    icon: "🏠",
    live: "https://wanderlust-lx3o.onrender.com",
    github: "https://github.com/amansingh773/First-Project",
    status: "Completed",
  },
  {
    title: "Task Manager App",
    desc: "Drag-and-drop Kanban board for managing tasks with user auth, real-time updates, priority labels, and deadline tracking.",
    tags: ["HTML", "CSS", "Javascript"],
    color: "#a78bfa",
    icon: "📋",
    live: "https://amansingh773.github.io/Kanban-Board/",
    github: "https://github.com/amansingh773/Kanban-Board",
    status: "Completed",
  },
  {
    title: "Talk2Text",
    desc: "Content management system where users can write, edit, and publish blogs with rich text editor, categories, and comment system.",
    tags: ["React", "Tailwindcss", "OpenAi", "Whisper API"],
    color: "#34d399",
    icon: "🎙️",
    live: "https://react-talk2text.onrender.com",
    github: "https://github.com/amansingh773/React-Talk2Text",
    status: "Completed",
  },
  
  {
    title: "SwiftShift",
    desc: "This very portfolio — designed and built from scratch with smooth animations, dark theme, and fully responsive layout.",
    tags: ["React", "Tailwind", "Vite"],
    color: "#f472b6",
    icon: "🚛",
    live: "https://swift-shift-one.vercel.app/",
    github: "https://github.com/amansingh773/SwiftShift",
    status: "Completed",
  },

  {
    title: "Chat Application",
    desc: "Real-time chat app with Socket.io. Supports private messaging, group rooms, online status, and message history.",
    tags: ["React", "Socket.io", "Node.js", "MongoDB"],
    color: "#f59e0b",
    icon: "💬",
    live: "#",
    github: "#",
    status: "In Progress",
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

function ProjectCard({ project, delay }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const { title, desc, tags, color, icon, live, github, status } = project;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${color}08` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? color + "44" : color + "1a"}`,
        borderRadius: 22,
        padding: "30px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity .65s ${delay}s, transform .65s ${delay}s cubic-bezier(.22,1,.36,1), background .3s, border-color .3s`,
        boxShadow: hovered ? `0 16px 48px ${color}12` : "none",
      }}
    >
      {/* Watermark icon */}
      <div style={{ position: "absolute", bottom: -8, right: 12, fontSize: 80, opacity: 0.04, lineHeight: 1, pointerEvents: "none" }}>
        {icon}
      </div>

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: `${color}15`, border: `1px solid ${color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, flexShrink: 0,
          }}>
            {icon}
          </div>
          <div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 18, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.2,
            }}>
              {title}
            </h3>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9.5,
              letterSpacing: ".1em", textTransform: "uppercase",
              color: status === "In Progress" ? "#f59e0b" : "#34d399",
              display: "flex", alignItems: "center", gap: 5, marginTop: 4,
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: status === "In Progress" ? "#f59e0b" : "#34d399",
                display: "inline-block",
                boxShadow: status === "In Progress" ? "0 0 0 2px rgba(245,158,11,.2)" : "0 0 0 2px rgba(52,211,153,.2)",
              }} />
              {status}
            </span>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <a
            href={github}
            title="GitHub"
            style={{
              width: 34, height: 34, borderRadius: 10,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none",
              transition: "all .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${color}20`; e.currentTarget.style.color = color; e.currentTarget.style.borderColor = `${color}40`; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            ⌥
          </a>
          <a
            href={live}
            title="Live Demo"
            style={{
              width: 34, height: 34, borderRadius: 10,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none",
              transition: "all .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${color}20`; e.currentTarget.style.color = color; e.currentTarget.style.borderColor = `${color}40`; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            ↗
          </a>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: `linear-gradient(to right, ${color}25, transparent)` }} />

      {/* Description */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13.5, lineHeight: 1.8,
        color: "rgba(255,255,255,0.42)", fontWeight: 300,
      }}>
        {desc}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 4 }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase",
            background: `${color}12`, border: `1px solid ${color}28`,
            borderRadius: 7, padding: "4px 10px",
            color: hovered ? color : "rgba(255,255,255,0.4)",
            transition: "color .3s",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
      `}</style>

      <section
        id="projects"
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
        <div style={{ position:"absolute", top:-80, left:-60, width:400, height:400, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(167,139,250,.07),transparent 70%)" }} />
        <div style={{ position:"absolute", bottom:-60, right:-40, width:320, height:320, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(96,165,250,.06),transparent 70%)" }} />

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
              Projects
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
              Things I've Built
            </h2>

            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: 11.5,
              color: "rgba(255,255,255,0.28)", letterSpacing: ".08em",
              maxWidth: 420, margin: "0 auto",
            }}>
              A collection of projects built with the MERN stack
            </p>
          </div>

          {/* Projects Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 24,
          }}>
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} project={project} delay={0.1 + i * 0.1} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{
            textAlign: "center", marginTop: 64,
            opacity: headerInView ? 1 : 0,
            transition: "opacity 1s 0.9s",
          }}>
            <a
              href="https://github.com/amansingh773"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: "'DM Mono', monospace", fontSize: 12,
                letterSpacing: ".12em", textTransform: "uppercase",
                color: "#a78bfa", textDecoration: "none",
                border: "1px solid rgba(167,139,250,0.25)",
                borderRadius: 50, padding: "13px 28px",
                transition: "all .3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(167,139,250,0.08)"; e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(167,139,250,0.25)"; }}
            >
              View all on GitHub ↗
            </a>
          </div>

        </div>
      </section>
    </>
  );
}