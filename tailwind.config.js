/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

export default {
	content: ['./src/**/*.{svelte,html,js,ts}'],
	theme: {
		extend: {
			colors: {
				primary: colors.orange,
				secondary: colors.blue
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography')
	]
};
