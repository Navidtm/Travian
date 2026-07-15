// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite';
import { createResolver } from 'nuxt/kit';

const { resolve } = createResolver(import.meta.url);

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

	devtools: { enabled: true },

	css: ['~/assets/css/main.css'],

	runtimeConfig: {
		password: import.meta.env.PASSWORD,
		domain: import.meta.env.DOMAIN,
	},

	devServer: {
		port: 3001,
	},

	experimental: {
		viteEnvironmentApi: true,
		typedPages: true,
		asyncContext: true,
		buildCache: true,
		headNext: true,
		lazyHydration: true,
		componentIslands: 'auto',
		watcher: 'parcel',
		typescriptPlugin: true,
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

	icon: {
		mode: 'css',
		cssLayer: 'base',
		provider: 'none',
		clientBundle: {
			scan: true,
		},
		size: '16px',
		customCollections: [
			{
				prefix: 'icon',
				dir: resolve('./assets/icons'),
			},
		],
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
