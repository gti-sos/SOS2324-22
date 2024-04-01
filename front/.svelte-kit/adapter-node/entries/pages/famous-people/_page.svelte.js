import { c as create_ssr_component, b as add_attribute, v as validate_component, d as each, e as escape } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import "../../../chunks/Theme.svelte_svelte_type_style_lang.js";
let API = "http://localhost:10000/api/v1/famous-people";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let people = [];
  let errorMsg = "";
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
      console.log(data);
    } catch (e) {
      errorMsg = e;
    }
  }
  if ($$props.getPeople === void 0 && $$bindings.getPeople && getPeople !== void 0)
    $$bindings.getPeople(getPeople);
  return `<table><thead data-svelte-h="svelte-y4krlx"><tr><th>Nombre</th> <th>Breve descripción</th> <th>Género</th> <th>País</th> <th>Profesión</th> <th>Año de nacimiento</th> <th>Año de fallecimiento</th> <th>Edad de muerte</th></tr></thead> <tbody><tr><td><input${add_attribute("value", newPerson.name, 0)}></td> <td><input${add_attribute("value", newPerson.short_description, 0)}></td> <td><input${add_attribute("value", newPerson.gender, 0)}></td> <td><input${add_attribute("value", newPerson.country, 0)}></td> <td><input${add_attribute("value", newPerson.occupation, 0)}></td> <td><input${add_attribute("value", newPerson.birth_year, 0)}></td> <td><input${add_attribute("value", newPerson.death_year, 0)}></td> <td><input${add_attribute("value", newPerson.age_of_death, 0)}></td> <td>${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Crear`;
    }
  })}</td></tr></tbody></table> <ul>${each(people, (person) => {
    return `<li><a href="${"/famous-people/" + escape(person.name, true) + "/" + escape(person.country, true)}">${escape(person.name)}</a>- ${escape(person.gender)}</li> ${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
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
export {
  Page as default
};
