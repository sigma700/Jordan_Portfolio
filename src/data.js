export const owner = {
  name: "Jordan Morris",
  shortName: "Jordan",
  tagline: [
    "Software Engineer.",
    "Data Engineer.",
    "Systems Consultant.",
    "I build things that work.",
  ],
  title: "Software & Data Engineer",
  bio: "I'm a software engineer who enjoys solving messy problems with clean systems. Over 9 years across finance, government consulting, and freelance work, building automation tools that save real hours and full-stack products used by real customers every day.",
  bioExtra:
    "When I'm not coding, I'm usually hiking the Blue Ridge, deep in a data rabbit hole, or trying to finally learn Rust.",
  location: "Morganton, NC",
  email: "jordan.morris@example.com",
  github: "https://github.com",
  linkedin:
    "https://www.linkedin.com/in/jordan-morris-6a0869408/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BY53wQBOcRSm86g54JfeSnw%3D%3D",
  photo: "/image.png",
  funFacts: [
    {emoji: "☕", label: "Coffee-powered"},
    {emoji: "🏔", label: "Blue Ridge hiker"},
    {emoji: "🎓", label: "Duke MCA '27"},
    {emoji: "📍", label: "Morganton, NC"},
  ],
  availability: "Remote · Hybrid · On-site",
  responseTime: "Replies same day",
  footerNote: "Built with React · Morganton, NC",
  copyright: "© 2025 Jordan Morris · Software & Data Engineer",
};

// ─── STATS ───────────────────────────────────────────────────────────────────
export const stats = [
  {num: "9+", label: "Years Exp."},
  {num: "40%+", label: "Time Saved"},
  {num: "100%", label: "On-Time"},
  {num: "3", label: "Domains"},
];

export const currentStatus = [
  {icon: "🎓", text: "Pursuing my MCA at Duke University, graduating 2027"},
  {icon: "⚙", text: "Building Python automation tools for small businesses"},
  {icon: "☁", text: "Going deep on cloud-native architecture (AWS, mostly)"},
  {icon: "🤝", text: "Open to freelance projects and consulting work"},
  {icon: "📍", text: "Based in Morganton, North Carolina"},
];

export const education = [
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
];

export const philosophy = {
  paragraphs: [
    "I got into software because I liked puzzles. I stayed because I realised you could build a thing on a Tuesday that a real person would use on a Wednesday to do their job faster.",
    "That feedback loop of building something and watching someone actually use it never gets old. It's what keeps me coming back.",
  ],
  quote:
    "Good software isn't the cleverest code. It's the thing that gets out of the way and lets people do what they came to do.",
};

export const experiences = [
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

export const projects = [
  {
    name: "Workflow Automation Platform",
    label: "⚙",
    tags: ["Python", "REST APIs", "Automation"],
    color: "#c9a84c",
    story:
      "A logistics company was manually compiling ops reports every morning. I automated the entire pipeline. The reports just show up now, and their ops team reclaimed 3 hours a day, every day.",
    impact: "3 hrs/day saved",
    type: "Freelance",
    link: null, // e.g. "https://github.com/jordanmorris/workflow-automation"
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
    link: null,
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
    link: null,
  },
];

export const skills = [
  {
    cat: "Languages",
    items: ["Python", "JavaScript / TypeScript", "C++", "SQL"],
  },
  {
    cat: "Frontend",
    items: ["React", "HTML / CSS", "Responsive Design", "Accessibility"],
  },
  {
    cat: "Backend & APIs",
    items: ["Node.js", "REST APIs", "FastAPI", "Flask"],
  },
  {
    cat: "Data Engineering",
    items: ["Data Modeling", "Big Data", "ETL Pipelines", "Analytics"],
  },
  {
    cat: "Cloud & DevOps",
    items: ["AWS", "Git / GitHub", "CI/CD", "Linux"],
  },
  {
    cat: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
];

// ─── WHY ME ──────────────────────────────────────────────────────────────────
export const whyMe = [
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

export const testimonials = [
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

// ─── NAV LINKS ───────────────────────────────────────────────────────────────
// Change order or labels here to reorder / rename nav items.
export const navLinks = [
  "about",
  "projects",
  "experience",
  "skills",
  "contact",
];
