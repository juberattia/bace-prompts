import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // VALIENTE® Design Language System
        parchment: "#DDDBD6",
        "v-red": "#FF1A00",
        "v-red-30": "rgba(255, 26, 0, 0.3)",
        "v-black": "#000000",
        // Studio OS tokens
        "studio-bg": "#f7f7f7",
        "studio-border": "#e8e8e8",
        "studio-text": "#111111",
        "studio-muted": "#999999",
        "studio-secondary": "#6b6b6b",
        "studio-neon": "#C8E632",
        "studio-neon-dark": "#a8c41a",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
