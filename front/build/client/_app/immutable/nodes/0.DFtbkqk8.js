import{s as q,n as m,d as B,u as D,g as J,f as O}from"../chunks/scheduler.wWR6jiGY.js";import{S as A,i as E,e as $,b as v,k as F,x as _,a as c,d as o,t as P,c as Q,A as I,G as V,g as K,h as d,j as S,l as p,m as T,o as j,q as C,u as L,v as G}from"../chunks/index.BrUfcjbG.js";import"../chunks/Theme.svelte_svelte_type_style_lang.C8eeSRjy.js";const U=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function W(i){let t,n='<a href="/" class="svelte-1ihmghz">Inicio</a> <a href="/famous-people" class="svelte-1ihmghz">famous-people</a> <a href="/forbes-billonaires" class="svelte-1ihmghz">forbes-billonaires</a> <a href="/forbes-billionaires-list" class="svelte-1ihmghz">forbes-billionaires-list</a> <a href="/top-richest" class="svelte-1ihmghz">top-richest</a> <a href="/about" class="svelte-1ihmghz">Sobre</a>';return{c(){t=$("nav"),t.innerHTML=n,this.h()},l(s){t=v(s,"NAV",{class:!0,"data-svelte-h":!0}),F(t)!=="svelte-1t8ufb6"&&(t.innerHTML=n),this.h()},h(){_(t,"class","svelte-1ihmghz")},m(s,l){c(s,t,l)},p:m,i:m,o:m,d(s){s&&o(t)}}}class X extends A{constructor(t){super(),E(this,t,null,W,q,{})}}function Y(i){let t;return{c(){t=P("Made by gti.sos2324-22")},l(n){t=Q(n,"Made by gti.sos2324-22")},m(n,s){c(n,t,s)},p:m,i:m,o:m,d(n){n&&o(t)}}}class Z extends A{constructor(t){super(),E(this,t,null,Y,q,{})}}const{document:M}=U;function R(i){let t;return{c(){t=$("link"),this.h()},l(n){t=v(n,"LINK",{rel:!0,href:!0}),this.h()},h(){_(t,"rel","stylesheet"),_(t,"href","https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css")},m(n,s){c(n,t,s)},d(n){n&&o(t)}}}function ee(i){let t,n,s=i[0]&&R();return{c(){t=$("link"),s&&s.c(),n=I(),this.h()},l(l){const r=V("svelte-1uz8902",M.head);t=v(r,"LINK",{rel:!0,href:!0}),s&&s.l(r),n=I(),r.forEach(o),this.h()},h(){_(t,"rel","stylesheet"),_(t,"href","https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css")},m(l,r){K(M.head,t),s&&s.m(M.head,null),K(M.head,n)},p(l,[r]){l[0]?s||(s=R(),s.c(),s.m(n.parentNode,n)):s&&(s.d(1),s=null)},i:m,o:m,d(l){o(t),s&&s.d(l),o(n)}}}function te(i,t,n){let{icons:s=!0}=t,{theme:l=void 0}=t;return i.$$set=r=>{"icons"in r&&n(0,s=r.icons),"theme"in r&&n(1,l=r.theme)},i.$$.update=()=>{i.$$.dirty&2&&typeof document<"u"&&l!==void 0&&(l==="auto"&&window.matchMedia("(prefers-color-scheme: dark)").matches?document.documentElement.setAttribute("data-bs-theme","dark"):document.documentElement.setAttribute("data-bs-theme",l))},[s,l]}class se extends A{constructor(t){super(),E(this,t,te,ee,q,{icons:0,theme:1})}}function ne(i){let t,n,s,l,r="Grupo 22",k,g,z,x,y,w,u,H,h,b;n=new X({});const N=i[1].default,f=B(N,i,i[0],null);return u=new Z({}),h=new se({}),{c(){t=d(),S(n.$$.fragment),s=d(),l=$("h1"),l.textContent=r,k=d(),g=$("hr"),z=d(),f&&f.c(),x=d(),y=$("hr"),w=d(),S(u.$$.fragment),H=d(),S(h.$$.fragment),this.h()},l(e){V("svelte-u6kzbk",document.head).forEach(o),t=p(e),T(n.$$.fragment,e),s=p(e),l=v(e,"H1",{"data-svelte-h":!0}),F(l)!=="svelte-1gp92ev"&&(l.textContent=r),k=p(e),g=v(e,"HR",{class:!0}),z=p(e),f&&f.l(e),x=p(e),y=v(e,"HR",{class:!0}),w=p(e),T(u.$$.fragment,e),H=p(e),T(h.$$.fragment,e),this.h()},h(){document.title="Grupo 22",_(g,"class","svelte-19q733z"),_(y,"class","svelte-19q733z")},m(e,a){c(e,t,a),j(n,e,a),c(e,s,a),c(e,l,a),c(e,k,a),c(e,g,a),c(e,z,a),f&&f.m(e,a),c(e,x,a),c(e,y,a),c(e,w,a),j(u,e,a),c(e,H,a),j(h,e,a),b=!0},p(e,[a]){f&&f.p&&(!b||a&1)&&D(f,N,e,e[0],b?O(N,e[0],a,null):J(e[0]),null)},i(e){b||(C(n.$$.fragment,e),C(f,e),C(u.$$.fragment,e),C(h.$$.fragment,e),b=!0)},o(e){L(n.$$.fragment,e),L(f,e),L(u.$$.fragment,e),L(h.$$.fragment,e),b=!1},d(e){e&&(o(t),o(s),o(l),o(k),o(g),o(z),o(x),o(y),o(w),o(H)),G(n,e),f&&f.d(e),G(u,e),G(h,e)}}}function le(i,t,n){let{$$slots:s={},$$scope:l}=t;return i.$$set=r=>{"$$scope"in r&&n(0,l=r.$$scope)},[l,s]}class re extends A{constructor(t){super(),E(this,t,le,ne,q,{})}}export{re as component};
