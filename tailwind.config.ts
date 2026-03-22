import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./components/**/*.{vue,js,ts}",
    "./composables/**/*.{js,ts}",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        background: "var(--background)",
        text: "var(--text)",
      },
      fontFamily: {
        heading: ["Be Vietnam Pro", "Fredoka", "sans-serif"],
        body: ["Be Vietnam Pro", "Quicksand", "sans-serif"],
        vietnam: ["Be Vietnam Pro", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

