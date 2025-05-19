// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  css: ['@/assets/css/tailwind.css'],
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxtjs/tailwindcss','@nuxtjs/google-fonts','@pinia/nuxt',],
  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700],
    },
    display: 'swap',
    download: true,
    inject: true
  }
})