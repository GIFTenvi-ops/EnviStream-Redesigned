import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function Placeholder({ title, eyebrow, desc, cta = true, onEnquire }) {
  return (
    <main className="font-poppins bg-white">
      {/* 1 — header — navy */}
      <section className="bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-dark opacity-20" aria-hidden />
        <div className="container-x relative py-16">
          {eyebrow && <p className="text-[12px] font-bold uppercase tracking-[.16em] text-violet-300">{eyebrow}</p>}
          <h1 className="font-display font-extrabold text-white tracking-tight text-3xl sm:text-5xl mt-3">{title}</h1>
          {desc && <p className="text-violet-100/80 mt-4 max-w-2xl text-[15.5px] leading-relaxed">{desc}</p>}
          {cta && (
            <div className="flex flex-wrap gap-3 mt-7">
              <button onClick={() => onEnquire?.(title)} className="inline-flex items-center gap-2 rounded-xl bg-violet-500 hover:bg-violet-400 text-slate-950 px-6 py-3.5 font-bold transition">Apply Now <FiArrowRight /></button>
              <Link to="/courses" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/5 text-white px-6 py-3.5 font-bold hover:bg-white hover:text-slate-950 transition">Explore Courses</Link>
            </div>
          )}
        </div>
      </section>
      {/* 2 — content — sky (white card) */}
      <section className="bg-violet-100 border-t border-violet-200">
        <div className="container-x py-14 max-w-3xl">
        <div className="rounded-2xl border border-violet-200 bg-white p-7 shadow-sm">
          <h2 className="font-display font-bold text-slate-950 text-xl">Envistream Eduskill · {title}</h2>
          <p className="text-slate-600 text-[14.5px] mt-3 leading-relaxed">
            This section is part of the envistream.org revamp — {desc || "industry-oriented programs with internships, certifications and career support."} Use the <strong>Courses</strong> mega menu in the navbar to browse every technology, or talk to a counsellor for a personalised roadmap.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to="/courses" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white px-5 py-3 text-sm font-bold">Browse programs <FiArrowRight /></Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-violet-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 hover:border-slate-950 transition">Contact us</Link>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}
