

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.DPNStf0I.js","_app/immutable/chunks/scheduler.Dc1jLLu_.js","_app/immutable/chunks/index.DHEfdUHM.js"];
export const stylesheets = ["_app/immutable/assets/2.DpdwFXLn.css"];
export const fonts = [];
