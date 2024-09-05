import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		vueDevTools(),
		AutoImport({
			imports: [
				'vue',
				{
					vue: ['createElementVNode']
				},
				{
					from: 'vue',
					imports: ['CSSProperties', 'SetupContext', 'ShallowRef'],
					type: true
				}
			],
			// ignore: ['h'],
			resolvers: [],
			dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url))
		}),
		Components({
			resolvers: [],
			dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url))
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	server: {
		open: true,
		hmr: true,
		port: 2232
	}
})

