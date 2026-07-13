// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	dev: true,
	modules: [
		'@pinia/nuxt',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@vueuse/nuxt',
		'@nuxt/image',
		'@nuxt/test-utils',
	],

	ssr: false,

	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],

	imports: {
		presets: [
			{
				from: 'es-toolkit',
				imports: ['esToolkit'],
			},
		],
	},

	devtools: { enabled: true },

	css: ['~/assets/css/main.css'],

	runtimeConfig: {
		baseURL: `https://${import.meta.env.DOMAIN}/${import.meta.env.SERVER_TYPE}`,
		password: import.meta.env.PASSWORD,
		serverType: import.meta.env.SERVER_TYPE,
		domain: import.meta.env.DOMAIN,
	},

	devServer: {
		port: 3001,
	},

	experimental: {
		viteEnvironmentApi: true,
	},

	compatibilityDate: '2024-11-01',

	nitro: {
		preset: 'bun',
	},

	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			include: ['@vue/devtools-core', '@vue/devtools-kit', 'es-toolkit'],
		},
	},

	fonts: {
		provider: 'local',
		assets: {
			strategy: 'public',
		},
		families: [
			{
				provider: 'local',
				name: 'iransans',
				weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
			},
		],
	},
});
