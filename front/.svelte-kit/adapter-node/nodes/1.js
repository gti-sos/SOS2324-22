

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.DKvrG2-r.js","_app/immutable/chunks/scheduler.Dc1jLLu_.js","_app/immutable/chunks/index.USbQfvAI.js"];
export const stylesheets = [];
export const fonts = [];
