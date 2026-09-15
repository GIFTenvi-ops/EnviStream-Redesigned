import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { FiSend, FiMessageCircle, FiX } from "react-icons/fi";
import { QUICK_REPLIES, getAnswer, GREETING } from "../data/assistant";
import { reduced } from "../anim/ui";

/**
 * Popup chatbot — floating navy bubble (above the WhatsApp float)
 * opening a GSAP-animated chat panel. Navy / sky / white themed,
 * offline rule-based answers, callback + deep-link actions.
 */
export default function ChatbotPopup({ onEnquire }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([GREETING]);
  const [val, setVal] = useState("");
  const [teaser, setTeaser] = useState(false);
  const [seen, setSeen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);
  const boxRef = useRef(null);
  const timer = useRef(null);

  // Greet once: teaser bubble after a few seconds, attention nudge on the button.
  useEffect(() => {
    if (reduced() || seen) return undefined;
    const t1 = setTimeout(() => setTeaser(true), 5000);
    const t2 = setTimeout(() => {
      if (btnRef.current && !seen) {
        gsap.fromTo(btnRef.current, { scale: 1 }, { scale: 1.12, duration: 0.22, yoyo: true, repeat: 3, ease: "power2.inOut" });
      }
    }, 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [seen]);

  // Open / close animation.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return undefined;
    if (reduced()) {
      gsap.set(el, { clearProps: "all" });
      el.style.display = open ? "flex" : "none";
      return undefined;
    }
    if (open) {
      el.style.display = "flex";
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 28, scale: 0.94, transformOrigin: "bottom right" },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "expo.out", overwrite: "auto" }
      );
    } else if (el.style.display !== "none") {
      gsap.to(el, {
        autoAlpha: 0, y: 20, scale: 0.95, duration: 0.28, ease: "power3.in", overwrite: "auto",
        onComplete: () => {
          el.style.display = "none";
        },
      });
    }
    return undefined;
  }, [open ]);

  // Autoscroll + typing timer cleanup.
  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);
  useEffect(() => () => clearTimeout(timer.current), []);

  // ESC closes.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = () => {
    setSeen(true);
    setTeaser(false);
    setOpen((v) => !v);
  };

  const send = (text) => {
    const clean = String(text || "").trim();
    if (!clean) return;
    clearTimeout(timer.current);
    setMsgs((m) => [...m, { from: "user", text: clean }, { from: "bot", typing: true }]);
    setVal("");
    timer.current = setTimeout(() => {
      setMsgs((m) => [...m.filter((x) => !x.typing), { from: "bot", ...getAnswer(clean) }]);
    }, 650);
  };

  return (
    <>
      {/* Teaser bubble */}
      {teaser && !open && (
        <div className="fixed bottom-[10.5rem] right-5 z-[70] max-w-[240px] font-poppins">
          <div className="relative rounded-2xl rounded-br-md border border-violet-200 bg-white p-3.5 shadow-card text-[13px] text-slate-700">
            <button onClick={() => setTeaser(false)} aria-label="Dismiss" className="absolute -top-2 -right-2 w-6 h-6 grid place-items-center rounded-full bg-slate-950 text-white text-[11px] shadow">
              <FiX size={12} />
            </button>
            <button onClick={toggle} className="text-left">
              <span className="font-bold text-slate-950">Need help finding a course?</span>
              <span className="block mt-0.5 text-violet-700 font-semibold">Chat with us →</span>
            </button>
          </div>
        </div>
      )}

      {/* Chat panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Eduskill assistant chat"
        aria-hidden={!open}
        className="fixed bottom-[10.5rem] right-5 z-[70] w-[min(92vw,380px)] h-[520px] max-h-[65vh] flex-col overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-[0_32px_80px_-24px_rgba(23,37,84,.5)] font-poppins"
        style={{ display: "none" }}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 bg-slate-950 px-4 py-3 text-white shrink-0">
          <span className="w-9 h-9 grid place-items-center rounded-xl bg-violet-500/20 border border-white/15 text-violet-300 shrink-0">
            <FiMessageCircle size={17} />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[14px] font-bold leading-tight">Eduskill Assistant</span>
            <span className="flex items-center gap-1.5 text-[11px] text-violet-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online — replies instantly
            </span>
          </span>
          <button onClick={toggle} aria-label="Close chat" className="w-8 h-8 grid place-items-center rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition">
            <FiX size={17} />
          </button>
        </div>

        {/* Messages */}
        <div ref={boxRef} data-lenis-prevent className="flex-1 overflow-y-auto bg-violet-50/60 px-4 py-3 space-y-2.5">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${m.from === "user" ? "bg-slate-950 text-white rounded-br-md" : "bg-white border border-violet-100 text-slate-700 rounded-bl-md shadow-sm"}`}>
                {m.typing ? (
                  <span className="flex gap-1 py-1" aria-label="Assistant is typing">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </span>
                ) : (
                  m.text
                )}
                {m.link && (
                  <Link to={m.link[0]} onClick={() => setOpen(false)} className="block mt-1.5 text-[12.5px] font-bold text-violet-700 hover:underline">
                    {m.link[1]} →
                  </Link>
                )}
                {m.action === "counsellor" && (
                  <button onClick={() => onEnquire?.("Chatbot enquiry")} className="block mt-1.5 text-[12.5px] font-bold text-violet-700 hover:underline">
                    Request a callback →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick replies */}
        <div className="px-3 pt-2.5 flex flex-wrap gap-1.5 bg-white border-t border-violet-100 shrink-0">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[12px] font-semibold text-slate-950 hover:border-slate-950 transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          className="flex items-center gap-2 p-3 bg-white shrink-0"
          onSubmit={(e) => {
            e.preventDefault();
            send(val);
          }}
        >
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Ask about a course, fees…"
            aria-label="Type your message"
            className="flex-1 min-w-0 rounded-xl border border-violet-200 bg-violet-50/50 px-3.5 py-2.5 text-[13.5px] text-slate-950 outline-none focus:border-violet-500 focus:bg-white transition placeholder:text-slate-400"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="w-10 h-10 shrink-0 grid place-items-center rounded-xl bg-slate-950 hover:bg-slate-900 text-white transition"
          >
            <FiSend size={15} />
          </button>
        </form>
      </div>

      {/* Floating button */}
      <button
        ref={btnRef}
        onClick={toggle}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="fixed bottom-24 right-5 z-[70] w-14 h-14 grid place-items-center rounded-full bg-slate-950 hover:bg-slate-900 text-white border border-white/20 shadow-[0_16px_36px_-10px_rgba(23,37,84,.7)] hover:scale-110 transition-transform"
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
        {!seen && !open && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-violet-400 border-2 border-white" aria-hidden />
        )}
      </button>
    </>
  );
}
