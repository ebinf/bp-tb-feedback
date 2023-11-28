module.exports = {
	root: true,
	plugins: ['svelte', '@typescript-eslint'],
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:svelte/recommended',
		'prettier',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
