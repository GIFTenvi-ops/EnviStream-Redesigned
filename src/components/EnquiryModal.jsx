import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiX, FiArrowRight, FiCheck } from "react-icons/fi";

export default function EnquiryModal({ open, course, onClose }) {
  const [sent, setSent] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    setSent(false);
    if (open && boxRef.current) {
      gsap.fromTo(boxRef.current, { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" });
      document.body.style.overflow = "hidden";
      try { window.__lenis?.stop(); } catch { /* no smooth scroller */ }
    } else {
      document.body.style.overflow = "";
      try { window.__lenis?.start(); } catch { /* no smooth scroller */ }
    }
    return () => {
      document.body.style.overflow = "";
      try { window.__lenis?.start(); } catch { /* noop */ }
    };
  }, [open ]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4 font-poppins" role="dialog" aria-modal="true" data-lenis-prevent>
      <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-md" onClick={onClose} />
      <div ref={boxRef} className="relative w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-2xl border border-white/60 shadow-2xl p-7">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-lg hover:bg-slate-100 text-slate-500" aria-label="Close"><FiX size={18} /></button>
        {!sent ? (
          <>
            <p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#0d6b7a]">Apply / Enquire</p>
            <h3 className="font-display font-extrabold text-slate-900 text-2xl mt-1">Talk to a counsellor</h3>
            <p className="text-[13.5px] text-slate-500 mt-1">{course ? <>Interested in <strong className="text-slate-900">{course}</strong>? We’ll call you back.</> : "Get a personalised career roadmap within 24 hours."}</p>
            <form className="mt-5 space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <input required placeholder="Full name" className="field" />
              <div className="grid grid-cols-2 gap-3">
                <input required type="email" placeholder="Email" className="field" />
                <input required type="tel" placeholder="Phone" className="field" />
              </div>
              <select className="field" defaultValue={course || ""}>
                <option value="" disabled>Select program</option>
                {["MERN Stack", "Artificial Intelligence", "Data Science", "Cybersecurity", "AWS / Cloud", "Python", "Digital Marketing"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
                {course && !["MERN Stack"].includes(course) && <option value={course}>{course}</option>}
              </select>
              <button className="w-full rounded-xl bg-[#d4a85d] hover:bg-[#e2bb72] backdrop-blur border border-[#f0deaf]/60 text-[#0d171d] font-bold py-3.5 transition inline-flex items-center justify-center gap-2">Request callback <FiArrowRight /></button>
              <p className="text-[12px] text-slate-400 text-center">By submitting, you agree to be contacted by Envistream Eduskill.</p>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <span className="mx-auto w-14 h-14 grid place-items-center rounded-full bg-[#edf5f7] text-[#0d6b7a] border border-[#d4a85d]/20"><FiCheck size={26} /></span>
            <h3 className="font-display font-extrabold text-slate-900 text-xl mt-4">Enquiry received!</h3>
            <p className="text-[14px] text-slate-500 mt-2">Our counsellor will reach out shortly. Meanwhile, explore programs from the Courses mega menu.</p>
            <button onClick={onClose} className="mt-5 rounded-xl bg-slate-900/85 backdrop-blur text-white font-bold px-6 py-3 border border-white/15">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
