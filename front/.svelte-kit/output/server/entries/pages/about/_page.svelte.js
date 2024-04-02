import { c as create_ssr_component, e as escape } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mode = "production";
  return `<h1>Ahora mismo estás en ${escape(mode)}</h1>`;
});
export {
  Page as default
};
