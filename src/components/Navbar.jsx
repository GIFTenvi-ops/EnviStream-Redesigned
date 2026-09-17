import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";
import { FiMenu, FiX, FiChevronDown, FiArrowRight, FiShield, FiPhone } from "react-icons/fi";
import Logo from "./Logo";
import { MegaPanel, MobileMegaMenu } from "./MegaMenu";
import { Magnetic, reduced } from "../anim/ui";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses", mega: true },
  { to: "/internships", label: "Internships" },
  { to: "/corporate", label: "Corporate Training" },
  { to: "/placement", label: "Placement" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

/* Hover / touch preview data for every nav option (Courses uses the full MegaPanel) */
const NAV_PREVIEW = {
  "/": {
    eyebrow: "Envistream Eduskill",
    title: "Learn. Build. Get hired.",
    desc: "Courses, internships and certifications across AI, Full Stack, Data, Security and Cloud.",
    links: [
      { label: "Browse Courses", to: "/courses", desc: "10 career programs" },
      { label: "Join Internship", to: "/internships", desc: "4–12 week projects" },
      { label: "Verify Certificate", to: "/verify", desc: "Instant credential check" },
      { label: "Talk to Counsellor", to: "/contact", desc: "Free roadmap call" },
    ],
    cta: { label: "Explore Home", to: "/" },
  },
  "/about": {
    eyebrow: "Who we are",
    title: "Trust, innovation, employability",
    desc: "Education, skill development, internships and career programs.",
    links: [
      { label: "About Us", to: "/about", desc: "Mission + vision" },
      { label: "Partner With Us", to: "/partner", desc: "Colleges + companies" },
      { label: "Career Programs", to: "/placement", desc: "Outcomes + support" },
      { label: "Contact", to: "/contact", desc: "Reply in 24 hours" },
    ],
    cta: { label: "More about us", to: "/about" },
  },
  "/internships": {
    eyebrow: "Learn by building",
    title: "Mentor-led internships",
    desc: "4–12 week projects with reviews and certification.",
    links: [
      { label: "AI Internship", to: "/internships", desc: "RAG + agents" },
      { label: "Full Stack Internship", to: "/internships", desc: "MERN capstone" },
      { label: "Data Internship", to: "/internships", desc: "Dashboards + SQL" },
      { label: "Cybersecurity Internship", to: "/internships", desc: "SOC + CTF labs" },
    ],
    cta: { label: "View all internships", to: "/internships" },
  },
  "/corporate": {
    eyebrow: "For HR & L&D teams",
    title: "Corporate training",
    desc: "Customised workshops for teams and colleges.",
    links: [
      { label: "AI & GenAI Productivity", to: "/corporate", desc: "Copilots + RAG" },
      { label: "Data Analytics", to: "/corporate", desc: "SQL + Power BI" },
      { label: "Cyber Awareness", to: "/corporate", desc: "Phishing + SOC" },
      { label: "Custom Workshop", to: "/contact", desc: "Talk to us" },
    ],
    cta: { label: "Request callback", to: "/contact" },
  },
  "/placement": {
    eyebrow: "Career outcomes",
    title: "Placement assistance",
    desc: "Real preparation - no false guarantees.",
    links: [
      { label: "Job-Oriented Training", to: "/placement", desc: "Role-ready skills" },
      { label: "Resume + LinkedIn", to: "/placement", desc: "Expert reviews" },
      { label: "Mock Interviews", to: "/placement", desc: "HR + technical" },
      { label: "Referral Drives", to: "/placement", desc: "Hiring partners" },
    ],
    cta: { label: "Career programs", to: "/placement" },
  },
  "/resources": {
    eyebrow: "Learn free",
    title: "Resources & blog",
    desc: "AI guides, career roadmaps and FAQs.",
    links: [
      { label: "AI Career Roadmap 2026", to: "/resources", desc: "Zero to AI engineer" },
      { label: "What is AEO & GEO?", to: "/resources", desc: "Rank in AI search" },
      { label: "FAQs", to: "/contact", desc: "Questions answered" },
      { label: "Verify Certificate", to: "/verify", desc: "Check credentials" },
    ],
    cta: { label: "All resources", to: "/resources" },
  },
  "/contact": {
    eyebrow: "Talk to us",
    title: "Counselling in 24 hours",
    desc: "Enquiries, training requests and partnerships.",
    links: [
      { label: "Student Counselling", to: "/contact", desc: "Personalised roadmap" },
      { label: "Training Request", to: "/corporate", desc: "Teams + colleges" },
      { label: "Partner With Us", to: "/partner", desc: "MoUs + FDPs" },
      { label: "Call +91 99999 99999", to: "/contact", desc: "Mon–Sat, 10–7" },
    ],
    cta: { label: "Contact now", to: "/contact" },
  },
};

function MiniDrop({ data, onNavigate }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || reduced()) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: -12, scale: 0.98, transformOrigin: "top center" },
      { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out", overwrite: "auto" }
    );
  }, [data?.title]);
  if (!data) return null;
  return (
    <div ref={ref} className="w-[560px] max-w-[calc(100vw-3rem)] rounded-2xl bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_30px_80px_-20px_rgba(212,168,93,.28)] overflow-hidden">
      <div className="p-5">
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#0d6b7a]">{data.eyebrow}</p>
        <h4 className="font-display font-bold text-ink-navy text-[18px] mt-1">{data.title}</h4>
        <p className="text-[13px] text-slate-500 mt-1">{data.desc}</p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={onNavigate}
              className="group rounded-xl border border-transparent hover:border-[#b7dfe8] hover:bg-[#edf5f7] p-3 transition-all"
            >
              <span className="block text-[13.5px] font-bold text-ink-body group-hover:text-[#0d6b7a]">{l.label}</span>
              <span className="block text-[12px] text-slate-500 mt-0.5">{l.desc}</span>
            </Link>
          ))}
        </div>
        <Link
          to={data.cta.to}
          onClick={onNavigate}
          className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0d6b7a] hover:gap-2.5 transition-all"
        >
          {data.cta.label} <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default function Navbar({ onEnquire, booted = true }) {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const loc = useLocation();
  const closeTimer = useRef(null);
  const megaWrapRef = useRef(null);
  const miniWrapRef = useRef(null);
  const headerRef = useRef(null);
  const barRef = useRef(null);
  const floatRef = useRef(null);
  const progressRef = useRef(null);
  const mobileRef = useRef(null);
  const entered = useRef(false);
  const megaOpen = openMenu === "/courses";
  const miniData = openMenu && openMenu !== "/courses" ? NAV_PREVIEW[openMenu] : null;

  // Scroll state: solid pill + progress bar - navbar always stays visible
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, y / max));

      setSolid(y > 24);

      // progress bar - snappy 0.1s follow
      if (progressRef.current) {
        gsap.to(progressRef.current, { scaleX: p, duration: 0.1, ease: "power1.out", overwrite: "auto" });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Premium entrance: float pill drops in once the loader lifts
  useEffect(() => {
    if (!booted || entered.current || !floatRef.current || reduced()) return;
    entered.current = true;
    gsap.fromTo(
      floatRef.current,
      { y: -72, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" }
    );
    if (barRef.current) {
      gsap.fromTo(
        barRef.current.querySelectorAll(".nav-link"),
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: "power3.out", delay: 0.15 }
      );
    }
  }, [booted]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [loc.pathname]);

  // Clear any pending close timer on unmount
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // ESC closes any open panel (a11y)
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Mobile panel: fast 0.1s stagger-in per link
  useEffect(() => {
    if (!mobileOpen || !mobileRef.current || reduced()) return;
    const links = mobileRef.current.querySelectorAll("[data-mnav]");
    gsap.fromTo(
      links,
      { opacity: 0, x: -14 },
      { opacity: 1, x: 0, duration: 0.1, stagger: 0.05, ease: "power2.out", overwrite: "auto" }
    );
  }, [mobileOpen]);

  const openFor = (to) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(to);
  };
  const toggleFor = (to) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu((v) => (v === to ? null : to));
  };
  const scheduleClose = (ms = 180) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), ms);
  };

  // First tap (touch) shows preview, second tap navigates
  const handleTouchNav = (e, to) => {
    try {
      const touch = window.matchMedia("(hover: none)").matches;
      if (touch && NAV_PREVIEW[to] && openMenu !== to) {
        e.preventDefault();
        openFor(to);
      } else {
        setOpenMenu(null);
      }
    } catch {
      setOpenMenu(null);
    }
  };

  // Scrolling or clicking outside dismisses the open panel
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openMenu]);

  // Lock background scroll while the mobile menu is open; auto-close on desktop widths
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    try {
      window.__lenis?.stop();
    } catch {
      /* no smooth scroller */
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      try {
        window.__lenis?.start();
      } catch {
        /* no smooth scroller */
      }
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  // GSAP exit when closing panels
  useEffect(() => {
    if (!openMenu && megaWrapRef.current) {
      gsap.to(megaWrapRef.current, { opacity: 0, y: -8, scale: 0.985, duration: 0.18, ease: "power2.in", overwrite: true });
    } else if (megaOpen && megaWrapRef.current) {
      gsap.set(megaWrapRef.current, { opacity: 1 });
    }
    if (!openMenu && miniWrapRef.current) {
      gsap.to(miniWrapRef.current, { opacity: 0, y: -8, duration: 0.16, ease: "power2.in", overwrite: true });
    } else if (miniData && miniWrapRef.current) {
      gsap.set(miniWrapRef.current, { opacity: 1 });
    }
  }, [openMenu, megaOpen, miniData]);

  const pillLink = ({ isActive }) =>
    `nav-link whitespace-nowrap px-3 py-2 rounded-full text-[13.5px] font-semibold transition-all duration-300 ${
      isActive
        ? "bg-[#0c2d38] text-[#f6efe6] shadow"
        : "text-[#dfe7ea] hover:text-white hover:bg-white/10"
    }`;

  const dropBtnCls = (active) =>
    `nav-link flex items-center rounded-full transition-colors ${
      active
        ? "bg-[#0c2d38] text-[#f6efe6]"
        : "text-[#dfe7ea] hover:bg-white/10 hover:text-white"
    }`;

  const renderItem = (l) => {
    if (l.mega) {
      return (
        <div
          key={l.to}
          className={dropBtnCls(megaOpen)}
          onMouseEnter={() => openFor(l.to)}
          onMouseLeave={() => scheduleClose()}
        >
          <NavLink
            to={l.to}
            onFocus={() => openFor(l.to)}
            onClick={() => setOpenMenu(null)}
            aria-expanded={megaOpen}
            aria-haspopup="true"
            className="whitespace-nowrap px-3 py-2 text-[13.5px] font-semibold"
          >
            {l.label}
          </NavLink>
          <button
            type="button"
            onClick={() => toggleFor(l.to)}
            onFocus={() => openFor(l.to)}
            aria-expanded={megaOpen}
            aria-label="Toggle courses menu"
            className="mr-1 w-6 h-6 grid place-items-center rounded-full hover:bg-black/5"
          >
            <FiChevronDown size={14} className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      );
    }
    const active = openMenu === l.to;
    return (
      <div
        key={l.to}
        className={dropBtnCls(active)}
        onMouseEnter={() => openFor(l.to)}
        onMouseLeave={() => scheduleClose()}
      >
        <NavLink
          to={l.to}
          end={l.to === "/"}
          onFocus={() => openFor(l.to)}
          onClick={(e) => handleTouchNav(e, l.to)}
          aria-expanded={active}
          aria-haspopup="true"
          className="whitespace-nowrap px-2.5 py-2 text-[13.5px] font-semibold"
        >
          {l.label}
        </NavLink>
        <button
          type="button"
          onClick={() => toggleFor(l.to)}
          aria-expanded={active}
          aria-label={`Preview ${l.label}`}
          className="mr-1 w-5 h-5 grid place-items-center rounded-full opacity-60 hover:opacity-100"
        >
          <FiChevronDown size={12} className={`transition-transform duration-300 ${active ? "rotate-180" : ""}`} />
        </button>
      </div>
    );
  };

  return (
    <>
      {/* top utility strip - deep blue, collapses once you scroll */}
      <div
        className={`hidden overflow-hidden bg-[#0d171d]/85 backdrop-blur-xl text-[#e1e6e9] text-[12.5px] font-poppins transition-all duration-500 border-b border-[#47606a]/40 ${
          solid ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <div className="container-x flex items-center justify-between py-2">
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a85d] animate-pulse" />
            Admissions open - 2026 batches · Internships · Corporate training
          </p>
          <div className="flex items-center gap-5">
            <Link to="/verify" className="flex items-center gap-1.5 hover:text-white"><FiShield /> Verify Certificate</Link>
            <a href="tel:+919999999999" className="flex items-center gap-1.5 hover:text-white"><FiPhone /> +91 99999 99999</a>
            <Link to="/partner" className="text-[#d4a85d] font-semibold hover:text-white">Partner With Us →</Link>
          </div>
        </div>
      </div>

      {/* floating pill header - professional deep blue */}
      <div className="fixed inset-x-0 top-0 z-50 font-poppins">
        <header
          ref={headerRef}
          className="relative w-full"
        >
          <div
            ref={floatRef}
            className={`relative rounded-none border-x-0 border-t-0 backdrop-blur-2xl transition-all duration-500 ${
              solid
                ? "bg-[#0d171d]/90 border-[#496170]/50 shadow-[0_20px_60px_-16px_rgba(8,51,61,.65)]"
                : "bg-[#101d25]/85 border-[#496170]/50 shadow-[0_16px_44px_-20px_rgba(8,51,61,.55)]"
            }`}
          >
            {/* scroll progress - orange action accent on blue */}
            <span className="absolute top-2 left-5 right-5 h-[2px] rounded-full bg-transparent overflow-hidden" aria-hidden>
              <span
                ref={progressRef}
                className="block h-full w-full origin-left rounded-full bg-gradient-to-r from-[#d4a85d] via-[#3ec0d9] to-[#dfe7ea]"
                style={{ transform: "scaleX(0)" }}
              />
            </span>

            <div
              ref={barRef}
              className={`container-x flex items-center justify-between gap-3 transition-all duration-500 ${
                solid ? "h-[58px]" : "h-[68px]"
              }`}
            >
              <Logo dark className={solid ? "h-9" : "h-11"} />

              {/* DESKTOP NAV - every option shows its data on hover / touch */}
              <nav
                className="hidden lg:flex items-center gap-1 rounded-full p-1 backdrop-blur-xl transition-colors duration-500 border border-[#496170]/40 bg-[#0d171d]/60"
                aria-label="Primary"
              >
                {NAV.map(renderItem)}
              </nav>

              <div className="hidden lg:flex items-center gap-2 shrink-0">
                <Magnetic strength={6}>
                  <button
                    onClick={onEnquire}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#d4a85d] backdrop-blur border border-[#f0ddac]/60 text-[#0f1d24] font-bold px-5 py-2.5 text-[13.5px] transition-all hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-[#e2bb72] shadow-[0_12px_26px_-10px_rgba(212,168,93,.7)]"
                  >
                    Apply Now <FiArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Magnetic>
              </div>

              <button
                className="lg:hidden w-10 h-10 grid place-items-center rounded-xl border backdrop-blur-xl transition-colors duration-300 border-[#496170]/40 text-white bg-white/10"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>

            {/* COURSES MEGA PANEL */}
            {megaOpen && (
              <div
                ref={megaWrapRef}
                className="absolute inset-x-0 top-full z-[70] hidden justify-center lg:flex"
                onMouseEnter={() => openFor("/courses")}
                onMouseLeave={() => scheduleClose()}
              >
                <div className="pt-3 pb-2">
                  <MegaPanel onNavigate={() => setOpenMenu(null)} />
                </div>
              </div>
            )}

            {/* MINI PREVIEW for every other option */}
            {miniData && (
              <div
                ref={miniWrapRef}
                className="absolute inset-x-0 top-full z-[70] hidden justify-center lg:flex"
                onMouseEnter={() => openMenu && openFor(openMenu)}
                onMouseLeave={() => scheduleClose()}
              >
                <div className="pt-3 pb-2">
                  <MiniDrop data={miniData} onNavigate={() => setOpenMenu(null)} />
                </div>
              </div>
            )}
          </div>

          {/* MOBILE panel - floating card under the pill */}
          <div
            ref={mobileRef}
            data-lenis-prevent
            className={`lg:hidden overflow-hidden transition-all duration-500 ${
              mobileOpen ? "max-h-[78vh] overflow-y-auto mt-2 opacity-100" : "max-h-0 mt-0 opacity-0"
            }`}
          >
            <div className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_24px_60px_-20px_rgba(249,115,22,.3)] px-3 py-3 space-y-1 font-poppins">
              <NavLink data-mnav to="/about" className={({ isActive }) => `block px-4 py-3 rounded-xl font-bold text-[14px] ${isActive ? "bg-[#eaf6f8] text-[#0d6b7a]" : "text-[#22313a]"}`}>About</NavLink>

              <MobileMegaMenu onNavigate={() => setMobileOpen(false)} />

                {[["Internships", "/internships"], ["Corporate Training", "/corporate"], ["Placement", "/placement"], ["Resources", "/resources"], ["Contact", "/contact"], ["Partner With Us", "/partner"], ["Verify Certificate", "/verify"]].map(([label, to]) => (
                  <NavLink data-mnav key={to + label} to={to} className={({ isActive }) => `block px-4 py-3 rounded-xl font-bold text-[14px] ${isActive ? "bg-[#eaf6f8] text-[#0d6b7a]" : "text-[#22313a] hover:bg-white/60"}`}>{label}</NavLink>
              ))}
              <button data-mnav onClick={() => { setMobileOpen(false); onEnquire?.(); }} className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4a85d] backdrop-blur border border-[#f0ddac]/60 text-[#0f1d24] font-bold px-5 py-3.5 text-[14px] shadow-[0_14px_30px_-10px_rgba(212,168,93,.6)]">
                Apply Now <FiArrowRight />
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
