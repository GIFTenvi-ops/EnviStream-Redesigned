import { useEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "./Logo";
import { markBooted, reduced } from "../anim/ui";

/**
 * First-visit branded intro: logo + animated tagline only.
 */
export default function PageLoader({ onDone }) {
  const root = useRef(null);
  const tagline = "To Earn More, You Must Learn More.";

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const done = () => {
      markBooted();
      try {
        window.__lenis?.start();
      } catch {
        /* no smooth scroller */
      }
      onDone?.();
    };

    try {
      window.__lenis?.stop();
    } catch {
      /* no smooth scroller */
    }

    if (reduced()) {
      done();
      return undefined;
    }

    const words = gsap.utils.toArray(".pl-word");
    const tl = gsap.timeline({ onComplete: done });

    tl.fromTo(
      ".pl-logo",
      { opacity: 0, scale: 0.92, y: 18 },
      { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: "power3.out" }
    )
      .fromTo(
        words,
        { opacity: 0, y: 18, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.08, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ".pl-bar",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "expo.out" },
        "-=0.2"
      )
      .to(el, { opacity: 0, duration: 0.7, ease: "power2.inOut", delay: 0.7 });

    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] grid place-items-center bg-[#0d171d]/95 backdrop-blur-2xl font-poppins"
      aria-hidden
    >
      <div className="absolute inset-0 hero-grid opacity-40" />
      <div className="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-[#d4a85d]/18 blur-[110px]" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#3ec0d9]/10 blur-[110px]" />

      <div className="relative text-center px-6">
        <div className="pl-logo mx-auto mb-5">
          <Logo compact className="h-20 md:h-24" dark />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center text-[0.72rem] md:text-[0.85rem] uppercase tracking-[0.18em] text-[#d7c29a] font-semibold">
          {tagline.split(" ").map((word, index) => (
            <span key={`${word}-${index}`} className="pl-word inline-block opacity-0 will-change-transform">
              {word}
            </span>
          ))}
        </div>

        <div className="mt-6 h-[3px] w-56 mx-auto rounded-full bg-white/10 overflow-hidden">
          <div className="pl-bar h-full w-full origin-left rounded-full bg-gradient-to-r from-[#d4a85d] via-[#3ec0d9] to-[#f7f5f2]" />
        </div>
      </div>
    </div>
  );
}
