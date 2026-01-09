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
        'aviation-navy': '#0a1628',
        'aviation-blue': '#1a2942',
        'aviation-light': '#2d3f5f',
        'aviation-accent': '#ff8c42',
        'aviation-success': '#4ade80',
        'aviation-warning': '#fbbf24',
        'aviation-sky': '#38bdf8',
      },
    },
  },
  plugins: [],
};

export default config;