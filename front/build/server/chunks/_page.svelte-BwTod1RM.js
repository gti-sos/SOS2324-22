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
  let param = [];
  let busqueda = [];
  let from = "";
  let to = "";
  let numForm = 1;
  let API2 = "";
  let numero = 10;
  let limit = false;
  let opcionSeleccionada = Array.from({ length: numForm }, () => "name");
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
  async function getForbes_billonaires(pages = 1) {
    try {
      let offset = numero * (pages - 1);
      API2 = API;
      let response = "";
      if (limit === true)
        ;
      if (param.length === 0) {
        response = await fetch(API2, { method: "GET" });
      } else {
        let i = 0;
        while (i < param.length) {
          if (API2 === API) {
            if (param[i] === "from-to") {
              API2 = API + "?from=" + from + "&to=" + to;
            } else {
              API2 = API + "?" + param[i] + "=" + busqueda[i];
            }
          } else {
            if (param[i] === "from-to") {
              API2 = API2 + "&from=" + from + "&to=" + to;
            } else {
              API2 = API2 + "&" + param[i] + "=" + busqueda[i];
            }
          }
          i = i + 1;
        }
        response = await fetch(API2, { method: "GET" });
      }
      let data = await response.json();
      companies = data;
      if (response.status === 200) {
        if (API2 !== API) {
          Msg = "Filtrado realizado correctamente";
          setTimeout(
            () => {
              Msg = "";
            },
            3e3
          );
        }
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
  if ($$props.getForbes_billonaires === void 0 && $$bindings.getForbes_billonaires && getForbes_billonaires !== void 0)
    $$bindings.getForbes_billonaires(getForbes_billonaires);
  return `<table><thead data-svelte-h="svelte-1lad2ry"><tr><th>Ranking</th> <th>Nombre</th> <th>Pais</th> <th>Ventas</th> <th>Beneficio</th> <th>Activos</th> <th>Valor de mercado</th> <th>Año</th></tr></thead> <tbody><tr><td><input${add_attribute("value", newCompany.rank, 0)}></td> <td><input${add_attribute("value", newCompany.name, 0)}></td> <td><input${add_attribute("value", newCompany.country, 0)}></td> <td><input${add_attribute("value", newCompany.sale, 0)}></td> <td><input${add_attribute("value", newCompany.profit, 0)}></td> <td><input${add_attribute("value", newCompany.asset, 0)}></td> <td><input${add_attribute("value", newCompany.market_value, 0)}></td> <td><input${add_attribute("value", newCompany.year, 0)}></td> <td>${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Crear`;
    }
  })}</td></tr></tbody></table> <span><button data-svelte-h="svelte-1qg1nwf">Añadir filtro</button> <h5 data-svelte-h="svelte-17etlv4">Filtrar</h5> <button data-svelte-h="svelte-17vm6fs">Borrar filtro</button></span> ${each(Array.from({ length: numForm }, (_, i) => i), (nn) => {
    return `${opcionSeleccionada[nn] === "from-to" ? `<form id="${"FormularioBusqueda " + escape(nn, true)}"><label for="opciones" data-svelte-h="svelte-10rcd2q">Búsqueda por:</label> <select class="inpututil" id="${"opciones " + escape(nn, true)}" name="opciones"><option class="inpututil" value="rank" selected data-svelte-h="svelte-15qdpiu">Ranking</option><option class="inpututil" value="name" data-svelte-h="svelte-3zapj3">Nombre</option><option class="inpututil" value="country" data-svelte-h="svelte-bo3dxm">Pais</option><option class="inpututil" value="sale" data-svelte-h="svelte-1oy9txd">Ventas</option><option class="inpututil" value="profit" data-svelte-h="svelte-1rwewgb">Beneficio</option><option class="inpututil" value="asset" data-svelte-h="svelte-lgd0y">Acciones</option><option class="inpututil" value="market_value" data-svelte-h="svelte-10y6bu3">Valor de Mercado</option><option class="inpututil" value="year" data-svelte-h="svelte-tfehan">Año</option><option class="inpututil" value="from-to" data-svelte-h="svelte-ncjc7b">Rango de años</option></select> <br> <br> <label for="from" data-svelte-h="svelte-1s9qvsf">Desde:</label> <input type="text" id="${"from " + escape(nn, true)}" name="from"> <label for="to" data-svelte-h="svelte-12efo6">Hasta:</label> <input type="text" id="${"to " + escape(nn, true)}" name="to"> <br> <br> </form>` : `<form id="${"FormularioBusqueda " + escape(nn, true)}"><label for="opciones" data-svelte-h="svelte-10rcd2q">Búsqueda por:</label> <select class="inpututil" id="${"opciones " + escape(nn, true)}" name="opciones"><option class="inpututil" value="rank" selected data-svelte-h="svelte-15qdpiu">Ranking</option><option class="inpututil" value="name" data-svelte-h="svelte-3zapj3">Nombre</option><option class="inpututil" value="country" data-svelte-h="svelte-bo3dxm">Pais</option><option class="inpututil" value="sale" data-svelte-h="svelte-1oy9txd">Ventas</option><option class="inpututil" value="profit" data-svelte-h="svelte-1rwewgb">Beneficio</option><option class="inpututil" value="asset" data-svelte-h="svelte-lgd0y">Acciones</option><option class="inpututil" value="market_value" data-svelte-h="svelte-10y6bu3">Valor de Mercado</option><option class="inpututil" value="year" data-svelte-h="svelte-tfehan">Año</option><option class="inpututil" value="from-to" data-svelte-h="svelte-ncjc7b">Rango de años</option></select> <br> <br> <label for="entrada" data-svelte-h="svelte-9dquoe">Introduzca el valor de la búsqueda</label> <input type="text" id="${"entrada " + escape(nn, true)}" name="texto"> <br> <br> </form>`}`;
  })} <button type="button" id="Filtrar" data-svelte-h="svelte-17vlapc">Filtrar</button> <br> <br> <form><label for="paginar" data-svelte-h="svelte-b68ci5">Introduzca el numero de elementos que deseas</label> <input type="number" id="paginar" name="number"${add_attribute("value", numero, 0)}> <button type="button" id="Paginar" data-svelte-h="svelte-b80wi2">Paginar</button></form> <br> <br> <ul>${each(companies, (company) => {
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
//# sourceMappingURL=_page.svelte-BwTod1RM.js.map
