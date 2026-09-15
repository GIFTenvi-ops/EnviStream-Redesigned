import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight, FiCheck, FiStar, FiChevronDown, FiClock, FiCpu, FiZap, FiDatabase, FiTerminal, FiGlobe, FiLayers, FiShield, FiBarChart2, FiTrendingUp, FiGrid } from "react-icons/fi";
import { getCategoryById, getCourseBySlug } from "../data/megaMenu";
import { STATS, TESTIMONIALS, FAQS } from "../data/site";
import Reveal from "../components/Reveal";
import ScrollText from "../components/ScrollText";
import LocalFilm from "../components/LocalFilm";
import { Magnetic, MaskReveal, useHeroIntro } from "../anim/ui";

gsap.registerPlugin(ScrollTrigger);

/* Rotating accent bars — premium institute palette */
const TBARS = ["bg-[#0d171d]", "bg-[#d4a85d]", "bg-[#b7dfe8]", "bg-[#0e6f86]", "bg-[#d7b97e]", "bg-[#5d7b86]"];

/* The 10 career programs — premium institute palette */
const HOME_PROGRAMS = [
  { name: "AI & ML", desc: "AI foundations, neural networks & LLM applications", duration: "6 Months", to: "/courses?category=artificial-intelligence", Icon: FiCpu, soft: "bg-[#edf5f7]", text: "text-[#0d6b7a]", solid: "bg-[#0d6b7a]", border: "hover:border-[#9fc0c8]", glow: "hover:shadow-[0_20px_50px_-20px_rgba(13,107,122,.35)]", hoverText: "group-hover:text-[#0d6b7a]" },
  { name: "Machine Learning", desc: "Predictive models with Python, regression to MLOps", duration: "5 Months", to: "/courses/machine-learning", Icon: FiZap, soft: "bg-[#f7f0e8]", text: "text-[#7b5f30]", solid: "bg-[#d4a85d]", border: "hover:border-[#d7b97e]", glow: "hover:shadow-[0_20px_50px_-20px_rgba(212,168,93,.28)]", hoverText: "group-hover:text-[#7b5f30]" },
  { name: "Data Engineering", desc: "Pipelines with Spark, Airflow, Kafka & cloud stacks", duration: "6 Months", to: "/courses/data-engineering", Icon: FiDatabase, soft: "bg-[#edf7f8]", text: "text-[#0d6b7a]", solid: "bg-[#3aa0b4]", border: "hover:border-[#a7d1db]", glow: "hover:shadow-[0_20px_50px_-20px_rgba(58,160,180,.28)]", hoverText: "group-hover:text-[#0d6b7a]" },
  { name: "Python", desc: "Zero-to-automation Python, APIs & OOP projects", duration: "3 Months", to: "/courses/python-programming", Icon: FiTerminal, soft: "bg-[#f8f1e8]", text: "text-[#7b5f30]", solid: "bg-[#d7b97e]", border: "hover:border-[#efdaaf]", glow: "hover:shadow-[0_20px_50px_-20px_rgba(215,185,126,.3)]", hoverText: "group-hover:text-[#7b5f30]" },
  { name: "Web Development", desc: "Modern responsive sites with Tailwind & motion", duration: "4 Months", to: "/courses/web-development", Icon: FiGlobe, soft: "bg-[#f4f6f6]", text: "text-[#3a4d55]", solid: "bg-[#617c86]", border: "hover:border-[#b5c9d2]", glow: "hover:shadow-[0_20px_50px_-20px_rgba(97,124,134,.25)]", hoverText: "group-hover:text-[#3a4d55]" },
  { name: "Full Stack Development", desc: "MERN, MEAN, Java, Python, PHP & .NET paths", duration: "7 Months", to: "/courses?category=full-stack-development", Icon: FiLayers, soft: "bg-[#edf5f7]", text: "text-[#0d171d]", solid: "bg-[#0d171d]", border: "hover:border-[#495d68]", glow: "hover:shadow-[0_20px_50px_-20px_rgba(13,23,29,.35)]", hoverText: "group-hover:text-[#0d171d]" },
  { name: "Cybersecurity", desc: "Ethical hacking, pentesting & SOC operations", duration: "6 Months", to: "/courses/cybersecurity", Icon: FiShield, soft: "bg-[#efe8e2]", text: "text-[#615147]", solid: "bg-[#8a6f62]", border: "hover:border-[#c8b5a8]", glow: "hover:shadow-[0_20px_50px_-20px_rgba(138,111,98,.25)]", hoverText: "group-hover:text-[#615147]" },
  { name: "Data Analytics", desc: "SQL, Power BI, Python & business storytelling", duration: "4 Months", to: "/courses/data-analytics", Icon: FiBarChart2, soft: "bg-[#f4f6f6]", text: "text-[#3a4d55]", solid: "bg-[#6f8d97]", border: "hover:border-[#bacbd2]", glow: "hover:shadow-[0_20px_50px_-20px_rgba(111,141,151,.25)]", hoverText: "group-hover:text-[#3a4d55]" },
  { name: "Digital Marketing/AEO", desc: "SEO, AI-search AEO, ads & analytics", duration: "4 Months", to: "/courses/digital-marketing-aeo", Icon: FiTrendingUp, soft: "bg-[#f7f1e8]", text: "text-[#7d5a2a]", solid: "bg-[#cfa362]", border: "hover:border-[#efdaaf]", glow: "hover:shadow-[0_20px_50px_-20px_rgba(207,163,98,.25)]", hoverText: "group-hover:text-[#7d5a2a]" },
  { name: "Other Technology Programs", desc: "Cloud, programming, emerging tech & more", duration: "Flexible", to: "/courses", Icon: FiGrid, soft: "bg-[#f2f5f6]", text: "text-[#3b4d54]", solid: "bg-[#758e97]", border: "hover:border-[#c0d2d8]", glow: "hover:shadow-[0_20px_50px_-20px_rgba(117,142,151,.25)]", hoverText: "group-hover:text-[#3b4d54]" },
];

