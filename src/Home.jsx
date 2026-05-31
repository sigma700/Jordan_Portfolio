import {useState, useEffect, useRef} from "react";

const CYAN = "#06b6d4";
const CYAN_DIM = "rgba(6,182,212,0.12)";
const CYAN_BORDER = "rgba(6,182,212,0.25)";
const NAVY = "#050c1a";
const NAVY2 = "#081022";
const CARD_BG = "rgba(8,16,34,0.85)";

/* ── DATA ─────────────────────────────────────────────── */
const experiences = [
  {
    company: "Self Employed",
    role: "Freelance Software Engineer",
    period: "2025 – Present",
    type: "Hybrid · North Carolina, US",
    color: "#06b6d4",
    accent: "rgba(6,182,212,0.1)",
    desc: "Operating as an independent consultant delivering robust, scalable software infrastructure and Python-driven solutions across multiple industries.",
    highlights: [
      "Architected and shipped custom software infrastructure for diverse clients",
      "Built Python automation pipelines, cutting manual processing time by 40%+",
      "Delivered full-stack web applications with consistent 5-star client satisfaction",
      "Provided technical consultation on architecture decisions for startups and SMEs",
    ],
  },
  {
    company: "CGI",
    role: "Associate Software Engineer",
    period: "2020 – 2024",
    type: "Contract · Hybrid, Fairfax County, VA",
    color: "#818cf8",
    accent: "rgba(129,140,248,0.1)",
    desc: "Contract engineer embedded within cross-functional teams at one of the world's largest IT consulting firms, delivering mission-critical software for public and private sector clients.",
    highlights: [
      "Designed and built enterprise-grade software infrastructure for thousands of end-users",
      "Shipped features on schedule across Agile sprints, meeting all client SLAs",
      "Resolved critical performance bottlenecks in legacy systems, improving response times 35%",
      "Collaborated with senior architects on scalable, maintainable codebases",
    ],
  },
  {
    company: "Capital One",
    role: "Junior Software Engineer",
    period: "2016 – 2020",
    type: "Full-time · On-site, Virginia, US",
    color: "#34d399",
    accent: "rgba(52,211,153,0.1)",
    desc: "Began professional engineering career at Capital One, building and maintaining software solutions for financial products serving millions of customers.",
    highlights: [
      "Developed and shipped features for customer-facing financial products at scale",
      "Improved software development documentation, increasing team onboarding efficiency",
      "Collaborated across product, QA, and DevOps for seamless software releases",
      "Built strong foundations in software infrastructure and development best practices",
    ],
  },
];

const skills = [
  {name: "Python", icon: "🐍"},
  {name: "Software Infrastructure", icon: "🏗️"},
  {name: "Data Analysis", icon: "📊"},
  {name: "Big Data", icon: "🗄️"},
  {name: "Data Modeling", icon: "🧩"},
  {name: "RESTful APIs", icon: "🔌"},
  {name: "C++", icon: "⚙️"},
  {name: "Software Development", icon: "💻"},
  {name: "Client Relations", icon: "🤝"},
];

const stats = [
  {num: "9+", label: "Years Experience"},
  {num: "3", label: "Major Employers"},
  {num: "100%", label: "Client Retention"},
  {num: "2", label: "Degrees"},
];

/* ── HOOKS ─────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
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

/* ── COMPONENTS ────────────────────────────────────────── */

function TypeWriter({strings, speed = 60}) {
  const [text, setText] = useState("");
  const [si, setSi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = strings[si];
    const delay = deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, ci + 1));
        if (ci + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCi((c) => c + 1);
        }
      } else {
        setText(current.slice(0, ci - 1));
        if (ci - 1 === 0) {
          setDeleting(false);
          setSi((s) => (s + 1) % strings.length);
          setCi(0);
        } else {
          setCi((c) => c - 1);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, si, ci, deleting, strings, speed]);
  return (
    <span>
      {text}
      <span style={{animation: "blink 1s step-end infinite", color: CYAN}}>
        |
      </span>
    </span>
  );
}

