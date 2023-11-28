import { PUBLIC_SITE_NAME } from '$env/static/public';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

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

type Notification = {
	id: number;
	message: string;
	title: string;
	style: 'success' | 'fail' | 'warning' | 'info';
	permanent: boolean;
};

const notifications: Writable<Notification[]> = writable([]);
let lastId = 0;

export function createNotification(
	message: string,
	title: string,
	style: 'success' | 'fail' | 'warning' | 'info' = 'success',
	permanent = false
) {
	const id = lastId++;
	notifications.update((state) => {
		return [...state, { id, message, title, style, permanent }];
	});
	setTimeout(() => {
		notification.remove(id);
	}, 5000);
}

export const notification = {
	subscribe: notifications.subscribe,
	remove: (id: number) => {
		notifications.update((state) => {
			return [...state.filter((item) => item.id !== id)];
		});
	}
};
