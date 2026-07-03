export const hackerHome = {
  hero: {
    greeting: 'leroy@ljd:~$',
    title: 'build.',
    titleSub: 'automate.',
    titleEm: 'ship.',
    description: 'PM-engineer hybrid. AI as infrastructure, not a toy. I design the systems, write the specs, train the teams, and ship the output.',
    cta: [
      { label: './work.sh',    href: '/work',    primary: true  },
      { label: './projects.sh', href: '/projects', primary: false },
    ],
  },
  availability: 'STATUS: open_to_work=true | mode=remote | latency=low',
  stack: [
    { label: 'Claude API',  type: 'AI'        },
    { label: 'Cursor',      type: 'IDE'       },
    { label: 'Next.js 16',  type: 'FRAMEWORK' },
    { label: 'MERN',        type: 'STACK'     },
    { label: 'Notion',      type: 'KB'        },
    { label: 'Figma',       type: 'DESIGN'    },
  ],
  stats: [
    { value: '5×',  label: 'output_multiplier via AI infra'       },
    { value: '21',  label: 'sections per PRD spec'                 },
    { value: '50%', label: 'QA cycle reduction post-AI adoption'   },
    { value: '10+', label: 'AI experiments shipped & documented'   },
  ],
  log: [
    { time: '2026-05', type: 'DEPLOY',   msg: 'ordrio@v2.4 — subscription_engine: online' },
    { time: '2026-04', type: 'COMMIT',   msg: 'ai_workflow_playbook.md — v3 published'    },
    { time: '2026-03', type: 'SHIP',     msg: 'etch_journal — phase2 redesign live'        },
    { time: '2026-02', type: 'MERGE',    msg: 'pos_offline_module — PR #114 merged'        },
  ],
}

