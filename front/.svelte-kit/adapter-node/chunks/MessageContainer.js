import { c as create_ssr_component, e as escape } from "./ssr.js";
const css = {
  code: ".message-container.svelte-12643pp{margin:1rem 0;padding:1rem;border:1px solid #ccc;border-radius:4px}.message.svelte-12643pp{padding:0.5rem 1rem;border-radius:4px}.success.svelte-12643pp{background-color:#77dd77;color:#333}.error.svelte-12643pp{background-color:#ff6666;color:white}",
  map: null
};
const MessageContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { Msg } = $$props;
  let { errorMsg } = $$props;
  if ($$props.Msg === void 0 && $$bindings.Msg && Msg !== void 0)
    $$bindings.Msg(Msg);
  if ($$props.errorMsg === void 0 && $$bindings.errorMsg && errorMsg !== void 0)
    $$bindings.errorMsg(errorMsg);
  $$result.css.add(css);
  return `<div class="message-container svelte-12643pp">${Msg != "" ? `<div class="message success svelte-12643pp">${escape(Msg)}</div>` : ``} ${errorMsg != "" ? `<div class="message error svelte-12643pp">${escape(errorMsg)}</div>` : ``}</div>`;
});
export {
  MessageContainer as M
};
