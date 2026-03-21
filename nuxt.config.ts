// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/i18n",
  ],

  // Autodiscover icons from local @iconify-json dependencies
  icon: {
    serverBundle: {
      collections: ["fluent", "fluent-emoji", "lucide"],
    },
  },

  i18n: {
    locales: [
      { code: "vi", iso: "vi-VN", file: "vi.json", name: "Tiếng Việt" },
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
    ],
    defaultLocale: "vi",
    langDir: "locales/",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: false,
      fallbackLocale: "vi",
    },
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      concurrency: 1,
      interval: 100,
    },
  },

  css: ["~/assets/css/main.css"],

  typescript: {
    strict: true,
  },

  // No need to auto-import Pinia helpers; stores import what they need.

  app: {
    head: {
      titleTemplate: "%s | Lịch sử Việt Nam cho Bé",
      title: "Trang chủ",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Ứng dụng học lịch sử Việt Nam thú vị, sinh động và bổ ích dành riêng cho trẻ em. Khám phá 4000 năm lịch sử hào hùng qua truyện kể và đố vui.",
        },
        { name: "format-detection", content: "telephone=no" },
        // Open Graph
        { property: "og:site_name", content: "Lịch sử Việt Nam cho Bé" },
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Lịch sử Việt Nam cho Bé - Hành trình về nguồn cội",
        },
        {
          property: "og:description",
          content:
            "Khám phá lịch sử Việt Nam qua những câu chuyện hấp dẫn và trò chơi đố vui sinh động.",
        },
        { property: "og:image", content: "/images/banner/banner.png" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Lịch sử Việt Nam cho Bé - Hành trình về nguồn cội",
        },
        {
          name: "twitter:description",
          content:
            "Khám phá lịch sử Việt Nam qua những câu chuyện hấp dẫn và trò chơi đố vui sinh động.",
        },
        { name: "twitter:image", content: "/images/banner/banner.png" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  vite: {
    optimizeDeps: {
      include: ["canvas-confetti"],
    },
  },
});
