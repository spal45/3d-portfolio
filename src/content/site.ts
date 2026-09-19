// Single source of truth for all site copy.
// Narrative and facts derived from Subhankar_Pal_Resume.pdf.
// Placeholders marked TODO can be swapped without touching components.

export const site = {
  name: "Subhankar Pal",
  firstName: "Subhankar",
  initials: "SP",
  title: "Software Developer",
  role: "Backend & Full-Stack Developer",
  location: "West Bengal, India",
  email: "subhankar.pal45@gmail.com",
  phone: "+91 9123635311",
  phoneHref: "tel:+919123635311",
  resumePath: "/Subhankar_Pal_Resume.pdf",
  status: "Open to opportunities",

  socials: {
    github: "https://github.com/spal45",
    // TODO: confirm your LinkedIn profile URL
    linkedin: "https://www.linkedin.com/in/",
  },

  nav: [
    { id: "pitch", label: "Pitch" },
    { id: "track-record", label: "Track Record" },
    { id: "work", label: "Work" },
    { id: "arsenal", label: "Stack" },
    { id: "contact", label: "Contact" },
  ],
} as const;

export const hero = {
  kicker: "Introducing",
  name: "Hello, I'm Subhankar.",
  missionLabel: "The Mission",
  mission: "Let's build systems that hold up in production.",
  specializationLabel: "Core Specialization",
  specialization: ["Software Developer", "& Backend Engineer"],
  focusLabel: "Engineering Focus",
  focus: "Building scalable healthcare & e-commerce systems",
  focusSub:
    "HIPAA-aligned platforms, MongoDB aggregation pipelines, secure payment gateways, and asynchronous AWS workflows.",
  scrollCue: "Scroll down to explore",
} as const;

export const pitch = {
  label: "The Pitch",
  greeting: "Hello, Recruiter.",
  headline: "Let me show you why I could be your next developer.",
  lead: "Not just someone who writes endpoints — a developer who designs data flows, secures payment and health-data workflows, and ships production-ready iterations with an agile team.",
  role: "Software Developer. Backend-focused. Compliance-aware.",
  bio: "I have nearly two years of experience building, optimizing and maintaining scalable healthcare and e-commerce applications. I work across Next.js, React, MongoDB and AWS — with a track record in robust backend architecture, complex aggregation pipelines, asynchronous workflows and secure payment integrations under strict compliance standards.",
  cardsLabel: "What do I actually bring to the table?",
  cards: [
    {
      title: "Scalable Backend Architecture",
      body: "Optimized micro-services and APIs on Next.js API Routes and Express, designed to survive growth.",
    },
    {
      title: "Cloud-Native Infrastructure",
      body: "Automated jobs and deployments across AWS Lambda, SQS, S3, App Runner, CodeBuild and CloudWatch.",
    },
    {
      title: "Secure Payment Systems",
      body: "PCI-compliant transaction processing with Stripe and the NMI gateway, including tokenization and webhooks.",
    },
    {
      title: "Compliance-Grade Engineering",
      body: "HIPAA-aligned workflows, RBAC, and immutable audit trails for protected health information (PHI).",
    },
    {
      title: "Complex Data Pipelines",
      body: "Advanced MongoDB aggregation pipelines powering reporting, inventory and commission tracking.",
    },
    {
      title: "Asynchronous Workflows",
      body: "Resilient queue-backed processing with SQS and S3 for audit logging, email and scheduled tasks.",
    },
  ],
} as const;

export const trackRecord = {
  label: "Track Record",
  headline: ["Built in production.", "Proven in practice."],
  roles: [
    {
      period: "Jul 2024 — Jun 2026",
      place: "Kalyani, West Bengal, India",
      kicker: "Healthcare & Telemedicine Platform",
      role: "Software Developer",
      company: "Creatixia",
      summary:
        "Developed and scaled a comprehensive healthcare, telemedicine and e-commerce platform on Next.js, React and MongoDB.",
      achievements: [
        "Architected core modules: product catalogs, real-time inventory tracking, order processing and custom discount engines.",
        "Integrated Stripe and NMI payment gateways for secure, PCI-compliant transaction processing.",
        "Designed granular authentication and role-based access control (RBAC) to secure sensitive workflows.",
        "Engineered optimized backend micro-services and APIs using Next.js API Routes and complex MongoDB aggregation pipelines.",
        "Built telemedicine workflows: online consultations, digital prescriptions and automated medication fulfillment.",
        "Implemented AWS Lambda jobs for scheduled tasks, dashboard metric sync and transactional email.",
        "Built resilient asynchronous audit-logging pipelines with AWS SQS and S3 to meet governance regulations.",
        "Managed CI/CD via AWS App Runner and CodeBuild, monitoring infrastructure health with CloudWatch.",
        "Enforced HIPAA-aligned security standards and secure handling of protected health information (PHI).",
      ],
      stack: [
        "Next.js",
        "React",
        "MongoDB",
        "Mongoose",
        "Stripe",
        "NMI",
        "AWS Lambda",
        "AWS SQS",
        "AWS S3",
        "App Runner",
        "CodeBuild",
        "CloudWatch",
      ],
    },
  ],
} as const;

