import { useEffect, useState } from "react";
import { FiCheck, FiSun, FiX } from "react-icons/fi";

const THEMES = [
  { id: "tide", label: "Tide", color: "#22d3ee" },
  { id: "citrus", label: "Citrus", color: "#f59e0b" },
  { id: "graphite", label: "Graphite", color: "#94a3b8" },
  { id: "orchid", label: "Orchid", color: "#f0abfc" },
  { id: "forest", label: "Forest", color: "#86efac" },
];

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("evs-theme") || "tide");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
    localStorage.setItem("evs-theme", theme);
  }, [theme]);

  return (
    <div className="fixed right-4 top-[76px] z-[65] font-poppins sm:right-6">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Change theme"
        aria-expanded={open}
        title="Change theme"
        className="theme-switcher-button grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-[#101d25]/90 text-cyan-100 shadow-lg backdrop-blur-xl transition hover:scale-105 hover:border-cyan-200/60"
      >
        {open ? <FiX size={18} /> : <FiSun size={18} />}
      </button>
      {open && (
        <div className="theme-switcher-menu absolute right-0 mt-2 w-36 rounded-xl border border-white/20 bg-[#101d25]/95 p-2 text-white shadow-2xl backdrop-blur-xl">
          <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-[.16em] text-white/45">Theme</p>
          {THEMES.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => { setTheme(item.id); setOpen(false); }}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[12px] font-semibold transition hover:bg-white/10"
            >
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="flex-1">{item.label}</span>
              {theme === item.id && <FiCheck size={14} className="text-cyan-200" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
