import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        gold: {
          light: "#FFD700",
          medium: "#DAA520",
          dark: "#B8860B",
          podium: "#FFD700",
        },
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        shimmer: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        "podium-rise": {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "podium-rise": "podium-rise 1.5s ease-out forwards",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(-45deg, #FFD700, #DAA520, #B8860B, #DAA520)",
        "hexagon-pattern": "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M30 0l25.98 15v30L30 60 4.02 45V15L30 0z\" fill-opacity=\"0.1\" fill=\"%23DAA520\"/%3E%3C/svg%3E')",
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;