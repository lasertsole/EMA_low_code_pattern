export default defineNuxtConfig({
  compatibilityDate: '2025-11-27',
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Nuxt', // default fallback title
      htmlAttrs: {
        lang: 'en'
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  devtools: { enabled: false },

  modules: ['@primevue/nuxt-module'],

  //设置全局样式
  css: ['@/assets/css/init.scss'],

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
      apiBaseURL: '/api'
    }
  },

  imports: {
    dirs: ['~/composables/**']
  }
});
