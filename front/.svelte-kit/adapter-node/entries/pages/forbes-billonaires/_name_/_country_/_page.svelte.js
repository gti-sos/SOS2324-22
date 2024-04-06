import { c as create_ssr_component, f as subscribe, v as validate_component } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/Theme.svelte_svelte_type_style_lang.js";
import { M as MessageContainer } from "../../../../../chunks/MessageContainer.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let company = $page.params;
  "/api/v2/forbes-billonaires/" + company.name + "/" + company.country;
  let errorMsg = "";
  let Msg = "";
  $$unsubscribe_page();
  return `${`<p data-svelte-h="svelte-1e4eww8">Esta persona no existe</p>`} ${``} ${validate_component(MessageContainer, "MessageContainer").$$render($$result, { Msg, errorMsg }, {}, {})}`;
});
export {
  Page as default
};
