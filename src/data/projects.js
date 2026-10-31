const projects = [
  {
    id: 0,
    title: "CyberShield — Cybersecurity Threat Detection System",
    description:
      "Network threat detection combining 8 rule-based detectors (port scans, SYN floods, brute force, DNS tunneling, and more) mapped to MITRE ATT&CK, plus an Isolation Forest ML model flagging traffic anomalies. Includes malware analysis and a live Flask + SocketIO dashboard with a REST API.",
    tech: ["Python", "Scapy", "Flask", "scikit-learn"],
    github:
      "https://github.com/RAJANKUMAR2327/Cybersecurity-Threat-Detection-System",

    whyItMatters:
      "Most beginner security projects stop at detecting one known attack pattern. Real network traffic is messier — known attacks need fast, explainable rule matching, while unknown behavior requires anomaly detection. CyberShield combines both approaches.",

    architecture: [
      "Live Traffic (Scapy packet capture)",
      "Feature Extraction (flow-level stats)",
      "Rule Engine — 8 detectors mapped to MITRE ATT&CK",
      "Isolation Forest — anomaly scoring on traffic flow features",
      "Alert Engine",
      "Flask + Socket.IO — real-time dashboard & REST API",
    ],

    engineeringDecisions: [
      {
        q: "Why combine rule-based detection with ML instead of just one approach?",
        a: "Rule-based detection is fast and explainable for known attack signatures such as port scans and SYN floods, but it cannot detect behavior that was never explicitly defined. Isolation Forest adds a second layer that flags statistically unusual traffic.",
      },
      {
        q: "Why Isolation Forest specifically?",
        a: "It is an unsupervised anomaly-detection model that does not require a labeled attack dataset for training. It works by identifying observations that are easier to isolate in feature space, making it suitable for detecting unusual traffic behavior.",
      },
      {
        q: "Why Flask + Socket.IO for the dashboard?",
        a: "The dashboard needs live alert updates rather than periodic polling. Socket.IO provides real-time event delivery while Flask keeps the detection engine, REST API, and dashboard backend within one Python-based system.",
      },
    ],

    whatILearned: [
      "How to map concrete attack behaviors to the MITRE ATT&CK framework",
      "The practical difference between signature-based and anomaly-based detection",
      "Working with Scapy for live packet capture and flow feature extraction",
      "Building a real-time dashboard using Socket.IO",
    ],

    evaluationStatus:
      "No formal accuracy or false-positive-rate evaluation has been run against labeled attack traffic yet — the next step is to benchmark the detectors against labeled datasets and report precision, recall, and F1-score.",

    nextImprovements: [
      "Benchmark against a labeled intrusion-detection dataset",
      "Add automated tests for all 8 rule detectors",
      "Add alert correlation to group related alerts from the same attack",
    ],
  },

  {
    id: 1,
    title: "CampusConnect — College Community Platform",
    description:
      "Full-stack MERN platform for college communities — notes sharing, lost & found, events, marketplace, and a placement dashboard with analytics.",
    tech: ["React", "Node.js", "MongoDB", "Anthropic Claude API"],
    github:
      "https://github.com/RAJANKUMAR2327/College-Community-Platform",
    live: "https://college-community-platform-omega.vercel.app",

    whyItMatters:
      "Campus life often runs across scattered WhatsApp groups and physical noticeboards. CampusConnect brings notes, lost & found, events, marketplace, and placement information into one platform with role-based access and analytics.",

    aiClarification:
      "The AI features use the Anthropic Claude API. This is AI service integration rather than a custom-trained language model. The engineering focus is the full-stack platform, authentication, authorization, file handling, and the API integration layer around Claude.",

    architecture: [
      "React frontend (Vercel)",
      "Node/Express API (Render)",
      "MongoDB — users, posts, events, marketplace, placement data",
      "JWT authentication + role-based access",
      "Cloudinary — file/image uploads",
      "Anthropic Claude API — AI study tools",
    ],

    whatILearned: [
      "Structuring a MERN application across multiple feature domains",
      "Implementing JWT authentication and role-based access control",
      "Designing an API integration layer around a third-party AI service",
    ],
  },

  {
    id: 2,
    title: "Emergency Help Network",
    description:
      "Real-time emergency assistance platform spanning a backend, web dashboard, and mobile app — SOS alerts, live location tracking, emergency contacts, and responder coordination.",
    tech: ["React", "Node.js", "Expo / React Native", "Socket.IO"],
    github:
      "https://github.com/RAJANKUMAR2327/emergency-help-network",

    whyItMatters:
      "In an emergency, the challenge is not simply sending an alert — it is coordinating live location, contacts, and responders across multiple clients in real time. This makes the project a distributed real-time system rather than a conventional CRUD application.",

    architecture: [
      "Mobile app (Expo / React Native) — SOS trigger and live location",
      "Backend (Node.js) — alert routing and contact management",
      "Socket.IO — real-time alert delivery",
      "Web dashboard (React) — responder-facing interface",
    ],

    whatILearned: [
      "Coordinating state across mobile, backend, and dashboard applications",
      "Handling location tracking and permissions in React Native/Expo",
      "Implementing real-time event delivery with Socket.IO",
    ],
  },

  {
    id: 3,
    title: "Blogspace — Full-Stack Blogging Platform",
    description:
      "Full-stack blogging platform where users can create, publish, edit, and manage blog posts through a responsive web interface backed by a REST API.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github:
      "https://github.com/RAJANKUMAR2327/blogspace",
    live:
      "https://blogspace-wine.vercel.app/",

    whyItMatters:
      "Blogspace demonstrates the fundamentals behind a production-style content platform: client-server communication, persistent data management, content creation workflows, authentication, and responsive user experiences.",

    architecture: [
      "React frontend — responsive blogging interface",
      "Node.js + Express — REST API",
      "MongoDB — persistent blog and user data",
      "Authentication — protected user operations",
      "Vercel — frontend deployment",
    ],

    whatILearned: [
      "Building a complete client-server application from frontend to database",
      "Designing REST API endpoints for content management",
      "Managing CRUD workflows for user-generated content",
      "Connecting a React frontend with a Node.js/Express backend",
      "Deploying a full-stack application for public access",
    ],

    nextImprovements: [
      "Add rich-text or Markdown editing",
      "Add image optimization and media management",
      "Add post search, tags, and categories",
      "Add comments and engagement features",
      "Add pagination and server-side filtering",
      "Add automated testing for API and authentication flows",
    ],
  },

  {
    id: 4,
    title: "SKILLPRINT — Career Intelligence Platform",
    description:
      "Career-intelligence platform that turns logged learning activity and evidence (projects, certificates, self-assessments) into capability estimates, skill-gap analysis, readiness scores and learning missions. Ships as an Express + SQLite API, a React web app, and a Chrome extension that tracks time on allowlisted learning sites.",
    tech: ["TypeScript", "Node.js", "Express", "SQLite", "React", "Chrome MV3"],
    // TODO: add the repository link here once it is public.

    whyItMatters:
      "Career tools usually reduce a person to a keyword list. SKILLPRINT treats evidence as the input and keeps \"unknown\" as a real state instead of coercing missing data to zero, and hard eligibility requirements override raw skill-match percentages.",

    architecture: [
      "Chrome extension (MV3) — tracks activity on an allowlisted domain list, buffers it locally, syncs in batches",
      "Express API (TypeScript) — cookie/JWT auth with rotating refresh tokens, CSRF protection, per-user rate limiting",
      "SQLite (better-sqlite3) — users, evidence, career graph",
      "Intelligence engines — capability estimator, gap, bottleneck, readiness, recommendation, roadmap and mission engines",
      "WebSocket hub — live notifications and messages",
      "React + Vite web app — dashboard, evidence, roadmap, missions, printable skill profile",
    ],

    whatILearned: [
      "Designing authentication for two clients (httpOnly cookies for web, bearer tokens for the extension) with refresh-token rotation and CSRF protection",
      "Building offline-tolerant sync in a browser extension with a locked, serialized local queue",
      "Modelling uncertainty explicitly instead of fabricating scores",
    ],
  },
];

export default projects;