/* Balanced flagships — one per track so no single stack dominates the story */
const FLAGSHIPS = [
  { slug: "artificial-intelligence", note: "AI & Emerging Technology flagship" },
  { slug: "mern-stack", note: "One of 6 full-stack paths" },
  { slug: "data-science-analytics", note: "Data track flagship" },
];

function Counter({ value, suffix = "", decimal = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration: 2,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = (decimal ? obj.v.toFixed(1) : Math.round(obj.v).toLocaleString("en-IN")) + suffix;
      },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [value, suffix, decimal]);
  return <span ref={ref}>0{suffix}</span>;
}

export default function Home({ onEnquire, booted = true }) {
  const [faqOpen, setFaqOpen] = useState(0);
  const heroRef = useRef(null);
  useHeroIntro(heroRef, booted);

  const flagships = FLAGSHIPS.map((f) => ({ ...f, course: getCourseBySlug(f.slug) })).filter((f) => f.course);

  return (
    <main className="font-poppins bg-[#f6f1ea] text-slate-800">
      <section id="hero" ref={heroRef} className="relative overflow-hidden border-b border-[#d7c7aa] bg-[radial-gradient(circle_at_top_left,_rgba(214,180,110,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.09),transparent_18%),linear-gradient(135deg,#130f0d_0%,#0f0d0c_40%,#1a1714_100%)]">
        <div className="absolute inset-0 hero-grid-soft opacity-70" aria-hidden />
        <div className="hero-glow absolute -top-24 right-8 w-[440px] h-[440px] rounded-full bg-[#d8af67]/25 blur-[120px]" aria-hidden />
        <div className="hero-glow absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-[#f4e9d6]/12 blur-[120px]" aria-hidden />

        <div className="container-x relative py-10 lg:py-16 grid lg:grid-cols-[1fr_1.08fr] gap-8 lg:gap-12 items-center">
          <div className="relative z-10">
            <p className="hero-badge chip glass-panel text-[#f7f3ee] border-[#d8af67]/60 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#d4a94c] animate-pulse" /> Watch how it works
            </p>

            <h1 className="font-display text-white font-extrabold tracking-[-0.04em] text-4xl sm:text-5xl lg:text-[4rem] leading-[0.98] mt-5">
              <span className="hl-mask block"><span className="hl-line">Transform</span></span>
              <span className="hl-mask block"><span className="hl-line text-transparent bg-clip-text bg-gradient-to-r from-[#f8d99d] via-[#d7b97e] to-[#dff7fb]">Your Skills</span></span>
              <span className="hl-mask block"><span className="hl-line">and Career!</span></span>
            </h1>

            <p className="hero-para mt-5 text-[#d8cfbf] text-[15.5px] sm:text-base leading-relaxed max-w-xl">
              Courses, internships and certifications across AI, Full Stack, Data, Security and Cloud — taught by industry experts.
            </p>
            <p className="hero-para mt-3 text-[#f2d79a] text-[14px] sm:text-base font-semibold uppercase tracking-[0.18em] max-w-xl">
              To Earn More, You Must Learn More.
            </p>

            <div className="hero-cta flex flex-wrap gap-3 mt-7">
              <Link to="/courses" data-cursor="link" className="group inline-flex items-center gap-2 rounded-full bg-[#d7b97e] text-[#091d29] px-7 py-3.5 font-bold text-[14.5px] transition-all hover:-translate-y-0.5 hover:bg-[#e7c98d] shadow-[0_20px_45px_-18px_rgba(215,185,126,0.55)]">
                Browse Courses <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <Link to="/internships" data-cursor="link" className="inline-flex items-center gap-2 rounded-full border border-[#d7b97e]/50 bg-[#f9f3e9]/5 text-[#f8f4ee] hover:border-[#f0d39d] px-7 py-3.5 font-bold text-[14.5px] transition hover:bg-[#f9f3e9]/10">
                Join Internship
              </Link>
            </div>

            <div className="hero-social-proof mt-8 flex flex-wrap items-center gap-3 text-sm text-[#e9dcc4]">
              <div className="flex -space-x-2">
                {["A","S","R","M"].map((letter, index) => (
                  <span key={letter} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#120f0d] text-[11px] font-bold ${index % 2 ? 'bg-[#f3dfb7] text-[#221b15]' : 'bg-[#d8af67] text-[#201a15]'}`}>
                    {letter}
                  </span>
                ))}
              </div>
              <span className="font-medium">Trusted by 6,000+ learners</span>
            </div>
          </div>

          <div id="hero-visual" className="relative z-10">
            <div className="relative mx-auto max-w-[620px] rounded-[30px] border border-[#d8af67]/35 bg-[#1b1816]/95 p-3 shadow-[0_40px_90px_-35px_rgba(15,23,42,0.75)]">
              <div className="absolute -left-4 top-12 rounded-2xl border border-[#d8af67]/40 bg-[#f7f0e3]/95 p-3 shadow-[0_30px_60px_-20px_rgba(214,180,110,0.35)] backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#8a6a2f] font-bold">Career outcomes</p>
                <p className="mt-2 text-2xl font-extrabold text-[#1e1711]">92%</p>
                <p className="text-[12px] text-[#5d4a35]">Placement readiness</p>
              </div>

              <div className="absolute -right-5 bottom-10 rounded-2xl border border-[#d9b46a]/40 bg-[#f4e7c7]/90 p-3 shadow-[0_30px_60px_-18px_rgba(214,180,110,0.35)] backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7a5e2d]">Live projects</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-[#372f27]">Mentor-led capstones</p>
              </div>

              <div id="hero-visual-inner" className="relative overflow-hidden rounded-[24px] border border-[#d8af67]/10 bg-[#0e0b0a] aspect-[1.2/1]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(214,180,110,0.25),transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.09),transparent_18%)]" aria-hidden />
                <LocalFilm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="relative overflow-hidden border-b border-[#d9c6a3] bg-[#f8f3eb]/90 backdrop-blur-sm">
        <div className="container-x relative py-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-[#e6d7ba] bg-[#fffdf9] p-5 text-center shadow-[0_12px_30px_-22px_rgba(153,119,59,0.35)]">
              <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#17120f]">
                <Counter value={s.value} suffix={s.suffix} decimal={s.decimal} />
              </p>
              <p className="text-[13px] text-[#5d5147] font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="courses" className="bg-transparent">
        <div className="container-x py-16">
          <Reveal className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[.16em] text-[#0d6b7a]">Courses → Program → Apply</p>
              <h2 className="font-display font-extrabold text-slate-950 text-3xl sm:text-4xl tracking-tight mt-2"><ScrollText text="Explore our programs" wordDuration={0.1} /></h2>
              <p className="text-slate-600 mt-2 max-w-xl text-[15px]">Ten career-focused programs — pick one for curriculum, projects and enrolment.</p>
            </div>
            <Link to="/courses" className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:border-slate-950 hover:shadow-[0_14px_28px_-18px_rgba(15,23,42,0.35)] shrink-0">All programs <FiArrowRight /></Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {HOME_PROGRAMS.map((p, i) => (
              <Reveal key={p.name} delay={(i % 5) * 0.06}>
                <Link to={p.to} className={`group block h-full rounded-[22px] border border-violet-100 bg-white p-5 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_-28px_rgba(124,58,237,0.4)] ${p.border} ${p.glow}`}>
                  <span className={`w-11 h-11 grid place-items-center rounded-xl ${p.soft} transition-transform duration-300 group-hover:scale-110`}>
                    <p.Icon size={20} className={p.text} />
                  </span>
                  <h3 className={`font-bold text-slate-950 text-[15.5px] leading-snug mt-3 transition-colors ${p.hoverText}`}>{p.name}</h3>
                  <p className="text-[12.5px] text-slate-600 mt-1 leading-relaxed transition-colors">{p.desc}</p>
                  <span className="flex items-center justify-between mt-3 pt-3 border-t border-violet-100">
                    <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-slate-500"><FiClock size={12} /> {p.duration}</span>
                    <span className={`inline-flex items-center gap-1 text-[12px] font-bold ${p.text}`}>Explore <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" /></span>
                  </span>
                  <span className={`block h-1 w-10 rounded-full mt-3 transition-all duration-300 group-hover:w-16 ${p.solid}`} aria-hidden />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="flagships" className="relative overflow-hidden border-y border-slate-900 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.22),transparent_30%),linear-gradient(135deg,#0f172a_0%,#111827_45%,#1f1139_100%)]">
        <div className="container-x py-16">
          <Reveal className="max-w-2xl mb-8">
            <p className="text-[12px] font-bold uppercase tracking-[.16em] text-[#d7b97e]">Flagship programs</p>
            <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl tracking-tight mt-2"><ScrollText text="Loved across every track" wordDuration={0.1} /></h2>
            <p className="text-violet-100/80 mt-2 text-[15px]">A complete technology platform — here is one standout from three of our eight tracks.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4">
            {flagships.map((f, i) => {
              const hue = getCategoryById(f.course.categoryId)?.hue || {};
              return (
                <Reveal key={f.slug} delay={i * 0.1}>
                  <div className={`group h-full rounded-[24px] border border-violet-100/20 bg-white p-6 shadow-[0_25px_55px_-30px_rgba(15,23,42,0.8)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-28px_rgba(124,58,237,0.55)] ${hue.border || "hover:border-violet-300"}`}>
                    <span className={`h-1 w-12 rounded-full transition-all duration-300 group-hover:w-20 ${hue.solid || "bg-slate-950"}`} aria-hidden />
                    <p className={`text-[11px] font-bold uppercase tracking-widest mt-3 ${hue.text || "text-slate-950"}`}>{f.note}</p>
                    <h3 className="font-display font-bold text-slate-950 text-[20px] mt-1.5">{f.course.name}</h3>
                    <p className="text-[13.5px] text-slate-600 mt-1.5 leading-relaxed">{f.course.shortDescription}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {f.course.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="rounded-md border border-violet-100 bg-violet-50 px-2 py-1 text-[11px] font-semibold text-slate-600">{t}</span>
                      ))}
                    </div>
                    <div className="flex-1 min-h-[14px]" />
                    <div className="flex items-center justify-between pt-4 border-t border-violet-100">
                      <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-500"><FiClock size={13} /> {f.course.duration}</span>
                      <Link to={`/courses/${f.course.slug}`} className="text-[13.5px] font-bold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all text-violet-700">Explore <FiArrowRight /></Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <MaskReveal className="mt-8" from="bottom">
            <div className="relative overflow-hidden rounded-[26px] border border-violet-200/70 bg-white p-6 sm:p-8 text-slate-950 shadow-[0_28px_70px_-32px_rgba(124,58,237,0.45)]">
              <div className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-violet-200/50 blur-3xl" aria-hidden />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl">Why Envistream?</h3>
                  <ul className="mt-3 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-[14px] text-slate-600">
                    {["Mentor-led projects + internship", "Verifiable certificates", "Placement assistance", "College & corporate partnerships"].map((t) => (
                      <li key={t} className="flex gap-2"><FiCheck className="text-violet-600 mt-1 shrink-0" /> {t}</li>
                    ))}
                  </ul>
                </div>
                <Magnetic strength={7}>
                  <button onClick={onEnquire} className="relative shrink-0 inline-flex items-center gap-2 rounded-xl bg-slate-950 text-white px-6 py-3.5 font-bold text-[14.5px] transition hover:scale-[1.03]">Apply Now <FiArrowRight /></button>
                </Magnetic>
              </div>
            </div>
          </MaskReveal>
        </div>
      </section>

      <section id="stories" className="border-y border-[#e7d8b9] bg-[#f7f1e8]">
        <div className="container-x py-16">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[12px] font-bold uppercase tracking-[.16em] text-[#0d6b7a]">Learner stories</p>
            <h2 className="font-display font-extrabold text-slate-950 text-3xl sm:text-4xl tracking-tight mt-2"><ScrollText text="Results across every track" wordDuration={0.1} /></h2>
            <p className="text-slate-950/60 mt-2 text-[15px]">AI, data, full stack, security, marketing — real projects, real interviews.</p>
          </Reveal>

          <div className="marquee-paused overflow-hidden -mx-5 px-5">
            <div className="animate-marquee flex w-max gap-4 pr-4" style={{ animationDuration: "46s" }}>
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <figure key={i} className="w-[320px] sm:w-[380px] shrink-0 rounded-[24px] border border-violet-200 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(124,58,237,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400 hover:shadow-[0_24px_50px_-30px_rgba(124,58,237,0.45)]">
                  <span className={`h-1 w-10 rounded-full ${TBARS[i % TBARS.length]}`} aria-hidden />
                  <div className="flex gap-0.5 text-violet-600 mt-3" aria-label={`${t.rating} star rating`}>
                    {Array.from({ length: t.rating }).map((_, s) => <FiStar key={s} className="fill-current" size={14} />)}
                  </div>
                  <blockquote className="text-[14px] text-slate-700 leading-relaxed mt-3 flex-1">“{t.text}”</blockquote>
                  <figcaption className="mt-4 pt-4 border-t border-violet-100">
                    <p className="font-bold text-slate-950 text-[14.5px]">{t.name}</p>
                    <p className="text-[12.5px] text-slate-500">{t.role} · {t.course}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white border-t border-violet-100">
        <div className="container-x py-16 grid lg:grid-cols-[380px_1fr] gap-10">
          <Reveal>
            <p className="text-[12px] font-bold uppercase tracking-[.16em] text-[#0d6b7a]">FAQs</p>
            <h2 className="font-display font-extrabold text-slate-950 text-3xl sm:text-4xl tracking-tight mt-2">Questions, answered</h2>
            <p className="text-slate-600 mt-3 text-[15px]">Still unsure which technology fits you? Talk to a counsellor for a personalised roadmap.</p>
            <button onClick={onEnquire} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white px-6 py-3 font-bold text-[14.5px] transition">Talk to a Counsellor <FiArrowRight /></button>
          </Reveal>

          <div className="space-y-3">
            {FAQS.slice(0, 6).map((f, i) => {
              const open = faqOpen === i;
              return (
                <Reveal key={f.q} delay={i * 0.05}>
                  <div className={`rounded-[20px] border transition-colors ${open ? "border-[#b8dfe5] bg-[#edf8fa] shadow-card faq-open" : "border-[#eadfc8] bg-white"}`}>
                    <button onClick={() => setFaqOpen(open ? -1 : i)} className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left" aria-expanded={open}>
                      <span className="font-bold text-slate-950 text-[14.5px] sm:text-[15.5px]">{f.q}</span>
                      <span className={`w-8 h-8 grid place-items-center rounded-lg shrink-0 transition-all ${open ? "bg-[#0d171d] text-white rotate-180" : "bg-[#edf5f7] text-[#0d171d]"}`}>
                        <FiChevronDown size={16} />
                      </span>
                    </button>
                    <div className="faq-body"><div className="faq-inner"><p className="px-5 sm:px-6 pb-5 text-[14px] text-slate-600 leading-relaxed">{f.a}</p></div></div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
