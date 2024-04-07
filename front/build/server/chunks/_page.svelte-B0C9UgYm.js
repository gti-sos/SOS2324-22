import { c as create_ssr_component, f as subscribe, v as validate_component } from './ssr-8OMWU1VZ.js';
import { p as page } from './stores-CVnEgEEw.js';
import './Theme.svelte_svelte_type_style_lang-CaBZdtLr.js';
import { M as MessageContainer } from './MessageContainer-6FswJYeI.js';
import './exports-DuWZopOC.js';
import './index-DVXcTV5k.js';

const css = {
  code: "input.svelte-1b14d9v{width:200px;border:1px solid #ccc;padding:5px;font-size:16px}",
  map: null
};
const API_BASE = (
  /*'https://sos2324-22.appspot.com' ||*/
  "http://localhost:10000"
);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let person = $page.params;
  `${API_BASE}/api/v2/forbes-billionaires-list/${person.rank}`;
  let errorMsg = "";
  let Msg = "";
  $$result.css.add(css);
  $$unsubscribe_page();
  return `${`<p data-svelte-h="svelte-1m4dz9i">Esta persona no existe.</p>`} ${``} ${validate_component(MessageContainer, "MessageContainer").$$render($$result, { Msg, errorMsg }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-B0C9UgYm.js.map
