import { c as create_ssr_component, a as add_attribute, v as validate_component, d as each, e as escape } from './ssr-8OMWU1VZ.js';
import { B as Button } from './Button-goLe5f9F.js';
import './Theme.svelte_svelte_type_style_lang-CaBZdtLr.js';
import { M as MessageContainer } from './MessageContainer-6FswJYeI.js';
import './index-DVXcTV5k.js';

const limit = 10;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let API = "/api/v2/forbes-billonaires";
  let companies = [];
  let errorMsg = "";
  let Msg = "";
  let currentPage = 1;
  let offset = 0;
  let search = {
    rank: null,
    name: "",
    country: "",
    sale: null,
    profit: null,
    asset: null,
    market_value: null,
    year: null
  };
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
      let response = await fetch(`${API}/?offset=${offset}&limit=${limit}`, { method: "GET" });
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
  return `<div><h2 data-svelte-h="svelte-10oc9be">Buscar por campos</h2> <input type="number" placeholder="Ranking"${add_attribute("value", search.rank, 0)}> <input placeholder="Nombre Compañia"${add_attribute("value", search.name, 0)}> <input placeholder="País"${add_attribute("value", search.country, 0)}> <input placeholder="Ventas"${add_attribute("value", search.sale, 0)}> <input placeholder="Beneficio"${add_attribute("value", search.profit, 0)}> <input placeholder="Activos"${add_attribute("value", search.asset, 0)}> <input placeholder="Valor de Mercado"${add_attribute("value", search.market_value, 0)}> <input placeholder="Año"${add_attribute("value", search.year, 0)}></div> ${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Buscar`;
    }
  })} <table><thead data-svelte-h="svelte-1lad2ry"><tr><th>Ranking</th> <th>Nombre</th> <th>Pais</th> <th>Ventas</th> <th>Beneficio</th> <th>Activos</th> <th>Valor de mercado</th> <th>Año</th></tr></thead> <tbody><tr><td><input type="number"${add_attribute("value", newCompany.rank, 0)}></td> <td><input${add_attribute("value", newCompany.name, 0)}></td> <td><input${add_attribute("value", newCompany.country, 0)}></td> <td><input type="number"${add_attribute("value", newCompany.sale, 0)}></td> <td><input type="number"${add_attribute("value", newCompany.profit, 0)}></td> <td><input type="number"${add_attribute("value", newCompany.asset, 0)}></td> <td><input type="number"${add_attribute("value", newCompany.market_value, 0)}></td> <td><input type="number"${add_attribute("value", newCompany.year, 0)}></td> <td>${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
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
  })} <div>${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Página anterior`;
    }
  })} <span>Página actual: ${escape(currentPage)}</span> ${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Página siguiente`;
    }
  })}</div> ${validate_component(MessageContainer, "MessageContainer").$$render($$result, { Msg, errorMsg }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-avPY4uJy.js.map
