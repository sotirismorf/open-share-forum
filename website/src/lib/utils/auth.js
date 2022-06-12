import { writable } from 'svelte/store';

export const store = writable(null);

export const course = writable(null)

export const logout = () => store.set(null);