export const work = {
  label: "Selected Work",
  headline: "Things I've built.",
  items: [
    {
      name: "ChatApp",
      role: "Solo Full-Stack Developer",
      kind: "Real-Time Messaging Microservices",
      blurb:
        "A real-time chat platform split into three independent backend services (auth, chat, mail) coordinated over MongoDB, Redis and RabbitMQ, with a Next.js frontend and JWT-authenticated Socket.IO messaging.",
      features: [
        "Socket.IO handshake authenticated with the same JWT as the REST API, not a trusted client-supplied user ID",
        "Passwordless auth via Redis-backed, rate-limited one-time email codes",
        "Cursor-based infinite scroll for message history and a paginated chat list",
        "Input validation with Zod, layered rate limiting, and CORS as an allowlist across every service",
        "Fully containerized with Docker Compose and deployed live on Railway",
      ],
      stack: ["Next.js", "Node.js", "Socket.IO", "MongoDB", "Redis", "RabbitMQ", "Docker"],
      link: "https://chatapp-sp.up.railway.app/login",
      image: "/projects/chatapp.png",
    },
    {
      name: "Digital Wallet Ledger",
      role: "Solo Backend Developer",
      kind: "Fintech Ledger System",
      blurb:
        "A backend service for moving money between wallets, built the way real financial systems are: an append-only double-entry ledger where balances are derived, never stored — not a single mutable balance column trusting every write to be correct.",
      features: [
        "Append-only double-entry ledger with a matching debit/credit entry per transfer",
        "Idempotent transfers and row-level locking verified correct under real concurrent load",
        "JWT auth with argon2 password hashing and per-route rate limiting",
        "Unit and end-to-end tests against a live Postgres, run in CI on every push",
        "Interactive OpenAPI docs and a Docker-based deploy identical locally and in production",
      ],
      stack: ["NestJS", "PostgreSQL", "Prisma", "Docker", "GitHub Actions", "Jest"],
      link: "https://digitalwalletledger-production.up.railway.app/docs",
      image: "/projects/digital-wallet-ledger.svg",
    },
  ],
} as const;

export const arsenal = {
  label: "Technical Arsenal",
  headline: "My engineering stack.",
  groups: [
    { label: "Frontend", items: ["React.js (v19)", "Next.js (v15)", "HTML5", "CSS3", "Material UI"] },
    { label: "Backend & APIs", items: ["Node.js (v22)", "Express.js (v4)", "Next.js API Routes", "REST APIs"] },
    { label: "Database", items: ["MongoDB (v8)", "PostgreSQL (v17)", "Mongoose ORM", "Aggregation Pipelines"] },
    {
      label: "Cloud & Infrastructure",
      items: ["AWS Lambda", "AWS SQS", "AWS S3", "AWS App Runner", "AWS CodeBuild", "AWS CloudWatch"],
    },
    { label: "Integrations", items: ["Stripe", "NMI Payment Gateway", "HIPAA Workflows", "Webhooks"] },
    { label: "Tools", items: ["Git", "GitHub", "Postman", "VS Code"] },
  ],
} as const;

export const philosophy = {
  label: "How I think about engineering",
  items: [
    {
      n: "01",
      title: "Compliance is architecture",
      body: "In healthcare, security and auditability aren't features bolted on later — they shape the data model from day one.",
    },
    {
      n: "02",
      title: "Data flows are the product",
      body: "Most real complexity lives in how data moves — aggregation pipelines, queues, webhooks — not in individual endpoints.",
    },
    {
      n: "03",
      title: "Make it asynchronous",
      body: "Audit logs, emails and heavy jobs belong on queues. The request path stays fast; the system stays resilient.",
    },
    {
      n: "04",
      title: "Ship, measure, iterate",
      body: "Production teaches what local development can't. I deliver small, production-ready iterations with the team.",
    },
  ],
} as const;

export const whyHire = {
  label: "So, why should you hire me?",
  headline: "I build beyond the endpoint.",
  points: [
    {
      title: "I understand the whole system.",
      body: "Databases, aggregation pipelines, cloud infrastructure, payments, deployment and production reliability.",
    },
    {
      title: "I've worked with regulated systems.",
      body: "HIPAA-aligned healthcare workflows, PCI-compliant payments, RBAC and immutable audit trails.",
    },
    {
      title: "I take ownership.",
      body: "From schema design to CI/CD on AWS, I've worked across the full software development lifecycle.",
    },
    {
      title: "I think about the product.",
      body: "Not only “how do I implement this?” but “why are we building it, and how do we build it better?”",
    },
  ],
} as const;

export const education = {
  label: "Education",
  items: [
    {
      degree: "Bachelor of Engineering — Mechanical Engineering",
      school: "Dhole Patil College of Engineering",
      meta: "Graduated 2023 · Pune, India · CGPA 7.5 / 10",
    },
    {
      degree: "Diploma",
      school: "SCM Institute of Engineering",
      meta: "2015 – 2018 · Kolkata · 7.4 / 10",
    },
  ],
} as const;

export const contact = {
  label: "Contact",
  headline: "Let's build something remarkable.",
  blurb:
    "Have a challenging backend problem, a healthcare or commerce product, or an opportunity worth discussing?",
} as const;
