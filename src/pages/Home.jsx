import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowDown, FiArrowRight, FiChevronDown, FiClock, FiCode, FiDatabase, FiLayers, FiMessageCircle, FiShield, FiStar, FiTrendingUp, FiZap } from "react-icons/fi";
import { getCourseBySlug } from "../data/megaMenu";
import { STATS, TESTIMONIALS, FAQS } from "../data/site";
import Reveal from "../components/Reveal";
import LocalFilm from "../components/LocalFilm";
import { Magnetic, useHeroIntro } from "../anim/ui";

gsap.registerPlugin(ScrollTrigger);

const HOME_PROGRAMS = [
  { name: "AI & Machine Learning", desc: "Build intelligent products with Python, neural networks and LLMs.", duration: "6 months", to: "/courses?category=artificial-intelligence", Icon: FiZap, tone: "amber" },
  { name: "Full Stack Development", desc: "Ship polished products with React, Node, databases and deployment.", duration: "7 months", to: "/courses/full-stack-development", Icon: FiCode, tone: "cyan" },
  { name: "Data & Analytics", desc: "Turn raw data into decisions with SQL, Python and Power BI.", duration: "5 months", to: "/courses/data-science-analytics", Icon: FiDatabase, tone: "lime" },
  { name: "Cybersecurity", desc: "Learn ethical hacking, SOC operations and cloud security in live labs.", duration: "6 months", to: "/courses/cybersecurity", Icon: FiShield, tone: "rose" },
  { name: "Python Programming", desc: "Start from zero, automate real work and create a portfolio.", duration: "3 months", to: "/courses/python-programming", Icon: FiLayers, tone: "violet" },
  { name: "Digital Marketing & AEO", desc: "Grow brands across search, social and AI answer engines.", duration: "4 months", to: "/courses/digital-marketing-aeo", Icon: FiTrendingUp, tone: "blue" },
];

const FLAGSHIPS = [
  { slug: "artificial-intelligence", note: "AI / emerging tech" },
  { slug: "full-stack-development", note: "Build / ship / scale" },
  { slug: "data-science-analytics", note: "Data / decisions" },
];

const toneClasses = {
  amber: "border-amber-300/25 bg-amber-300/[0.06] text-amber-200",
  cyan: "border-cyan-300/25 bg-cyan-300/[0.06] text-cyan-200",
  lime: "border-lime-300/25 bg-lime-300/[0.06] text-lime-200",
  rose: "border-rose-300/25 bg-rose-300/[0.06] text-rose-200",
  violet: "border-violet-300/25 bg-violet-300/[0.06] text-violet-200",
  blue: "border-blue-300/25 bg-blue-300/[0.06] text-blue-200",
};

function Counter({ value, suffix = "", decimal = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration: 1.8,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => { el.textContent = `${decimal ? obj.v.toFixed(1) : Math.round(obj.v).toLocaleString("en-IN")}${suffix}`; },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [value, suffix, decimal]);
  return <span ref={ref}>0{suffix}</span>;
}

function SectionKicker({ children }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">{children}</p>;
}

