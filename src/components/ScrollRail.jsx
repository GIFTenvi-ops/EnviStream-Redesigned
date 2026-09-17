import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const ITEMS = [
  ["hero", "Intro"],
  ["stats", "Impact"],
  ["courses", "Programs"],
  ["flagships", "Flagships"],
  ["stories", "Stories"],
  ["faq", "FAQ"],
];

export default function ScrollRail() {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = ITEMS.map(([id]) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] }
    );
    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      window.__lenis?.scrollTo(el, { offset: -96, duration: 1.1 });
    } catch {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const top = () => {
    try { window.__lenis?.scrollTo(0, { duration: 1 }); }
    catch { window.scrollTo({ top: 0, behavior: "smooth" }); }
  };

  return (
    <div className="scroll-rail" aria-label="Page sections">
      <div className="scroll-rail-track" aria-hidden>
        <span style={{ transform: `scaleY(${progress})` }} />
      </div>
      <div className="scroll-rail-items">
        {ITEMS.map(([id, label], i) => (
          <button key={id} type="button" className={`scroll-rail-dot ${active === id ? "is-active" : ""}`} onClick={() => go(id)} aria-label={`Go to ${label}`}>
            <span>{String(i + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
      <button type="button" className="scroll-rail-top" onClick={top} aria-label="Back to top"><FiArrowUp size={14} /></button>
    </div>
  );
}
