import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import "../../chunks/Theme.svelte_svelte_type_style_lang.js";
const css$1 = {
  code: "nav.svelte-1ihmghz.svelte-1ihmghz{background-color:#333;padding:10px 0;text-align:center}nav.svelte-1ihmghz a.svelte-1ihmghz{color:#fff;text-decoration:none;padding:10px 20px}nav.svelte-1ihmghz a.svelte-1ihmghz:hover{background-color:#555}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<nav class="svelte-1ihmghz" data-svelte-h="svelte-p5c0lf"><a href="/" class="svelte-1ihmghz">Iniciio</a> <a href="/famous-people" class="svelte-1ihmghz">famous-people</a> <a href="/forbes-billonaires" class="svelte-1ihmghz">forbes-billonaires</a> <a href="/forbes-billionaires-list" class="svelte-1ihmghz">forbes-billionaires-list</a> <a href="/top-richest" class="svelte-1ihmghz">top-richest</a> <a href="/about" class="svelte-1ihmghz">Sobre</a> </nav>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `Made by gti.sos2324-22`;
});
const Styles = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icons = true } = $$props;
  let { theme = void 0 } = $$props;
  if ($$props.icons === void 0 && $$bindings.icons && icons !== void 0)
    $$bindings.icons(icons);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  {
    if (typeof document !== "undefined" && theme !== void 0) {
      if (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-bs-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-bs-theme", theme);
      }
    }
  }
  return `${$$result.head += `<!-- HEAD_svelte-1uz8902_START --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">${icons ? `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">` : ``}<!-- HEAD_svelte-1uz8902_END -->`, ""}`;
});
const css = {
  code: "hr.svelte-19q733z{margin-top:20px;margin-bottom:20px;border:0;border-top:1px solid #ccc}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-u6kzbk_START -->${$$result.title = `<title>Grupo 22</title>`, ""}<!-- HEAD_svelte-u6kzbk_END -->`, ""} ${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <h1 data-svelte-h="svelte-1gp92ev">Grupo 22</h1> <hr class="svelte-19q733z"> ${slots.default ? slots.default({}) : ``} <hr class="svelte-19q733z"> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(Styles, "Styles").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
