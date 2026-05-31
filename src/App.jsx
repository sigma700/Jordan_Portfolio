import {useState, useEffect, useRef} from "react";

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

const experiences = [
  {
    company: "Self-Employed",
    role: "Freelance Software Engineer",
    period: "2025 – Present",
    type: "Remote · North Carolina",
    color: "#c9a84c",
    accent: "rgba(201,168,76,0.10)",
    story:
      "Went independent and haven't looked back. I work with startups and small businesses to build tools that solve real operational problems, the kind that were eating hours of someone's week before.",
    bullets: [
      "Built Python automation pipelines that cut manual processing time by 40%+ across three clients",
      "Delivered full-stack web applications end-to-end, consistently earned repeat business",
      "Advised founders on architecture early, preventing expensive re-engineering down the line",
      "Maintained 100% on-time delivery rate across all freelance engagements",
    ],
  },
  {
    company: "CGI",
    role: "Associate Software Engineer",
    period: "2020 – 2024",
    type: "Contract · Hybrid, Fairfax County, VA",
    color: "#818cf8",
    accent: "rgba(129,140,248,0.10)",
    story:
      "Four years at one of the biggest IT firms in the world. I worked on software used daily by thousands: government systems, internal tools, client-facing platforms. Humbling and educational in equal measure.",
    bullets: [
      "Built and maintained software used daily by thousands across government and commercial clients",
      "Tracked down and fixed performance bottlenecks in legacy systems, cutting response times by 35%",
      "Shipped consistently across Agile sprints and learned what 'done' actually means in a large org",
      "Wrote code that other engineers could read, extend, and trust",
    ],
  },
  {
    company: "Capital One",
    role: "Junior Software Engineer",
    period: "2016 – 2020",
    type: "Full-time · On-site, Virginia",
    color: "#4ade80",
    accent: "rgba(74,222,128,0.08)",
    story:
      "My first real engineering job, and honestly the place that made me a real engineer. Nothing focuses you like your code touching millions of financial accounts.",
    bullets: [
      "Shipped features for financial products used by millions of Capital One customers",
      "Built a test coverage initiative that raised critical-path coverage from 42% to 91%",
      "Collaborated with product, QA, and DevOps and learned how software actually ships",
      "Grew from 'writes code' to 'thinks about systems', and that was the real education",
    ],
  },
];

const projects = [
  {
    name: "Workflow Automation Platform",
    label: "⚙",
    tags: ["Python", "REST APIs", "Automation"],
    color: "#c9a84c",
    story:
      "A logistics company was manually compiling ops reports every morning. I automated the entire pipeline. The reports just show up now, and their ops team reclaimed 3 hours a day, every day.",
    impact: "3 hrs/day saved",
    type: "Freelance",
  },
  {
    name: "Real-Time Analytics Dashboard",
    label: "◈",
    tags: ["React", "Data Modeling", "PostgreSQL"],
    color: "#818cf8",
    story:
      "A client needed live KPI visibility without digging through spreadsheets. Built a React dashboard pulling from their existing data sources. They check it every morning instead of emailing me questions.",
    impact: "Real-time visibility",
    type: "Freelance",
  },
  {
    name: "Customer Onboarding Portal",
    label: "▸",
    tags: ["Full-Stack", "Node.js", "UX Design"],
    color: "#4ade80",
    story:
      "A SaaS startup's onboarding was entirely manual: PDFs, emails, back-and-forth. I designed and shipped a self-service portal. Activation time dropped from 2 days to under 20 minutes.",
    impact: "2 days → 20 min",
    type: "Freelance",
  },
];

