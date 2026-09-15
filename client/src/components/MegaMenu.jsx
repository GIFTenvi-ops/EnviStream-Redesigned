import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  FiChevronRight, FiArrowRight, FiClock, FiBarChart2, FiLayers,
  FiCpu, FiCode, FiDatabase, FiShield, FiCloud, FiTerminal,
  FiTrendingUp, FiZap, FiCheck,
} from "react-icons/fi";
import {
  getActiveCategories, getCoursesByCategory, getFeaturedCourseForCategory, FEATURED_COURSE,
} from "../data/megaMenu";

export const CAT_ICONS = {
  Ai: FiCpu, Fs: FiLayers, Ds: FiDatabase, Cs: FiShield,
  Cl: FiCloud, Pg: FiTerminal, Dm: FiTrendingUp, Et: FiZap,
};
function courseUrl(course) {
  return course.menuUrl || `/courses/${course.slug}`;
}

/**
 * Spotlight card. Pass a catalogue `course` to spotlight that program
 * (used for the per-category rail); with no props it renders the global
 * FEATURED_COURSE fallback. Fully admin-driven via isFeatured flags.
 */
export function FeaturedCard({ compact = false, course = null, eyebrow = null }) {
  const data = course
    ? {
        badge: eyebrow || "Featured Program",
        name: course.name,
        points: (course.technologies || []).slice(0, 4),
        desc: course.shortDescription,
        cta: "Explore Program",
        slug: course.slug,
        stats: `${course.duration} · ${course.level?.split(" ")[0] || "All levels"}`,
      }
    : FEATURED_COURSE;

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/75 backdrop-blur-2xl text-white ${compact ? "p-5" : "p-6"}`}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#d4a85d]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-[#5d7b86]/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[.12]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "26px 26px" }}
        />
      </div>
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d4a85d]/15 border border-[#d4a85d]/35 text-[#f0deaf] text-[11px] font-bold uppercase tracking-widest px-3 py-1 backdrop-blur">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4a85d] animate-pulse" /> {data.badge}
        </span>
        <h4 className="font-display font-bold text-[19px] leading-snug mt-3">{data.name}</h4>
        <p className="text-[13px] text-slate-300 mt-1.5 leading-relaxed line-clamp-2">{data.desc}</p>
        <ul className="mt-3 space-y-1.5">
          {data.points.map((p) => (
            <li key={p} className="flex items-center gap-2 text-[13.5px] font-medium text-slate-100">
              <span className="w-5 h-5 grid place-items-center rounded-md bg-[#d4a85d]/10 border border-[#d4a85d]/35"><FiCheck size={12} className="text-[#f0deaf]" /></span>{p}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center gap-3 text-[12px] text-slate-400">
          <span className="inline-flex items-center gap-1"><FiClock size={12} /> {data.stats.split("·")[0]?.trim()}</span>
          <span className="inline-flex items-center gap-1"><FiBarChart2 size={12} /> Job-ready</span>
        </div>
        <Link
          to={`/courses/${data.slug}`}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#d4a85d] hover:bg-[#e2bb72] border border-[#f0deaf]/60 text-[#0d171d] backdrop-blur px-4 py-2.5 text-[13.5px] font-bold transition-all hover:gap-3 shadow-[0_10px_24px_-8px_rgba(212,168,93,.7)]"
        >
          {data.cta} <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}

/**
 * DESKTOP mega panel — 3 zones: categories | programs | per-category spotlight.
 * Parent controls mounting; this component runs the GSAP enter animation
 * (opacity 0→1, y -10→0, scale .98→1, ~0.3s) and program-switch animation.
 */
export function MegaPanel({ onNavigate }) {
  const categories = useMemo(() => getActiveCategories(), []);
  const [activeId, setActiveId] = useState(categories[0]?.id);
  // `shownId` trails hover so outgoing cards can exit left before the
  // incoming set enters from the right — never an instant swap.
  const [shownId, setShownId] = useState(categories[0]?.id);
  const busy = useRef(false);
  const panelRef = useRef(null);
  const listRef = useRef(null);
  const spotRef = useRef(null);

  const activeCat = categories.find((c) => c.id === activeId) || categories[0];
  const shownCat = categories.find((c) => c.id === shownId) || activeCat;
  const programs = useMemo(() => (shownCat ? getCoursesByCategory(shownCat.id) : []), [shownCat]);
  const spotlight = useMemo(() => (activeCat ? getFeaturedCourseForCategory(activeCat.id) : null), [activeCat]);

  // enter animation: opacity 0→1, y -15→0, scale .98→1
  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: -15, scale: 0.98, transformOrigin: "top center" },
      { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: "power3.out" }
    );
  }, []);

  // directional category transition: out left, in from right, staggered (~0.4s)
  useEffect(() => {
    if (!listRef.current) return;
    if (activeId === shownId) return;
    if (busy.current) {
      setShownId(activeId);
      return;
    }
    busy.current = true;
    const kids = listRef.current.children;
    gsap.to(kids, {
      opacity: 0, x: -14, duration: 0.16, stagger: 0.014, ease: "power2.in", overwrite: true,
      onComplete: () => {
        setShownId(activeId);
        requestAnimationFrame(() => {
          if (!listRef.current) {
            busy.current = false;
            return;
          }
          gsap.fromTo(
            listRef.current.children,
            { opacity: 0, x: 26 },
            {
              opacity: 1, x: 0, duration: 0.32, stagger: 0.032, ease: "power3.out",
              overwrite: true, onComplete: () => { busy.current = false; },
            }
          );
        });
      },
    });
    return () => {
      gsap.killTweensOf(kids);
      busy.current = false;
    };
  }, [activeId, shownId]);

  // spotlight follows hover immediately with a soft crossfade
  useEffect(() => {
    if (spotRef.current) {
      gsap.fromTo(spotRef.current, { opacity: 0.25, x: 10 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out", overwrite: true });
    }
  }, [activeId]);

  return (
    <div ref={panelRef} className="w-[980px] xl:w-[1080px] max-w-[calc(100vw-3rem)] rounded-2xl bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_30px_80px_-20px_rgba(249,115,22,.3)] overflow-hidden">
      <div className="grid grid-cols-[270px_1fr_300px]">
        {/* LEFT — categories */}
        <div className="bg-slate-100/50 backdrop-blur border-r border-white/60 py-3 px-2.5" role="tablist" aria-label="Course categories">
          <p className="px-3 pt-1 pb-2 text-[11px] font-bold uppercase tracking-[.14em] text-slate-500">Browse by technology</p>
          {categories.map((cat) => {
            const Icon = CAT_ICONS[cat.icon] || FiCode;
            const active = cat.id === activeId;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={active}
                onMouseEnter={() => setActiveId(cat.id)}
                onFocus={() => setActiveId(cat.id)}
                onClick={() => setActiveId(cat.id)}
                className={`group w-full flex items-center gap-3 rounded-xl px-3 py-[10px] text-left transition-all duration-200 border-l-[3px] ${
                  active
                    ? "bg-[#edf5f7]/90 border-[#0d6b7a] shadow-[inset_0_0_0_1px_rgba(13,107,122,.15)] backdrop-blur"
                    : "border-transparent hover:bg-white/70 hover:border-white/60"
                }`}
              >
                <span className={`w-9 h-9 grid place-items-center rounded-lg border shrink-0 transition-colors ${active ? "bg-[#0d6b7a] border-[#0d6b7a] text-white" : "bg-white/70 border-white/60 text-slate-700 group-hover:text-[#0d6b7a] group-hover:border-[#b7dfe8]"}`}>
                  <Icon size={16} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className={`block text-[13.5px] font-bold leading-tight truncate ${active ? "text-slate-900" : "text-slate-700"}`}>{cat.name}</span>
                  <span className="block text-[11.5px] text-slate-500 truncate">{getCoursesByCategory(cat.id).length} programs</span>
                </span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#0d6b7a] animate-pulse shrink-0" aria-hidden />}
                <FiChevronRight size={15} className={`shrink-0 transition-all duration-200 ${active ? "text-[#0d6b7a] translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:opacity-60 group-hover:translate-x-0 text-slate-400"}`} />
              </button>
            );
          })}
        </div>

        {/* MIDDLE — programs of the hovered category only */}
        <div className="py-4 px-5 min-h-[430px] bg-white/40 backdrop-blur">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-display font-bold text-slate-900 text-[16px]">{activeCat?.name} Programs</h3>
              <p className="text-[12.5px] text-slate-500">{activeCat?.description}</p>
            </div>
            <Link
              to={`/courses?category=${activeCat?.slug}`}
              onClick={onNavigate}
              className="text-[12.5px] font-bold text-[#0d6b7a] hover:text-[#0f7f93] inline-flex items-center gap-1 shrink-0 ml-4 whitespace-nowrap"
            >
              View all in {activeCat?.name} <FiArrowRight size={13} />
            </Link>
          </div>
          <div ref={listRef} className="grid grid-cols-2 gap-2 mt-3">
            {programs.map((p) => (
              <Link
                key={p.id}
                to={courseUrl(p)}
                onClick={onNavigate}
                className="group rounded-xl border border-transparent hover:border-[#b7dfe8] hover:bg-[#edf5f7]/80 backdrop-blur p-3 transition-all duration-200"
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="text-[13.5px] font-bold text-slate-800 group-hover:text-[#0d6b7a] leading-snug">{p.name}</span>
                  <span className="text-[11px] font-bold text-[#0d6b7a] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap mt-[1px]">Explore →</span>
                </span>
                <span className="block text-[12px] text-slate-500 leading-relaxed mt-1 line-clamp-2">{p.shortDescription}</span>
                <span className="flex items-center gap-2 mt-2 text-[11px] font-semibold text-slate-400">
                  <span className="inline-flex items-center gap-1"><FiClock size={11} /> {p.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{p.level.split(" ")[0]}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT — spotlight follows the hovered category */}
        <div className="border-l border-white/60 bg-slate-100/50 backdrop-blur p-4">
          <div ref={spotRef} key={activeCat?.id}>
            <FeaturedCard course={spotlight} eyebrow={`Featured · ${activeCat?.name}`} />
          </div>
          <div className="mt-3 rounded-xl border border-dashed border-slate-300/80 bg-white/50 backdrop-blur p-3 text-center">
            <p className="text-[12px] text-slate-500">Not sure what to learn?</p>
            <Link to="/contact" onClick={onNavigate} className="text-[13px] font-bold text-[#0d6b7a] hover:underline">Talk to a counsellor →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * MOBILE accordion — Courses → Category → Programs. Smooth height animation.
 */
export function MobileMegaMenu({ onNavigate }) {
  const categories = useMemo(() => getActiveCategories(), []);
  const [openCat, setOpenCat] = useState(null);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const bodyRefs = useRef({});

  useEffect(() => {
    // animate open/close with GSAP height
    Object.entries(bodyRefs.current).forEach(([id, el]) => {
      if (!el) return;
      if (id === "__courses") {
        gsap.to(el, { height: coursesOpen ? "auto" : 0, opacity: coursesOpen ? 1 : 0, duration: 0.35, ease: "power2.inOut", overwrite: true });
      } else {
        const isOpen = openCat === id;
        gsap.to(el, { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0, duration: 0.32, ease: "power2.inOut", overwrite: true });
      }
    });
  }, [openCat, coursesOpen]);

  const spotCat = categories.find((c) => c.id === openCat) || categories[0];

  return (
    <div className="rounded-xl border border-white/60 bg-white/60 backdrop-blur-xl overflow-hidden">
      <button
        onClick={() => setCoursesOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 font-bold text-slate-900 bg-slate-100/60 backdrop-blur"
        aria-expanded={coursesOpen}
      >
        Courses
        <FiChevronRight className={`transition-transform duration-300 ${coursesOpen ? "rotate-90 text-[#0d6b7a]" : ""}`} />
      </button>
      <div ref={(el) => (bodyRefs.current.__courses = el)} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
        <div className="divide-y divide-white/60">
          {categories.map((cat) => {
            const Icon = CAT_ICONS[cat.icon] || FiCode;
            const open = openCat === cat.id;
            const programs = getCoursesByCategory(cat.id);
            return (
              <div key={cat.id}>
                <button
                  onClick={() => setOpenCat(open ? null : cat.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${open ? "bg-[#edf5f7]" : "bg-white/50"}`}
                  aria-expanded={open}
                >
                  <span className={`w-8 h-8 grid place-items-center rounded-lg border ${open ? "bg-[#0d6b7a] text-white border-[#0d6b7a]" : "bg-white/70 text-slate-700 border-white/60"}`}>
                    <Icon size={15} />
                  </span>
                  <span className="flex-1 text-[14px] font-bold text-slate-800">{cat.name}</span>
                  <FiChevronRight size={15} className={`transition-transform duration-300 ${open ? "rotate-90 text-[#0d6b7a]" : "text-slate-400"}`} />
                </button>
                <div ref={(el) => (bodyRefs.current[cat.id] = el)} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
                  <div className="bg-white/50 backdrop-blur pb-1">
                    {programs.map((p) => (
                      <Link
                        key={p.id}
                        to={courseUrl(p)}
                        onClick={onNavigate}
                        className="flex items-center justify-between gap-3 pl-[60px] pr-4 py-2.5 border-l-[3px] border-transparent hover:border-[#0d6b7a] hover:bg-[#edf5f7]"
                      >
                        <span>
                          <span className="block text-[13.5px] font-semibold text-slate-800">{p.name}</span>
                          <span className="block text-[12px] text-slate-500 truncate max-w-[220px]">{p.shortDescription}</span>
                        </span>
                        <span className="text-[12px] font-bold text-[#0d6b7a] shrink-0">Explore →</span>
                      </Link>
                    ))}
                    <Link
                      to={`/courses?category=${cat.slug}`}
                      onClick={onNavigate}
                      className="block ml-[60px] mr-4 mb-2 rounded-lg bg-[#edf5f7] px-3 py-2.5 text-[13px] font-bold text-[#0d6b7a]"
                    >
                      View all in {cat.name} →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="p-3 bg-slate-100/50 backdrop-blur">
            <FeaturedCard compact course={getFeaturedCourseForCategory(spotCat?.id)} eyebrow={`Featured · ${spotCat?.name}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
