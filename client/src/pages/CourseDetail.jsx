import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiCheck, FiClock, FiBarChart2, FiLayers } from "react-icons/fi";
import { getCourseBySlug, getCoursesByCategory, getActiveCategories } from "../data/megaMenu";
import { COURSES } from "../data/site";
import Reveal from "../components/Reveal";

export default function CourseDetail({ onEnquire }) {
  const { slug } = useParams();
  const menuCourse = getCourseBySlug(slug);
  const rich = COURSES.find((c) => c.slug === slug);
  const cat = getActiveCategories().find((c) => c.id === menuCourse?.categoryId);
  const siblings = menuCourse ? getCoursesByCategory(menuCourse.categoryId).filter((c) => c.slug !== slug).slice(0, 4) : [];

  if (!menuCourse && !rich) {
    return (
      <main className="container-x py-20 text-center font-poppins bg-white">
        <h1 className="font-display font-extrabold text-3xl text-slate-950">Program not found</h1>
        <p className="text-slate-500 mt-2">The slug “{slug}” isn’t in the catalogue.</p>
        <Link to="/courses" className="inline-flex items-center gap-2 mt-6 rounded-xl bg-slate-950 text-white px-6 py-3 font-bold"><FiArrowLeft /> All courses</Link>
      </main>
    );
  }

  const name = menuCourse?.name || rich?.name;
  const desc = rich?.desc || menuCourse?.shortDescription;
  const techs = rich?.tools || rich?.skills || menuCourse?.technologies || [];
  const modules = rich?.modules || ["Foundations", "Core skills + labs", "Projects + reviews", "Capstone + certification"];

  return (
    <main className="font-poppins bg-white">
      {/* 1 - header - navy */}
      <section className="bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-dark opacity-20" aria-hidden />
        <div className="container-x relative py-14">
          <Link to="/courses" className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-violet-200 hover:text-white"><FiArrowLeft /> All programs</Link>
          <p className="mt-4 text-[12px] font-bold uppercase tracking-[.16em] text-violet-300">{cat?.name || rich?.category || "Program"} · Courses → {cat?.name} → {name}</p>
          <h1 className="font-display font-extrabold text-white tracking-tight text-3xl sm:text-5xl mt-3">{name}</h1>
          <p className="text-violet-100/80 mt-3 max-w-2xl text-[15.5px] leading-relaxed">{rich?.tagline || menuCourse?.shortDescription}</p>
          <p className="text-violet-200/70 mt-2 max-w-2xl text-[14px]">{desc}</p>
          <div className="flex flex-wrap gap-2.5 mt-5 text-[13px] font-semibold">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/20 text-white px-3 py-1.5"><FiClock /> {menuCourse?.duration || rich?.duration}</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/20 text-white px-3 py-1.5"><FiBarChart2 /> {menuCourse?.level || rich?.level}</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/20 text-white px-3 py-1.5"><FiLayers /> {menuCourse?.mode || rich?.mode}</span>
          </div>
          <div className="flex flex-wrap gap-3 mt-7">
            <button onClick={() => onEnquire?.(name)} className="inline-flex items-center gap-2 rounded-xl bg-violet-500 hover:bg-violet-400 text-slate-950 px-6 py-3.5 font-bold transition">Apply / Enquire <FiArrowRight /></button>
            <Link to="/internships" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/5 text-white px-6 py-3.5 font-bold hover:bg-white hover:text-slate-950 transition">Join Internship</Link>
          </div>
        </div>
      </section>

      {/* 2 - content - white */}
      <section className="bg-white">
        <div className="container-x py-12 grid lg:grid-cols-[1fr_340px] gap-8">
        <div>
          <Reveal>
            <h2 className="font-display font-bold text-slate-950 text-2xl">What you’ll learn</h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {techs.map((t) => (
                <span key={t} className="rounded-lg bg-violet-50 border border-violet-200 text-slate-950 text-[13px] font-semibold px-3 py-1.5">{t}</span>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <h2 className="font-display font-bold text-slate-950 text-2xl mt-10">Curriculum</h2>
          </Reveal>
          <ol className="mt-4 space-y-2.5">
            {modules.map((m, i) => (
              <Reveal key={m} delay={Math.min(i * 0.05, 0.25)}>
                <li className="flex gap-3 rounded-xl border border-violet-100 p-4 bg-white">
                  <span className="w-8 h-8 grid place-items-center rounded-lg bg-slate-950 text-white text-[13px] font-bold shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[14.5px] font-medium text-slate-700">{m}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          {(rich?.careers) && (
            <Reveal>
              <h2 className="font-display font-bold text-slate-950 text-2xl mt-10">Career outcomes</h2>
              <ul className="grid sm:grid-cols-2 gap-2 mt-4">
                {rich.careers.map((c) => (
                  <li key={c} className="flex items-center gap-2 rounded-xl bg-violet-50 border border-violet-200 px-4 py-3 text-[14px] font-semibold text-slate-950"><FiCheck className="text-violet-600" /> {c}</li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
        <aside className="space-y-4">
          <Reveal delay={0.1}>
          <div className="rounded-2xl border border-violet-200 p-6 bg-white shadow-card lg:sticky lg:top-24">
            {rich && <p className="font-display font-extrabold text-2xl text-slate-950">{rich.fee} <span className="text-sm text-slate-400 line-through font-semibold">{rich.oldFee}</span></p>}
            <ul className="mt-4 space-y-2 text-[13.5px] text-slate-500">
              {["Mentor-led live training", "Projects + internship", "Verifiable certificate", "Placement assistance"].map((t) => (
                <li key={t} className="flex gap-2"><FiCheck className="text-violet-600 mt-1 shrink-0" /> {t}</li>
              ))}
            </ul>
            <button onClick={() => onEnquire?.(name)} className="w-full mt-5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold py-3.5 transition">Enquire Now</button>
            <Link to="/verify" className="block text-center text-[13px] font-semibold text-slate-500 hover:text-violet-700 mt-3">Certificate is verifiable →</Link>
          </div>
          </Reveal>
          {siblings.length > 0 && (
            <Reveal delay={0.15}>
            <div className="rounded-2xl border border-violet-200 p-5 bg-violet-50">
              <p className="text-[12px] font-bold uppercase tracking-widest text-slate-950/60">More in {cat?.name}</p>
              <div className="mt-3 space-y-1">
                {siblings.map((s) => (
                  <Link key={s.id} to={`/courses/${s.slug}`} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 hover:bg-white group">
                    <span className="text-[13.5px] font-semibold text-slate-950 group-hover:text-violet-700">{s.name}</span>
                    <span className="text-[12px] font-bold text-violet-600">Explore →</span>
                  </Link>
                ))}
              </div>
            </div>
            </Reveal>
          )}
        </aside>
        </div>
      </section>
    </main>
  );
}
