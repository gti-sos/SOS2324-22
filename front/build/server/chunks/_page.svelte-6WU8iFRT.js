import { c as create_ssr_component, a as add_attribute, v as validate_component, d as each, e as escape } from './ssr-8OMWU1VZ.js';
import { B as Button } from './Button-snFNEjpP.js';
import './Theme.svelte_svelte_type_style_lang-CaBZdtLr.js';
import { M as MessageContainer } from './MessageContainer-C8_bKTnO.js';
import './index-DVXcTV5k.js';

const css = {
  code: "input.svelte-1316pci.svelte-1316pci{width:200px;border:1px solid #ccc;padding:5px;font-size:16px}.person-container.svelte-1316pci.svelte-1316pci{display:flex;align-items:center;margin:1rem 0}.person-container.svelte-1316pci li.svelte-1316pci{margin-right:1rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const API_BASE = "https://sos2324-22.appspot.com";
  const API = `${API_BASE}/api/v2/forbes-billionaires-list`;
  let people = [];
  let errorMsg = "";
  let Msg = "";
  const newPerson = {
    rank: 11,
    name: "Bernardose Arnault family",
    net_worth: 211,
    age: 74,
    country: "France",
    source: "LVMH",
    industry: "Fashion"
  };
  async function getForBillionaires() {
    try {
      let response = await fetch(API, { method: "GET" });
      let data = await response.json();
      people = data;
      if (response.status === 200) {
        Msg = "Billonarios creados con éxito";
        setTimeout(
          () => {
            Msg = "";
          },
          3e3
        );
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
  return `<table><thead data-svelte-h="svelte-g90tak"><tr><th>Puesto</th> <th>Nombre</th> <th>Patrimonio neto (billones)</th> <th>Edad</th></tr></thead> <tbody><tr><td><input class="svelte-1316pci"${add_attribute("value", newPerson.rank, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.name, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.net_worth, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.age, 0)}></td></tr></tbody> <thead data-svelte-h="svelte-1mw0dur"><tr><th>País</th> <th>Empresa</th> <th>Industria</th></tr></thead> <tbody><td><input class="svelte-1316pci"${add_attribute("value", newPerson.country, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.source, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.industry, 0)}></td> <td>${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Crear`;
    }
  })}</td></tbody></table> <ul>${each(people, (person) => {
    return `<div class="person-container svelte-1316pci"><li class="svelte-1316pci"><a href="${"/forbes-billionaires-list/" + escape(person.rank, true)}">${escape(person.name)}</a>- ${escape(person.net_worth)}</li> ${validate_component(Button, "Button").$$render($$result, { class: "delete-button", color: "danger" }, {}, {
      default: () => {
        return `Borrar`;
      }
    })}</div>`;
  })}</ul> ${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
    default: () => {
      return `Borrar todo`;
    }
  })} ${validate_component(MessageContainer, "MessageContainer").$$render($$result, { Msg, errorMsg }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-6WU8iFRT.js.map
