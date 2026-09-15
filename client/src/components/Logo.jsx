import { Link } from "react-router-dom";

/**
 * Premium institute lockup based on the provided Envistream EduSkill logo.
 * The mark is a deep teal / orange icon with a graduation cap and a bold two-line wordmark.
 */
export default function Logo({ dark = false, compact = false, className = "h-12" }) {
  const teal = dark ? "#B6E7F2" : "#0E6F86";
  const deepTeal = dark ? "#E3F7FC" : "#083C4D";
  const orange = dark ? "#FBBF24" : "#F26A21";
  const orangeDeep = dark ? "#F59E0B" : "#DF5C10";
  const white = dark ? "#F8FAFC" : "#0E1726";
  const subtitle = dark ? "#E2E8F0" : "#475569";
  const font = "Poppins, 'Plus Jakarta Sans', system-ui, sans-serif";

  return (
    <Link to="/" className="flex items-center shrink-0" aria-label="Envistream Eduskill home">
      <svg
        viewBox={compact ? "0 0 370 110" : "0 0 430 150"}
        className={`${className} w-auto`}
        role="img"
        aria-label="Envistream Eduskill — To earn more, you must learn more"
      >
        <g transform="translate(0 8)">
          <path d="M18 18 L52 52 L82 14 L95 22 L63 68 L35 68 L18 18 Z" fill={orange} />
          <path d="M18 18 L52 52 L39 90 L8 66 L18 18 Z" fill={orangeDeep} opacity="0.75" />
          <path d="M58 18 L76 18 L106 64 L90 64 L58 18 Z" fill={deepTeal} />
          <path d="M26 24 L68 62 L42 90 L8 64 L26 24 Z" fill={teal} opacity="0.9" />
          <g transform="translate(32 18) rotate(-12 18 18)">
            <path d="M0 12 L18 0 L36 12 L18 24 Z" fill={orangeDeep} />
            <rect x="15" y="12" width="6" height="16" rx="2" fill="#F8FAFC" />
            <circle cx="18" cy="30" r="4" fill="#F8FAFC" />
            <rect x="0" y="11" width="36" height="5" rx="2" fill={orangeDeep} />
          </g>
        </g>

        <text
          x="120"
          y="58"
          fontFamily={font}
          fontWeight="800"
          fontSize="30"
          letterSpacing="-1"
          fill={white}
        >
          Envistream
        </text>

        <text x="120" y="108" fontFamily={font} fontWeight="900" fontSize="54" letterSpacing="-2.2">
          <tspan fill={deepTeal}>Edu</tspan>
          <tspan fill={orange}>S</tspan>
          <tspan fill={teal}>kill</tspan>
        </text>

        {!compact && (
          <text
            x="126"
            y="132"
            fontFamily={font}
            fontStyle="italic"
            fontWeight="600"
            fontSize="13.5"
            letterSpacing="0.2"
            fill={subtitle}
          >
            To earn more, you must learn more
          </text>
        )}
      </svg>
    </Link>
  );
}
