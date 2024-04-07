import { c as create_ssr_component, a as add_attribute, v as validate_component, d as each, e as escape } from './ssr-8OMWU1VZ.js';
import { B as Button } from './Button-goLe5f9F.js';
import './Theme.svelte_svelte_type_style_lang-CaBZdtLr.js';
import { M as MessageContainer } from './MessageContainer-6FswJYeI.js';
import './index-DVXcTV5k.js';

const css = {
  code: "input.svelte-1316pci.svelte-1316pci{width:200px;border:1px solid #ccc;padding:5px;font-size:16px}.person-container.svelte-1316pci.svelte-1316pci{display:flex;align-items:center;margin:1rem 0}.person-container.svelte-1316pci li.svelte-1316pci{margin-right:1rem}",
  map: null
};
const API_BASE = (
  /*'https://sos2324-22.appspot.com' ||*/
  "http://localhost:10000"
);
const limit = 10;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const API = `${API_BASE}/api/v2/forbes-billionaires-list`;
  let people = [];
  let errorMsg = "";
  let Msg = "";
  let currentPage = 1;
  let offset = 0;
  const newPerson = {
    rank: 11,
    name: "Bernardose Arnault family",
    net_worth: 211,
    age: 74,
    country: "France",
    source: "LVMH",
    industry: "Fashion"
  };
  let search = {
    rank: "",
    name: "",
    net_worth: "",
    age: "",
    country: "",
    source: "",
    industry: ""
  };
  async function getForBillionaires() {
    try {
      let response = await fetch(`${API}/?offset=${offset}&limit=${limit}`, { method: "GET" });
      let data = await response.json();
      people = data;
      if (response.status === 200) {
      } else if (people.length === 0) {
        Msg = "La lista esta vacía";
        setTimeout(
          () => {
            Msg = "";
          },
          3e3
        );
      } else {
        errorMsg = "Error cargando personas";
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
  if ($$props.getForBillionaires === void 0 && $$bindings.getForBillionaires && getForBillionaires !== void 0)
    $$bindings.getForBillionaires(getForBillionaires);
  $$result.css.add(css);
  return `<div data-svelte-h="svelte-jxvrg6"><h2>Buscar por campos</h2></div> <input placeholder="Rank" class="svelte-1316pci"${add_attribute("value", search.rank, 0)}> <input placeholder="Nombre" class="svelte-1316pci"${add_attribute("value", search.name, 0)}> <input placeholder="Patrimonio neto" class="svelte-1316pci"${add_attribute("value", search.net_worth, 0)}> <input placeholder="Edad" class="svelte-1316pci"${add_attribute("value", search.age, 0)}> <input placeholder="País" class="svelte-1316pci"${add_attribute("value", search.country, 0)}> <input placeholder="Empresa" class="svelte-1316pci"${add_attribute("value", search.source, 0)}> <input placeholder="Industria" class="svelte-1316pci"${add_attribute("value", search.industry, 0)}> ${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Buscar`;
    }
  })} <ul>${each(people, (person) => {
    return `<div class="person-container svelte-1316pci"><li class="svelte-1316pci"><a href="${"/forbes-billionaires-list/" + escape(person.rank, true)}">${escape(person.name)}</a>- ${escape(person.net_worth)}</li> ${validate_component(Button, "Button").$$render($$result, { class: "delete-button", color: "danger" }, {}, {
      default: () => {
        return `Borrar`;
      }
    })}</div>`;
  })}</ul> <div data-svelte-h="svelte-ob8lhq"><h2>Crear un nuevo billonario</h2></div> <table><thead data-svelte-h="svelte-g90tak"><tr><th>Puesto</th> <th>Nombre</th> <th>Patrimonio neto (billones)</th> <th>Edad</th></tr></thead> <tbody><tr><td><input class="svelte-1316pci"${add_attribute("value", newPerson.rank, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.name, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.net_worth, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.age, 0)}></td></tr></tbody> <thead data-svelte-h="svelte-1mw0dur"><tr><th>País</th> <th>Empresa</th> <th>Industria</th></tr></thead> <tbody><td><input class="svelte-1316pci"${add_attribute("value", newPerson.country, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.source, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.industry, 0)}></td> <td>${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Crear`;
    }
  })}</td></tbody></table> <div>${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Página anterior`;
    }
  })} <span>Página actual: ${escape(currentPage)}</span> ${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Página siguiente`;
    }
  })}</div> ${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
    default: () => {
      return `Borrar todo`;
    }
  })} ${validate_component(MessageContainer, "MessageContainer").$$render($$result, { Msg, errorMsg }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Bv_O_40o.js.map
