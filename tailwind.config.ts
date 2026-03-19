import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
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