const skills = [
  {
    cat: "Languages",
    items: ["Python", "JavaScript / TypeScript", "C++", "SQL"],
  },
  {
    cat: "Frontend",
    items: ["React", "HTML / CSS", "Responsive Design", "Accessibility"],
  },
  {cat: "Backend & APIs", items: ["Node.js", "REST APIs", "FastAPI", "Flask"]},
  {
    cat: "Data Engineering",
    items: ["Data Modeling", "Big Data", "ETL Pipelines", "Analytics"],
  },
  {cat: "Cloud & DevOps", items: ["AWS", "Git / GitHub", "CI/CD", "Linux"]},
  {cat: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"]},
];

const whyMe = [
  {
    icon: "◎",
    title: "I own the outcome.",
    body: "I don't just close tickets. I care whether the thing I built actually helped. If something's not working, I'll tell you before you notice.",
  },
  {
    icon: "◉",
    title: "I communicate clearly.",
    body: "No jargon unless you want it. I translate between engineer and human fluently. Updates are honest, estimates are realistic, and blockers surface early.",
  },
  {
    icon: "◈",
    title: "I think in systems.",
    body: "I'm not just thinking about today's feature. I'm thinking about what it costs you in six months when requirements change. Good architecture is an investment.",
  },
  {
    icon: "▸",
    title: "I ship.",
    body: "Nine years of professional experience, zero missed deadlines. I've worked at a bank, a government contractor, and on my own. The common thread: things get delivered.",
  },
];

const testimonials = [
  {
    initials: "SK",
    name: "Sarah K.",
    role: "Founder, LogiFlow",
    color: "#c9a84c",
    quote:
      "Jordan took what felt like an impossible automation problem and made it look simple. The reporting system he built pays for itself every week. Best engineering investment I've made.",
    stars: 5,
  },
  {
    initials: "MT",
    name: "Marcus T.",
    role: "CTO, Northgate SaaS",
    color: "#818cf8",
    quote:
      "Rare to find someone who can move fast and think ahead. Jordan identified three architectural issues in our MVP that would've cost us months to fix later. Hired him again immediately.",
    stars: 5,
  },
  {
    initials: "AJ",
    name: "Aisha J.",
    role: "Head of Ops, Brandwell",
    color: "#4ade80",
    quote:
      "The dashboard Jordan built transformed how our team starts every morning. Clean, fast, and he actually explained what he was building throughout. Would recommend without hesitation.",
    stars: 5,
  },
];

const stats = [
  {num: "9+", label: "Years Experience"},
  {num: "40%+", label: "Avg. Time Saved"},
  {num: "100%", label: "On-Time Delivery"},
  {num: "3", label: "Industry Domains"},
];

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
  const links = ["about", "projects", "experience", "skills", "contact"];
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
        padding: "0 40px",
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
        aria-label="Jordan Morris home"
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
          }}
        >
          <img
            src="/image.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML =
                '<span style="font-size:11px;font-weight:700;color:#c9a84c;letter-spacing:0.04em">JM</span>';
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
          Jordan<span style={{color: T.gold}}>.</span>
        </span>
      </a>

      <ul
        style={{
          display: "flex",
          gap: 36,
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
        className="nav-links"
      >
        {links.map((l) => (
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

      <div style={{display: "flex", alignItems: "center", gap: 16}}>
        <a
          href="#contact"
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
            padding: "24px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {links.map((l) => (
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
        minHeight: "100vh",
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
          width: 560,
          height: 560,
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
          width: 380,
          height: 380,
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(129,140,248,0.04) 0%, transparent 65%)",
        }}
      />

      <div
        className="hero-grid"
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "1fr 460px",
          gap: 80,
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{animation: "slideUp 0.8s ease forwards"}}>
          <h1
            style={{
              fontSize: "clamp(48px, 5.5vw, 80px)",
              fontWeight: 700,
              lineHeight: 1.02,
              margin: "0 0 8px",
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{color: T.white}}>Hey, I'm </span>
            <span style={{color: T.gold}}>Jordan.</span>
          </h1>

          <h2
            style={{
              fontSize: "clamp(20px, 2.2vw, 28px)",
              fontWeight: 400,
              color: T.muted,
              margin: "0 0 32px",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              minHeight: 40,
              letterSpacing: "0.01em",
            }}
          >
            <TypeWriter
              strings={[
                "Software Engineer.",
                "Data Engineer.",
                "Systems Consultant.",
                "I build things that work.",
              ]}
              speed={55}
            />
          </h2>

          <p
            style={{
              color: T.muted,
              lineHeight: 1.88,
              maxWidth: 520,
              margin: "0 0 14px",
              fontSize: 16,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            I'm a software engineer who enjoys solving messy problems with clean
            systems. Over 9 years across finance, government consulting, and
            freelance work, building automation tools that save real hours and
            full-stack products used by real customers every day.
          </p>
          <p
            style={{
              color: T.faint,
              lineHeight: 1.88,
              maxWidth: 520,
              margin: "0 0 44px",
              fontSize: 15,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            When I'm not coding, I'm usually hiking the Blue Ridge, deep in a
            data rabbit hole, or trying to finally learn Rust.
          </p>

          <div style={{display: "flex", gap: 16, flexWrap: "wrap"}}>
            <a
              href="#contact"
              style={{
                padding: "15px 36px",
                background: T.gold,
                color: T.ink,
                borderRadius: 4,
                fontWeight: 700,
                fontSize: 12,
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
                padding: "15px 36px",
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.12)",
                color: T.muted,
                fontSize: 12,
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
              marginTop: 52,
              display: "flex",
              flexWrap: "wrap",
              gap: 28,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 28,
            }}
          >
            {[
              {e: "☕", t: "Coffee-powered"},
              {e: "🏔", t: "Blue Ridge hiker"},
              {e: "🎓", t: "Duke MCA '27"},
              {e: "📍", t: "Morganton, NC"},
            ].map((d) => (
              <div
                key={d.t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  color: "rgba(255,255,255,0.25)",
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

        <div
          style={{
            animation: "slideUp 0.8s ease 0.18s both",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 380,
              height: 420,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: 300,
                height: 300,
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
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(10,10,15,0.92)",
                      border: `1px solid ${T.goldBdr}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
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
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  padding: 4,
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
                    src="/image.png"
                    alt="Jordan Morris"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.innerHTML =
                        '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#141424;font-size:44px;font-weight:700;color:#c9a84c;font-family:Cormorant Garamond,serif">JM</div>';
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 28,
                width: "100%",
                background: "rgba(14,14,22,0.88)",
                border: `1px solid ${T.goldBdr}`,
                borderRadius: 12,
                padding: "20px 24px",
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
              <div style={{textAlign: "center", marginBottom: 16}}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: 20,
                    color: T.white,
                  }}
                >
                  Jordan Morris
                </div>
                <div
                  style={{
                    color: T.gold,
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "'Syne', sans-serif",
                    marginTop: 3,
                  }}
                >
                  Software & Data Engineer
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: 8,
                }}
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      textAlign: "center",
                      padding: "10px 6px",
                      background: "rgba(201,168,76,0.06)",
                      border: "1px solid rgba(201,168,76,0.12)",
                      borderRadius: 8,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
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
                        fontSize: 8,
                        color: T.faint,
                        marginTop: 4,
                        letterSpacing: "0.08em",
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
              <div style={{display: "flex", gap: 8, marginTop: 12}}>
                {[
                  {label: "GitHub", icon: "GH", href: "https://github.com"},
                  {
                    label: "LinkedIn",
                    icon: "LI",
                    href: "https://www.linkedin.com/in/jordan-morris-6a0869408/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BY53wQBOcRSm86g54JfeSnw%3D%3D",
                  },
                  {
                    label: "Email",
                    icon: "@",
                    href: "mailto:jordan.morris@example.com",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    style={{
                      flex: 1,
                      padding: "9px 0",
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

      <div
        style={{
          position: "absolute",
          bottom: 36,
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
            height: 48,
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
        padding: "110px 40px",
        background: T.ink2,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{maxWidth: 1160, margin: "0 auto"}}>
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
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
                gap: 12,
              }}
            >
              {[
                {
                  icon: "🎓",
                  text: "Pursuing my MCA at Duke University, graduating 2027",
                },
                {
                  icon: "⚙",
                  text: "Building Python automation tools for small businesses",
                },
                {
                  icon: "☁",
                  text: "Going deep on cloud-native architecture (AWS, mostly)",
                },
                {
                  icon: "🤝",
                  text: "Open to freelance projects and consulting work",
                },
                {icon: "📍", text: "Based in Morganton, North Carolina"},
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "16px 20px",
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
                  <span style={{fontSize: 18, flexShrink: 0}}>{c.icon}</span>
                  <span
                    style={{
                      color: T.muted,
                      fontSize: 14,
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
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                {
                  school: "Duke University",
                  degree: "MCA — Data Processing & Technology",
                  dates: "2025 – 2027",
                  color: "#c9a84c",
                  status: "In Progress",
                },
                {
                  school: "University of Virginia",
                  degree: "BTech — Computer Science",
                  dates: "2013 – 2017",
                  color: "#818cf8",
                  status: "Completed",
                },
              ].map((e) => (
                <div
                  key={e.school}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "16px 20px",
                    background: T.ghost,
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 8,
                    borderLeft: `3px solid ${e.color}`,
                  }}
                >
                  <div style={{flex: 1}}>
                    <div
                      style={{display: "flex", alignItems: "center", gap: 8}}
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
                padding: 40,
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
                <p
                  style={{
                    color: T.muted,
                    lineHeight: 1.95,
                    fontSize: 16,
                    fontFamily: "'DM Sans', sans-serif",
                    margin: "0 0 20px",
                  }}
                >
                  I got into software because I liked puzzles. I stayed because
                  I realised you could build a thing on a Tuesday that a real
                  person would use on a Wednesday to do their job faster.
                </p>
                <p
                  style={{
                    color: T.faint,
                    lineHeight: 1.95,
                    fontSize: 15,
                    fontFamily: "'DM Sans', sans-serif",
                    margin: "0 0 20px",
                  }}
                >
                  That feedback loop of building something and watching someone
                  actually use it never gets old. It's what keeps me coming
                  back.
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.28)",
                    lineHeight: 1.95,
                    fontSize: 14,
                    fontFamily: "'DM Sans', sans-serif",
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  "Good software isn't the cleverest code. It's the thing that
                  gets out of the way and lets people do what they came to do."
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
        padding: "110px 40px",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
            marginTop: 60,
          }}
        >
          {projects.map((p, i) => (
            <article
              key={p.name}
              style={{
                background: "rgba(14,14,22,0.88)",
                border: `1px solid ${p.color}1a`,
                borderRadius: 12,
                padding: 36,
                position: "relative",
                overflow: "hidden",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(36px)",
                transition: `all 0.65s ease ${i * 0.13}s`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = p.color + "44";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = `0 24px 60px ${p.color}0a`;
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
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: p.color + "14",
                    border: `1px solid ${p.color}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
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
                  fontSize: 20,
                  color: T.white,
                  margin: "0 0 14px",
                  lineHeight: 1.2,
                }}
              >
                {p.name}
              </h3>
              <p
                style={{
                  color: T.muted,
                  fontSize: 14,
                  lineHeight: 1.85,
                  fontFamily: "'DM Sans', sans-serif",
                  margin: "0 0 24px",
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
                  paddingTop: 18,
                }}
              >
                <div style={{display: "flex", flexWrap: "wrap", gap: 6}}>
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10,
                        padding: "3px 10px",
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
                    marginLeft: 16,
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
        padding: "110px 40px",
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
        <div style={{marginTop: 64, position: "relative"}}>
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
                  marginBottom: 60,
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
                    width: "calc(50% - 40px)",
                    background: "rgba(14,14,22,0.9)",
                    border: `1px solid ${exp.color}1e`,
                    borderRadius: 12,
                    padding: 32,
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
                      marginBottom: 18,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        padding: "5px 12px",
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
                      fontSize: 20,
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
                      margin: "0 0 16px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {exp.company}
                  </p>
                  <p
                    style={{
                      color: T.muted,
                      fontSize: 14,
                      lineHeight: 1.85,
                      fontFamily: "'DM Sans', sans-serif",
                      margin: "0 0 18px",
                      fontStyle: "italic",
                      borderLeft: `2px solid ${exp.color}33`,
                      paddingLeft: 14,
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
                          marginBottom: 9,
                          color: "rgba(255,255,255,0.5)",
                          fontSize: 13,
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
                    top: 28,
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
        padding: "110px 40px",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            marginTop: 60,
          }}
        >
          {skills.map((cat, i) => (
            <div
              key={cat.cat}
              style={{
                background: "rgba(14,14,22,0.88)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: 28,
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
                  marginBottom: 16,
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
                      fontSize: 14,
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
        padding: "110px 40px",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            marginTop: 60,
          }}
        >
          {whyMe.map((w, i) => (
            <div
              key={w.title}
              style={{
                background: "rgba(14,14,22,0.88)",
                border: `1px solid ${T.goldBdr}`,
                borderRadius: 10,
                padding: 32,
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
                  fontSize: 28,
                  color: T.gold,
                  marginBottom: 16,
                  fontWeight: 700,
                }}
              >
                {w.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: T.white,
                  margin: "0 0 12px",
                }}
              >
                {w.title}
              </h3>
              <p
                style={{
                  color: T.muted,
                  fontSize: 14,
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
        padding: "110px 40px",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            marginTop: 60,
          }}
        >
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              style={{
                background: "rgba(14,14,22,0.90)",
                border: `1px solid ${t.color}1e`,
                borderRadius: 12,
                padding: 36,
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
              <div style={{display: "flex", gap: 3, marginBottom: 20}}>
                {Array(t.stars)
                  .fill(0)
                  .map((_, j) => (
                    <span key={j} style={{color: T.gold, fontSize: 14}}>
                      ★
                    </span>
                  ))}
              </div>
              <blockquote style={{margin: "0 0 28px", padding: 0}}>
                <p
                  style={{
                    color: T.muted,
                    fontSize: 15,
                    lineHeight: 1.9,
                    fontFamily: "'DM Sans', sans-serif",
                    fontStyle: "italic",
                  }}
                >
                  "{t.quote}"
                </p>
              </blockquote>
              <figcaption
                style={{display: "flex", alignItems: "center", gap: 14}}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: t.color + "20",
                    border: `1px solid ${t.color}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
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
      padding: "14px 18px",
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${errors[field] ? "#f87171" : "rgba(255,255,255,0.09)"}`,
      borderRadius: 6,
      color: T.white,
      fontSize: 14,
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
        padding: "110px 40px",
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
          width: 700,
          height: 700,
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
          gap: 80,
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
              marginTop: 44,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {[
              {
                icon: "✉",
                label: "Email",
                value: "jordan.morris@example.com",
                href: "mailto:jordan.morris@example.com",
              },
              {
                icon: "💼",
                label: "LinkedIn",
                value: "linkedin.com/in/jordanmorris",
                href: "https://www.linkedin.com/in/jordan-morris-6a0869408/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BY53wQBOcRSm86g54JfeSnw%3D%3D",
              },
              {
                icon: "⌥",
                label: "GitHub",
                value: "github.com/jordanmorris",
                href: "https://github.com",
              },
            ].map((l) => (
              <a
                target="blank"
                key={l.label}
                href={l.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 20px",
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
                    width: 28,
                    textAlign: "center",
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
                      fontSize: 13,
                      fontFamily: "'DM Sans', sans-serif",
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
                gap: 24,
                padding: "16px 0",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {[
                {e: "📍", t: "Morganton, NC"},
                {e: "💼", t: "Remote · Hybrid · On-site"},
                {e: "⏱", t: "Replies same day"},
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
            padding: 40,
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
            <div style={{display: "flex", flexDirection: "column", gap: 18}}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: T.white,
                  margin: "0 0 4px",
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
                  padding: "16px",
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
        padding: "48px 40px",
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
            Jordan<span style={{color: T.gold}}>.</span>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.18)",
              fontSize: 12,
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
            }}
          >
            © 2025 Jordan Morris · Software & Data Engineer
          </p>
        </div>
        <div style={{display: "flex", gap: 28}}>
          {["GitHub", "LinkedIn", "Email"].map((l) => (
            <a
              target="blank"
              key={l}
              href="#contact"
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
              {l}
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
          Built with React · Morganton, NC
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
          marginBottom: 16,
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
          fontSize: "clamp(30px, 3.2vw, 48px)",
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
            fontSize: 15,
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
        @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(74,222,128,0.6)} 70%{box-shadow:0 0 0 8px rgba(74,222,128,0)} 100%{box-shadow:0 0 0 0 rgba(74,222,128,0)} }
        @keyframes spinSlow { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        textarea { font-family: 'DM Sans', sans-serif !important; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .exp-row { justify-content: center !important; }
          .exp-row > article { width: 100% !important; }
          .timeline-line, .timeline-dot { display: none !important; }
          .nav-links { display: none !important; }
          .nav-toggle { display: block !important; }
        }
        @media (max-width: 600px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
          nav { padding-left: 20px !important; padding-right: 20px !important; }
          footer { padding-left: 20px !important; padding-right: 20px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
        a:focus-visible, button:focus-visible { outline: 2px solid #c9a84c; outline-offset: 3px; border-radius: 2px; }
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
