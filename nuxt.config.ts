import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Nuxt', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  devtools: { enabled: false },
  //设置全局样式
  css: [
    '@/assets/css/init.scss'
  ],

  // alias: {
  //   'commonScss': fileURLToPath(new URL('./app/assets/css/common.scss', import.meta.url)),
  // },

  //在全局scss中添加样式
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/mixin.scss" as *;'
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBaseURL: "/api",
    },
  },
})
