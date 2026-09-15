import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { reduced } from "../anim/ui";

/**
 * PageTransition — soft navy overlay wipe on route change.
 * Skips the very first mount (PageLoader already owns that entrance)
 * and skips entirely for reduced-motion users.
 *
 * Wrap the <Routes> tree in App.jsx with this component.
 */
export default function PageTransition({ children }) {
  const overlayRef = useRef(null);
  const { pathname } = useLocation();
  const firstRun = useRef(true);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      setDisplayChildren(children);
      return undefined;
    }
    const overlay = overlayRef.current;
    if (!overlay || reduced()) {
      setDisplayChildren(children);
      return undefined;
    }
    const tl = gsap.timeline();
    tl.set(overlay, { display: "block" })
      .fromTo(overlay, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.38, ease: "power2.inOut" })
      .call(() => setDisplayChildren(children))
      .to(overlay, { opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.06 })
      .set(overlay, { display: "none" });
    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <div ref={overlayRef} className="evs-route-overlay" aria-hidden />
      {displayChildren}
    </>
  );
}