function NavBar({active}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["about", "experience", "skills", "contact"];
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "12px 24px",
        background: scrolled ? "rgba(5,12,26,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${CYAN_BORDER}` : "none",
        transition: "all 0.4s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{display: "flex", alignItems: "center", gap: 10}}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: CYAN_DIM,
            border: `1px solid ${CYAN_BORDER}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            color: CYAN,
            fontFamily: "'Space Mono', monospace",
          }}
        >
          JM
        </div>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: "0.05em",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          JORDAN<span style={{color: CYAN}}>.</span>DEV
        </span>
      </div>
      <ul
        style={{
          display: "flex",
          gap: 32,
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
                color: active === l ? CYAN : "rgba(255,255,255,0.55)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "color 0.2s",
                fontFamily: "'Space Mono', monospace",
              }}
              onMouseEnter={(e) => (e.target.style.color = CYAN)}
              onMouseLeave={(e) =>
                (e.target.style.color =
                  active === l ? CYAN : "rgba(255,255,255,0.55)")
              }
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        style={{
          padding: "8px 20px",
          border: `1px solid ${CYAN_BORDER}`,
          color: CYAN,
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 600,
          textDecoration: "none",
          letterSpacing: "0.06em",
          fontFamily: "'Space Mono', monospace",
          background: CYAN_DIM,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(6,182,212,0.2)";
          e.target.style.borderColor = CYAN;
        }}
        onMouseLeave={(e) => {
          e.target.style.background = CYAN_DIM;
          e.target.style.borderColor = CYAN_BORDER;
        }}
      >
        HIRE ME →
      </a>
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
        background: NAVY,
        overflow: "hidden",
        paddingTop: 80,
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
          linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          width: "100%",
        }}
        className="hero-grid"
      >
        {/* Left text */}
        <div style={{animation: "fadeInLeft 0.9s ease forwards"}}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 4,
              border: `1px solid ${CYAN_BORDER}`,
              background: CYAN_DIM,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: CYAN,
                display: "block",
                animation: "pulseRing 2s ease-out infinite",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: CYAN,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              Open to Work · US + Remote
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(44px, 5vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              margin: "0 0 16px",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{color: "rgba(255,255,255,0.9)"}}>Jordan</span>{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${CYAN}, #818cf8)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Morris
            </span>
          </h1>

          <div
            style={{
              fontSize: "clamp(18px, 2vw, 26px)",
              fontWeight: 500,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 24px",
              fontFamily: "'Space Grotesk', sans-serif",
              minHeight: 38,
            }}
          >
            <TypeWriter
              strings={[
                "Software Engineer",
                "Data Engineer",
                "Systems Consultant",
                "Full-Stack Developer",
              ]}
              speed={55}
            />
          </div>

          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.75,
              maxWidth: 480,
              margin: "0 0 36px",
              fontSize: 15,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            9+ years delivering production-grade software across finance,
            government consulting, and independent practice. Currently pursuing
            an MCA at Duke University while available for hybrid &amp; remote
            engagements.
          </p>

          <div style={{display: "flex", gap: 16, flexWrap: "wrap"}}>
            <a
              href="#contact"
              style={{
                padding: "14px 32px",
                background: `linear-gradient(135deg, ${CYAN}, #0891b2)`,
                color: "#050c1a",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                letterSpacing: "0.04em",
                fontFamily: "'Space Mono', monospace",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = `0 12px 40px rgba(6,182,212,0.35)`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "";
                e.target.style.boxShadow = "";
              }}
            >
              LET'S CONNECT →
            </a>
            <a
              href="#experience"
              style={{
                padding: "14px 32px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 14,
                textDecoration: "none",
                fontWeight: 600,
                fontFamily: "'Space Mono', monospace",
                background: "rgba(255,255,255,0.03)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = CYAN_BORDER;
                e.target.style.color = CYAN;
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.12)";
                e.target.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              VIEW WORK
            </a>
          </div>

          {/* Location badge */}
          <div
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "rgba(255,255,255,0.35)",
              fontSize: 13,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            <span style={{color: CYAN}}>◎</span>
            Morganton, North Carolina, United States
            <span style={{margin: "0 8px", color: "rgba(255,255,255,0.15)"}}>
              |
            </span>
            <span style={{color: CYAN}}>◎</span>
            Duke University, Class of 2027
          </div>
        </div>

        {/* Right — glassy card */}
        <div
          style={{
            animation: "fadeInRight 0.9s ease 0.2s both",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 360,
              maxWidth: "100%",
            }}
          >
            {/* Main card */}
            <div
              style={{
                background: "rgba(8,16,34,0.8)",
                border: `1px solid ${CYAN_BORDER}`,
                borderRadius: 20,
                padding: 36,
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Avatar placeholder */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${CYAN_DIM}, rgba(129,140,248,0.15))`,
                  border: `2px solid ${CYAN_BORDER}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  fontWeight: 800,
                  color: CYAN,
                  fontFamily: "'Space Grotesk', sans-serif",
                  marginBottom: 20,
                }}
              >
                JM
              </div>

              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  margin: "0 0 4px",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Jordan Morris
              </h3>
              <p
                style={{
                  color: CYAN,
                  fontSize: 13,
                  margin: "0 0 24px",
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "0.05em",
                }}
              >
                Software & Data Engineer Consultant
              </p>

              {/* Stats grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "rgba(6,182,212,0.05)",
                      border: "1px solid rgba(6,182,212,0.15)",
                      borderRadius: 10,
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: CYAN,
                        fontFamily: "'Space Grotesk', sans-serif",
                        lineHeight: 1,
                      }}
                    >
                      {s.num}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.45)",
                        marginTop: 4,
                        letterSpacing: "0.06em",
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {s.label.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating chips */}
            <div
              style={{
                position: "absolute",
                top: -16,
                right: -20,
                background: "rgba(52,211,153,0.1)",
                border: "1px solid rgba(52,211,153,0.3)",
                borderRadius: 8,
                padding: "8px 14px",
                color: "#34d399",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "'Space Mono', monospace",
                animation: "floatY 3.5s ease-in-out infinite",
              }}
            >
              ✦ Duke University MCA
            </div>

            <div
              style={{
                position: "absolute",
                bottom: -16,
                left: -20,
                background: "rgba(129,140,248,0.1)",
                border: "1px solid rgba(129,140,248,0.3)",
                borderRadius: 8,
                padding: "8px 14px",
                color: "#818cf8",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "'Space Mono', monospace",
                animation: "floatY 4.5s ease-in-out infinite 1s",
              }}
            >
              ✦ Open to Work
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(255,255,255,0.25)",
          fontSize: 10,
          letterSpacing: "0.2em",
          fontFamily: "'Space Mono', monospace",
          animation: "fadeIn 1s 2s both",
        }}
      >
        SCROLL
        <div
          style={{
            width: 1,
            height: 50,
            background: `linear-gradient(to bottom, ${CYAN}, transparent)`,
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}

function AboutSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "100px 40px",
        background: NAVY2,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{maxWidth: 1200, margin: "0 auto"}}>
        <SectionLabel label="About" title="The Engineer Behind the Code" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            marginTop: 60,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
          className="about-grid"
        >
          {/* Bio */}
          <div
            style={{
              background: CARD_BG,
              border: `1px solid rgba(255,255,255,0.06)`,
              borderRadius: 16,
              padding: 36,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: CYAN_DIM,
                border: `1px solid ${CYAN_BORDER}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: CYAN,
                fontSize: 20,
                marginBottom: 20,
              }}
            >
              ◈
            </div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                margin: "0 0 16px",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              Professional Summary
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                margin: "0 0 16px",
              }}
            >
              Results-driven Software & Data Engineer Consultant with 9+ years
              of progressive experience building robust, scalable systems across
              finance, government IT, and independent consulting.
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                margin: 0,
              }}
            >
              Combines deep engineering expertise with strong data skills to
              deliver high-impact products. Currently pursuing an MCA at Duke
              University (2025–2027) while available for hybrid &amp; remote
              engagements.
            </p>
          </div>

          {/* Education */}
          <div
            style={{
              background: CARD_BG,
              border: `1px solid rgba(255,255,255,0.06)`,
              borderRadius: 16,
              padding: 36,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "rgba(129,140,248,0.1)",
                border: "1px solid rgba(129,140,248,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#818cf8",
                fontSize: 20,
                marginBottom: 20,
              }}
            >
              ◉
            </div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                margin: "0 0 24px",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              Education
            </h3>

            {[
              {
                school: "Duke University",
                degree: "Master of Computer Applications",
                field: "Data Processing & Technology",
                dates: "Feb 2025 – Feb 2027",
                status: "Ongoing",
                color: "#06b6d4",
              },
              {
                school: "University of Virginia",
                degree: "Bachelor of Technology",
                field: "Computer Science",
                dates: "Jul 2013 – Sep 2017",
                status: "Completed",
                color: "#818cf8",
              },
            ].map((e) => (
              <div
                key={e.school}
                style={{
                  paddingLeft: 16,
                  marginBottom: 20,
                  borderLeft: `2px solid ${e.color}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      color: e.color,
                    }}
                  >
                    {e.school}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: e.color + "18",
                      color: e.color,
                      fontFamily: "'Space Mono', monospace",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {e.status}
                  </span>
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif",
                    margin: "0 0 2px",
                  }}
                >
                  {e.degree} — {e.field}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: 12,
                    fontFamily: "'Space Mono', monospace",
                    margin: 0,
                  }}
                >
                  {e.dates}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [ref, inView] = useInView(0.05);
  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: "100px 40px",
        background: NAVY,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{maxWidth: 1200, margin: "0 auto"}}>
        <SectionLabel label="Experience" title="Where I've Built Things" />

        <div style={{marginTop: 60, position: "relative"}}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background: `linear-gradient(to bottom, transparent, ${CYAN_BORDER} 15%, ${CYAN_BORDER} 85%, transparent)`,
              transform: "translateX(-50%)",
            }}
            className="timeline-line"
          />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={exp.company}
                style={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-start" : "flex-end",
                  marginBottom: 56,
                  position: "relative",
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? "none"
                    : `translateX(${isLeft ? -40 : 40}px)`,
                  transition: `all 0.7s ease ${i * 0.15}s`,
                }}
                className="exp-row"
              >
                <div
                  style={{
                    width: "calc(50% - 32px)",
                    background: CARD_BG,
                    border: `1px solid ${exp.color}22`,
                    borderRadius: 16,
                    padding: 32,
                    position: "relative",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  {/* Top accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      borderRadius: "16px 16px 0 0",
                      background: `linear-gradient(90deg, ${exp.color}, transparent)`,
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        background: exp.accent,
                        border: `1px solid ${exp.color}33`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        color: exp.color,
                      }}
                    >
                      ◈
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        padding: "4px 12px",
                        borderRadius: 6,
                        background: exp.accent,
                        color: exp.color,
                        fontWeight: 600,
                        fontFamily: "'Space Mono', monospace",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "rgba(255,255,255,0.9)",
                      margin: "0 0 4px",
                    }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    style={{
                      color: exp.color,
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "'Space Mono', monospace",
                      margin: "0 0 4px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {exp.company}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      fontSize: 12,
                      fontFamily: "'Space Mono', monospace",
                      margin: "0 0 16px",
                    }}
                  >
                    {exp.type}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 14,
                      lineHeight: 1.7,
                      fontFamily: "'DM Sans', sans-serif",
                      margin: "0 0 16px",
                    }}
                  >
                    {exp.desc}
                  </p>

                  <ul style={{margin: 0, padding: 0, listStyle: "none"}}>
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          marginBottom: 8,
                          color: "rgba(255,255,255,0.6)",
                          fontSize: 13,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: exp.color,
                            flexShrink: 0,
                            marginTop: 6,
                          }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Center dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 28,
                    transform: "translateX(-50%)",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: exp.color,
                    boxShadow: `0 0 18px ${exp.color}80`,
                    zIndex: 2,
                  }}
                  className="timeline-dot"
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
  const [ref, inView] = useInView(0.15);
  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: "100px 40px",
        background: NAVY2,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{maxWidth: 1200, margin: "0 auto"}}>
        <SectionLabel label="Skills" title="Tech & Expertise" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 14,
            marginTop: 60,
          }}
        >
          {skills.map((s, i) => (
            <div
              key={s.name}
              style={{
                background: CARD_BG,
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "default",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(20px)",
                transition: `all 0.5s ease ${i * 0.06}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = CYAN_BORDER;
                e.currentTarget.style.background = CYAN_DIM;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.background = CARD_BG;
                e.currentTarget.style.transform = "";
              }}
            >
              <span style={{fontSize: 18}}>{s.icon}</span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        padding: "100px 40px",
        background: NAVY,
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
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionLabel label="Contact" title="Let's Build Something" center />
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.8,
            fontSize: 15,
            maxWidth: 500,
            margin: "0 auto 48px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Open for new engagements — on-site, hybrid, or remote. Whether it's a
          full product build, consulting, or systems work, let's talk.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
          }}
        >
          <a
            href="mailto:jordan.morris@example.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 40px",
              borderRadius: 10,
              background: `linear-gradient(135deg, ${CYAN}, #0891b2)`,
              color: "#050c1a",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              letterSpacing: "0.05em",
              fontFamily: "'Space Mono', monospace",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = `0 16px 50px rgba(6,182,212,0.4)`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "";
              e.target.style.boxShadow = "";
            }}
          >
            ✉ SEND A MESSAGE
          </a>

          <div
            style={{
              display: "flex",
              gap: 32,
              marginTop: 12,
              color: "rgba(255,255,255,0.35)",
              fontSize: 13,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            <span>Morganton, NC · United States</span>
            <span style={{color: CYAN_BORDER}}>|</span>
            <span>On-site · Hybrid · Remote</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        padding: "40px",
        background: "#030810",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: "0.05em",
          color: "rgba(255,255,255,0.8)",
          marginBottom: 12,
        }}
      >
        JORDAN<span style={{color: CYAN}}>.</span>DEV
      </div>
      <p
        style={{
          color: "rgba(255,255,255,0.2)",
          fontSize: 12,
          fontFamily: "'Space Mono', monospace",
        }}
      >
        © 2025 Jordan Morris · Software & Data Engineer Consultant
      </p>
    </footer>
  );
}

function SectionLabel({label, title, center}) {
  return (
    <div style={{textAlign: center ? "center" : "left"}}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <div style={{width: 24, height: 1, background: CYAN}} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: CYAN,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          {label}
        </span>
        <div style={{width: 24, height: 1, background: CYAN}} />
      </div>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(28px, 3vw, 44px)",
          letterSpacing: "-0.02em",
          color: "rgba(255,255,255,0.9)",
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ── SCROLL PROGRESS BAR ─────────────────────────────────── */
function ScrollBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      setPct((window.scrollY / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", h);
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
        background: `linear-gradient(90deg, ${CYAN}, #818cf8)`,
        transition: "width 0.1s linear",
      }}
    />
  );
}

/* ── ROOT ────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; background: ${NAVY}; color: white; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${NAVY}; }
        ::-webkit-scrollbar-thumb { background: ${CYAN}44; border-radius: 2px; }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes fadeInLeft { from { opacity:0; transform: translateX(-40px); } to { opacity:1; transform:none; } }
        @keyframes fadeInRight { from { opacity:0; transform: translateX(40px); } to { opacity:1; transform:none; } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes floatY { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-10px) } }
        @keyframes pulseRing { 0% { box-shadow:0 0 0 0 rgba(6,182,212,0.5) } 70% { box-shadow:0 0 0 8px rgba(6,182,212,0) } 100% { box-shadow:0 0 0 0 rgba(6,182,212,0) } }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 0 20px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .exp-row { justify-content: center !important; }
          .exp-row > div:first-child { width: 100% !important; }
          .timeline-line, .timeline-dot { display: none !important; }
          .nav-links { display: none !important; }
        }
      `}</style>
      <ScrollBar />
      <NavBar />
      <main style={{fontFamily: "'DM Sans', sans-serif"}}>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
