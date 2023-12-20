/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';
import forms from '@tailwindcss/forms';
import aspect_ratio from '@tailwindcss/aspect-ratio';
import typography from '@tailwindcss/typography';

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
	plugins: [forms, aspect_ratio, typography]
};
