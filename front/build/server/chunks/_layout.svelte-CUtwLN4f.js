import { c as create_ssr_component, v as validate_component } from './ssr-TARzJ76-.js';
import './Theme.svelte_svelte_type_style_lang-CYVsGOOs.js';
import './index-DNBBKB0h.js';

const css = {
  code: "a.svelte-1hw2h6s{color:green}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<nav data-svelte-h="svelte-1cnein"><a href="/" class="svelte-1hw2h6s">Home</a> <a href="/famous-people" class="svelte-1hw2h6s">famous-people</a> <a href="/forbes-billonaires" class="svelte-1hw2h6s">forbes-billonaires</a> <a href="/about" class="svelte-1hw2h6s">About</a> </nav>`;
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
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <h1 data-svelte-h="svelte-1su5i1l">Es com F*ck</h1> <hr> ${slots.default ? slots.default({}) : ``} <hr> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(Styles, "Styles").$$render($$result, {}, {}, {})}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-CUtwLN4f.js.map
