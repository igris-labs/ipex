import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  components: [
    { path: '~/components/prose', pathPrefix: false, global: true },
    { path: '~/components', extensions: ['vue'], ignore: ['prose/**'] },
  ],
  modules: [
    '@nuxt/content',
    '@nuxt/hints',
    '@nuxt/fonts',
    '@nuxt/icon/module',
    '@nuxt/image',
    '@nuxt/scripts',
    '@vueuse/nuxt/module',
    'nuxt-og-image',
    'akaza-ui/nuxt',
    '@nuxtjs/color-mode',
  ],
  css: ['~/assets/main.css'],
  content: {
    renderer: { alias: { kbd: 'ProseKbd' } },
    build: {
      markdown: {
        highlight: false,
      },
    },
  },
  colorMode: { classSuffix: '', preference: 'system', fallback: 'light' },
  vite: {
    plugins: [tailwindcss()],
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
})
