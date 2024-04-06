

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BQGo339Z.js","_app/immutable/chunks/scheduler.Dc1jLLu_.js","_app/immutable/chunks/index.USbQfvAI.js"];
export const stylesheets = [];
export const fonts = [];
