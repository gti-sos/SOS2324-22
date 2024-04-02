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
  let API = "/api/v2/top-richest";
  let people = [];
  let errorMsg = "";
  let Msg = "";
  const newPerson = {
    name: "Elon Musk",
    net_worth: 240,
    bday_year: 1971,
    age: 51,
    nationality: "South Africa"
  };
  async function getMillonarios() {
    try {
      let response = await fetch(API, { method: "GET" });
      let data = await response.json();
      people = data;
      if (response.status === 200) {
        Msg = "Millonarios creados con éxito";
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
        errorMsg = "Error cargando millonarios";
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
  if ($$props.getMillonarios === void 0 && $$bindings.getMillonarios && getMillonarios !== void 0)
    $$bindings.getMillonarios(getMillonarios);
  $$result.css.add(css);
  return `<table><thead data-svelte-h="svelte-ue9brp"><tr><th>Nombre</th> <th>Patrimonio neto</th> <th>Año de nacimiento</th></tr></thead> <tbody><tr><td><input class="svelte-1316pci"${add_attribute("value", newPerson.name, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.net_worth, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.bday_year, 0)}></td></tr></tbody> <thead data-svelte-h="svelte-bia0wa"><tr><th>Edad</th> <th>Nacionalidad</th></tr></thead> <tbody><td><input class="svelte-1316pci"${add_attribute("value", newPerson.age, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.nationality, 0)}></td> <td>${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Crear`;
    }
  })}</td></tbody></table> <ul>${each(people, (person) => {
    return `<div class="person-container svelte-1316pci"><li class="svelte-1316pci"><a href="${"/top-richest/" + escape(person.name, true) + "/" + escape(person.nationality, true)}">${escape(person.name)}</a>- ${escape(person.net_worth)}</li> ${validate_component(Button, "Button").$$render($$result, { class: "delete-button", color: "danger" }, {}, {
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
//# sourceMappingURL=_page.svelte-BMYTpWYs.js.map
