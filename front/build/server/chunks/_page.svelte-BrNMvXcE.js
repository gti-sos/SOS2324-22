import { c as create_ssr_component, v as validate_component, d as each, a as add_attribute, e as escape, g as compute_rest_props, h as spread, i as escape_object, j as escape_attribute_value } from './ssr-8OMWU1VZ.js';
import { B as Button, i as isObject, g as getColumnSizeClass, c as classnames } from './Button-goLe5f9F.js';
import './Theme.svelte_svelte_type_style_lang-CaBZdtLr.js';
import './index-DVXcTV5k.js';

/* empty css                                                             */
const Col = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "xs", "sm", "md", "lg", "xl", "xxl"]);
  let { class: className = "" } = $$props;
  let { xs = void 0 } = $$props;
  let { sm = void 0 } = $$props;
  let { md = void 0 } = $$props;
  let { lg = void 0 } = $$props;
  let { xl = void 0 } = $$props;
  let { xxl = void 0 } = $$props;
  const colClasses = [];
  const lookup = { xs, sm, md, lg, xl, xxl };
  Object.keys(lookup).forEach((colWidth) => {
    const columnProp = lookup[colWidth];
    if (!columnProp && columnProp !== "") {
      return;
    }
    const isXs = colWidth === "xs";
    if (isObject(columnProp)) {
      const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
      const colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);
      if (columnProp.size || columnProp.size === "") {
        colClasses.push(colClass);
      }
      if (columnProp.push) {
        colClasses.push(`push${colSizeInterfix}${columnProp.push}`);
      }
      if (columnProp.pull) {
        colClasses.push(`pull${colSizeInterfix}${columnProp.pull}`);
      }
      if (columnProp.offset) {
        colClasses.push(`offset${colSizeInterfix}${columnProp.offset}`);
      }
      if (columnProp.order) {
        colClasses.push(`order${colSizeInterfix}${columnProp.order}`);
      }
    } else {
      colClasses.push(getColumnSizeClass(isXs, colWidth, columnProp));
    }
  });
  if (!colClasses.length) {
    colClasses.push("col");
  }
  if (className) {
    colClasses.push(className);
  }
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.xs === void 0 && $$bindings.xs && xs !== void 0)
    $$bindings.xs(xs);
  if ($$props.sm === void 0 && $$bindings.sm && sm !== void 0)
    $$bindings.sm(sm);
  if ($$props.md === void 0 && $$bindings.md && md !== void 0)
    $$bindings.md(md);
  if ($$props.lg === void 0 && $$bindings.lg && lg !== void 0)
    $$bindings.lg(lg);
  if ($$props.xl === void 0 && $$bindings.xl && xl !== void 0)
    $$bindings.xl(xl);
  if ($$props.xxl === void 0 && $$bindings.xxl && xxl !== void 0)
    $$bindings.xxl(xxl);
  return `<div${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(colClasses.join(" "))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
function getCols(cols) {
  const colsValue = parseInt(cols);
  if (!isNaN(colsValue)) {
    if (colsValue > 0) {
      return [`row-cols-${colsValue}`];
    }
  } else if (typeof cols === "object") {
    return ["xs", "sm", "md", "lg", "xl"].map((colWidth) => {
      const isXs = colWidth === "xs";
      const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
      const value = cols[colWidth];
      if (typeof value === "number" && value > 0) {
        return `row-cols${colSizeInterfix}${value}`;
      }
      return null;
    }).filter((value) => !!value);
  }
  return [];
}
const Row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "noGutters", "form", "cols", "inner"]);
  let { class: className = "" } = $$props;
  let { noGutters = false } = $$props;
  let { form = false } = $$props;
  let { cols = 0 } = $$props;
  let { inner = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.noGutters === void 0 && $$bindings.noGutters && noGutters !== void 0)
    $$bindings.noGutters(noGutters);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.cols === void 0 && $$bindings.cols && cols !== void 0)
    $$bindings.cols(cols);
  if ($$props.inner === void 0 && $$bindings.inner && inner !== void 0)
    $$bindings.inner(inner);
  classes = classnames(className, noGutters ? "gx-0" : null, form ? "form-row" : "row", ...getCols(cols));
  return `<div${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}${add_attribute("this", inner, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const css = {
  code: "h2.svelte-1f48d8a{font-size:1.8em;margin-bottom:0.8em;color:#333}.create-section.svelte-1f48d8a{display:flex;flex-direction:column;align-items:center;margin-bottom:30px}.api-section.svelte-1f48d8a{margin-top:2em;margin-left:2em}.edits.svelte-1f48d8a{display:flex;margin-left:2em}.centered-button.svelte-1f48d8a{display:flex;justify-content:center;margin-top:1em}",
  map: null
};
let limit = 10;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let people = [];
  let searchParams = {
    name: "",
    net_worth: "",
    bday_year: "",
    age: "",
    nationality: ""
  };
  let searchResults = [];
  const newPerson = {
    name: "Elon Musk",
    net_worth: 240,
    bday_year: 1971,
    age: 51,
    nationality: "South Africa"
  };
  let offset = 0;
  $$result.css.add(css);
  return `${``} ${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Col, "Col").$$render($$result, { sm: "3" }, {}, {
        default: () => {
          return `<div class="api-section d-flex flex-column justify-content-end svelte-1f48d8a"><h2 class="svelte-1f48d8a" data-svelte-h="svelte-11jpp85">Lista de Millonarios</h2> <ul>${each(people, (m) => {
            return `<li class="py-1 millionaireItem"><div class="d-flex justify-content-between align-items-center"><div><a href="${"/top-richest/" + escape(m.name, true) + "/" + escape(m.nationality, true)}">${escape(m.name)} ${escape(m.nationality)}</a></div> <div class="edits svelte-1f48d8a">${validate_component(Button, "Button").$$render(
              $$result,
              {
                color: "danger",
                outline: true,
                size: "sm"
              },
              {},
              {
                default: () => {
                  return `Borrar`;
                }
              }
            )} </div></div> </li>`;
          })}</ul> <div class="pagination" style="margin-bottom: 20px;">${validate_component(Button, "Button").$$render(
            $$result,
            {
              style: "margin-right: 10px;",
              color: "danger",
              outline: true,
              class: "btn-sm"
            },
            {},
            {
              default: () => {
                return `Borrar todos los millonarios`;
              }
            }
          )} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              style: "margin-right: 10px;",
              disabled: offset === 0,
              class: "btn-sm"
            },
            {},
            {
              default: () => {
                return `Anterior`;
              }
            }
          )} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              disabled: people.length < limit,
              class: "btn-sm"
            },
            {},
            {
              default: () => {
                return `Siguiente`;
              }
            }
          )}</div></div>`;
        }
      })} ${validate_component(Col, "Col").$$render($$result, { sm: "3" }, {}, {
        default: () => {
          return `<div class="create-section svelte-1f48d8a"><h2 class="svelte-1f48d8a" data-svelte-h="svelte-hd04mr">Buscar Millonarios</h2> <form><table><tbody><tr><td class="py-1" data-svelte-h="svelte-xted9n">Nombre:</td> <td class="py-1"><input placeholder="Nombre del millonario"${add_attribute("value", searchParams.name, 0)}></td></tr> <tr><td class="py-1" data-svelte-h="svelte-p3auva">Patrimonio neto:</td> <td class="py-1"><input type="number" placeholder="1"${add_attribute("value", searchParams.net_worth, 0)}></td></tr> <tr><td class="py-1" data-svelte-h="svelte-2wb23n">Año de nacimiento:</td> <td class="py-1"><input placeholder="2024"${add_attribute("value", searchParams.bday_year, 0)}></td></tr> <tr><td class="py-1" data-svelte-h="svelte-1cqhqtk">Edad:</td> <td class="py-1"><input placeholder="0"${add_attribute("value", searchParams.age, 0)}></td></tr> <tr><td class="py-1" data-svelte-h="svelte-rbnc53">Nacionalidad:</td> <td class="py-1"><input placeholder="Nacionalidad"${add_attribute("value", searchParams.nationality, 0)}></td></tr></tbody></table> <div class="centered-button svelte-1f48d8a">${validate_component(Button, "Button").$$render(
            $$result,
            {
              color: "primary",
              style: "",
              outline: true
            },
            {},
            {
              default: () => {
                return `Buscar`;
              }
            }
          )}</div></form></div> ${``}`;
        }
      })} ${searchResults.length > 0 ? `${validate_component(Col, "Col").$$render($$result, { sm: "3" }, {}, {
        default: () => {
          return `<div class="create-section svelte-1f48d8a"><h3 data-svelte-h="svelte-1cykffd">Resultados de la búsqueda:</h3> <ul>${each(searchResults, (result) => {
            return `<li class="py-1 millionaireItem"><div class="d-flex justify-content-between align-items-center"><div><a href="${"/top-richest/" + escape(result.name, true) + "/" + escape(result.nationality, true)}">${escape(result.name)} ${escape(result.nationality)}</a> </div></div> </li>`;
          })}</ul></div> <div class="d-flex justify-content-between" data-svelte-h="svelte-y0nrha"></div>`;
        }
      })}` : ``} ${validate_component(Col, "Col").$$render($$result, { sm: "3" }, {}, {
        default: () => {
          return `<div class="create-section svelte-1f48d8a"><h2 class="svelte-1f48d8a" data-svelte-h="svelte-1x1winx">Añadir nuevo Millonario</h2> <table><tbody><tr><td class="py-1" data-svelte-h="svelte-xted9n">Nombre:</td> <td class="py-1"><input placeholder="Nombre del millonario"${add_attribute("value", newPerson.name, 0)}></td></tr> <tr><td class="py-1" data-svelte-h="svelte-1v2u9gm">Patrimonio Neto:</td> <td class="py-1"><input type="number" placeholder="0"></td></tr> <tr><td class="py-1" data-svelte-h="svelte-2wb23n">Año de nacimiento:</td> <td class="py-1"><input placeholder="2024"></td></tr> <tr><td class="py-1" data-svelte-h="svelte-1cqhqtk">Edad:</td> <td class="py-1"><input placeholder="0"></td></tr> <tr><td class="py-1" data-svelte-h="svelte-rbnc53">Nacionalidad:</td> <td class="py-1"><input placeholder="Nacionalidad"${add_attribute("value", newPerson.nationality, 0)}></td></tr></tbody></table> <div class="centered-button svelte-1f48d8a">${validate_component(Button, "Button").$$render($$result, { color: "primary", outline: true }, {}, {
            default: () => {
              return `Crear`;
            }
          })}</div> ${``} ${``}</div>`;
        }
      })}`;
    }
  })}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BrNMvXcE.js.map
