import { useEffect, useRef } from "react";
import gsap from "gsap";
import { reduced, finePointer } from "../anim/ui";

/**
 * CustomCursor - premium ring + dot cursor that trails the pointer and
 * expands/softens over interactive elements. Desktop (fine pointer) only;
 * no-op on touch devices and for reduced-motion users.
 *
 * Mark any element `data-cursor="link"` to trigger the hover state -
 * e.g. <Link to="/courses" data-cursor="link">.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (reduced() || !finePointer()) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    const move = (e) => {
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const over = (e) => {
      if (e.target.closest?.("[data-cursor='link']")) {
        gsap.to(ring, { scale: 2.2, opacity: 0.5, duration: 0.35, ease: "power3.out" });
        gsap.to(dot, { scale: 0, duration: 0.25 });
      }
    };
    const out = (e) => {
      if (e.target.closest?.("[data-cursor='link']")) {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
        gsap.to(dot, { scale: 1, duration: 0.25 });
      }
    };

    document.body.classList.add("evs-custom-cursor");
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      document.body.classList.remove("evs-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="evs-cursor-ring" aria-hidden />
      <div ref={dotRef} className="evs-cursor-dot" aria-hidden />
    </>
  );
}
