import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // ── Core palette ─────────────────────────────────────────────
        ink: {
          950: "#07060a",
          900: "#0d0c12",
          800: "#131118",
          700: "#1c1a24",
          600: "#242230",
          500: "#2f2c3e",
          400: "#3d3a52",
          300: "#5a5675",
          200: "#7d7898",
          100: "#b0aac4",
          50: "#d8d4e8",
        },
        // Warm parchment text
        parchment: {
          DEFAULT: "#f0ece3",
          muted: "#c4beaf",
          faint: "#8a8479",
        },
        // Antique gold — the accent
        gold: {
          DEFAULT: "#c9a96e",
          light: "#e2c99a",
          dark: "#8b7355",
          faint: "#2a2215",
        },
        // Deep crimson — for death indicators
        crimson: {
          DEFAULT: "#8b3a3a",
          light: "#b85c5c",
          dark: "#5c1f1f",
          faint: "#1f0a0a",
        },
        // Verdigris — for reincarnation/life
        verdigris: {
          DEFAULT: "#3d7a6a",
          light: "#5aa890",
          dark: "#25503f",
          faint: "#0a1a15",
        },
        // Shadcn CSS variable aliases
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        display: ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        headline: ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        title: ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        memorial: "0.15em",
        wide: "0.08em",
        wider: "0.12em",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        memorial: "2px",
        plaque: "0px",
      },
      boxShadow: {
        memorial: "0 4px 24px 0 rgba(0,0,0,0.5), 0 1px 0 0 rgba(201,169,110,0.08) inset",
        "memorial-hover": "0 8px 40px 0 rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.15)",
        candle: "0 0 60px 20px rgba(201,169,110,0.04)",
        "gold-glow": "0 0 20px rgba(201,169,110,0.15)",
        plaque: "0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        "memorial-gradient": "linear-gradient(180deg, #07060a 0%, #0d0c12 100%)",
        "card-gradient": "linear-gradient(135deg, #131118 0%, #0d0c12 100%)",
        "gold-gradient": "linear-gradient(135deg, #c9a96e 0%, #8b7355 100%)",
        "hero-radial": "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 70%)",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease forwards",
        "fade-up": "fade-up 0.5s ease forwards",
        flicker: "flicker 4s ease-in-out infinite",
        breathe: "breathe 3s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
          "75%": { opacity: "0.95" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.02)", opacity: "0.9" },
        },
      },
      transitionTimingFunction: {
        memorial: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
