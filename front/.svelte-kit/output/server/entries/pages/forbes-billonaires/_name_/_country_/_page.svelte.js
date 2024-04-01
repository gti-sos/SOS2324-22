import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute, v as validate_component } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import { B as Button } from "../../../../../chunks/Button.js";
import "../../../../../chunks/Theme.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let company = $page.params;
  `http://localhost:10000/forbes-billonaires/${company.name}/${company.country}`;
  $$unsubscribe_page();
  return `Details of ${escape(company.name)} <table><thead data-svelte-h="svelte-4qbcan"><tr><th>Rank</th> <th>Name</th> <th>Country</th> <th>Sale</th> <th>Profit</th> <th>Asset</th> <th>Market value</th> <th>Year</th></tr></thead> <tbody><tr><td><input${add_attribute("value", company.rank, 0)}></td> <td><input${add_attribute("value", company.name, 0)}></td> <td><input${add_attribute("value", company.country, 0)}></td> <td><input${add_attribute("value", company.sale, 0)}></td> <td><input${add_attribute("value", company.profit, 0)}></td> <td><input${add_attribute("value", company.asset, 0)}></td> <td><input${add_attribute("value", company.market_value, 0)}></td> <td><input${add_attribute("value", company.year, 0)}></td> <td>${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Actualizar`;
    }
  })}</td></tr></tbody></table> ${``} ${``}`;
});
export {
  Page as default
};
