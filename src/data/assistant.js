/**
 * Eduskill assistant brain - shared by the popup chatbot
 * (and the legacy hero assistant). Rule-based, offline, instant.
 */

export const QUICK_REPLIES = ["Explore courses", "Internships", "Fees & EMI", "Talk to counsellor"];

export function getAnswer(input) {
  const q = String(input || "").toLowerCase();
  const has = (...ws) => ws.some((w) => q.includes(w));
  if (has("counsell", "call back", "callback", "talk", "human", "advisor"))
    return { text: "A counsellor will call you back within 24 hours with a personalised roadmap.", action: "counsellor" };
  if (has("fee", "emi", "price", "cost", "payment"))
    return { text: "Most career programs offer no-cost EMI via UPI, cards and net-banking. Open any course page for exact fees." };
  if (has("intern"))
    return { text: "4–12 week mentor-led internships across AI, Full Stack, Data, Security, Cloud and Marketing - with projects and certification.", link: ["/internships", "View internships"] };
  if (has("place", "job", "career", "salary", "hiring"))
    return { text: "You get resume + LinkedIn reviews, mock interviews and referral drives. No false guarantees - real preparation.", link: ["/placement", "Placement programs"] };
  if (has("certificate", "verify", "verification"))
    return { text: "Every certificate carries a unique ID employers can verify instantly on our verification page.", link: ["/verify", "Verify a certificate"] };
  if (has("corporate", "company", "b2b", "hr", "training for"))
    return { text: "We run AI, data, security and cloud workshops for HR/L&D teams - fully customised.", link: ["/corporate", "Corporate training"] };
  if (has("partner", "college", "mou", "university", "institute"))
    return { text: "We sign MoUs for internships, FDPs, workshops and placement-oriented training.", link: ["/partner", "Partner with us"] };
  if (has("contact", "phone", "email", "address", "location"))
    return { text: "Reach us at hello@envistream.org or +91 99999 99999 - or request a callback below.", action: "counsellor" };
  if (has("course", "program", "learn", "training", "track"))
    return { text: "8 tracks, 50+ programs: AI, Full Stack, Data, Security, Cloud & DevOps, Programming, Marketing, Emerging Tech.", link: ["/courses", "Browse all courses"] };
  if (has("ai", "ml", "machine", "genai", "llm")) return { text: "Start with Artificial Intelligence or Generative AI - both include projects and internship.", link: ["/courses/artificial-intelligence", "Explore AI"] };
  if (has("mern", "full stack", "web", "react", "mern"))
    return { text: "Full Stack has 6 paths: MERN, MEAN, Java, Python, PHP and .NET.", link: ["/courses/mern-stack", "Explore MERN"] };
  if (has("data", "sql", "power bi", "excel", "analytics"))
    return { text: "Data Science & Analytics covers SQL, Power BI, Python and business storytelling.", link: ["/courses/data-science-analytics", "Explore Data"] };
  if (has("cyber", "hack", "security", "soc"))
    return { text: "Cybersecurity spans fundamentals, ethical hacking, pentesting and SOC - with live labs.", link: ["/courses/cybersecurity", "Explore Security"] };
  if (has("cloud", "aws", "azure", "devops", "docker"))
    return { text: "Cloud & DevOps covers AWS, Azure, GCP, Docker, Kubernetes and CI/CD.", link: ["/courses/aws", "Explore AWS"] };
  if (has("hi", "hello", "hey", "namaste")) return { text: "Hello! Ask me about courses, internships, fees or placements." };
  return { text: "I can help with courses, internships, fees, placements, certificates and partnerships - try one of the shortcuts below." };
}

export const GREETING = {
  from: "bot",
  text: "Hi! I'm the Eduskill assistant. Ask about courses, internships, fees or placements.",
};
