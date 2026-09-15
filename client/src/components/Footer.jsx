import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiLinkedin, FiYoutube, FiTwitter, FiMail, FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";
import Logo from "./Logo";

/**
 * Footer — deep blue brand + contact beside a start-learning CTA card.
 * Professional rhythm: blue surfaces, orange action accents, white/gray text.
 */
export default function Footer() {
  return (
    <footer className="bg-[#0d171d] backdrop-blur-2xl border-t border-[#496170]/35 text-white/75 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" aria-hidden />
      <div className="absolute -top-32 right-0 w-[420px] h-[420px] rounded-full bg-[#d4a85d]/15 blur-[110px] pointer-events-none" aria-hidden />
      <div className="absolute -bottom-32 left-0 w-[420px] h-[420px] rounded-full bg-[#4db5c6]/10 blur-[110px] pointer-events-none" aria-hidden />

      <div className="container-x relative py-14 grid lg:grid-cols-[1fr_1.15fr] gap-10 items-center">
        {/* brand + contact */}
        <div>
          <Logo dark />
          <p className="mt-5 text-[15px] leading-relaxed max-w-md">
            Industry-oriented training, internships, certifications and career development programs designed for emerging technology careers.
          </p>
          <ul className="mt-6 space-y-3 text-[14.5px]">
            <li>
              <a href="mailto:hello@envistream.org" className="inline-flex items-center gap-2.5 hover:text-white transition">
                <FiMail className="text-[#d4a85d]" /> hello@envistream.org
              </a>
            </li>
            <li>
              <a href="tel:+919999999999" className="inline-flex items-center gap-2.5 hover:text-white transition">
                <FiPhone className="text-[#d4a85d]" /> +91 99999 99999
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <FiMapPin className="text-[#d4a85d] shrink-0" /> Envistream Eduskill, Innovation Tower, India
            </li>
          </ul>
          <div className="flex gap-2.5 mt-6">
            {[FiLinkedin, FiInstagram, FiYoutube, FiFacebook, FiTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="w-10 h-10 grid place-items-center rounded-xl bg-white/10 border border-white/15 hover:bg-[#d4a85d] hover:border-[#d4a85d] hover:text-[#0d171d] transition-all hover:-translate-y-1 backdrop-blur"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* CTA card — deep blue glass with orange action accent */}
        <div className="relative rounded-[22px] overflow-hidden border border-blue-400/25 bg-gradient-to-br from-slate-900/80 via-slate-950/70 to-slate-900/80 backdrop-blur-2xl p-8 sm:p-10">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-fuchsia-500/20 blur-[90px]" aria-hidden />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-blue-500/25 blur-[90px]" aria-hidden />
          <div className="relative">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 text-white/85 text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a85d] animate-pulse" /> Admissions open · 2026
            </p>
            <h3 className="font-display font-extrabold text-white text-2xl sm:text-3xl tracking-tight mt-4 leading-tight">
              Start your learning journey with Envistream Eduskill
            </h3>
            <p className="mt-3 text-white/65 text-[14.5px] leading-relaxed max-w-md">
              Courses · Internships · Certifications · Placements. Talk to a counsellor and get a personalised career roadmap.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/courses" className="group inline-flex items-center gap-2 rounded-full bg-[#d4a85d] backdrop-blur border border-[#f0deaf]/60 text-[#0d171d] px-6 py-3 font-bold text-sm transition-all hover:-translate-y-0.5 hover:bg-[#e2bb72] shadow-[0_16px_36px_-12px_rgba(212,168,93,.7)]">
                Explore Courses <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur text-white hover:bg-white/20 px-6 py-3 font-bold text-sm transition">
                Talk to a Counsellor
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-blue-400/15">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/50">
          <p>© 2026 Envistream Eduskill · envistream.org · All rights reserved.</p>
          <p className="italic text-[#d4a85d]">“To earn more, you must learn more.”</p>
        </div>
      </div>
    </footer>
  );
}
