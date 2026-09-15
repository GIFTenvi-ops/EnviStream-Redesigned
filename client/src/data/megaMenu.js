/**
 * Dynamic Course Mega-Menu Database
 * ---------------------------------
 * Mirrors the backend shape so the frontend never needs code changes
 * when admin adds categories / courses:
 *
 * CourseCategory { id, name, slug, description, icon, displayOrder, isActive }
 * Course { id, categoryId, name, slug, shortDescription, description, duration,
 *          mode, level, technologies, image, isFeatured, isActive, displayOrder, menuVisible, menuUrl }
 *
 * Admin capabilities supported:
 * create/edit/delete/reorder categories, add/remove courses,
 * mark featured, edit descriptions/icons/visibility/URL.
 */

export const COURSE_CATEGORIES = [
  { id: "cat-ai", name: "AI & Emerging Technology", slug: "artificial-intelligence", description: "AI, GenAI, ML, Deep Learning, NLP, Vision & Agents", icon: "Ai", displayOrder: 1, isActive: true,
    hue: { soft: "bg-slate-950/10", text: "text-slate-950", solid: "bg-slate-950", border: "hover:border-slate-900", glow: "hover:shadow-[0_20px_50px_-20px_rgba(23,37,84,.4)]", hoverText: "group-hover:text-slate-950" } },
  { id: "cat-fullstack", name: "Full Stack Development", slug: "full-stack-development", description: "MERN, MEAN, Java, Python, PHP, .NET", icon: "Fs", displayOrder: 2, isActive: true,
    hue: { soft: "bg-slate-200/80", text: "text-slate-700", solid: "bg-slate-500", border: "hover:border-slate-300", glow: "hover:shadow-[0_20px_50px_-20px_rgba(100,116,139,.35)]", hoverText: "group-hover:text-slate-700" } },
  { id: "cat-data", name: "Data Science & Analytics", slug: "data-science-analytics", description: "Data Science, Analytics, SQL, Power BI, Excel", icon: "Ds", displayOrder: 3, isActive: true,
    hue: { soft: "bg-violet-100/80", text: "text-violet-700", solid: "bg-violet-600", border: "hover:border-violet-300", glow: "hover:shadow-[0_20px_50px_-20px_rgba(2,132,199,.3)]", hoverText: "group-hover:text-violet-700" } },
  { id: "cat-cyber", name: "Cybersecurity", slug: "cybersecurity", description: "Ethical Hacking, Pentesting, SOC, Network Security", icon: "Cs", displayOrder: 4, isActive: true,
    hue: { soft: "bg-indigo-100/80", text: "text-indigo-700", solid: "bg-indigo-600", border: "hover:border-indigo-300", glow: "hover:shadow-[0_20px_50px_-20px_rgba(79,70,229,.3)]", hoverText: "group-hover:text-indigo-700" } },
  { id: "cat-cloud", name: "Cloud & DevOps", slug: "cloud-computing", description: "Cloud, AWS, Azure, GCP, DevOps, Docker, K8s", icon: "Cl", displayOrder: 5, isActive: true,
    hue: { soft: "bg-violet-100", text: "text-violet-700", solid: "bg-violet-500", border: "hover:border-violet-300", glow: "hover:shadow-[0_20px_50px_-20px_rgba(14,165,233,.35)]", hoverText: "group-hover:text-violet-700" } },
  { id: "cat-prog", name: "Programming", slug: "programming", description: "Java, Python, C, C++, JS, TS, DSA", icon: "Pg", displayOrder: 6, isActive: true,
    hue: { soft: "bg-gray-100", text: "text-gray-700", solid: "bg-gray-500", border: "hover:border-gray-300", glow: "hover:shadow-[0_20px_50px_-20px_rgba(107,114,128,.3)]", hoverText: "group-hover:text-gray-700" } },
  { id: "cat-marketing", name: "Digital Marketing", slug: "digital-marketing", description: "SEO, AEO, Social, Performance, Content", icon: "Dm", displayOrder: 7, isActive: true,
    hue: { soft: "bg-violet-50", text: "text-violet-600", solid: "bg-violet-500", border: "hover:border-violet-200", glow: "hover:shadow-[0_20px_50px_-20px_rgba(14,165,233,.3)]", hoverText: "group-hover:text-violet-600" } },
  { id: "cat-emerging", name: "Emerging Technologies", slug: "emerging-technologies", description: "IoT, Blockchain, Robotics, AR/VR, Automation", icon: "Et", displayOrder: 8, isActive: true,
    hue: { soft: "bg-slate-100", text: "text-slate-600", solid: "bg-slate-400", border: "hover:border-slate-300", glow: "hover:shadow-[0_20px_50px_-20px_rgba(148,163,184,.35)]", hoverText: "group-hover:text-slate-600" } },
];

