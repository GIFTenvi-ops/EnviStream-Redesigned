/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#2563EB",
          deep: "#1E3A8A",
          navy: "#0F172A",
          ink: "#0F172A",
          orange: "#F97316",
          ember: "#EA580C",
          amber: "#FB923C",
          cream: "#F8FAFC",
          mist: "#EFF6FF",
          line: "#E2E8F0",
        },
        ink: { navy: "#1E293B", deep: "#0F172A", body: "#334155", muted: "#64748B" },
        /* Professional system — blue primary surfaces, orange action accent,
           white glass cards, gray text/borders */
        electric: { DEFAULT: "#2563EB", dark: "#1D4ED8" },
        accent: { DEFAULT: "#F97316", dark: "#EA580C", soft: "#FFF7ED" },
        cyanx: { DEFAULT: "#60A5FA" },
        emeraldx: { DEFAULT: "#94A3B8" },
      },
      fontFamily: {
        display: ["Sora", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        sans: ["Poppins", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        poppins: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(30,64,175,.22)",
        card: "0 12px 40px -12px rgba(15,23,42,.16)",
        glow: "0 0 0 6px rgba(249,115,22,.15)",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        spinSlow: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 6s ease-in-out infinite",
        spinSlow: "spinSlow 18s linear infinite",
      },
    },
  },
  plugins: [],
};
