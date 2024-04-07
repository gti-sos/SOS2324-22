import { c as create_ssr_component, a as add_attribute, v as validate_component, b as add_styles, d as each, e as escape } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import "../../../chunks/Theme.svelte_svelte_type_style_lang.js";
import { M as MessageContainer } from "../../../chunks/MessageContainer.js";
const css = {
  code: "input.svelte-1316pci.svelte-1316pci{width:200px;border:1px solid #ccc;padding:5px;font-size:16px}.person-container.svelte-1316pci.svelte-1316pci{display:flex;align-items:center;margin:1rem 0}.person-container.svelte-1316pci li.svelte-1316pci{margin-right:1rem}",
  map: null
};
const limit = 10;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let API = "/api/v2/famous-people";
  let people = [];
  let errorMsg = "";
  let Msg = "";
  let currentPage = 1;
  let offset = 0;
  let search = {
    name: "",
    short_description: "",
    gender: "",
    country: "",
    occupation: "",
    birth_year: null,
    death_year: null,
    age_of_death: null
  };
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
  return `<div><h2 data-svelte-h="svelte-10oc9be">Buscar por campos</h2> <input placeholder="Nombre" class="svelte-1316pci"${add_attribute("value", search.name, 0)}> <input placeholder="Breve descripcion" class="svelte-1316pci"${add_attribute("value", search.short_description, 0)}> <input placeholder="Género" class="svelte-1316pci"${add_attribute("value", search.gender, 0)}> <input placeholder="País" class="svelte-1316pci"${add_attribute("value", search.country, 0)}> <input placeholder="Profesión" class="svelte-1316pci"${add_attribute("value", search.occupation, 0)}> <input placeholder="Año de nacimiento" class="svelte-1316pci"${add_attribute("value", search.birth_year, 0)}> <input placeholder="Año de fallecimiento" class="svelte-1316pci"${add_attribute("value", search.death_year, 0)}> <input placeholder="Edad de muerte" class="svelte-1316pci"${add_attribute("value", search.age_of_death, 0)}></div> ${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Buscar`;
    }
  })} <table><thead data-svelte-h="svelte-yas1z9"><tr><th>Nombre</th> <th>Breve descripción</th> <th>Género</th> <th>País</th></tr></thead> <tbody><tr><td><input class="svelte-1316pci"${add_attribute("value", newPerson.name, 0)}></td> <td><input class="svelte-1316pci"${add_styles({
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
export {
  Page as default
};
