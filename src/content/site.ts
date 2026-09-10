// Single source of truth for all site copy.
// Everything here is derived from Subhankar_Pal_Resume.pdf.
// Placeholder values (marked TODO) can be swapped without touching components.

export const site = {
  name: "Subhankar Pal",
  initials: "SP",
  title: "Full-Stack Developer",
  tagline:
    "I build, optimize and scale healthcare and e-commerce platforms — resilient backends, performant frontends, and the AWS plumbing in between.",
  location: "West Bengal, India",
  email: "subhankar.pal45@gmail.com",
  phone: "+91 9123635311",
  phoneHref: "tel:+919123635311",
  resumePath: "/Subhankar_Pal_Resume.pdf",
  availability: "Open to full-stack / backend roles",

  socials: {
    // TODO: replace with real profile URLs
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/in/",
  },

  nav: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],
} as const;

export const hero = {
  eyebrow: "Full-Stack Developer",
  headline: ["Architecting scalable", "healthcare & e-commerce systems"],
  sub: "Nearly 2 years building production platforms with Next.js, React, MongoDB and AWS — payment gateways, RBAC, aggregation pipelines and asynchronous cloud workflows.",
  ctas: [
    { label: "View Work", href: "#projects", primary: true },
    { label: "Download Résumé", href: "/Subhankar_Pal_Resume.pdf", primary: false },
  ],
} as const;

export const about = {
  heading: "About",
  index: "01",
  paragraphs: [
    "I'm a software developer with nearly two years of experience designing and maintaining scalable healthcare and e-commerce applications. My work centers on robust backend architecture — complex data flows through MongoDB aggregation pipelines, asynchronous workflows, and secure payment integrations under strict compliance standards.",
    "I started in mechanical engineering (B.E., 2023) and moved into software because I wanted to build systems people actually use. That path shows up in how I work: methodical about constraints, comfortable with ambiguity, and focused on shipping production-ready iterations with an agile team.",
  ],
  facts: [
    { label: "Experience", value: "~2 years" },
    { label: "Focus", value: "Full-stack · Backend · Cloud" },
    { label: "Location", value: "West Bengal, India" },
    { label: "Education", value: "B.E. Mechanical Engineering, 2023" },
  ],
  // TODO: replace with a real headshot — drop the file in /public and update this path
  photo: "/subhankar.svg",
} as const;

export const skills = {
  heading: "Skills",
  index: "02",
  groups: [
    {
      label: "Frontend",
      items: ["React.js (v19)", "Next.js (v15)", "HTML5", "CSS3", "Material UI"],
    },
    {
      label: "Backend & APIs",
      items: ["Node.js (v22)", "Express.js (v4)", "Next.js API Routes", "REST APIs"],
    },
    {
      label: "Database",
      items: [
        "MongoDB (v8)",
        "PostgreSQL (v17)",
        "Mongoose ORM",
        "Aggregation Pipelines",
      ],
    },
    {
      label: "Cloud & DevOps",
      items: [
        "AWS Lambda",
        "AWS SQS",
        "AWS S3",
        "AWS App Runner",
        "AWS CodeBuild",
        "AWS CloudWatch",
      ],
    },
    {
      label: "Integrations",
      items: ["Stripe", "NMI Payment Gateway", "HIPAA-compliant Workflows"],
    },
    {
      label: "Tools",
      items: ["Git", "GitHub", "Postman", "VS Code"],
    },
  ],
} as const;

export const experience = {
  heading: "Experience",
  index: "03",
  roles: [
    {
      company: "Creatixia",
      role: "Software Developer",
      period: "Jul 2024 — Jun 2026",
      location: "Kalyani, West Bengal, India",
      summary:
        "Developed and scaled a comprehensive healthcare, telemedicine and e-commerce platform on Next.js, React and MongoDB.",
      highlights: [
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
    },
  ],
} as const;

export const projects = {
  heading: "Projects",
  index: "04",
  items: [
    {
      name: "Biogenix MD Portal",
      kind: "Telehealth & Pharmaceutical Enterprise Application",
      problem:
        "A pharmaceutical enterprise needed a compliant platform connecting providers and patients through secure consultations and electronic prescriptions.",
      contributions: [
        "Engineered core architecture for provider–patient consultation pipelines and e-prescription workflows.",
        "Implemented multi-tier inventory and product-catalog segmentation by medical specialization.",
        "Configured secure merchant accounts and tokenized processing via Stripe and NMI APIs.",
        "Built an immutable compliance trail and async event-logging layer on AWS queues and object storage.",
        "Designed RBAC user management to protect sensitive clinical workflows.",
        "Managed automated CI/CD with AWS App Runner and CodeBuild under strict HIPAA compliance.",
      ],
      stack: ["Next.js", "React", "MongoDB", "Stripe", "NMI", "AWS SQS", "AWS S3"],
      // TODO: confirm what is shareable (NDA) — add a live URL and screenshot if allowed
      link: null as string | null,
      image: "/projects/biogenix.svg",
    },
    {
      name: "Healthcare & E-commerce Platform",
      kind: "Telemedicine + Commerce (Creatixia)",
      problem:
        "Scaling a single platform to serve both e-commerce operations and telemedicine consultations with shared identity, payments and inventory.",
      contributions: [
        "Built product catalogs, real-time inventory, order processing and a custom discount engine.",
        "Delivered affiliate management and structured commission tracking for referral-based growth.",
        "Engineered aggregation-pipeline-driven APIs for complex reporting and data flows.",
        "Automated background processing and transactional email with AWS Lambda.",
      ],
      stack: ["Next.js", "React", "MongoDB", "Mongoose", "AWS Lambda", "PostgreSQL"],
      link: null as string | null,
      image: "/projects/platform.svg",
    },
  ],
} as const;

export const contact = {
  heading: "Contact",
  index: "05",
  blurb:
    "Have a role, a project, or a question? Send a message — or reach me directly.",
} as const;
