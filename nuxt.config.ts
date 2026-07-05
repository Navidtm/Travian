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
				imports: ['es-toolkit'],
			},
		],
	},

	devtools: { enabled: true },

	css: ['~/assets/css/main.css'],

	runtimeConfig: {
		baseURL: `https://${process.env.DOMAIN}/${process.env.SERVER_TYPE}`,
		username: process.env.USER,
		password: process.env.PASSWORD,
		serverType: process.env.SERVER_TYPE,
		domain: process.env.DOMAIN,
		id: process.env.PHPSESSID,
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
			include: ['es-toolkit'],
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
