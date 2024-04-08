

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.DzWT90TR.js","_app/immutable/chunks/scheduler.wWR6jiGY.js","_app/immutable/chunks/index.j2r2S6jy.js"];
export const stylesheets = [];
export const fonts = [];
