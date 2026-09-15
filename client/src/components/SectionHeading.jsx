import Reveal from "./Reveal";
import ScrollText from "./ScrollText";

export default function SectionHeading({ eyebrow, title, sub, center = true, dark = false }) {
  return (
    <Reveal className={`${center ? "text-center mx-auto" : "text-left"} max-w-3xl mb-12`}>
      {eyebrow && (
        <span className={`chip mb-4 ${dark ? "bg-white/10 text-[#d4a85d] border border-white/20" : "bg-[#edf5f7] text-[#0d171d] border border-[#cfe2e7]"}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /> {eyebrow}
        </span>
      )}
      <h2 className={`font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] ${dark ? "text-white" : "text-slate-950"}`}>
        {typeof title === "string" ? (
          <ScrollText text={title} wordDuration={0.1} stagger={0.06} />
        ) : (
          title
        )}
      </h2>
      {sub && <p className={`mt-4 text-[16px] leading-relaxed ${dark ? "text-white/70" : "text-slate-600"}`}>{sub}</p>}
    </Reveal>
  );
}
