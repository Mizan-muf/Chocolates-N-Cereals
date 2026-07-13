import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        accent: "var(--accent)",
        accent2: "var(--accent-2)",
        accentSoft: "var(--accent-soft)",
        cocoa: "var(--cocoa)",
        cocoaSoft: "var(--cocoa-soft)",
        text: "var(--text)",
        muted: "var(--muted)",
      },
      borderRadius: {
        xl: "var(--radius)",
      },
      boxShadow: {
        soft: "var(--shadow)",
      },
    },
  },
  plugins: [],
};

export default config;