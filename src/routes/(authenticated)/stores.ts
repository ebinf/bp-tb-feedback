import { PUBLIC_SITE_NAME } from '$env/static/public';
import { writable } from 'svelte/store';

function setTitle() {
	const { subscribe, set, update } = writable(PUBLIC_SITE_NAME);

	return {
		subscribe,
		set: (value: string) => {
			set(`${value} | ${PUBLIC_SITE_NAME}`);
		},
		clear: () => {
			set(PUBLIC_SITE_NAME);
		}
	};
}

export const title = setTitle();

export const heading = writable('');
