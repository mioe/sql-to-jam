import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ command, mode }) => {
	// eslint-disable-next-line no-console
	console.log('🦕 vite.config.ts/defineConfig', command, mode)
	const isDev = command === 'build' && mode === 'development'

	return {
		build: {
			emptyOutDir: true,

			rollupOptions: {
				input: path.resolve(__dirname, 'src/main.tsx'),
				external: [],

				output: {
					entryFileNames: 'main.js',
					format: 'iife',
					sourcemap: isDev ? 'inline' : false,
					inlineDynamicImports: true,
					manualChunks: undefined,
					name: 'FigmaWidget',
				},
			},

			target: 'es2020',
			assetsInlineLimit: 100000000,
			cssCodeSplit: false,
			minify: isDev ? false : 'esbuild',
			watch: isDev ? {} : null,
		},

		server: {
			hmr: false,
			open: false,
		},

		esbuild: {
			jsx: 'transform',
			jsxFactory: 'figma.widget.h',
			jsxFragment: 'figma.widget.Fragment',
			target: 'es2020',
			keepNames: true,
		},

		resolve: {
			alias: {
				'~/': `${path.resolve(__dirname, 'src')}/`,
			},
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
		},

		css: {
			modules: false,
		},

		optimizeDeps: {
			include: [],
			exclude: ['@figma/widget-typings', '@figma/plugin-typings'],
		},

		plugins: [
			{
				name: 'figma-size-validator',
				writeBundle(_options, bundle) {
					const codeFile = bundle['main.js']
					if (codeFile && codeFile.type === 'chunk') {
						// eslint-disable-next-line node/prefer-global/buffer
						const sizeKB = Buffer.byteLength(codeFile.code, 'utf8') / 1024
						const timestamp = new Date().toLocaleTimeString()
						console.warn(`📦 [${timestamp}] Widget rebuilt: ${sizeKB.toFixed(2)} KB`)

						if (sizeKB > 500) {
							console.warn(`⚠️  Large bundle size: ${sizeKB.toFixed(2)} KB (>500 KB)`)
						}
					}
				},
			},
		],
	}
})
