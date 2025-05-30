// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
        '@pinia/nuxt',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/ui',
        '@vueuse/nuxt',
        '@nuxt/image',
        '@nuxt/test-utils'
    ],

    ssr: false,

    components: [
        {
            path: '~/components',
            pathPrefix: false
        }
    ],

    imports: {
        presets: [
            {
                from: 'es-toolkit',
                imports: ['es-toolkit']
            }
        ]
    },

    devtools: { enabled: true },

    css: ['~/assets/css/main.css'],

    ui: {
        colorMode: false
    },

    runtimeConfig: {
        baseURL: `https://${process.env.DOMAIN}/${process.env.SERVER_TYPE}`,
        username: process.env.USER,
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
        serverType: process.env.SERVER_TYPE,
        domain: process.env.DOMAIN
    },

    devServer: {
        port: 3001
    },

    future: {
        compatibilityVersion: 4
    },

    compatibilityDate: '2024-11-01',

    nitro: {
        preset: 'bun',
        experimental: {
            openAPI: true
        }
    },

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
    },

    fonts: {
        provider: 'local',
        assets: {
            strategy: 'public'
        },
        families: [
            {
                provider: 'local',
                name: 'iransans',
                weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
            }
        ]
    }
});
