export const nav = [
  { id: 'profile', label: 'Profile' },
  { id: 'experience', label: 'Experience' },
  { id: 'hlasm', label: 'HLASM' },
  { id: 'skills', label: 'Skills' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'reading', label: 'Leituras' },
  { id: 'contact', label: 'Contact' },
]

export const profile = {
  name: 'ANDRE NEIL',
  title: 'z/OS Specialist · Mainframe Systems',
  tagline: 'Reading dumps, tracing failures to root cause, and building HLASM to z/OS conventions.',
  summary:
    'Mainframe Systems Specialist with over 20 years of experience in IBM z/OS environments, specializing in system administration, performance tuning, and batch processing optimization. Proven expertise in managing complex enterprise workloads, maintaining high system availability, and driving modernization initiatives. Adept at working with cross-functional teams to ensure secure, stable, and efficient mainframe operations supporting critical business applications.',
  stats: [
    { value: '20+ yrs', label: 'in IBM z/OS' },
    {
      value: 'IBM · Citigroup',
      label: 'enterprise mainframe',
      logos: [
        { src: `${import.meta.env.BASE_URL}logos/ibm.png`, alt: 'IBM' },
        { src: `${import.meta.env.BASE_URL}logos/citigroup.png`, alt: 'Citigroup' },
      ],
    },
    {
      value: 'EU + BR',
      label: 'work authorized',
      logos: [
        { src: `${import.meta.env.BASE_URL}flags/eu.svg`, alt: 'European Union' },
        { src: `${import.meta.env.BASE_URL}flags/br.svg`, alt: 'Brazil' },
      ],
    },
  ],
}

export const experience = [
  {
    company: 'IBM',
    role: 'z/OS JES Tech Support',
    location: '',
    start: '2024',
    end: 'Present',
    bullets: [
      'JES2 Technical Support Engineer responsible for a worldwide Salesforce case queue, ensuring timely, high-quality support for enterprise z/OS environments.',
      'Monitor incoming cases, triage and prioritize by impact, perform dump and log analysis, reproduce issues, and deliver fixes or coordinated escalations across product and systems teams.',
      'Keep customers in EMEA/APAC/AMER informed with clear status updates, RCAs, and runbook guidance — driving SLA compliance and reducing repeat incidents.',
    ],
  },
  {
    company: 'IBM',
    role: 'z/OSMF Core Support',
    location: '',
    start: '2019',
    end: '2024',
    bullets: [
      'Installed, configured, and maintained z/OSMF components and plug-ins to support system administration, workflow management, and performance monitoring.',
      'Assisted users with z/OSMF interface navigation, access issues, and workflow execution.',
      'Documented procedures, troubleshooting steps, and onboarding guides for operations and support teams.',
    ],
  },
  {
    company: 'Citigroup',
    role: 'Mainframe QA Tester Analyst (Offshift)',
    location: 'Brazil & Warsaw, PL',
    start: '2010',
    end: '2017',
    bullets: [
      'QA and technical support across enterprise z/OS environments: triaging by impact, performing dump and log analysis, reproducing issues, and coordinating fixes.',
      'Delivered clear status updates and RCAs across regions, supporting SLA compliance and reducing repeat incidents.',
    ],
  },
  {
    company: 'Procwork (outsourced for IBM)',
    role: 'Batch Operator / Production Support / Knowledge Transfer',
    location: '',
    start: '2004',
    end: '2010',
    bullets: [
      'Supported mainframe production for internal teams and enterprise clients; led outsourcing transitions (Sara Lee & Hanes Brands, ACE Insurance, SunTrust Bank) through due diligence, knowledge transfer, and training.',
      'Managed daily z/OS batch cycles across multiple LPARs; triaged job abends, system alerts, and performance issues by analyzing JCL and logs to minimize downtime.',
      'Provided on-call coverage, drove root-cause and preventive actions, documented operational procedures, trained new team members, and served as client-facing POC for SLA compliance.',
    ],
  },
]

export const education = [
  {
    institution: 'Universidade Presbiteriana Mackenzie',
    detail: 'Undergraduate program · 2.5 years · expected completion mid-2028',
    period: 'From Jan 2026',
  },
  {
    institution: 'UNIP — Universidade Paulista',
    detail: 'B.S. Information Systems — program not completed',
    period: '2019–2020',
  },
]

