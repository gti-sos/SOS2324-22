

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.I-x1xuYh.js","_app/immutable/chunks/scheduler.wWR6jiGY.js","_app/immutable/chunks/index.BrUfcjbG.js"];
export const stylesheets = ["_app/immutable/assets/2.DpdwFXLn.css"];
export const fonts = [];
