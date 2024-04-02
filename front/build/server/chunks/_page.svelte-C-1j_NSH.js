import { c as create_ssr_component, a as add_attribute, b as add_styles, v as validate_component, d as each, e as escape } from './ssr-8OMWU1VZ.js';
import { B as Button } from './Button-snFNEjpP.js';
import './Theme.svelte_svelte_type_style_lang-CaBZdtLr.js';
import { M as MessageContainer } from './MessageContainer-C8_bKTnO.js';
import './index-DVXcTV5k.js';

const css = {
  code: "input.svelte-1316pci.svelte-1316pci{width:200px;border:1px solid #ccc;padding:5px;font-size:16px}.person-container.svelte-1316pci.svelte-1316pci{display:flex;align-items:center;margin:1rem 0}.person-container.svelte-1316pci li.svelte-1316pci{margin-right:1rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let API = "/api/v2/famous-people";
  let people = [];
  let errorMsg = "";
  let Msg = "";
  const newPerson = {
    name: "Mariano Rajoy",
    short_description: " president of Spain",
    gender: "Male",
    country: "Spain",
    occupation: "Politician",
    birth_year: 1950,
    death_year: 2039,
    age_of_death: 89
  };
  async function getPeople() {
    try {
      let response = await fetch(API, { method: "GET" });
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
      } else if (response.status === 400) {
        errorMsg = "Formato incorrecto";
        setTimeout(
          () => {
            errorMsg = "";
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
  if ($$props.getPeople === void 0 && $$bindings.getPeople && getPeople !== void 0)
    $$bindings.getPeople(getPeople);
  $$result.css.add(css);
  return `<table><thead data-svelte-h="svelte-yas1z9"><tr><th>Nombre</th> <th>Breve descripción</th> <th>Género</th> <th>País</th></tr></thead> <tbody><tr><td><input class="svelte-1316pci"${add_attribute("value", newPerson.name, 0)}></td> <td><input class="svelte-1316pci"${add_styles({
    "width": newPerson.short_description.length * 8 + "px"
  })}${add_attribute("value", newPerson.short_description, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.gender, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.country, 0)}></td></tr></tbody> <thead data-svelte-h="svelte-1w7yoi0"><tr><th>Profesión</th> <th>Año de nacimiento</th> <th>Año de fallecimiento</th> <th>Edad de muerte</th></tr></thead> <tbody><td><input class="svelte-1316pci"${add_attribute("value", newPerson.occupation, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.birth_year, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.death_year, 0)}></td> <td><input class="svelte-1316pci"${add_attribute("value", newPerson.age_of_death, 0)}></td> <td>${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Crear`;
    }
  })}</td></tbody></table> <ul>${each(people, (person) => {
    return `<div class="person-container svelte-1316pci"><li class="svelte-1316pci"><a href="${"/famous-people/" + escape(person.name, true) + "/" + escape(person.country, true)}">${escape(person.name)}</a>- ${escape(person.gender)}</li> ${validate_component(Button, "Button").$$render($$result, { class: "delete-button", color: "danger" }, {}, {
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
//# sourceMappingURL=_page.svelte-C-1j_NSH.js.map
