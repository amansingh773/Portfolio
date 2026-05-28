import { createContext, useContext, useState, useEffect } from "react";

export const THEMES = {
  dark: {
    name: "dark",
    bg:           "#0f0e1a",
    bgSecondary:  "rgba(255,255,255,0.03)",
    bgCard:       "rgba(255,255,255,0.03)",
    bgCardHover:  "rgba(255,255,255,0.06)",
    bgInput:      "rgba(255,255,255,0.04)",
    border:       "rgba(255,255,255,0.08)",
    borderAccent: "rgba(167,139,250,0.25)",
    text:         "#e2e8f0",
    textMuted:    "rgba(255,255,255,0.55)",
    textDim:      "rgba(255,255,255,0.35)",
    textFaint:    "rgba(255,255,255,0.18)",
    accent:       "#a78bfa",
    accentBlue:   "#60a5fa",
    accentGreen:  "#34d399",
    accentAmber:  "#f59e0b",
    accentPink:   "#f472b6",
    navBg:        "#0f0e1a",
    navBorder:    "rgba(255,255,255,0.06)",
    gridLine:     "rgba(255,255,255,0.03)",
    shadow:       "rgba(0,0,0,0.4)",
    blobPurple:   "rgba(139,92,246,.10)",
    blobBlue:     "rgba(59,130,246,.08)",
    statBg:       "rgba(255,255,255,0.04)",
    timelineLine: "rgba(167,139,250,0.25)",
    sectionLabel: "#a78bfa",
    badgeBg:      "rgba(167,139,250,0.10)",
    badgeBorder:  "rgba(167,139,250,0.25)",
  },
  light: {
    name: "light",
    bg:           "#f4f3ff",
    bgSecondary:  "rgba(124,58,237,0.03)",
    bgCard:       "#ffffff",
    bgCardHover:  "rgba(124,58,237,0.04)",
    bgInput:      "rgba(124,58,237,0.04)",
    border:       "rgba(0,0,0,0.08)",
    borderAccent: "rgba(124,58,237,0.22)",
    text:         "#1e1b4b",
    textMuted:    "rgba(30,27,75,0.65)",
    textDim:      "rgba(30,27,75,0.45)",
    textFaint:    "rgba(30,27,75,0.25)",
    accent:       "#7c3aed",
    accentBlue:   "#2563eb",
    accentGreen:  "#059669",
    accentAmber:  "#d97706",
    accentPink:   "#db2777",
    navBg:        "#ffffff",
    navBorder:    "rgba(0,0,0,0.07)",
    gridLine:     "rgba(124,58,237,0.05)",
    shadow:       "rgba(124,58,237,0.10)",
    blobPurple:   "rgba(124,58,237,.07)",
    blobBlue:     "rgba(37,99,235,.05)",
    statBg:       "#ffffff",
    timelineLine: "rgba(124,58,237,0.22)",
    sectionLabel: "#7c3aed",
    badgeBg:      "rgba(124,58,237,0.08)",
    badgeBorder:  "rgba(124,58,237,0.22)",
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("portfolio-theme") || "dark"; } catch { return "dark"; }
  });

  const toggle = () =>
    setTheme(t => {
      const next = t === "dark" ? "light" : "dark";
      try { localStorage.setItem("portfolio-theme", next); } catch {}
      return next;
    });

  const t = THEMES[theme];

  /* Inject every token as a CSS variable on <html> so ALL sections
     can use var(--bg), var(--accent) etc. in their inline styles     */
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(t).forEach(([k, v]) => {
      root.style.setProperty(`--${k}`, v);
    });
    // Also set a plain background on body so nothing bleeds through
    document.body.style.background = t.bg;
    document.body.style.transition  = "background 0.4s";
    root.setAttribute("data-theme", theme);
  }, [theme, t]);

  return (
    <ThemeContext.Provider value={{ theme, t, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() { return useContext(ThemeContext); }