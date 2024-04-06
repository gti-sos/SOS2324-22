import { c as create_ssr_component, a as add_attribute, v as validate_component, d as each, e as escape } from './ssr-8OMWU1VZ.js';
import { B as Button } from './Button-snFNEjpP.js';
import './Theme.svelte_svelte_type_style_lang-CaBZdtLr.js';
import { M as MessageContainer } from './MessageContainer-C8_bKTnO.js';
import './index-DVXcTV5k.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let API = "/api/v2/forbes-billonaires";
  let companies = [];
  let errorMsg = "";
  let Msg = "";
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
      if (response.status === 200) {
      } else if (companies.length === 0) {
        Msg = "La lista esta vacía";
        setTimeout(
          () => {
            Msg = "";
          },
          3e3
        );
      } else if (response.status === 400) {
        errorMsg = "Formato incorrecto";
        setTimeout(
          () => {
            Msg = "";
          },
          3e3
        );
      } else {
        errorMsg = "Error cargando compañias";
        setTimeout(
          () => {
            errorMsg = "";
          },
          3e3
        );
      }
    } catch (e) {
      errorMsg = e;
    }
  }
  if ($$props.getForbes_billonaires === void 0 && $$bindings.getForbes_billonaires && getForbes_billonaires !== void 0)
    $$bindings.getForbes_billonaires(getForbes_billonaires);
  return `<table><thead data-svelte-h="svelte-1nw8pxq"><tr><th>Ranking</th> <th>Nombre</th> <th>Pais</th> <th>Ventas</th> <th>Beneficio</th> <th>Activos</th> <th>Valor de mercado</th> <th>Año</th></tr></thead> <tbody><tr><td><input${add_attribute("value", newCompany.rank, 0)}></td> <td><input${add_attribute("value", newCompany.name, 0)}></td> <td><input${add_attribute("value", newCompany.country, 0)}></td> <td><input${add_attribute("value", newCompany.sale, 0)}></td> <td><input${add_attribute("value", newCompany.profit, 0)}></td> <td><input${add_attribute("value", newCompany.asset, 0)}></td> <td><input${add_attribute("value", newCompany.market_value, 0)}></td> <td><input${add_attribute("value", newCompany.year, 0)}></td> <td>${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Crear`;
    }
  })}</td></tr></tbody></table> <ul>${each(companies, (company) => {
    return `<li><a href="${"/forbes-billonaires/" + escape(company.name, true) + "/" + escape(company.country, true)}">${escape(company.name)}</a>- ${escape(company.profit)}</li> ${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
      default: () => {
        return `Borrar`;
      }
    })}`;
  })}</ul> ${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
    default: () => {
      return `Borrar todo`;
    }
  })} ${validate_component(MessageContainer, "MessageContainer").$$render($$result, { Msg, errorMsg }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BbaLE394.js.map