export const hackerAbout = {
  kicker: '$ cat README.md',
  headline: 'Leroy Dsouza',
  headlineEm: 'PM × AI × Systems',
  bio: [
    '> Role:     Product Manager @ Ordrio Technologies, Udupi',
    '> Stack:    Claude · Cursor · Next.js · Notion · MERN',
    '> Edge:     Shipped AI tooling across an entire eng team.',
    '>           5 devs. Same output as 25. No magic — just systems.',
    '> Method:   PRDs that AI can execute. Specs with 0 ambiguity.',
    '> Before:   Finance (Northern Trust) → EdTech (Collegepond) → SaaS',
  ],
  terminal: [
    { cmd: 'leroy --skills',    out: 'ai_infra, product_eng, system_design, technical_writing' },
    { cmd: 'leroy --stack',     out: 'claude_api, cursor, nextjs, mern, figma, notion'         },
    { cmd: 'leroy --mode',      out: 'async | remote_first | docs_heavy | bias_to_ship'        },
    { cmd: 'leroy --languages', out: 'en, hi, kn, kok'                                          },
    { cmd: 'leroy --status',    out: 'open_to_work: true | response_time: <24h'                },
  ],
  skills: [
    { category: 'AI & LLMs',    items: ['Claude API', 'GPT-4o', 'Prompt Engineering', 'Context Design', 'AI-QA Pipelines', 'Cursor Workflows', 'RAG Patterns'] },
    { category: 'Product',      items: ['21-section PRDs', 'Sprint Architecture', 'Backlog Design', 'Release Engineering', 'User Story Mapping', 'OKR Design'] },
    { category: 'Frontend',     items: ['Next.js 16', 'React 18', 'JavaScript ES6+', 'Framer Motion', 'GSAP', 'Three.js', 'Vanilla CSS'] },
    { category: 'Backend & DB', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Firebase', 'WordPress API'] },
  ],
}

export const hackerWork = {
  kicker: '$ git log --oneline --all',
  headline: 'commit_history.log',
  experiences: [
    {
      period: '2024 → now',
      company: 'Ordrio Technologies',
      role: 'Product Manager',
      status: 'ACTIVE',
      highlights: [
        '> Scaled AI-assisted delivery: 25 ppl → 5, same output',
        '> 21-section PRD framework — built for AI-assisted development',
        '> Deployed prompt libraries across eng, QA, product teams',
        '> Cursor + Claude training — cut QA cycles by ~50%',
        '> Absorbed CTO exit, self-learned arch, kept delivery unblocked',
        '> Shipped: subscriptions, offline POS+accounting, loyalty engine',
      ],
      tags: ['Claude', 'Cursor', 'eCommerce SaaS', 'Sprint Design', 'AI Infra'],
    },
    {
      period: '2020 → 2023',
      company: 'Collegepond',
      role: 'Product Development Coordinator',
      status: 'SHIPPED',
      highlights: [
        '> Ran 2 full app lifecycles: 4 devs, 1 designer, 3 QA — remote',
        '> 4.5+ App Store rating through continuous release cycles',
        '> Defect rate ↓30-40% via spec-integrated early QA',
        '> Stepped into PM function mid-flight, minimal handover',
      ],
      tags: ['iOS', 'Android', 'App Store', 'Remote', 'EdTech'],
    },
    {
      period: '2018 → 2019',
      company: 'Northern Trust',
      role: 'Fund Analyst',
      status: 'LEGACY',
      highlights: [
        '> Built Excel VBA macro for dividend NAV — ran in prod for years post-exit',
        '> Caught ~1-2% fund calc error before materialization — company-wide recognition',
        '> ~99% accuracy across 6-7 hedge funds daily',
      ],
      tags: ['VBA Macros', 'FactSet', 'Bloomberg', 'Automation'],
    },
  ],
}

export const hackerProjects = {
  kicker: '$ ls -la ./projects',
  headline: 'active_repos.json',
  projects: [
    {
      num: '01',
      title: 'Etch Journal',
      description: 'MERN journaling app. Phase 2: full rethink — UX research, component arch, public build log. Built with Claude + Cursor.',
      status: 'IN_PROGRESS',
      tags: ['MERN', 'Claude', 'Cursor', 'Figma'],
    },
    {
      num: '02',
      title: 'AI Experiments Lab',
      description: 'Monthly AI builds: poem generator, persona chat, Chrome plugin. Each documented — arch, prompting strategy, failures.',
      status: 'ONGOING',
      tags: ['Claude API', 'Next.js', 'Prompt Eng'],
    },
    {
      num: '03',
      title: 'Product Teardowns',
      description: '10+ structured breakdowns: onboarding flows, retention loops, monetization logic. Published on LinkedIn.',
      status: 'ONGOING',
      tags: ['Research', 'UX Analysis', 'Systems'],
    },
    {
      num: '04',
      title: 'Dhisingara Technologies',
      description: 'Product-led collective. Thesis: Elegant Wisdom. CPO + CMO. Stealth.',
      status: 'STEALTH',
      tags: ['Co-founder', 'Strategy', 'Product'],
    },
  ],
}

export const hackerTech = {
  kicker: '$ leroy --stack --verbose',
  headline: 'tech_stack.json',
  intro: 'Tools I use in production. Not a buzzword list.',
  categories: [
    {
      name: 'AI / LLMs',
      icon: '◈',
      items: [
        { name: 'Claude API',         level: 'DAILY'   },
        { name: 'GPT-4o',             level: 'DAILY'   },
        { name: 'Cursor IDE',         level: 'DAILY'   },
        { name: 'Prompt Engineering', level: 'EXPERT'  },
        { name: 'Context Design',     level: 'EXPERT'  },
        { name: 'AI-QA Pipelines',    level: 'SHIPPED' },
        { name: 'RAG Patterns',       level: 'LEARNING'},
        { name: 'Workflow Automation',level: 'EXPERT'  },
      ],
    },
    {
      name: 'Product Engineering',
      icon: '◉',
      items: [
        { name: '21-section PRDs',    level: 'EXPERT'  },
        { name: 'Sprint Architecture',level: 'EXPERT'  },
        { name: 'Azure Boards',       level: 'DAILY'   },
        { name: 'Backlog Design',     level: 'EXPERT'  },
        { name: 'Release Engineering',level: 'SHIPPED' },
        { name: 'OKR Design',         level: 'DAILY'   },
        { name: 'User Story Mapping', level: 'EXPERT'  },
      ],
    },
    {
      name: 'Frontend',
      icon: '◎',
      items: [
        { name: 'Next.js 16',         level: 'SHIPPED' },
        { name: 'React 18',           level: 'SHIPPED' },
        { name: 'JavaScript ES6+',    level: 'DAILY'   },
        { name: 'Framer Motion',      level: 'SHIPPED' },
        { name: 'GSAP',               level: 'SHIPPED' },
        { name: 'Three.js',           level: 'SHIPPED' },
        { name: 'CSS / Animations',   level: 'DAILY'   },
      ],
    },
    {
      name: 'Backend & DB',
      icon: '○',
      items: [
        { name: 'Node.js',            level: 'SHIPPED' },
        { name: 'Express',            level: 'SHIPPED' },
        { name: 'MongoDB',            level: 'SHIPPED' },
        { name: 'REST API Design',    level: 'DAILY'   },
        { name: 'Firebase',           level: 'SHIPPED' },
        { name: 'WordPress API',      level: 'DAILY'   },
      ],
    },
    {
      name: 'Design & Tools',
      icon: '◇',
      items: [
        { name: 'Figma',              level: 'DAILY'   },
        { name: 'Figma Dev Mode',     level: 'DAILY'   },
        { name: 'Notion (KBs)',       level: 'EXPERT'  },
        { name: 'Google Analytics',   level: 'DAILY'   },
        { name: 'Hotjar',             level: 'DAILY'   },
      ],
    },
    {
      name: 'Finance & Data',
      icon: '◆',
      items: [
        { name: 'Excel Advanced',     level: 'EXPERT'  },
        { name: 'VBA Macros',         level: 'EXPERT'  },
        { name: 'FactSet',            level: 'LEGACY'  },
        { name: 'Bloomberg Terminal', level: 'LEGACY'  },
        { name: 'BlackRock Aladdin',  level: 'LEGACY'  },
        { name: 'NAV Reporting',      level: 'LEGACY'  },
      ],
    },
  ],
}

export const hackerContact = {
  kicker: '$ leroy --contact',
  headline: 'establish_connection.sh',
  prompt: 'leroy@ljd:~$ ping --open=true --mode=async --latency=fast',
  links: [
    { label: 'email',    value: 'leroy.social@gmail.com',  href: 'mailto:leroy.social@gmail.com', external: false },
    { label: 'linkedin', value: '/in/leroyjd',             href: 'https://linkedin.com/in/leroyjd', external: true },
    { label: 'blog',     value: 'ljdblog.wordpress.com',   href: 'https://ljdblog.wordpress.com', external: true  },
    { label: 'resume',   value: '[on_request]',            href: '#', disabled: true                              },
  ],
}
