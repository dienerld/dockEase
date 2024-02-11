// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vue-email/nuxt', 'nuxt-resend'],
  runtimeConfig: {
    resendKey: process.env.RESEND_KEY,
  },
  vueEmail: {
    autoImport: true,
    useNuxtTailwind: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