export const certifications = [
  { name: 'IBM Mainframe Developer', issuer: 'IBM', year: '2025' },
  { name: 'Deep Teaching Solutions', issuer: 'Coursera', year: '2025' },
  { name: 'Agile with Atlassian Jira', issuer: 'Coursera', year: '2025' },
]

export const courseCertificates = [
  {
    title: 'IBM COBOL Programming',
    issuer: 'Coursera · IBM',
    year: '2025',
    file: `${import.meta.env.BASE_URL}certificates/Coursera_Cobol.pdf`,
    covers: [
      'Introduction to Enterprise Computing',
      'IBM COBOL Basics',
      'IBM COBOL Core',
      'IBM COBOL Software Development Practices',
      'IBM COBOL Data and File Management',
      'IBM COBOL Basic Testing and Debugging',
      'IBM COBOL Software Development Process',
    ],
  },
]

export const hlasmTopics = [
  { title: 'Base-Displacement vs Immediate', summary: 'Base-displacement points to data in storage (base register + displacement, computed at run time — the foundation of relocatable code). Immediate bakes the value into the instruction itself: fast, compact, no storage fetch (MVI, CLI, TM, LHI, AHI).' },
  { title: 'Advantages of Base-Displacement', summary: 'Relocatable code with no absolute addresses to fix, compact 4-bit register + 12-bit displacement encoding, and wide reach — one base register spans a 4 KB area (far more with long displacement). Underpins DSECT addressing and reentrant code.' },
  { title: 'Advantages of Immediate', summary: 'Fast (no extra storage fetch), compact (no separate constant to define), and self-documenting (intent sits right in the instruction). Ideal for flag bytes, bit masks, and small register adjustments.' },
  { title: 'Extended (Long) Displacement', summary: 'Extends the standard 12-bit unsigned displacement (4 KB reach) to a 20-bit signed field split into DL/DH bytes — about ±512 KB, roughly 1 MB from one base. Applies to the "Y" instructions (LY, STY, LAY, LMG, STMG) and supports negative displacements.' },
  { title: 'Magic Numbers', summary: 'Self-defined values and literals without equates are bad practice — they do not describe their purpose and are hard to change. Any value with semantic meaning (lengths, offsets, return codes, masks) should be a named EQU; only trivial values like 0 or 1 are acceptable raw.' },
  { title: 'The EQU Instruction', summary: 'An assembler directive assigning a value (and optionally length/type attributes) to a symbol — for register equates, named constants, field lengths, offsets, and bit masks. Referencing MAXRECS or FLGBUSY by name is self-documenting and changed in one place.' },
  { title: 'The USING Instruction', summary: 'Tells the assembler that a base register holds the address of a location, so symbolic references resolve to base-displacement form automatically. USING is a promise — the programmer must still load the register (BASR/LA/LR) with the matching address.' },
  { title: 'Domain & Range of a USING', summary: 'Domain is the span of source statements a USING covers (until DROP, override, or end of assembly). Range is the storage it can address — 4 KB with standard displacement, ~1 MB with long. With multiple active USINGs, the assembler picks the base giving a valid displacement, preferring the smallest.' },
  { title: 'Dependent & Labelled USING', summary: 'A dependent USING borrows addressability from an existing USING (mapping a DSECT onto already-addressable storage) without consuming a base register. A labelled USING (IN.FIELD / OUT.FIELD) qualifies references so one DSECT maps through several base registers unambiguously.' },
  { title: 'Relocatability', summary: 'A module runs correctly wherever it is loaded — references resolve relative to a base register, and address constants (A-cons, V-cons) are flagged for adjustment. The assembler builds RLD entries; the binder/loader fixes the address constants at the actual load address. A prerequisite for reentrant, reusable code.' },
  { title: 'Binder (Linkage Editor)', summary: 'Combines object modules from the assembler and compilers into one executable unit: resolves external references (via ESD/RLD), pulls in routines via autocall, assigns relative addresses, and records relocation info. Produces a program object in a PDSE (or a load module in a PDS for the older Linkage Editor).' },
  { title: 'Standard z/OS Linkage Conventions', summary: 'R1 points to the parameter list, R13 to the 18-fullword save area (chained via +4 back / +8 forward), R14 holds the return address (BR 14), and R15 the entry point on entry / return code on exit. Prologue: STM 14,12,12(13), set base, chain save areas; epilogue: restore and return.' },
  { title: 'Machine vs Assembler Language', summary: 'Machine language is the raw binary the processor executes; assembler is the human-readable symbolic layer (mnemonics, symbolic names, macros, directives). Instructions map essentially one-to-one, while macros and directives let the assembler generate code beyond a strict mapping.' },
  { title: 'Documentation & Practical Depth', summary: 'Self-documenting code first (meaningful labels, EQUs, DSECTs), comments explaining the why. Hands-on depth in debugging and diagnosis, plus HLASM built to z/OS conventions (AMODE 31 / RMODE ANY): control-block navigation (PSA→CVT→ASCB→TCB), SVC 99 dynamic allocation, ESTAE/SDWA recovery, SMF mapping, and macro/conditional assembly.' },
]

