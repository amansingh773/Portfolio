export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }

      body {
        background: var(--bg);
        color: var(--text);
        transition: background 0.4s, color 0.4s;
      }

      /* ── Every section: themed bg + grid ── */
      section {
        background-color: var(--bg) !important;
        background-image:
          linear-gradient(var(--gridLine) 1px, transparent 1px),
          linear-gradient(90deg, var(--gridLine) 1px, transparent 1px) !important;
        background-size: 40px 40px !important;
        transition: background-color 0.4s !important;
      }

      /* ── Inputs ── */
      input, textarea, select {
        background: var(--bgInput) !important;
        color: var(--text) !important;
        transition: background 0.4s, color 0.4s, border-color 0.4s;
      }
      input::placeholder, textarea::placeholder { color: var(--textFaint) !important; }

      /* ── Animations ── */
      @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }
      @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn   { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
      @keyframes floatBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      @keyframes ticker   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes spinSlow { to{transform:rotate(360deg)} }
      @keyframes ringPulse{ 0%,100%{transform:scale(1);opacity:.4} 50%{transform:scale(1.06);opacity:.2} }
      @keyframes badgePop { from{opacity:0;transform:scale(.7)} to{opacity:1;transform:scale(1)} }
      @keyframes spin     { to{transform:rotate(360deg)} }
      @keyframes checkPop { from{opacity:0;transform:scale(.5)} to{opacity:1;transform:scale(1)} }

      /* ════════════════════════════════════════════
         LIGHT MODE — override every hardcoded white
         All rgba(255,255,255,X) → rgba(30,27,75,X)
         All hardcoded dark hex bg → light equivalents
      ════════════════════════════════════════════ */

      /* --- Body & section text --- */
      [data-theme="light"] h1,
      [data-theme="light"] h2,
      [data-theme="light"] h3,
      [data-theme="light"] h4 {
        color: var(--text) !important;
        -webkit-text-fill-color: inherit !important;
      }

      /* Gradient headings keep their gradient in light mode too */
      [data-theme="light"] .section-heading,
      [data-theme="light"] [style*="-webkit-text-fill-color: transparent"] {
        -webkit-text-fill-color: transparent !important;
      }

      /* --- All muted white text → muted dark text --- */
      [data-theme="light"] p,
      [data-theme="light"] span:not([style*="color:#"]):not([style*="color: #"]) {
        color: var(--textMuted);
      }

      /* --- Cards & containers that use rgba white bg --- */
      [data-theme="light"] [style*="rgba(255,255,255,0.03)"],
      [data-theme="light"] [style*="rgba(255,255,255, 0.03)"] {
        background: var(--bgCard) !important;
        box-shadow: 0 2px 16px rgba(124,58,237,0.07) !important;
      }
      [data-theme="light"] [style*="rgba(255,255,255,0.04)"],
      [data-theme="light"] [style*="rgba(255,255,255, 0.04)"] {
        background: var(--bgCard) !important;
      }
      [data-theme="light"] [style*="rgba(255,255,255,0.05)"],
      [data-theme="light"] [style*="rgba(255,255,255, 0.05)"] {
        background: rgba(124,58,237,0.06) !important;
      }
      [data-theme="light"] [style*="rgba(255,255,255,0.06)"],
      [data-theme="light"] [style*="rgba(255,255,255, 0.06)"] {
        background: rgba(124,58,237,0.07) !important;
      }
      [data-theme="light"] [style*="rgba(255,255,255,0.08)"] {
        background: rgba(124,58,237,0.08) !important;
      }

      /* --- White border colors → soft dark borders --- */
      [data-theme="light"] [style*="border: 1px solid rgba(255,255,255"],
      [data-theme="light"] [style*="border:1px solid rgba(255,255,255"] {
        border-color: rgba(124,58,237,0.15) !important;
      }
      [data-theme="light"] [style*="borderBottom: '1px solid rgba(255,255,255"] {
        border-bottom-color: rgba(124,58,237,0.1) !important;
      }

      /* --- Hardcoded dark backgrounds --- */
      [data-theme="light"] [style*="background: #0f0e1a"],
      [data-theme="light"] [style*="background:#0f0e1a"],
      [data-theme="light"] [style*="background-color: #0f0e1a"],
      [data-theme="light"] [style*="backgroundColor: '#0f0e1a'"] {
        background: var(--bg) !important;
        background-color: var(--bg) !important;
      }
      [data-theme="light"] [style*="background: #111"],
      [data-theme="light"] [style*="background:#111"] {
        background: #f0eeff !important;
      }

      /* --- Muted white text colors → readable dark --- */
      [data-theme="light"] [style*="color: rgba(255,255,255,0.55)"],
      [data-theme="light"] [style*="color:rgba(255,255,255,0.55)"] { color: var(--textMuted) !important; }

      [data-theme="light"] [style*="color: rgba(255,255,255,0.5)"],
      [data-theme="light"] [style*="color:rgba(255,255,255,0.5)"]  { color: var(--textMuted) !important; }

      [data-theme="light"] [style*="color: rgba(255,255,255,0.4)"],
      [data-theme="light"] [style*="color:rgba(255,255,255,0.4)"]  { color: var(--textDim) !important; }

      [data-theme="light"] [style*="color: rgba(255,255,255,0.35)"],
      [data-theme="light"] [style*="color:rgba(255,255,255,0.35)"] { color: var(--textDim) !important; }

      [data-theme="light"] [style*="color: rgba(255,255,255,0.3)"],
      [data-theme="light"] [style*="color:rgba(255,255,255,0.3)"]  { color: var(--textDim) !important; }

      [data-theme="light"] [style*="color: rgba(255,255,255,0.28)"],
      [data-theme="light"] [style*="color:rgba(255,255,255,0.28)"] { color: var(--textDim) !important; }

      [data-theme="light"] [style*="color: rgba(255,255,255,0.25)"],
      [data-theme="light"] [style*="color:rgba(255,255,255,0.25)"] { color: var(--textFaint) !important; }

      [data-theme="light"] [style*="color: rgba(255,255,255,0.2)"],
      [data-theme="light"] [style*="color:rgba(255,255,255,0.2)"]  { color: var(--textFaint) !important; }

      [data-theme="light"] [style*="color: rgba(255,255,255,0.45)"],
      [data-theme="light"] [style*="color:rgba(255,255,255,0.45)"] { color: var(--textDim) !important; }

      [data-theme="light"] [style*="color: rgba(255,255,255,0.42)"],
      [data-theme="light"] [style*="color:rgba(255,255,255,0.42)"] { color: var(--textDim) !important; }

      [data-theme="light"] [style*="color: rgba(255,255,255,0.38)"],
      [data-theme="light"] [style*="color:rgba(255,255,255,0.38)"] { color: var(--textDim) !important; }

      [data-theme="light"] [style*="color: rgba(255,255,255,0.7)"],
      [data-theme="light"] [style*="color:rgba(255,255,255,0.7)"]  { color: var(--textMuted) !important; }

      [data-theme="light"] [style*="color: rgba(255,255,255,0.6)"],
      [data-theme="light"] [style*="color:rgba(255,255,255,0.6)"]  { color: var(--textMuted) !important; }

      [data-theme="light"] [style*="color: #e2e8f0"],
      [data-theme="light"] [style*="color:#e2e8f0"]               { color: var(--text) !important; }

      [data-theme="light"] [style*="color: white"],
      [data-theme="light"] [style*="color:white"]                 { color: var(--text) !important; }

      /* --- white/10 borders (Tailwind style) --- */
      [data-theme="light"] .border-white\/10 { border-color: rgba(124,58,237,0.12) !important; }
      [data-theme="light"] .border-white\/5  { border-color: rgba(124,58,237,0.08) !important; }
      [data-theme="light"] .text-white\/50   { color: var(--textMuted) !important; }
      [data-theme="light"] .text-white\/20   { color: var(--textFaint) !important; }
      [data-theme="light"] .hover\:text-white:hover { color: var(--text) !important; }
      [data-theme="light"] .hover\:bg-white\/5:hover { background: rgba(124,58,237,0.07) !important; }
      [data-theme="light"] .bg-\[\#111\] { background: #f0eeff !important; }

      /* --- Timeline connector dots bg color --- */
      [data-theme="light"] [style*="border: 2px solid #0f0e1a"],
      [data-theme="light"] [style*="border:2px solid #0f0e1a"],
      [data-theme="light"] [style*="border: 3px solid #0f0e1a"],
      [data-theme="light"] [style*="border:3px solid #0f0e1a"] {
        border-color: var(--bg) !important;
      }

      /* --- Stat/info number gradient text (keep as-is, already uses accent) --- */

      /* --- Mobile menu active link color fix --- */
      [data-theme="light"] [style*="text-[#e8ff47]"] { color: var(--accent) !important; }

      /* ── Scrollbar ── */
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: var(--bg); }
      ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }

      /* ── Selection ── */
      ::selection { background: var(--accent); color: #fff; }

      /* ── Nav underline uses CSS var ── */
      .nav-link-line::after { background: var(--accent) !important; }

      /* ── Burger lines ── */
      .burger span { background: var(--accent) !important; }

      /* ── Light mode ticker border ── */
      [data-theme="light"] [style*="border-top: 1px solid rgba(255,255,255"] {
        border-top-color: rgba(124,58,237,0.12) !important;
      }
      [data-theme="light"] [style*="border-bottom: 1px solid rgba(255,255,255"] {
        border-bottom-color: rgba(124,58,237,0.12) !important;
      }
      [data-theme="light"] [style*="background: rgba(255,255,255,0.02)"] {
        background: rgba(124,58,237,0.03) !important;
      }
    `}</style>
  );
}