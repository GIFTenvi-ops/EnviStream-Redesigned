import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EnquiryModal from "./components/EnquiryModal";
import ChatbotPopup from "./components/ChatbotPopup";
import PageLoader from "./components/PageLoader";
import PageTransition from "./components/PageTransition";
import CustomCursor from "./components/CustomCursor";
import ScrollRail from "./components/ScrollRail";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Placeholder from "./pages/Placeholder";
import { isFirstBoot, reduced } from "./anim/ui";

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    try {
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname, search]);
  return null;
}

function NotFound() {
  return (
    <main className="container-x py-24 text-center font-poppins bg-white">
      <p className="text-[12px] font-bold uppercase tracking-[.2em] text-[#0d6b7a]">404</p>
      <h1 className="font-display font-extrabold text-4xl text-slate-800 mt-2">Page not found</h1>
      <Link to="/" className="inline-flex mt-6 rounded-xl bg-slate-900/80 backdrop-blur border border-white/15 text-white px-6 py-3 font-bold">Back home</Link>
    </main>
  );
}

function Shell() {
  const [modal, setModal] = useState(false);
  const [course, setCourse] = useState("");
  const [showLoader, setShowLoader] = useState(() => isFirstBoot());
  const booted = true;
  const openEnquire = useCallback((c = "") => { setCourse(c || ""); setModal(true); }, []);

  // Fluid, controlled smooth scroll (Lenis) kept in sync with ScrollTrigger.
  // No scroll-jacking: default wheel behavior preserved, gentle duration.
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const t = setTimeout(() => ScrollTrigger.refresh(), 800);
    if (reduced()) {
      return () => {
        window.removeEventListener("load", onLoad);
        clearTimeout(t);
      };
    }
    let lenis = null;
    let raf = null;
    try {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      // GSAP ticker time is in SECONDS, Lenis expects MILLISECONDS —
      // without the x1000 the virtual clock crawls and wheel scroll dies.
      raf = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    } catch {
      window.__lenis = null;
    }
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t);
      if (raf) gsap.ticker.remove(raf);
      try {
        lenis?.destroy();
      } catch {
        /* noop */
      }
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {showLoader && <PageLoader onDone={() => setShowLoader(false)} />}
      <CustomCursor />
      <ScrollRail />
      <ScrollToTop />
      <Navbar onEnquire={() => openEnquire()} booted={booted} />
      <div className="flex-1">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home onEnquire={openEnquire} booted={booted} />} />
            <Route path="/about" element={<Placeholder title="About Envistream Eduskill" eyebrow="Who we are" desc="Education, skill development, internships and career programs with trust, innovation and employability at the core." onEnquire={openEnquire} />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail onEnquire={openEnquire} />} />
            <Route path="/internships" element={<Placeholder title="Internships & Projects" eyebrow="Learn by building" desc="4–12 week mentor-led internships across AI, Full Stack, Data, Cybersecurity, Cloud and Marketing — with projects, reviews and certification." onEnquire={openEnquire} />} />
            <Route path="/corporate" element={<Placeholder title="Corporate Training" eyebrow="For HR & L&D teams" desc="AI & GenAI productivity, data analytics, cybersecurity awareness, Python, cloud and fully customised workshops." onEnquire={openEnquire} />} />
            <Route path="/placement" element={<Placeholder title="Placement & Career Programs" eyebrow="Career outcomes" desc="Job-oriented training, resume + LinkedIn reviews, mock interviews and referral drives. No false guarantees — real preparation." onEnquire={openEnquire} />} />
            <Route path="/resources" element={<Placeholder title="Resources & Blog" eyebrow="Learn free" desc="AI resources, career guides, student resources, FAQs, videos and webinars." onEnquire={openEnquire} />} />
            <Route path="/contact" element={<Placeholder title="Contact & Counselling" eyebrow="Talk to us" desc="Enquiries, training requests, partnership requests and student counselling. We reply within 24 hours." onEnquire={openEnquire} />} />
            <Route path="/verify" element={<Placeholder title="Certificate Verification" eyebrow="Trust & credentials" desc="Enter a Certificate ID like EVS-2026-AI-000123 to verify name, program, duration and status instantly." onEnquire={openEnquire} />} />
            <Route path="/partner" element={<Placeholder title="Partner With Envistream Eduskill" eyebrow="Colleges · Universities · Companies" desc="MoUs for internships, faculty development, AI workshops, certification and placement-oriented training." onEnquire={openEnquire} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </div>
      <Footer onEnquire={() => openEnquire()} />
      <EnquiryModal open={modal} course={course} onClose={() => setModal(false)} />
      <ChatbotPopup onEnquire={openEnquire} />
      {/* WhatsApp float — brand green */}
      <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-[60] w-14 h-14 grid place-items-center rounded-full bg-[#25D366]/95 hover:bg-[#25D366] backdrop-blur-xl border border-white/25 text-white text-2xl shadow-[0_16px_36px_-10px_rgba(37,211,102,.7)] hover:scale-110 transition-transform">✆</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