export const skills = {
  platforms: [
    { name: 'JES2', description: 'Job Entry Subsystem 2 — manages the input, scheduling, and output (spooling) of batch jobs across z/OS.' },
    { name: 'JCL', description: 'Job Control Language — tells z/OS which programs to run and with what datasets, parameters, and resources.' },
    { name: 'ISPF', description: 'Interactive System Productivity Facility — the panel-driven editor and toolset for z/OS development and dataset management.' },
    { name: 'z/OSMF', description: 'z/OS Management Facility — web-based console for system administration, workflows, and performance monitoring.' },
    { name: 'CA-7', description: 'Enterprise batch scheduler that automates, sequences, and tracks production job workflows.' },
    { name: 'OPC', description: 'Operations Planning and Control (Tivoli Workload Scheduler) — plans and drives batch workloads across systems.' },
    { name: 'Unix System Services', description: 'The POSIX/UNIX environment inside z/OS — shell, files, and applications running alongside MVS.' },
  ],
  codeLanguages: [
    {
      name: 'HLASM / Assembler',
      since: '1964',
      description: 'Maximum control and performance at the hardware level — the language of z/OS internals, system exits, and performance-critical code. IBM High Level Assembler (HLASM) has been the standard since 1992.',
      companies: ['IBM', 'Citigroup', 'major banks & insurers'],
    },
    {
      name: 'COBOL',
      since: '1959',
      description: 'Built for large-scale business and batch transaction processing; still runs the majority of the world’s banking, insurance, and government record-keeping.',
      companies: ['Bank of America', 'IRS', 'IBM', 'insurers worldwide'],
    },
    {
      name: 'Python',
      since: '1991',
      description: 'Fast to write and read — the go-to language for automation, data science, machine learning, and glue code across systems.',
      companies: ['Google', 'Netflix', 'Instagram', 'NASA'],
    },
    {
      name: 'Go (Golang)',
      since: '2009',
      description: 'Designed at Google for simple, highly concurrent, and fast networked services — the backbone of modern cloud infrastructure.',
      companies: ['Google', 'Uber', 'Docker', 'Kubernetes'],
    },
  ],
  spokenLanguages: ['English (Fluent)', 'Portuguese (Fluent)'],
}

export const social = {
  github: 'https://github.com/andr3npc',
  credly: 'https://www.credly.com/users/andre-carvalho.2992d39d/badges',
}

export const reading = {
  statement:
    'É crucial manter uma rotina de leitura variando entre temas técnicos e recreativos. Esse site eu mantenho por diversão e também aproveito para praticar outras tecnologias fora do Z.',
  url: 'https://thesubterfuge.online/#/leituras',
  linkLabel: 'thesubterfuge.online',
  flag: `${import.meta.env.BASE_URL}flags/br.svg`,
}

export const contact = {
  email: 'atrumcarv@gmail.com',
  phone: '+55 19 99636 0666',
  location: 'São Paulo, Brazil (04011060)',
  workAuth: [
    'European Union — Italian citizen, authorized to work across the EU without sponsorship.',
    'Brazil — citizen, authorized to work.',
  ],
}

export const resume = {
  file: `${import.meta.env.BASE_URL}Andre-Neil-Resume.pdf`,
  downloadName: 'Andre-Neil-Resume.pdf',
  label: 'Download Résumé',
}

export const footer = {
  tagline: 'Built in HEX spirit',
}
