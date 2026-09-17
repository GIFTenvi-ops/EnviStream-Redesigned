import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiArrowRight, FiClock, FiSearch } from "react-icons/fi";
import { getActiveCategories, getCategoryById, getCategoryBySlug, getCoursesByCategory } from "../data/megaMenu";
import Reveal from "../components/Reveal";

export default function Courses() {
  const categories = useMemo(() => getActiveCategories(), []);
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  // Deep link support: /courses?category=<slug> preselects the category
  // (used by mega-menu "View all in …" links and homepage category cards).
  useEffect(() => {
    const slug = params.get("category");
    if (!slug) { setCat("all"); return; }
    const match = getCategoryBySlug(slug) || categories.find((c) => c.id === slug);
    setCat(match ? match.id : "all");
  }, [params, categories]);

  const onSelect = (id) => {
    setCat(id);
    if (id === "all") {
      params.delete("category");
    } else {
      const found = categories.find((c) => c.id === id);
      if (found) params.set("category", found.slug);
    }
    setParams(params, { replace: true });
  };

  const all = useMemo(
    () => categories.flatMap((c) => getCoursesByCategory(c.id).map((p) => ({ ...p, catName: c.name }))),
    [categories]
  );
  const filtered = all.filter(
    (p) =>
      (cat === "all" || p.categoryId === cat) &&
      (q.trim() === "" || `${p.name} ${p.shortDescription} ${p.technologies.join(" ")}`.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <main className="font-poppins bg-white">
      {/* 1 - header - navy */}
      <section className="bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-dark opacity-20" aria-hidden />
        <div className="container-x relative py-14">
          <Reveal>
            <p className="text-[12px] font-bold uppercase tracking-[.16em] text-violet-300">Courses → Technology → Program → Apply</p>
            <h1 className="font-display font-extrabold text-white text-3xl sm:text-5xl tracking-tight mt-3">All programs, one mega menu away</h1>
            <p className="text-violet-100/80 mt-3 max-w-2xl">Use the <strong className="text-white">Courses</strong> mega menu above to browse by technology - or search everything below.</p>
          </Reveal>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <label className="flex-1 flex items-center gap-2 rounded-xl bg-white border border-white text-slate-950 px-4 py-3 shadow-sm">
              <FiSearch className="text-violet-600" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search AI, Python, AWS, SEO…" className="flex-1 outline-none text-[14.5px] bg-transparent" />
            </label>
            <select value={cat} onChange={(e) => onSelect(e.target.value)} className="rounded-xl bg-white border border-white px-4 py-3 text-slate-950 text-[14px] font-semibold outline-none">
              <option value="all">All categories</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* 2 - listing - sky (white cards) */}
      <section className="bg-violet-100 border-t border-violet-200">
        <div className="container-x py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => {
            const hue = getCategoryById(p.categoryId)?.hue || {};
            return (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
            <Link to={`/courses/${p.slug}`} className={`group rounded-2xl border border-violet-200 bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-card ${hue.border || "hover:border-violet-400"} h-full block`}>
              <div className="flex items-center justify-between gap-2">
                <p className={`text-[11px] font-bold uppercase tracking-widest ${hue.text || "text-slate-950"}`}>{p.catName}</p>
                <span className={`h-1.5 w-8 rounded-full transition-all duration-300 group-hover:w-12 ${hue.solid || "bg-slate-950"}`} aria-hidden />
              </div>
              <h3 className="font-bold text-slate-950 text-[16.5px] mt-1">{p.name}</h3>
              <p className="text-[13.5px] text-slate-600 mt-1.5 leading-relaxed line-clamp-2">{p.shortDescription}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.technologies.slice(0, 4).map((t) => (
                  <span key={t} className={`text-[11px] font-semibold border border-violet-100 rounded-md px-2 py-1 text-slate-600 bg-violet-50`}>{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-violet-100">
                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-500"><FiClock size={13} /> {p.duration} · {p.mode}</span>
                <span className={`text-[13px] font-bold inline-flex items-center gap-1.5 transition-all ${hue.text || "text-violet-700"}`}>Explore <FiArrowRight /></span>
              </div>
            </Link>
            </Reveal>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-ink-muted">
            <p className="font-bold text-ink-navy text-lg">No programs match “{q}”.</p>
            <p className="text-sm mt-1">Try AI, Python, AWS or SEO.</p>
          </div>
        )}
        </div>
      </section>
    </main>
  );
}
