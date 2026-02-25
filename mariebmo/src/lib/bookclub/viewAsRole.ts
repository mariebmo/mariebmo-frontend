import { writable } from 'svelte/store';

export type ViewAsRole = 'admin' | 'member';

export const viewAsRole = writable<ViewAsRole>('admin');
