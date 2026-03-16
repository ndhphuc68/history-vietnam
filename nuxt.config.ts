// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  },

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true
  },

  pinia: {
    autoImports: [
      'defineStore',
      'storeToRefs'
    ]
  },

  app: {
    head: {
      title: 'Lịch sử Việt Nam cho Bé',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Ứng dụng học lịch sử Việt Nam thú vị và bổ ích cho trẻ em.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Ensure directories are scanned correctly for Nuxt 4 or 3 matching the user's rules
  dir: {
    pages: 'pages',
    layouts: 'layouts',
    middleware: 'middleware',
    modules: 'modules',
    plugins: 'plugins',
    public: 'public',
    static: 'static',
    assets: 'assets'
  }
})
