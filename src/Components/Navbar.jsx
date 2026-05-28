import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Home',     id: 'home'     },
  { label: 'About',    id: 'about'    },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills',   id: 'skills'   },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Education',  id: 'education'  },
  { label: 'Contact',  id: 'contact'  },
]

export default function Navbar() {
  const { t } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [active,   setActive]   = useState('Home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(navLinks[i].label)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

        .nav-link-line::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0%; height: 1.5px;
          background: var(--accent);
          transition: width 0.3s cubic-bezier(0.25,1,0.5,1);
        }
        .nav-link-line:hover::after,
        .nav-link-line.active-link::after { width: 100%; }

        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @keyframes mobileIn {
          from { transform: translateY(-16px); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        .navbar-enter   { animation: slideDown 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .mobile-link-in { animation: mobileIn  0.35s cubic-bezier(0.22,1,0.36,1) both; }

        .burger span {
          display: block;
          width: 22px; height: 1.5px;
          transition: transform 0.35s ease, opacity 0.25s ease, width 0.25s ease;
          transform-origin: center;
        }
        .burger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .burger.open span:nth-child(2) { opacity: 0; width: 0; }
        .burger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
      `}</style>

      <nav
        className="navbar-enter"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          fontFamily: "'DM Sans', sans-serif",
          background: t.navBg,
          borderBottom: `1px solid ${t.navBorder}`,
          backgroundImage: `
            linear-gradient(${t.gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          boxShadow: scrolled ? `0 4px 24px ${t.shadow}` : 'none',
          transition: 'background .4s, border-color .4s, box-shadow .4s',
        }}
      >
        <div style={{ padding: '14px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em', color: t.accent, fontSize: 24, fontWeight: 900 }}>
              AMAN
            </span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: t.accent, display: 'inline-block', transition: 'transform .3s' }} />
          </button>

          {/* Desktop Links */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map(({ label, id }) => (
              <li key={label}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`nav-link-line ${active === label ? 'active-link' : ''}`}
                  style={{
                    position: 'relative',
                    color: active === label ? t.accent : t.textMuted,
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 12, fontWeight: 500,
                    letterSpacing: '.12em', textTransform: 'uppercase',
                    fontFamily: "'DM Sans', sans-serif",
                    transition: 'color .3s',
                    padding: '4px 0',
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side: Theme Toggle + Hire Me */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginRight: 80 }}>
            <ThemeToggle />

            <button
              onClick={() => scrollTo('contact')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px', borderRadius: 999,
                border: `1.5px solid ${t.accent}55`,
                color: t.accent, background: 'transparent', cursor: 'pointer',
                fontFamily: "'DM Mono', monospace", fontSize: 11,
                letterSpacing: '.1em', textTransform: 'uppercase',
                transition: 'all .3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = t.accent; e.currentTarget.style.color = t.bg; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = t.accent; }}
            >
              Hire Me <span>↗</span>
            </button>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`burger ${menuOpen ? 'open' : ''}`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', flexDirection: 'column', gap: 5, padding: 4 }}
            aria-label="Toggle menu"
          >
            <span style={{ backgroundColor: t.accent }} />
            <span style={{ backgroundColor: t.accent }} />
            <span style={{ backgroundColor: t.accent }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            margin: '8px 16px 12px',
            borderRadius: 18,
            background: t.bg === '#f8f7ff' ? '#ffffff' : '#111',
            border: `1px solid ${t.border}`,
            overflow: 'hidden',
          }}>
            {navLinks.map(({ label, id }, i) => (
              <button
                key={label}
                onClick={() => scrollTo(id)}
                className="mobile-link-in"
                style={{
                  width: '100%', textAlign: 'left',
                  padding: '14px 20px',
                  background: active === label ? `${t.accent}12` : 'transparent',
                  border: 'none',
                  borderBottom: `1px solid ${t.border}`,
                  color: active === label ? t.accent : t.textMuted,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                  animationDelay: `${i * 0.06}s`,
                  transition: 'color .2s, background .2s',
                }}
              >
                <span style={{ color: t.textFaint, fontSize: 10 }}>0{i + 1}</span>
                {label}
              </button>
            ))}
            <div style={{ padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <ThemeToggle />
              <button
                onClick={() => scrollTo('contact')}
                style={{
                  flex: 1, padding: '13px 20px', borderRadius: 12, border: 'none',
                  background: t.accent, color: t.bg,
                  fontFamily: "'DM Mono', monospace", fontSize: 11,
                  letterSpacing: '.1em', textTransform: 'uppercase',
                  fontWeight: 600, cursor: 'pointer',
                }}
              >
                Hire Me ↗
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}