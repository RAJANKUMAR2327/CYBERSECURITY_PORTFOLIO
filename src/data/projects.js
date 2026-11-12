const projects = [
  {
    "id": 0,
    "title": "PDG — Personal Digital Guardian",
    "description": "Privacy-first security companion that inventories what you run and sign in to, scores risk with a deterministic, explainable rule engine, and recommends what to do. One FastAPI backend serves a React dashboard, a Manifest V3 browser extension, a Windows secret-scanning agent and an Android app. An optional LLM only narrates scores the rules already computed.",
    "tech": [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "React",
      "Kotlin",
      "Docker",
      "Terraform"
    ],
    "github": "https://github.com/RAJANKUMAR2327/Personal-Digital-Guardian",
    "whyItMatters": "Most security tools either show a score with no explanation or let an AI model decide. PDG treats every verdict as something that must be reconstructable: each rule records its evidence, the score is a sum of weighted rules, and the AI is limited to explaining a result it cannot change.",
    "architecture": [
      "Clients — web dashboard, MV3 extension, Windows agent, Android app",
      "FastAPI modular monolith — auth, devices, events, URL and asset analysis, incidents",
      "Deterministic risk engine — versioned rules emit a rule id, weight and evidence",
      "PostgreSQL and Redis — system of record, sessions and rate limits",
      "Optional LLM narration — advisory only, falls back to templates",
      "Docker Compose, Caddy and Terraform (DigitalOcean) — deployment"
    ],
    "engineeringDecisions": [
      {
        "q": "Why a rule engine instead of machine learning?",
        "a": "There was no labeled corpus of malicious and benign apps for this product, and a model trained on borrowed or synthetic data would produce a confident-looking score backed by nothing real. Versioned rules make every score traceable to specific evidence. The accepted trade-off is that rules will not catch genuinely novel attacks."
      },
      {
        "q": "Why keep the LLM out of scoring?",
        "a": "If a model could influence severity, a crafted app description could manipulate a security verdict. The engine computes score, severity and confidence first; the model then receives only those results and the matched evidence, never credentials or account data. If the API is unavailable the feature falls back to a template explanation."
      },
      {
        "q": "How are sessions protected?",
        "a": "Passwords use Argon2id. Access tokens are short-lived JWTs; refresh tokens are opaque, hashed at rest, rotated on every use, and reuse of an old token revokes the whole session chain. The web app keeps the access token in memory and the refresh token in an HttpOnly, SameSite=Strict cookie. TOTP MFA is one-time-use with attempt limits."
      },
      {
        "q": "Why rate-limit on the TCP peer address instead of X-Forwarded-For?",
        "a": "A client can send any X-Forwarded-For value, so trusting it would let an attacker rotate fake addresses. The header is only honoured when TRUSTED_PROXY_IPS names the proxy in front of the API."
      }
    ],
    "whatILearned": [
      "Writing a STRIDE threat model and stating residual risks plainly instead of hiding them",
      "Recording design choices as architecture decision records so the reasoning survives the code",
      "Hardening authentication: rotating refresh tokens with reuse detection, TOTP MFA and rate limiting",
      "Applying one defensive idea across four clients: web, browser extension, Windows agent and Android"
    ],
    "evaluationStatus": "The API test suite ran clean on a fresh copy: 299 passed, 6 skipped. The project's own report records 47 passing Windows-agent tests and 22 passing extension tests; the web and Android suites were not re-run. Known limits, documented in the repo: passport credentials are self-attested (no zero-knowledge proofs), the AI kill switch is a registry rather than enforcement, and the Android app only sees what the OS allows a non-privileged app to see.",
    "nextImprovements": [
      "Run the web and Android test suites in CI and publish the results",
      "Replace self-attested passport credentials with verifiable ones",
      "Enforce the AI kill switch instead of only recording it"
    ]
  },

  {
    "id": 1,
    "title": "NetGuard AI — ML Network Intrusion Detection Platform",
    "description": "Network intrusion detection platform: Scapy packet capture, flow reconstruction and feature extraction feed a classifier and an anomaly model, producing risk-scored alerts with SHAP explanations. A role-based analyst dashboard shows live detections over WebSocket. Includes multi-tenant data isolation, a durable ingestion queue, observability and a high-availability deployment topology.",
    "tech": [
      "Python",
      "FastAPI",
      "XGBoost",
      "SHAP",
      "Scapy",
      "PostgreSQL",
      "React"
    ],
    "github": "https://github.com/RAJANKUMAR2327/netguard-ai",
    "whyItMatters": "A detector that only prints \"attack\" is not usable by an analyst. NetGuard AI explains each detection, lets analysts label false positives, and folds that feedback into a retraining loop that a human has to review and approve, so the model improves under control.",
    "architecture": [
      "Capture — Scapy packets, offline PCAP files, durable event queue",
      "Flow table and feature extraction — about 19 flow-level features",
      "Classifier and anomaly model — XGBoost and scikit-learn, risk is the stronger of the two",
      "SHAP explanation — stored with every detection",
      "FastAPI and PostgreSQL — RBAC, tenant isolation, audit logs",
      "WebSocket and React dashboard — live alerts, analytics, analyst feedback"
    ],
    "engineeringDecisions": [
      {
        "q": "Why take the maximum of the classifier and anomaly scores?",
        "a": "Averaging would let a confident BENIGN classification dilute a genuinely high anomaly score, or the reverse. Either signal firing alone is reason enough to flag traffic, and both component scores are stored so an analyst can see which one fired."
      },
      {
        "q": "Why is retraining not automatic?",
        "a": "Analyst feedback is folded into a new derived dataset, but a person must review and approve it before anything trains or activates. A model that silently retrains on its own feedback can drift or be poisoned."
      },
      {
        "q": "Why restrict the live WebSocket stream by role?",
        "a": "Live detections are operationally sensitive in a way read-only dashboard access is not, so viewer accounts are rejected. The database lookup runs in a worker thread so it cannot block the event loop that is pushing alerts to connected clients."
      },
      {
        "q": "Why verify against PostgreSQL and not only SQLite?",
        "a": "Running the full suite on a real PostgreSQL instance caught bugs SQLite's looser defaults had hidden, including an invalid foreign key that SQLite accepted and PostgreSQL rejected."
      }
    ],
    "whatILearned": [
      "How a feature-schema mismatch can make a model silently ignore most of its inputs: a crafted SYN flood was classified BENIGN until the training data matched the features the network layer produces",
      "Why anomaly scores need calibration: normalising a single-row batch always returned exactly 100",
      "Dependency auditing for real: pip-audit and Bandit found 27 known vulnerabilities across 7 packages, including one on the auth path",
      "Running CI commands locally before trusting them, which exposed bugs that would have failed every push"
    ],
    "evaluationStatus": "The models are trained on a synthetic demo dataset and no real-world labeled dataset is bundled, so real-world accuracy is not claimed. The repository has about 126 backend and 87 frontend test cases (counted, not re-run here). The platform is intended for lab and educational use on traffic you own or are authorized to monitor.",
    "nextImprovements": [
      "Train and evaluate on a real labeled dataset (CIC-IDS style) and report precision, recall and F1",
      "Scope the live stream per dataset or sensor; today any allowed role sees all live traffic",
      "Validate against captured real-world traffic, not only generated data"
    ]
  },

  {
    "id": 2,
    "title": "AI Privacy Guardian — Personal Privacy Platform",
    "description": "Privacy platform with a scam and phishing checker, deepfake image check, digital-footprint scan, a password vault encrypted in the browser, and a photo-metadata (EXIF/GPS) cleaner that runs locally. One FastAPI backend serves a React web app, a Tauri desktop app, a Manifest V3 extension and an Android (Kotlin, Compose) client, with Stripe billing, an admin panel and Kubernetes manifests.",
    "tech": [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "React",
      "TypeScript",
      "Kotlin",
      "Tauri"
    ],
    "whyItMatters": "Many privacy tools ask you to hand over the very thing they protect. Here the vault is encrypted before it leaves the browser, the breach check sends only a five-character hash prefix, and photo metadata is stripped on the device, so the server does not need your secrets.",
    "aiClarification": "The scam and deepfake checks call the Anthropic Claude API. This is service integration, not a custom-trained model, and the deepfake result is an AI-assisted visual opinion rather than a forensic determination. The engineering focus is the platform, the client-side cryptography and the offline fallbacks around it.",
    "architecture": [
      "Clients — React web, Tauri desktop, MV3 extension, Android app",
      "FastAPI backend — JWT auth, rate limiting, admin panel, Stripe billing",
      "On-device first — vault encryption, EXIF cleaning, offline scam heuristics",
      "Claude API — scam and deepfake analysis, with graceful failure",
      "PostgreSQL — users, scans, vault ciphertext",
      "Docker, Kubernetes manifests and GitHub Actions CI/CD"
    ],
    "engineeringDecisions": [
      {
        "q": "Why encrypt the vault in the browser?",
        "a": "A key is derived from the master password with PBKDF2 (100,000 iterations, SHA-256) and used for AES-256-GCM through the Web Crypto API, so the server only ever stores ciphertext."
      },
      {
        "q": "Why check passwords with k-anonymity?",
        "a": "Only the first five characters of the password's SHA-1 hash go to the Have I Been Pwned range API. The full password, and even the full hash, never leave the browser."
      },
      {
        "q": "Why return an error instead of a fallback result when the AI key is missing?",
        "a": "An earlier version returned a fake \"could not analyze\" result with HTTP 200, which looked identical to a real uncertain answer. It now returns a clear 503 immediately, and the interface shows it honestly."
      },
      {
        "q": "Why keep an offline scam engine?",
        "a": "When the cloud call fails, clients fall back to on-device heuristics so the feature still works. The same logic exists in Kotlin, TypeScript and JavaScript, and the web version is covered by unit tests."
      }
    ],
    "whatILearned": [
      "Browser cryptography with the Web Crypto API: key derivation and authenticated encryption",
      "Why failing loudly beats returning a plausible fake result when an external API is unavailable",
      "Testing against a real database instead of mocks, including cross-user isolation of vault entries",
      "Serving four client platforms from one backend"
    ],
    "evaluationStatus": "The web app's 29 unit tests pass (re-run). The backend has 31 tests that the project runs against a real PostgreSQL in CI (not re-run here). The Android client was only syntax-checked, because the Android SDK was unreachable in the test environment, and the Tauri desktop app was not compiled there. Scam-detection accuracy has not been measured on a labeled dataset.",
    "nextImprovements": [
      "Build and test the Android and desktop clients in CI",
      "Measure scam-detection accuracy on a labeled phishing dataset",
      "Add an end-to-end test for the extension's right-click scan"
    ]
  },

  {
    "id": 3,
    "title": "PhishGuard — Privacy-Preserving Phishing Detector",
    "description": "Browser extension that scores links and pages for phishing entirely on the device: lookalike domains, punycode, user@ tricks, mismatched link text and more, each with a plain-language reason. An optional Node, Express and SQLite server adds a hashed blocklist and domain-age checks. Nothing leaves the browser unless the user opts in.",
    "tech": [
      "JavaScript",
      "Chrome MV3",
      "Node.js",
      "Express",
      "SQLite",
      "Playwright"
    ],
    "whyItMatters": "Phishing protection often means sending every URL you visit to a vendor. PhishGuard starts from the opposite assumption: do the work in the browser, and when a server helps, send as little as possible and let the user decide.",
    "architecture": [
      "Content script — scans links and the current page",
      "Local detector — weighted heuristics with a reason for every point",
      "Popup and warning page — verdict, reasons, trust and report buttons",
      "Optional blocklist lookup — only a 16-bit hash prefix is sent",
      "Optional domain-age check — separate opt-in, via RDAP",
      "Express and SQLite server — feed sync with safety checks"
    ],
    "engineeringDecisions": [
      {
        "q": "Why send only a hash prefix to the server?",
        "a": "The client sends the first 16 bits of the SHA-256 of a hostname. The server returns every listed hash sharing that prefix and the client compares the full hashes itself, so the server cannot tell which site was visited."
      },
      {
        "q": "Why is the domain-age check a separate opt-in?",
        "a": "It has to send domain names, and the RDAP lookup sees them too. That breaks the nothing-leaves-the-browser promise, so it stays off until the user switches it on."
      },
      {
        "q": "Why match exact hostnames and skip big domains in feeds?",
        "a": "Blocking a whole shared host would block everything on it, so entries on major first-party and link-shortener domains are skipped. Feed sync also refuses an empty or unparseable feed and one that shrinks by more than half, unless forced."
      },
      {
        "q": "Why does domain age alone only reach medium risk?",
        "a": "New legitimate sites exist, so a recently registered domain is a strong signal but not a verdict on its own."
      }
    ],
    "whatILearned": [
      "Designing for privacy by default: optional features off, minimal permissions, and plain statements of the limits",
      "Why evaluation needs held-out data and a false-alarm rate per 1,000 benign links, not only recall",
      "Structuring a Manifest V3 extension: content script, service worker, popup and warning pages",
      "End-to-end testing an extension with Playwright"
    ],
    "evaluationStatus": "All 8 extension test suites pass (re-run). The server has 6 test files that could not be run in the review environment. The evaluation harness reports recall, false-positive rate and false alarms per 1,000 benign links, but the only data in the repo is a small hand-written sample that the project itself says is not evidence of accuracy. The extension is at version 0.9.0 and has not been published to the Chrome Web Store.",
    "nextImprovements": [
      "Evaluate on real phishing feeds (OpenPhish, PhishTank, subject to their licences) with a held-out split",
      "Publish to the Chrome Web Store; the listing and privacy documents are drafted",
      "Self-host an RDAP bootstrap so domain names are not revealed to a third party"
    ]
  },

  {
    id: 4,
    title: "CyberShield — Cybersecurity Threat Detection System",
    description:
      "Network threat detection combining 8 rule-based detectors (port scans, SYN floods, brute force, DNS tunneling, and more) mapped to MITRE ATT&CK, plus an Isolation Forest ML model flagging traffic anomalies. Includes malware analysis and a live Flask + SocketIO dashboard with a REST API.",
    tech: ["Python", "Scapy", "Flask", "scikit-learn"],
    detectors: 8,
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
];

export default projects;
