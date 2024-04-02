import { c as create_ssr_component, f as subscribe, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import "../../../../chunks/Theme.svelte_svelte_type_style_lang.js";
import { M as MessageContainer } from "../../../../chunks/MessageContainer.js";
const css = {
  code: "input.svelte-1b14d9v{width:200px;border:1px solid #ccc;padding:5px;font-size:16px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let person = $page.params;
  const API_BASE = "https://sos2324-22.appspot.com";
  `${API_BASE}/api/v2/forbes-billionaires-list/${person.rank}`;
  let errorMsg = "";
  let Msg = "";
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<h2>Details of ${escape(person.name)}</h2> <hr> ${``} ${validate_component(MessageContainer, "MessageContainer").$$render($$result, { Msg, errorMsg }, {}, {})}`;
});
export {
  Page as default
};
