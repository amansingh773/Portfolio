import { useTheme } from "./ThemeContext";

/* ── Animated Sun / Moon toggle pill ── */
export default function ThemeToggle() {
  const { theme, t, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <style>{`
        @keyframes spinIn  { from{transform:rotate(-90deg) scale(.5);opacity:0} to{transform:rotate(0) scale(1);opacity:1} }
        @keyframes spinOut { from{transform:rotate(0) scale(1);opacity:1}       to{transform:rotate(90deg) scale(.5);opacity:0} }

        .toggle-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px 7px 10px;
          border-radius: 999px;
          border: 1.5px solid;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: .1em;
          text-transform: uppercase;
          font-weight: 500;
          transition: background .35s, border-color .35s, color .35s, box-shadow .35s;
          user-select: none;
          position: relative;
          overflow: hidden;
        }

        .toggle-pill:hover {
          transform: translateY(-1px);
        }
        .toggle-pill:active {
          transform: scale(.96);
        }

        .toggle-track {
          width: 34px;
          height: 18px;
          border-radius: 999px;
          position: relative;
          transition: background .35s;
          flex-shrink: 0;
        }

        .toggle-thumb {
          position: absolute;
          top: 2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #fff;
          transition: left .35s cubic-bezier(.34,1.56,.64,1), background .35s;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          box-shadow: 0 1px 4px rgba(0,0,0,.25);
        }

        .icon-wrap {
          width: 18px;
          height: 18px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      `}</style>

      <button
        onClick={toggle}
        className="toggle-pill"
        title={`Switch to ${isDark ? "light" : "dark"} mode`}
        style={{
          background: isDark ? "rgba(167,139,250,0.1)" : "rgba(124,58,237,0.07)",
          borderColor: isDark ? "rgba(167,139,250,0.35)" : "rgba(124,58,237,0.25)",
          color: isDark ? "#a78bfa" : "#7c3aed",
          boxShadow: isDark
            ? "0 0 12px rgba(167,139,250,0.12)"
            : "0 2px 8px rgba(124,58,237,0.1)",
        }}
      >
        {/* Icon */}
        <div className="icon-wrap">
          <span
            key={theme}
            style={{
              fontSize: 14,
              display: "inline-block",
              animation: "spinIn .4s cubic-bezier(.34,1.56,.64,1) both",
            }}
          >
            {isDark ? "🌙" : "☀️"}
          </span>
        </div>

        {/* Track */}
        <div
          className="toggle-track"
          style={{ background: isDark ? "rgba(167,139,250,0.25)" : "rgba(124,58,237,0.15)" }}
        >
          <div
            className="toggle-thumb"
            style={{
              left: isDark ? "2px" : "18px",
              background: isDark ? "#a78bfa" : "#7c3aed",
            }}
          />
        </div>

        {/* Label */}
        <span>{isDark ? "Dark" : "Light"}</span>
      </button>
    </>
  );
}