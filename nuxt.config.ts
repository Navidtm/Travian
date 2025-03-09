// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: true },
  devServer: {
    port: 3001,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/test-utils',
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    id: process.env.PHPSESSID,
    baseURL: process.env.BASE_URL,
    username: process.env.COOKUSR,
    email: process.env.COOKEMAIL,
    serverType: process.env.SERVER_TYPE,
    domain: process.env.DOMAIN,
  },
});
