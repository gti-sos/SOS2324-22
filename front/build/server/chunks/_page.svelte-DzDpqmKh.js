import { c as create_ssr_component, b as add_attribute, v as validate_component, d as each, e as escape } from './ssr-TARzJ76-.js';
import { B as Button } from './Button-P1b_t463.js';
import './Theme.svelte_svelte_type_style_lang-CYVsGOOs.js';
import './index-DNBBKB0h.js';

let API = "http://localhost:10000/api/v1/forbes-billonaires";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let companies = [];
  let errorMsg = "";
  const newCompany = {
    rank: 20,
    name: "Honda",
    country: "Japon",
    sale: 15.381,
    profit: 41.9837,
    asset: 347.238,
    market_value: 229.805,
    year: 2018
  };
  async function getForbes_billonaires() {
    try {
      let response = await fetch(API, { method: "GET" });
      let data = await response.json();
      companies = data;
      console.log(data);
    } catch (e) {
      errorMsg = e;
    }
  }
  if ($$props.getForbes_billonaires === void 0 && $$bindings.getForbes_billonaires && getForbes_billonaires !== void 0)
    $$bindings.getForbes_billonaires(getForbes_billonaires);
  return `<table><thead data-svelte-h="svelte-mb1v5r"><tr><th>Rank</th> <th>Name</th> <th>Country</th> <th>Sale</th> <th>Profit</th> <th>Asset</th> <th>Market value</th> <th>Year</th></tr></thead> <tbody><tr><td><input${add_attribute("value", newCompany.rank, 0)}></td> <td><input${add_attribute("value", newCompany.name, 0)}></td> <td><input${add_attribute("value", newCompany.country, 0)}></td> <td><input${add_attribute("value", newCompany.sale, 0)}></td> <td><input${add_attribute("value", newCompany.profit, 0)}></td> <td><input${add_attribute("value", newCompany.asset, 0)}></td> <td><input${add_attribute("value", newCompany.market_value, 0)}></td> <td><input${add_attribute("value", newCompany.year, 0)}></td> <td>${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Crear`;
    }
  })}</td></tr></tbody></table> <ul>${each(companies, (company) => {
    return `<li><a href="${"/forbes-billonaires/" + escape(company.name, true) + "/" + escape(company.country, true)}">${escape(company.name)}</a>- ${escape(company.profit)}</li> ${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
      default: () => {
        return `Borrar`;
      }
    })}`;
  })}</ul> ${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
    default: () => {
      return `Borrar todo`;
    }
  })} ${``} ${errorMsg != "" ? `<hr>
    ERROR: ${escape(errorMsg)}` : ``}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DzDpqmKh.js.map
