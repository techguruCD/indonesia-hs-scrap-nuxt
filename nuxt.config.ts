// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    dbDir: resolveComponent('./server/db'),
    API_TOKEN: 'Basic aW5zd18yOmJhYzJiYXM2'
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