export const MENU_COURSES = [
  // ---------- ARTIFICIAL INTELLIGENCE ----------
  { id: "ai-01", categoryId: "cat-ai", name: "Artificial Intelligence", slug: "artificial-intelligence", shortDescription: "Foundations, neural networks & applied AI systems.", duration: "6 Months", mode: "Online + Offline", level: "Beginner to Advanced", technologies: ["Python", "TensorFlow", "PyTorch"], isFeatured: true, isActive: true, menuVisible: true, displayOrder: 1 },
  { id: "ai-02", categoryId: "cat-ai", name: "Generative AI", slug: "generative-ai-llm", shortDescription: "Learn modern generative AI models, APIs and applications.", duration: "4 Months", mode: "Online Live", level: "Intermediate", technologies: ["OpenAI", "LangChain", "RAG"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 2 },
  { id: "ai-03", categoryId: "cat-ai", name: "Machine Learning", slug: "machine-learning", shortDescription: "Build predictive models using Python and ML algorithms.", duration: "5 Months", mode: "Online + Offline", level: "Beginner to Advanced", technologies: ["Scikit-learn", "XGBoost"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 3 },
  { id: "ai-04", categoryId: "cat-ai", name: "Deep Learning", slug: "deep-learning", shortDescription: "Learn neural networks, CNNs, RNNs and modern DL architectures.", duration: "4 Months", mode: "Online Live", level: "Intermediate", technologies: ["TensorFlow", "PyTorch", "Keras"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 4 },
  { id: "ai-05", categoryId: "cat-ai", name: "Natural Language Processing", slug: "nlp", shortDescription: "Build applications that understand and process human language.", duration: "3 Months", mode: "Online Live", level: "Intermediate", technologies: ["Transformers", "spaCy"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 5 },
  { id: "ai-06", categoryId: "cat-ai", name: "Computer Vision", slug: "computer-vision", shortDescription: "Develop applications for image and video understanding.", duration: "3 Months", mode: "Online Live", level: "Intermediate", technologies: ["OpenCV", "YOLO"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 6 },
  { id: "ai-07", categoryId: "cat-ai", name: "AI Agents", slug: "ai-agents", shortDescription: "Build intelligent AI agents capable of reasoning, tool use and task automation.", duration: "2 Months", mode: "Online Live", level: "Advanced", technologies: ["LangGraph", "AutoGen"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 7 },
  { id: "ai-08", categoryId: "cat-ai", name: "Large Language Models", slug: "llm-development", shortDescription: "Fine-tune, evaluate and deploy production LLM apps.", duration: "3 Months", mode: "Online Live", level: "Advanced", technologies: ["HuggingFace", "vLLM"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 8 },
  { id: "ai-09", categoryId: "cat-ai", name: "Prompt Engineering", slug: "prompt-engineering", shortDescription: "Master prompting, context design & evaluation.", duration: "1 Month", mode: "Online Live", level: "Beginner", technologies: ["ChatGPT", "Claude"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 9 },
  { id: "ai-10", categoryId: "cat-ai", name: "AI Automation", slug: "ai-automation", shortDescription: "Automate workflows with AI + no-code integrations.", duration: "2 Months", mode: "Online Live", level: "Beginner", technologies: ["Zapier", "Make", "Agents"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 10 },

  // ---------- FULL STACK ----------
  { id: "fs-01", categoryId: "cat-fullstack", name: "MERN Stack", slug: "mern-stack", shortDescription: "MongoDB + Express.js + React + Node.js", duration: "7 Months", mode: "Online + Offline", level: "Beginner to Advanced", technologies: ["MongoDB", "Express", "React", "Node.js"], isFeatured: true, isActive: true, menuVisible: true, displayOrder: 1 },
  { id: "fs-02", categoryId: "cat-fullstack", name: "MEAN Stack", slug: "mean-stack", shortDescription: "MongoDB + Express.js + Angular + Node.js", duration: "7 Months", mode: "Online Live", level: "Intermediate", technologies: ["MongoDB", "Express", "Angular", "Node.js"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 2 },
  { id: "fs-03", categoryId: "cat-fullstack", name: "Java Full Stack", slug: "java-full-stack", shortDescription: "Java + Spring Boot + React + MySQL", duration: "7 Months", mode: "Online + Offline", level: "Beginner to Advanced", technologies: ["Java", "Spring Boot", "React", "MySQL"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 3 },
  { id: "fs-04", categoryId: "cat-fullstack", name: "Python Full Stack", slug: "python-full-stack", shortDescription: "Python + Django/FastAPI + React + PostgreSQL", duration: "6 Months", mode: "Online + Offline", level: "Beginner to Advanced", technologies: ["Python", "Django", "React", "PostgreSQL"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 4 },
  { id: "fs-05", categoryId: "cat-fullstack", name: "PHP Full Stack", slug: "php-full-stack", shortDescription: "PHP + Laravel + MySQL + JavaScript", duration: "5 Months", mode: "Online Live", level: "Beginner", technologies: ["PHP", "Laravel", "MySQL"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 5 },
  { id: "fs-06", categoryId: "cat-fullstack", name: ".NET Full Stack", slug: "dotnet-full-stack", shortDescription: "C# + ASP.NET Core + React + SQL Server", duration: "6 Months", mode: "Online Live", level: "Intermediate", technologies: ["C#", "ASP.NET Core", "React"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 6 },

  // ---------- DATA SCIENCE & ANALYTICS (spec order) ----------
  { id: "da-01", categoryId: "cat-data", name: "Data Science", slug: "data-science-analytics", shortDescription: "End-to-end data science with Python & ML.", duration: "6 Months", mode: "Online Live", level: "Intermediate", technologies: ["Python", "Pandas", "ML"], isFeatured: true, isActive: true, menuVisible: true, displayOrder: 1 },
  { id: "da-02", categoryId: "cat-data", name: "Data Analytics", slug: "data-analytics", shortDescription: "SQL, Excel, dashboards & business insights.", duration: "4 Months", mode: "Online Live", level: "Beginner", technologies: ["SQL", "Excel", "Power BI"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 2 },
  { id: "da-03", categoryId: "cat-data", name: "Python for Data Science", slug: "python-for-data-science", shortDescription: "NumPy, Pandas, visualization & analysis.", duration: "2 Months", mode: "Online Live", level: "Beginner", technologies: ["Python", "Pandas"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 3 },
  { id: "da-06", categoryId: "cat-data", name: "SQL", slug: "sql", shortDescription: "Queries, joins, windows & performance.", duration: "1.5 Months", mode: "Online Live", level: "Beginner", technologies: ["MySQL", "PostgreSQL"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 4 },
  { id: "da-05", categoryId: "cat-data", name: "Power BI", slug: "power-bi", shortDescription: "DAX, data modelling & executive dashboards.", duration: "2 Months", mode: "Online Live", level: "Beginner", technologies: ["Power BI", "DAX"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 5 },
  { id: "da-04", categoryId: "cat-data", name: "Advanced Excel", slug: "advanced-excel", shortDescription: "Formulas, pivots, dashboards & automation.", duration: "1 Month", mode: "Online Live", level: "Beginner", technologies: ["Excel"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 6 },
  { id: "da-08", categoryId: "cat-data", name: "Data Visualization", slug: "data-visualization", shortDescription: "Storytelling with charts, Tableau & BI.", duration: "1.5 Months", mode: "Online Live", level: "Beginner", technologies: ["Tableau", "Power BI"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 7 },
  { id: "da-09", categoryId: "cat-data", name: "Business Analytics", slug: "business-analytics", shortDescription: "KPIs, funnels, cohort & growth analytics.", duration: "2 Months", mode: "Online Live", level: "Intermediate", technologies: ["SQL", "Sheets", "BI"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 8 },
  // Kept resolvable for existing links, hidden from the menu per current catalogue spec
  { id: "da-07", categoryId: "cat-data", name: "Statistics", slug: "statistics", shortDescription: "Stats for ML, testing & decision science.", duration: "1.5 Months", mode: "Online Live", level: "Beginner", technologies: ["Stats", "Python"], isFeatured: false, isActive: true, menuVisible: false, displayOrder: 9 },

  // ---------- CYBERSECURITY (spec order) ----------
  { id: "cb-01", categoryId: "cat-cyber", name: "Cybersecurity Fundamentals", slug: "cybersecurity", shortDescription: "Networks, Linux, threats & defence basics.", duration: "3 Months", mode: "Online Live", level: "Beginner", technologies: ["Networking", "Linux"], isFeatured: true, isActive: true, menuVisible: true, displayOrder: 1 },
  { id: "cb-02", categoryId: "cat-cyber", name: "Ethical Hacking", slug: "ethical-hacking", shortDescription: "Recon, exploitation & reporting labs.", duration: "4 Months", mode: "Online Live", level: "Intermediate", technologies: ["Kali", "Burp"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 2 },
  { id: "cb-03", categoryId: "cat-cyber", name: "Network Security", slug: "network-security", shortDescription: "Firewalls, VPNs, IDS/IPS & hardening.", duration: "2 Months", mode: "Online Live", level: "Intermediate", technologies: ["Wireshark", "pfSense"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 3 },
  { id: "cb-04", categoryId: "cat-cyber", name: "Web Security", slug: "web-security", shortDescription: "OWASP Top 10, Burp & secure coding.", duration: "2 Months", mode: "Online Live", level: "Intermediate", technologies: ["OWASP", "Burp"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 4 },
  { id: "cb-05", categoryId: "cat-cyber", name: "Penetration Testing", slug: "penetration-testing", shortDescription: "Methodology, AD labs & CTF capstone.", duration: "3 Months", mode: "Online Live", level: "Advanced", technologies: ["Metasploit", "AD"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 5 },
  { id: "cb-06", categoryId: "cat-cyber", name: "SOC Fundamentals", slug: "soc-fundamentals", shortDescription: "SIEM, triage, detection & response.", duration: "2 Months", mode: "Online Live", level: "Beginner", technologies: ["Splunk", "ELK"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 6 },
  // Kept resolvable for existing links, hidden from the menu per current catalogue spec
  { id: "cb-07", categoryId: "cat-cyber", name: "Cybersecurity with Python", slug: "cybersecurity-with-python", shortDescription: "Scripting for automation & security tools.", duration: "2 Months", mode: "Online Live", level: "Beginner", technologies: ["Python", "Scapy"], isFeatured: false, isActive: true, menuVisible: false, displayOrder: 7 },

  // ---------- CLOUD & DEVOPS (spec order) ----------
  { id: "cl-01", categoryId: "cat-cloud", name: "Cloud Computing", slug: "cloud-computing", shortDescription: "Cloud models, services & architecture basics.", duration: "2 Months", mode: "Online Live", level: "Beginner", technologies: ["AWS", "Azure"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 1 },
  { id: "cl-02", categoryId: "cat-cloud", name: "AWS", slug: "aws", shortDescription: "EC2, S3, IAM, VPC & solutions architect path.", duration: "3 Months", mode: "Online Live", level: "Intermediate", technologies: ["EC2", "S3", "Lambda"], isFeatured: true, isActive: true, menuVisible: true, displayOrder: 2 },
  { id: "cl-03", categoryId: "cat-cloud", name: "Microsoft Azure", slug: "azure", shortDescription: "Azure services, AZ-104 & AZ-900 prep.", duration: "3 Months", mode: "Online Live", level: "Intermediate", technologies: ["Azure VM", "Entra"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 3 },
  { id: "cl-04", categoryId: "cat-cloud", name: "Google Cloud", slug: "gcp", shortDescription: "GCP core services & data on cloud.", duration: "2.5 Months", mode: "Online Live", level: "Intermediate", technologies: ["GCE", "BigQuery"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 4 },
  { id: "cl-06", categoryId: "cat-cloud", name: "DevOps", slug: "devops", shortDescription: "Git, Linux, CI/CD & SRE practices.", duration: "4 Months", mode: "Online Live", level: "Intermediate", technologies: ["Git", "Jenkins"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 5 },
  { id: "cl-07", categoryId: "cat-cloud", name: "Docker", slug: "docker", shortDescription: "Containers, images & compose mastery.", duration: "1 Month", mode: "Online Live", level: "Beginner", technologies: ["Docker"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 6 },
  { id: "cl-08", categoryId: "cat-cloud", name: "Kubernetes", slug: "kubernetes", shortDescription: "Pods, deployments, helm & production K8s.", duration: "2 Months", mode: "Online Live", level: "Advanced", technologies: ["K8s", "Helm"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 7 },
  { id: "cl-09", categoryId: "cat-cloud", name: "CI/CD", slug: "cicd", shortDescription: "Pipelines with GitHub Actions & Jenkins.", duration: "1.5 Months", mode: "Online Live", level: "Intermediate", technologies: ["Actions", "Jenkins"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 8 },
  // Kept resolvable for existing links, hidden from the menu per current catalogue spec
  { id: "cl-05", categoryId: "cat-cloud", name: "Cloud Architecture", slug: "cloud-architecture", shortDescription: "Well-architected, HA & cost design.", duration: "2 Months", mode: "Online Live", level: "Advanced", technologies: ["Terraform"], isFeatured: false, isActive: true, menuVisible: false, displayOrder: 9 },

  // ---------- PROGRAMMING ----------
  { id: "pg-01", categoryId: "cat-prog", name: "Java", slug: "java", shortDescription: "Core + Advanced Java, OOP & projects.", duration: "4 Months", mode: "Online + Offline", level: "Beginner", technologies: ["Java", "Maven"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 1 },
  { id: "pg-02", categoryId: "cat-prog", name: "Python", slug: "python-programming", shortDescription: "Zero to automation, APIs & OOP.", duration: "3 Months", mode: "Online + Offline", level: "Beginner", technologies: ["Python"], isFeatured: true, isActive: true, menuVisible: true, displayOrder: 2 },
  { id: "pg-03", categoryId: "cat-prog", name: "C", slug: "c-programming", shortDescription: "Foundations, memory & problem solving.", duration: "2 Months", mode: "Online Live", level: "Beginner", technologies: ["C"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 3 },
  { id: "pg-04", categoryId: "cat-prog", name: "C++", slug: "cpp", shortDescription: "OOP, STL & competitive programming.", duration: "3 Months", mode: "Online Live", level: "Intermediate", technologies: ["C++", "STL"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 4 },
  { id: "pg-05", categoryId: "cat-prog", name: "JavaScript", slug: "javascript", shortDescription: "Modern JS, DOM & async mastery.", duration: "2.5 Months", mode: "Online Live", level: "Beginner", technologies: ["JS", "ES2024"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 5 },
  { id: "pg-06", categoryId: "cat-prog", name: "TypeScript", slug: "typescript", shortDescription: "Types, tooling & production TS.", duration: "1.5 Months", mode: "Online Live", level: "Intermediate", technologies: ["TS"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 6 },
  { id: "pg-07", categoryId: "cat-prog", name: "SQL", slug: "sql", shortDescription: "Find it under Data Science & Analytics.", duration: "1.5 Months", mode: "Online Live", level: "Beginner", technologies: ["SQL"], isFeatured: false, isActive: true, menuVisible: false, displayOrder: 7 },
  { id: "pg-08", categoryId: "cat-prog", name: "Data Structures & Algorithms", slug: "dsa", shortDescription: "DSA for interviews & placements.", duration: "4 Months", mode: "Online Live", level: "Intermediate", technologies: ["DSA", "LeetCode"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 8 },

  // ---------- MARKETING ----------
  { id: "dm-01", categoryId: "cat-marketing", name: "Digital Marketing", slug: "digital-marketing-aeo", shortDescription: "Full-stack marketing: SEO to paid growth.", duration: "4 Months", mode: "Online Live", level: "Beginner", technologies: ["SEO", "Ads"], isFeatured: true, isActive: true, menuVisible: true, displayOrder: 1 },
  { id: "dm-02", categoryId: "cat-marketing", name: "SEO", slug: "seo", shortDescription: "Technical, on-page & authority SEO.", duration: "2 Months", mode: "Online Live", level: "Beginner", technologies: ["GSC", "Semrush"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 2 },
  { id: "dm-03", categoryId: "cat-marketing", name: "AEO", slug: "aeo", shortDescription: "Rank in ChatGPT, Perplexity & AI Overviews.", duration: "1.5 Months", mode: "Online Live", level: "Intermediate", technologies: ["AEO", "GEO"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 3 },
  { id: "dm-04", categoryId: "cat-marketing", name: "Social Media Marketing", slug: "social-media-marketing", shortDescription: "Content systems & community growth.", duration: "2 Months", mode: "Online Live", level: "Beginner", technologies: ["Meta", "LinkedIn"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 4 },
  { id: "dm-05", categoryId: "cat-marketing", name: "Performance Marketing", slug: "performance-marketing", shortDescription: "Meta + Google Ads with ROAS focus.", duration: "2.5 Months", mode: "Online Live", level: "Intermediate", technologies: ["Meta Ads", "Google Ads"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 5 },
  { id: "dm-06", categoryId: "cat-marketing", name: "Content Marketing", slug: "content-marketing", shortDescription: "Strategy, copy & AI-assisted content.", duration: "2 Months", mode: "Online Live", level: "Beginner", technologies: ["Copy", "AI"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 6 },
  { id: "dm-07", categoryId: "cat-marketing", name: "Email Marketing", slug: "email-marketing", shortDescription: "Flows, deliverability & automation.", duration: "1 Month", mode: "Online Live", level: "Beginner", technologies: ["Klaviyo"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 7 },
  { id: "dm-08", categoryId: "cat-marketing", name: "Google Analytics", slug: "google-analytics", shortDescription: "GA4, events & attribution mastery.", duration: "1 Month", mode: "Online Live", level: "Beginner", technologies: ["GA4"], isFeatured: false, isActive: true, menuVisible: false, displayOrder: 8 },

  // ---------- EMERGING TECHNOLOGIES (spec order; AI titles live under AI & Emerging Technology) ----------
  { id: "et-03", categoryId: "cat-emerging", name: "IoT", slug: "iot", shortDescription: "Sensors, ESP32, MQTT & dashboards.", duration: "3 Months", mode: "Hybrid", level: "Intermediate", technologies: ["ESP32", "MQTT"], isFeatured: true, isActive: true, menuVisible: true, displayOrder: 1 },
  { id: "et-04", categoryId: "cat-emerging", name: "Blockchain", slug: "blockchain", shortDescription: "Solidity, dApps & Web3 foundations.", duration: "3 Months", mode: "Online Live", level: "Intermediate", technologies: ["Solidity"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 2 },
  { id: "et-05", categoryId: "cat-emerging", name: "Robotics", slug: "robotics", shortDescription: "ROS basics, control & simulation.", duration: "4 Months", mode: "Hybrid", level: "Intermediate", technologies: ["ROS", "Python"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 3 },
  { id: "et-07", categoryId: "cat-emerging", name: "AR/VR", slug: "ar-vr", shortDescription: "Unity, XR interaction & immersive apps.", duration: "4 Months", mode: "Hybrid", level: "Intermediate", technologies: ["Unity", "XR"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 4 },
  { id: "et-06", categoryId: "cat-emerging", name: "Automation", slug: "ai-automation", shortDescription: "Industrial + business process automation.", duration: "2 Months", mode: "Online Live", level: "Beginner", technologies: ["RPA", "AI"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 5 },
  { id: "et-09", categoryId: "cat-emerging", name: "Industry 4.0", slug: "industry-4-0", shortDescription: "Smart factories, digital twins & edge.", duration: "2 Months", mode: "Online Live", level: "Intermediate", technologies: ["IoT", "Digital Twin"], isFeatured: false, isActive: true, menuVisible: true, displayOrder: 6 },
  // Kept resolvable for existing links, hidden here to avoid duplicating the AI category
  { id: "et-01", categoryId: "cat-emerging", name: "Generative AI Applications", slug: "generative-ai-llm", shortDescription: "Ship LLM apps, RAG & copilots.", duration: "4 Months", mode: "Online Live", level: "Intermediate", technologies: ["LLMs", "RAG"], isFeatured: false, isActive: true, menuVisible: false, displayOrder: 7 },
  { id: "et-02", categoryId: "cat-emerging", name: "AI Agents Engineering", slug: "ai-agents", shortDescription: "Reasoning agents & tool-use systems.", duration: "2 Months", mode: "Online Live", level: "Advanced", technologies: ["Agents"], isFeatured: false, isActive: true, menuVisible: false, displayOrder: 8 },
  { id: "et-08", categoryId: "cat-emerging", name: "Quantum Computing", slug: "quantum-computing", shortDescription: "Qubits, gates & Qiskit primer.", duration: "2 Months", mode: "Online Live", level: "Advanced", technologies: ["Qiskit"], isFeatured: false, isActive: true, menuVisible: false, displayOrder: 9 },
];

/** Global spotlight (admin-configurable). Category rails prefer their own featured course. */
export const FEATURED_COURSE = {
  badge: "Admissions Open · 2026",
  name: "Artificial Intelligence Program",
  points: ["Python + ML Foundations", "Generative AI & RAG", "AI Agents + Capstone"],
  desc: "Master AI foundations, neural networks and LLM applications — with internship, projects and verifiable certification.",
  cta: "Explore Program",
  slug: "artificial-intelligence",
  stats: "6 Months · 8 Projects · Internship",
};

/* Legacy slug aliases — renamed catalogue entries keep resolving old URLs. */
export const SLUG_ALIASES = {
  "web-application-security": "web-security",
};

/* ---------- Selectors (simulate API layer; swap with fetch later) ---------- */
export function getActiveCategories() {
  return COURSE_CATEGORIES.filter((c) => c.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
}
export function getCategoryBySlug(slug) {
  return COURSE_CATEGORIES.find((c) => c.slug === slug && c.isActive);
}
export function getCategoryById(id) {
  return COURSE_CATEGORIES.find((c) => c.id === id && c.isActive);
}
export function getCoursesByCategory(categoryId) {
  return MENU_COURSES.filter((c) => c.categoryId === categoryId && c.isActive && c.menuVisible !== false).sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
}
export function getCourseBySlug(slug) {
  const canonical = SLUG_ALIASES[slug] || slug;
  return MENU_COURSES.find((c) => c.slug === canonical && c.isActive);
}
export function getFeaturedCourse() {
  return MENU_COURSES.find((c) => c.isFeatured && c.isActive) || MENU_COURSES[0];
}
/** Spotlight for a category rail: its featured course, else its first listed program. */
export function getFeaturedCourseForCategory(categoryId) {
  const list = getCoursesByCategory(categoryId);
  return list.find((c) => c.isFeatured) || list[0];
}
