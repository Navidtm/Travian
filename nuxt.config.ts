// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
        '@pinia/nuxt',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@vueuse/nuxt',
        '@nuxt/image'
        // '@nuxt/test-utils',
    ],

    devtools: { enabled: true },

    css: ['~/assets/css/main.css'],

    runtimeConfig: {
        id: process.env.PHPSESSID,
        baseURL: process.env.BASE_URL,
        username: process.env.COOKUSR,
        email: process.env.COOKEMAIL,
        serverType: process.env.SERVER_TYPE,
        domain: process.env.DOMAIN
    },

    devServer: {
        port: 3001
    },

    compatibilityDate: '2024-11-01',

    vite: {
        plugins: [tailwindcss()]
    },

    eslint: {
        config: {
            stylistic: {
                semi: true,
                quotes: 'single',
                indent: 4,
                quoteProps: 'as-needed',
                commaDangle: 'never'
            }
        }
    }
});
