import antfu from '@antfu/eslint-config'

export default antfu({
	type: 'app',
	typescript: true,
	formatters: true,

	stylistic: {
		indent: 'tab',
		semi: false,
		quotes: 'single',
	},

	ignores: [
		'**/fixtures',
	],
}, {
	rules: {
		'no-console': ['warn'],
		'antfu/no-top-level-await': ['off'],
		'node/prefer-global/process': ['off'],
		'node/no-process-env': ['error'],
		'perfectionist/sort-imports': ['error', {
			tsconfigRootDir: '.',
		}],
		'unicorn/filename-case': ['error', {
			case: 'kebabCase',
			ignore: ['README.md'],
		}],
		'style/comma-dangle': ['error', 'always-multiline'],
	},
})
