import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute, v as validate_component } from './ssr-TARzJ76-.js';
import { p as page } from './stores-CaFEqPw8.js';
import { B as Button } from './Button-P1b_t463.js';
import './Theme.svelte_svelte_type_style_lang-CYVsGOOs.js';
import './exports-DuWZopOC.js';
import './index-DNBBKB0h.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let person = $page.params;
  `http://localhost:10000/famous-people/${person.name}/${person.country}`;
  $$unsubscribe_page();
  return `Details of ${escape(person.name)} <table><thead data-svelte-h="svelte-1pommon"><tr><th>Nombre</th> <th>País</th></tr></thead> <tbody><tr><td><input${add_attribute("value", person.name, 0)}></td> <td><input${add_attribute("value", person.country, 0)}></td> <td>${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Actualizar`;
    }
  })}</td></tr></tbody></table> ${``} ${``}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Dynx7DUo.js.map
