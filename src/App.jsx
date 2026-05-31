import {useState, useEffect, useRef} from "react";
import {
  owner,
  stats,
  currentStatus,
  education,
  philosophy,
  experiences,
  projects,
  skills,
  whyMe,
  testimonials,
  navLinks,
} from "./data";

const T = {
  ink: "#0a0a0f",
  ink2: "#0f0f1a",
  ink3: "#141424",
  gold: "#c9a84c",
  goldDim: "rgba(201,168,76,0.10)",
  goldBdr: "rgba(201,168,76,0.22)",
  cream: "#f0ead8",
  white: "rgba(255,255,255,0.88)",
  muted: "rgba(255,255,255,0.44)",
  faint: "rgba(255,255,255,0.18)",
  ghost: "rgba(255,255,255,0.07)",
};

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      {threshold},
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function TypeWriter({strings, speed = 58}) {
  const [text, setText] = useState("");
  const [si, setSi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = strings[si];
    const delay = del ? speed / 2.2 : speed;
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, ci + 1));
        if (ci + 1 === cur.length) setTimeout(() => setDel(true), 2000);
        else setCi((c) => c + 1);
      } else {
        setText(cur.slice(0, ci - 1));
        if (ci - 1 === 0) {
          setDel(false);
          setSi((s) => (s + 1) % strings.length);
          setCi(0);
        } else setCi((c) => c - 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, si, ci, del, strings, speed]);
  return (
    <span>
      {text}
      <span style={{color: T.gold, animation: "blink 1s step-end infinite"}}>
        _
      </span>
    </span>
  );
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      setPct((window.scrollY / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", h, {passive: true});
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        height: 2,
        width: `${pct}%`,
        background: `linear-gradient(90deg, ${T.gold}, #818cf8)`,
        transition: "width 0.12s linear",
      }}
    />
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, {passive: true});
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 clamp(16px, 4vw, 40px)",
        height: 64,
        background: scrolled ? "rgba(10,10,15,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
        transition: "all 0.35s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <a
        href="#home"
        aria-label={`${owner.name} home`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: T.goldDim,
            border: `1px solid ${T.goldBdr}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={owner.photo}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML = `<span style="font-size:11px;font-weight:700;color:#c9a84c;letter-spacing:0.04em">${owner.name
                .split(" ")
                .map((n) => n[0])
                .join("")}</span>`;
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "0.06em",
            color: T.white,
          }}
        >
          {owner.shortName}
          <span style={{color: T.gold}}>.</span>
        </span>
      </a>

      <ul
        className="nav-links"
        style={{
          display: "flex",
          gap: 36,
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {navLinks.map((l) => (
          <li key={l}>
            <a
              href={`#${l}`}
              style={{
                color: T.muted,
                textDecoration: "none",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "'Syne', sans-serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = T.cream)}
              onMouseLeave={(e) => (e.target.style.color = T.muted)}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      <div style={{display: "flex", alignItems: "center", gap: 12}}>
        <a
          href="#contact"
          className="hire-btn"
          style={{
            padding: "8px 22px",
            border: `1px solid ${T.goldBdr}`,
            color: T.gold,
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "0.1em",
            fontFamily: "'Syne', sans-serif",
            background: T.goldDim,
            transition: "all 0.2s",
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(201,168,76,0.18)";
            e.currentTarget.style.borderColor = T.gold;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = T.goldDim;
            e.currentTarget.style.borderColor = T.goldBdr;
          }}
        >
          Hire Me
        </a>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          className="nav-toggle"
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: T.muted,
            cursor: "pointer",
            fontSize: 22,
            lineHeight: 1,
            padding: 4,
          }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 0,
            right: 0,
            background: "rgba(10,10,15,0.98)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(201,168,76,0.12)",
            padding: "24px clamp(16px,4vw,40px)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              onClick={() => setMobileOpen(false)}
              style={{
                color: T.muted,
                textDecoration: "none",
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100svh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        background: T.ink,
        overflow: "hidden",
        paddingTop: 80,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: "min(560px, 60vw)",
          height: "min(560px, 60vw)",
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "2%",
          width: "min(380px, 45vw)",
          height: "min(380px, 45vw)",
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(129,140,248,0.04) 0%, transparent 65%)",
        }}
      />

      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "40px clamp(16px,4vw,40px)",
          width: "100%",
          animation: "slideUp 0.8s ease forwards",
        }}
      >
        <div className="hero-layout">
          <div className="hero-text">
            <h1
              style={{
                fontSize: "clamp(40px, 8vw, 80px)",
                fontWeight: 700,
                lineHeight: 1.02,
                margin: "0 0 8px",
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{color: T.white}}>Hey, I'm </span>
              <span style={{color: T.gold}}>{owner.shortName}.</span>
            </h1>

            <h2
              style={{
                fontSize: "clamp(18px, 3.5vw, 28px)",
                fontWeight: 400,
                color: T.muted,
                margin: "0 0 28px",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                minHeight: 36,
                letterSpacing: "0.01em",
              }}
            >
              <TypeWriter strings={owner.tagline} speed={55} />
            </h2>

            <p
              style={{
                color: T.muted,
                lineHeight: 1.88,
                maxWidth: 520,
                margin: "0 0 12px",
                fontSize: "clamp(14px,2vw,16px)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {owner.bio}
            </p>
            <p
              style={{
                color: T.faint,
                lineHeight: 1.88,
                maxWidth: 520,
                margin: "0 0 36px",
                fontSize: "clamp(13px,1.8vw,15px)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {owner.bioExtra}
            </p>

            <div style={{display: "flex", gap: 14, flexWrap: "wrap"}}>
              <a
                href="#contact"
                style={{
                  padding: "14px clamp(20px,4vw,36px)",
                  background: T.gold,
                  color: T.ink,
                  borderRadius: 4,
                  fontWeight: 700,
                  fontSize: "clamp(11px,1.5vw,12px)",
                  textDecoration: "none",
                  letterSpacing: "0.12em",
                  fontFamily: "'Syne', sans-serif",
                  textTransform: "uppercase",
                  transition: "all 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = T.cream;
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 36px rgba(201,168,76,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = T.gold;
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                Let's Talk →
              </a>
              <a
                href="#projects"
                style={{
                  padding: "14px clamp(20px,4vw,36px)",
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: T.muted,
                  fontSize: "clamp(11px,1.5vw,12px)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontFamily: "'Syne', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = T.goldBdr;
                  e.currentTarget.style.color = T.gold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = T.muted;
                }}
              >
                See My Work
              </a>
            </div>

            <div
              style={{
                marginTop: 40,
                display: "flex",
                flexWrap: "wrap",
                gap: "12px 20px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: 24,
              }}
            >
              {owner.funFacts.map((d) => (
                <div
                  key={d.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "clamp(11px,1.5vw,12px)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <span>{d.emoji}</span>
                  {d.label}
                </div>
              ))}
            </div>
          </div>

          <div className="hero-card-wrap">
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: 380,
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "clamp(200px, 55vw, 280px)",
                  height: "clamp(200px, 55vw, 280px)",
                  flexShrink: 0,
                }}
              >
                <svg
                  viewBox="0 0 300 300"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    animation: "spinSlow 18s linear infinite",
                  }}
                  aria-hidden="true"
                >
                  <circle
                    cx="150"
                    cy="150"
                    r="140"
                    fill="none"
                    stroke="rgba(201,168,76,0.18)"
                    strokeWidth="1"
                    strokeDasharray="6 10"
                  />
                </svg>
                <svg
                  viewBox="0 0 300 300"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    animation: "spinSlow 28s linear infinite reverse",
                  }}
                  aria-hidden="true"
                >
                  <circle
                    cx="150"
                    cy="150"
                    r="126"
                    fill="none"
                    stroke="rgba(201,168,76,0.10)"
                    strokeWidth="1"
                    strokeDasharray="2 16"
                  />
                </svg>
                {[0, 72, 144, 216, 288].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  const cx = 150 + 140 * Math.cos(rad - Math.PI / 2);
                  const cy = 150 + 140 * Math.sin(rad - Math.PI / 2);
                  const icons = ["💻", "⚙️", "📊", "☁️", "🔌"];
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: `${(cx / 300) * 100}%`,
                        top: `${(cy / 300) * 100}%`,
                        transform: "translate(-50%, -50%)",
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "rgba(10,10,15,0.92)",
                        border: `1px solid ${T.goldBdr}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        animation: `fadeIn 0.5s ease ${i * 0.1 + 0.5}s both`,
                      }}
                    >
                      {icons[i]}
                    </div>
                  );
                })}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "74%",
                    height: "74%",
                    borderRadius: "50%",
                    padding: 3,
                    background: `linear-gradient(135deg, ${T.gold} 0%, rgba(129,140,248,0.6) 50%, ${T.gold} 100%)`,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: T.ink3,
                    }}
                  >
                    <img
                      src={owner.photo}
                      alt={owner.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#141424;font-size:36px;font-weight:700;color:#c9a84c;font-family:Cormorant Garamond,serif">${owner.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}</div>`;
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 20,
                  width: "100%",
                  background: "rgba(14,14,22,0.88)",
                  border: `1px solid ${T.goldBdr}`,
                  borderRadius: 12,
                  padding: "18px 20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, ${T.gold}, transparent)`,
                  }}
                />
                <div style={{textAlign: "center", marginBottom: 14}}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      fontSize: "clamp(16px,3.5vw,20px)",
                      color: T.white,
                    }}
                  >
                    {owner.name}
                  </div>
                  <div
                    style={{
                      color: T.gold,
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontFamily: "'Syne', sans-serif",
                      marginTop: 3,
                    }}
                  >
                    {owner.title}
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 6,
                  }}
                >
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        textAlign: "center",
                        padding: "8px 4px",
                        background: "rgba(201,168,76,0.06)",
                        border: "1px solid rgba(201,168,76,0.12)",
                        borderRadius: 7,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "clamp(14px,3vw,18px)",
                          fontWeight: 700,
                          color: T.gold,
                          fontFamily: "'Cormorant Garamond', serif",
                          lineHeight: 1,
                        }}
                      >
                        {s.num}
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(7px,1.5vw,8px)",
                          color: T.faint,
                          marginTop: 3,
                          letterSpacing: "0.06em",
                          fontFamily: "'Syne', sans-serif",
                          textTransform: "uppercase",
                          lineHeight: 1.3,
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{display: "flex", gap: 8, marginTop: 10}}>
                  {[
                    {label: "GitHub", icon: "GH", href: owner.github},
                    {label: "LinkedIn", icon: "LI", href: owner.linkedin},
                    {label: "Email", icon: "@", href: `mailto:${owner.email}`},
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      style={{
                        flex: 1,
                        padding: "8px 0",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 6,
                        textAlign: "center",
                        fontSize: 11,
                        fontWeight: 600,
                        color: T.faint,
                        textDecoration: "none",
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: "0.06em",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = T.goldBdr;
                        e.currentTarget.style.color = T.gold;
                        e.currentTarget.style.background = T.goldDim;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.07)";
                        e.currentTarget.style.color = T.faint;
                        e.currentTarget.style.background = "";
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          color: "rgba(255,255,255,0.2)",
          fontSize: 9,
          letterSpacing: "0.22em",
          fontFamily: "'Syne', sans-serif",
          textTransform: "uppercase",
          animation: "fadeIn 1s 2s both",
        }}
      >
        Scroll
        <div
          style={{
            width: 1,
            height: 40,
            background: `linear-gradient(to bottom, ${T.gold}, transparent)`,
            animation: "breathe 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}

function AboutSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "clamp(64px,8vw,110px) clamp(16px,4vw,40px)",
        background: T.ink2,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{maxWidth: 1160, margin: "0 auto"}}>
        <div
          className="two-col-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px,5vw,80px)",
            alignItems: "start",
          }}
        >
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(28px)",
              transition: "all 0.65s ease",
            }}
          >
            <SectionLabel label="Right Now" title="What I'm Up To" />
            <div
              style={{
                marginTop: 36,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {currentStatus.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    background: T.ghost,
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 8,
                    transition: "all 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = T.goldBdr;
                    e.currentTarget.style.background = T.goldDim;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.05)";
                    e.currentTarget.style.background = T.ghost;
                  }}
                >
                  <span style={{fontSize: 16, flexShrink: 0}}>{c.icon}</span>
                  <span
                    style={{
                      color: T.muted,
                      fontSize: "clamp(13px,1.8vw,14px)",
                      fontFamily: "'DM Sans', sans-serif",
                      lineHeight: 1.5,
                    }}
                  >
                    {c.text}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {education.map((e) => (
                <div
                  key={e.school}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    background: T.ghost,
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 8,
                    borderLeft: `3px solid ${e.color}`,
                  }}
                >
                  <div style={{flex: 1}}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontWeight: 600,
                          fontSize: 13,
                          color: e.color,
                        }}
                      >
                        {e.school}
                      </span>
                      <span
                        style={{
                          fontSize: 9,
                          padding: "2px 8px",
                          borderRadius: 2,
                          background: e.color + "1a",
                          color: e.color,
                          fontFamily: "'Syne', sans-serif",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {e.status}
                      </span>
                    </div>
                    <p
                      style={{
                        color: T.faint,
                        fontSize: 12,
                        fontFamily: "'DM Sans', sans-serif",
                        margin: "3px 0 0",
                      }}
                    >
                      {e.degree} · {e.dates}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(28px)",
              transition: "all 0.65s ease 0.15s",
            }}
          >
            <SectionLabel label="Philosophy" title="Why I Build Software" />
            <div
              style={{
                marginTop: 36,
                background: T.ghost,
                border: `1px solid ${T.goldBdr}`,
                borderRadius: 12,
                padding: "clamp(24px,4vw,40px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${T.gold}, transparent)`,
                }}
              />
              <blockquote style={{margin: 0, padding: 0}}>
                {philosophy.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      color: i === 0 ? T.muted : T.faint,
                      lineHeight: 1.95,
                      fontSize:
                        i === 0
                          ? "clamp(14px,2vw,16px)"
                          : "clamp(13px,1.8vw,15px)",
                      fontFamily: "'DM Sans', sans-serif",
                      margin: "0 0 20px",
                    }}
                  >
                    {p}
                  </p>
                ))}
                <p
                  style={{
                    color: "rgba(255,255,255,0.28)",
                    lineHeight: 1.95,
                    fontSize: "clamp(12px,1.6vw,14px)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  "{philosophy.quote}"
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [ref, inView] = useInView(0.05);
  return (
    <section
      id="projects"
      ref={ref}
      style={{
        padding: "clamp(64px,8vw,110px) clamp(16px,4vw,40px)",
        background: T.ink,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{maxWidth: 1160, margin: "0 auto"}}>
        <SectionLabel
          label="Work"
          title="Things I've Built"
          subtitle="Projects that solved real problems for real people, measured in time saved and outcomes."
          center
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: 20,
            marginTop: 52,
          }}
        >
          {projects.map((p, i) => (
            <article
              key={p.name}
              style={{
                background: "rgba(14,14,22,0.88)",
                border: `1px solid ${p.color}1a`,
                borderRadius: 12,
                padding: "clamp(20px,3vw,36px)",
                position: "relative",
                overflow: "hidden",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(36px)",
                transition: `all 0.65s ease ${i * 0.13}s`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = p.color + "44";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 20px 50px ${p.color}0a`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = p.color + "1a";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${p.color}, transparent)`,
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    background: p.color + "14",
                    border: `1px solid ${p.color}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    color: p.color,
                    fontWeight: 700,
                  }}
                >
                  {p.label}
                </div>
                <span
                  style={{
                    fontSize: 9,
                    padding: "4px 10px",
                    borderRadius: 2,
                    background: p.color + "14",
                    color: p.color,
                    fontFamily: "'Syne', sans-serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    alignSelf: "flex-start",
                  }}
                >
                  {p.type}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "clamp(17px,2.5vw,20px)",
                  color: T.white,
                  margin: "0 0 12px",
                  lineHeight: 1.2,
                }}
              >
                {p.name}
              </h3>
              <p
                style={{
                  color: T.muted,
                  fontSize: "clamp(13px,1.8vw,14px)",
                  lineHeight: 1.85,
                  fontFamily: "'DM Sans', sans-serif",
                  margin: "0 0 22px",
                }}
              >
                {p.story}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  paddingTop: 16,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div style={{display: "flex", flexWrap: "wrap", gap: 6}}>
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10,
                        padding: "3px 9px",
                        borderRadius: 2,
                        background: p.color + "0e",
                        color: p.color,
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: "0.06em",
                        border: `1px solid ${p.color}1a`,
                        textTransform: "uppercase",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: p.color,
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    padding: "5px 12px",
                    background: p.color + "0e",
                    borderRadius: 4,
                    letterSpacing: "0.04em",
                  }}
                >
                  ✓ {p.impact}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [ref, inView] = useInView(0.04);
  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: "clamp(64px,8vw,110px) clamp(16px,4vw,40px)",
        background: T.ink2,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{maxWidth: 1160, margin: "0 auto"}}>
        <SectionLabel
          label="Experience"
          title="Where I've Worked"
          subtitle="Nine years across three very different environments. Each one taught me something the others couldn't."
        />
        <div style={{marginTop: 56, position: "relative"}}>
          <div
            className="timeline-line"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background: `linear-gradient(to bottom, transparent, ${T.goldBdr} 15%, ${T.goldBdr} 85%, transparent)`,
              transform: "translateX(-50%)",
            }}
          />
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={exp.company}
                className="exp-row"
                style={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-start" : "flex-end",
                  marginBottom: 48,
                  position: "relative",
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? "none"
                    : `translateX(${isLeft ? -44 : 44}px)`,
                  transition: `all 0.7s ease ${i * 0.16}s`,
                }}
              >
                <article
                  style={{
                    width: "calc(50% - 36px)",
                    background: "rgba(14,14,22,0.9)",
                    border: `1px solid ${exp.color}1e`,
                    borderRadius: 12,
                    padding: "clamp(18px,2.5vw,32px)",
                    position: "relative",
                    backdropFilter: "blur(20px)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = exp.color + "44")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = exp.color + "1e")
                  }
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      borderRadius: "12px 12px 0 0",
                      background: `linear-gradient(90deg, ${exp.color}, transparent)`,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 16,
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        padding: "4px 10px",
                        borderRadius: 2,
                        background: exp.accent,
                        color: exp.color,
                        fontWeight: 600,
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {exp.period}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.2)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      fontSize: "clamp(16px,2.2vw,20px)",
                      color: T.white,
                      margin: "0 0 4px",
                    }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    style={{
                      color: exp.color,
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: "'Syne', sans-serif",
                      margin: "0 0 14px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {exp.company}
                  </p>
                  <p
                    style={{
                      color: T.muted,
                      fontSize: "clamp(12px,1.8vw,14px)",
                      lineHeight: 1.85,
                      fontFamily: "'DM Sans', sans-serif",
                      margin: "0 0 16px",
                      fontStyle: "italic",
                      borderLeft: `2px solid ${exp.color}33`,
                      paddingLeft: 12,
                    }}
                  >
                    {exp.story}
                  </p>
                  <ul style={{margin: 0, padding: 0, listStyle: "none"}}>
                    {exp.bullets.map((h) => (
                      <li
                        key={h}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          marginBottom: 8,
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "clamp(12px,1.6vw,13px)",
                          fontFamily: "'DM Sans', sans-serif",
                          lineHeight: 1.6,
                        }}
                      >
                        <span
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            background: exp.color,
                            flexShrink: 0,
                            marginTop: 8,
                          }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
                <div
                  className="timeline-dot"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 24,
                    transform: "translateX(-50%)",
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    background: exp.color,
                    boxShadow: `0 0 0 3px ${T.ink2}, 0 0 14px ${exp.color}80`,
                    zIndex: 2,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: "clamp(64px,8vw,110px) clamp(16px,4vw,40px)",
        background: T.ink,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{maxWidth: 1160, margin: "0 auto"}}>
        <SectionLabel
          label="Skills"
          title="What I Work With"
          subtitle="Organized by domain, built from 9 years of professional use, not just personal projects."
          center
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: 14,
            marginTop: 52,
          }}
        >
          {skills.map((cat, i) => (
            <div
              key={cat.cat}
              style={{
                background: "rgba(14,14,22,0.88)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "clamp(18px,2.5vw,28px)",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(24px)",
                transition: `all 0.55s ease ${i * 0.07}s`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = T.goldBdr)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
              }
            >
              <div
                style={{
                  fontSize: 10,
                  color: T.gold,
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                  fontWeight: 600,
                }}
              >
                {cat.cat}
              </div>
              <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                {cat.items.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: T.muted,
                      fontSize: "clamp(13px,1.8vw,14px)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: T.goldBdr,
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyMeSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(64px,8vw,110px) clamp(16px,4vw,40px)",
        background: T.ink2,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{maxWidth: 1160, margin: "0 auto"}}>
        <SectionLabel
          label="Why Jordan"
          title="What Working With Me Looks Like"
          subtitle="The things that actually matter when you hire someone to build your product."
          center
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: 18,
            marginTop: 52,
          }}
        >
          {whyMe.map((w, i) => (
            <div
              key={w.title}
              style={{
                background: "rgba(14,14,22,0.88)",
                border: `1px solid ${T.goldBdr}`,
                borderRadius: 10,
                padding: "clamp(20px,3vw,32px)",
                position: "relative",
                overflow: "hidden",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(28px)",
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: `linear-gradient(90deg, ${T.gold}55, transparent)`,
                }}
              />
              <div
                style={{
                  fontSize: 26,
                  color: T.gold,
                  marginBottom: 14,
                  fontWeight: 700,
                }}
              >
                {w.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "clamp(16px,2.2vw,18px)",
                  color: T.white,
                  margin: "0 0 10px",
                }}
              >
                {w.title}
              </h3>
              <p
                style={{
                  color: T.muted,
                  fontSize: "clamp(13px,1.8vw,14px)",
                  lineHeight: 1.85,
                  fontFamily: "'DM Sans', sans-serif",
                  margin: 0,
                }}
              >
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(64px,8vw,110px) clamp(16px,4vw,40px)",
        background: T.ink,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{maxWidth: 1160, margin: "0 auto"}}>
        <SectionLabel
          label="Testimonials"
          title="What Clients Say"
          subtitle="Real feedback from people I've worked with."
          center
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 20,
            marginTop: 52,
          }}
        >
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              style={{
                background: "rgba(14,14,22,0.90)",
                border: `1px solid ${t.color}1e`,
                borderRadius: 12,
                padding: "clamp(20px,3vw,36px)",
                margin: 0,
                position: "relative",
                overflow: "hidden",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(28px)",
                transition: `all 0.6s ease ${i * 0.12}s`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${t.color}, transparent)`,
                }}
              />
              <div style={{display: "flex", gap: 3, marginBottom: 18}}>
                {Array(t.stars)
                  .fill(0)
                  .map((_, j) => (
                    <span key={j} style={{color: T.gold, fontSize: 14}}>
                      ★
                    </span>
                  ))}
              </div>
              <blockquote style={{margin: "0 0 24px", padding: 0}}>
                <p
                  style={{
                    color: T.muted,
                    fontSize: "clamp(13px,1.8vw,15px)",
                    lineHeight: 1.9,
                    fontFamily: "'DM Sans', sans-serif",
                    fontStyle: "italic",
                  }}
                >
                  "{t.quote}"
                </p>
              </blockquote>
              <figcaption
                style={{display: "flex", alignItems: "center", gap: 12}}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: t.color + "20",
                    border: `1px solid ${t.color}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: t.color,
                    fontFamily: "'Syne', sans-serif",
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    style={{
                      color: T.white,
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "'Cormorant Garamond', serif",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      color: T.faint,
                      fontSize: 12,
                      fontFamily: "'DM Sans', sans-serif",
                      marginTop: 2,
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({name: "", email: "", message: ""});
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.message.trim() || form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({name: "", email: "", message: ""});
      setErrors({});
    }, 1600);
  };

  const inp = (field, placeholder, multiline) => {
    const base = {
      width: "100%",
      padding: "13px 16px",
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${errors[field] ? "#f87171" : "rgba(255,255,255,0.09)"}`,
      borderRadius: 6,
      color: T.white,
      fontSize: "clamp(13px,2vw,14px)",
      fontFamily: "'DM Sans', sans-serif",
      outline: "none",
      boxSizing: "border-box",
      resize: multiline ? "vertical" : undefined,
      minHeight: multiline ? 120 : undefined,
      transition: "border-color 0.2s",
    };
    const props = {
      style: base,
      placeholder,
      value: form[field],
      onChange: (e) => {
        setForm((f) => ({...f, [field]: e.target.value}));
        setErrors((er) => ({...er, [field]: ""}));
      },
      onFocus: (e) => (e.target.style.borderColor = T.goldBdr),
      onBlur: (e) =>
        (e.target.style.borderColor = errors[field]
          ? "#f87171"
          : "rgba(255,255,255,0.09)"),
    };
    return multiline ? (
      <textarea {...props} rows={5} aria-label={field} />
    ) : (
      <input
        {...props}
        type={field === "email" ? "email" : "text"}
        aria-label={field}
      />
    );
  };

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(64px,8vw,110px) clamp(16px,4vw,40px)",
        background: T.ink2,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="contact-grid"
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px,5vw,80px)",
          alignItems: "start",
        }}
      >
        <div>
          <SectionLabel
            label="Contact"
            title="Let's Build Something."
            subtitle="Whether you have a startup idea, need help with an existing product, or just want to connect, reach out. I respond to everyone, usually the same day."
          />
          <div
            style={{
              marginTop: 36,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {[
              {
                icon: "✉",
                label: "Email",
                value: owner.email,
                href: `mailto:${owner.email}`,
              },
              {
                icon: "💼",
                label: "LinkedIn",
                value: "linkedin.com/in/jordanmorris",
                href: owner.linkedin,
              },
              {
                icon: "⌥",
                label: "GitHub",
                value: "github.com/jordanmorris",
                href: owner.github,
              },
            ].map((l) => (
              <a
                target="_blank"
                rel="noreferrer"
                key={l.label}
                href={l.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  background: T.ghost,
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = T.goldBdr;
                  e.currentTarget.style.background = T.goldDim;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = T.ghost;
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    color: T.gold,
                    width: 26,
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  {l.icon}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: T.faint,
                      fontFamily: "'Syne', sans-serif",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    {l.label}
                  </div>
                  <div
                    style={{
                      color: T.muted,
                      fontSize: "clamp(12px,1.8vw,13px)",
                      fontFamily: "'DM Sans', sans-serif",
                      wordBreak: "break-all",
                    }}
                  >
                    {l.value}
                  </div>
                </div>
              </a>
            ))}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                padding: "14px 0",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {[
                {e: "📍", t: owner.location},
                {e: "💼", t: owner.availability},
                {e: "⏱", t: owner.responseTime},
              ].map((d) => (
                <div
                  key={d.t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: T.faint,
                    fontSize: 12,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <span>{d.e}</span>
                  {d.t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(14,14,22,0.90)",
            border: `1px solid ${T.goldBdr}`,
            borderRadius: 12,
            padding: "clamp(24px,3vw,40px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, ${T.gold}, transparent)`,
            }}
          />
          {sent ? (
            <div style={{textAlign: "center", padding: "40px 0"}}>
              <div style={{fontSize: 44, marginBottom: 16}}>✓</div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22,
                  color: T.white,
                  margin: "0 0 10px",
                }}
              >
                Message sent.
              </h3>
              <p
                style={{
                  color: T.muted,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                }}
              >
                I'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                style={{
                  marginTop: 24,
                  padding: "10px 24px",
                  background: T.goldDim,
                  border: `1px solid ${T.goldBdr}`,
                  color: T.gold,
                  borderRadius: 4,
                  cursor: "pointer",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <div style={{display: "flex", flexDirection: "column", gap: 16}}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "clamp(17px,2.5vw,20px)",
                  color: T.white,
                  margin: "0 0 2px",
                }}
              >
                Send a message
              </h3>
              <p
                style={{
                  color: T.faint,
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                  margin: 0,
                }}
              >
                I'll respond within 24 hours.
              </p>
              <div>
                {inp("name", "Your name")}
                {errors.name && (
                  <p
                    style={{
                      color: "#f87171",
                      fontSize: 11,
                      margin: "4px 0 0",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                {inp("email", "your@email.com")}
                {errors.email && (
                  <p
                    style={{
                      color: "#f87171",
                      fontSize: 11,
                      margin: "4px 0 0",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                {inp("message", "What are you working on?", true)}
                {errors.message && (
                  <p
                    style={{
                      color: "#f87171",
                      fontSize: 11,
                      margin: "4px 0 0",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                onClick={handleSubmit}
                disabled={sending}
                style={{
                  padding: "15px",
                  background: sending ? T.goldDim : T.gold,
                  color: T.ink,
                  border: "none",
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: sending ? "not-allowed" : "pointer",
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "all 0.2s",
                  opacity: sending ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!sending) {
                    e.target.style.background = T.cream;
                    e.target.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = sending ? T.goldDim : T.gold;
                  e.target.style.transform = "";
                }}
              >
                {sending ? "Sending..." : "Send Message →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        padding: "40px clamp(16px,4vw,40px)",
        background: "#060609",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: 22,
              color: T.white,
              marginBottom: 4,
            }}
          >
            {owner.shortName}
            <span style={{color: T.gold}}>.</span>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.18)",
              fontSize: 12,
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
            }}
          >
            {owner.copyright}
          </p>
        </div>
        <div style={{display: "flex", gap: 24}}>
          {[
            {label: "GitHub", href: owner.github},
            {label: "LinkedIn", href: owner.linkedin},
            {label: "Email", href: `mailto:${owner.email}`},
          ].map((l) => (
            <a
              target="_blank"
              rel="noreferrer"
              key={l.label}
              href={l.href}
              style={{
                color: "rgba(255,255,255,0.22)",
                fontSize: 12,
                textDecoration: "none",
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = T.gold)}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(255,255,255,0.22)")
              }
            >
              {l.label}
            </a>
          ))}
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.12)",
            fontSize: 11,
            fontFamily: "'DM Sans', sans-serif",
            margin: 0,
          }}
        >
          {owner.footerNote}
        </p>
      </div>
    </footer>
  );
}

function SectionLabel({label, title, subtitle, center}) {
  return (
    <div style={{textAlign: center ? "center" : "left"}}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <div style={{width: 20, height: 1, background: T.gold}} />
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: T.gold,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {label}
        </span>
        <div style={{width: 20, height: 1, background: T.gold}} />
      </div>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 700,
          fontSize: "clamp(26px, 4vw, 48px)",
          letterSpacing: "-0.01em",
          color: T.white,
          margin: 0,
          lineHeight: 1.08,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            color: T.muted,
            fontSize: "clamp(13px,2vw,15px)",
            marginTop: 14,
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.75,
            maxWidth: center ? 540 : "none",
            marginLeft: center ? "auto" : 0,
            marginRight: center ? "auto" : 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Syne:wght@400;500;600;700&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; background: #0a0a0f; color: white; }
        body { -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.35); border-radius: 2px; }
        ::selection { background: rgba(201,168,76,0.25); color: #f0ead8; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slideUp { from { opacity:0; transform:translateY(36px) } to { opacity:1; transform:none } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes breathe { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes spinSlow { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        textarea { font-family: 'DM Sans', sans-serif !important; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }

        .hero-layout {
          display: grid;
          grid-template-columns: 1fr 460px;
          gap: clamp(32px, 5vw, 80px);
          align-items: center;
        }
        .hero-card-wrap { display: flex; justify-content: center; }
        .nav-links { display: flex !important; }
        .nav-toggle { display: none !important; }
        .hire-btn { display: inline-block !important; }

        @media (max-width: 1024px) {
          .hero-layout { grid-template-columns: 1fr 380px; gap: 40px; }
        }

        @media (max-width: 767px) {
          .hero-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-card-wrap { order: -1; }
          .two-col-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .exp-row { justify-content: center !important; }
          .exp-row > article { width: 100% !important; }
          .timeline-line, .timeline-dot { display: none !important; }
          .nav-links { display: none !important; }
          .nav-toggle { display: block !important; }
          .hire-btn { display: none !important; }
        }

        @media (max-width: 480px) {
          .hero-layout { gap: 28px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }

        a:focus-visible, button:focus-visible {
          outline: 2px solid #c9a84c;
          outline-offset: 3px;
          border-radius: 2px;
        }
      `}</style>
      <ScrollProgress />
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <WhyMeSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
