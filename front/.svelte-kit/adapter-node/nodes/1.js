

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.DVf6gtts.js","_app/immutable/chunks/scheduler.wWR6jiGY.js","_app/immutable/chunks/index.j2r2S6jy.js"];
export const stylesheets = [];
export const fonts = [];
