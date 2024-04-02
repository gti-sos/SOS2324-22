export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/about": [3],
		"/famous-people": [4],
		"/famous-people/[name]/[country]": [5],
		"/forbes-billionaires-list": [6],
		"/forbes-billionaires-list/[rank]": [7],
		"/forbes-billonaires": [8],
		"/forbes-billonaires/[name]/[country]": [9],
		"/top-richest": [10],
		"/top-richest/[name]/[nationality]": [11]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';