export default function Home({ onEnquire, booted = true }) {
  const [faqOpen, setFaqOpen] = useState(0);
  const heroRef = useRef(null);
  useHeroIntro(heroRef, booted);
  const flagships = FLAGSHIPS.map((item) => ({ ...item, course: getCourseBySlug(item.slug) })).filter((item) => item.course);

  return (
    <main ref={heroRef} className="home-page font-poppins overflow-hidden bg-[#090d12] text-white">
      <section id="hero" className="relative min-h-[720px] border-b border-white/10 bg-[#0b1118]">
        <div className="absolute inset-0 opacity-60 hero-grid-dark" aria-hidden />
        <div className="absolute -top-48 right-[-8%] h-[560px] w-[560px] rounded-full bg-cyan-400/10 blur-[130px]" aria-hidden />
        <div className="absolute bottom-[-18%] left-[-6%] h-[400px] w-[400px] rounded-full bg-amber-300/[0.08] blur-[120px]" aria-hidden />
        <div className="container-x relative grid min-h-[720px] items-center gap-12 py-28 lg:grid-cols-[0.9fr_1.1fr] lg:py-32">
          <div className="relative z-10 max-w-xl">
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/[0.04] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur"><span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(252,211,77,.8)]" /> Admissions open · 2026 batches</div>
            <h1 className="font-display mt-7 text-[3.4rem] font-extrabold leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.8rem]"><span className="hl-mask block"><span className="hl-line">Learn what</span></span><span className="hl-mask block"><span className="hl-line text-cyan-200">moves next.</span></span></h1>
            <p className="hero-para mt-7 max-w-lg text-[15px] leading-7 text-white/60 sm:text-base">Career-focused courses, mentor-led internships and verifiable certifications for the technology jobs ahead.</p>
            <div className="hero-cta mt-8 flex flex-wrap items-center gap-3"><Link to="/courses" className="group inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3.5 text-[14px] font-extrabold text-[#10151a] shadow-[0_18px_45px_-18px_rgba(252,211,77,.7)] transition hover:-translate-y-1 hover:bg-amber-200">Find your path <FiArrowRight className="transition-transform group-hover:translate-x-1" /></Link><button onClick={onEnquire} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 text-[14px] font-bold text-white transition hover:border-cyan-200/60 hover:bg-white/[0.08]">Talk to a counsellor <FiMessageCircle /></button></div>
            <div className="hero-para mt-12 flex items-center gap-3 text-[12px] text-white/45"><div className="flex -space-x-2">{["A", "S", "R", "M"].map((letter, index) => <span key={letter} className={`grid h-8 w-8 place-items-center rounded-full border-2 border-[#0b1118] text-[10px] font-bold ${index % 2 ? "bg-cyan-200 text-[#10202a]" : "bg-amber-200 text-[#201b0a]"}`}>{letter}</span>)}</div><span>Trusted by 15,000+ learners</span></div>
          </div>
          <div id="hero-visual" className="relative z-10 lg:translate-y-6"><div className="relative ml-auto max-w-[500px] overflow-hidden rounded-2xl border border-white/15 bg-[#131b24] p-1.5 shadow-[0_30px_70px_-28px_rgba(0,0,0,.9)] transition-transform duration-700 hover:-translate-y-1"><div className="relative aspect-video overflow-hidden rounded-xl bg-black"><LocalFilm /></div></div></div>
        </div>
        <a href="#proof" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35 transition hover:text-white/70 sm:flex">Scroll to explore <FiArrowDown /></a>
      </section>

      <section id="proof" className="border-b border-white/10 bg-[#0d141c]"><div className="container-x grid grid-cols-2 divide-x divide-white/10 py-7 sm:grid-cols-4">{STATS.map((stat) => <div key={stat.label} className="px-4 first:pl-0 sm:px-7"><p className="font-display text-2xl font-extrabold text-white sm:text-3xl"><Counter value={stat.value} suffix={stat.suffix} decimal={stat.decimal} /></p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/40 sm:text-[11px]">{stat.label}</p></div>)}</div></section>

      <section id="courses" className="relative bg-[#090d12]"><div className="container-x py-24 lg:py-32"><Reveal className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between"><div><SectionKicker>Choose your direction</SectionKicker><h2 className="font-display mt-3 max-w-md text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl">A sharper route into tech.</h2></div><div className="flex items-end justify-between gap-6"><p className="max-w-md text-[14px] leading-6 text-white/50">Pick a track, build work that matters, and leave with a portfolio that can speak for you.</p><Link to="/courses" className="hidden shrink-0 items-center gap-2 text-[13px] font-bold text-cyan-200 sm:inline-flex">View all programs <FiArrowRight /></Link></div></Reveal><div className="mt-12 grid items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3">{HOME_PROGRAMS.map((program, index) => <Reveal key={program.name} delay={(index % 3) * 0.06}><Link to={program.to} className={`group flex h-full min-h-[230px] flex-col justify-between rounded-[22px] border p-6 transition duration-500 hover:-translate-y-1 hover:border-white/35 hover:bg-white/[0.08] ${toneClasses[program.tone]}`}><div><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-current/20 bg-black/20"><program.Icon size={20} /></span><span className="text-[11px] font-bold uppercase tracking-[0.15em] opacity-50">0{index + 1}</span></div><h3 className="mt-8 font-display text-xl font-bold text-white sm:text-2xl">{program.name}</h3><p className="mt-2 max-w-sm text-[13px] leading-6 text-white/50">{program.desc}</p></div><div className="mt-7 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] font-semibold text-white/45"><span className="inline-flex items-center gap-1.5"><FiClock /> {program.duration}</span><span className="inline-flex items-center gap-1.5 text-white transition group-hover:text-cyan-200">Explore <FiArrowRight className="transition-transform group-hover:translate-x-1" /></span></div></Link></Reveal>)}</div></div></section>

      <section id="flagships" className="border-y border-white/10 bg-[#111b24]"><div className="container-x grid gap-12 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:py-32"><Reveal><SectionKicker>Learn by building</SectionKicker><h2 className="font-display mt-3 text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl">The work is the curriculum.</h2><p className="mt-5 max-w-sm text-[14px] leading-7 text-white/50">Mentor reviews, live projects and internships turn concepts into evidence. This is where confidence gets practical.</p><Magnetic strength={7}><button onClick={onEnquire} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-bold text-[#0b1118] transition hover:bg-cyan-100">Build your roadmap <FiArrowRight /></button></Magnetic></Reveal><div className="grid gap-3 sm:grid-cols-3">{flagships.map((item, index) => <Reveal key={item.slug} delay={index * 0.08}><div className="group flex h-full flex-col rounded-[20px] border border-white/10 bg-[#0b1118] p-5 transition hover:-translate-y-1 hover:border-cyan-200/40"><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-200/70">{item.note}</span><h3 className="mt-5 font-display text-lg font-bold text-white">{item.course.name}</h3><p className="mt-2 line-clamp-3 text-[12px] leading-5 text-white/45">{item.course.shortDescription}</p><div className="mt-auto pt-8"><Link to={`/courses/${item.course.slug}`} className="inline-flex items-center gap-1.5 text-[12px] font-bold text-cyan-200">See the path <FiArrowRight className="transition group-hover:translate-x-1" /></Link></div></div></Reveal>)}</div></div></section>

      <section id="stories" className="bg-[#090d12]"><div className="container-x py-24 lg:py-32"><Reveal className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end"><div><SectionKicker>Proof from the field</SectionKicker><h2 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">Real learners. Real momentum.</h2></div><p className="max-w-xs text-[13px] leading-6 text-white/45">From first line of code to their first serious opportunity.</p></Reveal><div className="mt-8 grid gap-3 lg:grid-cols-3">{TESTIMONIALS.slice(0, 3).map((story, index) => <Reveal key={story.name} delay={index * 0.08}><figure className="flex h-full flex-col rounded-[20px] border border-white/10 bg-white/[0.035] p-6 transition hover:border-white/25"><div className="flex items-center justify-between"><span className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-200/70">0{index + 1} / story</span><div className="flex gap-0.5 text-amber-200">{Array.from({ length: story.rating }).map((_, i) => <FiStar key={i} size={12} className="fill-current" />)}</div></div><blockquote className="mt-8 flex-1 text-[15px] leading-7 text-white/75">“{story.text}”</blockquote><figcaption className="mt-8 border-t border-white/10 pt-4"><p className="text-[13px] font-bold text-white">{story.name}</p><p className="mt-1 text-[11px] text-white/40">{story.role} · {story.course}</p></figcaption></figure></Reveal>)}</div></div></section>

      <section id="faq" className="border-t border-white/10 bg-[#111b24]"><div className="container-x grid gap-12 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:py-32"><Reveal><SectionKicker>Before you begin</SectionKicker><h2 className="font-display mt-3 max-w-sm text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl">Questions are part of the process.</h2><p className="mt-5 max-w-sm text-[14px] leading-7 text-white/50">Still choosing a direction? A counsellor can help you map the next useful step.</p><button onClick={onEnquire} className="mt-7 inline-flex items-center gap-2 rounded-full border border-cyan-200/40 px-5 py-3 text-[13px] font-bold text-cyan-200 transition hover:bg-cyan-200 hover:text-[#0b1118]">Talk to a counsellor <FiArrowRight /></button></Reveal><div className="space-y-2">{FAQS.slice(0, 6).map((faq, index) => { const open = faqOpen === index; return <Reveal key={faq.q} delay={index * 0.04}><div className={`border-b transition-colors ${open ? "border-cyan-200/45" : "border-white/10"}`}><button onClick={() => setFaqOpen(open ? -1 : index)} className="flex w-full items-center justify-between gap-4 py-5 text-left" aria-expanded={open}><span className={`text-[14px] font-bold sm:text-[15px] ${open ? "text-cyan-100" : "text-white/80"}`}>{faq.q}</span><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 transition ${open ? "rotate-180 bg-cyan-200 text-[#0b1118]" : "text-white/50"}`}><FiChevronDown size={15} /></span></button><div className="faq-body"><div className="faq-inner"><p className="pb-5 pr-12 text-[13px] leading-6 text-white/50">{faq.a}</p></div></div></div></Reveal>; })}</div></div></section>
      <section className="border-t border-amber-200/20 bg-amber-200 px-5 py-16 text-[#10151a] sm:px-8"><div className="container-x flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center"><div><p className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-60">Your next chapter starts here</p><h2 className="font-display mt-2 max-w-xl text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-4xl">To earn more, you must learn more.</h2></div><Link to="/courses" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#10151a] px-6 py-3.5 text-[14px] font-bold text-white transition hover:bg-[#25313a]">Explore courses <FiArrowRight /></Link></div></section>
    </main>
  );
}
